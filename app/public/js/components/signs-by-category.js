function createIndicatorCard(indicator) {
    const main = document.getElementById("main");
    const a = document.createElement("a");
    a.className = "card__link";
    a.href = `sign.html?indicatorID=${indicator._id}`;
    a.innerHTML = `
    <div class="card card--gradient-red">
        <img src="${indicator.image_url}" alt="${indicator.title}" class="card__image">
        <h3 class="card__title">${indicator.title}</h3>
    </div>
    `;
    main.appendChild(a);
}

function createImportExportButtonsForSignsByCategory(categoryID) {
    if(isUserLoggedIn()) {
        const importExportWrapper = document.createElement("div");
        importExportWrapper.className = "import-export__wrapper";
        importExportWrapper.innerHTML = `
            <div class="import-export-links__container">
                <a href="${config.apiAddress}/api/v1/export/json/signcategories/${categoryID}/signs" class="import-export__link import-export__link--red">Export JSON</a>
                <a href="${config.apiAddress}/api/v1/export/csv/signcategories/${categoryID}/signs" class="import-export__link import-export__link--red">Export CSV</a>
            </div>
        `;
        document.getElementById("import-export").appendChild(importExportWrapper);
    }
};

getSignCategories()
    .then(signCategories => {
        if (Array.isArray(signCategories)) {
            const categoryId = new URLSearchParams(window.location.search).get('categoryID');
            const title = document.getElementById("title");
            const categorie = signCategories.filter(e => e._id == categoryId)[0];

            getSigns(categorie._id)
                .then(signs => {
                    title.innerHTML = `${categorie.title}`;
                    if (Array.isArray(signs)) {
                        signs.map(e => createIndicatorCard(e));
                        if(isUserLoggedIn()) {
                            createImportExportButtonsForSignsByCategory(categoryId);
                        }
                    } else {
                        console.error('signs is not an array');
                    }
                })
                .catch(error => {
                    console.error(error);
                });

        } else {
            console.error('signCategories is not an array');
        }
    })
    .catch(error => {
        console.error(error);
    });

