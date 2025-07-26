'use client';

import { Menu, ChevronLeft, ChevronRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { ModeToggle } from '../common/ThemeToggle';

interface HeaderProps {
  collapsed: boolean;
  onToggleSidebar: () => void;
}

const Header = ({ collapsed, onToggleSidebar }: HeaderProps) => {
  return (
    <header className="h-16 px-4 flex items-center justify-between border-b bg-background sticky top-0 z-40">
      <Button
        onClick={onToggleSidebar}
        size="icon"
        className=" transition  h-10 w-10"
      >
      
        <Menu className="!h-5 !w-5 md:hidden" />

       
        {collapsed ? (
          <ChevronRight className="!h-5 !w-5 hidden md:block" />
        ) : (
          <ChevronLeft className="!h-5 !w-5 hidden md:block" />
        )}
      </Button>

      <h1 className="text-lg font-semibold  lg:hidden">Dashboard</h1>
      <ModeToggle />
    </header>
  );
};

export default Header;
