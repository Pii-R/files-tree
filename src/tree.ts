import fs from "fs";
import { convertPathToPosix } from "./path_manipulation";

enum Prefix {
  DOWN_RIGHT = "┗",
  VERTICAL = "┃",
  RIGHT_TACK = "┣",
}

/**
 * List of files and directories not recursively
 * @param folder folder to analyse
 * @returns list of files and dir from folder
 */
export function listFilesFromFolder(folder: string): string[] {
  return fs.readdirSync(folder);
}

/**
 * Tells if a path is a dir or not
 *
 * @export
 * @param {string} path path to check
 * @return {*}  {boolean} true if path is a dir false otherwise
 */
export function isDirectory(path: string): boolean {
  return fs.lstatSync(path).isDirectory();
}

export function createTreefromFolder(path: string): string[] {
  const files = listFilesFromFolder(path);
  const tree: string[] = [createFirstBranch(path)];
  files.forEach((file) => {
    tree.push(Prefix.VERTICAL.concat(file));
  });
  return tree;
}

export function createFirstBranch(path: string): string {
  const folderArray = convertPathToPosix(path)
    .split("/")
    .filter((e) => e);
  return `🗃️ ${folderArray[folderArray.length - 1]}`;
}
