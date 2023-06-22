function addCoursePopUpHandler() {
    document.getElementById("modal-content").firstChild?.remove();
    document.getElementById("modal-title").innerHTML = "Adaugă Curs";

    const form = document.createElement("form");
    form.className = "flex flex-col align-center";

    form.innerHTML = `
        <input type="text" id="form_title" name="form_title" placeholder="Titlul Cursului"/>
        <textarea id="form_description" name="form_description" rows="7" placeholder="Descrierea Cursului"></textarea>
        <input type="file" id="form_img" name="form_img" title = "Incărcați poza cursului" accept="image/*"/>
    `;

    document.getElementById("save-modal").addEventListener("click", submitAddCourseHandler);
    form.addEventListener("submit", submitAddCourseHandler);
    document.getElementById("modal-content").appendChild(form);
}

function addAdminButton() {
    const main = document.getElementById("main");

    // Adding add button for admin
    addAdminCourseSpecificButton(main, "Adaugă Curs", "Adaugă titlul, descrierea și imaginea unui nou curs", "https://fiiwebapp.blob.core.windows.net/rot-web/admin_add_img.png", "modal-open", addCoursePopUpHandler);

    // Asociate modal event handlers for each button that will pop up a modal window
    addModalBundles();
}

if(userIsAdmin()) {
    addAdminButton();
}