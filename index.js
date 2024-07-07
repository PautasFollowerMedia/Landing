import Bubbles from './modules/bubbles/bubbles.js';
import AnimatedImage from "./modules/animatedImage/animatedImage.js";

const body = document.getElementById("body");

let isInitialized = false;

const headerCanvas = document.getElementById("main_canvas");
const headerCtx = headerCanvas.getContext("2d");
let headerIntroAnimation;
let headerLoopAnimation;
let headerIntroEnded = false;

const bubblesCanvas = document.getElementById("bubbles_canvas");
const bubblesCtx = bubblesCanvas.getContext("2d");

const whatwedoCanvas = document.getElementById("whatwedo_canvas");
const whatwedoCtx = whatwedoCanvas.getContext("2d");
let staticDonut;
let clockwiseDonut;
let counterClockwiseDonut;
const donutSize = 800;
let turnDonutClockwise = document.getElementById("clockwise");
let turnDonutCounterClockwise = document.getElementById("counterClockwise");

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
let whatwedoBackgroundColor = "#1c151d";

let bubbles;

const E_donutState = Object.freeze({
    idle: 0,
    clockwise: 1,
    counterClockwise: 2
});
let donutState = E_donutState.idle;

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

function renderHeader() {
    if (!headerIntroEnded && headerIntroAnimation) {
        headerIntroAnimation.render(headerCtx, deltaTime, {x: 0, y: 0});
    }
    else if (headerIntroEnded && headerLoopAnimation) {
        headerLoopAnimation.render(headerCtx, deltaTime, {x: 0, y: 0});
    }
}

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

    switch (donutState) {
        case E_donutState.idle:
            if (staticDonut) {
                staticDonut.render(whatwedoCtx, deltaTime, { x: -donutSize * 0.3, y: 0});
            }
            break;
        case E_donutState.clockwise:
            if (clockwiseDonut) {
                clockwiseDonut.render(whatwedoCtx, deltaTime, { x: -donutSize * 0.3, y: 0});
            }
            break;
        case E_donutState.counterClockwise:
            if (counterClockwiseDonut) {
                counterClockwiseDonut.render(whatwedoCtx, deltaTime, { x: -donutSize * 0.3, y: 0});
            }
            break;
    }
}

const resizeObserver = new ResizeObserver(() => {
    let sumHeight = 0;

    headerCanvas.width = headerCanvas.clientWidth;
    headerCanvas.height = headerCanvas.clientWidth * 9 / 16;

    sumHeight += headerCanvas.height;

    // img = new Image(mainCanvas.width, mainCanvas.height);
    // img.src = "./resources/landing/1.png";
    // img.onload = function () {
    //     mainCtx.drawImage(img, 0, 0, mainCanvas.clientWidth, mainCanvas.clientWidth * 9 / 16);
    //     console.log('canvas size ' + mainCanvas.width + ' ' + mainCanvas.height);
    // };

    renderHeader();

    bubblesCanvas.width = headerCanvas.width;
    bubblesCanvas.height = headerCanvas.height * 0.7;
    renderBubbleSlogan();

    sumHeight += bubblesCanvas.height;

    whatwedoCanvas.width = headerCanvas.width;
    whatwedoCanvas.height = 800;
    renderWhatwedo();

    sumHeight += whatwedoCanvas.height;

    body.height = sumHeight;

    init();

    bubbles.updateExtends(bubblesCanvas.width, bubblesCanvas.height);
})

function render(time) {
    elapsed = time / 1000.0;
    deltaTime = elapsed - lastElapsed;

    renderHeader();

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

    /* Debug */
    // if (isBubbleCanvasVisible) {
    //     bubbleBackgroundColor = "#1C151D";
    //     if (!isBubbleSloganAnimationActive && !isBubbleElementVisible) {
    //         isBubbleSloganAnimationActive = true;
    //         isBubbleElementVisible = true;
    //     }
    // }
    // else {
    //     bubbleBackgroundColor = "#FF0000";
    // }

    // if (isWhatwedoCanvasVisible) {
    //     whatwedoBackgroundColor = "#1C151D";
    // } else {
    //     whatwedoBackgroundColor = "#0000ff";
    // }
}

function start() {
    resizeObserver.observe(headerCanvas);
    addEventListener("scroll", scroll);
    scroll();
    requestAnimationFrame(render);
}

function init() {
    if (isInitialized) {
        return;
    }

    headerIntroAnimation = new AnimatedImage(
        { x: headerCanvas.width, y: headerCanvas.height },
        './resources/landing/',
        1,
        71,
        24,
        false,
        () => {
            headerIntroEnded = true;
        }
    );

    headerLoopAnimation = new AnimatedImage(
        { x: headerCanvas.width, y: headerCanvas.height },
        './resources/landing/',
        71,
        201 - 71,
        24,
        true
    );

    bubbles = new Bubbles(bubblesCanvas.width, bubblesCanvas.height, bubblesCtx);

    staticDonut = new AnimatedImage(
        { x: donutSize, y: donutSize },
        './resources/donut/',
        40,
        1,
        24,
        true
    );
    clockwiseDonut = new AnimatedImage(
        { x: donutSize, y: donutSize },
        './resources/donut/',
        63,
        22,
        24,
        false,
        () => { }
    );
    counterClockwiseDonut = new AnimatedImage(
        { x: donutSize, y: donutSize },
        './resources/donut/',
        40,
        22,
        24,
        false,
        () => { }
    );

    turnDonutClockwise.onclick = () => {
        donutState = E_donutState.clockwise;
        clockwiseDonut.reset();
    }
    turnDonutCounterClockwise.onclick = () => {
        donutState = E_donutState.counterClockwise;
        counterClockwiseDonut.reset();
    }

    isInitialized = true;
}

/* Start */
start();
