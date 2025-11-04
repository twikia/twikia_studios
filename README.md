# Twikia Studios - Interactive 3D Particle Website

A cutting-edge, responsive website featuring an interactive 3D particle system that dynamically responds to user scrolling, clicking, and navigation. Built with Three.js and modern web technologies, offering a unique and immersive user experience.

## 🌟 Features

### 🎮 Interactive 3D Particle System
- **Dynamic Point Clouds**: Three separate particle systems with 12,800 points each
- **Scroll-Based Effects**: Colors, heights, zoom, and rotation change based on scroll position
- **Click Interactions**: Global click detection triggers particle height surges
- **Smooth Transitions**: Linear interpolation between section states
- **Performance Optimized**: 60fps capped rendering with reduced update frequency

### 🎨 Visual Design
- **Glass Morphism**: Blurred backgrounds with transparency effects
- **Dynamic Color Schemes**: 12 different color palettes for each section
- **Responsive Layout**: Adapts seamlessly to all device sizes
- **Modern Typography**: Clean, readable text with shadows and strokes
- **Smooth Animations**: CSS transitions and Three.js animations

### 📱 User Experience
- **Section-Based Navigation**: Smooth scrolling between sections
- **Interactive Elements**: Hover effects and click animations
- **Loading States**: Professional loading experience
- **Accessibility**: Keyboard navigation and screen reader support
- **Cross-Browser**: Works on all modern browsers

### 🛠️ Technical Features
- **ES6 Modules**: Modern JavaScript with import/export
- **Three.js Integration**: Advanced WebGL rendering
- **Performance Optimization**: FPS capping, reduced geometry complexity
- **Responsive Design**: Mobile-first approach
- **Progressive Enhancement**: Graceful degradation

## 🚀 Quick Start

### Prerequisites
- Modern web browser with WebGL support
- Local web server (for development)

### Installation

1. **Clone or download the project**
   ```bash
   git clone <repository-url>
   cd terrablitz
   ```

2. **Start a local server**
   
   **Option A: Using Python**
   ```bash
   # Python 3
   python -m http.server 8000
   
   # Python 2
   python -m SimpleHTTPServer 8000
   ```
   
   **Option B: Using Node.js**
   ```bash
   npx serve .
   ```
   
   **Option C: Using PHP**
   ```bash
   php -S localhost:8000
   ```

3. **Open in browser**
   ```
   http://localhost:8000
   ```

## 📁 Project Structure

```
terrablitz/
├── index.html                    # Main HTML file
├── disclaimer.html               # Disclaimer page
├── privacy_policy.html           # Privacy policy page
├── README.md                     # Project documentation
└── src/
    ├── css/
    │   ├── base.css              # Base styles and 3D background
    │   ├── header.css            # Navigation header styles
    │   ├── hero.css              # Hero section styles
    │   ├── sections.css          # All section styles
    │   └── footer.css            # Footer styles
    ├── js/
    │   ├── main.js               # Core functionality
    │   ├── three-scene.js        # Interactive 3D particle scene
    │   ├── typing-animation.js   # Hero typing effect
    │   └── ui.js                 # UI interactions
    ├── icons/                    # Image assets
    │   ├── social_icons/         # Social media icons
    │   └── *.png                 # Various icons and images
    ├── misc/                     # Miscellaneous files
    │   └── *.pdf                 # Resume and documents
    └── models/                   # 3D model assets
        └── *.glb                 # 3D models
```

## 🎮 Usage Guide

### 🖱️ Navigation & Interaction

#### **Scroll-Based Effects**
- **Color Changes**: Each section has unique color schemes that blend smoothly
- **Height Variations**: Particle heights change dramatically between sections
- **Camera Zoom**: Dynamic zoom levels for optimal viewing
- **Rotation Speed**: Faster rotation on home, slower on content sections

#### **Click Interactions**
- **Global Click Detection**: Click anywhere to trigger particle effects
- **Button Animations**: Interactive elements have CSS click animations
- **3D Response**: Particles surge with random height multipliers
- **Duration**: Effects last 1.5 seconds with smooth fade-out

#### **Section Navigation**
- **Smooth Scrolling**: Navigate between sections seamlessly
- **12 Sections**: Home, Play, Socials, Videos, About, Contact (with transitions)
- **Dynamic Transitions**: Colors and effects change based on scroll position

### 🎨 Visual Sections

#### **Hero Section**
- **Typing Animation**: Dynamic text typing effect
- **3D Background**: Full-screen particle system
- **Responsive Design**: Adapts to all screen sizes

#### **Play Section**
- **Game Links**: TerraBlitz beta and GitHub projects
- **Glass Morphism**: Blurred background for text content
- **Interactive Cards**: Hover effects and click animations

#### **Socials Section**
- **Community Links**: Instagram, Discord, TikTok, Reddit, YouTube
- **Glass Cards**: Semi-transparent social media cards
- **Hover Effects**: Elevation and color transitions

