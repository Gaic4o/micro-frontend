class DescriptionComponent extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: "open" });

    const template = document.createElement("template");
    template.innerHTML = `
        <style>
          h1 {
            color: green;
          }
        </style>
        <h1>Web Components는 웹 표준을 사용하여 어떤 브라우저나 프레임워크에서도 동작할 수 있는 재사용 가능한 커스텀 엘리먼트를 만드는 기술입니다. 이에 반해, React Components는 React 라이브러리에 특화된 사용자 인터페이스 구성 요소로, JSX를 사용하여 선언적 UI를 생성하고, 상태 관리와 생명주기 기능을 제공합니다. Shadow DOM은 Web Components의 일부로, 스타일과 마크업을 격리시켜 컴포넌트 내부를 외부와 분리합니다.</h1>
      `;

    this.shadowRoot.appendChild(template.content.cloneNode(true));
  }
}

customElements.define("description-component", DescriptionComponent);
