import { IconSymbol } from "@/components/IconSymbol";
import { Colors } from "@/constants/colors";
import { useUser } from "@clerk/clerk-expo";
import { Link, Redirect, Stack } from "expo-router";
import React from "react";
import { Image } from "react-native";

const AppLayout = () => {
  const { isSignedIn } = useUser();
  const { user } = useUser();

  if (!isSignedIn) return <Redirect href="/(chat)" />;

  return (
    <Stack>
      <Stack.Screen
        name="index"
        options={{
          headerTitle: "Chat Rooms",
          headerLargeTitle: true,
          headerStyle: {
            backgroundColor: Colors.background.middle,
          },

          headerLeft: () => (
            <Link href="/(chat)/profile">
              <Image
                source={{
                  uri: user?.imageUrl,
                }}
                style={{ width: 40, height: 40, borderRadius: 50 }}
              />
            </Link>
          ),
          headerRight: () => (
            <Link href="/(chat)/new-chat">
              <IconSymbol name="plus" />
            </Link>
          ),
        }}
      />
      <Stack.Screen
        name="profile"
        options={{
          presentation: "modal",
          headerShown: true,
          title: "Profile",
          headerStyle: {
            backgroundColor: Colors.background.middle,
          },

          headerLeft: () => (
            <Link href="/" dismissTo>
              <IconSymbol name="chevron.left" />
            </Link>
          ),
        }}
      />
      <Stack.Screen
        name="new-chat"
        options={{
          presentation: "modal",
          headerShown: true,
          title: "New Chat",
          headerStyle: {
            backgroundColor: Colors.background.middle,
          },
          headerLeft: () => (
            <Link href="/" dismissTo>
              <IconSymbol name="chevron.left" />
            </Link>
          ),
        }}
      />
      {/* Set title to empty string to prevent showing [chat] in the header while chat room title is being fetched */}
      <Stack.Screen
        name="[chat]"
        options={{
          headerTitle: "",
          headerStyle: {
            backgroundColor: Colors.background.middle,
          },
        }}
      />
      <Stack.Screen
        name="settings/[chat]"
        options={{
          presentation: "modal",
          headerTitle: "Room Settings",
          headerStyle: {
            backgroundColor: Colors.background.middle,
          },
        }}
      />
    </Stack>
  );
};

export default AppLayout;
