document.querySelector('.form').addEventListener('submit', mainFunction);
var arrayOfObject = [];

function mainFunction(event) {

    event.preventDefault();

    createArrayInputs();

}

function createArrayInputs() {

    var arrayInputs = document.querySelectorAll('.form-control');

    createObject(arrayInputs);
}

function createObject(arrayInputs) {

    var object = {};

    for (var i = 0; i < arrayInputs.length; i++) {
        if (arrayInputs[i].id == "quantity") {
            object[arrayInputs[i].name] = parseInt(arrayInputs[i].value);
        } else if (arrayInputs[i].id == "unitaryValue") {
            object[arrayInputs[i].name] = parseFloat(arrayInputs[i].value);
        } else {
            object[arrayInputs[i].name] = arrayInputs[i].value;
        }
    }

    insertTable(object);

    addObjectInArrayOfObject(object);

    resetValuesArrayInputs(arrayInputs);

}

function insertTable(object) {

    var tr = document.createElement('tr');
    var tdTotal = document.createElement('td');
    var total = object.quantity * object.unitaryValue;

    if (document.querySelector('.table thead tr #valor') == null) {
        var thTotal = document.createElement('th');
        thTotal.id = "valor";
        thTotal.textContent = "Total (R$)";
        var trHead = document.querySelector('.table thead tr');
        trHead.appendChild(thTotal);
    } else { }

    for (var atributo in object) {

        var td = document.createElement('td');

        if (atributo === "unitaryValue") {
            td.textContent = object[atributo].toFixed(2).replace('.', ',');
        } else {
            td.textContent = object[atributo];
        }

        tr.appendChild(td);

    }

    tdTotal.textContent = total.toFixed(2).replace('.', ',');
    tr.appendChild(tdTotal);

    var tbody = document.querySelector('.table tbody');
    tbody.appendChild(tr);
}

function addObjectInArrayOfObject(object) {

    arrayOfObject.push(object);

    console.log(arrayOfObject);

    insertFoot(arrayOfObject);

}

function resetValuesArrayInputs(arrayInputs) {

    arrayInputs[0].value = '';
    arrayInputs[1].value = '1';
    arrayInputs[2].value = '0.0';
    arrayInputs[0].focus();

}

function insertFoot(arrayObjectCampos) {

    var tdQuantity = document.querySelector('.table tfoot tr #tdQuantity');
    var tdValueTotal = document.querySelector('.table tfoot tr #tdValue');

    var quantity = 0;
    var value = 0;
    var valueTotal = 0;

    if (document.querySelector('.table tfoot tr #total') == null) {
        var tdTotal = document.createElement('td');
        var trFoot = document.querySelector('.table tfoot tr');
        tdTotal.id = "total";
        trFoot.appendChild(tdTotal);
    } else {
        var tdTotal = document.querySelector('.table tfoot tr #total');
    }

    for (var i = 0; i < arrayObjectCampos.length; i++) {
        quantity += arrayObjectCampos[i].quantity;
        value += arrayObjectCampos[i].unitaryValue;
        valueTotal += arrayObjectCampos[i].quantity * arrayObjectCampos[i].unitaryValue;
    }

    tdQuantity.innerHTML = "Quantidade: " + quantity;
    tdValueTotal.innerHTML = "Valor: R$" + value.toFixed(2).replace('.', ',');
    tdTotal.innerHTML = "Valor total: R$" + valueTotal.toFixed(2).replace('.', ',');
}