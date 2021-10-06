const $v = {}

/**
 * 
 * @param {Object} options -> collection of options about the modal window (see next)
 * @param {String} options.status -> affect on the icon near the title of the modal window {values: "notification" (default value), "danger", "action"}
 * @param {String} options.title -> title of the modal window
 * @param {String} options.body -> main part of the modal window (example: `<div class="someClass">Body of the modal window</div>`)
 * @param {Array} options.buttons -> describe the buttons of the modal window (if empty => no buttons on the modal window (not recomended but modal window can be closed after clicking on the non-modal-window area))
 * @param {String} options.buttons[].text -> text of button
 * @param {String} options.buttons[].style -> affect on the style of the button {values: "accept" (default value), "reject"}
 * @param {Function} options.buttons[].handler -> handler of the "click" event on button
 */
$v.modal = (options) => {
    let $modal = _createModal(options);
    let closing = false

    const modal = {
        open() {
            !closing && $modal.classList.add("modal_active");
        },
        close() {
            closing = true;
            $modal.classList.remove("modal_active");
            $modal.classList.add("modal_hide");
            setTimeout(() => {
                $modal.classList.remove("modal_hide");
                closing = false;
            }, 250);
        },
    }

    $modal.addEventListener("click", (e) => {
        e.target.dataset.close && modal.close();
    });

    return Object.assign(modal, {
        destroy() {
            document.body.removeChild($modal);
        },
        content(content) {
            $modal.querySelector("[data-content]").innerHTML = content;
        },
    });
}

function _createModal(options) {
    let statuses = ["danger", "notification", "action"];
    let modal = document.createElement("div");
    modal.classList.add("modal");

    modal.innerHTML = `
    <div class="modal__overlay" data-close="true">
        <div class="modal__window">
            <div class="window__title">
                <div class="title__status 
                    status_${statuses.includes(options.status) ? options.status : statuses[1]}
                "></div>
                <div class="title__text">
                    ${options.title || "Окно"}
                </div>
            </div>
            <div class="window__body" data-content>
                ${options.body || ""}
            </div>
        </div>
    </div>`

    let buttons = _createModalButtons(options.buttons);
    buttons.appendAfter(modal.querySelector("[data-content]"));

    document.body.appendChild(modal);
    
    return modal;
}

function _createModalButtons(buttons = []) {
    if (buttons.length === 0) 
        return document.createElement("div"); 
    
    let btns = document.createElement("div");
    btns.classList.add("window__buttons")
        
    for (let button of buttons) {
        let btn = document.createElement("div");
        btn.classList.add("button", `button__${button.style || "accept"}`);
        btn.setAttribute("data-close", "true");
        btn.innerHTML = button.text;

        btn.addEventListener("click", btn.handler || (() => {}));

        btns.appendChild(btn);
    }

    return btns;
}

Element.prototype.appendAfter = function(el) {
    el.parentNode.insertBefore(this, el.nextSibling);
}