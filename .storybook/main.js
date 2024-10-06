/** @type { import('@storybook/web-components-webpack5').StorybookConfig } */
const config = {
    stories: [
        "../js/components/**/storybook/**.stories.@(js|mdx)"
    ],
    addons: [
        "@storybook/addon-webpack5-compiler-swc",
        "@storybook/addon-links",
        "@storybook/addon-essentials",
        "@chromatic-com/storybook",
    ],
    framework: {
        name: "@storybook/web-components-webpack5",
        options: {},
    },
};
export default config;
