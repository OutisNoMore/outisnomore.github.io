let send = document.getElementById("send");
let res = document.getElementById("response");
let talking = false;

let wait;

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
  //let query = 'http://127.0.0.1:5000/chatbot?reply=';
  let query = 'https://account.snatchbot.me/channels/api/api/id149554/app1234/apsabcd?user_id=0'
  let data = { message: words.innerHTML };
  words.innerHTML = "";
 
  fetch(query,{
    "method": "POST",
    "headers":{
      "Content-Type": "application/json",
      "Accept": "json"
    }
    "body": JSON.stringify(data),
  })
    .then(function(response){
      clearInterval(wait);
      return response.text();
    })
    .then(function(object){
      typeEffect(object);
      toMorse(object);
    })
    .catch(function(error){
      alert('Error:', error);
      res.innerHTML = "";
      clearInterval(wait);
    });
});

function toMorse(sequence){
  let morse = "";
  sequence.split('').forEach(letter => {
    letter = letter.toLowerCase();
    morse += revTranslate(letter);
  });
  makeSound(morse);
}

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
