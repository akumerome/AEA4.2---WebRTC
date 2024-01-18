<script>
import { useAppStore } from '../stores/app';
import { socket } from '@/socket';
export default {
  data() {
    return {
      store: useAppStore(),
      nom: ''
    }
  },
  methods: {
    login() {
      this.store.setNom(this.nom);
      socket.emit('enviar-nom', this.nom);
      //this.$router.push("/connexions");
    }
  }
}
</script>

<template>
  <main>
    {{ nom }}
    <form @submit.prevent="login">
      <label for="fname">Introdueix el teu nom:</label><br>
      <input v-model="nom" type="text" id="fname" name="fname"><br>
      <input type="submit" value="Submit">
    </form>

  </main>
</template>
