let quoteDisplay = document.getElementById("quoteDisplay");
const showQuoteButton = document.getElementById("newQuote");
let quoteArr = [];
// createQuoteOBJ("The only way to do great work is to love what you do.", "Inspiration"),
// createQuoteOBJ("Life is what happens when you're busy making other plans.", "Life"),
// createQuoteOBJ("I have not failed. I've just found 10,000 ways that won't work.", "Motivation"),
// createQuoteOBJ("To be yourself in a world that is constantly trying to make you something else is the greatest accomplishment.", "Philosophy"),
// createQuoteOBJ("If you want to go fast, go alone. If you want to go far, go together.", "Wisdom")



showQuoteButton.addEventListener("click", () => showRandomQuote())

function createQuoteOBJ(text, category)
{
    const quoteOBJ = {
        text:text,
        category:category
    }
    return quoteOBJ;
}

function showRandomQuote()
{
    
    const quoteDiv = document.getElementById("quoteDisplay");
    if (quoteDiv.hasChildNodes() === true)
        quoteDiv.childNodes[0].remove()
    const randomNumber = Math.floor(Math.random() * (quoteArr.length - 0));
    const qElement = document.createElement("q");
    qElement.innerHTML = quoteArr[randomNumber].text;
    qElement.setAttribute("cite", quoteArr[randomNumber].category);
    quoteDiv.appendChild(qElement);
    sessionStorage.setItem("lastViewedQuote", quoteArr[randomNumber].text);
}
function createAddQuoteForm()
{
    const text = document.getElementById("newQuoteText");
    const category = document.getElementById("newQuoteCategory");
    if (text.value !== "" && category.value !== "")
    {
        quoteArr.push(createQuoteOBJ(text.value, category.value));
        saveQuotes();
        text.value = "";
        category.value = "";
    }   
}

function saveQuotes()
{
    if(localStorage.getItem("Quote") !== null)
            localStorage.removeItem("Quote");
    localStorage.setItem("Quote", JSON.stringify(quoteArr));
}

function addQuote()
{
   createAddQuoteForm();
}

function loadQuote()
{
    const storageQuote = localStorage.getItem("Quote");
    JSON.parse(storageQuote).forEach(element => {
        quoteArr.push(createQuoteOBJ(element.text, element.category));
    });
}

 function importFromJsonFile(event) {
    const fileReader = new Blob();
    fileReader.onload = function(event) {
      const importedQuotes = JSON.parse(event.target.result);
      quoteArr.push(...importedQuotes);
      saveQuotes();
      alert('Quotes imported successfully!');
    };
    fileReader.readAsText(event.target.files[0]);
}
document.addEventListener("DOMContentLoaded", ()=>
{
    console.log(localStorage.getItem("Quote"));
    if (localStorage.getItem("Quote") !== null)
        loadQuote();
})