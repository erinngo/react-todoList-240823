const input = document.querySelector(".input");
const addBtn = document.querySelector(".add-btn");
const listWrap = document.querySelector(".list-wrap");
const removeBtn = document.querySelector("span");
let value = input.value;
getDate();
addBtn.addEventListener("click", () => {
    value = input.value;
    console.log(value);
    addList();
    inputReset();
});
// input.addEventListener("click", () => {
//     inputReset();
// });
listWrap.addEventListener("click", (e1) => {
    //자식 li
    console.log(e1.target.parentElement.parentElement);
    changeList(e1);
});

function addList() {
    value = input.value;
    const Li = document.createElement("li");
    const Span = document.createElement("span");
    const I = document.createElement("i");

    // 1. li안에 value 추가
    Li.textContent = value;
    //2. li안에 span 추가  --- nesting  방식
    const spanFrag = document.createDocumentFragment();
    const span = spanFrag.appendChild(Span).appendChild(I);

    // span.textContent = "✖️";

    listWrap.appendChild(Li).appendChild(spanFrag);
    //font awesome 요소 추가 <i class="fa-solid fa-trash"></i>
    span.setAttribute("class", "fa-solid fa-trash");
}
function changeList(event) {
    //동적생성 span 요소 선택
    const SpanI = event.target.parentElement.parentElement;
    const List = event.target;
    //List.style.textDecoration = "none";
    if (SpanI.tagName === "LI") {
        SpanI.remove();
    } else {
        //tagName === UL
        List.classList.toggle("done");
    }
}

//input reset
function inputReset() {
    input.value = "";
}

function getDate() {
    const Now = document.querySelector(".now");
    const DDate = document.querySelector(".date");
    const Month = document.querySelector(".month");
    const Year = document.querySelector(".year");
    const Day = document.querySelector(".day");

    let now = new Date();
    let year = now.getFullYear();
    let date = now.getDate();
    //*** getMonth() + 1, 문자로변경
    let monthNum = now.getMonth() + 1;
    let monthStr = ["", "JAN", "FEB", "MAR", "APR", "MAY", "JUN", "JUL", "AUG", "SEP", "OCT", "NOV", "DEC"];
    let month = monthStr[monthNum];
    let dayNum = now.getDay();
    let dayStr = ["SUNDAY", "MONDAY", "TUESDAY", "WEDNESDAY", "THURSDAY", "FRIDAY", "SATURDAY"];
    let day = dayStr[dayNum];

    console.log(day);

    DDate.textContent = date;
    Month.textContent = month;
    Year.textContent = year;
    Day.textContent = day;
}
