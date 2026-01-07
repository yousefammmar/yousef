const canvas = document.getElementById('bg-canvas');
const ctx = canvas.getContext('2d');

let width, height;

// Configuration
const fontSize = 16;
let columns;
let drops = [];

// Matrix characters (Katakana + Latin + Nums)
const chars = 'アァカサタナハマヤャラワガザダバパイィキシチニヒミリヰギジヂビピウゥクスツヌフムユュルグズブヅプエェケセテネヘメレヱゲゼデベペオォコソトノホモヨョロヲゴゾドボポ1234567890ABCDEFGHIJKLMNOPQRSTUVWXYZ';

function resize() {
    width = window.innerWidth;
    height = window.innerHeight;
    canvas.width = width;
    canvas.height = height;

    columns = Math.floor(width / fontSize);
    drops = [];
    for (let i = 0; i < columns; i++) {
        drops[i] = Math.random() * -100; // Start at random heights above screen
    }
}

function animate() {
    // Translucent black background for trail effect
    ctx.fillStyle = 'rgba(2, 6, 23, 0.1)';
    ctx.fillRect(0, 0, width, height);

    ctx.font = fontSize + 'px monospace';

    for (let i = 0; i < drops.length; i++) {
        // Random character
        const text = chars.charAt(Math.floor(Math.random() * chars.length));

        // Random color: weighted towards Cyan/Blue/Purple
        const rand = Math.random();
        if (rand > 0.6) ctx.fillStyle = '#0ea5e9'; // Sky Blue
        else if (rand > 0.3) ctx.fillStyle = '#d946ef'; // Fuchsia
        else ctx.fillStyle = '#8b5cf6'; // Violet

        // Draw character
        ctx.fillText(text, i * fontSize, drops[i] * fontSize);

        // Reset drop to top randomly after it has crossed screen
        if (drops[i] * fontSize > height && Math.random() > 0.975) {
            drops[i] = 0;
        }

        // Move drop down
        drops[i]++;
    }

    requestAnimationFrame(animate);
}

window.addEventListener('resize', resize);
resize(); // Init
animate();
