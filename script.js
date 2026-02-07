// ===== GLOBAL STATE =====
let noBtn, yesBtn;
let currentScale = 1;
let isPoofing = false;
let mouseX = 0;
let mouseY = 0;

const triggerDistance = 100;
const maxSpeed = 120;
const edgePadding = 20;
const speedMultiplier = 70; // ultra fast

let letterOpen = true; // true while letter is displayed

let yesPower = 1;

let yesScale = 1;



// ===== MOUSE TRACKING =====
document.addEventListener("mousemove", e => {
  mouseX = e.clientX;
  mouseY = e.clientY;
});

function powerUpYesButton() {
  if (!yesBtn) return;

  yesPower += 0.01;

  // Cap it so it doesn't break layout
  yesPower = Math.min(yesPower, 5);

  // ACTUAL size growth
  const baseFont = 18;
  const basePaddingY = 10;
  const basePaddingX = 26;

  yesBtn.style.fontSize = `${baseFont + yesPower * 3}px`;
  yesBtn.style.padding = `
    ${basePaddingY + yesPower * 2}px
    ${basePaddingX + yesPower * 3}px
  `;

  // Gentle scale for extra pop (not primary growth)
  yesBtn.style.transform = `scale(${1 + yesPower * 0.00000000001})`;

  // Glow escalation
  yesBtn.style.boxShadow = `
    0 0 ${20 + yesPower * 12}px rgba(255,77,136,0.9),
    0 0 ${40 + yesPower * 18}px rgba(255,77,136,0.6)
  `;
}




// ===== FLOATING FLOWERS & SPARKLES =====
function createFloatingBackground() {
  const symbols = ["🌸","🌹","💮","✨"];
  const bg = document.getElementById("floating-bg");
  const count = 40;

  for (let i=0;i<count;i++) {
    const el = document.createElement("div");
    const sym = symbols[Math.floor(Math.random()*symbols.length)];
    el.className = sym==="✨"?"sparkle":"flower";
    el.textContent = sym;

    el.style.left = Math.random()*window.innerWidth + "px";
    el.style.top = Math.random()*window.innerHeight + "px";
    el.style.fontSize = (12 + Math.random()*20) + "px";
    el.style.animationDuration = (8 + Math.random()*8) + "s";
    el.style.animationDelay = Math.random()*8 + "s";

    bg.appendChild(el);
  }
}

