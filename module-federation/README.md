# Module Federation

Webpack 5 에서 생성된 고급 기능.
여러 Javascript 어플리케이션 간에 코드를 동적으로 공유할 수 있는 방법을 제공합니다.
이 기능은 특히 마이크로 프론트엔드 아키텍쳐에 유용, 개별 어플리케이션들이 서로 독립적으로 개발 및 배포될 수 있도록 지원합니다.

## Module Federation 핵심 개념

Host : 메인 애플리케이션이며, 다른 애플리케이션(remotes)으로부터 모듈을 로드.
Remote : Host 에 로드될 수 있도록 모듈을 제공하는 애플리케이션, 이들은 독립적으로 배포될 수 있음.
Shared : 여러 어플리케이션 간에 공유되는 의존성, 중복 로딩을 방지, 일관된 의존성 관리를 가능하게 합니다.

## Module Federation 의 작동 원리

1. 플러그인 구성 : Webpack 설정에 `ModuleFederationPlugin` 을 추가 해 원격 호스트와 공유할 모듈 등을 정의.
2. 원격 엔트리 파일 생성 : 원격 어플리케이션을 위한 `remoteEntry.js` 가 생성, 이 파일은 호스트 애플리케이션이 원격 모듈을 로드할 떄 사용.
3. 모듈 노출 : 원격 어플리케이션에서는 `exposes` 객체를 통해 특정 모듈을 외부에 노출.
4. 동적 모듈 연결 : 호스트 애플리케이션은 `remoteEntry.js` 를 참조 해 필요한 모듈을 동적으로 로드합니다.

### 간단한 예시

원격 애플리케이션 설정 (Remote) Button 컴포넌트를 외부에 노출합니다.

```javascript
new ModuleFederationPlugin({
  name: "component-app",
  filename: "remoteEntry.js",
  exposes: {
    "./Button": "./src/components/Button",
  },
});
```

호스트 애플리케이션 설정 (Host) 원격 애플리케이션의 Button 컴포넌트를 사용합니다.

```javascript
new ModuleFederationPlugin({
  name: "main-app",
  remotes: {
    component_app: "component_app@http://localhost:3001/remoteEntry.js",
  },
});
```

Module Federation 을 사용하여, 마이크로프론트엔드 아키텍처를 구현할 떄, 여러 애플리케이션이 공통으로 사용하는 라이브러리를 효율적으로 관리하는 것도 중요합니다.
`shared` 설정 옵션은 공유 라이브러리의 버전 관리와 싱글톤 관리를 가능하게 합니다. `shared` 3가지 방법으로 사용 가능.

### 공유 라이브러리 설정 방법.

1. 라이브러리 이름 배열 사용.

- [`loadsh`] 와 같은 라이브러리 이름을 배열로 지정하면, `package.json` 에 정의된 버전에 따라 라이브러리가 공유됩니다.
  이 방식은 가장 간단하며, 프로젝트의 기존 설정에 자동으로 공유 버전이 결정됩니다.

```javascript
shared: ["lodash"];
```

2. 라이브러리 이름과 버전 직접 지정

- 아래 처럼 라이브러리 이름과, 버전을 같이 지정 가능. 이 방식은 `package.json` 의 버전과 관계없이 특정 버전을 명시적으로 공유하고 싶을 떄 유용합니다.

```javascript
     shared: {
       lodash: "4.17.21",
     }
```

3. 상세 옵션을 포함한 객체 이용

{lodash: {requiredVersion: '4.17.20', singleton: true, strictVersion: true}}와 같이 라이브러리를 객체로 지정하고, 여러 옵션을 설정할 수 있습니다.
`singleton` 옵션은 라이브러리가 애플리케이션 내에 단 하나의 인스턴스만을 가지도록 보장.
`strictVersion` 옵션은 지정된 버전을 엄격하게 준수해야 함을 의미합니다.

```javascript
    shared: {
        lodash: {
          requiredVersion: "4.17.21",
          // singleton: true,
          // strictVersion: true,
        },
```

### 코드 지연 로딩 및 오류 처리

Module Federation 을 통해 로드되는 컴포넌트나 모듈은 서버가 다를 수 있으므로, 일반적으로 지연 로딩(Lazy Loading)을 사용합니다.
React 에서는 `React.lazy`, `React.Suspense` 사용해 컴포넌트를 비동기적으로 로드, 로딩 상태를 처리합니다.
-> 이 과정에서 발생할 수 있는 오류를 관리하기 위해, React 의 에러 바운더리(Error Boundary) 기법을 사용해 애플리케이션의 나머지 부분에 장애가 확산되는 것을 방지 가능.

- 지연 로딩(Lazy Loading): 필요할 때까지 컴포넌트의 로드를 지연시켜 초기 로딩 성능을 향상시킵니다.
- 지연 UI 처리: React.Suspense를 사용하여 컴포넌트가 로드되는 동안 대체 UI를 표시합니다.
- 에러 격리: 에러 바운더리를 사용하여 비동기적으로 로드되는 컴포넌트에서 발생한 오류를 캡처하고, 애플리케이션의 나머지 부분에 영향을 주지 않도록 격리합니다.
- 에러 UI 처리: 에러 바운더리 내에서 오류 발생 시 사용자에게 친절한 메시지나 대체 UI를 제공합니다.

이러한 방법들은 마이크로프론트엔드 환경에서 컴포넌트와 모듈을 효율적으로 관리하고, 사용자 경험을 개선하는 데 중요한 역할을 합니다.
