class ButtonComponent extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: "open" });

    const button = document.createElement("button");
    button.id = "btn";
    button.textContent = "클릭하세요";

    const style = document.createElement("style");
    style.textContent = `
      #btn {
        padding: 10px 15px;
        border: none;
        border-radius: 5px;
        background-color: blue;
        color: white;
        cursor: pointer;
        font-size: 16px;
      }
    `;

    this.shadowRoot.appendChild(style);
    this.shadowRoot.appendChild(button);

    button.addEventListener("click", () => {
      alert("버튼 클릭됨");
    });
  }
}

customElements.define("button-component", ButtonComponent);
