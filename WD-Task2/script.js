let timer;
let isRunning = false;
let startTime;
let lapTimes = [];
let lapCount = 1;

function startStop() {
    if (isRunning) {
        clearInterval(timer);
        document.getElementById("startStop").textContent = "Start";
        isRunning = false;
    } else {
        startTime = Date.now() - (lapTimes.length ? lapTimes.reduce((a, b) => a + b, 0) : 0);
        timer = setInterval(updateDisplay, 10);
        document.getElementById("startStop").textContent = "Stop";
        isRunning = true;
    }
}

function reset() {
    clearInterval(timer);
    document.getElementById("display").textContent = "00:00:00";
    document.getElementById("startStop").textContent = "Start";
    isRunning = false;
    lapTimes = [];
    lapCount = 1;
    document.getElementById("laps").innerHTML = "";
}

function lap() {
    if (!isRunning) return;

    const elapsedTime = Date.now() - startTime;
    lapTimes.push(elapsedTime);

    const lapListItem = document.createElement("li");
    lapListItem.textContent = `Lap ${lapCount++}: ${formatTime(elapsedTime)}`;
    document.getElementById("laps").appendChild(lapListItem);
}

function updateDisplay() {
    const elapsedTime = Date.now() - startTime;
    document.getElementById("display").textContent = formatTime(elapsedTime);
}

function formatTime(time) {
    const hours = Math.floor(time / (1000 * 60 * 60));
    const minutes = Math.floor((time % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((time % (1000 * 60)) / 1000);
    const milliseconds = Math.floor((time % 1000) / 10);

    return `${pad(hours)}:${pad(minutes)}:${pad(seconds)}.${pad(milliseconds)}`;
}

function pad(num) {
    return num.toString().padStart(2, "0");
}
