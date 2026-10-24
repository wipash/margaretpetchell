document.addEventListener('DOMContentLoaded', function() {
    const campaignButtons = document.querySelectorAll('.campaign-button');
    const campaignSelect = document.getElementById('campaign-select');
    const campaignSlides = document.querySelectorAll('.campaign-slides');
    const status = document.getElementById('fashion-slider-status');

    function updateStatus(campaign) {
        const slide = campaign.querySelector('.slide.active');
        const count = campaign.querySelectorAll('.slide').length;
        status.textContent = `${campaign.getAttribute('aria-label')}: Image ${Number(slide.dataset.index) + 1} of ${count}`;
    }

    function showCampaign(campaignIndex) {
        campaignButtons.forEach(button => {
            const active = button.dataset.campaign === campaignIndex;
            button.classList.toggle('active', active);
            button.setAttribute('aria-pressed', String(active));
        });

        campaignSlides.forEach(campaign => {
            const active = campaign.dataset.campaign === campaignIndex;
            campaign.classList.toggle('active', active);
            campaign.hidden = !active;
            if (active) {
                updateStatus(campaign);
            }
        });

        if (campaignSelect) {
            campaignSelect.value = campaignIndex;
        }
    }
    
    // Campaign button navigation (desktop)
    campaignButtons.forEach(button => {
        button.addEventListener('click', function() {
            const campaignIndex = this.dataset.campaign;
            showCampaign(campaignIndex);
        });
    });
    
    // Campaign dropdown navigation (mobile)
    if (campaignSelect) {
        campaignSelect.addEventListener('change', function() {
            const campaignIndex = this.value;
            showCampaign(campaignIndex);
        });
    }
    
    // Initialize sliders for each campaign
    campaignSlides.forEach(campaign => {
        const slider = campaign.querySelector('.slider-container');
        const slides = campaign.querySelectorAll('.slide');
        const prevButton = campaign.querySelector('.slider-arrow.prev');
        const nextButton = campaign.querySelector('.slider-arrow.next');
        const dots = campaign.querySelectorAll('.dot');
        let currentIndex = 0;
        
        function showSlide(index) {
            currentIndex = (index + slides.length) % slides.length;

            slides.forEach((slide, slideIndex) => {
                const active = slideIndex === currentIndex;
                slide.classList.toggle('active', active);
                slide.hidden = !active;
            });

            dots.forEach((dot, dotIndex) => {
                const active = dotIndex === currentIndex;
                dot.classList.toggle('active', active);
                dot.setAttribute('aria-current', String(active));
            });

            if (campaign.classList.contains('active')) {
                updateStatus(campaign);
            }
        }

        prevButton.addEventListener('click', function() {
            showSlide(currentIndex - 1);
        });

        nextButton.addEventListener('click', function() {
            showSlide(currentIndex + 1);
        });
        
        // Event listeners for dots
        dots.forEach(dot => {
            dot.addEventListener('click', function() {
                const index = Number(this.dataset.index);
                showSlide(index);
            });
        });
        
        slider.addEventListener('keydown', function(event) {
            if (!campaign.classList.contains('active') || event.defaultPrevented ||
                event.altKey || event.ctrlKey || event.metaKey || event.shiftKey ||
                event.target.isContentEditable ||
                event.target.closest('a, input, select, textarea, [role="textbox"], [role="combobox"], [role="spinbutton"], [role="slider"]')) {
                return;
            }

            if (event.key === 'ArrowLeft' || event.key === 'ArrowRight') {
                event.preventDefault();
                showSlide(currentIndex + (event.key === 'ArrowLeft' ? -1 : 1));
            }
        });
        
        // Initialize first slide
        showSlide(0);
    });
    
    if (campaignSelect) {
        showCampaign(campaignSelect.value);
    }
});