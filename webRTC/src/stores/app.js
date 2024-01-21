import { ref, computed } from 'vue'
import { defineStore } from 'pinia'

export const useAppStore = defineStore('app', {
  state: () => ({

    nom: '',
    arrayNoms: [],
    sala: []

  }),
  actions: {

    //getters
    getNom() {
      return this.nom
    },
    getArrayNoms() {
      return this.arrayNoms
    },
    getSala() {
      return this.sala
    },
    
    //setters
    setNom(nom) {
      this.nom = nom
    },
    setArrayNoms(arrayNoms) {
      this.arrayNoms = arrayNoms
    },
    setSala(sala) {
      this.sala = sala
    },

  },
})