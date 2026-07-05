const totalScoreDisplay = document.getElementById('totalScore');
const progressBar = document.getElementById('progressBar');
const dragItems = document.querySelectorAll('.drag-item');
const dropZones = document.querySelectorAll('.drop-zone');
const checkDragBtn = document.getElementById('checkDragBtn');
const dragStatus = document.getElementById('dragStatus');
const matchWordsEl = document.getElementById('matchWords');
const matchEmojisEl = document.getElementById('matchEmojis');
const matchStatus = document.getElementById('matchStatus');
const startQuizBtn = document.getElementById('startQuizBtn');
const nextQuizBtn = document.getElementById('nextQuizBtn');
const quizCounter = document.getElementById('quizCounter');
const quizScore = document.getElementById('quizScore');
const quizQuestion = document.getElementById('quizQuestion');
const quizChoices = document.getElementById('quizChoices');
const quizFeedback = document.getElementById('quizFeedback');
const sentenceInput = document.getElementById('sentenceInput');
const checkSentenceBtn = document.getElementById('checkSentenceBtn');
const sentenceStatus = document.getElementById('sentenceStatus');
const confettiContainer = document.getElementById('confettiContainer');
const welcomeScreen = document.getElementById('welcomeScreen');
const noteScreen = document.getElementById('noteScreen');
const readNoteBtn = document.getElementById('readNoteBtn');
const playGameBtn = document.getElementById('playGameBtn');
const backMenuBtn = document.getElementById('backMenuBtn');
const headerCard = document.querySelector('header.hero-card');
const mainGrid = document.querySelector('main.main-grid');
const section4 = document.getElementById('section4');
const section5 = document.getElementById('section5');
const toMatchBtn = document.getElementById('toMatchBtn');
const section2PrevBtn = document.getElementById('section2PrevBtn');
const section2MenuBtn = document.getElementById('section2MenuBtn');
const section3PrevBtn = document.getElementById('section3PrevBtn');
const section3MenuBtn = document.getElementById('section3MenuBtn');
const section4PrevBtn = document.getElementById('section4PrevBtn');
const section4MenuBtn = document.getElementById('section4MenuBtn');
const section5PrevBtn = document.getElementById('section5PrevBtn');
const section5MenuBtn = document.getElementById('section5MenuBtn');
const openWorksheetBtnHeader = document.getElementById('openWorksheetBtn_header');
const worksheetMenuBtn = document.getElementById('worksheetMenuBtn');
const worksheetQuizBtn = document.getElementById('worksheetQuizBtn');
const worksheetPrintBtn = document.getElementById('worksheetPrintBtn');
const checkWorksheetBtn = document.getElementById('checkWorksheetBtn');
const worksheetStatus = document.getElementById('worksheetStatus');
const toQuizBtn = document.getElementById('toQuizBtn');
const toSentenceBtn = document.getElementById('toSentenceBtn');
const finishBtn = document.getElementById('finishBtn');
const finalScoreDisplay = document.getElementById('finalScoreDisplay');
const finalSummaryText = document.getElementById('finalSummaryText');
const summaryMenuBtn = document.getElementById('summaryMenuBtn');

const MAX_TOTAL_SCORE = 100;
const QUIZ_MAX_TOTAL = 40;
const SECTION_COMPLETE_SCORE = 20;

let totalScore = 0;
let completedSections = new Set();
let sectionScores = { drag: 0, match: 0, quiz: 0, sentence: 0 };
let draggedWord = null;
let matchState = { first: null, second: null, pairs: 0 };
let touchSelectedWord = null;
let touchSelectedItem = null;

function isTouchDevice() {
  return window.matchMedia('(pointer: coarse)').matches || 'ontouchstart' in window || navigator.maxTouchPoints > 0;
}

