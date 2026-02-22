# Dhwani Purohit - Portfolio Website

A modern, responsive portfolio website with a purple theme showcasing professional experience, projects, and certifications.

## Features

- 🎨 Purple-themed design
- 📱 Fully responsive (mobile, tablet, desktop)
- ⚡ Fast loading with optimized assets
- 🎯 Clean, professional UI
- 📊 Dynamic content loading from JSON
- 🔄 Smooth animations and transitions
- ♿ Accessibility compliant

## Structure

```
dhwani/
├── index.html              # Main HTML file
├── css/
│   └── custom.css         # Purple-themed styles
├── js/
│   ├── data.js            # Data loading logic
│   ├── main.js            # Main JavaScript functionality
│   └── portfolio-data.json # Portfolio content (edit this!)
├── assets/
│   ├── documents/         # PDFs, resumes
│   └── images/            # Profile photos, etc.
└── README.md              # This file
```

## Quick Start

### Local Development

1. Open `index.html` in a web browser
2. Or use a local server:
   ```bash
   # Python 3
   python -m http.server 8000
   
   # Node.js (with http-server)
   npx http-server
   ```
3. Visit `http://localhost:8000`

### Editing Content

All portfolio content is in `js/portfolio-data.json`. Edit this file to update:
- Personal information
- About section
- Experience
- Projects
- Certifications
- Education
- Skills

## Deployment Options

### Option 1: Netlify (Recommended)

1. Create account at [netlify.com](https://netlify.com)
2. Drag and drop the `dhwani` folder
3. Your site is live! (e.g., `dhwani-portfolio.netlify.app`)

### Option 2: Vercel

1. Install Vercel CLI: `npm i -g vercel`
2. Navigate to dhwani folder: `cd dhwani`
3. Run: `vercel`
4. Follow prompts

### Option 3: GitHub Pages

1. Create GitHub repository
2. Upload all files from `dhwani` folder
3. Go to Settings → Pages
4. Select main branch as source
5. Your site will be at `username.github.io/repo-name`

### Option 4: Traditional Hosting

Upload all files via FTP to your web hosting provider:
- cPanel
- Hostinger
- Bluehost
- etc.

## Customization

### Colors

Edit `css/custom.css` to change the purple theme:

```css
:root {
  --color-primary: #a371f7;        /* Main purple */
  --color-primary-hover: #9353e6;  /* Darker purple */
  --color-primary-light: #d946ef;  /* Light purple/pink */
}
```

### Adding Images

1. Add profile photo to `assets/images/profile/`
2. Update `portfolio-data.json`:
   ```json
   "personalInfo": {
     "profileImage": "assets/images/profile/photo.jpg"
   }
   ```

### Adding Resume

1. Add PDF to `assets/documents/`
2. Update `portfolio-data.json`:
   ```json
   "personalInfo": {
     "cvUrl": "assets/documents/resume.pdf"
   }
   ```

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)
- Mobile browsers

## Performance

- Optimized CSS and JavaScript
- Lazy loading for images
- Minimal dependencies
- Fast load times (<2s)

## License

© 2026 Dhwani Purohit. All rights reserved.

## Support

For issues or questions, contact: dhwanipurohit4@gmail.com

---

Built with ❤️ using HTML, CSS, and JavaScript
