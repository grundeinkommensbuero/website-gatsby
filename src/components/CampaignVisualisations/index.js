import React, { useState, useRef, useEffect } from 'react';
import s from './style.module.less';
import { SectionInner } from '../Layout/Sections';
import cN from 'classnames';
import { formatDateMonthYear, contentfulJsonToHtml } from '../utils';
import { LinkButtonLocal } from '../Forms/Button';
import { useSignatureCount } from '../../hooks/Api/Signatures/Get';
import { Link } from 'gatsby';
import eyeCatcherBackground from '!svg-inline-loader!./eye_catcher.svg';
import { Tooltip } from '../Tooltip';

export default ({ visualisations }) => {
  const currentCounts = useSignatureCount();

  return (
    <>
      {visualisations.map((visualisation, index) => (
        <Visualisation
          key={index}
          index={index}
          currentCount={
            currentCounts &&
            currentCounts[visualisation.campainCode] &&
            currentCounts[visualisation.campainCode].computed
          }
          {...visualisation}
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
  index,
  hint,
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

  const hintWithVariables = replaceVariablesHintText({
    hint: hint && hint.hint,
    goal,
    goalInbetween,
    count,
  });

  const percentage =
    count && isInView
      ? Math.max(Math.min((count / goalInbetween || goal) * 100, 100), 3)
      : 0;
  const countOutside = percentage < 40;

  const barGoalWidth = Math.min(100, ((goalInbetween || goal) / count) * 100);

  return (
    <SectionInner
      wide={true}
      className={cN({ [s.sectionInnerHasCta]: !!EyeCatcherContent })}
    >
      {title && <h2 className={s.title}>{title}</h2>}
      {hintWithVariables && <div className={s.hint}>{hintWithVariables}</div>}

      <div
        className={cN(s.body, { [s.showCTA]: showCTA })}
        style={{ zIndex: index }}
      >
        <div className={s.bar} ref={barEl}>
          <WrapInLink link={showCTA && ctaLink}>
            <span
              className={cN(s.barGoal, { [s.hasNotStarted]: !hasStarted })}
              aria-hidden="true"
              style={{ width: `${barGoalWidth || 100}%` }}
            >
              <div className={s.barGoalBar}>
                {hasStarted && (
                  <div
                    className={s.barGoalUnbuffered}
                    style={{ width: `${goalInbetweenPercentage || 100}%` }}
                  ></div>
                )}

                {/* {goalUnbufferedPercentage && (
                  <Tooltip
                    className={s.goalUnBuffered}
                    style={{ left: `${goalUnbufferedPercentage}%` }}
                    content={
                      <>
                        Benötigt: <br />
                        {goalUnbuffered.toLocaleString('de')} Unterschriften
                      </>
                    }
                  ></Tooltip>
                )} */}
              </div>
              {goal && !goalInbetween && (
                <Tooltip
                  className={s.goal}
                  content={<>Benötigte Unterschriften</>}
                >
                  {goal.toLocaleString('de')}
                </Tooltip>
              )}

              {goalInbetween && (
                <Tooltip
                  className={s.goal}
                  content={
                    <>
                      Insgesamt benötigt:
                      <br />
                      {goal.toLocaleString('de')} Unterschriften
                    </>
                  }
                >
                  Nächstes Ziel: {goalInbetween.toLocaleString('de')}
                </Tooltip>
              )}

              {/* {goalInbetween && (
                <div
                  className={s.barGoalBarInbetween}
                  style={{ width: `${goalInbetweenPercentage || 100}%` }}
                >
                  <Tooltip
                    content={
                      <>
                        Nächstes Ziel: <br />
                        {goalInbetween.toLocaleString('de')} Unterschriften
                      </>
                    }
                    className={cN(s.barGoalBarInbetweenLabel, {
                      [s.barGoalBarInbetweenLabelOutside]:
                        goalInbetweenPercentage < 10,
                    })}
                    style={{ display: 'inline' }}
                  >
                    {goalInbetween
                      ? goalInbetween.toLocaleString('de')
                      : goal.toLocaleString('de')}
                  </Tooltip>
                </div>
              )} */}
            </span>
            {hasStarted && (
              <>
                <span
                  className={cN(s.barCurrent, { [s.outside]: countOutside })}
                  style={{ width: `${percentage}%` }}
                  aria-label={`${count} von ${goal} Unterschriften`}
                >
                  <Tooltip
                    content="Gesammelte Unterschriften"
                    className={s.barCurrentLabel}
                    placement="bottom"
                  >
                    {count && count.toLocaleString('de')}
                  </Tooltip>
                </span>
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

function replaceVariablesHintText({ hint, goal, count, goalInbetween }) {
  if (!hint) return undefined;

  return hint
    .replace(
      /\$GOAL_INBETWEEN/gi,
      goalInbetween && goalInbetween.toLocaleString('de')
    )
    .replace(/\$GOAL/gi, goal && goal.toLocaleString('de'))
    .replace(/\$COLLECTED/gi, count && count.toLocaleString('de'));
}

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
