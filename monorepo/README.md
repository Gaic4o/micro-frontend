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
