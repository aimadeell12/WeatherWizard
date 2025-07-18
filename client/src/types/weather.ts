export interface WeatherCondition {
  main: string;
  description: string;
  icon: string;
}

export interface CurrentWeather {
  temp: number;
  feels_like: number;
  humidity: number;
  wind_speed: number;
  weather: WeatherCondition[];
}

export interface DailyWeather {
  dt: number;
  temp: {
    min: number;
    max: number;
  };
  weather: WeatherCondition[];
}

export interface WeatherData {
  current: CurrentWeather;
  daily: DailyWeather[];
}

export interface CityResult {
  name: string;
  country: string;
  lat: number;
  lon: number;
  state?: string;
}

export interface FavoriteCity {
  id: number;
  userId: number;
  cityName: string;
  country: string;
  lat: string;
  lon: string;
  createdAt: Date;
}
