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
    var coll = document.getElementsByClassName("collapsible");

    for (var i = 0; i < coll.length; i++) {
        coll[i].addEventListener("click", function () {
            // Cerrar todos los demás
            for (var j = 0; j < coll.length; j++) {
                if (coll[j] !== this) {
                    coll[j].classList.remove("active");
                    coll[j].style.borderRadius = "1em";
                    var otherContent = coll[j].nextElementSibling;
                    if (otherContent) {
                        otherContent.style.maxHeight = null;
                    }
                }
            }

            // Toggle el actual
            this.classList.toggle("active");
            var content = this.nextElementSibling;

            if (content.style.maxHeight) {
                content.style.maxHeight = null;
                this.style.borderRadius = "1em";
            } else {
                content.style.maxHeight = content.scrollHeight + "px";
                this.style.borderRadius = "1em 1em 0em 0em";
            }
        });
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
                activeFilters.push(category);
            }

            if (activeFilters.length === 0) {
                allButton.classList.add('active');
                items.forEach(item => item.classList.remove('hidden'));
                return;
            }

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




