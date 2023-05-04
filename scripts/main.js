(function () {
  "use strict";

  let flippedCards = [];
  let matchedCards = [];

  const cards = [
    {
      text: "NUXtocat",
      url: "https://octodex.github.com/images/NUX_Octodex.gif",
    },
    {
      text: "Yogitocat",
      url: "https://octodex.github.com/images/yogitocat.png",
    },
    {
      text: "Mona the Rivetertocat",
      url: "https://octodex.github.com/images/mona-the-rivetertocat.png",
    },
    {
      text: "Octogatos",
      url: "https://octodex.github.com/images/Octogatos.png",
    },
    {
      text: "Octoqueer",
      url: "https://octodex.github.com/images/Octoqueer.png",
    },
    {
      text: "OctoAsians",
      url: "https://octodex.github.com/images/OctoAsians_dex_Full.png",
    },
  ];

  function shuffleCards(arrOfCards) {
    arrOfCards.sort(() => Math.random() - 0.5);
  }

  function generateCardsHTML(deck) {
    let html = "";
    deck.forEach(
      (e) =>
        (html += `
        <div class="card" data-name="${e.text}">
            <div class="card__face card__face--front"> 
              <img src="${e.url}" alt="${e.text}" />
            </div>      

            <div class="card__face card__face--back">
                <img src="https://octodex.github.com/images/boxertocat_octodex.jpg" alt="Boxertocat" />
            </div>
        </div>
        `)
    );
    return html;
  }

  function unflipCards() {
    console.log("this fires");

    flippedCards.forEach((card) => {
      console.log("this fires1");
      setTimeout(function () {
        card.classList.remove("flip");
        flippedCards = [];
      }, 1000);
    });
  }

  function removeCards() {
    flippedCards.forEach((card) => {
      card.removeEventListener("click", flipCard);
      matchedCards.push(card);
      setTimeout(() => {
        card.classList.add("match");
      }, 50);
    });
    flippedCards = [];
    if (matchedCards.length === 12) {
      setTimeout(() => alert("You win !", 1000));
    }
  }

  function checkForMatch() {
    console.log(flippedCards[1]);
    if (flippedCards[1].dataset.name === flippedCards[0].dataset.name) {
      console.log("You got a match!");
      removeCards();
      flippedCards = [];
    } else {
      unflipCards();
    }
    if (matchedCards.length === 12) {
      alert("You win!");
    }
    console.log("Cards matched", matchedCards);
  }
  function flipCard(event) {
    event.currentTarget.classList.add("flip");
    flippedCards.push(event.currentTarget);
    if (flippedCards.length === 2) {
      console.log("You have flipped 2 cards");
      checkForMatch();
    }

    console.log("Flipped cards", flippedCards);
  }

  function play() {
    const deck = [...cards, ...cards];
    shuffleCards(deck);

    const htmlContainer = document.querySelector(".container");
    const cardsHTML = generateCardsHTML(deck);
    htmlContainer.innerHTML = "";
    htmlContainer.insertAdjacentHTML("afterbegin", cardsHTML);

    const cardNodes = document.querySelectorAll(".card");

    document.querySelectorAll(".card").forEach(function (card) {
      card.addEventListener("click", flipCard);
    });
  }

  play();
})();
