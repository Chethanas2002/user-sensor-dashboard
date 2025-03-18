
import { useState } from 'react';
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarProvider,
} from "@/components/ui/sidebar";
import { Button } from "@/components/ui/button";
import { 
  Menu, 
  Home, 
  AlertCircle, 
  FileText, 
  Settings, 
  LogOut, 
  Shield, 
  BarChart, 
  Search,
  Bell 
} from "lucide-react";
import { useNavigate } from 'react-router-dom';
import { useToast } from "@/hooks/use-toast";

interface DashboardLayoutProps {
  children: React.ReactNode;
}

const DashboardLayout = ({ children }: DashboardLayoutProps) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const navigate = useNavigate();
  const { toast } = useToast();

  const menuItems = [
    { title: "Overview", icon: Home, path: "/dashboard" },
    { title: "Detailed Logs", icon: FileText, path: "/dashboard/logs" },
    { title: "Alerts", icon: AlertCircle, path: "/dashboard/alerts" },
    { title: "Reports", icon: BarChart, path: "/dashboard/reports" },
    { title: "Settings", icon: Settings, path: "/dashboard/settings" },
  ];

  const handleLogout = () => {
    toast({
      title: "Logged out",
      description: "You have been successfully logged out"
    });
    navigate('/login');
  };

  const handleMenuClick = (path: string) => {
    if (path === "/dashboard") {
      // We're already on the dashboard, so just stay here
      return;
    }
    
    // For other pages that aren't implemented yet
    toast({
      title: "Coming Soon",
      description: "This feature is currently under development",
      variant: "default"
    });
  };

  return (
    <div className="min-h-screen flex w-full">
      <SidebarProvider>
        <Sidebar className="border-r border-gray-200">
          <SidebarContent>
            <div className="p-4 flex items-center">
              <Shield className="h-6 w-6 text-blue-500 mr-2" />
              <h1 className="font-bold text-xl">SecureGuard</h1>
            </div>
            
            {/* Quick actions */}
            <div className="px-4 py-2">
              <div className="grid grid-cols-2 gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  className="justify-start"
                  onClick={() => toast({
                    title: "Search",
                    description: "Search functionality coming soon"
                  })}
                >
                  <Search className="h-4 w-4 mr-2" />
                  Search
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  className="justify-start"
                  onClick={() => toast({
                    title: "Notifications",
                    description: "You have no new notifications"
                  })}
                >
                  <Bell className="h-4 w-4 mr-2" />
                  Alerts
                </Button>
              </div>
            </div>
            
            <SidebarGroup>
              <SidebarGroupLabel>
                Main Navigation
              </SidebarGroupLabel>
              <SidebarGroupContent>
                <SidebarMenu>
                  {menuItems.map((item) => (
                    <SidebarMenuItem key={item.title}>
                      <SidebarMenuButton
                        className="flex items-center gap-3 px-4 py-2 hover:bg-gray-100 rounded-lg transition-colors"
                        onClick={() => handleMenuClick(item.path)}
                      >
                        <item.icon className="h-5 w-5" />
                        <span>{item.title}</span>
                      </SidebarMenuButton>
                    </SidebarMenuItem>
                  ))}
                </SidebarMenu>
              </SidebarGroupContent>
            </SidebarGroup>
            
            <div className="absolute bottom-4 w-full px-4">
              <Button
                variant="ghost"
                className="w-full flex items-center justify-start gap-3 text-red-500 hover:text-red-600 hover:bg-red-50"
                onClick={handleLogout}
              >
                <LogOut className="h-5 w-5" />
                Logout
              </Button>
            </div>
          </SidebarContent>
        </Sidebar>
      </SidebarProvider>
      <main className="flex-1 bg-gray-50 p-6 overflow-auto">
        <div className="max-w-7xl mx-auto">
          {children}
        </div>
      </main>
    </div>
  );
};

export default DashboardLayout;
