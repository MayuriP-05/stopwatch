let startTime ,
 leftOffTime =0 /* it keep track of the total time has passed since stopwatch run*/
 ,isRunning=0  ;
let lap=[];    let minLapTime;    let maxLapTime; let lastlaptime=0;

function displayTime(leftOffTime){
let totalHrs = leftOffTime  /3600000;
let HH = Math.floor(totalHrs);
let totalMin = (totalHrs - HH) * 60;
let MM =  Math.floor(totalMin);
let totalSec = (totalMin - MM)*60;
let SS =  Math.floor(totalSec);
let totalMSec = (totalSec - SS ) * 60;
let MS = Math.floor(totalMSec);

return  `${HH.toString().padStart(2,'0')}:${MM.toString().padStart(2,'0')}:${SS.toString().padStart(2,'0')}:${MS.toString().padStart(3,'0')}`

}
function lapTime(time) {
    let totalMin = time / 60000;
    let MM = Math.floor(totalMin);

    let totalSec = (totalMin - MM) * 60;
    let SS = Math.floor(totalSec);

    let totalMS = (totalSec - SS) * 1000;
    let MS = Math.floor(totalMS ); 

    return `${MM.toString().padStart(2, '0')}:${SS.toString().padStart(2, '0')}:${MS.toString().padStart(3, '0')}`;
}
// console.log(displayTime(Date.now()));

// function start  stopwatch

function start(){

    startTime = Date.now() - leftOffTime;
    isRunning = setInterval(()=>{
      leftOffTime = Date.now() - startTime;
      document.querySelector('#display').innerHTML = displayTime(leftOffTime);

    },10);
    document.querySelector('#startstopbtn').innerHTML = "Stop";
    document.querySelector('#startstopbtn').style.backgroundColor="#C80036";
    document.querySelector('#startstopbtn').style.color="white";
    document.querySelector('#lap').disabled=false;
}

document.querySelector("#startstopbtn").addEventListener('click', ()=>{
if(isRunning){
 stop()
}else{
    start();
}

})

function stop() {
 clearInterval(isRunning);
 document.querySelector('#startstopbtn').innerHTML = "Start";
 isRunning=0;
 document.querySelector('#lap').disabled=true;
 document.querySelector('#startstopbtn').style.backgroundColor="#FDD684";
 document.querySelector('#startstopbtn').style.color="#432344";
// console.log(isRunning);
}
function reset(){
    document.querySelector('#startstopbtn').innerHTML = "Start";
    document.querySelector('#startstopbtn').style.color="#432344";
    document.querySelector('#startstopbtn').style.backgroundColor="#FDD684";
    document.querySelector('#display').innerHTML = "00:00:00:000";
    document.querySelector('#lap').disabled=true;
    leftOffTime=0;
    clearInterval(isRunning);
    isRunning=0;
    lap=[];
 i=0;
 lastlaptime=0;
 document.querySelector('#lapbox').innerHTML = "";

}
function laps(){
lap.unshift(leftOffTime - lastlaptime);
lastlaptime=leftOffTime;
minLapTime = Math.min(...lap);
maxLapTime = Math.max(...lap);
document.querySelector('#lapbox').innerHTML = "";

for (let i = 0; i < lap.length; i++) {
   
    // console.log(displayTime(lap[i]));
    let lapsdiv =document.createElement('div');
    lapsdiv.className = ` lap-item ${i+1}`;
    let lapNumberSpan = document.createElement('span');
    lapNumberSpan.className = 'lap-number';
    lapNumberSpan.innerHTML = `Lap ${i + 1}`;

  
    let lapTimeSpan = document.createElement('span');
    lapTimeSpan.className = 'lap-time'; 
   

    if (lap[i] === minLapTime) {
        lapTimeSpan.style.color = '#468585'; 
        lapNumberSpan.style.color='#468585';
    } else if (lap[i] === maxLapTime) {
        lapTimeSpan.style.color = '#C80036'; 
        lapNumberSpan.style.color='#C80036';
    } else {
        lapTimeSpan.style.color = '#432344'; 
    }
    lapTimeSpan.innerHTML = lapTime(lap[i]);

    let deleteIconSpan = document.createElement('span');
    deleteIconSpan.className = 'delete-icon';
    deleteIconSpan.innerHTML = 'Delete <i class="fa-solid fa-trash"></i>';
    
    lapsdiv.appendChild(deleteIconSpan);
    lapsdiv.appendChild(lapNumberSpan);
    lapsdiv.appendChild(lapTimeSpan);
    document.querySelector('#lapbox').appendChild(lapsdiv);
}

}
document.querySelector("#reset").addEventListener('click',  reset);
document.querySelector("#lap").addEventListener('click',  laps);