// ===== INITIALIZE BUTTONS =====
function initializeButtons() {
  noBtn = document.getElementById("no");
  yesBtn = document.getElementById("yes");

  currentScale = 1;
  isPoofing = false;

  // Initial positions
  requestAnimationFrame(() => {
    const yesRect = yesBtn.getBoundingClientRect();
    const shiftYesLeft = 200;
    const shiftNoRight = 100;

    yesBtn.style.position = "relative";
    yesBtn.style.left = `-${shiftYesLeft}px`;

    noBtn.style.left = (yesRect.right + 16 + shiftNoRight) + "px";
    noBtn.style.top = (yesRect.top + yesRect.height / 2 - noBtn.offsetHeight / 2) + "px";
  });

  // Prevent default click/mousedown
  ["mousedown","click"].forEach(evt => noBtn.addEventListener(evt, e=>e.preventDefault()));

  yesBtn.addEventListener("click", () => {
  document.body.innerHTML = `
    <div id="celebration-screen" style="
      height:100vh;
      width:100vw;
      display:flex;
      align-items:center;
      justify-content:center;
      flex-direction:column;
      background:linear-gradient(135deg,#ffd6e8,#fff);
      font-family:'Comic Sans MS', cursive;
      text-align:center;
      overflow:hidden;
    ">
      <h1 class="celebrate-text">YAYYY 💘</h1>
      <h2 class ="celebrate-subtext"> I love you babygirl, and I am so excited for our first Valentines Day together! 😘 </h2>
      <h6 class="celebrate-subtext-small">PS : I knew you would say yes my love, and that is why I never even coded a no button in the first place 🤭</h6> 
      
       <!-- TWO IMAGES SIDE BY SIDE -->
      <div class="celebrate-photos">
        <img src="https://i.imgur.com/KsTaYys.jpeg" alt="Photo 1" class="celebrate-photo">
        <img src="https://via.placeholder.com/200x200.png?text=Photo+2" alt="Photo 2" class="celebrate-photo">
      </div>
      
      <div id="hearts"></div>
      <div id="floating-bg"></div>
    </div>
  `;

  // ===== Floating sparkles / flowers =====
  function createFloatingCelebration() {
    const symbols = ["🌸","🌹","💮","✨","💖","💕"];
    const bg = document.getElementById("floating-bg");
    const count = 60;

    for (let i = 0; i < count; i++) {
      const el = document.createElement("div");
      const sym = symbols[Math.floor(Math.random() * symbols.length)];
      el.className = sym === "✨" ? "sparkle" : "flower";
      el.textContent = sym;

      el.style.position = "fixed";
      el.style.left = Math.random() * window.innerWidth + "px";
      el.style.top = Math.random() * window.innerHeight + "px";
      el.style.fontSize = (16 + Math.random() * 25) + "px";
      el.style.animationName = "floatUpLoop";
      el.style.animationDuration = (6 + Math.random() * 8) + "s";
      el.style.animationDelay = Math.random() * 8 + "s";
      el.style.opacity = 0.8;
      bg.appendChild(el);
    }
  }

  // ===== Floating hearts animation =====
  function createHearts() {
    const heartsContainer = document.getElementById("hearts");
    for (let i = 0; i < 50; i++) {
      const heart = document.createElement("div");
      heart.textContent = "💖";
      heart.style.position = "fixed";
      heart.style.left = Math.random() * window.innerWidth + "px";
      heart.style.top = window.innerHeight + "px";
      heart.style.fontSize = (20 + Math.random() * 30) + "px";
      heart.style.opacity = Math.random();
      heartsContainer.appendChild(heart);

      const speed = 2 + Math.random() * 4;
      function floatUp() {
        const top = parseFloat(heart.style.top);
        if (top < -50) {
          heart.remove();
          return;
        }
        heart.style.top = top - speed + "px";
        requestAnimationFrame(floatUp);
      }
      floatUp();
    }
  }

  createFloatingCelebration();
  createHearts();
});

}

// ===== NO BUTTON TAUNTS =====
const noTaunts = [
  "Excuse me meri jaan, wrong button!! ",
  "NAHIIIII😠",
  "Babyyyy, please say yes ",
  "I should have never made this button...",
  "BABYGIRL, pleaseeee be my valentine?",
  "try again, wrong button my love",
  "HAWWW JAO TUM 😭",
  "this was not in the script ",
  "I LOVE YOUUU 😘"
];

let lastTauntTime = 0;

let tauntIndex = 0;


function spawnNoTaunt() {
  const now = Date.now();
  if (now - lastTauntTime < 900) return;
  lastTauntTime = now;

  const taunt = document.createElement("div");
  taunt.className = "no-taunt";

  // 🔁 Cycle through list in order
  taunt.textContent = noTaunts[tauntIndex];
  tauntIndex = (tauntIndex + 1) % noTaunts.length;

  taunt.style.left = Math.random() * (window.innerWidth - 200) + "px";
  taunt.style.top = Math.random() * (window.innerHeight - 100) + "px";

  document.body.appendChild(taunt);
  setTimeout(() => taunt.remove(), 2500);
}



