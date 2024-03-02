## NX

여러 자바스크립트 및 타입스크립트 프로젝트의 관리를 통합하여 개발자의 생산성을 높이고,
CI(Continuous Integration, 지속적 통합)의 성능을 최적화하며,
코드 품질을 유지하는 데 초점을 맞춥니다.
nx 를 사용하면 여러 프로젝트를 쉽게 관리하고, 효율적으로 작업을 실행할 수 있습니다.

1. Run Tasks

nx 를 사용하여 개별 프로젝트 또는 전체 워크스페이스에서 작업을 실행할 수 있습니다.

- 단일 워크스페이스 태스크 실행 (my-app 워크스페이스 예시)

```javascript
nx build my-app
```

- 전체 워크스페이스들에 대한 태스크 실행 (build 예시)

```javascript
nx run-many --all --target=build
```

- 전체 워크스페이스들에 대한 여러 태스크 실행 (build, test 예시)

```javascript
nx run-many --all --target=build,test
```

2. Cache Task Results

nx 는 태스크 실행 결과를 캐싱하여, 동일한 입력에 대해 태스크를 재실행할 필요가 없도록 합니다. 이는 빌드 시간을 크게 단축시킵니다.
nx.json / project.json / package.json 등을 이용 해 설정 할 수 있음.

3. Use Remote Caching

nx Cloud 를 사용하면 캐싱 결과를 원격으로 저장하고 공유할 수 있어, 팀원 간에 작업 실행 시간을 줄일 수 있습니다.

```javascript
nx connect-to-nx-cloud
```

4. Distribution Task Execution

nx Cloud를 활용하면 CI 환경에서 작업 실행을 병렬화하여 성능을 개선할 수 있습니다.
nx Cloud 에 연결 후, (nx connect-to-nx-cloud)
CI 에서 DTE 를 활성화 합니다. (nx generate @nrwl/workspace:ci-workflow --ci=github)

```javascript
nx generate @nrwl/workspace:ci-workflow --ci=github
```

5. Automate Updating Dependencies

사용 중인 패키지 버전을 자동으로 업데이트하고, 필요한 경우 설정이나 소스 코드를 마이그레이션할 수 있습니다.

6. Enforce Module Boundaries

nx 는 코드 분석을 통해 프로젝트 간 잘 정의된 API에만 의존하도록 강제하고, 선언적으로 의존성 규칙을 설정할 수 있게 해줍니다. 이는 Lint 규칙을 통해 구현됩니다.
nx 를 사용하면 모노레포 관리가 훨씬 간편해지며, 이러한 기능을 통해 프로젝트의 구조를 명확히 하고, 팀의 작업 흐름을 효율적으로 만들 수 있습니다.

## Rush

Rush 는 monorepo 에서 프로젝트나, 패키지를 효율적으로 관리 해 주는 도구 입니다.

1. 의존성 충돌 : 각 프로젝트에 같은 라이브러리이지만, 서로 다른 버전의 라이브러리가 존재 할 수 있음. 예로 들면 패키지안에 A 패키지는 react@16, B 패키지는 react@14 을 사용 할 수 있습니다.
   이런 문제가 발생 할 경우, 두 프로젝트가 서로 호환이 되지 않아, 의존성 충돌이 발생할 수 있습니다.
   pnpm 에서도 하드 링크와, 심볼릭 링크를 사용 해 의존성 충돌 문제를 해결 하지만, rush 는 pnpm 과 같은 패키지 매니저가 제공하는 기능 이상의 추가적인 이점을 제공 해 줍니다.
2. 통합 빌드 및 테스트 파이프라인 : Rush 는 변경된 패키지만 빌드하고, 테스트하는 `Incremental Builds` 기능뿐만 아니라, 전체 Monorepo 에 걸쳐 일관된 빌드, 테스트, 배포 파이프라인을 설정할 수 있게 해줍니다.
3. 멀티 패키지 관리 : pnpm 은 좀 더 의존성 관리에 초점을 맞췄지만, rush 는 여러 패키지 의존성, 버전 관리, 배포를 동시에 처리할 수 있는 기능을 제공 해 줍니다.

- rushx 사용: 개별 패키지 내에서 커스텀 스크립트를 실행할 때 사용합니다. 예를 들어, 특정 패키지에 대한 빌드나 테스트 스크립트를 실행할 수 있습니다.
- rush 사용: Monorepo 내의 모든 패키지에 걸쳐 스크립트를 실행할 때 사용합니다. 이를 통해 전체 프로젝트의 빌드, 테스트, 업데이트 등을 한 번에 관리할 수 있습니다.

## TurboRepo

모노레포 환경에서 빠르고 쉽게 빌드 시간을 단축 시킬 수 있음.
CPU 코어를 활용해 벙렬로 실행해서, 빌드 프로세스 속도를 높일 수 있음. -> 로컬 캐시, 리모트 캐시, 병렬 실행 등 쉽게 사용 가능.
yarn, npm workspace 에서도 사용 가능하지만, pnpm 과 같이 사용하길 권장합니다.

정리 해 보자면 TurboRepo 에서는 build 을 할 떄, 캐시로 계속 축적되어서, 수정되지 않은 패키지들은 캐시로 축적되고, 수정 된 것들만 빌드가 되는 프로세스여서,
빌드 시간을 줄일 수 있습니다.
