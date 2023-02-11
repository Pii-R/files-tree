import * as path from "path";
import * as fs from "fs";

export function convertPathToPosix(pathToConvert: string): string {
  return pathToConvert.split(path.sep).join(path.posix.sep);
}

export function getParentFolder(folder_path: string): string {
  return path.dirname(folder_path);
}

export function getFilesRecursively(
  directory: string,
  depth = -1
): [string, number][] {
  const files: [string, number][] = [];
  const filesInDirectory = fs.readdirSync(directory);

  depth = depth + 1;
  for (const file of filesInDirectory) {
    const absolute = convertPathToPosix(path.join(directory, file));
    if (fs.statSync(absolute).isDirectory()) {
      files.push(...getFilesRecursively(absolute, depth));
    } else {
      files.push([absolute, depth]);
    }
  }
  depth = 0;
  return files;
}
