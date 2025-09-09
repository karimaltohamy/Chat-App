import ChatRoomItem from "@/components/ChatRoomItem";
import { getAllChatRooms } from "@/supabaseClient";
import { ChatRoom } from "@/utils/types";
// import { chatRooms } from "@/utils/test-data";
import { router } from "expo-router";
import { useEffect, useState } from "react";
import { FlatList, RefreshControl, SafeAreaView } from "react-native";

const Home = () => {
  const [chatRooms, setChatRooms] = useState<ChatRoom[]>([]);
  const [refreshing, setRefreshing] = useState(false);

  const handleRefresh = async () => {
    setRefreshing(true);
    await getAllChatRooms().then((rooms) => {
      setChatRooms(rooms);
      setRefreshing(false);
    });
  };

  useEffect(() => {
    getAllChatRooms().then((rooms) => {
      setChatRooms(rooms);
    });
  }, []);

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <FlatList
        data={chatRooms}
        indicatorStyle="white"
        renderItem={({ item }) => (
          <ChatRoomItem
            item={item}
            onPress={() => router.push(`/chat/${item.id}`)}
          />
        )}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={handleRefresh}
            tintColor="#007AFF"
            colors={["#007AFF"]}
          />
        }
      />
    </SafeAreaView>
  );
};

export default Home;
