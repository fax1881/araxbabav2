
document.addEventListener('DOMContentLoaded', function() {

    const canvas = document.createElement('canvas');
    canvas.id = 'animationCanvas';
    
    Object.assign(canvas.style, {
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        zIndex: -1,
        opacity: 0.8
    });
    
    document.body.prepend(canvas);
    
    const ctx = canvas.getContext('2d');
    
    function resizeCanvas() {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    }
    
    window.addEventListener('resize', resizeCanvas);
    resizeCanvas();
    
    let mouse = {
        x: null,
        y: null,
        radius: 150
    }
    
    window.addEventListener('mousemove', function(event) {
        mouse.x = event.x;
        mouse.y = event.y;
    });
    
    window.addEventListener('touchmove', function(event) {
        if (event.touches.length > 0) {
            mouse.x = event.touches[0].clientX;
            mouse.y = event.touches[0].clientY;
        }
    }, { passive: true });
    
    window.addEventListener('mouseout', function() {
        mouse.x = null;
        mouse.y = null;
    });
    
    const discordColors = [
        '#5865F2', // Discord mavi
        '#57F287', // Discord yeşil
        '#FEE75C', // Discord sarı
        '#EB459E', // Discord pembe
        '#ED4245'  // Discord kırmızı
    ];
    
    const particleCount = 100;
    const particleBaseSize = 3;
    const particleVariation = 1.5;
    const baseSpeed = 0.2;
    const connectionDistance = 150;
    const connectionWidth = 0.8;

    let particles = [];

    class Particle {
        constructor() {
            this.x = Math.random() * canvas.width;
            this.y = Math.random() * canvas.height;
            this.vx = (Math.random() - 0.5) * baseSpeed;
            this.vy = (Math.random() - 0.5) * baseSpeed;
            this.size = Math.random() * particleVariation + particleBaseSize;
            this.origSize = this.size;
            this.color = discordColors[Math.floor(Math.random() * discordColors.length)];
            this.baseColor = this.color;
            this.opacity = Math.random() * 0.5 + 0.4;
            this.pulseSpeed = 0.01 + Math.random() * 0.02;
            this.pulseOffset = Math.random() * Math.PI * 2;
            this.pulseSize = 0;
        }
        
        interactWithMouse() {
            if (mouse.x && mouse.y) {
                const dx = this.x - mouse.x;
                const dy = this.y - mouse.y;
                const distance = Math.sqrt(dx * dx + dy * dy);
                if (distance < mouse.radius) {
                    const forceDirectionX = dx / distance;
                    const forceDirectionY = dy / distance;
                    const force = (mouse.radius - distance) / mouse.radius;
                    this.vx += forceDirectionX * force * 0.6;
                    this.vy += forceDirectionY * force * 0.6;
                    this.size = this.origSize * (1 + force * 1.5);
                } else {
                    this.size = this.origSize;
                }
            }
        }
        
        update() {
            this.vx = Math.max(Math.min(this.vx, 2), -2);
            this.vy = Math.max(Math.min(this.vy, 2), -2);
            this.x += this.vx;
            this.y += this.vy;
            if (this.x < 0) this.x = canvas.width;
            if (this.x > canvas.width) this.x = 0;
            if (this.y < 0) this.y = canvas.height;
            if (this.y > canvas.height) this.y = 0;
            
            this.vx *= 0.99;
            this.vy *= 0.99;
            
            this.interactWithMouse();

            this.pulseSize = (Math.sin(Date.now() * this.pulseSpeed + this.pulseOffset) + 1) * 0.5;
        }
        draw() {
            const currentSize = this.size * (1 + this.pulseSize * 0.3);
            
            ctx.beginPath();
            ctx.arc(this.x, this.y, currentSize + 2, 0, Math.PI * 2);
            ctx.fillStyle = this.color;
            ctx.globalAlpha = this.opacity * 0.2;
            ctx.fill();
            ctx.beginPath();
            ctx.arc(this.x, this.y, currentSize, 0, Math.PI * 2);
            ctx.fillStyle = this.color;
            ctx.globalAlpha = this.opacity;
            ctx.fill();
            ctx.beginPath();
            ctx.arc(this.x - currentSize * 0.3, this.y - currentSize * 0.3, currentSize * 0.4, 0, Math.PI * 2);
            ctx.fillStyle = '#ffffff';
            ctx.globalAlpha = this.opacity * 0.4;
            ctx.fill();
            ctx.globalAlpha = 1;
        }
    }
    for (let i = 0; i < particleCount; i++) {
        particles.push(new Particle());
    }
    function drawConnections() {
        ctx.lineWidth = connectionWidth;

        for (let i = 0; i < particles.length; i++) {
            for (let j = i + 1; j < particles.length; j++) {
                const dx = particles[i].x - particles[j].x;
                const dy = particles[i].y - particles[j].y;
                const distance = Math.sqrt(dx * dx + dy * dy);
                if (distance < connectionDistance) {
                    const opacity = 1 - (distance / connectionDistance);
                    const gradient = ctx.createLinearGradient(
                        particles[i].x, 
                        particles[i].y, 
                        particles[j].x, 
                        particles[j].y
                    );
                    
                    gradient.addColorStop(0, particles[i].color);
                    gradient.addColorStop(1, particles[j].color);
                    
                    ctx.beginPath();
                    ctx.strokeStyle = gradient;
                    ctx.globalAlpha = opacity * 0.5;
                    ctx.moveTo(particles[i].x, particles[i].y);
                    ctx.lineTo(particles[j].x, particles[j].y);
                    ctx.stroke();
                    ctx.globalAlpha = 1;
                }
            }
        }
    }
    
    function animate() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        for (let i = 0; i < particles.length; i++) {
            particles[i].update();
        }

        drawConnections();

        for (let i = 0; i < particles.length; i++) {
            particles[i].draw();
        }
        
        requestAnimationFrame(animate);
    }

    animate();
}); 