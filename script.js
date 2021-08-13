const currentTimeString = moment().format("dddd, MMMM Do YYYY, h:mm:ss a"); 
document.querySelector("#currentDay").textContent = currentTimeString;

const timeBlockArray = document.querySelectorAll(".time-block");
const goldentime = moment().hour(); //number

// for each item in Array run timeBlock function
timeBlockArray.forEach(function(timeBlock) {
    //get the hour of the time block
    const hour = parseInt(timeBlock.getAttribute("hour")); // string
    //make comparision
    if (goldentime > hour) {
        timeBlock.classList.add("past");
    } else if (goldentime === hour) {
        timeBlock.classList.add("present");
    } else if (goldentime < hour) {
        timeBlock.classList.add("future");
    }
});

const saveBtnArray = document.querySelectorAll(".saveBtn");

saveBtnArray.forEach((saveBtn) => {
    saveBtn.addEventListener("click", (event) => {
        console.log(event);
        //get the hour id
        const id = event.target.closest(".time-block").getAttribute("hour");
        //get the text
        const text = event.target.closest(".time-block").children[1].value;
        //contruct dataEntry
        const dataEntry = {
            id: id,
            text: text
        }
        //get the old data
        const oldData = JSON.parse(localStorage.getItem("data")) || [];
        //update the old data
        oldData.push(dataEntry);
        //set the new data to the storage
        localStorage.setItem("data",JSON.stringify(oldData));
    });
});

const data = JSON.parse(localStorage.getItem("data")) || [];
data.forEach((datum) => {
    const strq = `[hour="${datum.id}"]`;
    document.querySelector(strq).children[1].value = datum.text;
})