/* p5 */

/* Constants */
const fontSize = 102;
const rotY = 2.12463;
const rotX = 3.48498;

const textRows = [
    'Brand Strategy',
    'Social Media',
    'Performance Ads',
    'DSP',
    'Producción Audiovisual',
    'Sitios Web',
    'Market Place',
    'Brand Strategy',
    'Social Media',
    'Performance Ads',
    'DSP',
    'Producción Audiovisual',
    'Sitios Web',
    'Market Place',
    'Brand Strategy',
    'Social Media',
    'Performance Ads',
    'DSP',
    'Producción Audiovisual',
    'Sitios Web',
    'Market Place',
    'Brand Strategy',
    'Social Media',
    'Performance Ads',
    'DSP',
    'Producción Audiovisual',
    'Sitios Web',
    'Market Place',
    'Brand Strategy',
    'Social Media',
    'Performance Ads',
    'DSP',
    'Producción Audiovisual',
    'Sitios Web',
    'Market Place',
    'Brand Strategy',
    'Social Media',
    'Performance Ads',
    'DSP',
    'Producción Audiovisual',
    'Sitios Web',
    'Market Place',
];

const spacing = {
    'D': 60,
    'e': 50,
    'f': 30,
    'i': 25,
    'W': 60,
    'c': 50,
    't': 30,
    'o': 40,
    'm': 60,
    'd': 55,
    'u': 50,
    's': 40,
    'M': 60,
    'l': 25,
    'A': 50,
    'r': 40,
    'n': 40,
};

const offset = {
    'i': -7,
    't': -7,
    'f': -10,
    'e': 7,
    'd': 7,
    'v': 10,
    'l': -13,
    'a': 7,
    'b': 13,
    'c': 7,
    'm': 13,
    'u': 7,
};

const allTextHeight = textRows.length * fontSize;
const allTextRot = textRows.length * rotY;

dnaDiv = document.getElementById("dna_div");

/**/
let font;
let scrollOffset = 0;

function preload() {
    font = loadFont("resources/fonts/TT Chocolates Trial Regular.otf");
}

function setup() {
    let dnaDivRect = dnaDiv.getBoundingClientRect();

    let p5Canvas = createCanvas(dnaDivRect.width, 500, WEBGL);
    p5Canvas.parent("dna_div");

    textSize(fontSize);
    textFont(font);
    textAlign(CENTER, CENTER);
}

function draw() {
    background(28, 21, 29);

    push();
    translate(600 - (scrollOffset * 0.2), -allTextHeight/2 + scrollOffset, 0);
    rotateZ(radians(10.5));
    rotateY(radians(-allTextRot/2));
    for (i = 0; i < textRows.length; i++) {
        const currentRow = textRows[i];
        const currentRowWidth = currentRow.length * 50;
        const currentRowTwist = currentRow.length * rotX;

        push();
        yPosition = (-allTextHeight / 2) + (fontSize * i) + scrollOffset;
        rotateY(radians(getYRotationBasedOnYPosition(yPosition)));
        translate(-currentRowWidth / 2, 0, 0);
        translate(0, fontSize * i, 0);
        for (j = 0; j < currentRow.length; j++) {
            if (j > 0) {
                translate(spacing[currentRow[j-1]] ?? 50, 0, 0);
            }
            push();
            rotateX(radians((currentRowTwist/2) - (rotX * j)));
            text(currentRow[j], offset[currentRow[j]] ?? 0, 0);
            pop();
        }
        pop();
    }
    pop();
}

function getYRotationBasedOnYPosition(yPosition) {
    return yPosition * 0.1;
}

function mouseWheel(event) {
    if (event.delta > 0) {
        scrollOffset -= fontSize * 0.3;
    }
    else {
        scrollOffset += fontSize * 0.3;
    }

    scrollOffset = Math.max(-1000, Math.min(scrollOffset, 1000));
}
