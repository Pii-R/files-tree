import fs from "fs";
import path from "path";
import { getFilesRecursively } from "./path_manipulation";

enum Prefix {
  DOWN_RIGHT = "┗",
  VERTICAL = "┃",
  RIGHT_TACK = "┣",
}

/**
 * Tells if a path is a dir or not
 *
 * @export
 * @param {string} dir_path path to check
 * @return {*}  {boolean} true if path is a dir false otherwise
 */
export function isDirectory(dir_path: string): boolean {
  return fs.lstatSync(dir_path).isDirectory();
}

export function createTreefromFolder(
  folder_path: string,
  files: string[]
): string[] {
  const tree: string[] = [createFirstBranch(folder_path)];
  files.forEach((file) => {
    tree.push(Prefix.VERTICAL.concat(file));
  });
  return tree;
}

export function createBranch(
  folder_name: string,
  files: string[],
  depth: number
): string[] {
  const folder_spaces = "   ".repeat(depth).concat("🗃️ " + folder_name);
  const spaces = "   ".repeat(depth + 1);
  const tree: string[] = [folder_spaces];
  files.forEach((file) => {
    tree.push(spaces.concat(Prefix.VERTICAL.concat(file)));
  });
  return tree;
}

export function createFirstBranch(folder_path: string): string {
  return `🗃️ ${path.basename(folder_path)}`;
}

export function createTree(folder_path: string): string[] {
  const tree: string[] = [];
  const files_list = getFilesRecursively(folder_path);
  files_list.forEach((element) => {
    const depth = element[1];
    const file = element[0];
    const folders = file.split("/") || "";
    const folder_name = folders[folders.length - 2] || "";
    const folder_spaces = "   ".repeat(depth).concat("🗃️ " + folder_name);
    const spaces = "   ".repeat(depth + 1);
    const file_name = folders[folders.length - 1] || "";
    if (!tree.find((element) => element == folder_spaces)) {
      tree.push(folder_spaces);
    }
    tree.push(spaces + Prefix.VERTICAL.concat(file_name));
  });
  return tree;
}
