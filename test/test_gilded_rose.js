var { expect } = require("chai");
var { Shop, Item } = require("../src/gilded_rose.js");

const characterisedTests = require("./fixtures/characterized_test_data.json");

describe("Gilded Rose charactrized tests", function () {

  // We loop over all the test cases we generated with the generator script.
  for(const test of characterisedTests) {
    
    const { name, sellIn, quality, expectedSellIn, expectedQuality } = test;
    const description = `should update ${name} with sellIn ${sellIn} and quality ${quality} to sellIn ${expectedSellIn} and quality ${expectedQuality}`;

    it(description, function () {
      const gildedRose = new Shop([new Item(name, sellIn, quality)]);
      const items = gildedRose.updateQuality();
      expect(items[0].name).to.equal(name);
      expect(items[0].sellIn).to.equal(expectedSellIn);
      expect(items[0].quality).to.equal(expectedQuality);
    });
  }
});

describe("Gilded Rose", function () {
  it("should foo", function () {
    const gildedRose = new Shop([new Item("foo", 0, 0)]);
    const items = gildedRose.updateQuality();
    expect(items[0].name).to.equal("foo");
  });
});