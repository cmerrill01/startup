import React from 'react';

export function Instructions() {
    const [author, setAuthor] = React.useState('Anonymous');
    const [quote, setQuote] = React.useState('"Quidquid Latine dictum sit, altum videtur"');

    React.useEffect(() => {
        fetch('https://api.quotable.io/quotes/random?tags=business')
            .then((response) => response.json())
            .then((data) => {
                setAuthor(data[0].author);
                setQuote(data[0].content);
            })
            .catch();
    }, []);

    return (
        <main className="container-fluid bg-light text-dark">
            <section id="how-to-play">
                <h1>How to Play EconoMentor</h1>
                <p>EconoMentor is an educational game that teaches microeconomic principles of supply and demand. As the player, you operate a business in a simulated economic environment. You must make decisions about what price to charge for your product and what quantity to produce. Your goal is to maximize your profit over the course of twelve months.</p>
                <p>To play EconoMentor, follow these steps:</p>
                <ol>
                    <li>Login and start a new game.</li>
                    <li>You start in month 1 with $0 in assets.</li>
                    <li>Take note of the recommended quantity and your fixed and variable costs.</li>
                    <li>
                        Enter your desired price and quantity for this month. A few hints:
                        <ul>
                            <li>You want to charge a price high enough to cover your costs, but not so high that no one will buy your product.</li>
                            <li>You want to produce enough quantity to maximize your revenue, but not so much that you produce more of your product than people will buy.</li>
                        </ul>
                    </li>
                    <li>Click "Submit price and quantity".</li>
                    <li>Observe your revenue, costs, and profit for the round. Take note of this information when setting your next month's price and quantity.</li>
                    <li>Observe that your total assets have increased or decreased, and you have progressed to the next month.</li>
                    <li>Repeat for twelve rounds. Your total assets at the end of month 12 is your final score.</li>
                </ol>
            </section>
            <aside className="adam-smith">
                <img className="adam-smith" src="assets/images/adam-smith-portrait.jpg"></img>
                <Quote content={quote} author={author} />
            </aside>
        </main>
    );
}

function Quote({ content, author }) {
    return (
        <p><span id="quote-content">"{content}"</span> - <span id="quote-author">{author}</span></p>
    );
}