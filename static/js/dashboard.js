// Dashboard JavaScript for animations and interactions
document.addEventListener('DOMContentLoaded', function() {
    // Add animation classes to elements
    const animateElements = () => {
        const statCards = document.querySelectorAll('.stat-card');
        const actionCards = document.querySelectorAll('.action-card');
        const activityItems = document.querySelectorAll('.activity-item');
        
        // Animate stat cards with staggered delay
        statCards.forEach((card, index) => {
            setTimeout(() => {
                card.classList.add('fade-in');
            }, index * 100);
        });
        
        // Animate action cards
        actionCards.forEach((card, index) => {
            setTimeout(() => {
                card.classList.add('slide-up');
            }, 300 + (index * 150));
        });
        
        // Animate activity items
        activityItems.forEach((item, index) => {
            setTimeout(() => {
                item.classList.add('fade-in');
            }, 800 + (index * 100));
        });
    };
    
    // Counter animation for stats
    const animateCounters = () => {
        const counters = document.querySelectorAll('.stat-number');
        
        counters.forEach(counter => {
            const target = parseInt(counter.textContent);
            const duration = 1000;
            const step = target / (duration / 16);
            let current = 0;
            
            const timer = setInterval(() => {
                current += step;
                if (current >= target) {
                    counter.textContent = target;
                    clearInterval(timer);
                } else {
                    counter.textContent = Math.floor(current);
                }
            }, 16);
        });
    };
    
    // Smooth scroll for internal links
    const smoothScroll = () => {
        const links = document.querySelectorAll('a[href^="#"]');
        
        links.forEach(link => {
            link.addEventListener('click', function(e) {
                e.preventDefault();
                const target = document.querySelector(this.getAttribute('href'));
                if (target) {
                    target.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                }
            });
        });
    };
    
    // Add hover effects to cards
    const addHoverEffects = () => {
        const cards = document.querySelectorAll('.stat-card, .action-card');
        
        cards.forEach(card => {
            card.addEventListener('mouseenter', function() {
                this.style.transform = 'translateY(-5px)';
            });
            
            card.addEventListener('mouseleave', function() {
                this.style.transform = 'translateY(0)';
            });
        });
    };
    
    // Initialize all animations and effects
    setTimeout(animateElements, 100);
    setTimeout(animateCounters, 500);
    smoothScroll();
    addHoverEffects();
    
    // Add loading state simulation (for demo purposes)
    const simulateLoading = () => {
        const activitySection = document.querySelector('.recent-activity');
        if (activitySection) {
            // Add a subtle loading effect
            activitySection.style.opacity = '0.8';
            setTimeout(() => {
                activitySection.style.opacity = '1';
            }, 300);
        }
    };
    
    simulateLoading();
});