let fibo = Module.cwrap('fibo', 'number', ['number']);
const BTN = document.getElementById('fibo');
const INDEX = document.getElementById('index');
const OUTPUT = document.getElementById('output');

BTN.addEventListener("click", () => {
  let index = +INDEX.value;
  let sequence = "";
  for(let i = 0; i < index; i++){
    sequence += fibo(i) + " ";
  }
  OUTPUT.innerHTML = sequence;
});