const quizQuestions = [
  {
    question: '1. Nama kategori jaku adjektif ti nerangka asai utai pakai?',
    choices: ['Jaku Adjektif Gaya', 'Jaku Adjektif Emosyen', 'Jaku Adjektif Asai', 'Jaku Kerja'],
    answer: 'Jaku Adjektif Asai'
  },
  {
    question: '2. Jaku adjektif “gaga” lebih semak diengkah dalam kategori…',
    choices: ['Asai, laban iya ulih diasai', 'Emosyen, laban iya nerangka pengasai ati', 'Gaya, laban iya nerangka jalai ngereja utai', 'Nama, laban iya nama orang'],
    answer: 'Emosyen, laban iya nerangka pengasai ati'
  },
  {
    question: '3. Utai ti pemadu beguna dalam Jaku Adjektif iya nya…',
    choices: ['Jaku ti nerangka nama, gaya tauka emosyen', 'Jaku ti nerangka pengawa', 'Jaku ti nyebut nama orang tauka endur', 'Jaku ti nanya tanya'],
    answer: 'Jaku ti nerangka nama, gaya tauka emosyen'
  },
  {
    question: '4. Enti leka jaku nerangka jalai tauka gaya orang ngereja pengawa, leka jaku nya masuk dalam kategori…',
    choices: ['Jaku Adjektif Gaya', 'Jaku Adjektif Asai', 'Jaku Adjektif Emosyen', 'Jaku Nama'],
    answer: 'Jaku Adjektif Gaya'
  },
  {
    question: '5. Antara ti bisi ba baruh tu, ni ukai kategori Jaku Adjektif ?',
    choices: ['Jaku Adjektif Asai', 'Jaku Adjektif Emosyen', 'Jaku Adjektif Gaya', 'Jaku Adjektif Pengawa'],
    answer: 'Jaku Adjektif Pengawa'
  },
  {
    question: '6. Enti nembiak milih “pedas” sebagi ari Jaku Adjektif Emosyen, saut sida nya…',
    choices: ['Betul, laban pedas ulih ngasuh orang nganu', 'Betul, laban pedas ngembuan perisa', 'Salah, laban pedas nerangka asai', 'Salah, laban pedas nerangka gaya'],
    answer: 'Salah, laban pedas nerangka asai'
  },
  {
    question: '7. “Manah” dikena nerangka gaya utai ti nyadi. nyadi, iya lebih dalam kategori…',
    choices: ['Jaku Adjektif Asai', 'Jaku Adjektif Gaya', 'Jaku Adjektif Emosyen', 'Jaku Kerja'],
    answer: 'Jaku Adjektif Gaya'
  },
  {
    question: '8. Ni tanya ti paling betul dikena nguji pemereti definisi Jaku Adjektif?',
    choices: ['Sapa nama nuan?', 'Nama tiga kategori Jaku Adjektif?', 'Ni pemakai nuan saritu?', 'Kini nuan?'],
    answer: 'Nama tiga kategori Jaku Adjektif?'
  },
  {
    question: '9. Jaku Adjektif Asai dikena nerangka asai pemakai.',
    choices: ['Betul', 'Salah'],
    answer: 'Betul'
  },
  {
    question: '10. Jaku Adjektif Emosyen dikena nerangka pengawa orang.',
    choices: ['Betul', 'Salah'],
    answer: 'Salah'
  },
  {
    question: '11. “gaga” enggau “lelengau” dua-dua ulih dikategori dalam Jaku Adjektif Emosyen.',
    choices: ['Betul', 'Salah'],
    answer: 'Betul'
  },
  {
    question: '12. Jaku Adjektif Gaya semina dikena nerangka pengasai ati.',
    choices: ['Betul', 'Salah'],
    answer: 'Salah'
  },
  {
    question: '13. Semua leka jaku dalam ayat mesti nyadi Jaku Adjektif.',
    choices: ['Betul', 'Salah'],
    answer: 'Salah'
  },
  {
    question: '14. Ni penerang ti betul pasal Jaku Adjektif Emosyen?',
    choices: ['Jaku ti nerangka rasa makanan', 'Jaku ti nerangka pengasai ati', 'Jaku ti nerangka nama tempat', 'Jaku ti nerangka pengawa'],
    answer: 'Jaku ti nerangka pengasai ati'
  },
  {
    question: '15. Ni penerang ti betul pasal Jaku Adjektif Gaya?',
    choices: ['Jaku ti nerangka gaya utai', 'Jaku ti nerangka asai masin enggau manis', 'Jaku ti nerangka ati gaga enggau tusah', 'Jaku ti nyebut nama orang'],
    answer: 'Jaku ti nerangka gaya utai'
  },
  {
    question: '16. Enti leka jaku nya ulih nerangka “asai ba dilah”, kategori ti patut dipilih iya nya…',
    choices: ['Emosyen', 'Gaya', 'Asai', 'Jaku Nama'],
    answer: 'Asai'
  },
  {
    question: '17. Antara tu, ni tipak kategori enggau fungsyen ti salah?',
    choices: ['Asai – nerangka asai pemakai', 'Emosyen – nerangka pengasai ati', 'Gaya – nerangka gaya utai', 'Emosyen – nerangka asai masin'],
    answer: 'Emosyen – nerangka asai masin'
  },
  {
    question: '18. Nama tiga kategori Jaku Adjektif dalam aplikasi tu iya nya…',
    choices: ['Asai, Emosyen enggau Gaya', 'Nama, Kerja enggau Tanya', 'Orang, Tempat enggau Utai', 'Manah, Jai enggau Besai'],
    answer: 'Asai, Emosyen enggau Gaya'
  }
];

