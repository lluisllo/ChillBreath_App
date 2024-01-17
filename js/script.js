// Colores
function changeColor() {
  const elements = document.querySelectorAll(
    ".instrucciones, .respiracion, .gif, .boton"
  );

  // Disable transition to prevent unexpected animation effects
  document.getElementById("pulmon").style.transition = "none";

  elements.forEach((element) => {
    if (element.classList.contains("blue")) {
      element.classList.remove("blue");
      element.classList.add("red");
      // Set size for red to match blue
      document.getElementById("pulmon").style.transform = "scale(1.2)";
    } else if (element.classList.contains("red")) {
      element.classList.remove("red");
      element.classList.add("green");
      // Set size for green to match red
      document.getElementById("pulmon").style.transform = "scale(0.85)";
    } else if (element.classList.contains("green")) {
      element.classList.remove("green");
      element.classList.add("red2");
      // Set size for red2 to match green
      document.getElementById("pulmon").style.transform = "scale(0.85)";
    } else {
      element.classList.remove("red2");
      element.classList.add("blue");
      // Set size for blue to match red2
      document.getElementById("pulmon").style.transform = "scale(1.2)";
    }
  });

  // Re-enable transition after applying the new transformation
  document.getElementById("pulmon").style.transition =
    "transform 1s ease-in-out";

  // Update text based on the new color
  updateText();
}

// Countdown
let startTime = null;
let timerInterval = null;
let colorChangeInterval = null;

function updateText() {
  const respiracion = document.getElementById("respiracion");
  const childElements = respiracion.children;

  for (const child of childElements) {
    child.style.display = "none";
  }

  if (respiracion.classList.contains("blue")) {
    childElements[0].style.display = "block";
  } else if (respiracion.classList.contains("green")) {
    childElements[2].style.display = "block";
  } else {
    childElements[1].style.display = "block";
  }
}

function startCountdown() {
  // Mostrar respiración
  const respiracion = document.getElementById("respiracion");
  respiracion.style.display = "block";

  // Ocultar instrucciones
  const instrucciones = document.getElementById("instrucciones");
  instrucciones.style.display = "none";

  // Cambiar título de la app por contador
  // Const titulo = document.getElementById("titulo");
  // Título.style.display = "none"

  respiracion.classList.remove("green", "red", "red2");
  respiracion.classList.add("blue");

  updateText();

  // Iniciar animación respirar
  document.getElementById("pulmon").classList.add("breathing");

  startTime = Date.now();
  timerInterval = setInterval(() => {
    const currentTime = Date.now();
    const timeElapsed = Math.floor((currentTime - startTime) / 1000);
    const remainingTime = 300 - timeElapsed;
    const remainingMinutes = Math.floor(remainingTime / 60);
    const remainingSeconds = remainingTime % 60;

    document.getElementById(
      "countdown"
    ).innerHTML = `${remainingMinutes} : ${remainingSeconds
      .toString()
      .padStart(2, "0")}`;

    if (timeElapsed >= 300) {
      clearInterval(timerInterval);
      clearInterval(colorChangeInterval);
      document.getElementById("countdown").innerHTML = "Time's up!";
    }
  }, 1000);

  // Start color change interval every 2 seconds
  colorChangeInterval = setInterval(changeColor, 2700);
}

document
  .getElementById("startButton")
  .addEventListener("click", startCountdown);
