# Npm Workspaces 

workspace - 여러 관련 패키지들을 함께 관리할 수 있게 해주는 기능. -> `이를 통해 하나의 root project 에서 여러 sub project(workspace)을 관리할 수 있습니다.`
`workspace 을 사용하면, 각 서브 프로젝트의 의존성을 개별적으로 설치할 필요 없이, 루트 프로젝트의 node_modules 에서 관리 가능.` -> 예로 Root project 에서 package.json 에 여러 workspace(package-a, package-b) 경로 정의 가능. 

npm project 와 하위 Package 

Root Project 

- package.json 가 있고, 관련 정보가 있습니다. 
- node_modules 폴더 안에 사용 가능한 패키지가 존재 합니다.
- 소스 코드 내에 require("패키지 네임") or import("패키지 네임") 으로 위치를 찾아갑니다. 
    - require("패키지 네임") or import("패키지 네임")  가 위치를 찾아가는 방식을 이해해야 합니다.
    - 상대 경로인 경우 해당 파일 위치를 찾습니다.
    - 그냥 이름만 적혀 있는 경우, 현재 위치의 node_modules 를 찾아보고 없으면 상위 폴더로 이동하여 찾아갑니다.

Package 혹은 Workspace 

- package.json 가 있고, 관련 정보가 있습니다. 
- require("패키지 네임") or import("패키지 네임") 의 패키지 네임은 package.json 의 name 입니다. 
- 루트 프로젝트의 node_modules 안에 해당 패키지 네임으로 폴더가 있어야 합니다. 

require : CommonJS모듈 시스템에서 사용되며, 주로 Node.js 환경에서 사용됩니다. (서버 사이드 코드나, 도구 (빌드 도구, 스크립트 등) 에서 주로 사용)
import : ES6(ES2015) 도입된 모듈 시스템,  React, Next.js 프론트엔드 프레임워크/라이브러리에서 주로 사용됩니다.


```dtd
my-monorepo-npm-project/
├── package.json
├── node_modules/
└── packages/
    ├── package-a/
    │   ├── package.json
    │   └── index.js
    └── package-b/
        ├── package.json
        └── index.js
```

npm link : 개발 중인 패키지를 로컬에서 테스트하고, 다른 프로젝트에 쉽게 통합하기 위한 방법 입니다.
- 로컬 중 개발 중인 패키지를 npm 저장소에 배포하기 않고, 다른 프로젝트에서 설치된 것 처럼 테스트를 할 수 있습니다. 
- 초기에 테스트 하면서, 버그나 문제를 발견하고, 수정 가능. 
- npm link 은 보통 패키지의 동작을 검증할 수 있어, 배포 전 마지막 확인 단계로서의 역할을 합니다.

Root Project 

``` javascript
- package.json 
- node_modules 
    - package-a (package.json 의 name)
        - package.json 
        - index.js (package.json 의 main)
- main.js (require 를 통해 package-a 를 사용한다.)
- package-a (package.json 의 name) (내부 저장소로 가져옴, npm link)
    - package.json
    - index.js (package.json 의 main)
```

``` javascript 
npm init -y
mkdir package-a
mkdir node_modules
ln -s ../package-a ./node_modules/package-a

mkdir package-b
npm link ./package-b
```

npm v7부터 도입된 기능으로, 프로젝트 내 여러 패키지를 쉽게 관리할 수 있게 해줍니다.
package.json의 workspaces 속성을 통해 로컬 패키지들을 선언적으로 관리합니다.
npm install을 실행하면, 작업 공간에 정의된 패키지 간의 의존성을 자동으로 링크해줍니다.

사용 방법 예시:
1. npm init -y -w ./packages/a와 npm init -y -w ./packages/b를 통해 패키지 a와 b를 초기화합니다.
2. 패키지 a에 axios를 설치하려면, npm i -w a axios를 실행합니다.
3. 패키지 a를 시작하려면, npm start --workspace a를 사용합니다.

