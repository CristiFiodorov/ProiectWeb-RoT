function appendAdminChapterButtons(chaptersList, chapter) {
    const chapterButtons = document.createElement("span");
    chapterButtons.className = "admin-chapter_buttons";

    // Append admin modify icon 
    const modifyIcon = document.createElement("a");
    modifyIcon.href = '#';
    modifyIcon.className = "admin-modify-chapter__icon";
    modifyIcon.title = "Modifica capitol";
    chapterButtons.appendChild(modifyIcon);

    // Append admin delete icon 
    const deleteIcon = document.createElement("a");
    deleteIcon.href = "#";
    deleteIcon.className = "admin-delete-chapter__icon";
    deleteIcon.title = "Sterge capitol";
    
    chapterButtons.appendChild(deleteIcon);
    chaptersList.appendChild(chapterButtons);
}

function appendAdminAddChapterButton() {
    const addChapterContainer = document.createElement("div");
    addChapterContainer.id = "chapter-container";
    const list = document.getElementById("list");
    const a = document.createElement("a");
    a.href = `#`;
    a.className = "contents-card-link";
    a.innerHTML = `
        <div class="contents-card__item admin-add-contents__item">
            <p>Adaugă un nou capitol</p>
        </div>
    `;
    addChapterContainer.appendChild(a);
    list.appendChild(addChapterContainer);
}


function deleteCoursePopUp(event) {
    event.preventDefault();
    document.getElementById("delete-modal-title").innerHTML = "Ești sigur că vrei să ștergi cursul?";
    document.getElementById("save-delete-modal").addEventListener("click", (event) => {
        submitDeleteCourseHandler(event);
    });
}

function updateCoursePopUp(event) {
    event.preventDefault();
    document.getElementById("modal-content").firstChild?.remove();
    document.getElementById("modal-title").innerHTML = "Modifică Cursul";

    const form = document.createElement("form");
    form.className = "flex flex-col align-center";

    form.innerHTML = `
        <input type="text" id="form_title" name="form_title" placeholder="Numele Cursului"/>
        <textarea id="form_description" name="form_description" rows="7" placeholder="Descrierea Cursului"></textarea>
        <input type="file" id="form_img" name="form_img" title = "Incărcați o nouă poză" accept="image/*"/>
    `;
    
    document.getElementById("modal-content").appendChild(form);
    await initializeUpdateCourseForm();
    document.getElementById("save-modal").addEventListener("click", (event) => submitUpdateSignHandler(event, currentSign.parentId));
}

function appendAdminCourseButtons() {
    const main = document.getElementById("main");
    const adminContainer = document.createElement("div");
    adminContainer.className = "admin-course-buttons__container";
    
    const deleteCourseLink = document.createElement("a");
    deleteCourseLink.href = "#";
    deleteCourseLink.classList = "admin-link delete-course__link modal-open"; 
    deleteCourseLink.innerHTML = "Șterge cursul";

    deleteCourseLink.addEventListener("click", deleteCoursePopUp);

    const modifyCourseLink = document.createElement("a");
    modifyCourseLink.href = "#";
    modifyCourseLink.classList = "admin-link modify-course__link delete-modal-open";
    modifyCourseLink.innerHTML = "Modifică cursul";

    modifyCourseLink.addEventListener("click", updateCoursePopUp);
    adminContainer.appendChild(modifyCourseLink);
    adminContainer.appendChild(deleteCourseLink);
    
    
    main.insertBefore(adminContainer, main.firstChild);
}

if(userIsAdmin()) {
    appendAdminCourseButtons();
}