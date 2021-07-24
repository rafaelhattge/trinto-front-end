const coursesEl = document.querySelector(".courses");
const hamburger = document.querySelector(".hamburger");
const modalEl = document.querySelector(".modal");
const modalButtonEl = document.querySelector(".modal__button");
const modalContainerEl = document.querySelector(".modal__container");
let courses;

// AJAX
const getCourses = async () => {
    const data = await (await fetch("data/data.json")).json();
    courses = data.cursos;
    courses.map((item, index) => {
        item.id = index;
    })
    renderCourses(courses);
}

const renderCourses = data => {
    coursesEl.innerHTML = "";
    data.map((item, index) => {
        coursesEl.insertAdjacentHTML("beforeend", `<div data-id=${item.id} class="course">${item.curso.titulo}</div>`)
    });
    document.querySelectorAll('.course').forEach(item => {
        item.addEventListener('click', e => {
            document.querySelector('.modal').classList.add("open");
            renderCourseDetails(e.target.getAttribute("data-id"));
        });
    });
}

const renderCourseDetails = (id) => {
    const { curso, depoimentos, obras } = courses[id];

    const template = `<div><h2>${curso.titulo}</h2>
            <p>${curso.tipo}</p>
            <p>${curso.descricao}</p>
            ${depoimentos.map(item => {
        return (
            `
            <p>${item.depoimento}</p>
            <img src=${item.imagem} alt="foto de ${item.nome}" />
            <p>${item.nome}</p>
            <p>${item.ocupacao}</p>
            `
        )
    })}`;

    modalContainerEl.innerHTML = "";
    modalContainerEl.insertAdjacentHTML("beforeend", template);
}

modalButtonEl.addEventListener("click", () => {
    modalEl.classList.remove("open");
});

hamburger.addEventListener("click", () => {
    const ul = document.querySelector(".nav ul");
    ul.classList.contains("open") ? ul.classList.remove("open") : ul.classList.add("open");
    hamburger.classList.contains("open") ? hamburger.classList.remove("open") : hamburger.classList.add("open");
});

// document.querySelectorAll('.courses').forEach(item => {
//     item.addEventListener('click', event => {
//         //handle click
//     })
// })

window.addEventListener("DOMContentLoaded", () => {
    getCourses();
});