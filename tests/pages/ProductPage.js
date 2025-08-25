export class ProductPage {
  constructor(page) {
    this.page = page;
    this.h1 = page.locator("#pagetitle");
    this.addToCartButton = page.locator(".button_block>span");
    this.addedToBasketButton = page.locator(".button_block.wide");
    this.buyInOneClickButton = page.locator(".wrapp_one_click>span");
    this.buyInOneClickFormProductName = page.locator(".form-product__name");
    this.buyInOneClickFormFIO = page.locator("#one_click_buy_id_FIO");
    this.buyInOneClickFormPhone = page.locator("#one_click_buy_id_PHONE");
    this.buyInOneClickFormEmail = page.locator("#one_click_buy_id_EMAIL");
    this.buyInOneClickFormComment = page.locator("#one_click_buy_id_COMMENT");
    this.buyInOneClickFormLicense = page.locator("#licenses_popup_OCB");
    this.buyConfirmButtonInOneClickForm = page.locator(
      "//button[@id='one_click_buy_form_button']//span"
    );
    this.buyInOneClickFormSuccess = page.locator(
      "//div[@id='one_click_buy_result']"
    );

    this.buyInOneClickFormFIOEmptyError = page.locator(
      "#one_click_buy_id_FIO-error"
    );
    this.buyInOneClickFormPhoneError = page.locator(
      "#one_click_buy_id_PHONE-error"
    );
    this.buyInOneClickFormEmailError = page.locator(
      "#one_click_buy_id_EMAIL-error"
    );

    this.buyInOneClickFormFIOError = page.locator("//span[@class='errorName']");

    this.buyInOneClickFormLicenseError = page.locator(
      "#licenses_popup_OCB-error"
    );
  }

  async open(productUrl) {
    await this.page.goto(`https://stroibaza-nn.ru/catalog/${productUrl}`);
  }

  async getTitle() {
    return this.page.title();
  }

  async reload() {
    await this.page.reload();
  }

  async addToCart() {
    await this.addToCartButton.click();
  }

  async clickBuyInOneClickButton() {
    await this.buyInOneClickButton.click();
  }

  async getH1Text() {
    return (await this.h1.textContent()).trim();
  }

  async getProductNameInOneClickForm() {
    return (await this.buyInOneClickFormProductName.textContent()).trim();
  }

  async fillTheFIOInOneClickForm(fio) {
    await this.buyInOneClickFormFIO.fill(fio);
  }

  async fillThePhoneInOneClickForm(phone) {
    await this.buyInOneClickFormPhone.type(phone);
  }

  async fillTheEmailInOneClickForm(email) {
    await this.buyInOneClickFormEmail.fill(email);
  }

  async fillTheCommentInOneClickForm(comment) {
    await this.buyInOneClickFormComment.type(comment);
  }

  async fillTheLicenseInOneClickForm() {
    await this.buyInOneClickFormLicense.evaluate(
      (checkbox) => (checkbox.checked = true)
    );
  }

  async clickConfirmButtonInOneClickForm() {
    await this.buyConfirmButtonInOneClickForm.click();
  }

  async getFIOEmptyErrorTextInOneClickForm() {
    return (await this.buyInOneClickFormFIOEmptyError.textContent()).trim();
  }

  async getPhoneErrorTextInOneClickForm() {
    return (await this.buyInOneClickFormPhoneError.textContent()).trim();
  }

  async getEmailErrorTextInOneClickForm() {
    return (await this.buyInOneClickFormEmailError.textContent()).trim();
  }

  async getFIOErrorTextInOneClickForm() {
    return (await this.buyInOneClickFormFIOError.textContent()).trim();
  }

  async getLicenseErrorTextInOneClickForm() {
    return (await this.buyInOneClickFormLicenseError.textContent()).trim();
  }
}
