import fs from "fs";

export function listFilesFromFolder(folder: string): string[] {
  return fs.readdirSync(folder);
}

export function isDirectory(path: string): boolean {
  return fs.lstatSync(path).isDirectory();
}
