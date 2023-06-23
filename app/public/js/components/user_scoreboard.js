import { baseURL } from "../api-requests/const.js";

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

try{
    const response = await fetch(`${baseURL}/api/v1/user/top`, {
        method: 'GET'
    });
    const responseBody = await response.json();
    console.log(responseBody);
    if(responseBody.success == true){
        responseBody.data.map((e, index) => {
            let userName = e.username;
            let score = "-";
            if(e.hasOwnProperty('score')){
                score = e['score'];
            }
            createTableRow(index + 1, userName, score);
        })
    }
} catch(error){
    console.log(error);
}

// users.map( e => createTableRow(e.id, e.userName, e.score));