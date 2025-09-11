import BaseLayout from "@/components/BaseLayout";
import { Button } from "@/components/Button";
import Input from "@/components/Input";
import { Text } from "@/components/Text";
import { Colors, GlassStyles } from "@/constants/colors";
import { useSignUp } from "@clerk/clerk-expo";
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
    <BaseLayout>
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={{ flex: 1 }}
      >
        <ScrollView style={{ flex: 1 }}>
          <View style={{ padding: 20, flex: 1 }}>
            <View style={{ justifyContent: "center", alignItems: "center", marginTop: 40 }}>
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
                  textAlign: "center"
                }}
              >
                {!pendingVerification ? "Join Us" : "Verify Email"}
              </Text>
              <Text style={{ 
                fontSize: 16, 
                color: Colors.text.secondary,
                textAlign: "center",
                marginBottom: 30
              }}>
                {!pendingVerification 
                  ? "Create your account to start chatting" 
                  : "Check your email for the verification code"}
              </Text>
            </View>

            {/* fields */}
            <View style={{ gap: 15 }}>
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

                  <Button 
                    onPress={handleSignUpWithEmail}
                    style={{
                      marginTop: 10,
                      backgroundColor: Colors.glass.primary,
                      borderWidth: 1,
                      borderColor: Colors.border.primary,
                      ...GlassStyles.shadow,
                    }}
                  >
                    <Text style={{ color: Colors.text.primary, fontWeight: "600" }}>
                      Sign Up
                    </Text>
                  </Button>
                </>
              ) : (
                <>
                  <View style={{
                    backgroundColor: Colors.glass.secondary,
                    borderWidth: 1,
                    borderColor: Colors.border.light,
                    borderRadius: 15,
                    padding: 20,
                    marginBottom: 10,
                    ...GlassStyles.shadow,
                  }}>
                    <Text style={{
                      color: Colors.text.primary,
                      fontSize: 16,
                      fontWeight: "600",
                      textAlign: "center",
                      marginBottom: 8
                    }}>
                      Verification Required
                    </Text>
                    <Text style={{
                      color: Colors.text.secondary,
                      fontSize: 14,
                      textAlign: "center",
                      lineHeight: 20
                    }}>
                      We've sent a verification code to {form.email}
                    </Text>
                  </View>
                  
                  <Input
                    label="Verification Code"
                    value={form.code}
                    onChangeText={(value) => setForm({ ...form, code: value })}
                    name="code"
                    placeholder="Enter the 6-digit code"
                  />
                  <Button 
                    onPress={handleVerifyEmailCode}
                    style={{
                      backgroundColor: Colors.glass.primary,
                      borderWidth: 1,
                      borderColor: Colors.border.primary,
                      ...GlassStyles.shadow,
                    }}
                  >
                    <Text style={{ color: Colors.text.primary, fontWeight: "600" }}>
                      Verify & Continue
                    </Text>
                  </Button>
                </>
              )}

              {errors.length > 0 && (
                <View style={{
                  marginTop: 15,
                  backgroundColor: Colors.glass.dark,
                  borderWidth: 1,
                  borderColor: "rgba(255, 0, 0, 0.3)",
                  borderRadius: 12,
                  padding: 15
                }}>
                  {errors.map((e, i) => (
                    <Text key={i} style={{ 
                      color: "#FF6B6B", 
                      fontSize: 14,
                      marginBottom: i < errors.length - 1 ? 5 : 0
                    }}>
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

export default SignUpWithEmail;
