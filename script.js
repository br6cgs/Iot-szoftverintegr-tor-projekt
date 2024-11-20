function showTime() {
    const options = { 
        timeZone: 'Europe/Budapest', 
        hour: '2-digit', 
        minute: '2-digit', 
        second: '2-digit', 
        year: 'numeric', 
        month: 'long', 
        day: 'numeric' 
    };
    const budapestTime = new Intl.DateTimeFormat('hu-HU', options).format(new Date());
    document.getElementById('currentTime').innerHTML = budapestTime;
}
showTime();
setInterval(showTime, 1000);
