// Storybook Interactive Functionality
class StorybookApp {
    constructor() {
        this.currentPage = 'cover';
        this.totalPages = 10;
        this.isInitialized = false;
        this.init();
    }

    init() {
        // Wait for DOM to be fully loaded
        if (document.readyState === 'loading') {
            document.addEventListener('DOMContentLoaded', () => {
                this.initializeApp();
            });
        } else {
            this.initializeApp();
        }
    }

    initializeApp() {
        this.setupEventListeners();
        this.addSparkleEffects();
        this.showPage('cover');
        this.isInitialized = true;
    }

    setupEventListeners() {
        // Add click sound effect simulation
        this.addClickEffects();
        
        // Handle escape key to close modal
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape') {
                this.closeCelebration();
            }
        });

        // Add keyboard navigation
        document.addEventListener('keydown', (e) => {
            if (e.key === 'ArrowLeft') {
                this.handlePreviousPage();
            } else if (e.key === 'ArrowRight') {
                this.handleNextPage();
            }
        });
    }

    addClickEffects() {
        // Add sparkle effect on button clicks
        document.querySelectorAll('.btn').forEach(button => {
            button.addEventListener('click', (e) => {
                this.createSparkleEffect(e.target);
                this.playClickSound();
            });
        });

        // Add hover effects to images
        document.querySelectorAll('.story-image img, .cover-image img').forEach(img => {
            img.addEventListener('mouseenter', () => {
                this.addImageGlow(img);
            });
            img.addEventListener('mouseleave', () => {
                this.removeImageGlow(img);
            });
        });
    }

    createSparkleEffect(element) {
        if (!element) return;
        
        const sparkles = ['✨', '⭐', '🌟', '💫', '🌈'];
        const rect = element.getBoundingClientRect();
        
        for (let i = 0; i < 5; i++) {
            const sparkle = document.createElement('div');
            sparkle.innerHTML = sparkles[Math.floor(Math.random() * sparkles.length)];
            sparkle.className = 'click-sparkle';
            sparkle.style.cssText = `
                position: fixed;
                left: ${rect.left + Math.random() * rect.width}px;
                top: ${rect.top + Math.random() * rect.height}px;
                font-size: 1.5rem;
                pointer-events: none;
                z-index: 1000;
                animation: sparkleAnimation 1s ease-out forwards;
            `;
            
            document.body.appendChild(sparkle);
            
            setTimeout(() => {
                if (sparkle.parentNode) {
                    sparkle.remove();
                }
            }, 1000);
        }
        
        // Add CSS for sparkle animation if not already added
        if (!document.querySelector('#sparkle-styles')) {
            const style = document.createElement('style');
            style.id = 'sparkle-styles';
            style.textContent = `
                @keyframes sparkleAnimation {
                    0% {
                        opacity: 1;
                        transform: translateY(0) scale(0.5);
                    }
                    50% {
                        opacity: 1;
                        transform: translateY(-30px) scale(1);
                    }
                    100% {
                        opacity: 0;
                        transform: translateY(-60px) scale(0.5);
                    }
                }
            `;
            document.head.appendChild(style);
        }
    }

    playClickSound() {
        // Visual feedback instead of audio
        document.body.style.transition = 'filter 0.1s ease';
        document.body.style.filter = 'brightness(1.1)';
        setTimeout(() => {
            document.body.style.filter = 'brightness(1)';
        }, 100);
    }

    addImageGlow(img) {
        if (!img) return;
        img.style.transition = 'all 0.3s ease';
        img.style.boxShadow = '0 0 30px rgba(255, 107, 107, 0.5), 0 15px 35px rgba(0,0,0,0.1)';
        img.style.transform = 'scale(1.02) rotate(0.5deg)';
    }

    removeImageGlow(img) {
        if (!img) return;
        img.style.boxShadow = '0 15px 35px rgba(0,0,0,0.1)';
        img.style.transform = 'scale(1) rotate(0deg)';
    }

    showPage(pageId) {
        console.log('Showing page:', pageId); // Debug log
        
        // Hide all pages first
        document.querySelectorAll('.page').forEach(page => {
            page.classList.remove('active');
            page.style.display = 'none';
        });

        // Show the requested page
        const targetPage = document.getElementById(pageId);
        if (targetPage) {
            targetPage.style.display = 'block';
            targetPage.classList.add('active');
            this.currentPage = pageId;
            
            // Scroll to top
            window.scrollTo({ top: 0, behavior: 'smooth' });
            
            // Update page background
            this.updatePageBackground(pageId);
            
            console.log('Page shown:', pageId); // Debug log
        } else {
            console.error('Page not found:', pageId); // Debug log
        }
    }

    updatePageBackground(pageId) {
        const body = document.body;
        
        if (pageId === 'cover') {
            body.style.background = 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)';
        } else {
            // Create unique backgrounds for different story sections
            const pageNum = parseInt(pageId.replace('page', ''));
            const backgrounds = [
                'linear-gradient(135deg, #a8edea 0%, #fed6e3 100%)', // Page 1-2: Introduction
                'linear-gradient(135deg, #ffecd2 0%, #fcb69f 100%)', // Page 3-4: Problem
                'linear-gradient(135deg, #a8caba 0%, #5d4e75 100%)', // Page 5-6: Quest
                'linear-gradient(135deg, #d299c2 0%, #fef9d7 100%)', // Page 7-8: Resolution
                'linear-gradient(135deg, #89f7fe 0%, #66a6ff 100%)'  // Page 9-10: Happy ending
            ];
            
            const backgroundIndex = Math.floor((pageNum - 1) / 2);
            body.style.background = backgrounds[backgroundIndex] || backgrounds[0];
        }
    }

    handlePreviousPage() {
        if (this.currentPage === 'cover') return;
        
        const currentPageNum = parseInt(this.currentPage.replace('page', ''));
        if (currentPageNum > 1) {
            this.showPage(`page${currentPageNum - 1}`);
        }
    }

    handleNextPage() {
        if (this.currentPage === 'cover') {
            this.showPage('page1');
            return;
        }
        
        const currentPageNum = parseInt(this.currentPage.replace('page', ''));
        if (currentPageNum < this.totalPages) {
            this.showPage(`page${currentPageNum + 1}`);
        }
    }

    addSparkleEffects() {
        // Add floating sparkles that appear randomly
        setInterval(() => {
            if (this.isInitialized) {
                this.createFloatingSparkle();
            }
        }, 4000);
    }

    createFloatingSparkle() {
        const sparkles = ['✨', '⭐', '🌟', '💫'];
        const sparkle = document.createElement('div');
        sparkle.innerHTML = sparkles[Math.floor(Math.random() * sparkles.length)];
        sparkle.className = 'floating-sparkle';
        
        const startX = Math.random() * window.innerWidth;
        
        sparkle.style.cssText = `
            position: fixed;
            left: ${startX}px;
            top: 100vh;
            font-size: ${1 + Math.random()}rem;
            pointer-events: none;
            z-index: 100;
            opacity: 0.7;
            animation: floatUp 8s linear forwards;
        `;
        
        document.body.appendChild(sparkle);
        
        setTimeout(() => {
            if (sparkle.parentNode) {
                sparkle.remove();
            }
        }, 8000);
        
        // Add floating animation if not already added
        if (!document.querySelector('#floating-styles')) {
            const style = document.createElement('style');
            style.id = 'floating-styles';
            style.textContent = `
                @keyframes floatUp {
                    0% {
                        transform: translateY(0) rotate(0deg);
                        opacity: 0;
                    }
                    10% {
                        opacity: 0.7;
                    }
                    90% {
                        opacity: 0.7;
                    }
                    100% {
                        transform: translateY(-100vh) rotate(360deg);
                        opacity: 0;
                    }
                }
            `;
            document.head.appendChild(style);
        }
    }

    closeCelebration() {
        const modal = document.getElementById('celebration-modal');
        if (modal) {
            modal.style.display = 'none';
            this.showPage('cover');
        }
    }
}

