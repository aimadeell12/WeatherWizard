import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { TrendingUp, Search, MapPin, Thermometer, Wind, Droplets, Cloud } from 'lucide-react';
import { Navigation } from '@/components/navigation';

interface CityResult {
  id: number;
  name: string;
  region: string;
  country: string;
  lat: number;
  lon: number;
  url: string;
}

interface DailyWeather {
  dt: number;
  temp: {
    day: number;
    min: number;
    max: number;
    night: number;
    eve: number;
    morn: number;
  };
  feels_like: {
    day: number;
    night: number;
    eve: number;
    morn: number;
  };
  pressure: number;
  humidity: number;
  weather: Array<{
    id: number;
    main: string;
    description: string;
    icon: string;
  }>;
  wind_speed: number;
  wind_deg: number;
  clouds: number;
  pop: number;
  uvi: number;
}

interface WeatherData {
  daily: DailyWeather[];
}

export default function Forecast() {
  const [searchTerm, setSearchTerm] = useState('');
  const [searchResults, setSearchResults] = useState<CityResult[]>([]);
  const [selectedCity, setSelectedCity] = useState<CityResult | null>(null);
  const [weatherData, setWeatherData] = useState<WeatherData | null>(null);
  const [isSearching, setIsSearching] = useState(false);
  const [isLoadingWeather, setIsLoadingWeather] = useState(false);

  const searchCities = async (query: string) => {
    if (query.length < 2) {
      setSearchResults([]);
      return;
    }

    setIsSearching(true);
    try {
      const response = await fetch(`/api/cities/search?q=${encodeURIComponent(query)}`);
      if (response.ok) {
        const data = await response.json();
        setSearchResults(data);
      }
    } catch (error) {
      console.error('Error searching cities:', error);
    } finally {
      setIsSearching(false);
    }
  };

  const selectCity = async (city: CityResult) => {
    setSelectedCity(city);
    setSearchTerm(city.name);
    setSearchResults([]);
    setIsLoadingWeather(true);

    try {
      const response = await fetch(`/api/weather?lat=${city.lat}&lon=${city.lon}`);
      if (response.ok) {
        const data = await response.json();
        setWeatherData(data);
      }
    } catch (error) {
      console.error('Error loading weather:', error);
    } finally {
      setIsLoadingWeather(false);
    }
  };

  const getDayName = (timestamp: number) => {
    const date = new Date(timestamp * 1000);
    return date.toLocaleDateString("ar-EG-u-nu-latn", { weekday: "long", calendar: "gregory" });
  };

  const getDate = (timestamp: number) => {
    const date = new Date(timestamp * 1000);
    return date.toLocaleDateString("ar-EG-u-nu-latn", { 
      month: "short", 
      day: "numeric",
      calendar: "gregory"
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

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      if (searchTerm) {
        searchCities(searchTerm);
      }
    }, 300);

    return () => clearTimeout(timeoutId);
  }, [searchTerm]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-400 via-purple-500 to-purple-600">
      {/* Header */}
      <header className="bg-primary shadow-lg">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <TrendingUp className="w-8 h-8 text-white mr-3" />
              <h1 className="text-2xl font-bold text-white">التوقعات الأسبوعية</h1>
            </div>
            <p className="text-sm text-white/80">{getCurrentDate()}</p>
          </div>
          
          {/* Search Section */}
          <div className="mt-4 relative">
            <div className="relative">
              <Search className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <Input
                type="text"
                placeholder="ابحث عن مدينة..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pr-10 pl-4 py-2 bg-white/90 backdrop-blur-sm border-none text-right"
              />
            </div>
            
            {/* Search Results */}
            {(isSearching || searchResults.length > 0) && (
              <div className="absolute top-full left-0 right-0 bg-white/95 backdrop-blur-sm rounded-lg shadow-lg mt-2 z-10 max-h-60 overflow-y-auto">
                {isSearching ? (
                  <div className="p-4 text-center text-gray-600">جاري البحث...</div>
                ) : (
                  searchResults.map((city) => (
                    <button
                      key={city.id}
                      onClick={() => selectCity(city)}
                      className="w-full text-right p-3 hover:bg-purple-50 border-b border-gray-100 last:border-b-0 transition-colors"
                    >
                      <div className="flex items-center">
                        <MapPin className="w-4 h-4 text-purple-600 mr-2" />
                        <div>
                          <p className="font-medium">{city.name}</p>
                          <p className="text-sm text-gray-600">{city.region}, {city.country}</p>
                        </div>
                      </div>
                    </button>
                  ))
                )}
              </div>
            )}
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-6 pb-20">
        {isLoadingWeather ? (
          <div className="text-center text-white">
            <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-white"></div>
            <p className="mt-2">جاري تحميل التوقعات...</p>
          </div>
        ) : weatherData && selectedCity ? (
          <div className="space-y-4">
            <div className="text-center text-white mb-6">
              <h2 className="text-xl font-bold">{selectedCity.name}</h2>
              <p className="text-white/80">التوقعات للأيام القادمة</p>
            </div>

            {/* Weekly Forecast */}
            <div className="grid gap-4">
              {weatherData.daily.slice(0, 7).map((day, index) => (
                <Card key={day.dt} className="bg-white/95 backdrop-blur-sm">
                  <CardContent className="p-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center">
                        <Cloud className="w-8 h-8 text-purple-500 mr-3" />
                        <div>
                          <p className="font-bold">
                            {index === 0 ? 'اليوم' : getDayName(day.dt)}
                          </p>
                          <p className="text-sm text-gray-600">
                            {getDate(day.dt)}
                          </p>
                          <p className="text-sm text-gray-600">
                            {day.weather[0]?.description || 'غير محدد'}
                          </p>
                        </div>
                      </div>
                      
                      <div className="flex items-center space-x-4 space-x-reverse">
                        <div className="text-right">
                          <div className="flex items-center">
                            <span className="text-2xl font-bold text-purple-600 english-numbers">
                              {Math.round(day.temp.max)}°
                            </span>
                            <span className="text-gray-600 mx-2">/</span>
                            <span className="text-lg text-gray-600 english-numbers">
                              {Math.round(day.temp.min)}°
                            </span>
                          </div>
                        </div>
                        
                        <div className="text-right text-sm text-gray-600">
                          <div className="flex items-center mb-1">
                            <Droplets className="w-4 h-4 text-purple-600 mr-1" />
                            <span className="english-numbers">{day.humidity}%</span>
                          </div>
                          <div className="flex items-center">
                            <Wind className="w-4 h-4 text-purple-400 mr-1" />
                            <span className="english-numbers">{Math.round(day.wind_speed)} كم/س</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        ) : (
          <div className="text-center text-white">
            <TrendingUp className="w-16 h-16 mx-auto mb-4 opacity-50" />
            <h2 className="text-xl font-bold mb-2">توقعات الطقس الأسبوعية</h2>
            <p className="text-white/80">ابحث عن مدينة لعرض التوقعات لمدة 7 أيام</p>
          </div>
        )}
      </main>

      <Navigation />
    </div>
  );
}