/**
 * creates horizontally placed cards carousel
 * @param {Array} cardsData json array
 */
function createCardsCarousel(cardsData) {
    const carouselId = `carousel_${Math.floor(Math.random() * 1000000)}`;
    let cards = "";
    cardsData.forEach((card_item, index) => {
        let buttonClickHandler = '';
        if (card_item.url.startsWith("tel:")) {
            buttonClickHandler = `onclick='window.open("${card_item.url}")'`;
        } else if (card_item.url.startsWith("https:")) {
            buttonClickHandler = `onclick='redirectTo("${card_item.url}")'`;
        } else if (card_item.url.includes("#")) {
            buttonClickHandler = `onclick='redirectToAnchor("${card_item.url}")'`;
        }
        

        const buttonElement = `<button id="${carouselId}_button_${index}" class="cards_button" ${buttonClickHandler}>
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
    
    const cardContents = `<div id="${carouselId}" class="cards"> 
        <div class="cards_scroller">${cards} 
            <span class="arrow prev fa fa-chevron-circle-left "></span> 
            <span class="arrow next fa fa-chevron-circle-right" ></span> 
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
let touchstartX = 0
    let touchendX = 0
    let isAnimated = false

/**
 * appends cards carousel on to the chat screen
 * @param {Array} cardsToAdd json array
 */

function showCardsCarousel(cardsToAdd) {
    const cards = createCardsCarousel(cardsToAdd);

    $(cards).appendTo(".chats").show();

    // Seleziona il carosello appena aggiunto
    const card = document.querySelector(".cards:last-child");

    // Seleziona le frecce di navigazione specifiche per il carosello
    const prevArrow = card.querySelector(".arrow.prev");
    const nextArrow = card.querySelector(".arrow.next");

    // Seleziona l'area di scorrimento del carosello
    const card_scroller = card.querySelector(".cards_scroller");
    const card_item_size = 225;

    // Nascondi le frecce se non ci sono abbastanza carte da mostrare
    if (cardsToAdd.length <= 2) {
        $(prevArrow).hide();
        $(nextArrow).hide();
    } else {
        // Mostriamo le frecce se ci sono abbastanza carte
        $(prevArrow).fadeIn(3000);
        $(nextArrow).fadeIn(3000);
    }


    
        



    function checkDirection() {
    if (touchendX < touchstartX) scrollToNextPage()
    if (touchendX > touchstartX) scrollToPrevPage()
    }

    document.addEventListener('touchstart', e => {
        touchstartX = e.changedTouches[0].screenX
    })


    document.addEventListener('touchmove', e => {
        touchendX=e.changedTouches[0].screenX
        console.log(e)
        if(!isAnimated){
            console.log("non sta animando")
            if ( (Math.abs(touchendX)-Math.abs(touchstartX)) > 10 ) {
                isAnimated = true
                console.log("sta animando")
                checkDirection()
                }
        }
    })


    scrollToBottomOfResults();

    function scrollToNextPage() {
        const maxScrollLeft = card_scroller.scrollWidth - card_scroller.clientWidth;
        const currentScrollLeft = card_scroller.scrollLeft;
        const nextScrollLeft = currentScrollLeft + card_item_size;
    
        if (nextScrollLeft < maxScrollLeft) {
            // Anima lo scorrimento orizzontale
            $(card_scroller).animate({ scrollLeft: nextScrollLeft }, 500, "swing", endAnimation);
        } else {
            // Se siamo già alla fine, scorrimento fino alla fine
            $(card_scroller).animate({ scrollLeft: maxScrollLeft }, 500, "swing", endAnimation);
        }
    }
    
    function scrollToPrevPage() {
        const currentScrollLeft = card_scroller.scrollLeft;
        const prevScrollLeft = currentScrollLeft - card_item_size;
    
        if (prevScrollLeft >= 0) {
            // Anima lo scorrimento orizzontale
            $(card_scroller).animate({ scrollLeft: prevScrollLeft }, 500, "swing", endAnimation);
        } else {
            // Se siamo già all'inizio, scorrimento fino all'inizio
            $(card_scroller).animate({ scrollLeft: 0 }, 500 , "swing", endAnimation);
        }
    }




   function endAnimation(){
    console.log("Fine animazione"+ isAnimated)
    isAnimated = false
   }

    // Aggiungi gli eventi di click alle frecce specifiche per il carosello
    prevArrow.addEventListener("click", scrollToPrevPage);
    nextArrow.addEventListener("click", scrollToNextPage);
}

