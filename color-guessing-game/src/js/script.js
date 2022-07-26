const h1 = document.querySelector("h1");
const RGB = document.querySelector("#colorDisplay");
const btnsContainer = document.querySelector("#stripe");
const newBtn = document.querySelector("#reset");
const gameMessage = document.querySelector("#message");
const easyBtn = document.querySelector("#easyBtn");
const hardBtn = document.querySelector("#hardBtn");
const circlesContainer = document.querySelector("#container");
const circles = document.querySelectorAll(".square");
// console.log(
//   h1,
//   RGB,
//   btnsContainer,
//   newBtn,
//   gameMessage,
//   easyBtn,
//   hardBtn,
//   circlesContainer,
//   circles
// );
let clickedCircle = [];

// rand integers generator
const randInt = (min, max) => {
  const randInt = Math.floor(Math.random() * (max - min + 1) + min);
  return randInt;
};

// RGB color generator
const randRGB = () => {
  const randRGB = `rgb(${randInt(0, 255)}, ${randInt(0, 255)}, ${randInt(
    0,
    255
  )})`;
  return randRGB;
};

// set color for circle
const setColorForCircle = (circle) => {
  const circleColor = (circle.style.background = randRGB());
  return circleColor;
};
console.warn("The last function has no effect");

// set colors for all circles
const setColorsForAllCircles = (array) => {
  const colors = [];
  for (const circle of array) {
    // const circlesColors =  (circle.style.background = setColorForCircle(circles[0]))
    const circlesColors = (circle.style.background = randRGB());
    colors.push(circlesColors);
  }
  // console.log(colors);
  return colors;
};

// select rand element by its index
const selectRandColor = (colors) => {
  const randIndex = randInt(0, colors.length - 1);
  const selection = circles[randIndex];
  return selection;
};

// change RGB color number by the color of selected element
const changeContent = (selectedItem) => {
  RGB.textContent = selectedItem.style.backgroundColor;
};

// win function
const winFunction = () => {
  gameMessage.textContent = "🥳🥳 You Won 🥳🥳";
  for (const clickedCircle of circles) {
    clickedCircle.style.background = RGB.textContent;
    clickedCircle.classList.remove("hidden");
  }
  h1.style.background = RGB.textContent;
  btnsContainer.style.background = RGB.textContent;
};

// lose function
const loseFunction = () => {
  gameMessage.textContent = "😧😧 You Lost 😧😧";
  for (const circle of clickedCircle) {
    circle.classList.add("hidden");
  }
};

// newBtn click function
newBtn.addEventListener("click", () => {
  gameMessage.textContent = "";
  // loop on all circles to remove .hidden
  for (const circle of circles) {
    circle.classList.remove("hidden");
  }
  // check if there is clicked circles or no
  if (clickedCircle !== []) {
    // if there : remove all clicked circles
    clickedCircle = [];
  }
  // set all backgrounds to default value
  h1.style.background = "";
  btnsContainer.style.background = "";
  // set all backgrounds of all circles to randRGB
  changeContent(selectRandColor(setColorsForAllCircles(circles)));
});

// easyBtn click function
easyBtn.addEventListener("click", () => {
  gameMessage.textContent = "";
  // set all backgrounds to default value
  h1.style.background = "";
  btnsContainer.style.background = "";
  // loop on 1st 3 circles & remove .hidden
  for (let index = 0; index < 3; index++) {
    const circle = circles[index];
    circle.classList.remove("hidden");
  }
  // loop on 2nd 3 circles & add .hidden
  for (let index = 3; index < circles.length; index++) {
    const circle = circles[index];
    circle.classList.add("hidden");
  }
  // create array from nodeList
  const array = Array.from(circles);
  // remove 2nd 3 circles from the array
  array.splice(3, array.length - 1);
  // set randRGB backgrounds for 1st 3 circles only
  changeContent(selectRandColor(setColorsForAllCircles(array)));
});

// hardBtn click function
hardBtn.addEventListener("click", () => {
  gameMessage.textContent = "";
  // set all backgrounds to default value
  h1.style.background = "";
  btnsContainer.style.background = "";
  // loop on all circles to remove .hidden
  for (const circle of circles) {
    circle.classList.remove("hidden");
  }
  // set all backgrounds of all circles to randRGB
  changeContent(selectRandColor(setColorsForAllCircles(circles)));
});

// circlesContainer click function & circles click function
circlesContainer.addEventListener("click", (event) => {
  const target = event.target;
  // set the conditions to click on the circles : nodeName === "DIV", id !== "container", classList == "square"
  if (
    (target.nodeName =
      "DIV" && target.id !== "container" && target.classList == "square")
  ) {
    if (target.style.background === RGB.textContent) {
      winFunction();
    } else {
      // push the clicked circles to an array to hide them
      clickedCircle.push(target);
      loseFunction();
    }
  }
});
console.error("There is issue with the if (condition) {} at line 149");
