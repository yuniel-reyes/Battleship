import { ComputerBoard, checkFitComputer } from "./ComputerBoard.js";
import { Gameboard } from "./Gameboard.js";

function UI() {
  const player1Board = Gameboard("player1Board");
  const computerBoard = ComputerBoard("computerBoard");
  const nodeRef = {
    app: document.getElementById("app"),
    rotationBtn: null,
    allShipsPlaced: false,
    computerGrid: null,
  };

  // common function
  // check if ships and update ships placing
  // if not ships, all placed
  function checkIfShipsUI() {
    if (player1Board.shipsToPlaceObj.length !== 0) {
      nodeRef.shipText.textContent = ` ${
        Object.entries(player1Board.shipsToPlaceObj[0])[0][0]
      }`;
      return false;
    } else {
      nodeRef.rotationBtn.remove();
      document.getElementById("place-boats-text-container").remove();
      nodeRef.allShipsPlaced = true;
      // console.log(computerBoard);
    }
  }

  // HORIZONTAL LOGIC
  // check there is no ship where attemp to place one
  function noShipsCheckHorizontal(e, gridNumber, shipLength) {
    const cellsToBeColored = Number(gridNumber) + Number(shipLength) - 1;
    const classArr = [];

    Array.from(e.target.parentElement.children).forEach((eachCell) => {
      if (
        Number(eachCell.dataset.gridNumber) >=
          Number(e.target.dataset.gridNumber) &&
        eachCell.dataset.gridNumber <= cellsToBeColored
      ) {
        classArr.push(eachCell.className);
      }
    });

    const processedArr = classArr.join(" ").split(" ");

    return processedArr;
  }

  function removeColoringHorizontal(ev, e, cellsToBeColored) {
    Array.from(ev.target.parentElement.children).forEach((eachCell2) => {
      if (
        Number(eachCell2.dataset.gridNumber) >=
          Number(e.target.dataset.gridNumber) &&
        eachCell2.dataset.gridNumber <= cellsToBeColored
      ) {
        eachCell2.classList.remove("grid-content-colored");
      }
    });
  }

  function movingToOtherCellsHorizontal(e, gridNumber, shipLength) {
    const cellsToBeColored = Number(gridNumber) + Number(shipLength) - 1;

    e.composedPath()[0].addEventListener(
      "mouseleave",
      (ev) => {
        removeColoringHorizontal(ev, e, cellsToBeColored);
      },
      { once: true }
    );
  }

  function cellsToBeSelectedHorizontal(e, gridNumber, shipLength) {
    // console.log(noShipsCheckHorizontal(e, gridNumber, shipLength));
    const cellsToBeColored = Number(gridNumber) + Number(shipLength) - 1;
    if (
      !noShipsCheckHorizontal(e, gridNumber, shipLength).includes("ship-here")
    ) {
      Array.from(e.target.parentElement.children).forEach((eachCell) => {
        if (
          Number(eachCell.dataset.gridNumber) >=
            Number(e.target.dataset.gridNumber) &&
          eachCell.dataset.gridNumber <= cellsToBeColored
        ) {
          eachCell.classList.add("grid-content-colored");
        }
      });
    }
  }

  function selectedCellsHorizontal(evHorizontal, e, cellsToBeColored) {
    const coord = [];
    Array.from(evHorizontal.target.parentElement.children).forEach(
      (eachCell2) => {
        if (
          Number(eachCell2.dataset.gridNumber) >=
            Number(e.target.dataset.gridNumber) &&
          eachCell2.dataset.gridNumber <= cellsToBeColored
        ) {
          eachCell2.classList.add("ship-here");
          coord.push(eachCell2.dataset.gridNumber);
        }
      }
    );

    // console.table(coord);
    return coord;
  }

  function selecThisCellsHorizontal(e, gridNumber, shipLength) {
    const cellsToBeColored = Number(gridNumber) + Number(shipLength) - 1;
    if (
      !noShipsCheckHorizontal(e, gridNumber, shipLength).includes("ship-here")
    ) {
      e.composedPath()[0].addEventListener(
        "mouseup",
        (evHorizontal) => {
          // console.dir(ev);
          const coord = selectedCellsHorizontal(
            evHorizontal,
            e,
            cellsToBeColored
          );
          // for some reason I dont get the listener is
          // being called more than once on mouseup
          // stop stopImmediatePropagation will remove
          //any remaining listener in the element
          evHorizontal.stopImmediatePropagation();
          // console.log(evHorizontal.detail);
          // place ships on board
          player1Board.placeShip(
            Object.entries(player1Board.shipsToPlaceObj[0])[0][0],
            Object.entries(player1Board.shipsToPlaceObj[0])[0][1],
            "horizontal",
            coord
          );
          // remove recent placed shiip
          player1Board.shipsToPlaceObj.shift();
          checkIfShipsUI();
          // console.dir(evHorizontal);
        },
        { signal: AbortSignal.timeout(1000) } // this will remove the listener after 1 second
      );
    }
  }

  // Algorithm to see if fit when horizontal rotation
  function checkFitHorizontal(e) {
    // get ship length = 5
    const shipLength = Object.entries(player1Board.shipsToPlaceObj[0])[0][1];
    const gridNumber = e.target.dataset.gridNumber;
    let gridMult = Number(gridNumber);
    while (gridMult % 10) {
      gridMult += 1;
    }
    const rest = gridMult - gridNumber + 1;
    if (rest >= Number(shipLength)) {
      cellsToBeSelectedHorizontal(e, gridNumber, shipLength);
      movingToOtherCellsHorizontal(e, gridNumber, shipLength);
      selecThisCellsHorizontal(e, gridNumber, shipLength);
    } else {
      // console.log("Saying no");
    }
  }

  // VERTICAL LOGIC
  // check no ship in any of the selected cell
  function noShipsCheckVertical(e, coord) {
    const classArr = [];

    Array.from(e.target.parentElement.children).forEach((eachCell) => {
      coord.forEach((num) => {
        if (Number(eachCell.dataset.gridNumber) === num) {
          classArr.push(eachCell.className);
        }
      });
    });
    const processedArr = classArr.join(" ").split(" ");

    return processedArr;
  }

  function selectedCellsVertical(ev, e, coord) {
    Array.from(ev.target.parentElement.children).forEach((eachCell) => {
      coord.forEach((num) => {
        if (Number(eachCell.dataset.gridNumber) === num) {
          eachCell.classList.add("ship-here");
        }
      });
    });
  }

  function selecThisCellsVertical(e, coord) {
    if (!noShipsCheckVertical(e, coord).includes("ship-here")) {
      e.composedPath()[0].addEventListener(
        "mouseup",
        (ev) => {
          selectedCellsVertical(ev, e, coord);
          ev.stopImmediatePropagation();
          // place ships on board
          player1Board.placeShip(
            Object.entries(player1Board.shipsToPlaceObj[0])[0][0],
            Object.entries(player1Board.shipsToPlaceObj[0])[0][1],
            "vertical",
            coord
          );
          // remove recent placed shiip
          player1Board.shipsToPlaceObj.shift();
          checkIfShipsUI();
        },
        { signal: AbortSignal.timeout(1000) } // this will remove the listener after 1 second
      );
    }
  }

  const removeColoringVertical = (ev, coord) => {
    Array.from(ev.target.parentElement.children).forEach((eachCell) => {
      coord.forEach((num) => {
        if (Number(eachCell.dataset.gridNumber) === num) {
          eachCell.classList.remove("grid-content-colored");
        }
      });
    });
  };

  const movingToOtherCellsVertical = (e, coord) => {
    e.composedPath()[0].addEventListener(
      "mouseleave",
      (ev) => {
        removeColoringVertical(ev, coord);
      },
      { once: true }
    );
  };

  const cellsToBeSelectedVertical = (e, coord) => {
    Array.from(e.target.parentElement.children).forEach((eachCell) => {
      coord.forEach((num) => {
        if (
          Number(eachCell.dataset.gridNumber) === num &&
          !noShipsCheckVertical(e, coord).includes("ship-here")
        ) {
          eachCell.classList.add("grid-content-colored");
        }
      });
    });
  };

  // Algorith to see if fit when vertical rotation
  const checkFitVertical = (e) => {
    // get ship length = 5
    const shipLength = Object.entries(player1Board.shipsToPlaceObj[0])[0][1];
    const gridNumber = e.target.dataset.gridNumber;
    const coord = [Number(gridNumber)];
    let nextCoord = Number(gridNumber);

    for (let counter = 1; counter < shipLength; counter++) {
      nextCoord = nextCoord + 10;
      if (nextCoord > 100) {
        break;
      } else {
        coord.push(nextCoord);
      }

      // call cellsToBeSelectedVertical if number added
      if (Number(shipLength) === coord.length) {
        cellsToBeSelectedVertical(e, coord);
        movingToOtherCellsVertical(e, coord);
        selecThisCellsVertical(e, coord);
      }
    }
  };

  const checkIfFit = (e) => {
    // only if there are still ships to be placed
    if (player1Board.shipsToPlaceObj.length !== 0) {
      if (nodeRef.rotationBtn.className === "horizontal") {
        checkFitHorizontal(e);
      } else {
        checkFitVertical(e);
      }
    }
  };

  // change rotation
  function changeRotation(e) {
    e.target.className === "horizontal"
      ? (e.target.className = "vertical")
      : (e.target.className = "horizontal");
  }

  // render board base on player1
  const player1BoardWelcome = () => {
    const welcomeBoard1 = document.createElement("div");
    welcomeBoard1.setAttribute("id", "welcomeBoard1");

    const placeYourBoats = document.createElement("div");
    placeYourBoats.setAttribute("id", "place-your-boats");

    const placeYourBoatsTextCont = document.createElement("div");
    placeYourBoatsTextCont.setAttribute("id", "place-boats-text-container");
    const placeYourBoatsText1 = document.createElement("h2");
    placeYourBoatsText1.setAttribute("id", "welcome-text");
    placeYourBoatsText1.textContent = "Welcome to Battleship";
    placeYourBoatsTextCont.appendChild(placeYourBoatsText1);
    placeYourBoats.appendChild(placeYourBoatsTextCont);

    const placeYourBoatsText2 = document.createElement("h2");
    placeYourBoatsText2.setAttribute("id", "place-ship-text");
    placeYourBoatsText2.textContent = "Place your";
    const placeYourBoatsText2Span = document.createElement("span");
    placeYourBoatsText2Span.setAttribute("id", "ship-text");
    placeYourBoatsText2Span.textContent = ` ${
      Object.entries(player1Board.shipsToPlaceObj[0])[0][0]
    }`;
    placeYourBoatsText2.appendChild(placeYourBoatsText2Span);
    placeYourBoatsTextCont.appendChild(placeYourBoatsText2);
    nodeRef.shipText = placeYourBoatsText2Span;

    const TextContainer = document.createElement("div");
    TextContainer.setAttribute("class", "text-banner player");

    const text_1 = document.createElement("h4");
    text_1.textContent = "Your boats";

    const text_2 = document.createElement("h4");
    text_2.addEventListener("click", changeRotation);
    text_2.setAttribute("id", "rotate-button");
    text_2.setAttribute("class", "horizontal");
    text_2.textContent = "Rotate";
    nodeRef.rotationBtn = text_2;

    const boardGrids = document.createElement("div");
    boardGrids.setAttribute("id", "player-board-grid");

    TextContainer.appendChild(text_1);
    TextContainer.appendChild(text_2);

    // // create grid-player1
    for (
      let eachGridPlayer1 = 0;
      eachGridPlayer1 <= player1Board.defaultCoordinates.length;
      eachGridPlayer1++
    ) {
      // create each grid
      let eachGrid = document.createElement("div");
      eachGrid.setAttribute("class", "grid-content");
      eachGrid.dataset.gridNumber =
        undefined !== player1Board.defaultCoordinates[eachGridPlayer1]
          ? player1Board.defaultCoordinates[eachGridPlayer1]
          : 100;
      player1Board.defaultCoordinates[eachGridPlayer1];
      eachGrid.addEventListener("mouseenter", checkIfFit);
      boardGrids.appendChild(eachGrid);
    }

    nodeRef.app.appendChild(placeYourBoatsTextCont);

    welcomeBoard1.appendChild(TextContainer);
    welcomeBoard1.appendChild(boardGrids);
    placeYourBoats.appendChild(welcomeBoard1);
    nodeRef.app.appendChild(placeYourBoats);
  };

  // ==== COMPUTER =======
  // render computer board
  const renderComputerBoard = () => {
    const computerBoardContainer = document.createElement("div");
    computerBoardContainer.setAttribute("id", "computer-board-container");

    const textContainerComputer = document.createElement("div");
    textContainerComputer.setAttribute("id", "text-container-computer");
    const textComputer = document.createElement("h4");
    textComputer.textContent = "Waiting....";
    textContainerComputer.appendChild(textComputer);

    const boardGridsComputer = document.createElement("div");
    boardGridsComputer.setAttribute("id", "computer-board-grid");

    // add grid to computer grid container
    for (
      let eachGridComputerCounter = 0;
      eachGridComputerCounter <= computerBoard.defaultCoordinates.length;
      eachGridComputerCounter++
    ) {
      // create each grid
      let eachGridComputer = document.createElement("div");
      eachGridComputer.setAttribute("class", "grid-content-computer");
      eachGridComputer.dataset.gridComputerNumber =
        undefined !== computerBoard.defaultCoordinates[eachGridComputerCounter]
          ? computerBoard.defaultCoordinates[eachGridComputerCounter]
          : 100;

      boardGridsComputer.appendChild(eachGridComputer);
    }
    computerBoardContainer.appendChild(textContainerComputer);
    computerBoardContainer.appendChild(boardGridsComputer);
    // nodeRef.app.appendChild(computerBoardContainer);
    document
      .getElementById("place-your-boats")
      .appendChild(computerBoardContainer);
    nodeRef.computerGrid = document.getElementById("computer-board-grid");
  };

  function checkIfShipsComputer() {
    while (computerBoard.shipsToPlaceObj.length !== 0) {
      checkFitComputer(computerBoard.randomPosition());
    }
    if (computerBoard.shipsToPlaceObj.length === 0) {
      console.log(computerBoard.PlacedShips);
    }
  }

  function checkFitComputer(string) {
    const randomNum = computerBoard.randomNumber();
    // console.log(string);
    if (string === "horizontal") {
      checkFitComputerHorizontal(randomNum);
      // console.log("horizontal");
    } else {
      checkFitComputerVertical(randomNum);
      // console.log("vertical");
    }
  }

  // HORIZONTAL
  function checkFitComputerHorizontal(randomNum) {
    // get ship length = 5
    const shipLength = Object.entries(computerBoard.shipsToPlaceObj[0])[0][1];
    // console.log({ randomNum });
    const gridNumber = randomNum; //
    let gridMult = randomNum;
    while (gridMult % 10) {
      // get the closest multiple of 10
      gridMult += 1;
    }
    const rest = gridMult - gridNumber + 1;
    // if rest is greater or equal the ship size,
    // then the ship fits; place ship
    if (rest >= Number(shipLength)) {
      selecThisCellsComputerHorizontal(randomNum, shipLength);
    } else {
      checkFitComputerHorizontal(computerBoard.randomNumber());
      // console.log(computerBoard.PlacedShips);
    }
  }

  function selectedCellsComputerHorizontal(randomNum, shipLength) {
    const cellsToBeColored = Number(randomNum) + Number(shipLength) - 1;
    const classArr = [];
    const coord = [];
    Array.from(nodeRef.computerGrid.children).forEach((eachCell) => {
      if (
        Number(eachCell.dataset.gridComputerNumber >= randomNum) &&
        eachCell.dataset.gridComputerNumber <= cellsToBeColored
      ) {
        eachCell.classList.add("ship-computer-here");
      }
    });
  }

  function noShipsCheckComputerHorizontal(randomNum, shipLength) {
    const cellsToBeColored = Number(randomNum) + Number(shipLength) - 1;
    const classArr = [];
    const coord = [];
    Array.from(nodeRef.computerGrid.children).forEach((eachCell) => {
      if (
        Number(eachCell.dataset.gridComputerNumber >= randomNum) &&
        eachCell.dataset.gridComputerNumber <= cellsToBeColored
      ) {
        classArr.push(eachCell.className);
        coord.push(Number(eachCell.dataset.gridComputerNumber));
      }
    });

    const processedArr = classArr.join(" ").split(" ");

    return [processedArr, coord];
  }

  function selecThisCellsComputerHorizontal(randomNum, shipLength) {
    const coordAndClass = noShipsCheckComputerHorizontal(randomNum, shipLength);
    // const classArr = noShipsCheckComputerHorizontal(randomNum, shipLength)[0];
    if (!coordAndClass[0].includes("ship-computer-here")) {
      selectedCellsComputerHorizontal(randomNum, shipLength);
      computerBoard.placeShip(
        Object.entries(computerBoard.shipsToPlaceObj[0])[0][0],
        Object.entries(computerBoard.shipsToPlaceObj[0])[0][1],
        "horizontal",
        coordAndClass[1]
      );
    }
    if (coordAndClass[0].includes("ship-computer-here")) {
      return checkFitComputerHorizontal(computerBoard.randomNumber());
    }
    // remove recent placed ship
    computerBoard.shipsToPlaceObj.shift();
    checkIfShipsComputer();
  }

  // VERTICAL - COMPUTER
  function selectedCellsComputerVertical(coord) {
    // console.log({ coord });
    Array.from(nodeRef.computerGrid.children).forEach((eachCell) => {
      coord.forEach((num) => {
        if (Number(eachCell.dataset.gridComputerNumber) === num) {
          eachCell.classList.add("ship-computer-here");
        }
      });
    });
  }

  function noShipsCheckComputerVertical(coord) {
    // console.log({ coord });
    const classArr = [];
    Array.from(nodeRef.computerGrid.children).forEach((eachCell) => {
      coord.forEach((num) => {
        if (Number(eachCell.dataset.gridComputerNumber) === num) {
          classArr.push(eachCell.className);
        }
      });
    });

    const processedArr = classArr.join(" ").split(" ");

    return processedArr;
  }

  function cellsToBeSelectedComputerVertical(coord) {
    // console.log({ coord });
    const shipHere = noShipsCheckComputerVertical(coord);
    if (!noShipsCheckComputerVertical(coord).includes("ship-computer-here")) {
      selectedCellsComputerVertical(coord);
      computerBoard.placeShip(
        Object.entries(computerBoard.shipsToPlaceObj[0])[0][0],
        Object.entries(computerBoard.shipsToPlaceObj[0])[0][1],
        "vertical",
        coord
      );
    } else {
      return checkFitComputerVertical(computerBoard.randomNumber());
    }
    computerBoard.shipsToPlaceObj.shift();
    checkIfShipsComputer();
  }

  function checkFitComputerVertical(randomNum) {
    // console.log(randomNum);
    const shipLength = Object.entries(computerBoard.shipsToPlaceObj[0])[0][1];
    const gridNumber = randomNum;
    const coord = [Number(gridNumber)];
    let nextCoord = Number(gridNumber);

    for (let counter = 1; counter < shipLength; counter++) {
      nextCoord = nextCoord + 10;
      if (nextCoord > 100) {
        break;
      } else {
        coord.push(nextCoord);
      }
    }

    // call cellsToBeSelectedVertical if number added
    if (Number(shipLength) === coord.length) {
      cellsToBeSelectedComputerVertical(coord);
    } else {
      checkFitComputerVertical(computerBoard.randomNumber());
    }
  }

  return {
    player1BoardWelcome,
    renderComputerBoard,
    player1Board,
    computerBoard,
    checkIfShipsComputer,
  };
}
export { UI };
