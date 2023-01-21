import fs from "fs";
export function listFilesFromFolder(folder) {
    return fs.readdirSync(folder);
}
export function isDirectory(path) {
    return fs.lstatSync(path).isDirectory();
}
//# sourceMappingURL=tree.js.map