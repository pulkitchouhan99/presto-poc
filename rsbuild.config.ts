import { defineConfig } from '@rsbuild/core';
import { pluginReact } from '@rsbuild/plugin-react';
import { pluginStyledComponents } from "@rsbuild/plugin-styled-components";
import { pluginModuleFederation } from '@module-federation/rsbuild-plugin';
import { pluginImageCompress } from '@rsbuild/plugin-image-compress';

import fs from 'fs';
import path from 'path';

export function getThemeFolders() {
  const themesPath = path.join(__dirname, './src/themes');

  return fs.readdirSync(themesPath)
    .filter(file =>
      fs.statSync(path.join(themesPath, file)).isDirectory() &&
      file !== '__tests__' && // Exclude test directories
      !file.startsWith('.') // Exclude hidden folders
    );
}

const assetPrefix = process.env.PRODUCTION_ASSET_URL || process.env.CF_PAGES_URL;

const themeExposes = getThemeFolders().reduce((acc, folder) => ({
  ...acc,
  [`./themes/${folder}`]: `./src/themes/${folder}/index.ts`,
}), {});

export default defineConfig({
  output: {
    assetPrefix,
  },
  html: {
    title: 'Theme Viewer',
  },
  performance: {
    buildCache: true,
  },
  plugins: [
    pluginReact(),
    pluginImageCompress([
      "jpeg",
      { use: "png", minQuality: 0 },
      "ico",
    ]),
    pluginStyledComponents({
      displayName: true,
    }),
    pluginModuleFederation({
      name: 'ecommerce_themes',
      library: { type: 'var', name: 'ecommerce_themes' },
      filename: 'ecommerce_themes.js',
      getPublicPath: assetPrefix ? `function() {return "${assetPrefix}/"}` : undefined,
      exposes: {
        ...themeExposes,
      },
      shared: {
        react: {
          singleton: true,
        },
        'react-dom': {
          singleton: true,
        },
        'styled-components': {
          singleton: true,
        },
      }
    }),
  ],
  server: {
    port: 3001,
  },
  source: {
    define: {
      AVAILABLE_THEMES: JSON.stringify(getThemeFolders()),
    },
  },
});
