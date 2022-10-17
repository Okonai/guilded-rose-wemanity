var { expect } = require("chai");
var { test, describe, it } = require("mocha");
var { Shop, Item } = require("../src/gilded_rose.js");

const ItemNames = {
  BRIE: "Aged Brie",
  HAND: "Sulfuras, Hand of Ragnaros",
  PASS: "Backstage passes to a TAFKAL80ETC concert",
  NORMAL: "+5 Dexterity Vest",
  CONJURED: "Conjured Mana Cake",
};

describe("Gilded Rose", function () {
  describe("updateQuality", function () {
    describe(ItemNames.NORMAL, function () {
      it("should decrease quality by 1 AND sellIn by 1", function () {
        const gildedRose = new Shop([new Item(ItemNames.NORMAL, 10, 10)]);
        const items = gildedRose.updateQuality();
        expect(items[0].quality).to.equal(9);
        expect(items[0].sellIn).to.equal(9);
      });

      it("should decrease quality by 2 when sellIn is 0", function () {
        const gildedRose = new Shop([new Item(ItemNames.NORMAL, 0, 10)]);
        const items = gildedRose.updateQuality();
        expect(items[0].quality).to.equal(8);
      });

      it("should not decrease quality below 0", function () {
        const gildedRose = new Shop([new Item(ItemNames.NORMAL, 10, 0)]);
        const items = gildedRose.updateQuality();
        expect(items[0].quality).to.equal(0);
      });

      it("should not decrease quality below 0 when sellIn is 0", function () {
        const gildedRose = new Shop([new Item(ItemNames.NORMAL, 0, 0)]);
        const items = gildedRose.updateQuality();
        expect(items[0].quality).to.equal(0);
      });
    });

    describe(ItemNames.BRIE, function () {
      it("should increase in quality the older it gets", function () {
        const gildedRose = new Shop([new Item(ItemNames.BRIE, 2, 0)]);
        const items = gildedRose.updateQuality();
        expect(items[0].name).to.equal(ItemNames.BRIE);
        expect(items[0].sellIn).to.equal(1);
        expect(items[0].quality).to.equal(1);
      });

      it("should increase in quality twice as fast after the sell by date has passed", function () {
        const gildedRose = new Shop([new Item(ItemNames.BRIE, 0, 0)]);
        const items = gildedRose.updateQuality();
        expect(items[0].name).to.equal(ItemNames.BRIE);
        expect(items[0].sellIn).to.equal(-1);
        expect(items[0].quality).to.equal(2);
      });

      it("should never have a quality of more than 50", function () {
        const gildedRose = new Shop([new Item(ItemNames.BRIE, 2, 50)]);
        const items = gildedRose.updateQuality();
        expect(items[0].name).to.equal(ItemNames.BRIE);
        expect(items[0].sellIn).to.equal(1);
        expect(items[0].quality).to.equal(50);
      });

      it("should never have a quality of less than 0", function () {
        const gildedRose = new Shop([new Item(ItemNames.BRIE, 2, -1)]);
        const items = gildedRose.updateQuality();
        expect(items[0].name).to.equal(ItemNames.BRIE);
        expect(items[0].sellIn).to.equal(1);
        expect(items[0].quality).to.equal(0);
      });
    });

    describe(ItemNames.HAND, function () {
      it("should never decrease in quality", function () {
        const gildedRose = new Shop([new Item(ItemNames.HAND, 0, 80)]);
        const items = gildedRose.updateQuality();
        expect(items[0].name).to.equal(ItemNames.HAND);
        expect(items[0].sellIn).to.equal(0);
        expect(items[0].quality).to.equal(80);
      });
    });

    describe(ItemNames.PASS, function () {
      it("should increase in quality by 1 when there are more than 10 days left", function () {
        const gildedRose = new Shop([new Item(ItemNames.PASS, 11, 20)]);
        const items = gildedRose.updateQuality();
        expect(items[0].name).to.equal(ItemNames.PASS);
        expect(items[0].sellIn).to.equal(10);
        expect(items[0].quality).to.equal(21);
      });

      it("should increase in quality by 2 when there are 10 days or less left", function () {
        const gildedRose = new Shop([new Item(ItemNames.PASS, 10, 20)]);
        const items = gildedRose.updateQuality();
        expect(items[0].name).to.equal(ItemNames.PASS);
        expect(items[0].sellIn).to.equal(9);
        expect(items[0].quality).to.equal(22);
      });

      it("should increase in quality by 2 when there are 6 days or less left", function () {
        const gildedRose = new Shop([new Item(ItemNames.PASS, 6, 20)]);
        const items = gildedRose.updateQuality();
        expect(items[0].name).to.equal(ItemNames.PASS);
        expect(items[0].sellIn).to.equal(5);
        expect(items[0].quality).to.equal(22);
      });

      it("should increase in quality by 3 when there are 5 days or less left", function () {
        const gildedRose = new Shop([new Item(ItemNames.PASS, 5, 20)]);
        const items = gildedRose.updateQuality();
        expect(items[0].name).to.equal(ItemNames.PASS);
        expect(items[0].sellIn).to.equal(4);
        expect(items[0].quality).to.equal(23);
      });

      it("should increase in quality by 3 when there are 1 day or less left", function () {
        const gildedRose = new Shop([new Item(ItemNames.PASS, 1, 20)]);
        const items = gildedRose.updateQuality();
        expect(items[0].name).to.equal(ItemNames.PASS);
        expect(items[0].sellIn).to.equal(0);
        expect(items[0].quality).to.equal(23);
      });

      it("should have a quality of 0 after the concert", function () {
        const gildedRose = new Shop([new Item(ItemNames.PASS, 0, 20)]);
        const items = gildedRose.updateQuality();
        expect(items[0].name).to.equal(ItemNames.PASS);
        expect(items[0].sellIn).to.equal(-1);
        expect(items[0].quality).to.equal(0);
      });

      it("should never have a quality of more than 50", function () {
        const gildedRose = new Shop([new Item(ItemNames.PASS, 11, 50)]);
        const items = gildedRose.updateQuality();
        expect(items[0].name).to.equal(ItemNames.PASS);
        expect(items[0].sellIn).to.equal(10);
        expect(items[0].quality).to.equal(50);
      });

      it("should never have a quality of less than 0", function () {
        const gildedRose = new Shop([new Item(ItemNames.PASS, 11, -1)]);
        const items = gildedRose.updateQuality();
        expect(items[0].name).to.equal(ItemNames.PASS);
        expect(items[0].sellIn).to.equal(10);
        expect(items[0].quality).to.equal(0);
      });
    });
  });

  describe("Conjured Items", function () {
    it("should decrease in quality twice as fast as normal items", function () {
      const gildedRose = new Shop([new Item(ItemNames.CONJURED, 2, 50)]);
      const items = gildedRose.updateQuality();
      expect(items[0].name).to.equal(ItemNames.CONJURED);
      expect(items[0].sellIn).to.equal(1);
      expect(items[0].quality).to.equal(48);
    });

    it("should decrease in quality twice as fast as normal items after the sell by date has passed", function () {
      const gildedRose = new Shop([new Item(ItemNames.CONJURED, 0, 50)]);
      const items = gildedRose.updateQuality();
      expect(items[0].name).to.equal(ItemNames.CONJURED);
      expect(items[0].sellIn).to.equal(-1);
      expect(items[0].quality).to.equal(46);
    });

    it("should never have a quality of less than 0", function () {
      const gildedRose = new Shop([new Item(ItemNames.CONJURED, 2, 0)]);
      const items = gildedRose.updateQuality();
      expect(items[0].name).to.equal(ItemNames.CONJURED);
      expect(items[0].sellIn).to.equal(1);
      expect(items[0].quality).to.equal(0);
    });

    it("should never have a quality of more than 50", function () {
      const gildedRose = new Shop([new Item(ItemNames.CONJURED, 2, 80)]);
      const items = gildedRose.updateQuality();
      expect(items[0].name).to.equal(ItemNames.CONJURED);
      expect(items[0].sellIn).to.equal(1);
      expect(items[0].quality).to.equal(50);
    });
  });
});
