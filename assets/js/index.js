// Navbar
const buttonToogle = document.querySelector('.buttonToogle');
const mobileMenu = document.querySelector('.mobileMenu');

buttonToogle.addEventListener('click', function () {
mobileMenu.classList.toggle('hidden');
})

// Statistik Visual
document.addEventListener("DOMContentLoaded", () => {
    const statsSection = document.getElementById('stats-section');
    const progressBars = document.querySelectorAll('.progress-bar');
    const counters = document.querySelectorAll('.count');
    
    // Opsi Observer: Animasi jalan saat 50% section terlihat
    const options = {
        threshold: 0.5
    };

    const startAnimation = (entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                // 1. Jalankan Animasi Progress Bar
                progressBars.forEach(bar => {
                    const width = bar.getAttribute('data-width');
                    bar.style.width = width;
                });

                // 2. Jalankan Animasi Angka Berjalan (Counter)
                counters.forEach(counter => {
                    const updateCount = () => {
                        const target = +counter.getAttribute('data-target');
                        const count = +counter.innerText;
                        const speed = 200; // Semakin besar semakin lambat
                        const inc = target / speed;

                        if (count < target) {
                            counter.innerText = Math.ceil(count + inc);
                            setTimeout(updateCount, 10);
                        } else {
                            counter.innerText = target;
                        }
                    };
                    updateCount();
                });

                // Berhenti mengamati setelah animasi jalan sekali
                observer.unobserve(entry.target);
            }
        });
    };

    const observer = new IntersectionObserver(startAnimation, options);
    observer.observe(statsSection);
});

// Testimonial
document.addEventListener("DOMContentLoaded", () => {
    const scrollTracks = [
        { id: 'track-left' },
        { id: 'track-right' }
    ];

    scrollTracks.forEach(track => {
        const container = document.getElementById(track.id);
        if (container) {
            // Kita clone isi aslinya (3 card) dan tempel di belakangnya
            // Supaya saat animasi jalan 50%, transisinya mulus (seamless)
            const content = container.innerHTML;
            container.innerHTML = content + content;
        }
    });
});
