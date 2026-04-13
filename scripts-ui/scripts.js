
const aiResponses = [
    "That's an interesting question! Let me think about that...",
    "Great point! Here's my perspective on this topic.",
    "I understand what you're asking. Let me provide some insights.",
    "Thanks for your question! Here's what I can tell you.",
    "Absolutely! That's a topic I find quite fascinating.",
    "I'd be happy to help you with that. Here's my thoughts.",
    "That's a thoughtful question. Let me explain in detail.",
    "Interesting observation! Let me share some ideas with you.",
    "I appreciate you asking! Here's a comprehensive answer.",
    "You're asking the right questions! Here's some information."
];

// DOM Elements
const messageInput = document.getElementById('messageInput');
const sendBtn = document.getElementById('sendBtn');
const messagesContainer = document.getElementById('messagesContainer');
const messagesWrapper = document.getElementById('messagesWrapper');
const welcomeScreen = document.getElementById('welcomeScreen');
const typingContainer = document.getElementById('typingContainer');
const charCount = document.getElementById('charCount');
const themeToggle = document.getElementById('themeToggle');
const clearChat = document.getElementById('clearChat');
const downloadChat = document.getElementById('downloadChat');
const attachBtn = document.getElementById('attachBtn');
const navTabs = document.querySelectorAll('.nav-tab');
const historyPanel = document.getElementById('historyPanel');
const historyList = document.getElementById('historyList');
const clearHistoryBtn = document.getElementById('clearHistory');
const quickActions = document.querySelectorAll('.quick-action');

let isFirstMessage = true;
let conversationHistory = [];



function loadData() {
    const savedHistory = localStorage.getItem('pingpong_history');
    if (savedHistory) {
        conversationHistory = JSON.parse(savedHistory);
        renderHistory();
    }
    
    const savedTheme = localStorage.getItem('pingpong_theme');
    if (savedTheme === 'light') {
        document.body.classList.add('light-theme');
        themeToggle.innerHTML = '<i class="fas fa-moon"></i>';
    } else {
        themeToggle.innerHTML = '<i class="fas fa-adjust"></i>';
    }
}

function saveData() {
    localStorage.setItem('pingpong_history', JSON.stringify(conversationHistory));
}



function getCurrentTime() {
    const now = new Date();
    return now.toLocaleTimeString('en-US', {
        hour: '2-digit',
        minute: '2-digit',
        hour12: true
    });
}

function escapeHtml(text) {
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
}



function addMessage(text, sender) {
    const messageDiv = document.createElement('div');
    messageDiv.className = `message ${sender}`;
    
    const avatarContent = sender === 'user' ? 'U' : '<i class="fas fa-robot"></i>';
    const timestamp = getCurrentTime();
    
    messageDiv.innerHTML = `
        <div class="message-avatar">${avatarContent}</div>
        <div class="message-content">
            <div class="message-text">${escapeHtml(text)}</div>
            <span class="message-time">${timestamp}</span>
        </div>
    `;
    
    messagesWrapper.appendChild(messageDiv);
    scrollToBottom();
    
    // Store in history
    conversationHistory.push({
        sender,
        text,
        time: timestamp
    });
    saveData();
}

function scrollToBottom() {
    messagesContainer.scrollTop = messagesContainer.scrollHeight;
}

function showTypingIndicator() {
    typingContainer.classList.add('active');
    scrollToBottom();
}

function hideTypingIndicator() {
    typingContainer.classList.remove('active');
}

function hideWelcomeScreen() {
    welcomeScreen.style.display = 'none';
    messagesContainer.classList.add('active');
}

function getRandomAIResponse() {
    return aiResponses[Math.floor(Math.random() * aiResponses.length)];
}

async function generateAIResponse() {
    showTypingIndicator();
    
    // Random delay between 1-2.5 seconds
    const delay = Math.random() * 1500 + 1000;
    await new Promise(resolve => setTimeout(resolve, delay));
    
    hideTypingIndicator();
    const response = getRandomAIResponse();
    addMessage(response, 'ai');
}

function sendMessage() {
    const messageText = messageInput.value.trim();
    
    if (messageText.length === 0) return;
    
    if (isFirstMessage) {
        hideWelcomeScreen();
        isFirstMessage = false;
    }
    
    addMessage(messageText, 'user');
    messageInput.value = '';
    updateCharCount();
    autoResizeTextarea();
    updateSendButtonState();
    
    generateAIResponse();
}



