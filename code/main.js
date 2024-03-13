let date = new Date();

function viewYear(){
    date.getFullYear();
}
function viewMonth(){
    date.getMonth();
}
function viewDates(){
    date.getDate();
}

const renderCalendar=()=>{
    const viewYear = date.getFullYear();
    const viewMonth = date.getMonth();
    const viewDates = date.getDate();

    //year-month 채우기
    //querySelector를 통해 year-month 태그에 접근후 이에맞는 연도와 월을 넣음
    document.querySelector('.year-month').textContent = `${viewYear}년 ${viewMonth + 1}월`;

    //지난 달 마지막 Date, 이번달 마지막 Date
    //새로운 Date객체를 생성할때, 파라미터 date에 해당하는 부분에 0을 전달하면 지난달의 마지막날의 Date객체 생성
    //같은 원리로 파라미터 다음다의 0번째 날을 뽑으면, 이번달의 마지막날 Date객체 생성 
    const prevLast = new Date(viewYear, viewMonth, 0);
    const thisLast = new Date(viewYear, viewMonth+1, 0);

    const PLDate = prevLast.getDate(); //지난달마지막날짜
    const PLDay = prevLast.getDay(); //지난달마지막요일

    const TLDate = thisLast.getDate(); //이번달마지막날짜
    const TLDay = thisLast.getDay(); //이번달마지막요일

    //Dates 기본 배열들
    //위의 데이터들을 가지고 전체달력에 필요한 날짜들을 만들기위해 날짜들을 담아둘배열생성
    const prevDates = [];
    const thisDates = [...Array(TLDate+1).keys()].slice(1);
    const nextDates = [];

    //Array(n)으로 배열을 만들면 길이가 n인 배열생성(이때 모든 요소들은 undefined)
    //모든요소들이 empty값이기 때문에 keys()메서드를 활용하면 0부터 n-1까지 배열이 생성되는데
    //전개구문을통해 Array Iterator를 배열로 만들어내면 0부터 n-1까지의 배열을 얻을수있음
    //그래서 이번달 마지막날짜+1을 n에 전달하고
    //제일 앞에있는 0을 없애기위해 slice메서드활용


    //prevDates 계산
    //이전달을 표현할날짜들을 생성
    //만약 지난달마지막요일이 토요일(6)이면 굳이그릴필요X > 조건문
    //반복문의 조건부분은 0부터 시작해서 지난달마지막 요일이 될때까지 반복하게작성
    //지난달의 마지막날짜부터 1씩 줄어든값을 unshift 메서드를통해 prevDates배열에 앞쪽으로 계속채워넣는방식
    if(PLDay!==6){
        for(let i=0; i<PLDay+1;i++){
            prevDates.unshift(PLDate-i);
        }
    }

    //nextDates 계산
    //다음달을 표현할 날짜들
    //이번달 마지막날짜의 요일을 기준으로 필요한 개수를 파악하여 1부터 1씩증가시키며 nextDates배열에 하나씩 채워넣음
    for(let i=1; i<7-TLDay; i++){
        nextDates.push(i);
    }

    //Dates 합치기
    //concat 메서드를 통해 세배열을 합친후 forEach 메서드로 전체 요소들을 돌며 html코드로 데이터를 하나씩수
    const dates=prevDates.concat(thisDates, nextDates);

    //Dates 정리
    const firstDateIndex = dates.indexOf(1); //지난달 부분을 알아내기위해 첫날의 index를 찾음
  const lastDateIndex = dates.lastIndexOf(TLDate); //다음달 부분을 알아내기위해 마지막날의index를 찾음
  dates.forEach((date, i) => {
    const condition = i >= firstDateIndex && i < lastDateIndex + 1
                      ? 'this' //삼항연산자를 통해 이번달은 this
                      : 'other'; //나머지는 otherㅇ라는 문자열로 구분하여 날짜부분을 span태그로 감싸서 class로 지정

    dates[i] = `<div class="date"><span class="${condition}">${date}</span></div>`;
  })


    //Dates 그리기
    document.querySelector('.dates').innerHTML=dates.join('');
}

renderCalendar();

// // 오늘 날짜 그리기
// const today = new Date();
// if (viewMonth === today.getMonth() && viewYear === today.getFullYear()) {
//   for (let date of document.querySelectorAll('.this')) {
//     if (+date.innerText === today.getDate()) {
//       date.classList.add('today');
//       break;
//     }
//   }
// }

const prevMonth = () =>{
    date.setDate(1);
    date.setMonth(date.getMonth()-1);
    renderCalendar();
}

const nextMonth = () =>{
    date.setDate(1);
    date.setMonth(date.getMonth()+1);
    renderCalendar();
}

const goToday = () =>{
    date = new Date();
    renderCalendar();
}

function showPopup(){
    window.open("pop.html","기록","width=500, height=500, top=10, left=10" );
}