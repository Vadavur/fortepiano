
// add notes/letters changing 
//--------------------------------------------------------------------------------

const LETTER_BUTTON = document.querySelector('.btn-letters');
const NOTES_BUTTON = document.querySelector('.btn-notes');

LETTER_BUTTON.addEventListener('mousedown', changeToLetters);
NOTES_BUTTON.addEventListener('mousedown', changeToNotes);

function changeToLetters() {
  for (i of PIANO_KEY) {
    i.classList.add('letter');
  };
  NOTES_BUTTON.classList.remove('btn-active');
  LETTER_BUTTON.classList.add('btn-active');
}

function changeToNotes() {
  for (i of PIANO_KEY) {
    i.classList.remove('letter');
  };
  LETTER_BUTTON.classList.remove('btn-active');
  NOTES_BUTTON.classList.add('btn-active');
}

//  takes note's name and plays it
//--------------------------------------------------------------------------------

function playNote(note) {
  const audio = new Audio();
  audio.src = `assets/audio/${note}.mp3`;
  audio.currentTime = 0;
  audio.play();
}

// mouse to piano interactions
//--------------------------------------------------------------------------------

const PIANO = document.querySelector('.piano');
const PIANO_KEY = document.querySelectorAll('.piano-key');

const mouseDown = function(event){
  if(event.target.classList.contains('piano-key')) {
    playNote(event.target.dataset.note);
    event.target.classList.add('piano-key-active', 'piano-key-active-pseudo', 'mouse-downed');
    PIANO.addEventListener('mouseover', mouseOver);
  }
}

const mouseOver = function (event){
  if(event.target.classList.contains('piano-key')) {
    playNote(event.target.dataset.note);
    event.target.classList.add('piano-key-active', 'piano-key-active-pseudo', 'mouse-downed');
  } 
}

const mouseUp = function(event){
  PIANO.removeEventListener('mouseover', mouseOver);
  event.target.classList.remove('mouse-downed');
  if(!(event.target.classList.contains('key-downed'))){
    event.target.classList.remove('piano-key-active', 'piano-key-active-pseudo');
  }
}

const mouseOut = function(event){
  if(event.target.classList.contains('piano-key')) {
    event.target.classList.remove('mouse-downed');
    if(!(event.target.classList.contains('key-downed'))){
      event.target.classList.remove('piano-key-active', 'piano-key-active-pseudo');
    }
  }
}

PIANO.addEventListener('mouseout', mouseOut);
PIANO.addEventListener('mousedown', mouseDown);
window.addEventListener('mouseup', mouseUp);

// mouseUp action in case it happens somewhere out of the tab window
window.addEventListener('blur', (event) => {
    PIANO.removeEventListener('mouseover', mouseOver);
  }
);

// keyboard to piano interactions
//--------------------------------------------------------------------------------

const keyDown = function(event){
  for (i of PIANO_KEY) {
    if (('Key' + i.dataset.letter == event.code) && !(i.classList.contains('key-downed'))){
      playNote(i.dataset.note);
      i.classList.add('piano-key-active', 'piano-key-active-pseudo', 'key-downed');
      return;
    }
  }
}

const keyUp = function(event){
  for (j of PIANO_KEY) {
    if ('Key' + j.dataset.letter == event.code){
      j.classList.remove('key-downed');
      if(!(j.classList.contains('mouse-downed'))){
        j.classList.remove('piano-key-active', 'piano-key-active-pseudo'); 
      }   
      return;
    }
  }
}

document.addEventListener('keydown', keyDown);
document.addEventListener('keyup', keyUp);

// fullscreen
//--------------------------------------------------------------------------------

const FULLSCREENBTN = document.querySelector('.fullscreen');

FULLSCREENBTN.addEventListener("mousedown", function(e) {
    toggleFullScreen();
}, false);

function toggleFullScreen() {
  if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen();
  } else {
    if (document.exitFullscreen) {
      document.exitFullscreen();
    }
  }
} 