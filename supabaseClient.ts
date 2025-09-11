import { createClient } from "@supabase/supabase-js";
import "react-native-url-polyfill/auto";
import { ChatRoom, ChatRoomForm, Message } from "./utils/types";

const supabaseUrl = "https://vxhxstvayhegaftdqqwt.supabase.co";
const supabaseAnonKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InZ4aHhzdHZheWhlZ2FmdGRxcXd0Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTcyNDgyODEsImV4cCI6MjA3MjgyNDI4MX0.6kM86F0A94nbXhfDOiGMJOosbQt3ggJX7Q9aVwShAOI";

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

// create chat room
export async function createChatRoom(room: ChatRoomForm) {
  const { data, error } = await supabase
    .from("chatrooms")
    .insert({
      title: room.title,
      description: room.description,
      isPrivate: room.isPrivate,
    })
    .select()
    .single();

  if (error) throw error;
  return data as ChatRoom;
}

export async function getAllChatRooms() {
  const { data, error } = await supabase
    .from("chatrooms")
    .select("*")
    .order("created_at", { ascending: false }); // newest first

  if (error) throw error;
  return data as ChatRoom[];
}

// send message to chat room
export interface MessageBody {
  content: string;
  senderId: string;
  senderName: string;
  senderPhoto?: string;
  chatRoomId: string;
}

export async function sendMessage(message: MessageBody) {
  const { data, error } = await supabase
    .from("messages")
    .insert({
      content: message.content,
      senderId: message.senderId,
      senderName: message.senderName,
      senderPhoto: message.senderPhoto,
      chatRoomId: message.chatRoomId,
    })
    .select()
    .single();

  if (error) throw error;
  return data as Message;
}

// get chat room by id
export async function getMessages(chatRoomId: string) {
  const { data, error } = await supabase
    .from("messages")
    .select("*")
    .eq("chatRoomId", chatRoomId)
    .order("created_at", { ascending: true });

  if (error) throw error;
  return data as Message[];
}

// Real-Time Message Subscriptions
export function subscribeToMessages(
  chatRoomId: string,
  callback: (msg: Message) => void
) {
  const channel = supabase
    .channel("chat-room-" + chatRoomId)
    .on(
      "postgres_changes",
      {
        event: "INSERT",
        schema: "public",
        table: "messages",
        filter: `chatRoomId=eq.${chatRoomId}`,
      },
      (payload) => {
        callback(payload.new as Message);
      }
    )
    .subscribe();

  return () => {
    supabase.removeChannel(channel);
  };
}
