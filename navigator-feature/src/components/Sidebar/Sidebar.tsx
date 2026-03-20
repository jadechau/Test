import { useState } from 'react';
import { ChevronDown, ChevronRight } from 'lucide-react';
import { Logo } from '../Logo/Logo';
import './Sidebar.css';

export interface SidebarNavItem {
  label: string;
  icon?: React.ReactNode;
  href?: string;
  onClick?: () => void;
  active?: boolean;
  children?: SidebarNavItem[];
  showCaret?: boolean;
  defaultExpanded?: boolean;
}

export interface SidebarUser {
  name: string;
  email: string;
  href?: string;
}

export interface SidebarProps {
  header?: React.ReactNode;
  navItems: SidebarNavItem[];
  user?: SidebarUser;
  poweredBy?: boolean;
  footer?: React.ReactNode;
  width?: number;
  className?: string;
  variant?: 'default' | 'navigator';
}

export function Sidebar({
  header,
  navItems,
  user,
  poweredBy = true,
  footer,
  width = 260,
  className = '',
  variant = 'default',
}: SidebarProps) {
  const isNavigator = variant === 'navigator';
  const resolvedHeader = header ?? (
    <div className="sidebar__logo-wrap">
      <Logo variant="light" height={32} />
    </div>
  );

  return (
    <aside
      className={['sidebar', isNavigator ? 'sidebar--navigator' : '', className].filter(Boolean).join(' ')}
      style={{ width: width ? `${width}px` : undefined }}
      role="navigation"
      aria-label="Main navigation"
    >
      <div className="sidebar__header">{resolvedHeader}</div>

      <nav className="sidebar__nav">
        <ul className="sidebar__nav-list" role="list">
          {navItems.map((item, i) => (
            <li key={i} className="sidebar__nav-item">
              <SidebarNavLink item={item} />
            </li>
          ))}
        </ul>
      </nav>

      <div className="sidebar__bottom">
        {user && (
          <div className="sidebar__user">
            {user.href ? (
              <a href={user.href} className="sidebar__user-link">
                <UserIcon />
                <span className="sidebar__user-text">
                  <span className="sidebar__user-name">{user.name}</span>
                  <span className="sidebar__user-email">{user.email}</span>
                </span>
                <ChevronRight size={16} className="sidebar__user-arrow" aria-hidden />
              </a>
            ) : (
              <div className="sidebar__user-block">
                <UserIcon />
                <span className="sidebar__user-text">
                  <span className="sidebar__user-name">{user.name}</span>
                  <span className="sidebar__user-email">{user.email}</span>
                </span>
              </div>
            )}
          </div>
        )}
        {poweredBy && !isNavigator && (
          <div className="sidebar__powered">
            <span className="sidebar__powered-by">Powered by</span>
            <span className="sidebar__powered-name">Surveil</span>
          </div>
        )}
        {footer && <div className="sidebar__footer">{footer}</div>}
      </div>
    </aside>
  );
}

function UserIcon() {
  return (
    <span className="sidebar__user-icon" aria-hidden>
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2" />
        <circle cx="12" cy="7" r="4" />
      </svg>
    </span>
  );
}

function SidebarNavLink({ item, depth = 0 }: { item: SidebarNavItem; depth?: number }) {
  const hasChildren = item.children && item.children.length > 0;
  const [expanded, setExpanded] = useState(item.defaultExpanded ?? false);
  const showCaret = item.showCaret !== false && (item.showCaret === true || hasChildren);

  const linkClass = [
    'sidebar__nav-link',
    item.active ? 'sidebar__nav-link--active' : '',
    depth > 0 ? 'sidebar__nav-link--child' : '',
  ].filter(Boolean).join(' ');

  const indentStyle: React.CSSProperties = {
    paddingTop: '8px',
    paddingBottom: '8px',
    paddingLeft: `${12 + depth * 8}px`,
    paddingRight: '16px',
    borderRadius: '6px',
  };

  const content = (
    <>
      {item.icon && <span className="sidebar__nav-icon" aria-hidden>{item.icon}</span>}
      <span className="sidebar__nav-label">{item.label}</span>
      {showCaret && (
        <ChevronDown
          size={16}
          className={`sidebar__nav-caret ${expanded ? 'sidebar__nav-caret--open' : ''}`}
          aria-hidden
        />
      )}
    </>
  );

  const trigger = hasChildren ? (
    <button type="button" className={linkClass} style={indentStyle} onClick={() => setExpanded(p => !p)} aria-expanded={expanded}>
      {content}
    </button>
  ) : item.href ? (
    <a href={item.href} className={linkClass} style={indentStyle}>{content}</a>
  ) : item.onClick ? (
    <button type="button" className={linkClass} style={indentStyle} onClick={item.onClick}>{content}</button>
  ) : (
    <span className={linkClass} style={indentStyle}>{content}</span>
  );

  return (
    <>
      {trigger}
      {hasChildren && expanded && (
        <ul className="sidebar__subnav-list" role="list">
          {item.children!.map((child, i) => (
            <li key={i} className="sidebar__nav-item">
              <SidebarNavLink item={child} depth={depth + 1} />
            </li>
          ))}
        </ul>
      )}
    </>
  );
}
