

//variaveis da bolinha
let xBolinha = 300;
let yBolinha = 200;
let diametro = 24;
let raio = diametro / 2

//velocidade da bolinha
let velocidadexBolinha = 6
let velocidadeyBolinha = 6

//vaiaveis da raquete
let xRaquete = 5;
let yRaquete = 150;
let comprimentoRaquete = 10
let alturaRaquete = 90

//variaveis do oponente
let xOponente = 585;
let yOponente = 150;
let velocidadeOponente;

let colidiu = false;
let chanceDeErrar =0

//variaveis do placar
let meusPontos = 0;
let pontosOponente = 0;

//Sons do jogo
let raquetada;
let trilha;
let ponto;

function preload (){
  trilha = loadSound ("trilha.mp3")
  ponto = loadSound ("ponto.mp3")
  raquetada = loadSound ("raquetada.mp3")
}

function setup() {
  createCanvas(600, 400);
  trilha.loop();
}

function draw() {
  background(0);
  mostraBolinha();
  velocidadeBolinha ();
  colisaoBolinha ();
  mostraRaquete (xRaquete, yRaquete);
  movimentaMinhaRaquete(); 
  //verificaColisaoRaquete ();
  colisaoMinhaRaqueteBiblioteca (xRaquete, yRaquete);
  mostraRaquete (xOponente, yOponente);
  movimentaOponente (); 
  colisaoMinhaRaqueteBiblioteca (xOponente, yOponente);
  incluiPlacar ();
  marcaPonto();
  calculaChanceDeErrar();
}
function mostraBolinha () {
  circle(xBolinha, yBolinha, diametro);
}

function velocidadeBolinha () {
   xBolinha += velocidadexBolinha;
  yBolinha += velocidadeyBolinha;
}

function colisaoBolinha () {
    if (xBolinha + raio > width || 
     xBolinha - raio < 0) {
    velocidadexBolinha *= -1;
  }
  if (yBolinha + raio > height ||
     yBolinha - raio < 0) {
    velocidadeyBolinha *= -1;
  }
}

function mostraRaquete (x, y) { rect(x, y, comprimentoRaquete, alturaRaquete)
}

function movimentaMinhaRaquete () {
  if (keyIsDown(UP_ARROW)) {
    yRaquete -= 10;  
  }
  if (keyIsDown(DOWN_ARROW)) {
    yRaquete += 10; 
}}

function verificaColisaoRaquete () {
  if (xBolinha - raio < xRaquete + comprimentoRaquete && yBolinha - raio < yRaquete + alturaRaquete && yBolinha + raio > yRaquete) {
    velocidadexBolinha *= -1
  }
} 

function colisaoMinhaRaqueteBiblioteca (x, y) {
  colidiu = 
  collideRectCircle(x, y, comprimentoRaquete, alturaRaquete, xBolinha, yBolinha, raio);
  if (colidiu) {
    velocidadexBolinha *= -1
    raquetada.play ();
  }
}

function movimentaOponente () {
 velocidadeOponente = yBolinha - yOponente - comprimentoRaquete / 2 - 30;
  yOponente += velocidadeOponente + chanceDeErrar
  calculaChanceDeErrar();
}


function incluiPlacar () {
  stroke(255);
  textAlign(CENTER);
  textSize (16);
  fill(color(250,140, 0));
  rect(150, 10, 40, 20);
  fill(255)
  text(meusPontos, 170, 26);
  fill(color(250,140, 0));
  rect(450, 10, 40, 20)
  fill(255);
  text(pontosOponente, 470, 26);

  
}

function marcaPonto(){
  if(xBolinha>590) {
    meusPontos += 1
    ponto.play();
  }
  if(xBolinha<10){
    pontosOponente += 1
    ponto.play();
  }
}

function calculaChanceDeErrar(){
  if (pontosOponente >= meusPontos){
    chanceDeErrar += 5
    if (chanceDeErrar >= 39){
    chanceDeErrar = 40
    }
  } else {
    chanceDeErrar -= 5
    if (chanceDeErrar <= 35){
    chanceDeErrar = 35
    }
  }

}
