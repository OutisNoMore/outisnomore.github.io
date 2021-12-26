// Event handlers from index.html
let paddle = document.getElementById("timer");  // paddle to input morse code - space bar
let output = document.getElementById("output"); // text output of morse code - dots and dashes
let clear  = document.getElementById("clear");  // button to clear all morse code
let light  = document.getElementById("light");  // shows whether morse code is being inputted
let words  = document.getElementById("letter"); // text output of morse code in english
let show   = document.getElementById("show");   // toggle between showing output and not
let slower = document.getElementById("slower");
let faster = document.getElementById("faster");
let dot = 100; // change to toggle translate rate

// audio file for the morse code beep   
let audio  = new Audio("../util/beep.wav");

// global variables for this program
let timeElapsed = 0; // how long is the paddle pressed
let spaceTimer;      // how much time between input
let elapsed;         // how long paddle is pressed
let start;           // start of when paddle is pressed
let guess;           // morse code to translate

// slow down translate rate but only to 1 second
slower.addEventListener("click", function(){
  if(dot < 1000){
    dot += 100;
  }
});

// speed up translate rate but only to 100 milliseconds
faster.addEventListener("click", function(){
  if(dot >= 110){
    dot -= 100;
  }
});

// shows or hides morse code
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
// keydown starts buzzer
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

// key up, stops buzzer
paddle.addEventListener("keyup", function(event){
  if(event.keyCode === 32){ // spacebar pressed
    audio.pause();
    isPlaying = false;
    light.style.color = "black";
    elapsed = Date.now() - start;
    if(elapsed < dot){
      output.innerHTML += ".";
    }
    else{
      output.innerHTML += "-";
    }
    startTimer();
  }
});

// delete one character 
paddle.addEventListener("keydown", function(event){
  if(event.keyCode === 8){//backspace bar
    let letters = words.innerHTML;
    words.innerHTML = letters.substring(0, letters.length-1);
  }
});

// clear button, deletes all output 
clear.addEventListener("click", function(){
  output.innerHTML = "";
  words.innerHTML = "";
  stopTimer();
});

// starts timer for how long key not pressed
// change word/letter to change wpm rate
function startTimer(){
  let word   = 100;
  let letter = 40;
  spaceTimer = setInterval(function(){
    timeElapsed++;
    if(timeElapsed > word){ // more than 300 milliseconds is a space or end of a word 
      words.innerHTML += " ";
      stopTimer();
    }else if(timeElapsed > letter){ // more than 100 milliseconds is end of a letter
      output.innerHTML += " ";
      translate();
    }
  }, 1);
}

// stops timer for how long key is not pressed
function stopTimer(){
  clearInterval(spaceTimer);
  timeElapsed = 0;
}

