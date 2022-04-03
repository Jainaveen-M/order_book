

function onFormSubmit(){
    var result = readform()
    console.log(result['price'])
    console.log(result['qty'])
}



function readform(){
    var data ={}
    data['price']= document.getElementById('price').value
    data['qty'] = document.getElementById('qty').value
    console.log(data["price"])
    console.log(data["qty"])
    insertNewRecord(data)
    // alert(" "+data["price"]+"  "+data["qty"]);
    return data
}


function insertNewRecord(data){
    var table = document.getElementById("buyorder").getElementsByTagName('tbody')[0];
    var newRow = table.insertRow(table.length);
    cell1 = newRow.insertCell(0);
    cell1.innerHTML = data["price"];
    cell2 = newRow.insertCell(1);
    cell2.innerHTML = data["qty"];
    cell3 = newRow.insertCell(2);
    cell3.innerHTML = data["price"] * data["qty"];
}

function clearFields(){
    
}