장점 :
1. 여러 패키지를 동시에 개발하고 관리하는 복잡한 프로젝트에서도, 각각의 패키지를 쉽게 추가, 삭제, 업데이트할 수 있습니다.
2. 싱글 레포지토리 또는 다중 레포지토리 방식에 관계없이, npm workspaces는 프로젝트의 구조를 단순화하고 의존성 관리를 간편하게 해줍니다.


## node_modules 에 있는 패키지들을 수정해야 할 상황이 왔을 떄, link 을 사용하게 되면 좋은 점 case

### npm link 를 사용해서 로컬 패키지의 버그 수정 및 타입 문제를 해결 할 수 있음.

요약: 개발 중인 A 패키지가 node_modules에 있는 B 패키지를 사용하고 있습니다. B 패키지에서 타입 문제나 버그가 발견되었을 때, 이를 해결하기 위해 npm link를 사용할 수 있습니다.

1. B 패키지 연결: B 패키지의 소스 코드 디렉토리에서 npm link를 실행하여 B 패키지를 글로벌 링크로 생성합니다.
2. A 패키지에서 B 링크: A 패키지의 디렉토리에서 npm link b를 실행하여 B 패키지를 A 패키지의 node_modules에 링크합니다.
3. 문제 해결 및 테스트: B 패키지의 타입 문제나 버그를 수정하고, 수정된 코드를 빌드합니다. 이 변경사항은 A 패키지에서 바로 반영되어 테스트할 수 있습니다.
4. 실시간 반영: B 패키지의 수정사항이 A 패키지에 실시간으로 반영되므로, 즉시 테스트하고 결과를 확인할 수 있습니다.

## 팀 내 다른 패키지의 기능 개선을 위한 npm link 활용.

요약 : 팀에서 개발 중인 여러 패키지 중, 디자인 시스템의 버튼 컴포넌트에 새로운 기능을 추가해야 하는 상황입니다.

1. 디자인 시스템 컴포넌트 링크: 버튼 컴포넌트가 위치한 디자인 시스템 패키지에서 npm link를 실행하여 글로벌 링크를 생성합니다.
2. 기능 추가 및 테스트: 필요한 기능을 버튼 컴포넌트에 추가하고, 이를 로컬에서 바로 테스트합니다.
3. 팀 프로젝트에 적용: 기능 추가가 완료되고 테스트를 마친 후, 변경된 디자인 시스템 패키지를 팀 프로젝트에 npm link를 통해 연결하여, 모든 변경사항을 팀 프로젝트에 적용하고, 추가된 기능을 테스트합니다.

`만약에 이런식으로 npm link 을 사용하지 않는 다면 이런 문제가 발생할 수 있습니다.`

라이브러리를 git clone 하고, 필요한 변경을 수행한 뒤, 변경 사항을 커밋하고, CI/CD 파이프라인을 통해 빌드 및 배포 과정을 거쳐야 합니다. 그 후에야 업데이트된 패키지를 npm을 통해 설치할 수 있습니다. 시간 소모가 될 수 있음.
-> 실시간 반영으로 개발 속도를 크게 향상 시킬 수 있습니다. 


## 여러 패키지들을 동시에 개발해야 할 떄 npm link 좋은 점 case 

여러 패키지들을 동시에 개발해야 할 상황이 있을 떄, 단일 레포지토리 또는 다중 레포지토리 방식으로 작업을 진행 하는 경우에도 큰 이점이 있음. 

디자인 시스템과, Next.js Project 초기 환경을 구축하고, 이제 점차적으로 2개의 패키지를 만들어 간다고 가정, 그리고 서로 다른 싱글 레포짓토리에서 관리된다고 가정을 했을 떄,
Next.js Project 에서 디자인 시스템 패키지를 npm link 으로 가져온 다음, 
로컬 환경에서 디자인 시스템 버튼 컴포넌트, token, theme 등을 구축 한 것들을 실시간으로 next.js 패키지에서 직접 가져와서 사용 하고, 유지 보수를 할 수 있습니다. 
그러면 동시에 2개의 패키지를 개발 해 나갈 수 있는 장점이 있습니다. 
