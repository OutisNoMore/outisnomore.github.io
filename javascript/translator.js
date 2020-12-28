let btn = document.getElementById("test");
let dt;
let ds;

const ctx = new (window.AudioContext || window.webkitAudioContext)();

async function makeSound(sequence){
  const [dot, dash] = await fetchBuffer();
  let time = 0;
  sequence.split('').forEach(type => {
    if(type === ' '){
      time += 0.3;
      return;
    }
    let test = ctx.createBufferSource();
    test.buffer = type === '-' ? dash : dot;
    test.connect(ctx.destination);
    test.start(ctx.currentTime + time);
    time += test.buffer.duration + 0.03;
  });
};


function fetchBuffer(){
  return Promise.all([
    '../dot.wav',
    '../dash05.wav'
  ].map(url => fetch(url)
   .then(r => r.arrayBuffer())
   .then(buf => ctx.decodeAudioData(buf))
   )
  );
}

let morseToLet = {
  ".-": "a",
  "-...": "b",
  "-.-.": "c",
  "-..": "d",
  ".": "e",
  "..-.": "f",
  "--.": "g",
  "....": "h",
  "..": "i",
  ".---": "j",
  "-.-": "k",
  ".-..": "l",
  "--": "m",
  "-.": "n",
  "---": "o",
  ".--.": "p",
  "--.-": "q",
  ".-.": "r",
  "...": "s",
  "-": "t",
  "..-": "u",
  "...-": "v",
  ".--": "w",
  "-..-": "x",
  "-.--": "y",
  "--..": "z",
  "-----": "0",
  ".----": "1",
  "..---": "2",
  "...--": "3",
  "....-": "4",
  ".....": "5",
  "-....": "6",
  "--...": "7",
  "---..": "8",
  "----.": "9",
  "..--..": "?",
  ".-.-.-": ".",
  "-.-.--": "!",
  " ": " "
};

function revTranslate(letter){
  let ans = "";

  for(let m in morseToLet){
    if(morseToLet[m] == letter){
      ans = m;
    }
  }

  return ans + " ";
}

function translate(){
  let index = output.innerHTML.indexOf(" ");
  let morseCode = output.innerHTML.substring(0, index);
  output.innerHTML = "";

  if(morseToLet[morseCode]){
    words.innerHTML += morseToLet[morseCode];
  }
}
