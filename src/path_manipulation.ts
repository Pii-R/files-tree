import path from "path";

export function convertPathToPosix(pathToConvert: string): string {
  return pathToConvert.split(path.sep).join(path.posix.sep);
}
