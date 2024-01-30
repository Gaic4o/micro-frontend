# Npm Workspaces 

npm workspace - 여러 관련 패키지들을 함께 관리할 수 있게 해주는 기능. -> `이를 통해 하나의 root project 에서 여러 sub project(workspace)을 관리할 수 있습니다.`
workspace - 여러 서브 패키지, 프로젝트들을 하나의 루트 프로젝트 안에서 관리할 수 있게 해줍니다. 
`workspace 을 사용하면, 각 서브 프로젝트의 의존성을 개별적으로 설치할 필요 없이, 루트 프로젝트의 node_modules 에서 관리 가능.` -> 예로 Root project 에서 package.json 에 여러 workspace(package-a, package-b) 경로 정의 가능. 

npm project 와 하위 Package 

Root Project 

- package.json 가 있고, 관련 정보가 있습니다. 
- node_modules 폴더 안에 사용 가능한 패키지가 존재 합니다.
- 소스 코드 내에 require("패키지 네임") 으로 위치를 찾아갑니다. 
    - require 가 위치를 찾아가는 방식을 이해해야 합니다.
    - 상대 경로인 경우 해당 파일 위치를 찾습니다.
    - 그냥 이름만 적혀 있는 경우, 현재 위치의 node_modules 를 찾아보고 없으면 상위 폴더로 이동하여 찾아갑니다.


Package 혹은 Workspace 

- package.json 가 있고, 관련 정보가 있습니다. 
- require("패키지 네임") 의 패키지 네임은 package.json 의 name 입니다. 
- 루트 프로젝트의 node_modules 안에 해당 패키지 네임으로 폴더가 있어야 합니다. 


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


npm v7 부터 사용 가능.
-> 루트 패키지 내에 로컬 파일 시스템 여러 패키지를 관리할 수 있도록 지원하는 npm cli 기능 집합 지칭. 
    - npm link 수동 사용 x 
    - package.json 파일의 workspaces 속성을 통해 정의.
    - 선언적으로 정의된 속성 이용, npm install 으로 자동 npm link 처리 

npm init -y -w ./packages/a
npm init -y -w ./packages/b
npm i -w a axios
npm start --workspace a

npm ls

npm-workspaces-example@1.0.0 /Users/gimminsu/Desktop/github/micro-frontend/workspaces/npm/npm-workspaces-example
├─┬ a@1.0.0 -> ./packages/a
│ └── axios@1.6.7
└── b@1.0.0 -> ./packages/b

npm ls --all  (axios 가 무엇을 의존하고 있는 지)

npm-workspaces-example@1.0.0 /Users/gimminsu/Desktop/github/micro-frontend/workspaces/npm/npm-workspaces-example
├─┬ a@1.0.0 -> ./packages/a
│ └─┬ axios@1.6.7
│   ├── follow-redirects@1.15.5
│   ├─┬ form-data@4.0.0
│   │ ├── asynckit@0.4.0
│   │ ├─┬ combined-stream@1.0.8
│   │ │ └── delayed-stream@1.0.0
│   │ └─┬ mime-types@2.1.35
│   │   └── mime-db@1.52.0
│   └── proxy-from-env@1.1.0
└── b@1.0.0 -> ./packages/b
