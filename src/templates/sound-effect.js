import React from 'react';
import { graphql } from 'gatsby';

import SoundEffect from '../components/sound-effect';
import Layout from '../components/layout'
export const query = graphql`
  query($soundEffectId: String) {
    soundEffectMetadata(id: { eq: $soundEffectId }) {
      id
      file_name
      description
      license
      license_url
      name
      source_name
      source_url
      slug
    }
  }
`;
const SoundEffectTemplate = ({ data: {  soundEffectMetadata } }) => (
  <Layout>
  <SoundEffect {...soundEffectMetadata} />
  </Layout>
);
export default SoundEffectTemplate
