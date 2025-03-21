
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { Sun, Moon, Monitor } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

type Theme = "light" | "dark" | "system";

const ThemeSettings = () => {
  const { toast } = useToast();
  const [theme, setTheme] = useState<Theme>(() => {
    // Get theme from localStorage or default to system
    const savedTheme = localStorage.getItem("theme") as Theme | null;
    return savedTheme || "system";
  });

  useEffect(() => {
    // Apply theme on component mount and theme changes
    applyTheme(theme);
    
    // Save to localStorage
    localStorage.setItem("theme", theme);
  }, [theme]);

  const applyTheme = (newTheme: Theme) => {
    const root = window.document.documentElement;
    
    // Remove existing theme classes
    root.classList.remove("light", "dark");
    
    // Apply new theme
    if (newTheme === "system") {
      const systemTheme = window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
      root.classList.add(systemTheme);
    } else {
      root.classList.add(newTheme);
    }
  };

  const handleThemeChange = (newTheme: Theme) => {
    setTheme(newTheme);
    toast({
      title: "Theme updated",
      description: `Theme set to ${newTheme === "system" ? "system default" : newTheme} mode.`,
    });
  };

  return (
    <div className="space-y-6">
      <Tabs value={theme} onValueChange={(value) => handleThemeChange(value as Theme)}>
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="light" className="flex items-center gap-2">
            <Sun className="h-4 w-4" />
            <span>Light</span>
          </TabsTrigger>
          <TabsTrigger value="dark" className="flex items-center gap-2">
            <Moon className="h-4 w-4" />
            <span>Dark</span>
          </TabsTrigger>
          <TabsTrigger value="system" className="flex items-center gap-2">
            <Monitor className="h-4 w-4" />
            <span>System</span>
          </TabsTrigger>
        </TabsList>
        
        <TabsContent value="light" className="mt-4">
          <div className="rounded-md border p-4">
            <p className="text-sm">
              Light theme applies a bright color scheme, ideal for use during daytime.
            </p>
          </div>
        </TabsContent>
        
        <TabsContent value="dark" className="mt-4">
          <div className="rounded-md border p-4">
            <p className="text-sm">
              Dark theme uses a darker color palette, reducing eye strain in low-light environments.
            </p>
          </div>
        </TabsContent>
        
        <TabsContent value="system" className="mt-4">
          <div className="rounded-md border p-4">
            <p className="text-sm">
              System automatically switches between light and dark themes based on your device settings.
            </p>
          </div>
        </TabsContent>
      </Tabs>
      
      <div className="rounded-md bg-muted p-4">
        <h3 className="font-medium mb-2">Theme Preview</h3>
        <div className="flex flex-wrap gap-4">
          <div className="w-full sm:w-auto flex-1 rounded-md border bg-background p-4 shadow-sm">
            <div className="h-4 w-3/4 rounded bg-primary mb-2"></div>
            <div className="h-3 w-1/2 rounded bg-muted-foreground/30"></div>
          </div>
          <div className="w-full sm:w-auto flex-1 rounded-md border bg-card p-4 shadow-sm">
            <div className="h-4 w-3/4 rounded bg-primary mb-2"></div>
            <div className="h-3 w-1/2 rounded bg-muted-foreground/30"></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ThemeSettings;
