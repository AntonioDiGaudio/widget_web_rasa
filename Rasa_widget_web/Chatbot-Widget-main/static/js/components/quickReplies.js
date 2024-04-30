function showQuickReplies() {
    function createDictionaryFromData(data) {
        let dictionary = {};
        data.forEach(item => {
            dictionary[item.payload] = item.title;
        });
        return dictionary;
    }
    
    const data = [
        {
            "title": "Vorrei prenotare un viaggio ✈️",
            "payload": "/flight"
        },
        {
            "title": "Grazie ❤️",
            "payload": "/thanks"
        },
        {
            "title": "Arrivederci 👋",
            "payload": "/bye"
        },
        {
            "title": "Mi serve aiuto 🆘",
            "payload": "/help"
        },
        {
            "title": "Come ti chiami? 🤔",
            "payload": "/hello"
        },
        {
            "title": "Vorrei chiederti di più ℹ️",
            "payload": "/help"
        }
    ];

    const quickRepliesData = createDictionaryFromData(data);
    const keys = Object.keys(quickRepliesData);

    let chips = "";
    keys.forEach(key => {
        const chip = `<div class="chip" data-payload='${key}'>${quickRepliesData[key]}</div>`;
        chips += chip;
    });

    const quickReplies = `<div class="quickReplies">${chips}</div><div class="clearfix"></div>`;
    $(quickReplies).appendTo(".chats").fadeIn(1000);
    scrollToBottomOfResults();
    const slider = document.querySelector(".quickReplies");
    let pressed = false;
    let startX = 0;

    slider.addEventListener('mousedown', function (e) {
        pressed = true;
        startX = e.clientX;
        this.style.cursor = 'grabbing';
    });

    slider.addEventListener('mouseleave', function (e) {
        pressed = false;
    });

    window.addEventListener('mouseup', function (e) {
        pressed = false;
        slider.style.cursor = 'grab';
    });

    slider.addEventListener('mousemove', function (e) {
        if (!pressed) {
            return;
        }

        this.scrollLeft += startX - e.clientX;
    });
}

// on click of quickreplies, get the payload value and send it to rasa
$(document).on("click", ".quickReplies .chip", function () {
    const text = this.innerText;
    const payload = this.getAttribute("data-payload");
    console.log("chip payload: ", this.getAttribute("data-payload"));
    setUserResponse(text);
    send(payload);

    // delete the quickreplies
    $(".quickReplies").remove();
});
