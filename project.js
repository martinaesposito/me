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
  if (currentProject.Anno && currentProject.Fields) {
    projInfo.innerHTML = currentProject.Anno + " * " + currentProject.Fields;
  } else if (currentProject.Anno) {
    projInfo.innerHTML = currentProject.Anno;
  } else if (currentProject.Fields) {
    projInfo.innerHTML = currentProject.Fields;
  } else {
    projInfo.style.display = "none";
  }

  //DESCRIPTION
  if (currentProject.Descrizione && currentProject.Descrizione.trim() !== "") {
    projDescription.innerHTML = currentProject.Descrizione;
  } else {
    projDescription.style.display = "none";
  }

  // TEAM
  if (currentProject.Team && currentProject.Team.trim() !== "") {
    projTeam.innerHTML =
      "<span class='label'>Team</span> " + currentProject.Team;
  } else {
    projTeam.style.display = "none";
  }

  // CONTEXT
  if (currentProject.Context && currentProject.Context.trim() !== "") {
    projContext.innerHTML =
      "<span class='label'>Context</span> " + currentProject.Context;
  } else {
    projContext.style.display = "none";
  }

  // GALLERY
  loadGalleryFromMedia(currentProject);
}

async function checkFileExists(url) {
  try {
    const response = await fetch(url, { method: "HEAD" });
    return response.ok;
  } catch (error) {
    return false;
  }
}

function createGalleryItem(media, folderName) {
  const container = document.createElement("div");
  container.classList.add("gallery-item");

  //LAYOUT
  if (media.layout) {
    container.classList.add(media.layout);
  }

  // IMAGE
  if (media.type === "image") {
    const img = document.createElement("img");
    img.src = `./assets/${folderName}/${media.src}`;
    if (media.layout === "contain") {
      if (media.height) img.classList.add(`h-${media.height}`);
    }
    container.appendChild(img);
  }

  // IMAGE GROUP
  if (media.type === "image-group") {
    container.classList.add("side-by-side");

    media.images.forEach((fileName) => {
      const isVideo = fileName.split(".").pop().toLowerCase() === "mp4";

      if (isVideo) {
        const video = document.createElement("video");
        video.src = `./assets/${folderName}/${fileName}`;
        video.muted = media.muted ?? true;
        video.controls = media.controls ?? false;
        video.autoplay = media.autoplay ?? false;
        video.playsInline = true;
        video.loop = video.autoplay && video.muted;
        video.classList.add(`h-${media.height}`);

        container.appendChild(video);
      } else {
        const img = document.createElement("img");
        img.src = `./assets/${folderName}/${fileName}`;
        img.classList.add(`h-${media.height}`);
        container.appendChild(img);
      }
    });
  }

  // VIDEO
  if (media.type === "video") {
    const video = document.createElement("video");
    video.src = `./assets/${folderName}/${media.src}`;
    video.muted = media.muted ?? true;
    video.controls = media.controls ?? false;
    video.autoplay = media.autoplay ?? false;
    video.playsInline = true;
    video.style.cursor = "pointer";

    // Se autoplay e muted sono true, abilita il loop
    if (video.autoplay && video.muted) {
      video.loop = true;
      video.classList.add("autoplay");
    }

    let isPlaying = false;

    video.addEventListener("loadeddata", () => {
      if (!video.autoplay) {
        video.currentTime = 1;
        video.pause();
        video.classList.add("controls");
      }
    });

    video.addEventListener("click", () => {
      if (isPlaying) {
        video.pause();
        isPlaying = false;
      } else {
        video.play().then(() => {
          isPlaying = true;
          video.controls = true;

          // Riattiva audio solo se non è in autoplay
          if (!video.autoplay) {
            video.muted = false;
          }
        });
      }
    });

    container.appendChild(video);
  }

  return container;
}

function loadGalleryFromMedia(project) {
  const folderName = project.Folder;
  const mediaList = project.Media;
  gallery.innerHTML = ""; // clear

  mediaList.forEach((media) => {
    console.log("Loading media:", media, typeof media);
    const element = createGalleryItem(media, folderName);
    gallery.appendChild(element);
  });
}

// Initialize when the DOM is fully loaded
window.addEventListener("DOMContentLoaded", () => {
  loadProjectDetails();
});
