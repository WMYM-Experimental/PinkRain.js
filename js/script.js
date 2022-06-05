const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

const drops = [];
const colors = ["#f08080", "#f4978e"];

const getRandomInt = (min, max) => {
    return Math.floor(Math.random() * (max - min + 1) + min);
};

const getRandomFloat = (min, max) => {
    return Math.random() * (max - min + 1) + min;
};

class Drop {
    constructor(x, y, z, width, height, color) {
        this.x = x;
        this.y = y;
        this.z = z;
        this.width = width;
        this.height = height;
        this.color = color;
    }

    draw() {
        // this method draws the drop
        ctx.lineWidth = this.width;
        ctx.fillStyle = this.color;
        ctx.beginPath();
        ctx.fillRect(this.x, this.y, this.width, this.height);
        ctx.stroke();
    }

    update() {
        // this method makes the drop fall
        this.y = this.y + getRandomFloat(1, 5);
        if (this.y > canvas.height) {
            this.y = -1;
        }

        /*
        if (Math.random() > 0.5) {
            this.x = this.x + 1;
        } else {
            this.x = this.x - 1;
        }
        */

        this.draw();
    }
}

const d = new Drop(canvas.width / 2, 0, 10, 20, "#00ff00");

const init = () => {
    for (let index = 0; index < 25; index++) {
        drops.push(
            new Drop(
                getRandomInt(0, canvas.width),
                0,
                0,
                getRandomFloat(1, 2),
                getRandomFloat(10, 15),
                colors[getRandomInt(0, 1)]
            )
        );
    }
};

const animate = () => {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    drops.forEach((drp) => {
        drp.update();
    });
    requestAnimationFrame(animate);
};

init();
animate();
