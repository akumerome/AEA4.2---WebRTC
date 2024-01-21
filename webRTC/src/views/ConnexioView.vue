<template>
    <div>
        <div class="container">
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
            peer_initiator: "",
            peer_not_initiator: ""
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
            this.peer_initiator = peer;
        },
        senyalarElMeuPeer_2() {

            console.log("Signaling my peer");

            const peer = new SimplePeer({
                initiator: false,
                trickle: false
            });

            console.log(peer);

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

            this.peer_not_initiator = peer;
        },
        senyalarElMeuPeer_3() {
            console.log("Initiator signaling my peer");
            this.peer_initiator.signal(this.ingoing);
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
  