export default {
    presets: [
      ['@babel/preset-env', {targets: {node: 'current'}}],
        '@babel/preset-typescript',
    ],
    plugins: [["@babel/plugin-syntax-decorators", { version: "2023-05", decoratorsBeforeExport: true }],
    ["@babel/plugin-proposal-decorators", { "version": "legacy" }],
        ["@babel/plugin-proposal-class-properties", { loose: true }]
    ]
  };