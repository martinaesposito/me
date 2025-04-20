const fullContainer = document.getElementById("proj-container-full");
const gridContainer = document.getElementById("proj-container-grid");
const btnFull = document.getElementById("full");
const btnGrid = document.getElementById("grid");
const col1 = document.getElementById("proj-container-col-1");
const col2 = document.getElementById("proj-container-col-2");
const col3 = document.getElementById("proj-container-col-3");

async function fetchData(url) {
  try {
    const response = await fetch(url);
    return await response.json();
  } catch (error) {
    console.error("Error fetching data:", error);
    return [];
  }
}

let projects = [];

async function generateProjects(url) {
  const data = await fetchData(url);

  data.forEach((project, index) => {
    // DIV PROGETTO
    const createProjectDiv = () => {
      const projDiv = document.createElement("div");
      projDiv.classList.add("project");
      projDiv.classList.add(project.Cover);
      projDiv.id = project.Folder;

      //click listner per apertura pagina progetto
      projDiv.addEventListener("click", () => {
        window.location.href = `project.html?project=${project.Folder}`;
      });

      //immagine di copertina
      const img = document.createElement("img");
      img.classList.add("img-cover");
      img.alt = project.Nome;

      img.src = `./assets/${project.Folder}/cover.png`;
      img.onerror = () => {
        console.log("uff");
        img.src = `./assets/${project.Folder}/cover.gif`;
        img.onerror = () => {
          console.log("uff");
          img.style.display = "none";
        };
      };
      //titolo
      const name = document.createElement("p");
      name.classList.add("title");
      name.textContent = project.Nome;
      //info
      const meta = document.createElement("p");
      meta.classList.add("meta");
      meta.classList.add("label");
      meta.textContent = `${project.Anno} * ${project.Fields}`;

      projDiv.appendChild(img);
      projDiv.appendChild(name);
      projDiv.appendChild(meta);

      projects.push(projDiv);
      return projDiv;
    };

    // Crea due div separati: uno per il layout full e uno per il grid
    const fullProjDiv = createProjectDiv();
    const gridProjDiv = createProjectDiv();

    // Aggiungi al layout full
    fullContainer.appendChild(fullProjDiv);

    // Aggiungi al layout grid
    if (index % 3 === 0) col1.appendChild(gridProjDiv);
    else if (index % 3 === 1) col2.appendChild(gridProjDiv);
    else col3.appendChild(gridProjDiv);
  });

  console.log(fullContainer, col1, col2, col3);
}

function setupSwitch() {
  btnFull.addEventListener("click", () => {
    btnFull.classList.toggle("selected");
    btnGrid.classList.toggle("selected");

    fullContainer.classList.toggle("hidden");
    gridContainer.classList.toggle("hidden");

    console.log(fullContainer, gridContainer);
  });

  btnGrid.addEventListener("click", () => {
    btnFull.classList.toggle("selected");
    btnGrid.classList.toggle("selected");

    fullContainer.classList.toggle("hidden");
    gridContainer.classList.toggle("hidden");
    console.log(fullContainer, gridContainer);
  });
}

window.addEventListener("DOMContentLoaded", () => {
  generateProjects("assets/projects.json");
  setupSwitch();
});

projects.forEach((e) => {
  e.addEventListener("click", () => {});
});
