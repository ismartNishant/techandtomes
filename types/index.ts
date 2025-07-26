export interface ThemeContextType {
    theme: 'light' | 'dark';
    toggleTheme: () => void;
  }
  
  export interface MenuItemType {
    icon: React.ComponentType<{ size?: number; className?: string }>;
    label: string;
    active: boolean;
    href?: string;
  }
  
  export interface HeaderProps {
    onMenuClick: () => void;
    isSidebarOpen: boolean;
  }
  
  export interface SidebarProps {
    isOpen: boolean;
    isCollapsed: boolean;
    onCollapse: () => void;
  }
  
  export interface StatCardType {
    title: string;
    value: string;
    change: string;
    color: string;
  }