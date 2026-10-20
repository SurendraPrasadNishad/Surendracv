
const STORAGE_KEY = "surendraPortfolio.v1";

const defaultData = {
  name: "Er. Surendra Prasad Nishad",
  title: "Software Engineer | .NET Core | Full-Stack Development",
  summary: "Software Engineer with nearly five years of software development experience, specializing in .NET technologies, enterprise applications, REST APIs, ERP systems, payment integrations, and business process automation. Experienced in C#, ASP.NET Core, Angular, SQL Server, PostgreSQL, and Entity Framework Core.",
  location: "New Baneshwor, Kathmandu, Nepal",
  linkedin: "https://www.linkedin.com/in/surendraprasadnishad/",
  photo: "",
  cv: "",
  skills: [
    "C#", ".NET Core", "ASP.NET", "ASP.NET MVC", ".NET Framework",
    "REST APIs", "Angular", "Entity Framework Core", "SQL Server",
    "PostgreSQL", "OpenID Connect", "WPF", "ERP", "HRMS",
    "Payment Integration", "CRON Scheduling", "SMTP", "ANPR"
  ],
  experience: [
    {
      role: "Software Developer / .NET Developer",
      company: "Infinite",
      dates: "June 2026 – Present",
      location: "Kathmandu, Nepal",
      details: [
        "Developing a short URL solution for CBC Healthcare to associate medical test codes with investigations for health insurance workflows.",
        "Contributing to the development of a Human Resource Management System (HRMS).",
        "Supporting application development and business-specific workflows."
      ]
    },
    {
      role: "Senior Software Engineer",
      company: "Erasoft Solution Pvt. Ltd.",
      dates: "December 2025 – May 2026",
      location: "Kathmandu, Nepal",
      details: [
        "Developed OpenID Connect authentication for Tribhuvan University college users across Mitra ERPV3 and LMS.",
        "Refactored legacy applications using .NET APIs and Angular.",
        "Implemented a student, marks, and result management system for Biswa Bhasa Campus."
      ]
    },
    {
      role: "Research Development Software Developer (.NET)",
      company: "IMS Software Pvt. Ltd.",
      dates: "October 2023 – December 2025",
      location: "Kathmandu, Nepal",
      details: [
        "Developed enterprise applications using .NET and Angular.",
        "Created reusable CRON-based scheduling and automated email reporting libraries.",
        "Developed the Nimbus Vendor Portal and role-based login components."
      ]
    },
    {
      role: ".NET Developer",
      company: "Riddhasoft Pvt. Ltd.",
      dates: "November 2022 – August 2023",
      location: "Kathmandu, Nepal",
      details: [
        "Developed APIs for the Valley Cold Store ERP.",
        "Developed APIs for the ICAN Nepal examination module.",
        "Contributed to ASP.NET MVC applications and business workflows."
      ]
    },
    {
      role: ".NET Developer",
      company: "Deccansoft",
      dates: "April 2022 – October 2022",
      location: "Secunderabad, Telangana, India",
      details: ["Contributed to .NET application development and programming tasks."]
    },
    {
      role: "Intern .NET Developer",
      company: "Deccansoft",
      dates: "December 2021 – March 2022",
      location: "Secunderabad, Telangana, India",
      details: ["Gained practical experience in .NET development and software engineering."]
    }
  ],
  projects: [
    {
      name: "CBC Healthcare — Investigation Mapping",
      description: "Developing a short URL solution mapping medical test codes to investigations for insurance workflows.",
      technologies: ".NET · Healthcare"
    },
    {
      name: "HRMS",
      description: "Contributing to a Human Resource Management System for managing human resource workflows.",
      technologies: ".NET · Business Applications"
    },
    {
      name: "Mitra ERPV3 & LMS",
      description: "Implemented OpenID Connect login/logout and improved legacy code maintainability.",
      technologies: ".NET API · Angular · OpenID Connect"
    },
    {
      name: "Biswa Bhasa Campus",
      description: "Designed and implemented a student information, marks, and academic results management system.",
      technologies: "ASP.NET MVC · Database"
    },
    {
      name: "Payment Integrations — IMS",
      description: "Integrated NPS, Fonepay, and eSewa payment workflows with maker-checker approval functionality.",
      technologies: "Payment APIs · Transaction Workflows"
    },
    {
      name: "Automated Reporting & Scheduling — IMS",
      description: "Built reusable CRON scheduling and automated sales report email delivery for SalesBerry and KKMart.",
      technologies: ".NET · CRON · SMTP"
    },
    {
      name: "Nimbus Vendor Portal — IMS",
      description: "Built a centralized platform for vendor product management and report access.",
      technologies: ".NET · Enterprise Software"
    },
    
{
  name: "Patanjali India — SQL Server to PostgreSQL Migration — IMS",
  description: "Worked on migrating existing application code and database queries from SQL Server to PostgreSQL, adapting SQL syntax and ensuring compatibility with PostgreSQL.",
  technologies: "SQL Server · PostgreSQL · Database Migration · SQL"
},
{
  name: "Phone Hisab — Inventory & Financial Management System — IMS",
  description: "Worked on Phone Hisab, an application designed to manage inventory, cash transactions, credit bills, and financial records. The system helps track sales and transactions, maintain outstanding credit balances, and monitor profit and loss for better business financial management.",
  technologies: "Inventory Management · Cash Transactions · Credit Billing · Financial Reporting · Profit & Loss Tracking"
},
{
  name: "Restaurant Table Booking System — IMS",
  description: "Worked on a restaurant reservation platform that enables users to discover different restaurants and book tables conveniently. Contributed to application development and restaurant booking workflows.",
  technologies: ".NET · REST APIs · SQL Server · Restaurant Management"
},

    {
      name: "Airport Camera-Based Parking System",
      description: "Contributed to an ANPR parking solution with image processing and transactional APIs.",
      technologies: "ANPR · Image Processing · APIs"
    },
    {
      name: "Valley Cold Store ERP & ICAN Nepal",
      description: "Developed APIs for ERP operations and examination module functionality.",
      technologies: ".NET · REST APIs"
    }
  ],
  education: [
    {
      degree: "Bachelor's Degree in Computer Engineering",
      institution: "Lumbini Engineering College",
      dates: "2012–2016"
    }
  ]
};

