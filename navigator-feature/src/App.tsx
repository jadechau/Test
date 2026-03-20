import {
  LayoutDashboard,
  Map,
  Users,
  FileText,
  BarChart2,
  Settings,
  AlertCircle,
  LogOut,
} from 'lucide-react';
import { Sidebar } from './components/Sidebar/Sidebar';
import { TopBar } from './components/TopBar/TopBar';
import { StatisticCard } from './components/StatisticCard/StatisticCard';
import { Button } from './components/Button/Button';
import './styles/tokens.css';
import './App.css';

const navItems = [
  {
    label: 'Dashboard',
    icon: <LayoutDashboard size={18} />,
  },
  {
    label: 'Navigator',
    icon: <Map size={18} />,
    active: true,
    defaultExpanded: true,
    children: [
      { label: 'Overview', active: true },
      { label: 'Routes' },
      { label: 'Zones' },
    ],
  },
  {
    label: 'People',
    icon: <Users size={18} />,
  },
  {
    label: 'Reports',
    icon: <FileText size={18} />,
  },
  {
    label: 'Analytics',
    icon: <BarChart2 size={18} />,
  },
  {
    label: 'Incidents',
    icon: <AlertCircle size={18} />,
  },
  {
    label: 'Settings',
    icon: <Settings size={18} />,
  },
];

const stats = [
  {
    title: 'Active Units',
    value: '142',
    comparison: { trend: 'up' as const, text: '+12 since yesterday' },
    supportingText: 'Units currently on patrol',
  },
  {
    title: 'Incidents Today',
    value: '38',
    comparison: { trend: 'down' as const, text: '-5 vs last week' },
    supportingText: 'Reported across all zones',
  },
  {
    title: 'Avg Response Time',
    value: '4m 32s',
    comparison: { trend: 'up' as const, text: '+0:18 vs last week' },
    supportingText: 'Based on closed incidents',
  },
  {
    title: 'Coverage Rate',
    value: '94.2%',
    comparison: { trend: 'neutral' as const, text: 'No change' },
    supportingText: 'Across monitored zones',
  },
];

export default function App() {
  return (
    <div className="app-layout">
      <Sidebar
        variant="navigator"
        navItems={navItems}
        user={{ name: 'Alex Morgan', email: 'alex@surveil.com' }}
        poweredBy={false}
        footer={
          <button type="button" className="sidebar__logout">
            <span className="sidebar__logout-icon">
              <LogOut size={16} strokeWidth={2} />
            </span>
            Logout
          </button>
        }
      />

      <div className="app-main">
        <TopBar
          title="Navigator"
          subtitle="Real-time patrol and incident overview"
          actions={
            <Button variant="primary" size="sm">
              Export Report
            </Button>
          }
        />

        <main className="app-content">
          <section className="stats-grid" aria-label="Key statistics">
            {stats.map((stat) => (
              <StatisticCard key={stat.title} {...stat} />
            ))}
          </section>
        </main>
      </div>
    </div>
  );
}
