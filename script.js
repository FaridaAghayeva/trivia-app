const container = document.getElementById("container");



let category = [
  "artliterature",
  "language",
  "sciencenature",
  "general",
  "fooddrink",
  "peopleplaces",
  "geography",
  "historyholidays",
  "entertainment",
  "toysgames",
  "music",
  "mathematics",
  "religionmythology",
  "sportsleisure",
];

const apiKey = process.env.REACT_APP_API_KEY;

console.log(`API Key: ${apiKey}`);

function showAnswer(arr) {
  arr.map((item) => {
    fetch(`https://api.api-ninjas.com/v1/trivia?category=${item}`, {
      method: "GET",
      headers: {
        "X-Api-Key": apiKey,
        "Content-Type": "application/json",
      },
    })
      .then((response) => {
        if (response.ok) {
          return response.json();
        } else {
          throw "Error";
        }
      })
      .then((data) => {
        const html = `
        <div id="container2">
      <span>Category</span>
      <p id="cat">${data.map((item) => item.category)}</p>
      <span>Question</span>
      <p id="quest">${data.map((item) => item.question)}</p>
      <span>Answer</span>
      <div id="btn">Click for the answer</div>
      <p id="answers">${data.map((item) => item.answer)}</p>
    </div>
     `;

        container.insertAdjacentHTML("beforeend", html);

        const triviaItem = container.lastElementChild;
        const btn = triviaItem.querySelector("#btn");
        const answer = triviaItem.querySelector("#answers");

        btn.addEventListener("click", () => {
          answer.style.display = "block";
        });
      });
  });
}

showAnswer(category);
