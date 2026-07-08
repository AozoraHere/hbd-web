function buatBunting() {
    const bunting = document.getElementById('bunting');
    const huruf = 'HAPPY BIRTHDAY'.split('');
    const warna = ['#ff6b6b', '#f7971e', '#ffd93d', '#6bcb77', '#4d96ff', '#c850c0'];
    
    huruf.forEach((h, i) => {
        const kartu = document.createElement('div');
        kartu.classList.add('bunting-card');
        kartu.textContent = h;
        kartu.style.background = h === ' ' ? 'transparent' : warna[i % warna.length];
        bunting.appendChild(kartu);
    });
}

buatBunting();

function buatConfettiIntro() {
    const warna = ['#ff6b6b', '#f7971e', '#ffd93d', '#6bcb77', '#4d96ff', '#c850c0', 'white'];
    const jumlah = 40;
    
    for (let i = 0; i < jumlah; i++) {
        const confetti = document.createElement('div');
        confetti.classList.add('confetti-intro');
        confetti.style.left = Math.random() * 100 + 'vw';
        confetti.style.background = warna[Math.floor(Math.random() * warna.length)];
        confetti.style.animationDuration = (3 + Math.random() * 4) + 's';
        confetti.style.animationDelay = (Math.random() * 4) + 's';
        confetti.style.borderRadius = Math.random() > 0.5 ? '50%' : '2px';
        document.querySelector('.intro-screen').appendChild(confetti);
    }
}

buatConfettiIntro();

function buatPartikelKonten() {
    const konten = document.getElementById('maincontent');
    const warna = ['#ff6b6b', '#f7971e', '#ffd93d', '#6bcb77', '#4d96ff', '#c850c0'];
    
    for (let i = 0; i < 20; i++) {
        const partikel = document.createElement('div');
        partikel.classList.add('partikel-konten');
        partikel.style.left = Math.random() * 100 + 'vw';
        partikel.style.top = Math.random() * 100 + '%';
        partikel.style.background = warna[Math.floor(Math.random() * warna.length)];
        partikel.style.animationDuration = (4 + Math.random() * 6) + 's';
        partikel.style.animationDelay = (Math.random() * 5) + 's';
        konten.appendChild(partikel);
    }
}

function buatBalon() {
    const emojiBalon = ['🎈', '🎀', '🎊'];
    
    for (let i = 0; i < 15; i++) {
        const balon = document.createElement('div');
        balon.classList.add('balon');
        balon.textContent = emojiBalon[Math.floor(Math.random() * emojiBalon.length)];
        balon.style.left = Math.random() * 100 + 'vw';
        balon.style.fontSize = (20 + Math.random() * 30) + 'px';
        const durasi = 5 + Math.random() * 8;
        balon.style.animationDuration = durasi + 's';
        balon.style.animationDelay = '-' + (Math.random() * durasi) + 's';
        document.getElementById('maincontent').appendChild(balon);
    }
}

function start() {
    const intro = document.querySelector('.intro-screen')
    const content = document.getElementById('maincontent')
    

    intro.style.opacity = '0';

    setTimeout(() => {
        intro.style.display = 'none';
        content.style.display = 'flex';
        
        const music = document.getElementById('musikUltah');
        music.play();

        setTimeout(() => {
            content.style.opacity = '1';
            cekScroll();
            buatPartikelKonten();
            buatBalon();
        }, 50);
        

        setInterval(hitungMundur, 1000);
        hitungMundur();
    }, 500);
    
}

const tanggalUltah = new Date(2027, 6, 3); 

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

function buatConfetti() {
    const warna = ['#d4a843', '#ff6b6b', '#fff', '#ffd700', '#c850c0'];
    const jumlah = window.innerWidth < 768 ? 50 : 50; 
    
    for (let i = 0; i < jumlah; i++) {
        const confetti = document.createElement('div');
        confetti.classList.add('confetti');
        confetti.style.left = Math.random() * 100 + 'vw';
        confetti.style.background = warna[Math.floor(Math.random() * warna.length)];
        confetti.style.animationDuration = (2 + Math.random() * 3) + 's';
        confetti.style.animationDelay = (Math.random() * 2) + 's';
        document.body.appendChild(confetti);
    }
}

function hariH() {
    document.querySelector('.countdown').innerHTML = '<h2 style="color:#d4a843; font-size:28px;">🎉 Selamat Ulang Tahun! 🎉</h2>';
    buatConfetti();
}

function cekScroll() {
    const sections = document.querySelectorAll('.hero, .pesan, .penutup');
    
    sections.forEach(section => {
        const posisi = section.getBoundingClientRect().top;
        const tinggiLayar = window.innerHeight;
        
        if (posisi < tinggiLayar - 100) {
            section.classList.add('show');
        }
    });
}

window.addEventListener('scroll', cekScroll);

function bukaAmplop() {
    const amplop = document.getElementById('amplop');
    const isiSurat = document.getElementById('isiSurat');
    
    if (!amplop.classList.contains('terbuka')) {
        amplop.classList.add('terbuka');
        
        setTimeout(() => {
            amplop.style.display = 'none';
            isiSurat.style.display = 'block';
        }, 500);
    }
}
