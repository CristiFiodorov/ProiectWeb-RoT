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

    document.getElementById("save-modal").addEventListener("click", submitAddSignHandler);
    document.getElementById("modal-content").appendChild(form);
};

async function modifySignCategoryHandler() {
    document.getElementById("modal-content").firstChild?.remove();
    document.getElementById("modal-title").innerHTML = "Modifică Categoria";
    
    const form = document.createElement("form");
    form.className = "flex flex-col align-center";

    form.innerHTML = `
        <input type="text" id="form_title" name="form_title" placeholder="Nume Indicator"/>
        <input type="file" id="form_img" name="form_img" title = "Incărcați poza indicatorului" accept="image/*"/>
    `;

    document.getElementById("modal-content").appendChild(form);    
    await initializeUpdateSignCategoryForm();
    document.getElementById("save-modal").addEventListener("click", submitUpdateSignCategoryHandler);
};

function deleteSignCategoryHandler() {
    document.getElementById("delete-modal-title").innerHTML = "Ești sigur că vrei să ștergi categoria?";
    document.getElementById("save-delete-modal").addEventListener("click", submitDeleteSignCategoryHandler);
};

function addAdminButtons() {
    const main = document.getElementById("main");
    const adminContainer = document.createElement("div");
    adminContainer.className = "admin-container";

    // Adding add button for admin
    addAdminSpecificButton(adminContainer, "Adaugă Indicator", "https://fiiwebapp.blob.core.windows.net/rot-web/admin_add_img.png", "modal-open", addSignPopUpHandler);

    // Ading update button for admin
    addAdminSpecificButton(adminContainer, "Modifică Categoria", "https://fiiwebapp.blob.core.windows.net/rot-web/admin_upd_img.png", "modal-open", modifySignCategoryHandler);

    // Adding delete button for admin
    addAdminSpecificButton(adminContainer, "Șterge Categoria", "https://fiiwebapp.blob.core.windows.net/rot-web/admin_delete_img.png", "delete-modal-open", deleteSignCategoryHandler);

    // Append this whole container to the main container 
    main.appendChild(adminContainer);

    // Asociate modal event handlers for each button that will pop up a modal window
    addModalBundles();
}

// TODO: Execute this function only if the user is admin
// Execute verification function from admin checker 
if(userIsAdmin()) {
    addAdminButtons();
}