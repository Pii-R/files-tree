import { expect } from "chai";
import { convertPathToPosix } from "../../src/path_manipulation";

describe("Test of path manipulations", () => {
  it("Convert a Windows path to Posix path", () => {
    const windowsPath = "C:\\repos\\vue-t\\tests\\views\\index\\home.vue";
    expect(convertPathToPosix(windowsPath)).to.be.eql(
      "C:/repos/vue-t/tests/views/index/home.vue"
    );
  });
  it("Convert a Posix path to Posix path", () => {
    const posixPath = "usr/bin/bash.rc";
    expect(convertPathToPosix(posixPath)).to.be.eql("usr/bin/bash.rc");
  });
});
