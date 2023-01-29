package com.example.demo.Game;


import com.example.demo.Game.modelToView.IViewManager;
import com.example.demo.Game.viewToModel.IModelManager;
import com.example.demo.Game.viewToModel.ITurnManager;

/**
 * Combines the running and management interfaces of the model.
 */
public interface IModelCombo extends IGameModel, IModelManager {

    /**
     * Sets the management interface of the view used by the model.
     *
     * @param viewManager
     * @param turnManager
     */
    void setViewManager(IViewManager viewManager, ITurnManager turnManager);


}
