// Interactive Raycasting Points Three.js Scene
// Standalone version without HTML/CSS dependencies

import * as THREE from 'three';

let renderer, scene, camera;
let pointclouds;
let raycaster;
let intersection = null;
let spheresIndex = 0;
let clock;
let toggle = 0;

const pointer = new THREE.Vector2();
const spheres = [];

const threshold = 0.1;
const pointSize = 0.05;
const width = 80;
const length = 160;

// FPS control
let lastFrameTime = 0;
const targetFPS = 60;
const frameInterval = 1000 / targetFPS;

// Scroll-based variables
let currentSectionIndex = 0;
let scrollProgress = 0;
let targetSpinRate = 0.005;
let currentSpinRate = 0.005;
let targetHeightMultiplier = 1.0;
let currentHeightMultiplier = 1.0;
let targetZoom = 25;
let currentZoom = 25;

// Base rotation matrix (will be modified based on scroll)
const baseRotationSpeed = 0.005;
const reducedRotationSpeed = 0.002;
let rotateY = new THREE.Matrix4().makeRotationY( baseRotationSpeed );

// Extended section configurations
const sections = [
    'home', 'home-transition', 'play', 'play-detail', 'socials', 'socials-detail', 
    'videos', 'videos-detail', 'about', 'about-detail', 'contact', 'contact-end'
];

// Section color schemes (extended) - HIGH CONTRAST VERSIONS
const sectionColors = {
    'home': { r: 1, g: 0, b: 0, r2: 0, g2: 1, b2: 0, r3: 0, g3: 0, b3: 1 }, // Red, Green, Blue (high contrast)
    'home-transition': { r: 1, g: 0, b: 0.5, r2: 0, g2: 1, b2: 0, r3: 1, g3: 1, b3: 0 }, // Red-Purple, Green, Yellow
    'play': { r: 1, g: 0, b: 0, r2: 0, g2: 1, b2: 0, r3: 1, g3: 0.5, b3: 0 }, // Red, Green, Orange
    'play-detail': { r: 1, g: 0, b: 0, r2: 0, g2: 0, b2: 1, r3: 1, g3: 1, b3: 0 }, // Red, Blue, Yellow
    'socials': { r: 1, g: 0, b: 0, r2: 0, g2: 1, b2: 0, r3: 0.5, g3: 0, b3: 1 }, // Red, Green, Purple
    'socials-detail': { r: 1, g: 0, b: 0, r2: 0, g2: 0, b2: 1, r3: 0, g3: 1, b3: 0 }, // Red, Blue, Green
    'videos': { r: 1, g: 0, b: 0, r2: 0, g2: 1, b2: 0, r3: 1, g3: 1, b3: 0 }, // Red, Green, Yellow
    'videos-detail': { r: 1, g: 0, b: 0, r2: 0, g2: 0, b2: 1, r3: 1, g3: 0.5, b3: 0 }, // Red, Blue, Orange
    'about': { r: 1, g: 0, b: 0, r2: 0, g2: 1, b2: 0, r3: 0.5, g3: 0, b3: 1 }, // Red, Green, Purple
    'about-detail': { r: 1, g: 0, b: 0, r2: 0, g2: 0, b2: 1, r3: 0, g3: 1, b3: 0 }, // Red, Blue, Green
    'contact': { r: 1, g: 0, b: 0, r2: 0, g2: 1, b2: 0, r3: 0, g3: 0, b3: 1 }, // Red, Green, Blue
    'contact-end': { r: 1, g: 0, b: 0, r2: 0, g2: 0, b2: 1, r3: 1, g3: 1, b3: 0 } // Red, Blue, Yellow
};

// Section configurations - Adjusted for closer zoom with home furthest and about closest
const sectionConfigs = {
    'home': { spinRate: baseRotationSpeed, height: 1.5, zoom: 25 }, // Furthest zoom
    'home-transition': { spinRate: 0.0035, height: 1.8, zoom: 22 },
    'play': { spinRate: reducedRotationSpeed, height: 2.0, zoom: 18 },
    'play-detail': { spinRate: 0.0015, height: 2.5, zoom: 16 },
    'socials': { spinRate: reducedRotationSpeed, height: 1.2, zoom: 15 },
    'socials-detail': { spinRate: 0.001, height: 1.0, zoom: 13 },
    'videos': { spinRate: reducedRotationSpeed, height: 1.8, zoom: 14 },
    'videos-detail': { spinRate: 0.0018, height: 2.2, zoom: 12 },
    'about': { spinRate: reducedRotationSpeed, height: 2.5, zoom: 8 }, // Closest zoom for best readability
    'about-detail': { spinRate: 0.001, height: 2.8, zoom: 6 }, // Very close for detailed reading
    'contact': { spinRate: reducedRotationSpeed, height: 2.0, zoom: 10 },
    'contact-end': { spinRate: 0.001, height: 1.8, zoom: 12 }
};

