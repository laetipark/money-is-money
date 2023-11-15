// NOTE: {자원명}_{동사}로 작성
export enum SuccessType {
  USER_SIGN_UP = '회원가입 성공',
  USER_SIGN_IN = '로그인 성공',
  USER_GET = '사용자 정보 조회 성공',
  USER_PATCH = '사용자 정보 갱신 성공',
  CATEGORY_GET = '카테고리 목록 조회 성공',
  BUDGET_GET = '사용자 예산 목록 조회',
  BUDGET_POST = '사용자 예산 추가 성공',
  BUDGET_PATCH = '사용자 예산 갱신 성공',
  BUDGET_RECOMMENDATION_GET = '사용자 예산 추천 설계 성공',
  EXPENSE_GET = '사용자 지출 목록 조회 성공',
  EXPENSE_TODAY_RECOMMENDATION_GET = '사용자 오늘 지출 추천 조회 성공',
  EXPENSE_TODAY_NOTIFICATION_GET = '사용자 오늘 지출 안내 조회 성공',
  EXPENSE_DETAIL_GET = '사용자 지출 상세 조회 성공',
  EXPENSE_POST = '사용자 지출 추가 성공',
  EXPENSE_PATCH = '사용자 지출 변경 성공',
  EXPENSE_EXCLUDE_PATCH = '지출 헙계 제외 정보 변경 성공',
  EXPENSE_DELETE = '사용자 지출 정보 삭제 성공',
}