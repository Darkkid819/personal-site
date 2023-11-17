const canvas = document.getElementById('matrix-canvas');
const context = canvas.getContext('2d');

const katakana = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ123456789@#$%^&*()*&^%+-/~{[|`]}';
const letters = katakana.split('');

const fontSize = 16;
let drops = [];

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
const columns = canvas.width / fontSize;
drops = new Array(Math.floor(columns)).fill(1);

function setupCanvas() {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
  const columns = canvas.width / fontSize;
}

function drawMatrix() {
  context.fillStyle = 'rgba(0, 0, 0, 0.05)';
  context.fillRect(0, 0, canvas.width, canvas.height);
  
  context.fillStyle = '#0F0';
  context.font = fontSize + 'px monospace';
  
  for (let i = 0; i < drops.length; i++) {
    const text = letters[Math.floor(Math.random() * letters.length)];
    context.fillText(text, i * fontSize, drops[i] * fontSize);
    drops[i]++;
    
    if (drops[i] * fontSize > canvas.height && Math.random() > 0.95) {
      drops[i] = 0;
    }
  }
}

window.addEventListener('resize', setupCanvas);

setInterval(drawMatrix, 20);