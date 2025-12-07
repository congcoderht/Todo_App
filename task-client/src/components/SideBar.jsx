'use client';

import { useState } from 'react';
import { ChevronDown, ListTodo, Star, CheckCircle2, Circle } from 'lucide-react';

export default function SideBar() {
  const [activeTab, setActiveTab] = useState('all');
  const [isCollapsed, setIsCollapsed] = useState(false);

  const menuItems = [
    { id: 'all', label: 'Tất cả', icon: ListTodo },
    { id: 'important', label: 'Việc quan trọng', icon: Star },
    { id: 'done', label: 'Việc đã làm', icon: CheckCircle2 },
    { id: 'pending', label: 'Việc chưa làm', icon: Circle },
  ];

  return (
    <aside
      className={`${
        isCollapsed ? 'w-20' : 'w-64'
      } h-screen bg-sidebar text-sidebar-foreground border-r border-sidebar-border transition-all duration-300 flex flex-col`}
    >
      {/* Header */}
      <div className="p-4 border-b border-sidebar-border flex items-center justify-between">
        {!isCollapsed && (
          <h1 className="text-xl font-bold text-sidebar-primary">My Tasks</h1>
        )}
        <button
          onClick={() => setIsCollapsed(!isCollapsed)}
          className="p-2 hover:bg-sidebar-accent rounded-lg transition-colors"
          aria-label="Toggle sidebar"
        >
          <ChevronDown
            size={20}
            className={`transform transition-transform ${
              isCollapsed ? '-rotate-90' : 'rotate-0'
            }`}
          />
        </button>
      </div>

      {/* Navigation Menu */}
      <nav className="flex-1 p-4 space-y-2">
        {menuItems.map((item) => {
          const IconComponent = item.icon;
          const isActive = activeTab === item.id;

          return (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id)}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-200 ${
                isActive
                  ? 'bg-sidebar-primary text-sidebar-primary-foreground font-semibold'
                  : 'text-sidebar-foreground hover:bg-sidebar-accent'
              }`}
              aria-current={isActive ? 'page' : undefined}
            >
              <IconComponent size={20} className="flex-shrink-0" />
              {!isCollapsed && (
                <span className="text-sm font-medium">{item.label}</span>
              )}
            </button>
          );
        })}
      </nav>

      {/* Footer */}
      {!isCollapsed && (
        <div className="p-4 border-t border-sidebar-border">
          <p className="text-xs text-sidebar-foreground opacity-70">
            © 2025 Todo App
          </p>
        </div>
      )}
    </aside>
  );
}
