package com.example.demo.Service;

import com.example.demo.Game.GameModel;
import com.example.demo.Game.modelToView.ICommand;
import com.example.demo.Game.modelToView.IRejectCommand;
import com.example.demo.Game.modelToView.IViewManager;
import com.example.demo.Game.viewToModel.ITurnManager;
import com.example.demo.Game.viewToModel.IViewRequestor;

import java.util.*;

public class GameService {
    Map<String, GameModel> games = new HashMap<>();

    public void createGame(String roomID, int rows, int cols) {
        GameModel game = new GameModel(rows, cols);

        game.setViewManager(new IViewManager() {
            public void draw() {
                System.out.println("Its a draw");
            }

            public void win(int player) {
                System.out.println("Player " + player + " wins");
            }

            public void reset() {
                System.out.println("Resetting...");
            }
        }, new ITurnManager() {
            public void takeTurn(IViewRequestor requestor) {
                int row = 2;
                int column = 2;


                requestor.setTokenAt(row - 1, column - 1, new IRejectCommand() {
                    public void execute() {
                        System.out.println("Invalid move");
                    }
                });
            }

        });
        game.setCommand(new ICommand() {

            public void setTokenAt(int row, int col, int player) {

                System.out.println("setting player " + player + "  token at (" + (row + 1) + "," + (col + 1) + ")");
            }

            @Override
            public void clearTokenAt(int row, int col) {

                System.out.println("token at (" + (row + 1) + "," + (col + 1) + ") was cleared");
            }

            @Override
            public void setMessage(String s) {
                System.out.println("message was set to " + s);
            }
        });

        List<Object> players = game.getPlayers();
        game.setPlayers(players.get(0), players.get(0));

        game.setHalt();
        games.put(roomID, game);
    }

    public void resetGame(String roomID) {
        GameModel game = games.get(roomID);
        game.reset();
    }

    public int[][] getBoardState(String roomID) {
        GameModel game = games.get(roomID);
        return game.getBoardModel().getCells();
    }
}
