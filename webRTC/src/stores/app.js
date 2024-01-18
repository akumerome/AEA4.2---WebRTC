import { ref, computed } from 'vue'
import { defineStore } from 'pinia'

export const useAppStore = defineStore('app', {
  state: () => ({

    nom: '',
    arrayNoms: []

  }),
  actions: {

    //getters
    getNom() {
      return this.nom
    },
    getArrayNoms() {
      return this.arrayNoms
    },
    
    //setters
    setNom(nom) {
      this.nom = nom
    },
    setArrayNoms(arrayNoms) {
      this.arrayNoms = arrayNoms
    },

  },
})