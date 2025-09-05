let currentSlideIndex = 0;
const slides = document.querySelectorAll('.professor-slide');
const dots = document.querySelectorAll('.dot');

function showSlide(index) {

    slides.forEach(slide => slide.classList.remove('active'));
    dots.forEach(dot => dot.classList.remove('active'));


    slides[index].classList.add('active');
    dots[index].classList.add('active');
}

function changeSlide(direction) {
    currentSlideIndex += direction;

    if (currentSlideIndex >= slides.length) {
        currentSlideIndex = 0;
    } else if (currentSlideIndex < 0) {
        currentSlideIndex = slides.length - 1;
    }

    showSlide(currentSlideIndex);
}

function currentSlide(index) {
    currentSlideIndex = index - 1;
    showSlide(currentSlideIndex);
}


setInterval(() => {
    changeSlide(1);
}, 5000);

const statsSection = document.querySelector(".stats-section");
const counters = document.querySelectorAll(".stat-number");
let hasAnimated = false;

const observerOptions = {
    root: null,
    rootMargin: "0px",
    threshold: 0.5 
};

const observer = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
        if (entry.isIntersecting && !hasAnimated) {
            hasAnimated = true;
            counters.forEach(counter => {
                counter.innerText = "0";
                incrementCounter(counter);
            });
            observer.unobserve(statsSection); 
        }
    });
}, observerOptions);

observer.observe(statsSection);

function incrementCounter(counter) {
    let currentNum = +counter.innerText
    const dataCeil = +counter.getAttribute("data-ceil")
    const increment = dataCeil / 7
    currentNum = Math.floor(currentNum + increment)

    if (currentNum < dataCeil) {
        counter.innerText = currentNum
        setTimeout(() => incrementCounter(counter), 100)
    } else {
        counter.innerHTML = `${dataCeil}<span class="sum">+</span>`;
    }
}

