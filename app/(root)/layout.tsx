import React from "react";
import { auth } from "@clerk/nextjs/server";
import { onboard } from "@/features/auth/action/onboard";
import { ChatShell } from "@/features/conversation/components/chat-shell";

const RootGroupLayout = async ({ children }: { children: React.ReactNode }) => {
  await auth.protect();
  await onboard();

  return <ChatShell>{children}</ChatShell>;
};

export default RootGroupLayout;
