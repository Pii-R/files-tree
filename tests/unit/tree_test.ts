import { expect } from "chai";
import path from "path";
import { isDirectory } from "../../src/path_manipulation";
import {
  ClassicTree,
  ClassicTreeConfiguration,
  FilePrefixes,
} from "../../src/tree";

const test_folder_path = "tests/unit/data/test_folder";

describe("Tests for tree creation", () => {
  it("is directory", () => {
    const dir_path = test_folder_path;
    expect(isDirectory(dir_path)).to.be.true;
  });

  it("is not directory", () => {
    const dir_path = path.join(test_folder_path, "env.test");
    expect(isDirectory(dir_path)).to.be.false;
  });
});

describe("Tree building", () => {
  it("Create simple tree with one depth and a single file", () => {
    const folder_path = "tests/unit/data/one_file";
    const configuration = new ClassicTreeConfiguration(
      "🗃️ ",
      new FilePrefixes(""),
      3,
      " ",
      -1
    );

    const tree = new ClassicTree(configuration);
    expect(tree.createTree(folder_path)).to.be.eql([
      "🗃️ one_file",
      "   unique_file",
    ]);
  });
  it("Create simple tree with one depth and multiple files", () => {
    const folder_path = "tests/unit/data/multiple_files";
    const configuration = new ClassicTreeConfiguration(
      "🗃️ ",
      new FilePrefixes(""),
      3,
      " ",
      -1
    );
    const tree = new ClassicTree(configuration);
    expect(tree.createTree(folder_path)).to.be.eql([
      "🗃️ multiple_files",
      "   file1.txt",
      "   file2.env",
      "   test.xls",
    ]);
  });
  it("Create simple tree with 2 depths and multiple files", () => {
    const folder_path = "tests/unit/data/test_folder";
    const configuration = new ClassicTreeConfiguration(
      "🗃️ ",
      new FilePrefixes(""),
      3,
      " ",
      -1
    );
    const tree = new ClassicTree(configuration);
    expect(tree.createTree(folder_path)).to.be.eql([
      "🗃️ test_folder",
      "   env.test",
      "   file.txt",
      "   🗃️ src",
      "      test.txt",
    ]);
  });
  it("Create simple tree with 2 depths and multiple files with config", () => {
    const folder_path = "tests/unit/data/test_folder";
    const configuration = new ClassicTreeConfiguration(
      "🗃️ ",
      new FilePrefixes("-"),
      3,
      " ",
      -1
    );
    const tree = new ClassicTree(configuration);
    expect(tree.createTree(folder_path)).to.be.eql([
      "🗃️ test_folder",
      "   -env.test",
      "   -file.txt",
      "   🗃️ src",
      "      -test.txt",
    ]);
  });

  it("Create simple tree with 3 depths and multiple files with config", () => {
    const folder_path = "tests/unit/data/depth";
    const configuration = new ClassicTreeConfiguration(
      "🗃️ ",
      new FilePrefixes(""),
      3,
      " ",
      3
    );
    const tree = new ClassicTree(configuration);
    expect(tree.createTree(folder_path)).to.be.eql([
      "🗃️ depth",
      "   🗃️ depth1",
      "      🗃️ depth2",
      "         🗃️ depth3",
      "            file3.txt",
    ]);
  });

  it("Create simple tree with 3 depths and multiple files with config", () => {
    const folder_path = "tests/unit/data/depth";
    const configuration = new ClassicTreeConfiguration(
      "🗃️ ",
      new FilePrefixes(""),
      3,
      " ",
      4
    );
    const tree = new ClassicTree(configuration);
    expect(tree.createTree(folder_path)).to.be.eql([
      "🗃️ depth",
      "   🗃️ depth1",
      "      🗃️ depth2",
      "         🗃️ depth3",
      "            file3.txt",
      "            🗃️ depth4",
      "               file4.txt",
    ]);
  });
});