function autoResizeTextarea() {
    messageInput.style.height = 'auto';
    const newHeight = Math.min(messageInput.scrollHeight, 120);
    messageInput.style.height = newHeight + 'px';
}

function updateSendButtonState() {
    sendBtn.disabled = messageInput.value.trim().length === 0;
}

function updateCharCount() {
    const length = messageInput.value.length;
    charCount.textContent = length;
    charCount.style.color = length > 4500 ? '#ef4444' : '';
}



function toggleTheme() {
    document.body.classList.toggle('light-theme');
    const isLight = document.body.classList.contains('light-theme');
    localStorage.setItem('pingpong_theme', isLight ? 'light' : 'dark');
    themeToggle.innerHTML = isLight ? '<i class="fas fa-moon"></i>' : '<i class="fas fa-adjust"></i>';
}



function switchTab(tabName) {
    navTabs.forEach(tab => {
        tab.classList.toggle('active', tab.dataset.tab === tabName);
    });
    
    if (tabName === 'history') {
        historyPanel.classList.remove('hidden');
        renderHistory();
    } else {
        historyPanel.classList.add('hidden');
    }
}

function renderHistory() {
    historyList.innerHTML = '';
    
    if (conversationHistory.length === 0) {
        historyList.innerHTML = '<p style="text-align: center; color: var(--text-muted); padding: 20px;">No conversations yet</p>';
        return;
    }
    
    // Group messages by conversation (user message + AI response)
    for (let i = 0; i < conversationHistory.length; i += 2) {
        const userMsg = conversationHistory[i];
        if (userMsg && userMsg.sender === 'user') {
            const historyItem = document.createElement('div');
            historyItem.className = 'history-item';
            const preview = userMsg.text.substring(0, 40) + (userMsg.text.length > 40 ? '...' : '');
            historyItem.innerHTML = `
                <i class="fas fa-comment"></i>
                <span title="${userMsg.text}">${preview}</span>
                <span class="time">${userMsg.time}</span>
            `;
            historyItem.addEventListener('click', () => {
                messageInput.value = userMsg.text;
                messageInput.focus();
                switchTab('chat');
            });
            historyList.appendChild(historyItem);
        }
    }
}



function clearAllChat() {
    if (confirm('Clear all messages?')) {
        messagesWrapper.innerHTML = '';
        conversationHistory = [];
        isFirstMessage = true;
        welcomeScreen.style.display = 'flex';
        messagesContainer.classList.remove('active');
        saveData();
    }
}

function downloadChatHistory() {
    if (conversationHistory.length === 0) {
        alert('No messages to download');
        return;
    }
    
    let content = 'PingPong AI - Chat History\n';
    content += '='.repeat(40) + '\n\n';
    
    conversationHistory.forEach(msg => {
        const sender = msg.sender === 'user' ? 'You' : 'PingPong';
        content += `[${msg.time}] ${sender}:\n${msg.text}\n\n`;
    });
    
    const blob = new Blob([content], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `pingpong-chat-${Date.now()}.txt`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
}

function clearAllHistory() {
    if (confirm('Clear all history?')) {
        conversationHistory = [];
        renderHistory();
        saveData();
    }
}



// Send button
sendBtn.addEventListener('click', sendMessage);

// Input handling
messageInput.addEventListener('input', () => {
    autoResizeTextarea();
    updateSendButtonState();
    updateCharCount();
});

messageInput.addEventListener('keydown', (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
        e.preventDefault();
        sendMessage();
    }
});

// Theme toggle
themeToggle.addEventListener('click', toggleTheme);

// Clear chat
clearChat.addEventListener('click', clearAllChat);

// Download chat
downloadChat.addEventListener('click', downloadChatHistory);

// Attach button
attachBtn.addEventListener('click', () => {
    console.log('Attach file - Coming soon');
});

// Navigation tabs
navTabs.forEach(tab => {
    tab.addEventListener('click', () => {
        switchTab(tab.dataset.tab);
    });
});

// Clear history
clearHistoryBtn.addEventListener('click', clearAllHistory);

// Quick actions
quickActions.forEach(action => {
    action.addEventListener('click', () => {
        messageInput.value = action.dataset.prompt;
        autoResizeTextarea();
        updateSendButtonState();
        messageInput.focus();
        sendMessage();
    });
});

// Keyboard shortcuts
document.addEventListener('keydown', (e) => {
    if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
        e.preventDefault();
        messageInput.focus();
    }
});



window.addEventListener('load', () => {
    loadData();
    updateSendButtonState();
    messageInput.focus();
});
