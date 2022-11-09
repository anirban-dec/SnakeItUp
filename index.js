let direction={x:0,y:0};
const eatsound=new Audio("eat.wav");
const backroundmusic=new Audio("music.mp3");
const turnMusic= new Audio("turn.wav");
const loseMusic= new Audio("lose.wav");
let speed=10;
let score=0;
let lastPaintTime=0;
let snakeArr=[
    {x:3,y:4}
]

let food={x:13,y:15};

//Game Function

let highscore= localStorage.getItem("hiscore");
if(highscore===null){
    highscoreval=0;
    localStorage.setItem("hiscore",JSON.stringify(highscoreval))
}
else{
    highscoreval=JSON.parse(highscore)
    hiscoreBox.innerHTML="Highest Score: "+highscore;
}
 
function main(cTime){
    window.requestAnimationFrame(main);
    // console.log(cTime);
    if((cTime- lastPaintTime)/1000 <1/speed){
        return;
    }
    lastPaintTime=cTime;
    gameEngine();

}
function isCollide(snake){
    //collide itself
    for (let i = 1; i < snakeArr.length; i++) {
        if(snake[i].x===snake[0].x && snake[i].y===snake[0].y){
            return true;
        }
    }
    //collide with wall
        if(snake[0].x>=18 || snake[0].x <=0 || snake[0].y>=18 || snake[0].y<=0 ){
            return true; 
        }

        return false;
        
    }


function gameEngine(){
    //Part1
    if(isCollide(snakeArr)){
        loseMusic.play();
        backroundmusic.pause();
        direction={x:0,y:0};
         alert("Game Over..Play Aging?")
        snakeArr=[{x:3, y:4}];
        backroundmusic.play();
        backroundmusic.loop=true;
        score=0;
        speed=10;

    }


    //If snake eat food
    if(snakeArr[0].y===food.y && snakeArr[0].x===food.x){
        eatsound.play();
        score+=10;
        scoreBox.innerHTML="Score "+score;
        if(score>50){
            speed=12;
        }
        if(score>100){
            speed=14;
        }
        if(score>150){
            speed=16
        }
        if(score>200){
            speed=18;
        }
        if(score>250){
            speed=20;
        }
        if(score>highscoreval){
            highscoreval= score;
            localStorage.setItem("hiscore",JSON.stringify(highscoreval));
            hiscoreBox.innerHTML="Highest Score: "+highscoreval;


        }
        snakeArr.unshift({x:snakeArr[0].x+direction.x, y:snakeArr[0].y+direction.x})
        let a=2;
        let b=16;
        food={x: Math.round(a+(b-a)*Math.random()),y: Math.round(a+(b-a)*Math.random())}
    }

    //Move Snake
    for (let i = snakeArr.length-2; i >=0; i--) {
        snakeArr[i+1]={...snakeArr[i]};
    }
    snakeArr[0].x +=direction.x;
    snakeArr[0].y +=direction.y;

    //Part2
    //Display Snake
    let board= document.getElementById("board");
    board.innerHTML="";
    snakeArr.forEach((e,index)=>{
        let snakeElement=document.createElement('div');
        snakeElement.style.gridRowStart =e.y;
        snakeElement.style.gridColumnStart =e.x;
       
         if(index===0){
            snakeElement.classList.add("head");
         }
         else{
            snakeElement.classList.add("snake");
         }

        board.appendChild(snakeElement);
    })


    //Display Snake
    let foodElement=document.createElement('div');
    foodElement.style.gridRowStart =food.y;
    foodElement.style.gridColumnStart =food.x;
    foodElement.classList.add("food") 
    board.appendChild(foodElement);



}











//Game Logic
window.requestAnimationFrame(main);
window.addEventListener('keydown',e=>{
    direction={x:0,y:1}
    
    switch(e.key){
        case "ArrowUp":
            console.log("ArrowUp")
            direction.x=0;
            direction.y=-1;
            break;
        case "ArrowDown":
            console.log("ArrowDown")
            direction.x=0;
            direction.y=1;
            break;
        case "ArrowLeft":
            console.log("ArrowLeft")
            direction.x=-1;
            direction.y=0;
            break;
        case "ArrowRight":
            console.log("ArrowRight")
            direction.x=1;
            direction.y=0;
            break;
        default:
            break;

    }
})