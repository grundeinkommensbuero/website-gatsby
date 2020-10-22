import React, { useState, useRef, useEffect } from 'react';
import s from './style.module.less';
import { SectionInner } from '../Layout/Sections';
import cN from 'classnames';
import { formatDateMonthYear } from '../utils';
import { LinkButtonLocal, LinkButton } from '../Forms/Button';
import { useSignatureCount } from '../../hooks/Api/Signatures/Get';
import { Link } from 'gatsby';
import eyeCatcherBackground from '!svg-inline-loader!./eye_catcher.svg';
import { Tooltip } from '../Tooltip';
import VisualCounter from '../VisualCounter';
import { useGetCrowdfundingDirectly } from '../../hooks/Api/Crowdfunding';
import { contentfulJsonToHtml } from '../utils/contentfulJsonToHtml';

export default ({ visualisations }) => {
  const currentCounts = useSignatureCount();

  return (
    <>
      {visualisations.map((visualisation, index) => {
        if (visualisation.campainCode) {
          return (
            <CampainVisualisation
              key={index}
              index={index}
              currentCount={
                currentCounts &&
                currentCounts[visualisation.campainCode] &&
                currentCounts[visualisation.campainCode].computed
              }
              receivedCount={
                currentCounts &&
                currentCounts[visualisation.campainCode] &&
                currentCounts[visualisation.campainCode].withMixed
              }
              showCTA={visualisations.length !== 1 && visualisation.ctaLink}
              labels={{
                NEEDED: () => <>Benötigte Unterschriften</>,
                GOAL_INBETWEEN_TOOLTIP: count => (
                  <>
                    Insgesamt benötigt:
                    <br />
                    {count} Unterschriften
                  </>
                ),
                GOAL_INBETWEEN: count => (
                  <>Nächstes Ziel: {count} Unterschriften</>
                ),
                CURRENT_COUNT: () => <>Gesammelte Unterschriften</>,
                CTA: () => <>Mitmachen</>,
              }}
              currency="Unterschriften"
              {...visualisation}
            />
          );
        }
        if (visualisation.startnextId) {
          return <CrowdFundingVisualistation key={index} {...visualisation} />;
        }
        return null;
      })}
    </>
  );
};

export const CrowdFundingVisualistation = ({ startnextId, ...props }) => {
  // Check props includes a project key
  const hasProjectProp = props.hasOwnProperty('project');

  // If props does not include project key, query startnext
  const [crowdFunding] = !hasProjectProp
    ? useGetCrowdfundingDirectly(startnextId)
    : [];

  // If data is loading
  if (
    // Has project property but no value
    (hasProjectProp && props.project == null) ||
    // Startnext query in progress in this component
    (!hasProjectProp && !crowdFunding)
  ) {
    return <SectionInner>lade...</SectionInner>;
  }

  // Use the correct project object
  const crowdfundingProject = hasProjectProp
    ? props.project
    : crowdFunding.project;

  return (
    <Visualisation
      goal={crowdfundingProject.funding_target}
      count={Math.round(crowdfundingProject.funding_status || 0)}
      startDate={crowdfundingProject.start_date}
      currency="€"
      currencyShort="€"
      showCTA={props.ctaLink}
      labels={{
        NEEDED: () => <>Benötigte Summe</>,
        GOAL_INBETWEEN_TOOLTIP: count => (
          <>
            Insgesamt benötigt:
            <br />
            {count} €
          </>
        ),
        GOAL_INBETWEEN: count => <>Nächstes Ziel: {count} €</>,
        CURRENT_COUNT: () => <>Bereits gespendet</>,
        CTA: () => <>Spenden!</>,
      }}
      {...props}
    />
  );
};

export const CampainVisualisation = ({
  minimum,
  maximum,
  addToSignatureCount,
  currentCount,
  ...props
}) => {
  let count = currentCount || 0;

  if (currentCount) {
    if (addToSignatureCount) {
      count += addToSignatureCount;
    }

    if (minimum) {
      count = Math.max(count, minimum);
    }

    if (maximum) {
      count = Math.min(count, maximum);
    }
  }

  return <Visualisation count={count} {...props} />;
};

