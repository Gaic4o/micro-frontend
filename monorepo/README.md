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
