var lastTime=0;
const snakeSpeed= 6;
let direction={x:1,y:0};
let snakeArr=[
    {x:1,y:1}
]
let score=0;
food={x:3,y:4};
var dead=false;
document.addEventListener("keydown",function(event){
    if(event.key==="ArrowUp" || event.key==="w" || event.key==="W"){
        if (direction.y === 0) direction = { x: 0, y: -1 };    
    }
    else if(event.key==="ArrowDown" || event.key==="s" || event.key==="S"){
        if (direction.y === 0) direction = { x: 0, y: 1 };
    }
    else if(event.key==="ArrowLeft" || event.key==="a" || event.key==="A"){
        if (direction.x === 0) direction = { x: -1, y: -0 };
    }
    else if(event.key==="ArrowRight" || event.key==="d" || event.key==="D"){
        if (direction.x === 0) direction = { x: 1, y: -0 };
    }
})

document.addEventListener("keydown",function(event){
    if(event.key ===" ") {reset();}
});
function update(){
    let lastTail=snakeArr[snakeArr.length-1];
    for(let i=snakeArr.length -2;i>=0;i--){
        snakeArr[i+1]={...snakeArr[i]};
        //let lastTail=snakeArr[snakeArr.length-1];
    }
    if(onFood(food,snakeArr[0])){
        snakeArr.push({...snakeArr[snakeArr.length-1]});
        food=randFood(food);
        score++;
        //document.getElementById("#scoreBox").innerHTML('"Score:"score');
        document.getElementById("scoreBox").innerHTML = `Score: ${score}`;
    }
    snakeArr[0].x+=direction.x;
    snakeArr[0].y+=direction.y;
    
}

function draw(){
    $("#game").html("");
    snakeArr.forEach((e,index)=>{
        snakeElement= document.createElement("div");
        snakeElement.style.gridRowStart=e.y;
        snakeElement.style.gridColumnStart=e.x;
        if(index===0) snakeElement.classList.add("head");
        else snakeElement.classList.add("snake");
        game.appendChild(snakeElement);
    })

        foodElement= document.createElement("div");
        foodElement.style.gridRowStart=food.y;
        foodElement.style.gridColumnStart=food.x;
        foodElement.classList.add("foodParticle");
        game.appendChild(foodElement);


}

function main(currTime){
    dead=death(snakeArr);
    if(dead){
        document.querySelector("#container h1").textContent="Game Over!";
        document.querySelector("#container h1").style.color="red";
        if (!document.getElementById("scoreBox").querySelector("p")) {
            var endPara = document.createElement("p");
            endPara.textContent = "Press Space to Restart!";
            document.getElementById("scoreBox").appendChild(endPara);
        }
        // var endPara=document.createElement("p");
        // endPara.textContent="Press Space to Restart!";
        // document.getElementById("scoreBox").appendChild(endPara);
        return;
    }
    lastTail=snakeArr[snakeArr.length-1];
    window.requestAnimationFrame(main);
    if((currTime-lastTime)/1000 < 1/snakeSpeed) return;
    lastTime=currTime;

    update();
    draw();
}
window.requestAnimationFrame(main);


function onFood(pos1,pos2){
    return(pos1.x === pos2.x && pos1.y === pos2.y);
}


function onSnake(pos, snakeArr) {
    for (let i = 1; i < snakeArr.length; i++) {
        if (snakeArr[i].x === pos.x && snakeArr[i].y === pos.y) {
            return true;
        }
    }
    return false;
}
 

function randFood() {
    let xfood, yfood;
    do {
        xfood = Math.floor(Math.random() * 18) + 1;
        yfood = Math.floor(Math.random() * 18) + 1;
    } while (snakeArr.some(segment => segment.x === xfood && segment.y === yfood));
    return { x: xfood, y: yfood };
}

function death(snakeArr){
    if(snakeArr[0].x >18 || snakeArr[0].x <1) return true;
    if(snakeArr[0].y >18 || snakeArr[0].y <1) return true;
    if(onSnake(snakeArr[0],snakeArr)) return true;
    return false;
}
function reset(){
    score=0;
    document.querySelector("#container h1").textContent="Snake Mania";
    document.querySelector("#container h1").style.color="black";
    const endPara=document.getElementById("scoreBox").querySelector("p");
    if(endPara){
        document.getElementById("scoreBox").removeChild(endPara);
    }
    snakeArr=[{x:1,y:1}];
    direction={x:1,y:0};
    food=randFood();
    dead=false;
    document.getElementById("scoreBox").innerHTML = `Score: ${score}`;
    window.requestAnimationFrame(main);
}