const matchPairs = [
  { word: 'buah manis', image: '🍎' },
  { word: 'tusah ati', image: '💔' },
  { word: 'gaga', image: '😂' },
  { word: 'pedas', image: '🌶️' },
  { word: 'berani', image: '💪' }
];

const sentenceWords = ['nyamai', 'gaga', 'manah', 'rindu', 'pedas'];

function playSound(type) {
  try {
    const ctx = new (window.AudioContext || window.webkitAudioContext)();
    const oscillator = ctx.createOscillator();
    const gain = ctx.createGain();
    oscillator.type = type === 'correct' ? 'triangle' : 'square';
    oscillator.frequency.value = type === 'correct' ? 720 : 280;
    gain.gain.value = 0.12;
    oscillator.connect(gain);
    gain.connect(ctx.destination);
    oscillator.start();
    oscillator.stop(ctx.currentTime + 0.12);
  } catch (err) {
    console.warn('Audio unavailable', err);
  }
}

function updateScore(points) {
  totalScore = Math.min(MAX_TOTAL_SCORE, Math.max(0, totalScore + points));
  totalScoreDisplay.textContent = totalScore;
}

function setSectionScore(section, score) {
  const previous = sectionScores[section] || 0;
  const delta = score - previous;
  if (delta !== 0) {
    sectionScores[section] = score;
    updateScore(delta);
  }
}

function updateProgress() {
  const percent = (completedSections.size / 5) * 100;
  progressBar.style.width = `${percent}%`;
}

function addSectionComplete(id) {
  if (!completedSections.has(id)) {
    completedSections.add(id);
    updateProgress();
  }
}

function resetSelectedDragItem() {
  if (touchSelectedItem) {
    touchSelectedItem.classList.remove('selected');
  }
  touchSelectedItem = null;
  touchSelectedWord = null;
}

function moveWordToZone(word, zone) {
  const item = document.querySelector(`.drag-item[data-word="${word}"]`);
  if (!item) return false;
  if (zone.querySelector(`[data-word="${word}"]`)) return false;
  zone.appendChild(item);
  return true;
}

function moveWordBackToList(item) {
  const list = document.querySelector('.draggable-list');
  if (!list) return;
  if (list.contains(item)) return;
  list.appendChild(item);
}

