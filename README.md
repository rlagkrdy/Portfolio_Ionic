# StudyRoom 포트 폴리오

Angular+Bootstrap 으로 구현한 스터디룸 관리자 페이지

## [Demo](http://naver.com)

### 구현중점:

공통 Component 및 재사용성이 높은 기능을 core 폴더에 따로 구현,
TDD 를 통한 개발,
반응형 으로 구현,
현재 데모페이지는 미정이며, 1 차 개발완료시 개인서버에 구현예정

### [관리자페이지 산출물](https://ovenapp.io/project/MYzNyQ8I47w9O0CcJlCrUbUh6TzR3m08#fcVku)

ovenapp.io 웹툴을 활용하여 작성,
위 링크 클릭시 확인가능.

### [DB 모델링](https://www.erdcloud.com/d/5e95dCqdeBiSaHYEq)

erdcloud.com 웹툴을 활용하여 작성,
위 링크 클릭시 확인가능.

## 라이브러리

관리자 페이지 구현에 있어 사용한 라이브러리 :
1.ng-bootstrap
2.material-angular
3.font-awesome
4.sweetalert2
5.ag-grid

## 폴더구성

### 폴더 core:

프로젝트 전체 혹은 핵심이 되는 Component, Directive, Guard, Pipe, Service 등... 모아둔 폴더

### 폴더 layout:

관리자 페이지의 layout 영역, route-module 포함

### 폴더 model:

각 페이지의 검색, 리스트, 상세등의 model 부분을 모아둔 폴더

### 폴더 page:

관리자 페이지의 View 를 담당하는 부분

## 추가 구현 예정 부분:

1.  Profile 이미지 업로드 및 뷰 컴포넌트
2.  멀티이미지 업로드 및 뷰 컨포넌트
3.  http 통신시 error 핸들러
4.  editor 기능
5.  로그인 기능
6.  각종 통계
7.  추가 input UI
