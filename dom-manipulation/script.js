let quoteDisplay = document.getElementById("quoteDisplay");
const showQuoteButton = document.getElementById("newQuote");
const categoryFilter = document.getElementById("categoryFilter");
let map = new Map();
let quoteArr = [];


showQuoteButton.addEventListener("click", () => showRandomQuote())
//quote creation ---


function displayQuote(text, category)
{
    const quoteDiv = document.getElementById("quoteDisplay");
    if (quoteDiv.hasChildNodes() === true)
        quoteDiv.childNodes[0].remove();
    const qElement = document.createElement("q");
    qElement.innerHTML = text;
    qElement.setAttribute("cite", category);
    quoteDiv.appendChild(qElement);
    sessionStorage.setItem("lastViewedQuote", JSON.stringify({"text":text, "category":category}));
}


function showRandomQuote()
{
    const selectedCategory = categoryFilter.value;
    if (map.has(selectedCategory) === false)
        return;
    const arr = map.get(selectedCategory);
    if (arr.length === 0)
        return;
    let randomNumber = Math.floor(Math.random() * (arr.length - 0));
    if (selectedCategory === "all")
        displayQuote(arr[randomNumber].text, selectedCategory);
    else
        displayQuote(arr[randomNumber], selectedCategory);
}

function createAddQuoteForm()
{
    const text = document.getElementById("newQuoteText");
    const category = document.getElementById("newQuoteCategory");
    if (text.value !== "" && category.value !== "")
    {
        quoteArr.push(createQuoteOBJ(text.value, category.value));
        addSingleCategory(category.value, text.value);
        saveQuotes();
        text.value = "";
        category.value = "";
    }   
}

//Utils ---
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

function createQuoteOBJ(text, category)
{
    const quoteOBJ = {
        text:text,
        category:category
    }
    return quoteOBJ;
}

function loadQuote()
{
    const storageQuote = localStorage.getItem("Quote");
    JSON.parse(storageQuote).forEach(element => {
        quoteArr.push(createQuoteOBJ(element.text, element.category));
    });
}

function addSingleCategory(category, text)
{
    if (map.has(category) == false)
    {
        createNewCategory(category);
        map.set(category, []);
    }
    map.get(category).push(text);
}

function createNewCategory(category)
{
    const option = document.createElement("option");
    option.setAttribute("value", category);
    option.innerText = category;
    categoryFilter.appendChild(option);
}

//Utils ---

// export and import quotes ---
 function importFromJsonFile(event) {
    
    const fileReader = new FileReader();
    fileReader.onload = function(event) {
      const importedQuotes = JSON.parse(event.target.result);
      quoteArr.push(...importedQuotes);
      saveQuotes();
      populateCategories(importedQuotes);
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
// export and import quotes ---

//category filter ---
function populateCategories(quotes)
{
    
    quotes.forEach((element) => {
        if (map.has(element.category) === false)
        {
            createNewCategory(element.category);
            map.set(element.category, []);
        }
        map.get(element.category).push(element.text);
    });
    if(map.has("all") === false)
        map.set("all", quoteArr);
}

function filterQuotes()
{
    localStorage.setItem("LastSelectedCategory", categoryFilter.value);
}
//category filter ---
document.addEventListener("DOMContentLoaded", ()=>
{
    if (localStorage.getItem("Quote") !== null)
        loadQuote();
    populateCategories(quoteArr);
    const LastSelectedCategory = localStorage.getItem("LastSelectedCategory");
    if (LastSelectedCategory !== null)
        categoryFilter.value = LastSelectedCategory;
})