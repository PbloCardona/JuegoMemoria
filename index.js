document.addEventListener("DOMContentLoaded", function(){
    //tomarDatos();
    mostrarDatos();
    mostrarVentanaJugador();
})

// variables gloables
const d = document;
// grupo imgs1
let imagenes = [
    { nombre: "bagDarrel", url: "imgs/gtr3.png" },
    { nombre: "ibanezGio", url: "imgs/gtr1.jpg" },
    { nombre: "lesPaul", url: "imgs/gtr2.jpg" },
    { nombre: "stratNegra", url: "imgs/gtr4.jpg" },
    { nombre: "stratGris", url: "imgs/gtr6.jpg" },
    { nombre: "stratRoja", url: "imgs/gtr5.png" },
    { nombre: "stratGris", url: "imgs/gtr6.jpg" },
    { nombre: "bagDarrel", url: "imgs/gtr3.png" },
    { nombre: "lesPaul", url: "imgs/gtr2.jpg" },
    { nombre: "stratNegra", url: "imgs/gtr4.jpg" },
    { nombre: "stratRoja", url: "imgs/gtr5.png" },
    { nombre: "ibanezGio", url: "imgs/gtr1.jpg" }
];
// grupo imgs2
let imagenes2 =[
    { nombre: "ac_guitar", url: "imgs/gtr7.png" },
    { nombre: "hollow_gtr", url: "imgs/gtr8.png" },
    { nombre: "pink_strato", url: "imgs/gtr9.png" },
    { nombre: "white_strato", url: "imgs/gtr10.png" },
    { nombre: "gold_lespaul", url: "imgs/gtr11.png" },
    { nombre: "flying_v", url: "imgs/gtr12.png" },
    { nombre: "ac_guitar", url: "imgs/gtr7.png" },
    { nombre: "hollow_gtr", url: "imgs/gtr8.png" },
    { nombre: "pink_strato", url: "imgs/gtr9.png" },
    { nombre: "white_strato", url: "imgs/gtr10.png" },
    { nombre: "gold_lespaul", url: "imgs/gtr11.png" },
    { nombre: "flying_v", url: "imgs/gtr12.png" }
]

let tablero = d.querySelector(".tablero")
let posImg = [];
let nombreImg = [];
let aciertos = 0;
let intentos = 0;
let tiempo = 30;
let nivel = 1;
let mostrarNivel = d.querySelector(".nivel")
let mostrarIntentos = d.querySelector(".intentos");
let mostrarAciertos = d.querySelector(".aciertos");
let mostrarTiempo = d.querySelector(".tiempo");
let botonInciar = d.querySelector(".btn-iniciar");
let tiempoTranscurrido;
let estoyJugando = false;
let sonidoAdivinar = new Audio("sounds/adivinar.mp3");
let sonidoFallar = new Audio("sounds/fallar.mp3");
let sonidoSeleccionar = new Audio("sounds/escoger.mp3");
let sonidoNivel = new Audio("sounds/level_up.mp3");
let sonidoFondo = new Audio("sounds/music.mp3");



// agregr evento al boton para iniciar el juego
botonInciar.addEventListener("click", function (){
    sonidoFondo.play();
    mostrarNivel.textContent = nivel;
    // ejecutar funcion
    if (estoyJugando == false && nivel == 1) {
        estoyJugando = true;
        agregarImg();
        timepoDeJuego();
        imagenes.sort(()=>Math.random() -0.5 );
    } else if (estoyJugando == false && nivel == 2) {
        estoyJugando = true;
        agregarImg();
        timepoDeJuego();
        imagenes.sort(()=>Math.random() -0.5 );
    } else if (estoyJugando == false && nivel == 3) {
        estoyJugando = true;
        agregarImg();
        timepoDeJuego();
        imagenes.sort(()=>Math.random() -0.5 );
    }
});

function timepoDeJuego() {
    // el jugador pierde por tiempo
    tiempoTranscurrido = setInterval(() => {
        tiempo--;
        mostrarTiempo.textContent = tiempo;


        if (tiempo == 0) {
            clearInterval(tiempoTranscurrido);
            alert("Time Over")
            location.reload();
        }
        console.log("seg: " + tiempo)
    }, 1000);
    sonidoFallar.play();
}

