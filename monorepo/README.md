# Monorepo

`Monorepo 방식은 여러 관련 프로젝트를 하나의 저장소에서 관리하는 방식`
Monorepo 사용하는 이유와 장단점, 구현 방식에 정리 해 봤습니다.

## 필요성

여러 프로젝트 통합 관리 : `여러 마이크로 앱이 하나의 어플리케이션 구성하는 경우`, 각각을 별도로 관리하는 것 보다, 모노레포에서 관리하는 것이 효율적입니다.
의존성 관리 : 공통 코드 사용이나 의존성이 명확한 프로젝트들 사이의 관계를 쉽게 관리 가능.
변경 영향 분석 : 수정된 코드가 다른 마이크로 앱에 미치는 영향을 쉽게 파악 가능.

## 모노레포의 장점

통합된 히스토리 조회 : 모든 프로젝트의 `변경 사항`과 `히스토리`를 한 곳에 볼 수 있습니다.
코드 재사용 용이 : 공통 모듈화 및 재사용이 용이해 `개발 비용`을 줄일 수 있습니다.
프로젝트 설정 및 비용 절감 : 새 프로젝트 생성 시 이미 구축된 도구를 재사용 가능.

## 모노레포의 단점

과도환 의존성 : 의존성 관리가 쉽다는 장점이 `과도한 의존성`으로 이어질 수 있습니다.
CI 복잡성 : 하나의 CI로 모든 프로젝트를 관리하는 것은 복잡 해 질 수 있습니다.
성능 저하 : 많은 코드 변경 시 빌드 및 `테스트 실행 속도`가 느려질 수 있습니다.
저장소 크기 증가 : 저장소가 무거워지며, 사소한 문제가 큰 영향을 미칠 수 있습니다.

## 모노레포 구현 방식

로컬 및 분산 캐싱: 이전 작업 결과를 캐싱하여 빌드 속도를 개선합니다.
로컬 및 분산 작업 오케스트레이션: 다양한 작업을 조율하고 자동화하여 효율을 높입니다.
변경 감지: 코드 변경이 특정 패키지에 미치는 영향을 감지하여 필요한 부분만 재빌드하거나 테스트합니다.
의존성 그래프 시각화: 패키지 간 의존성을 시각화하여 복잡한 관계를 쉽게 이해할 수 있게 합니다.
공통 코드 공유 및 스케폴딩: 공통 코드를 모듈로 분리하고, 보일러플레이트 코드 생성을 자동화합니다.
일관된 도구 사용: 전체 저장소에서 동일한 빌드, 테스트, 배포 도구를 사용하여 개발 환경을 표준화합니다.

# Lerna

초기 모노레포에서는 버전 관리, script 실행 등 Lerna 이 필수적이였습니다.
Lerna 을 사용 해 패키지 관리와 배포를 되게 용이하게 해 주었음.
시간이 지나면서 패키지 매니저들이 발전하면서, (yarn, pnpm, 등) 같은 패키지들이 모노레포를 효율적으로 관리할 수 있게 되었습니다.

Lerna 는 모노 레포 Javascript/Typescript Project 에서 여러 Package 를 효율적으로 관리하고 배포할 수 있도록 도와주는 도구 입니다.
모노레포 식에서 통해 여러 관련 패키지를 단일 저장소에서 관리할 수 있게 해줍니다.

## Script 실행.

모노래포 내의 lerna 을 사용하여 스크립트를 실행하는 방법입니다.

```bash
# 모든 패키지에서 테스트 코드 실행.
pnpm exec lerna run test
yarn lerna run test
npx lerna trun test
```

```bash
# 특정 패키지에서 스크립트 실행
pnpm exec lerna run start --scope=a
yarn lerna run start --scope=a
npx lerna run start --scope=a
```

```bash
# 모든 패키지에서 여러 스크립트 실행
pnpm exec lerna run build, test --parallel
yarn lerna run build test --parallel
npx lerna run build test --parallel
```

## Cache Task Results

작업 결과를 캐싱 해, 변화가 없는 경우 재실행하지 않도록 합니다. 이 기능은 NX 를 이용해 구현됩니다.

```json
// nx.json example
// build, test, lint 를 캐싱합니다.
{
  "tasksRunnerOptions": {
    "default": {
      "runner": "@nrwl/workspace/tasks-runners/default",
      "options": {
        "cacheableOperations": ["build", "test", "lint"]
      }
    }
  }
}
```

