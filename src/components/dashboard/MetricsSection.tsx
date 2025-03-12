
import React from 'react';
import { Card } from "@/components/ui/card";
import { Shield, FileText, AlertCircle, Users } from "lucide-react";

const MetricsSection = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      <Card className="p-6 border-l-4 border-green-500">
        <div className="flex justify-between items-start">
          <div>
            <h2 className="text-lg font-semibold mb-2">System Status</h2>
            <p className="text-3xl font-bold text-green-500">Protected</p>
          </div>
          <Shield className="h-8 w-8 text-green-500" />
        </div>
      </Card>
      
      <Card className="p-6 border-l-4 border-blue-500">
        <div className="flex justify-between items-start">
          <div>
            <h2 className="text-lg font-semibold mb-2">Monitored Files</h2>
            <p className="text-3xl font-bold">23,541</p>
          </div>
          <FileText className="h-8 w-8 text-blue-500" />
        </div>
      </Card>
      
      <Card className="p-6 border-l-4 border-yellow-500">
        <div className="flex justify-between items-start">
          <div>
            <h2 className="text-lg font-semibold mb-2">Recent Alerts</h2>
            <p className="text-3xl font-bold">7</p>
            <p className="text-sm text-gray-500">Last 24 hours</p>
          </div>
          <AlertCircle className="h-8 w-8 text-yellow-500" />
        </div>
      </Card>
      
      <Card className="p-6 border-l-4 border-purple-500">
        <div className="flex justify-between items-start">
          <div>
            <h2 className="text-lg font-semibold mb-2">Active Users</h2>
            <p className="text-3xl font-bold">5</p>
            <p className="text-sm text-gray-500">Currently online</p>
          </div>
          <Users className="h-8 w-8 text-purple-500" />
        </div>
      </Card>
    </div>
  );
};

export default MetricsSection;
