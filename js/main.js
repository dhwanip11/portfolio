/**
 * Dhwani Purohit Portfolio
 * Main JavaScript - Handles UI interactions and data rendering
 */

// ===================================
// Loading Screen
// ===================================
window.addEventListener('load', async () => {
  const loadingScreen = document.getElementById('loading-screen');
  const progressBar = document.getElementById('loading-progress-bar');
  const percentage = document.getElementById('loading-percentage');
  
  // Simulate loading progress
  let progress = 0;
  const interval = setInterval(() => {
    progress += Math.random() * 30;
    if (progress > 100) progress = 100;
    
    progressBar.style.width = `${progress}%`;
    percentage.textContent = `${Math.floor(progress)}%`;
    
    if (progress >= 100) {
      clearInterval(interval);
      setTimeout(() => {
        loadingScreen.classList.add('hidden');
      }, 300);
    }
  }, 200);
  
  // Initialize portfolio data
  try {
    await initializePortfolioData();
    renderPortfolio();
  } catch (error) {
    console.error('Failed to load portfolio:', error);
  }
});

// ===================================
// Tab Navigation
// ===================================
function initTabs() {
  const tabButtons = document.querySelectorAll('.tab-button');
  const tabContents = document.querySelectorAll('.tab-content');
  
  tabButtons.forEach(button => {
    button.addEventListener('click', () => {
      const tabName = button.dataset.tab;
      
      // Remove active class from all buttons and contents
      tabButtons.forEach(btn => btn.classList.remove('active'));
      tabContents.forEach(content => content.classList.remove('active'));
      
      // Add active class to clicked button and corresponding content
      button.classList.add('active');
      document.getElementById(`tab-${tabName}`).classList.add('active');
    });
  });
}

// ===================================
// Render Portfolio Data
// ===================================
function renderPortfolio() {
  const data = window.portfolioData;
  if (!data) return;
  
  renderAbout(data);
  renderExperience(data.experiences);
  renderProjects(data.projects);
  renderCertificates(data.certifications);
  
  initTabs();
  initContactForm();
}

// ===================================
// Render About Section
// ===================================
function renderAbout(data) {
  // Bio
  const bioContainer = document.getElementById('about-bio');
  if (data.about && data.about.bio) {
    bioContainer.innerHTML = data.about.bio
      .map(paragraph => `<p class="text-gray-300">${paragraph}</p>`)
      .join('');
  }
  
  // Achievements
  const achievementsList = document.getElementById('achievements-list');
  if (data.about && data.about.keyAchievements) {
    achievementsList.innerHTML = data.about.keyAchievements
      .map(achievement => `
        <li class="flex items-start gap-3">
          <span class="material-symbols-outlined text-[#a371f7] mt-1 flex-shrink-0">check_circle</span>
          <span class="text-gray-300">${achievement}</span>
        </li>
      `)
      .join('');
  }
  
  // Education
  const educationContent = document.getElementById('education-content');
  if (data.education && data.education.length > 0) {
    const edu = data.education[0]; // Show most recent
    educationContent.innerHTML = `
      <div class="space-y-2">
        <p class="font-semibold text-white">${edu.degree}</p>
        <p class="text-sm text-gray-400">${edu.field}</p>
        <p class="text-sm text-gray-400">${edu.institution}</p>
        <p class="text-xs text-gray-500">${edu.duration}</p>
        ${edu.gpa ? `<p class="text-sm text-[#a371f7] font-medium">GPA: ${edu.gpa}</p>` : ''}
      </div>
    `;
  }
  
  // Current Focus
  const focusContent = document.getElementById('focus-content');
  if (data.currentFocus) {
    focusContent.innerHTML = data.currentFocus
      .map(focus => `<span class="tag">${focus}</span>`)
      .join('');
  }
  
  // Interests
  const interestsContent = document.getElementById('interests-content');
  if (data.interests) {
    interestsContent.innerHTML = data.interests
      .map(interest => `<span class="tag">${interest}</span>`)
      .join('');
  }
}

// ===================================
// Render Experience
// ===================================
function renderExperience(experiences) {
  const timeline = document.getElementById('experience-timeline');
  if (!experiences || experiences.length === 0) {
    timeline.innerHTML = '<p class="text-gray-400">No experience data available.</p>';
    return;
  }
  
  timeline.innerHTML = experiences
    .map(exp => `
      <div class="experience-item">
        <div class="bg-[#0d1117] border border-[#30363d] rounded-lg p-6 hover:border-[#a371f7] transition-all">
          <div class="flex flex-wrap items-start justify-between gap-4 mb-4">
            <div>
              <h3 class="text-xl font-semibold text-white">${exp.position}</h3>
              <p class="text-[#a371f7] font-medium">${exp.company}</p>
              <p class="text-sm text-gray-400">${exp.location}</p>
            </div>
            <div class="text-right">
              <p class="text-sm text-gray-400">${exp.duration}</p>
              <span class="inline-block px-3 py-1 bg-[#a371f7]/10 border border-[#a371f7]/30 rounded-full text-xs text-[#a371f7] mt-2">
                ${exp.type}
              </span>
            </div>
          </div>
          
          <ul class="space-y-2 mb-4">
            ${exp.responsibilities.map(resp => `
              <li class="flex items-start gap-2 text-sm text-gray-300">
                <span class="material-symbols-outlined text-[#a371f7] text-base mt-0.5 flex-shrink-0">arrow_right</span>
                <span>${resp}</span>
              </li>
            `).join('')}
          </ul>
          
          <div class="flex flex-wrap gap-2">
            ${exp.technologies.map(tech => `
              <span class="px-2 py-1 bg-[#161b22] border border-[#30363d] rounded text-xs text-gray-300">
                ${tech}
              </span>
            `).join('')}
          </div>
        </div>
      </div>
    `)
    .join('');
}

