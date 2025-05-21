class NoteItem extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: "open" });
    }

    connectedCallback() {
        this.render();
    }

    static get observedAttributes() {
        return ["id", "title", "body", "date", "isArchived"];
    }

    attributeChangedCallback() {
        this.render();
    }

    render() {
        const isArchived = this.getAttribute("isArchived") === "true";

        this.shadowRoot.innerHTML = `
            <style>
                .note {
                    padding: 10px;
                    border-radius: 5px;
                    background: #fff;
                    box-shadow: rgba(0, 0, 0, 0.16) 0px 1px 4px;
                    margin-bottom: 10px;
                    font-family: Arial, sans-serif;
                }
                h3 { margin: 0 0 5px 0; }
                p { font-size: 14px; color: #555; }
                small { font-size: 12px; color: #888; }
                .note-actions { margin-top: 10px; display: flex; gap: 5px; }
                button { padding: 5px 10px; border: none; cursor: pointer; border-radius: 5px; }
                .edit-btn { background: #ffc107; }
                .delete-btn { background: #dc3545; color: white; }
                .archive-btn { background: ${isArchived ? "#28a745" : "#007bff"}; color: white; }
            </style>
            <div class="note">
                <h3>${this.getAttribute("title")}</h3>
                <p>${this.getAttribute("body")}</p>
                <small>${this.getAttribute("date")}</small>
                <div class="note-actions">
                    <button class="edit-btn">Edit</button>
                    <button class="delete-btn">Hapus</button>
                    <button class="archive-btn">${isArchived ? "Kembalikan" : "Arsipkan"}</button>
                </div>
            </div>
        `;

        this.shadowRoot.querySelector(".edit-btn")?.addEventListener("click", () => {
            this.dispatchEvent(new CustomEvent("edit-note", {
                detail: {
                    id: this.getAttribute("id"),
                    title: this.getAttribute("title"),
                    body: this.getAttribute("body"),
                },
                bubbles: true,
            }));
        });

        this.shadowRoot.querySelector(".delete-btn")?.addEventListener("click", () => {
            this.dispatchEvent(new CustomEvent("delete-note", {
                detail: this.getAttribute("id"),
                bubbles: true,
            }));
        });

        this.shadowRoot.querySelector(".archive-btn")?.addEventListener("click", () => {
            this.dispatchEvent(new CustomEvent("toggle-archive-note", {
                detail: {
                    id: this.getAttribute("id"),
                    isArchived: isArchived,
                },
                bubbles: true,
            }));
        });
    }
}

customElements.define("note-item", NoteItem);