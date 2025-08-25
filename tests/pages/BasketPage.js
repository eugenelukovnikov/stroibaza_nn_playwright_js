export class BasketPage {
  constructor(page) {
    this.page = page;
    this.basketFormWindow = page.locator("#basket_form");
    this.emptyBasketText = page.locator(".bx-sbb-empty-cart-text");
    this.productsInBasket = page.locator(".basket-items-list-item-container");
    this.deleteAllButton = page.locator(".delete_all");
    this.plusOneItem = page.locator(".basket-item-amount-btn-plus");
    this.elementsCount = page.locator(".basket-item-amount-filed");
    this.minusOneItem = page.locator(".basket-item-amount-btn-minus");
    this.elementsPrice = page.locator(
      "//td[@class='basket-items-list-item-price']//span[@class='basket-item-price-current-text']"
    );
    this.basketSum = page.locator(
      "//div[@class='basket-coupon-block-total-price-current']"
    );
  }

  async open() {
    await this.page.goto(`https://stroibaza-nn.ru/basket/`);
  }

  async clickDeleteAllButton() {
    await this.deleteAllButton.click();
  }

  async clickPlusOneItem() {
    await this.plusOneItem.click();
  }

  async clickMinusOneItem() {
    await this.minusOneItem.click();
  }

  async getProductsSumInBasket() {
    const pricesText = await this.elementsPrice.allTextContents();
    const pricesNumbers = pricesText.map((text) =>
      Number(text.replace(/\s|руб\.?/g, ""))
    );
    const totalSum = pricesNumbers.reduce((acc, curr) => acc + curr, 0);
    return totalSum;
  }

  async getBasketSum() {
    const basketSumText = await this.basketSum.textContent();
    return Number(basketSumText.replace(/\s|руб\.?/g, ""));
  }
}
