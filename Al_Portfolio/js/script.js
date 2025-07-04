// function openMenu() {
//     "use strict";
//     //Buscamos los li y los guardamos en una variable
//     var opciones = document.getElementById("menu").firstElementChild.children;
//     //La variable i nos ayudará a recorrer el bucle e ir presentando las opciones
//     var i;
//     for (i = 0; i < opciones.length; i = i + 1) {
//         opciones[i].style.display = "block";
//     }
// }

// function closeMenu() {
//     "use strict";
//     //Solo cerramos el menú cuando la pantalla es pequeña (menor a 700px de ancho)
//     if (window.innerWidth <= 720) {
//         var opciones = document.getElementById("menu").firstElementChild.children;
//         var i;
//         opciones[0].style.display = "block";
//         for (i = 1; i < opciones.length; i = i + 1) {
//             opciones[i].style.display = "none";
//         }
//     }
// }

// function menu() {
//     "use strict";
//     if (document.getElementById("menu").firstElementChild.lastElementChild.style.display === "block") {
//         closeMenu();
//     } else {
//         openMenu();
//     }
// }

// function openedMenu() {
//     "use strict";
//     var opciones = document.getElementById("menu").firstElementChild.children;
//     var i;
//     opciones[0].style.display = "none";
//     for (i = 1; i < opciones.length; i = i + 1) {
//         opciones[i].style.display = "block";
//     }
// }


// window.onresize = function () {
//     "use strict";
//     if (window.innerWidth <= 720) {
//         closeMenu();
//     } else {
//         openedMenu();
//     }
// }

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



function ChangeCategory() {
    const buttons = document.querySelectorAll('.filter-buttons button');
    const items = document.querySelectorAll('.proyecto');
    let activeFilters = [];

    buttons.forEach(button => {
        button.addEventListener('click', () => {
            const category = button.getAttribute('data-category');

            if (category === 'all') {
                activeFilters = [];
                buttons.forEach(btn => btn.classList.remove('active'));
                button.classList.add('active');
                items.forEach(item => item.classList.remove('hidden'));
                return;
            }

            button.classList.toggle('active');

            const allButton = document.querySelector('button[data-category="all"]');
            allButton.classList.remove('active');

            if (activeFilters.includes(category)) {
                activeFilters = activeFilters.filter(cat => cat !== category);
            } else {
                if (category === 'unity') {
                    activeFilters = activeFilters.filter(cat => cat !== 'unreal');
                    const unrealBtn = document.querySelector('button[data-category="unreal"]');
                    unrealBtn.classList.remove('active');
                }
                if (category === 'unreal') {
                    activeFilters = activeFilters.filter(cat => cat !== 'unity');
                    const unityBtn = document.querySelector('button[data-category="unity"]');
                    unityBtn.classList.remove('active');
                }

                activeFilters.push(category);
            }

            //No active filters
            if (activeFilters.length === 0) {
                allButton.classList.add('active');
                items.forEach(item => item.classList.remove('hidden'));
                return;
            }

            //Show and hide
            items.forEach(item => {
                const itemCategories = item.getAttribute('data-category').split(/\s+/);
                const hasMatch = itemCategories.some(cat => activeFilters.includes(cat));
                item.classList.toggle('hidden', !hasMatch);
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