```bash
# a 패키지에 대해 테스트 스크립트를 실행하고, Nx 에서 a 테스트 결과를 캐싱합니다.
pnpm exec lerna run test --scope=a --verbose
yarn lerna run test --scope=a --verbose
npx lerna trun test --scope=a --verbose
```

```bash
# 캐시 된 a 패키지가 변경 된 경우.
pnpm exec lerna run test --scope=a --verbose
yarn lerna run test --scope=a --verbose
npx lerna run test --scope=a --verbose
```

## 프로젝트 Graph 탐색

모노레포 내의 패키지 간 의존성을 시각화하고 분석할 수 있습니다.

```bash
pnpm exec nx graph
yarn nx graph
npx nx graph
```

## 버전 변경 및 배포

```bash
# 버전 변경
pnpm exec lerna version
yarn lerna version
npx lerna version
```

```bash
# npm 에 패키지 게시
pnpm exec lerna publish --no-private
yarn lerna publish --no-private
npx lerna publish --no-private
```

# NX

NX 는 모노레포 프로젝트에서 효율적으로 관리할 수 있게 해주는 도구 입니다.

## Run Tasks

NX 를 사용하면, 개별 프로젝트 또는 전체 워크스페이스에서 다양한 작업(예 : 빌드, 테스트, 린트 등)을 실행 가능합니다.

```bash
// my-app project 을 build
nx build my-app
```

```bash
// 전체 워크스페이스에 대한 태스트 실행
nx run-many --all --target=build
```

```bash
// 여러 태스크를 한 번에 실행 예시
nx run-many --all --target=build,test
```

## Cache Task Results

NX `작업의 실행 결과를 캐시해, 동일 입력으로 다시 실행할 필요가 없도록 합니다.` 빌드 시간을 크게 줄여줍니다.
캐시 사용 예시 : 캐시는 자동으로 관리되므로, 개발자가 별도 설정 x, NX 는 실행할 떄 마다 이전에 실행된 작업의 결과를 캐시에서 검사하여 사용할 수 있는지 확인합니다.

## Use Remote Caching

NX Cloud 를 사용해, 캐시된 결과를 원격으로 저장하고 공유 가능. 팀원 간 작업 실행 시간을 줄이는 데 도움이 됩니다.

```bash
// NX Cloud 연결 예시
nx connect-to-nx-cloud
```

이 명령은 프로젝트를 NX Cloud에 연결합니다. 이후 작업 결과는 원격 캐시에 저장되어, 동일 작업이 필요할 떄 더 빠르게 실행 가능합니다.

## Distribution Task Execution

NX Cloud 를 사용 해 CI 환경에서 작업 실행을 병렬화하면 성능 개선할 수 있습니다.

```bash
// CI에서 작업 졍렬화 설정 예시
nx generate @nrwl/workspace:ci-workflow --ci=github
```

Github Actions 을 위한 CI 워크플로우를 생성 해, CI 작업을 병렬로 실행할 수 있도록 설정합니다.

## Automate Updating Dependencies

NX 는 사용 중인 패키지의 버전을 자동으로 업데이트하고, 필요에 따라 설정이나 코드를 마이그레이션할 수 있습니다.
의존성 자동 업데이트 예시 : NX `nx migrate latest` 명령을 통해 사용 중인 NX 및 기타 npm 패키지의 최신 버전으로 쉽게 업그레이드할 수 있습니다.

## Enforce Module Boundaries

NX는 프로젝트 간에 잘 정의된 API에만 의존하도록 강제하며, 의존성 규칙을 선언적으로 설정 가능합니다.

모듈 경계 강제 예시 : `nx.json` 또는 `eslint` 설정에서 의존성 규칙을 정의 가능, 이를 통해 특정 라이브러리가 다른 라이브러리에 의존하는 것을 제한하거나 허용 가능.

# TurboRepo

모노레포 환경에서 빠르고 쉽게 빌드 시간을 단축 시킬 수 있음.
CPU 코어를 활용해 벙렬로 실행해서, 빌드 프로세스 속도를 높일 수 있음. -> 로컬 캐시, 리모트 캐시, 병렬 실행 등 쉽게 사용 가능.
yarn, npm workspace 에서도 사용 가능하지만, pnpm 과 같이 사용하길 권장합니다.

정리 해 보자면 TurboRepo 에서는 build 을 할 떄, 캐시로 계속 축적되어서, 수정되지 않은 패키지들은 캐시로 축적되고, 수정 된 것들만 빌드가 되는 프로세스여서,
빌드 시간을 줄일 수 있습니다.
