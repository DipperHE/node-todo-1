const db = require("../db.js");
const fs = require("fs");
const { isTypedArray } = require("util/types");
const { parseExpectedArgs } = require("commander");
jest.mock("fs");

describe("db", () => {
  afterEach(() => {
    fs.clearMocks();
  });
  it("can read", async () => {
    const data = [{ title: "hi", done: true }];
    fs.setReadFileMock("/xxx", null, JSON.stringify(data));
    const list = await db.read("/xxx");
    expect(list).toStrictEqual(data);
  });
  it("can write", async () => {
    let fakeFile;
    fs.setWriteFileMock("/yyy", (path, data, callback) => {
      fakeFile = data;
      callback(null);
    });
    const list = [
      { title: "买水", done: true },
      { title: "买饭", done: true },
    ];
    await db.write(list, "/yyy");
    expect(fakeFile).toBe(JSON.stringify(list) + "\n");
  });
});
