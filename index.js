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
async function generateProjects(url) {
  const data = await fetchData(url);

  data.forEach((project, index) => {
    const projDiv = document.createElement("div");
    projDiv.classList.add("project");
    projDiv.id = project.Folder;

    const img = document.createElement("img");
    img.classList.add("img-cover");
    img.src =
      `/assets/${project.Folder}/0.png` || `/assets/${project.Folder}/0.gif`;
    img.alt = project.Nome;
    img.style.objectFit = "cover";
    img.onerror = () => {
      img.style.display = "none"; // oppure: img.src = "/assets/placeholder.jpg";
    };

    const name = document.createElement("p");
    name.classList.add("title");
    name.textContent = project.Nome;

    const meta = document.createElement("p");
    meta.classList.add("meta");
    meta.classList.add("label");
    meta.textContent = `${project.Anno} * ${project.Fields}`;

    projDiv.appendChild(img);
    projDiv.appendChild(name);
    projDiv.appendChild(meta);

    // full layout
    fullContainer.appendChild(projDiv.cloneNode(true));

    // grid layout (round robin)
    if (index % 3 === 0) col1.appendChild(projDiv);
    else if (index % 3 === 1) col2.appendChild(projDiv);
    else col3.appendChild(projDiv);
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
