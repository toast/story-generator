const synthesizer = window.speechSynthesis;
const narration = document.querySelectorAll('.narration li');
window.utterances = [];
const speakLine = function(lineIndex){
  if(lineIndex !== 0){
    narration[lineIndex-1].style.display = 'none';
  }
  narration[lineIndex].style.display = 'block';
  let currentLineText = narration[lineIndex].textContent;
  let currentUtterance = new SpeechSynthesisUtterance(currentLineText);
  currentUtterance.onend = function(event) {
    if(lineIndex < narration.length-1){
      speakLine(lineIndex+1);
    }
  };
  window.utterances.push(currentUtterance);
  synthesizer.speak(currentUtterance);
};

document.addEventListener('DOMContentLoaded', function(){
  document.querySelector('.play').addEventListener('click', function(event){
    event.preventDefault();
    speakLine(0);
  });
});