document.addEventListener('DOMContentLoaded', function() {
    // Check if user is logged in
    const user = JSON.parse(localStorage.getItem('currentUser'));
    if (!user || user.type !== 'student') {
        window.location.href = '../index.html';
        return;
    }

    // Display user name
    document.getElementById('student-name').textContent = user.username;

    // Sort languages alphabetically
    const sortedLanguages = [...programmingLanguages].sort((a, b) => 
        a.name.localeCompare(b.name)
    );

    // Render languages and topics
    const languagesContainer = document.querySelector('.programming-languages');
    sortedLanguages.forEach(language => {
        renderLanguageCard(language, languagesContainer);
    });

    // Modal handling
    setupModal();

    // Add question styles
    addQuestionStyles();
});

function renderLanguageCard(language, container) {
    const completedTopics = language.topics.filter(t => t.status === 'completed').length;
    const progress = (completedTopics / language.topics.length) * 100;

    const languageCard = document.createElement('div');
    languageCard.className = 'language-card';
    languageCard.innerHTML = `
        <div class="language-header">
            <h2>${language.name}</h2>
            <div class="language-progress">
                <span>${completedTopics}/${language.topics.length} topics completed</span>
                <div class="progress-bar">
                    <div class="progress-fill" style="width: ${progress}%"></div>
                </div>
            </div>
        </div>
        <div class="topics-grid">
            ${language.topics.map(topic => `
                <div class="topic-card ${topic.status}" data-language-id="${language.id}" data-topic-id="${topic.id}">
                    <h3>${topic.title}</h3>
                    <p>Status: ${topic.status.replace('_', ' ')}</p>
                </div>
            `).join('')}
        </div>
    `;

    container.appendChild(languageCard);

    // Add click handlers to topic cards
    languageCard.querySelectorAll('.topic-card').forEach(card => {
        card.addEventListener('click', () => {
            const languageId = parseInt(card.dataset.languageId);
            const topicId = parseInt(card.dataset.topicId);
            openTopicModal(languageId, topicId);
        });
    });
}

function openTopicModal(languageId, topicId) {
    const language = programmingLanguages.find(l => l.id === languageId);
    const topic = language.topics.find(t => t.id === topicId);
    
    document.getElementById('modal-title').textContent = topic.title;
    document.getElementById('topic-description').textContent = topic.description;
    
    // Render examples
    document.getElementById('topic-examples').innerHTML = topic.examples.map(example => 
        `<pre><code>${example}</code></pre>`
    ).join('');
    
    // Render questions with their individual status and file upload
    document.getElementById('topic-questions').innerHTML = topic.questions.map(question => `
        <div class="question-card ${question.status}" data-question-id="${question.id}">
            <div class="question-header">
                <h4>Question ${question.id}</h4>
                <span class="status-badge">${question.status.replace('_', ' ')}</span>
            </div>
            <p>${question.text}</p>
            
            <div class="question-submission">
                <div class="file-upload">
                    <input type="file" id="file-question-${question.id}" 
                           class="solution-file" accept=".js,.py,.java,.txt">
                    <div class="file-controls">
                        <button class="btn-primary btn-upload" 
                                onclick="handleQuestionSubmit(${languageId}, ${topicId}, ${question.id})">
                            Submit Solution
                        </button>
                        ${question.submission ? `
                            <button class="btn-secondary btn-edit" 
                                    onclick="handleQuestionEdit(${languageId}, ${topicId}, ${question.id})">
                                Edit
                            </button>
                            <button class="btn-danger btn-delete" 
                                    onclick="handleQuestionDelete(${languageId}, ${topicId}, ${question.id})">
                                Delete
                            </button>
                        ` : ''}
                        <button class="btn-warning btn-reset" 
                                onclick="handleQuestionReset(${languageId}, ${topicId}, ${question.id})">
                            Reset
                        </button>
                    </div>
                </div>
                ${question.submission ? `
                    <div class="current-submission">
                        <p>Current file: ${question.submission.filename}</p>
                        <p>Uploaded: ${new Date(question.submission.timestamp).toLocaleString()}</p>
                    </div>
                ` : ''}
            </div>
        </div>
    `).join('');

    // Show modal
    const modal = document.getElementById('topic-modal');
    modal.dataset.languageId = languageId;
    modal.dataset.topicId = topicId;
    modal.style.display = 'block';
}

