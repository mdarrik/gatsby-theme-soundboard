module.exports = ({soundPath = "sound-effects", metadataPath = "sound-effect-metadata", basePath="/"}) => ({
  plugins: [
    {
      resolve: 'gatsby-source-filesystem',
      options: {
        path: soundPath,
        name: 'soundEffects'
      }
    },
    {
      resolve: 'gatsby-source-filesystem',
      options: {
        path: metadataPath,
        name: 'soundEffectMetadataFiles'
      }
    },
    {
      resolve: 'gatsby-transformer-yaml',
      options: {
        typeName: 'SoundEffectMetadata'
      }
    },
    "gatsby-plugin-theme-ui"
  ]
});
