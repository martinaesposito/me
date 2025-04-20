const projTitle = document.getElementById("proj-title");
const projCategory = document.getElementById("categoria");
const projInfo = document.getElementById("info");
const projDescription = document.getElementById("descrizione");
const projTeam = document.getElementById("team");
const projContext = document.getElementById("context");
const gallery = document.getElementById("gallery");

//fetch data JSON
async function fetchData(url) {
  try {
    const response = await fetch(url);
    return await response.json();
  } catch (error) {
    console.error("Error fetching data:", error);
    return [];
  }
}

//URL
function getProjectFolderFromURL() {
  const urlParams = new URLSearchParams(window.location.search);
  return urlParams.get("project");
}

// load project details
async function loadProjectDetails() {
  const folderName = getProjectFolderFromURL();
  if (!folderName) {
    console.error("No project specified in URL");
    return;
  }
  const projects = await fetchData("./assets/projects.json");
  const currentProject = projects.find(
    (project) => project.Folder === folderName
  );
  if (!currentProject) {
    console.error("Project not found:", folderName);
    return;
  }

  //TITLE
  projTitle.innerHTML = currentProject.Nome;
  //INFO
  projInfo.innerHTML = currentProject.Anno + " * " + currentProject.Fields;
  //DESCRIPTION
  projDescription.innerHTML = currentProject.Descrizione;
  // TEAM
  projTeam.innerHTML = "<span class='label'>Team</span> " + currentProject.Team;
  // CONTEXT
  projContext.innerHTML =
    "<span class='label'>Context</span> " + currentProject.Context;

  // GALLERY
  loadGallery(folderName);
}

async function loadGallery(folderName) {
  for (let i = 0; i <= 10; i++) {
    const imgContainer = document.createElement("div");
    imgContainer.classList.add("gallery-item");

    const img = document.createElement("img");
    img.src = `./assets/${folderName}/${i}.png`;

    // Handle image load error - try GIF as fallback
    img.onerror = () => {
      img.src = `./assets/${folderName}/${i}.gif`;
      img.onerror = () => {
        // If both PNG and GIF fail, remove the container
        imgContainer.remove();
      };
    };

    imgContainer.appendChild(img);
    gallery.appendChild(imgContainer);
  }
}

// Initialize when the DOM is fully loaded
window.addEventListener("DOMContentLoaded", () => {
  loadProjectDetails();
});
