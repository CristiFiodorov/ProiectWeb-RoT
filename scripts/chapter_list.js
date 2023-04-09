import chapters from './mock_jsons/chapters.json' assert { type: 'json'};
import courses from './mock_jsons/cursuri.json' assert { type: 'json'};

function createCourseChapter(chapterID){
    const a = document.createElement("a");
    const list = document.getElementById("list");
    const chapterObj = chapters.find(c => c.chapterID == chapterID);
    a.href = `capitol_curs.html?chapterID=${chapterID}`;
    a.className = "contents-card-link";
    a.innerHTML = `
    <div class="contents-card__item">
        <p>${chapterObj.title}</p>
    </div>
    `;
    list.appendChild(a);
}

const id = new URLSearchParams(window.location.search).get('courseID');
const courseObj = courses.find(c => c.cursID == id);
courseObj.chapters.map( c => createCourseChapter(c));