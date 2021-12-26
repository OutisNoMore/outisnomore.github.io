let send    = document.getElementById("send");                  // button to send to api
let res     = document.getElementById("response");              // display output of chatbot
let api     = 'https://account.snatchbot.me/channels/api/api/'; // api for chatbot
let id      = 'id150028';                                       // api id
let key     = 'app1234';                                        // api key
let talking = false;                                            // status of chatbot

let wait; // wait while sending data

// send request to api and get response
send.addEventListener("click", function(){
  if(words.innerHTML.length === 0 || talking){
    return;
  }
  talking = true;
  res.innerHTML = "";
  wait = setInterval(function(){
    if(res.innerHTML.length === 10){
      res.innerHTML = "";
    }
    res.innerHTML += "*";
  }, 500);
  let query = 'https://account.snatchbot.me/channels/api/api/id150028/app1234/apsmorse?user_id=0';
  let data = { message: words.innerHTML };
  words.innerHTML = "";
 
  fetch(query,{
    method: "POST",
    headers:{
      "Content-Type": "application/json",
      "Accept": "json"
    },
    body: JSON.stringify(data)
  })
    .then(response => response.json())
    .then(function(object){
      clearInterval(wait);
      let text = object.messages[0].message
      typeEffect(text);
      toMorse(text);
    })
    .catch(function(error){
      console.log('Error:', error);
      talking = false;
      res.innerHTML = "";
      clearInterval(wait);
    });
});

// translate api response to morse code
function toMorse(sequence){
  let morse = "";
  sequence.split('').forEach(letter => {
    letter = letter.toLowerCase();
    morse += revTranslate(letter);
  });
  makeSound(morse);
}

// show output one letter at a time
function typeEffect(words){
  res.innerHTML = "";
  let i = 0;
  let timer = setInterval(function(){
    if(i === words.length){
      clearInterval(timer);
    }
    res.innerHTML += words.substring(i, i+1);
    i++;
  }, 250);
}

const context = new (window.AudioContext || window.webkitAudioContext)(); // sound drivers

// make corresponding morse code dots and dash sound
async function makeSound(sequence){
  const [dot, dash] = await fetchBuffer();
  let time = 0;
  sequence.split('').forEach(type => {
    if(type === ' '){
      time += 0.3;// wait 300 milliseconds after every letter - change for faster or slower
      return;
    }
    let test = context.createBufferSource();
    test.buffer = type === '-' ? dash : dot;
    test.connect(context.destination);
    test.start(context.currentTime + time);
    time += test.buffer.duration + 0.03;// makes sure order is synchronous with 30 millisecond gap between letters
  });
  setTimeout(function(){
    talking = false;
  }, time*1000);
}

// fetch sound utilities - beeps
function fetchBuffer(){
  return Promise.all([
    '../util/dot.wav',
    '../util/dash05.wav'
  ].map(url => fetch(url)
   .then(response => response.arrayBuffer())
   .then(buffer => context.decodeAudioData(buffer))
   )
  );
}
