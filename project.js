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
  loadGallery(folderName);
}

async function checkFileExists(url) {
  try {
    const response = await fetch(url, { method: "HEAD" });
    return response.ok;
  } catch (error) {
    return false;
  }
}

async function loadGallery(folderName) {
  for (let i = 0; i <= 10; i++) {
    // Crea i percorsi dei file per i vari tipi di media
    const pngPath = `./assets/${folderName}/${i}.png`;
    const gifPath = `./assets/${folderName}/${i}.gif`;
    const mp4Path = `./assets/${folderName}/${i}.mp4`;

    // Verifica quale file esiste
    const pngExists = await checkFileExists(pngPath);
    const gifExists = !pngExists && (await checkFileExists(gifPath));
    const mp4Exists =
      !pngExists && !gifExists && (await checkFileExists(mp4Path));

    // Se nessun file esiste, salta questo indice
    if (!pngExists && !gifExists && !mp4Exists) {
      continue;
    }

    // Crea il container solo se almeno un file esiste
    const imgContainer = document.createElement("div");
    imgContainer.classList.add("gallery-item");

    if (pngExists) {
      // Carica immagine PNG
      const img = document.createElement("img");
      img.src = pngPath;
      imgContainer.appendChild(img);
    } else if (gifExists) {
      // Carica GIF
      const img = document.createElement("img");
      img.src = gifPath;
      imgContainer.appendChild(img);
    } else if (mp4Exists) {
      // Carica video MP4
      const video = document.createElement("video");
      video.controls = false;
      video.autoplay = false;
      video.muted = true;
      video.src = mp4Path;
      video.style.cursor = "pointer";
      video.playsInline = true;

      let isPlaying = false;

      video.addEventListener("loadeddata", () => {
        video.currentTime = 1;

        video.addEventListener("seeked", function onSeeked() {
          video.pause();
          video.removeEventListener("seeked", onSeeked);
        });
      });

      video.addEventListener("click", () => {
        if (isPlaying) {
          video.pause();
          isPlaying = false;
        } else {
          const playPromise = video.play();
          if (playPromise !== undefined) {
            playPromise
              .then(() => {
                video.controls = true;
                video.muted = false; // attivo l'audio solo se parte davvero
                isPlaying = true;
              })
              .catch((error) => {
                console.warn("Playback prevented:", error);
              });
          }
        }
      });

      imgContainer.appendChild(video);
    }

    // Aggiungi il container alla galleria solo se contiene elementi
    if (imgContainer.children.length > 0) {
      gallery.appendChild(imgContainer);
    }
  }
}

// Initialize when the DOM is fully loaded
window.addEventListener("DOMContentLoaded", () => {
  loadProjectDetails();
});
