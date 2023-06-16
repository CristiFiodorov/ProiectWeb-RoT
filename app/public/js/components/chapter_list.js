function createCourseChapter(chapter){
    const a = document.createElement("a");
    const list = document.getElementById("list");
    a.href = `capitol_curs.html?chapterID=${chapter._id}`;
    a.className = "contents-card-link";
    a.innerHTML = `
    <div class="contents-card__item">
        <p>${chapter.title}</p>
    </div>
    `;
    list.appendChild(a);
}

const id = new URLSearchParams(window.location.search).get('courseID');

getChapters(id)
    .then(chapters => {
        if (Array.isArray(chapters)) {
            chapters.map( e => createCourseChapter(e));
        } else {
            console.error('chapters is not an array');
        }
    })
    .catch(error => {
        console.error(error);
    });
