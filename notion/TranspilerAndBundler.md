# Transpiler Bundler 

## 트랜스파일러 (Transpiler) 

트랜스파일러는 소스 코드를 한 언어에서, 다은 언어로 변환하는 도구인데, 
프론트엔드 개발에서는 Javascript ES6, Typescript 같은 언어를 오래된 Javascript 버전(ES5)으로 변환하는 데 사용 됩니다. 

대표적 예시 : `Babel`
-> Babel 이 Javascript 대표적으로 사용되는 트랜스파일러 입니다. 
-> Javascript(ES6, EP7) 최신 문법으로 코드를 작성할 수 있게 해주며, 이 코드를 브라우저가 이해할 수 있는 ES5 버전의 Javascript 코드로 변환 해 줍니다. 

## 번들러 (Bundler) 

여러 개의 파일 (Javascript, CSS, Image 등) 모아서, 하나 또는 몇 개의 파일로 결합하는 도구 입니다. 
이는 웹 페이지의 로드 시간을 줄이거나, 모듈 관리를 용이하게 해주며, 파일 간의 의존성 관리를 해줌. 

대표적 예시 : `Webpack`
-> 모듈 : (모든 파일 Javascript, CSS, Image, Font 등) 모듈로 취급됩니다.
-> 의존성 그래프 : 프로젝트의 시작점 index.js 시작 해, 모듈 간의 의존성을 추적하여 의존성 그래프를 만듭니다. (모든 모듈과 관계를 나타냅니다.)
-> 로더 (Loader) : Webpack 은 기본적으로 Javascript, JSON 파일만 이해 가능, 다른 타입 파일 (CSS, Image, Font 등) 처리하기 위한 Webpack Loader 사용. 

1. 진입점 설정 : webpack.config.js 파일에서 지정된 진입점에서 시작 해, 애플리케이션의 모듈과 라이브러리를 로드 
2. 로더 처리 : webpack 은 설정된 규칙에 따라, 적절 로더를 사용 해 파일을 처리 style-loader, css-loader 는 CSS 파일 처리, babel-loader 는 ES6 이상의 Javascript 변환 
3. 플러그인 실행 :  모든 파일이 로드되고 변환된 후, Webpack 다양한 최적화 작업을 수행하기 위해 플러그인을 실행. 
4. 출력 : Webpack 은 모든 모듈을 포함한 결과물 bundle.js을 출력합니다. 


## 대표적인 트랜스파일러, 컴파일러 

1. Babel 
2. Typescript : 타입시스템을 가지고 컴파일을 하는 인기있는 컴파일러 
3. esbuild : Go 를 기반으로 빠른 속도와 번들링까지 가능한 차세대 대표 트랜스파일러.
4. SWC : Rust 를 기반으로 빠른 속도와 쉬운 사용을 목표로 인기를 얻고 있는 트랜스파일러 입니다. 



## Babel

### Babel 설정 파일 

`.babelrc.json, babel.config.json, .babelrc.js, babel.config.js` -> Babel 설정 파일. 
이 파일들은 Babel 이 코드를 어떻게 변환할 지 결정 합니다. 

### 플러그인 Plugin 

플러그인은 Babel 이 특정 Javascript 문법을 다른 문법으로 변환하는 규칙을 정의.
예를 들어, 화살표 함수(()=>{})를 ES5 함수 표현식(function(){})으로 변환하고 싶다면, @babel/plugin-transform-arrow-functions 플러그인을 설정 파일에 추가합니다.

### 프리셋 Preset 

프리셋은 여러 플러그인의 집합. (개별적으로 각각 플러그인을 추가하는 대신, 관련된 플러그인을 묶어 미리 정의된 설정을 사용할 수 있음.)
`@babel/preset-env` 다양한 Javascript 최신 기능을 지원하는 플러그인 모음 -> 이 프리셋은 설정에 따라 필요한 변환만을 적용, 최종 번들의 크기를 최적화하고, 대상 브라우저에서 필요한 기능만을 포함하게 합니다. 


대표 preset
 
@babel/preset-env (최신 ES 스펙을 지원, 필요한 변환만 적용하여 번들 크기를 최적화하고, `.browserlistrc 또는 package.json 정의된 대상 브라우저에 맞춰 코드 변환`)
@babel/preset-react. (리액트 개발에 필요, JSX 문법을 Javascript 변환, React 에서 사용되는 다른 기능들을 지원)
@babel/preset-typescript (Typescript 코드를 순수 Javascript 변환)

내 느낌점 : 단순히 구형 브라우저를 위한 ES 변환 도구라고 생각했으나, 실제로는 플러그인 설치 및 설정, 프리셋 활용 등 더 세밀한 조정이 가능하다는 것을 깨달았습니다. 특히, @babel/preset-env 사용으로 자동적으로 필요한 변환을 적용하며, .browserslistrc를 통해 대상 브라우저를 세밀하게 설정할 수 있다는 사실을 알게 되었습니다.


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

