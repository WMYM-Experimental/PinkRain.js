const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

const drops = [];
const colors = ["#ff006e", "#f72585"];

const getRandomInt = (min, max) => {
    return Math.floor(Math.random() * (max - min + 1) + min);
};

const getRandomFloat = (min, max) => {
    return Math.random() * (max - min + 1) + min;
};

class Drop {
    constructor(x, y, z, width, height) {
        this.x = x;
        this.y = y;
        this.z = z;
        this.width = width;
        this.height = height;
        if (this.z > 8) {
            this.color = colors[0];
        } else {
            this.color = colors[1];
        }
    }

    draw() {
        // this method draws the drop
        ctx.lineWidth = this.width;
        ctx.fillStyle = this.color;
        ctx.beginPath();
        ctx.shadowColor = this.color;
        ctx.shadowBlur = 20;
        ctx.fillRect(this.x, this.y, this.width, this.height);
        ctx.stroke();
    }

    update() {
        // this method makes the drop fall
        this.y = this.y + this.z;

        // move depends on random value
        if (Math.random() > 0.5) {
            this.x += Math.sin(Math.PI / 2) * 3;
        } else {
            this.x -= Math.sin(-Math.PI / 2) * 3;
        }

        // check collision with the lateral walls
        if (this.x > canvas.width) {
            this.x = 0;
        } else if (this.x < 0) {
            this.x = canvas.width;
        }

        // check collision with the bottom wall
        if (this.y > canvas.height) {
            this.y = 1;
        }

        this.draw();
    }
}

const init = () => {
    // this method initializes the drops
    for (let i = 0; i < canvas.width; i++) {
        const drop = new Drop(
            i,
            getRandomInt(0, canvas.height),
            getRandomInt(3, 13),
            getRandomFloat(0.5, 1.5),
            getRandomInt(10, 15)
        );
        drops.push(drop);
    }
};

const animate = () => {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    drops.forEach((drp) => {
        drp.update();
    });
    requestAnimationFrame(animate);
};

window.addEventListener("resize", () => {
    drops.splice(0, drops.length);
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    init();
});

init();
animate();
