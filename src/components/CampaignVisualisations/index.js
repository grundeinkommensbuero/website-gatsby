import React, { useState, useRef, useEffect } from 'react';
import s from './style.module.less';
import { SectionInner } from '../Layout/Sections';
import cN from 'classnames';
import { formatDateMonthYear, contentfulJsonToHtml } from '../utils';
import { LinkButtonLocal } from '../Forms/Button';
import { useSignatureCount } from '../../hooks/Api/Signatures/Get';
import { Link } from 'gatsby';
import eyeCatcherBackground from '!svg-inline-loader!./eye_catcher.svg';
import { Popup, Tooltip } from '../Tooltip';

export default ({ visualisations }) => {
  const currentCounts = useSignatureCount();

  return (
    <>
      {visualisations.map((visualisation, index) => (
        <Visualisation
          key={index}
          {...visualisation}
          currentCount={
            currentCounts &&
            currentCounts[visualisation.campainCode] &&
            currentCounts[visualisation.campainCode].computed
          }
          showCTA={visualisations.length !== 1 && visualisation.ctaLink}
        />
      ))}
    </>
  );
};

const Visualisation = ({
  //typo: also in contentful 'campainCode', so no big day
  campainCode,
  goal,
  startDate,
  title,
  currentCount,
  minimum,
  addToSignatureCount,
  showCTA,
  ctaLink,
  eyeCatcher,
  goalInbetween,
  goalUnbuffered,
}) => {
  const barEl = useRef(null);
  const [isInView, setIsInView] = useState(false);
  const EyeCatcherContent = eyeCatcher && contentfulJsonToHtml(eyeCatcher.json);
  const goalInbetweenPercentage = goalInbetween && (goalInbetween / goal) * 100;
  const goalUnbufferedPercentage =
    goalUnbuffered && (goalUnbuffered / goal) * 100;

  useEffect(() => {
    if ('IntersectionObserver' in window) {
      const observer = new IntersectionObserver(
        entries => {
          entries.forEach(entry => {
            if (entry.isIntersecting) {
              setIsInView(true);
            }
          });
        },
        {
          threshold: 1.0,
        }
      );

      observer.observe(barEl.current);
    } else {
      setIsInView(true);
    }
  }, []);

  const dateString = formatDateMonthYear(new Date(startDate));
  const hasStarted = new Date().getTime() > new Date(startDate);

  let count = currentCount || 0;

  if (addToSignatureCount) {
    count += addToSignatureCount;
  }

  if (minimum) {
    count = Math.max(count, minimum);
  }

  const percentage =
    count && isInView ? Math.max(Math.min((count / goal) * 100, 100), 3) : 0;
  const countOutside = percentage < 40;

  return (
    <SectionInner
      wide={true}
      className={cN({ [s.sectionInnerHasCta]: !!EyeCatcherContent })}
    >
      {title && <h2 className={s.title}>{title}</h2>}

      <div className={cN(s.body, { [s.showCTA]: showCTA })}>
        <div className={s.bar} ref={barEl}>
          <WrapInLink link={showCTA && ctaLink}>
            <span
              className={cN(s.barGoal, { [s.hasNotStarted]: !hasStarted })}
              aria-hidden="true"
            >
              <div className={s.barGoalBar}>
                {hasStarted && (
                  <div
                    className={s.barGoalUnbuffered}
                    style={{ width: `${goalUnbufferedPercentage || 100}%` }}
                  ></div>
                )}
              </div>

              <div
                className={s.barGoalLabel}
                style={{ width: `${goalUnbufferedPercentage || 100}%` }}
              >
                <Tooltip
                  content="Ziel ohne Puffer"
                  style={{ display: 'inline' }}
                >
                  {goalUnbuffered
                    ? goalUnbuffered.toLocaleString('de')
                    : goal.toLocaleString('de')}
                </Tooltip>
              </div>
            </span>
            {hasStarted && (
              <>
                <span
                  className={cN(s.barCurrent, { [s.outside]: countOutside })}
                  style={{ width: `${percentage}%` }}
                  aria-label={`${count} von ${goal} Unterschriften`}
                >
                  <span>{count && count.toLocaleString('de')}</span>
                </span>
                {goalInbetweenPercentage && (
                  <Tooltip
                    className={s.goalInbetween}
                    style={{ left: `${goalInbetweenPercentage}%` }}
                    content={
                      <>
                        Zwischenziel: <br />
                        {goalInbetween.toLocaleString('de')} Unterschriften
                      </>
                    }
                  ></Tooltip>
                )}
              </>
            )}
            {!hasStarted && (
              <span
                aria-label={`Noch nicht gestartet. Ziel: ${goal}. Startet ${dateString}.`}
                className={s.starts}
              >
                {dateString}
              </span>
            )}
          </WrapInLink>
        </div>
        {showCTA && (
          <LinkButtonLocal size="MEDIUM" className={s.cta} to={ctaLink}>
            Mitmachen
          </LinkButtonLocal>
        )}
        {EyeCatcherContent && (
          <div
            className={cN(s.eyeCatcher, {
              [s.eyeCatcherWithCta]: showCTA && ctaLink,
            })}
          >
            <WrapInLink link={showCTA && ctaLink} className={s.eyeCatcherLink}>
              <div
                className={s.eyeCatcherBackground}
                dangerouslySetInnerHTML={{ __html: eyeCatcherBackground }}
                aria-hidden="true"
              />
              <div className={s.eyeCatcherContent}>{EyeCatcherContent}</div>
            </WrapInLink>
          </div>
        )}
      </div>
    </SectionInner>
  );
};

const WrapInLink = ({ link, children, className }) => {
  if (link) {
    return (
      <Link to={link} className={className}>
        {children}
      </Link>
    );
  }
  return <>{children}</>;
};
