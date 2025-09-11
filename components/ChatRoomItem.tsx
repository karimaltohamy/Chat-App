import { ChatRoom } from "@/utils/types";
import { Link } from "expo-router";
import React, { useEffect, useRef } from "react";
import { Animated, View } from "react-native";
import { IconSymbol } from "./IconSymbol";
import { Text } from "./Text";
import { Colors, GlassStyles } from '@/constants/colors';

interface ChatRoomItemProps {
  item: ChatRoom;
  onPress: () => void;
}

const ChatRoomItem: React.FC<ChatRoomItemProps> = ({ item, onPress }) => {
  const scaleAnim = useRef(new Animated.Value(0.95)).current;
  const fadeAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.parallel([
      Animated.spring(scaleAnim, {
        toValue: 1,
        tension: 100,
        friction: 8,
        useNativeDriver: true,
      }),
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 400,
        useNativeDriver: true,
      }),
    ]).start();
  }, [scaleAnim, fadeAnim]);

  return (
    <Animated.View
      style={{
        opacity: fadeAnim,
        transform: [{ scale: scaleAnim }],
      }}
    >
      <Link
      href={{
        pathname: `/(chat)/[chat]`,
        params: {
          chat: item.id,
        },
      }}
      onPress={onPress}
      style={{
        padding: 20,
        backgroundColor: Colors.glass.secondary,
        borderWidth: 1,
        borderColor: Colors.border.light,
        borderRadius: 20,
        marginBottom: 12,
        ...GlassStyles.shadow,
      }}
    >
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
          width: "100%",
        }}
      >
        <View style={{ flex: 1, marginRight: 16 }}>
          <Text style={{ 
            fontSize: 18, 
            fontWeight: "700", 
            color: Colors.text.primary,
            marginBottom: 4
          }}>{item.title}</Text>
          <Text style={{ 
            fontSize: 14, 
            color: Colors.text.secondary,
            lineHeight: 20
          }}>
            {item.description}
          </Text>
        </View>

        <View style={{
          backgroundColor: Colors.glass.primary,
          borderRadius: 20,
          width: 40,
          height: 40,
          justifyContent: 'center',
          alignItems: 'center',
          borderWidth: 1,
          borderColor: Colors.border.primary,
        }}>
          <IconSymbol name="chevron.right" size={18} color={Colors.primary} />
        </View>
      </View>
      </Link>
    </Animated.View>
  );
};

export default ChatRoomItem;
