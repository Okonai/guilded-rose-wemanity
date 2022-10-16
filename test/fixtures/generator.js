const { Shop, Item } = require("../../src/gilded_rose");
const fs = require("fs");

// We have the following items defined in the source code, and we want to test them all:
const names = [
  "Aged Brie",
  "Sulfuras, Hand of Ragnaros",
  "Backstage passes to a TAFKAL80ETC concert",
  "+5 Dexterity Vest",
];

// Since the sellIn and quality values are can be between 0-12 and 0-50 respectively, we make sure we include all possible values in the test cases.
const [minSellIn, maxSellIn] = [-1, 12];  
const [minQuality, maxQuality] = [-1, 51];

const tests = [];

// We want to test all possible combinations of the items, sellIn and quality values.
for (const name of names) {
  for (let sellIn = minSellIn; sellIn <= maxSellIn; sellIn++) {
    for (let quality = minQuality; quality <= maxQuality; quality++) {


      const guildedRose = new Shop([new Item(name, sellIn, quality)]);
      const items = guildedRose.updateQuality();

      const outputSellIn = items[0].sellIn;
      const outputQuality = items[0].quality;

      tests.push({
        name, 
        sellIn,
        quality,

        expectedSellIn: outputSellIn,
        expectedQuality: outputQuality,
      })
      
    }
  }
}

const outputFilename = "test/fixtures/characterized_test_data.json";

// We write the test cases to a file so that we can use them in our test suite. We will use the file in the characterized tests later.
fs.writeFileSync(outputFilename, JSON.stringify(tests, null, 2));

// We give feedback to the user how many test cases we have generated.
console.log(`Generated ${tests.length} test cases.`);

module.exports = {
  tests,
  outputFilename
}