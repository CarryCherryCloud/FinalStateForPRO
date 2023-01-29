package com.example.demo.Game.move;


import com.example.demo.Game.IGameModel;
import com.example.demo.Game.utility.Point;

/**
 * Algorithm to calculate the next move
 * Strategy Design Pattern
 */
public interface INextMoveStrategy {

    /**
     * @param context : The IModel being used.
     * @param player  : The player whose move is being calculated.
     * @return : Calculates the next move as a Point (x = column, y = row).
     */
    Point getNextMove(IGameModel context, int player);

}

