const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');
const scoreElement = document.getElementById('score');
const messageElement = document.getElementById('message');

const tileSize = 40;
const rows = 11;
const cols = 15;

canvas.width = cols * tileSize;
canvas.height = rows * tileSize;

// 0: Path, 1: Wall, 2: Money (💶)
const maze = [
    [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
    [1, 2, 2, 2, 2, 2, 2, 1, 2, 2, 2, 2, 2, 2, 1],
    [1, 2, 1, 1, 2, 1, 2, 1, 2, 1, 2, 1, 1, 2, 1],
    [1, 2, 1, 2, 2, 2, 2, 2, 2, 2, 2, 2, 1, 2, 1],
    [1, 2, 2, 2, 1, 1, 0, 0, 0, 1, 1, 2, 2, 2, 1],
    [1, 1, 1, 2, 1, 0, 0, 0, 0, 0, 1, 2, 1, 1, 1],
    [1, 2, 2, 2, 1, 1, 1, 1, 1, 1, 1, 2, 2, 2, 1],
    [1, 2, 1, 2, 2, 2, 2, 2, 2, 2, 2, 2, 1, 2, 1],
    [1, 2, 1, 1, 2, 1, 2, 1, 2, 1, 2, 1, 1, 2, 1],
    [1, 2, 2, 2, 2, 2, 2, 1, 2, 2, 2, 2, 2, 2, 1],
    [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1]
];

function drawMaze() {
    for (let r = 0; r < rows; r++) {
        for (let c = 0; c < cols; c++) {
            if (maze[r][c] === 1) {
                ctx.fillStyle = '#1e3799'; // Wall color
                ctx.fillRect(c * tileSize, r * tileSize, tileSize, tileSize);
            } else if (maze[r][c] === 2) {
                ctx.font = `${tileSize / 2}px Arial`;
                ctx.textAlign = 'center';
                ctx.textBaseline = 'middle';
                ctx.fillText('💶', c * tileSize + tileSize / 2, r * tileSize + tileSize / 2);
            }
        }
    }
}

class Entity {
    constructor(x, y, emoji) {
        this.x = x;
        this.y = y;
        this.emoji = emoji;
    }

    draw() {
        ctx.font = `${tileSize * 0.8}px Arial`;
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        ctx.fillText(this.emoji, this.x * tileSize + tileSize / 2, this.y * tileSize + tileSize / 2);
    }
}

class Player extends Entity {
    constructor(x, y) {
        super(x, y, '👨‍💼');
        this.nextDir = null;
        this.dir = null;
    }

    move() {
        if (this.nextDir) {
            if (this.canMove(this.nextDir)) {
                this.dir = this.nextDir;
                this.nextDir = null;
            }
        }

        if (this.dir) {
            if (this.canMove(this.dir)) {
                this.x += this.dir.x;
                this.y += this.dir.y;
                this.eat();
            }
        }
    }

    canMove(dir) {
        const nextX = this.x + dir.x;
        const nextY = this.y + dir.y;
        return maze[nextY][nextX] !== 1;
    }

    eat() {
        if (maze[this.y][this.x] === 2) {
            maze[this.y][this.x] = 0;
            score += 100;
            scoreElement.innerText = score;
        }
    }
}

class Enemy extends Entity {
    constructor(x, y) {
        super(x, y, '🇪🇺');
        this.dir = { x: 1, y: 0 };
    }

    move() {
        const directions = [
            { x: 1, y: 0 },
            { x: -1, y: 0 },
            { x: 0, y: 1 },
            { x: 0, y: -1 }
        ];

        // Simple random AI
        if (!this.canMove(this.dir) || Math.random() < 0.1) {
            const validDirs = directions.filter(d => this.canMove(d));
            if (validDirs.length > 0) {
                this.dir = validDirs[Math.floor(Math.random() * validDirs.length)];
            }
        }

        if (this.canMove(this.dir)) {
            this.x += this.dir.x;
            this.y += this.dir.y;
        }
    }

    canMove(dir) {
        const nextX = this.x + dir.x;
        const nextY = this.y + dir.y;
        return maze[nextY] && maze[nextY][nextX] !== 1;
    }
}

let score = 0;
const player = new Player(7, 5);
const enemies = [
    new Enemy(1, 1),
    new Enemy(13, 1),
    new Enemy(1, 9),
    new Enemy(13, 9)
];

let gameOver = false;

function update() {
    if (gameOver) return;

    player.move();

    enemies.forEach(enemy => {
        enemy.move();
        if (enemy.x === player.x && enemy.y === player.y) {
            gameOver = true;
            messageElement.innerText = "Η ΕΕ ΣΕ ΕΠΙΑΣΕ! ΤΕΛΟΣ ΠΑΙΧΝΙΔΙΟΥ!";
        }
    });

    // Check win condition
    const remainingMoney = maze.flat().filter(cell => cell === 2).length;
    if (remainingMoney === 0) {
        gameOver = true;
        messageElement.innerText = "ΤΑ ΕΦΑΓΕΣ ΟΛΑ! ΜΠΡΑΒΟ ΠΡΟΕΔΡΕ!";
        messageElement.style.color = "#44ff44";
    }
}

function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    drawMaze();
    player.draw();
    enemies.forEach(enemy => enemy.draw());
}

function gameLoop() {
    update();
    draw();
    if (!gameOver) {
        setTimeout(() => {
            requestAnimationFrame(gameLoop);
        }, 200); // Slow down the game
    }
}

window.addEventListener('keydown', (e) => {
    switch (e.key) {
        case 'ArrowUp':
            player.nextDir = { x: 0, y: -1 };
            break;
        case 'ArrowDown':
            player.nextDir = { x: 0, y: 1 };
            break;
        case 'ArrowLeft':
            player.nextDir = { x: -1, y: 0 };
            break;
        case 'ArrowRight':
            player.nextDir = { x: 1, y: 0 };
            break;
    }
});

gameLoop();
