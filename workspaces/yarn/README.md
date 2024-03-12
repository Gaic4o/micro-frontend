# Yarn Workspaces: 1.x vs Berry (Yarn 2)

## yarn 1.x workspaces

- 연결성: `yarn link` 를 사용하여 로컬에서 개발 중인 패키지를 다른 프로젝트에 쉽게 연결 가능합니다. -> `개발 중인 라이브러리를 다른 로컬 프로젝트에서 실시간으로 테스트 가능.`
- 설정: `package.json` 에 workspaces 속성을 추가하여 workspace 를 설정합니다. -> `yarn` 에서 어떤 디렉토리가 workspace로 관리되어야 하는 지 알려줍니다.

- 의존성 관리: `workspaces` 사용 해 프로젝트 전체의 의존성을 중앙에서 관리할 수 있습니다. -> 의존성 충돌을 최소화하고, 패키지 설치 시간 단축시킬 수 있음.
- 개인 프로젝트 설정 : 최상위 프로젝트에 `package.json` 파일에서 `private: true` 을 설정 해야 함 -> 해당 프로젝트가 실수로 npm 레지스트리에 공개되는 것을 방지합니다.

### 스크립트 실행, 버전 관리 및 배포

- 스크립트 실행 : `yarn worksapce <workspace-name> run <script>` 이용 해 특정 워크스페이스에서 스크립트를 실행 가능.
- 버전 관리 : yarn 에서는 워크스페이스 단위로 버전을 직접 변경하진 못하고, 버전을 변경 해야 할 패키지 디렉토리로 이동하여 `yarn version --new-version <version>` 으로 변경해야 합니다.
- 패키지 배포 : 배포하고자 하는 패키지의 디렉토리로 이동한 후 `yarn publish` 명령어를 실행하여 패캐지를 배포합니다.

## Yarn Berry (Yarn 2.x 이상) Workspaces와 Plug'n Play (PnP)

`Yarn Berry`는 Yarn의 최신 버전으로, 개선된 성능, 보안, 그리고 새로운 패키지 관리 방식인 Plug'n Play (PnP)를 도입했습니다.

## Plug`n Play(PnP) 방식이란?

- `node_modules` 비사용: `전통적인 node_modules 폴더를 사용하지 않고`, `.pnp.js` 에서 의존성을 직접 관리합니다.
- 의존성 격리: `PnP` 방식은 의존성 충돌을 방지 하고, 프로젝트 설치 속도를 개선 해 줍니다.

## 스크립트 실행, 버전 관리 및 배포

스크립트 실행 : `yarn workspace <workspace-name> run <script-name>` 명령어를 통해 특정 워크 스페이스에서 스크립트를 실행 할 수 있습니다. Yarn classic 과 유사합니다.

```bash
yarn workspace package-a run build
```

버전 관리 : yarn 2 에서는 `yarn workspace <workspace-name> run <script-name>` 명령어를 통해 특정 워크스페이스에서 스크립트를 실행할 수 있습니다. Yarn classic 와 유사합니다.

```bash
yarn workspace package-a version --new-version 1.0.1
```

패키지 배포 : `yarn publish --new-version <version>` 명령어를 사용하여 패키지를 배포합니다. 작업 디렉토리 패키지의 디렉토리로 이동한 후 명령어를 실행해야 합니다.

```bash
cd packages/package-a
yarn publish --new-version <version>
```

### pnp 작동 방식의 예

패키지 위치 : `pnp.js` 파일은 각 패키지의 정확한 저장 위치를 포함합니다, 이를 통해 Node.js 는 필요한 패키지를 바로 찾아 로드할 수 있습니다.

```javascript
module.exports = {
  packages: {
    express: {
      version: "4.17.1",
      location: "/path/to/global/cache/express-4.17.1",
    },
    // 다른 패키지들...
  },
};
```

`pnp 에서 패키지가 프로젝트 디렉토리 외부의 캐시 폴더에 저장되며`, pnp.js 같은 파일이 패키지들을 찾을 떄 필요한 모든 정보를 제공해줍니다.
즉, 패키지는 install 되어서 로컬에 있지만, node_modules 구조와 방식이 다름.

```
my-project/
├── .pnp.js
├── src/
│   └── index.js
└── package.json
```

