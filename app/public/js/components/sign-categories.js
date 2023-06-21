function createCategoryCard(category) {
    const a = document.createElement("a");
    const main = document.getElementById("main");
    a.href = `signs_by_category.html?categoryID=${category._id}`;
    a.className = "card__link";
    a.innerHTML = `
    <div class="card card--gradient-red">
        <img src="${category.image_url}" alt="${category.title}" class="card__image">
        <h3 class="card__title">${category.title}</h3>
    </div>
    `;

    main.appendChild(a);
}

function createImportExportButtonsForSignCategories() {
  if(isUserLoggedIn()) {
    const importExportWrapper = document.createElement("div");
    importExportWrapper.className = "import-export__wrapper";
    importExportWrapper.innerHTML = `
      <div class="import-export-links__container">
        <a href="${config.apiAddress}/api/v1/export/json/signcategories" class="import-export__link import-export__link--red">Export JSON</a>
        <a href="${config.apiAddress}/api/v1/export/csv/signcategories" class="import-export__link import-export__link--red">Export CSV</a>
      </div>
    `
    document.getElementById("import-export").appendChild(importExportWrapper);
  }
}

getSignCategories()
  .then(signCategories => {
    if (Array.isArray(signCategories)) {
      signCategories.map(e => createCategoryCard(e));
      createImportExportButtonsForSignCategories();
    } else {
      console.error('signCategories is not an array');
    }
  })
  .catch(error => {
    console.error(error);
  });