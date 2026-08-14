"use client"

import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { ChevronIcon } from "@/components/ui/chevron-icon";
import { Containter } from "@/components/ui/container";
import { Input } from "@/components/ui/Input";
import { ReplitLogo } from "@/components/ui/replit-logo";
import { Textarea } from "@/components/ui/Text-Area";
import { useToast } from "@/components/ui/Toast";

export default function Home() {
  const { success, error, toast } = useToast()
  return (
    <Containter className="mt-10">
      <ReplitLogo size="default" />
      <ChevronIcon direction="down" size={66}></ChevronIcon>
      <Input type="text" placeholder="enter" className="mb-4 border" />
      <Button onClick={() => error("Testing")}>Click me</Button>
      <Textarea className="mt-6" placeholder="Bio"></Textarea>
      <Badge variant="orange">Replit</Badge>
    </Containter>

  );
}
