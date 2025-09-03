let allQuestions = []; // سيتم تحميلها من questions.json
let currentIndex = 0;
let selectedQuestions = [];
let score = 0;
let timer;

async function loadQuestions() {
  const response = await fetch('data/questions.json');
  allQuestions = await response.json();

  const params = new URLSearchParams(window.location.search);
  const tech = params.get('tech') || 'ALL';
  const level = params.get('level') || 'random';
  const count = 10; // عدد الأسئلة الافتراضي

  selectedQuestions = getRandomQuestions(allQuestions, tech, level, count);
  showQuestion();
}

function getRandomQuestions(allQ, tech, level, count) {
  let filtered = allQ.filter(q => (tech === 'ALL' || tech.includes(q.topic)) &&
                                  (level === 'random' || q.level === level));
  return shuffle(filtered).slice(0, count);
}

function showQuestion() {
  if(currentIndex >= selectedQuestions.length){
    window.location.href = 'result.html';
    return;
  }
  const q = selectedQuestions[currentIndex];
  document.getElementById('question-text').innerText = q.question;
  const optionsContainer = document.getElementById('options-container');
  optionsContainer.innerHTML = '';
  q.options.forEach(opt => {
    const btn = document.createElement('button');
    btn.innerText = opt;
    btn.addEventListener('click', () => checkAnswer(opt, q.answer));
    optionsContainer.appendChild(btn);
  });
}

function checkAnswer(selected, correct){
  if(selected === correct) score++;
  currentIndex++;
  showQuestion();
}

function shuffle(array){return array.sort(()=>Math.random()-0.5);}
window.onload = loadQuestions;