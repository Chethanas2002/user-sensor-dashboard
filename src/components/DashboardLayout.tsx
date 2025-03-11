
import { useState } from 'react';
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import { Button } from "@/components/ui/button";
import { Menu, Home, AlertCircle, FileText, Settings, LogOut } from "lucide-react";
import { useNavigate } from 'react-router-dom';

interface DashboardLayoutProps {
  children: React.ReactNode;
}

const DashboardLayout = ({ children }: DashboardLayoutProps) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const navigate = useNavigate();

  const menuItems = [
    { title: "Overview", icon: Home, path: "/dashboard" },
    { title: "Alerts", icon: AlertCircle, path: "/dashboard/alerts" },
    { title: "Reports", icon: FileText, path: "/dashboard/reports" },
    { title: "Settings", icon: Settings, path: "/dashboard/settings" },
  ];

  const handleLogout = () => {
    navigate('/login');
  };

  return (
    <div className="min-h-screen flex w-full">
      <Sidebar className={`transition-all duration-300 ${isSidebarOpen ? 'w-64' : 'w-20'}`}>
        <SidebarContent>
          <div className="p-4 flex justify-between items-center">
            <h1 className={`font-bold text-xl transition-opacity duration-300 ${isSidebarOpen ? 'opacity-100' : 'opacity-0'}`}>
              Dashboard
            </h1>
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setIsSidebarOpen(!isSidebarOpen)}
            >
              <Menu className="h-5 w-5" />
            </Button>
          </div>
          <SidebarGroup>
            <SidebarGroupLabel className={isSidebarOpen ? 'opacity-100' : 'opacity-0'}>
              Navigation
            </SidebarGroupLabel>
            <SidebarGroupContent>
              <SidebarMenu>
                {menuItems.map((item) => (
                  <SidebarMenuItem key={item.title}>
                    <SidebarMenuButton
                      className="w-full flex items-center gap-3 px-4 py-2 hover:bg-gray-100 rounded-lg transition-colors"
                      onClick={() => navigate(item.path)}
                    >
                      <item.icon className="h-5 w-5" />
                      <span className={`transition-opacity duration-300 ${isSidebarOpen ? 'opacity-100' : 'opacity-0'}`}>
                        {item.title}
                      </span>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                ))}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
          <div className="absolute bottom-4 w-full px-4">
            <Button
              variant="ghost"
              className="w-full flex items-center gap-3"
              onClick={handleLogout}
            >
              <LogOut className="h-5 w-5" />
              <span className={`transition-opacity duration-300 ${isSidebarOpen ? 'opacity-100' : 'opacity-0'}`}>
                Logout
              </span>
            </Button>
          </div>
        </SidebarContent>
      </Sidebar>
      <main className="flex-1 bg-gray-50 p-6">
        {children}
      </main>
    </div>
  );
};

export default DashboardLayout;
