describe("테스트 스위트", () => {
  beforeEach(() => cy.visit("http://localhost:3000/"));

  // 안녕이라고 입력할 경우, Hi.로 출력된다.
  it("번역할 텍스트 입력 시 번역 결과에 번역된 텍스트가 출력된다.", () => {
    // cy.get()을 통해 특정 엘리먼트를 가져와야 함
    cy.get('[data-cy="source-textarea"]').type("안녕"); // type(타이핑할 텍스트)

    // 번역된 결과에 Hi.라고 출력되었는지 확인
    cy.get('[data-cy="target-textarea"]').should("have.value", "Hi.");
  });

  it("다크 모드 토글을 클릭할 경우, 다크모드로 적용된다.", () => {
    cy.get('[data-cy="darkmode-toggle"]').click();
  });
});
