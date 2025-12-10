var quizScore = 0;
var answeredQuestions = 0;

// Cursor tracking functionality
document.addEventListener('mousemove', function(e) {
    const cursorBg = document.querySelector('.cursor-bg');
    const x = (e.clientX / window.innerWidth) * 100;
    const y = (e.clientY / window.innerHeight) * 100;
    
    cursorBg.style.setProperty('--mouse-x', x + '%');
    cursorBg.style.setProperty('--mouse-y', y + '%');
    

    // Change body background based on cursor position
    const hue = 120 + (x - 50) * 0.3; // Green hue with slight variation
    const saturation = 60 + (y - 50) * 0.2; // More saturated at bottom
    const lightness = 85 - (y - 50) * 0.2; // More green at bottom, whiter at top
    
    document.body.style.background = `linear-gradient(135deg, 
        hsl(${hue}, ${saturation}%, ${lightness}%), 
        hsl(${hue + 15}, ${saturation + 10}%, ${lightness - 5}%), 
        hsl(${hue + 5}, ${saturation + 20}%, ${lightness - 10}%))`;
});

function selectAnswer(element, questionNum, answer, isCorrect) {
    // Prevent re-answering the same question
    var questionElement = element.closest('.question');
    if (questionElement.classList.contains('answered')) {
        return;
    }

    // Mark question as answered
    questionElement.classList.add('answered');
    answeredQuestions++;

    // Remove previous selections in this question
    var options = questionElement.querySelectorAll('.options li');
    options.forEach(function(option) {
        option.style.pointerEvents = 'none';
    });

    // Add selected class to clicked option
    element.classList.add('selected');

    // Show correct/incorrect feedback
    if (isCorrect) {
        element.classList.add('correct');
        quizScore++;
        // Show explanation
        document.getElementById('answer' + questionNum).style.display = 'block';
    } else {
        element.classList.add('incorrect');
        // Show the correct answer
        var correctOption = questionElement.querySelector('.options li:nth-child(' + 
            (answer === 'a' ? '1' : answer === 'b' ? '2' : '3') + ')');
        if (correctOption) {
            correctOption.classList.add('correct');
        }
        // Show explanation
        document.getElementById('answer' + questionNum).style.display = 'block';
    }

    // Update score
    updateScore();

    // Show final result when all questions are answered
    if (answeredQuestions === 10) {
        setTimeout(function() {
            showFinalResult();
        }, 1000);
    }
}

function updateScore() {
    document.getElementById('score').textContent = 'Skor: ' + quizScore + '/10';
    
    // Add color coding based on score
    var scoreElement = document.getElementById('score');
    var percentage = (quizScore / 10) * 100;
    
    if (percentage >= 80) {
        scoreElement.style.background = 'linear-gradient(135deg, #4CAF50, #66BB6A)';
    } else if (percentage >= 60) {
        scoreElement.style.background = 'linear-gradient(135deg, #FF9800, #F57C00)';
    } else {
        scoreElement.style.background = 'linear-gradient(135deg, #F44336, #D32F2F)';
    }
}

function showFinalResult() {
    var percentage = (quizScore / 10) * 100;
    var message = '';
    var emoji = '';

    if (percentage >= 90) {
        message = 'Luar biasa! Anda sangat memahami tentang kelestarian hutan!';
        emoji = '🏆';
    } else if (percentage >= 80) {
        message = 'Bagus! Anda memiliki pemahaman yang baik tentang hutan!';
        emoji = '🌟';
    } else if (percentage >= 70) {
        message = 'Cukup baik! Terus belajar tentang kelestarian hutan!';
        emoji = '👍';
    } else if (percentage >= 60) {
        message = 'Perlu lebih banyak pembelajaran tentang kelestarian hutan!';
        emoji = '📚';
    } else {
        message = 'Jangan menyerah! Pelajari lebih banyak tentang hutan!';
        emoji = '💪';
    }

    alert(emoji + ' ' + message + '\n\nSkor Anda: ' + quizScore + '/10 (' + percentage + '%)');
}

function resetQuiz() {
    // Reset variables
    quizScore = 0;
    answeredQuestions = 0;

    // Reset all questions
    var questions = document.querySelectorAll('.question');
    questions.forEach(function(question) {
        question.classList.remove('answered');
        var options = question.querySelectorAll('.options li');
        options.forEach(function(option) {
            option.className = '';
            option.style.pointerEvents = 'auto';
        });

        var answer = question.querySelector('.answer');
        if (answer) {
            answer.style.display = 'none';
        }
    });

    // Reset score
    updateScore();
}

function showSection(sectionId) {
    // Hide all sections
    var sections = document.querySelectorAll('section');
    sections.forEach(function(section) {
        section.classList.remove('active');
    });

    // Remove active class from all nav links
    var navLinks = document.querySelectorAll('nav a');
    navLinks.forEach(function(link) {
        link.classList.remove('active');
    });

    // Show the selected section
    var selectedSection = document.getElementById(sectionId);
    if (selectedSection) {
        selectedSection.classList.add('active');
    }

    // Add active class to the clicked nav link
    var clickedLink = document.querySelector('nav a[onclick*="' + sectionId + '"]');
    if (clickedLink) {
        clickedLink.classList.add('active');
    }
}

// Show the first section by default
document.addEventListener('DOMContentLoaded', function() {
    showSection('pengantar');
    updateScore();
});