function initializeDragItems() {
  dragItems.forEach(item => {
    item.addEventListener('dragstart', event => {
      draggedWord = event.target.dataset.word;
      event.dataTransfer.setData('text/plain', draggedWord);
    });

    if (isTouchDevice()) {
      item.addEventListener('click', event => {
        event.preventDefault();
        const itemInZone = item.closest('.drop-zone');

        if (itemInZone) {
          moveWordBackToList(item);
          resetSelectedDragItem();
          dragStatus.textContent = 'Perkataan dipindah semula ke senarai.';
          dragStatus.style.color = '#5f5f7b';
          return;
        }

        if (touchSelectedItem && touchSelectedItem !== item) {
          touchSelectedItem.classList.remove('selected');
        }

        if (touchSelectedItem === item) {
          resetSelectedDragItem();
          return;
        }

        touchSelectedItem = item;
        touchSelectedWord = item.dataset.word;
        item.classList.add('selected');
        dragStatus.textContent = 'Tekan kotak kategori untuk letak perkataan.';
        dragStatus.style.color = '#2f6fb7';
      });
    }
  });

  dropZones.forEach(zone => {
    zone.addEventListener('dragover', event => {
      event.preventDefault();
      zone.classList.add('drag-over');
    });
    zone.addEventListener('dragleave', () => {
      zone.classList.remove('drag-over');
    });
    zone.addEventListener('drop', event => {
      event.preventDefault();
      zone.classList.remove('drag-over');
      const word = event.dataTransfer.getData('text/plain');
      const item = document.querySelector(`.drag-item[data-word="${word}"]`);
      if (item && !zone.querySelector(`[data-word="${word}"]`)) {
        zone.appendChild(item);
      }
    });

    if (isTouchDevice()) {
      zone.addEventListener('click', event => {
        if (!touchSelectedWord || event.target.closest('.drag-item')) return;
        if (moveWordToZone(touchSelectedWord, zone)) {
          const zoneTitle = zone.querySelector('h3');
          dragStatus.textContent = `Perkataan dimasukkan ke ${zoneTitle ? zoneTitle.textContent : 'kategori'}.`;
          dragStatus.style.color = '#288b3f';
        }
        resetSelectedDragItem();
      });
    }
  });
}

function checkDragAnswers() {
  const correct = {
    nyamai: 'asai',
    masin: 'asai',
    masam: 'asai',
    pedas: 'asai',
    lelengau: 'emosyen',
    gaga: 'emosyen',
    laun: 'gaya',
    berani: 'gaya',
    manah: 'gaya'
  };
  let score = 0;
  let total = 0;
  dragItems.forEach(item => {
    total += 1;
    const parent = item.closest('.drop-zone');
    const expected = correct[item.dataset.word] || '';
    if (parent && parent.dataset.category === expected) {
      score += 1;
      item.style.opacity = '0.7';
      item.style.transform = 'scale(0.98)';
    } else {
      item.style.opacity = '1';
      item.style.transform = 'scale(1)';
    }
  });
  if (score === total) {
    dragStatus.textContent = 'Lati! Semua saut betul 🎉';
    dragStatus.style.color = '#288b3f';
    addSectionComplete('drag');
    setSectionScore('drag', SECTION_COMPLETE_SCORE);
    if (toMatchBtn) toMatchBtn.disabled = false;
    burstConfetti();
    playSound('correct');
  } else {
    dragStatus.textContent = `Nguji baru! Betul ${score} dari ${total}`;
    dragStatus.style.color = '#b82b2b';
    playSound('wrong');
  }
}

function createMatchGame() {
  const shuffledWords = [...matchPairs].sort(() => Math.random() - 0.5);
  const shuffledImages = [...matchPairs].sort(() => Math.random() - 0.5);
  matchWordsEl.innerHTML = '';
  matchEmojisEl.innerHTML = '';
  shuffledWords.forEach(item => {
    const card = document.createElement('div');
    card.className = 'match-card';
    card.textContent = item.word;
    card.dataset.type = 'word';
    card.dataset.answer = item.image;
    card.addEventListener('click', () => handleMatchClick(card));
    matchWordsEl.appendChild(card);
  });
  shuffledImages.forEach(item => {
    const card = document.createElement('div');
    card.className = 'match-card match-image-card';
    if (/\.(png|jpe?g|gif|svg)$|^(https?:\/\/|data:)/i.test(item.image)) {
      const img = document.createElement('img');
      img.src = item.image;
      img.alt = item.word;
      card.appendChild(img);
    } else {
      card.textContent = item.image;
      card.style.fontSize = '2.5rem';
    }
    card.dataset.type = 'image';
    card.dataset.answer = item.word;
    card.addEventListener('click', () => handleMatchClick(card));
    matchEmojisEl.appendChild(card);
  });
}

