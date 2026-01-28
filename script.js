// script.js

// --- Rain Effect ---
document.addEventListener('DOMContentLoaded', () => {
    const rainContainer = document.querySelector('.rain-container');
    
    const createRain = (isDark) => {
        rainContainer.innerHTML = ''; // Clear existing rain
        const items = isDark ? ['⭐', '✨', '🌙', '💫', '🌌'] : ['💖', '🌸', '🌷', '✨', '💕'];
        const itemCount = 50;

        for (let i = 0; i < itemCount; i++) {
            const rainItem = document.createElement('div');
            rainItem.classList.add('rain-item');
            rainItem.innerText = items[Math.floor(Math.random() * items.length)];
            
            // Randomize properties
            rainItem.style.left = `${Math.random() * 100}vw`;
            rainItem.style.fontSize = `${Math.random() * 12 + 12}px`; 
            rainItem.style.opacity = Math.random() * 0.5 + 0.3; 
            
            const animationDuration = Math.random() * 5 + 5; 
            rainItem.style.animationDuration = `${animationDuration}s`;
            rainItem.style.animationDelay = `${Math.random() * 5}s`;

            rainContainer.appendChild(rainItem);
        }
    };

    // Initial rain (Light mode)
    createRain(false);

    // --- Name Entry Logic ---
    const startBtn = document.getElementById('start-btn');
    const nameInput = document.getElementById('name-input');
    const nameEntry = document.getElementById('name-entry');
    const mainContent = document.getElementById('main-content');
    const greeting = document.getElementById('greeting');

    const initializeMainContent = () => {
        const name = nameInput.value.trim();
        
        // Check if the name is "Neha" (case-insensitive)
        if (name.toLowerCase() === "neha") {
            // Capitalize first letter for display
            const displayName = name.charAt(0).toUpperCase() + name.slice(1);
            greeting.innerText = `Hey ${displayName} 🌷`;

            // Change background to her favorite color
            // Replace these hex codes with the colors she likes!
            document.body.style.background = "linear-gradient(-45deg, #a18cd1, #fbc2eb, #a18cd1, #fbc2eb)";
            document.body.style.backgroundSize = "400% 400%";

            // Hide name entry and show main content
            nameEntry.classList.add('hidden');
            mainContent.classList.remove('hidden');
        } else {
            // Wrong name effect
            if (navigator.vibrate) navigator.vibrate(200); // Vibrate on mobile
            nameInput.classList.add('shake');
            nameInput.style.borderBottomColor = "#ff6b6b";
            setTimeout(() => {
                nameInput.classList.remove('shake');
                nameInput.style.borderBottomColor = "#ffc3d8"; // Reset border color
            }, 800);
        }
    };

    startBtn.addEventListener('click', initializeMainContent);
    nameInput.addEventListener('keyup', (event) => {
        if (event.key === 'Enter') {
            initializeMainContent();
        }
    });

    // --- Continue Button Click Listener ---
    const continueBtn = document.getElementById('continue-btn');
    continueBtn.addEventListener('click', startGame);

    // --- Sparkle Trail on Mouse Move ---
    let isThrottled = false;
    const spawnSparkle = (x, y) => {
        if (isThrottled) return;
        isThrottled = true;
        setTimeout(() => { isThrottled = false; }, 50); // Throttle to 50ms

        const sparkle = document.createElement('span');
        sparkle.classList.add('sparkle');

        // Position the sparkle at the cursor
        sparkle.style.left = `${x}px`;
        sparkle.style.top = `${y}px`;

        // Add a random upward/outward motion
        const randomX = (Math.random() - 0.5) * 40; // -20px to 20px
        const randomY = (Math.random() - 0.5) * 40 - 20; // -40px to 0px (mostly upward)
        sparkle.style.setProperty('--x', `${randomX}px`);
        sparkle.style.setProperty('--y', `${randomY}px`);

        // Randomize size and character
        sparkle.style.fontSize = `${Math.random() * 10 + 10}px`; // 10px to 20px
        const items = ['💖', '✨', '🌸'];
        sparkle.innerText = items[Math.floor(Math.random() * items.length)];

        document.body.appendChild(sparkle);

        // Remove the sparkle after the animation ends to prevent clutter
        setTimeout(() => { sparkle.remove(); }, 800); // Match animation duration
    };

    document.body.addEventListener('mousemove', (e) => {
        spawnSparkle(e.clientX, e.clientY);
    });

    document.body.addEventListener('touchmove', (e) => {
        if(e.touches.length > 0) {
            spawnSparkle(e.touches[0].clientX, e.touches[0].clientY);
        }
    });

    // --- Dark Mode Toggle ---
    const themeToggle = document.getElementById('theme-toggle');
    let isDarkMode = false;

    themeToggle.addEventListener('click', () => {
        isDarkMode = !isDarkMode;
        document.body.classList.toggle('dark-mode');
        
        // Update icon and rain
        themeToggle.innerText = isDarkMode ? '☀️' : '🌙';
        createRain(isDarkMode);
    });
});

