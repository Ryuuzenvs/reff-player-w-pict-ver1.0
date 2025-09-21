// Anda dapat mengganti lirik lagu sesuai dengan lagu yang kalian sukai disini

const texts = [
  "好きよ",
  "今あなたに想い乗せて",
  "ほら素直になるの私",
  "この先もっと側にいてもいいかな?",
  "恋と恋が重なって?",
];

// Anda bisa custom jeda waktu sesuai lagu yang kalian sukai disini

const fade_in =  [1000, 100, 1000, 500, 1000]; // Durasi fade-in dalam milidetik
const jeda =     [0, 3000, 3000, 3500, 2500];    // Durasi jeda setelah fade-in
const fade_out = [500, 500, 1000, 1000, 1000]; // Durasi fade-out dalam milidetik

let textIndex = 0;
const typedTextSpan = document.querySelector(".typed-text");
const startButton = document.getElementById("startButton");

startButton.addEventListener("click", () => {
    startButton.classList.add("hidden"); // Sembunyikan tombol
    typeText();
});

function typeText() {
    if (textIndex < texts.length) {
        // Memunculkan teks dengan fade-in
        typedTextSpan.textContent = texts[textIndex];
        typedTextSpan.style.opacity = 0; // Awal opasitas 0 untuk fade-in
        setTimeout(() => {
            typedTextSpan.style.opacity = 1; // Mulai fade-in
            setTimeout(() => {
                // Setelah fade-in dan jeda, mulai fade-out
                setTimeout(() => {
                    typedTextSpan.style.opacity = 0; // Mulai fade-out
                    setTimeout(() => {
                        textIndex++;
                        typeText(); // Panggil lagi untuk teks berikutnya
                    }, fade_out[textIndex]); // Waktu fade-out
                }, jeda[textIndex]); // Waktu jeda
            }, fade_in[textIndex]); // Waktu fade-in
        }, 0); // Mulai langsung
    } else {
        // Setelah semua teks ditampilkan, tombol muncul kembali
        setTimeout(() => {
            startButton.classList.remove("hidden"); // Tampilkan tombol
            textIndex = 0; // Reset index untuk mengulang teks
        }, 500); // Waktu untuk tombol muncul setelah teks terakhir
    }
}

document.addEventListener('DOMContentLoaded', (event) => {
    const audio = document.getElementById('myAudio');
    const muteButton = document.getElementById('muteButton');
    const muteIcon = document.getElementById('muteIcon');

    // Autoplay logic with user interaction
    function playAudio() {
        const playPromise = audio.play();
        if (playPromise !== undefined) {
            playPromise.then(_ => {
                // Autoplay started successfully
            }).catch(error => {
                // Autoplay was prevented. Show a "play" button to the user.
                console.log("Autoplay was prevented by the browser.");
                // You might want to show a visible play button here
            });
        }
    }

    // Call playAudio on a user interaction, like a button click
    // For simplicity, we'll just handle the mute/unmute toggle

    muteButton.addEventListener('click', () => {
        if (audio.paused || audio.muted) {
            audio.muted = false; // Unmute the audio
            audio.play(); // Attempt to play again
            muteIcon.classList.remove('bxs-volume-mute');
            muteIcon.classList.add('bxs-volume-full');
        } else {
            audio.muted = true; // Mute the audio
            muteIcon.classList.remove('bxs-volume-full');
            muteIcon.classList.add('bxs-volume-mute');
        }
    });

    // Some browsers will only allow playback after a user gesture.
    // Let's add an initial state check.
    if (audio.autoplay) {
        audio.play();
    }
});
