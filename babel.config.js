module.exports = {
  presets: [
    '@vue/cli-plugin-babel/preset'
  ],
  "plugins": [
    [
      "component",
      {
        "libraryName": "umy-ui",
        "styleLibraryName": "theme-chalk"
      }
    ]
  ]
}
