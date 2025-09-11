import BaseLayout from "@/components/BaseLayout";
import ChatMessage from "@/components/chat/ChatMessage";
import MessageSkeleton from "@/components/chat/MessageSkeleton";
import SendMessage from "@/components/chat/SendMessage";
import { Text } from "@/components/Text";
import { Colors, GlassStyles } from "@/constants/colors";
import { getMessages, subscribeToMessages } from "@/supabaseClient";
import { dummyMessages } from "@/utils/test-data";
import { Message } from "@/utils/types";
import { useQuery } from "@tanstack/react-query";
import { useSearchParams } from "expo-router/build/hooks";
import React, { useCallback, useEffect, useRef, useState } from "react";
import {
  FlatList,
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  StatusBar,
  View,
} from "react-native";

const Chat = () => {
  const [params] = useSearchParams();
  const flatListRef = useRef<FlatList>(null);
  const [messages, setMessages] = useState<Message[]>([]);

  // get all messages for the chat room
  const { isLoading } = useQuery({
    queryKey: ["messages", params[1]],
    queryFn: async () => {
      const res = await getMessages(params[1]);

      setMessages(res);
    },
    enabled: !!params[1],
  });

  useEffect(() => {
    const chatId = params[1];
    if (!chatId) return;

    const unsubscribe = subscribeToMessages(chatId, (msg) => {
      setMessages((prev) => [...prev, msg]);
    });

    return unsubscribe;
  }, [params]);

  const scrollToBottom = useCallback(() => {
    if (flatListRef.current && messages && messages.length > 0) {
      flatListRef.current.scrollToEnd({ animated: true });
    }
  }, [messages]);

  // scroll to bottom when messages change
  useEffect(() => {
    scrollToBottom();
  }, [messages, scrollToBottom]);

  // scroll to bottom on keyboard show
  useEffect(() => {
    const showSub = Keyboard.addListener("keyboardWillShow", () => {
      requestAnimationFrame(() => {
        setTimeout(scrollToBottom, 100);
      });
    });
    const hideSub = Keyboard.addListener("keyboardWillHide", () => {
      requestAnimationFrame(() => {
        setTimeout(scrollToBottom, 100);
      });
    });

    return () => {
      showSub.remove();
      hideSub.remove();
    };
  }, [scrollToBottom]);

  return (
    <BaseLayout>
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        keyboardVerticalOffset={
          Platform.OS === "ios"
            ? 100
            : Platform.OS === "android"
            ? StatusBar.currentHeight || 0
            : 0
        }
      >
        <View style={{ flex: 1 }}>
          <FlatList
            ref={flatListRef}
            data={isLoading ? dummyMessages : messages || []}
            keyExtractor={(item) => (isLoading ? item.$id! : item.$id!)}
            ListHeaderComponent={
              <View
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                  justifyContent: "center",
                  paddingHorizontal: 20,
                  paddingVertical: 15,
                  backgroundColor: Colors.glass.secondary,
                  borderRadius: 25,
                  marginBottom: 10,
                  borderWidth: 1,
                  borderColor: Colors.border.light,
                  ...GlassStyles.shadow,
                }}
              >
                <Text
                  style={{
                    fontSize: 22,
                    fontWeight: "700",
                    color: Colors.text.primary,
                    letterSpacing: 0.5,
                  }}
                >
                  Chat {params[1]}
                </Text>
              </View>
            }
            contentContainerStyle={{
              padding: 8,
              paddingBottom: 20,
            }}
            keyboardDismissMode="interactive"
            keyboardShouldPersistTaps="handled"
            onContentSizeChange={() => scrollToBottom()}
            renderItem={({ item, index }) =>
              isLoading ? (
                <MessageSkeleton
                  key={item.$id}
                  isCurrentUser={index % 3 === 0}
                />
              ) : (
                <ChatMessage
                  key={item.$id}
                  item={item}
                  previousMessage={messages?.[index - 1] || ({} as Message)}
                />
              )
            }
          />
        </View>

        {/* Fixed Footer - moved inside KeyboardAvoidingView */}
        <SendMessage onMessageSent={scrollToBottom} />
      </KeyboardAvoidingView>
    </BaseLayout>
  );
};

export default Chat;
