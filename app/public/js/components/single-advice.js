function appendSimpleUserCardButtons(cardButtons, currentAdvice, cardContainer, mainContainer) {
    cardButtons.innerHTML = `
        <a class="big-card__button" id="prev" href="#">Înapoi</a>
        <a class="big-card__button" href="advice.html">Sfaturi</a>
        <a class="big-card__button" id="next" href="#">Următorul</a>
    `;

    cardContainer.appendChild(cardButtons);
    mainContainer.appendChild(cardContainer);

    const prevButton = document.getElementById("prev");
    const nextButton = document.getElementById("next");

    prevButton.addEventListener('click', () => {
        getPrevAdvice(currentAdvice._id)
            .then(prevAdvice => {
                if (prevAdvice !== undefined) {
                    window.location.href = `single_advice.html?id=${prevAdvice._id}`;
                } else {
                    console.error('advice is not defined');
                }
            })
            .catch(error => {
                console.error(error);
            });
    });

    nextButton.addEventListener('click', () => {
        getNextAdvice(currentAdvice._id)
            .then(nextAdvice => {
                if (nextAdvice !== undefined) {
                    window.location.href = `single_advice.html?id=${nextAdvice._id}`;
                } else {
                    console.error('advice is not defined');
                }
            })
            .catch(error => {
                console.error(error);
            });
    });
}

function createAdvicePage(advice) {
    const main = document.getElementById("main");
    const div = document.createElement("div");
    div.id = "advice-card";
    div.className = "big-card card--gradient-move";

    div.innerHTML = `
    <div class="big-card__image">
        <img src="${advice.image_url}" alt="sfat">
    </div>

    <div class="big-card__text">
        <p> ${advice.description} </p>
    </div>
    `;

    const cardButtons = document.createElement("div");
    cardButtons.className = "big-card__buttons";

    if (!userIsAdmin()) {
        appendSimpleUserCardButtons(cardButtons, advice, div, main);
    }
    else {
        appendAdminCardButtons(cardButtons, advice, div, main);
    }
}

const id = new URLSearchParams(window.location.search).get('id');

getAdviceById(id).then((advice) => {
    if (advice !== undefined) {
        createAdvicePage(advice);
    }
    else {
        console.error('advice is not defined');
    }
})
.catch(error => {
    console.error(error);
});