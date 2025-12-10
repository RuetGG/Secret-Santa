import { NextResponse } from "next/server";
import { PAIRS, PLAYERS, shuffleAndPair } from "../result/route"; 

export async function POST() {
  shuffleAndPair();
  return NextResponse.json({ success: true });
}
