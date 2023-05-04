(function () {
  "use strict";
  //an array of objects
  // change to let !!!!!!!!!! makes it easier
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

  // Did i fat arrow this correctly ? -> Yes
  function shuffleCards(arrOfCards) {
    arrOfCards.sort(() => Math.random() - 0.5); // lazy sorting method
  }

  function generateCardsHTML(deck) {
    let html = "";
    // NOTE: forEach gives element first then index and more
    deck.forEach(
      (e) =>
        // card__face is added by Mady
        (html += `
        <div class="card" data-name="${e.text}">
            <div class="card__face card-front"> 
              <img src="${e.url}" alt="${e.text}" />
            </div>      

            <div class="card__face card-back">
                <img src="https://octodex.github.com/images/boxertocat_octodex.jpg" alt="Boxertocat" />
            </div>
        </div>
        `)
    );
    return html;
  }

  function unflipCards() {
    flippedCards.forEach((card) => {
      setTimeout(function () {
        card.classList.remove("flip"); // Takes off flipping mechanism
      }, 2000);
      flippedCards = []; // NEED TO TAKE OUT EVEN IF NOT MATCH FOR FUTURE USE
    });
  }

  function removeCards() {
    flippedCards.forEach((card) => {
      card.removeEventListener("click", flipCard);
      card.classList.add("match");
      matchedCards.push(card);
    });
    flippedCards = [];
    if (matchedCards.length === 12) {
      setTimeout(() => alert("You win !", 1000));
    }
  }

  function checkForMatch() {
    if (flippedCards[1] === flippedCards[0]) {
      console.log("You got a match!");
      // matchedCards.push(flippedCards[0].dataset.name); //moved into remove cards
      flippedCards = [];

      removeCards();
    } else {
      unflipCards();
    }
    if (matchedCards.length === 6) {
      alert("You win!");
    }
    console.log("Cards matched", matchedCards);
  }
  // P NOTE: cannot think anymore and something is wrong with the order of my logic
  function flipCard() {
    event.currentTarget.classList.add("flip"); //adds flip class so css and do its thaaang B^)

    // console.log(event.currentTarget); //html that we insert
    // console.log(event.currentTarget.dataset.name);
    // Q: Why does it only fire after clicking the 3rd card ???????
    // A: Logic was sound, it was the event listener for click that was missing *facepalm*
    flippedCards.push(event.currentTarget); //The push needs to happen regardless
    if (flippedCards.length === 2) {
      console.log("You have flipped 2 cards");
      checkForMatch();
    }

    console.log("Flipped cards", flippedCards);
  }

  function play() {
    const deck = [...cards, ...cards];
    shuffleCards(deck); // CAUTION: THIS MUTATES THE ORIGINAL DECK ARRAY !!!

    const htmlContainer = document.querySelector(".container");
    const cardsHTML = generateCardsHTML(deck);
    htmlContainer.innerHTML = ""; // TO clear out the cards if playing again button is pressed
    htmlContainer.insertAdjacentHTML("afterbegin", cardsHTML); // inserts the actual, visible cards into the container div

    const cardNodes = document.querySelectorAll(".card");
    //console.log(cardNodes);
    // for (let i = 0; i < cardNodes.length; i++) {
    //   cardNodes[i].addEventListener("click", function () {
    //     //console.dir(cardNodes[i]);
    //     console.log(cardNodes[i].dataset.name); // this is how to get the card ref, use in if else
    //     flipCard();
    //   });
    // }

    document.querySelectorAll(".card").forEach(function (card) {
      card.addEventListener("click", flipCard);
    });
  }

  play();
})();
