function createIndicatorPage(indicator)
{
    const main = document.getElementById("main");
    const div = document.createElement("div");
    div.className = "big-card card--gradient-red";
    div.innerHTML = `
    <div class="big-card__image">
                <img src="${indicator.image_url}" alt="indicatoare">
            </div>
            <div class="big-card__text">
                <h3 style="color:white; font-size:20px;" >${indicator.title} </h3>
                <p>${indicator.description}</p>
            </div>

            <div class="big-card__buttons">
                <a class="big-card__button " id="prev" href="#">Înapoi</a>
                <a class="big-card__button " href="tipuri_indicatoare.html">Indicatoare</a>
                <a class="big-card__button " id="next" href="#">Următorul</a>
            </div>
    `;
    main.appendChild(div);

    const prevButton = document.getElementById("prev");
    const nextButton = document.getElementById("next");

    prevButton.addEventListener('click', () => {
        getPrevSign(indicator._id, indicator.parentId)
        .then(sign => {
            if (sign !== undefined) {
                window.location.href = `indicator.html?indicatorID=${sign._id}`;
            } else {
                console.error('sign is not defined');
            }
        })
        .catch(error => {
            console.error(error);
        });
    });

    nextButton.addEventListener('click', () => {
        getNextSign(indicator._id, indicator.parentId)
        .then(sign => {
            if (sign !== undefined) {
                window.location.href = `indicator.html?indicatorID=${sign._id}`;
            } else {
                console.error('sign is not defined');
            }
        })
        .catch(error => {
            console.error(error);
        });
    });
}

const id = new URLSearchParams(window.location.search).get('indicatorID');

getSign(id)
  .then(sign => {
    if (sign !== undefined) {
        createIndicatorPage(sign);
    } else {
      console.error('sign is not defined');
    }
  })
  .catch(error => {
    console.error(error);
});
