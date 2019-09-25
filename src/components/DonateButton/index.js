import React from 'react';

export default function DonateButton({ className }) {
  return (
    <div className={className}>
      <h3>Oder, spende mit PayPal:</h3>
      <form
        action="https://www.paypal.com/cgi-bin/webscr"
        method="post"
        target="_top"
      >
        <input type="hidden" name="cmd" value="_s-xclick" />
        <input type="hidden" name="hosted_button_id" value="FR3PCTR3NPBJG" />
        <input
          type="image"
          src="https://www.paypalobjects.com/de_DE/DE/i/btn/btn_donateCC_LG.gif"
          border="0"
          name="submit"
          title="PayPal - The safer, easier way to pay online!"
          alt="Spenden mit dem PayPal-Button"
        />
        <img
          alt=""
          border="0"
          src="https://www.paypal.com/de_DE/i/scr/pixel.gif"
          width="1"
          height="1"
        />
      </form>
    </div>
  );
}
