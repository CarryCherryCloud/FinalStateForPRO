package com.example.demo.Game.board;


import com.example.demo.Game.modelToView.ICommand;
import com.example.demo.Game.move.IBoardLambada;
import com.example.demo.Game.move.IBoardStatusVisitor;
import com.example.demo.Game.move.ICheckMoveVisitor;
import com.example.demo.Game.move.IUndoMove;
import com.example.demo.Game.utility.Dimension;

/**
 * @author IboardModel interface keeps the rules of game
 * different concrete implementation of this interface
 * represent different type of games
 */
public interface IBoardModel {


    Dimension getDimension();

    IUndoMove makeMove(int r, int c, int plyr, ICheckMoveVisitor cm, IBoardStatusVisitor bs);

    void reset();

    int[][] getCells();

    //map(...) -- useful for analyzing the valid moves available for any player.
    void map(int player, IBoardLambada lambda, Object param);

    //mapAll(...) -- maps an IBoardLambda across all possible board positions, valid or not. This is useful for finding out who is where on the board.
    void mapAll(int player, IBoardLambada lambda, Object param);

    //playerAt(...) -- looks at a single board location and tells you who, if anyone, is there.
    int playerAt(int row, int col);

    Object execute(IBoardStatusVisitor visitor, Object param);

    boolean isValidMove(int player, int row, int col);

    void redrawAll(final ICommand command);

    boolean isSkipPlayer(int player);


}
