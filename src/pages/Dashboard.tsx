
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import DashboardLayout from "@/components/DashboardLayout";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';
import { Shield, AlertCircle, Activity, FileText, Server, Clock, Users } from "lucide-react";

// Mock data for the dashboard
const recentEventData = [
  { date: "Today", name: "System Check Completed", status: "No issues found", time: "1 hour ago" },
  { date: "Today", name: "Suspicious File Activity", status: "Quarantined", time: "3 hours ago" },
  { date: "Yesterday", name: "User Login Attempt", status: "Failed (IP: 192.168.1.105)", time: "12 hours ago" },
  { date: "Yesterday", name: "System Update", status: "Completed", time: "18 hours ago" },
  { date: "Jul 10", name: "Ransomware Signature", status: "Detected and blocked", time: "2 days ago" },
];

const weeklyAttacksData = [
  { name: 'Mon', attacks: 4 },
  { name: 'Tue', attacks: 3 },
  { name: 'Wed', attacks: 7 },
  { name: 'Thu', attacks: 2 },
  { name: 'Fri', attacks: 5 },
  { name: 'Sat', attacks: 1 },
  { name: 'Sun', attacks: 2 },
];

const Dashboard = () => {
  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Security Dashboard</h1>
          <p className="text-gray-500">Real-time overview of your system's security status</p>
        </div>
        
        {/* Key metrics */}
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

        {/* Charts and activity logs */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Weekly attacks chart */}
          <Card className="p-6">
            <CardHeader className="px-0 pt-0">
              <div className="flex justify-between items-center">
                <CardTitle className="text-xl font-semibold">Weekly Attack Attempts</CardTitle>
                <Activity className="h-6 w-6 text-gray-500" />
              </div>
            </CardHeader>
            <CardContent className="p-0">
              <div className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={weeklyAttacksData}>
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip />
                    <Bar dataKey="attacks" fill="#8884d8" />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
          
          {/* System health */}
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
        </div>

        {/* Recent activity log */}
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
      </div>
    </DashboardLayout>
  );
};

// Helper component to choose the appropriate icon for an event
const ActivityIcon = ({ event }: { event: { name: string, status: string } }) => {
  if (event.name.includes("Check") || event.status.includes("No issues"))
    return <Shield className="h-5 w-5 text-green-600" />;
  if (event.status.includes("Quarantined") || event.status.includes("Detected"))
    return <AlertCircle className="h-5 w-5 text-red-600" />;
  if (event.status.includes("Failed"))
    return <AlertTriangle className="h-5 w-5 text-yellow-600" />;
  return <Activity className="h-5 w-5 text-blue-600" />;
};

import { Button } from "@/components/ui/button";
import { AlertTriangle } from "lucide-react";

export default Dashboard;
