/**
 * Dhwani Purohit Portfolio
 * Data Models and Content - Loaded from portfolio-data.json
 */

// Global variable to store loaded portfolio data
let portfolioData = null;

/**
 * Load portfolio data from JSON file
 * @returns {Promise<Object>} Portfolio data object
 */
async function loadPortfolioData() {
  if (portfolioData) {
    return portfolioData;
  }
  
  try {
    const response = await fetch('js/portfolio-data.json');
    if (!response.ok) {
      throw new Error('Failed to load portfolio data');
    }
    portfolioData = await response.json();
    return portfolioData;
  } catch (error) {
    console.error('Error loading portfolio data:', error);
    throw error;
  }
}

// Legacy data structure for backward compatibility
let personalInfo = {
  name: "Dhwani Nileshbhai Purohit",
  title: "Computer Engineering Student",
  tagline: "Building Intelligent Cloud Solutions",
  bio: "",
  location: "Paderborn, Germany",
  email: "dhwanipurohit4@gmail.com",
  phone: "+49 15565822600",
  social: {
    github: "",
    linkedin: "https://www.linkedin.com/in/dhwanin-purohit",
    twitter: "",
    medium: ""
  },
  cvUrl: ""
};

let experiences = [];
let skills = { metrics: [], technologies: [], proficiency: [] };
let projects = [];
let testimonials = [];
let blogPosts = [];
let certifications = [];
let leadership = [];
let gallery = [];
let education = [];
let interests = [];
let currentFocus = [];

/**
 * Initialize all data from portfolio-data.json
 */
async function initializePortfolioData() {
  try {
    const data = await loadPortfolioData();
    
    if (data.personalInfo) {
      Object.assign(personalInfo, data.personalInfo);
    }
    
    experiences = data.experiences || [];
    skills = data.skills || { metrics: [], technologies: [], proficiency: [] };
    projects = data.projects || [];
    testimonials = data.testimonials || [];
    blogPosts = data.blogPosts || [];
    certifications = data.certifications || [];
    leadership = data.leadership || [];
    gallery = data.gallery || [];
    education = data.education || [];
    interests = data.interests || [];
    currentFocus = data.currentFocus || [];
    
    if (typeof window !== 'undefined') {
      window.portfolioData = {
        personalInfo,
        experiences,
        skills,
        projects,
        testimonials,
        blogPosts,
        certifications,
        leadership,
        gallery,
        education,
        interests,
        currentFocus,
        about: data.about
      };
    }
    
    return data;
  } catch (error) {
    console.error('Failed to initialize portfolio data:', error);
    throw error;
  }
}

if (typeof window !== 'undefined') {
  window.loadPortfolioData = loadPortfolioData;
  window.initializePortfolioData = initializePortfolioData;
}

if (typeof module !== 'undefined' && module.exports) {
  module.exports = {
    loadPortfolioData,
    initializePortfolioData,
    personalInfo,
    experiences,
    skills,
    projects,
    testimonials,
    blogPosts,
    certifications,
    leadership,
    gallery,
    education,
    interests,
    currentFocus
  };
}
