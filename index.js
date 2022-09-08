const alumnos = []

function cargarAlumno() {
  const alumno1 = {
    notas: []
  }

  alumno1.nombre = document.querySelector("#nombre").value;
  alumno1.apellido = document.querySelector("#apellido").value;
  alumno1.edad = document.querySelector("#edad").value;
  alumno1.notas.push (document.querySelector("#nota1").value);
  alumno1.notas.push (document.querySelector("#nota2").value);
  alumno1.notas.push (document.querySelector("#nota3").value);
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

  imprimirAlumnoconMayorPromedio();
}

function retornarAlumnoMayorPromedio() {
  let alumnoMayorPromedio;
  let mayorPromedio = 0;
  for (i = 0; i < alumnos.length; i++) { 
    const alumno = alumnos[i]; 
    if (alumno.promedio >= mayorPromedio) {
      mayorPromedio = alumno.promedio;
      alumnoMayorPromedio = alumno;
    }
  }

  return alumnoMayorPromedio;
}


function imprimirAlumnoconMayorPromedio() {
  const alumnoMayorPromedio = retornarAlumnoMayorPromedio();

  const stringHTML = `<span>Nombre: ${alumnoMayorPromedio.apellido}, ${alumnoMayorPromedio.nombre}</span>
  <span>Edad: ${alumnoMayorPromedio.edad}</span>
  <span>Promedio: ${alumnoMayorPromedio.promedio}</span>
  `
  const contenedor = document.querySelector("#contenedor");
  contenedor.innerHTML = stringHTML;
}