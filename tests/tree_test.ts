import { listFilesFromFolder, isDirectory } from "../src/tree";
import { expect } from "chai";

describe("tests for tree creation", () => {
  it("list of files", () => {
    const test_folder = "tests/test_folder";
    expect(listFilesFromFolder(test_folder)).to.eql([
      "env.test",
      "file.txt",
      "src",
    ]);
  });

  it("is directory", () => {
    const dir_path = "tests/test_folder";
    expect(isDirectory(dir_path)).to.be.true;
  });

  it("is not directory", () => {
    const dir_path = "tests/test_folder/env.test";
    expect(isDirectory(dir_path)).to.be.false;
  });
});
