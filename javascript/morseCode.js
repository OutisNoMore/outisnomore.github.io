// Event handlers from index.html
let paddle  = document.getElementById("timer");   // paddle to input morse code - space bar
let output  = document.getElementById("output");  // text output of morse code - dots and dashes
let clear   = document.getElementById("clear");   // button to clear all morse code
let light   = document.getElementById("light");   // shows whether morse code is being inputted
let words   = document.getElementById("letter");  // text output of morse code in english
let show    = document.getElementById("show");    // toggle between showing output and not
let slower  = document.getElementById("slower");  // slow down translation
let faster  = document.getElementById("faster");  // speed up translation
let wpmSlow = document.getElementById("WPMSlow"); // slow down wpm
let wpmFast = document.getElementById("WPMFast"); //speed up wpm
let speed = document.getElementById("speed");     // display speed

let dot    = 200; // change to toggle translate rate
let word   = 120; // time between words
let letter = 60;  // time between letters

// audio file for the morse code beep   
let audio  = new Audio("../util/beep.wav");

// global variables for this program
let timeElapsed = 0; // how long is the paddle pressed
let spaceTimer;      // how much time between input
let elapsed;         // how long paddle is pressed
let start;           // start of when paddle is pressed
let guess;           // morse code to translate

// slow down translate rate but only to 1 second
wpmSlow.addEventListener("click", function(){
  if(word < 1000){
    word   += 40;
    letter += 20;
  }
});

// speed up translate rate but only to 100 milliseconds
wpmFast.addEventListener("click", function(){
  if(word >= 160){
    word   -= 40;
    letter -= 20;
  }
  speed.innerHTML = dot;
});


// slow down translate rate but only to 1 second
slower.addEventListener("click", function(){
  if(dot < 1000){
    dot += 100;
  }
  speed.innerHTML = dot;
});

// speed up translate rate but only to 100 milliseconds
faster.addEventListener("click", function(){
  if(dot >= 200){
    dot -= 100;
  }
  speed.innerHTML = dot;
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
  spaceTimer = setInterval(function(){
    timeElapsed++;
    if(timeElapsed > word){ // end of a word 
      words.innerHTML += " ";
      stopTimer();
    }else if(timeElapsed > letter){ // end of a letter
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