// Initialize the storybook app
let storybook;

// Wait for DOM to be ready
document.addEventListener('DOMContentLoaded', () => {
    storybook = new StorybookApp();
    
    // Preload images for smoother experience
    const imageUrls = [
        'https://pplx-res.cloudinary.com/image/upload/v1750222743/gpt4o_images/etbqtgxq2ugsbw6s8p7e.png',
        'https://pplx-res.cloudinary.com/image/upload/v1750222798/gpt4o_images/zil1yefsn81mueojqpdh.png',
        'https://pplx-res.cloudinary.com/image/upload/v1750222856/gpt4o_images/h367dgndzehleg4brsiy.png',
        'https://pplx-res.cloudinary.com/image/upload/v1750222900/gpt4o_images/ttnqlezxtbjkzjtmb0fm.png',
        'https://pplx-res.cloudinary.com/image/upload/v1750222958/gpt4o_images/yjvbwrvokzvvzyx9msbs.png',
        'https://pplx-res.cloudinary.com/image/upload/v1750223010/gpt4o_images/qdyweppfokyfwd5rwud2.png',
        'https://pplx-res.cloudinary.com/image/upload/v1750223073/gpt4o_images/fr9vdhsd4gm41e3did4w.png',
        'https://pplx-res.cloudinary.com/image/upload/v1750223140/gpt4o_images/qum6lycsyzuarfhrd8gg.png',
        'https://pplx-res.cloudinary.com/image/upload/v1750223197/gpt4o_images/fagpvdwxpyrbgj6t9sdh.png',
        'https://pplx-res.cloudinary.com/image/upload/v1750223246/gpt4o_images/fqszvmoqocjsp8dg7eos.png'
    ];
    
    imageUrls.forEach(url => {
        const img = new Image();
        img.src = url;
    });
});

