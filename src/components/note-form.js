class NoteForm extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: "open" });
    }

    connectedCallback() {
        this.render();
    }

    render() {
        this.shadowRoot.innerHTML = `
            <style>
                form {
                    display: flex;
                    flex-direction: column;
                    gap: 10px;
                    margin-bottom: 20px;
                }
                input, textarea {
                    padding: 10px;
                    border: 1px solid #ddd;
                    border-radius: 5px;
                    font-family: Arial, sans-serif;
                }
                textarea {
                    min-height: 100px;
                    resize: vertical;
                }
                button {
                    padding: 10px;
                    background: #007bff;
                    color: white;
                    border: none;
                    border-radius: 5px;
                    cursor: pointer;
                    font-weight: bold;
                }
                button:hover {
                    background: #0056b3;
                }
            </style>

            <form id="note-form">
                <input type="text" id="title" placeholder="Judul catatan..." required />
                <textarea id="body" placeholder="Isi catatan..." required></textarea>
                <button type="submit">Simpan</button>
            </form>
        `;

        this.shadowRoot.querySelector("#note-form").addEventListener("submit", (e) => {
            e.preventDefault();

            const title = this.shadowRoot.querySelector("#title").value;
            const body = this.shadowRoot.querySelector("#body").value;

            this.dispatchEvent(new CustomEvent("add-note", {
                detail: {
                    title,
                    body
                },
                bubbles: true,
            }));

            // Reset form
            this.shadowRoot.querySelector("#title").value = "";
            this.shadowRoot.querySelector("#body").value = "";
        });
    }
}

customElements.define("note-form", NoteForm);