function handleMatchClick(card) {
  if (card.classList.contains('correct')) return;
  if (!matchState.first) {
    matchState.first = card;
    card.classList.add('selected');
    return;
  }
  if (matchState.first === card) return;
  matchState.second = card;
  card.classList.add('selected');
  const first = matchState.first;
  const second = matchState.second;
  if (first.dataset.answer === second.textContent || second.dataset.answer === first.textContent) {
    first.classList.add('correct');
    second.classList.add('correct');
    matchState.pairs += 1;
    matchStatus.textContent = `Manah! ${matchState.pairs} tipak ti betul.`;
    playSound('correct');
    burstConfetti();
    if (matchState.pairs === matchPairs.length) {
      matchStatus.textContent = 'Udah Tembu! Manah 🎉';
      addSectionComplete('match');
      setSectionScore('match', SECTION_COMPLETE_SCORE);
      if (toQuizBtn) toQuizBtn.disabled = false;
    }
  } else {
    matchStatus.textContent = 'Salah, uji baru!';
    playSound('wrong');
    setTimeout(() => {
      first.classList.remove('selected');
      second.classList.remove('selected');
    }, 700);
  }
  matchState.first = null;
  matchState.second = null;
}

let currentQuizIndex = 0;
let quizPoints = 0;
let quizAnswered = false;
let quizStarted = false;

function startQuiz() {
  if (quizStarted) return;
  quizStarted = true;
  currentQuizIndex = 0;
  quizPoints = 0;
  quizAnswered = false;
  renderQuizQuestion();
  nextQuizBtn.disabled = true;
  if (toSentenceBtn) toSentenceBtn.disabled = true;
  quizFeedback.textContent = '';
}

function renderQuizQuestion() {
  const current = quizQuestions[currentQuizIndex];
  quizCounter.textContent = `Question ${currentQuizIndex + 1} / ${quizQuestions.length}`;
  quizScore.textContent = `Score: ${quizPoints}`;
  quizQuestion.textContent = current.question;
  quizChoices.innerHTML = '';
  current.choices.forEach(choice => {
    const button = document.createElement('button');
    button.className = 'choice-btn';
    button.textContent = choice;
    button.addEventListener('click', () => selectAnswer(button, choice));
    quizChoices.appendChild(button);
  });
}

function selectAnswer(button, choice) {
  if (quizAnswered) return;
  quizAnswered = true;
  const current = quizQuestions[currentQuizIndex];
  const buttons = quizChoices.querySelectorAll('.choice-btn');
  buttons.forEach(btn => btn.disabled = true);
  if (choice === current.answer) {
    button.classList.add('correct');
    quizFeedback.textContent = 'Betul! Lati 🎉';
    quizPoints += 10;
    playSound('correct');
    burstConfetti();
  } else {
    button.classList.add('wrong');
    quizFeedback.textContent = `Salah. Saut ti betul iya nya ${current.answer}.`;
    playSound('wrong');
  }
  quizScore.textContent = `Score: ${quizPoints}`;
  nextQuizBtn.disabled = false;
  if (currentQuizIndex === quizQuestions.length - 1) {
    nextQuizBtn.textContent = 'Ambih';
  } else {
    nextQuizBtn.textContent = 'Next';
  }
}

