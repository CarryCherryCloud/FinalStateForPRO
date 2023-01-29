package com.example.demo;

import com.example.demo.Service.GameService;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;

@Controller
public class GameController {
    GameService gameService = new GameService();

    @PostMapping("/createGame/{roomID}/{rows}/{cols}")
    public ResponseEntity<String> createGame(@PathVariable String cols, @PathVariable String rows, @PathVariable String roomID) {
        gameService.createGame(roomID, Integer.parseInt(rows), Integer.parseInt(cols));
        return ResponseEntity.ok("Game created");
    }

    @PostMapping("/resetGame/{roomID}")
    public ResponseEntity<String> resetGame(@PathVariable String roomID) {
        gameService.resetGame(roomID);
        return ResponseEntity.ok("Game reset");
    }

    @GetMapping("/getBoard/{roomID}")
    public ResponseEntity<int[][]> getBoard(@PathVariable String roomID) {
        return ResponseEntity.ok(gameService.getBoardState(roomID));
    }
}
