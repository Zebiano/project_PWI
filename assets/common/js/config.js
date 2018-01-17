/*// Variaveis Globais
var dificuldade; // Dificuldade do jogo
var redes; // Escolha do guarda-redes
var GRskipFrames; // Frames que passamos a frente para a animacao do guarda-redes
var quantidadeSons = 1; // Indica a quantidade de sons que serao gravados para o array. Sempre que se adiciona um novo som devia-se incrementar este numero por 1!

// -- ARRAYS -- \\

var arrayQuadrados = []; // Array para os quadrados
var arraySrcSons = []; // Array para os sources dos sons
var arraySons = []; // Array para os sons

// -- CONSTRUTORES -- \\

// Construtor dos quadrados
function Quadrado(x, y, w, h) {
    this.x = x;
    this.y = y;
    this.w = w;
    this.h = h;
    this.selected = false;
}

// -- GETTERS AND SETTERS -- \\

// Define a dificuldade
function setDificuldade(e) {
    // Para isto usamos uma forma de guardar data no browser, nem todos sao compativeis por isso faz-se este check com o if (parecido cmo a prof faz o check do canvas)
    if (typeof (Storage) !== "undefined") {
        dificuldade = e;

        if (dificuldade == 1) {
            localStorage.setItem("lastname", "easy");
        } else if (dificuldade == 2) {
            localStorage.setItem("lastname", "medium");
        } else if (dificuldade == 3) {
            localStorage.setItem("lastname", "hard");
        } else {
            console.log("A dificuldade nao funcionou...")
        }
    } else {
        alert("Sorry, your browser does not support Web Storage... If you want to play this game you'll need a browser that supports it.");
        window.open("mainGame.html", "_self");
    }
}

// Obtem a dificuldade
function getDificuldade() {
    return localStorage.getItem("lastname");
}

// Define a escolha do guarda-redes
function setGuardaRedes(e) {
    redes = e;
}

// Obtem a escolha do guarda-redes
function getGuardaRedes() {
    return redes;
}

// -- CODIGO -- \\

// Adiciona os quadrados ao array. Se for para mudar as coordenadas, muda-se aqui
function criarQuadrado() {
    arrayQuadrados.push(new Quadrado(357, 81, 189, 97));
    arrayQuadrados.push(new Quadrado(544, 81, 189, 97));
    arrayQuadrados.push(new Quadrado(731, 81, 189, 97));
    arrayQuadrados.push(new Quadrado(357, 176, 189, 97));
    arrayQuadrados.push(new Quadrado(544, 176, 189, 97));
    arrayQuadrados.push(new Quadrado(731, 176, 189, 97));
    arrayQuadrados.push(new Quadrado(357, 271, 189, 97));
    arrayQuadrados.push(new Quadrado(544, 271, 189, 97));
    arrayQuadrados.push(new Quadrado(731, 271, 189, 97));
}

// Adiciona as sources dos sons ao array. Se for para mudar/adicionar sons, faz-se aqui
function criarSom() {
    arraySrcSons.push("../assets/common/sounds/crowd.mp3");
    arraySrcSons.push("../assets/common/sounds/goal.mp3");
    arraySrcSons.push("../assets/common/sounds/sad.mp3");
    arraySrcSons.push("../assets/common/sounds/whistle.mp3");

    // Adiciona as sources ao array dos sons. Se for para play() um som, e so chamar o array "arraySons[index].play()". Todas as properties: https://www.w3schools.com/jsref/dom_obj_audio.asp
    for (i = 0; i < arraySrcSons.length; i++) {
        arraySons[i] = new Audio();
        arraySons[i].src = arraySrcSons[i];
    }

    // Crowd
    arraySons[0].volume = 0.3; // Baixar volume
    arraySons[0].loop = true; // Repetir

    // Golo
    arraySons[1].volume = 0.7; // Baixar volume

    // Apito
    arraySons[3].volume = 0.5; // Baixar volume
}*/

// Variaveis Globais
var ip; // IP do utilizador

$.getJSON("https://api.ipify.org/?format=json", function (e) {
    ip = e.ip;
    console.log(ip);
    return ip;
});

// -- ARRAYS -- \\

var arrayLogin = []; // Array para o Login

// Para isto usamos uma forma de guardar data no browser, nem todos sao compativeis por isso faz-se este check com o if
if (typeof (Storage) !== "undefined") {
    setLogin("9160272", "9160272@esmad.ipp.pt", "hihi", "ip";
    //setLogin("9160151", "9160151@esmad.ipp.pt", "hoho", getIP());
} else {
    alert("Sorry, your browser does not support Web Storage... To login you need a browser that supports it.");
}

function setLogin(numero, email, pass, ip) {
    localStorage.setItem("login", "Smith");
}