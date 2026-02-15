"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import HomePage from "../components/pages/home";
import UserMenu from "@/components/molecules/user-menu";
import { useIsAdmin } from "@/hooks/use-is-admin";
import { useAuth } from "@/components/providers/auth-provider";
import { useAppSelector } from "@/store/hooks";
import { GameStatus } from "@/constants/general";

export default function Home() {
  const { user } = useAuth();
  const { data: isAdmin } = useIsAdmin();
  const router = useRouter();

  const { word, difficulty, gameStatus } = useAppSelector(
    (state) => state.game,
  );

  useEffect(() => {
    if (word && difficulty !== null && gameStatus === GameStatus.PLAYING) {
      router.push(`/game?difficulty=${difficulty}`);
    }
  }, [word, difficulty, gameStatus, router]);

  return (
    <div className="flex min-h-screen items-center justify-center bg-zinc-50 font-sans dark:bg-black">
      <main className="min-h-screen w-full max-w-3xlpy-32 px-16 bg-white dark:bg-black sm:items-start pt-20">
        <div className="flex flex-col gap-20 items-center">
          <div className="flex flex-col gap-4">
            <h1 className="text-6xl text-center w-full">Gallows</h1>
            <h2 className="text-2xl text-center w-full">
              Choose a difficulty to start playing
            </h2>
            <div className="flex flex-col gap-2">
              <UserMenu user={user} isAdmin={isAdmin} />
            </div>
          </div>
          <HomePage />
        </div>
      </main>
    </div>
  );
}
