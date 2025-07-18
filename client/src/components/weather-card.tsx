import { Card, CardContent } from "@/components/ui/card";
import { getWeatherIcon, getWeatherColor } from "@/services/weather";
import { useTheme } from "@/contexts/ThemeContext";
import type { CurrentWeather } from "@/types/weather";

interface WeatherCardProps {
  weather: CurrentWeather;
  cityName: string;
  currentDate: string;
}

export function WeatherCard({ weather, cityName, currentDate }: WeatherCardProps) {
  const { settings } = useTheme();
  const mainWeather = weather.weather[0];
  const iconClass = getWeatherIcon(mainWeather.icon);
  const colorClass = getWeatherColor(mainWeather.icon);

  // Convert temperature based on user preference
  const convertTemp = (temp: number) => {
    if (settings.temperatureUnit === 'fahrenheit') {
      return Math.round((temp * 9/5) + 32);
    }
    return Math.round(temp);
  };

  const tempUnit = settings.temperatureUnit === 'fahrenheit' ? 'F' : 'C';

  return (
    <Card className="weather-card mb-6 bg-card dark:bg-card border-border">
      <CardContent className="p-6">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h2 className="text-2xl font-bold text-foreground">{cityName}</h2>
            <p className="text-muted-foreground">{currentDate}</p>
          </div>
          <div className="text-right">
            <span className="text-4xl font-bold text-purple-600 english-numbers">
              {convertTemp(weather.temp)}°
            </span>
            <span className="text-xl text-muted-foreground">{tempUnit}</span>
          </div>
        </div>
        
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <i className={`${iconClass} ${colorClass} text-3xl mr-3`}></i>
            <div>
              <p className="text-lg font-medium text-foreground">{mainWeather.description}</p>
              <p className="text-sm text-muted-foreground english-numbers">
                يبدو وكأنه {convertTemp(weather.feels_like)}°
              </p>
            </div>
          </div>
          <div className="text-right">
            <p className="text-sm text-muted-foreground english-numbers">
              الرطوبة: {weather.humidity}%
            </p>
            <p className="text-sm text-muted-foreground english-numbers">
              الرياح: {Math.round(weather.wind_speed)} كم/س
            </p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
