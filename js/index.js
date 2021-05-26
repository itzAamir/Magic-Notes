document.getElementById("add").addEventListener("click", addNote);

document.getElementById("deleteAll").addEventListener("click", deleteAll);

document.getElementById("search").addEventListener("input", search);

showNotes();

function addNote() {
    let title = document.getElementById("title");
    let text = document.querySelector("textarea");
    if (title.value.trim() == "") {
        alert("Title should not be empty");
    }
    else {
        let notes = localStorage.getItem("Notes");
        if (notes == null) {
            notesObj = [[null, null]]
        } else {
            notesObj = JSON.parse(notes)
        }
        notesObj.unshift([title.value, text.value]);
        localStorage.setItem("Notes", JSON.stringify(notesObj));
        text.value = "";
        title.value = "";
        showNotes();
    }
}

function showNotes() {
    let notes = localStorage.getItem("Notes");
    if (notes == null) {
        notesObj = [[null, null]]
    } else {
        notesObj = JSON.parse(notes)
    }
    let html = "";
    notesObj.forEach(function (notes, index) {
        if (notesObj[index][0] != null) {
            html += `<div class= "notes">
            <img src="./images/unstar.png" alt="Mark Important" id="star" onmouseover = "hover(this)" onmouseout = "unhover(this)">
            <h3 contenteditable=true onblur = "saveChanges(this)">${notesObj[index][0]}</h3>
                <p contenteditable=true onblur = "saveChanges(this)">${notesObj[index][1]}</p>
                <button onclick="delNote(this.id)" id="${index}" class= "delNote">Delete Notes</button>
                </div>`
        }
    });
    // console.log(html)
    notes_dom = document.querySelector(".note-section");
    notes_dom.innerHTML = html;

}

function delNote(index) {
    let notes = localStorage.getItem("Notes");
    if (notes == null) {
        notesObj = [[null, null]]
    } else {
        notesObj = JSON.parse(notes)
    }
    notesObj.splice(index, 1);
    localStorage.setItem("Notes", JSON.stringify(notesObj));
    showNotes();
}

function deleteAll() {
    confirmation = confirm("Are you sure you want to delete all Magic Notes")
    // console.log(confirmation)
    if (confirmation == true) {
        localStorage.clear();
        notes_dom = document.querySelector(".note-section");
        showNotes();
    }
}

function search() {
    let noteCards = document.getElementsByClassName("notes");
    search = document.getElementById("search").value.toLowerCase().trim();
    Array.from(noteCards).forEach(function (element) {
        let cardTxtP = element.getElementsByTagName("p")[0].innerText;
        let cardTxtH3 = element.getElementsByTagName("h3")[0].innerText;
        if (cardTxtP.toLowerCase().includes(search) || cardTxtH3.toLowerCase().includes(search)) {
            element.style.display = "block";
        }
        else {
            element.style.display = "none";
        }
    })

}
function hover(element) {
    element.setAttribute("src", "./images/star.png")
}
function unhover(element) {
    element.setAttribute("src", "./images/unstar.png")
}

function saveChanges(element) {
    let changedWord = element.innerText;
    let allNotes = localStorage.getItem("Notes");
    convertedNotes = JSON.parse(allNotes)
    // console.log(convertedNotes)
    for (i of convertedNotes){
        console.log(i)
    }
}