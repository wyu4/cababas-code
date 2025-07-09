const body = document.body;
const cababas = document.getElementById("cababas");
const xLabel = document.getElementById("x-label");
const yLabel = document.getElementById("y-label");
const widthLabel = document.getElementById("width-label");
const jumpButton = document.getElementById("jump-button");

const gravity = -980.0;
const jumpVelocity = 400;

let heightMultiplier = 1;
let cababasX = 0;
let cababasY = 0;
let jumping = false;

function updateSize() {
    const width = body.offsetWidth * 0.25;
    widthLabel.textContent = "Width: " + width;
    cababas.style.width = width + "px";
    cababas.style.height = width * heightMultiplier + "px";
}

function refresh() {
    updateSize();
    xLabel.textContent = "X: " + cababasX;
    yLabel.textContent = "Y: " + cababasY;
}

function calculateDisplacement(
    initialVelocity,
    initialDisplacement,
    acceleration,
    timeElapsed
) {
    return (
        initialVelocity * timeElapsed +
        0.5 * acceleration * (timeElapsed * timeElapsed) +
        initialDisplacement
    );
}

function setX(x) {
    cababasX = x;
    cababas.style.bottom = x + "px";
}

function setY(y) {
    cababasY = y;
    cababas.style.bottom = Math.max(0, y) + "px";
}

function jump() {
    if (jumping) {
        return;
    }
    jumping = true;

    console.log("Jumping...");
    const startTime = performance.now();

    const update = () => {
        const timeElapsed = (performance.now() - startTime) / 1000;
        setY(calculateDisplacement(jumpVelocity, 0, gravity, timeElapsed));

        if (cababasY > 0) {
            requestAnimationFrame(update);
        } else {
            jumping = false;
        }
    };

    requestAnimationFrame(update);
}

cababas.addEventListener("click", jump);
jumpButton.addEventListener("click", jump);

window.addEventListener("load", () => {
    refresh();
    setX(body.offsetWidth - cababas.offsetWidth);
    setY(0);
});
window.addEventListener("resize", refresh);
