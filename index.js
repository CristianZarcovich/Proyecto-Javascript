function calcularPromedio() {
const notasPromedio = [];
const nota1 = prompt("Ingrese nota del primer trimestre");
const nota2 = prompt("Ingrese nota del segundo trimestre");
const nota3 = prompt("Ingrese nota del tercer trimestre");
notasPromedio.push(nota1, nota2, nota3);
  const promedio = (parseInt(nota1) + parseInt(nota2) + parseInt(nota3)) / notasPromedio.length
  let mensajePromocion = "No promociona."

  if (promedio >= 8){
    mensajePromocion = "¡Felicidades, promocionaste!"
  }
  alert("El promedio es " + promedio + ". " + mensajePromocion)
} 

calcularPromedio();