// Current interpolated values
let currentColors = { r: 1, g: 0, b: 0, r2: 0, g2: 1, b2: 0, r3: 0, g3: 1, b3: 1 };

// Store original geometry positions for height animation
let originalPositions = [];

function generatePointCloudGeometry( color, width, length, geometryIndex ) {

	const geometry = new THREE.BufferGeometry();
	const numPoints = width * length;

	const positions = new Float32Array( numPoints * 3 );
	const colors = new Float32Array( numPoints * 3 );
	const originalPos = new Float32Array( numPoints * 3 );

	let k = 0;

	for ( let i = 0; i < width; i ++ ) {

		for ( let j = 0; j < length; j ++ ) {

			const u = i / width;
			const v = j / length;
			const x = u - 0.5;
			const y = ( Math.cos( u * Math.PI * 4 ) + Math.sin( v * Math.PI * 8 ) ) / 20;
			const z = v - 0.5;

			positions[ 3 * k ] = x;
			positions[ 3 * k + 1 ] = y;
			positions[ 3 * k + 2 ] = z;

			// Store original positions for animation
			originalPos[ 3 * k ] = x;
			originalPos[ 3 * k + 1 ] = y;
			originalPos[ 3 * k + 2 ] = z;

			const intensity = ( y + 0.1 ) * 5;
			colors[ 3 * k ] = color.r * intensity;
			colors[ 3 * k + 1 ] = color.g * intensity;
			colors[ 3 * k + 2 ] = color.b * intensity;

			k ++;

		}

	}

	geometry.setAttribute( 'position', new THREE.BufferAttribute( positions, 3 ) );
	geometry.setAttribute( 'color', new THREE.BufferAttribute( colors, 3 ) );
	geometry.computeBoundingBox();

	// Store original positions for this geometry
	originalPositions[geometryIndex] = originalPos;

	return geometry;

}

function generatePointcloud( color, width, length, geometryIndex ) {

	const geometry = generatePointCloudGeometry( color, width, length, geometryIndex );
	const material = new THREE.PointsMaterial( { size: pointSize, vertexColors: true } );

	return new THREE.Points( geometry, material );

}

function generateIndexedPointcloud( color, width, length, geometryIndex ) {

	const geometry = generatePointCloudGeometry( color, width, length, geometryIndex );
	const numPoints = width * length;
	const indices = new Uint16Array( numPoints );

	let k = 0;

	for ( let i = 0; i < width; i ++ ) {

		for ( let j = 0; j < length; j ++ ) {

			indices[ k ] = k;
			k ++;

		}

	}

	geometry.setIndex( new THREE.BufferAttribute( indices, 1 ) );

	const material = new THREE.PointsMaterial( { size: pointSize, vertexColors: true } );

	return new THREE.Points( geometry, material );

}

function generateIndexedWithOffsetPointcloud( color, width, length, geometryIndex ) {

	const geometry = generatePointCloudGeometry( color, width, length, geometryIndex );
	const numPoints = width * length;
	const indices = new Uint16Array( numPoints );

	let k = 0;

	for ( let i = 0; i < width; i ++ ) {

		for ( let j = 0; j < length; j ++ ) {

			indices[ k ] = k;
			k ++;

		}

	}

	geometry.setIndex( new THREE.BufferAttribute( indices, 1 ) );
	geometry.addGroup( 0, indices.length );

	const material = new THREE.PointsMaterial( { size: pointSize, vertexColors: true } );

	return new THREE.Points( geometry, material );

}

