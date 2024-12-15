// Add to static/js/video-modal.js
document.addEventListener('DOMContentLoaded', function() {
    const modal = document.getElementById('videoModal');
    const videoElement = modal.querySelector('video');
    const closeButton = modal.querySelector('.close-modal');


    // Handle thumbnail clicks
    document.querySelectorAll('.video-trigger').forEach(thumbnail => {
        thumbnail.addEventListener('click', function() {
            const videoUrl = this.dataset.videoUrl;
            videoElement.src = videoUrl;
            modal.classList.add('active');
            videoElement.play();
        });
    });

    // Handle play button clicks
    document.querySelectorAll('.play-button').forEach(button => {
        button.addEventListener('click', function() {
            const videoUrl = this.dataset.videoUrl;
            videoElement.src = videoUrl;
            modal.classList.add('active');
            videoElement.play();
        });
    });

    // Close modal
    closeButton.addEventListener('click', function() {
        modal.classList.remove('active');
        videoElement.pause();
        videoElement.src = '';
    });

    // Close on background click
    modal.addEventListener('click', function(e) {
        if (e.target === modal) {
            modal.classList.remove('active');
            videoElement.pause();
            videoElement.src = '';
        }
    });
});
