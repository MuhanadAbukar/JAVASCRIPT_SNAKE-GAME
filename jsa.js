const canvas = document.getElementById("game");
const ctx = canvas.getContext('2d');
class snakepart{
    constructor(x,y){
        this.x = x;
        this.y = y;

    }
}
let speed = 7;
let tilecount = 20;
let tilesize = canvas.width/tilecount-1;
let headX = 10;
let headY = 10;
const snakeParts = [];
let taillength = 2;
let xVel = 0;
let yVel = 0;
let appleX = 5;
let appleY = 5;
let score = 0;
const gulpsound = new Audio("hulp123.mp3")
//draws game in a loop
function drawGame(){
    preloadimages()
    changesnakepos();
    let result = isGameOver();
    if(result){
        return;
    }
    clearscreen();
    checkapplecollision();
    drawapple();
    drawsnake();
    drawscore()
    setTimeout(drawGame, 1000/speed)
if (score===5){speed = 10}
else if (score===9){speed = 15}
else if (score===13){speed = 20}
else if (score===16){speed = 25}
else if (score===19){speed = 30}
else if (score===24){speed = 40}
else if (score===28){speed = 50}
else if (score===32){speed = 60}
else if (score===36){speed = 70}

function preloadimages()
{
    var img=new Image();
    img.src="apple.png";
    var img=new Image();
    img.src="down.png";
    var img=new Image();
    img.src="forward.png";
    var img=new Image();
    img.src="right.png";
    var img=new Image();
    img.src="left.png";
    var img=new Image();
    img.src="updown.png";
    var img=new Image();
    img.src="leftright.png";
}
}
function isGameOver(){
    let gameover = false;
    if(yVel ===0 && xVel===0){
        return false;
    }
    
    //walls
        if(headX<0){
         gameover = true;
     }
        else  if(headX === tilecount){
         gameover  = true;
     }
         else  if(headY < 0){
        gameover  = true;
    }
         else  if(headY === tilecount){
        gameover  = true;
    }
    for(let i = 0; i<snakeParts.length; i++){
        let part = snakeParts[i];
        if(part.x === headX && part.y === headY){
            gameover = true;
            break;
        }
    }
     if(gameover){
ctx.fillStyle = "white";
ctx.font = "50px Verdana"
ctx.fillText("Game Over!", canvas.width / 6.5, canvas.height / 2);

     }
     return gameover;
}
function     drawscore(){
    ctx.fillStyle = 'white'
    ctx.font = "10px Verdana"
    ctx.fillText("Score " + score, canvas.width-50, 10)
}
function drawapple(){
    const img = new Image();
    img.src = 'apple.png';
    ctx.drawImage(img, appleX*tilecount, appleY*tilecount,tilesize,tilesize);
}
function checkapplecollision(){
 if(appleX === headX && appleY == headY){
     appleX = Math.floor(Math.random() * tilecount)
     appleY = Math.floor(Math.random() * tilecount)
        gulpsound.play()
        taillength++;
        score++;
 }
}
function changesnakepos(){
headX = headX+xVel
headY = headY+yVel

}
function clearscreen(){
ctx.fillStyle = 'black';
ctx.fillRect(0,0,canvas.width,canvas.height)
}
function drawsnake(){
const imageup = new Image()
imageup.src = "leftright.png"
for(let i=0; i< snakeParts.length;i++){
    if (xVel == 1||xVel==-1){
        let part = snakeParts[i];
        ctx.drawImage(imageup, part.x*tilecount, part.y*tilecount, tilesize, tilesize) 
        }
    }
const imageup1 = new Image()
imageup1.src = "updown.png"
for(let i=0; i< snakeParts.length;i++){
    if (yVel == 1||yVel==-1){
        let part = snakeParts[i];
        ctx.drawImage(imageup1, part.x*tilecount, part.y*tilecount, tilesize, tilesize)
        }
    }
snakeParts.push(new snakepart(headX, headY));
if(snakeParts.length>taillength){
snakeParts.shift();
}

if(yVel == 1) {
const imageup = new Image() // down
imageup.src = "down.png"
ctx.drawImage(imageup,headX * tilecount, headY * tilecount , tilesize ,tilesize)
}
if(yVel == -1){
const imageup = new Image()
imageup.src = "forward.png"
// up
ctx.drawImage(imageup, headX * tilecount, headY * tilecount , tilesize ,tilesize)
}
if(xVel == 1) {
    const imageup = new Image()
imageup.src = "right.png"
// right
ctx.drawImage(imageup,headX * tilecount, headY * tilecount , tilesize ,tilesize)
}
if(xVel == -1) {
const imageup = new Image()
imageup.src = "left.png"
// left
ctx.drawImage(imageup,headX * tilecount, headY * tilecount , tilesize ,tilesize)
}


}
document.body.addEventListener('keydown', keyDown);
function keyDown(event){
    //up
    if (event.keyCode == 38){
    if(yVel == 1) 
    return
     yVel = -1;
     xVel = 0;
}
    //down
   if (event.keyCode == 40){
    if(yVel == -1) 
    return
    yVel = 1;
    xVel = 0;
   }
   //left
   if (event.keyCode == 37){
    if(xVel == 1) 
    return
    yVel = 0;
    xVel = -1;
   }
   //right
   if (event.keyCode == 39){
    if(xVel == -1) 
    return
    yVel = 0;
    xVel = 1;
   }
         
}



drawGame()