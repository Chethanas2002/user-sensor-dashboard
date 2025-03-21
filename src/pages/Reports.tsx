
import React, { useState } from 'react';
import DashboardLayout from "@/components/DashboardLayout";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart";
import { Checkbox } from "@/components/ui/checkbox";
import { Separator } from "@/components/ui/separator";
import { toast } from "@/hooks/use-toast";
import { 
  BarChart, 
  ChartPie, 
  ChartLine, 
  FileDown, 
  Calendar as CalendarIcon, 
  Mail, 
  Globe
} from "lucide-react";
import { PieChart, Pie, Cell, BarChart as RechartsBarChart, Bar, XAxis, YAxis, Tooltip, CartesianGrid, ResponsiveContainer, LineChart, Line } from 'recharts';
import { format } from "date-fns";
import { cn } from "@/lib/utils";

// Updated process type data with explorer.exe added
const processTypeData = [
  { name: 'python.exe', value: 25, color: '#8b5cf6' },
  { name: 'code.exe', value: 18, color: '#ec4899' }, 
  { name: 'cmd.exe', value: 12, color: '#06b6d4' },
  { name: 'powershell.exe', value: 10, color: '#f43f5e' },
  { name: 'explorer.exe', value: 8, color: '#10b981' }, // Added explorer.exe
  { name: 'unknown process', value: 3, color: '#64748b' },
];

const timelineData = [
  { month: 'Jan', incidents: 18 },
  { month: 'Feb', incidents: 12 },
  { month: 'Mar', incidents: 25 },
  { month: 'Apr', incidents: 15 },
  { month: 'May', incidents: 20 },
  { month: 'Jun', incidents: 30 },
  { month: 'Jul', incidents: 22 },
  { month: 'Aug', incidents: 17 },
  { month: 'Sep', incidents: 29 },
  { month: 'Oct', incidents: 32 },
  { month: 'Nov', incidents: 24 },
  { month: 'Dec', incidents: 21 },
];

// Create process distribution data for the new chart
const processDistributionData = [
  { process: 'python.exe', count: 25 },
  { process: 'code.exe', count: 18 },
  { process: 'cmd.exe', count: 12 },
  { process: 'powershell.exe', count: 10 },
  { process: 'explorer.exe', count: 8 },
  { process: 'unknown', count: 3 },
];

