
import { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useToast } from "@/hooks/use-toast";
import { User, Upload, UserCog, Shield } from "lucide-react";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";

const profileSchema = z.object({
  firstName: z.string().min(1, "First name is required"),
  lastName: z.string().min(1, "Last name is required"),
  email: z.string().email("Please enter a valid email"),
  role: z.enum(["user", "admin", "manager"]),
});

type ProfileFormValues = z.infer<typeof profileSchema>;

const ManageProfile = () => {
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isAdmin, setIsAdmin] = useState(true); // Mock current user is admin
  const [avatarSrc, setAvatarSrc] = useState("/placeholder.svg");
  const [notifications, setNotifications] = useState({
    email: true,
    push: false,
    security: true,
  });

  const form = useForm<ProfileFormValues>({
    resolver: zodResolver(profileSchema),
    defaultValues: {
      firstName: "John",
      lastName: "Doe",
      email: "john.doe@example.com",
      role: "admin",
    },
  });

  const onSubmit = async (data: ProfileFormValues) => {
    setIsSubmitting(true);
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      toast({
        title: "Profile updated",
        description: "Your profile information has been updated successfully.",
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "There was a problem updating your profile.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleAvatarChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;
    
    // Create a URL for the selected image
    const imageUrl = URL.createObjectURL(file);
    setAvatarSrc(imageUrl);
    
    toast({
      title: "Avatar updated",
      description: "Your profile picture has been updated.",
    });
  };

  return (
    <div className="space-y-8">
      <div className="flex flex-col sm:flex-row gap-6 items-start sm:items-center">
        <Avatar className="w-20 h-20 border">
          <AvatarImage src={avatarSrc} alt="Profile" />
          <AvatarFallback>
            <User className="h-8 w-8 text-muted-foreground" />
          </AvatarFallback>
        </Avatar>
        
        <div className="space-y-2">
          <h3 className="text-lg font-medium">Profile Picture</h3>
          <p className="text-sm text-muted-foreground">
            Upload a new profile picture. JPG or PNG. Max size 2MB.
          </p>
          <div className="flex gap-4">
            <Button variant="outline" className="mt-2" asChild>
              <label className="cursor-pointer flex items-center gap-2">
                <Upload className="h-4 w-4" />
                Change Avatar
                <input 
                  type="file" 
                  onChange={handleAvatarChange} 
                  accept="image/png, image/jpeg" 
                  className="sr-only"
                />
              </label>
            </Button>
          </div>
        </div>
      </div>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <div className="grid gap-6 sm:grid-cols-2">
            <FormField
              control={form.control}
              name="firstName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>First Name</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter your first name" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <FormField
              control={form.control}
              name="lastName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Last Name</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter your last name" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input placeholder="Enter your email" type="email" {...field} />
                </FormControl>
                <FormDescription>
                  Your email address is used for notifications and account recovery.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          
          <FormField
            control={form.control}
            name="role"
            render={({ field }) => (
              <FormItem>
                <FormLabel>User Role</FormLabel>
                <Select 
                  onValueChange={field.onChange} 
                  defaultValue={field.value}
                  disabled={!isAdmin}
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select a role" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="user">User</SelectItem>
                    <SelectItem value="manager">Manager</SelectItem>
                    <SelectItem value="admin">Administrator</SelectItem>
                  </SelectContent>
                </Select>
                {!isAdmin && (
                  <FormDescription>
                    Only administrators can change user roles.
                  </FormDescription>
                )}
                <FormMessage />
              </FormItem>
            )}
          />
          
          <div className="border rounded-md p-4 space-y-4">
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label className="text-base">Notification Preferences</Label>
                <FormDescription>
                  Manage how you receive notifications from RansomShield.
                </FormDescription>
              </div>
            </div>
            
            <div className="space-y-4">
              <div className="flex flex-row items-center justify-between rounded-lg border p-3">
                <div className="space-y-0.5">
                  <Label htmlFor="email-notifications">Email Notifications</Label>
                  <FormDescription>
                    Receive security alerts and updates via email.
                  </FormDescription>
                </div>
                <Switch
                  id="email-notifications"
                  checked={notifications.email}
                  onCheckedChange={(checked) => 
                    setNotifications({ ...notifications, email: checked })
                  }
                />
              </div>
              
              <div className="flex flex-row items-center justify-between rounded-lg border p-3">
                <div className="space-y-0.5">
                  <Label htmlFor="push-notifications">Push Notifications</Label>
                  <FormDescription>
                    Receive real-time alerts on your device.
                  </FormDescription>
                </div>
                <Switch
                  id="push-notifications"
                  checked={notifications.push}
                  onCheckedChange={(checked) => 
                    setNotifications({ ...notifications, push: checked })
                  }
                />
              </div>
              
              <div className="flex flex-row items-center justify-between rounded-lg border p-3">
                <div className="space-y-0.5">
                  <Label htmlFor="security-notifications">Security Alerts</Label>
                  <FormDescription>
                    Critical security notifications cannot be disabled.
                  </FormDescription>
                </div>
                <Switch
                  id="security-notifications"
                  checked={notifications.security}
                  disabled
                />
              </div>
            </div>
          </div>
          
          <div className="flex justify-end">
            <Button 
              type="submit" 
              disabled={isSubmitting}
              className="flex items-center gap-2"
            >
              {isAdmin ? <UserCog className="h-4 w-4" /> : <User className="h-4 w-4" />}
              {isSubmitting ? "Saving..." : "Save Changes"}
            </Button>
          </div>
        </form>
      </Form>
      
      {isAdmin && (
        <div className="border rounded-md p-4 bg-muted/50">
          <div className="flex items-center gap-2 text-amber-600">
            <Shield className="h-5 w-5" />
            <h3 className="font-medium">Administrator Privileges</h3>
          </div>
          <p className="text-sm text-muted-foreground mt-1">
            As an administrator, you can manage user roles and access controls across the system.
          </p>
        </div>
      )}
    </div>
  );
};

export default ManageProfile;
