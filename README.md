PIC-ME / backend
===

Naver D2 CAMPUS FEST
---
[d2 campus fest 7th](http://d2campusfest.kr/7th/)

### React Native 기반의 여행일지 (PIC-ME의 REST API 서버)

- 서버 주소 : [https://pic-me-back.herokuapp.com/](https://pic-me-back.herokuapp.com/) 

| 역할 | HTTP METHOD | 주소 | 요쳥변수 |  
|:-----------:|:-----------:|:---------------:|:-----------------:|  
| 로그인 | GET | /api/user/auth/login | token |
| 회원가입 | POST | /api/user/auth/signup | token, name, profile, introduct |
| 프로필 수정 | PUT | /api/user/profile | user_id, name, profile, introduct |
| 일지 추가하기 | POST | /api/travel | name, title, place, start_date, end_date, category, image |
| 나의 일지 목록 보기 | GET | /api/travel | |
| 일지 보기 | GET | /api/travel/:travel_id| |
| 장소 추가하기 | POST | /api/travel/:travel_id | [images], title, content, time, latitude, longitude |
