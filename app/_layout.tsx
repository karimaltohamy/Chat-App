import { tokenCache } from "@/utils/cache";
import { ClerkLoaded, ClerkProvider } from "@clerk/clerk-expo";
import { DarkTheme, ThemeProvider } from "@react-navigation/native";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Slot } from "expo-router";

const queryClient = new QueryClient();

export default function RootLayout() {
  const publishableKey = process.env.EXPO_PUBLIC_CLERK_PUBLISHABLE_KEY;

  if (!publishableKey) {
    throw new Error("CLERK_PUBLISHABLE_KEY is not set");
  }

  return (
    <QueryClientProvider client={queryClient}>
      <ClerkProvider publishableKey={publishableKey} tokenCache={tokenCache}>
        <ThemeProvider value={DarkTheme}>
          <ClerkLoaded>
            <Slot />
          </ClerkLoaded>
        </ThemeProvider>
      </ClerkProvider>
    </QueryClientProvider>
  );
}
