import BaseLayout from "@/components/BaseLayout";
import { Button } from "@/components/Button";
import { Text } from "@/components/Text";
import { Colors, GlassStyles } from "@/constants/colors";
import { useAuth, useUser } from "@clerk/clerk-expo";
import React from "react";
import { Alert, Image, ScrollView, View } from "react-native";

const Profile = () => {
  const { user } = useUser();
  const { signOut } = useAuth();

  const handleSignOut = () => {
    Alert.alert("Sign Out", "Are you sure you want to sign out?", [
      {
        text: "Cancel",
        style: "cancel",
      },
      {
        text: "Sign Out",
        style: "destructive",
        onPress: () => signOut(),
      },
    ]);
  };

  return (
    <BaseLayout>
      <ScrollView style={{ flex: 1, padding: 20 }}>
        <View
          style={{
            backgroundColor: Colors.glass.secondary,
            borderWidth: 1,
            borderColor: Colors.border.light,
            borderRadius: 20,
            padding: 25,
            alignItems: "center",
            marginBottom: 20,
            ...GlassStyles.shadow,
          }}
        >
          {user?.imageUrl && (
            <Image
              source={{ uri: user.imageUrl }}
              style={{
                width: 120,
                height: 120,
                borderRadius: 60,
                marginBottom: 15,
                borderWidth: 3,
                borderColor: Colors.border.primary,
              }}
            />
          )}
          <Text
            style={{
              fontSize: 24,
              fontWeight: "bold",
              color: Colors.text.primary,
              marginBottom: 5,
              textAlign: "center",
            }}
          >
            {user?.fullName || user?.firstName || "User"}
          </Text>
          <Text
            style={{
              fontSize: 16,
              color: Colors.text.secondary,
              textAlign: "center",
            }}
          >
            {user?.primaryEmailAddress?.emailAddress}
          </Text>
        </View>

        {/* Account Info */}
        <View
          style={{
            backgroundColor: Colors.glass.secondary,
            borderWidth: 1,
            borderColor: Colors.border.light,
            borderRadius: 15,
            padding: 20,
            marginBottom: 20,
            ...GlassStyles.shadow,
          }}
        >
          <Text
            style={{
              fontSize: 18,
              fontWeight: "600",
              color: Colors.text.primary,
              marginBottom: 15,
            }}
          >
            Account Information
          </Text>

          <View style={{ gap: 12 }}>
            <View>
              <Text
                style={{
                  fontSize: 14,
                  color: Colors.text.tertiary,
                  marginBottom: 4,
                }}
              >
                Member Since
              </Text>
              <Text
                style={{
                  fontSize: 16,
                  color: Colors.text.primary,
                }}
              >
                {user?.createdAt
                  ? new Date(user.createdAt).toLocaleDateString("en-US", {
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                    })
                  : "Unknown"}
              </Text>
            </View>

            <View>
              <Text
                style={{
                  fontSize: 14,
                  color: Colors.text.tertiary,
                  marginBottom: 4,
                }}
              >
                User ID
              </Text>
              <Text
                style={{
                  fontSize: 16,
                  color: Colors.text.primary,
                  fontFamily: "monospace",
                }}
              >
                {user?.id}
              </Text>
            </View>
          </View>
        </View>

        {/* App Settings */}
        <View
          style={{
            backgroundColor: Colors.glass.secondary,
            borderWidth: 1,
            borderColor: Colors.border.light,
            borderRadius: 15,
            padding: 20,
            marginBottom: 30,
            ...GlassStyles.shadow,
          }}
        >
          <Text
            style={{
              fontSize: 18,
              fontWeight: "600",
              color: Colors.text.primary,
              marginBottom: 15,
            }}
          >
            App Information
          </Text>

          <Text
            style={{
              fontSize: 14,
              color: Colors.text.secondary,
              lineHeight: 20,
              textAlign: "center",
            }}
          >
            Modern Chat App v1.0.0{"\n"}
            Built with React Native &amp; Expo
          </Text>
        </View>

        {/* Sign Out Button */}
        <Button
          onPress={handleSignOut}
          style={{
            backgroundColor: "rgba(255, 59, 48, 0.15)",
            borderWidth: 1,
            borderColor: "rgba(255, 59, 48, 0.3)",
            ...GlassStyles.shadow,
          }}
        >
          <Text
            style={{
              color: "#FF6B6B",
              fontWeight: "600",
              fontSize: 16,
            }}
          >
            Sign Out
          </Text>
        </Button>
      </ScrollView>
    </BaseLayout>
  );
};

export default Profile;
