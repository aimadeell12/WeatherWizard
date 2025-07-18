import { Card, CardContent } from "@/components/ui/card";
import { getWeatherIcon, getWeatherColor } from "@/services/weather";
import type { DailyWeather } from "@/types/weather";

interface ForecastCardProps {
  forecast: DailyWeather[];
}

export function ForecastCard({ forecast }: ForecastCardProps) {
  const getDayName = (timestamp: number) => {
    const date = new Date(timestamp * 1000);
    return date.toLocaleDateString("ar-EG", { weekday: "long", calendar: "gregory" });
  };

  return (
    <Card className="weather-card">
      <CardContent className="p-6">
        <h3 className="text-xl font-bold mb-4">توقعات الأسبوع</h3>
        <div className="space-y-3">
          {forecast.slice(0, 5).map((day, index) => {
            const weather = day.weather[0];
            const iconClass = getWeatherIcon(weather.icon);
            const colorClass = getWeatherColor(weather.icon);
            
            return (
              <div key={index} className="forecast-item">
                <div className="flex items-center">
                  <i className={`${iconClass} ${colorClass} text-xl ml-3`}></i>
                  <div>
                    <p className="font-medium">{getDayName(day.dt)}</p>
                    <p className="text-sm text-gray-600">{weather.description}</p>
                  </div>
                </div>
                <div className="text-right">
                  <span className="text-lg font-bold">
                    {Math.round(day.temp.max)}°
                  </span>
                  <span className="text-gray-600 mx-2">/</span>
                  <span className="text-gray-600">
                    {Math.round(day.temp.min)}°
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </CardContent>
    </Card>
  );
}
