export default class Bubbles {
    width = 0;
    height = 0;

    maxBubbles = 10;
    maxSpeed = 25;
    queue = [];

    maxSize = 100;
    minSize = 50;

    bubble1;
    bubble2;

    draw(bubblesCtx, deltaTime) {
        if (this.queue.length === 0) {
            return;
        }

        this.queue.forEach(img => {
            img.position.x += img.speedX * deltaTime;
            img.position.y += img.speedY * deltaTime;

            if (img.position.x > this.width || img.position.y < -img.size || img.position.y > this.height) {
                img.size = Math.random() * (this.maxSize - this.minSize) + this.minSize;
                img.position.x = -img.size;
                img.position.y = this.height * Math.random();
            }

            switch (img.id) {
                case 0:
                    bubblesCtx.drawImage(this.bubble1, img.position.x, img.position.y, img.size, img.size);
                    break;
                case 1:
                    bubblesCtx.drawImage(this.bubble2, img.position.x, img.position.y, img.size, img.size);
                    break;
            }
        })
    }

    updateExtends(width, height) {
        this.width = width;
        this.height = height;

        this.maxSize = width * 0.15;
        this.minSize = this.maxSize - 50;
    }

    constructor(width, height) {
        this.updateExtends(width, height);

        this.bubble1 = new Image();
        this.bubble1.src = "../resources/bubbles/bubble1.png";
        this.bubble2 = new Image();
        this.bubble2.src = "../resources/bubbles/bubble2.png";

        for (let i = 0; i < this.maxBubbles; i++) {
            let bubble = { };
            bubble.size = Math.random() * (this.maxSize - this.minSize) + this.minSize;
            bubble.position = { };
            bubble.position.x = width * Math.random();
            bubble.position.y = height * Math.random();
            bubble.speedX = this.maxSpeed * Math.random() + 15;
            bubble.speedY = Math.random() > 0.5 ? 1 : -1 * Math.random() * this.maxSpeed;

            if (Math.random() < 0.5) {
                bubble.id = 0;
            }
            else {
                bubble.id = 1;
            }

            this.queue.push(bubble);
        }
    }
}
