(function () {

    const baseUrl = 'https://technodexterous-chatbot.vercel.app/';

    // 2. We inject the chatbot toggle floating button
    const container = document.createElement('div');
    container.id = 'td-chatbot-wrapper';

    // Toggle Button
    const toggleBtn = document.createElement('div');
    toggleBtn.innerHTML = `
        <div style="display:flex; align-items:center; gap:10px; padding:0 15px;">
            <div class="bot-icon" style="width:32px; height:32px; background:white; border-radius:50%; display:flex; align-items:center; justify-content:center;">
                <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" style="width:20px;height:20px;stroke:#3b82f6;stroke-width:2;fill:none;stroke-linecap:round;stroke-linejoin:round;">
                    <path d="M21 15a2 2 0 01-2 2H7l-4 4V5a2 2 0 012-2h14a2 2 0 012 2v10z"></path>
                </svg>
            </div>
            <span style="color:white; font-family:'Inter',sans-serif; font-weight:600; font-size:14px; white-space:nowrap;">AI Assistant</span>
        </div>
    `;
    Object.assign(toggleBtn.style, {
        position: 'fixed',
        bottom: '25px',
        right: '25px',
        height: '56px',
        borderRadius: '28px',
        backgroundColor: '#3b82f6',
        backgroundImage: 'linear-gradient(135deg, #3b82f6, #8b5cf6)',
        boxShadow: '0 8px 25px rgba(59,130,246,0.3)',
        cursor: 'pointer',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        zIndex: '999999',
        transition: 'all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275)'
    });

    toggleBtn.addEventListener('mouseenter', () => {
        toggleBtn.style.transform = 'translateY(-3px) scale(1.02)';
        toggleBtn.style.boxShadow = '0 12px 30px rgba(59,130,246,0.4)';
    });
    toggleBtn.addEventListener('mouseleave', () => {
        toggleBtn.style.transform = 'translateY(0) scale(1)';
        toggleBtn.style.boxShadow = '0 8px 25px rgba(59,130,246,0.3)';
    });

    // Chatbot Iframe Container
    const iframeContainer = document.createElement('div');
    Object.assign(iframeContainer.style, {
        position: 'fixed',
        bottom: '95px',
        right: '25px',
        width: '400px',
        height: '620px',
        borderRadius: '24px',
        boxShadow: '0 20px 50px rgba(0,0,0,0.4)',
        zIndex: '999999',
        display: 'none',
        overflow: 'hidden',
        backgroundColor: '#0d1117',
        border: '1px solid rgba(255,255,255,0.1)',
        transition: 'all 0.5s cubic-bezier(0.16, 1, 0.3, 1)',
        transform: 'translateY(40px) scale(0.95)',
        opacity: '0',
        transformOrigin: 'bottom right'
    });

    // Add media query for mobile responsiveness
    const styleElem = document.createElement('style');
    styleElem.innerHTML = `
        @media (max-width: 480px) {
            #td-chatbot-wrapper iframe {
                width: 100% !important;
                height: 100% !important;
            }
            #td-chatbot-wrapper div:nth-child(2) { /* iframeContainer style update */
                width: 100vw !important;
                height: 100vh !important;
                bottom: 0 !important;
                right: 0 !important;
                border-radius: 0 !important;
            }
        }
    `;
    document.head.appendChild(styleElem);

    const iframe = document.createElement('iframe');
    iframe.src = baseUrl + '/';
    iframe.style.width = '100%';
    iframe.style.height = '100%';
    iframe.style.border = 'none';

    iframeContainer.appendChild(iframe);
    container.appendChild(toggleBtn);
    container.appendChild(iframeContainer);
    document.body.appendChild(container);

    let isOpen = false;

    toggleBtn.addEventListener('click', () => {
        isOpen = !isOpen;
        if (isOpen) {
            iframeContainer.style.display = 'block';
            setTimeout(() => {
                iframeContainer.style.opacity = '1';
                iframeContainer.style.transform = 'translateY(0) scale(1)';
                toggleBtn.style.transform = 'scale(0.9)';
                toggleBtn.style.opacity = '0.8';
            }, 10);
        } else {
            iframeContainer.style.opacity = '0';
            iframeContainer.style.transform = 'translateY(40px) scale(0.95)';
            toggleBtn.style.transform = 'scale(1)';
            toggleBtn.style.opacity = '1';
            setTimeout(() => {
                iframeContainer.style.display = 'none';
            }, 500);
        }
    });
})();
