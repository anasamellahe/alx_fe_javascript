let quoteDisplay = document.getElementById("quoteDisplay");
const showQuoteButton = document.getElementById("newQuote");
const categoryFilter = document.getElementById("categoryFilter");
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
    let usingFilter = false;
    const LastSelectedCategory = localStorage.getItem("LastSelectedCategory");

    if (quoteArr.length === 0)
        return ;

    if (LastSelectedCategory != null)
        usingFilter = true;

    const quoteDiv = document.getElementById("quoteDisplay");
    console.log("LastSelectedCategory == ", LastSelectedCategory );
    
 
    if (quoteDiv.hasChildNodes() === true)
        quoteDiv.childNodes[0].remove()
    let randomNumber = Math.floor(Math.random() * (quoteArr.length - 0));

    while (usingFilter == true && quoteArr[randomNumber].category !== LastSelectedCategory)
        randomNumber = Math.floor(Math.random() * (quoteArr.length - 0));

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
        populateCategories(category.value);
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
    
    const fileReader = new FileReader();
    fileReader.onload = function(event) {
      const importedQuotes = JSON.parse(event.target.result);
      console.log(importedQuotes);
    importedQuotes.forEach(element => {
        populateCategories(element.category);
      });
      quoteArr.push(...importedQuotes);

      saveQuotes();
    };
    fileReader.readAsText(event.target.files[0]);
}

function  exportQuotes()
{
    if (quoteArr.length === 0)
        return;
    const a = document.createElement("a");
    const blob = new Blob([JSON.stringify(quoteArr)], {type: "application/json"});
    const url = URL.createObjectURL(blob);
    a.setAttribute("href", url);
    a.setAttribute("download", "quotes.json");
    a.click();
    URL.revokeObjectURL(url);
}


function loadCategoryFilter()
{
    
    quoteArr.forEach((value, index, arr)=>
    {
        if (arr.findIndex((e) => {return (value.category == e.category)}) == index)
        {
            const option = document.createElement("option");
            option.setAttribute("value", value.category);
            option.innerText = value.category;
            categoryFilter.appendChild(option);
        }
    })
}

function populateCategories(category)
{
 
    if (quoteArr.find((element) => element.category == category) !== undefined)
        return ;
    const option = document.createElement("option");
    option.setAttribute("value", category);
    option.innerText = category;
    categoryFilter.appendChild(option);

}

function filterQuotes()
{
    localStorage.setItem("LastSelectedCategory", categoryFilter.value);
}
document.addEventListener("DOMContentLoaded", ()=>
{
    if (localStorage.getItem("Quote") !== null)
    {
        loadQuote();
        loadCategoryFilter();
    }

})