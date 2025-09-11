export interface ChatRoom {
  id: string;
  title: string;
  description: string;
  isPrivate: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export interface ChatRoomForm {
  title: string;
  description: string;
  isPrivate: boolean;
}
export interface Message {
  $id: string;
  created_at: string;
  $createdAt: string;
  $updatedAt: string;
  $collectionId?: string;
  $databaseId?: string;
  $permissions?: any[];
  content: string;
  senderId: string;
  senderName: string;
  senderPhoto: string;
  chatRoomId: string;
}

export interface User {
  id: string;
  fullName: string;
  email: string;
  imageUrl: string;
}

