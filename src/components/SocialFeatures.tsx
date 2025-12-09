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
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { Badge } from "./ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs";
import { ScrollArea } from "./ui/scroll-area";
import {
  Users,
  Trophy,
  Share2,
  Crown,
  Medal,
  Search,
  UserPlus,
} from "lucide-react";
import { useUser } from "@/contexts/UserContext";
import { useToast } from "@/hooks/use-toast";

interface LeaderboardUser {
  id: string;
  name: string;
  level: number;
  xp: number;
  streak: number;
  totalMinutes: number;
  avatar?: string;
}

// Mock data - would come from Supabase
const mockLeaderboard: LeaderboardUser[] = [
  {
    id: "1",
    name: "Zen Master Alex",
    level: 15,
    xp: 22500,
    streak: 45,
    totalMinutes: 1250,
    avatar: "🧘",
  },
  {
    id: "2",
    name: "Peaceful Priya",
    level: 12,
    xp: 14400,
    streak: 30,
    totalMinutes: 980,
    avatar: "🌸",
  },
  {
    id: "3",
    name: "Calm Chris",
    level: 10,
    xp: 10000,
    streak: 21,
    totalMinutes: 750,
    avatar: "☮️",
  },
  {
    id: "4",
    name: "Mindful Maya",
    level: 9,
    xp: 8100,
    streak: 15,
    totalMinutes: 620,
    avatar: "🌙",
  },
  {
    id: "5",
    name: "Serene Sam",
    level: 8,
    xp: 6400,
    streak: 12,
    totalMinutes: 500,
    avatar: "🍃",
  },
];

