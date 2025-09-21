import { useUser } from "@clerk/clerk-expo";
import { Redirect, Stack } from "expo-router";
import React from "react";

const AuthLayout = () => {
  const { isSignedIn } = useUser();

  if (isSignedIn) return <Redirect href="/(chat)" />;

  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name="index" />
      <Stack.Screen name="sign-in" />
      <Stack.Screen name="sign-up" />
    </Stack>
  );
};

export default AuthLayout;
