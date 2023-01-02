# 프로젝트 내용정리

화면 구동 영상 : https://thumbs.gfycat.com/ElderlyUnderstatedDipper-mobile.mp4

![video1](https://im3.ezgif.com/tmp/ezgif-3-144cd0645e.gif)
![video2](https://im3.ezgif.com/tmp/ezgif-3-b6c9c3d04c.gif)
![video3](https://im3.ezgif.com/tmp/ezgif-3-604e9ab773.gif)
![video4](https://im3.ezgif.com/tmp/ezgif-3-f495dcc50c.gif)

## 프로젝트 일정

1. 12/26(월) : view, public 디렉토리 내 정적 파일(html, css, js) 작업 수행
2. 12/27(화) : join, login, board page를 분담하여 작업
3. 12/28(수) : login 이슈 해결(login 시 token 값 유지해야 함, DB 요청 시 list 데이터 값 대조 문제)
4. 12/29(목) : join(회원가입) 페이지 상 ID 중복체크 작업(중복체크 시 list 값 대조 --> 이후 대조 결과에 따른 이벤트 조건 설정)
5. 12/30(금) : 추천(좋아요) 기능 및 정렬(최신순, 조회순, 추천순) 기능 추가

## 화면 구현

### 1) 비로그인 시 게시판

- 글쓰기 불가
- 수정/삭제 불가
- 댓글 작성 불가
- 좋아요(추천) 불가
  --> issue: 비로그인 시 댓글 삭제 삭제 버튼이 활성화됨!(token이 삭제되지 않아 발생하는 것으로 추정)

### 2) 회원가입 / 수정

- ID 중복 체크
- 각 회원가입 Area(입력폼)별 정규표현식을 통한 입력제한(event)
- "생년월일"의 경우, 14세 미만 가입불가
- e-mail과 phone number의 경우, 형식 설정

### 3) 게시판

- 글쓰기
- 수정(해당 게시글을 작성한 ID일 경우에만 가능하도록 설정)
- 삭제(해당 게시글을 작성한 ID일 경우에만 가능하도록 설정)
- 추천(좋아요)
- 댓글
- filter(list filter)
- Prev, Next view
- 검색 기능(제목, 내용, 글쓴이)
- Toast Editor(수정 시 mark-up 언어 손상)
- 조회수 : 1시간에 1번 count, ID 기준 count, query를 통해 관리

### 4) Admin

- 모든 권한 부여
- 모든 게시글 수정, 삭제 가능
- list page에서도 삭제 가능하도록 설계

### 5)Main Page

- 햄버거 버튼을 활용한 header 영역 메뉴관리
- 무한 슬라이드 구현
- 각 팀원 소개 페이지(contact) 구현

## 사용 기술 Stack

- HTML5
- CSS3
- JavaScript
- Node.js
  - express
  - nunjucks
  - mysql2
  - cookie-parser
