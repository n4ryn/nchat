import { loadChatMessages } from "@/features/ai/actions/chat-store";
import { getConversation } from "@/features/conversation/actions/conversation-actions";
import { ConversationView } from "@/features/conversation/components/conversation-view";
import { notFound } from "next/navigation";

type ConversationPageProps = {
  params: Promise<{ id: string }>;
};

const ConversationPage = async function ({ params }: ConversationPageProps) {
  const { id } = await params;

  try {
    await getConversation(id);
  } catch (error) {
    console.error(error);
    notFound();
  }

  const initialMessages = await loadChatMessages(id);

  return (
    <ConversationView
      key={id}
      conversationId={id}
      initialMessages={initialMessages}
    />
  );
};

export default ConversationPage;
