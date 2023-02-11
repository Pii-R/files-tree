import { getFilesRecursively } from "./path_manipulation";
import { dirname } from "path";
export class FilePrefixes {
  middle: string;
  constructor(middle: string) {
    this.middle = middle;
  }
}
export class FullFilePrefixes extends FilePrefixes {
  start: string;
  end: string;
  constructor(start: string, middle: string, end: string) {
    super(middle);
    this.start = start;
    this.end = end;
  }
}
interface TreeConfiguration {
  folder_prefix: string;
  file_prefix: FilePrefixes;
  recurrence: number;
  separator: string;
  max_depth: number;
}

interface Tree {
  configuration: TreeConfiguration;
  createTree(folder_path: string): string[];
}

export class ClassicTreeConfiguration {
  folder_prefix: string;
  file_prefix: FilePrefixes;
  recurrence: number;
  separator: string;
  max_depth: number;

  constructor(
    folder_prefix: string,
    file_prefix: FilePrefixes,
    recurrence: number,
    separator: string,
    max_depth: number
  ) {
    this.folder_prefix = folder_prefix;
    this.file_prefix = file_prefix;
    this.recurrence = recurrence;
    this.separator = separator;
    this.max_depth = max_depth;
  }
}

export class ClassicTree implements Tree {
  configuration: ClassicTreeConfiguration;

  constructor(configuration: ClassicTreeConfiguration) {
    this.configuration = configuration;
  }
  createTree(folder_path: string): string[] {
    const file_prefix = this.configuration.file_prefix.middle;
    const tree: string[] = [];
    const files_list = getFilesRecursively(
      folder_path,
      this.configuration.max_depth
    );
    files_list.sort(function (a, b) {
      return a[1] - b[1];
    });
    files_list.forEach((element) => {
      const depth = element[1];
      const file = element[0];
      const folders =
        file.replace(dirname(folder_path) + "/", "").split("/") || "";
      for (let i = 0; i <= folders.length - 2; i++) {
        const folder_name = folders[i] || "";
        const folder_spaces = this.configuration.separator
          .repeat(this.configuration.recurrence)
          .repeat(i)
          .concat(this.configuration.folder_prefix + folder_name);

        if (!tree.find((element) => element == folder_spaces)) {
          tree.push(folder_spaces);
        }
      }
      const recurrence = this.configuration.separator
        .repeat(this.configuration.recurrence)
        .repeat(depth + 1);
      const file_name = folders[folders.length - 1] || "";

      tree.push(recurrence + file_prefix + file_name);
    });
    return tree;
  }
}
