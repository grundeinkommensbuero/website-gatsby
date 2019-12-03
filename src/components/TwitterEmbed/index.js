import React, { useCallback } from 'react';

export default () => {
  const placeholder = useCallback(node => {
    if (node !== null) {
      const scriptNode = document
        .createRange()
        .createContextualFragment(twitterEmbed).firstChild;
      node.appendChild(scriptNode);
    }
  }, []);

  return (
    <>
      <a
        class="twitter-timeline"
        data-dnt="true"
        data-theme="light"
        data-tweet-limit="3"
        href="https://twitter.com/expeditionbge?ref_src=twsrc%5Etfw"
      >
        Tweets by expeditionbge
      </a>
      <div ref={placeholder} />
    </>
  );
};

const twitterEmbed = `<script
  async
  src="https://platform.twitter.com/widgets.js"
  charset="utf-8"
></script>
`;
