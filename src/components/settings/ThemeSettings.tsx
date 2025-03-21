
import { useEffect, useState } from "react";
import { useToast } from "@/hooks/use-toast";
import { Sun, Moon, Monitor } from "lucide-react";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";

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
      <div className="flex flex-col space-y-4">
        <ToggleGroup 
          type="single" 
          value={theme} 
          onValueChange={(value) => value && handleThemeChange(value as Theme)}
          className="justify-center"
        >
          <ToggleGroupItem value="light" aria-label="Light Mode" className="flex flex-1 items-center justify-center gap-2 py-6">
            <Sun className="h-5 w-5" />
            <span className="font-medium">Light</span>
          </ToggleGroupItem>
          <ToggleGroupItem value="dark" aria-label="Dark Mode" className="flex flex-1 items-center justify-center gap-2 py-6">
            <Moon className="h-5 w-5" />
            <span className="font-medium">Dark</span>
          </ToggleGroupItem>
          <ToggleGroupItem value="system" aria-label="System Mode" className="flex flex-1 items-center justify-center gap-2 py-6">
            <Monitor className="h-5 w-5" />
            <span className="font-medium">System</span>
          </ToggleGroupItem>
        </ToggleGroup>
        
        <div className="rounded-md border p-4 bg-card">
          <p className="text-sm mb-2">
            {theme === "light" && "Light theme applies a bright color scheme, ideal for use during daytime."}
            {theme === "dark" && "Dark theme uses a darker color palette, reducing eye strain in low-light environments."}
            {theme === "system" && "System automatically switches between light and dark themes based on your device settings."}
          </p>
        </div>
      </div>
      
      <div className="rounded-lg overflow-hidden border">
        <div className="bg-muted p-4 font-medium border-b">Theme Preview</div>
        <div className="p-6 space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="rounded-md bg-background p-4 border shadow-sm h-24 flex flex-col justify-center items-center">
              <div className="w-3/4 h-3 rounded bg-primary mb-2"></div>
              <div className="w-1/2 h-2 rounded bg-muted-foreground/50"></div>
            </div>
            <div className="rounded-md bg-card p-4 border shadow-sm h-24 flex flex-col justify-center items-center">
              <div className="w-3/4 h-3 rounded bg-primary mb-2"></div>
              <div className="w-1/2 h-2 rounded bg-muted-foreground/50"></div>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="flex flex-col gap-2">
              <div className="h-8 rounded-md border flex items-center px-3 bg-input text-sm">Input field</div>
              <div className="h-8 rounded-md flex items-center justify-center bg-primary text-primary-foreground text-sm">Button</div>
            </div>
            <div className="flex flex-col gap-2">
              <div className="p-3 rounded-md border bg-card">
                <p className="text-xs text-card-foreground">Card content</p>
              </div>
              <div className="h-2 rounded-full bg-muted"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ThemeSettings;
