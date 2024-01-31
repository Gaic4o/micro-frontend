# Pnpm Workspaces 

pnpm 은 -> 하드 링크와 실볼릭 링크 두 가지 유형을 사용하여 package 를 관리합니다. 

하드 링크란? 
-> 파일 시스템에서 하드 링크는 파일의 실제 데이터를 가리키는포인터. 

심볼릭 링크란? 
-> 파일이나 디렉토리의 경로를 가리키는 링크, 심볼릭 링크는 하드 링크와 달리 파일의 실제 내용을 가리키는 것이 아니라 파일 경로를 가리킵니다. 
따라서, 심볼릭 링크는 원본 파일이나 디렉토리의 위치나 이름이 변경되면 더 이상 유효하지 않을 수 있습니다.

1. pnpm.store 에 저장 : pnpm 은 일단 외부 라이브러리를 사용하면, 데이터들을 `.pnpm-store` 에 저장 합니다. 
2. 하드 링크 생성 : `.pnpm-store` 내의 라이브러리 파일들은 하드 링크를 통해 공유됩니다. (하드 링크로 데이터를 중복 저장하지 않고, 여러 위치에서 같은 파일을 사용할 수 있게 해줌)
3. 심볼릭 링크 사용 (node_modules) : `node_modules` 에 심볼릭 링크가 생성됩니다. 이 심볼릭 링크는 `.pnpm-store` 하드 링크된 파일을 가리키지 않고, `.pnpm-store` 위치를 가리킴. `node_modules` 를 통해 패키지를 참조할 때 실제 패키지 데이터를 가리키는 `.pnpm-store` 의 위치로 안내합니다.

즉 쉽게 요약을 해보자면 이렇게 됩니다.

``` javascript
// loadsh install 
 
minsu-project
│
├── node_modules
│   ├── .bin
│   └── lodash -> ../../../.pnpm/node_modules/lodash
│
├── package.json
└── index.js
```

.pnpm-store 에 저장된 패키지 

``` javascript
.pnpm-store
│
└── node_modules
    └── lodash@4.17.15
        └── (lodash 패키지의 파일들...)
```

``` javascript
const _ = require('lodash');
console.log(_.random(1, 100));
```

`require(loadsh)` 을 실행하면 이런 과정을 거치게 됩니다. 

1. node_modules 에서 패키지 찾기 : minsu-project/node_modules 에서 lodash 을 찾습니다.
2. 심볼릭 링크 따라가기 : minsu-project/node_modules/loadsh 는 실제로 .pnpm-store/node_modules/loadsh@4.17.15 을 가리키는 심볼릭 링크입니다. 
3. 실제 패키지 로드 : Node.js는 이 심볼릭 링크를 따라가서 `.pnpm-store/node_modules/lodash@4.17.15` 에서 lodash 패키지의 실제 파일들을 찾아 로드합니다.

- pnpm 은 기존의 방식을 해치지 않으며, 빠르고 효율적인 방식을 사용. 

``` javascript
/projects
│
├── project1
│   └── node_modules
│       └── lodash -> ../../../.pnpm-store/lodash@4.17.15
│
└── project2
└── node_modules
└── lodash -> ../../../.pnpm-store/lodash@4.17.15
```


``` javascript
/.pnpm-store
│
├── lodash@4.17.15
│   └── ...
├── react@16.13.1
│   └── ...
└── ...
```

이런식으로 pnpm-store 으로 관리 했을 떄 장점

1. 다양한 버전의 패키지 관리 :  pnpm은 여러 버전의 동일 패키지를 효율적으로 관리할 수 있습니다. 예를 들어, lodash@4.17.15가 이미 설치되어 있고, 다른 프로젝트나 패키지에서 lodash@4.14.0을 요구한다면, pnpm은 두 버전을 별도로 .pnpm-store에 저장하고 각 프로젝트에 올바른 버전을 제공합니다.

