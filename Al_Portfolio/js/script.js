function openMenu() {
    "use strict";
    document.getElementById("menu-title").style.display = "block";

    const leftItems = document.querySelectorAll("#menu-left li:not(#menu-toggle)");
    leftItems.forEach(item => item.style.display = "block");

    const rightItems = document.querySelectorAll("#menu-right li");
    rightItems.forEach(item => item.style.display = "block");
}

function closeMenu() {
    "use strict";
    if (window.innerWidth <= 720) {
        document.getElementById("menu-title").style.display = "none";

        const leftItems = document.querySelectorAll("#menu-left li:not(#menu-toggle)");
        leftItems.forEach(item => item.style.display = "none");

        const rightItems = document.querySelectorAll("#menu-right li");
        rightItems.forEach(item => item.style.display = "none");
    }
}

function menu() {
    "use strict";
    const title = document.getElementById("menu-title");
    if (title.style.display === "block") {
        closeMenu();
    } else {
        openMenu();
    }
}

function openedMenu() {
    "use strict";
    document.getElementById("menu-title").style.display = "block";

    const leftItems = document.querySelectorAll("#menu-left li:not(#menu-toggle)");
    leftItems.forEach(item => item.style.display = "block");

    const rightItems = document.querySelectorAll("#menu-right li");
    rightItems.forEach(item => item.style.display = "block");

}

window.onresize = function () {
    if (window.innerWidth <= 720) {
        closeMenu();
    } else {
        openedMenu();
    }

    closeAllCollapsibles();
};

window.onload = function () {
    if (window.innerWidth <= 720) {
        closeMenu();
    } else {
        openedMenu();
    }
};

function setupCollapsible() {
    const projectsContainer = document.getElementById("projects_container");
    const projects = Array.from(document.getElementsByClassName("proyecto"));

    // Crear contenedor global para mostrar el contenido expandido
    let contentGlobal = document.createElement("div");
    contentGlobal.className = "content-global";
    projectsContainer.appendChild(contentGlobal);

    projects.forEach(project => {
        const figure = project.querySelector(".collapsible");
        const content = project.querySelector(".content");

        figure.addEventListener("click", function () {

            if (figure.classList.contains("active")) {
                figure.classList.remove("active");
                contentGlobal.style.display = "none";
                contentGlobal.innerHTML = "";
                return;
            }

            // Cerrar todos los demás
            projects.forEach(p => p.querySelector(".collapsible").classList.remove("active"));
            figure.classList.add("active");

            // Mostrar contenido
            contentGlobal.innerHTML = "";
            contentGlobal.innerHTML = content.innerHTML;
            contentGlobal.style.display = "block";

            // Encontrar en qué fila está el proyecto
            const projectIndex = projects.indexOf(project);
            const rowSize = getProjectsPerRow();

            const rowStart = projectIndex - (projectIndex % rowSize);
            const rowEnd = rowStart + rowSize;
            const lastInRow = projects[Math.min(rowEnd - 1, projects.length - 1)];

            // Mover el contenedor debajo de la fila
            projectsContainer.insertBefore(contentGlobal, lastInRow.nextElementSibling);
        });
    });

    // Detecta cuántos proyectos hay por fila
    function getProjectsPerRow() {
        const firstTop = projects[0].offsetTop;
        for (let i = 1; i < projects.length; i++) {
            if (projects[i].offsetTop !== firstTop) {
                return i;
            }
        }
        return projects.length;
    }
}

function closeAllCollapsibles() {
    const projects = document.getElementsByClassName("proyecto");
    const contentGlobal = document.querySelector(".content-global");

    // Quitar clase activa de todos los proyectos
    Array.from(projects).forEach(project => {
        const figure = project.querySelector(".collapsible");
        figure.classList.remove("active");
    });

    // Vaciar y ocultar el contenido global
    if (contentGlobal) {
        contentGlobal.classList.remove("open"); // si usas animación
        contentGlobal.innerHTML = "";
        contentGlobal.style.display = "none";
    }
}


function ChangeCategory() {
    const buttons = document.querySelectorAll('.filter-buttons button');
    const items = document.querySelectorAll('.proyecto');

    let selectedEngine = null; // solo uno o null (Any)
    let selectedRole = null;   // solo uno o null (Any)

    buttons.forEach(button => {
        button.addEventListener('click', () => {
            closeAllCollapsibles();

            const category = button.getAttribute('data-category');
            const group = button.getAttribute('data-group');

            // === ENGINE GROUP ===
            if (group === 'engine') {
                // Desactivar todos los botones de engine
                buttons.forEach(btn => {
                    if (btn.getAttribute('data-group') === 'engine') {
                        btn.classList.remove('active');
                    }
                });

                if (category === 'all-engine') {
                    selectedEngine = null; // Any
                } else {
                    selectedEngine = category;
                    button.classList.add('active');
                }

                if (selectedEngine === null) {
                    document.querySelector('button[data-category="all-engine"]').classList.add('active');
                }
            }

            // === ROLE GROUP ===
            if (group === 'role') {
                // Desactivar todos los botones de role
                buttons.forEach(btn => {
                    if (btn.getAttribute('data-group') === 'role') {
                        btn.classList.remove('active');
                    }
                });

                if (category === 'all-role') {
                    selectedRole = null; // Any
                    button.classList.add('active');
                } else {
                    selectedRole = category;
                    button.classList.add('active');
                }

                if (selectedRole === null) {
                    document.querySelector('button[data-category="all-role"]').classList.add('active');
                }
            }

            // === Mostrar / ocultar proyectos ===
            items.forEach(item => {
                const categories = item.getAttribute('data-category').split(/\s+/);

                const matchesEngine =
                    selectedEngine === null || categories.includes(selectedEngine);

                const matchesRole =
                    selectedRole === null || categories.includes(selectedRole);

                const shouldShow = matchesEngine && matchesRole;

                item.classList.toggle('hidden', !shouldShow);
            });
        });
    });
}



function CopyText(texto) {
    navigator.clipboard.writeText(texto)
        .then(() => {
            alert('Copied!: ' + texto);
        })
        .catch(err => {
            console.error('Copy error', err);
        });
}

document.addEventListener("DOMContentLoaded", ChangeCategory);
document.addEventListener("DOMContentLoaded", setupCollapsible);
document.addEventListener("DOMContentLoaded", closeAllCollapsibles);





