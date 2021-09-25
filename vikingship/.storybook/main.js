// 在项目的根目录下执行初始化 npx -p @storybook/cli sb init
module.exports = {
  stories: ["../src/**/*.stories.mdx", "../src/**/*.stories.@(js|jsx|ts|tsx)"],
  addons: [
    "@storybook/addon-links",
    "@storybook/addon-essentials",
    "@storybook/preset-create-react-app",
    "@storybook/addon-actions"
  ],
  webpackFinal: async (config) => {
    config.module.rules.push({
      test: /\.(ts|tsx)$/,
      use: [
        {
          loader: require.resolve("babel-loader"),
          options: {
            presets: [require.resolve("babel-preset-react-app")]
          }
        },
        {
          loader: require.resolve("react-docgen-typescript-loader"),
          options: {
            shouldExtractLiteralValuesFromEnum: true, // 枚举联合类型转成字符串形式
            propFilter: (prop, component) => {
              if (prop.parent) {
                return !prop.parent.fileName.includes("node_modules");
              }

              return true;
            },
          },
        },
      ],
    });
    config.resolve.extensions.push(".ts", ".tsx");
    return config;
  }
}
