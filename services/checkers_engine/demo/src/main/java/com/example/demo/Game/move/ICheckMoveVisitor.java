package com.example.demo.Game.move;

/**
 * This interface encapsulates the commands to follow when
 * the model/board has determined that a valid or invalid move was requested.
 */
public interface ICheckMoveVisitor {

    void invalidMoveCase();

    void validMoveCase();

}
