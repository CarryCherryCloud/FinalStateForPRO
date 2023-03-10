package com.example.demo.Game.board;


// Referenced classes of package model.board:
//  IBoardState


import com.example.demo.Game.move.IBoardLambada;
import com.example.demo.Game.move.IBoardStatusVisitor;

abstract class ATerminalState implements IBoardState {

    ATerminalState() {
    }

    public void map(int i, IBoardLambada iboardlambda, Object obj, IBoardModel iboardmodel) {
        iboardlambda.noApply(i, iboardmodel, obj);
    }

    public abstract Object execute(IBoardStatusVisitor iboardstatusvisitor, Object obj, IBoardModel iboardmodel);
}


//Referenced classes of package model.board:
//ATerminalState

class DrawState extends ATerminalState {

    public static DrawState Singleton = new DrawState();

    private DrawState() {
    }

    @Override
    public Object execute(IBoardStatusVisitor iboardstatusvisitor, Object obj, IBoardModel iboardmodel) {
        return iboardstatusvisitor.drawCase(iboardmodel, obj);
    }

}

//ATerminalState

class Player0WinState extends ATerminalState {

    public static Player0WinState Singleton = new Player0WinState();

    private Player0WinState() {
    }

    @Override
    public Object execute(IBoardStatusVisitor iboardstatusvisitor, Object obj, IBoardModel iboardmodel) {
        return iboardstatusvisitor.player0WonCase(iboardmodel, obj);
    }

}


//ATerminalState

class Player1WinState extends ATerminalState {

    public static Player1WinState Singleton = new Player1WinState();

    private Player1WinState() {
    }

    @Override
    public Object execute(IBoardStatusVisitor iboardstatusvisitor, Object obj, IBoardModel iboardmodel) {
        return iboardstatusvisitor.player1WonCase(iboardmodel, obj);
    }

}