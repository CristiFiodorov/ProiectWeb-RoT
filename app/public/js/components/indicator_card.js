getSignCategories()
    .then(signCategories => {
        if (Array.isArray(signCategories)) {
            const id = new URLSearchParams(window.location.search).get('categoryID');
            const title = document.getElementById("title");
            const categorie = signCategories.filter(e => e._id == id)[0];

            getSigns(categorie._id)
                .then(signs => {
                    if (Array.isArray(signs)) {
                        title.innerHTML = `${categorie.title}`;
                        signs.map(e => createIndicatorCard(e));
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

