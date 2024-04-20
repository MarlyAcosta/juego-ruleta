function toRad(deg) {
  return deg * (Math.PI / 180.0);
}
function randomRange(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}
function easeOutSine(x) {
  return Math.sin((x * Math.PI) / 2);
}
// get percent between 2 number
function getPercent(input, min, max) {
  return (((input - min) * 100) / (max - min)) / 100
}

function randomWin(pesos) {
  let total = 0
  for (let i = 0; i < (pesos.length); i++) {
    total += pesos[i]
  }
  number = Math.round(Math.random() * (total - 1) + parseInt(1));
  /* funcion para generar pesos (entre mas peso tenga mas veces aparece)
   10% OFF EXTRA : 1 y 2    
   UNDIE GRATIS : 3, 4, 5   
   ENVIO GRATIS : 6, 7, 8, 9  
   BONO $50.000 : 10, 11, 12, 13, 14
 */
  console.log(number)
  let ganador = 'none'
  if (number < pesos[0]) {
    ganador = '10% OFF EXTRA'
  } else if (number > pesos[1] && number <= (pesos[1] + pesos[0])) {
    ganador = 'UNDIE GRATIS'
  } else if (number > (pesos[1] + pesos[0]) && number <= (pesos[2] + pesos[1] + pesos[0])) {
    ganador = 'ENVIO GRATIS'
  } else if (number > (pesos[2] + pesos[1] + pesos[0])) {
    ganador = 'BONO $50.000'
  }
  console.log(ganador)
  return ganador
}