// Global functions for HTML onclick events
function startReading() {
    if (storybook) {
        storybook.showPage('page1');
        storybook.createSparkleEffect(event.target);
    }
}

function nextPage(currentPageNum) {
    if (storybook && currentPageNum < storybook.totalPages) {
        storybook.showPage(`page${currentPageNum + 1}`);
    }
}

function previousPage(currentPageNum) {
    if (storybook && currentPageNum > 1) {
        storybook.showPage(`page${currentPageNum - 1}`);
    }
}

function goToCover() {
    if (storybook) {
        storybook.showPage('cover');
    }
}

function celebrate() {
    const modal = document.getElementById('celebration-modal');
    if (modal) {
        modal.style.display = 'block';
        
        // Create celebration sparkles
        for (let i = 0; i < 20; i++) {
            setTimeout(() => {
                createCelebrationSparkle();
            }, i * 100);
        }
    }
}

function closeCelebration() {
    if (storybook) {
        storybook.closeCelebration();
    }
}

function createCelebrationSparkle() {
    const sparkles = ['🎉', '🎊', '✨', '⭐', '🌟', '💫', '🌈', '🦕', '💖'];
    const sparkle = document.createElement('div');
    sparkle.innerHTML = sparkles[Math.floor(Math.random() * sparkles.length)];
    
    sparkle.style.cssText = `
        position: fixed;
        left: ${Math.random() * 100}vw;
        top: -50px;
        font-size: ${1.5 + Math.random()}rem;
        pointer-events: none;
        z-index: 1001;
        animation: celebrationFall 3s linear forwards;
    `;
    
    document.body.appendChild(sparkle);
    
    setTimeout(() => {
        if (sparkle.parentNode) {
            sparkle.remove();
        }
    }, 3000);
    
    // Add celebration fall animation if not already added
    if (!document.querySelector('#celebration-styles')) {
        const style = document.createElement('style');
        style.id = 'celebration-styles';
        style.textContent = `
            @keyframes celebrationFall {
                0% {
                    transform: translateY(-50px) rotate(0deg);
                    opacity: 1;
                }
                100% {
                    transform: translateY(calc(100vh + 50px)) rotate(720deg);
                    opacity: 0;
                }
            }
        `;
        document.head.appendChild(style);
    }
}

// Add touch support for mobile devices
let touchStartX = 0;
let touchEndX = 0;

document.addEventListener('touchstart', (e) => {
    touchStartX = e.changedTouches[0].screenX;
});

document.addEventListener('touchend', (e) => {
    touchEndX = e.changedTouches[0].screenX;
    handleSwipeGesture();
});

function handleSwipeGesture() {
    const swipeThreshold = 50;
    const diff = touchStartX - touchEndX;
    
    if (Math.abs(diff) > swipeThreshold && storybook) {
        if (diff > 0) {
            // Swipe left - next page
            storybook.handleNextPage();
        } else {
            // Swipe right - previous page
            storybook.handlePreviousPage();
        }
    }
}

// Handle window resize for responsive behavior
window.addEventListener('resize', () => {
    const sparkles = document.querySelectorAll('.floating-sparkle, .click-sparkle');
    sparkles.forEach(sparkle => {
        if (sparkle.offsetLeft > window.innerWidth) {
            sparkle.remove();
        }
    });
});

// Add entrance animations
const style = document.createElement('style');
style.textContent = `
    @keyframes slideInDown {
        from {
            opacity: 0;
            transform: translateY(-50px);
        }
        to {
            opacity: 1;
            transform: translateY(0);
        }
    }
    
    @keyframes slideInUp {
        from {
            opacity: 0;
            transform: translateY(50px);
        }
        to {
            opacity: 1;
            transform: translateY(0);
        }
    }
    
    @keyframes slideInRight {
        from {
            opacity: 0;
            transform: translateX(100px);
        }
        to {
            opacity: 1;
            transform: translateX(0);
        }
    }
    
    @keyframes fadeOut {
        from { opacity: 1; }
        to { opacity: 0; }
    }
`;
document.head.appendChild(style);