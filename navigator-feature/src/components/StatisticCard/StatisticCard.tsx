import { ChevronDown, ChevronUp, Minus } from 'lucide-react';
import { Button } from '../Button/Button';
import './StatisticCard.css';

export type StatisticTrend = 'up' | 'down' | 'neutral';

export interface StatisticCardProps {
  title: string;
  icon?: React.ReactNode;
  badge?: string;
  value: string;
  comparison?: { trend: StatisticTrend; text: string };
  supportingText?: string;
  labels?: React.ReactNode[];
  primaryAction?: { label: string; onClick?: () => void };
  secondaryAction?: { label: string; onClick?: () => void };
}

export function StatisticCard({
  title,
  icon,
  badge,
  value,
  comparison,
  supportingText,
  labels,
  primaryAction,
  secondaryAction,
}: StatisticCardProps) {
  const hasFooterActions = primaryAction || secondaryAction;
  const hasLabels = labels != null && labels.length > 0;
  const hasFooter = hasFooterActions || hasLabels;
  const hasSupporting = supportingText != null && supportingText.length > 0;

  const rootClass = [
    'statistic-card',
    hasSupporting && 'statistic-card--has-supporting',
    hasFooter && 'statistic-card--has-footer',
  ].filter(Boolean).join(' ');

  return (
    <article className={rootClass}>
      <header className="statistic-card__header">
        <div className="statistic-card__header-left">
          {icon && <span className="statistic-card__icon" aria-hidden>{icon}</span>}
          <h3 className="statistic-card__title">{title}</h3>
        </div>
        {badge != null && badge !== '' && (
          <span className="statistic-card__badge">{badge}</span>
        )}
      </header>

      <div className="statistic-card__value-row">
        <span className="statistic-card__value">{value}</span>
        {comparison && (
          <span className={`statistic-card__comparison statistic-card__comparison--${comparison.trend}`}>
            {comparison.trend === 'up' && <ChevronUp size={16} strokeWidth={2} aria-hidden />}
            {comparison.trend === 'down' && <ChevronDown size={16} strokeWidth={2} aria-hidden />}
            {comparison.trend === 'neutral' && <Minus size={16} strokeWidth={2} aria-hidden />}
            <span>{comparison.text}</span>
          </span>
        )}
      </div>

      {hasSupporting && (
        <p className="statistic-card__supporting">{supportingText}</p>
      )}

      {hasFooter && (
        <footer className="statistic-card__footer">
          {hasLabels && (
            <div className="statistic-card__labels">
              {labels!.map((label, i) => (
                <span key={i} className="statistic-card__label">{label}</span>
              ))}
            </div>
          )}
          {hasFooterActions && (
            <div className="statistic-card__actions">
              {secondaryAction && (
                <Button variant="secondary" size="sm" onClick={(e) => { e.stopPropagation(); secondaryAction.onClick?.(); }}>
                  {secondaryAction.label}
                </Button>
              )}
              {primaryAction && (
                <Button size="sm" onClick={(e) => { e.stopPropagation(); primaryAction.onClick?.(); }}>
                  {primaryAction.label}
                </Button>
              )}
            </div>
          )}
        </footer>
      )}
    </article>
  );
}
