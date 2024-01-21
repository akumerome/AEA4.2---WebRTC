export const peer_initiator = new SimplePeer({
    initiator: true, //true soy iniciador, false no lo soy
    trickle: false
});

export const peer_not_initiator = new SimplePeer({
    initiator: false,
    trickle: false
});
