export class CatalogPage {
  constructor(page) {
    this.page = page;
    this.firstAddToBasketButton = page.locator(".button_block").first();
    this.addedToBasketButton = page.locator(".button_block.wide");
    this.firstCatalogItem = page.locator(".catalog_item_wrapp.item").first();
    this.priceMin = page.locator("#NEXT_SMART_FILTER_P1_MIN");
    this.priceMax = page.locator("#NEXT_SMART_FILTER_P1_MAX");
    this.setFilterButton = page.locator("#set_filter");
  }

  async open(catalogUrl) {
    await this.page.goto(`https://stroibaza-nn.ru/catalog/${catalogUrl}/`);
  }

  async getTitle() {
    return this.page.title();
  }

  async addToCart() {
    await this.firstAddToBasketButton.click();
  }

  async hoverToFirstItem() {
    await this.firstCatalogItem.hover();
  }

  async isAddedButtonIsVisible() {
    return (await this.addedToBasketButton.count()) === 1;
  }

  async reload() {
    await this.page.reload();
  }

  async fillMinPriceFilter(minPrice) {
    await this.priceMin.type(minPrice);
  }

  async fillMaxPriceFilter(maxPrice) {
    await this.priceMax.type(maxPrice);
  }

  async clickSetFilterButton() {
    await this.setFilterButton.click();
  }
}
