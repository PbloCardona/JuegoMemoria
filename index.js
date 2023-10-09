// variables gloables
const d = document;
// grupo imgs1
let imagenes = [

    { nombre: "ibanezGio", url: "imgs/gtr1.jpg" },
    { nombre: "lesPaul", url: "imgs/gtr2.jpg" },
    { nombre: "bagDarrel", url: "imgs/gtr3.png" },
    { nombre: "stratNegra", url: "imgs/gtr4.jpg" },


    { nombre: "ibanezGio", url: "imgs/gtr1.jpg" },
    { nombre: "lesPaul", url: "imgs/gtr2.jpg" },
    { nombre: "bagDarrel", url: "imgs/gtr3.png" },
    { nombre: "stratNegra", url: "imgs/gtr4.jpg" },

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
// grupo imgs3
let imagenes3 =[
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
d.addEventListener("DOMContentLoaded",function(){
    mostrarVentanaJugador()
    mostrarDatos()
})
let tablero = d.querySelector(".tablero")
let tableroRecords = d.querySelector(".tableroRecords")
let titulopagina = d.querySelector(".tituloPagina");
let btnIniciar = d.querySelector(".btnIniciar");
let imgNivel;
let posImg = [];
let nombreImg = [];
let aciertos = 0;
let intentos = 0;
let tiempo = 60; //
let nivel = 1;
let mostrarNivel = d.querySelector(".nivel")
let tableroNivel = d.querySelector(".tableroNivel")
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

    if (estoyJugando == false && nivel == 1) {
        mostrarNivel.textContent = nivel;
        tableroNivel.textContent = "Nivel 1: Guitarras Electricas"
        estoyJugando = true;
        tableroRecords.style.display="none"
        titulopagina.style.display="block"
        btnIniciar.style.display="none"
        agregarImg();
        timepoDeJuego();
        imgNivel.sort(()=>Math.random() -0.5 );
        sonidoFondo.play();

    } else if (estoyJugando == false && nivel == 2) {

        btnIniciar.style.display="none"
        estoyJugando = true;
        agregarImg();
        timepoDeJuego();
        imgNivel.sort(()=>Math.random() -0.5 );


    } else if (estoyJugando == false && nivel == 3) {
        btnIniciar.style.display="none"
        estoyJugando = true;
        agregarImg();
        timepoDeJuego();
        imgNivel.sort(()=>Math.random() -0.5 );
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
    // sonidoFallar.play();
}

// funcion agregar imagenes al tablero de juego
function agregarImg() {
    if(nivel==1){
        imgNivel=imagenes
    }else if(nivel==2){
        imgNivel=imagenes2
    }else if(nivel==3){
        imgNivel=imagenes3
    }
        for (let i = 0; i < imgNivel.length; i++) {
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

// mostrar imagens
function mostrarImg() {
    let imgID = this.getAttribute("id");
    this.setAttribute("src", imgNivel[imgID].url);
    this.classList.add("hovered"); 
    posImg.push(imgID);
    nombreImg.push(imgNivel[imgID].nombre);
    // comparar imagenes
    if (nombreImg.length == 2) {
        setTimeout(compararImg, 300);
    }
}
// comparar imagenes
function compararImg() {
    let todasImg = d.querySelectorAll(".tablero div img")
    todasImg.forEach(img => img.classList.remove("hovered"));
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
        todasImg[posImg[0]].setAttribute("src", "imgs/censored.png")
        todasImg[posImg[1]].setAttribute("src", "imgs/censored.png")
        intentos++;
        mostrarIntentos.textContent = intentos;
        sonidoFallar.play();
    }
    
    nombreImg = [];
    posImg = [];
//PASAR DE NIVEL

//NIVEL2
    if (aciertos == 4 && nivel == 1) {
        alert("Ganaste, Pasas al nivel 2");

        nivel++;
        mostrarNivel.textContent = nivel;
        tableroNivel.textContent = "Nivel 2: Guitarras Acusticas"
        aciertos = 0;
        mostrarAciertos.textContent = aciertos;
        intentos = 0;
        mostrarIntentos.textContent = intentos;
        tiempo = 45;
        mostrarTiempo.textContent = tiempo;
        clearInterval(tiempoTranscurrido)
        btnIniciar.style.display="block"
        quitarImagenes();
  
        sonidoNivel.play();
        estoyJugando = false;


//NIVEL3
    } else if (aciertos == 6 && nivel == 2) {


        alert("Ganaste, Pasas de nivel 3");
        // location.reload();
        nivel++;
        mostrarNivel.textContent = nivel;
        tableroNivel.textContent = "Nivel 3: TODO"
        aciertos = 0;
        mostrarAciertos.textContent = aciertos;
        intentos = 0;
        mostrarIntentos.textContent = intentos;
        tiempo = 30;
        mostrarTiempo.textContent = tiempo;
        btnIniciar.style.display="block"
        clearInterval(tiempoTranscurrido)
        quitarImagenes();
        sonidoNivel.play();
        estoyJugando = false;


        
    }else if (aciertos == 6 && nivel == 3) {
        alert("¡Ganaste! Completaste el juego");
        tomarDatos();
        location.reload();
    }

    if (nombreImg[0] != nombreImg[1]) {
        todasImg[posImg[0]].classList.add("hovered");
        todasImg[posImg[1]].classList.add("hovered");
    }
}
function quitarImagenes(){
    let todaslasImg=d.querySelectorAll(".tablero div");
    todaslasImg.forEach((img)=>{
        img.remove()        
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
    let mostrarModal = document.querySelector(".modalNombre");
    mostrarModal.classList.remove(".show");
    mostrarModal.style.display = "none";
})
}


