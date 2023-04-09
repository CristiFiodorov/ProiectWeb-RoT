function createCategoryCard(categoryID) {
    const a = document.createElement("a");
    const main = document.getElementById("main");
    const categorie = signsCategories.find(e => e.categoryID == categoryID);
    a.href = `indicatoare_specifice.html?categoryID=${categoryID}`;
    a.className = "card__link";
    a.innerHTML = `
    <div class="card card--gradient-red">
        <img src="${categorie.img}" alt="${categorie.name}" class="card__image">
        <h3 class="card__title">${categorie.name}</h3>
    </div>
    `;

    main.appendChild(a);
}

signsCategories.map(e => createCategoryCard(e.categoryID));