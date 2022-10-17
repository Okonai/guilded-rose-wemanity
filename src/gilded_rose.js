class Item {
  constructor(name, sellIn, quality) {
    this.name = name;
    this.sellIn = sellIn;
    this.quality = quality;
  }
}

const ItemTypes = {
  BIRE: "Aged Brie",
  HAND: "Sulfuras, Hand of Ragnaros",
  PASS: "Backstage passes to a TAFKAL80ETC concert",
  NORMAL: "+5 Dexterity Vest",
  CONJURED: "Conjured Mana Cake",
};

function limitNumberWithinRange(num, min = 0, max = 50) {
  const parsed = parseInt(num)
  return Math.min(Math.max(parsed, min), max)
}

function updateNormal(item) {
  const qualityChange = item.sellIn < 0 ? 2 : 1;
  item.quality = limitNumberWithinRange((item.quality - qualityChange), 0, 50);
}

function updateBrie(item) {
  const qualityChange = item.sellIn < 0 ? 2 : 1;
  item.quality = limitNumberWithinRange((item.quality + qualityChange), 0, 50);
}

function updatePass(item) {
  switch (true) {
    case item.sellIn < 0:
      item.quality = 0;
      break;
    case item.sellIn < 5:
      item.quality = item.quality + 3
      break;
    case item.sellIn < 10:
      item.quality = item.quality + 2
      break;
    default:
      item.quality = item.quality + 1
    }
    item.quality = limitNumberWithinRange(item.quality, 0, 50);
}

function updateHand(item) {}

function updateConjured(item) {
  const qualityChange = item.sellIn < 0 ? 4 : 2;
  item.quality = limitNumberWithinRange((item.quality - qualityChange), 0, 50);
}

class Shop {
  constructor(items = []) {
    this.items = items;
  }
  updateQuality() {
    for (const item of this.items) {
      item.sellIn = item.sellIn - 1;
      switch (item.name) {
        case ItemTypes.BIRE:
          updateBrie(item);
          continue;
        case ItemTypes.HAND:
          updateHand(item);
          continue;
        case ItemTypes.PASS:
          updatePass(item);
          continue;
        case ItemTypes.CONJURED:
          updateConjured(item);
          continue;
        default:
          updateNormal(item);
          continue;
      }
    }

    return this.items;
  }
}
module.exports = {
  Item,
  Shop,
};
