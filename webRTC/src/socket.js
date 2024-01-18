import { io } from "socket.io-client";
import { useAppStore } from "./stores/app";
import router from "./router";

let url = "http://localhost:3000";

export const socket = io(url);

socket.on("connect", () => {
    const store = useAppStore();

    socket.on("nom-enviat", (arrayNoms) => {
        store.setArrayNoms(arrayNoms);
    })

    socket.on("anar-connexions", () => {
        router.push("/llista_connexions");
    })

    socket.on("anar-sala", () => {
        router.push("/sala_connexio")
    })
});

socket.on("disconnect", () => {
    
});