function createIndicatorPage(indicatorID)
{
    const main = document.getElementById("main");
    const div = document.createElement("div");
    const indicatorObj = signs.find(e => e.indicatorID == indicatorID);
    div.className = "big-card card--gradient-red";
    div.innerHTML = `
    <div class="big-card__image">
                <img src="${indicatorObj.img}" alt="indicatoare">
            </div>
            <div class="big-card__text">
                <h3 style="color:white; font-size:20px;" >${indicatorObj.name} </h3>
                <p>${indicatorObj.content}</p>
            </div>

            <div class="big-card__buttons">
                <a class="big-card__button " href="#">Înapoi</a>
                <a class="big-card__button " href="tipuri_indicatoare.html">Indicatoare</a>
                <a class="big-card__button " href="#">Următorul</a>
            </div>
    `;
    main.appendChild(div);
}

const id = new URLSearchParams(window.location.search).get('indicatorID');
createIndicatorPage(id);