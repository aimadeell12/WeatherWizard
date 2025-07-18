import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { z } from "zod";

const WEATHERAPI_KEY = process.env.WEATHERAPI_KEY || "";

export async function registerRoutes(app: Express): Promise<Server> {
  
  // Search cities endpoint
  app.get("/api/cities/search", async (req, res) => {
    try {
      const { q } = req.query;
      if (!q || typeof q !== "string") {
        return res.status(400).json({ error: "Query parameter 'q' is required" });
      }

      const response = await fetch(
        `https://api.weatherapi.com/v1/search.json?key=${WEATHERAPI_KEY}&q=${encodeURIComponent(q)}`
      );

      if (!response.ok) {
        throw new Error(`WeatherAPI error: ${response.status}`);
      }

      const data = await response.json();
      const cities = data.map((city: any) => ({
        name: city.name,
        country: city.country,
        lat: city.lat,
        lon: city.lon,
        region: city.region || "",
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
        `https://api.weatherapi.com/v1/forecast.json?key=${WEATHERAPI_KEY}&q=${lat},${lon}&days=7&aqi=no&alerts=no&lang=ar`
      );

      if (!response.ok) {
        throw new Error(`WeatherAPI error: ${response.status}`);
      }

      const data = await response.json();
      
      // Convert WeatherAPI response to match our existing structure
      const weatherData = {
        current: {
          temp: data.current.temp_c,
          feels_like: data.current.feelslike_c,
          humidity: data.current.humidity,
          wind_speed: data.current.wind_kph,
          weather: [{
            main: data.current.condition.text,
            description: data.current.condition.text,
            icon: data.current.condition.icon.split('/').pop()?.split('.')[0] || '01d'
          }]
        },
        daily: data.forecast.forecastday.map((day: any) => ({
          dt: new Date(day.date).getTime() / 1000,
          temp: {
            min: day.day.mintemp_c,
            max: day.day.maxtemp_c
          },
          weather: [{
            main: day.day.condition.text,
            description: day.day.condition.text,
            icon: day.day.condition.icon.split('/').pop()?.split('.')[0] || '01d'
          }]
        }))
      };

      res.json(weatherData);
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
        `https://api.weatherapi.com/v1/current.json?key=${WEATHERAPI_KEY}&q=${encodeURIComponent(q)}&aqi=no&lang=ar`
      );

      if (!response.ok) {
        throw new Error(`WeatherAPI error: ${response.status}`);
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
