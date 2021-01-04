const context = new (window.AudioContext || window.webkitAudioContext)();

async function makeSound(sequence){
  const [dot, dash] = await fetchBuffer();
  let time = 0;
  sequence.split('').forEach(type => {
    if(type === ' '){
      time += 0.3;//wait 300 milliseconds after every letter
      return;
    }
    let test = context.createBufferSource();
    test.buffer = type === '-' ? dash : dot;
    test.connect(context.destination);
    test.start(context.currentTime + time);
    time += test.buffer.duration + 0.03;//makes sure order is synchronous with 30 millisecond gap
  });
}


function fetchBuffer(){
  return Promise.all([
    '../dot.wav',
    '../dash05.wav'
  ].map(url => fetch(url)
   .then(response => response.arrayBuffer())
   .then(buffer => context.decodeAudioData(buffer))
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
}

function revTranslate(letter){
  let output = "";

  for(let i in morseToLet){
    if(morseToLet[i] == letter){
      output = i;
    }
  }

  return output + " ";
}

function translate(){
  let index = output.innerHTML.indexOf(" ");
  let morseCode = output.innerHTML.substring(0, index);
  output.innerHTML = "";

  if(morseToLet[morseCode]){
    words.innerHTML += morseToLet[morseCode];
  }
}
