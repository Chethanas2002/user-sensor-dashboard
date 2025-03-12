
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Server, Clock } from "lucide-react";

const SystemHealthCard = () => {
  return (
    <Card className="p-6">
      <CardHeader className="px-0 pt-0">
        <div className="flex justify-between items-center">
          <CardTitle className="text-xl font-semibold">System Health</CardTitle>
          <Server className="h-6 w-6 text-gray-500" />
        </div>
      </CardHeader>
      <CardContent className="p-0 space-y-4">
        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <p className="text-sm font-medium text-gray-500">CPU Usage</p>
            <div className="h-2 bg-gray-200 rounded-full">
              <div className="h-2 bg-blue-500 rounded-full" style={{ width: '24%' }}></div>
            </div>
            <p className="text-sm font-medium">24%</p>
          </div>
          
          <div className="space-y-2">
            <p className="text-sm font-medium text-gray-500">Memory Usage</p>
            <div className="h-2 bg-gray-200 rounded-full">
              <div className="h-2 bg-green-500 rounded-full" style={{ width: '42%' }}></div>
            </div>
            <p className="text-sm font-medium">42%</p>
          </div>
          
          <div className="space-y-2">
            <p className="text-sm font-medium text-gray-500">Disk Usage</p>
            <div className="h-2 bg-gray-200 rounded-full">
              <div className="h-2 bg-yellow-500 rounded-full" style={{ width: '67%' }}></div>
            </div>
            <p className="text-sm font-medium">67%</p>
          </div>
          
          <div className="space-y-2">
            <p className="text-sm font-medium text-gray-500">Network</p>
            <div className="h-2 bg-gray-200 rounded-full">
              <div className="h-2 bg-purple-500 rounded-full" style={{ width: '18%' }}></div>
            </div>
            <p className="text-sm font-medium">18%</p>
          </div>
        </div>
        
        <div className="pt-4 border-t border-gray-200">
          <h3 className="text-lg font-medium mb-2">System Uptime</h3>
          <div className="flex items-center">
            <Clock className="h-5 w-5 mr-2 text-gray-500" />
            <p className="font-medium">14 days, 6 hours, 32 minutes</p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default SystemHealthCard;
