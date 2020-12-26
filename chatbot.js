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
  let query = 'http://127.0.0.1:5000/chatbot?reply=';
  query += words.innerHTML;
  words.innerHTML = "";
 
  fetch(query)
    .then(function(response){
      return response.text();
    })
    .then(function(object){
//      clearInterval(wait);
      typeEffect(object);
    })
    .catch(function(error){
      console.error('Error:', error);
    });
    talking = false;
});

function typeEffect(words){
  clearInterval(wait);
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
