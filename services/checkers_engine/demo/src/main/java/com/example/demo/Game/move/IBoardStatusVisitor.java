package com.example.demo.Game.move;


import com.example.demo.Game.board.IBoardModel;

/**
 * The visitor to an IBoardModel that provides variant behaviors for the different states of the board.
 */
public interface IBoardStatusVisitor {

    Object player0WonCase(IBoardModel host, Object param);

    Object player1WonCase(IBoardModel host, Object param);

    Object drawCase(IBoardModel host, Object param);

    Object noWinnerCase(IBoardModel host, Object param);

}