function handleQuestionSubmit(languageId, topicId, questionId) {
    const fileInput = document.getElementById(`file-question-${questionId}`);
    const file = fileInput.files[0];
    
    if (!file) {
        alert('Please select a file first');
        return;
    }

    // In a real application, this would upload to a server
    const submission = {
        filename: file.name,
        timestamp: new Date().toISOString(),
        size: file.size
    };

    updateQuestionStatus(languageId, topicId, questionId, 'completed', submission);
}

function handleQuestionEdit(languageId, topicId, questionId) {
    document.getElementById(`file-question-${questionId}`).click();
}

function handleQuestionDelete(languageId, topicId, questionId) {
    updateQuestionStatus(languageId, topicId, questionId, 'not_started', null);
}

function handleQuestionReset(languageId, topicId, questionId) {
    updateQuestionStatus(languageId, topicId, questionId, 'not_started', null);
    document.getElementById(`file-question-${questionId}`).value = '';
}

function updateQuestionStatus(languageId, topicId, questionId, status, submission) {
    // Find and update the question
    const language = programmingLanguages.find(l => l.id === languageId);
    const topic = language.topics.find(t => t.id === topicId);
    const question = topic.questions.find(q => q.id === questionId);
    
    question.status = status;
    question.submission = submission;

    // Update topic status based on all questions
    const allCompleted = topic.questions.every(q => q.status === 'completed');
    const anyCompleted = topic.questions.some(q => q.status === 'completed');
    
    if (allCompleted) {
        topic.status = 'completed';
    } else if (anyCompleted) {
        topic.status = 'pending';
    } else {
        topic.status = 'not_started';
    }

    // Update UI
    updateTopicCard(languageId, topicId, topic.status);
    updateLanguageProgress(languageId);

    // Save to localStorage
    localStorage.setItem('programmingLanguages', JSON.stringify(programmingLanguages));

    // Refresh modal to show updated status
    openTopicModal(languageId, topicId);
}

function setupModal() {
    const modal = document.getElementById('topic-modal');
    const closeBtn = modal.querySelector('.close');
    const uploadBtn = document.getElementById('btn-upload');
    const editBtn = document.getElementById('btn-edit');
    const deleteBtn = document.getElementById('btn-delete');
    const resetBtn = document.getElementById('btn-reset');

    // Close modal
    closeBtn.onclick = () => modal.style.display = 'none';
    window.onclick = (event) => {
        if (event.target === modal) modal.style.display = 'none';
    };

    // File upload handling
    uploadBtn.onclick = handleFileUpload;
    editBtn.onclick = handleFileEdit;
    deleteBtn.onclick = handleFileDelete;
    resetBtn.onclick = handleReset;
}

function handleFileUpload() {
    const fileInput = document.getElementById('solution-file');
    const file = fileInput.files[0];
    
    if (!file) {
        alert('Please select a file first');
        return;
    }

    const modal = document.getElementById('topic-modal');
    const languageId = parseInt(modal.dataset.languageId);
    const topicId = parseInt(modal.dataset.topicId);

    // In a real application, this would upload to a server
    const submission = {
        filename: file.name,
        timestamp: new Date().toISOString(),
        size: file.size
    };

    updateTopicStatus(languageId, topicId, 'completed', submission);
}

function handleFileEdit() {
    document.getElementById('solution-file').click();
}

function handleFileDelete() {
    const modal = document.getElementById('topic-modal');
    const languageId = parseInt(modal.dataset.languageId);
    const topicId = parseInt(modal.dataset.topicId);

    updateTopicStatus(languageId, topicId, 'not_started', null);
}

