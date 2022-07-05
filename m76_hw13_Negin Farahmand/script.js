const URL = "https://62ab6beda62365888bdc2f11.mockapi.io/Hw13";

const projectsTable = document.querySelector("#projects tbody");
const tableHeader = document.querySelector("#projects thead");

document.addEventListener("DOMContentLoaded", () => {
  readProjects();
});

// READ
function readProjects() {
  fetch(URL)
    .then((response) => response.json())
    .then((data) => {
      //create tableHeader
      let siteIds = Array.from(new Set(data.map((item) => item.SiteId))).sort();
      console.log(siteIds);
      const headerRow = document.createElement("tr");
      const headerCell = document.createElement("th");
      headerRow.appendChild(headerCell);
      headerCell.innerHTML = "ProjectId";
      siteIds.forEach((id) => {
        const siteId = document.createElement("th");
        siteId.innerHTML = id;
        headerRow.appendChild(siteId);
        tableHeader.appendChild(headerRow);
      });

      //create tableBody

      //get projectIds
      let projectId = Array.from(new Set(data.map((item) => item.ProjectId)));

      //for loop for 3 Arrays of 7 objects with same ProjectId
      for (let i = 0; i < projectId.length; i++) {
        let similarProjectId = data.filter(
          (item) => item.ProjectId === projectId[i]
        );

        // sorting array based on SiteId
        similarProjectId.sort((a, b) => a.SiteId - b.SiteId);
        const projectRow = document.createElement("tr");
        const projectCell = document.createElement("td");
        projectRow.appendChild(projectCell);
        projectCell.innerHTML = projectId[i];
        similarProjectId.forEach((project) => {
          const siteId = document.createElement("td");
          siteId.innerHTML = project.Target;
          projectRow.appendChild(siteId);
          projectsTable.appendChild(projectRow);
        });
      }
    });
}
