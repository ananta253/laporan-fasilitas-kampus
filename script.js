// DATA PENGADUAN
let reports = JSON.parse(localStorage.getItem("reports")) || [];


// ===============================
// NAVIGASI
// ===============================

function scrollToPengaduan() {
    document.getElementById("pengaduan").scrollIntoView({
        behavior: "smooth"
    });
}


// ===============================
// LOGIN
// ===============================

function openLogin() {
    document.getElementById("loginModal").style.display = "flex";
}

function closeLogin() {
    document.getElementById("loginModal").style.display = "none";
}

function login() {

    let email = document.getElementById("email").value;
    let password = document.getElementById("password").value;

    if (email === "" || password === "") {
        alert("Email dan password wajib diisi!");
        return;
    }

    alert("Login berhasil!");

    closeLogin();
}


function register() {

    let email = prompt("Masukkan email untuk membuat akun:");

    if (email) {
        alert("Registrasi berhasil! Silakan login.");
    }
}


// ===============================
// PREVIEW FOTO
// ===============================

document.getElementById("foto").addEventListener("change", function () {

    let file = this.files[0];

    if (file) {

        let reader = new FileReader();

        reader.onload = function (event) {

            document.getElementById("preview").src =
                event.target.result;

            document.getElementById("preview-container").style.display =
                "block";
        };

        reader.readAsDataURL(file);
    }
});


// ===============================
// SUBMIT PENGADUAN
// ===============================

document.getElementById("reportForm").addEventListener(
    "submit",
    function(event) {

        event.preventDefault();

        let lokasi =
            document.getElementById("lokasi").value;

        let fasilitas =
            document.getElementById("fasilitas").value;

        let keterangan =
            document.getElementById("keterangan").value;

        let fotoInput =
            document.getElementById("foto");

        let foto = "";

        if (fotoInput.files.length > 0) {

            let file = fotoInput.files[0];

            let reader = new FileReader();

            reader.onload = function(event) {

                foto = event.target.result;

                saveReport(
                    lokasi,
                    fasilitas,
                    keterangan,
                    foto
                );
            };

            reader.readAsDataURL(file);

        } else {

            saveReport(
                lokasi,
                fasilitas,
                keterangan,
                foto
            );
        }
    }
);


// ===============================
// SIMPAN DATA
// ===============================

function saveReport(
    lokasi,
    fasilitas,
    keterangan,
    foto
) {

    let report = {

        id: Date.now(),

        lokasi: lokasi,

        fasilitas: fasilitas,

        keterangan: keterangan,

        foto: foto,

        status: "Diajukan",

        tanggal: new Date().toLocaleDateString(
            "id-ID"
        )
    };


    reports.push(report);

    localStorage.setItem(
        "reports",
        JSON.stringify(reports)
    );


    alert(
        "Pengaduan berhasil dikirim!"
    );


    document.getElementById("reportForm").reset();

    document.getElementById(
        "preview-container"
    ).style.display = "none";


    displayReports();

    document.getElementById("status")
        .scrollIntoView({
            behavior: "smooth"
        });
}


// ===============================
// TAMPILKAN DATA
// ===============================

function displayReports() {

    let statusContainer =
        document.getElementById(
            "statusContainer"
        );

    let historyContainer =
        document.getElementById(
            "historyContainer"
        );


    if (reports.length === 0) {

        statusContainer.innerHTML =
            `<div class="empty-status">
                Belum ada pengaduan.
            </div>`;

        historyContainer.innerHTML =
            `<div class="empty-status">
                Belum ada riwayat pengaduan.
            </div>`;

        return;
    }


    statusContainer.innerHTML = "";

    historyContainer.innerHTML = "";


    reports.forEach(function(report) {

        let fotoHTML = "";

        if (report.foto) {

            fotoHTML =
                `<img src="${report.foto}"
                alt="Foto fasilitas">`;
        }


        let card = `
            <div class="report-card">

                <h3>${report.fasilitas}</h3>

                <p>
                    <strong>Lokasi:</strong>
                    ${report.lokasi}
                </p>

                <p>
                    <strong>Keterangan:</strong>
                    ${report.keterangan}
                </p>

                <p>
                    <strong>Tanggal:</strong>
                    ${report.tanggal}
                </p>

                ${fotoHTML}

                <br>

                <span class="status-badge">
                    ${report.status}
                </span>

            </div>
        `;


        statusContainer.innerHTML += card;

        historyContainer.innerHTML += card;

    });
}


// ===============================
// LOAD DATA SAAT WEBSITE DIBUKA
// ===============================

displayReports();


// ===============================
// TUTUP MODAL JIKA KLIK LUAR
// ===============================

window.onclick = function(event) {

    let modal =
        document.getElementById(
            "loginModal"
        );

    if (event.target === modal) {

        closeLogin();
    }
};