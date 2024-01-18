<template>
    <div>SALA CONNEXIO</div>
    <div>
        <label>OUTGOING</label>
        <input v-model="outgoing" type="text">
    </div>
    <div>
        <label>INGOING</label>
        <input v-model="ingoing" type="text">
    </div>
</template>
  
<script>
import { useAppStore } from '../stores/app'
import { p } from '@/communicationManager.js';

export default {
    data() {
        return {
            store: useAppStore(),
            loading: false,
            outgoing: "",
            ingoing: ""
        }
    },
    methods: {
        establirConnexio() {
            p.on('error', err => console.log('error', err))

            p.on('signal', data => { //sobre cargo evento signal, cuando recibo una señal pasala a cadena de texto
                console.log('SIGNAL', JSON.stringify(data))
                this.outgoing = JSON.stringify(data) //le pongo el contenido dentro de una caja de texto
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
@media (min-width: 1024px) {
    .about {
        min-height: 100vh;
        display: flex;
        align-items: center;
    }
}
</style>
  