const coursesEl = document.querySelector(".courses__list");
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

    const templateCourse = `<div class="modal__course">
                <h2 class="modal__course-title">${curso.titulo}</h2>
                <h3 class="modal__course-type">${(curso.tipo === "pos" && "Pós-graduação") || (curso.tipo === "mba" && "MBA")}</h3>
                <p class="modal__course-description"><strong>Descrição:</strong> ${curso.descricao}</p>\
            </div>`;

    const templateTestimonial = `<h3>Depoimentos:</h3>
    ${depoimentos.map(item => {
        return `<div class="modal__tests">
        <div class="modal__tests image-wrapper">
            <img class="modal__tests image" src=${item.imagem} alt="foto de ${item.nome}" />
        </div>
        <p class="modal__tests testimonial">"${item.depoimento}"</p>
        <p class="modal__tests name">${item.nome}</p>
        <p class="modal__tests occupation">${item.ocupacao}</p>
        </div>`
    })}`;

    const templateBibliography = `<div class="modal__bibliography">
        <h3>Obras:</h3>
        ${obras.map(item => {
        return `<div class="modal__bibliography-item">
            <p>${item.titulo}</p>
            <p>${item.autor}</p>
        </div>`
    }).join("")}
    </div>`;

    console.log(templateTestimonial)

    // const templateBibliography = ``;

    modalContainerEl.innerHTML = "";
    modalContainerEl.insertAdjacentHTML("beforeend", templateCourse);
    modalContainerEl.insertAdjacentHTML("beforeend", templateBibliography);
    modalContainerEl.insertAdjacentHTML("beforeend", templateTestimonial);
}


// const renderCourseDetails = (id) => {
//     const { curso, depoimentos, obras } = courses[id];

//     const template = `<div class="modal__wrapper">
//             <h2 class="modal__title">${curso.titulo}</h2>
//             <h3 class="modal__type">Tipo: ${curso.tipo}</h3>
//             <p class="modal__description">${curso.descricao}</p>
//             ${depoimentos.map(item => `<p class="modal__testimonial">${item.depoimento}</p>
//             <img src=${item.imagem} alt="foto de ${item.nome}" />
//             <p>${item.nome}</p>
//             <p>${item.ocupacao}</p>`)}
//             ${obras.map(item => `<p>${item.titulo}</p>
//             <p>${item.autor}</p>`).join("")}</div>`;

//     modalContainerEl.innerHTML = "";
//     modalContainerEl.insertAdjacentHTML("beforeend", template);
// }

const filterCourses = tipo => {
    let data = courses.filter(item => { return tipo == item.curso.tipo });
    renderCourses(data);
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

document.querySelector(".courses__btn-all").addEventListener("click", e => renderCourses(courses));
document.querySelector(".courses__btn-mba").addEventListener("click", e => filterCourses("mba"));
document.querySelector(".courses__btn-pos").addEventListener("click", e => filterCourses("pos"));

window.addEventListener("DOMContentLoaded", () => {
    getCourses();
});