
import { Message, ChatThread } from '../types';

export const mockMessages: Message[] = [
  {
    id: '1',
    senderId: '1',
    receiverId: '2',
    content: 'Hi Sofia, I saw that you offer graphic design skills. Would you be interested in exchanging for React development?',
    sentAt: '2023-04-11T09:30:00Z',
    read: true
  },
  {
    id: '2',
    senderId: '2',
    receiverId: '1',
    content: "Hey Alex! Yes, that sounds great. I've been wanting to learn React for a while now.",
    sentAt: '2023-04-11T10:15:00Z',
    read: true
  },
  {
    id: '3',
    senderId: '1',
    receiverId: '2',
    content: 'Perfect! When would you be available for our first session?',
    sentAt: '2023-04-11T10:30:00Z',
    read: true
  },
  {
    id: '4',
    senderId: '2',
    receiverId: '1',
    content: 'How about this Friday at 4pm?',
    sentAt: '2023-04-11T11:00:00Z',
    read: false
  }
];

export const mockChatThreads: ChatThread[] = [
  {
    id: '1',
    participants: ['1', '2'],
    lastMessage: mockMessages[3],
    updatedAt: '2023-04-11T11:00:00Z'
  },
  {
    id: '2',
    participants: ['1', '3'],
    lastMessage: {
      id: '5',
      senderId: '3',
      receiverId: '1',
      content: 'Looking forward to our session next week!',
      sentAt: '2023-04-14T15:20:00Z',
      read: true
    },
    updatedAt: '2023-04-14T15:20:00Z'
  }
];
