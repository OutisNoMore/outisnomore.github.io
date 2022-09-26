let fibo = Module.cwrap('fibo', 'number', ['number']);
const BTN = document.getElementById('fibo');
const INDEX = document.getElementById('index');
const TABLE = document.getElementById('sequence');

BTN.addEventListener("click", () => {
  let index = +INDEX.value;
  let sequence = "";
  let row, cell1, cell2;
  for(let i = 0; i < index; i++){
    row = TABLE.insertRow();
    cell1 = row.insertCell();
    cell2 = row.insertCell();
    cell1.innerHTML = i;
    cell2.innerHTML = fibo(i);
  }
});
