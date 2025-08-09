# TerraBlitz - Interactive 3D Website

A modern, responsive website showcasing interactive 3D models built with Three.js, featuring beautiful animations, smooth user interactions, and cutting-edge web technologies.

## 🌟 Features

### 3D Visualization
- **Interactive 3D Models**: Cube, Sphere, Torus, and Custom models
- **Real-time Rendering**: Smooth 60fps WebGL rendering
- **Camera Controls**: Orbit, pan, and zoom functionality
- **Dynamic Lighting**: Multiple light sources with shadows
- **Material Effects**: Transparent materials with realistic reflections

### User Experience
- **Responsive Design**: Optimized for all devices and screen sizes
- **Smooth Animations**: CSS and JavaScript animations throughout
- **Loading Screen**: Professional loading experience
- **Interactive Elements**: Hover effects, ripple animations, and micro-interactions
- **Accessibility**: Full keyboard navigation and screen reader support

### Modern Web Technologies
- **Three.js**: Advanced 3D graphics and WebGL rendering
- **Vanilla JavaScript**: No framework dependencies
- **CSS Grid & Flexbox**: Modern layout techniques
- **Intersection Observer**: Performance-optimized scroll animations
- **Progressive Enhancement**: Works without JavaScript

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
├── index.html              # Main HTML file
├── privacy_policy.html     # Privacy policy page
├── README.md              # Project documentation
└── src/
    ├── css/
    │   └── style.css      # Main stylesheet
    ├── js/
    │   ├── main.js        # Core functionality
    │   ├── three-scene.js # Three.js scene management
    │   └── ui.js          # UI interactions
    └── models/            # 3D model assets (optional)
```

## 🎮 Usage

### Navigation
- **Desktop**: Use the navigation menu at the top
- **Mobile**: Tap the hamburger menu for mobile navigation
- **Keyboard**: Use Tab to navigate, Enter to activate, Escape to close menus

### 3D Model Controls
- **Mouse/Touch**:
  - Left click + drag: Rotate the model
  - Right click + drag: Pan the view
  - Scroll: Zoom in/out
- **Model Switching**: Click the model buttons (Cube, Sphere, Torus, Custom)

### Interactive Features
- **Hero Section**: Animated 3D background with typing effect
- **Model Gallery**: Interactive 3D viewer with model information
- **Contact Form**: Functional contact form with validation
- **Responsive Design**: Adapts to all screen sizes

## 🛠️ Customization

### Adding Custom 3D Models

1. **Place your model file** in the `src/models/` directory
2. **Supported formats**: GLTF, GLB, OBJ, FBX
3. **Update the model loading code** in `src/js/three-scene.js`:

```javascript
// Example: Load a custom GLTF model
function loadCustomModel() {
    const loader = new THREE.GLTFLoader();
    loader.load(
        'src/models/your-model.gltf',
        function (gltf) {
            // Handle successful load
            scene.add(gltf.scene);
        },
        function (progress) {
            // Handle progress
        },
        function (error) {
            // Handle error
        }
    );
}
```

### Styling Customization

The website uses CSS custom properties for easy theming:

```css
:root {
    --primary-color: #667eea;
    --secondary-color: #764ba2;
    --text-color: #333;
    --background-color: #f8f9fa;
}
```

### Adding New Sections

1. **Add HTML structure** in `index.html`
2. **Add CSS styles** in `src/css/style.css`
3. **Add JavaScript functionality** in `src/js/main.js`

## 🔧 Development

### Browser Support
- Chrome 60+
- Firefox 55+
- Safari 12+
- Edge 79+

### Performance Optimization
- **Lazy Loading**: Images and non-critical resources
- **Throttled Events**: Scroll and resize events
- **Efficient Rendering**: Optimized Three.js scene
- **Minified Assets**: Production-ready code

### Debugging
- Open browser developer tools
- Check console for Three.js and application logs
- Use WebGL inspector for 3D debugging

## 📱 Mobile Optimization

- **Touch Controls**: Optimized for touch devices
- **Responsive 3D**: Adaptive canvas sizing
- **Performance**: Reduced effects on mobile devices
- **Accessibility**: Touch-friendly interface elements

## 🔒 Security Considerations

- **Content Security Policy**: Configured for Three.js
- **Input Validation**: Form validation and sanitization
- **XSS Prevention**: Safe DOM manipulation
- **HTTPS Recommended**: For production deployment

## 🚀 Deployment

### Static Hosting
The website can be deployed to any static hosting service:

- **Netlify**: Drag and drop the project folder
- **Vercel**: Connect your Git repository
- **GitHub Pages**: Push to a GitHub repository
- **AWS S3**: Upload files to S3 bucket

### Production Optimization
1. **Minify CSS and JavaScript**
2. **Optimize images**
3. **Enable gzip compression**
4. **Set up CDN for assets**
5. **Configure caching headers**

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 🙏 Acknowledgments

- **Three.js**: 3D graphics library
- **WebGL**: Graphics API
- **Modern CSS**: Layout and styling techniques
- **Web Standards**: Accessibility and performance

## 📞 Support

For questions, issues, or contributions:
- Create an issue on GitHub
- Contact: hello@terrablitz.com
- Documentation: [Project Wiki](link-to-wiki)

---

**Built with ❤️ using Three.js and modern web technologies** 