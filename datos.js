// variables de estadistica
let nombreJugador = document.querySelector(".jugador");
let nivelJugador = document.querySelector(".nivel");
let intentosJugador = document.querySelector(".intentos");
let aciertosJugador = document.querySelector(".aciertos");
let tiempoJugador = document.querySelector(".tiempo");

// funcion tomar datos
function tomarDatos() {
    // objetos para recoger los datos del navegador
    let datos = {
        "nombre": nombreJugador.textContent,
        "nivel": nivelJugador.textContent,
        "tiempo": tiempoJugador.textContent,
        "intentos": intentosJugador.textContent,
        "aciertos": aciertosJugador.textContent,
    }
    // console.log(datos.nombre);
    guardarDatos(datos);
}
// clave o llave para guardar los 
const datosJugadores = "Jugadores";
// funcion para guardar los datos en el navegador
function guardarDatos(objeto) {
    //arreglo para guardar los datos
    let jugadores = [];
    //tomar los datos guardados previamente en el navegador
    let tomarDatosNavegador = localStorage.getItem(datosJugadores);
    //comprobar si hay datos guardados previamente en el navegador
    if (tomarDatosNavegador !== null) {
        jugadores = JSON.parse(tomarDatosNavegador);

    }
    //agregar los datos del jugador al arreglo
    jugadores.push(objeto);
    //mostrar datos del jugador o jugadores en consola
    // console.log(jugadores);
    //guardar los datos en el navegador
    localStorage.setItem(datosJugadores, JSON.stringify(jugadores))
}
//mostrar los datos guardados en el navegador y agregarlos a la tabla
function mostrarDatos() {
    //arreglo para guardar los datos
    let jugadores = [];
    //tomar los datos guardados previamente en el navegador
    let tomarDatosNavegador = localStorage.getItem(datosJugadores);
    //comprobar si hay datos guardados previamente en el navegador
    if (tomarDatosNavegador !== null) {
        jugadores = JSON.parse(tomarDatosNavegador);
    }
    jugadores.sort((a, b) => a.intentos - b.intentos);
    jugadores.sort((a, b) => b.nivel - a.nivel);
    //seleccionar tabla para cargar los datos
    let tabla = document.querySelector(".tabla-records tbody");
    jugadores.forEach((element, i) => {
        let tr = document.createElement("tr");
        tr.innerHTML = `
        <td> ${ i+1} </td>
        <td> ${ element.nombre} </td>
        <td> ${ element.nivel} </td>
        <td> ${element.intentos} </td>
        <td> ${ element.tiempo}  seg.</td>

        `;
        tabla.appendChild(tr);
        console.log(tr);
    });
} 
