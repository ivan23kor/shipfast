"use client";

import { useState, ReactNode } from "react";

/**
 * Tabs - Tab navigation component
 *
 * Usage:
 * <Tabs
 *   tabs={[
 *     { id: 'tab1', label: 'Tab 1', content: <div>Content 1</div> },
 *     { id: 'tab2', label: 'Tab 2', content: <div>Content 2</div> }
 *   ]}
 * />
 *
 * Features:
 * - Controlled or uncontrolled
 * - Keyboard navigation
 * - Custom styling
 * - Badge support
 * - Disabled tabs
 */

export interface Tab {
  id: string;
  label: string;
  content: ReactNode;
  badge?: string | number;
  disabled?: boolean;
  icon?: ReactNode;
}

interface TabsProps {
  tabs: Tab[];
  defaultTab?: string;
  activeTab?: string;
  onTabChange?: (tabId: string) => void;
  variant?: "bordered" | "lifted" | "boxed";
  className?: string;
}

export default function Tabs({
  tabs,
  defaultTab,
  activeTab: controlledActiveTab,
  onTabChange,
  variant = "bordered",
  className = "",
}: TabsProps) {
  const [internalActiveTab, setInternalActiveTab] = useState(
    defaultTab || tabs[0]?.id
  );

  const activeTab = controlledActiveTab ?? internalActiveTab;

  const handleTabClick = (tabId: string, disabled?: boolean) => {
    if (disabled) return;
    setInternalActiveTab(tabId);
    onTabChange?.(tabId);
  };

  const handleKeyDown = (e: React.KeyboardEvent, index: number) => {
    const enabledTabs = tabs.filter((tab) => !tab.disabled);
    const currentIndex = enabledTabs.findIndex((tab) => tab.id === activeTab);

    if (e.key === "ArrowRight") {
      e.preventDefault();
      const nextIndex = (currentIndex + 1) % enabledTabs.length;
      handleTabClick(enabledTabs[nextIndex].id);
    } else if (e.key === "ArrowLeft") {
      e.preventDefault();
      const prevIndex = (currentIndex - 1 + enabledTabs.length) % enabledTabs.length;
      handleTabClick(enabledTabs[prevIndex].id);
    }
  };

  const activeTabData = tabs.find((tab) => tab.id === activeTab);

  const variantClasses = {
    bordered: "tabs-bordered",
    lifted: "tabs-lifted",
    boxed: "tabs-boxed",
  };

  return (
    <div className={className}>
      {/* Tab Navigation */}
      <div
        className={`tabs ${variantClasses[variant]}`}
        role="tablist"
      >
        {tabs.map((tab, index) => (
          <button
            key={tab.id}
            role="tab"
            className={`tab gap-2 ${
              activeTab === tab.id ? "tab-active" : ""
            } ${tab.disabled ? "tab-disabled opacity-50 cursor-not-allowed" : ""}`}
            onClick={() => handleTabClick(tab.id, tab.disabled)}
            onKeyDown={(e) => handleKeyDown(e, index)}
            aria-selected={activeTab === tab.id}
            aria-disabled={tab.disabled}
            disabled={tab.disabled}
          >
            {tab.icon && <span>{tab.icon}</span>}
            <span>{tab.label}</span>
            {tab.badge !== undefined && (
              <span className="badge badge-sm">{tab.badge}</span>
            )}
          </button>
        ))}
      </div>

      {/* Tab Content */}
      <div className="mt-4" role="tabpanel">
        {activeTabData?.content}
      </div>
    </div>
  );
}
