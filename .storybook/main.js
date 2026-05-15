/** @type { import('@storybook/html-vite').StorybookConfig } */
const config = {
    stories: ['../src/**/*.stories.@(js|jsx|mjs)'],
    addons: [],
    framework: {
        name: '@storybook/html-vite',
        options: {},
    },
};
export default config;
