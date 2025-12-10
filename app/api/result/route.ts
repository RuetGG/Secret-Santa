import { NextRequest, NextResponse } from "next/server";

export const PLAYERS = ['Yo', 'Abi E.', 'Ruth E.', 'Hawi', 'Abi G.', 'Fra', 'Ruth G.', 'Sara', 'Kari'];
export let PAIRS: Record<string, string> = {};

export function shuffleAndPair() {
  const names = [...PLAYERS];
  const shuffled = [...names];

  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }

  for (let i = 0; i < names.length; i++) {
    if (shuffled[i] === names[i]) {
      const swapWith = i === names.length - 1 ? 0 : i + 1;
      [shuffled[i], shuffled[swapWith]] = [shuffled[swapWith], shuffled[i]];
    }
    PAIRS[names[i]] = shuffled[i];
  }
}

// Only generate once
if (Object.keys(PAIRS).length === 0) {
  shuffleAndPair();
}

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const name = searchParams.get("name");

  if (!name || !PLAYERS.includes(name)) {
    return NextResponse.json({ error: "Name not found" });
  }

  return NextResponse.json({ target: PAIRS[name] });
}
