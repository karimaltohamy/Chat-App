import BaseLayout from "@/components/BaseLayout";
import { Button } from "@/components/Button";
import { Text } from "@/components/Text";
import { Colors, GlassStyles } from "@/constants/colors";
import { isClerkAPIResponseError, useSSO } from "@clerk/clerk-expo";
import { ClerkAPIError } from "@clerk/types";
import * as AuthSession from "expo-auth-session";
import { router } from "expo-router";
import React, { useState } from "react";
import { Image, View } from "react-native";

const SignIn = () => {
  const { startSSOFlow } = useSSO();
  const [errors, setErrors] = useState<ClerkAPIError[]>([]);

  const handleSignInWithEmail = async () => {
    try {
      const { createdSessionId, setActive } = await startSSOFlow({
        strategy: "oauth_google",
        redirectUrl: AuthSession.makeRedirectUri(),
      });

      if (createdSessionId) {
        setActive!({ session: createdSessionId });
      } else {
        // if no session is created, the user might need to complete additional steps
      }
    } catch (error) {
      if (isClerkAPIResponseError(error)) {
        setErrors(error.errors);
      }
      console.error(error);
    }
  };
  return (
    <BaseLayout>
      <View style={{ padding: 20, flex: 1 }}>
        <View style={{ justifyContent: "center", alignItems: "center", flex: 1 }}>
          <Image
            source={require("@/assets/images/logo (1).png")}
            style={{ width: 200, height: 200 }}
          />
          <Text style={{ 
            fontSize: 32, 
            fontWeight: "bold", 
            marginBottom: 20,
            color: Colors.text.primary,
            textAlign: "center"
          }}>
            Modern Chat App
          </Text>
          <Text style={{ 
            fontSize: 16, 
            color: Colors.text.secondary,
            textAlign: "center"
          }}>
            The best chat app in the world
          </Text>
        </View>

        <View style={{ marginBottom: 40 }}>
          <View style={{ flexDirection: "row", gap: 15, marginBottom: 20 }}>
            <Button
              onPress={() => router.push("/(auth)/sign-up")}
              style={{ 
                flex: 1,
                backgroundColor: Colors.glass.secondary,
                borderWidth: 1,
                borderColor: Colors.border.light,
                ...GlassStyles.shadow,
              }}
            >
              <Text style={{ color: Colors.text.primary, fontWeight: "600" }}>
                Sign Up
              </Text>
            </Button>
            <Button
              onPress={() => router.push("/(auth)/sign-in")}
              style={{ 
                flex: 1,
                backgroundColor: Colors.glass.primary,
                borderWidth: 1,
                borderColor: Colors.border.primary,
                ...GlassStyles.shadow,
              }}
            >
              <Text style={{ color: Colors.text.primary, fontWeight: "600" }}>
                Sign In
              </Text>
            </Button>
          </View>

          <Button
            style={{
              flexDirection: "row",
              gap: 10,
              alignItems: "center",
              justifyContent: "center",
              backgroundColor: Colors.glass.light,
              borderWidth: 1,
              borderColor: Colors.border.medium,
              ...GlassStyles.shadow,
            }}
            onPress={handleSignInWithEmail}
          >
            <Image
              source={require("@/assets/images/google-icon.png")}
              style={{ width: 20, height: 20 }}
            />
            <Text style={{ color: Colors.text.primary, fontWeight: "500" }}>
              Sign in with Google
            </Text>
          </Button>
        </View>
      </View>
    </BaseLayout>
  );
};

export default SignIn;