```javascript
module.exports = {
  packages: {
    express: {
      version: "4.17.1",
      location: "/path/to/global/cache/express-4.17.1",
    },
    react: {
      version: "17.0.2",
      location: "/path/to/global/cache/react-17.0.2",
    },
  },
};
```

```javascript
const express = require("express");
const app = express();
```

-> Node.js 에서는 `.pnp.js` 파일을 참조하여, /path/to/global/cache/express-4.17.1/index.js 위치에서 `express` 모듈을 찾아 로드합니다.
실제로 프로젝트 pnp.js 패키지를 까보면 이것보다 조금 더 구조와 로직이 이보다 복잡하지만, 기본적으로 모든 패키지의 정확한 위치 정보를 관리 후, `node.js` 가 필요로 하는 패키지를 정확한 경로로 로드할 수 있게 해줍니다.

단점 : 호환되지 않는 패키지가 있을 경우, `pnp` 에서는 `node_modules` 에 패키지가 설치되며, `node_modules` 에서 패키지를 로드하는 형식으로 작동합니다.

## 보안 취약점 검사

Yarn Classic (Yarn 1.x), Yarn Berry (Yarn 2.x 이상) 각각 `yarn audit`, `yarn npm audit` 명령어를 입력 해, 프로젝트에 설치된 패키지 버전에 있는 보안 취약점들이 있는 지 검사 해 줍니다.

```bash
$ yarn audit
yarn audit v1.22.10
┌───────────────┬──────────────────────────────────────────────────────────────┐
│ high          │ Inefficient Regular Expression Complexity in nth-check       │
├───────────────┼──────────────────────────────────────────────────────────────┤
│ Package       │ nth-check                                                    │
├───────────────┼──────────────────────────────────────────────────────────────┤
│ Patched in    │ >=2.0.1                                                      │
├───────────────┼──────────────────────────────────────────────────────────────┤
│ Dependency of │ react-scripts                                                │
├───────────────┼──────────────────────────────────────────────────────────────┤
│ Path          │ react-scripts > @test/webpack > @test/plugin-svgo > svgo >   │
│               │ css-select > nth-check                                       │
├───────────────┼──────────────────────────────────────────────────────────────┤
│ More info     │ https://www.npmjs.com/advisories/1070415                     │
└───────────────┴──────────────────────────────────────────────────────────────┘
1 vulnerabilities found - Packages audited: 1203
Severity: 1 High
✨ Done in 1.23s.
```

- Severity : 발견된 취약점 심각도가 `high` 으로 되어 있어, 빨리 조치를 취해야 함을 알 수 있음.
- Package : 취약점이 발견된 패키지 이름은 `nth-check` 입니다. 이 패키지에서 비효율적인 정규 표현식 복잡성으로 인한 취약점이 확인됨.
- Patched in : 취약점이 해결된 패키지 버전은 `>=2.0.1` 입니다. `nth-check` 패키지를 이 버전 이상으로 업데이트 해야 함을 알 수 있음.
- Dependency of: 이 취약점은 react-scripts 패키지의 의존성을 통해 프로젝트에 포함되어 있습니다. 즉, react-scripts가 해당 취약점을 갖는 nth-check 패키지를 간접적으로 사용하고 있음을 나타냅니다.
- Path: 취약한 패키지까지의 의존성 경로는 react-scripts > @test/webpack > @test/plugin-svgo > svgo > css-select > nth-check로 표시됩니다. 이는 react-scripts부터 시작해 nth-check에 이르기까지, 취약한 패키지에 도달하는 데 어떤 패키지들을 거치는지 보여줍니다.
- More info: 취약점에 대한 자세한 정보를 제공하는 링크는 https://www.npmjs.com/advisories/1070415입니다. 이 웹사이트를 방문하면 해당 취약점에 대한 상세한 설명, 영향 받는 버전, 해결된 버전, 권장되는 조치 사항 등을 확인할 수 있습니다.

정리를 해 보자면 yarn berry 를 사용하면 -> node_modules 을 사용하는 classic, npm workspace 에서는 import, require 할 떄 재귀적으로 탐색해야 해서, 디렉토리가 복잡하거나, 의존성이 많으면 오래 걸릴 수 있음 이 부분을 해결 할 수 있음.
그리고 pnp 방식에서 각 패키지를 의존성을 정확히 격리를 시켜, 다른 패키지 간의 충돌을 방지시킬 수 있습니다.
workspace 환경이라면 더더욱 이 장점을 느낄 수 있을 것 같음.
