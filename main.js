// Smooth scroll and interaction enhancements
document.addEventListener('DOMContentLoaded', function() {
    // Add subtle animations on load
    const projectCards = document.querySelectorAll('.project-card');
    
    projectCards.forEach((card, index) => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(20px)';
        card.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        
        setTimeout(() => {
            card.style.opacity = '1';
            card.style.transform = 'translateY(0)';
        }, index * 100);
    });

    // Add hover effects for project cards
    projectCards.forEach(card => {
        const thumbnail = card.querySelector('.project-thumbnail');
        
        card.addEventListener('mouseenter', function() {
            thumbnail.style.transform = 'scale(1.02)';
            thumbnail.style.transition = 'transform 0.3s ease';
        });
        
        card.addEventListener('mouseleave', function() {
            thumbnail.style.transform = 'scale(1)';
        });
    });

    // Handle window resize for better mobile experience
    let resizeTimer;
    window.addEventListener('resize', function() {
        clearTimeout(resizeTimer);
        resizeTimer = setTimeout(function() {
            // Recalculate any dynamic layouts if needed
            projectCards.forEach(card => {
                card.style.transform = 'translateY(0)';
            });
        }, 250);
    });
});

