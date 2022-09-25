let plate = document.getElementById('plate')
let moveWidth = 10;
let screen = document.documentElement.clientWidth;
let wheight = document.documentElement.clientHeight;
let posPlate = screen*0.4;
let ballspeedx = 5;
let ballspeedy = -5;
document.addEventListener('keydown', movePlate);
function movePlate(event) {
  if (event.code == "ArrowLeft" && posPlate>0) posPlate -= moveWidth;  
  if (event.code == "ArrowRight" && (posPlate+screen*0.2+20)<screen) posPlate += moveWidth;
  plate.style.left = posPlate + 'px';
}


let ball = document.getElementById('ball');
let ballStyle = ball.getBoundingClientRect();
let plateStyle = plate.getBoundingClientRect();
let radius = ballStyle.width/2 ;
let posx = ballStyle.left + radius;
let posy = ballStyle.top + radius;
let letsGo = setInterval(go, 1000/50);


function go(){
  posx += ballspeedx;
  posy += ballspeedy;
  if (posx + radius > screen) {posx = screen-radius; ballspeedx = -ballspeedx;} //right border
  if (posx - radius < 0) {posx = radius ; ballspeedx = -ballspeedx;} //left border
  if (posy - radius < 0) {posy = radius ; ballspeedy = -ballspeedy;} //top border

  if (posy+radius >= plateStyle.top) {
      if (posx <= posPlate + plateStyle.width && posx  >= posPlate ) {
      posy = plateStyle.top - plateStyle.height-radius; ballspeedy = - ballspeedy;}; //plate border ???
    }

  ball.style.top = posy + 'px';
  ball.style.left = posx + 'px';

  if (posy + radius >= wheight) {
    clearInterval(letsGo);
    document.removeEventListener('keydown', movePlate);
    let lose = document.getElementById('lose');
    lose.style.display = 'block';
  }
}

