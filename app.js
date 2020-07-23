document.addEventListener("DOMContentLoaded", () => {
  const squares = document.querySelectorAll(".grid div");
  const scoreDisplay = document.querySelector(".score");
  const infoDisplay = document.querySelector(".info");
  const startButton = document.querySelector(".start");

  const maxRows = 4;
  const maxColumns = 4;
  var debug = false;
  //   debug = !debug;

  var score = 0;
  var gameOver = true;

  var board = [
    [0, 0, 0, 0],
    [0, 0, 0, 0],
    [0, 0, 0, 0],
    [0, 0, 0, 0],
  ];

  // const directions = {
  //      RIGHT: 39,
  //     UP: 38,
  //     LEFT: 37,
  //     DOWN: 40,
  // }
  //
  // const playerActions = ["LEFT", "RIGHT", "UP", "DOWN"];

  board = [
    [0, 2, 4, 8],
    [16, 32, 64, 128],
    [256, 512, 1024, 2048],
    [4096, 8192, 16384, 0],
  ];
  redrawBoard(board);

  function movePieces(action, addScore) {
    // copy current game board
    var newBoard = [
      [0, 0, 0, 0],
      [0, 0, 0, 0],
      [0, 0, 0, 0],
      [0, 0, 0, 0],
    ];
    // Do one set of Logic for LEFT
    if (action === "LEFT") {
      // line check is default for left direction
      let line = Array();
      let newLine = Array();
      for (let i = 0; i < board.length; i++) {
        for (let j = 0; j < board[i].length; j++) {
          line.push(board[i][j]);

          if (line.length === 4) {
            newLine = lineCheck(line, addScore);
            newBoard[i][0] = newLine[0];
            newBoard[i][1] = newLine[1];
            newBoard[i][2] = newLine[2];
            newBoard[i][3] = newLine[3];
            line = Array(); // reset line
            newLine = Array();
          }
        }
      }
    } else if (action === "RIGHT") {
      let line = Array();
      let newLine = Array();
      for (let i = 0; i < board.length; i++) {
        for (let j = board[i].length - 1; j >= 0; j--) {
          line.push(board[i][j]);
          if (line.length === 4) {
            newLine = lineCheck(line, addScore);
            newBoard[i][0] = newLine[3];
            newBoard[i][1] = newLine[2];
            newBoard[i][2] = newLine[1];
            newBoard[i][3] = newLine[0];
            line = Array(); // reset line
            newLine = Array();
          }
        }
      }
    } else if (action === "UP") {
      let line = Array();
      let newLine = Array();
      for (let j = 0; j < maxColumns; j++) {
        for (let i = 0; i < maxRows; i++) {
          line.push(board[i][j]);

          if (line.length === 4) {
            newLine = lineCheck(line, addScore);
            newBoard[0][j] = newLine[0];
            newBoard[1][j] = newLine[1];
            newBoard[2][j] = newLine[2];
            newBoard[3][j] = newLine[3];
            line = Array(); // reset line
            newLine = Array();
          }
        }
      }
    } else if (action === "DOWN") {
      let line = Array();
      let newLine = Array();
      for (let j = 0; j < maxColumns; j++) {
        for (let i = maxRows - 1; i >= 0; i--) {
          line.push(board[i][j]);

          if (line.length === 4) {
            newLine = lineCheck(line, addScore);
            newBoard[0][j] = newLine[3];
            newBoard[1][j] = newLine[2];
            newBoard[2][j] = newLine[1];
            newBoard[3][j] = newLine[0];
            line = Array(); // reset line
            newLine = Array();
          }
        }
      }
    }

    return newBoard;
  }

  function lineCheck(line, addScore) {
    var len = line.length;
    var newLine = Array();
    var lineScore = 0;

    // remove zeroes
    for (let i = 0; i < line.length; i++) {
      if (line[i] > 0) {
        newLine.push(line[i]);
      }
    }

    // add zeroes so array
    while (newLine.length < len) {
      newLine.push(0);
    }

    // determine the line logic where first elements has more presidents
    // newline[0] = a
    // newline[1] = b
    // newline[2] = c
    // newline[3] = d
    if (
      newLine[0] === newLine[1] &&
      newLine[1] !== newLine[2] &&
      newLine[2] !== newLine[3]
    ) {
      newLine[0] = newLine[0] + newLine[1];
      newLine[1] = newLine[2];
      newLine[2] = newLine[3];
      newLine[3] = 0;
      lineScore += newLine[0];
    } else if (
      newLine[0] === newLine[1] &&
      newLine[1] === newLine[2] &&
      newLine[2] !== newLine[3]
    ) {
      newLine[0] = newLine[0] + newLine[1];
      newLine[1] = newLine[2];
      newLine[2] = newLine[3];
      newLine[3] = 0;
      lineScore += newLine[0];
    } else if (
      newLine[0] !== newLine[1] &&
      newLine[1] === newLine[2] &&
      newLine[2] === newLine[3]
    ) {
      newLine[0] = newLine[0];
      newLine[1] = newLine[1] + newLine[2];
      newLine[2] = newLine[3];
      newLine[3] = 0;
      lineScore += newLine[1];
    } else if (
      newLine[0] === newLine[1] &&
      newLine[1] !== newLine[2] &&
      newLine[2] === newLine[3]
    ) {
      newLine[0] = newLine[0] + newLine[1];
      newLine[1] = newLine[2] + newLine[3];
      newLine[2] = 0;
      newLine[3] = 0;
      lineScore += newLine[0];
      lineScore += newLine[1];
    } else if (
      newLine[0] !== newLine[1] &&
      newLine[1] !== newLine[2] &&
      newLine[2] === newLine[3]
    ) {
      newLine[0] = newLine[0];
      newLine[1] = newLine[1];
      newLine[2] = newLine[2] + newLine[3];
      newLine[3] = 0;
      lineScore += newLine[2];
    } else if (
      newLine[0] !== newLine[1] &&
      newLine[1] === newLine[2] &&
      newLine[2] !== newLine[3]
    ) {
      newLine[0] = newLine[0];
      newLine[1] = newLine[1] + newLine[2];
      newLine[2] = newLine[3];
      newLine[3] = 0;
      lineScore += newLine[1];
    } else if (
      newLine[0] === newLine[1] &&
      newLine[1] === newLine[2] &&
      newLine[2] === newLine[3]
    ) {
      newLine[0] = newLine[0] + newLine[1];
      newLine[1] = newLine[2] + newLine[3];
      newLine[2] = 0;
      newLine[3] = 0;
      lineScore += newLine[1];
      lineScore += newLine[2];
    } else {
      newLine[0] = newLine[0];
      newLine[1] = newLine[1];
      newLine[2] = newLine[2];
      newLine[3] = newLine[3];
    }

    if (addScore) {
      score += lineScore;
      scoreDisplay.textContent = score;
    }
    return newLine;
  }

  function redrawBoard(newBoard) {
    // redraw the board
    for (let i = 0; i < board.length; i++) {
      for (let j = 0; j < board[i].length; j++) {
        // position of the square to modify
        var position = i * 4 + j;

        // old values
        var oldValue = board[i][j];
        if (oldValue > 0) {
          squares[position].classList.remove("tile" + oldValue);
          squares[position].textContent = "";
        }

        // assign new values
        var newValue = newBoard[i][j];
        board[i][j] = newValue;
        if (newValue > 0) {
          squares[position].classList.add("tile" + newValue);
          squares[position].textContent = newValue;
        }
      }
    }
    board = newBoard;
  }

  function changeDetected(newBoard) {
    for (let i = 0; i < board.length; i++) {
      for (let j = 0; j < board[i].length; j++) {
        if (board[i][j] !== newBoard[i][j]) return true;
      }
    }
    return false;
  }

  function canMoveNext() {
    // if board space is empty you can move
    var isEmpty = emptySpace();
    if (isEmpty) return true;

    var moveLeft = movePieces("LEFT", false);
    var changeLeft = changeDetected(moveLeft);
    var moveRight = movePieces("RIGHT", false);
    var changeRight = changeDetected(moveRight);
    var moveUp = movePieces("UP", false);
    var changeUp = changeDetected(moveUp);
    var moveDown = movePieces("DOWN", false);
    var changeDown = changeDetected(moveDown);

    if (!changeLeft && !changeRight && !changeUp && !changeDown) {
      return false;
    }
    return true;
  }

  function performMove(action) {
    movePieces(action);
    var nb = movePieces(action, true);
    var hasChanged = changeDetected(nb);
    redrawBoard(nb);
    if (hasChanged) randomPiece();
    infoDisplay.textContent = action;
    if (!canMoveNext()) {
      infoDisplay.textContent = "Game over.";
      gameOver = true;
    }
  }

  // assign function to KeyCodes
  function control(e) {
    if (gameOver) return;
    var action = "";
    switch (e.keyCode) {
      case 39:
        // Right
        action = "RIGHT";
        performMove(action);
        break;

      case 38:
        // Up
        action = "UP";
        performMove(action);
        break;

      case 37:
        // Left
        action = "LEFT";
        performMove(action);
        break;

      case 40:
        //DOWN
        action = "DOWN";
        performMove(action);
        break;
    }

    if (debug) alert(action);
  } // control(e)

  function emptySpace() {
    for (let i = 0; i < board.length; i++) {
      for (let j = 0; j < board[i].length; j++) {
        if (board[i][j] === 0) return true;
      }
    }
    return false;
  } // emptySpace()

  function randomPiece() {
    if (!emptySpace()) {
      if (debug) alert("gameOver no space left");
      infoDisplay.textContent = "Game over. No space left on the board.";
      gameOver = true;
      return;
    }
    var placed = false;
    while (!placed) {
      // piece value is 2 or 4
      // 2 90% drop rate
      // 4 10% drop rate
      var piece = Math.random() < 0.9 ? 2 : 4;
      // on the board choose row and col that is hopefully empty to place new piece
      var i = Math.floor(Math.random() * 4);
      var j = Math.floor(Math.random() * 4);
      if (board[i][j] === 0) {
        var position = i * 4 + j;
        board[i][j] = piece;
        squares[position].classList.add("tile" + piece);
        squares[position].textContent = piece;
        placed = true;
      }
    }
  } // randomPiece()

  function startGame() {
    if (!gameOver) return; // Prevent override a current game

    // Initialize the game
    for (let i = 0; i < board.length; i++) {
      for (let j = 0; j < board[i].length; j++) {
        var oldValue = board[i][j];
        var position = i * 4 + j;
        if (oldValue > 0) {
          squares[position].classList.remove("tile" + oldValue);
          squares[position].textContent = "";
        }
        board[i][j] = 0;
      }
    }
    infoDisplay.textContent = "New game.";
    score = 0;
    scoreDisplay.textContent = score;

    // 2 random pieces
    randomPiece();
    randomPiece();

    // Allow input from user
    gameOver = false;
  } // startGame()

  document.addEventListener("keyup", control);
  startButton.addEventListener("click", startGame);
});
