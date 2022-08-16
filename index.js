let nombre = prompt("Ingrese su nombre, por favor");
while (nombre != "ESC") {
  alert("Usted a ingresado: " + nombre);
  nombre = prompt("Ingrese otro nombre");
  
  if (nombre == "ESC") {
    alert ("¡Muchas gracias por participar!")
  }
}