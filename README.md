# gatsby-theme-soundboard
This is a simple theme to create a list of audio files and have them perform an action.

The inspiration for this idea came from a twitter conversation with [Jason Lengstorf](https://twitter.com/jlengstorf) about letting guests play sound-effects on stream. 

The idea was also a little inspired by [Jeffrey Fritz's Stream Setup](https://twitter.com/csharpfritz)

So for instance, you could add some auth0 and integrate this with netlify functions or Azure to raise sounds on your local machine when someone else pushes the button. 


## Installation
To use this theme: 
1. Install the theme
```
yarn add gatsby-theme-soundboard
```
(also works with NPM)
1. Add theme to gatsby-config
  -  Set the path to your sound files in the options with ```soundPath```
  - Set the path to your sound metadata YAML files with ```metadataPath```
  - Set the base route for your sound files with ```basePath```

```JS
module.exports = {
    plugins: [
        {
            "gatsby-theme-soundboard",
            options: {
                soundPath: "path-to-your-sounds",
                metadataPath: "path-to-your-YAML-files",
                basePath: "path-you-want-your-sounds-to-appear-on"
            }
        }
    ]
}
```

1. Add your sound effects and metadata to the path you set in your config. 
    __NOTE:__ You must have at least 1 file and corresponding metadata element for your site to build. There's an issue with querying gatsby-source-filesystem inside themes that throws an error for the sound file queries. 

1. Start Development
```
yarn develop
```

## Theme Config Options
| Options | Default | Description
|:---------|:----------|:-----------
|```soundPath``` | sound-effects | The path to your audio files used in your soundboard. This lets gatsby-source filesystem know where your files are. 
|```metadataPath``` | sound-effect-metadata | The path to your YAML files which includes your sound effect metadata. You only need one YAML file for all your sounds in this directory, but can use more if desired. 
|```basePath``` | "/" | The path you want your soundboard to be located. E.g. if you want your soundboard at "siteUrl/sounds" you would set this value to ```"/sounds``` in the config |

##Metadata Structure
```YAML
- name: The Name you want to display
  file_name: the Name of your file with the extension 
  #file_name is used to get the correct sound for your file! Please include it.
  source_name: Where You got the Sound
  source_url: A link back to the source
  license: The kind of license for the sound
  license_url: a link to the license (necessary for CC licenses)
  description: A description of the sound. Also used to describe the sound to Assistive Technology
```

## Routes
The theme currently automagically generates pages for you. The routes created will be: 
```
mysite/basePath - A grid of all of your sounds
```
```
mysite/basePath/sound-name - The file with the specified name in your metadata
```
## Components
|Name | Description | Props
|--- | --- | ---
```layout``` | Wraps the pages. Base version only used for Styling | N/A
```sound-board-button``` | The button that triggers the event on your sound-board. Shadow this if you want to turn off effects or change your button icon. | __audioRef__: A ref to the audio file. This allows the button to play the file. __fileName__: The name of the file. That way you can register which sound was clicked in your button event. 
|```sound-effect-list``` | The grid of all of your sounds that makes up your soundboard. | __soundEffects__: The list of metadata for all of your sounds. __soundFiles__: A list of all of your files. __includeDefaultControls__: A boolean that causes the default audio controls to be used. Useful if you override the sound-board-button to not play sounds. 
Defaults to false since the sound is played by the button instead. 