export const SocialFeatures = () => {
  const { stats } = useUser();
  const { toast } = useToast();
  const [searchQuery, setSearchQuery] = useState("");
  const [friends, setFriends] = useState<LeaderboardUser[]>([]);

  const addFriend = (user: LeaderboardUser) => {
    if (!friends.find((f) => f.id === user.id)) {
      setFriends([...friends, user]);
      toast({
        title: "Friend Request Sent! 🤝",
        description: `You've sent a friend request to ${user.name}`,
      });
    }
  };

  const shareProgress = () => {
    const shareText = `I just reached Level ${stats.level} on CalmQuest! 🧘 ${stats.currentStreak} day streak 🔥`;

    if (navigator.share) {
      navigator
        .share({
          title: "My CalmQuest Progress",
          text: shareText,
        })
        .catch(() => {});
    } else {
      navigator.clipboard.writeText(shareText);
      toast({
        title: "Copied to Clipboard! 📋",
        description: "Share your progress with friends!",
      });
    }
  };

  const getRankBadge = (position: number) => {
    switch (position) {
      case 1:
        return <Crown className="h-5 w-5 text-yellow-500" />;
      case 2:
        return <Medal className="h-5 w-5 text-gray-400" />;
      case 3:
        return <Medal className="h-5 w-5 text-amber-700" />;
      default:
        return (
          <span className="text-sm font-bold text-muted-foreground">
            #{position}
          </span>
        );
    }
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="flex items-center gap-2">
                <Users className="h-6 w-6 text-purple-500" />
                Community & Social
              </CardTitle>
              <CardDescription>
                Connect with fellow meditators and share your journey
              </CardDescription>
            </div>
            <Button onClick={shareProgress} variant="outline">
              <Share2 className="mr-2 h-4 w-4" />
              Share Progress
            </Button>
          </div>
        </CardHeader>
      </Card>

      <Tabs defaultValue="leaderboard" className="w-full">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="leaderboard">
            <Trophy className="mr-2 h-4 w-4" />
            Leaderboard
          </TabsTrigger>
          <TabsTrigger value="friends">
            <Users className="mr-2 h-4 w-4" />
            Friends ({friends.length})
          </TabsTrigger>
          <TabsTrigger value="find">
            <Search className="mr-2 h-4 w-4" />
            Find Friends
          </TabsTrigger>
        </TabsList>

        {/* Leaderboard */}
        <TabsContent value="leaderboard">
          <Card>
            <CardHeader>
              <CardTitle>Global Leaderboard</CardTitle>
              <CardDescription>Top meditators this week</CardDescription>
            </CardHeader>
            <CardContent>
              <ScrollArea className="h-[500px]">
                <div className="space-y-3">
                  {mockLeaderboard.map((user, index) => (
                    <div
                      key={user.id}
                      className={`flex items-center gap-4 p-4 rounded-lg border-2 transition-all hover:shadow-md ${
                        index < 3
                          ? "bg-gradient-to-r from-purple-50 to-pink-50 border-purple-200"
                          : "bg-gray-50 border-gray-200"
                      }`}
                    >
                      <div className="flex items-center justify-center w-10">
                        {getRankBadge(index + 1)}
                      </div>

                      <Avatar className="h-12 w-12">
                        <AvatarFallback className="text-2xl">
                          {user.avatar}
                        </AvatarFallback>
                      </Avatar>

                      <div className="flex-1">
                        <div className="flex items-center gap-2">
                          <h4 className="font-semibold">{user.name}</h4>
                          <Badge variant="secondary">Level {user.level}</Badge>
                        </div>
                        <div className="flex gap-4 mt-1 text-sm text-muted-foreground">
                          <span>🔥 {user.streak} days</span>
                          <span>⏱️ {user.totalMinutes} min</span>
                          <span>⭐ {user.xp.toLocaleString()} XP</span>
                        </div>
                      </div>

                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => addFriend(user)}
                      >
                        <UserPlus className="h-4 w-4" />
                      </Button>
                    </div>
                  ))}
                </div>
              </ScrollArea>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Friends */}
        <TabsContent value="friends">
          <Card>
            <CardHeader>
              <CardTitle>Your Friends</CardTitle>
              <CardDescription>
                {friends.length === 0
                  ? "You haven't added any friends yet"
                  : `Meditating together with ${friends.length} friend${
                      friends.length > 1 ? "s" : ""
                    }`}
              </CardDescription>
            </CardHeader>
            <CardContent>
              {friends.length === 0 ? (
                <div className="text-center py-12">
                  <Users className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
                  <p className="text-muted-foreground">
                    Add friends to share your meditation journey!
                  </p>
                </div>
              ) : (
                <ScrollArea className="h-[500px]">
                  <div className="space-y-3">
                    {friends.map((friend) => (
                      <div
                        key={friend.id}
                        className="flex items-center gap-4 p-4 rounded-lg border bg-white hover:shadow-md transition-all"
                      >
                        <Avatar className="h-12 w-12">
                          <AvatarFallback className="text-2xl">
                            {friend.avatar}
                          </AvatarFallback>
                        </Avatar>

                        <div className="flex-1">
                          <div className="flex items-center gap-2">
                            <h4 className="font-semibold">{friend.name}</h4>
                            <Badge variant="secondary">
                              Level {friend.level}
                            </Badge>
                          </div>
                          <div className="flex gap-4 mt-1 text-sm text-muted-foreground">
                            <span>🔥 {friend.streak} day streak</span>
                            <span>⏱️ {friend.totalMinutes} minutes</span>
                          </div>
                        </div>

                        <Button variant="outline" size="sm">
                          View Profile
                        </Button>
                      </div>
                    ))}
                  </div>
                </ScrollArea>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        {/* Find Friends */}
        <TabsContent value="find">
          <Card>
            <CardHeader>
              <CardTitle>Find Friends</CardTitle>
              <CardDescription>
                Search for friends to connect with
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex gap-2">
                  <Input
                    placeholder="Search by username..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                  <Button>
                    <Search className="h-4 w-4" />
                  </Button>
                </div>

                <div className="space-y-3">
                  <h4 className="font-semibold text-sm text-muted-foreground">
                    Suggested Friends
                  </h4>
                  {mockLeaderboard.slice(0, 3).map((user) => (
                    <div
                      key={user.id}
                      className="flex items-center gap-4 p-4 rounded-lg border bg-white"
                    >
                      <Avatar className="h-10 w-10">
                        <AvatarFallback className="text-xl">
                          {user.avatar}
                        </AvatarFallback>
                      </Avatar>

                      <div className="flex-1">
                        <div className="flex items-center gap-2">
                          <h4 className="font-medium">{user.name}</h4>
                          <Badge variant="outline" className="text-xs">
                            Level {user.level}
                          </Badge>
                        </div>
                        <p className="text-xs text-muted-foreground">
                          {user.streak} day streak • {user.totalMinutes} min
                        </p>
                      </div>

                      <Button
                        variant="default"
                        size="sm"
                        onClick={() => addFriend(user)}
                      >
                        <UserPlus className="mr-2 h-4 w-4" />
                        Add Friend
                      </Button>
                    </div>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};