function nextQuiz() {
  if (!quizAnswered) return;
  currentQuizIndex += 1;
  quizAnswered = false;
  if (currentQuizIndex >= quizQuestions.length) {
    quizQuestion.textContent = 'Kuiz udah tembu! Tahniah.';
    quizChoices.innerHTML = '';
    quizFeedback.textContent = `Skor kepenudi: ${quizPoints} / ${quizQuestions.length * 10}`;
    addSectionComplete('quiz');
    const normalizedQuizScore = Math.round((quizPoints / (quizQuestions.length * 10)) * QUIZ_MAX_TOTAL);
    setSectionScore('quiz', normalizedQuizScore);
    if (quizPoints >= 70) burstConfetti();
    nextQuizBtn.disabled = true;
    if (toSentenceBtn) toSentenceBtn.disabled = false;
    return;
  }
  renderQuizQuestion();
  quizFeedback.textContent = '';
  nextQuizBtn.disabled = true;
}

function checkSentence() {
  const text = sentenceInput.value.trim().toLowerCase();
  if (text.length < 12) {
    sentenceStatus.textContent = 'Tulis ayat panjai agi.';
    sentenceStatus.style.color = '#c51f1f';
    playSound('wrong');
    return;
  }
  const foundWords = sentenceWords.filter(word => text.includes(word));
  if (foundWords.length >= 2) {
    sentenceStatus.textContent = `Manah! Ayat bisi ngembuan: ${foundWords.join(', ')}.`;
    sentenceStatus.style.color = '#1e6d34';
    addSectionComplete('sentence');
    setSectionScore('sentence', SECTION_COMPLETE_SCORE);
    if (finishBtn) finishBtn.disabled = false;
    burstConfetti();
    playSound('correct');
  } else {
    sentenceStatus.textContent = 'Uji baju ngena leka jaku nyamai, gaga, manah.';
    sentenceStatus.style.color = '#b82b2b';
    playSound('wrong');
  }
}

function revealApp() {
  welcomeScreen.classList.add('hidden');
  headerCard.classList.remove('hidden');
  mainGrid.classList.remove('hidden');
}

function openNotes() {
  welcomeScreen.classList.add('hidden');
  noteScreen.classList.remove('hidden');
  headerCard.classList.add('hidden');
  mainGrid.classList.add('hidden');
}

function backToMenu() {
  if (noteScreen) noteScreen.classList.add('hidden');
  if (welcomeScreen) welcomeScreen.classList.remove('hidden');
  if (headerCard) headerCard.classList.add('hidden');
  if (mainGrid) mainGrid.classList.add('hidden');
  const pages = document.querySelectorAll('.game-page');
  pages.forEach(page => page.classList.add('hidden'));
}

function showGamePage(id) {
  const pages = document.querySelectorAll('.game-page');
  pages.forEach(page => page.classList.add('hidden'));
  const target = document.getElementById(id);
  if (target) {
    target.classList.remove('hidden');
    if (id === 'section4' && !quizStarted) {
      startQuiz();
    }
  }
}

function showSummaryPage() {
  if (finalScoreDisplay) finalScoreDisplay.textContent = totalScore;
  if (finalSummaryText) {
    finalSummaryText.textContent = totalScore >= 80
      ? 'Tahniah! Skor nuan badas.'
      : 'Uji baru ngambika nuan nyulut agi!';
  }
  showGamePage('sectionSummary');
}

function openWorksheet() {
  if (noteScreen) noteScreen.classList.add('hidden');
  revealApp();
  showGamePage('sectionWorksheet');
}

function checkWorksheetAnswers() {
  const answers = {
    q1: 'asai',
    q2: 'emosyen',
    q3: 'gaya',
    q4: 'gaya',
    q5: 'asai',
    q6: 'emosyen',
    q7: 'gaya',
    q8: 'asai',
    q9: 'nyamai',
    q10: 'gaga',
    q11: 'manah',
    q12: 'berani',
    q13: 'gaga',
    q14: 'nyamai',
    q15: 'pedas'
  };
  let correctCount = 0;
  let totalCount = Object.keys(answers).length;

  Object.entries(answers).forEach(([key, value]) => {
    const input = document.querySelector(`[data-key="${key}"]`);
    if (input) {
      const answer = input.value.trim().toLowerCase();
      if (answer === value.toLowerCase()) correctCount += 1;
    }
  });

  const scoreMessage = `Betul ${correctCount} dari ${totalCount} jawapan dikira.`;
  if (worksheetStatus) {
    worksheetStatus.textContent = correctCount === totalCount ? `Semua betul! ${scoreMessage}` : scoreMessage;
    worksheetStatus.style.color = correctCount === totalCount ? '#1e6d34' : '#c51f1f';
  }
}

