class AppHeader extends HTMLElement {
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
                header {
                    background: #2DAA9E;
                    color: white;
                    text-align: center;
                    padding: 1rem;
                    font-size: 24px;
                    font-weight: bold;
                    font-family: "Fascinate Inline", serif;
                    font-style: normal;
                }
            </style>
            <header>Notes App</header>
        `;
    }
}

customElements.define("app-header", AppHeader);