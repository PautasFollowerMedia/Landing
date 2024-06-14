export default class AnimatedImage {
    images = {};
    frame = 0;
    elapsed = 0;

    didFinishLoading = false;

    stopped;
    didStop = false;

    constructor(size, path, startFrame, framesNumber, framerate, loops, stopped = null) {
        this.size = size;
        this.path = path;
        this.startFrame = startFrame;
        this.framesNumber = framesNumber;
        this.frameTime = 1 / framerate;
        this.loops = loops;
        this.stopped = stopped;

        for (let i = 0; i < framesNumber; i++) {
            let image = new Image(size.x, size.y);
            image.src = path + (startFrame + i) + '.png';
            image.onload = () => {
                this.images[i] = image;
                if (Object.keys(this.images).length === framesNumber) {
                    this.didFinishLoading = true;
                }
            }
        }
    }

    reset() {
        this.didStop = false;
        this.frame = 0;
    }

    render(ctx, deltaTime, position) {
        if (!this.didFinishLoading) {
            return;
        }

        if (this.didStop) {
            this.frame = this.framesNumber - 1;
        }
        else {
            this.elapsed += deltaTime;
            if (this.elapsed > this.frameTime) {
                this.frame += 1;
                if (this.frame >= this.framesNumber) {
                    if (this.loops)
                        this.frame = 0;
                    else {
                        this.frame = this.framesNumber - 1;
                        this.didStop = true;
                        this.stopped();
                    }
                }
                this.elapsed = 0;
            }
        }

        let image = this.images[this.frame];
        if (image) {
            ctx.drawImage(image, position.x, position.y, this.size.x, this.size.y);
        }
    }
}
