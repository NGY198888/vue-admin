const path = require("path");
function resolve(dir) {
  return path.join(__dirname, dir);
}
module.exports = {
    runtimeCompiler: true,
    productionSourceMap: false,
    publicPath: process.env.BASE_URL || '/admin/',
    css: {
      extract: true
    },
    configureWebpack: {
      // No need for splitting
      optimization: {
        splitChunks: {
          chunks: 'all'
        }
      }
    },
    chainWebpack: config => {
        console.log('chainWebpack');
        config.resolve.alias
          .set("@", resolve("src"))
          .set("assets", resolve("src/assets"))
          .set("components", resolve("src/components"))
          .set("base", resolve("baseConfig"))
          .set("views", resolve("src/views"))
          .set("api", resolve("src/api"))
          .set("utils", resolve("src/utils"))
          .set("public", resolve("public"));
    },
}