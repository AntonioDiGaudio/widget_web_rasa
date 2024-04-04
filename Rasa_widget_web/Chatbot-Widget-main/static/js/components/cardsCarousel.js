/**
 * creates horizontally placed cards carousel
 * @param {Array} cardsData json array
 */
function createCardsCarousel(cardsData) {
    let cards = "";
    cardsData.map((card_item, index) => {
        const buttonElement = `<button id="Id_bottone_${index}" class="cards_button" ${card_item.url.startsWith("tel:") ? "onclick='window.location.href=\"" + card_item.url + "\"'": "onclick='redirectTo(\"" + card_item.url + "\")'"}>
            Clicca qui
        </button>`;
        
        const item = `<div class="carousel_cards in-left">
            <img class="cardBackgroundImage" src=${card_item.image}>
            <div class="cardFooter"> 
                <span class="cardTitle" title=${card_item.title}>${card_item.title}</span>
                <div class="cardDescription">${card_item.description}</div>
                <div>
                    ${buttonElement}
                </div>
            </div>
        </div>`;
        cards += item;
    });
    
    const cardContents = `<div id="paginated_cards" class="cards"> 
        <div class="cards_scroller">${cards} 
            <span class="arrow prev fa fa-chevron-circle-left "></span> 
            <span class="arrow next fa fa-chevron-circle-right" ></span> 
        </div> 
    </div>`;
    
    return cardContents;
}



function redirectTo(link) {
    window.open(link, "_blank");
}

/**
 * appends cards carousel on to the chat screen
 * @param {Array} cardsToAdd json array
 */

function showCardsCarousel(cardsToAdd) {
    const cards = createCardsCarousel(cardsToAdd);

    $(cards).appendTo(".chats").show();

    if (cardsToAdd.length <= 2) {
        $(`.cards .arrow.prev`).hide(); // Nascondi la freccia "precedente" se non ci sono abbastanza carte da mostrare
        $(`.cards .arrow.next`).hide(); // Nascondi la freccia "successiva" se non ci sono abbastanza carte da mostrare
    } else {
        for (let i = 0; i < cardsToAdd.length; i += 1) {
            $(`.cards_scroller>div.carousel_cards:nth-of-type(${i + 1})`).fadeIn(3000);
        }
        $(".cards .arrow.prev").fadeIn(3000);
        $(".cards .arrow.next").fadeIn(3000);
    }

    scrollToBottomOfResults();

    const card = document.querySelector("#paginated_cards");
    const card_scroller = card.querySelector(".cards_scroller");
    const card_item_size = 225;

    function scrollToNextPage() {
        const maxScrollLeft = card_scroller.scrollWidth - card_scroller.clientWidth;
        const currentScrollLeft = card_scroller.scrollLeft;
        const nextScrollLeft = currentScrollLeft + card_item_size;
    
        if (nextScrollLeft < maxScrollLeft) {
            card_scroller.scrollBy(card_item_size, 0);
        } else {
            card_scroller.scrollTo(maxScrollLeft, 0);
        }
    }
    

    function scrollToPrevPage() {
        card_scroller.scrollBy(-card_item_size, 0);
    }

    card.querySelector(".arrow.next").addEventListener("click", scrollToNextPage);
    card.querySelector(".arrow.prev").addEventListener("click", scrollToPrevPage);
    $(".usrInput").focus();
}