// ===================================
// Render Projects
// ===================================
function renderProjects(projects) {
  const grid = document.getElementById('projects-grid');
  if (!projects || projects.length === 0) {
    grid.innerHTML = '<p class="text-gray-400 col-span-full">No projects available.</p>';
    return;
  }
  
  grid.innerHTML = projects
    .map(project => `
      <div class="project-card">
        <div class="project-icon">
          <span class="material-symbols-outlined">${project.icon || 'code'}</span>
        </div>
        
        <h3 class="text-lg font-semibold text-white mb-2">${project.title}</h3>
        <p class="text-sm text-gray-400 mb-4 flex-grow">${project.description}</p>
        
        <div class="flex flex-wrap gap-2 mb-4">
          ${project.technologies.slice(0, 3).map(tech => `
            <span class="px-2 py-1 bg-[#161b22] border border-[#30363d] rounded text-xs text-gray-300">
              ${tech}
            </span>
          `).join('')}
          ${project.technologies.length > 3 ? `
            <span class="px-2 py-1 bg-[#161b22] border border-[#30363d] rounded text-xs text-gray-400">
              +${project.technologies.length - 3} more
            </span>
          ` : ''}
        </div>
        
        <div class="flex items-center justify-between mt-auto pt-4 border-t border-[#30363d]">
          <span class="text-xs px-2 py-1 rounded" style="background: rgba(${project.statusColor === 'green' ? '63, 185, 80' : '163, 113, 247'}, 0.1); color: ${project.statusColor === 'green' ? '#3fb950' : '#a371f7'}">
            ${project.status}
          </span>
          <span class="text-xs text-gray-500">${project.duration}</span>
        </div>
        
        ${project.githubUrl || project.demoUrl ? `
          <div class="flex gap-2 mt-4">
            ${project.githubUrl ? `
              <a href="${project.githubUrl}" target="_blank" rel="noopener noreferrer" 
                 class="flex-1 inline-flex items-center justify-center gap-2 px-3 py-2 bg-[#0d1117] border border-[#30363d] rounded text-xs text-gray-300 hover:border-[#a371f7] hover:text-[#a371f7] transition-all">
                <span class="material-symbols-outlined text-base">code</span>
                <span>GitHub</span>
              </a>
            ` : ''}
            ${project.demoUrl ? `
              <a href="${project.demoUrl}" target="_blank" rel="noopener noreferrer" 
                 class="flex-1 inline-flex items-center justify-center gap-2 px-3 py-2 bg-[#a371f7] border border-[#a371f7] rounded text-xs text-white hover:bg-[#9353e6] transition-all">
                <span class="material-symbols-outlined text-base">open_in_new</span>
                <span>Demo</span>
              </a>
            ` : ''}
          </div>
        ` : ''}
      </div>
    `)
    .join('');
}

// ===================================
// Render Certificates
// ===================================
function renderCertificates(certifications) {
  const grid = document.getElementById('certificates-grid');
  if (!certifications || certifications.length === 0) {
    grid.innerHTML = '<p class="text-gray-400 col-span-full">No certifications available.</p>';
    return;
  }
  
  grid.innerHTML = certifications
    .map(cert => `
      <div class="certificate-card">
        <div class="flex items-start gap-4 mb-4">
          <div class="w-12 h-12 bg-[#a371f7]/10 border border-[#a371f7]/30 rounded-lg flex items-center justify-center flex-shrink-0">
            <span class="material-symbols-outlined text-[#a371f7]">workspace_premium</span>
          </div>
          <div class="flex-grow">
            <h3 class="font-semibold text-white mb-1">${cert.name}</h3>
            <p class="text-sm text-gray-400">${cert.issuer}</p>
            <p class="text-xs text-gray-500 mt-1">${cert.issueDate}</p>
          </div>
        </div>
        
        <div class="flex flex-wrap gap-2 mb-4">
          ${cert.skills.map(skill => `
            <span class="px-2 py-1 bg-[#161b22] border border-[#30363d] rounded text-xs text-gray-300">
              ${skill}
            </span>
          `).join('')}
        </div>
        
        ${cert.credentialUrl ? `
          <a href="${cert.credentialUrl}" target="_blank" rel="noopener noreferrer" 
             class="mt-2 inline-flex items-center justify-center gap-2 w-full px-4 py-2 bg-[#a371f7] border border-[#a371f7] rounded text-sm text-white hover:bg-[#9353e6] transition-all">
            <span class="material-symbols-outlined text-base">verified</span>
            <span>View Credential</span>
          </a>
        ` : ''}
      </div>
    `)
    .join('');
}

// ===================================
// Contact Form
// ===================================
function initContactForm() {
  const form = document.getElementById('contact-form');
  if (!form) return;
  
  form.addEventListener('submit', (e) => {
    e.preventDefault();
    
    const formData = new FormData(form);
    const data = Object.fromEntries(formData);
    
    // Here you would typically send the data to a backend
    console.log('Form submitted:', data);
    
    // Show success message
    alert('Thank you for your message! I will get back to you soon.');
    form.reset();
  });
}

// ===================================
// Smooth Scroll
// ===================================
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute('href'));
    if (target) {
      target.scrollIntoView({
        behavior: 'smooth',
        block: 'start'
      });
    }
  });
});
