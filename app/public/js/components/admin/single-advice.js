function deleteSingleAdvicePopUpHandler(event, currentAdvice) {
    event.preventDefault();
    document.getElementById("delete-modal-title").innerHTML = "Ești sigur că vrei să ștergi sfatul?";
    document.getElementById("save-delete-modal").addEventListener("click", (event) => {
        submitDeleteSingleAdviceHandler(event, currentAdvice);
    });
}

function updateSingleAdvicePopUpHandler(event, currentAdvice) {
    event.preventDefault();
    document.getElementById("modal-content").firstChild?.remove();
    document.getElementById("modal-title").innerHTML = "Modifică Sfatul";

    const form = document.createElement("form");
    form.className = "flex flex-col align-center";

    form.innerHTML = `
        <input type="text" id="form_title" name="form_title" placeholder="Titlu Sfat"/>
        <textarea id="form_description" name="form_description" rows="7" placeholder="Descriere Sfat"></textarea>
        <input type="file" id="form_img" name="form_img" title = "Incărcați o nouă poză" accept="image/*"/>
    `;
    document.getElementById("modal-content").appendChild(form);
    initializeUpdateSingleAdviceForm(currentAdvice);
    document.getElementById("save-modal").addEventListener("click", submitUpdateSingleAdviceHandler);
}

function appendAdminCardButtons(cardButtons, currentAdvice, cardContainer, mainContainer) {
    cardButtons.innerHTML = `
        <a class="big-card__button delete-modal-open" id="delete_advice" href="#">Șterge</a>
        <a class="big-card__button" href="advice.html">Sfaturi</a>
        <a class="big-card__button modal-open" id="update_advice" href="#">Modifică</a>
    `;

    cardContainer.appendChild(cardButtons);
    mainContainer.appendChild(cardContainer);

    const deleteButton = document.getElementById("delete_advice");
    const updateButton = document.getElementById("update_advice");

    deleteButton.addEventListener('click', async (event) => {
        deleteSingleAdvicePopUpHandler(event, currentAdvice);
    });
    updateButton.addEventListener('click', async (event) => {
        updateSingleAdvicePopUpHandler(event, currentAdvice);
    });

    addModalBundles();
}