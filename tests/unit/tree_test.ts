import { expect } from "chai";
import path from "path";
import {
  createFirstBranch,
  createTreefromFolder,
  isDirectory,
  listFilesFromFolder,
} from "../../src/tree";

const test_folder_path = "tests/unit/data/test_folder";
const empty_test_folder_path = "tests/unit/data/empty_folder";
const multiple_files_test_folder_path = "tests/unit/data/multiple_files";

describe("Tests for tree creation", () => {
  it("list of files", () => {
    const test_folder = path.join(test_folder_path);
    expect(listFilesFromFolder(test_folder)).to.eql([
      "env.test",
      "file.txt",
      "src",
    ]);
  });

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

  it("creation of tree with multiple files and no others dir", () => {
    const expectedArray: string[] = [
      "🗃️ multiple_files",
      "┃file1.txt",
      "┃file2.env",
      "┃test.xls",
    ];
    expect(createTreefromFolder(multiple_files_test_folder_path)).to.eql(
      expectedArray
    );
  });

  it("creation of a unique folder tree", () => {
    const expectedArray: string[] = ["🗃️ empty_folder"];
    expect(createTreefromFolder(empty_test_folder_path)).to.eql(expectedArray);
  });
});
