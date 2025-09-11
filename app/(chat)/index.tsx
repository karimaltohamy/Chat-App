import ChatRoomItem from "@/components/ChatRoomItem";
import { getAllChatRooms } from "@/supabaseClient";
import { ChatRoom } from "@/utils/types";
// import { chatRooms } from "@/utils/test-data";
import BaseLayout from "@/components/BaseLayout";
import { Colors } from "@/constants/colors";
import { router } from "expo-router";
import { useEffect, useState } from "react";
import { FlatList, RefreshControl, View } from "react-native";

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
    <BaseLayout>
      <View style={{ flex: 1, backgroundColor: Colors.background.middle }}>
        <FlatList
          data={chatRooms}
          keyExtractor={(item) => item.id}
          indicatorStyle="white"
          renderItem={({ item }) => (
            <ChatRoomItem
              item={item}
              onPress={() => router.push(`/chat/${item.id}`)}
            />
          )}
          contentContainerStyle={{
            padding: 16,
          }}
          refreshControl={
            <RefreshControl
              refreshing={refreshing}
              onRefresh={handleRefresh}
              tintColor={Colors.primary}
              colors={[Colors.primary]}
            />
          }
        />
      </View>
    </BaseLayout>
  );
};

export default Home;