export const Visualisation = ({
  goal,
  startDate,
  title,
  receivedCount,
  showCTA,
  ctaLink,
  eyeCatcher,
  eyeCatcherLink,
  goalUnbuffered,
  index,
  hint,
  goalInbetweenMultiple,
  count,
  currency,
  currencyShort,
  labels,
}) => {
  const barEl = useRef(null);
  const [isInView, setIsInView] = useState(false);
  let goalInbetween;

  if (goalInbetweenMultiple) {
    const goalInbetweenMultipleSorted = goalInbetweenMultiple
      .map(goal => parseInt(goal))
      .sort((next, prev) => next - prev)
      .reverse();

    goalInbetween = goalInbetweenMultipleSorted.find((goal, index) => {
      if (!goalInbetweenMultipleSorted[index + 1]) {
        return goalInbetweenMultipleSorted[0] > count;
      }
      return count < goal && count > goalInbetweenMultipleSorted[index + 1];
    });
  }
  const EyeCatcherContent = eyeCatcher && contentfulJsonToHtml(eyeCatcher.json);

  const goalInbetweenPercentage = goalInbetween && (goalInbetween / goal) * 100;

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

  const hintWithVariables = replaceVariablesHintText({
    hint: hint && hint.hint,
    goal,
    goalInbetween,
    count,
    receivedCount,
    goalUnbuffered,
  });

  const percentage =
    count && isInView
      ? Math.max(Math.min((count / (goalInbetween || goal)) * 100, 100), 3)
      : 0;
  const countOutside = percentage < 50;
  const goalHasBeenReached = percentage >= 100;

  const barGoalWidth = Math.min(100, ((goalInbetween || goal) / count) * 100);

  const eyeCatcherLinkToDisplay = eyeCatcherLink ? eyeCatcherLink : (showCTA && ctaLink);

  return (
    <SectionInner
      wide={true}
      className={cN({ [s.sectionInnerHasEyeCatcher]: !!EyeCatcherContent })}
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
                    className={s.barGoalInbetween}
                    style={{ width: `${goalInbetweenPercentage || 100}%` }}
                  ></div>
                )}
              </div>
              {goal && !goalInbetween && (
                <Tooltip className={s.goal} content={labels.NEEDED()}>
                  {goal.toLocaleString('de')}
                  {currencyShort}
                </Tooltip>
              )}
              {goalInbetween && (
                <Tooltip
                  className={s.goal}
                  content={labels.GOAL_INBETWEEN_TOOLTIP(
                    goal.toLocaleString('de')
                  )}
                >
                  {labels.GOAL_INBETWEEN(goalInbetween.toLocaleString('de'))}
                </Tooltip>
              )}
            </span>
            {hasStarted && (
              <>
                <span
                  className={cN(
                    s.barCurrent,
                    { [s.outside]: countOutside },
                    { [s.completed]: goalHasBeenReached }
                  )}
                  style={{ width: `${percentage}%` }}
                  aria-label={`${count} von ${goal} ${currency}`}
                >
                  <Tooltip
                    content={labels.CURRENT_COUNT()}
                    className={s.barCurrentLabel}
                    placement="bottom"
                  >
                    {count && <VisualCounter end={isInView ? count : 0} />}
                    {currencyShort}
                  </Tooltip>
                </span>
              </>
            )}
            {!hasStarted && (
              <span
                aria-label={`Noch nicht gestartet. Ziel: ${goal}${currency}. Startet ${dateString}.`}
                className={s.starts}
              >
                {dateString}
              </span>
            )}
          </WrapInLink>
        </div>
        {showCTA && ctaLink && !ctaLink.startsWith('http') && (
          <LinkButtonLocal size="MEDIUM" className={s.cta} to={ctaLink}>
            {labels.CTA()}
          </LinkButtonLocal>
        )}
        {showCTA && ctaLink && ctaLink.startsWith('http') && (
          <LinkButton
            size="MEDIUM"
            className={s.cta}
            href={ctaLink}
            target="_blank"
          >
            {labels.CTA()}
          </LinkButton>
        )}
        {EyeCatcherContent && (
          <div
            className={cN(s.eyeCatcher, {
              [s.eyeCatcherWithCta]: showCTA && ctaLink,
            })}
          >
            <WrapInLink link={eyeCatcherLinkToDisplay} className={s.eyeCatcherLink}>
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

function replaceVariablesHintText({
  hint,
  goal,
  count,
  receivedCount,
  goalInbetween,
  goalUnbuffered,
}) {
  if (!hint) return undefined;
  const buffer = goal - goalUnbuffered;
  const expectedToArrive = count - receivedCount;

  return hint
    .replace(
      /\$GOAL_INBETWEEN/gi,
      goalInbetween && goalInbetween.toLocaleString('de')
    )
    .replace(
      /\$GOAL_UNBUFFERED/gi,
      goalUnbuffered && goalUnbuffered.toLocaleString('de')
    )
    .replace(/\$GOAL/gi, goal && goal.toLocaleString('de'))
    .replace(/\$BUFFER/gi, buffer && buffer.toLocaleString('de'))
    .replace(/\$COLLECTED/gi, count && count.toLocaleString('de'))
    .replace(
      /\$RECEIVED/gi,
      receivedCount ? receivedCount.toLocaleString('de') : ''
    )
    .replace(
      /\$EXPECTED/gi,
      expectedToArrive ? expectedToArrive.toLocaleString('de') : ''
    );
}

const WrapInLink = ({ link, children, className }) => {
  if (link) {
    if (link.startsWith('http')) {
      return (
        <a
          href={link}
          target="_blank"
          without
          rel="noreferrer"
          className={className}
        >
          {children}
        </a>
      );
    } else {
      return (
        <Link to={link} className={className}>
          {children}
        </Link>
      );
    }
  }
  return <>{children}</>;
};
