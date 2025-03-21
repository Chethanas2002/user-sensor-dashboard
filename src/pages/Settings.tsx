
import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import DashboardLayout from "@/components/DashboardLayout";
import ChangePassword from "@/components/settings/ChangePassword";
import ThemeSettings from "@/components/settings/ThemeSettings";
import ManageProfile from "@/components/settings/ManageProfile";
import { Button } from "@/components/ui/button";
import { LockIcon, PaletteIcon, UserIcon } from "lucide-react";

const Settings = () => {
  const [activeTab, setActiveTab] = useState<string | null>(null);

  const renderContent = () => {
    if (!activeTab) {
      return (
        <Card className="mt-6">
          <CardHeader>
            <CardTitle>Settings</CardTitle>
            <CardDescription>
              Select a settings category to manage your preferences.
            </CardDescription>
          </CardHeader>
        </Card>
      );
    }

    return (
      <Card className="mt-6">
        <CardHeader>
          <CardTitle>
            {activeTab === "password" && "Change Password"}
            {activeTab === "theme" && "Theme"}
            {activeTab === "profile" && "Manage Profile"}
          </CardTitle>
          <CardDescription>
            {activeTab === "password" && "Update your password to keep your account secure."}
            {activeTab === "theme" && "Customize your interface theme preferences."}
            {activeTab === "profile" && "Manage your personal information and account details."}
          </CardDescription>
        </CardHeader>
        <CardContent>
          {activeTab === "password" && <ChangePassword />}
          {activeTab === "theme" && <ThemeSettings />}
          {activeTab === "profile" && <ManageProfile />}
        </CardContent>
      </Card>
    );
  };

  const handleBackToOptions = () => {
    setActiveTab(null);
  };

  return (
    <DashboardLayout>
      <div className="container mx-auto py-6">
        <div className="mb-6 flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold">Settings</h1>
            <p className="text-muted-foreground">Manage your account settings and preferences.</p>
          </div>
          {activeTab && (
            <Button variant="outline" onClick={handleBackToOptions}>
              Back to Settings
            </Button>
          )}
        </div>

        {!activeTab ? (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Button 
              onClick={() => setActiveTab("password")} 
              className="flex items-center justify-center p-8 h-auto" 
              variant="outline"
            >
              <div className="flex flex-col items-center gap-2">
                <LockIcon className="h-6 w-6" />
                <span className="text-lg font-medium">Change Password</span>
              </div>
            </Button>
            <Button 
              onClick={() => setActiveTab("theme")} 
              className="flex items-center justify-center p-8 h-auto" 
              variant="outline"
            >
              <div className="flex flex-col items-center gap-2">
                <PaletteIcon className="h-6 w-6" />
                <span className="text-lg font-medium">Theme</span>
              </div>
            </Button>
            <Button 
              onClick={() => setActiveTab("profile")} 
              className="flex items-center justify-center p-8 h-auto" 
              variant="outline"
            >
              <div className="flex flex-col items-center gap-2">
                <UserIcon className="h-6 w-6" />
                <span className="text-lg font-medium">Manage Profile</span>
              </div>
            </Button>
          </div>
        ) : (
          renderContent()
        )}
      </div>
    </DashboardLayout>
  );
};

export default Settings;
