import BaseLayout from "@/components/BaseLayout";
import { Button } from "@/components/Button";
import Input from "@/components/Input";
import { Text } from "@/components/Text";
import { Colors, GlassStyles } from "@/constants/colors";
import { useSignIn } from "@clerk/clerk-expo";
import { ClerkAPIError } from "@clerk/types";
import React, { useState } from "react";
import {
  Alert,
  Image,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  View,
} from "react-native";

const SignInWithEmail = () => {
  const { signIn, setActive, isLoaded } = useSignIn();
  const [errors, setErrors] = useState<ClerkAPIError[]>([]);
  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const handleSignInWithEmail = async () => {
    if (!isLoaded) return;

    try {
      const result = await signIn.create({
        identifier: form.email,
        password: form.password,
      });

      if (result.status === "complete") {
        await setActive({ session: result.createdSessionId });
        Alert.alert("Success", "Signed in successfully!");
      } else {
        console.log("Additional steps required:", result);
      }
    } catch (err: any) {
      console.error("Sign in error:", err.errors);
      setErrors(err.errors);
    }
  };

  return (
    <BaseLayout>
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={{ flex: 1 }}
      >
        <ScrollView style={{ flex: 1 }}>
          <View style={{ padding: 20, flex: 1 }}>
            <View
              style={{
                justifyContent: "center",
                alignItems: "center",
                marginTop: 40,
              }}
            >
              <Image
                source={require("@/assets/images/logo (1).png")}
                style={{ width: 150, height: 150 }}
              />
              <Text
                style={{
                  fontSize: 28,
                  fontWeight: "bold",
                  marginBottom: 10,
                  color: Colors.text.primary,
                  textAlign: "center",
                }}
              >
                Welcome Back
              </Text>
              <Text
                style={{
                  fontSize: 16,
                  color: Colors.text.secondary,
                  textAlign: "center",
                  marginBottom: 30,
                }}
              >
                Sign in to continue chatting 🚀
              </Text>
            </View>

            {/* fields */}
            <View style={{ gap: 15 }}>
              <Input
                label="Email"
                value={form.email}
                onChangeText={(value) => setForm({ ...form, email: value })}
                name="email"
                placeholder="Enter your email"
                type="email"
              />
              <Input
                label="Password"
                value={form.password}
                onChangeText={(value) => setForm({ ...form, password: value })}
                name="password"
                placeholder="Enter your password"
                type="password"
                secureTextEntry
              />

              <Button
                onPress={handleSignInWithEmail}
                style={{
                  marginTop: 10,
                  backgroundColor: Colors.glass.primary,
                  borderWidth: 1,
                  borderColor: Colors.border.primary,
                  ...GlassStyles.shadow,
                }}
              >
                <Text
                  style={{
                    color: Colors.text.primary,
                    fontWeight: "600",
                    margin: "auto",
                  }}
                >
                  Sign In
                </Text>
              </Button>

              {errors.length > 0 && (
                <View
                  style={{
                    marginTop: 15,
                    backgroundColor: Colors.glass.dark,
                    borderWidth: 1,
                    borderColor: "rgba(255, 0, 0, 0.3)",
                    borderRadius: 12,
                    padding: 15,
                  }}
                >
                  {errors.map((e, i) => (
                    <Text
                      key={i}
                      style={{
                        color: "#FF6B6B",
                        fontSize: 14,
                        marginBottom: i < errors.length - 1 ? 5 : 0,
                      }}
                    >
                      {e.message}
                    </Text>
                  ))}
                </View>
              )}
            </View>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </BaseLayout>
  );
};

export default SignInWithEmail;
