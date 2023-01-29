package com.example.demo.Game;




import com.example.demo.Game.modelToView.ICommand;
import com.example.demo.Game.utility.Dimension;
import com.example.demo.Game.viewToModel.IViewRequestor;

import java.util.List;

/**
 * The running interface of the view.
 */
public interface IView {

    /**
     * @return ICommand : The ICommand object used by the model to display tokens, etc. on the view.
     */
    ICommand getCommand();

    /**
     * @param requestor : For use by the view
     */
    void setiViewRequestor(IViewRequestor iViewRequestor);

    /**
     * A List of Objects to be used by the view to give a choice of players.
     * The view will select two of the elements of the List (possibly the same element twice),
     * to be used to determine the players of the game.
     *
     * @param players
     */
    void setPlayers(List<Object> players);

    /**
     * Sets the width (columns) and height (rows) of the displayed board.
     * This information should be obtained from the model.
     *
     * @param size
     */
    void setDimension(Dimension size);


}
