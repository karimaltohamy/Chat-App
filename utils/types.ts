interface ChatRoom {
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
interface Message {
  $id?: string;
  $createdAt?: string;
  $updatedAt?: string;
  $collectionId?: string;
  $databaseId?: string;
  $permissions?: any[];
  content: string;
  senderId: string;
  senderName: string;
  senderPhoto: string;
  chatRoomId: string;
}

interface User {
  id: string;
  fullName: string;
  email: string;
  imageUrl: string;
}

export type { ChatRoom, Message, User };
