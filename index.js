function calcularPromedio() {
  const primerInput = document.getElementById("primerTrimestre");
  const segundoInput = document.getElementById("segundoTrimestre");
  const tercerInput = document.getElementById("tercerTrimestre");
  const promedio = (parseInt(primerInput.value) + parseInt(segundoInput.value) + parseInt(tercerInput.value)) / 3
  let mensajePromocion = "No promociona."

  if (promedio >= 8){
    mensajePromocion = "¡Felicidades, promocionaste!"
  }
  alert("El promedio es " + promedio + ". " + mensajePromocion)
} 
