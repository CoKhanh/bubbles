const myCanvas = document.getElementById('myCanvas');

myCanvas.width = window.innerWidth;
myCanvas.height = window.innerHeight;

var ctx = myCanvas.getContext("2d");

// ctx.fillStyle = 'rgba(255,0,0,0.5)'
// ctx.fillRect(100, 100, 100, 100)
// ctx.fillStyle = 'rgba(255,0,255,0.5)'
// ctx.fillRect(200, 300, 100, 100)
// ctx.fillStyle = 'rgba(255,255,0,0.3)'
// ctx.fillRect(30, 300, 100, 100)

// // Line
// ctx.beginPath();
// // Define where path begin
// ctx.moveTo(50, 300);
// ctx.lineTo(300, 100);
// ctx.lineTo(400, 400)
// ctx.strokeStyle = 'blue'
// ctx.stroke();

// // Circle with arc

// for (let i = 0; i < 100; i++) {
//     const x = Math.random() * window.innerWidth;
//     const y = Math.random() * window.innerHeight;
//     ctx.beginPath();

//     ctx.arc(x, y, 30, 0, Math.PI * 2, false);
//     // ctx.fillStyle = 'rgba(255,0,220,0.5)'
//     ctx.stroke()
// }

let mouse = {
    x: undefined,
    y: undefined,
}

const maxRadius = 100;

window.addEventListener('mousemove', function(event) {
    mouse.x = event.x;
    mouse.y = event.y;
});

function Circle(x, y, radius, dx, dy) {
    this.x = x;
    this.y = y;
    this.dx = dx;
    this.dy = dy;
    this.radius = radius;
    this.minRadius = radius;
    this.red = Math.floor(Math.random() * 255);
    this.green = Math.floor(Math.random() * 255);
    this.blue = Math.floor(Math.random() * 255);

    this.draw = function() {

        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
        ctx.fillStyle = `rgba(${this.red},${this.green},${this.blue},0.5)`
        ctx.fill();
    }

    this.update = function() {
        if (this.x + this.radius > innerWidth || this.x - this.radius < 0) {
            this.dx = -this.dx;
        }

        if (this.y + this.radius > innerHeight || this.y - this.radius < 0) {
            this.dy = -this.dy;
        }

        this.x += this.dx;
        this.y += this.dy;

        // interactivity
        if (
            mouse.x - this.x < 80
            && mouse.x - this.x > -80
            && mouse.y - this.y < 80
            && mouse.y - this.y > -80
        ) {
            if (this.radius < maxRadius) {
                this.radius += 1;
            }
        } else if (this.radius > this.minRadius) {
            this.radius -= 1;
        }

        this.draw();
    }
}

let circlesArray = [];

for (let i = 0; i < 1000; i++) {
    const radius = Math.random() * 10 + 1;
    const x = Math.random() * (innerWidth - radius * 2) + radius;
    const y = Math.random() * (innerHeight - radius * 2) + radius;
    const dx = (Math.random() - 0.5) * 2;
    const dy = (Math.random() - 0.5) * 2;
    circlesArray.push(new Circle(x, y, radius, dx, dy))
}

function animate() {
    requestAnimationFrame(animate);
    ctx.clearRect(0, 0, innerWidth, innerHeight)

    for (circle of circlesArray) {
        circle.update()
    }
}

animate();