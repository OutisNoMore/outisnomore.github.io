let audio = new Audio("../beep.wav");
let b = "";
let a = "";
let timeElapsed = 0;
let timeElapsed2 = 0;
let timer;
let timer2;
let paddle = document.getElementById("timer");
let output = document.getElementById("output");
let clear = document.getElementById("clear");
let light = document.getElementById("light");
let words = document.getElementById("letter");
let alphabet2 = ['a',
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
let alphabet = [".-",
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

a = getLetter();
document.getElementById("test").innerHTML = a;

//Handles use of buttons
//keydown starts buzzer

paddle.addEventListener("touchstart", ()=>{light.innerHTML= "a";});

paddle.addEventListener("keydown",
  function(event){
    if(event.keyCode == 32){
      audio.play();
      startTimer();
      stopTimer2();
    }
  }
);

//key up, stops buzzer
paddle.addEventListener("keyup",
  function(event){
    if(event.keyCode == 32){
      audio.pause();
      stopTimer();
      startTimer2();
    }
  }
);

//delete one dot or slash
paddle.addEventListener("keydown",
  function(event){
    if(event.keyCode == 8){
      backspace();
    }
  }
);
/*
//add slash to separate letters
paddle.addEventListener("keydown",
  function(event){
    if(event.keyCode == 83){
//      output.innerHTML += "/";
//      timeElapsed2 = 0;
//      translate();
    }
  }
);
*/
//clear output
clear.addEventListener("click",
  function(){
    output.innerHTML = "";
    words.innerHTML = "";
    timeElapsed2 = 0;
  }
);

//enumerates dots and slashes to alphabet letter
function translate(){
  let index = output.innerHTML.indexOf(" ");
  let morse = output.innerHTML.substring(0,index);
//  words.innerHTML = "*";
  switch(morse){
  case alphabet[0]:
    b = "a";
    words.innerHTML += b;
    if(b == a){
//      alert("correct");
      a = getLetter();
      document.getElementById("test").innerHTML = a;
    }
    else{
  //    alert("wrong!");
    }
    output.innerHTML = "";
    timeElapsed2 = 0;
    break;
  case alphabet[1]:
    b = "b";
    words.innerHTML += b;
    if(b == a){
    //  alert("correct");
      a = getLetter();
      document.getElementById("test").innerHTML = a;
    }
    else{
      alert("wrong!");
    }
    output.innerHTML = "";
    timeElapsed2 = 0;
    break;
  case alphabet[2]:
    b = "c";
    words.innerHTML += b;
    if(b == a){
      //alert("correct");
      a = getLetter();
      document.getElementById("test").innerHTML = a;
    }
    else{
      alert("wrong!");
    }
    output.innerHTML = "";
    timeElapsed2 = 0;
    break;
  case alphabet[3]:
    b = "d";
    words.innerHTML += b;
    if(b == a){
//      alert("correct");
      a = getLetter();
      document.getElementById("test").innerHTML = a;
    }
    else{
      alert("wrong!");
    }
    output.innerHTML = "";
    timeElapsed2 = 0;
    break;
  case alphabet[4]:
    b = "e";
    words.innerHTML += b;
    if(b == a){
//      alert("correct");
      a = getLetter();
      document.getElementById("test").innerHTML = a;
    }
    else{
      alert("wrong!");
    }
    output.innerHTML = "";
    timeElapsed2 = 0;
    break;
  case alphabet[5]:
    b = "f";
    words.innerHTML += b;
    if(b == a){
//      alert("correct");
      a = getLetter();
      document.getElementById("test").innerHTML = a;
    }
    else{
      alert("wrong!");
    }
    output.innerHTML = "";
    timeElapsed2 = 0;
    break;
  case alphabet[6]:
    b = "g";
    words.innerHTML += b;
    if(b == a){
//      alert("correct");
      a = getLetter();
      document.getElementById("test").innerHTML = a;
    }
    else{
      alert("wrong!");
    }
    output.innerHTML = "";
    timeElapsed2 = 0;
    break;
  case alphabet[7]:
    b = "h";
    words.innerHTML += b;
    if(b == a){
//      alert("correct");
      a = getLetter();
      document.getElementById("test").innerHTML = a;
    }
    else{
      alert("wrong!");
    }
    output.innerHTML = "";
    timeElapsed2 = 0;
    break;
  case alphabet[8]:
    b = "i";
    words.innerHTML += b;
    if(b == a){
//      alert("correct");
      a = getLetter();
      document.getElementById("test").innerHTML = a;
    }
    else{
      alert("wrong!");
    }
    output.innerHTML = "";
    timeElapsed2 = 0;
    break;
  case alphabet[9]:
    b = "j";
    words.innerHTML += b;
    if(b == a){
//      alert("correct");
      a = getLetter();
      document.getElementById("test").innerHTML = a;
    }
    else{
      alert("wrong!");
    }
    output.innerHTML = "";
    timeElapsed2 = 0;
    break;
  case alphabet[10]:
    b = "k";
    words.innerHTML += b;
    if(b == a){
//      alert("correct");
      a = getLetter();
      document.getElementById("test").innerHTML = a;
    }
    else{
      alert("wrong!");
    }
    output.innerHTML = "";
    timeElapsed2 = 0;
    break;
  case alphabet[11]:
    b = "l";
    words.innerHTML += b;
    if(b == a){
   //   alert("correct");
      a = getLetter();
      document.getElementById("test").innerHTML = a;
    }
    else{
      alert("wrong!");
    }
    output.innerHTML = "";
    timeElapsed2 = 0;
    break;
  case alphabet[12]:
    b = "m";
    words.innerHTML += b;
    if(b == a){
 //     alert("correct");
      a = getLetter();
      document.getElementById("test").innerHTML = a;
    }
    else{
      alert("wrong!");
    }
    output.innerHTML = "";
    timeElapsed2 = 0;
    break;
  case alphabet[13]:
    b = "n";
    words.innerHTML += b;
    if(b == a){
  //    alert("correct");
      a = getLetter();
      document.getElementById("test").innerHTML = a;
    }
    else{
      alert("wrong!");
    }
    output.innerHTML = "";
    timeElapsed2 = 0;
    break;
  case alphabet[14]:
    b = "o";
    words.innerHTML += b;
    if(b == a){
//      alert("correct");
      a = getLetter();
      document.getElementById("test").innerHTML = a;
    }
    else{
      alert("wrong!");
    }
    output.innerHTML = "";
    timeElapsed2 = 0;
    break;
  case alphabet[15]:
    b = "p";
    words.innerHTML += b;
    if(b == a){
   //   alert("correct");
      a = getLetter();
      document.getElementById("test").innerHTML = a;
    }
    else{
      alert("wrong!");
    }
    output.innerHTML = "";
    timeElapsed2 = 0;
    break;
  case alphabet[16]:
    b = "q";
    words.innerHTML += b;
    if(b == a){
 //     alert("correct");
      a = getLetter();
      document.getElementById("test").innerHTML = a;
    }
    else{
      alert("wrong!");
    }
    output.innerHTML = "";
    timeElapsed2 = 0;
    break;
  case alphabet[17]:
    b = "r";
    words.innerHTML += b;
    if(b == a){
    //  alert("correct");
      a = getLetter();
      document.getElementById("test").innerHTML = a;
    }
    else{
      alert("wrong!");
    }
    output.innerHTML = "";
    timeElapsed2 = 0;
    break;
  case alphabet[18]:
    b = "s";
    words.innerHTML += b;
    if(b == a){
  //    alert("correct");
      a = getLetter();
      document.getElementById("test").innerHTML = a;
    }
    else{
      alert("wrong!");
    }
    output.innerHTML = "";
    timeElapsed2 = 0;
    break;
  case alphabet[19]:
    b = "t";
    words.innerHTML += b;
    if(b == a){
  //    alert("correct");
      a = getLetter();
      document.getElementById("test").innerHTML = a;
    }
    else{
      alert("wrong!");
    }
    output.innerHTML = "";
    timeElapsed2 = 0;
    break;
  case alphabet[20]:
    b = "u";
    words.innerHTML += b;
    if(b == a){
  //    alert("correct");
      a = getLetter();
      document.getElementById("test").innerHTML = a;
    }
    else{
      alert("wrong!");
    }
    output.innerHTML = "";
    timeElapsed2 = 0;
    break;
  case alphabet[21]:
    b = "v";
    words.innerHTML += b;
    if(b == a){
  //    alert("correct");
      a = getLetter();
      document.getElementById("test").innerHTML = a;
    }
    else{
      alert("wrong!");
    }
    output.innerHTML = "";
    timeElapsed2 = 0;
    break;
  case alphabet[22]:
    b = "w";
    words.innerHTML += b;
    if(b == a){
//      alert("correct");
      a = getLetter();
      document.getElementById("test").innerHTML = a;
    }
    else{
      alert("wrong!");
    }
    output.innerHTML = "";
    timeElapsed2 = 0;
    break;
  case alphabet[23]:
    b = "x";
    words.innerHTML += b;
    if(b == a){
//      alert("correct");
      a = getLetter();
      document.getElementById("test").innerHTML = a;
    }
    else{
      alert("wrong!");
    }
    output.innerHTML = "";
    timeElapsed2 = 0;
    break;
  case alphabet[24]:
    b = "y";
    words.innerHTML += b;
    if(b == a){
//      alert("correct");
      a = getLetter();
      document.getElementById("test").innerHTML = a;
    }
    else{
      alert("wrong!");
    }
    output.innerHTML = "";
    timeElapsed2 = 0;
    break;
  case alphabet[25]:
    b = "z";
    words.innerHTML += b;
    if(b == a){
//      alert("correct");
      a = getLetter();
      document.getElementById("test").innerHTML = a;
    }
    else{
      alert("wrong!");
    }
    output.innerHTML = "";
    timeElapsed2 = 0;
    break;
  default:
    output.innerHTML = "";
    break;
  }
//  clearInterval(timer2);
}

//deletes one dot or slash
function backspace(){
  let letters = output.innerHTML;
  output.innerHTML = letters.substring(0, letters.length-1);
  timeElapsed2 = 0;
}

//starts timer for buzzer
function startTimer(){
  timer = setInterval(
    function(){
      timeElapsed++;
      light.style.color = "yellow";
    },1);
}

//stops timer for buzzer
function stopTimer(){
  clearInterval(timer);
  if(timeElapsed < 30){
    output.innerHTML += ".";
    timeElapsed = 0;
  }
  else {
    output.innerHTML += "-";
    timeElapsed = 0;
  }
  light.style.color = "black";
}

//starts timer for space
function startTimer2(){
  timer2 = setInterval(
    function(){
      timeElapsed2++;
      if(timeElapsed2 > 300){
	words.innerHTML += " ";
	if(a == ' '){
	  alert("correct!");
	  a = getLetter();
	  document.getElementById("test").innerHTML = a;
	}
        timeElapsed2 = 0;
      }
      else if(timeElapsed2 > 100){
	output.innerHTML += " ";
	translate();
      }
    }, 1);
}

//stops timer for space
function stopTimer2(){
  clearInterval(timer2);
  timeElapsed2 = 0;
}

function getLetter(){
  return alphabet2[Math.floor((Math.random()*27))];
}

