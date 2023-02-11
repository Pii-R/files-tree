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
  max_depth = -1,
  depth = -1
): [string, number][] {
  const files: [string, number][] = [];
  const filesInDirectory = fs.readdirSync(directory);

  depth = depth + 1;
  const is_max_depth_reached = max_depth != -1 && depth >= max_depth + 1;
  if (is_max_depth_reached) {
    return files;
  }
  for (const file of filesInDirectory) {
    const absolute = convertPathToPosix(path.join(directory, file));
    if (fs.statSync(absolute).isDirectory()) {
      files.push(...getFilesRecursively(absolute, max_depth, depth));
    } else {
      files.push([absolute, depth]);
    }
  }

  depth = 0;
  return files;
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
