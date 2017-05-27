// NodeList.contains(element)
// returns true if the NodeList contains the given element,
// returns false if it does not.
NodeList.prototype.contains = function(element) {
    let res = false;
    this.forEach(el => {
        if (element === el) {
            res = true;
        }
    });
    return res;
}

function onLoad() {
    const navButton = document.querySelector(".nav-button");
    let navButtonEls = navButton.querySelectorAll("*");
    navButton.onclick = event => {
        let nav = document.querySelector("nav");
        nav.classList.toggle("active");
        navButton.classList.toggle("active");
    };

    window.onclick = event => {
        // only if event wasn't triggered by navButton
        if (!( (event.target === navButton) || navButtonEls.contains(event.target) )) {
            let nav = document.querySelector("nav");
            if (nav.classList.contains("active")) {
                nav.classList.remove("active");
                navButton.classList.remove("active");
            }
        }
    };
}
