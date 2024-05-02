import Bubbles from './modules/bubbles/bubbles.js';

const body = document.getElementById("body");

const mainCanvas = document.getElementById("main_canvas");
const mainCtx = mainCanvas.getContext("2d");

const bubblesCanvas = document.getElementById("bubbles_canvas");
const bubblesCtx = bubblesCanvas.getContext("2d");

const whatwedoCanvas = document.getElementById("whatwedo_canvas");
const whatwedoCtx = whatwedoCanvas.getContext("2d");

let elapsed = 0;
let lastElapsed = 0;
let deltaTime = 0;

let img;

let animatedTextSize = 50;
let bubbleBackgroundColor = "#1C151D";
let isBubbleElementVisible = false;
let isBubbleSloganAnimationActive = false;
let bubbleAnimationElapsed = 0.0;
let bubbleAnimationDuration = 2.0;
let whatwedoBackgroundColor = "#1C151D";

let bubbles;

const isElementVisibleInViewport = (el, partiallyVisible = false) => {
    const { top, left, bottom, right } = el.getBoundingClientRect();
    const { innerHeight, innerWidth } = window;
    return partiallyVisible
        ?   ((top > 0 && top < innerHeight)
            || (bottom > 0 && bottom < innerHeight))
        && ((left > 0 && left < innerWidth)
            || (right > 0 && right < innerWidth))
        :   top >= 0 && left >= 0 && bottom <= innerHeight
        && right <= innerWidth;
};

function bwp(p) {
    return bubblesCanvas.width * p
}

function bhp(p) {
    return bubblesCanvas.height * p
}

function renderBubbleSlogan() {
    bubblesCtx.fillStyle = bubbleBackgroundColor;
    bubblesCtx.fillRect(0, 0, bubblesCanvas.width, bubblesCanvas.height);

    if (isBubbleSloganAnimationActive) {
        bubbleSloganAnimation();
    }

    bubblesCtx.fillStyle = "white";
    bubblesCtx.font = "50px Chocolates";
    bubblesCtx.fillText("From", bwp(0.1), bhp(0.2));
    bubblesCtx.font = "bold 50px Chocolates";
    bubblesCtx.fillText("ORDINARY SH*T", bwp(0.1), bhp(0.2) + 50);
    bubblesCtx.font = "50px Chocolates";
    bubblesCtx.fillText("we make", bwp(0.1), bhp(0.2) + 100);
    bubblesCtx.font = "bold italic " + animatedTextSize + "px Chocolates";
    bubblesCtx.fillText("EXTRAORDINARY", bwp(0.1), bhp(0.2) + 100 + animatedTextSize);
    bubblesCtx.font = "bold 50px Chocolates";
    bubblesCtx.fillText("THINGS.", bwp(0.1), bhp(0.2) + 150 + animatedTextSize);
}

function bubbleSloganAnimation() {
    if (bubbleAnimationElapsed <= bubbleAnimationDuration && isBubbleSloganAnimationActive) {
        let t = bubbleAnimationElapsed / bubbleAnimationDuration;
        loop(t);
        bubbleAnimationElapsed += deltaTime;
    }
    else {
        loop(1);
        bubbleAnimationElapsed = 0.0;
        isBubbleSloganAnimationActive = false;
    }

    function loop(t) {
        animatedTextSize = Math.sin(t * Math.PI) * 50 + 50;
    }
}

function renderWhatwedo() {
    whatwedoCtx.fillStyle = whatwedoBackgroundColor;
    whatwedoCtx.fillRect(0, 0, whatwedoCanvas.width, whatwedoCanvas.height);
}

const resizeObserver = new ResizeObserver(() => {
    let sumHeight = 0;

    mainCanvas.width = mainCanvas.clientWidth;
    mainCanvas.height = mainCanvas.clientWidth * 9 / 16;

    sumHeight += mainCanvas.height;

    img = new Image(mainCanvas.width, mainCanvas.height);
    img.src = "./resources/landing/1.png";
    img.onload = function () {
        mainCtx.drawImage(img, 0, 0, mainCanvas.clientWidth, mainCanvas.clientWidth * 9 / 16);
        console.log(mainCanvas.width + ' ' + mainCanvas.height)
    };

    bubblesCanvas.width = mainCanvas.width;
    bubblesCanvas.height = mainCanvas.height * 0.7;
    renderBubbleSlogan();

    sumHeight += bubblesCanvas.height;

    whatwedoCanvas.width = mainCanvas.width;
    whatwedoCanvas.height = mainCanvas.height;
    renderWhatwedo();

    sumHeight += whatwedoCanvas.height;

    body.height = sumHeight;

    if (bubbles == null)
        bubbles = new Bubbles(bubblesCanvas.width, bubblesCanvas.height, bubblesCtx);
    else
        bubbles.updateExtends(bubblesCanvas.width, bubblesCanvas.height);
})

function render(time) {
    elapsed = time / 1000.0;
    deltaTime = elapsed - lastElapsed;

    const {width, height} = bubblesCanvas;
    bubblesCtx.clearRect(0, 0, width, height);
    bubblesCtx.save();
    renderBubbleSlogan();
    bubbles?.draw(bubblesCtx, deltaTime);
    renderWhatwedo();
    bubblesCtx.restore();

    lastElapsed = elapsed;

    requestAnimationFrame(render);
}

function scroll() {
    const isBubbleCanvasVisible = isElementVisibleInViewport(bubblesCanvas);
    const isWhatwedoCanvasVisible = isElementVisibleInViewport(whatwedoCanvas);

    if (isBubbleCanvasVisible) {
        bubbleBackgroundColor = "#1C151D";
        if (!isBubbleSloganAnimationActive && !isBubbleElementVisible) {
            isBubbleSloganAnimationActive = true;
            isBubbleElementVisible = true;
        }
    }
    else {
        bubbleBackgroundColor = "#FF0000";
    }

    if (isWhatwedoCanvasVisible) {
        whatwedoBackgroundColor = "#1C151D";
    } else {
        whatwedoBackgroundColor = "#0000ff";
    }
}

function start() {
    resizeObserver.observe(mainCanvas);
    addEventListener("scroll", scroll);
    scroll();
    requestAnimationFrame(render);
}

/* Start */
start();
