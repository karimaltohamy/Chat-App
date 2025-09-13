import { Colors, GlassStyles } from "@/constants/colors";
import { getDateLabel } from "@/utils";
import { Message } from "@/utils/types";
import { useUser } from "@clerk/clerk-expo";
import React, { useEffect, useRef } from "react";
import { Animated, Image, Text, View } from "react-native";
import DateSeparator from "./DateSeparator";

interface Props {
  item: Message;
  previousMessage: Message;
}

const ChatMessage: React.FC<Props> = ({ item, previousMessage }) => {
  const { user } = useUser();
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const slideAnim = useRef(new Animated.Value(30)).current;

  const showDateSeparator =
    !previousMessage ||
    getDateLabel(item.created_at) !== getDateLabel(previousMessage.created_at);

  const isOwn = item.senderId === user?.id;

  // check if grouped by sender AND time
  const isGrouped =
    previousMessage &&
    previousMessage.senderId === item.senderId &&
    Math.abs(
      new Date(item.created_at).getTime() -
        new Date(previousMessage.created_at).getTime()
    ) <
      5 * 60 * 1000; // 5 min gap

  useEffect(() => {
    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 300,
        useNativeDriver: true,
      }),
      Animated.timing(slideAnim, {
        toValue: 0,
        duration: 300,
        useNativeDriver: true,
      }),
    ]).start();
  }, [fadeAnim, slideAnim]);

  return (
    <>
      {/* Date separator */}
      {showDateSeparator && (
        <DateSeparator label={getDateLabel(item.created_at)} />
      )}

      <Animated.View
        style={{
          opacity: fadeAnim,
          transform: [{ translateY: slideAnim }],
        }}
      >
        {isOwn ? (
          // Own message
          <View
            style={{
              flexDirection: "row",
              padding: 16,
              backgroundColor: Colors.message.own.background,
              borderWidth: 1,
              borderColor: Colors.message.own.border,
              marginLeft: "auto",
              borderRadius: 25,
              alignSelf: "flex-start",
              maxWidth: "90%",
              marginTop: isGrouped ? 5 : 25,
              ...GlassStyles.shadow,
              shadowColor: Colors.message.own.glow,
            }}
          >
            <View style={{ flexShrink: 1 }}>
              <Text
                style={{
                  color: Colors.text.primary,
                  fontSize: 16,
                  lineHeight: 22,
                }}
              >
                {item.content}
              </Text>
            </View>
          </View>
        ) : (
          // Other's message
          <View
            style={{
              flexDirection: "row",
              padding: 16,
              backgroundColor: Colors.message.other.background,
              borderWidth: 1,
              borderColor: Colors.message.other.border,
              borderRadius: 25,
              alignSelf: "flex-start",
              maxWidth: "90%",
              marginTop: isGrouped ? 5 : 25,
              ...GlassStyles.shadow,
              shadowColor: Colors.message.other.glow,
            }}
          >
            {/* Only show avatar if not grouped */}
            {!isGrouped && (
              <Image
                source={{ uri: item.senderPhoto }}
                style={{
                  width: 42,
                  height: 42,
                  borderRadius: 21,
                  marginRight: 12,
                  borderWidth: 2,
                  borderColor: Colors.border.light,
                  ...GlassStyles.shadow,
                }}
              />
            )}
            <View style={{ flexShrink: 1 }}>
              {/* Only show name if not grouped */}
              {!isGrouped && (
                <Text
                  style={{
                    fontWeight: "600",
                    marginBottom: 8,
                    color: Colors.text.accent,
                    fontSize: 14,
                  }}
                >
                  {item.senderName}
                </Text>
              )}
              <Text
                style={{
                  color: Colors.text.primary,
                  fontSize: 16,
                  lineHeight: 22,
                }}
              >
                {item.content}
              </Text>
            </View>
          </View>
        )}
      </Animated.View>
    </>
  );
};

export default ChatMessage;
