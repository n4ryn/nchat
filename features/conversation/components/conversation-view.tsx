"use client";

import { Separator } from "@/components/ui/separator";
import { SidebarTrigger } from "@/components/ui/sidebar";
import { DefaultChatTransport, type UIMessage } from "ai";
import { useConversations } from "../hooks/use-conversation";
import { useQueryClient } from "@tanstack/react-query";
import { useMemo } from "react";
import { useChat } from "@ai-sdk/react";
import { queryKeys } from "../utils/query-keys";
import { toast } from "sonner";
import { ChatEmpty } from "./chat-empty";
import { ChatMessages } from "./chat-messages";
import { ChatComposer } from "./chat-composer";

type ConversationViewProps = {
  conversationId: string;
  initialMessages: UIMessage[];
};

export const ConversationView = ({
  conversationId,
  initialMessages,
}: ConversationViewProps) => {
  const queryClient = useQueryClient();
  const { data: conversation } = useConversations();

  const transport = useMemo(
    () =>
      new DefaultChatTransport({
        api: "/api/chat",
        prepareSendMessagesRequest: ({ id, messages }) => ({
          body: {
            id,
            message: messages.at(-1),
          },
        }),
      }),
    [],
  );

  const { messages, status, sendMessage } = useChat({
    id: conversationId,
    messages: initialMessages,
    transport,
    onFinish: async () => {
      void queryClient.invalidateQueries({
        queryKey: queryKeys.conversations.all,
      });
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });

  const title =
    conversation?.find((item) => item.id === conversationId)?.title ?? "Chat";

  return (
    <div className="flex h-full min-h-0 flex-1 flex-col">
      <header className="flex h-14 shrink-0 items-center gap-2 border-b px-3">
        <SidebarTrigger />
        <Separator orientation="vertical" className="mx-1 h-4" />
        <h1 className="truncate text-sm font-medium">{title}</h1>
      </header>

      {messages.length === 0 ? (
        <ChatEmpty />
      ) : (
        <ChatMessages messages={messages} status={status} />
      )}

      <ChatComposer
        onSend={(text) => {
          void sendMessage({ text });
        }}
        isSending={status !== "ready"}
        autoFocus
      />
    </div>
  );
};
