import React, { useState, useRef, useEffect } from 'react';
import { renderRichText } from 'gatsby-source-contentful/rich-text';
import { INLINES, BLOCKS } from '@contentful/rich-text-types';
import { CrowdFundingVisualistation } from '../CampaignVisualisations';
import { LinkButton, LinkButtonLocal, Button } from '../Forms/Button';
import { getMailtoUrl } from '.';
import { validateEmail } from './index';
import * as s from './contentfulJsonToHtml.module.less';
import cN from 'classnames';
import { Link } from 'gatsby';
import { usePrevious } from '../../hooks/utils';

const website_url = 'https://expedition-grundeinkommen.de/';

export function contentfulJsonToHtml(richText) {
  const documentToREactComponentsOptions = {
    // needed so that line breaks are properly added.
    renderText: text => {
      return text.split('\n').reduce((children, textSegment, index) => {
        return [...children, index > 0 && <br key={index} />, textSegment];
      }, []);
    },
    renderNode: {
      [INLINES.HYPERLINK]: node => {
        let { uri } = node.data;
        const target =
          (uri.startsWith(website_url) ||
            uri.startsWith('/') ||
            uri.startsWith('#')) &&
          !uri.endsWith('.pdf')
            ? '_self'
            : '_blank';
        const rel =
          uri.startsWith(website_url) || uri.startsWith('/')
            ? ''
            : 'noopener noreferrer';
        uri = validateEmail(uri) ? 'mailto:' + uri : uri;
        return (
          <a href={uri} target={target} rel={rel}>
            {node.content[0].value}
          </a>
        );
      },
      [INLINES.ENTRY_HYPERLINK]: node => {
        const isPage = node.data.target.slug;
        const uri = isPage
          ? `/${node.data.target.slug}`
          : `#${node.data.target.titleShort}`;
        if (isPage) {
          return <Link to={uri}>{node.content[0].value}</Link>;
        } else {
          return (
            <a href={uri} target="_self">
              {node.content[0].value}
            </a>
          );
        }
      },
      [BLOCKS.EMBEDDED_ENTRY]: ({ data }) => {
        // For some reason the content type id is not passed for questions (no idea why...)
        // and also not for some buttons
        let contentTypeId;
        if (data.target.__typename === 'ContentfulQuestion') {
          contentTypeId = 'question';
        } else if (data.target.__typename === 'ContentfulCallToActionButton') {
          contentTypeId = 'callToActionButton';
        } else {
          contentTypeId = data.target.sys.contentType.sys.id;
        }

        if (contentTypeId === 'campainVisualisation') {
          return <CrowdFundingVisualistation {...data.target} />;
        }
        if (contentTypeId === 'callToActionButton') {
          console.log(data);
          if (data.target.linkLong) {
            return (
              <p>
                <LinkButton
                  href={data.target.linkLong.linkLong}
                  target={data.target.openInNewTab ? '_blank' : null}
                >
                  {data.target.text}
                </LinkButton>
              </p>
            );
          } else if (data.target.internalReference) {
            const jumpToAppendix = data.target.jumpTo
              ? `#${data.target.jumpTo}`
              : '';

            return (
              <p>
                <LinkButtonLocal
                  to={data.target.internalReference.slug + jumpToAppendix}
                  target={data.target.openInNewTab ? '_blank' : null}
                >
                  {data.target.text}
                </LinkButtonLocal>
              </p>
            );
          } else if (data.target.mailto) {
            const href = getMailtoUrl(
              data.target.mailto === 'BLANK' ? '' : data.target.mailto,
              data.target.mailtoSubject,
              data.target.mailtoBody
            );

            return (
              <p>
                <LinkButton href={href}>{data.target.text}</LinkButton>
              </p>
            );
          } else if (data.target.copyToClipboard) {
            return (
              <p>
                <CopyToClipboardButton toCopy={data.target.copyToClipboard}>
                  {data.target.text}
                </CopyToClipboardButton>
              </p>
            );
          }
        }
        if (contentTypeId === 'question') {
          return <QuestionAnswer {...data.target} />;
        }
      },
      [BLOCKS.EMBEDDED_ASSET]: node => {
        // https://github.com/contentful/rich-text/issues/61#issuecomment-475999852
        const { title, description, file } = node.data.target;
        const mimeType = file.contentType;
        const mimeGroup = mimeType.split('/')[0];

        switch (mimeGroup) {
          case 'image':
            // return (
            //   <img
            //     title={title ? title : null}
            //     alt={description ? description : null}
            //     src={file.url}
            //   />
            // );
            break;
          case 'application':
            return (
              <p>
                <a
                  target="_blank"
                  rel="noreferrer"
                  alt={description ? description : null}
                  href={file.url}
                >
                  {title ? title : file.details.fileName}
                </a>
              </p>
            );
          default:
            return (
              <span style={{ backgroundColor: 'red', color: 'white' }}>
                {' '}
                {mimeType} embedded asset{' '}
              </span>
            );
        }
      },
    },
  };

  return renderRichText(richText, documentToREactComponentsOptions);
}

function QuestionAnswer({ question, answer, openInitially = false }) {
  const [isOpen, setIsOpen] = useState(openInitially);
  const [isAnimating, setIsAnimating] = useState(false);
  const [containerHeight, setContainerHeight] = useState();
  const answerEl = useRef(null);
  const prevIsOpen = usePrevious(isOpen);

  useEffect(() => {
    if (isOpen && prevIsOpen !== undefined) {
      setIsAnimating(true);
      setContainerHeight(0);
      setTimeout(() => {
        setContainerHeight(answerEl.current.offsetHeight + 'px');

        setTimeout(() => {
          setContainerHeight(undefined);
          setIsAnimating(false);
        }, 500);
      });
    }
    if (!isOpen && prevIsOpen !== undefined) {
      setIsAnimating(true);
      setTimeout(() => {
        setContainerHeight(answerEl.current.offsetHeight + 'px');
        setTimeout(() => {
          setContainerHeight(0);
          setTimeout(() => {
            setContainerHeight(undefined);
            setIsAnimating(false);
          }, 300);
        }, 10);
      }, 10);
    }
  }, [isOpen]);

  if (question && answer) {
    return (
      <div className={s.questionAndAnswer}>
        <button
          className={cN(s.question, { [s.open]: isOpen })}
          onClick={() => setIsOpen(!isOpen)}
        >
          {question.question}
        </button>
        <div
          className={cN(s.answerContainer, {
            [s.open]: isOpen && !isAnimating,
            [s.closed]: !isOpen && !isAnimating,
            [s.animating]: isAnimating,
          })}
          style={{ height: containerHeight }}
        >
          <div className={s.answer} ref={answerEl}>
            {contentfulJsonToHtml(answer)}
          </div>
        </div>
      </div>
    );
  }

  return null;
}

function CopyToClipboardButton({ children, toCopy }) {
  const [hasCopied, setHasCopied] = useState(false);

  const copy = () => {
    setHasCopied(true);
    navigator.clipboard.writeText(toCopy);

    setTimeout(() => {
      setHasCopied(false);
    }, 2000);
  };

  return (
    <Button onClick={copy}>
      {hasCopied ? 'Ist in der Zwischenablage!' : children}
    </Button>
  );
}
