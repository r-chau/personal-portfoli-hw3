class ProjectCard extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: 'open' });
    }

    connectedCallback() {
        const title = this.getAttribute('title') || 'Project Title';
        const image = this.getAttribute('image') || 'default.jpg';
        const altText = this.getAttribute('alt') || 'Project Image';
        const description = this.getAttribute('description') || 'Project description.';
        const link = this.getAttribute('link') || '#';

        this.shadowRoot.innerHTML = `
            <style>
                :host {
                    display: block;
                    transition: transform 0.2s, box-shadow 0.2s;
                }
                a {
                    text-decoration: none;
                    color: inherit;
                    display: block;
                }
                .card {
                    border-radius: 10px;
                    box-shadow: 2px 2px 10px rgba(0, 0, 0, 0.1);
                    padding: 16px;
                    background: #e9e3e1;
                    border: 1px solid #ddd
                    transition: transform 0.2s, box-shadow 0.2s;
                    cursor: pointer;
                }
                .card:hover {
                    transform: scale(1.03);
                    box-shadow: 4px 4px 15px rgba(0, 0, 0, 0.2);
                }
                img {
                    width: 100%;
                    border-radius: 8px;
                    height: 180px;
                    object-fit: cover;
                }
            </style>
            <a href="${link}" target="_blank">
                <div class="card">
                    <picture>
                        <img src="${image}" alt="${altText}">
                    </picture>
                    <h2>${title}</h2>
                    <p>${description}</p>
                </div>
            </a>
        `;
    }
}

customElements.define('project-card', ProjectCard);


const projectData = [
    {
      "title": "Pantry Pal - Recipe Generator",
      "image": "assets/images/pantry-pal.jpg",
      "alt": "Screenshot of Login Screen for Pantry Pal",
      "description": "A JavaFX program for creating recipes using ChatGPT and voice input.",
      "link": "https://github.com/ucsd-cse110-fa23/cse-110-project-team-36"
    },
    {
      "title": "Eventify - Campus Event Board",
      "image": "assets/images/eventify.jpg",
      "alt": "Screenshot of Eventify",
      "description": "A webapp for UCSD event organizers to post their events in one place so students can more easily keep track of on-campus events.",
      "link": "https://github.com/acmucsd-projects/sp23-hack-team-3?tab=readme-ov-file"
    },
    {
      "title": "Airbnb Price Predictions - Machine Learning",
      "image": "assets/images/airbnbPred.jpg",
      "alt": "Screenshot of Airbnb Price Predictions",
      "description": "Machine learning project predicting Airbnb prices.",
      "link": "https://github.com/skyflaren/cse-151a-project"
    },
    {
      "title": "AI vs. Human Generated Art",
      "image": "assets/images/aivshuman.png",
      "alt": "Screenshot of Project Analysis Video",
      "description": "EDA and Analysis of success of AI vs. Human Generated Art in social media.",
      "link": "https://www.youtube.com/watch?v=qfcKpxaFuBo"
    }
]


function initializeLocalStorage() {
    if (!localStorage.getItem('projects')) {
        localStorage.setItem('projects', JSON.stringify(projectData));
    }
}

initializeLocalStorage();

document.getElementById('load-local').addEventListener('click', loadLocalData);
document.getElementById('load-remote').addEventListener('click', loadRemoteData);
const remoteUrl = "https://api.jsonbin.io/v3/b/67d7a2758960c979a5730889"


function loadLocalData() {
    const storedProjects = localStorage.getItem('projects');
    if (storedProjects) {
      const projects = JSON.parse(storedProjects);
      displayProjects(projects); 
    } else {
      console.log('No data found in localStorage.');
    }
  }


function loadRemoteData() {
    fetch(remoteUrl, {
      method: 'GET',
      headers: {
        'X-Master-Key': '$2a$10$LiyjVcWlKpJxKHkgZb5wEeaXRDazU.3CHN6l5E/bPJTJ3XApV.8xy'
      }
    })
    .then(response => response.json())
    .then(data => {
      displayProjects(data.record);
    })
    .catch(error => {
      console.log('Error fetching remote data:', error);
    });
}
  
function displayProjects(projects) {
    const container = document.getElementById('projects-container'); 
    container.innerHTML = '';
  
    projects.forEach(project => {
      const projectCard = document.createElement('project-card');
      
      projectCard.setAttribute('title', project.title);
      projectCard.setAttribute('image', project.image);
      projectCard.setAttribute('alt', project.alt);
      projectCard.setAttribute('description', project.description);
      projectCard.setAttribute('link', project.link);
      
      container.appendChild(projectCard);
    });
  }
  