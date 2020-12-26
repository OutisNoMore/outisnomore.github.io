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
let timeElapsed2 = 0;
let timeElapsed  = 0;
let guess  = "";
let timer;
let timer2;
let dt;
let ds;

function dot(){
  clearInterval(ds);
  audio.play();
  dot = setInterval(function(){
    if(audio.currentTime > 0.1){
	    console.log('dot: ' + audio.currentTime);
      audio.pause();
      audio.currentTime = 0;
    }
  }, 1);
}

function dash(){
  clearInterval(dt);
  audio.play();
  dash = setInterval(function(){
	  console.log('dash: ' + audio.currentTime);
  if(audio.currentTime > 0.3){
      audio.pause();
      audio.currentTime = 0;
    }
  }, 1);
}

audio.play();
for(let i = 0; i < 100; i++){
	console.log('i: ' + i);
}
audio.pause();
//audio.play();
//for(let j = 0; j < 500; j++){
//	console.log('j: ' + j);
//}
//audio.pause();
//dash();
//dot();
//while(!audio.paused){
//}
//setTimeout(dash, 1000);

//shows or hides morse 
show.addEventListener("click",
  function(){
    if(words.style.display === "none"){ //if text is displayed, get rid of text
      words.style.display = "block";
    }else{
      words.style.display = "none";
    }
  }
);

//keydown starts buzzer
paddle.addEventListener("keydown",
  function(event){
    if(event.keyCode === 32){//spacebar pressed
      audio.play();
      startTimer();
      stopTimer2();
    }
  }
);

//key up, stops buzzer
paddle.addEventListener("keyup",
  function(event){
    if(event.keyCode === 32){//spacebar pressed
      audio.pause();
      stopTimer();
      startTimer2();
    }
  }
);

//delete one character 
paddle.addEventListener("keydown",
  function(event){
    if(event.keyCode === 8){//backspace bar
      let letters = words.innerHTML;
      words.innerHTML = letters.substring(0, letters.length-1);
    }
  }
);

//clear button, deletes all output 
clear.addEventListener("click",
  function(){
    output.innerHTML = "";
    words.innerHTML = "";
    stopTimer2();
  }
);

//translates morse code to alphabet letter
function translate(){
  let index = output.innerHTML.indexOf(" ");
  let morseCode = output.innerHTML.substring(0,index);
  switch(morseCode){
  case ".-":
    guess = "a";
    break;
  case "-...":
    guess = "b";
    break;
  case "-.-.":
    guess = "c";
    break;
  case "-..":
    guess = "d";
    break;
  case ".":
    guess = "e";
    break;
  case "..-.":
    guess = "f";
    break;
  case "--.":
    guess = "g";
    break;
  case "....":
    guess = "h";
    break;
  case "..":
    guess = "i";
    break;
  case ".---":
    guess = "j";
    break;
  case "-.-":
    guess = "k";
    break;
  case ".-..":
    guess = "l";
    break;
  case "--":
    guess = "m";
    break;
  case "-.":
    guess = "n";
    break;
  case "---":
    guess = "o";
    break;
  case ".--.":
    guess = "p";
    break;
  case "--.-":
    guess = "q";
    break;
  case ".-.":
    guess = "r";
    break;
  case "...":
    guess = "s";
    break;
  case "-":
    guess = "t";
    break;
  case "..-":
    guess = "u";
    break;
  case "...-":
    guess = "v";
    break;
  case ".--":
    guess = "w";
    break;
  case "-..-":
    guess = "x";
    break;
  case "-.--":
    guess = "y";
    break;
  case "--..":
    guess = "z";
    break;
  case "..--..":
    guess = "?";
    break;
  case ".-.-.-":
    guess = ".";
    break;
  case "-.-.--":
    guess = "!";
    break;
  case ".----":
    guess = "1";
    break;
  case "..---":
    guess = "2";
    break;
  case "...--":
    guess = "3";
    break;
  case "....-":
    guess = "4";
    break;
  case ".....":
    guess = "5";
    break;
  case "-....":
    guess = "6";
    break;
  case "--...":
    guess = "7";
    break;
  case "---..":
    guess = "8";
    break;
  case "----.":
    guess = "9";
    break;
  case "-----":
    guess = "0";
    break;
  default:
    guess = "";
  }
  words.innerHTML += guess;

  output.innerHTML = "";
}

//starts timer for how long key is pressed
function startTimer(){
  timer = setInterval(
    function(){
      timeElapsed++;
      light.style.color = "yellow";
    },1);
}

//stops timer for how long key pressed
function stopTimer(){
  clearInterval(timer);
  if(timeElapsed < 30){ //less than 30 millisecond is dot
    output.innerHTML += ".";
  }
  else {
    output.innerHTML += "-";
  }	
  timeElapsed = 0;
  light.style.color = "black";
}

//starts timer for how long key not pressed
function startTimer2(){
  timer2 = setInterval(
    function(){
      timeElapsed2++;
      if(timeElapsed2 > 200){ //more than 300 milliseconds is a space or end of a word
        words.innerHTML += " ";
	stopTimer2();
      }else if(timeElapsed2 > 100){ //more than 100 milliseconds is end of a letter
        output.innerHTML += " ";
	translate();
      }
    }, 1);
}

//stops timer for show long key is not pressed
function stopTimer2(){
  clearInterval(timer2);
  timeElapsed2 = 0;
}

