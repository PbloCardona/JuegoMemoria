let nombreJugador = document.querySelector(".jugador");
let nivelJugador = document.querySelector(".nivel");
let intentosJugador = document.querySelector(".intentos");
let aciertosJugador = document.querySelector(".aciertos");
let tiempoJugador = document.querySelector(".tiempo");

const datosJugadores = "Jugadores";

function tomarDatos() {
    let datos = {
        nombre: nombreJugador.textContent,
        nivel: nivelJugador.textContent,
        tiempo: tiempoJugador.textContent,
        intentos: intentosJugador.textContent,
        aciertos: aciertosJugador.textContent
    };
    guardarDatos(datos);
}

function guardarDatos(objeto) {
    let jugadores = [];
    let tomarDatosNavegador = localStorage.getItem(datosJugadores);
    if (tomarDatosNavegador !== null) {
        jugadores = JSON.parse(tomarDatosNavegador);
    }
    jugadores.push(objeto);
    jugadores.sort((a, b) => b.nivel - a.nivel || b.aciertos - a.aciertos || a.intentos - b.intentos);
    localStorage.setItem(datosJugadores, JSON.stringify(jugadores));
}

function mostrarDatos() {
    let jugadores = [];
    let tomarDatosNavegador = localStorage.getItem(datosJugadores);
    if (tomarDatosNavegador !== null) {
        jugadores = JSON.parse(tomarDatosNavegador);
    }
    let tabla = document.querySelector(".tabla-records tbody");
    tabla.innerHTML = "";
    jugadores.forEach((element, i) => {
        let tr = document.createElement("tr");
        tr.innerHTML = `
        <td>${i + 1}</td>
        <td>${element.nombre}</td>
        <td>${element.nivel}</td>
        <td>${element.intentos}</td>
        <td>${element.aciertos}</td>
        <td>${element.tiempo} seg.</td>
        `;
        tabla.appendChild(tr);
    });
}
