import { test, expect } from "@playwright/test";
import Helper from "../helper-functions/helper";

let helper;
test.describe.configure({ mode: "parallel" });

test.describe("UI Assessments", async () => {
  test.beforeEach("Setup Browser", async ({ page }) => {
    helper = new Helper(page);
    // Navigate to The test website
    await helper.visitUrl(
      "https://blockstream.info/block/000000000000000000076c036ff5119e5a5a74df77abf64203473364509f7732"
    );
  });

  test("Verify Transactions Header", async () => {
    await helper.verifyText("div .transactions h3", "25 of 2875 Transactions");
  });

  test("Verify transactions which has exactly 1 input and 2 outputs", async () => {
    const transactionBox = await helper.getElementCount("#transaction-box");
    console.log(`Total transactions found : ${transactionBox}`);
    for (let index = 1; index <= transactionBox; index++) {
      const inputBox = await helper.getElementCount(
        `(//div[@id='transaction-box'])[${index}]//div[@class='vin-header']`
      );

      if (inputBox === 1) {
        const outputBox = await helper.getElementCount(
          `(//div[@id='transaction-box'])[${index}]//div[@class='vouts']//div[@class='vout']`
        );

        if (outputBox === 2) {
          const tsnHash = await helper.getTextContent(
            `(//div[@id='transaction-box'])[${index}]//div[@class='header']//div[@class='txn font-p2']`
          );
          console.log(
            `Transaction with 1 input and 2 outputs found : ${tsnHash}`
          );
        }
      }
    }
  });
});
