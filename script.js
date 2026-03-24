const projects = [
  {
    id: 1,
    title: "Note to PDF",
    description: "Write your notes quickly and export them as clean, shareable PDF files in one click.",
    logo: "note.png",
    url: "https://notmanoj.github.io/note-taking-app/"
  },
  {
    id: 2,
    title: "Timer App",
    description: "A focused timer experience designed to help you stay consistent, avoid distractions, and get deep work done.",
    logo: "timer.png",
    url: "https://notmanoj.github.io/focus-timer/"
  },
  {
    id: 3,
    title: "Calendar Converter",
    description: "Convert dates into Nepali format accurately and instantly with a simple, easy-to-use interface.",
    logo: "Calendar.png",
    url: "https://notmanoj.github.io/date-converter/"
  }
];

const projectsGrid = document.getElementById("projects-grid");
const profilePhoto = document.querySelector(".profile-photo");
const requestForm = document.getElementById("request-form");
const formStatus = document.getElementById("form-status");

function renderProjects() {
  if (!projects.length) {
    projectsGrid.innerHTML = `
      <article class="empty-card">
        <h3>No projects found</h3>
        <p>Add a project in script.js.</p>
      </article>
    `;
    return;
  }

  projectsGrid.innerHTML = projects
    .map(
      (project) => `
      <a class="project-card" href="${project.url}" target="_blank" rel="noopener noreferrer" aria-label="${project.title}">
        <div class="project-icon">
          <img src="assets/${project.logo}" alt="${project.title} logo" class="project-logo" loading="lazy" />
        </div>
        <div class="project-content">
          <h3 class="project-title">${project.title}</h3>
          <p class="project-desc">${project.description}</p>
        </div>
      </a>
    `
    )
    .join("");
}

renderProjects();

if (requestForm) {
  requestForm.addEventListener("submit", async (event) => {
    event.preventDefault();

    const submitButton = requestForm.querySelector('button[type="submit"]');
    if (submitButton) {
      submitButton.disabled = true;
      submitButton.textContent = "Sending...";
    }

    if (formStatus) {
      formStatus.className = "form-status";
      formStatus.textContent = "";
    }

    try {
      const response = await fetch(requestForm.action, {
        method: "POST",
        body: new FormData(requestForm),
        headers: {
          Accept: "application/json"
        }
      });

      if (!response.ok) {
        throw new Error("Request failed");
      }

      requestForm.reset();
      if (formStatus) {
        formStatus.className = "form-status success";
        formStatus.textContent = "Message sent successfully. I will get back to you soon.";
      }
    } catch (error) {
      if (formStatus) {
        formStatus.className = "form-status error";
        formStatus.textContent = "Could not send right now. Please try again in a moment.";
      }
    } finally {
      if (submitButton) {
        submitButton.disabled = false;
        submitButton.textContent = "Send Request";
      }
    }
  });
}

if (profilePhoto) {
  const fallbackList = (profilePhoto.dataset.fallbacks || "")
    .split(",")
    .map((item) => item.trim())
    .filter(Boolean);

  let fallbackIndex = 0;

  profilePhoto.addEventListener("error", () => {
    if (fallbackIndex >= fallbackList.length) {
      return;
    }

    profilePhoto.src = fallbackList[fallbackIndex];
    fallbackIndex += 1;
  });
}
