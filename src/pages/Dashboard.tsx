
import { Card } from "@/components/ui/card";
import DashboardLayout from "@/components/DashboardLayout";

const Dashboard = () => {
  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Welcome back</h1>
          <p className="text-gray-500">Here's an overview of your system</p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <Card className="p-6">
            <h2 className="text-lg font-semibold mb-2">System Status</h2>
            <p className="text-3xl font-bold text-green-500">Active</p>
          </Card>
          
          <Card className="p-6">
            <h2 className="text-lg font-semibold mb-2">Recent Events</h2>
            <p className="text-3xl font-bold">23</p>
            <p className="text-sm text-gray-500">In the last 24 hours</p>
          </Card>
          
          <Card className="p-6">
            <h2 className="text-lg font-semibold mb-2">Active Users</h2>
            <p className="text-3xl font-bold">5</p>
            <p className="text-sm text-gray-500">Currently online</p>
          </Card>
        </div>

        <Card className="p-6">
          <h2 className="text-lg font-semibold mb-4">Recent Activity</h2>
          <div className="space-y-4">
            {[1, 2, 3].map((i) => (
              <div key={i} className="flex items-center justify-between py-2 border-b last:border-0">
                <div>
                  <p className="font-medium">System Check Completed</p>
                  <p className="text-sm text-gray-500">No issues found</p>
                </div>
                <span className="text-sm text-gray-500">{i} hour ago</span>
              </div>
            ))}
          </div>
        </Card>
      </div>
    </DashboardLayout>
  );
};

export default Dashboard;
