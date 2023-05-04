(function () {
  "use strict";
  //an array of objects
  const flippedCards = [];
  const matchedCards = [];

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

  // Did i fat arrow this correctly ? -> Yes
  function shuffleCards(arrOfCards) {
    arrOfCards.sort(() => Math.random() - 0.5); // lazy sorting method
  }

  function generateCardsHTML(deck) {
    let html = "";
    // NOTE: forEach gives element first then index and more
    deck.forEach(
      (e) =>
        (html += `
        <div class="card" data-name="${e.text}">
        <div class="card-front">
          <img src="${e.url}" alt="${e.text}" />
        </div>      

        <div class="card-back">
          <img src="https://octodex.github.com/images/boxertocat_octodex.jpg" alt="Boxertocat" />
        </div>
      </div>
        `)
    );
    return html;
  }

  function checkForMatch() {
    if (flippedCards[1] === flippedCards[0]) {
      console.log("You got a match!");
      matchedCards.push(flippedCards[0].dataset.name);
      flippedCards.length = 0;
    }
    if (matchedCards.length === 6) {
      alert("You win!");
    }
    console.log("Cards matched", matchedCards);
  }
  // P NOTE: cannot think anymore and something is wrong with the order of my logic
  function flipCard() {
    event.currentTarget.classList.add("flip"); //adds

    // console.log(event.currentTarget); //html that we insert
    // console.log(event.currentTarget.dataset.name);
    // Q: Why does it only fire after clicking the 3rd card ???????
    if (flippedCards.length === 2) {
      console.log("You have flipped 2 cards");
      checkForMatch();
    } else {
      flippedCards.push(event.currentTarget);
    }
    console.log("Flipped cards", flippedCards);
  }

  function play() {
    const deck = [...cards, ...cards];
    shuffleCards(deck); // CAUTION: THIS MUTATES THE ORIGINAL DECK ARRAY !!!

    const htmlContainer = document.querySelector(".container");
    const cardsHTML = generateCardsHTML(deck);
    htmlContainer.insertAdjacentHTML("afterbegin", cardsHTML); // inserts the actual, visible cards into the container div

    const cardNodes = document.querySelectorAll(".card");
    //console.log(cardNodes);
    for (let i = 0; i < cardNodes.length; i++) {
      cardNodes[i].addEventListener("click", function () {
        //console.dir(cardNodes[i]);
        console.log(cardNodes[i].dataset.name); // this is how to get the card ref, use in if else
        flipCard();
      });
    }
  }

  play();
})();
