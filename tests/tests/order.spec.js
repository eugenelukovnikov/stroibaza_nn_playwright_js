import { test, expect } from "@playwright/test";

import { faker } from "@faker-js/faker";

import { ProductPage } from "../pages/ProductPage";

import { OrderPage } from "../pages/OrderPage";

test("Оформление заказа через страницу товара", async ({ page }) => {
  const RandomName = faker.person.fullName();

  const RandomEmail = faker.internet.email();

  const RandomPhone = "9" + faker.string.numeric(9);

  const productPage = new ProductPage(page);

  await productPage.open("kover_moldabela_soho_1716_15033_.html");

  await productPage.addToCart();

  const orderPage = new OrderPage(page);

  await orderPage.open();

  await orderPage.clickNextButton();

  await orderPage.clickNextButton();

  await orderPage.fillTheName(RandomName);

  await orderPage.fillTheEmail(RandomEmail);

  await orderPage.fillThePhone(RandomPhone);

  await orderPage.clickNextButton();

  await orderPage.fillTheLicences();

  await orderPage.clickConfirmOrderButton();

  await expect(orderPage.page).toHaveURL(/\/order\/\?ORDER_ID=/);

  await expect(orderPage.h1).toHaveText("Заказ сформирован");
});
