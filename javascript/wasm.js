let fibo = Module.cwrap('fibo', 'number', ['number']);
const BTN = document.getElementById('fibo');
const INDEX = document.getElementById('index');
const TABLE = document.getElementById('sequence');

const printFibo = function(){
  let index = +INDEX.value; // Get value from input as number
  let row, cell1, cell2;    // Handlers to build table with fibonacci sequence
  for(let i = 0; i < index; i++){
    row = TABLE.insertRow();
    cell1 = row.insertCell();
    cell2 = row.insertCell();
    cell1.innerHTML = i;
    cell2.innerHTML = fibo(i);
  }  
}

BTN.addEventListener("click", printFibo);
