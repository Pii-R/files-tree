"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tree_1 = require("../tree");
test("list of files", () => {
    expect((0, tree_1.ListFilesFromFolder)("tests/test_folder")).toEqual([
        "env.test",
        "file.txt",
    ]);
});