const Reports = () => {
  const [startDate, setStartDate] = useState<Date | undefined>(new Date());
  const [endDate, setEndDate] = useState<Date | undefined>(new Date());
  const [dateRange, setDateRange] = useState<'last7days' | 'last30days' | 'custom'>('last30days');
  const [processType, setProcessType] = useState<string>('all');
  const [email, setEmail] = useState<string>('');
  const [scheduleEnabled, setScheduleEnabled] = useState<boolean>(false);
  const [frequency, setFrequency] = useState<string>('weekly');

  const handleExport = (format: 'csv') => {
    toast({
      title: `Exporting as ${format.toUpperCase()}`,
      description: `Your report is being prepared for download`,
    });
    
    // Generate file data
    let fileContent = '';
    let fileName = `security-report-${new Date().toISOString().split('T')[0]}.${format}`;
    
    if (format === 'csv') {
      // Create CSV content
      fileContent = 'Process,Count\n';
      processTypeData.forEach(item => {
        fileContent += `${item.name},${item.value}\n`;
      });
      
      // Create a blob and download it
      const blob = new Blob([fileContent], { type: 'text/csv' });
      downloadFile(blob, fileName);
    }
  };
  
  // Helper function to download a file
  const downloadFile = (blob: Blob, fileName: string) => {
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = fileName;
    document.body.appendChild(a);
    a.click();
    
    // Clean up
    setTimeout(() => {
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
    }, 100);
  };

  const handleScheduleReport = () => {
    if (!email) {
      toast({
        title: "Email Required",
        description: "Please enter an email address for scheduled reports",
        variant: "destructive"
      });
      return;
    }

    toast({
      title: "Report Scheduled",
      description: `Reports will be sent ${frequency} to ${email}`,
    });
  };

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-2xl font-bold tracking-tight">Security Reports</h1>
            <p className="text-muted-foreground">
              Analyze security incidents and generate customized reports
            </p>
          </div>
          <div className="flex gap-2">
            <Button variant="outline" onClick={() => handleExport('csv')}>
              <FileDown className="mr-2 h-4 w-4" />
              CSV
            </Button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Report filters */}
          <Card className="md:col-span-3">
            <CardHeader>
              <CardTitle>Report Filters</CardTitle>
              <CardDescription>Customize your report parameters</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <div className="space-y-2">
                  <Label>Time Range</Label>
                  <Select 
                    value={dateRange} 
                    onValueChange={(value) => setDateRange(value as any)}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select time range" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="last7days">Last 7 Days</SelectItem>
                      <SelectItem value="last30days">Last 30 Days</SelectItem>
                      <SelectItem value="custom">Custom Range</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                {dateRange === 'custom' && (
                  <>
                    <div className="space-y-2">
                      <Label>Start Date</Label>
                      <Popover>
                        <PopoverTrigger asChild>
                          <Button
                            variant="outline"
                            className="w-full justify-start text-left font-normal"
                          >
                            <CalendarIcon className="mr-2 h-4 w-4" />
                            {startDate ? format(startDate, "PPP") : "Pick a date"}
                          </Button>
                        </PopoverTrigger>
                        <PopoverContent className="w-auto p-0">
                          <Calendar
                            mode="single"
                            selected={startDate}
                            onSelect={setStartDate}
                            initialFocus
                          />
                        </PopoverContent>
                      </Popover>
                    </div>

                    <div className="space-y-2">
                      <Label>End Date</Label>
                      <Popover>
                        <PopoverTrigger asChild>
                          <Button
                            variant="outline"
                            className="w-full justify-start text-left font-normal"
                          >
                            <CalendarIcon className="mr-2 h-4 w-4" />
                            {endDate ? format(endDate, "PPP") : "Pick a date"}
                          </Button>
                        </PopoverTrigger>
                        <PopoverContent className="w-auto p-0">
                          <Calendar
                            mode="single"
                            selected={endDate}
                            onSelect={setEndDate}
                            initialFocus
                          />
                        </PopoverContent>
                      </Popover>
                    </div>
                  </>
                )}

                <div className="space-y-2">
                  <Label>Process Type</Label>
                  <Select 
                    value={processType} 
                    onValueChange={setProcessType}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Processes</SelectItem>
                      <SelectItem value="python">python.exe</SelectItem>
                      <SelectItem value="code">code.exe</SelectItem>
                      <SelectItem value="cmd">cmd.exe</SelectItem>
                      <SelectItem value="powershell">powershell.exe</SelectItem>
                      <SelectItem value="explorer">explorer.exe</SelectItem>
                      <SelectItem value="unknown">unknown process</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Security Summary */}
          <Card>
            <CardHeader>
              <CardTitle>Security Summary</CardTitle>
              <CardDescription>Last 30 days activity</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="rounded-lg bg-muted p-3">
                  <div className="text-xl font-bold">68</div>
                  <div className="text-sm text-muted-foreground">Total Security Incidents</div>
                </div>
                
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>10 ransomware attempts blocked</span>
                    <span className="font-medium text-green-600">100%</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span>3 unauthorized login attempts</span>
                    <span className="font-medium text-green-600">100%</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span>15 phishing emails detected</span>
                    <span className="font-medium text-green-600">100%</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span>22 malware threats neutralized</span>
                    <span className="font-medium text-green-600">100%</span>
                  </div>
                </div>

                <Separator />

                <div className="space-y-2">
                  <Label className="font-semibold">Key Events</Label>
                  <div className="space-y-2 text-sm">
                    <div className="border-l-4 border-red-500 pl-3 py-1">
                      Critical ransomware attempt on 10/15/2023
                    </div>
                    <div className="border-l-4 border-amber-500 pl-3 py-1">
                      Multiple login attempts from suspicious IP
                    </div>
                    <div className="border-l-4 border-amber-500 pl-3 py-1">
                      Unusual file access pattern detected
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Process Type Distribution (expanded) - Took up the entire width where severity chart was */}
          <Card className="md:col-span-2">
            <CardHeader>
              <CardTitle>Process Types</CardTitle>
              <CardDescription>Breakdown by process</CardDescription>
            </CardHeader>
            <CardContent className="pt-2">
              <div className="h-[300px] flex items-center justify-center">
                <PieChart width={500} height={300}>
                  <Pie
                    data={processTypeData}
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={120}
                    paddingAngle={2}
                    dataKey="value"
                    label={({ name, percent }) => `${name.split('.')[0]} ${(percent * 100).toFixed(0)}%`}
                    labelLine={true}
                  >
                    {processTypeData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip 
                    content={({ active, payload }) => {
                      if (active && payload && payload.length) {
                        const totalValue = processTypeData.reduce((sum, item) => sum + item.value, 0);
                        const percentage = ((payload[0].value as number) / totalValue * 100).toFixed(1);
                        return (
                          <div className="bg-white p-3 border rounded shadow-sm">
                            <p className="font-medium text-base">{payload[0].name}</p>
                            <p className="text-sm">Count: {payload[0].value}</p>
                            <p className="text-sm">Percentage: {percentage}%</p>
                          </div>
                        );
                      }
                      return null;
                    }}
                  />
                </PieChart>
              </div>
            </CardContent>
          </Card>
          
          {/* Incidents Timeline */}
          <Card className="md:col-span-3">
            <CardHeader>
              <CardTitle>Incidents Timeline</CardTitle>
              <CardDescription>Monthly distribution of security incidents</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-[300px] w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <RechartsBarChart
                    data={timelineData}
                    margin={{
                      top: 5,
                      right: 30,
                      left: 20,
                      bottom: 5,
                    }}
                  >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="month" />
                    <YAxis />
                    <Tooltip />
                    <Bar dataKey="incidents" fill="#3b82f6" />
                  </RechartsBarChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>

          {/* Process Distribution (replacing Geographical Distribution) */}
          <Card className="md:col-span-3">
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle>Process Distribution</CardTitle>
                  <CardDescription>Number of incidents by process type</CardDescription>
                </div>
                <BarChart className="h-5 w-5 text-muted-foreground" />
              </div>
            </CardHeader>
            <CardContent>
              <div className="h-[300px] w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <RechartsBarChart
                    data={processDistributionData}
                    margin={{
                      top: 5,
                      right: 30,
                      left: 20,
                      bottom: 5,
                    }}
                  >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="process" />
                    <YAxis />
                    <Tooltip />
                    <Bar dataKey="count" fill="#8884d8" />
                  </RechartsBarChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>

          {/* Automated Reporting */}
          <Card className="md:col-span-3">
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle>Automated Report Scheduling</CardTitle>
                  <CardDescription>Get security reports delivered to your inbox</CardDescription>
                </div>
                <Mail className="h-5 w-5 text-muted-foreground" />
              </div>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="space-y-4">
                  <div className="flex items-center space-x-2">
                    <Switch
                      id="schedule-reports"
                      checked={scheduleEnabled}
                      onCheckedChange={setScheduleEnabled}
                    />
                    <Label htmlFor="schedule-reports">Enable scheduled reports</Label>
                  </div>
                  
                  <div className="space-y-2">
                    <Label>Frequency</Label>
                    <Select 
                      value={frequency} 
                      onValueChange={setFrequency}
                      disabled={!scheduleEnabled}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select frequency" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="daily">Daily</SelectItem>
                        <SelectItem value="weekly">Weekly</SelectItem>
                        <SelectItem value="monthly">Monthly</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="email">Email Address</Label>
                    <Input
                      id="email"
                      placeholder="your@email.com"
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      disabled={!scheduleEnabled}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label>Report Content</Label>
                    <div className="space-y-2">
                      <div className="flex items-center space-x-2">
                        <Checkbox id="summary" defaultChecked disabled={!scheduleEnabled} />
                        <label
                          htmlFor="summary"
                          className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                        >
                          Security Summary
                        </label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Checkbox id="incidents" defaultChecked disabled={!scheduleEnabled} />
                        <label
                          htmlFor="incidents"
                          className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                        >
                          Incident Details
                        </label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Checkbox id="recommendations" defaultChecked disabled={!scheduleEnabled} />
                        <label
                          htmlFor="recommendations"
                          className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                        >
                          Security Recommendations
                        </label>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="flex items-end">
                  <Button 
                    className="w-full" 
                    disabled={!scheduleEnabled} 
                    onClick={handleScheduleReport}
                  >
                    Schedule Reports
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default Reports;
