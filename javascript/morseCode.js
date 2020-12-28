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
let dt;
let ds;

let start;
let elapsed;

//makes a 100 milisecond dot
function dot(){
  return new Promise(function(resolve, reject){
    console.log('dot');
    clearInterval(ds);
    audio.play();
    dt = setInterval(function(){
      if(audio.currentTime >= 0.1){
        audio.pause();
        audio.currentTime = 0;
        resolve("dot");
      }
    }, 1);
  });
}

//makes a 300 milisecond dash
function dash(){
  return new Promise(function(resolve, reject){
    console.log('dash');
    clearInterval(dt);
    audio.play();
    ds = setInterval(function(){
      if(audio.currentTime >= 0.3){
        audio.pause();
        audio.currentTime = 0;
        resolve("dash");
      }
    }, 1);
  });
}

//makes a 500 milisecond space
function space(){
  return new Promise(function(resolve, reject){
    console.log('space');
    clearInterval(dt);
    clearInterval(ds);
    setTimeout(function(){
      resolve("space");
    }, 200);
  });
}

dot().then(dash).then(space).then(dot);// .-/. or ae

//toMorse("a");//.then(test => toMorse("b"));

function toMorse(letter){
  return new Promise(function(resolve, reject){
  switch(letter){
    case "a":
      dot().then(dash).then(space);
      break;
    case "b":
      dash().then(dot).then(dot).then(dot).then(space);
      break;
    case "c":
      dash().then(dot).then(dash).then(dot).then(space);
      break;
  };
    resolve("done");
  });
}

//shows or hides morse 
show.addEventListener("click", function(){
  if(words.style.display === "none"){ //if text is displayed, get rid of text
    words.style.display = "block";
  }else{
    words.style.display = "none";
  }
});

//keydown starts buzzer
paddle.addEventListener("keydown", function(event){
  if(event.keyCode === 32){//spacebar pressed
    audio.play();
    light.style.color = "yellow";
    start = Date.now();
    stopTimer();
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

