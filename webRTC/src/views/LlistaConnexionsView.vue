<template>
  <div>
    <h1>Usuaris connectats</h1>
    <div v-if="arrayNoms.length <= 1"> Esperant a que altres usuaris es connectin...</div>
      <div v-else v-for="actual in arrayNoms">
        <div v-if="nom != actual.nom">
          {{ actual.nom }}<button @click="establirConnexio(actual.id)">0 - ESTABLIR CONNEXIÓ</button>
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
    }
  },
  methods: {
    establirConnexio(idAltre) {
      socket.emit('anar-sala', idAltre);
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
