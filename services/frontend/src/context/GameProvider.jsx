import { createContext, Show, useContext, createEffect } from "solid-js";
import { createStore } from "solid-js/store";

import { useAuthState } from "./AuthProvider";

const GameStateContext = createContext();
const GameDispatchContext = createContext();

export default function GameProvider(props) {
  const authState = useAuthState();
  const [store, setStore] = createStore({
    roomID: null,
    inGame: false,
    messages: [],
    board: [
      ['b', '-', 'b', '-', '-', '-', 'b', '-'],
      ['-', 'b', '-', 'b', '-', '-', '-', 'b'],
      ['b', '-', 'b', '-', 'b', '-', 'b', '-'],
      ['-', '-', '-', '-', '-', '-', '-', '-'],
      ['-', '-', '-', '-', '-', '-', '-', '-'],
      ['-', 'r', '-', 'r', '-', 'r', '-', 'r'],
      ['r', '-', 'r', '-', 'r', '-', 'r', '-'],
      ['-', 'r', '-', 'r', '-', 'r', '-', 'r']
    ],
    activePlayer: 'r',
    aiDepthCutoff: 3,
    count: 0,
  });

  createEffect(() => {
    const socket = authState?.socket;
    if (socket) {
      socket.on("game:message-receive", (data) => {
        setStore("messages", [...store.messages, { username: data.username ? data.username : "anonymous", message: data.message, oponent: true }])
      });
    }
  });

  const joinRoom = async (form) => {
    const { id } = form;
    setStore("roomID", id)
    if (await join().catch(err => console.log(err))) {
      setStore("inGame", true);
    };
  };

  const leaveRoom = async () => {
    setStore("messages", [])
    if (await leave().catch(err => console.log(err))) {
      setStore("inGame", false);
    };
    setStore("roomID", null)
  };

  const sendMessage = async (form) => {
    const { message } = form;

    setStore("messages", [...store.messages, { username: authState.currentUser ? authState.currentUser : "anonymous", message: message, oponent: false }])
    await authState.socket.emit("game:message-send", { message: message, roomID: store.roomID });
  };

  const join = async () => {
    return new Promise((rs, rj) => {
      authState.socket.emit('game:join', { roomID: store.roomID });
      authState.socket.on('game_status:connected', () => rs(true));
      authState.socket.on('game:error', ({ error }) => rj(error));
    });
  };

  const leave = async () => {
    return new Promise((rs, rj) => {
      authState.socket.emit('game:leave', { roomID: store.roomID });
      authState.socket.on('game_status:leaved', () => rs(true));
      authState.socket.on('game:error', ({ error }) => rj(error));
    });
  };

  const handlePieceClick = (e) => {
    let rowIndex = parseInt(e.target.attributes['row'].nodeValue);
    let columnIndex = parseInt(e.target.attributes['column'].nodeValue);

    let boardCopy = store.board;
    if (boardCopy[rowIndex][columnIndex].indexOf(store.activePlayer) > -1) {
      boardCopy = boardCopy.map((row) => {
        return row.map((cell) => {
          return cell.replace('a', '')
        });
      });
      boardCopy[rowIndex][columnIndex] = 'a' + boardCopy[rowIndex][columnIndex];
      setStore('board', boardCopy);
      highlightPossibleMoves(rowIndex, columnIndex);
    }
    else if(boardCopy[rowIndex][columnIndex].indexOf('h') > -1) {
      boardCopy = executeMove(rowIndex, columnIndex, boardCopy, store.activePlayer);
      setStore('board', boardCopy);

      // if (this.winDetection(this.state.board, this.state.activePlayer)) {
      //   console.log(this.state.activePlayer+ ' won the game!');
      // }
      // else {
      //   this.state.activePlayer = (this.state.activePlayer == 'r' ? 'b' : 'r');
      //   if (this.state.activePlayer == 'b') {
      //     setTimeout(function() {this.ai();}.bind(this), 50);
      //   }
      // }
    }
  }

  const highlightPossibleMoves = (rowIndex, columnIndex) => {
    let boardCopy = store.board;
    boardCopy = boardCopy.map((row) => {
      return row.map((cell) => {
        return cell.replace('h', '-').replace(/d\d\d/g, '').trim()
      });
    });

    var possibleMoves = findAllPossibleMoves(rowIndex, columnIndex, boardCopy);

    for (var j = 0; j < possibleMoves.length; j++) {
      var buildHighlightTag = 'h ';
      for (var k = 0; k < possibleMoves[j].wouldDelete.length; k++) {
        buildHighlightTag += 'd' + String(possibleMoves[j].wouldDelete[k].targetRow) + String(possibleMoves[j].wouldDelete[k].targetColumn) + ' ';
      }
      boardCopy[possibleMoves[j].targetRow][possibleMoves[j].targetColumn] = buildHighlightTag;
    }

    setStore('board', boardCopy);
  }

  const findAllPossibleMoves = (rowIndex, columnIndex, board) => {
    var possibleMoves = [];
    var directionOfMotion = [];
    var leftOrRight = [1, -1];
    var isKing = board[rowIndex][columnIndex].indexOf('k') > -1;

    if (store.activePlayer == 'b') {
      directionOfMotion.push(1);
    }
    else {
      directionOfMotion.push(-1);
    }

    if (isKing) {
      directionOfMotion.push(directionOfMotion[0] * -1);
    }

    for (var j = 0; j < directionOfMotion.length; j++) {
      for (var i = 0; i < leftOrRight.length; i++) {
        if (
          typeof board[rowIndex + directionOfMotion[j]] !== 'undefined' &&
          typeof board[rowIndex + directionOfMotion[j]][columnIndex + leftOrRight[i]] !== 'undefined' &&
          board[rowIndex + directionOfMotion[j]][columnIndex + leftOrRight[i]] == '-'
        ) {
          if (possibleMoves.map((move) => { return String(move.targetRow) + String(move.targetColumn); }).indexOf(String(rowIndex + directionOfMotion[j]) + String(columnIndex + leftOrRight[i])) < 0) {
            possibleMoves.push({ targetRow: rowIndex + directionOfMotion[j], targetColumn: columnIndex + leftOrRight[i], wouldDelete: [] });
          }
        }
      }
    }

    var jumps = findAllJumps(rowIndex, columnIndex, board, directionOfMotion[0], [], [], isKing, store.activePlayer);

    for (var i = 0; i < jumps.length; i++) {
      possibleMoves.push(jumps[i]);
    }

    return possibleMoves;
  }

  const findAllJumps = (sourceRowIndex, sourceColumnIndex, board, directionOfMotion, possibleJumps, wouldDelete, isKing, activePlayer) => {
    var thisIterationDidSomething = false;
    var directions = [directionOfMotion];
    var leftOrRight = [1, -1];
    if (isKing) {
      directions.push(directions[0] * -1);
    }

    for (var k = 0; k < directions.length; k++) {
      for (var l = 0; l < leftOrRight.length; l++) {
        leftOrRight[l]
        if (
          typeof board[sourceRowIndex + directions[k]] !== 'undefined' &&
          typeof board[sourceRowIndex + directions[k]][sourceColumnIndex + leftOrRight[l]] !== 'undefined' &&
          typeof board[sourceRowIndex + (directions[k] * 2)] !== 'undefined' &&
          typeof board[sourceRowIndex + (directions[k] * 2)][sourceColumnIndex + (leftOrRight[l] * 2)] !== 'undefined' &&
          board[sourceRowIndex + directions[k]][sourceColumnIndex + leftOrRight[l]].indexOf((activePlayer == 'r' ? 'b' : 'r')) > -1 &&
          board[sourceRowIndex + (directions[k] * 2)][sourceColumnIndex + (leftOrRight[l] * 2)] == '-'
        ) {
          if (possibleJumps.map(function (move) { return String(move.targetRow) + String(move.targetColumn); }).indexOf(String(sourceRowIndex + (directions[k] * 2)) + String(sourceColumnIndex + (leftOrRight[l] * 2))) < 0) {
            var tempJumpObject = {
              targetRow: sourceRowIndex + (directions[k] * 2),
              targetColumn: sourceColumnIndex + (leftOrRight[l] * 2),
              wouldDelete: [
                {
                  targetRow: sourceRowIndex + directions[k],
                  targetColumn: sourceColumnIndex + leftOrRight[l]
                }
              ]
            };
            for (var i = 0; i < wouldDelete.length; i++) {
              tempJumpObject.wouldDelete.push(wouldDelete[i]);
            }
            possibleJumps.push(tempJumpObject);
            thisIterationDidSomething = true;
          }
        }
      }
    }

    if (thisIterationDidSomething) {
      for (var i = 0; i < possibleJumps.length; i++) {
        var coords = [possibleJumps[i].targetRow, possibleJumps[i].targetColumn];
        var children = findAllJumps(coords[0], coords[1], board, directionOfMotion, possibleJumps, possibleJumps[i].wouldDelete, isKing, activePlayer);
        for (var j = 0; j < children.length; j++) {
          if (possibleJumps.indexOf(children[j]) < 0) {
            possibleJumps.push(children[j]);
          }
        }
      }
    }

    return possibleJumps;
  }

  const executeMove = (rowIndex, cellIndex, board, activePlayer) => {
		var activePiece;
		for (var i = 0; i < board.length; i++) {
			//for each row
			for (var j = 0; j < board[i].length; j++) {
				if (board[i][j].indexOf('a')>-1) {
					activePiece = board[i][j];
				}
			}
		}

		var deletions = board[rowIndex][cellIndex].match(/d\d\d/g);
		if (typeof deletions !== undefined && deletions !== null && deletions.length > 0) {
			for (var k = 0; k < deletions.length; k++) {
				var deleteCoords = deletions[k].replace('d', '').split('');
				board[deleteCoords[0]][deleteCoords[1]] = '-';
			}
		}

		board = board.map((row)=>{return row.map((cell)=>{return cell.replace(activePiece, '-')});});
		board = board.map((row)=>{return row.map((cell)=>{return cell.replace('h', '-').replace(/d\d\d/g, '').trim()});}); 

		board[rowIndex][cellIndex] = activePiece.replace('a', '');
		if ( (activePlayer == 'b' && rowIndex == 7) || (activePlayer == 'r' && rowIndex == 0) ) {
			board[rowIndex][cellIndex]+= ' k';
		}		
		return board;
	}

  return (
    <GameStateContext.Provider value={store}>
      <GameDispatchContext.Provider
        value={{
          joinRoom,
          leaveRoom,
          sendMessage,
          handlePieceClick
        }}
      >
        <Show when={!store.isLoading} fallback={<div>Wait...</div>}>
          {props.children}
        </Show>
      </GameDispatchContext.Provider>
    </GameStateContext.Provider>
  );
}

export const useGameState = () => useContext(GameStateContext);
export const useGameDispatch = () => useContext(GameDispatchContext);
