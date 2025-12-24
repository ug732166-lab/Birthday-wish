// Array of possible greetings and card images (add more as needed)
const greetings = [
    "Happy Birthday, {name}! Tu hai mera sab kuch, yaara! 🎉",
    "Wish you a fantastic birthday, {name}! Party hard! 🥳",
    "Cheers to another year, {name}! Stay awesome! 🍾"
];

const cardImages = ["cake.jpg", "birth.jpg", "b4.jpg"]; // Add your images here

// Function to show wishes with advanced features
function showWishes() {
    const nameInput = document.getElementById('nameInput');
    const name = nameInput.value.trim();
    
    if (!name) {
        alert('Please enter a valid name!');
        return;
    }
    
    // Form validation: Check for special characters
    if (!/^[a-zA-Z\s]+$/.test(name)) {
        alert('Name should only contain letters and spaces!');
        return;
    }
    
    // Save name to localStorage for persistence
    localStorage.setItem('birthdayName', name);
    
    // Randomly select greeting and cards
    const randomGreeting = greetings[Math.floor(Math.random() * greetings.length)].replace('{name}', name);
    document.getElementById('greeting').innerText = randomGreeting;
    
    // Clear and populate cards randomly
    const cardsContainer = document.getElementById('cards');
    cardsContainer.innerHTML = '';
    const shuffledCards = cardImages.sort(() => 0.5 - Math.random()).slice(0, 3); // Random 3 cards
    shuffledCards.forEach(src => {
        const img = document.createElement('img');
        img.src = src;
        img.alt = 'Birthday Card';
        cardsContainer.appendChild(img);
    });
    
    // Show wishes with animation
    const wishesDiv = document.getElementById('wishes');
    wishesDiv.style.display = 'block';
    wishesDiv.classList.add('show');
    
    // Auto-play and loop music
    const music = document.getElementById('music');
    music.loop = true;
    music.play().catch(e => console.log('Music play failed:', e)); // Handle autoplay restrictions
    
    // Start countdown timer (Customize date: e.g., new Date('2024-12-25') for Christmas)
    startCountdown(new Date('2024-12-25T00:00:00')); // Replace with actual birthday date
}

// Function for countdown timer
function startCountdown(targetDate) {
    const countdownEl = document.getElementById('countdown');
    const interval = setInterval(() => {
        const now = new Date().getTime();
        const distance = targetDate - now;
        
        if (distance < 0) {
            countdownEl.innerText = "Happy Birthday! 🎂";
            clearInterval(interval);
            return;
        }
        
        const days = Math.floor(distance / (1000 * 60 * 60 * 24));
        const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((distance % (1000 * 60)) / 1000);
        
        countdownEl.innerText = `Countdown: ${days}d ${hours}h ${minutes}m ${seconds}s`;
    }, 1000);
}

// Load saved name on page load
window.addEventListener('load', () => {
    const savedName = localStorage.getItem('birthdayName');
    if (savedName) {
        document.getElementById('nameInput').value = savedName;
    }
});

// Optional: Add confetti effect using a library (include this script in HTML: <script src="https://cdn.jsdelivr.net/npm/canvas-confetti@1.5.1/dist/confetti.browser.min.js"></script>)
function triggerConfetti() {
    confetti({
        particleCount: 100,
        spread: 70,
        origin: { y: 0.6 }
    });
}

// Trigger confetti on button click (add to showWishes if desired)
document.querySelector('button').addEventListener('click', triggerConfetti);