import { useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "./ui/card";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Switch } from "./ui/switch";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";
import { Bell, User, Volume2, Download, Trash2, Shield } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { useTheme } from "@/contexts/ThemeContext";

export const Settings = () => {
  const { toast } = useToast();
  const { theme, setTheme } = useTheme();
  const [notifications, setNotifications] = useState({
    daily: true,
    streak: true,
    achievements: true,
    challenges: false,
  });
  const [sounds, setSounds] = useState({
    enabled: true,
    volume: 70,
    autoplay: false,
  });

  const handleExportData = () => {
    const data = {
      stats: localStorage.getItem("meditation-stats"),
      journal: localStorage.getItem("meditation-journal"),
      challenges: localStorage.getItem("daily-challenges"),
      preferences: localStorage.getItem("calm-quest-theme"),
    };

    const blob = new Blob([JSON.stringify(data, null, 2)], {
      type: "application/json",
    });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `calmquest-data-${
      new Date().toISOString().split("T")[0]
    }.json`;
    a.click();

    toast({
      title: "Data Exported!",
      description: "Your meditation data has been downloaded.",
    });
  };

  const handleClearData = () => {
    if (confirm("Are you sure? This will delete all your local data.")) {
      localStorage.clear();
      toast({
        title: "Data Cleared",
        description: "All local data has been removed.",
        variant: "destructive",
      });
    }
  };

  return (
    <div className="space-y-6">
      <Tabs defaultValue="notifications" className="w-full">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="notifications">
            <Bell className="mr-2 h-4 w-4" />
            Notifications
          </TabsTrigger>
          <TabsTrigger value="profile">
            <User className="mr-2 h-4 w-4" />
            Profile
          </TabsTrigger>
          <TabsTrigger value="sounds">
            <Volume2 className="mr-2 h-4 w-4" />
            Sounds
          </TabsTrigger>
          <TabsTrigger value="data">
            <Download className="mr-2 h-4 w-4" />
            Data
          </TabsTrigger>
        </TabsList>

        {/* Notifications */}
        <TabsContent value="notifications">
          <Card className="zen-card">
            <CardHeader>
              <CardTitle>Notification Preferences</CardTitle>
              <CardDescription>
                Manage how and when you receive notifications
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label>Daily Reminders</Label>
                  <p className="text-sm text-muted-foreground">
                    Get reminded to meditate each day
                  </p>
                </div>
                <Switch
                  checked={notifications.daily}
                  onCheckedChange={(checked) =>
                    setNotifications({ ...notifications, daily: checked })
                  }
                />
              </div>

              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label>Streak Alerts</Label>
                  <p className="text-sm text-muted-foreground">
                    Protect your streak with timely alerts
                  </p>
                </div>
                <Switch
                  checked={notifications.streak}
                  onCheckedChange={(checked) =>
                    setNotifications({ ...notifications, streak: checked })
                  }
                />
              </div>

              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label>Achievement Unlocks</Label>
                  <p className="text-sm text-muted-foreground">
                    Celebrate when you unlock achievements
                  </p>
                </div>
                <Switch
                  checked={notifications.achievements}
                  onCheckedChange={(checked) =>
                    setNotifications({
                      ...notifications,
                      achievements: checked,
                    })
                  }
                />
              </div>

              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label>Daily Challenges</Label>
                  <p className="text-sm text-muted-foreground">
                    Notification when new challenges are available
                  </p>
                </div>
                <Switch
                  checked={notifications.challenges}
                  onCheckedChange={(checked) =>
                    setNotifications({ ...notifications, challenges: checked })
                  }
                />
              </div>

              <div className="pt-4 border-t">
                <Label className="mb-2 block">Reminder Time</Label>
                <Select defaultValue="19:00">
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="07:00">7:00 AM</SelectItem>
                    <SelectItem value="12:00">12:00 PM</SelectItem>
                    <SelectItem value="19:00">7:00 PM</SelectItem>
                    <SelectItem value="21:00">9:00 PM</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Profile */}
        <TabsContent value="profile">
          <Card className="zen-card">
            <CardHeader>
              <CardTitle>Profile Settings</CardTitle>
              <CardDescription>
                Customize your account and preferences
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="displayName">Display Name</Label>
                <Input id="displayName" placeholder="Enter your name" />
              </div>

              <div className="space-y-2">
                <Label htmlFor="theme">App Theme</Label>
                <Select
                  value={theme}
                  onValueChange={(value) =>
                    setTheme(value as "light" | "dark" | "system")
                  }
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="light">Light</SelectItem>
                    <SelectItem value="dark">Dark</SelectItem>
                    <SelectItem value="system">System</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="language">Language</Label>
                <Select defaultValue="en">
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="en">English</SelectItem>
                    <SelectItem value="es">Español</SelectItem>
                    <SelectItem value="fr">Français</SelectItem>
                    <SelectItem value="de">Deutsch</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <Button className="w-full">Save Changes</Button>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Sounds */}
        <TabsContent value="sounds">
          <Card className="zen-card">
            <CardHeader>
              <CardTitle>Sound Settings</CardTitle>
              <CardDescription>Configure audio preferences</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label>Enable Sounds</Label>
                  <p className="text-sm text-muted-foreground">
                    Play sound effects and notifications
                  </p>
                </div>
                <Switch
                  checked={sounds.enabled}
                  onCheckedChange={(checked) =>
                    setSounds({ ...sounds, enabled: checked })
                  }
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="volume-slider">Default Volume</Label>
                <div className="flex items-center gap-4">
                  <input
                    id="volume-slider"
                    type="range"
                    min="0"
                    max="100"
                    value={sounds.volume}
                    onChange={(e) =>
                      setSounds({ ...sounds, volume: parseInt(e.target.value) })
                    }
                    className="flex-1"
                    aria-label="Volume slider"
                  />
                  <span className="text-sm w-12">{sounds.volume}%</span>
                </div>
              </div>

              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label>Autoplay Background</Label>
                  <p className="text-sm text-muted-foreground">
                    Start ambient sounds automatically
                  </p>
                </div>
                <Switch
                  checked={sounds.autoplay}
                  onCheckedChange={(checked) =>
                    setSounds({ ...sounds, autoplay: checked })
                  }
                />
              </div>

              <div className="space-y-2">
                <Label>Default Sound Preset</Label>
                <Select defaultValue="forest">
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="forest">🌲 Rainy Forest</SelectItem>
                    <SelectItem value="beach">🏖️ Beach Day</SelectItem>
                    <SelectItem value="cozy">🔥 Cozy Night</SelectItem>
                    <SelectItem value="nature">🌳 Nature Walk</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Data */}
        <TabsContent value="data">
          <Card className="zen-card">
            <CardHeader>
              <CardTitle>Data Management</CardTitle>
              <CardDescription>
                Export, import, or clear your data
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="p-4 bg-muted/50 rounded-lg">
                <div className="flex items-start gap-3">
                  <Shield className="h-5 w-5 text-primary mt-1" />
                  <div>
                    <p className="font-semibold text-sm">Privacy Notice</p>
                    <p className="text-xs text-muted-foreground mt-1">
                      Your data is stored locally on your device. Export it to
                      back up or transfer to another device.
                    </p>
                  </div>
                </div>
              </div>

              <div className="space-y-3">
                <Button
                  onClick={handleExportData}
                  variant="outline"
                  className="w-full justify-start"
                >
                  <Download className="mr-2 h-4 w-4" />
                  Export All Data
                </Button>

                <Button
                  variant="outline"
                  className="w-full justify-start"
                  onClick={() => {
                    const input = document.createElement("input");
                    input.type = "file";
                    input.accept = ".json";
                    input.onchange = (e) => {
                      const target = e.target as HTMLInputElement;
                      const file = target.files?.[0];
                      const reader = new FileReader();
                      reader.onload = (event) => {
                        try {
                          const data = JSON.parse(
                            event.target?.result as string
                          );
                          Object.entries(data).forEach(([key, value]) => {
                            if (value)
                              localStorage.setItem(key, value as string);
                          });
                          toast({
                            title: "Data Imported!",
                            description: "Your data has been restored.",
                          });
                        } catch (error) {
                          toast({
                            title: "Import Failed",
                            description: "Invalid data file.",
                            variant: "destructive",
                          });
                        }
                      };
                      reader.readAsText(file);
                    };
                    input.click();
                  }}
                >
                  <Download className="mr-2 h-4 w-4 rotate-180" />
                  Import Data
                </Button>

                <div className="pt-4 border-t">
                  <Button
                    onClick={handleClearData}
                    variant="destructive"
                    className="w-full justify-start"
                  >
                    <Trash2 className="mr-2 h-4 w-4" />
                    Clear All Data
                  </Button>
                  <p className="text-xs text-muted-foreground mt-2">
                    This will permanently delete all your meditation data,
                    journal entries, and settings.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};
