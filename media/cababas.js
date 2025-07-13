class Cababas {
    constructor() {
        this.body = document.body;
        this.cababas = document.createElement("img");
        this.cababas.className = "cababas";
        this.cababas.draggable = false;
        this.cababas.src = "./cababasIdle.png";
        this.body.appendChild(this.cababas);

        this.gravity = -980.0;
        this.jumpVelocity = 500;
        this.moveVelocity = 100;
        this.squishSeconds = 0.1;

        this.heightMultiplier = 1;
        this.widthMultiplier = 1;
        this.direction = 1;
        this.cababasX = 0;
        this.cababasY = 0;
        this.initialX = this.cababasX;
        this.jumping = false;
        this.squishing = false;

        this.init();
    }

    init() {
        this.setX(0);
        this.setY(0);
        this.refreshData();
        this.cababas.addEventListener("click", () => this.jump());
        window.addEventListener("resize", () => this.refreshData());

        this.jumpRandomly();
    }

    getRandomRange(min, max) {
        return Math.random() * (max - min) + min;
    }

    async jumpRandomly() {
        while (true) {
            await this.jump();
            await new Promise((resolve) =>
                setTimeout(resolve, this.getRandomRange(2000, 6000))
            );
        }
    }

    updateSize() {
        this.cababas.style.width = 3 + "cm";
        this.cababas.style.height = 3 * this.heightMultiplier + "cm";
        this.cababas.style.transform = `scaleX(${
            -this.direction * this.widthMultiplier
        })`;
    }

    refreshData() {
        this.updateSize();
        this.setX(this.cababasX);
        this.setY(this.cababasY);
    }

    calculateDisplacement(
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

    setX(x) {
        const clamped = Math.min(
            Math.max(0, x),
            this.body.offsetWidth - this.cababas.offsetWidth
        );
        this.cababasX = clamped;
        this.cababas.style.left = clamped + "px";
    }

    setY(y) {
        const clamped = Math.max(0, y);
        this.cababasY = clamped;
        this.cababas.style.bottom = clamped + "px";
    }

    jump() {
        if (this.jumping) {
            return;
        }
        this.jumping = true;
        this.direction = Math.random() < 0.5 ? 1 : -1;
        this.initialX = this.cababasX;

        if (this.squishing) {
            return;
        }

        let startTime = performance.now();

        const getTimeElapsed = () => (performance.now() - startTime) / 1000;

        const squishTick = () => {
            const timeElapsed = getTimeElapsed();
            this.squishing = true;

            this.heightMultiplier = this.calculateDisplacement(
                -0.5,
                1,
                1.5,
                timeElapsed
            );
            this.widthMultiplier = this.calculateDisplacement(
                0.5,
                1,
                -1.5,
                timeElapsed
            );

            this.refreshData();

            if (this.heightMultiplier < 1) {
                requestAnimationFrame(squishTick);
                return;
            }

            this.heightMultiplier = 1;
            this.widthMultiplier = 1;
            this.squishing = false;

            if (this.jumping) {
                startTime = performance.now();
                requestAnimationFrame(jumpTick);
            }
        };

        const jumpTick = () => {
            const timeElapsed = getTimeElapsed();
            this.cababasY = this.calculateDisplacement(
                this.jumpVelocity,
                0,
                this.gravity,
                timeElapsed
            );
            this.cababasX = this.calculateDisplacement(
                this.moveVelocity * this.direction,
                this.initialX,
                0,
                timeElapsed
            );

            this.refreshData();

            if (this.cababasY > 0) {
                requestAnimationFrame(jumpTick);
            } else {
                startTime = performance.now();
                this.jumping = false;
                requestAnimationFrame(squishTick);
            }
        };

        requestAnimationFrame(squishTick);
    }
}
new Cababas();
// let cababas = document.createElement("img");
// cababas.className = "cababas";
// cababas.draggable = false;
// cababas.src = cababasImage;
// document.body.appendChild(cababas);