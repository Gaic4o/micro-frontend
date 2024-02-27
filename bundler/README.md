# Webpack

Webpack 은 자바스크립트 어플리케이션을 위한 정적 모듈 번들러.
프로젝트에서 사용하는 모든 모듈 (자바스크립트, CSS, HTML, 이미지 등)을 매핑 하고, 하나의 번들(또는 여러 개의 번들)로 합치는 과정.
Webpack 으로 모듈화를 적용시킬려면, 개발자가 여러 개의 작은 파일(모듈)로 나누어 구성해서 import, export 예) 형식으로 호출 해서, 모듈 형식으로 만들어야 합니다. -> Webpack 이 이런식으로 모듈화가 적용되어 최적화된 하나의 파일(또는 분활된 몇 개 파일)을 얻을 수 있습니다.

## 왜 Webpack 을 사용할까?

성능 최적화 : 여러 개의 파일을 하나로 합치면, 브라우저의 네트워크 요청 횟수가 줄어들어, 로딩 시간이 크게 개선됩니다.
유지 관리 : 모듈별로 코드를 관리가 가능 해, 큰 프로젝트에서도 코드의 가독성과 유지보수가 용이합니다.
기능 확정성 : 다양한 플러그인과 로더를 통해, 이미지 최적화, CSS 전처리, 코드 압축 등 다양한 작업 가능.

### Webpack 개념

Entry : Webpack 이 어플리케이션을 구성하는 모듈의 의존성 그래프를 생성하기 시작하는 지점.
Output : 번들링된 결과물이 어디에 생성될 지를 정의.
Loaders : Webpack 은 기본적 자바스크립트와 JSON만 이해가 가능하므로, 다른 유형의 파일을 변환하기 위해 로더를 사용.
Plguins : 번들 최적화 및 환경 변수 주입과 같은 광범위한 작업 수행 가능.
Mode : development, production, none 중 하나를 설정 해 Webpack 의 내장 최적화 기능 활성화 가능.

```javascript
const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");

module.exports = {
  mode: "development",
  entry: "./src/index.js",
  output: {
    filename: "bundle.js",
    path: path.resolve(__dirname, "dist"),
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
          options: {
            presets: ["@babel/preset-env"],
          },
        },
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: "./src/index.html",
    }),
  ],
};
```

### Tree Shaking

Webpack은 사용하지 않는 코드를 제거하는 Tree Shaking 기능을 지원합니다. 이를 통해 최종 번들의 크기를 줄일 수 있습니다. 예를 들어, 라이브러리에서 특정 함수만 사용할 경우, 해당 함수만 번들에 포함시킬 수 있습니다.

### Babel과 SWC

Babel: 자바스크립트 코드를 변환하기 위한 툴체인으로, 최신 자바스크립트 코드를 이전 버전의 자바스크립트로 변환할 수 있습니다.
SWC: Babel의 대안으로, 빠른 성능을 제공하는 Rust로 작성된 컴파일러입니다. Webpack과 함께 사용하여 빌드 시간을 단축할 수 있습니다.

### 추가 플러그인과 로더

html-webpack-plugin: HTML 파일을 생성하고, 자동으로 번들을 추가합니다.
webpack-dev-server: 개발 중에 웹팩의 빌드를 메모리에 저장하고, 라이브 리로딩을 지원합니다.
css-loader, style-loader: CSS 파일을 자바스크립트 번들에 포함시키고, 동적으로 스타일을 적용할 수 있습니다.

## Vite

Vite 는 처음에 Vue 에서 많이 쓰였지만, 현재는 React, Svelte 등 대표 웹 프레임워크에서 많이 사용되고 있습니다.
기본으로 타입스크립트, CSS Loader 등이 내장되어 있고, HMR 과 개발 서버, Proxy 등을 지원하면서 탄탄 구성으로 인기를 얻고 있음.

내부적으로 esbuild, Rollup 을 사용.

Vite - 템플릿 이용 해 프로젝트 생성 -> Vite 는 Node.js Version 18+, 20+ 을 필요로 합니다.

`pnpm create vite@latest [프로젝트 이름] -- --template [템플릿 이름]`
React 관련 템플릿 : react, react-ts, react-swc, react-swc-ts

Vite

1. Hot Module Replacement (HMR)

개발 중에 코드를 변경할 때 전체 페이지를 새로고침하지 않고 변경된 모듈만 교체하는 기능입니다.
Vite는 ESM(ES Module)을 기반으로 HMR API를 제공하여, 변경 사항을 신속하고 정확하게 반영합니다.
Vite는 Vue Single File Components, React Fast Refresh와 같은 프레임워크별 최적화된 HMR 지원을 내장하고 있습니다.

2. ESM (ECMAScript Module)

import와 export 구문을 사용하여 모듈을 불러오고 내보낼 수 있는 JavaScript의 공식 모듈 시스템입니다.
Vite는 ESM을 활용하여 모듈을 빠르고 효율적으로 불러옵니다.

3. CommonJS와 UMD 모듈

CommonJS는 주로 Node.js 환경에서 사용되는 모듈 시스템입니다.
UMD(Universal Module Definition)는 여러 환경에서 모듈을 사용할 수 있도록 하는 방식입니다.
Vite는 이러한 모듈을 ESM 형식으로 사전 번들링하여 브라우저에서 사용할 수 있게 합니다.

4. 사전 번들링 및 모듈 로딩

Vite는 esbuild를 통해 CommonJS나 UMD로 작성된 모듈을 ESM 형식으로 변환하고 최적화합니다.
/node_modules/.vite/deps/...와 같은 특정 URL 경로를 사용하여 ESM을 지원하는 브라우저에서 모듈을 불러옵니다.
이 과정은 JavaScript 기반의 다른 번들러보다 빠른 콜드 스타트를 가능하게 하며, 의존성은 캐시되어 효율적인 로딩이 가능합니다.

### 내장 로더

1. Typescript
   Vite는 TypeScript 파일을 자동으로 트랜스파일합니다. 이는 코드를 JavaScript로 변환하는 과정만을 의미하며, 타입 검사는 별도로 IDE(통합 개발 환경) 또는 빌드 프로세스를 통해 수행되도록 권장됩니다.

2. JSX
   Vite는 .jsx 및 .tsx 파일을 지원합니다. 이 파일들은 esbuild를 사용하여 컴파일되므로, 빠른 컴파일 속도를 기대할 수 있습니다.

3. CSS
   .css 파일을 가져오면, Vite는 HMR(핫 모듈 교체)을 지원하는 <style> 태그를 통해 웹 페이지에 스타일을 동적으로 주입합니다. 이를 통해 개발 중 스타일 변경 사항이 즉시 반영됩니다.

4. 이미지 및 정적 에셋 (예: PNG)
   정적 에셋(이미지 파일 등)을 import하면, Vite는 해당 에셋에 대한 공개 URL을 반환합니다. 이는 웹 애플리케이션에서 이미지와 같은 자원을 쉽게 참조할 수 있게 해줍니다.

5. JSON
   JSON 파일은 직접 import가 가능합니다. 필요한 필드만을 선택하여 가져올 수 있으며, 이는 불필요한 데이터를 제거하는 트리 쉐이킹(tree shaking)을 가능하게 합니다.

### Webpack 과 Vite 차이점

빌드 방식 : Webpack 은 모든 모듈을 분석 후, 하나의 번들로 결합하는 접근 방식을 사용합니다. Vite 는 개발 모드에서 네이티브 ES 모듈을 활용하여 필요한 부분만을 빠르게 로드하고 변환합니다.
