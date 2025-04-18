function updateBubbleStyle() {
  const shape = document.getElementById("bubble-shape").value;
  const color = document.getElementById("bubble-color").value;

  document.documentElement.style.setProperty("--user-bubble", color);

  document.querySelectorAll(".chat-bubble.user").forEach(el => {
    el.setAttribute("data-style", shape);
  });

  localStorage.setItem("bubbleShape", shape);
  localStorage.setItem("bubbleColor", color);
}

function loadBubblePrefs() {
  const shape = localStorage.getItem("bubbleShape") || "round";
  const color = localStorage.getItem("bubbleColor") || "#d1e7dd";

  document.getElementById("bubble-shape").value = shape;
  document.getElementById("bubble-color").value = color;

  updateBubbleStyle();
}

function sendMessage() {
  const input = document.getElementById("user-input");
  const message = input.value.trim();
  if (!message) return;

  const chat = document.getElementById("chat-area");
  const bubble = document.createElement("div");
  bubble.className = "chat-bubble user";
  bubble.textContent = message;

  const shape = localStorage.getItem("bubbleShape") || "round";
  bubble.setAttribute("data-style", shape);

  chat.appendChild(bubble);
  input.value = "";
  chat.scrollTop = chat.scrollHeight;
}

window.onload = loadBubblePrefs;
