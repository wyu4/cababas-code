const body = document.body;
const cababas = document.getElementById("cababas");
const xLabel = document.getElementById("x-label");
const yLabel = document.getElementById("y-label");
const widthLabel = document.getElementById("width-label");
const jumpButton = document.getElementById("jump-button");

const gravity = -980.0;
const jumpVelocity = 500;
const moveVelocity = 100;
const squishSeconds = 0.1;

let heightMultiplier = 1;
let widthMultiplier = 1;
let direction = 1;
let cababasX = 0;
let cababasY = 0;
let initialX = cababasX;
let jumping = false;
let squishing = false;

function updateSize() {
    const width = body.offsetWidth * 0.25;
    widthLabel.textContent = "Width: " + width;
    cababas.style.width = width + "px";
    cababas.style.height = width * heightMultiplier + "px";
    cababas.style.transform = `scaleX(${-direction * widthMultiplier})`;
}

function refreshData() {
    updateSize();
    xLabel.textContent = "X: " + cababasX;
    yLabel.textContent = "Y: " + cababasY;
    setX(cababasX);
    setY(cababasY);
}

function calculateDisplacement(
    initialVelocity,
    initialDisplacement,
    acceleration,
    secondsElapsed
) {
    return (
        initialVelocity * secondsElapsed +
        0.5 * acceleration * (secondsElapsed * secondsElapsed) +
        initialDisplacement
    );
}

function setX(x) {
    const clamped = Math.min(Math.max(0, x), body.offsetWidth);
    cababasX = clamped;
    cababas.style.left = clamped + "px";
}

function setY(y) {
    const clamped = Math.max(0, y);
    cababasY = clamped;
    cababas.style.bottom = clamped + "px";
}

function jump() {
    if (jumping) {
        return;
    }
    jumping = true;
    direction = Math.random() < 0.5 ? 1 : -1;
    initialX = cababasX;

    if (squishing) {
        return;
    }

    let startTime = performance.now();

    const getTimeElapsed = () => (performance.now() - startTime) / 1000;

    const squishTick = () => {
        const timeElapsed = getTimeElapsed();
        squishing = true;

        heightMultiplier = calculateDisplacement(-0.5, 1, 1, timeElapsed);
        widthMultiplier = calculateDisplacement(0.5, 1, -1, timeElapsed);

        refreshData();

        if (heightMultiplier < 1) {
            requestAnimationFrame(squishTick);
            return;
        }

        heightMultiplier = 1;
        widthMultiplier = 1;
        squishing = false;

        if (jumping) {
            startTime = performance.now();
            requestAnimationFrame(jumpTick);
        }
    };

    const jumpTick = () => {
        const timeElapsed = getTimeElapsed();
        cababasY = calculateDisplacement(jumpVelocity, 0, gravity, timeElapsed);
        cababasX = calculateDisplacement(
            moveVelocity * direction,
            initialX,
            0,
            timeElapsed
        );

        refreshData();

        if (cababasY > 0) {
            requestAnimationFrame(jumpTick);
        } else {
            startTime = performance.now();
            jumping = false;
            requestAnimationFrame(squishTick);
        }
    };

    requestAnimationFrame(squishTick);
}

cababas.addEventListener("click", jump);
jumpButton.addEventListener("click", jump);

window.addEventListener("load", () => {
    setX(body.offsetWidth - cababas.offsetWidth);
    setY(0);
    refreshData();
});
window.addEventListener("resize", refreshData);

////////////////////////////////////////////////////////

function getRandomRange(min, max) {
    return Math.random() * (max - min) + min;
}

async function jumpRandomly() {
    while (true) {
        await jump();
        await new Promise((resolve) =>
            setTimeout(resolve, getRandomRange(2000, 6000))
        );
    }
}
jumpRandomly();
