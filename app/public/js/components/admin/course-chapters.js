function updateChapterPopUp(event, chapter) {
    event.preventDefault();
    document.getElementById("modal-content").firstChild?.remove();
    document.getElementById("modal-title").innerHTML = "Modifică capitolul";
    document.getElementById("modal").style.height = "400px";

    const form = document.createElement("form");
    form.className = "flex flex-col align-center";

    form.innerHTML = `
        <input type="text" id="form_title" name="form_title" placeholder="Titlul Capitolului"/>
    `;

    document.getElementById("modal-content").appendChild(form);
    initializeUpdateChapterForm(chapter);
    document.getElementById("save-modal").addEventListener("click", (event) => {
        submitUpdateChapterHandler(event, chapter);
    });
    form.addEventListener("submit", (event) => {
        submitUpdateChapterHandler(event, chapter);
    });
}

function deleteChapterPopUp(event, chapter) {
    event.preventDefault();
    document.getElementById("delete-modal-title").innerHTML = "Ești sigur că vrei să ștergi capitolul?";
    document.getElementById("save-delete-modal").addEventListener("click", (event) => {
        submitDeleteChapterHandler(event, chapter);
    });
}

function uploadContentHandling(event, chapter) {
    event.preventDefault();
      
    const fileInput = document.createElement("input");
    fileInput.type = "file";

    // Only Json Files Allowed 
    fileInput.accept = ".json"; 

    fileInput.addEventListener("change", (changeEvent) => {
        const selectedFile = changeEvent.target.files[0]; 
        const fileReader = new FileReader();
        fileReader.addEventListener("load", (loadEvent) => {
            const jsonContent = loadEvent.target.result;
            const jsonObject = JSON.parse(jsonContent);
            uploadContentInChapterHandler(jsonObject, chapter);
        });
        fileReader.readAsText(selectedFile);
    });
    fileInput.click();
}

/**
 * Buttons that appear on admin user page that involves a specific chapter (those icons that appaear at the right)
 */
function appendAdminChapterButtons(chaptersList, chapter) {
    const chapterButtons = document.createElement("span");
    chapterButtons.className = "admin-chapter_buttons";

    // Append admin modify icon 
    const modifyIcon = document.createElement("a");
    modifyIcon.href = '#';
    modifyIcon.className = "admin-modify-chapter__icon modal-open";
    modifyIcon.title = "Modifică capitolul";
    modifyIcon.addEventListener("click", (event) => {
        updateChapterPopUp(event, chapter);
    });
    chapterButtons.appendChild(modifyIcon);

    // Upload json file icon 
    const uploadIcon = document.createElement("a");
    uploadIcon.href = '#';
    uploadIcon.className = "admin-upload-chapter__icon";
    uploadIcon.title = "Încarcă capitol dintr-un fișier JSON";
    uploadIcon.addEventListener("click", (event) => {
        uploadContentHandling(event, chapter);
    });

    chapterButtons.appendChild(uploadIcon);
    // Append admin delete icon 
    const deleteIcon = document.createElement("a");
    deleteIcon.href = "#";
    deleteIcon.className = "admin-delete-chapter__icon delete-modal-open";
    deleteIcon.title = "Șterge capitolul";
    deleteIcon.addEventListener("click", (event) => {
        deleteChapterPopUp(event, chapter);
    });

    chapterButtons.appendChild(deleteIcon);
    chaptersList.appendChild(chapterButtons);
}

function addChapterPopUp(event) {
    event.preventDefault();
    document.getElementById("modal-content").firstChild?.remove();
    document.getElementById("modal-title").innerHTML = "Adaugă un nou capitol";
    document.getElementById("modal").style.height = "400px";

    const form = document.createElement("form");
    form.className = "flex flex-col align-center";

    form.innerHTML = `
        <input type="text" id="form_title" name="form_title" placeholder="Titlul Capitolului"/>
    `;

    document.getElementById("modal-content").appendChild(form);
    document.getElementById("save-modal").addEventListener("click", submitAddChapterHandler);
    form.addEventListener("submit", submitAddChapterHandler);
}

function appendAdminAddChapterButton() {
    const addChapterContainer = document.createElement("div");
    addChapterContainer.id = "chapter-container";
    const list = document.getElementById("list");
    const a = document.createElement("a");
    a.href = `#`;
    a.className = "contents-card-link";
    a.innerHTML = `
        <div class="contents-card__item admin-add-contents__item modal-open">
            <p>Adaugă un nou capitol</p>
        </div>
    `;
    a.addEventListener("click", addChapterPopUp);
    addChapterContainer.appendChild(a);
    list.appendChild(addChapterContainer);
}


function deleteCoursePopUp(event) {
    event.preventDefault();
    document.getElementById("delete-modal-title").innerHTML = "Ești sigur că vrei să ștergi cursul?";
    document.getElementById("save-delete-modal").addEventListener("click", submitDeleteCourseHandler);
}

async function updateCoursePopUp(event) {
    event.preventDefault();
    document.getElementById("modal-content").firstChild?.remove();
    document.getElementById("modal-title").innerHTML = "Modifică Cursul";
    document.getElementById("modal").style.height = "600px";

    const form = document.createElement("form");
    form.className = "flex flex-col align-center";

    form.innerHTML = `
        <input type="text" id="form_title" name="form_title" placeholder="Numele Cursului"/>
        <textarea id="form_description" name="form_description" rows="7" placeholder="Descrierea Cursului"></textarea>
        <input type="file" id="form_img" name="form_img" title = "Incărcați o nouă poză" accept="image/*"/>
    `;

    document.getElementById("modal-content").appendChild(form);
    await initializeUpdateCourseForm();
    document.getElementById("save-modal").addEventListener("click", submitUpdateCourseHandler);
}

function appendAdminCourseButtons() {
    const main = document.getElementById("main");
    const adminContainer = document.createElement("div");
    adminContainer.className = "admin-course-buttons__container";

    const deleteCourseLink = document.createElement("a");
    deleteCourseLink.href = "#";
    deleteCourseLink.classList = "admin-link delete-course__link delete-modal-open";
    deleteCourseLink.innerHTML = "Șterge cursul";

    deleteCourseLink.addEventListener("click", deleteCoursePopUp);

    const modifyCourseLink = document.createElement("a");
    modifyCourseLink.href = "#";
    modifyCourseLink.classList = "admin-link modify-course__link modal-open";
    modifyCourseLink.innerHTML = "Modifică cursul";

    modifyCourseLink.addEventListener("click", updateCoursePopUp);
    adminContainer.appendChild(modifyCourseLink);
    adminContainer.appendChild(deleteCourseLink);


    main.insertBefore(adminContainer, main.firstChild);
}

if (userIsAdmin()) {
    appendAdminCourseButtons();
}