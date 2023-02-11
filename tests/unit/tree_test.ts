import { expect } from "chai";
import path from "path";
import {
  createFirstBranch,
  createTreefromFolder,
  isDirectory,
  createBranch,
  createTree,
} from "../../src/tree";

const test_folder_path = "tests/unit/data/test_folder";
const empty_test_folder_path = "tests/unit/data/empty_folder";

describe("Tests for tree creation", () => {
  it("is directory", () => {
    const dir_path = test_folder_path;
    expect(isDirectory(dir_path)).to.be.true;
  });

  it("is not directory", () => {
    const dir_path = path.join(test_folder_path, "env.test");
    expect(isDirectory(dir_path)).to.be.false;
  });

  it("creation of first branch from dir/", () => {
    const dir_path = "tests/";
    expect(createFirstBranch(dir_path)).to.eql("🗃️ tests");
  });

  it("creation of first branch from dir", () => {
    const dir_path = "tests";
    expect(createFirstBranch(dir_path)).to.eql("🗃️ tests");
  });

  it("creation of a unique folder tree", () => {
    const expectedArray: string[] = ["🗃️ empty_folder"];
    const files: string[] = [];
    expect(createTreefromFolder(empty_test_folder_path, files)).to.eql(
      expectedArray
    );
  });
  it("creation of branch based on depth 0", () => {
    const expectedArray: string[] = [
      "🗃️ multiple_files",
      "   ┃file1.txt",
      "   ┃file2.env",
      "   ┃test.xls",
    ];
    const files = ["file1.txt", "file2.env", "test.xls"];
    expect(createBranch("multiple_files", files, 0)).to.eql(expectedArray);
  });

  it("creation of branch based on depth 1", () => {
    const expectedArray: string[] = [
      "   🗃️ multiple_files",
      "      ┃file1.txt",
      "      ┃file2.env",
      "      ┃test.xls",
    ];
    const files = ["file1.txt", "file2.env", "test.xls"];
    expect(createBranch("multiple_files", files, 1)).to.eql(expectedArray);
  });
});

describe("Tree building", () => {
  it("Create simple tree with one depth and a single file", () => {
    const folder_path = "tests/unit/data/one_file";
    expect(createTree(folder_path)).to.be.eql([
      "🗃️ one_file",
      "   ┃unique_file",
    ]);
  });
  it("Create simple tree with one depth and multiple files", () => {
    const folder_path = "tests/unit/data/multiple_files";
    expect(createTree(folder_path)).to.be.eql([
      "🗃️ multiple_files",
      "   ┃file1.txt",
      "   ┃file2.env",
      "   ┃test.xls",
    ]);
  });
  it("Create simple tree with 2 depths and multiple files", () => {
    const folder_path = "tests/unit/data/test_folder";
    console.log(createTree(folder_path));
    expect(createTree(folder_path)).to.be.eql([
      "🗃️ test_folder",
      "   ┃env.test",
      "   ┃file.txt",
      "   🗃️ src",
      "      ┃test.txt",
    ]);
  });
});
