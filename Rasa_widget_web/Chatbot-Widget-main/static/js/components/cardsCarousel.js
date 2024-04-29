/**
 * Creates a carousel using Splide.js
 * @param {Array} cardsData - JSON array containing card data
 */
function createCardsCarousel(cardsData) {
    const carouselId = `carousel_${Math.floor(Math.random() * 1000000)}`;
    let cards = "";
    
    cardsData.forEach((card_item, index) => {
        let buttonClickHandler = '';
        if (card_item.url.startsWith("tel:")) {
            buttonClickHandler = `onclick='redirectTo("${card_item.url}")'`;
        } else if (card_item.url.startsWith("https:")) {
            buttonClickHandler = `onclick='redirectTo("${card_item.url}")'`;
        } else if (card_item.url.includes("#")) {
            buttonClickHandler = `onclick='redirectToAnchor("${card_item.url}")'`;
        }
        
        const buttonElement = `<button id="${carouselId}_button_${index}" class="cards_button" ${buttonClickHandler}>
            Clicca qui
        </button>`;
        
        const item = `<div class="carousel_cards in-left splide__slide ${index === cardsData.length - 1 ? 'splide__slide--last' : ''}">
            <img class="cardBackgroundImage" src="${card_item.image}">
            <div class="cardFooter"> 
                <span class="cardTitle" title="${card_item.title}">${card_item.title}</span>
                <div class="cardDescription">${card_item.description}</div>
                <div>
                    ${buttonElement}
                </div>
            </div>
        </div>`;
        cards += item;
    });
    





    const cardContents = `<div id="${carouselId}" class="cards splide__slider"> 
        <div class="cards_scroller splide__track">
            <div class="splide__list" style="width:100%">
                ${cards}
            </div> 
        </div> 
    </div>`;

    const element = document.createElement('div');
    element.innerHTML = cardContents;

    // Aggiungi gestori di eventi per il cambio di colore del bottone
    element.querySelectorAll('.cards_button').forEach(button => {
        button.addEventListener('mousedown', () => {
            button.style.backgroundColor = '#ff5757';
        });
        button.addEventListener('touchstart', () => {
            button.style.backgroundColor = '#ff5757';
        });
        button.addEventListener('mouseup', () => {
            button.style.backgroundColor = '';
        });
        button.addEventListener('touchend', () => {
            button.style.backgroundColor = '';
        });
    });

    return element.firstChild;
}

function redirectTo(link) {
    window.open(link, "_blank");
}


function redirectToAnchor(link) {
    window.location.href = "#" + link;
    
}

/**
 * Appends the Splide carousel to the chat screen
 * @param {Array} cardsToAdd - JSON array containing card data
 */
function showCardsCarousel(cardsToAdd) {
    const cards = createCardsCarousel(cardsToAdd);
    $(".chats").append(cards);

    new Splide(cards, {
        type: 'slide',
        pagination: false,
        perPage:2,
        arrows: true,
        gap:10,
        wheel:true,
        focus:'center',
        speed:600,
        flickPower:500,
        flickMaxPages:0.4,
    }).mount();
}
