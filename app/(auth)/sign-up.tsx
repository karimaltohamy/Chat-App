import { Button } from "@/components/Button";
import Input from "@/components/Input";
import { Text } from "@/components/Text";
import { useSignUp } from "@clerk/clerk-expo";
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

const SignUpWithEmail = () => {
  const { isLoaded, signUp, setActive } = useSignUp();
  const [pendingVerification, setPendingVerification] = useState(false);
  const [errors, setErrors] = useState<ClerkAPIError[]>([]);

  const [form, setForm] = useState({
    email: "",
    password: "",
    code: "",
  });

  const handleSignUpWithEmail = async () => {
    if (!isLoaded) return;

    try {
      await signUp.create({
        emailAddress: form.email,
        password: form.password,
      });

      await signUp.prepareEmailAddressVerification({ strategy: "email_code" });
      setPendingVerification(true);
      setErrors([]);
    } catch (err: any) {
      console.error("Sign up error:", err.errors);
      setErrors(err.errors);
    }
  };

  const handleVerifyEmailCode = async () => {
    if (!isLoaded) return;

    try {
      const result = await signUp.attemptEmailAddressVerification({
        code: form.code,
      });

      if (result.status === "complete") {
        await setActive({ session: result.createdSessionId });
        Alert.alert("Success", "Account created and signed in!");
      } else {
        console.log("Additional steps required:", result);
      }
    } catch (err: any) {
      console.error("Verification error:", err.errors);
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
                Modern Chat App
              </Text>
              <Text style={{ fontSize: 16 }}>
                The best chat app in the world
              </Text>
            </View>

            {/* fields */}
            <View style={{ gap: 10, marginTop: 20 }}>
              {!pendingVerification ? (
                <>
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
                    onChangeText={(value) =>
                      setForm({ ...form, password: value })
                    }
                    name="password"
                    placeholder="Enter your password"
                    type="password"
                    secureTextEntry
                  />

                  <Button onPress={handleSignUpWithEmail}>Sign Up</Button>
                </>
              ) : (
                <>
                  <Input
                    label="Verification Code"
                    value={form.code}
                    onChangeText={(value) => setForm({ ...form, code: value })}
                    name="code"
                    placeholder="Enter the code sent to your email"
                  />
                  <Button onPress={handleVerifyEmailCode}>
                    Verify & Continue
                  </Button>
                </>
              )}

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

export default SignUpWithEmail;
