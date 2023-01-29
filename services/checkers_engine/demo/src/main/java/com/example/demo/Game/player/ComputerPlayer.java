package com.example.demo.Game.player;


// Referenced classes of package model:
//APlayer, INextMoveStrategy, IRequestor, IRejectCommand


import com.example.demo.Game.IGameModel;
import com.example.demo.Game.modelToView.IRejectCommand;
import com.example.demo.Game.move.INextMoveStrategy;
import com.example.demo.Game.utility.Point;
import com.example.demo.Game.viewToModel.IRequestor;

public class ComputerPlayer extends APlayer {

    private final INextMoveStrategy iNextMoveStrategy;
    private final IGameModel gameModel;

    public ComputerPlayer(IRequestor iRequestor, int player, IGameModel gameModel, INextMoveStrategy iNextMoveStrategy) {
        super(iRequestor, player);
        this.gameModel = gameModel;
        this.iNextMoveStrategy = iNextMoveStrategy;
        System.out.println("ComputerPlayer is using " + iNextMoveStrategy);

    }

    /**
     * Used by the TurnControl to tell this player to take its turn.
     * When the computer takes its turn, it will calculate its next move and then request that move of the model.
     * If the computer makes and invalid move, the computer will print an error message to the screen and the
     * it will take its turn again.
     */
    public void takeTurn() {
        System.out.print("Computer player " + getPlayer() + " (" + this + ") takes turn...");
        Point p = this.iNextMoveStrategy.getNextMove(this.gameModel, super.getPlayer());
        System.out.println("and moves to " + p);
        getRequestor().setTokenAt(p.x, p.y, super.getPlayer(), new IRejectCommand() {
            public void execute() {
                System.out.println("ComputerPlayer: The move at (" + p.x + ", " + p.y + ") is invalid.");
                takeTurn();
            }
        });

    }
}
