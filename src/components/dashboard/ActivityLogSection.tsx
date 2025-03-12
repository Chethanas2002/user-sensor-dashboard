
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import ActivityIcon from './ActivityIcon';

// Mock data for the dashboard
const recentEventData = [
  { date: "Today", name: "System Check Completed", status: "No issues found", time: "1 hour ago" },
  { date: "Today", name: "Suspicious File Activity", status: "Quarantined", time: "3 hours ago" },
  { date: "Yesterday", name: "User Login Attempt", status: "Failed (IP: 192.168.1.105)", time: "12 hours ago" },
  { date: "Yesterday", name: "System Update", status: "Completed", time: "18 hours ago" },
  { date: "Jul 10", name: "Ransomware Signature", status: "Detected and blocked", time: "2 days ago" },
];

const ActivityLogSection = () => {
  return (
    <Card className="p-6">
      <CardHeader className="px-0 pt-0">
        <div className="flex justify-between items-center">
          <CardTitle className="text-xl font-semibold">Recent Activity</CardTitle>
          <Button size="sm" variant="outline">View All</Button>
        </div>
      </CardHeader>
      <CardContent className="p-0 pt-4">
        <div className="space-y-4">
          {recentEventData.map((event, i) => (
            <div key={i} className="flex items-start justify-between py-3 border-b last:border-0">
              <div className="flex items-start gap-3">
                <div className={`p-2 rounded-full ${
                  event.status.includes("issue") || event.status.includes("Completed") ? "bg-green-100" : 
                  event.status.includes("Quarantined") || event.status.includes("Detected") ? "bg-red-100" :
                  event.status.includes("Failed") ? "bg-yellow-100" : "bg-blue-100"
                }`}>
                  <ActivityIcon event={event} />
                </div>
                <div>
                  <p className="font-medium">{event.name}</p>
                  <p className="text-sm text-gray-500">{event.status}</p>
                </div>
              </div>
              <div className="text-right">
                <span className="text-sm text-gray-500">{event.time}</span>
                <p className="text-xs text-gray-400">{event.date}</p>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default ActivityLogSection;
