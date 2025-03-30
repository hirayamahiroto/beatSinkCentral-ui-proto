import type { StorybookConfig } from "@storybook/react-vite";
import path from "path";
const config: StorybookConfig = {
  stories: ["./../src/design-system/**/*.stories.@(js|jsx|mjs|ts|tsx)"],
  addons: [
    "@storybook/addon-essentials",
    "@storybook/addon-links",
    "@storybook/addon-interactions",
  ],
  framework: {
    name: "@storybook/react-vite",
    options: {},
  },
  docs: {
    autodocs: true,
  },
  async viteFinal(config) {
    const { mergeConfig } = await import("vite");
    return mergeConfig(config, {
      resolve: {
        alias: {
          "@ui": path.resolve(__dirname, "../src"),
          "@": path.resolve(__dirname, "../../../src"),
        },
      },
      define: {
        // グローバル変数の定義が必要な場合
      },
    });
  },
};

export default config;
