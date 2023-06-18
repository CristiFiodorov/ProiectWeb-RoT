function createCourseCard(course){
    const main = document.getElementById("main");
    const a = document.createElement("a");
    a.href = `course_chapters.html?courseID=${course._id}`;
    a.className = "course-card-link";
    a.innerHTML = `
    <div class="course-card course-card--gradient-green">
        <h3 class="course-card__title">${course.title}</h3>
        <img src="${course.image_url}" alt="${course.title}" class="course-card__image">
        <h3 class="course-card__description">${course.description}</h3>
    </div>
    `;
    main.appendChild(a);
}


getCourses()
  .then(courses => {
    if (Array.isArray(courses)) {
        courses.map( e => createCourseCard(e));
    } else {
      console.error('courses is not an array');
    }
  })
  .catch(error => {
    console.error(error);
  });