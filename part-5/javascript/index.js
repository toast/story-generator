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
  const planetEarth = document.querySelector('.planet-earth');
  const scene1Foreground = document.querySelector('.scene--1 .scene__foreground');
  const scene2 = document.querySelector('.scene--2');
  const walkingPerson = document.querySelector('.walking-person');
  const timeline = new TimelineMax();

  scene1Foreground.addEventListener('click', function(event){
    timeline.to(planetEarth, 0.5, {
        scale: 0,
        autoAlpha: 0,
        ease: Power4.easeIn
    });
    timeline.to(walkingPerson, 0.5, {
        y: -100,
        ease: Power4.easeOut
    }, '-=0.1');
    scene2.classList.add('scene--current');
    speakLine(0);
    event.preventDefault();
  });

  let currentWalkingX = 0;
  window.addEventListener('keyup', function(event){
    const leftArrowKey = 37;
    const rightArrowKey = 39;

    if(event.keyCode === leftArrowKey){
      currentWalkingX = currentWalkingX - 100;
      timeline.to(walkingPerson, 0.5, {
          x: currentWalkingX,
          ease: Power4.easeOut
      });
    }

    if(event.keyCode === rightArrowKey){
      currentWalkingX = currentWalkingX + 100;
      timeline.to(walkingPerson, 0.5, {
        x: currentWalkingX,
        ease: Power4.easeOut
      });
    }
  });

  document.querySelector('.play').addEventListener('click', function(event){
    event.preventDefault();
    speakLine(0);
  });
});