function getRandomBusinessQuote() {
    fetch('https://api.quotable.io/quotes/random?tags=business')
    .then((response) => response.json())
    .then((data) => {
        console.log("author: " + data.author);
        console.log("quote: " + data.author);
    });
}

getRandomBusinessQuote();