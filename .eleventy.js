import pluginWebc from "@11ty/eleventy-plugin-webc";
import markdownItAttrs from "markdown-it-attrs";
import markdownItFencedDivs from "@arothuis/markdown-it-fenced-divs";

// If you have short codes
//const registerShortCodes = require("./src/short-codes/");

export default function(eleventyConfig) {
  eleventyConfig.setServerOptions({
    showAllHosts: true
  });
  
  eleventyConfig.addPassthroughCopy({"./src/assets/img/": "img"});
  eleventyConfig.addPassthroughCopy({"./src/assets/fonts/": "fonts"});
  eleventyConfig.addPassthroughCopy({"./client-side-compiled/**/*": "scripts"});
  eleventyConfig.addPassthroughCopy({"./styles-compiled/**/*": "styles"});
  
  //eleventyConfig.addPassthroughCopy({"./src/copy-to-root/*": "."});

  /* If you have any libs being pulled from node_modules you might do it like below */
  //eleventyConfig.addPassthroughCopy({"./node_modules/swiper/*swiper-bundle.min.js": "scripts/libs"});

  eleventyConfig.setUseGitIgnore(false);
  eleventyConfig.setDataDeepMerge(false);

  eleventyConfig.addPlugin(pluginWebc);
  
  eleventyConfig.amendLibrary("md", (md) => {
    md.use(markdownItAttrs);
    md.use(markdownItFencedDivs);
  });

  // If you have short codes
  //registerShortCodes(eleventyConfig);
    
  return {
    dir: {
      input: "src/pages",
    }
  }
};