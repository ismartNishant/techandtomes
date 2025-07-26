import React from "react";

interface StatCardProps {
  title: string;
  value: string | number;
  icon: React.ReactNode;
  accentColor: string; 
  barColor: string;    
}

const StatCard: React.FC<StatCardProps> = ({ title, value, icon, accentColor, barColor }) => {
  return (
    <div className="rounded-md shadow-sm bg-background">
      <div className="px-4 py-4 flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <div className={`h-12 w-1.5 rounded-full ${barColor}`} />
          <div className="space-y-1">
            <p className="text-sm text-muted-foreground">{title}</p>
            <p className="text-2xl font-semibold text-foreground">{value}</p>
          </div>
        </div>

        <div className="relative w-12 h-12 flex items-center justify-center">
          <span
            className={`absolute left-2 top-1/2 -translate-y-1/2 -translate-x-1/2 h-9 w-9 rounded-full ${accentColor} z-0`}
          />
          <div className="relative z-10 text-zinc-700">{icon}</div>
        </div>
      </div>
    </div>
  );
};

export default StatCard;
