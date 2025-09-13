import BaseLayout from "@/components/BaseLayout";
import { Button } from "@/components/Button";
import Input from "@/components/Input";
import { Switch } from "@/components/Switch";
import { Text } from "@/components/Text";
import { Colors, GlassStyles } from "@/constants/colors";
import { createChatRoom } from "@/supabaseClient";
import { ChatRoomForm } from "@/utils/types";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { router } from "expo-router";
import React, { useState } from "react";
import { Alert, ScrollView, View } from "react-native";

const NewChat = () => {
  const [formData, setFormData] = useState<ChatRoomForm>({
    title: "",
    description: "",
    isPrivate: false,
  });
  const queryClient = useQueryClient();

  const { mutate: createChatRoomMutation, isPending } = useMutation({
    mutationFn: async (data: ChatRoomForm) => {
      const res = await createChatRoom(data);
      return res;
    },
    onSuccess: (data) => {
      Alert.alert("Success!", "Chat room created successfully!");
      queryClient.invalidateQueries({ queryKey: ["chatRooms"] });
      router.back();
    },
    onError: (error) => {
      Alert.alert("Error!", error.message);
      console.log(error);
    },
  });

  return (
    <BaseLayout>
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
          onChangeText={(text) =>
            setFormData({ ...formData, description: text })
          }
          name="description"
          placeholder="Enter description"
        />

        {/* isPrivate */}
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-between",
            backgroundColor: Colors.glass.secondary,
            borderWidth: 1,
            borderColor: Colors.border.light,
            borderRadius: 15,
            padding: 20,
            marginVertical: 10,
            ...GlassStyles.shadow,
          }}
        >
          <Text
            style={{
              color: Colors.text.primary,
              fontSize: 16,
              fontWeight: "600",
            }}
          >
            Private Room
          </Text>
          <Switch
            value={formData.isPrivate}
            onValueChange={(val) =>
              setFormData({ ...formData, isPrivate: val })
            }
          />
        </View>

        <View
          style={{
            backgroundColor: Colors.glass.secondary,
            borderWidth: 1,
            borderColor: Colors.border.light,
            borderRadius: 15,
            padding: 20,
            marginTop: 20,
            marginBottom: 20,
            ...GlassStyles.shadow,
          }}
        >
          <Text
            style={{
              fontSize: 16,
              color: Colors.text.secondary,
              lineHeight: 24,
              textAlign: "center",
            }}
          >
            Create a new chat room by entering a title and description. Private
            rooms require invitation to join.
          </Text>
        </View>

        <Button
          onPress={() => createChatRoomMutation(formData)}
          isLoading={isPending}
        >
          Create Chat Room
        </Button>
      </ScrollView>
    </BaseLayout>
  );
};

export default NewChat;
