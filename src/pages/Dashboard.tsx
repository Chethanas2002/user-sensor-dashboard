
import React from 'react';
import DashboardLayout from "@/components/DashboardLayout";
import DashboardHeader from "@/components/dashboard/DashboardHeader";
import MetricsSection from "@/components/dashboard/MetricsSection";
import ChartSection from "@/components/dashboard/ChartSection";
import ActivityLogSection from "@/components/dashboard/ActivityLogSection";

const Dashboard = () => {
  return (
    <DashboardLayout>
      <div className="space-y-4 max-w-full">
        <DashboardHeader 
          title="Welcome, Admin" 
          description="Real-time overview of your system's security status"
        />
        
        <MetricsSection />
        <ChartSection />
        <ActivityLogSection />
      </div>
    </DashboardLayout>
  );
};

export default Dashboard;
