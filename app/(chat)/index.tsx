import BaseLayout from "@/components/BaseLayout";
import ChatRoomItem from "@/components/ChatRoomItem";
import { Colors } from "@/constants/colors";
import { getAllChatRooms } from "@/supabaseClient";
import { useQuery } from "@tanstack/react-query";
import { router } from "expo-router";
import { useState } from "react";
import { FlatList, RefreshControl, View } from "react-native";

const Home = () => {
  const [refreshing] = useState(false);

  const { data: chatRooms, refetch } = useQuery({
    queryKey: ["chatRooms"],
    queryFn: async () => {
      const res = await getAllChatRooms();
      return res;
    },
    enabled: true,
  });

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
              onRefresh={refetch}
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