// --- Helper Functions ---
const wait = (ms) => new Promise(resolve => setTimeout(resolve, ms));

function typeWriter(element, text, speed = 50) {
    return new Promise(resolve => {
        let i = 0;
        element.innerHTML = '';
        const cursor = document.createElement('span');
        cursor.className = 'typing-cursor';

        function type() {
            if (i < text.length) {
                element.innerHTML = text.substring(0, i + 1);
                element.appendChild(cursor);
                i++;
                setTimeout(type, speed);
            } else {
                cursor.remove(); // Remove cursor when done
                resolve();
            }
        }
        type();
    });
}

function celebrate() {
    const colors = ['#ff6fae', '#ff9ec7', '#ffc3d8', '#ffdbe6', '#ffffff'];
    for (let i = 0; i < 100; i++) {
        const confetti = document.createElement('div');
        confetti.classList.add('confetti');
        confetti.style.left = Math.random() * 100 + 'vw';
        confetti.style.top = -10 + 'px';
        confetti.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
        confetti.style.animationDuration = (Math.random() * 3 + 2) + 's';
        
        document.body.appendChild(confetti);
        setTimeout(() => confetti.remove(), 5000);
    }
}

// --- Game Logic ---
let score = 0;
const maxScore = 5;

async function startGame() {
    const continueBtn = document.getElementById('continue-btn');
    const subtitle = document.getElementById('subtitle');
    const madeWith = document.getElementById('made-with');

    // Hide intro elements
    [continueBtn, subtitle, madeWith].forEach(el => {
        el.style.transition = 'opacity 0.5s';
        el.style.opacity = '0';
    });
    await wait(500);
    [continueBtn, subtitle, madeWith].forEach(el => el.classList.add('hidden'));

    // Show game container
    const gameContainer = document.getElementById('game-container');
    gameContainer.classList.remove('hidden');
    
    spawnGameHeart();
}

function spawnGameHeart() {
    const container = document.querySelector('.container');
    const heart = document.createElement('div');
    heart.classList.add('game-heart');
    heart.innerText = '💖';
    
    // Random position within the container (approximate safe area)
    // 10% to 80% width, 20% to 70% height to avoid overlapping text too much
    const randomX = Math.random() * 70 + 10; 
    const randomY = Math.random() * 50 + 20; 
    
    heart.style.left = `${randomX}%`;
    heart.style.top = `${randomY}%`;
    
    heart.onclick = () => {
        score++;
        document.getElementById('score').innerText = `${score} / ${maxScore}`;
        heart.remove();
        
        if (score < maxScore) {
            spawnGameHeart();
        } else {
            // Game Over - Success
            const gameContainer = document.getElementById('game-container');
            gameContainer.innerHTML = '<h3 style="color: #ff6fae; animation: popIn 0.5s;">Yay! You did it! 🎉</h3>';
            setTimeout(() => {
                gameContainer.classList.add('hidden');
                showMessage();
            }, 1500);
        }
    };
    
    container.appendChild(heart);
}

