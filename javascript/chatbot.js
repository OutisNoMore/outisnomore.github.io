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
  let query = 'https://account.snatchbot.me/channels/api/api/id149554/app1234/apsmorse?user_id=0';
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
