function createIndicatorCard(indicator) {
    const main = document.getElementById("main");
    const a = document.createElement("a");
    a.className = "card__link";
    a.href = `indicator.html?indicatorID=${indicator._id}`;
    a.innerHTML = `
    <div class="card card--gradient-red">
        <img src="${indicator.image_url}" alt="${indicator.title}" class="card__image">
        <h3 class="card__title">${indicator.title}</h3>
    </div>
    `;
    main.appendChild(a);
}

/**
 * Given a container, the title of the card, the image source of the card,
 * a flag that indicates whether clicking the card pops up a modal or not,
 * and a 'click' event handler for the card, it will create a special admin card 
 */
function addAdminSpecificButton(mainContainer, title, imgSrc, isModal, clickHandler) {
    const specificButton = document.createElement("a");
    specificButton.className = "card__link " + (isModal ? "modal-open" : "");
    specificButton.href = '#';
    const buttonWrapper = document.createElement("div");
    buttonWrapper.className = "card card--gradient-orange";

    const cardTitle = document.createElement("h3");
    cardTitle.className = "card__title";
    cardTitle.innerHTML = title;
    const img = document.createElement("img");
    img.src = imgSrc;
    img.alt = title;
    img.className = "card__image";

    buttonWrapper.appendChild(img);
    buttonWrapper.appendChild(cardTitle);
    
    specificButton.appendChild(buttonWrapper);
    specificButton.addEventListener("click", clickHandler);
    mainContainer.appendChild(specificButton);
}

function addAdminButtons() {
    const main = document.getElementById("main");
    const adminContainer = document.createElement("div");
    adminContainer.className = "admin-container";
    
    addSignHandler = () => {
        document.getElementById("modal-content").firstChild?.remove();
        document.getElementById("modal-title").innerHTML = "Adaugă Indicator";
        const form = document.createElement("form");
        form.className = "flex flex-col align-center";
        form.innerHTML = `
            <input type="text" id="title" name="title" placeholder="Nume Indicator"/>
            <input type="file" id="img" name="img" title = "Incărcați poza indicatorului" accept="image/*"/>
            <textarea id="description" name="description" rows="7" placeholder="Descriere Indicator"></textarea>
        `;

        document.getElementById("modal-content").appendChild(form);

        // add event handlers for submit 
        const submitButton = document.getElementById("save-modal");
        submitButton.addEventListener("click", () => {
            const title = document.getElementById("title").value;
            const description = document.getElementById("description").value;
            const img = document.getElementById("img").files[0];
            
            // const formData = new FormData();
            
            // formData.append("title", title);
            // formData.append("description", description);
            // formData.append("img", img);
            // addSign(formData)
            //     .then(res => {
            //         if (res.status === 200) {
            //             location.reload();
            //         } else {
            //             console.error(res);
            //         }
            //     })
            //     .catch(error => {
            //         console.error(error);
            //     });

            console.log(img);
        });
    };
    // Adding add button for admin
    addAdminSpecificButton(adminContainer, "Adaugă Indicator", "https://fiiwebapp.blob.core.windows.net/rot-web/admin_add_img.png", true, addSignHandler);
    
    modifySignCategoryHandler = () => {
        document.getElementById("modal-content").firstChild?.remove();
        document.getElementById("modal-title").innerHTML = "Modifică Categoria";
    };
    // Ading update button for admin
    addAdminSpecificButton(adminContainer, "Modifică Categoria", "https://fiiwebapp.blob.core.windows.net/rot-web/admin_upd_img.png", true, modifySignCategoryHandler);
    
    // Adding delete button for admin
    addAdminSpecificButton(adminContainer, "Șterge Categoria", "https://fiiwebapp.blob.core.windows.net/rot-web/admin_delete_img.png", false);
    
    // Append this whole container to the main container 
    main.appendChild(adminContainer);
    
    // Asociate modal event handlers for each button that will pop up a modal window
    addModalBundles();
}

// TODO: Execute this function only if the user is admin
addAdminButtons();

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

