const coursesEl = document.querySelector(".courses");
const hamburger = document.querySelector(".hamburger");
let courses;

// AJAX
const getCourses = async () => {
    const data = await (await fetch("data/data.json")).json();
    courses = data.cursos;
    renderCourses(courses);
}

const renderCourses = data => {
    coursesEl.innerHTML = "";
    data.map(cursos => { coursesEl.insertAdjacentHTML("afterbegin", `<div class="course">${cursos.curso.titulo}</div>`) });
}

hamburger.addEventListener("click", () => {
    const ul = document.querySelector(".nav ul");
    ul.classList.contains("open") ? ul.classList.remove("open") : ul.classList.add("open");
    hamburger.classList.contains("open") ? hamburger.classList.remove("open") : hamburger.classList.add("open");
})

window.addEventListener("DOMContentLoaded", getCourses);