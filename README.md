# 유투브 양동준 사이드프로젝트 

해당 프로젝트는 fastapi rest api 를 활용해서 만든 reactjs 웹페이지입니다.
백엔드 rest api docs 는 [여기](https://fastapi-google-trend.up.railway.app/redoc)를 참고해주세요.

## 사용한 메인 라이브러리
- mui v5
- reactjs v18
- react-router-dom v6.8
- draft-js
- react-type-animation 

## 프로젝트 실행

`npm start` 커맨드를 사용하시면 됩니다.
여기를 [http://localhost:3000](http://localhost:3000) 열면 작동하실 겁니다.

## 메인 화면 
- react typing animation 추가
- MUI 이미지 리스트 추가


## 큐알코드 제너레이터
검색창에 원하는 문자를 입력하고 버튼을 누르면 큐알코드가 생성됩니다.
- rest api 를 가지고 만들었습니다.
- 검색창에 validation 을 넣었습니다.

## 칼라 팔레트
버튼을 누르면 색상 조합 5가지를 추천해줍니다.
- rest api 를 가지고 만들었습니다.
- 색깔 개수를 정할 수 있습니다.

## 구글트렌드
각 나라별 최신 구글 트렌드를 알려줍니다.
- rest api 를 가지고 만들었습니다.
- 테이블 형식으로 알려줍니다.
- US,JP,KR 이 지원됩니다. (다른나라 추가 예정)

## 유행하는 유투브
각 나라별 최신 유행 유투브를 알려줍니다.
- rest api 를 가지고 만들었습니다.
- 테이블 형식으로 알려줍니다.
- 외부 링크 지원
- US,JP,KR 이 지원됩니다. (다른나라 추가 예정)

## 유투브 댓글 대댓글
유투브 비디오 id를 입력하면 달린 댓글을 보여줍니다.
- rest api 를 가지고 만들었습니다.
- 비디오id는 11개라 11글자 검증 기능이 있습니다.
- 현재 대댓글 미지원 (표시 안함)

## 온라인 메모장 추가
- draft-js 추가

