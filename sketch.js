var backimag,balloon,baimg,c1,c2,c3,c4;
var database;


function preload(){
backimag=loadImage("Bg.png");
baimg=loadImage("Balloon.png");
}
function setup(){
createCanvas(750,550);
database=firebase.database();

var balloonposition=database.ref('Balloon/position');
balloonposition.on("value",readPosition,showError);

balloon=createSprite(58,440,40,40);
balloon.addImage(baimg);
balloon.scale=0.4;

c1=createSprite(375,0,750,5);
c1.visible=false;
c2=createSprite(375,550,750,5);
c2.visible=false;
}
function draw(){
background(backimag);  

if(keyDown("up") && balloon.y>71){
cp(0,-10,-0.004);  
}
if(keyDown("down") && balloon.y<438){
cp(0,10,0.004);  
}
if(keyDown("left") && balloon.x>58){
cp(-10,0,0);  
}
if(keyDown("right") && balloon.x<671){
cp(10,0,0);  
}

balloon.bounceOff(c1);
balloon.bounceOff(c2);
drawSprites(); 

textSize(15);
fill("black");
stroke("white");
text("*Use Arrow Keys to control the hot-air balloon.*",40,50);
}
function cp(x,y,bs){
database.ref('Balloon/position').set({
'x':position.x+x,
'y':position.y+y,
'bs':position.bs+bs    
})
}
function readPosition(data){
position=data.val();
balloon.x=position.x;
balloon.y=position.y;    
}
function showError(){
console.log("Error in writing to the database");    
}