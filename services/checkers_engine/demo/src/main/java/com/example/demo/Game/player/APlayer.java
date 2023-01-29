package com.example.demo.Game.player;


import com.example.demo.Game.viewToModel.IRequestor;

public abstract class APlayer {

    private final IRequestor iRequestor;
    private final int player;
    private APlayer nextPlayer = this;


    public APlayer(IRequestor irequestor, int i) {
        nextPlayer = this;
        iRequestor = irequestor;
        player = i;
    }

    public abstract void takeTurn();

    public IRequestor getRequestor() {
        return iRequestor;
    }

    public int getPlayer() {
        return player;
    }

    public APlayer getNextPlayer() {
        return nextPlayer;
    }

    private void setNextPlayer(APlayer aplayer) {
        nextPlayer = aplayer;
    }

    public void insertAsRest(APlayer aplayer) {
        aplayer.setNextPlayer(getNextPlayer());
        setNextPlayer(aplayer);
    }

}
