import React from 'react';
import { useStaticQuery, graphql } from 'gatsby';
import {Styled} from 'theme-ui'
const SoundEffect = props => {
  const { allFile : {nodes: files} } = useStaticQuery(graphql`
    query {
      allFile(filter: { sourceInstanceName: { eq: "soundEffects" } }) {
        nodes {
          publicURL
          relativePath
        }
      }
    }
  `)
  const soundFile = files.find(
    file => file.relativePath === props.file_name
  );
  return (
    <>
      <Styled.h1>{props.name}</Styled.h1>
      <figure>
        <audio controls>
          <source src={soundFile.publicURL} />
        </audio>
        <figcaption>
          <Styled.p>{props.file_name}</Styled.p>
          <Styled.p>{props.description}</Styled.p>
          <Styled.p>
            <Styled.a href={props.source_url}>From {props.source_name}</Styled.a>
          </Styled.p>
          <Styled.p>
            <strong>license:</strong>{' '}
            <Styled.a href={props.license_url}>{props.license}</Styled.a>
          </Styled.p>
        </figcaption>
      </figure>
    </>
  );
};
export default SoundEffect;
