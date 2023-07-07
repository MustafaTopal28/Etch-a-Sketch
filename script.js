const container = document.querySelector(".container");
const button = document.querySelector("button");

button.style.backgroundColor = "#6f00ff";
button.style.color = "white";
button.style.padding = "10px 20px";
button.style.borderRadius = "10px";
button.style.borderColor = "rgba(111, 0, 255, 0.16)";
button.style.boxShadow =
  "rgba(111, 0, 255, 0.16) 0px 3px 6px, rgba(111, 0, 255, 0.23) 0px 3px 6px";

function createGrid() {
  // Ask the user for the number of squares per side
  const squaresPerSide = prompt(
    "Enter the number of squares per side (maximum 100)."
  );

  // -------------------------------------------------------------
  // With a cursor
  // const slider = document.getElementById("slider");
  // const squaresPerSide = slider.value;
  // -------------------------------------------------------------

  if (squaresPerSide > 100) {
    alert("Please enter a number less than or equal to 100.");
    return;
  }

  // Définissez les couleurs en fonction de la valeur saisie
  let backgroundColor = "";
  if (squaresPerSide <= 33) {
    backgroundColor = "beige";
  } else if (squaresPerSide <= 66) {
    backgroundColor = "#1c2c59";
  } else {
    backgroundColor = "#06001e";
  }

  // Appliquez la couleur de fond au container
  container.style.backgroundColor = backgroundColor;

  // Clear the existing grid
  container.innerHTML = "";

  // Calculate the square size based on the container
  const containerWidth = parseInt(getComputedStyle(container).width);
  const squareSize = containerWidth / squaresPerSide;

  // Generate the new grid
  for (let i = 0; i < squaresPerSide * squaresPerSide; i++) {
    const gridSquare = document.createElement("div");
    gridSquare.classList.add("grid-square");
    gridSquare.style.width = `${squareSize}px`;
    gridSquare.style.height = `${squareSize}px`;

    container.appendChild(gridSquare);
  }
}

function calculateBackgroundColor(darknessLevel) {
  let backgroundColor = "";

  if (darknessLevel <= 0.4) {
    // Lighter color
    const red = Math.floor(darknessLevel * 255);
    const green = Math.floor(darknessLevel * 255);
    const blue = Math.floor(darknessLevel * 255);
    backgroundColor = `rgb(${red}, ${green}, ${blue})`;
  } else if (darknessLevel <= 0.7) {
    // Medium color (#1c2c59)
    backgroundColor = "#1c2c59";
  } else {
    // Darker color (#06001e)
    backgroundColor = "#06001e";
  }

  return backgroundColor;
}

// Add a hover effect to the grid squares
container.addEventListener("mouseover", function (event) {
  if (event.target.classList.contains("grid-square")) {
    const currentColor = window
      .getComputedStyle(event.target)
      .getPropertyValue("background-color");
    if (
      currentColor === "rgba(0, 0, 0, 0)" ||
      currentColor === "rgba(0, 0, 0, 0.1)"
    ) {
      const randomColor = getRandomColor();
      event.target.style.backgroundColor = randomColor;
    } else {
      const darkenColor = darkenRGB(currentColor);
      event.target.style.backgroundColor = darkenColor;
    }

    const currentOpacity = Number(event.target.style.opacity);
    const newOpacity = currentOpacity + 0.1;
    event.target.style.opacity = newOpacity;

    if (newOpacity >= 0.9) {
      event.target.classList.add("darken");
    }
  }
});

// Function to generate a random color
function getRandomColor() {
  const red = Math.floor(Math.random() * 150) + 100; // Augmenter les valeurs de rouge
  const green = Math.floor(Math.random() * 150) + 100; // Augmenter les valeurs de vert
  const blue = Math.floor(Math.random() * 150) + 100; // Augmenter les valeurs de bleu
  return `rgb(${red}, ${green}, ${blue})`;
}

// Function to darken a RGB color
function darkenRGB(color) {
  const colorValues = color
    .substring(4, color.length - 1)
    .replace(/ /g, "")
    .split(",");
  const darkenedValues = colorValues.map((value) => {
    const newValue = Math.floor(Number(value) * 0.9);
    return Math.max(newValue, 0);
  });
  return `rgb(${darkenedValues[0]}, ${darkenedValues[1]}, ${darkenedValues[2]})`;
}
