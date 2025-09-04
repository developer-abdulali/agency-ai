import { StreamChat } from "stream-chat";
import "dotenv/config";

// create streamClient to allow access stream
const streamClient = StreamChat.getInstance(
  process.env.STREAM_API_KEY,
  process.env.STREAM_API_SECRET
);

export const upsertStreamUser = async (userData) => {
  try {
    await streamClient.upsertUser(userData);
    console.log("Stream user upserted successfully:", userData.name);
    return userData;
  } catch (error) {
    console.log("Error upserting Stream user:", error);
  }
};

export const deleteStreamUser = async (userId) => {
  try {
    await streamClient.deleteUser(userId);
    console.log("Stream user deleted successfully:", userId);
  } catch (error) {
    console.error("Error deleting Stream user:", error);
  }
};

export const generateStreamToken = (userId) => {
  try {
    const userIdString = userId.toString();
    return streamClient.createToken(userIdString);
  } catch (error) {
    console.log("Error generating Stream token:", error);
    return null;
  }
};

export const addUserToPublicChannels = async (newUserId) => {
  const publicChannels = await streamClient.queryChannels({
    discoverable: true,
  });

  for (const channel of publicChannels) {
    await channel.addMembers([newUserId]);
  }
};
