const input = document.querySelector(".input");
const addBtn = document.querySelector(".add-btn");
const listWrap = document.querySelector(".list-wrap");
const removeBtn = document.querySelector("span");
let value = input.value;
getDate();
addBtn.addEventListener("click", (e) => {
    e.preventDefault();
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
    //console.log(e1.target.parentElement.parentElement);
    changeList(e1);
});

function addList() {
    value = input.value;

    const Li = document.createElement("li");
    const Span = document.createElement("span");
    const I = document.createElement("i");

    Li.textContent = value;
    I.setAttribute("class", "fa-solid fa-trash");

    listWrap.appendChild(Li).appendChild(Span).appendChild(I);
}
function changeList(event) {
    //이벤트 버블링 활용
    const createdLI = document.querySelector("li");
    const target = event.target;

    if (target.tagName === "I" || target.tagName === "SPAN") {
        listWrap.removeChild(createdLI);
    } else {
        //target = li
        target.classList.toggle("done");
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

    DDate.textContent = date;
    Month.textContent = month;
    Year.textContent = year;
    Day.textContent = day;
}
