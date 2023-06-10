function createAdvicePage(id, src, title, content){
    const card = document.getElementById("advice-card");

    card.innerHTML = `
    <div class="big-card__image">
        <img src="${src}" alt="sfat">
    </div>

    <div class="big-card__text">
        <p> ${content} </p>
    </div>

    <div class="big-card__buttons">
        <a class="big-card__button " href="#">Înapoi</a>
        <a class="big-card__button " href="sfaturi.html">Sfaturi</a>
        <a class="big-card__button " href="#">Următorul</a>
    </div>
    `;
}

const id = new URLSearchParams(window.location.search).get('id');
const adviceObj = advices.find(e => e.id == id);
createAdvicePage(adviceObj.id, adviceObj.src, adviceObj.title, adviceObj.content);