// JavaScript to handle the default value behavior
const input = document.getElementById('authorInput');

input.addEventListener('focus', function() {
    // Clear the placeholder text on focus
    if (input.value === 'Anonymous') {
        input.value = '';
    }
});

input.addEventListener('blur', function() {
    // Reset to default value if the input is empty on blur
    if (input.value.trim() === '') {
        input.value = 'Anonymous';
    }
});

document.addEventListener('DOMContentLoaded', () => {
    const chatBox = document.getElementById('chatBox');
    const messageForm = document.getElementById('messageForm');
    const authorInput = document.getElementById('authorInput');
    const contentInput = document.getElementById('contentInput');

    messageForm.addEventListener('submit', async (event) => {
        event.preventDefault();
        const author = authorInput.value
        const content = contentInput.value;
        contentInput.value = '';

        // Post the message to the backend
        await fetch('/post_message', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ author, content }),
        });

        // Fetch and display messages
        await loadMessages();
    });

    async function loadMessages() {
        const response = await fetch('/get_messages');
        const data = await response.json();
    
        // Extract the list of messages from the response data
        const messages = data.messages;
        
        chatBox.innerHTML = ''; // Clear existing messages
    
        messages.forEach(msg => {
            const messageElement = document.createElement('p');
            messageElement.textContent = `${msg.author}: ${msg.content}`;
            chatBox.appendChild(messageElement);
        });
    
        chatBox.scrollTop = chatBox.scrollHeight; // Scroll to the bottom
    }

    // Load messages every 2 seconds
    setInterval(loadMessages, 500);
});
