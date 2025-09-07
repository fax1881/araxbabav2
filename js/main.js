const body = document.body;

function animateFormFill(elements) {
    elements.forEach((el, index) => {
        setTimeout(() => {
            el.classList.add('filled');
            setTimeout(() => {
                el.classList.remove('filled');
            }, 500);
        }, index * 100);
    });
}


function showNotification(message, type = 'info', title = '') {
    let container = document.querySelector('.notification-container');
    if (!container) {
        container = document.createElement('div');
        container.className = 'notification-container';
        document.body.appendChild(container);
    }
    if (!title) {
        switch (type) {
            case 'success':
                title = 'Başarılı!';
                break;
            case 'error':
                title = 'Hata!';
                break;
            case 'warning':
                title = 'Uyarı!';
                break;
            case 'info':
            default:
                title = 'Bilgi';
                break;
        }
    }
    let icon = '';
    switch (type) {
        case 'success':
            icon = '<i class="fas fa-check-circle"></i>';
            break;
        case 'error':
            icon = '<i class="fas fa-times-circle"></i>';
            break;
        case 'warning':
            icon = '<i class="fas fa-exclamation-triangle"></i>';
            break;
        case 'info':
        default:
            icon = '<i class="fas fa-info-circle"></i>';
            break;
    }
    
    const notification = document.createElement('div');
    notification.className = `notification ${type}`;
    notification.innerHTML = `
        <div class="notification-icon">${icon}</div>
        <div class="notification-content">
            <div class="notification-title">${title}</div>
            <div class="notification-message">${message}</div>
        </div>
        <div class="notification-close"><i class="fas fa-times"></i></div>
    `;
    
    container.appendChild(notification);
    setTimeout(() => {
        notification.style.opacity = '1';
        notification.style.transform = 'translateY(0) scale(1)';
    }, 10);
    const closeBtn = notification.querySelector('.notification-close');
    closeBtn.addEventListener('click', () => {
        closeNotification(notification);
    });
    
    if (type !== 'loading') {
        setTimeout(() => {
            closeNotification(notification);
        }, 5000);
    }
    
    return notification;
}

function closeNotification(notification) {
    notification.style.opacity = '0';
    notification.style.transform = 'translateY(-20px) scale(0.9)';
    
    setTimeout(() => {
        notification.remove();
    }, 300);
}
function animateHeroSection() {
    const heroContent = document.querySelector('.hero-content');
    heroContent.style.opacity = '0';
    heroContent.style.transform = 'translateY(20px)';
    
    setTimeout(() => {
        heroContent.style.transition = 'opacity 1s ease, transform 1s ease';
        heroContent.style.opacity = '1';
        heroContent.style.transform = 'translateY(0)';
    }, 300);
    const contactItems = document.querySelectorAll('.contact-item');
    contactItems.forEach((item, index) => {
        item.style.opacity = '0';
        item.style.transform = 'translateY(20px)';
        
        setTimeout(() => {
            item.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
            item.style.opacity = '1';
            item.style.transform = 'translateY(0)';
        }, 800 + (index * 200));
    });
}
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        
        const targetId = this.getAttribute('href');
        if (targetId === '#') return;
        
        const targetElement = document.querySelector(targetId);
        if (targetElement) {
            window.scrollTo({
                top: targetElement.offsetTop - 100,
                behavior: 'smooth'
            });
        }
    });
});
function typeWriter(element, text, speed = 100) {
    let i = 0;
    element.textContent = '';
    
    function type() {
        if (i < text.length) {
            element.textContent += text.charAt(i);
            i++;
            setTimeout(type, speed);
        }
    }
    
    type();
}
window.addEventListener('load', () => {
    const animatedText = document.querySelector('.animated-text');
    if (animatedText) {
        const originalText = animatedText.textContent;
        typeWriter(animatedText, originalText, 70);
    }
}); 
document.addEventListener('DOMContentLoaded', function() {
    const links = document.querySelectorAll('.social-link, .service-link');
    links.forEach(link => {
        if (!link.hasAttribute('target')) {
            link.setAttribute('target', '_blank');
        }
        
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            const url = this.getAttribute('href');
            const currentLink = this;
            
            if (!url || url === '#') return;
            
            currentLink.classList.add('loading');
            
            setTimeout(() => {
                window.open(url, '_blank');
                
                setTimeout(() => {
                    currentLink.classList.remove('loading');
                }, 100);
            }, 800);
        });
    });
});