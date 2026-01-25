function showMessage() {
  const msg = document.getElementById("message");
  msg.style.display = "block";
}


const rainContainer = document.querySelector(".rain-container");
const symbols = ["💖", "🌸"]; // heart + flower

function createRain() {
  const item = document.createElement("div");
  item.classList.add("rain-item");
  item.innerText = symbols[Math.floor(Math.random() * symbols.length)];

  item.style.left = Math.random() * 100 + "vw";
  item.style.animationDuration = Math.random() * 3 + 3 + "s";
  item.style.fontSize = Math.random() * 10 + 14 + "px";

  rainContainer.appendChild(item);

  setTimeout(() => {
    item.remove();
  }, 6000);
}

setInterval(createRain, 300);




