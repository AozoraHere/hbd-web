let ytPlayer = null;
let ytLoopChecker = null;
let mauPutarMusik = false;

const YT_VIDEO_ID = 'vGJTaP6anOU'; // Can't Help Falling in Love - Elvis Presley
const YT_START = 35; // detik mulai bagian reff (cek & sesuaikan sendiri)
const YT_END = 65;   // detik selesai, abis ini otomatis balik ke YT_START

function onYouTubeIframeAPIReady() {
    ytPlayer = new YT.Player('ytAudioContainer', {
        height: '0',
        width: '0',
        videoId: YT_VIDEO_ID,
        playerVars: {
            start: YT_START,
            controls: 0,
            disablekb: 1,
            playsinline: 1
        },
        events: {
            onReady: () => {
                if (mauPutarMusik) mainkanMusik();
            },
            onStateChange: onYtStateChange
        }
    });
}

function onYtStateChange(e) {
    if (e.data === YT.PlayerState.PLAYING) {
        clearInterval(ytLoopChecker);
        ytLoopChecker = setInterval(() => {
            if (ytPlayer.getCurrentTime() >= YT_END) {
                ytPlayer.seekTo(YT_START, true);
            }
        }, 500);
    }
}

function mainkanMusik() {
    mauPutarMusik = true;
    if (ytPlayer && ytPlayer.playVideo) {
        ytPlayer.seekTo(YT_START, true);
        ytPlayer.playVideo();
    }
}

function makeParticle() {
    const intro = document.querySelector('.intro-screen');

    for (let i = 0; i < 30; i++) {
        const particle = document.createElement('div');
        particle.classList.add('particle');

        particle.style.left = Math.random() * 100 + 'vw';
        particle.style.animationDuration = (3 + Math.random() * 4) + 's';
        particle.style.animationDelay = (Math.random() * 4) + 's';
        
        intro.appendChild(particle);
    }
}

makeParticle();
function buatPartikelKonten() {
    const konten = document.getElementById('maincontent');
    
    for (let i = 0; i < 20; i++) {
        const partikel = document.createElement('div');
        partikel.classList.add('partikel-konten');
        
        partikel.style.left = Math.random() * 100 + 'vw';
        partikel.style.top = Math.random() * 100 + '%';
        partikel.style.animationDuration = (4 + Math.random() * 6) + 's';
        partikel.style.animationDelay = (Math.random() * 5) + 's';
        
        konten.appendChild(partikel);
    }
}      

function start() {
    const intro = document.querySelector('.intro-screen')
    const content = document.getElementById('maincontent')
    

    intro.style.opacity = '0';

    setTimeout(() => {
        intro.style.display = 'none';
        content.style.display = 'flex';
        
        mainkanMusik();

        setTimeout(() => {
            content.style.opacity = '1';
            cekScroll();
            buatPartikelKonten();
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
