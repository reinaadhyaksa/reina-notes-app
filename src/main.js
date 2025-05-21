import "./styles/main.css";
import "./components/app-footer";
import "./components/app-header";
import "./components/note-form";
import "./components/note-item";

async function fetchNotes() {
    const loadingIndicator = document.getElementById("loadingIndicator");
    if (loadingIndicator) loadingIndicator.style.display = "block";

    try {
        const responseActive = await fetch("https://notes-api.dicoding.dev/v2/notes");
        const resultActive = await responseActive.json();

        const responseArchived = await fetch("https://notes-api.dicoding.dev/v2/notes/archived");
        const resultArchived = await responseArchived.json();

        if (resultActive.status === "success" && resultArchived.status === "success") {
            renderNotes(resultActive.data, "notes-container", true);
            renderNotes(resultArchived.data, "archived-container", false);
        } else {
            console.error("Gagal mengambil catatan.");
        }
    } catch (error) {
        console.error("Kesalahan:", error);
    } finally {
        if (loadingIndicator) loadingIndicator.style.display = "none";
    }
}

function renderNotes(notes, containerId, isActive) {
    const notesContainer = document.getElementById(containerId);
    notesContainer.innerHTML = ""; // Bersihkan daftar sebelum merender ulang

    notes.forEach((note) => {
        const noteItem = document.createElement("note-item");
        noteItem.setAttribute("title", note.title);
        noteItem.setAttribute("body", note.body);
        noteItem.setAttribute("date", new Date(note.createdAt).toLocaleString());
        noteItem.setAttribute("id", note.id);
        noteItem.setAttribute("isArchived", isActive ? "false" : "true");

        notesContainer.appendChild(noteItem);
    });
}

// Tambah Catatan Baru
document.addEventListener("add-note", async (event) => {
    const { title, body } = event.detail;
    try {
        const response = await fetch("https://notes-api.dicoding.dev/v2/notes", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ title, body }),
        });

        const result = await response.json();
        if (result.status === "success") {
            fetchNotes();
        } else {
            console.error("Gagal menambahkan catatan.");
        }
    } catch (error) {
        console.error("Kesalahan:", error);
    }
});

// Edit Catatan
document.addEventListener("edit-note", async (event) => {
    const { id, title, body } = event.detail;
    const newTitle = prompt("Edit Judul:", title);
    const newBody = prompt("Edit Isi:", body);

    if (newTitle !== null && newBody !== null) {
        await updateNote(id, newTitle, newBody);
    }
});

async function updateNote(id, title, body) {
    try {
        const response = await fetch(`https://notes-api.dicoding.dev/v2/notes/${id}`, {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ title, body }),
        });

        const result = await response.json();
        if (result.status === "success") {
            fetchNotes();
        } else {
            console.error("Gagal memperbarui catatan.");
        }
    } catch (error) {
        console.error("Kesalahan:", error);
    }
}

// Hapus Catatan
document.addEventListener("delete-note", async (event) => {
    await deleteNote(event.detail);
});

async function deleteNote(id) {
    try {
        const response = await fetch(`https://notes-api.dicoding.dev/v2/notes/${id}`, {
            method: "DELETE",
        });

        const result = await response.json();
        if (result.status === "success") {
            fetchNotes();
        } else {
            console.error("Gagal menghapus catatan.");
        }
    } catch (error) {
        console.error("Kesalahan:", error);
    }
}

// Arsipkan / Kembalikan Catatan
document.addEventListener("toggle-archive-note", async (event) => {
    const { id, isArchived } = event.detail;
    isArchived ? await unarchiveNote(id) : await archiveNote(id);
});

async function archiveNote(id) {
    try {
        const response = await fetch(`https://notes-api.dicoding.dev/v2/notes/${id}/archive`, {
            method: "POST", // Mengubah dari PUT menjadi POST sesuai dokumentasi API
            headers: { "Content-Type": "application/json" },
        });

        const result = await response.json();
        if (result.status === "success") {
            fetchNotes();
        } else {
            console.error("Gagal mengarsipkan catatan.");
        }
    } catch (error) {
        console.error("Kesalahan:", error);
    }
}

async function unarchiveNote(id) {
    try {
        const response = await fetch(`https://notes-api.dicoding.dev/v2/notes/${id}/unarchive`, {
            method: "POST", // Mengubah dari PUT menjadi POST sesuai dokumentasi API
            headers: { "Content-Type": "application/json" },
        });

        const result = await response.json();
        if (result.status === "success") {
            fetchNotes();
        } else {
            console.error("Gagal mengembalikan catatan.");
        }
    } catch (error) {
        console.error("Kesalahan:", error);
    }
}

// Panggil fetchNotes saat pertama kali halaman dimuat
fetchNotes();