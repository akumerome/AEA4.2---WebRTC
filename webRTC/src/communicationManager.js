export const p = new SimplePeer({
    initiator: location.hash === '#1', //1 soy iniciador, 0 no lo soy
    trickle: false
});