function resetNavigationButtons() {
  if (toMatchBtn) toMatchBtn.disabled = true;
  if (toQuizBtn) toQuizBtn.disabled = true;
  if (toSentenceBtn) toSentenceBtn.disabled = true;
  if (finishBtn) finishBtn.disabled = true;
}

function playGameNow() {
  resetNavigationButtons();
  revealApp();
  showGamePage('section2');
}

function burstConfetti() {
  for (let i = 0; i < 22; i += 1) {
    const piece = document.createElement('span');
    piece.className = 'confetti-piece';
    piece.style.background = ['#ff7eb9', '#7be0ff', '#fff17a', '#7dffb4', '#c88cff'][Math.floor(Math.random() * 5)];
    piece.style.left = `${Math.random() * 100}%`;
    piece.style.setProperty('--tx', `${Math.random() * 80 - 40}vw`);
    piece.style.animationDelay = `${Math.random() * 0.2}s`;
    confettiContainer.appendChild(piece);
    setTimeout(() => piece.remove(), 1400);
  }
}

if (checkDragBtn) checkDragBtn.addEventListener('click', checkDragAnswers);
if (toMatchBtn) toMatchBtn.addEventListener('click', () => showGamePage('section3'));
if (toQuizBtn) toQuizBtn.addEventListener('click', () => showGamePage('section4'));
if (toSentenceBtn) toSentenceBtn.addEventListener('click', () => showGamePage('section5'));
if (section2PrevBtn) section2PrevBtn.addEventListener('click', backToMenu);
if (section2MenuBtn) section2MenuBtn.addEventListener('click', backToMenu);
if (section3PrevBtn) section3PrevBtn.addEventListener('click', () => showGamePage('section2'));
if (section3MenuBtn) section3MenuBtn.addEventListener('click', backToMenu);
if (section4PrevBtn) section4PrevBtn.addEventListener('click', () => showGamePage('section3'));
if (section4MenuBtn) section4MenuBtn.addEventListener('click', backToMenu);
if (section5PrevBtn) section5PrevBtn.addEventListener('click', () => showGamePage('section4'));
if (section5MenuBtn) section5MenuBtn.addEventListener('click', backToMenu);
if (finishBtn) finishBtn.addEventListener('click', showSummaryPage);
if (summaryMenuBtn) summaryMenuBtn.addEventListener('click', backToMenu);
if (startQuizBtn) startQuizBtn.addEventListener('click', startQuiz);
if (nextQuizBtn) nextQuizBtn.addEventListener('click', nextQuiz);
if (checkSentenceBtn) checkSentenceBtn.addEventListener('click', checkSentence);
if (readNoteBtn) readNoteBtn.addEventListener('click', openNotes);
if (playGameBtn) playGameBtn.addEventListener('click', playGameNow);
if (openWorksheetBtnHeader) openWorksheetBtnHeader.addEventListener('click', openWorksheet);
if (checkWorksheetBtn) checkWorksheetBtn.addEventListener('click', checkWorksheetAnswers);
if (worksheetPrintBtn) worksheetPrintBtn.addEventListener('click', () => window.print());
if (worksheetQuizBtn) worksheetQuizBtn.addEventListener('click', () => showGamePage('section2'));
if (backMenuBtn) backMenuBtn.addEventListener('click', backToMenu);
if (worksheetMenuBtn) worksheetMenuBtn.addEventListener('click', backToMenu);

window.addEventListener('load', () => {
  initializeDragItems();
  createMatchGame();
  updateProgress();
});
