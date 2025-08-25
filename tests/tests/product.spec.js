import { test, expect } from "@playwright/test";

import { faker } from "@faker-js/faker";

import { ProductPage } from "../pages/ProductPage";

import { BasketPage } from "../pages/BasketPage";

test.describe("Товар: добавление в корзину", () => {
  let productPage;
  let basketPage;

  test.beforeEach(async ({ page }) => {
    productPage = new ProductPage(page);
    basketPage = new BasketPage(page);

    await productPage.open("kover_moldabela_soho_1716_15033_.html");
    await productPage.addToCart();
  });

  test("Появляется окно корзины после добавления товара в корзину", async () => {
    await expect(basketPage.basketFormWindow).toBeVisible();
  });

  test('После добавления товара в корзину кнопка Добавить в корзину" изменяется', async () => {
    await productPage.reload();
    await expect(productPage.addedToBasketButton).toBeVisible();
  });
});

test.describe('Форма "Купить в один клик"', () => {
  let productPage;
  const ErrorInvalid = "Неверный формат";
  const ErrorInvalidFIO =
    "Может содержать только русские / латинские символы, пробел";
  const ErrorEmpty = "Заполните это поле";
  const CheckboxError = "Согласитесь с условиями";

  test.beforeEach(async ({ page }) => {
    productPage = new ProductPage(page);
    await productPage.open("kover_moldabela_soho_1716_15033_.html");
    await productPage.clickBuyInOneClickButton();
  });

  test("Заголовок товара и его название в форме совпадают", async () => {
    const h1 = await productPage.getH1Text();
    const productNameOneClickForm =
      await productPage.getProductNameInOneClickForm();
    expect(h1).toEqual(productNameOneClickForm);
  });

  test("Успешная отправка формы", async () => {
    const RandomName = faker.person.fullName();
    const RandomEmail = faker.internet.email();
    const RandomPhone = "9" + faker.string.numeric(9);

    await productPage.fillTheFIOInOneClickForm(RandomName);
    await productPage.fillThePhoneInOneClickForm(RandomPhone);
    await productPage.fillTheEmailInOneClickForm(RandomEmail);
    await productPage.fillTheLicenseInOneClickForm();
    await productPage.clickConfirmButtonInOneClickForm();

    await expect(productPage.buyInOneClickFormSuccess).toBeVisible();
  });

  test("Проверка наличия ошибок на пустые поля", async () => {
    await productPage.fillTheFIOInOneClickForm(" ");
    await productPage.clickConfirmButtonInOneClickForm();

    let ErrorEmptyFIOText =
      await productPage.getFIOEmptyErrorTextInOneClickForm();
    expect(
      ErrorEmptyFIOText,
      "Ошибка пустого поля в ФИО отсутствует или некорректная"
    ).toContain(ErrorEmpty);

    let ErrorEmptyPhoneText =
      await productPage.getPhoneErrorTextInOneClickForm();
    expect(
      ErrorEmptyPhoneText,
      "Ошибка пустого поля у телефона отсутствует или некорректная"
    ).toContain(ErrorEmpty);

    let ErrorEmptyEmailText =
      await productPage.getEmailErrorTextInOneClickForm();
    expect(
      ErrorEmptyEmailText,
      "Ошибка пустого поля у email отсутствует или некорректная"
    ).toContain(ErrorEmpty);

    let ErrorLicenseText =
      await productPage.getLicenseErrorTextInOneClickForm();
    expect(
      ErrorLicenseText,
      "Ошибка отсутствия чекбокса отсутствует или некорректная"
    ).toContain(CheckboxError);
  });

  test("Проверка наличия ошибок на невалидные данные", async () => {
    await productPage.fillTheFIOInOneClickForm("123");
    await productPage.fillThePhoneInOneClickForm("4");
    await productPage.fillTheEmailInOneClickForm("567");
    await productPage.fillTheCommentInOneClickForm("test");
    await productPage.fillTheLicenseInOneClickForm();

    let ErrorinvalidFIOText = await productPage.getFIOErrorTextInOneClickForm();
    expect(
      ErrorinvalidFIOText,
      "Ошибка невалидного поля в ФИО отсутствует или некорректная"
    ).toContain(ErrorInvalidFIO);

    let ErrorInvalidPhoneText =
      await productPage.getPhoneErrorTextInOneClickForm();
    expect(
      ErrorInvalidPhoneText,
      "Ошибка невалидного поля у телефона отсутствует или некорректная"
    ).toContain(ErrorInvalid);

    let ErrorInvalidEmailText =
      await productPage.getEmailErrorTextInOneClickForm();

    expect(
      ErrorInvalidEmailText,
      "Ошибка невалидного поля у email отсутствует или некорректная"
    ).toContain(ErrorInvalid);

    await expect(productPage.buyConfirmButtonInOneClickForm).toBeDisabled();
  });
});