2. 디스크 공간 효율적 사용 : pnpm 은 하드 링크를 사용 해 `.pnpm-store` 복사본을 사용 해, 여러 자식 패키지에 공유합니다. 이렇게 될 경우, 하나의 레포짓토리에서 여러 패키지들을 사용하더라도,
실제 패키지 데이터는 디스크에 한 번만 저장되므로, 많은 공간을 절약할 수 있습니다.
   
    -> 쉽게 말하자면, lodash 는 패키지의 실제 데이터는 .pnpm-store 에 저장이 됩니다. (여기에 저장된 데이터는 모든 프로젝트에 공유됩니다.)
    Project A, B 에서 lodash 사용한다고 가정, 각 프로젝트의 node_modules/loadsh 는 .pnpm.store 의 loadsh 데이터를 가리키는 심볼릭 링크 입니다. 
   심볼릭 링크 자체는 거의 공간을 차지하지 않습니다. 

3. 재사용성과 빠른 설치 시간 : 중앙 `.pnpm-store`에서, 새로운 프로젝트를 설치하고, 패키지를 설치 할 떄, pnpm 은 .pnpm-store 에 있는 필요한 패키지가 있는 지 먼저 검사를 한 뒤,
이미 존재하는 지 검사를 합니다. 그리고 없는 패키지들만 다운로드를 하고, 있던 패키지들은 다시 다운로드를 하지 않음. -> 다운로드 시간 줄여주고, 설치 시간 단축. 


pnpm 의존성 격리 저장 방식. 

일반 npm/yarn 의 의존성 저장 방식 (Flatten) 
 
``` javascript
project/
│
├── node_modules/
│   ├── lodash/
│   ├── express/
│   ├── react/
│   └── ...
│
├── package.json
└── ...
```

Flatten 특징.

1. 모든 패키지와 그 의존성들이 모두 `node_modules` 에 위치. 
2. 서로 다른 패키지가 같은 의존성을 공유할 경우, 이 의존성이 한 번만 설치되고, 여러 패키지에서 공유됩니다.
3. 의존성 버전 충돌이 발생할 수 있습니다 (A 패키지와 B 패키지가 서로 다른 버전의 C 패키지를 요구하는 경우).

pnpm 의 의존성 격리 저장 방식. 

``` javascript
project/
│
├── node_modules/
│   ├── .pnpm/
│   │   ├── lodash@4.17.15/
│   │   ├── express@4.17.1/
│   │   ├── react@16.13.1/
│   │   └── ...
│   ├── lodash -> .pnpm/lodash@4.17.15/node_modules/lodash
│   ├── express -> .pnpm/express@4.17.1/node_modules/express
│   ├── react -> .pnpm/react@16.13.1/node_modules/react
│   └── ...
│
├── package.json
└── ...
```

의존성 격리 특징 
1. 각 패키지는 .pnpm 폴더 내에서 자신의 경로를 가집니다 (예: .pnpm/lodash@4.17.15).
2. 각 패키지 폴더 내에는 해당 패키지의 의존성이 저장됩니다. 이는 패키지가 자신의 의존성 버전을 독립적으로 가질 수 있게 합니다.
3. 프로젝트의 최상위 node_modules에는 심볼릭 링크가 생성되어, 실제 패키지 데이터가 있는 .pnpm 폴더를 가리킵니다.
4. 이로 인해, 서로 다른 패키지가 서로 다른 버전의 동일 의존성을 요구할 때 충돌이 발생하지 않습니다.

-> 예시로 쉽게 알아보자면, 

projectA -> loadsh@4.17.15 사용.
projectB -> loadsh@4.14.0 사용.

모노 레포에서 npm/yarn(Flatten) 사용 시 node_modules 에는 Loadsh 어느 한 버전만이 존재할 수 있어서 -> 버전 충돌 에러가 발생합니다. 
pnpm 사용 시 projectA, projectB 각각의 loadsh 버전을 .pnpm 내에서 독립적으로 가지게 되고.

projectA/node_modules/lodash는 .pnpm/lodash@4.17.15를 가리키고, projectB/node_modules/lodash는 .pnpm/lodash@4.14.0를 가리키게 됩니다. 