function initThreeBackground() {

	const container = document.getElementById( 'threejs-background' );
    if (!container) {
		console.error('Container #threejs-background not found!');
        return;
    }
    
	scene = new THREE.Scene();

	clock = new THREE.Clock();

	camera = new THREE.PerspectiveCamera( 45, window.innerWidth / window.innerHeight, 1, 10000 );
	camera.position.set( 10, 10, 10 ); // Start at home section zoom distance
	camera.lookAt( scene.position );
	camera.updateMatrix();

	//

	const pcBuffer = generatePointcloud( new THREE.Color( 1, 0, 0 ), width, length, 0 );
	pcBuffer.scale.set( 5, 10, 10 );
	pcBuffer.position.set( - 5, 0, 0 );
	scene.add( pcBuffer );

	const pcIndexed = generateIndexedPointcloud( new THREE.Color( 0, 1, 0 ), width, length, 1 );
	pcIndexed.scale.set( 5, 10, 10 );
	pcIndexed.position.set( 0, 0, 0 );
	scene.add( pcIndexed );

	const pcIndexedOffset = generateIndexedWithOffsetPointcloud( new THREE.Color( 0, 1, 1 ), width, length, 2 );
	pcIndexedOffset.scale.set( 5, 10, 10 );
	pcIndexedOffset.position.set( 5, 0, 0 );
	scene.add( pcIndexedOffset );

	pointclouds = [ pcBuffer, pcIndexed, pcIndexedOffset ];

	//

	const sphereGeometry = new THREE.SphereGeometry( 0.1, 16, 16 ); // Reduced geometry complexity
	const sphereMaterial = new THREE.MeshBasicMaterial( { color: 0xff0000 } );

	for ( let i = 0; i < 25; i ++ ) { // Reduced from 40 to 25 spheres

		const sphere = new THREE.Mesh( sphereGeometry, sphereMaterial );
		scene.add( sphere );
		spheres.push( sphere );

	}

	//

	renderer = new THREE.WebGLRenderer( { 
		antialias: false, // Disable for performance
		alpha: false,
		powerPreference: "high-performance",
		stencil: false,
		depth: true
	} );
	renderer.setPixelRatio( Math.min(window.devicePixelRatio, 1.5) ); // Cap pixel ratio for performance
	renderer.setSize( window.innerWidth, window.innerHeight );
	renderer.info.autoReset = false; // Disable auto reset for better performance
	container.appendChild( renderer.domElement );

	//

	raycaster = new THREE.Raycaster();
	raycaster.params.Points.threshold = threshold;

	//

	window.addEventListener( 'resize', onWindowResize );
	document.addEventListener( 'pointermove', onPointerMove );
	window.addEventListener( 'scroll', onScroll );

	// Start animation loop
	animate();

	console.log('Interactive raycasting points scene initialized');

}

// Scroll tracking and section detection with smooth interpolation
function onScroll() {
	const scrollTop = window.scrollY;
	const windowHeight = window.innerHeight;
	const documentHeight = document.documentElement.scrollHeight;
	
	// Calculate scroll progress (0 to 1)
	scrollProgress = Math.max(0, Math.min(1, scrollTop / (documentHeight - windowHeight)));
	
	// Calculate exact section position with fractional part for interpolation
	const exactSectionPosition = scrollProgress * (sections.length - 1);
	const newSectionIndex = Math.floor(exactSectionPosition);
	const sectionFraction = exactSectionPosition - newSectionIndex;
	
	// Update current section index
	currentSectionIndex = Math.min(newSectionIndex, sections.length - 1);
	
	// Get current and next section configurations
	const currentSection = sections[currentSectionIndex];
	const nextSection = sections[Math.min(currentSectionIndex + 1, sections.length - 1)];
	
	const currentConfig = sectionConfigs[currentSection];
	const nextConfig = sectionConfigs[nextSection];
	const currentColorScheme = sectionColors[currentSection];
	const nextColorScheme = sectionColors[nextSection];
	
	// Interpolate between current and next section
	interpolateSection(currentConfig, nextConfig, currentColorScheme, nextColorScheme, sectionFraction);
}

// Interpolate smoothly between two sections
function interpolateSection(currentConfig, nextConfig, currentColorScheme, nextColorScheme, fraction) {
	// Interpolate spin rate
	targetSpinRate = lerp(currentConfig.spinRate, nextConfig.spinRate, fraction);
	
	// Interpolate height multiplier
	targetHeightMultiplier = lerp(currentConfig.height, nextConfig.height, fraction);
	
	// Interpolate zoom
	targetZoom = lerp(currentConfig.zoom, nextConfig.zoom, fraction);
	
	// Interpolate colors
	currentColors.r = lerp(currentColorScheme.r, nextColorScheme.r, fraction);
	currentColors.g = lerp(currentColorScheme.g, nextColorScheme.g, fraction);
	currentColors.b = lerp(currentColorScheme.b, nextColorScheme.b, fraction);
	currentColors.r2 = lerp(currentColorScheme.r2, nextColorScheme.r2, fraction);
	currentColors.g2 = lerp(currentColorScheme.g2, nextColorScheme.g2, fraction);
	currentColors.b2 = lerp(currentColorScheme.b2, nextColorScheme.b2, fraction);
	currentColors.r3 = lerp(currentColorScheme.r3, nextColorScheme.r3, fraction);
	currentColors.g3 = lerp(currentColorScheme.g3, nextColorScheme.g3, fraction);
	currentColors.b3 = lerp(currentColorScheme.b3, nextColorScheme.b3, fraction);
}

// Linear interpolation function
function lerp(start, end, factor) {
	return start + (end - start) * factor;
}

// Optimization variables
let frameCount = 0;
const updateFrequency = 2; // Update every 2 frames for performance

