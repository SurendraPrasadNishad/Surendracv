
const ADMIN_USERNAME = "RiyaDiya";
const ADMIN_PASSWORD = "BajrangiChangeMyPassword12345!";
const SESSION_KEY = "surendraAdminLoggedIn";

const byId = id => document.getElementById(id);
const message = (id, text, type = "") => {
  const el = byId(id);
  el.textContent = text;
  el.className = type;
};

function isLoggedIn() {
  return sessionStorage.getItem(SESSION_KEY) === "yes";
}

function showEditor() {
  byId("loginPanel").hidden = true;
  byId("editorPanel").hidden = false;
  populateEditor();
}

function showLogin() {
  byId("loginPanel").hidden = false;
  byId("editorPanel").hidden = true;
}

function populateEditor() {
  const data = loadPortfolio();

  byId("name").value = data.name;
  byId("title").value = data.title;
  byId("summary").value = data.summary;
  byId("location").value = data.location;
  byId("linkedin").value = data.linkedin;
  byId("skills").value = data.skills.join("\n");
  byId("experience").value = JSON.stringify(data.experience, null, 2);
  byId("projects").value = JSON.stringify(data.projects, null, 2);
  byId("education").value = JSON.stringify(data.education, null, 2);
}

byId("loginForm").addEventListener("submit", event => {
  event.preventDefault();

  const username = byId("username").value;
  const password = byId("password").value;

  if (username === ADMIN_USERNAME && password === ADMIN_PASSWORD) {
    sessionStorage.setItem(SESSION_KEY, "yes");
    message("loginMessage", "");
    showEditor();
  } else {
    message("loginMessage", "Invalid username or password.", "error");
  }
});

byId("profileForm").addEventListener("submit", event => {
  event.preventDefault();
  if (!isLoggedIn()) return showLogin();

  const data = loadPortfolio();
  data.name = byId("name").value.trim();
  data.title = byId("title").value.trim();
  data.summary = byId("summary").value.trim();
  data.location = byId("location").value.trim();

  const linkedin = byId("linkedin").value.trim();
  try {
    const url = new URL(linkedin);
    if (url.protocol !== "https:" ||
        url.hostname !== "www.linkedin.com") {
      throw new Error();
    }
  } catch (_) {
    return alert("Enter a valid LinkedIn profile URL.");
  }

  data.linkedin = linkedin;

  try {
    savePortfolio(data);
    alert("Profile saved in this browser.");
  } catch (_) {
    alert("Storage is full. Try smaller uploaded files.");
  }
});

byId("contentForm").addEventListener("submit", event => {
  event.preventDefault();
  if (!isLoggedIn()) return showLogin();

  try {
    const data = loadPortfolio();
    const experience = JSON.parse(byId("experience").value);
    const projects = JSON.parse(byId("projects").value);
    const education = JSON.parse(byId("education").value);

    if (!Array.isArray(experience) ||
        !Array.isArray(projects) ||
        !Array.isArray(education)) {
      throw new Error("Experience, projects, and education must be JSON arrays.");
    }

    if (!experience.every(x =>
      x && typeof x.role === "string" &&
      typeof x.company === "string" &&
      typeof x.dates === "string" &&
      Array.isArray(x.details) &&
      x.details.every(d => typeof d === "string"))) {
      throw new Error("Check the experience fields and details arrays.");
    }

    if (!projects.every(x =>
      x && typeof x.name === "string" &&
      typeof x.description === "string")) {
      throw new Error("Each project needs a name and description.");
    }

    if (!education.every(x =>
      x && typeof x.degree === "string" &&
      typeof x.institution === "string")) {
      throw new Error("Each education entry needs a degree and institution.");
    }

    data.skills = byId("skills").value
      .split("\n").map(s => s.trim()).filter(Boolean);
    data.experience = experience;
    data.projects = projects;
    data.education = education;

    savePortfolio(data);
    message("contentMessage", "Content saved successfully.", "success");
  } catch (error) {
    message("contentMessage", error.message || "Could not save content.", "error");
  }
});

function readFileAsDataURL(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(reader.result);
    reader.onerror = () => reject(new Error("Could not read the file."));
    reader.readAsDataURL(file);
  });
}

byId("savePhoto").addEventListener("click", async () => {
  if (!isLoggedIn()) return showLogin();

  const file = byId("photoUpload").files[0];
  if (!file) return alert("Select a photo first.");

  if (!["image/jpeg", "image/png", "image/webp"].includes(file.type) ||
      file.size > 1024 * 1024) {
    return alert("Choose a JPG, PNG, or WebP image up to 1 MB.");
  }

  try {
    const data = loadPortfolio();
    data.photo = await readFileAsDataURL(file);
    savePortfolio(data);
    alert("Photo saved. Refresh the public portfolio to view it.");
  } catch (_) {
    alert("Could not save photo. Try a smaller image.");
  }
});

byId("saveCV").addEventListener("click", async () => {
  if (!isLoggedIn()) return showLogin();

  const file = byId("cvUpload").files[0];
  if (!file) return alert("Select a CV first.");

  if (file.type !== "application/pdf" ||
      file.size > 1024 * 1024) {
    return alert("Choose a PDF file up to 1 MB.");
  }

  try {
    const data = loadPortfolio();
    data.cv = await readFileAsDataURL(file);
    savePortfolio(data);
    alert("CV saved. Refresh the public portfolio to see the download link.");
  } catch (_) {
    alert("Could not save CV. Try a smaller PDF.");
  }
});

byId("exportData").addEventListener("click", () => {
  if (!isLoggedIn()) return showLogin();

  const blob = new Blob(
    [JSON.stringify(loadPortfolio(), null, 2)],
    { type: "application/json" }
  );
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = "surendra-portfolio-backup.json";
  link.click();
  URL.revokeObjectURL(url);
});

byId("restoreData").addEventListener("click", async () => {
  if (!isLoggedIn()) return showLogin();

  const file = byId("importData").files[0];
  if (!file) return alert("Choose a backup file.");

  try {
    const imported = JSON.parse(await file.text());
    const required = ["name", "title", "summary", "skills",
      "experience", "projects", "education"];

    if (!imported || !required.every(key =>
      Object.hasOwn(imported, key))) {
      throw new Error("This file does not look like a portfolio backup.");
    }

    if (!Array.isArray(imported.skills) ||
        !Array.isArray(imported.experience) ||
        !Array.isArray(imported.projects) ||
        !Array.isArray(imported.education)) {
      throw new Error("Backup contains invalid portfolio data.");
    }

    savePortfolio({ ...loadPortfolio(), ...imported });
    populateEditor();
    message("backupMessage", "Backup restored.", "success");
  } catch (error) {
    message("backupMessage", error.message, "error");
  }
});

byId("logout").addEventListener("click", () => {
  sessionStorage.removeItem(SESSION_KEY);
  byId("loginForm").reset();
  showLogin();
});

if (isLoggedIn()) showEditor();
else showLogin();

