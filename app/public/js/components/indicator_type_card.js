function createCategoryCard(category) {
    const a = document.createElement("a");
    const main = document.getElementById("main");
    a.href = `indicatoare_specifice.html?categoryID=${category._id}`;
    a.className = "card__link";
    a.innerHTML = `
    <div class="card card--gradient-red">
        <img src="${category.image_url}" alt="${category.title}" class="card__image">
        <h3 class="card__title">${category.title}</h3>
    </div>
    `;

    main.appendChild(a);
}

getSignCategories()
  .then(signCategories => {
    if (Array.isArray(signCategories)) {
      signCategories.map(e => createCategoryCard(e));
    } else {
      console.error('signCategories is not an array');
    }
  })
  .catch(error => {
    console.error(error);
  });