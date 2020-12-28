//Event handlers from index.html
let paddle = document.getElementById("timer");
let output = document.getElementById("output");
let clear  = document.getElementById("clear");
let light  = document.getElementById("light");
let words  = document.getElementById("letter");
let show   = document.getElementById("show");
//audio file for the morse code beep
let audio  = new Audio("../beep.wav");
//global variables for this program
let timeElapsed = 0;
let spaceTimer;
let guess;

let start;
let elapsed;

//shows or hides morse 
show.addEventListener("click", function(){
  if(words.style.display === "none"){ //if text is displayed, get rid of text
    words.style.display = "block";
  }else{
    words.style.display = "none";
  }
  if(res.style.display === "none"){
    res.style.display = "block";
  }else{
    res.style.display = "none";
  }
});

let isPlaying = false;
//keydown starts buzzer
paddle.addEventListener("keydown", function(event){
  if(event.keyCode === 32){//spacebar pressed
    if(!isPlaying){
      audio.play();
      light.style.color = "yellow";
      start = Date.now();
      stopTimer();
      isPlaying = true;
    }
  }
});

//key up, stops buzzer
paddle.addEventListener("keyup", function(event){
  if(event.keyCode === 32){//spacebar pressed
    audio.pause();
    light.style.color = "black";
    elapsed = Date.now() - start;
    if(elapsed < 100){
      output.innerHTML += ".";
    }
    else{
      output.innerHTML += "-";
    }
    startTimer();
  }
});

//delete one character 
paddle.addEventListener("keydown", function(event){
  if(event.keyCode === 8){//backspace bar
    let letters = words.innerHTML;
    words.innerHTML = letters.substring(0, letters.length-1);
  }
});

//clear button, deletes all output 
clear.addEventListener("click", function(){
  output.innerHTML = "";
  words.innerHTML = "";
  stopTimer();
});

//starts timer for how long key not pressed
function startTimer(){
  spaceTimer = setInterval(function(){
    timeElapsed++;
    if(timeElapsed > 200){ //more than 300 milliseconds is a space or end of a word
      words.innerHTML += " ";
      stopTimer();
    }else if(timeElapsed > 100){ //more than 100 milliseconds is end of a letter
      output.innerHTML += " ";
      translate();
    }
  }, 1);
}

//stops timer for show long key is not pressed
function stopTimer(){
  clearInterval(spaceTimer);
  timeElapsed = 0;
}

