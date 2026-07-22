let ytPlayer = null;
let ytLoopChecker = null;
let mauPutarMusik = false;

const YT_VIDEO_ID = 'MlThQTo6D8A'; // Until I Found You - Stephen Sanchez (Official Audio)
const YT_START = 36; 
const YT_END = 105;   

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

const fotoList = ['img/foto1.png', 'img/foto2.png', 'img/foto3.png', 'img/foto4.png']; // tambah/kurang sesuai jumlah foto kamu
let fotoIndex = 0;

function mulaiSlideFoto() {
    if (fotoList.length <= 1) return; // kalau cuma 1 foto, nggak perlu slide

    setInterval(() => {
        const fotoEl = document.getElementById('fotoSlide');
        fotoEl.style.opacity = '0';

        setTimeout(() => {
            fotoIndex = (fotoIndex + 1) % fotoList.length;
            fotoEl.src = fotoList[fotoIndex];
            fotoEl.style.opacity = '1';
        }, 500); // nunggu fade-out kelar dulu baru ganti gambar
    }, 3500); // ganti foto tiap 3.5 detik, sesuaikan sendiri kalau mau lebih cepat/lambat
}

function start() {
    const intro = document.querySelector('.intro-screen');
    const content = document.getElementById('maincontent');

    intro.style.opacity = '0';

    setTimeout(() => {
        intro.style.display = 'none';
        content.style.display = 'flex';

        mainkanMusik();

        setTimeout(() => {
            content.style.opacity = '1';
            tampilkanSection();
            mulaiSlideFoto();
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
    document.querySelector('.countdown').innerHTML = '<h2 style="font-family: \'Cormorant Garamond\', serif; color:#3a352f; font-size:26px; font-weight:600;">Happy Birthday To You</h2>';
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