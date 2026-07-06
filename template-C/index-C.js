function jalankanSlideshow() {
    const slides = document.querySelectorAll('.foto.slide');
    if (slides.length <= 1) return;

    let index = 0;
    setInterval(() => {
        slides[index].classList.remove('active');
        index = (index + 1) % slides.length;
        slides[index].classList.add('active');
    }, 3500);
}

jalankanSlideshow();

function start() {
    const intro = document.querySelector('.intro-screen');
    const content = document.getElementById('maincontent');

    intro.style.opacity = '0';

    setTimeout(() => {
        intro.style.display = 'none';
        content.style.display = 'flex';

        const music = document.getElementById('musikUltah');
        music.play();

        setTimeout(() => {
            content.style.opacity = '1';
            tampilkanSection();
        }, 50);

        setInterval(hitungMundur, 1000);
        hitungMundur();
    }, 500);
}

const tanggalUltah = new Date(2026, 6, 3);

function hitungMundur() {
    const sekarang = new Date();
    const selisih = tanggalUltah - sekarang;

    if (selisih <= 0) {
        hariH();
        return;
    }

    const hari = Math.floor(selisih / (1000 * 60 * 60 * 24));
    const jam = Math.floor((selisih % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const menit = Math.floor((selisih % (1000 * 60 * 60)) / (1000 * 60));
    const detik = Math.floor((selisih % (1000 * 60)) / 1000);

    document.getElementById('hari').textContent = String(hari).padStart(2, '0');
    document.getElementById('jam').textContent = String(jam).padStart(2, '0');
    document.getElementById('menit').textContent = String(menit).padStart(2, '0');
    document.getElementById('detik').textContent = String(detik).padStart(2, '0');
}

function hariH() {
    document.querySelector('.countdown').innerHTML = '<h2 style="font-family: \'Cormorant Garamond\', serif; color:#3a352f; font-size:26px; font-weight:600;">Selamat Ulang Tahun</h2>';
}

function tampilkanSection() {
    const sections = document.querySelectorAll('.hero, .pesan, .penutup');
    sections.forEach((section, i) => {
        setTimeout(() => section.classList.add('show'), i * 250);
    });
}

function ketikPesan() {
    const el = document.getElementById('isiPesan');
    const teks = el.getAttribute('data-text');
    let i = 0;
    el.textContent = '';

    function tik() {
        if (i < teks.length) {
            el.textContent += teks.charAt(i);
            i++;
            setTimeout(tik, 35);
        }
    }
    tik();
}

function bukaAmplop() {
    const amplop = document.getElementById('amplop');
    const isiSurat = document.getElementById('isiSurat');

    if (!amplop.classList.contains('terbuka')) {
        amplop.classList.add('terbuka');

        setTimeout(() => {
            amplop.style.display = 'none';
            isiSurat.style.display = 'block';
            ketikPesan();
        }, 500);
    }
}