#### **Videos Section**
- **Embedded Content**: YouTube videos with hover effects
- **Feature Cards**: Additional video content links
- **Responsive Grid**: Adapts to screen size

#### **About Section**
- **Professional Info**: Personal background and skills
- **Resume Download**: PDF download with preview
- **GitHub Link**: Portfolio and project links
- **Blur Container**: Entire section in glass morphism box

#### **Contact Section**
- **Multiple Methods**: Instagram, Email, Ko-fi, Buy Me a Coffee
- **Interactive Cards**: Hover effects and click animations
- **Copy Functionality**: Email address copy to clipboard

### 🎯 3D Particle System

#### **Technical Specifications**
- **Point Count**: 38,400 total points (3 clouds × 12,800 each)
- **Performance**: 60fps capped, optimized rendering
- **Geometry**: 16×16 sphere segments for efficiency
- **Materials**: Basic materials for performance

#### **Dynamic Properties**
- **Colors**: RGB values interpolated between sections
- **Heights**: Multipliers range from 0.3x to 2.8x
- **Zoom**: Camera distance from 6 to 25 units
- **Rotation**: Speed varies from 0.001 to 0.005 radians/frame

#### **Click Effects**
- **Random Heights**: Each point gets unique height multiplier
- **Subtle Changes**: 0.2x to 0.5x additional height
- **No Color Flash**: Maintains section colors
- **Smooth Recovery**: Gradual return to normal state

## 🛠️ Customization

### Modifying 3D Scene

#### **Section Configuration**
Edit `src/js/three-scene.js` to modify section effects:

```javascript
// Section color schemes
const sectionColors = {
    'home': { r: 1, g: 0, b: 0, r2: 0, g2: 1, b2: 0, r3: 0, g3: 0, b3: 1 },
    // Add more sections...
};

// Section configurations
const sectionConfigs = {
    'home': { spinRate: 0.005, height: 1.5, zoom: 25 },
    // Modify values...
};
```

#### **Click Effect Customization**
```javascript
// Modify click effect duration and intensity
const clickEffectDuration = 1500; // milliseconds
const randomFactor = 0.2 + (Math.random() * 0.3); // height multiplier range
```

### Styling Customization

#### **Glass Morphism Effects**
```css
.glass-effect {
    background: rgba(255, 255, 255, 0.1);
    backdrop-filter: blur(10px);
    border: 1px solid rgba(255, 255, 255, 0.2);
    border-radius: 20px;
}
```

#### **Color Scheme**
```css
:root {
    --primary-color: #667eea;
    --secondary-color: #764ba2;
    --text-color: #fff;
    --background-transparent: rgba(255, 255, 255, 0.1);
}
```

### Adding New Sections

1. **Add HTML structure** in `index.html`
2. **Add CSS styles** in `src/css/sections.css`
3. **Add section configuration** in `src/js/three-scene.js`
4. **Update navigation** if needed

## 🔧 Development

### Browser Support
- Chrome 60+ (recommended)
- Firefox 55+
- Safari 12+
- Edge 79+

### Performance Optimization
- **FPS Capping**: Limited to 60fps for consistent performance
- **Reduced Updates**: Scroll effects update every 2 frames
- **Optimized Geometry**: Simplified sphere geometry
- **Efficient Rendering**: Disabled antialiasing and other expensive features

### Debugging
- Open browser developer tools
- Check console for Three.js logs
- Monitor FPS and performance
- Use WebGL inspector for 3D debugging

## 📱 Mobile Optimization

- **Touch Controls**: Optimized for touch devices
- **Responsive 3D**: Adaptive canvas sizing
- **Performance**: Reduced effects on mobile devices
- **Accessibility**: Touch-friendly interface elements

## 🔒 Security Considerations

- **External Links**: All external links have `rel="noopener noreferrer"`
- **Content Security**: Configured for Three.js and external resources
- **Input Validation**: Form validation and sanitization
- **HTTPS Recommended**: For production deployment

## 🚀 Deployment

### Static Hosting
Deploy to any static hosting service:

- **Netlify**: Drag and drop the project folder
- **Vercel**: Connect your Git repository
- **GitHub Pages**: Push to a GitHub repository
- **AWS S3**: Upload files to S3 bucket

### Production Optimization
1. **Minify CSS and JavaScript**
2. **Optimize images and icons**
3. **Enable gzip compression**
4. **Set up CDN for assets**
5. **Configure caching headers**

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly on multiple browsers
5. Submit a pull request

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 🙏 Acknowledgments

- **Three.js**: 3D graphics library and examples
- **WebGL**: Graphics API for 3D rendering
- **Modern CSS**: Glass morphism and backdrop-filter
- **ES6 Modules**: Modern JavaScript module system

## 📞 Support

For questions, issues, or contributions:
- Create an issue on GitHub
- Contact: [Your Contact Information]
- Documentation: [Project Wiki]

---

**Built with ❤️ using Three.js, modern CSS, and cutting-edge web technologies** 
