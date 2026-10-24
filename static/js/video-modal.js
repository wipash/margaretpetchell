document.addEventListener('DOMContentLoaded', function() {
    const modal = document.getElementById('videoModal');
    const videoElement = modal.querySelector('video');
    const modalTitle = document.getElementById('videoModalTitle');
    const closeButton = modal.querySelector('.close-modal');
    let activeTrigger = null;
    let playbackSession = 0;

    document.querySelectorAll('.video-trigger').forEach(trigger => {
        trigger.addEventListener('click', function() {
            const videoUrl = this.dataset.videoUrl;
            if (!videoUrl || modal.open) return;

            activeTrigger = this;
            modalTitle.textContent = this.dataset.videoTitle;
            videoElement.src = videoUrl;
            document.body.classList.add('video-modal-open');
            modal.showModal();

            const session = ++playbackSession;
            videoElement.play().catch(error => {
                // Closing releases the resource and can abort a pending play request.
                if (error.name === 'AbortError' && session !== playbackSession) return;
                // Native controls remain available when browser policy denies autoplay.
                if (error.name === 'NotAllowedError') return;
                console.error('Video playback failed:', error);
            });
        });
    });

    closeButton.addEventListener('click', function() {
        modal.close();
    });

    modal.addEventListener('click', function(event) {
        if (event.target === modal) {
            modal.close();
        }
    });

    // Native Escape cancellation also reaches this shared cleanup path.
    modal.addEventListener('close', function() {
        ++playbackSession;
        videoElement.pause();
        videoElement.removeAttribute('src');
        videoElement.load();
        document.body.classList.remove('video-modal-open');
        if (activeTrigger && activeTrigger.isConnected) {
            activeTrigger.focus({ preventScroll: true });
        }
        activeTrigger = null;
    });
});
