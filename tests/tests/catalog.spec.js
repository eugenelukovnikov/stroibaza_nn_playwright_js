import { test, expect } from "@playwright/test";

import { CatalogPage } from "../pages/CatalogPage";

import { BasketPage } from "../pages/BasketPage";

test.describe("Каталог: проверка добавления товара в корзину", () => {
  let catalogPage;
  let basketPage;

  test.beforeEach(async ({ page }) => {
    catalogPage = new CatalogPage(page);
    basketPage = new BasketPage(page);

    await catalogPage.open("kovry");
    await catalogPage.hoverToFirstItem();
    await catalogPage.addToCart();
  });

  test("Появляется окно корзины после добавления товара", async () => {
    await expect(basketPage.basketFormWindow).toBeVisible();
  });

  test("Кнопка 'В корзину' изменена после добавления товара", async () => {
    await catalogPage.reload();
    await catalogPage.hoverToFirstItem();
    await expect(catalogPage.addedToBasketButton).toHaveCount(1);
  });
});

test.describe("Каталог: фильтрация", () => {
  let catalogPage;

  test.beforeEach(async ({ page }) => {
    catalogPage = new CatalogPage(page);

    await catalogPage.open("kovry");
  });

  test("Цена - минимальная и максимальная отрабатывает корректно", async () => {
    await catalogPage.fillMinPriceFilter("8000");
    await catalogPage.fillMaxPriceFilter("10000");

    const setFilterButtonValue = await catalogPage.setFilterButton.inputValue();

    await expect(catalogPage.setFilterButton).not.toHaveValue(
      setFilterButtonValue
    );

    await catalogPage.clickSetFilterButton();
    const urlWithFilterParams = catalogPage.page.url();
    expect(urlWithFilterParams).toBe(
      "https://stroibaza-nn.ru/catalog/kovry/filter/price-base-from-8000-to-10000/apply/"
    );
  });
});
