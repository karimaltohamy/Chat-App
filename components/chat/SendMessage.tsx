import { Colors, GlassStyles } from "@/constants/colors";
import { MessageBody, sendMessage } from "@/supabaseClient";
import { useUser } from "@clerk/clerk-expo";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useSearchParams } from "expo-router/build/hooks";
import React, { useState } from "react";
import { Pressable, TextInput, View } from "react-native";
import { IconSymbol } from "../IconSymbol";

interface SendMessageProps {
  onMessageSent?: () => void;
}

const SendMessage = ({ onMessageSent }: SendMessageProps) => {
  const [params] = useSearchParams();
  const { user } = useUser();
  const [message, setMessage] = useState("");
  const queryClient = useQueryClient();

  const { mutate: sendMessageMutation, isPending: isLoading } = useMutation({
    mutationFn: async (message: MessageBody) => {
      return await sendMessage(message);
    },
    onSuccess: () => {
      setMessage("");
      queryClient.invalidateQueries({ queryKey: ["messages"] });
      onMessageSent?.();
      console.log("message sent");
    },
    onError: (error) => {
      console.log("error", error);
    },
  });

  return (
    <View
      style={{
        borderWidth: 1,
        borderColor: Colors.border.light,
        borderRadius: 28,
        padding: 18,
        flexDirection: "row",
        alignItems: "flex-end",
        gap: 12,
        margin: 12,
        backgroundColor: Colors.glass.secondary,
        ...GlassStyles.shadow,
      }}
    >
      <TextInput
        placeholder="Type a message..."
        placeholderTextColor={Colors.text.muted}
        style={{
          flex: 1,
          fontSize: 16,
          color: Colors.text.primary,
          borderRadius: 20,
          maxHeight: 100,
          lineHeight: 22,
        }}
        onChangeText={(text) => setMessage(text)}
        value={message}
        multiline
      />
      <Pressable
        onPress={() => {
          sendMessageMutation({
            content: message,
            senderId: user?.id || "",
            senderName: user?.fullName || "",
            senderPhoto: user?.imageUrl || "",
            chatRoomId: params[1],
          });
        }}
        disabled={isLoading || !message.trim()}
        style={{
          backgroundColor: message.trim() ? Colors.primary : Colors.glass.dark,
          borderRadius: 22,
          width: 44,
          height: 44,
          justifyContent: "center",
          alignItems: "center",
          ...GlassStyles.glowShadow,
          opacity: message.trim() ? 1 : 0.5,
        }}
      >
        <IconSymbol
          name="paperplane"
          color={message.trim() ? Colors.text.primary : Colors.text.muted}
          size={20}
        />
      </Pressable>
    </View>
  );
};

export default SendMessage;
