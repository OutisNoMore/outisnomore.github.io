let fibo = Module.cwrap('fibo', 'number', ['number']);
const BTN = document.getElementById('fibo');
const INDEX = document.getElementById('index');
const TABLE = document.getElementById('sequence');
const ERROR_OOB = "ERROR: Please enter a number between 0 and 46";

const printFibo = function(){
  let index = +INDEX.value; // Get value from input as number
  if(index >= 0 && index <= 46){
    let row, cell1, cell2, i; // Handlers to build table with fibonacci sequence
    if((TABLE.rows.length - 1) < (index + 1)){
      // Add more rows to table	
      i = TABLE.rows.length - 1;
      for(; i < (index + 1); i++){
        row = TABLE.insertRow();
        cell1 = row.insertCell();
        cell2 = row.insertCell();
        cell1.innerHTML = i;
        cell2.innerHTML = fibo(i);
      }  
    }
    else if((TABLE.rows.length - 1) > index){
      // delete rows from table	
      while((TABLE.rows.length-1) !== index){
        TABLE.deleteRow(TABLE.rows.length - 1);
      }	
    }
  }
  else{
    // Index is out of bounds
    alert(ERROR_OOB);
    console.log("You entered: (" + index + ") which is not between 0 and 46");
  }
}

BTN.addEventListener("click", printFibo);
