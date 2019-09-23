import React from 'react';
import s from './style.module.less';
import cN from 'classnames';

class EmailListForm extends React.Component {
  componentDidMount() {
    // just copied from MailerLite
    let r;
    window['MailerLiteObject'] = 'ml';
    function f() {
      var c = {
        a: arguments,
        q: [],
      };
      var r = this.push(c);
      return 'number' != typeof r ? r : f.bind(c.q);
    }
    f.q = f.q || [];
    window['ml'] = window['ml'] || f.bind(f.q);
    window['ml'].q = window['ml'].q || f.q;
    r = document.createElement('script');
    var _ = document.getElementsByTagName('script')[0];
    r.async = 1;
    r.src =
      'https://static.mailerlite.com/js/universal.js?v' +
      ~~(new Date().getTime() / 1000000);
    _.parentNode.insertBefore(r, _);

    window['ml_account'] = window.ml(
      'accounts',
      '1629538',
      'k8n3g9j9x8',
      'load'
    );
  }
  render() {
    const { className } = this.props;
    return (
      <div
        className={cN('ml-form-embed ' + s.container, className)}
        data-account="1629538:k8n3g9j9x8"
        data-form="1447292:a4q8c2"
        id="#mailerlite"
      ></div>
    );
  }
}

export default EmailListForm;
