package com.example.demo.Game;


import com.example.demo.Game.board.IBoardModel;
import com.example.demo.Game.modelToView.ICommand;

/**
 * This interface represents the model for a game in an MVC architecture.
 */

public interface IGameModel {

    void setCommand(final ICommand p0);

    IBoardModel getBoardModel();

}
