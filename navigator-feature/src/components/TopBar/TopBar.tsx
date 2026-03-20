import { Bell, Search, Settings } from 'lucide-react';
import './TopBar.css';

export interface TopBarProps {
  title?: string;
  subtitle?: string;
  actions?: React.ReactNode;
  className?: string;
}

export function TopBar({ title, subtitle, actions, className = '' }: TopBarProps) {
  return (
    <header className={['topbar', className].filter(Boolean).join(' ')} role="banner">
      <div className="topbar__left">
        {title && (
          <div className="topbar__titles">
            <h1 className="topbar__title">{title}</h1>
            {subtitle && <span className="topbar__subtitle">{subtitle}</span>}
          </div>
        )}
      </div>

      <div className="topbar__right">
        {actions && <div className="topbar__actions">{actions}</div>}
        <div className="topbar__controls">
          <button type="button" className="topbar__icon-btn" aria-label="Search">
            <Search size={18} />
          </button>
          <button type="button" className="topbar__icon-btn" aria-label="Notifications">
            <Bell size={18} />
          </button>
          <button type="button" className="topbar__icon-btn" aria-label="Settings">
            <Settings size={18} />
          </button>
        </div>
        <div className="topbar__divider" aria-hidden />
        <div className="topbar__avatar" aria-label="User menu" role="button" tabIndex={0}>
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
            <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2" />
            <circle cx="12" cy="7" r="4" />
          </svg>
        </div>
      </div>
    </header>
  );
}
