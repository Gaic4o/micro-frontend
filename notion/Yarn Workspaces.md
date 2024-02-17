# Yarn Workspaces: 1.x vs Berry (Yarn 2)

## yarn 1.x workspaces 

- 시기적 이점: `yarn Workspaces` 는 `npm` 에서 비슷한 기능이 나오기 전에 소개되었습니다.
- 연결성: `yarn link` 를 사용하여 로컬에서 개발 중인 패키지를 다른 프로젝트에 쉽게 연결할 수 있습니다.
- 설정: `package.json` 에 workspaces 속성을 추가하여 워크스페이스를 설정합니다.
- 의존성 관리: 프로젝트 전체에서 패키지의 의존성을 함께 관리함으로써 충돌을 최소화하고 효율성을 높입니다.
- 제한사항: npm 과 유사한 방식으로 의존성을 관리하기 때문에, 그와 비슷한 한계를 가집니다.
- 개인 프로젝트 설정: 최상위 프로젝트에서 `private: true` 설정을 해야 합니다. 

## Yarn Berry (Yarn 2) Workspaces와 Plug'n Play (PnP)

Yarn Berry 는 Yarn 1.x의 후속 버전으로, 패키지 관리 방식에 혁신적인 변화를 가져왔습니다. 이 중 가장 큰 변화는 Plug'n Play (PnP) 기능의 도입입니다.

- 변화: PnP를 통해 node_modules 폴더 없이 패키지 의존성을 직접 관리합니다. 이는 프로젝트의 설치 속도와 효율성을 개선합니다.
- IDE 호환성: PnP 방식은 기존과 다르기 때문에, 일부 개발 도구나 ID E가 이를 바로 지원하지 않을 수 있습니다. 이를 위해 추가 설정이나 SDK 를 사용하여 개발 도구가 PnP 환경에서도 잘 작동하도록 만들어야 할 수 있습니다.

## Plug`n Play(PnP) 방식이란?

- `node_modules` 비사용: 전통적인 node_modules 폴더를 사용하지 않고, 의존성을 직접 관리합니다.
- 의존성 격리: 하위 의존성 패키지들이 상위 패키지 폴더에 중첩되어 설치되는 문제를 해결합니다. 버전 충돌 및 의존성 문제를 방지합니다
- 설치 속도: PnP를 사용할 경우, 설치 속도가 node_modules 를 사용하는 경우보다 조금 느릴 수 있습니다.


### pnp 작동 방식은 어떻게 될까요?

일단 node_modules 방식의 작동 원리는 이렇게 됩니다. 

-> 패키지가 프로젝트 디렉토리 내의 node_modules 폴더에 복사되어 install 됩니다. 
-> 이 폴더를 통해 Node.js가 필요한 패키지를 찾고 로드합니다. 

``` 
my-project/
├── node_modules/
│   ├── express/
│   │   ├── lib/
│   │   └── index.js
│   └── react/
│       ├── lib/
│       └── index.js
├── src/
│   └── index.js
└── package.json
```

```javascript
// src/index.js 에서 express 패키지를 사용하는 방법 
const express = require('express');
const app = express();
```

1. 파일 시스템 탐색 : `require('express')`를 실행할 때, Node.js는 node_modules 폴더와 그 하위 폴더들을 순차적으로 탐색합니다.
2. 중복 및 중첩 : `node_modules` 폴더는 패키지의 중복과 복잡한 중첩 구조를 가질 수 있습니다. 


pnp 작동 방식은 이렇게 진행 됩니다. 

pnp 에서 패키지가 프로젝트 디ㅔ렉토리 외부의 캐시 폴더에 저장되며, pnp.js 같은 파일이 패키지들을 찾을 떄 필요한 모든 정보를 제공해줍니다. 
즉, 패키지는 install 되어서 로컬에 있지만, node_modules 구조와 방식이 다름. 

```
my-project/
├── .pnp.js
├── src/
│   └── index.js
└── package.json
```

```javascript
// .pnp.js 파일 내부의 예시적인 내용 (실제 구현과는 다를 수 있음)
module.exports = {
  "packages": {
    "express": {
      "version": "4.17.1",
      "location": "/path/to/global/cache/express-4.17.1"
    },
    "react": {
      "version": "17.0.2",
      "location": "/path/to/global/cache/react-17.0.2"
    }
  }
};
```

```javascript
// src/index.js 에서 express 패키지를 사용하는 방법 
const express = require('express');
const app = express();
```

-> Node.js 에서는 `.pnp.js` 파일을 참조하여, /path/to/global/cache/express-4.17.1/index.js 위치에서 `express` 모듈을 찾아 로드합니다. 
실제로 프로젝트 pnp.js 패키지를 까보면 이것보다 조금 더 구조와 로직이 이보다 복잡하지만, 기본적으로 모든 패키지의 정확한 위치 정보를 관리 후, `node.js` 가 필요로 하는 패키지를 정확한 경로로 로드할 수 있게 해줍니다. 

단점 : 호환되지 않는 패키지가 있을 경우, `pnp` 에서는 `node_modules` 에 패키지가 설치되며, `node_modules` 에서 패키지를 로드하는 형식으로 작동합니다.



