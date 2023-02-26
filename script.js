const selectMenu = document.querySelectorAll("select");
const currentTime = document.querySelector(".container h1");
const alarmBtn = document.querySelector("button");
const timer = document.querySelector('.timer');
const alarmImg = document.querySelector('.container img');

let alarmTime, isAlarmSet  = false;
let ringtone = new Audio("files/ringtone.mp3");
// adding options to the selection tag
//HOUR
for (let i = 12; i > 0; i--) {
  i = i < 10 ? "0" + i : i;
  let options = `<option value="${i}">${i}</option>`;
  //adding 12 hour
  selectMenu[0].firstElementChild.insertAdjacentHTML("afterend", options);
}

//MINUTE
for (let i = 59; i >= 0; i--) {
  i = i < 10 ? "0" + i : i;
  let options = `<option value="${i}">${i}</option>`;
  //adding 59 minutes
  selectMenu[1].firstElementChild.insertAdjacentHTML("afterend", options);
}
//AM-PM
for (let i = 2; i > 0; i--) {
  //if i==1 set the ampm value to "AM" else set "PM"
  let ampm = i == 1 ? "AM" : "PM";
  let options = `<option value="${ampm}">${ampm}</option>`;
  //adding to the AM and PM
  selectMenu[2].firstElementChild.insertAdjacentHTML("afterend", options);
}

setInterval(() => {
  let date = new Date(),
    h = date.getHours(),
    m = date.getMinutes(),
    s = date.getSeconds(),
    ampm = "AM";
  if (h >= 12) {
    h = h - 12;
    ampm = "PM";
  }
  h = h == 0 ? (h = 12) : h;
  h = h < 10 ? "0" + h : h;
  m = m < 10 ? "0" + m : m;
  s = s < 10 ? "0" + s : s;
  currentTime.innerText = `${h}:${m}:${s} ${ampm}`;

  if (alarmTime == `${h}:${m} ${ampm}`) {
    ringtone.play();
    ringtone.loop = true;
    alarmImg.classList.add('shake');
  }
},1000);

function setAlarm() {
    if(isAlarmSet){//if alarm is true 
        alarmTime = "";// clear the value of alarmtime
        ringtone.pause();// pause the ringtone
        timer.classList.remove("disable");
        alarmBtn.innerText = "Set Alarm";
        alarmImg.classList.remove('shake');
        return isAlarmSet = false;// return isAlarmSet value to false
    }
    // getting hour, minute, AM/PM from select tag
    let time = `${selectMenu[0].value}:${selectMenu[1].value} ${selectMenu[2].value}`;
    //checking time is containing hour, minute and AM/PM or not.
    if(time.includes("Hour") || time.includes("Minute") || time.includes("AM/PM")){
        return alert("Please select a valid time to set alarm!");
    }
    isAlarmSet = true;
    alarmTime = time;
    timer.classList.add("disable");
    alarmBtn.innerText = "Clear Alarm";
}
alarmBtn.addEventListener("click", setAlarm);