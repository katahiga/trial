

(()=>{


const swich = document.getElementById('swich');
const todayDisp = document.getElementById('todayDisp');
const listdisp = document.getElementById('listDisp');

let data = {
    todayTotal:0,
    startHour:0,
    total:[1,2,3,4,5]
}
let endHour,nowSleep;
let turn = true;

const storedData = localStorage.getItem('saveSleepTime');
if (storedData) {
    data = JSON.parse(storedData);
}
todayDisp.textContent = data.todayTotal;
listdisp.textContent = data.total.join('　');

swich.addEventListener('click', truefalse);

function truefalse() {
    if (turn) {
        document.body.style.backgroundColor = '#6e6e6e';
        swich.textContent = "일";

        data.startHour = new Date().getHours();
        // 18時～2時に今日のトータルをリセット
        if (data.startHour >= 18 || data.startHour < 2) {
            data.total.push(data.todayTotal);
            if (data.total.length > 5) {
                data.total.shift();
            }
            data.todayTotal = 0;
        }
        localStorage.setItem("saveSleepTime", JSON.stringify(data));
    } else {
        document.body.style.backgroundColor = '#d2d2d2';
        swich.textContent = "자"

        endHour = new Date().getHours();
        nowSleep = calc(data.startHour, endHour);
        data.todayTotal =+ nowSleep;
        todayDisp.textContent = data.todayTotal;

        localStorage.setItem("saveSleepTime", JSON.stringify(data));
    }
    turn = !turn;
}

// 時間計算
function calc(startHour, endHour) {
    if (endHour < startHour) {
        return (endHour + 24) - startHour;
    } else {
        return endHour - startHour;
    }
}



})();
