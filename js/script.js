const canvas = document.getElementById("canvas")
const ctx = canvas.getContext("2d")
const width = document.getElementById("canvas").width
const height = document.getElementById("canvas").height

const centerX = width / 2
const centerY = height / 2
const radius = width / 2

let items = ['10% OFF EXTRA', 'UNDIE GRATIS', 'ENVIO GRATIS', 'BONO $50.000']
//deben ser entre la cantidad de posibilidades (se ponen dobles ya que se repiten en este caso)
let pesos = [2, 3, 4, 5]

let currentDeg = 0
let step = 360 / (items.length * 2)
let colors = []
let itemDegs = {}

color1 = { r: 24, g: 44, b: 81 }
color2 = { r: 33, g: 51, b: 89 }
color3 = { r: 62, g: 79, b: 109 }
color4 = { r: 112, g: 124, b: 148 }

for (let i = 0; i < (items.length * 2) + 1; i++) {
  if (i === 0 || i === 4) colors.push(color1)
  if (i === 1 || i === 5) colors.push(color2)
  if (i === 2 || i === 6) colors.push(color3)
  if (i === 3 || i === 7) colors.push(color4)
}

function createWheel() {
  step = 360 / (items.length * 2)
  colors = []
  for (let i = 0; i < (items.length * 2) + 1; i++) {
    if (i === 0 || i === 4) colors.push(color1)
    if (i === 1 || i === 5) colors.push(color2)
    if (i === 2 || i === 6) colors.push(color3)
    if (i === 3 || i === 7) colors.push(color4)
  }
  draw()
}
draw()

function draw() {
  ctx.beginPath();
  ctx.arc(centerX, centerY, radius, toRad(0), toRad(360))
  ctx.fillStyle = `rgb(${250},${250},${250})`
  ctx.lineTo(centerX, centerY);
  ctx.fill()

  let startDeg = currentDeg;
  for (let i = 0; i < (items.length * 2); i++, startDeg += step) {
    let endDeg = startDeg + step

    color = colors[i]
    let colorStyle = `rgb(${color.r},${color.g},${color.b})`

    ctx.beginPath();
    rad = toRad(360 / step);
    ctx.arc(centerX, centerY, radius - 2, toRad(startDeg), toRad(endDeg))
    let colorStyle2 = `rgb(${color.r - 30},${color.g - 30},${color.b - 30})`
    ctx.fillStyle = colorStyle2
    ctx.lineTo(centerX, centerY);
    ctx.fill()

    ctx.beginPath();
    rad = toRad(360 / step);
    ctx.arc(centerX, centerY, radius - 30, toRad(startDeg), toRad(endDeg))
    ctx.fillStyle = colorStyle
    ctx.lineTo(centerX, centerY);
    ctx.fill()

    // draw text
    ctx.save();
    ctx.translate(centerX, centerY);
    ctx.rotate(toRad((startDeg + endDeg) / 2));
    ctx.textAlign = "center";
    if (color.r > 150 || color.g > 150 || color.b > 150) {
      ctx.fillStyle = "#000";
    }
    else {
      ctx.fillStyle = "#fff";
    }
    ctx.font = 'bold 18px serif';
    if (i > 3) {
      ctx.fillText(items[i - 4], 130, 10);
    } else {
      ctx.fillText(items[i], 130, 10);
    }
    ctx.restore();

    itemDegs[items[i]] =
    {
      "startDeg": startDeg,
      "endDeg": endDeg
    }

    // check winner
    if (startDeg % 360 < 360 && startDeg % 360 > 270 && endDeg % 360 > 0 && endDeg % 360 < 90) {
      if (i > 3) {
        document.getElementById("winner").innerHTML = items[i - 4]
      } else {
        document.getElementById("winner").innerHTML = items[i]
      }

    }
  }
}


let speed = 0
let maxRotation = randomRange(360 * 3, 360 * 6)
let pause = false
function animate() {
  if (pause) {
    return
  }
  speed = easeOutSine(getPercent(currentDeg, maxRotation, 0)) * 20
  if (speed < 0.01) {
    speed = 0
    pause = true
  }
  currentDeg += speed
  draw()
  window.requestAnimationFrame(animate);
}

function spin() {
  if (speed != 0) {
    return
  }

  maxRotation = 0;
  currentDeg = 0
  createWheel()
  draw();
  maxRotation = (360 * 6) - itemDegs[randomWin(pesos)].endDeg + 10
  itemDegs = {}
  console.log("max", maxRotation)
  console.log(itemDegs);
  pause = false
  window.requestAnimationFrame(animate);
}
