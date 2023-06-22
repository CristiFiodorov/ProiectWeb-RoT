function clearContentPopUpHandler(event, chapterId) {
    event.preventDefault();
    document.getElementById("delete-modal-title").innerHTML = "Ești sigur că vrei să cureți conținutul?";
    document.getElementById("save-delete-modal").addEventListener("click", (event) => {
        submitDeleteSignHandler(event, chapterId);
    });
}

function appendParagraphSectionToForm(form) {
    // Paragraph Description
    const descriptionInput = document.createElement("textarea");
    descriptionInput.id = "form_description";
    descriptionInput.name = "form_description";
    descriptionInput.rows = "7";
    descriptionInput.placeholder = "Descrierea paragrafului";
    form.appendChild(descriptionInput);

    // Paragraph Tags 
    const tagsCheckbox = document.createElement("fieldset");
    tagsCheckbox.innerHTML = `
        <legend>Taguri suplimentare pentru paragraf</legend>
        <div>
            <input type="checkbox" id="strong" name="strong" value="strong" />
            <label for="srtong">Bold</label>
        </div>
    `;
    form.appendChild(tagsCheckbox);
}

function appendSubsectionSectionToForm(form) {
    const subsectionTitleInput = document.createElement("input");
    subsectionTitleInput.type = "text";
    subsectionTitleInput.id = "form_title";
    subsectionTitleInput.name = "form_title";
    subsectionTitleInput.placeholder = "Titlul subsecțiunii";
    form.appendChild(subsectionTitleInput);
}

function appendImageSectionToForm(form) {
    const imageInput = document.createElement("input");
    imageInput.type = "file";
    imageInput.id = "form_img";
    imageInput.name = "form_img";
    form.appendChild(imageInput);
}

function addElementPopUpHandler(event, chapterId) {
    event.preventDefault();
    document.getElementById("modal-content").firstChild?.remove();
    document.getElementById("modal-title").innerHTML = "Adaugă o nouă secțiune";

    const form = document.createElement("form");
    form.className = "flex flex-col align-center";

    form.innerHTML = `
        <select id="element_type" name = "element_type">
            <option value="" disabled selected>Alege tipul elementului</option>
            <option value="subsection">Subsecțiune</option>
            <option value="paragraph">Paragraf</option>
            <option value="image">Imagine</option>
        </select>
    `;

    document.getElementById("modal-content").appendChild(form);
    const selectOptions = document.getElementById("element_type");
    selectOptions.addEventListener("change", (event) => {
        document.querySelector('.error-message')?.remove();
        const elementType = event.target.value;
        // Other option selected, so delete the last two childs from page and add new form fields
        let childCount = form.childElementCount;
        while (childCount-- > 1) {
            form.lastChild.remove();
        }
        switch (elementType) {
            case "subsection":
                appendSubsectionSectionToForm(form);
                break;
            case "paragraph":
                appendParagraphSectionToForm(form);
                break;
            case "image":
                appendImageSectionToForm(form);
        }
    });

    document.getElementById("save-modal").addEventListener("click", (event) => submitAddElementHandler(event, chapterId));
    form.addEventListener("submit", (event) => submitAddElementHandler(event, chapterId));
}

function appendAdminFooterButtons(footer, chapterId, courseId) {
    const clearButton = document.createElement("a");
    const addButton = document.createElement("a");
    const chaptersButton = document.createElement("a");

    clearButton.className = "chapter-footer__link delete-modal-open";
    addButton.className = "chapter-footer__link modal-open";
    chaptersButton.className = "chapter-footer__link";

    clearButton.href = "#";
    addButton.href = "#";
    chaptersButton.href = `course_chapters.html?courseID=${courseId}`;

    clearButton.innerHTML = "<h1>Curăță Conținutul</h1>";
    addButton.innerHTML = "<h1>Adaugă Secțiune</h1>";
    chaptersButton.innerHTML = "<h1>Cuprins</h1>";

    // handler for the prev button
    clearButton.addEventListener('click', (event) => {
        clearContentPopUpHandler(event, chapterId);
    });

    // handler for the next button 
    addButton.addEventListener('click', (event) => {
        addElementPopUpHandler(event, chapterId);
    });


    // Export To JSON button
    const exportJsonButton = document.createElement("a");
    exportJsonButton.className = "chapter-footer__link chapter-footer__link--gold";
    exportJsonButton.href = `${config.apiAddress}/api/v1/export/json/chapters/${chapterId}/contents`;
    ;
    exportJsonButton.innerHTML = "<h1>Export JSON</h1>";

    // Export to CSV button
    const exportCsvButton = document.createElement("a");
    exportCsvButton.className = "chapter-footer__link chapter-footer__link--gold";
    exportCsvButton.href = `${config.apiAddress}/api/v1/export/csv/chapters/${chapterId}/contents`;
    exportCsvButton.innerHTML = "<h1>Export CSV</h1>";

    footer.appendChild(exportJsonButton);
    footer.appendChild(clearButton);
    footer.appendChild(chaptersButton);
    footer.appendChild(addButton);
    footer.appendChild(exportCsvButton);
}