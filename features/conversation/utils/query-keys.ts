export const queryKeys = {
  conversations: {
    all: ["conversations"] as const,
    details: (id: string) => ["conversations", id] as const,
  },
  messages: {
    byConversation: (conversationId: string) =>
      ["messages", conversationId] as const,
  },
};
