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

function addSignPopUpHandler() {
    document.getElementById("modal-content").firstChild?.remove();
    document.getElementById("modal-title").innerHTML = "Adaugă Indicator";

    const form = document.createElement("form");
    form.className = "flex flex-col align-center";

    form.innerHTML = `
        <input type="text" id="form_title" name="form_title" placeholder="Nume Indicator"/>
        <input type="file" id="form_img" name="form_img" title = "Incărcați poza indicatorului" accept="image/*"/>
        <textarea id="form_description" name="form_description" rows="7" placeholder="Descriere Indicator"></textarea>
    `;

    form.addEventListener("submit", submitAddSignHandler);
    document.getElementById("modal-content").appendChild(form);
};

function modifySignCategoryHandler() {
    document.getElementById("modal-content").firstChild?.remove();
    document.getElementById("modal-title").innerHTML = "Modifică Categoria";
};

function addAdminButtons() {
    const main = document.getElementById("main");
    const adminContainer = document.createElement("div");
    adminContainer.className = "admin-container";

    // Adding add button for admin
    addAdminSpecificButton(adminContainer, "Adaugă Indicator", "https://fiiwebapp.blob.core.windows.net/rot-web/admin_add_img.png", true, addSignPopUpHandler);

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