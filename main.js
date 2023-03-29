const boxes = Array.from(document.querySelectorAll(".box"));
const title = document.getElementById("title");
const restartBtn = document.getElementById("restart-game");


let timeouts = [];

function randomCells() {
  let randomNumbers = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16]
    .sort(() => Math.random() - 0.5)
    .slice(10);
  let cells = [];
  for (let i of randomNumbers) {
    cells.push(document.querySelector(`.box${i}`));
  }
  return cells;
}

function afterSomeTime() {
  let Cells = randomCells();
  Cells.forEach((item) => {
    item.classList.add("click");
  });
  timeouts.push(setTimeout(() => {
    Cells.forEach((item) => {
      item.classList.add("notactive");
    });
  }, 2000));
}
afterSomeTime();

function gaming() {
  let counter = 0;
  boxes.forEach((item) => {
    item.addEventListener("click", () => {
      if (item.classList.contains("click")) {
        item.classList.remove("notactive");
        if (counter < 6){
          ++counter;
        }
        else return;
        console.log(counter);
        if (counter === 6) {
          title.textContent = "WIN 🎉";
        }
      } else if (counter < 6) {
        item.classList.add("error");
        gamingEnd();
      }
    });
  });
}
timeouts.push(setTimeout(gaming, 2000));

function gamingEnd() {
  boxes.forEach((item) => {
    if (item.classList.contains("error")) {
      boxes.forEach((item) => {
        item.classList.add("pointerEventsNone");
        title.textContent = "GAME OVER";
        item.classList.remove("notactive");
      });
    }
  });
}

function restartGame() {
  counter = 0;
  title.textContent = "GAME";
  boxes.forEach((item) => {
    item.classList.remove("notactive", "click", "error", "pointerEventsNone");
  });
  afterSomeTime();
  timeouts.push(setTimeout(gaming, 2000));
}
restartBtn.addEventListener("click", () => {
  for(let i of timeouts){
    clearTimeout(i);
  }
  restartGame();
});
