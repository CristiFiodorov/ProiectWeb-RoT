function addSingleAdvicePopUpHandler() {
    document.getElementById("modal-content").firstChild?.remove();
    document.getElementById("modal-title").innerHTML = "Adaugă Sfat";

    const form = document.createElement("form");
    form.className = "flex flex-col align-center";

    form.innerHTML = `
        <input type="text" id="form_title" name="form_title" placeholder="Titlul Sfatului"/>
        <input type="file" id="form_img" name="form_img" title = "Incărcați poza sfatului" accept="image/*"/>
        <textarea id="form_description" name="form_description" rows="7" placeholder="Descrierea Sfatului"></textarea>
    `;

    document.getElementById("save-modal").addEventListener("click", submitAddSingleAdviceHandler);
    form.addEventListener("submit", submitAddSingleAdviceHandler);
    document.getElementById("modal-content").appendChild(form);
};

function addAdminButton() {
    const main = document.getElementById("main");

    // Adding add button for admin
    addAdminSpecificButton(main, "Adaugă Sfat", "https://fiiwebapp.blob.core.windows.net/rot-web/admin_add_img.png", "modal-open", addSingleAdvicePopUpHandler);

    // Asociate modal event handlers for each button that will pop up a modal window
    addModalBundles();
}


if(userIsAdmin()) {
    addAdminButton();
}