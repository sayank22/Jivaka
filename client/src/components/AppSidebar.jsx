import { useEffect, useMemo, useRef } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { CalendarDays, CreditCard, FileText, Home, LayoutDashboard, MessageSquare, ShieldCheck, X } from 'lucide-react';
import { useInteractiveMotion, useSidebarMotion } from '../hooks/useGsapMotion';

const roleConfig = {
  doctor: { label: 'Doctor workspace', dashboardPath: '/doctor', dashboardLabel: 'Doctor dashboard' },
  patient: { label: 'Patient workspace', dashboardPath: '/patient', dashboardLabel: 'Patient dashboard' },
  admin: { label: 'Admin workspace', dashboardPath: '/hospital', dashboardLabel: 'Admin dashboard' },
};

function getRole(pathname) {
  if (pathname.startsWith('/doctor')) return 'doctor';
  if (pathname.startsWith('/hospital')) return 'admin';
  return 'patient';
}

const AppSidebar = ({ isOpen, onClose }) => {
  const location = useLocation();
  const sidebarRef = useRef(null);
  const closeButtonRef = useRef(null);
  const role = getRole(location.pathname);
  const config = roleConfig[role];
  const navigation = useMemo(() => [
    { label: 'Home', to: '/', icon: Home },
    { label: config.dashboardLabel, to: config.dashboardPath, icon: LayoutDashboard },
    { label: role === 'doctor' ? 'Appointments' : 'Appointments & bookings', to: config.dashboardPath, icon: CalendarDays },
    { label: 'Payments', to: '/payment', icon: CreditCard },
  ], [config, role]);
  const resources = [
    { label: 'About Jivaka', to: '/about', icon: FileText },
    { label: 'Plans', to: '/', icon: ShieldCheck },
    { label: 'Feedback', to: '/feedback', icon: MessageSquare },
  ];

  useSidebarMotion(sidebarRef, isOpen, location.pathname);
  useInteractiveMotion(sidebarRef);

  useEffect(() => {
    const onKeyDown = (event) => {
      if (event.key === 'Escape') onClose();
    };
    if (isOpen) window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [isOpen, onClose]);

  useEffect(() => {
    if (isOpen) closeButtonRef.current?.focus();
  }, [isOpen]);

  const renderItem = ({ label, to, icon }) => {
    const Icon = icon;
    const active = location.pathname === to;
    return (
      <Link
        key={label}
        to={to}
        onClick={onClose}
        data-sidebar-item
        data-motion-interactive
        data-sidebar-path={to}
        aria-current={active ? 'page' : undefined}
        className={`group flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-colors ${active ? 'bg-primary text-primary-foreground shadow-sm' : 'text-muted-foreground hover:bg-muted hover:text-foreground'}`}
      >
        <Icon className="h-4 w-4 shrink-0" aria-hidden="true" />
        <span>{label}</span>
      </Link>
    );
  };

  return (
    <div
      ref={sidebarRef}
      inert={!isOpen}
      className={`fixed inset-0 z-[60] ${isOpen ? 'pointer-events-auto' : 'pointer-events-none'}`}
    >
      <button data-sidebar-backdrop aria-label="Close navigation" onClick={onClose} className="absolute inset-0 w-full bg-foreground/20 pointer-events-auto" tabIndex={isOpen ? 0 : -1} />
      <aside id="app-sidebar" data-sidebar-drawer role="dialog" aria-modal="true" aria-label="Application navigation" className="absolute inset-y-0 left-0 flex w-[18rem] max-w-[calc(100vw-2rem)] flex-col border-r border-border bg-card p-4 shadow-2xl pointer-events-auto">
        <div className="flex items-center justify-between border-b border-border pb-4">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.16em] text-muted-foreground">Jivaka</p>
            <p className="mt-1 text-sm font-semibold text-foreground">{config.label}</p>
          </div>
          <button ref={closeButtonRef} type="button" onClick={onClose} data-motion-interactive aria-label="Close navigation" className="rounded-md p-2 text-muted-foreground transition-colors hover:bg-muted hover:text-foreground">
            <X className="h-4 w-4" aria-hidden="true" />
          </button>
        </div>

        <nav className="mt-5 space-y-1" aria-label="Primary navigation">
          {navigation.map(renderItem)}
        </nav>
        <div className="my-5 border-t border-border" />
        <p className="px-3 pb-2 text-xs font-semibold uppercase tracking-[0.12em] text-muted-foreground">Resources</p>
        <nav className="space-y-1" aria-label="Resources">
          {resources.map(renderItem)}
        </nav>
      </aside>
    </div>
  );
};

export default AppSidebar;
