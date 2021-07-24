const coursesEl = document.querySelector(".courses__list");
const hamburger = document.querySelector(".hamburger");
const modalEl = document.querySelector(".modal");
const modalButtonEl = document.querySelector(".modal__button");
const modalContainerEl = document.querySelector(".modal__container");
const navUlEl = document.querySelector(".nav ul");
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

// Renderiza lista de Cursos
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

// Renderiza os detalhes de um curso selecionado
const renderCourseDetails = (id) => {
    const { curso, depoimentos, obras } = courses[id];

    const templateCourse = `<div class="modal__course">
                <h2 class="modal__course-title">${curso.titulo}</h2>
                <h3 class="modal__course-type">${(curso.tipo === "pos" && "Pós-graduação") || (curso.tipo === "mba" && "MBA")}</h3>
                <p class="modal__course-description"><strong>Descrição:</strong> ${curso.descricao}</p>\
            </div>`;

    const templateTestimonial = `<div class="modal__testims-wrapper">
    ${depoimentos.map(item => {
        return `<div class="modal__testims">
        <div class="modal__testims image-testim-container">
            <div class="modal__testims image-wrapper">
                <img class="modal__testims image" src=${item.imagem} alt="foto de ${item.nome}" />
            </div>
            <div class="modal__testims testimonial-wrapper">
                <p class="modal__testims__testimonial">"${item.depoimento}"</p>
                <p class="modal__testims__name">${item.nome}</p>
                <p class="modal__testims__occupation">${item.ocupacao}</p>
            </div>
        </div>

        </div>`
    })}</div>`;

    const templateBibliography = `<div class="modal__bibliography">
        <h3 class="modal__bibliography-title">Obras:</h3>
        ${obras.map(item => {
        return `<div class="modal__bibliography-item">
            <cite>${item.titulo}</cite>
            <p>${item.autor}</p>
        </div>`
    }).join("")}
    </div>`;

    modalContainerEl.innerHTML = "";
    modalContainerEl.insertAdjacentHTML("beforeend", templateCourse);
    modalContainerEl.insertAdjacentHTML("beforeend", templateBibliography);
    modalContainerEl.insertAdjacentHTML("beforeend", templateTestimonial);
}

// Filtra os cursos de acordo com o tipo
const filterCourses = tipo => {
    let data = courses.filter(item => { return tipo == item.curso.tipo });
    renderCourses(data);
}

// Ativa ou desativa os botões dos filtros
const toggleButton = (element) => {
    const buttons = document.querySelectorAll(".courses__btn");
    buttons.forEach(button => {
        button.classList.remove("active")
    })
    element.classList.add("active");
};


// LISTENERS
modalButtonEl.addEventListener("click", () => {
    modalEl.classList.remove("open");
});

hamburger.addEventListener("click", () => {
    if (hamburger.classList.contains("open")) {
        hamburger.classList.remove("open");
        navUlEl.classList.remove("open");
        document.body.classList.remove("open");
    } else {
        hamburger.classList.add("open");
        navUlEl.classList.add("open");
        document.body.classList.add("open");
    }
});

document.querySelector(".courses__btn-all").addEventListener("click", e => {
    toggleButton(e.target);
    renderCourses(courses);
});
document.querySelector(".courses__btn-mba").addEventListener("click", e => {
    toggleButton(e.target);
    filterCourses("mba");
});
document.querySelector(".courses__btn-pos").addEventListener("click", e => {
    toggleButton(e.target);
    filterCourses("pos");
});

window.addEventListener("resize", () => {
    if (document.body.clientWidth > 530) {
        hamburger.classList.remove("open");
        navUlEl.classList.remove("open");
        document.body.classList.remove("open");
    }
})

window.addEventListener("DOMContentLoaded", () => {
    getCourses();
});

