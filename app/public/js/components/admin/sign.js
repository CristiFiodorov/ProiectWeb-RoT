async function updateSignPopUpHandler(event, currentSign) {
    event.preventDefault();
    document.getElementById("modal-content").firstChild?.remove();
    document.getElementById("modal-title").innerHTML = "Modifică Indicatorul";

    const form = document.createElement("form");
    form.className = "flex flex-col align-center";

    form.innerHTML = `
        <input type="text" id="form_title" name="form_title" placeholder="Nume Indicator"/>
        <textarea id="form_description" name="form_description" rows="7" placeholder="Descriere Indicator"></textarea>
        <input type="file" id="form_img" name="form_img" title = "Incărcați o nouă poză" accept="image/*"/>
    `;
    
    document.getElementById("modal-content").appendChild(form);
    const parentId = initializeUpdateSignFormAndGetParentId(currentSign);
    document.getElementById("save-modal").addEventListener("click", (event) => submitUpdateSignHandler(event, parentId));
}

async function deleteSignPopUpHandler(event, currentSign) {
    event.preventDefault();
    document.getElementById("delete-modal-title").innerHTML = "Ești sigur că vrei să ștergi indicatorul?";
    document.getElementById("save-delete-modal").addEventListener("click", (event) => {
        submitDeleteSignHandler(event, currentSign);
    });
}

function appendAdminCardButtons(cardButtons, currentSign, cardContainer, mainContainer) {
    cardButtons.innerHTML = `
        <a class="big-card__button delete-modal-open" id="delete_sign" href="#">Șterge</a>
        <a class="big-card__button" href="signs_by_category.html?categoryID=${currentSign.parentId}">Indicatoare</a>
        <a class="big-card__button modal-open" id="update_sign" href="#">Modifică</a>
    `;

    cardContainer.appendChild(cardButtons);
    mainContainer.appendChild(cardContainer);

    const deleteButton = document.getElementById("delete_sign");
    const updateButton = document.getElementById("update_sign");

    deleteButton.addEventListener('click', async (event) => {
        deleteSignPopUpHandler(event, currentSign);
    });
    updateButton.addEventListener('click', async (event) => {
        updateSignPopUpHandler(event, currentSign);
    });

    addModalBundles();
}   
