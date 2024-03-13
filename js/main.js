const now = new Date();

const today={
    year : now.getFullYear(),
    date : now.getDate(),
    month : now.toLocaleString('en-US', {month: 'short'}), //month프로퍼티에 영어버전으로 month의 이름을 short하게리턴받음 1월 Jan 2월 Feb...식으로 문자열리턴받음 
    day : now.toLocaleString('en-US', {weekday: 'short'}), //day프로퍼티도 마찬가지로 weekday의 각 이름을 short하게리턴받음 일요일 Sun 월요일 Mon...식으로 문자여리턴받음
}

// document.getElementById('year').textContent=today.year;
// document.getElementById('month').textContent=today.month;
// document.getElementById('date').textContent=today.date;
// document.getElementById('day').textContent=today.day;

//문자열만 넣기때문에 textContent사용 > 피라미터 이름만 달라지는거니깐 반복문사용
for(let key in today){
    document.getElementById(key).textContent=today[key];
}