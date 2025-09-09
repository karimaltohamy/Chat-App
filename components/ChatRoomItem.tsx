import { ChatRoom } from "@/utils/types";
import { Link } from "expo-router";
import React from "react";
import { View } from "react-native";
import { IconSymbol } from "./IconSymbol";
import { Text } from "./Text";

interface ChatRoomItemProps {
  item: ChatRoom;
  onPress: () => void;
}

const ChatRoomItem: React.FC<ChatRoomItemProps> = ({ item, onPress }) => {
  return (
    <Link
      href={{
        pathname: `/(chat)/[chat]`,
        params: {
          chat: item.id,
        },
      }}
      onPress={onPress}
      style={{
        padding: 16,
        backgroundColor: "#464646",
        borderRadius: 15,
        marginBottom: 16,
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
        <View>
          <Text style={{ fontSize: 20, fontWeight: "bold" }}>{item.title}</Text>
          <Text style={{ fontSize: 14, color: "#888888" }}>
            {item.description}
          </Text>
        </View>

        <IconSymbol name="chevron.right" size={24} color={"#888888"} />
      </View>
    </Link>
  );
};

export default ChatRoomItem;