// funcion agregar imagenes al tablero de juego
function agregarImg() {
    if(nivel == 1){
        for (let i = 0; i < imagenes.length; i++) {
            let div = d.createElement("div");
            let img = d.createElement("img");
            div.setAttribute("class", "col-3");
            img.setAttribute("class", "img-fluid alto-img");
            img.setAttribute("src", "imgs/censored.png");
            img.setAttribute("id", i);
            img.addEventListener("click", mostrarImg);
            div.appendChild(img);
            tablero.appendChild(div);
        }
    }else if(nivel == 2){
        for (let i = 0; i < imagenes2.length; i++) {
            let div = d.createElement("div");
            let img = d.createElement("img");
            div.setAttribute("class", "col-3");
            img.setAttribute("class", "img-fluid alto-img");
            img.setAttribute("src", "imgs/censored.png");
            img.setAttribute("id", i);
            img.addEventListener("click", mostrarImg);
            div.appendChild(img);
            tablero.appendChild(div);
        }

    }

}

// mostrar imagens
function mostrarImg() {
    let imgID = this.getAttribute("id");
    // alert("posicion imagen: "+imgID);
    this.setAttribute("src", imagenes[imgID].url);
    posImg.push(imgID);
    nombreImg.push(imagenes[imgID].nombre);
    // comparar imagenes
    if (nombreImg.length == 2) {
        setTimeout(compararImg, 300);
    }
}
// comparar imagenes
function compararImg() {
    let todasImg = d.querySelectorAll(".tablero div img")
    if (nombreImg[0] == nombreImg[1]) {
        if (posImg[0] != posImg[1]) {
            // alert("Las imagenes Coinciden")
            todasImg[posImg[0]].setAttribute("src", "imgs/check.png")
            todasImg[posImg[1]].setAttribute("src", "imgs/check.png")
            todasImg[posImg[0]].removeEventListener("click", mostrarImg)
            todasImg[posImg[1]].removeEventListener("click", mostrarImg)
            aciertos++
            mostrarAciertos.textContent = aciertos;
            sonidoAdivinar.play();
        } else {
            sonidoFallar.play();
            alert("Elige Otra Imagen")
            todasImg[posImg[0]].setAttribute("src", "imgs/censored.png")
            intentos++;
            mostrarIntentos.textContent = intentos;

        }
    } else {
        alert("Las imagenes no coinciden")
        todasImg[posImg[0]].setAttribute("src", "imgs/censored.png")
        todasImg[posImg[1]].setAttribute("src", "imgs/censored.png")
        intentos++;
        mostrarIntentos.textContent = intentos;
        sonidoFallar.play();

    }
    nombreImg = [];
    posImg = [];
    // si gana el jugador
    if (aciertos == 6 && nivel == 1) {
        alert("Ganaste, Pasas al nivel 1");
        // location.reload();
        nivel = 1;
        mostrarNivel.textContent = nivel;
        aciertos = 0;
        mostrarAciertos.textContent = aciertos;
        intentos = 0;
        mostrarIntentos.textContent = intentos;
        tiempo = 20;
        mostrarTiempo.textContent = tiempo;
        clearInterval(tiempoTranscurrido)
        quitarImagenes();
        agregarImg();
        sonidoNivel.play();
        estoyJugando = false;
    } else if (aciertos == 6 && nivel == 2) {
        alert("Ganaste, Pasas de nivel");
        // location.reload();
        nivel = 2;
        mostrarNivel.textContent = nivel;
        aciertos = 0;
        mostrarAciertos.textContent = aciertos;
        intentos = 0;
        mostrarIntentos.textContent = intentos;
        tiempo = 15;
        mostrarTiempo.textContent = tiempo;
        clearInterval(tiempoTranscurrido)
        quitarImagenes();
        agregarImg();
        sonidoNivel.play();
        estoyJugando = false;
    }else if (aciertos == 6 && nivel == 3) {
        alert("Ganaste");
        sonidoNivel.play();
       location.reload
    }
}
function quitarImagenes() {
    let todasLasImg = d.querySelectorAll(".tablero div");
    todasLasImg.forEach((img) => {
        img.remove();
    })
}


// funcion para mostrar el nombre del jugador 
function mostrarVentanaJugador(){
    let mostrarModal = document.querySelector(".modalNombre");
    let cerrarModal = document.querySelectorAll(".cerrar");
    mostrarModal.classList.add(".show");
    mostrarModal.style.display = "block";
    for(let index = 0; index < cerrarModal.length; index++)
    cerrarModal[index].addEventListener("click",function(){
        mostrarModal.classList.remove(".show");
        mostrarModal.style.display = "none";
    })
    namePlayer();
}
// funcion tomar nombre del jugador 
function namePlayer(){
    let mostrarJugador = document.querySelector(".jugador");
    let btn_registrar = document.querySelector(".btn-registrar")
  btn_registrar.addEventListener("click", function(){
    let jugadorN = document.querySelector(".nombreJ");
    mostrarJugador.textContent = jugadorN.value;
    mostrarModal.classList.remove(".show");
})
}
