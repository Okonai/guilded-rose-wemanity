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

function updateBrie(item) {
  if (item.quality < 50) {
    item.quality = item.quality + 1;
  }
  item.sellIn = item.sellIn - 1;

  if (item.sellIn < 0 && item.quality < 50) {
    item.quality = item.quality + 1;
  }
}

function updatePass(item) {
  if (item.quality < 50) {
    item.quality = item.quality + 1;
    if (item.sellIn < 11 && item.quality < 50) {
      item.quality = item.quality + 1;
    }
    if (item.sellIn < 6 && item.quality < 50) {
      item.quality = item.quality + 1;
    }
  }

  item.sellIn = item.sellIn - 1;

  if (item.sellIn < 0 ) {
    item.quality = item.quality - item.quality;
  }
}

function updateHand(item) {
}

function updateNormal(item) {
  if (item.quality > 0) {
    item.quality = item.quality - 1;
  }
  item.sellIn = item.sellIn - 1;
  if (item.sellIn < 0 && item.quality > 0) {
        item.quality = item.quality - 1;
      }
}

function updateConjured(item) {
  if (item.quality > 0) {
    item.quality = item.quality - 2;
  }
  item.sellIn = item.sellIn - 1;
  if (item.sellIn < 0 && item.quality > 0) {
    item.quality = item.quality - 2;
  }

  if (item.quality < 0) {
    item.quality = 0;
  } else if (item.quality > 50) {
    item.quality = 50;
  }

  console.log(item);
}

class Shop {
  constructor(items = []) {
    this.items = items;
  }
  updateQuality() {
    for (const item of this.items) {
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
  Shop
};
