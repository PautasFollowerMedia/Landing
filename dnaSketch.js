/* p5 */

/* Constants */
const fontSize = 102;
const rotY = 6.12463;
const rotX = 3.48498;

const textRows = [
  "Brand Strategy",
  "Social Media",
  "Performance Ads",
  "DSP",
  "Producción Audiovisual",
  "Sitios Web",
  "Market Place",
  "Brand Strategy",
  "Social Media",
  "Performance Ads",
  "DSP",
  "Producción Audiovisual",
  "Sitios Web",
  "Market Place",
  "Brand Strategy",
  "Social Media",
  "Performance Ads",
  "DSP",
  "Producción Audiovisual",
  "Sitios Web",
  "Market Place",
  "Brand Strategy",
  "Social Media",
  "Performance Ads",
  "DSP",
  "Producción Audiovisual",
  "Sitios Web",
  "Market Place",
  "Brand Strategy",
  "Social Media",
  "Performance Ads",
  "DSP",
  "Producción Audiovisual",
  "Sitios Web",
  "Market Place",
  "Brand Strategy",
  "Social Media",
  "Performance Ads",
  "DSP",
  "Producción Audiovisual",
  "Sitios Web",
  "Market Place",
];

const spacing = {
  D: 60,
  e: 50,
  f: 30,
  i: 25,
  W: 60,
  c: 50,
  t: 30,
  o: 40,
  m: 60,
  d: 55,
  u: 50,
  s: 40,
  M: 60,
  l: 25,
  A: 50,
  r: 40,
  n: 40,
};

const offset = {
  i: -7,
  t: -7,
  f: -10,
  e: 7,
  d: 7,
  v: 10,
  l: -13,
  a: 7,
  b: 13,
  c: 7,
  m: 13,
  u: 7,
};

const allTextHeight = textRows.length * fontSize;
const allTextRot = textRows.length * rotY;

dnaDiv = document.getElementById("dna_div");

/**/
let font;
let scrollOffset = 0;

function preload() {
  font = loadFont("resources/fonts/TT Chocolates Trial Bold.otf");
}

function setup() {
  let dnaDivRect = dnaDiv.getBoundingClientRect();

  let p5Canvas = createCanvas(dnaDivRect.width, 800, WEBGL);
  p5Canvas.parent("dna_div");

  textSize(fontSize);
  textFont(font);
  textAlign(CENTER, CENTER);

  frameRate(60);
}

function draw() {
  background(28, 21, 29);

  push();
  const scrollValue = getScrollValue();
  rotateZ(radians(7.5));
  translate(0, -allTextHeight / 2 - scrollValue, 0);
  // rotateY(radians(-allTextRot / 2) + 180);
  for (i = 0; i < textRows.length; i++) {
    const currentRow = textRows[i];
    const currentRowWidth = currentRow.length * 50;
    const currentRowTwist = currentRow.length * rotX;

    push();
    const yPosition = -allTextHeight / 2 + fontSize * i + scrollValue;
    translate(300, fontSize * i, 0);
    rotateY(radians(getYRotationBasedOnYPosition(yPosition)));
    translate(-currentRowWidth / 2, 0, 0);
    for (j = 0; j < currentRow.length; j++) {
      if (j > 0) {
        translate(spacing[currentRow[j - 1]] ?? 50, 0, 0);
      }
      push();
      rotateX(radians(currentRowTwist / 2 - rotX * j));
      text(currentRow[j], offset[currentRow[j]] ?? 0, 0);
      pop();
    }
    pop();
  }
  pop();
}

function getYRotationBasedOnYPosition(yPosition) {
  const t = inverseLinearInterpolation(
    -allTextHeight / 2,
    allTextHeight / 2,
    yPosition,
  );
  return linearInterpolation(80, -60, t);
}

function getScrollPercent() {
  var h = document.documentElement,
    b = document.body,
    st = "scrollTop",
    sh = "scrollHeight";
  return (h[st] || b[st]) / ((h[sh] || b[sh]) - h.clientHeight);
}

function getScrollValue() {
  var h = document.documentElement,
    b = document.body,
    st = "scrollTop";
  return h[st] || b[st];
}

function getScrollHeight() {
  var h = document.documentElement,
    b = document.body,
    sh = "scrollHeight";

  return h[sh] || b[sh];
}

function linearInterpolation(a, b, t) {
  return (1.0 - t) * a + b * t;
}

function inverseLinearInterpolation(a, b, v) {
  return (v - a) / (b - a);
}

function remap(iMin, iMax, oMin, oMax, v) {
  t = inverseLinearInterpolation(iMin, iMax, v);
  return linearInterpolation(oMin, oMax, t);
}

function clamp(number, min, max) {
  return Math.max(min, Math.min(number, max));
}

// function mouseWheel(event) {
//   if (event.delta > 0) {
//     scrollOffset -= fontSize * 0.3;
//   } else {
//     scrollOffset += fontSize * 0.3;
//   }

//   scrollOffset = Math.max(-1000, Math.min(scrollOffset, 1000));
// }
