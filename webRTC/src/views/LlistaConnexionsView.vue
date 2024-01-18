<template>
  <div>
    <h1>Usuaris connectats</h1>
    <div v-for="actual in arrayNoms">

      <div v-if="nom != actual.nom">
        {{ actual.nom }}<button @click="establirConnexio(actual.id)">1 - ESTABLIR CONNEXIÓ</button>
      </div>
    </div>
    <div>
      <div>
        <label>El teu ID</label>
        <input class="text" v-model="outgoing" type="text">
      </div>
      <div>
        <label>ID remot</label>
        <input class="text" v-model="ingoing" type="text">
      </div>
      <div>
        <button v-if="!isInitiator" @click="establirConnexio(actual.id)">2 - SENYALAR EL MEU PEER</button>
        <button v-if="isInitiator" @click="establirConnexio(actual.id)">3 - SENYALAR EL MEU PEER</button>

        <input type="checkbox" id="checkbox" v-model="isInitiator">
        <label for="checkbox">{{ isInitiator }}</label>
      </div>
    </div>
  </div>
</template>

<script>
import { useAppStore } from '../stores/app'
import { socket } from '@/socket';
import { p } from '@/communicationManager.js';

export default {
  data() {
    return {
      store: useAppStore(),
      loading: false,
      outgoing: "",
      ingoing: "",
      isInitiator: true
    }
  },
  methods: {
    establirConnexio(idAltre) {

      const p = new SimplePeer({
        initiator: true, //1 soy iniciador, 0 no lo soy
      })

      console.log("Peer creat", p);

      p.on('error', err => console.log('error', err))

      p.on('signal', data => { //sobre cargo evento signal, cuando recibo una señal pasala a cadena de texto
        console.log('SIGNAL', JSON.stringify(data));
        this.outgoing = JSON.stringify(data);
        /*console.log('SIGNAL', JSON.stringify(data))
        this.outgoing = JSON.stringify(data) //le pongo el contenido dentro de una caja de texto*/
      })
      console.log("AAA")
      console.log(this.outgoing);
      /*p.signal(JSON.parse(this.ingoing.value)) // 

      p.on('connect', () => {
        console.log('CONNECT')
        p.send('whatever' + Math.random()) //cuando se haya conectado envia texto
      })

      p.on('data', data => { // evento recibido como data
        console.log('data: ' + data)
      })*/

      //socket.emit('anar-sala', idAltre);


    }
  },
  computed: {
    nom() {
      return this.store.getNom();
    },
    arrayNoms() {
      return this.store.getArrayNoms();
    },
  }
}
</script>

<style>
.text {
  width: 400px;
  height: 200px;
}
</style>
