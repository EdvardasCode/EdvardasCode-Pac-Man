const grid = document.querySelector(".grid");
const scoreDisplay = document.querySelector("#score");

const width = 28;
let score = 0;
let squares = [];

// 28 by 28 squres
// 0 - pac-dots
// 1 - wall
// 2 - ghost-lair
// 3 - power-pellet
// 4 - empty
// prettier-ignore
const layout1 = [
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
    4,0,0,0,0,0,0,0,0,4,1,2,2,2,2,2,2,1,4,0,0,0,0,0,0,0,0,4,
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

const createBoard = (layout) => {
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

createBoard(layout1);

//starting position of pacman
let pacmanCurrentIndex = 500;
const pacmanRotation = document.querySelector(".mouth");
const mouth = document.createElement("div");
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
  squares[pacmanCurrentIndex].appendChild(mouth).classList.add("mouth");
  switch (e.key) {
    case "ArrowUp":
      if (
        !squares[pacmanCurrentIndex - width].classList.contains("wall") &&
        pacmanCurrentIndex - width >= 0
      ) {
        document.querySelector(".mouth").style.transform = "rotate(-90deg)";
        pacmanCurrentIndex -= width;
      }

      break;
    case "ArrowDown":
      if (
        !squares[pacmanCurrentIndex + width].classList.contains(
          "ghost-layer"
        ) &&
        !squares[pacmanCurrentIndex + width].classList.contains("wall") &&
        pacmanCurrentIndex + width < width * width
      ) {
        document.querySelector(".mouth").style.transform = "rotate(90deg)";
        pacmanCurrentIndex += width;
      }
      break;
    case "ArrowLeft":
      if (
        !squares[pacmanCurrentIndex - 1].classList.contains("wall") &&
        pacmanCurrentIndex % width !== 0
      ) {
        document.querySelector(".mouth").style.transform = "rotate(180deg)";
        pacmanCurrentIndex -= 1;
      }

      if (pacmanCurrentIndex === 364) {
        pacmanCurrentIndex += 27;
      }
      break;
    case "ArrowRight":
      if (
        !squares[pacmanCurrentIndex + 1].classList.contains("wall") &&
        pacmanCurrentIndex % width < width - 1
      ) {
        document.querySelector(".mouth").style.transform = "rotate(0deg)";
        pacmanCurrentIndex += 1;
      }

      if (pacmanCurrentIndex === 391) {
        pacmanCurrentIndex -= 27;
      }
      break;
  }
  squares[pacmanCurrentIndex].classList.add("pacman");
  squares[pacmanCurrentIndex].appendChild(mouth).classList.add("mouth");
  dotsEaten();
  powerDotEaten();
};

document.addEventListener("keyup", controls);

//points and dots eaten
let dotsLeft = 244;

let powerDots = 4;

const dotsEaten = () => {
  if (squares[pacmanCurrentIndex].classList.contains("pac-dot")) {
    squares[pacmanCurrentIndex].classList.remove("pac-dot");
    dotsLeft--;
    score++;
    scoreDisplay.innerText = score;
  }
};

const powerDotEaten = () => {
  if (squares[pacmanCurrentIndex].classList.contains("power-pellet")) {
    squares[pacmanCurrentIndex].classList.remove("power-pellet");
    score += 10;
    powerDots--;
    ghosts.forEach((ghost) => (ghost.isScared = true));

    setTimeout(function () {
      ghosts.forEach((ghost) => (ghost.isScared = false));
    }, 10000);
  }
};

class Ghost {
  constructor(className, startIndex, speed) {
    this.className = className;
    this.startIndex = startIndex;
    this.speed = speed;
    this.currentIndex = startIndex;
    this.isScared = false;
    this.timerId = NaN;
  }
}

const ghosts = [
  new Ghost("wooo1", 348, 250),
  new Ghost("wooo2", 376, 400),
  new Ghost("wooo3", 351, 300),
  new Ghost("wooo4", 379, 500),
];

//draw my ghosts onto my grid
ghosts.forEach((ghost) => {
  squares[ghost.startIndex].classList.add(ghost.className);
  squares[ghost.startIndex].classList.add("ghost");
});

//move the ghosts
ghosts.forEach((ghost) => moveGhost(ghost));

function moveGhost(ghost) {
  const directions = [-1, +1, -width, +width];
  //randomizing the movement
  let direction = directions[Math.floor(Math.random() * directions.length)];

  ghost.timerId = setInterval(function () {
    if (
      !squares[ghost.currentIndex + direction].classList.contains("ghost") &&
      !squares[ghost.currentIndex + direction].classList.contains("wall")
    ) {
      squares[ghost.currentIndex].classList.remove(ghost.className);
      squares[ghost.currentIndex].classList.remove("ghost", "scared-ghost");
      ghost.currentIndex += direction;
      squares[ghost.currentIndex].classList.add(ghost.className);
      squares[ghost.currentIndex].classList.add("ghost");
    } else {
      direction = directions[Math.floor(Math.random() * directions.length)];
    }

    // if the ghost scared
    if (ghost.isScared) {
      squares[ghost.currentIndex].classList.add("scared-ghost");
    }

    if (
      ghost.isScared &&
      squares[ghost.currentIndex].classList.contains("pacman")
    ) {
      squares[ghost.currentIndex].classList.remove(
        ghost.className,
        "ghost",
        "scared-ghost"
      );

      ghost.currentIndex = ghost.startIndex;

      score += 20;

      squares[ghost.currentIndex].classList.add(ghost.className, "ghost");
    }
    nextLevelOrGameOver();
  }, ghost.speed);
}

//check for points left or game over

const nextLevelOrGameOver = () => {
  if (
    !squares[pacmanCurrentIndex].classList.contains("scared-ghost") &&
    squares[pacmanCurrentIndex].classList.contains("ghost")
  ) {
    ghosts.forEach((ghost) => clearInterval(ghost.timerId));
    document.removeEventListener("keyup", controls);
    alert("game over");
  } else if (dotsLeft === 0 && powerDots === 0) {
    ghosts.forEach((ghost) => clearInterval(ghost.timerId));
    document.removeEventListener("keyup", controls);
    alert("You Have Won");
  }
};
