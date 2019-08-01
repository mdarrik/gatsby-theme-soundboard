/** @jsx jsx */
import { jsx } from 'theme-ui'
import React from 'react';
import { Link } from 'gatsby'
import {Styled} from 'theme-ui'

import SoundBoardButton from '../components/sound-board-button'

const SoundEffectList = ({
  soundEffects,
  soundFiles,
  includeDefaultControls = false
}) => {
    const audioRef = React.createRef()
  return (
    <Styled.ul className="soundboard-list">
      {soundEffects.map(soundEffect => {
        //require the requisite sound file.
        //since can't seem to figure out linking,
        //just find the matching soundFile
        const soundFile = soundFiles.find(file => {
          return file.relativePath === soundEffect.file_name;
        });
        return (
          <Styled.li key={soundEffect.id} className="soundboard-list-item" sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center"
          }}>
            <SoundBoardButton
              audio={audioRef}
              fileName={soundEffect.file_name}>
              
            </SoundBoardButton>
            <figure className="soundboard-figure" sx={{
              display: "inline",
              m:0,
              px: "auto"
            }}>
              <figcaption className="soundboard-figcaption"><Link to={soundEffect.slug}>{soundEffect.name}</Link></figcaption>
              <audio
                controls={includeDefaultControls ? 'controls' : ''}
                aria-describedby={`label-${soundEffect.id}`}
                ref={audioRef}
                className="soundboard-audio">
                <source src={soundFile.publicURL} />
              </audio>
              <span id={`label-${soundEffect.id}`} class="soundboard-description">
                {soundEffect.description}
              </span>
            </figure>
          </Styled.li>
        );
      })}
    </Styled.ul>
  );
};

export default SoundEffectList;
