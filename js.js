//TESTO COLORATO
let coolors = [
  "#FF9900",
  "#FF4E4E",
  "#FF7DBC",
  "#7DA2FF",
  "#FFD37D",
  "#62D282",
  "#4251D6",
];

//////

// function updateSelectionColor() {
//   const random = coolors[Math.floor(Math.random() * coolors.length)];
//   let styleTag = document.getElementById("dynamic-selection-style");

//   if (!styleTag) {
//     styleTag = document.createElement("style");
//     styleTag.id = "dynamic-selection-style";
//     document.head.appendChild(styleTag);
//   }

//   styleTag.innerHTML = `
//       ::selection {
//         background: ${random};
//         color: white;
//       }
//     `;
// }
// // Imposta un colore iniziale alla selezione
// window.addEventListener("DOMContentLoaded", () => {
//   const initial = coolors[Math.floor(Math.random() * coolors.length)];
//   const styleTag = document.createElement("style");
//   styleTag.id = "dynamic-selection-style";
//   styleTag.innerHTML = `
//       ::selection {
//         background: ${initial};
//         color: white;
//       }
//     `;
//   document.head.appendChild(styleTag);
// });
// // Cambia colore all'inizio della selezione
// document.addEventListener("mousedown", () => {
//   const selection = document.getSelection();
//   if (selection && selection.toString().length > 0) {
//     updateSelectionColor();
//   }
// });

// document.addEventListener("touchstart", () => {
//   const selection = document.getSelection();
//   if (selection && selection.toString().length > 0) {
//     updateSelectionColor();
//   }
// });

/////////////////////////////////////////////////////////////////
function linkColor() {
  const links = document.querySelectorAll("a");
  console.log(links);
  links.forEach((link) => {
    if (link.classList.contains("nav")) {
    } else {
      // Verifica se il link ha la classe "nav"
      link.addEventListener("mouseenter", () => {
        const randomColor = coolors[Math.floor(Math.random() * coolors.length)];
        console.log(randomColor);
        link.style.color = randomColor;
      });

      link.addEventListener("mouseleave", () => {
        // if (link.classList.contains("nav")) {
        // link.style.color = "white"; // Colore originale
        // }
        link.style.color = "black"; // Colore originale
      });
    }
  });
}
