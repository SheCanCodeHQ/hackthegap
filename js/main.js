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
    const navItems = document.querySelectorAll(".nav-right a");
    let navItemsTimer;

    const navItemDelay = 50;

    // iterate through each nav item and expand it or shrink it.
    // iterator: the iterator of navItem elements.
    // isExpanding: true -> items get bigger. false -> items get smaller.
    // done: callback for once this is finished.
    const navItemsIterator = (iterator, isExpanding, done) => {
        let item = iterator.next();
        let navItem = item.value;
        if (!item.done) {
            if (isExpanding) {
                navItem.setAttribute("style","width: "+navItem.getAttribute("data-width")+";");
            }
            else {
                navItem.setAttribute("style", "width: 0;");
            }
        }
        else {
            clearInterval(navItemsTimer);
            if (typeof(done) === "function") {
                done();
            }
        }
    }

    navButton.onclick = event => {
        let nav = document.querySelector("nav");
        let isActive = (nav.classList.contains("active"));
        if (isActive) {
            let eNavItems = [].slice.call(navItems,0).reverse()[Symbol.iterator]();
            navItemsTimer = setInterval(navItemsIterator, navItemDelay, eNavItems, false, () => {
                nav.classList.remove("active");
                navButton.classList.remove("active");
            });
        }
        else {
            nav.classList.add("active");
            navButton.classList.add("active");

            // create an iterator of the navigation items, starting from the last one.
            let eNavItems = [].slice.call(navItems,0).reverse()[Symbol.iterator]();
            navItemsTimer = setInterval(navItemsIterator, navItemDelay, eNavItems, true);
        }
    };

    for (navItem of navItems) {
        let width = navItem.scrollWidth;
        navItem.setAttribute("data-width", width + "px");
        navItem.setAttribute("style","width: 0;");
    }

    window.onclick = event => {
        // only if event wasn't triggered by navButton
        if (!( (event.target === navButton) || navButtonEls.contains(event.target) )) {
            let nav = document.querySelector("nav");
            if (nav.classList.contains("active")) {
                // close menu.
                nav.classList.remove("active");
                navButton.classList.remove("active");
            }
        }
    };
}
