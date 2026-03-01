const typingText = document.querySelector(".typing-text");
const inputField = document.querySelector(".input-field");

const mistakeSpan = document.querySelector(".mistake");
const wpmSpan = document.querySelector(".wpm");
const cpmSpan = document.querySelector(".cpm");
const timeSpan = document.querySelector(".time");
const restartBtn = document.querySelector(".restart");

let timer;
let maxTime = 60;
let timeLeft = maxTime;
let charIndex = 0;
let mistakes = 0;
let isTyping = false;

const paragraphs = [
  "Typing speed improves with consistent practice and focus.",
  "Frontend developers must write clean and readable code.",
  "Success in programming comes from building real projects."
];

function loadParagraph() {
  const random = paragraphs[Math.floor(Math.random()*paragraphs.length)];
  typingText.innerHTML = "";

  random.split("").forEach(char => {
    typingText.innerHTML += `<span>${char}</span>`;
  });

  typingText.querySelector("span").classList.add("active");

  inputField.value = "";
  clearInterval(timer);

  timeLeft = maxTime;
  charIndex = 0;
  mistakes = 0;
  isTyping = false;

  updateStats();
}

function startTimer(){
  timer = setInterval(()=>{
      if(timeLeft > 0){
          timeLeft--;

          let wpm = Math.round(
            ((charIndex - mistakes) / 5) /
            ((maxTime - timeLeft) / 60)
          );

          wpm = wpm < 0 || !wpm || wpm === Infinity ? 0 : wpm;

          timeSpan.textContent = timeLeft;
          wpmSpan.textContent = wpm;
          cpmSpan.textContent = charIndex - mistakes;

      }else{
          clearInterval(timer);
      }
  },1000);
}

function handleTyping(){
  const characters = typingText.querySelectorAll("span");
  const typedChar = inputField.value.charAt(charIndex);

  if(!isTyping){
      startTimer();
      isTyping = true;
  }

  if(charIndex < characters.length){

      if(typedChar === characters[charIndex].textContent){
          characters[charIndex].classList.add("correct");
      }else{
          characters[charIndex].classList.add("wrong");
          mistakes++;
      }

      characters[charIndex].classList.remove("active");
      charIndex++;

      if(characters[charIndex]){
          characters[charIndex].classList.add("active");
      }

      updateStats();
  }
}

function updateStats(){
  mistakeSpan.textContent = mistakes;
  timeSpan.textContent = timeLeft;
}

restartBtn.addEventListener("click", loadParagraph);
inputField.addEventListener("input", handleTyping);

document.addEventListener("keydown", () => inputField.focus());

loadParagraph();