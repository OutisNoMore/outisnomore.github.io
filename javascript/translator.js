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