// ===== NO BUTTON ANIMATION =====
function animateNoButton(button) {
  let lastTime = performance.now();

  function loop() {
    const now = performance.now();
    const deltaTime = (now - lastTime) / 1000;
    lastTime = now;

    if(!button || !button.offsetWidth) {
      requestAnimationFrame(loop);
      return;
    }

    const rect = button.getBoundingClientRect();
    const cx = rect.left + rect.width / 2;
    const cy = rect.top + rect.height / 2;
    const dx = cx - mouseX;
    const dy = cy - mouseY;
    const distance = Math.hypot(dx, dy);

    if(!isPoofing && distance <= triggerDistance) {
      spawnNoTaunt();
      powerUpYesButton();
      const nx = dx / distance;
      const ny = dy / distance;
      const randAngle = (Math.random() - 0.5) * 0.5;
      const cosA = Math.cos(randAngle);
      const sinA = Math.sin(randAngle);

      const vx = (nx * cosA - ny * sinA) * maxSpeed * deltaTime * speedMultiplier;
      const vy = (nx * sinA + ny * cosA) * maxSpeed * deltaTime * speedMultiplier;

      let nextLeft = rect.left + vx;
      let nextTop = rect.top + vy;

      const minX = edgePadding;
      const minY = edgePadding;
      const maxX = window.innerWidth - rect.width - edgePadding;
      const maxY = window.innerHeight - rect.height - edgePadding;

      if(nextLeft <= minX || nextLeft >= maxX || nextTop <= minY || nextTop >= maxY){
        nextLeft = Math.min(Math.max(nextLeft, minX), maxX);
        nextTop = Math.min(Math.max(nextTop, minY), maxY);
        poofAndTeleportHalfScreen(button, nextLeft);
      } else {
        button.style.left = nextLeft + "px";
        button.style.top = nextTop + "px";
      }
    }

    requestAnimationFrame(loop);
  }
  
  

  loop();
}

// ===== POOF + TELEPORT =====
function poofAndTeleportHalfScreen(button, hitX){
  if(!button) return;
  isPoofing = true;

  const rect = button.getBoundingClientRect();
  const poofEl = button.cloneNode(true);
  poofEl.classList.add("poof");
  poofEl.style.left = rect.left + "px";
  poofEl.style.top = rect.top + "px";
  document.body.appendChild(poofEl);

  button.style.opacity = 0;

  setTimeout(()=>{
    poofEl.remove();
    const screenMidX = window.innerWidth/2;
    const newHalf = hitX < screenMidX ? "right":"left";

    let newX = newHalf==="right"
      ? screenMidX + edgePadding + Math.random()*(screenMidX - button.offsetWidth - edgePadding*2)
      : edgePadding + Math.random()*(screenMidX - button.offsetWidth - edgePadding*2);

    let newY = edgePadding + Math.random()*(window.innerHeight - button.offsetHeight - edgePadding*2);

    const dx = newX + button.offsetWidth/2 - mouseX;
    const dy = newY + button.offsetHeight/2 - mouseY;
    if(Math.hypot(dx, dy) < triggerDistance){
      const angle = Math.atan2(dy, dx);
      newX = mouseX + Math.cos(angle)*triggerDistance - button.offsetWidth/2;
      newY = mouseY + Math.sin(angle)*triggerDistance - button.offsetHeight/2;
    }

    newX = Math.min(Math.max(newX, edgePadding), window.innerWidth - button.offsetWidth - edgePadding);
    newY = Math.min(Math.max(newY, edgePadding), window.innerHeight - button.offsetHeight - edgePadding);

    button.style.left = newX + "px";
    button.style.top = newY + "px";
    button.style.opacity = 1;
    isPoofing = false;
  },500);
}

// ===== LETTER POPUP =====
const letter = document.getElementById("letter");
window.addEventListener("load",()=>letter.classList.add("show"));

letter.addEventListener("click",()=>{
  const letterEl = letter.querySelector(".letter-envelope");
  letterEl.classList.add("poof");
  setTimeout(()=>{
    letter.classList.remove("show");
    letterEl.classList.remove("poof");
    letterOpen = false; // Letter is now closed

    const cardContainer = document.getElementById("card-container");
    cardContainer.innerHTML = `
      <div class="card">
        <h1>Will you be my Valentine? 💕</h1>
        <div class="buttons-wrapper">
          <button id="yes">Yes 💖</button>
          <button id="no">No 😅</button>
        </div>
      </div>
    `;

    initializeButtons(); // No button now animates, only after letter closed
    
    setTimeout(() => {
      animateNoButton(document.getElementById("no")); // start fleeing after 2s
    }, 4000);
    
    animateNoButton(document.getElementById("no")); // Start fleeing after letter
  },500);
});

// ===== INIT =====
createFloatingBackground();
