const { deterministicPartitionKey } = require("./dpk");

describe("deterministicPartitionKey", () => {
  it("Returns the literal '0' when given no input", () => {
    const trivialKey = deterministicPartitionKey();
    expect(trivialKey).toBe("0");
  });

  it("Returns the partitionkey when input have partitionkey", () => {
    const event = {
      partitionKey: "adfasdfas3232",
      x: 29
    }
    const trivialKey = deterministicPartitionKey(event);
    expect(trivialKey).toBe(event.partitionKey);
  });

  it("Returns the new partitionkey when input dont have partitionkey", () => {
    const event = {
      x: 20
    }

    const trivialKey = deterministicPartitionKey(event);
    expect(typeof trivialKey).toBe("string");
    expect()
  })
});