// Update particle colors, heights, and camera zoom based on scroll
function updateScrollEffects() {
	// Smooth interpolation for all properties
	currentSpinRate += (targetSpinRate - currentSpinRate) * 0.08;
	currentHeightMultiplier += (targetHeightMultiplier - currentHeightMultiplier) * 0.06;
	currentZoom += (targetZoom - currentZoom) * 0.04;
	
	// Update rotation matrix
	rotateY = new THREE.Matrix4().makeRotationY( currentSpinRate );
	
	// Update camera zoom
	camera.position.setLength(currentZoom);
	camera.lookAt(scene.position);
	
	// Only update colors and positions every few frames for performance
	frameCount++;
	if (frameCount % updateFrequency !== 0) return;
	
	// Update colors and heights for each point cloud using interpolated colors
	pointclouds.forEach((pointcloud, index) => {
		const geometry = pointcloud.geometry;
		const colorAttribute = geometry.getAttribute('color');
		const positionAttribute = geometry.getAttribute('position');
		const originalPos = originalPositions[index];
		
		if (!originalPos) return;
		
		// Get current interpolated colors for this point cloud
		let currentColor;
		if (index === 0) currentColor = { r: currentColors.r, g: currentColors.g, b: currentColors.b };
		else if (index === 1) currentColor = { r: currentColors.r2, g: currentColors.g2, b: currentColors.b2 };
		else currentColor = { r: currentColors.r3, g: currentColors.g3, b: currentColors.b3 };
		
		// Update colors and positions (optimized loop)
		const count = colorAttribute.count;
		for (let i = 0; i < count; i++) {
			const i3 = i * 3;
			
			// Get original height and calculate new height
			const originalY = originalPos[i3 + 1];
			const newY = originalY * currentHeightMultiplier;
			
			// Update position
			positionAttribute.setY(i, newY);
			
			// Update color based on new height
			const intensity = (newY + 0.1) * 5;
			colorAttribute.setX(i, currentColor.r * intensity);
			colorAttribute.setY(i, currentColor.g * intensity);
			colorAttribute.setZ(i, currentColor.b * intensity);
		}
		
		// Mark attributes as needing update
		colorAttribute.needsUpdate = true;
		positionAttribute.needsUpdate = true;
	});
}

function onPointerMove( event ) {

	pointer.x = ( event.clientX / window.innerWidth ) * 2 - 1;
	pointer.y = - ( event.clientY / window.innerHeight ) * 2 + 1;

}

function onWindowResize() {

	camera.aspect = window.innerWidth / window.innerHeight;
	camera.updateProjectionMatrix();

	renderer.setSize( window.innerWidth, window.innerHeight );

}

function animate() {

	requestAnimationFrame( animate );
	
	// FPS control - limit to 60fps
	const currentTime = performance.now();
	if (currentTime - lastFrameTime >= frameInterval) {
		render();
		lastFrameTime = currentTime;
	}

}

function render() {

	// Update scroll-based effects
	updateScrollEffects();

	camera.applyMatrix4( rotateY );
	camera.updateMatrixWorld();

	raycaster.setFromCamera( pointer, camera );

	const intersections = raycaster.intersectObjects( pointclouds, false );
	intersection = ( intersections.length ) > 0 ? intersections[ 0 ] : null;

	if ( toggle > 0.02 && intersection !== null ) {

		spheres[ spheresIndex ].position.copy( intersection.point );
		spheres[ spheresIndex ].scale.set( 1, 1, 1 );
		spheresIndex = ( spheresIndex + 1 ) % spheres.length;

		toggle = 0;

	}

	for ( let i = 0; i < spheres.length; i ++ ) {

		const sphere = spheres[ i ];
		sphere.scale.multiplyScalar( 0.98 );
		sphere.scale.clampScalar( 0.01, 1 );

	}

	toggle += clock.getDelta();

	renderer.render( scene, camera );

}

// Compatibility functions
function resizeThreeBackground() {
	onWindowResize();
}

function disposeThreeBackground() {
    if (renderer) {
        renderer.dispose();
    }
    
	// Clean up geometries and materials
	pointclouds.forEach(pc => {
		if (pc.geometry) pc.geometry.dispose();
		if (pc.material) pc.material.dispose();
	});
	
	spheres.forEach(sphere => {
		if (sphere.geometry) sphere.geometry.dispose();
		if (sphere.material) sphere.material.dispose();
	});
	
	console.log('Raycasting points scene disposed');
}

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
	console.log('DOM loaded, initializing raycasting points scene...');
	initThreeBackground();
});

// Export functions
window.ThreeBackground = {
	initThreeBackground,
	resizeThreeBackground,
	disposeThreeBackground
};

console.log('Raycasting points Three.js scene module loaded');
