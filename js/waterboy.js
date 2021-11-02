var currentTime, stopTime, remainingTime, intervalCountdown, audioSelection;
var countdownMinutes = 15;
var waterboyClips = [
  'cleancoldh2o',
  'donthavetopayme',
  'highqualityh2o',
  'holdthescotch',
  'needthewater',
  'sterno',
  'wasteanywater',
  'whoopassfeelslike',
  'youcandoit2',
  'youcandoitallnightlong'
]

var indicatorBar = document.querySelector('#waterboy_progress_indicator')
var indicatorContainer = document.querySelector('#waterboy_progress_container');
var audioPlayer = document.querySelector('#waterboy_audio');

updateCountdown(countdownMinutes,'00')

var btnTime = document.querySelector('#waterboy_control_countdown');
btnTime.addEventListener( 'click', function() {
  var newMinutes = prompt('Set the countdown','Minutes');

  var numbers = /^[0-9]+$/;
  if(newMinutes.match(numbers))
  {
    updateCountdown(newMinutes,'00');
    countdownMinutes = newMinutes;
  }
  else
  {
  alert('Please input numeric characters only');
  }
})

var btnStop = document.querySelector('#waterboy_control_stop');
btnStop.addEventListener( 'click', function() {
  clearInterval(intervalCountdown)
  updateIndicator('100')
  updateCountdown(countdownMinutes,'00')
  flickerIndicator('off')
  btnTime.disabled = false;
})

var btnInfo = document.querySelector('#waterboy_control_info');
btnInfo.addEventListener( 'click', function() {
  alert('Drink 125mL of water every 15 minutes for optimal hydration.')
})

var btnStart = document.querySelector('#waterboy_control_start');
btnStart.addEventListener( 'click', function() {
  
  updateIndicator('100')
  updateCountdown(countdownMinutes,'00')
  flickerIndicator('off')
  
  currentTime = new Date().getTime();
  stopTime = currentTime + (countdownMinutes*60000);
 
  intervalCountdown = setInterval( function(){
    calculateRemainingTime();
  }, 250 )    
   
  btnTime.disabled = true;

} ) 
  
function updateIndicator(newWidth) {
  indicatorBar.style.width = newWidth + '%';
}

function updateCountdown(minutes,seconds){
  document.getElementById('waterboy_countdown_text').innerHTML = minutes + ":" + seconds;
}

function flickerIndicator(switchIt){
  if(switchIt=='on'){
    indicatorContainer.classList.add('flash')
  }
  if(switchIt=='off'){
    indicatorContainer.classList.remove('flash')
  }

}

function calculateRemainingTime(){
  
  currentTime = new Date().getTime();
  remainingTime = stopTime - currentTime;
   
  var minutes = Math.floor((remainingTime % (1000 * 60 * 60)) / (1000 * 60));
  var seconds = Math.floor((remainingTime % (1000 * 60)) / 1000);
 
  if(remainingTime <=1){
    clearInterval(intervalCountdown)
    updateIndicator('0')
    flickerIndicator('on')
    playAlert()
    btnTime.disabled = false;
    minutes = 0;
    seconds = 0;
  }

  updateIndicator((remainingTime/(countdownMinutes*60000))*100)
  updateCountdown(minutes,seconds);

}

function playAlert(){
  audioSelection = waterboyClips[Math.floor(Math.random()*waterboyClips.length)];
  audioPlayer.src = 'assets/audio-' + audioSelection + '.wav';
  audioPlayer.play();
}
