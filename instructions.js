function getRandomBusinessQuote() {
    fetch('https://api.quotable.io/quotes/random?tags=business')
    .then((response) => response.json())
    .then((data) => {
        console.log(data);

        console.log("author: " + data[0].author);
        const author = data[0].author;
        const authorEl = document.querySelector("#quote-author");
        authorEl.textContent = author;

        console.log("quote: " + data[0].content);
        const quote = data[0].content;
        const quoteEl = document.querySelector("#quote-content");
        quoteEl.textContent = quote;
    });
}

getRandomBusinessQuote();