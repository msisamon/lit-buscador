export default {
    files: 'js/**/*.test.js',
    nodeResolve: true,
    coverage: true,
    coverageConfig: {
        exclude: ['**/node_modules/**', '**/test/**'],
    },
};
