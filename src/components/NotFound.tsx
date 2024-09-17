"use client";

import { Button } from "@/components/ui/button";
import { Undo } from "lucide-react";
import Link from "next/link";

export const NotFound = () => {
  return (
    <div className="flex h-screen flex-col items-center justify-center">
      <h1 className="text-5xl font-bold">404</h1>
      <p className="mt-2 text-2xl max-w-72 text-center">Não encontramos o que estava procurando.</p>

      <Button asChild className="mt-16">
        <Link href="/">
          <Undo className="mr-2 h-4 w-4" /> Ir para home
        </Link>
      </Button>
    </div>
  );
};
