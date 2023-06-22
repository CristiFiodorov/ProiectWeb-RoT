function addSignCategoryPopUpHandler() {
    document.getElementById("modal-content").firstChild?.remove();
    document.getElementById("modal-title").innerHTML = "Adaugă Categorie";

    const form = document.createElement("form");
    form.className = "flex flex-col align-center";

    form.innerHTML = `
        <input type="text" id="form_title" name="form_title" placeholder="Numele Categoriei"/>
        <input type="file" id="form_img" name="form_img" title = "Incărcați poza indicatorului" accept="image/*"/>
    `;

    document.getElementById("save-modal").addEventListener("click", submitAddSignCategoryHandler);
    form.addEventListener("submit", submitAddSignCategoryHandler);
    document.getElementById("modal-content").appendChild(form);
};

function addAdminButton() {
    const main = document.getElementById("main");

    // Adding add button for admin
    addAdminSpecificButton(main, "Adaugă Categorie", "https://fiiwebapp.blob.core.windows.net/rot-web/admin_add_img.png", "modal-open", addSignCategoryPopUpHandler);

    // Asociate modal event handlers for each button that will pop up a modal window
    addModalBundles();
}

if(userIsAdmin()) {
    addAdminButton();
}