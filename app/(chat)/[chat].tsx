import BaseLayout from "@/components/BaseLayout";
import ChatMessage from "@/components/chat/ChatMessage";
import MessageSkeleton from "@/components/chat/MessageSkeleton";
import SendMessage from "@/components/chat/SendMessage";
import { IconSymbol } from "@/components/IconSymbol";
import { Colors } from "@/constants/colors";
import {
  getChatRoom,
  getMessages,
  subscribeToMessages,
} from "@/supabaseClient";
import { Message } from "@/utils/types";
import { FlashList, FlashListRef } from "@shopify/flash-list";
import { useQuery } from "@tanstack/react-query";
import { Link, Stack } from "expo-router";
import { useSearchParams } from "expo-router/build/hooks";
import React, { useCallback, useEffect, useRef, useState } from "react";
import {
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  StatusBar,
  View,
} from "react-native";

const Chat = () => {
  const [firstLoad, setFirstLoad] = useState(true);
  const [params] = useSearchParams();
  const flatListRef = useRef<FlashListRef<Message>>(null);
  const [messages, setMessages] = useState<Message[]>([]);

  // get chat room by id
  const { data: chatRoom, isLoading: isLoadingChatRoom } = useQuery({
    queryKey: ["chatRoom"],
    queryFn: async () => {
      const res = await getChatRoom(params[1]);
      return res;
    },
    enabled: !!params[1],
  });

  console.log(JSON.stringify(chatRoom, null, 2));

  // get all messages for the chat room
  const { isLoading } = useQuery({
    queryKey: ["messages"],
    queryFn: async () => {
      const res = await getMessages(params[1]);
      setMessages(res);
      return res;
    },
    enabled: !!params[1],
  });

  // if the first load to fetch messages is still loading, show skeletons
  useEffect(() => {
    if (!isLoading) {
      setFirstLoad(false);
    }
  }, [isLoading]);

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
    <>
      <Stack.Screen
        options={{
          headerTitle: chatRoom?.title,
          headerRight: () => (
            <Link
              href={{
                pathname: "/settings/[chat]",
                params: { chat: params[1] as string },
              }}
            >
              <IconSymbol name="gearshape" size={24} color={Colors.primary} />
            </Link>
          ),
        }}
      />
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
            <FlashList
              ref={flatListRef}
              data={messages || []}
              keyExtractor={(item) => item.$id!}
              contentContainerStyle={{
                padding: 8,
                paddingBottom: 20,
              }}
              keyboardDismissMode="interactive"
              keyboardShouldPersistTaps="handled"
              onContentSizeChange={() => scrollToBottom()}
              renderItem={({ item, index }) =>
                isLoading && firstLoad ? (
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
    </>
  );
};

export default Chat;
