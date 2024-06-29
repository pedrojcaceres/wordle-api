
let intentos = 6;
const button = document.getElementById("guess-button");
const input = document.getElementById("guess-input");
const valor = input.value;
const ENTER_KEY = "Enter";

const API_URL = "https://random-api.up.railway.app/es/get-word";

button.addEventListener("click", intentar);
input.addEventListener("keydown", (e) => {
    if (e.key === ENTER_KEY && input.value.length > 1 ) {
        intentar();
    }
});
// let diccionario = ['APPLE', 'HURLS', 'WINGS', 'YOUTH'];
// let palabra = diccionario[Math.floor(Math.random() * diccionario.length)]
let palabra = '';

async function obtenerPalabra() {
    try {
        const response = await fetch(API_URL);

        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const word = await response.json();
        palabra = word.toUpperCase();
        console.log(palabra);
    } catch (error) {
        console.log('Hubo un error:', error.message);
    }
}

console.log(palabra)

function intentar() {
    const INTENTO = leerIntento().toUpperCase();
    const GRID = document.getElementById("grid");
    
    const ROW = document.createElement("div");
    ROW.className = 'row';


    if (INTENTO === palabra) {
        terminar("<h1>Has ganado! 😃</h1>", 'win');
    }

    for (let i in palabra) {

        const SPAN = document.createElement('span');
        SPAN.className = 'letter';

        if (INTENTO[i] === palabra[i]) { // green
            SPAN.innerHTML = INTENTO[i] || '';
            SPAN.style.backgroundColor = "#63A15F";

        } else if (palabra.includes(INTENTO[i])) { // amarillo
            SPAN.innerHTML = INTENTO[i] || '';
            SPAN.style.backgroundColor = "#CBB04D";

        } else { // gray
            SPAN.innerHTML = INTENTO[i] || '';
            SPAN.style.backgroundColor = "#787C7F";
        }
        ROW.appendChild(SPAN);
    }
    GRID.appendChild(ROW);


    intentos--;

    if (!intentos) {
        console.log('PERDISTE');
        terminar("<h1>Perdiste, lo siento! 🥺</h1>", 'lose')
        GRID.innerHTML = '';
    }
    input.value = '';
}

function leerIntento() {
    let intento = document.getElementById("guess-input");
    intento = intento.value;
    intento = intento.toUpperCase();
    return intento;
}
function terminar(mensaje, gano) {
    const input = document.getElementById("guess-input");
    const contenedor = document.getElementById("guesses");
    const resetBtn = document.createElement("button");
    const img = document.createElement('img');

    input.disabled = true;
    button.disabled = true;
    contenedor.innerHTML = mensaje;

    resetBtn.className = 'primary-btn';
    resetBtn.innerText = "Reiniciar Juego";
    resetBtn.addEventListener("click", reiniciarJuego);

    img.style.maxWidth = "400px";
    img.src = gano === 'win' ? './img/win.gif' : './img/lose.gif';

    contenedor.appendChild(resetBtn);
    contenedor.appendChild(img);
}

function reiniciarJuego() {
    const input = document.getElementById("guess-input");
    const contenedor = document.getElementById("guesses");
    const GRID = document.getElementById("grid");
    
    input.disabled = false;
    button.disabled = false;
    input.value = '';
    contenedor.innerHTML = '';
    GRID.innerHTML = '';

    intentos = 6;
    obtenerPalabra();
    console.log(palabra);
}

window.onload = obtenerPalabra;
