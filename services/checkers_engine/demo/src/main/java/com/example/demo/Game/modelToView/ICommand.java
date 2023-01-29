package com.example.demo.Game.modelToView;

/**
 * The command supplied by the view that enables the model to set a token
 * for a particular player at a given (row, col) location on the screen,
 * clear the display at a (row, col), and to show a particular message on the screen.
 */
public interface ICommand {

    void setTokenAt(int row, int col, int player);

    void clearTokenAt(int row, int col);

    void setMessage(String s);

}
