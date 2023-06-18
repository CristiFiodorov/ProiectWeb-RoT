function appendSimpleUserCardButtons(cardButtons, currentSign, cardContainer, mainContainer) {
    cardButtons.innerHTML = `
        <a class="big-card__button" id="prev" href="#">Înapoi</a>
        <a class="big-card__button" href="signs_by_category.html?categoryID=${currentSign.parentId}">Indicatoare</a>
        <a class="big-card__button" id="next" href="#">Următorul</a>
    `;

    cardContainer.appendChild(cardButtons);
    mainContainer.appendChild(cardContainer);

    const prevButton = document.getElementById("prev");
    const nextButton = document.getElementById("next");

    prevButton.addEventListener('click', () => {
        getPrevSign(currentSign._id, currentSign.parentId)
        .then(sign => {
            if (sign !== undefined) {
                window.location.href = `sign.html?indicatorID=${sign._id}`;
            } else {
                console.error('sign is not defined');
            }
        })
        .catch(error => {
            console.error(error);
        });
    });

    nextButton.addEventListener('click', () => {
        getNextSign(currentSign._id, currentSign.parentId)
        .then(sign => {
            if (sign !== undefined) {
                window.location.href = `sign.html?indicatorID=${sign._id}`;
            } else {
                console.error('sign is not defined');
            }
        })
        .catch(error => {
            console.error(error);
        });
    });
}

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
    `
    const cardButtons = document.createElement("div");
    cardButtons.className = "big-card__buttons";

    if(!userIsAdmin()) {
        appendSimpleUserCardButtons(cardButtons, indicator, div, main);
    }
    else {
        appendAdminCardButtons(cardButtons, indicator, div, main);
    }
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
