import { Button } from "@/components/Button";
import Input from "@/components/Input";
import { Text } from "@/components/Text";
import { useSignIn } from "@clerk/clerk-expo";
import { ClerkAPIError } from "@clerk/types";
import React, { useState } from "react";
import {
  Alert,
  Image,
  KeyboardAvoidingView,
  Platform,
  SafeAreaView,
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
    <SafeAreaView style={{ flex: 1 }}>
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={{ flex: 1 }}
      >
        <ScrollView style={{ flex: 1 }}>
          <View style={{ padding: 16, flex: 1 }}>
            <View style={{ justifyContent: "center", alignItems: "center" }}>
              <Image
                source={require("@/assets/images/logo (1).png")}
                style={{ width: 200, height: 200 }}
              />
              <Text
                style={{ fontSize: 32, fontWeight: "bold", marginBottom: 20 }}
              >
                Welcome Back
              </Text>
              <Text style={{ fontSize: 16 }}>
                Sign in to continue chatting 🚀
              </Text>
            </View>

            {/* fields */}
            <View style={{ gap: 10, marginTop: 20 }}>
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

              <Button onPress={handleSignInWithEmail}>Sign In</Button>

              {errors.length > 0 && (
                <View style={{ marginTop: 10 }}>
                  {errors.map((e, i) => (
                    <Text key={i} style={{ color: "red" }}>
                      {e.message}
                    </Text>
                  ))}
                </View>
              )}
            </View>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default SignInWithEmail;
