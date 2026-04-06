const chatBody = document.getElementById('chat-body');
const userInput = document.getElementById('user-input');

function appendMessage(sender, text, buttons = []) {
    const msgDiv = document.createElement('div');
    msgDiv.classList.add('message', sender);

    const bubble = document.createElement('div');
    bubble.classList.add('msg-bubble');
    bubble.innerHTML = text.replace(/\n/g, '<br>');

    msgDiv.appendChild(bubble);
    chatBody.appendChild(msgDiv);

    // Add optional suggestion buttons (usually returned on fallback)
    if (buttons && buttons.length > 0 && sender === 'bot') {
        const btnContainer = document.createElement('div');
        btnContainer.classList.add('suggestion-buttons');

        buttons.forEach(btnText => {
            const btn = document.createElement('button');
            btn.classList.add('suggestion-btn');
            btn.textContent = btnText;
            btn.onclick = () => {
                // Disable buttons after clicking so they don't get reused endlessly
                Array.from(btnContainer.children).forEach(b => b.disabled = true);
                sendMenuOption(btnText);
            };
            btnContainer.appendChild(btn);
        });

        chatBody.appendChild(btnContainer);
    }

    chatBody.scrollTop = chatBody.scrollHeight;
}

function showTyping() {
    const typingDiv = document.createElement('div');
    typingDiv.classList.add('typing-indicator');
    typingDiv.id = 'typing-indicator';
    typingDiv.innerHTML = '<div class="typing-dot"></div><div class="typing-dot"></div><div class="typing-dot"></div>';
    chatBody.appendChild(typingDiv);
    chatBody.scrollTop = chatBody.scrollHeight;
}

function removeTyping() {
    const typingDiv = document.getElementById('typing-indicator');
    if (typingDiv) typingDiv.remove();
}

async function sendMessage() {
    const text = userInput.value.trim();
    if (!text) return;

    appendMessage('user', text);
    userInput.value = '';
    userInput.focus();

    showTyping();

    try {
        const response = await fetch('/chat', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ message: text })
        });
        const data = await response.json();

        setTimeout(() => {
            removeTyping();
            // Expected 'data' format: { text: "...", buttons: ["...", "..."] }
            appendMessage('bot', data.text || data.response, data.buttons || []);
        }, 600);

    } catch (error) {
        removeTyping();
        appendMessage('bot', "Sorry, I'm having trouble connecting to the server.");
    }
}

function handleKeyPress(event) {
    if (event.key === 'Enter') {
        sendMessage();
    }
}

function sendMenuOption(optionText) {
    userInput.value = optionText;
    sendMessage();
}
