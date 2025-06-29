let quoteDisplay = document.getElementById("quoteDisplay");
const showQuoteButton = document.getElementById("newQuote");
let quoteArr = [
    createQuoteOBJ("The only way to do great work is to love what you do.", "Inspiration"),
    createQuoteOBJ("Life is what happens when you're busy making other plans.", "Life"),
    createQuoteOBJ("I have not failed. I've just found 10,000 ways that won't work.", "Motivation"),
    createQuoteOBJ("To be yourself in a world that is constantly trying to make you something else is the greatest accomplishment.", "Philosophy"),
    createQuoteOBJ("If you want to go fast, go alone. If you want to go far, go together.", "Wisdom")
]



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
    const randomNumber = Math.floor(Math.random() * (quoteArr.length - 0));
    quoteDiv.innerHTML = quoteArr[randomNumber].text;

}

function addQuote()
{
    const text = document.getElementById("newQuoteText");
    const category = document.getElementById("newQuoteCategory");

    if (text.value !== "" && category.value !== "")
    {
        quoteArr.push(createQuoteOBJ(text.value, category.value));
        text.value = "";
        category.value = "";
    }   
}

