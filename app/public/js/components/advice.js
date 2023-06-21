function createAdviceCard(advice) {
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

function createImportExportButtonsForAdvice() {
    if (isUserLoggedIn()) {
        const importExportWrapper = document.createElement("div");
        importExportWrapper.className = "import-export__wrapper";
        importExportWrapper.innerHTML = `
          <div class="import-export-links__container">
            <a href="${config.apiAddress}/api/v1/export/json/advices" class="import-export__link import-export__link--move">Export JSON</a>
            <a href="${config.apiAddress}/api/v1/export/csv/advices" class="import-export__link import-export__link--move">Export CSV</a>
          </div>
        `
        document.getElementById("import-export").appendChild(importExportWrapper);
    }
}

getAdvices().then((advices) => {
    advices.map(e => createAdviceCard(e));
    createImportExportButtonsForAdvice();
});