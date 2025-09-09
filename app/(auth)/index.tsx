import { Button } from "@/components/Button";
import { Text } from "@/components/Text";
import { isClerkAPIResponseError, useSSO } from "@clerk/clerk-expo";
import { ClerkAPIError } from "@clerk/types";
import * as AuthSession from "expo-auth-session";
import { router } from "expo-router";
import React, { useState } from "react";
import { Image, SafeAreaView, View } from "react-native";

const SignIn = () => {
  const { startSSOFlow } = useSSO();
  const [erros, setErros] = useState<ClerkAPIError[]>([]);

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
        setErros(error.errors);
      }
      console.error(error);
    }
  };
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View style={{ padding: 16, flex: 1 }}>
        <View style={{ justifyContent: "center", alignItems: "center" }}>
          <Image
            source={require("@/assets/images/logo (1).png")}
            style={{ width: 200, height: 200 }}
          />
          <Text style={{ fontSize: 32, fontWeight: "bold", marginBottom: 20 }}>
            Modern Chat App
          </Text>
          <Text style={{ fontSize: 16 }}>The best chat app in the world</Text>
        </View>

        <View style={{ flex: 1 }} />

        <View>
          <View style={{ flexDirection: "row", gap: 10 }}>
            <Button
              onPress={() => router.push("/(auth)/sign-up")}
              style={{ flex: 1 }}
            >
              Sign Up
            </Button>
            <Button
              onPress={() => router.push("/(auth)/sign-in")}
              style={{ flex: 1 }}
            >
              Sign In
            </Button>
          </View>

          <Button
            style={{
              flexDirection: "row",
              gap: 10,
              alignItems: "center",
              marginTop: 20,
              justifyContent: "center",
            }}
            onPress={handleSignInWithEmail}
          >
            <Image
              source={require("@/assets/images/google-icon.png")}
              style={{ width: 20, height: 20 }}
            />
            <Text style={{ color: "black", fontWeight: "500" }}>
              Sign in with Google
            </Text>
          </Button>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default SignIn;
