import indicatoare from './mock_jsons/indicatorare.json' assert { type: 'json'};
import categorii from './mock_jsons/categorii_indicatoare.json' assert { type: 'json'};

function createIndicatorCard(indicatorID)
{
    const main = document.getElementById("main");
    const a = document.createElement("a");
    const indicatorObj = indicatoare.find(e => e.indicatorID == indicatorID);
    a.className = "card__link";
    a.href = `indicator.html?indicatorID=${indicatorID}`;
    a.innerHTML = `
    <div class="card card--gradient-red">
        <img src="${indicatorObj.img}" alt="${indicatorObj.name}" class="card__image">
        <h3 class="card__title">${indicatorObj.name}</h3>
    </div>
    `;
    main.appendChild(a);
} 

const id = new URLSearchParams(window.location.search).get('categoryID');
const title = document.getElementById("title");
const categorie = categorii.find(e => e.categoryID == id);

title.innerHTML = `${categorie.name}`;
categorie.indicatoare.map(e => createIndicatorCard(e));