import { getConversation } from "@/features/conversation/actions/conversation-actions";
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

  return <div>page {id}</div>;
};

export default ConversationPage;
