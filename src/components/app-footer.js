class AppFooter extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: "open" });
    }

    static get observedAttributes() {
        return ["text"];
    }

    attributeChangedCallback(name, oldValue, newValue) {
        if (name === "text") {
            this.render();
        }
    }

    connectedCallback() {
        this.render();
    }

    render() {
        this.shadowRoot.innerHTML = `
            <style>
                footer {
                    background: #2DAA9E;
                    color: white;
                    text-align: center;
                    bottom: 0;
                    height: 30px;
                    font-weight: bold;
                    font-family: "Sour Gummy", serif;
                    font-style: normal;
                }
            </style>
            <footer>
                <p>${this.getAttribute("text") || "Default Footer"}</p>
            </footer>
        `;
    }
}

customElements.define("app-footer", AppFooter);