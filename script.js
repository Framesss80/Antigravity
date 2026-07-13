document.addEventListener('DOMContentLoaded', () => {
    const exploreBtn = document.getElementById('exploreBtn');
    const dynamicContent = document.getElementById('dynamicContent');
    const glassCard = document.querySelector('.glass-card');

    // 3D Tilt effect on glass card
    glassCard.addEventListener('mousemove', (e) => {
        const rect = glassCard.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;
        
        const rotateX = ((y - centerY) / centerY) * -10;
        const rotateY = ((x - centerX) / centerX) * 10;

        glassCard.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.02, 1.02, 1.02)`;
    });

    glassCard.addEventListener('mouseleave', () => {
        glassCard.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) scale3d(1, 1, 1)';
        glassCard.style.transition = 'transform 0.5s cubic-bezier(0.175, 0.885, 0.32, 1.275)';
    });

    glassCard.addEventListener('mouseenter', () => {
        glassCard.style.transition = 'none';
    });

    // Button Interaction
    exploreBtn.addEventListener('click', () => {
        exploreBtn.innerHTML = 'Connecting...';
        exploreBtn.style.opacity = '0.8';
        
        // Simulate an action
        setTimeout(() => {
            exploreBtn.innerHTML = 'Connected!';
            exploreBtn.style.background = 'linear-gradient(135deg, #10b981, #059669)';
            
            dynamicContent.innerHTML = `
                <h3 style="color: #10b981;">System Online</h3>
                <p>Welcome to the Antigravity network. All systems are fully operational.</p>
                <div style="font-size: 3rem; animation: float 3s ease-in-out infinite;">🚀</div>
            `;
        }, 1500);
    });
});
