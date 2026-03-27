$(document).ready(function () {
    let notes = JSON.parse(localStorage.getItem('studyLogs')) || [];

    // Fungsi untuk menampilkan semua data dari LocalStorage saat page load
    renderLogs();

    $('#add-btn').on('click', function () {
        const mapel = $('#mapel').val().trim();
        const tugas = $('#tugas').val().trim();

        if (mapel === "" || tugas === "") {
            $(this).addClass('bg-red-500').delay(500).queue(function(next){
                $(this).removeClass('bg-red-500');
                next();
            });
            return alert("Lengkapi data Arsitektur!");
        }

        // Simpan data ke array
        const newLog = {
            id: Date.now(), // Pakai timestamp biar unik
            mapel: mapel,
            tugas: tugas,
            tanggal: new Date().toLocaleDateString('id-ID')
        };

        notes.push(newLog);
        saveAndRender();

        // Reset input
        $('#mapel').val('');
        $('#tugas').val('');
    });

    function saveAndRender() {
        localStorage.setItem('studyLogs', JSON.stringify(notes));
        renderLogs();
    }

    function renderLogs() {
        $('#log-container').empty();
        if (notes.length === 0) {
            $('#empty-state').show();
            return;
        }

        $('#empty-state').hide();

        // Kelompokkan berdasarkan Mapel
        const grouped = notes.reduce((acc, obj) => {
            const key = obj.mapel;
            if (!acc[key]) acc[key] = [];
            acc[key].push(obj);
            return acc;
        }, {});

        for (const mapel in grouped) {
            let groupID = "group-" + mapel.replace(/\s+/g, '-').toLowerCase();
            const groupHeader = `
                <div id="${groupID}" class="animate-pop mb-10">
                    <div class="flex items-center gap-6 mb-8">
                        <div class="flex items-center gap-3">
                            <h3 class="text-xl font-black text-slate-900 tracking-tighter">
                            ${mapel}
                            </h3>
                        </div>
                    </div>
                    <div class="grid grid-cols-1 lg:grid-cols-2 gap-6 item-list"></div>
                </div>
            `;
            $('#log-container').append(groupHeader);

            grouped[mapel].forEach(item => {
                const cardHtml = `
                    <div class="bg-white p-8 rounded-[18px] shadow-sm hover:shadow-2xl transition-all group">
                        <div class="absolute top-0 left-0 w-1 h-full bg-blue-600 opacity-0 group-hover:opacity-100 transition-opacity"></div>
                        <div class="flex justify-between items-start mb-6">
                            <span class="text-[12px] bg-blue-50 text-blue-600 px-4 py-2 rounded-[12px] font-medium">
                            Topik yang di Pelajari
                            </span>
                            <div class="flex gap-4">
                                <button onclick="deleteNote(${item.id})" class="text-slate-400 hover:text-red-500 transition-colors">
                                <i class="fa-solid fa-trash-can">
                                </i>
                                </button>
                            </div>
                        </div>
                        <p class="text-slate-700 text-base font-semibold leading-relaxed my-4">
                        ${item.tugas}
                        </p>
                        <div class="flex items-center justify-between pt-6 border-t border-slate-50">
                            <div class="flex items-center gap-2 text-[12px] text-slate-400 font-black">
                                <span>
                                <img src="assets/svg/date-time.svg" alt="">
                                </span>
                                ${item.tanggal}
                            </div>
                        </div>
                    </div>
                `;
                $(`#${groupID} .item-list`).append(cardHtml);
            });
        }
    }

    // Fungsi Hapus Global
    window.deleteNote = function(id) {
        if (confirm("Hapus log materi ini?")) {
            notes = notes.filter(n => n.id !== id);
            saveAndRender();
        }
    };
});