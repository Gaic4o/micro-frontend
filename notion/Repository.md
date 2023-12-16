# Repository


싱글 Repository 
- 하나의 Github Repository = Project 입니다. 
- 관리를 유지보수 하기 편리합니다.

Github Repository 에는 소스 코드(.js, .css. .html), 정적 파일(.svg, .png, .jpg), 프로젝트 설정(package.json), 외부 라이브러리(node_modules) 으로 구성되어 있습니다. 

멀티 Repository -> Multirepo(Polyrepo)
- 여러 개의 Github Repository Project 을 가진 Repository 입니다.(각각의 앱이나, 패키지가 별도의 저장소에 있음을 의미합니다.)
즉 여러 개의 Github Repository 에는 여러 개의 App, Npm Package 들이 담겨져 있습니다.

모노 Repository -> Monorepo 
- 하나의 Github Repository  = Project 입니다. 
멀티 Repository  와 비슷하다고 볼 수 있지만, 하나의 Github Repository 에 여러 가지의 서비스들이 담겨져 있음. 
여러 가지의 서비스들은 Workspace 용어로 불립니다. 

- 루트 프로젝트가 앱이나 라이브러리가 되지 않습니다. 보통 각각의 워크 스페이스 역할을 합니다.
- 루트 프로젝트와 각각의 워크 스페이스가 가지고 있는 외부 의존성이 효율적으로 관리되어야 합니다, 이를 위해 적절 패키지 관리자를 선정해야 합니다.
- 각각의 워크 스페이스를 독립적으로 제작하기 보다, 유기적으로 작업하기 떄문에, 패키지 간 의존성이 명확해야 하고, 의존성을 바탕으로 태스크를 수행해야 합니다.
- 각각의 워크스페이스는 앱으로 실행될 수도 있고, 모듈로서 다른 앱이나, 모듈에서 사용될 수 있습니다. 모듈인 워크스페이스는 패키지로 명확하게 노출합니다. 
