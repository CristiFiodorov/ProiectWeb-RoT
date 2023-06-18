function createAdvicePage(advice){
    const card = document.getElementById("advice-card");

    card.innerHTML = `
    <div class="big-card__image">
        <img src="${advice.image_url}" alt="sfat">
    </div>

    <div class="big-card__text">
        <p> ${advice.description} </p>
    </div>

    <div class="big-card__buttons">
        <a class="big-card__button " id="prev" href="#">Înapoi</a>
        <a class="big-card__button " href="advice.html">Sfaturi</a>
        <a class="big-card__button " id="next" href="#">Următorul</a>
    </div>
    `;

    const prevButton = document.getElementById("prev");
    const nextButton = document.getElementById("next");

    prevButton.addEventListener('click', () => {
        getPrevAdvice(advice._id)
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
        getNextAdvice(advice._id)
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

const id = new URLSearchParams(window.location.search).get('id');

getAdviceById(id).then((advice) => {
    createAdvicePage(advice);
});