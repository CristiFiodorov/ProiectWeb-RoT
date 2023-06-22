function createCourseChapter(chapter){
    const chapterContainer = document.createElement("div");
    chapterContainer.id = "chapter-container";
    const list = document.getElementById("list");
    const a = document.createElement("a");
    a.href = `chapter_content.html?chapterID=${chapter._id}`;
    a.className = "contents-card-link";
    a.innerHTML = `
        <div class="contents-card__item">
            <p>${chapter.title}</p>
        </div>
    `;
    chapterContainer.appendChild(a);
    // If user is admin add one more child after the link: the admin special icon_buttons
    if(userIsAdmin()) {
        appendAdminChapterButtons(chapterContainer, chapter);
    }
    list.appendChild(chapterContainer);
}

const id = new URLSearchParams(window.location.search).get('courseID');

getChapters(id)
    .then(chapters => {
        if (Array.isArray(chapters)) {
            chapters.map(e => createCourseChapter(e));
        } else {
            console.error('chapters is not an array');
        }
        if(userIsAdmin()) {
            appendAdminAddChapterButton();
        }
        // After all the admin special buttons have been placed
        addModalBundles();
    })
    .catch(error => {
        console.error(error);
    });
