import { Gameboard } from "./Gameboard.js";
// import { NodeReferences } from "./components/nodeRef.js";

function UI() {
  const player1Board = Gameboard("player1Board");
  const computerBoard = Gameboard("computerBoard");
  const nodeRef = {
    app: document.getElementById("app"),
    rotationBtn: null,
  };

  function removeColoring(ev, e, cellsToBeColored) {
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

  const movingToOtherCells = (e, gridNumber, shipLength) => {
    const cellsToBeColored = Number(gridNumber) + Number(shipLength) - 1;

    e.composedPath()[0].addEventListener(
      "mouseleave",
      (ev) => {
        removeColoring(ev, e, cellsToBeColored);
      },
      { once: true }
    );
  };

  const cellsToBeSelected = (e, gridNumber, shipLength) => {
    const cellsToBeColored = Number(gridNumber) + Number(shipLength) - 1;
    Array.from(e.target.parentElement.children).forEach((eachCell) => {
      if (
        Number(eachCell.dataset.gridNumber) >=
          Number(e.target.dataset.gridNumber) &&
        eachCell.dataset.gridNumber <= cellsToBeColored
      ) {
        eachCell.classList.add("grid-content-colored");
      }
    });
  };

  function selectedCells(ev, e, cellsToBeColored) {
    const coord = [];
    Array.from(ev.target.parentElement.children).forEach((eachCell2) => {
      if (
        Number(eachCell2.dataset.gridNumber) >=
          Number(e.target.dataset.gridNumber) &&
        eachCell2.dataset.gridNumber <= cellsToBeColored
      ) {
        eachCell2.classList.add("ship-here");
        coord.push(eachCell2.dataset.gridNumber);
      }
    });

    return coord;
  }

  const selecThisCells = (e, gridNumber, shipLength) => {
    const cellsToBeColored = Number(gridNumber) + Number(shipLength) - 1;
    if (!e.target.className.includes("ship-here")) {
      e.composedPath()[0].addEventListener("mouseup", (ev) => {
        const coord = selectedCells(ev, e, cellsToBeColored);
        // place ships on board
        player1Board.placeShip(
          Object.entries(player1Board.shipsToPlaceObj[0])[0][0],
          Object.entries(player1Board.shipsToPlaceObj[0])[0][1],
          "horizontal",
          coord
        );
        // remove recent placed shiip
        player1Board.shipsToPlaceObj.shift();
      });
    }
  };

  // Algorith to see if fit when horizontal rotation
  const checkFitHorizontal = (e) => {
    // get ship length = 5
    const shipLength = Object.entries(player1Board.shipsToPlaceObj[0])[0][1];
    // grid number = 5
    const gridNumber = e.target.dataset.gridNumber;
    // console.log(gridNumber);
    // check if ship fit: 9 + 5 = 14
    // line up to 10
    // most closer multiple of 10
    // need to know the distance from gridNumber up to next
    // multiple of 10
    // Algorith: start counting from gridNumber up to multiple
    // if multiple found:
    // - (substract multiple with grid) + 1
    // if rest >= shipLength, fit = true
    // else fit = false
    let gridMult = Number(gridNumber);
    while (gridMult % 10) {
      gridMult += 1;
    }
    const rest = gridMult - gridNumber + 1;
    // console.log(`${rest} ${Number(gridNumber)}`);
    if (rest >= Number(shipLength)) {
      cellsToBeSelected(e, gridNumber, shipLength);
      movingToOtherCells(e, gridNumber, shipLength);
      selecThisCells(e, gridNumber, shipLength);
    } else {
      // console.log("Saying no");
    }
  };

  const checkIfFit = (e) => {
    // only if there are still ships to be placed
    if (player1Board.shipsToPlaceObj.length !== 0) {
      if (nodeRef.rotationBtn.className === "horizontal") {
        checkFitHorizontal(e);
      }
    }
  };

  // change rotation
  function changeRotation(e) {
    e.target.className === "horizontal"
      ? (e.target.className = "vertical")
      : (e.target.className = "horizontal");
  }

  // // render board base on player1
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

    const placeYourBoatsText2 = document.createElement("h2");
    placeYourBoatsText2.setAttribute("id", "place-ship-text");
    placeYourBoatsText2.textContent = "Place your";
    const placeYourBoatsText2Span = document.createElement("span");
    placeYourBoatsText2Span.setAttribute("id", "ship-text");
    placeYourBoatsText2Span.textContent = ` ${
      Object.keys(player1Board.shipsToPlaceObj)[0]
    }`;
    placeYourBoatsText2.appendChild(placeYourBoatsText2Span);

    placeYourBoatsTextCont.appendChild(placeYourBoatsText1);
    placeYourBoatsTextCont.appendChild(placeYourBoatsText2);
    placeYourBoats.appendChild(placeYourBoatsTextCont);

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

    welcomeBoard1.appendChild(TextContainer);
    welcomeBoard1.appendChild(boardGrids);
    placeYourBoats.appendChild(welcomeBoard1);
    nodeRef.app.appendChild(placeYourBoats);
  };

  return { player1Board, player1BoardWelcome }; //player1BoardWelcome
}
export { UI };