function handleReset() {
    const modal = document.getElementById('topic-modal');
    const languageId = parseInt(modal.dataset.languageId);
    const topicId = parseInt(modal.dataset.topicId);

    updateTopicStatus(languageId, topicId, 'not_started', null);
    document.getElementById('solution-file').value = '';
}

function updateTopicStatus(languageId, topicId, status, submission) {
    // Find and update the topic
    const language = programmingLanguages.find(l => l.id === languageId);
    const topic = language.topics.find(t => t.id === topicId);
    
    topic.status = status;
    topic.submission = submission;

    // Update UI
    updateFileInfo(submission);
    updateTopicCard(languageId, topicId, status);
    updateLanguageProgress(languageId);

    // Save to localStorage
    localStorage.setItem('programmingLanguages', JSON.stringify(programmingLanguages));
}

function updateFileInfo(submission) {
    const fileInfo = document.getElementById('current-file-info');
    const editBtn = document.getElementById('btn-edit');
    const deleteBtn = document.getElementById('btn-delete');

    if (submission) {
        fileInfo.innerHTML = `
            <p>Current file: ${submission.filename}</p>
            <p>Uploaded: ${new Date(submission.timestamp).toLocaleString()}</p>
        `;
        editBtn.style.display = 'inline-block';
        deleteBtn.style.display = 'inline-block';
    } else {
        fileInfo.innerHTML = '<p>No file uploaded</p>';
        editBtn.style.display = 'none';
        deleteBtn.style.display = 'none';
    }
}

function updateTopicCard(languageId, topicId, status) {
    const card = document.querySelector(
        `.topic-card[data-language-id="${languageId}"][data-topic-id="${topicId}"]`
    );
    
    if (card) {
        card.className = `topic-card ${status}`;
        card.querySelector('p').textContent = `Status: ${status.replace('_', ' ')}`;
    }
}

function updateLanguageProgress(languageId) {
    const language = programmingLanguages.find(l => l.id === languageId);
    const completedTopics = language.topics.filter(t => t.status === 'completed').length;
    const progress = (completedTopics / language.topics.length) * 100;

    const languageCard = document.querySelector(`.language-card[data-language-id="${languageId}"]`);
    if (languageCard) {
        const progressText = languageCard.querySelector('.language-progress span');
        const progressBar = languageCard.querySelector('.progress-fill');
        
        progressText.textContent = `${completedTopics}/${language.topics.length} topics completed`;
        progressBar.style.width = `${progress}%`;
    }
}

function logout() {
    localStorage.removeItem('currentUser');
    window.location.href = '../index.html';
}

// Update the CSS for question cards
function addQuestionStyles() {
    const style = document.createElement('style');
    style.textContent = `
        .question-card {
            background: #f8f9fa;
            border-radius: 8px;
            padding: 1rem;
            margin-bottom: 1rem;
            border-left: 4px solid #6c757d;
        }

        .question-card.completed {
            border-left-color: #28a745;
        }

        .question-card.pending {
            border-left-color: #ffc107;
        }

        .question-header {
            display: flex;
            justify-content: space-between;
            align-items: center;
            margin-bottom: 1rem;
        }

        .status-badge {
            padding: 0.25rem 0.5rem;
            border-radius: 4px;
            font-size: 0.875rem;
            text-transform: capitalize;
        }

        .question-card.completed .status-badge {
            background: #28a745;
            color: white;
        }

        .question-card.pending .status-badge {
            background: #ffc107;
            color: #212529;
        }

        .question-card.not_started .status-badge {
            background: #6c757d;
            color: white;
        }

        .question-submission {
            margin-top: 1rem;
            padding-top: 1rem;
            border-top: 1px solid #dee2e6;
        }

        .current-submission {
            margin-top: 1rem;
            padding: 0.5rem;
            background: white;
            border-radius: 4px;
            font-size: 0.875rem;
        }
    `;
    document.head.appendChild(style);
}