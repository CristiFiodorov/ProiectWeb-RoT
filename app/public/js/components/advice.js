function createAdviceCard(advice){
    const aElement = document.createElement("a");
    aElement.className = "card__link";
    aElement.href = `single_advice.html?id=${advice._id}`;
    aElement.innerHTML = `
    <div class="card card--gradient-move">
        <img src="${advice.image_url}" alt="${advice.title}" class="card__image">
        <h3 class="card__title">${advice.title}</h3>
    </div>`;

    const main = document.getElementById("main");
    main.appendChild(aElement);
}


getAdvices().then((advices) => {
    advices.map( e => createAdviceCard(e));
});