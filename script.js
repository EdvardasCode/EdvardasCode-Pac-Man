const grid = document.querySelector(".grid");
const score = document.querySelector("#score");

const width = 28;

let squares = [];

// 28 by 28 squres
// 0 - pac-dots
// 1 - wall
// 2 - ghost-lair
// 3 - power-pellet
// 4 - empty
// prettier-ignore
const layout = [
    1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,
    1,0,0,0,0,0,0,0,0,0,0,0,0,1,1,0,0,0,0,0,0,0,0,0,0,0,0,1,
    1,0,1,1,1,1,0,1,1,1,1,1,0,1,1,0,1,1,1,1,1,0,1,1,1,1,0,1,
    1,3,1,1,1,1,0,1,1,1,1,1,0,1,1,0,1,1,1,1,1,0,1,1,1,1,3,1,
    1,0,1,1,1,1,0,1,1,1,1,1,0,1,1,0,1,1,1,1,1,0,1,1,1,1,0,1,
    1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,
    1,0,1,1,1,1,0,1,1,1,1,1,1,1,1,1,1,1,1,1,1,0,1,1,1,1,0,1,
    1,0,1,1,1,1,0,1,1,1,1,1,1,1,1,1,1,1,1,1,1,0,1,1,1,1,0,1,
    1,0,0,0,0,0,0,0,0,0,0,0,0,1,1,0,0,0,0,0,0,0,0,0,0,0,0,1,
    1,1,1,1,1,1,0,1,1,1,1,1,0,1,1,0,1,1,1,1,1,0,1,1,1,1,1,1,
    1,1,1,1,1,1,0,1,1,4,4,4,4,4,4,4,4,4,4,1,1,0,1,1,1,1,1,1,
    1,1,1,1,1,1,0,1,1,4,1,1,1,2,2,1,1,1,4,1,1,0,1,1,1,1,1,1,
    1,1,1,1,1,1,0,1,1,4,1,2,2,2,2,2,2,1,4,1,1,0,1,1,1,1,1,1,
    4,4,4,4,4,4,0,0,0,4,1,2,2,2,2,2,2,1,4,0,0,0,4,4,4,4,4,4,
    1,1,1,1,1,1,0,1,1,4,1,2,2,2,2,2,2,1,4,1,1,0,1,1,1,1,1,1,
    1,1,1,1,1,1,0,1,1,4,1,1,1,1,1,1,1,1,4,1,1,0,1,1,1,1,1,1,
    1,1,1,1,1,1,0,1,1,4,1,1,1,1,1,1,1,1,4,1,1,0,1,1,1,1,1,1,
    1,0,0,0,0,0,0,0,0,4,4,4,4,4,4,4,4,4,4,0,0,0,0,0,0,0,0,1,
    1,0,1,1,1,1,0,1,1,1,1,1,0,1,1,0,1,1,1,1,1,0,1,1,1,1,0,1,
    1,0,1,1,1,1,0,1,1,1,1,1,0,1,1,0,1,1,1,1,1,0,1,1,1,1,0,1,
    1,3,0,0,1,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,1,0,0,3,1,
    1,1,1,0,1,1,0,1,1,0,1,1,1,1,1,1,1,1,0,1,1,0,1,1,0,1,1,1,
    1,1,1,0,1,1,0,1,1,0,1,1,1,1,1,1,1,1,0,1,1,0,1,1,0,1,1,1,
    1,0,0,0,0,0,0,1,1,0,0,0,0,1,1,0,0,0,0,1,1,0,0,0,0,0,0,1,
    1,0,1,1,1,1,1,1,1,1,1,1,0,1,1,0,1,1,1,1,1,1,1,1,1,1,0,1,
    1,0,1,1,1,1,1,1,1,1,1,1,0,1,1,0,1,1,1,1,1,1,1,1,1,1,0,1,
    1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,
    1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1
]

// board

const createBoard = () => {
  for (let i = 0; i < layout.length; i++) {
    //creating squere
    const square = document.createElement("div");
    grid.appendChild(square);
    squares.push(square);

    if (layout[i] === 1) {
      square.classList.add("wall");
    } else if (layout[i] === 0) {
      square.classList.add("pac-dot");
    } else if (layout[i] === 3) {
      square.classList.add("power-pellet");
    } else if (layout[i] === 2) {
      square.classList.add("ghost-layer");
    }
  }
};

createBoard();

//starting position of pacman
let pacmanCurrentIndex = 500;

squares[pacmanCurrentIndex].classList.add("pacman");

//controls of pac man
const controls = (e) => {
  // one way of doing controls
  //   if (e.key === "ArrowDown") {
  //     squares[pacmanCurrentIndex].classList.remove("pacman");
  //     pacmanCurrentIndex += 28;
  //     squares[pacmanCurrentIndex].classList.add("pacman");
  //   } else if (e.key === "ArrowUp") {
  //     squares[pacmanCurrentIndex].classList.remove("pacman");
  //     pacmanCurrentIndex -= 28;
  //     squares[pacmanCurrentIndex].classList.add("pacman");
  //   } else if (e.key === "ArrowLeft") {
  //     squares[pacmanCurrentIndex].classList.remove("pacman");
  //     pacmanCurrentIndex -= 1;
  //     squares[pacmanCurrentIndex].classList.add("pacman");
  //   } else if (e.key === "ArrowRight") {
  //     squares[pacmanCurrentIndex].classList.remove("pacman");
  //     pacmanCurrentIndex += 1;
  //     squares[pacmanCurrentIndex].classList.add("pacman");
  //   }
  squares[pacmanCurrentIndex].classList.remove("pacman");
  switch (e.key) {
    case "ArrowUp":
      if (
        !squares[pacmanCurrentIndex - width].classList.contains("wall") &&
        pacmanCurrentIndex - width >= 0
      )
        pacmanCurrentIndex -= width;
      break;
    case "ArrowDown":
      if (
        !squares[pacmanCurrentIndex + width].classList.contains(
          "ghost-layer"
        ) &&
        !squares[pacmanCurrentIndex + width].classList.contains("wall") &&
        pacmanCurrentIndex + width < width * width
      )
        pacmanCurrentIndex += width;
      break;
    case "ArrowLeft":
      if (
        !squares[pacmanCurrentIndex - 1].classList.contains("wall") &&
        pacmanCurrentIndex % width !== 0
      )
        pacmanCurrentIndex -= 1;

      if (pacmanCurrentIndex === 364) {
        pacmanCurrentIndex += 27;
      }
      break;
    case "ArrowRight":
      if (
        !squares[pacmanCurrentIndex + 1].classList.contains("wall") &&
        pacmanCurrentIndex % width < width - 1
      )
        pacmanCurrentIndex += 1;
      if (pacmanCurrentIndex === 391) {
        pacmanCurrentIndex -= 27;
      }
      break;
  }
  squares[pacmanCurrentIndex].classList.add("pacman");
};

document.addEventListener("keyup", controls);
