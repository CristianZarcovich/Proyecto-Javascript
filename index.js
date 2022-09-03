const alumnos = []

const edad = prompt("Por favor, ingrese su edad");

function cargarAlumno() {
  const alumno1 = {
    notas: []
  }

  alumno1.nombre = document.getElementById("nombre").value;
  alumno1.apellido = document.getElementById("apellido").value;
  alumno1.edad = edad;
  alumno1.notas.push (document.getElementById("nota1").value);
  alumno1.notas.push (document.getElementById("nota2").value);
  alumno1.notas.push (document.getElementById("nota3").value);
  alumno1.promedio = (parseInt(alumno1.notas[0]) + parseInt(alumno1.notas[1]) + parseInt(alumno1.notas[2])) / alumno1.notas.length

  let mensaje = "Tu promedio es: " + alumno1.promedio + ". No promociona.";

  if (isNaN(alumno1.promedio)) {
    mensaje = "Por favor, ingrese todas las notas";
  } else if (alumno1.promedio >= 8) {
    mensaje = "Felicidades, promocionaste!" + " Tu promedio es: " + alumno1.promedio; 
  } else if (alumno1.promdio >= 10) {
    mensaje = "Ingrese valores correctos";
  }

  alert(mensaje);
  
  if (!isNaN(alumno1.promedio)) {
    alumnos.push(alumno1)
  }
  console.log(alumno1);
  imprimirAlumnoMayorPromedio();
}

function imprimirAlumnoMayorPromedio() {
  const promedios = alumnos.map((alumno) => {return alumno.promedio});
  const mayorPromedio = Math.max(...promedios);
  console.log("El mayor promedio es: " + mayorPromedio)
}