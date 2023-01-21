"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ListFilesFromFolder = void 0;
const fs = require("fs");
function ListFilesFromFolder(folder) {
    return fs.readdirSync("src/tests/test_folder");
}
exports.ListFilesFromFolder = ListFilesFromFolder;
