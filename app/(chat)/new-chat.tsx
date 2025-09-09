import { Button } from "@/components/Button";
import Input from "@/components/Input";
import { Switch } from "@/components/Switch";
import { Text } from "@/components/Text";
import { createChatRoom } from "@/supabaseClient";
import { ChatRoomForm } from "@/utils/types";
import { useMutation } from "@tanstack/react-query";
import { router } from "expo-router";
import React, { useState } from "react";
import { Alert, ScrollView, View } from "react-native";

const NewChat = () => {
  const [formData, setFormData] = useState<ChatRoomForm>({
    title: "",
    description: "",
    isPrivate: false,
  });

  const { mutate: createChatRoomMutation, isPending } = useMutation({
    mutationFn: async (data: ChatRoomForm) => {
      const res = await createChatRoom(data);
      return res;
    },
    onSuccess: (data) => {
      Alert.alert("Success!", "Chat room created successfully!");
      router.back();
    },
    onError: (error) => {
      Alert.alert("Error!", error.message);
      console.log(error);
    },
  });

  return (
    <ScrollView style={{ flex: 1, padding: 20 }}>
      {/* Title */}
      <Input
        label="Title"
        value={formData.title}
        onChangeText={(text) => setFormData({ ...formData, title: text })}
        name="title"
        placeholder="Enter title"
      />

      {/* Description */}
      <Input
        label="Description"
        value={formData.description}
        onChangeText={(text) => setFormData({ ...formData, description: text })}
        name="description"
        placeholder="Enter description"
      />

      {/* isPrivate */}
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <Text>Private</Text>
        <Switch
          value={formData.isPrivate}
          onValueChange={(val) => setFormData({ ...formData, isPrivate: val })}
        />
      </View>

      <Text style={{ marginTop: 20, fontSize: 16, marginBottom: 20 }}>
        You can create a new chat room by entering a title and description.
      </Text>

      <Button
        onPress={() => createChatRoomMutation(formData)}
        isLoading={isPending}
      >
        Create
      </Button>
    </ScrollView>
  );
};

export default NewChat;
