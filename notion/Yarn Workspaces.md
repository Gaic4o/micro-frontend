# Yarn Workspaces: 1.x vs Berry (Yarn 2)

## yarn 1.x workspaces 

- 시기적 이점 : 시기상으로는 yarn 의 workspace 기능이 npm workspace 기능보다 먼저 생김. 
- 연결성 : npm link 와 마찬가지로 yarn link 도 사용 가능.
- 설정 : package.json 파일의 workspaces 속성 통해 정의 (npm 과 같음)
- 의존성 관리 : 프로젝트 내의 모든 패키지의 의존성이 함께 설치, 관리되어 충돌 적음. 최적화에 유리. 
- 제한사항 : 최종적으로 npm 과 같은 방식이기 떄문에, 같은 한계를 지니고 있습니다. 
- 개인 프로젝트 설정 : Yarn 1.x 에서는 root 프로젝트에서 private: true 가 설정되어 있어야 합니다. 

## Yarn Berry (Yarn 2) Workspaces와 Plug'n Play (PnP)

-> Yarn Berry 는 PnP 를 도입하여, 기존의 패키지 관리 방식에 변화를 주었습니다.

Plug`n Play(PnP) 는 기존의 패키지 관리 방식과는 다르기 떄문에 어색한 요소들이 있습니다. 
    - IDE 에서 직접 사용하는 많은 도구들을 SDK 를 통해 우회 호출할 수 있도록 추가적 설정이 필요 합니다. 

Plug`n Play(PnP) 방식이란?
- node_modules 비사용: 전통적인 node_modules 폴더 대신, 의존성을 직접 관리합니다.
- 의존성 격리: 하위 의존성 패키지들이 상위 패키지 폴더에 중첩되어 설치되는 문제를 해결하고, 버전 충돌이나 의존성 문제를 방지합니다.
- 설치 속도: PnP를 사용하는 경우, 설치가 node_modules를 사용할 때보다 조금 느릴 수 있습니다.


