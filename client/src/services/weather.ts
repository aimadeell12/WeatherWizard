import { apiRequest } from "@/lib/queryClient";
import type { WeatherData, CityResult, FavoriteCity } from "@/types/weather";

export const weatherService = {
  async searchCities(query: string): Promise<CityResult[]> {
    const response = await apiRequest("GET", `/api/cities/search?q=${encodeURIComponent(query)}`);
    return response.json();
  },

  async getWeather(lat: number, lon: number): Promise<WeatherData> {
    const response = await apiRequest("GET", `/api/weather?lat=${lat}&lon=${lon}`);
    return response.json();
  },

  async getCurrentWeather(cityName: string): Promise<any> {
    const response = await apiRequest("GET", `/api/weather/current?q=${encodeURIComponent(cityName)}`);
    return response.json();
  },

  async getFavoriteCities(userId: number): Promise<FavoriteCity[]> {
    const response = await apiRequest("GET", `/api/favorites/${userId}`);
    return response.json();
  },

  async addFavoriteCity(favorite: Omit<FavoriteCity, "id" | "createdAt">): Promise<FavoriteCity> {
    const response = await apiRequest("POST", "/api/favorites", favorite);
    return response.json();
  },

  async removeFavoriteCity(userId: number, cityName: string): Promise<void> {
    await apiRequest("DELETE", `/api/favorites/${userId}/${encodeURIComponent(cityName)}`);
  },
};

export const getWeatherIcon = (iconCode: string) => {
  const iconMap: { [key: string]: string } = {
    "01d": "fas fa-sun",
    "01n": "fas fa-moon",
    "02d": "fas fa-cloud-sun",
    "02n": "fas fa-cloud-moon",
    "03d": "fas fa-cloud",
    "03n": "fas fa-cloud",
    "04d": "fas fa-cloud",
    "04n": "fas fa-cloud",
    "09d": "fas fa-cloud-showers-heavy",
    "09n": "fas fa-cloud-showers-heavy",
    "10d": "fas fa-cloud-rain",
    "10n": "fas fa-cloud-rain",
    "11d": "fas fa-bolt",
    "11n": "fas fa-bolt",
    "13d": "fas fa-snowflake",
    "13n": "fas fa-snowflake",
    "50d": "fas fa-smog",
    "50n": "fas fa-smog",
  };
  return iconMap[iconCode] || "fas fa-sun";
};

export const getWeatherColor = (iconCode: string) => {
  const colorMap: { [key: string]: string } = {
    "01d": "text-yellow-500",
    "01n": "text-gray-300",
    "02d": "text-yellow-400",
    "02n": "text-gray-400",
    "03d": "text-gray-500",
    "03n": "text-gray-500",
    "04d": "text-gray-600",
    "04n": "text-gray-600",
    "09d": "text-blue-500",
    "09n": "text-blue-500",
    "10d": "text-blue-600",
    "10n": "text-blue-600",
    "11d": "text-purple-500",
    "11n": "text-purple-500",
    "13d": "text-blue-200",
    "13n": "text-blue-200",
    "50d": "text-gray-400",
    "50n": "text-gray-400",
  };
  return colorMap[iconCode] || "text-yellow-500";
};