// --- Show Message Logic ---
async function showMessage() {
    // Show the message container
    const messageDiv = document.getElementById('message');
    messageDiv.classList.remove('hidden');

    // Hide the final notes initially
    const note = messageDiv.querySelector('.note');
    const final = messageDiv.querySelector('.final');
    const funnyNote = document.getElementById('funny-note');
    [note, final, funnyNote].forEach(el => el.style.opacity = 0);

    // Get list items and type them out
    const listItems = messageDiv.querySelectorAll('ul li');
    listItems.forEach((item, index) => {
        item.style.animation = `slideInItem 0.6s ease-out forwards`;
        item.style.animationDelay = `${0.5 + index * 0.25}s`;
    });

    // Wait for the list animation to roughly finish before proceeding
    await wait(800 + listItems.length * 250);

    // Fade in the final notes
    [note, final].forEach(el => {
        el.style.transition = 'opacity 1s';
        el.style.opacity = 1;
    });

    // Type out the funny note
    await wait(1500);
    funnyNote.style.opacity = 1;
    await typeWriter(funnyNote, "(and maybe I stayed up way too late making this 🙈)", 60);

    // --- Word Puzzle Game ---
    await wait(1500);
    const container = document.querySelector('.container');
    const puzzleContainer = document.getElementById('puzzle-container');
    const scrambledWordEl = document.getElementById('scrambled-word');
    const puzzleInput = document.getElementById('puzzle-input');
    const puzzleBtn = document.getElementById('puzzle-btn');
    const puzzleFeedback = document.getElementById('puzzle-feedback');
    const hintBtn = document.getElementById('hint-btn');
    const hintText = document.getElementById('hint-text');

    const solution = "SPECIAL";
    const scrambled = "P E C I A L S"; // Spaces for styling
    
    scrambledWordEl.innerText = scrambled;
    puzzleContainer.classList.remove('hidden');

    // Hint Logic: Show button after 5 seconds
    const hintTimeout = setTimeout(() => {
        if (hintBtn) hintBtn.classList.remove('hidden');
    }, 5000);

    hintBtn.addEventListener('click', () => {
        hintText.innerText = "It starts with 'S' and describes you perfectly ✨";
        hintText.classList.remove('hidden');
        hintBtn.classList.add('hidden');
    });

    const checkAnswer = () => {
        if (puzzleInput.value.trim().toUpperCase() === solution) {
            clearTimeout(hintTimeout); // Stop hint timer if solved
            // Clear container for the surprise gift
            container.innerHTML = '';
            
            const giftTitle = document.createElement('h2');
            giftTitle.innerText = "One last surprise...";
            giftTitle.style.color = "#ff6fae";
            giftTitle.style.animation = "fadeIn 1s";
            container.appendChild(giftTitle);

            const giftBox = document.createElement('div');
            giftBox.innerText = "🎁";
            giftBox.classList.add('gift-box');
            container.appendChild(giftBox);
            
            const hint = document.createElement('p');
            hint.innerText = "(Tap to open)";
            hint.style.fontSize = "14px";
            container.appendChild(hint);

            giftBox.addEventListener('click', () => {
                celebrate(); // Trigger confetti
                // Show the final card
                container.innerHTML = `
                    <div class="final-card" id="final-card">
                        <h2 style="color: #ff6fae; margin-bottom: 15px;">Exactly! ✨</h2>
                        <p style="font-size: 18px; line-height: 1.6;">That is exactly what you are to me.</p>
                        <p style="font-size: 20px; color: #ff6fae; font-weight: bold; margin-top: 15px;">Special. Important. Loved.</p>
                        <div style="font-size: 50px; margin-top: 20px; animation: pulse 2s infinite;">💖</div>
                        <p id="screenshot-hint" style="font-size: 12px; margin-top: 25px;">(Take a screenshot and send it to me? 📸)</p>
                        <button id="replay-btn" class="cute-btn" style="margin-top: 20px; font-size: 14px; padding: 10px 20px;">Watch Again ↺</button>
                    </div>`;
                
                document.getElementById('replay-btn').addEventListener('click', () => {
                    location.reload();
                });
            });
        } else {
            if (navigator.vibrate) navigator.vibrate(200); // Vibrate on mobile
            puzzleFeedback.innerText = "Not quite, try again!";
            puzzleInput.classList.add('shake');
            puzzleInput.value = ""; // Clear the wrong answer
            setTimeout(() => {
                puzzleInput.classList.remove('shake');
                puzzleFeedback.innerText = ""; // Clear feedback after a bit
            }, 1500);
        }
    };

    puzzleBtn.addEventListener('click', checkAnswer);
    puzzleInput.addEventListener('keyup', (event) => {
        // Allow submission on Enter key
        if (event.key === 'Enter') {
            checkAnswer();
        }
    });
}
