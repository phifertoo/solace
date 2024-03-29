// pages/api/users/[userId]/notes/index.ts

import type { NextApiRequest, NextApiResponse } from "next";
import admin from "@/utils/firebaseServer";
import { authenticate } from "@/utils/authMiddleware";

// Assuming the structure of a note for TypeScript typing
interface Note {
  id: string;
  content: string;
  updatedAt: Date;
}

// Adjust the response type according to what you expect to return
type Data = {
  message?: string;
  notes?: Note[];
};

const db = admin.firestore();

const handler = async (req: NextApiRequest, res: NextApiResponse<Data>) => {
  // First, authenticate the request
  try {
    await authenticate(req);
  } catch (error) {
    console.error("Authentication error:", error);
    return res.status(401).json({ message: "Unauthorized" });
  }

  // Process only GET requests, as per the new file's purpose
  if (req.method === "GET") {
    const { userId } = req.query;

    if (!userId || typeof userId !== "string") {
      return res.status(400).json({ message: "Invalid or missing user ID." });
    }

    try {
      const querySnapshot = await db
        .collection("notes")
        .where("userId", "==", userId)
        .get();

      const notes = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      })) as Note[];

      return res.status(200).json({ notes });
    } catch (error) {
      console.error("Failed to get notes:", error);
      return res.status(500).json({ message: "Failed to get notes." });
    }
  } else {
    // If a non-GET request is made, inform the client that only GET is allowed
    res.setHeader("Allow", ["GET"]);
    return res.status(405).end(`Method ${req.method} Not Allowed`);
  }
};

export default handler;
