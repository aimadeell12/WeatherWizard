import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Heart, MapPin, Thermometer, Wind, Droplets, Trash2 } from 'lucide-react';
import { Navigation } from '@/components/navigation';

interface FavoriteCity {
  id: string;
  name: string;
  country: string;
  lat: number;
  lon: number;
  addedAt: string;
}

interface WeatherData {
  temp: number;
  feels_like: number;
  humidity: number;
  wind_speed: number;
  weather: Array<{
    main: string;
    description: string;
  }>;
}

export default function Favorites() {
  const [favorites, setFavorites] = useState<FavoriteCity[]>([]);
  const [weatherData, setWeatherData] = useState<Record<string, WeatherData>>({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Load favorites from localStorage
    const savedFavorites = localStorage.getItem('favoriteCities');
    if (savedFavorites) {
      const parsedFavorites = JSON.parse(savedFavorites);
      setFavorites(parsedFavorites);
      
      // Load weather data for each favorite
      parsedFavorites.forEach(async (city: FavoriteCity) => {
        try {
          const response = await fetch(`/api/weather?lat=${city.lat}&lon=${city.lon}`);
          if (response.ok) {
            const data = await response.json();
            setWeatherData(prev => ({
              ...prev,
              [city.id]: data.current
            }));
          }
        } catch (error) {
          console.error('Error loading weather for', city.name, error);
        }
      });
    }
    setLoading(false);
  }, []);

  const removeFavorite = (cityId: string) => {
    const updatedFavorites = favorites.filter(city => city.id !== cityId);
    setFavorites(updatedFavorites);
    localStorage.setItem('favoriteCities', JSON.stringify(updatedFavorites));
    
    // Remove weather data for this city
    setWeatherData(prev => {
      const updated = { ...prev };
      delete updated[cityId];
      return updated;
    });
  };

  const getCurrentDate = () => {
    return new Date().toLocaleDateString("ar-EG-u-nu-latn", {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
      calendar: "gregory"
    });
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-400 via-purple-500 to-purple-600">
        <div className="container mx-auto px-4 py-6 pb-20">
          <div className="text-center text-white">
            <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-white"></div>
            <p className="mt-2">جاري تحميل المفضلة...</p>
          </div>
        </div>
        <Navigation />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-400 via-purple-500 to-purple-600">
      {/* Header */}
      <header className="bg-primary shadow-lg">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <Heart className="w-8 h-8 text-white mr-3" />
              <h1 className="text-2xl font-bold text-white">المدن المفضلة</h1>
            </div>
            <p className="text-sm text-white/80">{getCurrentDate()}</p>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-6 pb-20">
        {favorites.length === 0 ? (
          <div className="text-center text-white">
            <Heart className="w-16 h-16 mx-auto mb-4 opacity-50" />
            <h2 className="text-xl font-bold mb-2">لا توجد مدن مفضلة</h2>
            <p className="text-white/80">ابحث عن مدينة وأضفها إلى المفضلة لتظهر هنا</p>
          </div>
        ) : (
          <div className="grid gap-4">
            {favorites.map((city) => (
              <Card key={city.id} className="bg-white/95 backdrop-blur-sm">
                <CardHeader className="pb-3">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <MapPin className="w-5 h-5 text-purple-600 mr-2" />
                      <div>
                        <CardTitle className="text-lg">{city.name}</CardTitle>
                        <p className="text-sm text-gray-600">{city.country}</p>
                      </div>
                    </div>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => removeFavorite(city.id)}
                      className="text-red-500 hover:text-red-600 hover:bg-red-50"
                    >
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </div>
                </CardHeader>
                <CardContent>
                  {weatherData[city.id] ? (
                    <div className="grid grid-cols-2 gap-4">
                      <div className="flex items-center">
                        <Thermometer className="w-5 h-5 text-purple-500 mr-2" />
                        <div>
                          <p className="text-sm text-gray-600">الحرارة</p>
                          <p className="text-lg font-bold english-numbers">
                            {Math.round(weatherData[city.id].temp)}°C
                          </p>
                        </div>
                      </div>
                      <div className="flex items-center">
                        <Wind className="w-5 h-5 text-purple-400 mr-2" />
                        <div>
                          <p className="text-sm text-gray-600">الرياح</p>
                          <p className="text-lg font-bold english-numbers">
                            {Math.round(weatherData[city.id].wind_speed)} كم/س
                          </p>
                        </div>
                      </div>
                      <div className="flex items-center">
                        <Droplets className="w-5 h-5 text-purple-600 mr-2" />
                        <div>
                          <p className="text-sm text-gray-600">الرطوبة</p>
                          <p className="text-lg font-bold english-numbers">
                            {weatherData[city.id].humidity}%
                          </p>
                        </div>
                      </div>
                      <div className="flex items-center">
                        <div className="w-5 h-5 mr-2 flex items-center justify-center">
                          <div className="w-3 h-3 bg-purple-500 rounded-full"></div>
                        </div>
                        <div>
                          <p className="text-sm text-gray-600">الحالة</p>
                          <p className="text-sm font-medium">
                            {weatherData[city.id].weather[0]?.description || 'غير محدد'}
                          </p>
                        </div>
                      </div>
                    </div>
                  ) : (
                    <div className="text-center text-gray-500">
                      <div className="inline-block animate-spin rounded-full h-6 w-6 border-b-2 border-purple-500"></div>
                      <p className="mt-2 text-sm">جاري تحميل بيانات الطقس...</p>
                    </div>
                  )}
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </main>

      <Navigation />
    </div>
  );
}