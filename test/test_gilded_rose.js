var { expect } = require("chai");
var {test} = require("mocha");
var { Shop, Item } = require("../src/gilded_rose.js");

const characterisedTests = require("./fixtures/characterized_test_data.json");

xdescribe("Gilded Rose charactrized tests", function () {
  // We loop over all the test cases we generated with the generator script.
  for (const test of characterisedTests) {
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
  // All items have a SellIn value which denotes the number of days we have to sell the item and its quality.
  it("should have a sellIn AND quality value", function () {
    const gildedRose = new Shop([new Item("foo", 0, 0)]);
    const items = gildedRose.items;
    expect(items[0].sellIn).to.equal(0);
    expect(items[0].quality).to.equal(0);
  });

  // At the end of each day our system lowers both values for every item
  it("should lower the sellIn and quality value at the end of each day", function () {
    const gildedRose = new Shop([new Item("foo", 1, 1)]);
    const items = gildedRose.updateQuality();
    expect(items[0].sellIn).to.equal(0);
    expect(items[0].quality).to.equal(0);
  });

  // 	Once the sell by date has passed, Quality degrades twice as fast
  it("should degrade twice as fast once the sell by date has passed", function () {
    const gildedRose = new Shop([new Item("foo", 0, 2)]);
    const items = gildedRose.updateQuality();
    expect(items[0].sellIn).to.equal(-1);
    expect(items[0].quality).to.equal(0);
  });

  // 	The Quality of an item is never negative
  it("should never have a negative quality", function () {
    const gildedRose = new Shop([new Item("foo", 0, 0)]);
    const items = gildedRose.updateQuality();
    expect(items[0].sellIn).to.equal(-1);
    expect(items[0].quality).to.equal(0);
  });

  // 	"Aged Brie" actually increases in Quality the older it gets
  it("should increase in quality the older it gets", function () {
    const gildedRose = new Shop([new Item("Aged Brie", 1, 0)]);
    const items = gildedRose.updateQuality();
    expect(items[0].sellIn).to.equal(0);
    expect(items[0].quality).to.equal(1);
  });

  // 	The Quality of an item is never more than 50
  it("should never have a quality more than 50", function () {
    const gildedRose = new Shop([new Item("Aged Brie", 1, 50)]);
    const items = gildedRose.updateQuality();
    expect(items[0].sellIn).to.equal(0);
    expect(items[0].quality).to.equal(50);
  });

  // 	"Sulfuras", being a legendary item, never has to be sold or decreases in Quality
  it("should never have to be sold or decrease in quality", function () {
    const gildedRose = new Shop([
      new Item("Sulfuras, Hand of Ragnaros", 0, 80),
    ]);
    const items = gildedRose.updateQuality();
    expect(items[0].sellIn).to.equal(0);
    expect(items[0].quality).to.equal(80);
  });

  // 	"Backstage passes", like aged brie, increases in Quality as its SellIn value approaches;
  it("should increase in quality as its sellIn value approaches", function () {
    const gildedRose = new Shop([
      new Item("Backstage passes to a TAFKAL80ETC concert", 15, 20),
    ]);
    const items = gildedRose.updateQuality();
    expect(items[0].sellIn).to.equal(14);
    expect(items[0].quality).to.equal(21);
  });

  // 	Quality increases by 2 when there are 10 days or less and by 3 when there are 5 days or less but
  it("should increase by 2 when there are 10 days or less and by 3 when there are 5 days or less", function () {
    const gildedRose = new Shop([
      new Item("Backstage passes to a TAFKAL80ETC concert", 10, 20),
    ]);
    const items = gildedRose.updateQuality();
    expect(items[0].sellIn).to.equal(9);
    expect(items[0].quality).to.equal(22);
  });

  // 	Quality drops to 0 after the concert
  it("should drop to 0 after the concert", function () {
    const gildedRose = new Shop([
      new Item("Backstage passes to a TAFKAL80ETC concert", 0, 20),
    ]);
    const items = gildedRose.updateQuality();
    expect(items[0].sellIn).to.equal(-1);
    expect(items[0].quality).to.equal(0);
  });

});

