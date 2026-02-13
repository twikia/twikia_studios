/**
 * Video Auto-Pause/Resume on Scroll
 * Automatically pauses videos when they scroll out of view
 * and resumes them when they come back into view
 * Supports both regular HTML5 videos and YouTube iframes
 */

// Load YouTube IFrame API
var tag = document.createElement('script');
tag.src = "https://www.youtube.com/iframe_api";
var firstScriptTag = document.getElementsByTagName('script')[0];
firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

// Store YouTube players
const youtubePlayers = {};

// This function is called by YouTube API when ready
window.onYouTubeIframeAPIReady = function () {
    console.log('YouTube IFrame API Ready');
    initializeYouTubePlayers();
};

function initializeYouTubePlayers() {
    // Find all YouTube iframes
    const youtubeIframes = document.querySelectorAll('iframe[src*="youtube.com"]');

    youtubeIframes.forEach((iframe, index) => {
        // Add enablejsapi=1 and origin to src if not present
        let src = iframe.src;
        let updateSrc = false;

        if (!src.includes('enablejsapi=1')) {
            src += (src.includes('?') ? '&' : '?') + 'enablejsapi=1';
            updateSrc = true;
        }

        if (!src.includes('origin=')) {
            src += (src.includes('?') ? '&' : '?') + 'origin=' + encodeURIComponent(window.location.origin);
            updateSrc = true;
        }

        if (updateSrc) {
            iframe.src = src;
        }

        // Give iframe an ID if it doesn't have one
        if (!iframe.id) {
            iframe.id = `youtube-player-${index}`;
        }

        // Create YouTube player
        const player = new YT.Player(iframe.id, {
            events: {
                'onReady': function (event) {
                    console.log(`YouTube player ${iframe.id} ready`);

                    // Make all YouTube videos loop
                    event.target.setLoop(true);
                    console.log(`${iframe.id} set to loop`);
                },
                'onStateChange': function (event) {
                    // Loop all videos when they end
                    if (event.data === YT.PlayerState.ENDED) {
                        event.target.playVideo();
                    }
                }
            }
        });

        youtubePlayers[iframe.id] = player;
    });

    // Start observing YouTube players
    observeYouTubePlayers();
}

function observeYouTubePlayers() {
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.5
    };

    // Track which videos have been started
    const startedVideos = new Set();

    const handleYouTubeIntersection = (entries) => {
        entries.forEach(entry => {
            const iframe = entry.target;
            const player = youtubePlayers[iframe.id];

            if (player && player.pauseVideo && player.playVideo) {
                if (entry.isIntersecting) {
                    // YouTube iframe is in view
                    if (!startedVideos.has(iframe.id)) {
                        // First time in view - start playing
                        console.log(`Starting ${iframe.id} for the first time`);
                        startedVideos.add(iframe.id);
                    }
                    player.playVideo();
                } else {
                    // YouTube iframe is out of view - pause it
                    player.pauseVideo();
                }
            }
        });
    };

    const youtubeObserver = new IntersectionObserver(handleYouTubeIntersection, observerOptions);

    Object.keys(youtubePlayers).forEach(playerId => {
        const iframe = document.getElementById(playerId);
        if (iframe) {
            youtubeObserver.observe(iframe);
        }
    });

    console.log(`YouTube observer initialized for ${Object.keys(youtubePlayers).length} players`);
}

// Handle regular HTML5 videos
document.addEventListener('DOMContentLoaded', function () {
    // Get all video elements
    const videos = document.querySelectorAll('video[autoplay]');

    // Configuration for Intersection Observer
    const observerOptions = {
        root: null, // Use viewport as root
        rootMargin: '0px',
        threshold: 0.5 // Video must be at least 50% visible to play
    };

    // Callback function for when video visibility changes
    const handleIntersection = (entries) => {
        entries.forEach(entry => {
            const video = entry.target;

            if (entry.isIntersecting) {
                // Video is in view - play it
                video.play().catch(error => {
                    // Handle autoplay restrictions
                    console.log('Autoplay prevented:', error);
                });
            } else {
                // Video is out of view - pause it
                video.pause();
            }
        });
    };

    // Create observer
    const observer = new IntersectionObserver(handleIntersection, observerOptions);

    // Observe all videos
    videos.forEach(video => {
        observer.observe(video);
    });

    console.log(`Video observer initialized for ${videos.length} HTML5 videos`);
});
