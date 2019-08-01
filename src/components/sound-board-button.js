/** @jsx jsx */
import { jsx } from 'theme-ui'



import onButtonClick from '../functions/on-soundboard-button-click';

const SoundboardButton = ({ audio, fileName }) =>  {
    console.log(onButtonClick(''))
    const soundboardClickEvent = () => {
        onButtonClick(fileName, audio)
    }
    return (
  <button className="soundboard-button" sx={{
      mb: 0
  }}
  aria-label="Play Sound With Effect"
  onClick={soundboardClickEvent}>
    <img src={require('../../icons/icon-music.svg')} alt="" />
  </button>
)};

export default SoundboardButton