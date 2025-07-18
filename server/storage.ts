import { users, favoriteCities, type User, type InsertUser, type FavoriteCity, type InsertFavoriteCity } from "@shared/schema";

export interface IStorage {
  getUser(id: number): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;
  getFavoriteCities(userId: number): Promise<FavoriteCity[]>;
  addFavoriteCity(favoriteCity: InsertFavoriteCity): Promise<FavoriteCity>;
  removeFavoriteCity(userId: number, cityName: string): Promise<void>;
}

export class MemStorage implements IStorage {
  private users: Map<number, User>;
  private favoriteCities: Map<number, FavoriteCity>;
  private currentUserId: number;
  private currentFavoriteCityId: number;

  constructor() {
    this.users = new Map();
    this.favoriteCities = new Map();
    this.currentUserId = 1;
    this.currentFavoriteCityId = 1;
  }

  async getUser(id: number): Promise<User | undefined> {
    return this.users.get(id);
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    return Array.from(this.users.values()).find(
      (user) => user.username === username,
    );
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const id = this.currentUserId++;
    const user: User = { ...insertUser, id };
    this.users.set(id, user);
    return user;
  }

  async getFavoriteCities(userId: number): Promise<FavoriteCity[]> {
    return Array.from(this.favoriteCities.values()).filter(
      (city) => city.userId === userId,
    );
  }

  async addFavoriteCity(insertFavoriteCity: InsertFavoriteCity): Promise<FavoriteCity> {
    const id = this.currentFavoriteCityId++;
    const favoriteCity: FavoriteCity = { 
      ...insertFavoriteCity, 
      id,
      createdAt: new Date()
    };
    this.favoriteCities.set(id, favoriteCity);
    return favoriteCity;
  }

  async removeFavoriteCity(userId: number, cityName: string): Promise<void> {
    const cityToRemove = Array.from(this.favoriteCities.values()).find(
      (city) => city.userId === userId && city.cityName === cityName,
    );
    if (cityToRemove) {
      this.favoriteCities.delete(cityToRemove.id);
    }
  }
}

export const storage = new MemStorage();
