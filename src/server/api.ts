import express from "express";

const apiRouter = express.Router();

apiRouter.get("/health", (req, res) => {
  res.json({ status: "ok", time: new Date().toISOString() });
});

apiRouter.post("/roblox/users", async (req, res) => {
  const { usernames } = req.body;
  console.log("API: Fetching Roblox users:", usernames);
  
  if (!usernames || !Array.isArray(usernames)) {
    return res.status(400).json({ error: "Usernames array is required" });
  }

  try {
    const usersResponse = await fetch("https://users.roblox.com/v1/usernames/users", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ usernames, excludeBannedUsers: true })
    });
    
    if (!usersResponse.ok) {
      throw new Error(`Roblox Users API failed: ${usersResponse.status}`);
    }

    const usersData = await usersResponse.json();
    if (!usersData.data || usersData.data.length === 0) {
      return res.status(404).json({ error: "Users not found" });
    }

    const userIds = usersData.data.map((u: any) => u.id);
    const avatarsResponse = await fetch(`https://thumbnails.roblox.com/v1/users/avatar-headshot?userIds=${userIds.join(",")}&size=420x420&format=Png&isCircular=false`);
    const avatarsData = await avatarsResponse.json();

    const result = usersData.data.map((u: any) => {
      const avatar = avatarsData.data?.find((a: any) => a.targetId === u.id);
      return {
        id: u.id,
        username: u.name,
        displayName: u.displayName,
        avatarUrl: avatar ? avatar.imageUrl : null
      };
    });

    res.json(result);
  } catch (error) {
    console.error("API Error (users):", error);
    res.status(500).json({ error: "Failed to fetch Roblox users", details: error instanceof Error ? error.message : String(error) });
  }
});

apiRouter.get("/roblox/game/:placeId", async (req, res) => {
  const { placeId } = req.params;
  console.log("API: Fetching Roblox game:", placeId);
  
  try {
    const universeResponse = await fetch(`https://apis.roblox.com/universes/v1/places/${placeId}/universe`);
    if (!universeResponse.ok) {
      throw new Error(`Universe API failed: ${universeResponse.status}`);
    }
    const universeData = await universeResponse.json();
    const universeId = universeData.universeId;

    if (!universeId) {
      return res.status(404).json({ error: "Universe ID not found" });
    }

    const gameDetailsResponse = await fetch(`https://games.roblox.com/v1/games?universeIds=${universeId}`);
    const gameDetails = await gameDetailsResponse.json();

    if (!gameDetails.data || gameDetails.data.length === 0) {
      return res.status(404).json({ error: "Game details not found" });
    }

    const iconResponse = await fetch(`https://thumbnails.roblox.com/v1/games/icons?universeIds=${universeId}&returnPolicy=PlaceHolder&size=512x512&format=Png&isCircular=false`);
    const iconData = await iconResponse.json();
    
    const game = gameDetails.data[0];
    const icon = iconData.data?.[0]?.imageUrl || "https://picsum.photos/seed/roblox/512/512";
    
    res.json({
      id: universeId,
      placeId: placeId,
      name: game.name,
      description: game.description,
      playing: game.playing || 0,
      visits: game.visits || 0,
      favoritedCount: game.favoritedCount || 0,
      rating: game.rating || 0,
      icon: icon
    });
  } catch (error) {
    console.error("API Error (game):", error);
    res.status(500).json({ error: "Failed to fetch Roblox game data", details: error instanceof Error ? error.message : String(error) });
  }
});

export default apiRouter;
