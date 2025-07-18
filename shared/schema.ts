import { pgTable, text, serial, integer, boolean, timestamp } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

export const users = pgTable("users", {
  id: serial("id").primaryKey(),
  username: text("username").notNull().unique(),
  password: text("password").notNull(),
});

export const favoriteCities = pgTable("favorite_cities", {
  id: serial("id").primaryKey(),
  userId: integer("user_id").references(() => users.id),
  cityName: text("city_name").notNull(),
  country: text("country").notNull(),
  lat: text("lat").notNull(),
  lon: text("lon").notNull(),
  createdAt: timestamp("created_at").defaultNow(),
});

export const insertUserSchema = createInsertSchema(users).pick({
  username: true,
  password: true,
});

export const insertFavoriteCitySchema = createInsertSchema(favoriteCities).pick({
  userId: true,
  cityName: true,
  country: true,
  lat: true,
  lon: true,
});

export type InsertUser = z.infer<typeof insertUserSchema>;
export type User = typeof users.$inferSelect;
export type InsertFavoriteCity = z.infer<typeof insertFavoriteCitySchema>;
export type FavoriteCity = typeof favoriteCities.$inferSelect;

// Weather API response schemas
export const weatherDataSchema = z.object({
  current: z.object({
    temp: z.number(),
    feels_like: z.number(),
    humidity: z.number(),
    wind_speed: z.number(),
    weather: z.array(z.object({
      main: z.string(),
      description: z.string(),
      icon: z.string(),
    })),
  }),
  daily: z.array(z.object({
    dt: z.number(),
    temp: z.object({
      min: z.number(),
      max: z.number(),
    }),
    weather: z.array(z.object({
      main: z.string(),
      description: z.string(),
      icon: z.string(),
    })),
  })),
});

export type WeatherData = z.infer<typeof weatherDataSchema>;

export const citySearchSchema = z.object({
  name: z.string(),
  country: z.string(),
  lat: z.number(),
  lon: z.number(),
});

export type CitySearch = z.infer<typeof citySearchSchema>;
