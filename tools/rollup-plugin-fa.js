/**
 * I don't know why I didn't get the UMD to work, and this is probably not the best solution, but it works.
 * @type {import("rollup").Plugin}
 */
export default {
  name: "inlineFile",

  transform(code, id) {
    if (id.includes('@fortawesome')) {
      return {
        code: `export var svgPathData = '${code.match(/svgPathData = '([^']+)';/)[1]}';\n` +
          `export var width = ${code.match(/width = (\d+);/)[1]};` +
          `export var height = ${code.match(/height = (\d+);/)[1]};`,
        map: { mappings: '' },
      };
    }
  }
};
