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
    const {nombre, apellido, edad, email} = alumno
    ficha.innerHTML = `Nombre: ${nombre}, ${apellido}</br>
    Edad: ${edad}</br>
    Email: ${email}</br>
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

  constructor(nombre, apellido, edad, email, notas) {
    const hoy = new Date();
    this.id = hoy.getTime();
    this.nombre = nombre;
    this.apellido = apellido;
    this.edad = edad;
    this.email = email;
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
      email: this.email,
      promedio: this.promedio
    }
  }

  notificarPromedio() {
    const bodyEmail = `Hola, ${this.nombre}. Te informamos que tu promedio es: ${this.promedio.toFixed(2)}. ¡Gracias por participar de nuestro ranking de alumnos!`
    const options = {
      method: 'POST',
      headers: {
        'content-type': 'application/json',
        'X-RapidAPI-Key': '0e4d12bdd9mshce3175142db6f67p1460a3jsnc1f87ae8918c',
        'X-RapidAPI-Host': 'rapidprod-sendgrid-v1.p.rapidapi.com'
      },
      body: `{"personalizations":[{"to":[{"email":"${this.email}"}],"subject":"Promedio de alumno"}],"from":{"email":"cristian.zarcovich@gmail.com"},"content":[{"type":"text/plain","value":"${bodyEmail}"}]}`
    };
    
    fetch('https://rapidprod-sendgrid-v1.p.rapidapi.com/mail/send', options)
    .then(response => response.json())
    .then(response => console.log(response))
    .catch(err => console.error(err));
  }
  
}

function cargarAlumno() {
  const nombre = document.querySelector("#nombre").value;
  const apellido = document.querySelector("#apellido").value;
  const edad = document.querySelector("#edad").value;
  const email = document.querySelector ("#email").value;
  const nota1 = (document.querySelector("#nota1").value);
  const nota2 = (document.querySelector("#nota2").value);
  const nota3 = (document.querySelector("#nota3").value);
  const alumno = new Alumno(nombre, apellido, edad, email, [nota1, nota2, nota3]);
  
  if (!isNaN(alumno.promedio)) {
    const objetoAlumno = alumno.datosAlumnoJSON();
    alumnos.push(objetoAlumno);
    localStorage.setItem("alumnos", JSON.stringify(alumnos));
  }

  actualizarTabla();
  alumno.notificarPromedio();

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
