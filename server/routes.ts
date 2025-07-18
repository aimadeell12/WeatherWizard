import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { z } from "zod";

const OPENWEATHER_API_KEY = process.env.OPENWEATHER_API_KEY || process.env.OPENWEATHERMAP_API_KEY || "";

export async function registerRoutes(app: Express): Promise<Server> {
  
  // Search cities endpoint
  app.get("/api/cities/search", async (req, res) => {
    try {
      const { q } = req.query;
      if (!q || typeof q !== "string") {
        return res.status(400).json({ error: "Query parameter 'q' is required" });
      }

      const response = await fetch(
        `https://api.openweathermap.org/geo/1.0/direct?q=${encodeURIComponent(q)}&limit=5&appid=${OPENWEATHER_API_KEY}`
      );

      if (!response.ok) {
        throw new Error(`OpenWeather API error: ${response.status}`);
      }

      const data = await response.json();
      const cities = data.map((city: any) => ({
        name: city.name,
        country: city.country,
        lat: city.lat,
        lon: city.lon,
        state: city.state || "",
      }));

      res.json(cities);
    } catch (error) {
      console.error("Error searching cities:", error);
      res.status(500).json({ error: "Failed to search cities" });
    }
  });

  // Get weather data endpoint
  app.get("/api/weather", async (req, res) => {
    try {
      const { lat, lon } = req.query;
      if (!lat || !lon) {
        return res.status(400).json({ error: "Latitude and longitude are required" });
      }

      const response = await fetch(
        `https://api.openweathermap.org/data/3.0/onecall?lat=${lat}&lon=${lon}&exclude=minutely,hourly,alerts&units=metric&lang=ar&appid=${OPENWEATHER_API_KEY}`
      );

      if (!response.ok) {
        throw new Error(`OpenWeather API error: ${response.status}`);
      }

      const data = await response.json();
      res.json(data);
    } catch (error) {
      console.error("Error fetching weather data:", error);
      res.status(500).json({ error: "Failed to fetch weather data" });
    }
  });

  // Get current weather for city
  app.get("/api/weather/current", async (req, res) => {
    try {
      const { q } = req.query;
      if (!q || typeof q !== "string") {
        return res.status(400).json({ error: "Query parameter 'q' is required" });
      }

      const response = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${encodeURIComponent(q)}&units=metric&lang=ar&appid=${OPENWEATHER_API_KEY}`
      );

      if (!response.ok) {
        throw new Error(`OpenWeather API error: ${response.status}`);
      }

      const data = await response.json();
      res.json(data);
    } catch (error) {
      console.error("Error fetching current weather:", error);
      res.status(500).json({ error: "Failed to fetch current weather" });
    }
  });

  // Favorite cities endpoints
  app.get("/api/favorites/:userId", async (req, res) => {
    try {
      const userId = parseInt(req.params.userId);
      const favorites = await storage.getFavoriteCities(userId);
      res.json(favorites);
    } catch (error) {
      console.error("Error fetching favorites:", error);
      res.status(500).json({ error: "Failed to fetch favorite cities" });
    }
  });

  app.post("/api/favorites", async (req, res) => {
    try {
      const { userId, cityName, country, lat, lon } = req.body;
      
      if (!userId || !cityName || !country || !lat || !lon) {
        return res.status(400).json({ error: "All fields are required" });
      }

      const favorite = await storage.addFavoriteCity({
        userId,
        cityName,
        country,
        lat,
        lon,
      });

      res.json(favorite);
    } catch (error) {
      console.error("Error adding favorite:", error);
      res.status(500).json({ error: "Failed to add favorite city" });
    }
  });

  app.delete("/api/favorites/:userId/:cityName", async (req, res) => {
    try {
      const userId = parseInt(req.params.userId);
      const cityName = req.params.cityName;
      
      await storage.removeFavoriteCity(userId, cityName);
      res.json({ success: true });
    } catch (error) {
      console.error("Error removing favorite:", error);
      res.status(500).json({ error: "Failed to remove favorite city" });
    }
  });

  const httpServer = createServer(app);
  return httpServer;
}
