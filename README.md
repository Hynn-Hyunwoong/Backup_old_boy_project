# 프로젝트 내용정리
<img width="80%" src="https://thumbs.gfycat.com/ElderlyUnderstatedDipper-mobile.mp4"/>

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
