function onLoad() {
    const navButton = document.querySelector(".nav-button");
    navButton.onclick = event => {
        let nav = document.querySelector("nav");
        nav.classList.toggle("active");
        navButton.classList.toggle("active");
    };

    window.onclick = event => {
        // only if event wasn't triggered by navButton
        if (event.target !== navButton) {
            let nav = document.querySelector("nav");
            if (nav.classList.contains("active")) {
                nav.classList.remove("active");
                navButton.classList.remove("active");
            }
        }
    };
}
