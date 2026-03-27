$(document).ready(function() {
    
    // --- 1. POST NEW QUEST LOGIC ---
    $('#btn-post-quest').on('click', async function() {
        // Menggunakan modal input yang sudah di-styling sesuai tema Myastudy
        const { value: formValues } = await Swal.fire({
            title: '<h3 class="font-black text-2xl tracking-tighter">Buat Misi Belajar Baru</h3>',
            html:
                '<input id="swal-title" class="swal2-input font-medium" style="border-radius: 12px" placeholder="Judul Tugas/Misi">' +
                '<select id="swal-category" class="swal2-input font-medium" style="border-radius: 12px">' +
                '<option value="Programming">Programming</option>' +
                '<option value="Public Speaking">Public Speaking</option>' +
                '<option value="Matematika">Matematika</option>' +
                '</select>' +
                '<textarea id="swal-desc" class="swal2-textarea" style="border-radius: 1rem" placeholder="Detail bantuan..."></textarea>',
            focusConfirm: false,
            confirmButtonText: 'Posting Misi!',
            confirmButtonColor: '#2563eb', // Konsisten dengan Blue-600 Myastudy
            showCancelButton: true,
            cancelButtonText: 'Batal',
            // Validasi input sisi klien (UX)
            preConfirm: () => {
                if (!$('#swal-title').val() || !$('#swal-desc').val()) {
                    Swal.showValidationMessage('Wah, field-nya masih ada yang kosong!');
                }
                return {
                    title: $('#swal-title').val(),
                    category: $('#swal-category').val(),
                    desc: $('#swal-desc').val()
                }
            }
        });

        // --- 2. DYNAMIC RENDERING ---
        if (formValues) {
            // Template literal disesuaikan agar Card baru memiliki UI yang sama dengan Card statis
            const newQuest = `
                <div class="quest-card bg-white p-10 rounded-[22px] border-2 border-slate-50 shadow-sm hover:border-blue-600 hover:shadow-2xl hover:shadow-blue-100 transition-all duration-500">
                    <div class="flex justify-between items-start mb-8">
                        <span class="bg-blue-50 text-blue-600 text-[11px] font-black px-4 py-1.5 rounded-lg uppercase tracking-wider">${formValues.category}</span>
                        <span class="text-slate-400 text-[12px] font-semibold">Baru Saja</span>
                    </div>
                    <h4 class="text-2xl font-black text-slate-900 mb-4 tracking-tight">${formValues.title}</h4>
                    <p class="text-sm text-slate-500 mb-8 leading-relaxed font-medium">${formValues.desc}</p>
                    <div class="flex items-center justify-between pt-8 border-t border-slate-50">
                        <div class="flex -space-x-3">
                            <div class="w-10 h-10 rounded-full bg-slate-800 border-4 border-white flex items-center justify-center text-[10px] text-white font-bold">Me</div>
                        </div>
                        <button class="join-quest-btn text-blue-600 font-semibold text-sm hover:underline flex items-center">
                            Ikut Diskusi <i class="fa-solid fa-arrow-right-long ml-2"></i>
                        </button>
                    </div>
                </div>
            `;

            // Menampilkan data terbaru di posisi paling atas (Prepend)
            $('#quest-container').prepend(newQuest);

            // Toast feedback instan setelah data berhasil dirender
            Swal.fire({
                icon: 'success',
                title: 'Misi Berhasil Diposting!',
                toast: true,
                position: 'top-end',
                showConfirmButton: false,
                timer: 3000
            });
        }
    });

    // --- 3. INTERACTION ---
    $(document).on('click', '.join-quest-btn', function() {
        Swal.fire({
            title: 'Berhasil Bergabung!',
            text: 'Link diskusi sudah dikirim ke email Myastudy kamu.',
            icon: 'info',
            confirmButtonColor: '#2563eb'
        });
    });
});