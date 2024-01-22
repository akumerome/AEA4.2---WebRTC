<template>
    <div class="container">
        <div class="connection_container">
            <div>
                <label>El teu ID</label>
                <input class="text" v-model="outgoing" type="text">
            </div>
            <div>
                <label>ID remot</label>
                <input class="text" v-model="ingoing" type="text">
            </div>
            <div class="buttons">
                <button v-if="isInitiator" @click="crearElMeuPeerID_1()">1- CREAR EL MEU PEER ID</button>
                <button v-if="!isInitiator" @click="senyalarElMeuPeer_2()">2 - SENYALAR EL MEU PEER</button>
                <button v-if="isInitiator" @click="senyalarElMeuPeer_3()">3 - SENYALAR EL MEU PEER</button>
                <div>
                    <input type="checkbox" id="checkbox" v-model="isInitiator">
                    <label for="checkbox">Iniciador</label>
                </div>
            </div>
        </div>
        <div class="communication_container">
            <div>
                <label>Envia missatge</label>
                <input class="text" v-model="message" type="text">
                <button @click="enviarMissatge_4()">4 - ENVIAR MISSATGE</button>
            </div>
            <div>
                <h2>CHAT</h2>
                <div v-for="actual in array_messages">
                    {{ actual }}
                </div>
            </div>
        </div>
    </div>
</template>
  
<script>
import { useAppStore } from '../stores/app'
import { socket } from '@/socket';
//import { peer_initiator, peer_not_initiator } from '@/communicationManager.js';

export default {
    data() {
        return {
            store: useAppStore(),
            loading: false,
            outgoing: "",
            ingoing: "",
            isInitiator: true,
            my_peer: "",
            array_messages: []
        }
    },
    methods: {
        crearElMeuPeerID_1() {

            console.log("I'm the initiator and i'm ready to get my Peer ID");

            const peer = new SimplePeer({
                initiator: true, //true soy iniciador, false no lo soy
                trickle: false
            });

            console.log("Peer creat", peer);

            peer.on('signal', data => { //sobre cargo evento signal, cuando recibo una señal pasala a cadena de texto
                console.log("MY ID TO MAKE A CALL:", JSON.stringify(data));
                this.outgoing = JSON.stringify(data);
                /*console.log('SIGNAL', JSON.stringify(data))
                this.outgoing = JSON.stringify(data) //le pongo el contenido dentro de una caja de texto*/
            })
            console.log(this.outgoing);

            peer.on("data", (data) => {
		        console.log("" + data);
                this.array_messages.push("" + data);
	        });

            this.my_peer = peer;
        },
        senyalarElMeuPeer_2() {

            console.log("Signaling my peer");

            const peer = new SimplePeer({
                initiator: false,
                trickle: false
            });

            console.log(peer);
            peer.signal(this.ingoing);
            peer.on("signal", (data) => {
                //es crida cada cop que es crea un nou objecte Peer
                console.log("MY ID TO ACCEPT CALL:");
                console.log(JSON.stringify(data));
                if (data.type == "answer") {
                    this.outgoing = JSON.stringify(data);
                } else {
                    console.log("BBB")
                }
            });

            peer.on("data", (data) => {
		        console.log("" + data);
                this.array_messages.push("" + data);
	        });

            this.my_peer = peer;
        },
        senyalarElMeuPeer_3() {
            console.log("Initiator signaling my peer");
            this.my_peer.signal(this.ingoing);
        },
        enviarMissatge_4() {
            var message = this.nom + ": " + this.message;
            console.log(message);
            this.my_peer.send(message);
            this.array_messages.push(message);
            this.message = "";
        }
    },
    computed: {
        nom() {
            return this.store.getNom();
        },
        arrayNoms() {
            return this.store.getArrayNoms();
        },
        sala() {
            return this.store.getSala();
        },
    }
}
</script>
  
<style>
.container {
    display: flex;
    flex-direction: column;
    gap: 20px;
}

.connection_container {
    display: flex;
    flex-direction: row;
    gap: 20px;
}

.text {
    width: 400px;
    height: 200px;
}

.buttons {
    width: 250px;
    display: flex;
    flex-direction: column;
    gap: 10px;
}
</style>
  