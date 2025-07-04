let quoteDisplay = document.getElementById("quoteDisplay");
const showQuoteButton = document.getElementById("newQuote");
const categoryFilter = document.getElementById("categoryFilter");
const updateDataUi = document.getElementById("UpdateDataUi");
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
    qElement.textContent = text;
    qElement.setAttribute("cite", category);
    quoteDiv.appendChild(qElement);
    sessionStorage.setItem("lastViewedQuote", JSON.stringify({"text":text, "category":category}));
}


function showRandomQuote()
{
    // innerHTML
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

function isDuplicatedQuotes(quoteToCheck)
{
    if (quoteArr.find((quoteElement) => quoteElement.category == quoteToCheck.category && quoteElement.text == quoteToCheck.text) == undefined)
        return false;
    return true;
}


function syncQuotes(data)
{
    let isUpdated = false;


    data.forEach((DataElement) =>
    {
        if(isDuplicatedQuotes(DataElement) == false)
        {
            isUpdated = true;
            quoteArr.push(DataElement);
            addSingleCategory(DataElement.category, DataElement.text);
        }
    });
    if(isUpdated == true)
        alert("")
        saveQuotes();
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
    console.log("array in populate category :" , quotes);
    
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


// This function is just a simulation of posting data to the server
async function postData() {
    try {
        const response = await fetch("https://jsonplaceholder.typicode.com/posts", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(quoteArr)
        });

        if (response.ok) {
            console.log("Success:", await response.json());
        } else {
            console.log("Failed to post data. Status:", response.status);
        }
    } catch (error) {
        console.log("Error:", error);
    }
}

async function fetchQuotesFromServer()
{
    try
    {
        //https://jsonplaceholder.typicode.com/posts
        const fetchedQuotes = await fetch("https://my-json-server.typicode.com/anasamellahe/MyJSONServer/quote");
        if (fetchedQuotes.ok)
        {
            const data = await fetchedQuotes.json();
            syncQuotes(data);
        }
    }
    catch(error)
    {
        console.error("Error fetching data from server:", error);
    }
}

document.addEventListener("DOMContentLoaded", ()=>
{
    if (localStorage.getItem("Quote") !== null)
        loadQuote();
    populateCategories(quoteArr);
    const LastSelectedCategory = localStorage.getItem("LastSelectedCategory");
    if (LastSelectedCategory !== null)
        categoryFilter.value = LastSelectedCategory;
    const intervalId = setInterval(fetchQuotesFromServer, 60000);
})

