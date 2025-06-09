import React from 'react'
import type { ReactNode } from 'react'

export interface Tab {
  id: string
  label: string
  icon?: ReactNode
  content: ReactNode
}

interface TabsProps {
  tabs: Tab[]
  activeTab: string
  onTabChange: (tabId: string) => void
  className?: string
}

const Tabs: React.FC<TabsProps> = ({
  tabs,
  activeTab,
  onTabChange,
  className = ''
}) => {  return (
    <div className={`h-full flex flex-col ${className}`}>      {/* Tab Navigation */}
      <div className="border-b border-dark-border bg-dark-light">
        {/* Mobile: Scroll horizontal, Desktop: Flex normal */}
        <div className="flex lg:flex overflow-x-auto tab-scroll lg:overflow-x-visible scrollbar-thin">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => onTabChange(tab.id)}
              className={`
                flex items-center gap-1 lg:gap-2 px-4 lg:px-6 py-2.5 lg:py-3 font-medium transition-colors relative text-sm lg:text-base whitespace-nowrap flex-shrink-0 min-w-max justify-center lg:justify-start
                ${activeTab === tab.id 
                  ? 'text-primary border-b-2 border-primary bg-dark-card' 
                  : 'text-light-gray hover:text-light hover:bg-dark-card/50'
                }
              `}
            >
              {tab.icon && <span className="w-4 h-4 lg:w-5 lg:h-5">{tab.icon}</span>}
              <span className="truncate">{tab.label}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Tab Content */}
      <div className="flex-1 min-h-0">
        {tabs.find(tab => tab.id === activeTab)?.content}
      </div>
    </div>
  )
}

export default Tabs
