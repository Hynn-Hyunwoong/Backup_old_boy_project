# 프로젝트 내용정리

화면 구동 영상 : https://youtu.be/r5K-sRjIKlk

![video1](https://im3.ezgif.com/tmp/ezgif-3-144cd0645e.gif)
![video2](https://im3.ezgif.com/tmp/ezgif-3-b6c9c3d04c.gif)
![video3](https://im3.ezgif.com/tmp/ezgif-3-604e9ab773.gif)
![video4](https://im3.ezgif.com/tmp/ezgif-3-f495dcc50c.gif)

## MVC

MVC 패턴은 Model-View-Controller의 약자로,
하나의 웹 어플리케이션을 만들면서, 그 구성요소를 다음과 같은 세가지의 역할로
구분지어 구조화하는 것을 말합니다.

- Model: 요청에 대한 응답을 함에 있어서 필요한 구체적인 로직을 구현하는 요소
  DB와 상호작용하여 데이터를 저장 및 관리하고,
  사용자가 필요로 하는 정보를 View에 전달할 수 있는 형태로 재구성합니다.

- View: 사용자에게 제공되는 인터페이스입니다.
  웹 페이지나 앱을 통해 눈에 보이는 UI가 이 역할을 수행합니다.

- Controller: Model과 View 사이의 중간 역할을 수행하는 요소입니다.
  클라이언트의 요청을 수신하면 Model과 View를 오가며 적절한 응답을 찾아 제공합니다.

### DB의 역할

MySQL 등과 같은 관계형 데이터베이스는 MVC 패턴에서 주로 Model과 상호작용합니다.
저장소 속에서 사용자가 필요로 하는 데이터를 제공하는 것이 주된 역할입니다.

### 데이터의 흐름과 MVC 패턴의 장점

웹 어플리케이션에서 요청을 수신하면, Controller는 Model에 그 요청을 전달하고
Model이 DB로부터 필요한 데이터를 제공받아 요청에 알맞은 형태로 가공을 마치면
이 작업물은 다시 Controller에 의해 View로 전달됩니다.

이렇게 MVC 패턴을 활용하여 개발을 진행하면 다음과 같은 장점을 가지게 됩니다.
유지보수에 용이합니다. MVC 패턴은 코드의 구조를 역할군에 맞게 분류하기 때문에
좀 더 체계적인 관리가 가능해집니다.

코드의 재사용성이 높습니다.
MVC 패턴을 이용한 개발은 Model, View, Controller를 각각 독립적인 요소로 구현합니다.
이는 새로운 프로젝트를 진행할 때에도 필요에 따라 기존의 코드를 재사용할 수 있도록 돕습니다.

각 컴포넌트가 정해진 역할을 수행하기 때문에 코드가 깔끔하고 직관적입니다.

## Repository, Service, Controller

![image](https://files.virgool.io/upload/users/87947/posts/tueuub07nzfm/qsafdwbmblqx.png)

위에서 설명한대로 MVC 패턴은 웹 개발에 필요한 요소들을
Model, View, Controller로 구분지어서 설계하는 패턴입니다.

그리고 MVC 패턴은 다음과 같은 3가지 요소로 더욱 세분화되기도 합니다.

- Repository (혹은 DAO): DB에 접근하기 위한 인터페이스입니다.
  이 파트에서는 사용자가 필요로 하는 데이터를 제공하거나,
  요청된 데이터를 저장하거나 삭제할 수 있는 기능을 제공합니다.

- Service: 웹 어플리케이션을 구현할 수 있는 실질적인 기능을 제공하는 파트입니다.
  즉 Repository를 통해 DB에서 가져온 정보를 가공하는 역할을 담당합니다.
  (정보의 처리에 필요한 실제 로직이 담기는 부분이기 때문에 코드가 비대해지는 경향이 많습니다.)

- Controller: 요청을 수신하고 적절한 응답을 생성하는 요소입니다.
  Controller에서 요청을 수신하면, 이 요청을 처리할 수 있는 Service 코드를 호출하고
  Repository를 통해 데이터베이스에 접근하도록 합니다.
  그리고 다시 Service단에서 처리된 결과를 가져와 View로 전달할 수 있는 정보를 생성합니다.
  사용자에게 제공되는 정보들은 대부분 이러한 과정을 거치게 됩니다.

이와 같이 Repository, Service, Controller는 추상적인 MVC의 개념을
좀 더 세분화하여 실체화(실제로 개발을 진행함에 있어서)한 것으로 생각할 수 있겠습니다.

하지만 모든 사람이 똑같은 방법론을 써서 개발 프로젝트를 설계하는 것은 아닙니다.
그리고 이론만 가지고는 파악하기 힘든 개념인 것도 사실이기 때문에
실제로 MVC패턴을 이용해 코드를 설계함으로써 이에 대한 이해도를 높이는 것을 추천합니다.

이하는 MVC 패턴을 기반으로 작업한 게시판 프로젝트 후기입니다.

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
