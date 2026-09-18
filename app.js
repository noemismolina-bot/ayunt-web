document.addEventListener("DOMContentLoaded", () => {
    if (window.AOS) {
        AOS.init({ duration:700, once:true, offset:70, easing:"ease-out-cubic" });
    }
    const menu = document.getElementById("sidebarMenu");
    const overlay = document.getElementById("menuOverlay");
    const open = document.getElementById("openMenu");
    const close = document.getElementById("closeMenu");
    const setMenu = (show) => {
        if (!menu || !overlay) { return; }
        menu.classList.toggle("active", show);
        overlay.classList.toggle("active", show);
        document.body.classList.toggle("lock", show);
        if (open) { open.setAttribute("aria-expanded", String(show)); }
    };
    if (open) { open.addEventListener("click", () => { setMenu(true); }); }
    if (close) { close.addEventListener("click", () => { setMenu(false); }); }
    if (overlay) { overlay.addEventListener("click", () => { setMenu(false); }); }
    document.querySelectorAll(".menu-link").forEach(link => {
        link.addEventListener("click", () => { setMenu(false); });
    });
    const modal = document.getElementById("imageModal");
    const modalImg = document.getElementById("modalImg");
    const closeModal = document.getElementById("closeModal");
    const closeImage = () => {
        if (!modal) { return; }
        modal.classList.remove("active");
        modal.setAttribute("aria-hidden", "true");
        document.body.classList.remove("lock");
        if (modalImg) { modalImg.src = ""; }
    };
    document.querySelectorAll(".zoomable").forEach(card => {
        const showImage = () => {
            const source = card.dataset.image;
            const image = card.querySelector("img");
            if (!source || !modal || !modalImg) { return; }
            modalImg.src = source;
            modalImg.alt = image?.alt || "Vista ampliada";
            modal.classList.add("active");
            modal.setAttribute("aria-hidden", "false");
            document.body.classList.add("lock");
        };
        card.addEventListener("click", showImage);
        card.addEventListener("keydown", event => {
            if (event.key === "Enter" || event.key === " ") {
                event.preventDefault();
                showImage();
            }
        });
        card.setAttribute("tabindex", "0");
    });
    if (closeModal) { closeModal.addEventListener("click", closeImage); }
    if (modal) {
        modal.addEventListener("click", event => {
            if (event.target === modal) { closeImage(); }
        });
    }
    document.addEventListener("keydown", event => {
        if (event.key === "Escape") {
            setMenu(false);
            if (modal && modal.classList.contains("active")) { closeImage(); }
        }
    });
    const top = document.getElementById("backToTop");
    const toggleTop = () => {
        if (!top) { return; }
        if (window.scrollY > 450) { top.classList.add("show"); } else { top.classList.remove("show"); }
    };
    window.addEventListener("scroll", toggleTop, { passive:true });
    toggleTop();
    if (top) {
        top.addEventListener("click", () => { window.scrollTo({ top:0, behavior:"smooth" }); });
    }
    if (window.Swiper && document.querySelector(".gastronomy-swiper")) {
        new Swiper(".gastronomy-swiper", {
            slidesPerView:1, spaceBetween:16, loop:true, speed:600,
            autoplay:{ delay:4500, disableOnInteraction:false },
            pagination:{ el: ".swiper-pagination", clickable:true },
            navigation:{ nextEl: ".swiper-button-next", prevEl: ".swiper-button-prev" },
            breakpoints:{ 560:{ slidesPerView:2 }, 900:{ slidesPerView:3 }, 1200:{ slidesPerView:4 } }
        });
    }
});