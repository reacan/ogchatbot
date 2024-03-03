// Generate a unique userId when the page loads

const userMessageInput = document.getElementById('user-message');
const userIdKey = 'userId'; // Set a key for storing/retrieving userId in local storage

// Retrieve userId from local storage if it exists
let userId = localStorage.getItem(userIdKey);

// If userId doesn't exist in local storage, generate a new one
if (!userId) {
    userId = generateUserId();
    localStorage.setItem(userIdKey, userId);
}


// Sending messages

function sendMessage() {
    const userMessage = userMessageInput.value;
    displayMessage('user', userMessage);
    userMessageInput.value = '';

    // Show the loading indicator
    const loadingIndicator = document.getElementById('loading-indicator');
    loadingIndicator.style.display = 'block';

    fetch('https://worker-rapid-dew-aadf.davis-vilcans.workers.dev', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ userId, message: userMessage }), // Include userId in the request body
    })
    .then(response => response.json())
    .then(data => {
        if (data && Array.isArray(data) && data.length > 0 && data[0].response && data[0].response.response) {
            const aiResponse = data[0].response.response;
            displayMessage('ai', aiResponse);
        } else {
            console.error('Error: Unexpected response structure', data);
        }
    })
    .catch(error => console.error('Error:', error))
    .finally(() => {
        // Hide the loading indicator after the response is processed
        loadingIndicator.style.display = 'none';
    });
}




// Add event listener for Enter key press
userMessageInput.addEventListener('keydown', function(event) {
    if (event.key === 'Enter') {
        // Prevent the default behavior of the Enter key (e.g., new line in textarea)
        event.preventDefault();

        // Call the sendMessage function
        sendMessage();
    }
});

// Displaying messages, both user and AI LAST

function displayMessage(role, content) {
    const chatMessages = document.getElementById('chat-messages');

    // Check if the content contains code. Trim removes leading and trailing whitespaces.
    const isCodeBlock = /```([\s\S]*?)```/.test(content);

    const messageDiv = document.createElement('div');
    messageDiv.classList.add(role === 'user' ? 'user-message' : 'ai-message');

    if (isCodeBlock) {
    // If code block, create a code block
    const codeElement = document.createElement('code');
const codeContent = content.match(/```([\s\S]*?)```/)[1]; // Get content between triple backticks, excluding leading newlines

    codeElement.innerHTML = codeContent.replace(/\n/g, '<br>'); // Replace newline characters with <br>

    const codeBlockDiv = document.createElement('div');
    codeBlockDiv.classList.add('code-block');
    codeBlockDiv.appendChild(codeElement);

    messageDiv.appendChild(codeBlockDiv);
} else {
    // If not a full code block, create spans for every new line
    const lines = content.split('\n');

    if (role === 'user') {
        // If user message, use spans
        lines.forEach(line => {
            const lineElement = document.createElement('span');
            lineElement.textContent = line;
            messageDiv.appendChild(lineElement);
        });
    } else {
        // If AI message, use paragraphs
        lines.forEach(line => {
            const paragraph = document.createElement('p');
            paragraph.textContent = line;
            messageDiv.appendChild(paragraph);
        });
    }
}

    // Append the message div to the chat container
    chatMessages.appendChild(messageDiv);

    // Scroll to the bottom of the chat container
    chatMessages.scrollTop = chatMessages.scrollHeight;
}
  
//Settings Window  
        
     function openSettings() {
    const settingsWindow = document.getElementById('settings-window');
    settingsWindow.classList.toggle('hidden');
}

function toggleSettingsWindow() {
    const settingsWindow = document.getElementById('settings-window');
    settingsWindow.classList.toggle('hidden');
}

function changeChatbotStyle() {
    const styleCheckbox = document.getElementById('styleCheckbox');
    const newStyle = styleCheckbox.checked ? 'rapper' : 'regular';

    // Assuming you have a function in your worker script to change the chatbot style
    // You might need to adjust this part based on how you manage the chatbot's style in your worker
    // For simplicity, let's assume you have a function called changeStyle in your worker script
    fetch('http://localhost:8787', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ command: 'changeStyle', style: newStyle }),
    })
    .then(response => response.json())
    .then(data => {
        // Handle response if needed
        console.log('Style changed successfully', data);
    })
    .catch(error => console.error('Error:', error));

    // Close the settings window after changing the style
    toggleSettingsWindow();
}

function toggleSettingsWindow() {
    const settingsWindow = document.getElementById('settings-window');
    const currentDisplay = window.getComputedStyle(settingsWindow).display;

    if (currentDisplay === 'none') {
        settingsWindow.style.display = 'block';
    } else {
        settingsWindow.style.display = 'none';
    }
}

//User ID

function generateUserId() {
    return Math.random().toString(36).substring(2, 15);
}

