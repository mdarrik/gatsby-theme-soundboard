import React from "react"
import {graphql, useStaticQuery} from "gatsby"

import SoundEffectList from '../components/sound-effect-list'
const SoundBoardTemplate = () => { 
const data = useStaticQuery(graphql`
    query {
        allSoundEffectMetadata{
            nodes {
                id
                name
                slug
                file_name
                description
            }
        }
        allFile(filter: {sourceInstanceName: {eq: "soundEffects"}}) {
            nodes {
              publicURL
              relativePath
            }
        }
    }
`)
    const soundEffectData = data.allSoundEffectMetadata.nodes
    const soundEffectFiles = data.allFile.nodes
return (
    <SoundEffectList soundEffects={soundEffectData} soundFiles={soundEffectFiles} buttonAction={(soundEffectName) => console.log(`An action was taken for sound: ${soundEffectName}`)} buttonLabelText="Log the file name to the console" />
)
}
export default SoundBoardTemplate