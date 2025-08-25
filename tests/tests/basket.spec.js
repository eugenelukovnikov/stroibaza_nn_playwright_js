import { test, expect } from "@playwright/test";

import { BasketPage } from "../pages/BasketPage";

import { ProductPage } from "../pages/ProductPage";

test("Проверка сообщения в пустой корзине", async ({ page }) => {
  const basketPage = new BasketPage(page);

  await basketPage.open();

  await expect(basketPage.emptyBasketText).toBeVisible();
});

test.describe("Корзина: удаление, увеличение, уменьшение количества товаров", () => {
  let productPage;
  let basketPage;

  test.beforeEach(async ({ page }) => {
    productPage = new ProductPage(page);
    basketPage = new BasketPage(page);

    await productPage.open("kover_moldabela_soho_1716_15033_.html");
    await productPage.addToCart();
    await basketPage.open();
  });

  test("Товар успешно удаляется", async () => {
    await basketPage.clickDeleteAllButton();
    await expect(basketPage.emptyBasketText).toBeVisible();
  });

  test("Количество товара увеличивается корректно", async () => {
    await basketPage.clickPlusOneItem();
    await expect(basketPage.elementsCount).toHaveValue("2");
  });

  test("Количество товара уменьшается корректно", async () => {
    await basketPage.clickMinusOneItem();
    await expect(basketPage.elementsCount).toHaveValue("1");
  });

  test("Сумма товаров и итоговая сумма корзины совпадают", async () => {
    const totalSum = await basketPage.getProductsSumInBasket();
    const basketSumNumber = await basketPage.getBasketSum();
    expect(totalSum).toBe(basketSumNumber);
  });
});
