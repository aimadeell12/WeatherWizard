import { Card, CardContent } from "@/components/ui/card";
import { getWeatherIcon, getWeatherColor } from "@/services/weather";
import type { CurrentWeather } from "@/types/weather";

interface WeatherCardProps {
  weather: CurrentWeather;
  cityName: string;
  currentDate: string;
}

export function WeatherCard({ weather, cityName, currentDate }: WeatherCardProps) {
  const mainWeather = weather.weather[0];
  const iconClass = getWeatherIcon(mainWeather.icon);
  const colorClass = getWeatherColor(mainWeather.icon);

  return (
    <Card className="weather-card mb-6">
      <CardContent className="p-6">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h2 className="text-2xl font-bold text-gray-800">{cityName}</h2>
            <p className="text-gray-600">{currentDate}</p>
          </div>
          <div className="text-right">
            <span className="text-4xl font-bold text-purple-600 english-numbers">
              {Math.round(weather.temp)}°
            </span>
            <span className="text-xl text-gray-600">C</span>
          </div>
        </div>
        
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <i className={`${iconClass} ${colorClass} text-3xl mr-3`}></i>
            <div>
              <p className="text-lg font-medium">{mainWeather.description}</p>
              <p className="text-sm text-gray-600 english-numbers">
                يبدو وكأنه {Math.round(weather.feels_like)}°
              </p>
            </div>
          </div>
          <div className="text-right">
            <p className="text-sm text-gray-600 english-numbers">
              الرطوبة: {weather.humidity}%
            </p>
            <p className="text-sm text-gray-600 english-numbers">
              الرياح: {Math.round(weather.wind_speed)} كم/س
            </p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
