let currentQuestion = 0;
let score = 0;
let quizCompleted = false;

function loadQuestion() {
  const questionContainer = document.getElementById('quiz');
  const question = questions[currentQuestion];

  if (!question) {
    showResult();
    return;
  }

  const options = question.options.map(option => `<input type="radio" name="question${currentQuestion}" value="${option}">${option}<br>`);
  questionContainer.innerHTML = `
    <div class="question">${question.question}</div>
    ${options.join('')}
  `;
}

function submitQuiz() {
  if (quizCompleted) {
    return;
  }

  // Check if the current question has options
  const hasOptions = questions[currentQuestion].options.length > 0;

  // If there are options, check if an option is selected
  if (hasOptions) {
    const selectedOption = document.querySelector(`input[name="question${currentQuestion}"]:checked`);
    if (!selectedOption) {
      alert("Please select an option.");
      return;
    }

    if (selectedOption.value === questions[currentQuestion].answer) {
      score++;
    }
  }

  if (currentQuestion === questions.length - 1) {
    // Last question, show result
    showResult();
  } else {
    currentQuestion++;
    loadQuestion();
  }
}

function showResult() {
  const quizDiv = document.getElementById('quiz');
  quizDiv.innerHTML = '';
  
  const resultDiv = document.getElementById('result');
  resultDiv.classList.remove('hidden');
  resultDiv.innerHTML = `<h2>Your Score: ${score} out of ${questions.length}</h2>`;
  
  // Hide the submit button
  document.getElementById('submitDiv').style.display = 'none';

  // Remove the container
  const containerDiv = document.querySelector('.container');
  containerDiv.style.display = 'none';

  // Hide the previous and next buttons
  document.getElementById('prevBtn').style.display = 'none';
  document.getElementById('nextBtn').style.display = 'none';
  
  quizCompleted = true;
}



function nextQuestion() {
  if (quizCompleted) {
    return;
  }

  currentQuestion++;
  loadQuestion();
}

function prevQuestion() {
  if (currentQuestion > 0) {
    currentQuestion--;
    loadQuestion();
  }
}

loadQuestion();
