# StudyRoom 포트 폴리오

Angular+Bootstrap 으로 구현한 스터디룸 관리자 페이지

## [Demo](http://221.149.240.50:8080)
아이디 및 비밀번호는 admin입니다.

### 구현중점:

공통 Component 및 재사용성이 높은 기능을 core 폴더에 따로 구현,
TDD 를 통한 개발,
반응형 으로 구현,
멀티이미지 업로드 및 뷰 컨포넌트 구현중 ...

### [관리자페이지 산출물](https://ovenapp.io/project/MYzNyQ8I47w9O0CcJlCrUbUh6TzR3m08#fcVku)

ovenapp.io 웹툴을 활용하여 작성,
위 링크 클릭시 확인가능.

### [DB 모델링](https://www.erdcloud.com/d/5e95dCqdeBiSaHYEq)

erdcloud.com 웹툴을 활용하여 작성,
위 링크 클릭시 확인가능.

## 라이브러리

관리자 페이지 구현에 있어 사용한 라이브러리 :
- ng-bootstrap
- material-angular
- font-awesome
- sweetalert2
- ag-grid
- ngx-editor(이미지 업로드 수정 필요...) / ngx-bootstrap

## 폴더구성

- 폴더 core:

프로젝트 전체 혹은 핵심이 되는 Component, Directive, Guard, Pipe, Service 등... 모아둔 폴더

- 폴더 layout:

관리자 페이지의 layout 영역, route-module 포함

- 폴더 model:

각 페이지의 검색, 리스트, 상세등의 model 부분을 모아둔 폴더

- 폴더 page:

관리자 페이지의 View 를 담당하는 부분

## 추가 구현 예정 부분:

1.  http 통신시 error 핸들러
2.  각종 통계

## Server Spec

-   Model : Orange Pi Plus2
-   OS: Debian8
-   Cpu: H3 Quad-core Cortex-A7 H.265/HEVC 4K
-   Memory: 2GB DDR3
-   Storage: 32GB

## Licensing

This software is licensed with the MIT license.

© 2016-2017 Erik Barke, Monounity
