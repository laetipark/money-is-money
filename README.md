![save](https://github.com/laetipark/budget-manager/assets/68440583/a9d1c114-d60e-425f-85b0-ae4a93d0d3b8)

# 💰 예산 관리 어플리케이션

본 서비스는 사용자들이 개인 재무를 관리하고 지출을 추적하는 데
도움을 주는 애플리케이션입니다. 이 앱은 사용자들이 예산을 설정하고
지출을 모니터링하며 재무 목표를 달성하는 데 도움이 됩니다.

<br>

# 🛠️ 기술 스택

![Typescript](https://img.shields.io/badge/Typescript-3178C6?style=flat&logo=Javascript&logoColor=FFFFFF)
![NestJS](https://img.shields.io/badge/NestJS-E0234E?style=flat&logo=NestJS&logoColor=FFFFFFF)
![Node.js](https://img.shields.io/badge/Node.js-v18.18.2-DDDDDD?style=flat&logo=Node.js&logoColor=FFFFFF&labelColor=339933)
![Mysql](https://img.shields.io/badge/Mysql-8.0.35-DDDDDD?logo=mysql&labelColor=4479A1&logoColor=FFFFFF)
![Redis](https://img.shields.io/badge/Redis-2.1.0-DDDDDD?logo=redis&labelColor=DC382D&logoColor=FFFFFF)
![WebStorm](https://img.shields.io/badge/WebStorm-07B2F4?style=flat&logo=WebStorm&logoColor=FFFFFF)

<br>

# 🏷️ 목차

1. [:gear: 환경 설정 및 실행](#gear-환경-설정-및-실행)
2. [:cd: 데이터베이스 모델링](#cd-데이터베이스-모델링)
3. [:earth_asia: API 명세](#earthasia-API-명세)
4. [:bookmark_tabs: API 명세](#bookmarktabs-구현-내용)

# :gear: 환경 설정 및 실행

데이터베이스 스키마를 생성합니다.

```sql
CREATE DATABASE `wanted`
DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
```

서버 및 데이터베이스 연결을 위한 환경 변수를 설정합니다.

```dotenv
SERVER_PORT=
DB_PORT=
DB_USERNAME=
DB_PASSWORD=
DB_DATABASE=
JWT_SECRET=
```

데이터베이스 스키마 생성 후, 스크립트 파일 실행으로 초기 설정합니다.

```bash
> sh start.sh # 리눅스 스크립트 파일 실행
> ./start.bat # 윈도우 스크립트 파일 실행
```

<br>

# :cd: 데이터베이스 모델링

![Database-ERD](https://github.com/laetipark/budget-manager/assets/68440583/1bbb4f6e-0eda-49b2-b3f7-ae8762d18333)

<br>

# :earth_asia: API 명세

- [REST API Wiki Documentation](https://github.com/laetipark/budget-manager/wiki/docs)

<br>

# :bookmark_tabs: 구현 내용

## 사용자

- `계정명`, `비밀번호`를 사용하여 `회원가입`하고, `bcrypt`로 비밀번호를 `암호화`합니다.
- `Cookie`와 `JWT` 기반으로 인증합니다.
- 로그인 이후 `모든 API 요청`에 대해 `JWT 유효성`을 검증합니다.
- `인증된 사용자`는 사용자의 정보를 `조회`할 수 있습니다.

## 카테고리

- `스크립트 파일`을 통해 기본적인 `카테고리 목록`이 추가 됩니다.
- **카테고리 초기 데이터**

  | id | type    |
      |----|:--------|
  | 1  | 식비      |
  | 2  | 주거비     |
  | 3  | 교통비     |
  | 4  | 의류      |
  | 5  | 문화 및 여가 |
  | 6  | 의료 및 건강 |
  | 7  | 교육      |
  | 8  | 기타      |

- 사용자가 예산 설정에 사용할 수 있는 모든 `카테고리 목록`을 `조회`할 수 있습니다.

## 예산

- 매 월마다 `예산`을 설정합니다.
- 예산은 `카테고리`를 필수로 지정하여, `카테고리 별 예산`을 `추가`합니다.
- `총 예산`을 입력하고, `예산 추천`을 받을 시 `사용자 총 예산과 근접한 다른 사용자 10명`의 `카테고리 별 예산` 목록을 가져옵니다.

### 요구사항 변경

- **초기 요구사항**
- 카테고리 별 예산 설정에 어려움이 있는 사용자를 위해 예산 비율 추천 기능이 존재합니다.
    - `카테고리` 지정 없이 총액 (ex. 100만원) 을 입력하면, `카테고리 별 예산`을 자동 생성합니다.
    - 자동 생성된 예산은, 기존 이용 중인 `사용자`들이 설정한 평균 값 입니다.
        - 사용자들이 설정한 카테고리 별 예산을 통계하여, 평균적으로 40% 를 `식비`에, 30%를 `주거` 에 설정 하였다면 이에 맞게 추천.
        - 10% 이하의 카테고리들은 모두 묶어 `기타` 로 제공한다.(8% 문화, 7% 레져 라면 15% 기타로 표기)
        - **위 비율에 따라 금액이 입력됩니다.**
            - **ex) 식비 40만원, 주거 30만원, 취미 13만원 등.**

      > **추가설명**  
      사용자는 예산 설정 페이지 에서 카테고리별로 `예산을 설정` 합니다.  
      이를 지정하기 어려운 사용자들은 `예산 추천 기능`을 사용하고 클릭 시, 자동으로 페이지 상 카테고리 별 예산이 입력됩니다.  
      사용자는 입력 된 값들을 필요에 따라 수정(API 가 아닌 화면에서) 한 뒤 이를 `저장(=예산설정 API)`합니다.
- **요구사항 변경 내용 사유**
    - 기존 이용 중인 `사용자`들이 설정한 `평균 비율 값`이 `사용자`가 원하는 예산 설계에 적절하지 않을 수 있다고 생각함
        - ex) `기존 사용자`들와 `사용자`간의 예산 격차가 큼
        - ex) 추천대로 예산 비율을 받았으나, `사용자`의 `지출 취향`을 고려받는다는 보장이 없음
    - `사용자 총 예산과 근접한 다른 사용자 10명`의 `카테고리 별 예산` 목록을 가져오는 것이 좀 더 참고하기 좋다고 판단
        - 추후 `적절한 지출 여부`를 추가해 예산 설계 추천의 정확성을 높여도 괜찮다고 생각

## 지출

- `지출 API`는 `생성한 사용자`만 권한을 갖습니다.
- `지출 일시`, `지출 금액`, `지출 거래처`, `카테고리` 와 `지출 내용`을 입력하여 지출 정보를 `추가`하거나 `변경`합니다.
- `지출 목록`을 조회합니다.
    - 필수적으로 `시작 기간`과 `끝 기간`을 입력 받습니다.
    - 조회된 모든 내용의 `지출 합계`, `카테고리 별 지출 합계`를 같이 반환합니다.
    - 특정 `카테고리`만으로 지출 목록을 조회할 수 있습니다.
    - `최소`, `최대` 금액으로 지출 목록을 조회할 수 있습니다.
- 지출 정보에 `합계 제외`를 설정할 수 있음
    - `지출 목록`에는 포함되지만, `지출 합계`에서는 제외
- `오늘 지출 추천`을 조회할 수 있습니다.
    - 설정한 `월별` 예산을 만족하기 위해 오늘 지출 가능한 금액을 `총액`과 `카테고리 별 금액`으로 조회합니다.
        - 앞선 일자에서 소비한 만큼 이후 일자에 부담을 분배
        - 기간 전체 예산을 초과 하더라도 `0원` 또는 `음수` 의 예산을 추천받지 않아야 함
            - 지속적인 소비 습관을 생성하기 위한 서비스이므로 예산을 초과하더라도 최소 `하루 추천 지출 금액`을 추천
        - 지출 상황에 맞는 `멘트` 노출
            - 추천 지출을 지킬 경우: `절약을 잘 실천하고 계세요! 오늘도 절약 도전!`
            - 추천 지출을 초과할 경우: `추천 지출 금액을 초과하였어요. 절약해주세요!`
        - `100원`원 단위로 추천 지출 금액을 내림하여 추천 지출 금액 설정
- `오늘 지출 안내`를 조회할 수 있습니다.
    - `오늘` 지출한 내용을 `총액` 과 `카테고리 별 금액`을 조회
    - `월별`설정한 예산 기준 `카테고리 별` 통계 제공
        - 일자 기준 오늘 `적정 금액`: 오늘 기준 사용했으면 적절했을 금액
        - 일자 기준 오늘 `지출 금액`: 오늘 기준 사용한 금액
        - 위험도: 카테고리 별 적정 금액, 지출금액의 차이를 위험도로 나타내며 단위는 `%` 입니다.
            - `추천 금액 10,000원`, `사용한 금액 20,000원`이면 `위험도 200%`

## 자동화

- `Cron` 스케줄링을 통해 자동화가 진행됩니다.
- 추후 `Discord Webhook`, `Email` 등으로 메시지 전송 기능 개발 가능
- `매일 08:00시`
    - `오늘 지출 추천` 알림 전송
    - `사용자`가 `isRecommendNotified`를 `true`로 설정할 경우 전송
- `매일 20:00시`
    - `오늘 지출 안내` 알림 전송
    - `사용자`가 `isExpenseNotified`를 `true`로 설정할 경우 전송