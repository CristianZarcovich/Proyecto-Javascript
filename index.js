const alumnosCache = localStorage.getItem("alumnos");
let alumnos = [];
if (alumnosCache) {
  alumnos = JSON.parse(alumnosCache);
  actualizarTabla()
}


function actualizarTabla() {
  const rank = document.querySelector("#rank");
  rank.innerHTML = ""; 
  const alumnosOrdenados = ordenarAlumnos(alumnos);

  alumnosOrdenados.forEach((alumno, index) => {
    let ficha = document.createElement("li")
    let className = "item rounded-3";
    index == 0 ? className += " n1" : null;  
    index == 1 ? className += " n2" : null;
    index == 2 ? className += " n3" : null;
    ficha.className = className;
    const {nombre, apellido, edad} = alumno
    ficha.innerHTML = `Nombre: ${nombre}, ${apellido}</br>
    Edad: ${edad}</br>
    Promedio: ${alumno?.promedio.toFixed(2)}</br>
    `
    rank.append(ficha);
    })
  }

  function ordenarAlumnos (array) {
  return [...array].sort((a, b) => {
    if (a.promedio > b.promedio) {
      return -1;
    } else if (a.promedio < b.promedio) {
      return 1;
    } else {
      return 0;
    }
  })
}

class Alumno {
  id;
  nombre;
  apellido;
  edad;
  notas;
  promedio;

  constructor(nombre, apellido, edad, notas) {
    const hoy = new Date();
    this.id = hoy.getTime();
    this.nombre = nombre;
    this.apellido = apellido;
    this.edad = edad;
    this.notas = notas;
    this.promedio = this.getPromedio();
  }

  getPromedio() {
    let suma = 0;
    this.notas.forEach(nota => {
      suma = suma + parseInt(nota);
    });
    return suma / this.notas.length;
  }

  datosAlumnoJSON() {
    return {
      nombre: this.nombre,
      apellido: this.apellido,
      edad: this.edad,
      promedio: this.promedio
    }
  }
}

function cargarAlumno() {
  const nombre = document.querySelector("#nombre").value;
  const apellido = document.querySelector("#apellido").value;
  const edad = document.querySelector("#edad").value;
  const nota1 = (document.querySelector("#nota1").value);
  const nota2 = (document.querySelector("#nota2").value);
  const nota3 = (document.querySelector("#nota3").value);
  const alumno = new Alumno(nombre, apellido, edad, [nota1, nota2, nota3]);
  
  if (!isNaN(alumno.promedio)) {
    const objetoAlumno = alumno.datosAlumnoJSON();
    alumnos.push(objetoAlumno);
    localStorage.setItem("alumnos", JSON.stringify(alumnos));
  }

  actualizarTabla();

  if (!isNaN(alumno.promedio)) {
  Toastify({
      text: "Alumno cargado exitosamente",
      duration: 3000,
      newWindow: true,
      close: true,
      gravity: "top", 
      position: "center",
      stopOnFocus: true,
      offset: {
        x: 50,
        y: 50
      },
      style: {
        background: "#78bac4",
        fontSize: "1.5em"
      },
    }).showToast();
  } else {
    Toastify({
      text: "Ficha incompleta",
      duration: 3000,
      newWindow: true,
      close: true,
      gravity: "top", 
      position: "center",
      stopOnFocus: true,
      offset: {
        x: 50,
        y: 50
      },
      style: {
        background: "#f57474",
        fontSize: "1.5em"
      },
    }).showToast();
  }
}