window.onload = function () {

    // toggle mobile menu
    const menuToggle = document.getElementById("menu-toggle")
    const menu = document.getElementById("menu")
    const menuLinks = menu.querySelectorAll("a")

    let isMenuOpen = false;
    menuToggle.addEventListener("click", () => {
        if (isMenuOpen) {
            menu.classList.add("max-h-0", "overflow-hidden", "opacity-0", "invisible")
            menu.classList.remove("max-h-[300px]", "overflow-auto", "opacity-100", "visible")
            isMenuOpen = false
        }
        else {
            menu.classList.remove("max-h-0", "overflow-hidden", "opacity-0", "invisible")
            menu.classList.add("max-h-[300px]", "overflow-auto", "opacity-100", "visible")
            isMenuOpen = true
        }
    })

    // Close menu when clicking a link
    menuLinks.forEach(link => {
        link.addEventListener("click", () => {
            menu.classList.add("max-h-0", "overflow-hidden", "opacity-0", "invisible")
            menu.classList.remove("max-h-[300px]", "overflow-auto", "opacity-100", "visible")
            isMenuOpen = false
        })
    })

    // fixed header
    const header = document.getElementById("header")
    let lastScroll = 0;
    
    document.addEventListener("scroll", () => {
        const currentScroll = window.scrollY;
        
        if (currentScroll > 50) {
            header.classList.add("py-2.5", "scrolled")
            header.classList.remove("py-5")
        }
        else {
            header.classList.remove("py-2.5", "scrolled")
            header.classList.add("py-5")
        }
        
        lastScroll = currentScroll;
    })

    // scroll to top
    const roundedScroll = document.getElementById("rounded-scroll")
    const scrollToTop = document.getElementById("scroll-to-top")
    const handleScroll = () => {
        const scrollPosition = window.scrollY;
        const windowHeight = window.innerHeight;
        const documentHeight = document.body.clientHeight;
        const scrollableHeight = documentHeight - windowHeight;
        const scrollPercentage = (scrollPosition / scrollableHeight) * 100;

        roundedScroll.style.strokeDashoffset = 307.919 - (scrollPercentage * 307.919) / 100
        roundedScroll.style.strokeDasharray = "307.919, 307.919"

        if (scrollPosition > 350) {
            scrollToTop.style.display = "flex"
        } else {
            scrollToTop.style.display = "none"
        }

    };
    window.addEventListener("scroll", handleScroll);

    scrollToTop.addEventListener("click", () => {
        window.scrollTo({
            top: 0,
            behavior: "smooth",
        });
    })


    // accrodion
    const accordionHeader = document.querySelectorAll(".accordion-header");
    accordionHeader.forEach((item) => {
        item.addEventListener("click", () => {
            const isOpen = item.getAttribute("data-open") === "true";

            // Close all open accordion items
            accordionHeader.forEach((a) => {
                a.nextElementSibling.classList.add("max-h-0", "overflow-hidden", "py-0", "opacity-0", "invisible");
                a.nextElementSibling.classList.remove("max-h-25", "overflow-auto", "py-4", "opacity-100", "visible");
                a.setAttribute("data-open", "false");
            });

            // Toggle the clicked item
            if (!isOpen) {
                item.nextElementSibling.classList.remove("max-h-0", "overflow-hidden", "py-0", "opacity-0", "invisible");
                item.nextElementSibling.classList.add("max-h-25", "overflow-auto", "py-4", "opacity-100", "visible");
                item.setAttribute("data-open", "true");
            }
        });
    });

    let logoCopy = document.querySelector(".logos-slide").cloneNode(true);
    document.querySelector(".logo-slider").appendChild(logoCopy);


    // pre-loading
    const svg = document.getElementById("preloaderSvg");
    const tl = gsap.timeline();
    const curve = "M0 502S175 272 500 272s500 230 500 230V0H0Z";
    const flat = "M0 2S175 1 500 1s500 1 500 1V0H0Z";

    tl.to(".preloader-heading .load-text , .preloader-heading .cont", {
        delay: 1.5,
        y: -100,
        opacity: 0,
    });
    tl.to(svg, {
        duration: 0.5,
        attr: { d: curve },
        ease: "power2.easeIn",
    }).to(svg, {
        duration: 0.5,
        attr: { d: curve},
        ease: "power2.easeOut",
    });
    tl.to(".preloader", {
        y: -1500,
    });
    tl.to(".preloader", {
        zIndex: -1,
        display: "none",
    });

    gsap.registerPlugin(ScrollTrigger)

    const fadeInUps = document.querySelectorAll(".fadeInUp")

    fadeInUps.forEach((fadeInUp) => {
        const delay = parseFloat(fadeInUp.dataset.delay) || 0;

        gsap.set(fadeInUp, {
            y: 70
        });

        gsap.to(fadeInUp, {
            scrollTrigger: fadeInUp,
            y: 0,
            delay: delay,
            duration: 2
        })
    })

}



// jquery
$(document).ready(function () {
    $('.testimonials-wrap').slick({
        dots: false,
        infinite: true,
        autoplay: true,
        autoplaySpeed: 2000,
        arrows: true,
        speed: 1000,
        focusOnSelect: false,
        prevArrow: '.testimonial-prev',
        nextArrow: '.testimonial-next',
        slidesToShow: 2,
        slidesToScroll: 1,
        responsive: [{
            breakpoint: 767,
            settings: {
                slidesToShow: 1,
            }
        }]
    });


    $('.work-popup').magnificPopup({
        type: 'image',
        removalDelay: 300,
        mainClass: 'mfp-with-zoom',
        gallery: {
            enabled: true
        },
        zoom: {
            enabled: false, // By default it's false, so don't forget to enable it

            duration: 300, // duration of the effect, in milliseconds
            easing: 'ease-in-out', // CSS transition easing function

            // The "opener" function should return the element from which popup will be zoomed in
            // and to which popup will be scaled down
            // By defailt it looks for an image tag:
            opener: function (openerElement) {
                // openerElement is the element on which popup was initialized, in this case its <a> tag
                // you don't need to add "opener" option if this code matches your needs, it's defailt one.
                return openerElement.is('img') ? openerElement : openerElement.find('img');
            }
        }
    });
})