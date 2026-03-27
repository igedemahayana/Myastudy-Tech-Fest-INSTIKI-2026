$(document).ready(function() {
    // --- 1. DATA INITIALIZATION ---
    // Pertanyaan dirancang untuk mendeteksi gejala fisik dan kognitif akibat burnout
    const questions = [
        "Apakah matamu terasa perih atau kering saat ini?",
        "Apakah pundak atau lehermu terasa kaku?",
        "Apakah kamu sudah duduk lebih dari 1 jam?",
        "Apakah kamu merasa sulit fokus pada satu materi?",
        "Sudahkah kamu minum air putih dalam 2 jam terakhir?"
    ];

    let currentStep = 0;
    let userAnswers = new Array(questions.length).fill(null);

    // --- 2. START ACTION ---
    $('#btn-start-scan').on('click', function() {
        $('#scanner-header').fadeOut(300, function() {
            $('#quiz-area').fadeIn(300).removeClass('hidden');
            updateUI();
        });
    });

    // --- 3. CORE LOGIC & NAVIGATION ---

    // Menangani seleksi jawaban dengan feedback visual (UX)
    $(document).on('click', '.answer-opt', function() {
        $('.answer-opt').removeClass('active');
        $(this).addClass('active');
        
        const score = parseInt($(this).data('score'));
        userAnswers[currentStep] = score;

        // Validasi: Aktifkan tombol navigasi hanya setelah input diterima
        $('#btn-next').removeClass('opacity-50 cursor-not-allowed').prop('disabled', false);
    });

    $('#btn-next').on('click', function() {
        if (currentStep < questions.length - 1) {
            currentStep++;
            updateUI();
        } else {
            // Kalkulasi akhir sebelum menampilkan modal
            showFinalResult();
        }
    });

    $('#btn-prev').on('click', function() {
        if (currentStep > 0) {
            currentStep--;
            updateUI();
        } else {
            $('#quiz-area').fadeOut(300, function() {
                $('#scanner-header').fadeIn(300);
            });
        }
    });

    // --- 4. UI ENGINE ---
    
    function updateUI() {
        // Reset state navigasi per pertanyaan
        $('#btn-next').addClass('opacity-50 cursor-not-allowed').prop('disabled', true);
        $('.answer-opt').removeClass('active');

        // Transisi pertanyaan yang halus (Smooth Transition)
        $('#question-text').fadeOut(200, function() {
            $(this).text(questions[currentStep]).fadeIn(200);
        });

        // Update Progress Bar secara dinamis
        const progress = ((currentStep + 1) / questions.length) * 100;
        $('#progress-bar').css('width', progress + '%');

        // State Management: Mengembalikan pilihan jika user melakukan 'Back'
        if (userAnswers[currentStep] !== null) {
            const val = userAnswers[currentStep];
            $(`.answer-opt[data-score="${val}"]`).addClass('active');
            $('#btn-next').removeClass('opacity-50 cursor-not-allowed').prop('disabled', false);
        }
        
        // Perubahan label tombol pada fase akhir diagnosa
        if (currentStep === questions.length - 1) {
            $('#btn-next').html('Selesaikan Diagnosa <i class="fa-solid fa-circle-check ml-2"></i>');
        } else {
            $('#btn-next').html('Selanjutnya <i class="fa-solid fa-arrow-right ml-2"></i>');
        }
    }

    // --- 5. ALGORITHM & PRESENTATION ---

    /**
     * Algoritma penghitungan skor kelelahan.
     * Menggunakan pembobotan khusus pada faktor hidrasi (Pertanyaan ke-5).
     */
    function showFinalResult() {
        // Mengakumulasi skor dari input user
        let total = userAnswers.slice(0, 4).reduce((a, b) => a + (b || 0), 0);
        
        // Logika Kompensasi: Air putih (index 4)
        // Faktor hidrasi sangat krusial dalam mengurangi kelelahan kognitif
        if(userAnswers[4] === 1) total -= 1; // Mengurangi beban jika terhidrasi
        else total += 1; // Menambah resiko jika dehidrasi

        let title, desc, emoji;

        // Klasifikasi Diagnosa berdasarkan total skor
        if (total >= 4) {
            emoji = "🚑";
            title = "Butuh Istirahat Total!";
            desc = "Sistem mendeteksi tingkat kelelahan tinggi. Matikan layar sekarang dan istirahatlah selama 15 menit.";
        } else if (total >= 2) {
            emoji = "🧘‍♂️";
            title = "Ayo Peregangan!";
            desc = "Tubuhmu mulai terasa kaku. Lakukan stretching ringan agar aliran darah kembali lancar ke otak.";
        } else {
            emoji = "⚡";
            title = "Kondisi Prima!";
            desc = "Kamu masih sangat segar. Tetap jaga posisi duduk ergonomis dan pencahayaan ruangan ya!";
        }

        // Injeksi data ke DOM Modal
        $('#result-icon').text(emoji); 
        $('#result-title').text(title);
        $('#result-desc').text(desc);

        // Menampilkan hasil menggunakan Library Fancybox
        Fancybox.show([{ src: "#scan-result", type: "inline" }]);
    }
});