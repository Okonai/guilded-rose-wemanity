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

function updateNormal(sellIn, quality) {
  const qualityChange = sellIn < 0 ? 2 : 1;
  return limitNumberWithinRange((quality - qualityChange), 0, 50);
}

function updateBrie(sellIn, quality) {
  const qualityChange = sellIn < 0 ? 2 : 1;
  return limitNumberWithinRange((quality + qualityChange), 0, 50);
}

function updatePass(sellIn, quality) {
  switch (true) {
    case sellIn < 0:
      quality = 0;
      break;
    case sellIn < 5:
      quality = quality + 3
      break;
    case sellIn < 10:
      quality = quality + 2
      break;
    default:
      quality = quality + 1
    }
    return limitNumberWithinRange(quality, 0, 50);
}

function updateHand(sellIn, quality) {
  return quality;
}

function updateConjured(sellIn, quality) {
  const qualityChange = sellIn < 0 ? 4 : 2;
  return limitNumberWithinRange((quality - qualityChange), 0, 50);
}

class Shop {
  constructor(items = []) {
    this.items = items;
  }

  updateQuality() {
    for (let item of this.items) {
      item.sellIn = item.sellIn - 1;
      const { sellIn, quality } = item;
      switch (item.name) {
        case ItemTypes.BIRE:
          item.quality = updateBrie(sellIn, quality);
          continue;
        case ItemTypes.HAND:
          item.quality = updateHand(sellIn, quality);
          continue;
        case ItemTypes.PASS:
          item.quality = updatePass(sellIn, quality);
          continue;
        case ItemTypes.CONJURED:
          item.quality = updateConjured(sellIn, quality);
          continue;
        default:
          item.quality = updateNormal(sellIn, quality);
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
