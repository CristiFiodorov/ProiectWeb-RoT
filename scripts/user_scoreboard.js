import json from './mock_jsons/clasament.json' assert { type : 'json'};

function createTableRow(id, userName, score){
    const tableRow = document.createElement("tr");
    tableRow.className = "rank-table__row";
    tableRow.innerHTML = `\
    <td>${id}</td>\
    <td>${userName}</td>\
    <td>${score}</td>`;

    const tableElement = document.getElementById("table");
    tableElement.appendChild(tableRow);
}

json.map( e => createTableRow(e.id, e.userName, e.score));