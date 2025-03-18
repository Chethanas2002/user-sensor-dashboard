
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
  Home, 
  FileText, 
  BarChart, 
  Settings, 
  LogOut, 
  Shield, 
  Search
} from "lucide-react";
import { useNavigate, useLocation } from 'react-router-dom';
import { useToast } from "@/hooks/use-toast";

interface DashboardLayoutProps {
  children: React.ReactNode;
}

const DashboardLayout = ({ children }: DashboardLayoutProps) => {
  const navigate = useNavigate();
  const location = useLocation();
  const { toast } = useToast();

  const handleLogout = () => {
    toast({
      title: "Logged out",
      description: "You have been successfully logged out"
    });
    navigate('/login');
  };

  const handleMenuClick = (path: string) => {
    if (location.pathname === path) {
      // We're already on this page, so just stay here
      return;
    }
    
    if (path === "/dashboard" || path === "/dashboard/logs" || path === "/dashboard/reports") {
      navigate(path);
    } else {
      // For other pages that aren't implemented yet
      toast({
        title: "Coming Soon",
        description: "This feature is currently under development",
        variant: "default"
      });
    }
  };

  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full">
        <Sidebar variant="floating" className="border-r border-gray-200">
          <SidebarContent>
            <div className="p-4 flex items-center">
              <Shield className="h-6 w-6 text-blue-500 mr-2" />
              <h1 className="font-bold text-xl">SecureGuard</h1>
            </div>
            
            {/* Quick actions */}
            <div className="px-4 py-2">
              <div className="grid grid-cols-1 gap-2">
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
              </div>
            </div>
            
            <SidebarGroup>
              <SidebarGroupLabel>
                Main Navigation
              </SidebarGroupLabel>
              <SidebarGroupContent>
                <SidebarMenu>
                  <SidebarMenuItem>
                    <SidebarMenuButton
                      className={`flex items-center gap-3 px-4 py-2 hover:bg-gray-100 rounded-lg transition-colors ${
                        location.pathname === "/dashboard" ? "bg-gray-100 font-medium" : ""
                      }`}
                      onClick={() => handleMenuClick("/dashboard")}
                    >
                      <Home className="h-5 w-5" />
                      <span>Overview</span>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                  
                  <SidebarMenuItem>
                    <SidebarMenuButton
                      className={`flex items-center gap-3 px-4 py-2 hover:bg-gray-100 rounded-lg transition-colors ${
                        location.pathname === "/dashboard/logs" ? "bg-gray-100 font-medium" : ""
                      }`}
                      onClick={() => handleMenuClick("/dashboard/logs")}
                    >
                      <FileText className="h-5 w-5" />
                      <span>Detailed Logs</span>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                  
                  <SidebarMenuItem>
                    <SidebarMenuButton
                      className={`flex items-center gap-3 px-4 py-2 hover:bg-gray-100 rounded-lg transition-colors ${
                        location.pathname === "/dashboard/reports" ? "bg-gray-100 font-medium" : ""
                      }`}
                      onClick={() => handleMenuClick("/dashboard/reports")}
                    >
                      <BarChart className="h-5 w-5" />
                      <span>Reports</span>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                  
                  <SidebarMenuItem>
                    <SidebarMenuButton
                      className="flex items-center gap-3 px-4 py-2 hover:bg-gray-100 rounded-lg transition-colors"
                      onClick={() => handleMenuClick("/dashboard/settings")}
                    >
                      <Settings className="h-5 w-5" />
                      <span>Settings</span>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
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
        
        <main className="flex-1 bg-gray-50 p-6 overflow-auto">
          <div className="max-w-full mx-auto">
            {children}
          </div>
        </main>
      </div>
    </SidebarProvider>
  );
};

export default DashboardLayout;
