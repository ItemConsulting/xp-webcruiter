import type { Options } from ".";

import { globSync } from "glob";
// import { print } from 'q-i';
import { DIR_SRC_ASSETS } from "./constants";
import { dict } from "./dict";

export default function buildAssetConfig(): Options {
  const GLOB_EXTENSIONS_ASSETS = "{ts,js}";
  const GLOB_CONFIG = {
    absolute: false,
    posix: true,
  };
  const FILES_ASSETS = globSync(`${DIR_SRC_ASSETS}/**/*.${GLOB_EXTENSIONS_ASSETS}`, {
    ...GLOB_CONFIG,
    ignore: globSync(`**/*.stories.{ts,js}`, GLOB_CONFIG),
  });
  // print(FILES_ASSETS, { maxItems: Infinity });

  const ASSETS_JS_ENTRY = dict(
    FILES_ASSETS.map((k) => [
      k.replace(`${DIR_SRC_ASSETS}/`, "").replace(/\.[^.]*$/, ""), // name
      k,
    ]),
  );

  return {
    bundle: true, // Needed to bundle @enonic/js-utils and dayjs
    dts: false, // d.ts files are use useless at runtime
    entry: ASSETS_JS_ENTRY,
    esbuildPlugins: [],

    // By default tsup bundles all imported modules, but dependencies
    // and peerDependencies in your packages.json are always excluded
    external: [
      // Must be loaded into global scope instead
    ],

    format: [
      // 'cjs', // Legacy browser support
      "esm",
    ],
    minify: process.env.NODE_ENV === "development" ? false : true,

    // TIP: Command to check if there are any bad requires left behind
    // grep -r 'require("' build/resources/main | grep -v 'require("/'|grep -v chunk
    noExternal: [
      "@lottiefiles/lottie-player",
      /^highcharts/,
      "papaparse",
      "@itemconsulting/details-animated",
      "@itemconsulting/popover-gallery",
    ],
    shims: false,
    platform: "browser",
    silent: ["QUIET", "WARN"].includes(process.env.LOG_LEVEL_FROM_GRADLE || ""),
    splitting: false,
    sourcemap: process.env.NODE_ENV === "development" ? false : true,
    tsconfig: `${DIR_SRC_ASSETS}/tsconfig.json`,
  };
}
