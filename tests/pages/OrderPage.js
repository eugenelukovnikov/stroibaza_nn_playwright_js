export class OrderPage {
  constructor(page) {
    this.page = page;
    this.h1 = page.locator("#pagetitle");
    this.nextButton = page.locator(
      "//div[@data-visited='true']//a[text()='Далее']"
    );
    // this.prevButton = page.locator("text=Назад:visible");
    this.FIO = page.locator("#soa-property-1");
    this.email = page.locator("#soa-property-2");
    this.phone = page.locator("#soa-property-3:visible");
    this.licences = page.locator('label[data-for="licenses_order"].license');
    this.confirmOrder = page.locator("#bx-soa-orderSave>a");
  }

  async open(productUrl) {
    await this.page.goto(`https://stroibaza-nn.ru/order/`);
  }

  async clickNextButton() {
    await this.nextButton.click();
  }

  async clickPrevButton() {
    await this.prevButton.click();
  }

  async fillTheName(fio) {
    await this.FIO.fill(fio);
  }

  async fillTheEmail(email) {
    await this.email.fill(email);
  }

  async fillThePhone(phone) {
    await this.phone.type(phone);
  }

  async fillTheLicences() {
    await this.licences.click();
  }

  async clickConfirmOrderButton() {
    await this.confirmOrder.click();
  }
}
