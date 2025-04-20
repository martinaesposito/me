const container = document.getElementById("proj-containter");

projects.forEach((project) => {
  const div = document.createElement("div");
  div.className = "project-item";

  const img = document.createElement("img");
  img.src = `/assets/${project.Folder}`;
  img.alt = project.Nome;

  const title = document.createElement("h3");
  title.textContent = project.Nome;

  const subtitle = document.createElement("p");
  subtitle.textContent = `${project.Anno} * ${project.Fields}`;

  div.appendChild(img);
  div.appendChild(title);
  div.appendChild(subtitle);
  container.appendChild(div);
});
