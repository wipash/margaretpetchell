document.addEventListener('DOMContentLoaded', function() {
    const campaignButtons = document.querySelectorAll('.campaign-button');
    const campaignSelect = document.getElementById('campaign-select');
    const campaignSlides = document.querySelectorAll('.campaign-slides');
    
    // Function to show campaign by index
    function showCampaign(campaignIndex) {
        // Update active button if in desktop view
        campaignButtons.forEach(btn => btn.classList.remove('active'));
        const activeButton = document.querySelector(`.campaign-button[data-campaign="${campaignIndex}"]`);
        if (activeButton) {
            activeButton.classList.add('active');
        }
        
        // Show selected campaign
        campaignSlides.forEach(campaign => {
            campaign.classList.remove('active');
            if (campaign.dataset.campaign === campaignIndex) {
                campaign.classList.add('active');
            }
        });
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
        const slides = campaign.querySelectorAll('.slide');
        const prevButton = campaign.querySelector('.slider-arrow.prev');
        const nextButton = campaign.querySelector('.slider-arrow.next');
        const dots = campaign.querySelectorAll('.dot');
        let currentIndex = 0;
        
        // Function to show the current slide
        function showSlide(index) {
            // Hide all slides
            slides.forEach(slide => {
                slide.classList.remove('active');
            });
            
            // Update dots
            dots.forEach(dot => {
                dot.classList.remove('active');
            });
            
            // Show the current slide and dot
            slides[index].classList.add('active');
            dots[index].classList.add('active');
            currentIndex = index;
        }
        
        // Event listener for previous button
        prevButton.addEventListener('click', function() {
            let newIndex = currentIndex - 1;
            if (newIndex < 0) {
                newIndex = slides.length - 1;
            }
            showSlide(newIndex);
        });
        
        // Event listener for next button
        nextButton.addEventListener('click', function() {
            let newIndex = currentIndex + 1;
            if (newIndex >= slides.length) {
                newIndex = 0;
            }
            showSlide(newIndex);
        });
        
        // Event listeners for dots
        dots.forEach(dot => {
            dot.addEventListener('click', function() {
                const index = parseInt(this.dataset.index);
                showSlide(index);
            });
        });
        
        // Keyboard navigation when campaign is active
        campaign.addEventListener('keydown', function(e) {
            if (campaign.classList.contains('active')) {
                if (e.key === 'ArrowLeft') {
                    prevButton.click();
                } else if (e.key === 'ArrowRight') {
                    nextButton.click();
                }
            }
        });
        
        // Initialize first slide
        showSlide(0);
    });
    
    // Global keyboard navigation
    document.addEventListener('keydown', function(e) {
        const activeCampaign = document.querySelector('.campaign-slides.active');
        if (activeCampaign) {
            if (e.key === 'ArrowLeft') {
                activeCampaign.querySelector('.slider-arrow.prev').click();
            } else if (e.key === 'ArrowRight') {
                activeCampaign.querySelector('.slider-arrow.next').click();
            }
        }
    });
});