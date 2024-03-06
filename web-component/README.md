# Web Component

## Web Component 란 ?

Web Component 는 웹 표준 기술을 사용 해, `재사용 가능한 커스텀 엘리먼트`를 만들 수 있게 해주는 기술 모음.
웹 애플리케이션을 구성하는 `작은 부품들을 만들어, 코드의 재사용성을 높이고, 유지보수`를 쉽게 할 수 있습니다.

사용자 정의 요소 (Custom Element): 개발자가 직접 새로운 HTML 태그를 정의할 수 있게 해줍니다.
캡슐화 (Shadow DOM) : 스타일과 마크업을 캡슐화해서, 컴포넌트의 내부 구현을 외부와 격리시킵니다.
HTML 템플릿 (Templates and Slots) : 코드 조각을 `<template>` 태그로 정의 후, `<slot>` 을 사용 해 동적으로 컨텐츠를 삽입 가능합니다.

### Custom Elements 란?

Custom Element 을 사용하면, 개발자는 자신만의 HTML 을 생성할 수 있습니다. 이를 통해 웹 애플리케이션에 재사용 가능한 커스텀 엘리먼트를 쉽게 통합 가능합니다.

```html
<script>
  class MyGreeting extends HTMLElement {
    constructor() {
      super();
      this.innerText = "Hello, Custom Elements!";
    }
  }
  customElements.define("my-greeting", MyGreeting);
</script>

<!-- Custom Element 사용 -->
<my-greeting></my-greeting>
```

`MyGreeting` 이라는 이름의 Class 정의 후, `my-greeting` 이라는 tag 이름으로 Custom Element 로 등록합니다.
웹 페이지에서는 `<my-gretting>` 태그를 사용 해, 해당 태그는 자동으로 `MyGreeting` Class의 인스턴스가 되어 `Hello, Custom Element!` 라는 텍스트를 표시하게 됩니다.

### HTML 템플릿(<template> 및 <slot>)

`<template>` 태그는 웹 페이지에 미리 로드되지만, 렌더링 되지 않는 HTML 마크업을 담을 수 있습니다.
`<slot>` 태그는 Shadow DOM 내에서 사용되며, 커스텀 엘리먼트의 사용자가 정의한 내용을 삽입할 수 있는 플레이스홀더 역할을 합니다.

```html
<template id="my-template">
  <div>
    <span>Hello,</span>
    <slot name="name-slot">Name</slot>
  </div>
</template>

<script>
  class MyUserCard extends HTMLElement {
    constructor() {
      super();
      const template = document.getElementById("my-template").content;
      const shadowRoot = this.attachShadow({ mode: "open" }).appendChild(
        template.cloneNode(true)
      );
    }
  }

  customElements.define("my-user-card", MyUserCard);
</script>

<!-- Custom Element 사용 -->
<my-user-card>
  <span slot="name-slot">Web Components</span>
</my-user-card>
```

이 예시에서는 my-user-card라는 Custom Element를 정의하고, <template>를 사용하여 기본 구조를 만듭니다. <slot> 태그에 name-slot이라는 이름을 지정하고, 커스텀 엘리먼트를 사용할 때 <span slot="name-slot">Web Components</span>처럼 해당 슬롯에 들어갈 내용을 정의할 수 있습니다. 결과적으로 "Hello, Web Components"가 표시됩니다.

이렇게 Custom Elements와 HTML 템플릿을 사용하면, 재사용 가능하고 유지보수가 쉬운 웹 컴포넌트를 만들 수 있습니다.

### React Component 란?

React 는 사용자 인터페이스를 구성하기 위한 Javascript 라이브러리로, 컴포넌트 기반으로 작동합니다.
JSX 라는 문법을 사용 해, UI 를 선언적으로 표현할 수 있고, 데이터가 변경될 떄 마다 효율적으로 UI 을 업데이트 합니다.

### Web Component 와 React Component 차이점

표준 대 라이브러리 : Web Component 은 `웹 표준을 따르고, 어떠한 라이브러리나 프레임워크 없이도 모든 현대적인 브라우저에서 네이티브로 동작합니다.` 반면, React Component 는 React 라이브러리 내에서만 동작하고, 이를 사용하기 위해서 React 환경이 필요합니다.
재사용성 : 둘 다 재사용 가능한 컴포넌트를 만들지만, Web Component 는 웹 표준을 사용하여 보다 넓은 범위를 호환되며, React Component 는 React 생태계 내에서의 재사용에 중점을 둡니다.
캡슐화 : Web Component 의 `Shadow DOM` 은 스타일과 마크업을 완전히 캡슐화하여 격리시키는 반면, React 는 주로 CSS Module, Styled Components 등의 추가적인 도구를 사용 해, 스타일을 격리를 달성합니다.

### Shadow DOM 이란?

Shadow DOM은 웹 컴포넌트 중요한 부분으로, 컴포넌트 내부의 DOM 구조와 스타일을 외부로부터 격리시키는 기술.
이를 통해 컴포넌트 내부의 스타일이 페이지의 다른 부분에 영향을 주거나 받지 않도록 보호합니다.
개발자는 Shadow DOM 내부에서만 유효한 CSS 정의 가능, 컴포넌트 내부 구현을 외부로부터 숨길 수 있습니다.
Shadow DOM 은 컴포넌트를 진정한 의미에서 캡슐화하고, 웹 앱의 나머지 부분과 독립적으로 동작 할 수 있게 해줍니다.
