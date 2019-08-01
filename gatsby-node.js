const fs = require("fs")
//make sure that the sound-effects
// and sound-effect-metadata folders exist

exports.onPreBootstrap = ({ reporter }, options) => {
    const soundEffectPath = options.soundPath || "sound-effects"
    const soundEffectMetadataPath = options.metadataPath || "sound-effect-metadata"
    if(!fs.existsSync(soundEffectPath)){
        reporter.info(`creating the ${soundEffectPath} directory`)
        fs.mkdirSync(soundEffectPath)
    }
    
    if(!fs.existsSync(soundEffectMetadataPath)) {
        reporter.info(`creating the ${soundEffectMetadataPath} directory`)
        fs.mkdirSync(soundEffectMetadataPath)
    }
}

exports.sourceNodes = ({ actions }) => {
    actions.createTypes(`
    type SoundEffectMetadata implements Node @dontInfer {
        id: ID!
        name: String!
        file_name: String!
        source_name: String
        source_url: String
        license: String!
        license_url: String
        description: String!
        coolDown: Int
        slug: String!
    }
  `)
}
// Define resolvers for custom fields
exports.createResolvers = ({ createResolvers }, options) => {
    const basePath = options.basePath || "/"
    // converts strings into URL-Friendly-Slugs
    const slugify = str => {
        const slug = str
            .toLowerCase()
            .replace(/[^a-z0-9]+/g, "-")
            .replace(/(^-|-$)+/g, "")
        return `/${basePath}/${slug}`.replace(/\/\/+/g, "/")
    }
    createResolvers({
        SoundEffectMetadata: {
            slug: {
                resolve: source => slugify(source.name)
            }
        },
    })
}

exports.createPages = async ({ actions, graphql, reporter}, options) => {
    const basePath = options.basePath || "/"
    actions.createPage({
        path: basePath,
        component: require.resolve("./src/templates/sound-board.js"),
    })
    const result = await graphql(`
        query {
            allSoundEffectMetadata {
                nodes {
                    id
                    slug
                }
            }
        }
    `)
    if (result.errors) {
        reporter.panic("error loading sound-effect-metadata", result.errors)
        return
    }
    const soundEffectData = result.data.allSoundEffectMetadata.nodes
    soundEffectData.forEach(effect => {
        const slug = effect.slug
        actions.createPage({
            path: slug,
            component: require.resolve("./src/templates/sound-effect.js"),
            context: {
                soundEffectId: effect.id
            },
        })
    })
}
