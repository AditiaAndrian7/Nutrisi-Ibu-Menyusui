// Tunggu sampai semua elemen HTML siap
document.addEventListener("DOMContentLoaded", () => {
    // Array quiz: tiap elemen punya pertanyaan (q), jawaban (a), dan jawaban benar (correct)
    const quiz = [
        {
            q: "soal 1",
            a: ["a", "b", "c"],
            correct: "c"
        },
        {
            q: "soal 2",
            a: ["a", "b", "c"],
            correct: "a"
        },
        {
            q: "soal 3",
            a: ["a", "b", "c"],
            correct: "b"
        },
        {
            q: "soal 4",
            a: ["a", "b", "c"],
            corrrect: "c"
        },
        {
            q: "soal 5",
            a: ["a", "b", "c"],
            correct: "c"
        },
        {
            q: "soal 6",
            a: ["a", "b", "c"],
            correct: "b"
        },
        {
            q: "soal 7",
            a: ["a", "b", "c"],
            correct: "a"
        },
        {
            q: "soal 8",
            a: ["a", "b", "c"],
            correct: "c"
        },
        {
            q: "soal 9",
            a: ["a", "b", "c"],
            correct: "b"
        },
        {
            q: "soal 10",
            a: ["a", "b", "c"],
            correct: "b"
        },
    ];

    // Variabel untuk menandai soal sekarang dan skor
    let current = 0;
    let score = 0;

    // Ambil elemen-elemen penting dari HTML
    const questionEl = document.getElementById("question"); // tempat pertanyaan
    const answersEl = document.getElementById("answers"); // tempat tombol jawaban
    const nextBtn = document.getElementById("next-btn"); // tombol Next
    const resultEl = document.getElementById("result"); // div hasil akhir
    const scoreEl = document.getElementById("score"); // span untuk menampilkan skor
    const progressBar = document.getElementById("progress-bar"); // progress bar

    // Fungsi tampilkan soal sekarang
    function showQuestion() {
        answersEl.innerHTML = ""; // kosongkan jawaban sebelumnya
        nextBtn.style.display = "none"; // sembunyikan tombol Next sampai jawaban dipilih

        const q = quiz[current]; // ambil soal sekarang
        questionEl.innerText = q.q; // tampilkan pertanyaan

        // buat tombol jawaban
        q.a.forEach(ans => {
            const btn = document.createElement("button"); // buat elemen button
            btn.classList.add("btn", "btn-outline-primary", "btn-answer"); // styling
            btn.innerText = ans; // isi tombol dengan teks jawaban
            btn.onclick = () => checkAnswer(btn, ans); // pas klik tombol, cek jawaban
            answersEl.appendChild(btn); // tambahkan tombol ke div jawaban
        });

        // Update progress bar berdasarkan soal sekarang
        progressBar.style.width = (current / quiz.length) * 100 + "%";

        // Ubah teks tombol Next jadi "Lihat Skor" jika soal terakhir
        nextBtn.innerText = current === quiz.length - 1 ? "Lihat Skor" : "Next";
    }

    // Fungsi cek jawaban
    function checkAnswer(btn, ans) {
        // disable semua tombol jawaban agar tidak bisa diklik lagi
        Array.from(answersEl.children).forEach(b => (b.disabled = true));

        if (ans === quiz[current].correct) {
            btn.classList.replace("btn-outline-primary", "btn-success"); // hijau kalau benar
            score++; // tambah skor
        } else {
            btn.classList.replace("btn-outline-primary", "btn-danger"); // merah kalau salah
            // Highlight jawaban benar
            Array.from(answersEl.children).forEach(b => {
                if (b.innerText === quiz[current].correct) {
                    b.classList.replace("btn-outline-primary", "btn-success");
                }
            });
        }

        // tampilkan tombol Next setelah jawab
        nextBtn.style.display = "block";
    }

    // Event listener tombol Next
    nextBtn.addEventListener("click", () => {
        current++; // pindah ke soal berikutnya
        if (current >= quiz.length) {
            showResult(); // kalau sudah soal terakhir, tampilkan hasil
        } else {
            showQuestion(); // kalau belum, tampilkan soal berikutnya
        }
    });

    // Fungsi tampilkan hasil akhir
    function showResult() {
        document.getElementById("quiz-card").style.display = "none"; // sembunyikan quiz
        resultEl.style.display = "block"; // tampilkan hasil
        scoreEl.innerText = score + " / " + quiz.length; // tampilkan skor

        // Berikan apresiasi berdasarkan skor
        let msg = "";
        if (score === quiz.length) {
            msg = "🔥 Perfect! Kamu jenius!";
        } else if (score >= Math.ceil(quiz.length / 2)) {
            msg = "👍 Bagus! Tapi bisa lebih baik lagi!";
        } else {
            msg = "😅 Coba lagi ya, pasti bisa!";
        }

        const p = document.createElement("p"); // buat elemen paragraf untuk apresiasi
        p.classList.add("mt-2", "fs-5"); // styling margin-top dan font-size
        p.innerText = msg; // isi teks
        resultEl.appendChild(p); // tambahkan ke div hasil
    }

    // Fungsi restart quiz
    window.restartQuiz = function () {
        current = 0; // reset soal
        score = 0; // reset skor
        document.getElementById("quiz-card").style.display = "block"; // tampilkan quiz lagi
        resultEl.style.display = "none"; // sembunyikan hasil
        const oldMsg = resultEl.querySelector("p"); // hapus pesan apresiasi lama
        if (oldMsg) oldMsg.remove();
        showQuestion(); // tampilkan soal pertama lagi
    };

    // Tampilkan pertanyaan pertama saat halaman siap
    showQuestion();
});
