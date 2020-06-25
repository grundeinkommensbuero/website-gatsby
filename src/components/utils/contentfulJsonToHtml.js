import React, { useState, useRef, useEffect } from 'react';
import { documentToReactComponents } from '@contentful/rich-text-react-renderer';
import { INLINES, BLOCKS } from '@contentful/rich-text-types';
import { CrowdFundingVisualistation } from '../CampaignVisualisations';
import { LinkButton, LinkButtonLocal, Button } from '../Forms/Button';
import { getMailtoUrl, objectMap } from '.';
import s from './contentfulJsonToHtml.module.less';
import cN from 'classnames';
import { Link } from 'gatsby';

const website_url = 'https://expedition-grundeinkommen.de/';

export function contentfulJsonToHtml(json) {
  const documentToREactComponentsOptions = {
    // needed so that line breaks are properly added.
    renderText: text => {
      return text.split('\n').reduce((children, textSegment, index) => {
        return [...children, index > 0 && <br key={index} />, textSegment];
      }, []);
    },
    renderNode: {
      [INLINES.HYPERLINK]: node => {
        const { uri } = node.data;
        const target =
          (uri.startsWith(website_url) || uri.startsWith('/')) &&
          !uri.endsWith('.pdf')
            ? '_self'
            : '_blank';
        const rel =
          uri.startsWith(website_url) || uri.startsWith('/')
            ? ''
            : 'noopener noreferrer';

        return (
          <a href={uri} target={target} rel={rel}>
            {node.content[0].value}
          </a>
        );
      },
      [INLINES.ENTRY_HYPERLINK]: node => {
        return (
          <Link to={`/${node.data.target.fields.slug['en-US']}`}>
            {node.content[0].value}
          </Link>
        );
      },
      [BLOCKS.EMBEDDED_ENTRY]: ({
        data: {
          target: {
            sys: {
              contentType: {
                sys: { id: contentTypeId },
              },
            },
            fields,
          },
        },
      }) => {
        const fieldsMapped = objectMap(fields, field => field['en-US']);
        if (contentTypeId === 'campainVisualisation') {
          return <CrowdFundingVisualistation {...fieldsMapped} />;
        }
        if (contentTypeId === 'callToActionButton') {
          if (fieldsMapped.linkLong) {
            return (
              <p>
                <LinkButton
                  href={fieldsMapped.linkLong}
                  target={fieldsMapped.openInNewTab ? '_blank' : null}
                >
                  {fieldsMapped.text}
                </LinkButton>
              </p>
            );
          } else if (fieldsMapped.internalReference) {
            const referenseFieldsMapped = objectMap(
              fieldsMapped.internalReference.fields,
              field => field['en-US']
            );

            const jumpToAppendix = fieldsMapped.jumpTo
              ? `#${fieldsMapped.jumpTo}`
              : '';

            return (
              <p>
                <LinkButtonLocal
                  to={referenseFieldsMapped.slug + jumpToAppendix}
                  target={fieldsMapped.openInNewTab ? '_blank' : null}
                >
                  {fieldsMapped.text}
                </LinkButtonLocal>
              </p>
            );
          } else if (fieldsMapped.mailto) {
            const href = getMailtoUrl(
              fieldsMapped.mailto === 'BLANK' ? '' : fieldsMapped.mailto,
              fieldsMapped.mailtoSubject,
              fieldsMapped.mailtoBody
            );

            return (
              <p>
                <LinkButton href={href}>{fieldsMapped.text}</LinkButton>
              </p>
            );
          } else if (fieldsMapped.copyToClipboard) {
            return (
              <p>
                <CopyToClipboardButton toCopy={fieldsMapped.copyToClipboard}>
                  {fieldsMapped.text}
                </CopyToClipboardButton>
              </p>
            );
          }
        }
        if (contentTypeId === 'question') {
          return <QuestionAnswer {...fieldsMapped} />;
        }
      },
      [BLOCKS.EMBEDDED_ASSET]: node => {
        // https://github.com/contentful/rich-text/issues/61#issuecomment-475999852
        const { title, description, file } = node.data.target.fields;
        const mimeType = file['en-US'].contentType;
        const mimeGroup = mimeType.split('/')[0];

        switch (mimeGroup) {
          case 'image':
            // return (
            //   <img
            //     title={title ? title['en-US'] : null}
            //     alt={description ? description['en-US'] : null}
            //     src={file['en-US'].url}
            //   />
            // );
            break;
          case 'application':
            return (
              <p>
                <a
                  target="_blank"
                  rel="noreferrer"
                  alt={description ? description['en-US'] : null}
                  href={file['en-US'].url}
                >
                  {title ? title['en-US'] : file['en-US'].details.fileName}
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

  return documentToReactComponents(json, documentToREactComponentsOptions);
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

  if (question && answer.content) {
    return (
      <div className={s.questionAndAnswer}>
        <button
          className={cN(s.question, { [s.open]: isOpen })}
          onClick={() => setIsOpen(!isOpen)}
        >
          {question}
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
}

function usePrevious(value) {
  const ref = useRef();

  useEffect(() => {
    ref.current = value;
  }, [value]);

  return ref.current;
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
