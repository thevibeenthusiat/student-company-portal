document.addEventListener('DOMContentLoaded', function() {
    const languagesContainer = document.querySelector('.programming-languages');
    
    // Render programming languages and student progress
    programming_languages.forEach(language => {
        const languageSection = document.createElement('div');
        languageSection.className = 'language-section';
        
        // Sort students by score for this language
        const sortedStudents = [...students].sort((a, b) => {
            const scoreA = a.progress[language.name]?.score || 0;
            const scoreB = b.progress[language.name]?.score || 0;
            return scoreB - scoreA;
        });

        languageSection.innerHTML = `
            <h2>${language.name}</h2>
            <div class="student-list">
                ${sortedStudents.map(student => `
                    <div class="student-card">
                        <img src="${student.profile_picture}" alt="${student.name}" class="student-profile-pic">
                        <div class="student-info">
                            <h3>${student.name}</h3>
                            <p>Score: <span class="student-score">${student.progress[language.name]?.score || 0}%</span></p>
                        </div>
                    </div>
                `).join('')}
            </div>
        `;
        
        languagesContainer.appendChild(languageSection);
    });
}); 