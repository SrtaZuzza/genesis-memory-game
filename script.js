
let order = [];
let clickedOrder = [];
let score = 0;
let record = 0;
var timer;

const blue = document.querySelector('.blue');
const red = document.querySelector('.red');
const green = document.querySelector('.green');
const yellow = document.querySelector('.yellow');

const noteGreen = new Audio('audio/Green_E4.oga');
const noteRed = new Audio('audio/Red_A4.oga');
const noteYellow = new Audio('audio/Yellow_C5.oga'); // Actually C#5
const noteBlue = new Audio('audio/Blue_E5.oga');

const colors = [green, red, yellow, blue];
const notes = [noteGreen, noteRed, noteYellow, noteBlue];
const start = document.querySelector('.start');
const _placar = document.getElementById('placar');
const _record = document.getElementById('record');

//ordem aleatória de cores
let shuffleOrder = () => {
    let colorOrder = Math.floor(Math.random() * 4);
    order[order.length] = colorOrder;
    clickedOrder = [];

    for(let i in order) {
        let elementColor = colors[order[i]];
        lightColor(elementColor, order[i], Number(i) + 1);
    }
}

//acende próxima cor
let lightColor = (element, color, number) => {
    number = number * 1000;
    setTimeout(() => {
        element.classList.add('selected'); 
        notes[color].play();
    }, number - 500);
    setTimeout(() => {
        element.classList.remove('selected');
    }, number);
}

//checa ordem do input
let checkOrder = () => {
    for(let i in clickedOrder) {
        if(clickedOrder[i] != order[i]){
            gameOver();
            return;
        }
    }
    if(clickedOrder.length == order.length) {
        nextLevel();
    }
}

//input
let click = (color) => {
    clickedOrder[clickedOrder.length] = color;
    colors[color].classList.add('selected');
    notes[color].play();

    setTimeout(() => {
    colors[color].classList.remove('selected');
    }, 250);
    timer = window.setTimeout(() => { // prevent timer too early for faster players
        if(order.length != 0) { // because I like to play the notes before start
            checkOrder();
        }
    }, 1000);
}

let nextLevel = () => {
    if(order.length != 0) {
        score++;
    }
    _placar.innerHTML = score;
    _record.innerHTML = record;
    shuffleOrder();
}

let gameOver = () => {
    if(score > record) {record = score};
    window.location = document.querySelector(".gameover").href;
    reset();
}

let reset = () => {
    order = [];
    clickedOrder = [];
    score = 0;
}

let addListeners = () => {
    for(let i in colors) {
        colors[i].addEventListener('click', () => {clearTimeout(timer); click(i)})
    }
    start.addEventListener('click', () => {reset();nextLevel();});
    document.querySelector(".retry").addEventListener('click', () => {gameOver()});
}

addListeners();
