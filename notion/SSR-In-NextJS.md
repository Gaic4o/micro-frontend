# Server-side template composition(예 Next.js)

Next.js와 같은 프레임워크를 예로 든 서버 측 템플릿 구성은 웹 페이지나 애플리케이션에서 서버 측에서 HTML 템플릿을 조합하는 방법을 말합니다. 이 방식은 클라이언트 측(브라우저)보다 서버에서 더 많은 처리를 수행합니다.

## 장점

- **성능 향상**: 사용자의 브라우저로 전송되기 전에 서버에서 페이지가 완성되므로 클라이언트 측의 부하가 줄어듭니다.
- **SEO 최적화**: 검색 엔진은 완성된 HTML 페이지를 크롤링하고 인덱싱하기 때문에, 서버 측에서 완성된 페이지를 제공하면 검색 엔진이 페이지 내용을 더 잘 이해할 수 있습니다.
- **템플릿 재사용**: 서버 측에서 데이터를 처리하고 템플릿에 바인딩하면 같은 데이터를 여러 페이지나 템플릿에 재사용할 수 있습니다.
- **보안 문제 해결**: 서버 측에서 렌더링은 클라이언트 측의 취약점(예: XSS 취약점)에 대한 보호를 할 수 있으며, 이러한 위험을 감소시킬 수 있습니다.

## 단점

- **서버 리소스 요구 증가**: SSR은 서버에 추가적인 부하를 줄 수 있습니다. 각 요청에 대해 페이지를 렌더링하고 생성하기 때문에, 트래픽이 많은 사이트에서는 서버 리소스가 중요한 고려 사항이 됩니다.
- **클라이언트 측 상태 관리 제한**: 서버 측에서 렌더링된 페이지는 클라이언트 측에서의 상태 관리를 제한받을 수 있습니다. 예를 들어 사용자 인터랙션에 따라 동적으로 변경되는 UI 등이 있습니다.

## Next.js의 서버 측 작동 방식

1. **요청 처리**: 사용자가 웹 사이트에 접속하면, 그 요청은 먼저 Next.js 서버로 전달됩니다. 서버는 이 요청을 받고 어떤 React 페이지 컴포넌트가 이 요청에 응답해야 할지를 결정합니다.
    - 이 과정은 사용자가 요청한 URL 또는 경로에 따라 적절한 페이지를 렌더링하는 데 필수적입니다.

2. **데이터 로딩**: Next.js는 `getServerSideProps`나 `getStaticProps`와 같은 함수를 사용하여 서버 측에서 데이터를 로드합니다. 이 데이터는 이후 컴포넌트로 전달되어 페이지를 렌더링하는 데 사용됩니다.
    - 이 단계는 페이지에 필요한 데이터를 사전에 서버에서 준비하여 사용자에게 더 빠르고 효율적인 페이지 로딩 경험을 제공합니다.

3. **HTML 렌더링**: 서버에서는 React 컴포넌트를 HTML로 렌더링하며, 이 과정에서 페이지의 초기 상태도 함께 생성됩니다.
    - 서버 측에서 미리 생성한 HTML 을 미리 생성해서, 클라이언트 측의 부하를 줄이고, 더 빠른 페이지 로딩 시간을 달성합니다.

4. **결과 전송**: 서버는 생성된 HTML 과 페이지의 초기 상태를 클라이언트(사용자의 브라우저)에 전송합니다.
    - 완성된 페이지가 사용자에게 신속하게 전달되어, 사용자가 웹사이트의 내용을 빠르게 볼 수 있도록 합니다.

5. **클라이언트 측 하이드레이션**: 클라이언트 측에서는 서버로부터 받은 HTML을 화면에 표시 합니다. 그 후, React 는 이 HTML 에 추가적인 Javascript 인터렉션을 적용하는 하이드레이션 과정을 수행합니다.
    - 이 단계는 사용자 인터렉션과 같은 동적 요소들을 페이지에 추가될 수 있도록 합니다. 즉, 페이지가 정적 HTML 에서 동적인 웹 애플리케이션으로 변환됩니다.


