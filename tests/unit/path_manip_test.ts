import { expect } from "chai";
import {
  convertPathToPosix,
  getFilesRecursively,
} from "../../src/path_manipulation";

describe("Test of path manipulations", () => {
  it("Convert a Windows path to Posix path", () => {
    const windowsPath = "C:\\repos\\vue-t\\tests\\views\\index\\home.vue";
    expect(convertPathToPosix(windowsPath)).to.be.eql(
      "C:/repos/vue-t/tests/views/index/home.vue"
    );
  });
  it("Convert a Posix path to Posix path", () => {
    const posixPath = "usr/bin/bash.rc";
    expect(convertPathToPosix(posixPath)).to.be.eql("usr/bin/bash.rc");
  });
});

describe("Test of list of files of a dir with depth", () => {
  it("List all of files of sub a specific folder", () => {
    const test_path = "tests/unit/data/multiple_files";
    const list_files = getFilesRecursively(test_path);
    expect(list_files).to.be.eql([
      ["tests/unit/data/multiple_files/file1.txt", 0],
      ["tests/unit/data/multiple_files/file2.env", 0],
      ["tests/unit/data/multiple_files/test.xls", 0],
    ]);
  });
  it("List all of files of sub a specific folder with max depth 0", () => {
    const test_path = "tests/unit/data/test_folder";
    const list_files = getFilesRecursively(test_path, 0);
    expect(list_files).to.be.eql([
      ["tests/unit/data/test_folder/env.test", 0],
      ["tests/unit/data/test_folder/file.txt", 0],
    ]);
  });
  it("List all of files of sub a specific folder with max depth 3", () => {
    const test_path = "tests/unit/data/depth";
    const list_files = getFilesRecursively(test_path, 3);
    expect(list_files).to.be.eql([
      ["tests/unit/data/depth/depth1/depth2/depth3/file3.txt", 3],
    ]);
  });
  it("List all of files of sub a specific folder", () => {
    const test_path = "tests/unit/data/test_folder";
    const list_files = getFilesRecursively(test_path);
    expect(list_files).to.be.eql([
      ["tests/unit/data/test_folder/env.test", 0],
      ["tests/unit/data/test_folder/file.txt", 0],
      ["tests/unit/data/test_folder/src/test.txt", 1],
    ]);
  });
});