function clone(value) {
  return JSON.parse(JSON.stringify(value));
}

function loadPortfolio() {
  try {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (!saved) return clone(defaultData);

    const parsed = JSON.parse(saved);
    return { ...clone(defaultData), ...parsed };
  } catch (error) {
    console.error("Could not load portfolio:", error);
    return clone(defaultData);
  }
}

function savePortfolio(data) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
}

function makeElement(tag, className, text) {
  const el = document.createElement(tag);
  if (className) el.className = className;
  if (text !== undefined) el.textContent = text;
  return el;
}

function renderPortfolio() {
  const data = loadPortfolio();

  document.title = `${data.name} | Software Engineer`;
  document.getElementById("heroName").textContent = data.name;
  document.getElementById("heroTitle").textContent = data.title;
  document.getElementById("heroSummary").textContent = data.summary;
  document.getElementById("footerName").textContent = data.name;
  document.getElementById("locationText").textContent = data.location;
  document.getElementById("year").textContent = new Date().getFullYear();

  for (const id of ["linkedinLink", "contactLinkedin"]) {
    document.getElementById(id).href = safeLinkedIn(data.linkedin);
  }

  
  const photo = document.getElementById("profilePhoto");
  const placeholder = document.getElementById("photoPlaceholder");

  const defaultPhoto = "./My%20Image%202026-10-20%20at%2022.37.11.jpeg";
  const fallbackPhoto = "./default-profile.png";

  photo.onerror = () => {
    if (photo.src.endsWith("default-profile.png")) {
      photo.hidden = true;
      placeholder.hidden = false;
      return;
    }

    photo.src = fallbackPhoto;
  };

  photo.onload = () => {
    photo.hidden = false;
    placeholder.hidden = true;
  };

  photo.hidden = false;
  photo.src = data.photo || defaultPhoto;


  const cvLink = document.getElementById("cvLink");
  if (data.cv) {
    cvLink.href = data.cv;
    cvLink.download = "Surendra-Prasad-Nishad-CV.pdf";
    cvLink.hidden = false;
  } else {
    cvLink.hidden = true;
    cvLink.removeAttribute("href");
  }

  const skills = document.getElementById("skillsList");
  skills.replaceChildren();
  data.skills.forEach(skill => {
    skills.append(makeElement("span", "skill-tag", skill));
  });

  const experiences = document.getElementById("experienceList");
  experiences.replaceChildren();

  data.experience.forEach(item => {
    const card = makeElement("article", "experience-card");
    card.append(makeElement("h3", "", item.role));
    card.append(makeElement("div", "meta", `${item.company} · ${item.dates}`));
    if (item.location) {
      card.append(makeElement("p", "muted small", item.location));
    }

    const list = document.createElement("ul");
    (item.details || []).forEach(detail => {
      list.append(makeElement("li", "", detail));
    });

    card.append(list);
    experiences.append(card);
  });

  const projects = document.getElementById("projectList");
  projects.replaceChildren();

  data.projects.forEach(project => {
    const card = makeElement("article", "project-card");
    card.append(makeElement("h3", "", project.name));
    card.append(makeElement("p", "", project.description));
    card.append(makeElement("div", "tags", project.technologies || ""));
    projects.append(card);
  });

  const education = document.getElementById("educationList");
  education.replaceChildren();

  data.education.forEach(item => {
    const card = makeElement("article", "experience-card");
    card.append(makeElement("h3", "", item.degree));
    card.append(makeElement("p", "meta", item.institution));
    card.append(makeElement("p", "muted", item.dates));
    education.append(card);
  });
}

function safeLinkedIn(url) {
  try {
    const parsed = new URL(url);
    if (parsed.protocol === "https:" &&
        parsed.hostname === "www.linkedin.com") {
      return parsed.href;
    }
  } catch (_) {}
  return "https://www.linkedin.com/in/surendraprasadnishad/";
}

if (document.getElementById("heroName")) {
  renderPortfolio();
}
