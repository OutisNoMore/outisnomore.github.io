//Event handlers from index.html
let paddle = document.getElementById("timer");
let output = document.getElementById("output");
let clear  = document.getElementById("clear");
let light  = document.getElementById("light");
let words  = document.getElementById("letter");
let audio  = new Audio("../beep.wav");
//Global variables for morseCode.js
let timeElapsed2 = 0;
let timeElapsed  = 0;
let answer = "";
let guess  = "";
let timer;
let timer2;
let alphabet = ['a',
		 'b',
		 'c',
		 'd',
		 'e',
		 'f',
		 'g',
		 'h',
		 'i',
		 'j',
		 'k',
		 'l',
		 'm',
		 'n',
		 'o',
		 'p',
		 'q',
		 'r',
		 's',
		 't',
		 'u',
		 'v',
		 'w',
		 'x',
		 'y',
		 'z',
                 ' ',];
let morse = [".-",
		"-...",
		"-.-.",
		"-..",
		".",
		"..-.",
		"--.",
		"....",
		"..",
		".---",
		"-.-",
		".-..",
		"--",
		"-.",
		"---",
		".--.",
		"--.-",
		".-.",
		"...",
		"-",
		"..-",
		"...-",
		".--",
		"-..-",
		"-.--",
		"--..",];

answer = getLetter();
document.getElementById("test").innerHTML = answer;

//keydown starts buzzer
paddle.addEventListener("keydown",
  function(event){
    if(event.keyCode == 32){//spacebar pressed
      audio.play();
      startTimer();
      stopTimer2();
    }
  }
);

//key up, stops buzzer
paddle.addEventListener("keyup",
  function(event){
    if(event.keyCode == 32){//spacebar pressed
      audio.pause();
      stopTimer();
      startTimer2();
    }
  }
);

//delete one dot or slash
paddle.addEventListener("keydown",
  function(event){
    if(event.keyCode == 8){//backspace bar
      backspace();
    }
  }
);

//deletes one dot or slash
function backspace(){
  let letters = output.innerHTML;
  output.innerHTML = letters.substring(0, letters.length-1);
  timeElapsed2 = 0;
}

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
  case morse[0]:
    guess = "a";
    break;
  case morse[1]:
    guess = "b";
    break;
  case morse[2]:
    guess = "c";
    break;
  case morse[3]:
    guess = "d";
    break;
  case morse[4]:
    guess = "e";
    break;
  case morse[5]:
    guess = "f";
    break;
  case morse[6]:
    guess = "g";
    break;
  case morse[7]:
    guess = "h";
    break;
  case morse[8]:
    guess = "i";
    break;
  case morse[9]:
    guess = "j";
    break;
  case morse[10]:
    guess = "k";
    break;
  case morse[11]:
    guess = "l";
    break;
  case morse[12]:
    guess = "m";
    break;
  case morse[13]:
    guess = "n";
    break;
  case morse[14]:
    guess = "o";
    break;
  case morse[15]:
    guess = "p";
    break;
  case morse[16]:
    guess = "q";
    break;
  case morse[17]:
    guess = "r";
    break;
  case morse[18]:
    guess = "s";
    break;
  case morse[19]:
    guess = "t";
    break;
  case morse[20]:
    guess = "u";
    break;
  case morse[21]:
    guess = "v";
    break;
  case morse[22]:
    guess = "w";
    break;
  case morse[23]:
    guess = "x";
    break;
  case morse[24]:
    guess = "y";
    break;
  case morse[25]:
    guess = "z";
    break;
  default:
    guess = "";
    break;
  }
  words.innerHTML += guess;

//  checkAnswer();

  output.innerHTML = "";
}

//guessing game
function checkAnswer(){
  if(guess == answer){
      alert("correct");
      answer = getLetter();
      document.getElementById("test").innerHTML = answer;
  }else{
      alert("wrong!");
  }
  guess = "";
}

//gets random letter in alphabet, including space
function getLetter(){
  return alphabet[Math.floor((Math.random()*27))];
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
      if(timeElapsed2 > 300){ //more than 300 milliseconds is a space or end of a word
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

