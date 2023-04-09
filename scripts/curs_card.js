import courses from './mock_jsons/cursuri.json' assert { type: 'json'};

function createCourseCard(courseID){
    const courseObj = courses.find(e => e.cursID == courseID);
    const main = document.getElementById("main");
    const a = document.createElement("a");
    a.href = `cuprins.html?courseID=${courseID}`;
    a.className = "course-card-link";
    a.innerHTML = `
    <div class="course-card course-card--gradient-green">
        <h3 class="course-card__title">${courseObj.titlu}</h3>
        <img src="${courseObj.img}" alt="${courseObj.titlu}" class="course-card__image">
        <h3 class="course-card__description">${courseObj.description}</h3>
    </div>
    `;
    main.appendChild(a);
}

courses.map( e => createCourseCard(e.cursID));