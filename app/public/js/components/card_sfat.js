function createAdviceCard(id, title, src){
    const aElement = document.createElement("a");
    aElement.className = "card__link";
    aElement.href = `sfat.html?id=${id}`;
    aElement.innerHTML = `
    <div class="card card--gradient-move">
        <img src="${src}" alt="${title}" class="card__image">
        <h3 class="card__title">${title}</h3>
    </div>`;

    const main = document.getElementById("main");
    main.appendChild(aElement);
}


advices.map( e => createAdviceCard(e.id, e.title, e.src));