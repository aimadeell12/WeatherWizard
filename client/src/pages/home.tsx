import { useState, useEffect, useCallback } from "react";
import { useQuery } from "@tanstack/react-query";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { WeatherCard } from "@/components/weather-card";
import { ForecastCard } from "@/components/forecast-card";
import { Navigation } from "@/components/navigation";
import { Sidebar } from "@/components/sidebar";
import { weatherService } from "@/services/weather";
import { useTheme } from "@/contexts/ThemeContext";
import { useAutoRefresh } from "@/hooks/useAutoRefresh";
import { Search, CloudSun, Heart, MapPin, Menu } from "lucide-react";
import type { CityResult, WeatherData } from "@/types/weather";

export default function Home() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCity, setSelectedCity] = useState<CityResult | null>(null);
  const [searchResults, setSearchResults] = useState<CityResult[]>([]);
  const [isSearching, setIsSearching] = useState(false);
  const [favorites, setFavorites] = useState<string[]>([]);
  const { settings } = useTheme();

  // Get current date in Arabic with Gregorian calendar and English numbers
  const getCurrentDate = () => {
    return new Date().toLocaleDateString("ar-EG-u-nu-latn", {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
      calendar: "gregory"
    });
  };

  // Search cities
  const handleSearch = async (query: string) => {
    if (query.length < 2) {
      setSearchResults([]);
      return;
    }

    setIsSearching(true);
    try {
      const cities = await weatherService.searchCities(query);
      setSearchResults(cities);
    } catch (error) {
      console.error("Error searching cities:", error);
      setSearchResults([]);
    } finally {
      setIsSearching(false);
    }
  };

  // Get weather data for selected city
  const { data: weatherData, isLoading: isLoadingWeather, refetch } = useQuery<WeatherData>({
    queryKey: [`/api/weather?lat=${selectedCity?.lat}&lon=${selectedCity?.lon}`],
    enabled: !!selectedCity,
  });

  // Auto-refresh callback
  const handleAutoRefresh = useCallback(() => {
    if (selectedCity) {
      refetch();
    }
  }, [selectedCity, refetch]);

  // Use auto-refresh hook
  useAutoRefresh(handleAutoRefresh);

  // Get user's location on mount
  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setSelectedCity({
            name: "موقعي الحالي",
            country: "",
            lat: position.coords.latitude,
            lon: position.coords.longitude,
          });
        },
        () => {
          // Default to Riyadh if location access denied
          setSelectedCity({
            name: "الرياض",
            country: "SA",
            lat: 24.7136,
            lon: 46.6753,
          });
        }
      );
    }
  }, []);

  useEffect(() => {
    // Load favorites from localStorage
    const savedFavorites = localStorage.getItem('favoriteCities');
    if (savedFavorites) {
      const parsedFavorites = JSON.parse(savedFavorites);
      setFavorites(parsedFavorites.map((city: any) => city.id));
    }
  }, []);

  const addToFavorites = (city: CityResult) => {
    const savedFavorites = localStorage.getItem('favoriteCities');
    const existingFavorites = savedFavorites ? JSON.parse(savedFavorites) : [];
    
    const favoriteCity = {
      id: `${city.lat}-${city.lon}`,
      name: city.name,
      country: city.country,
      lat: city.lat,
      lon: city.lon,
      addedAt: new Date().toISOString(),
    };
    
    const updatedFavorites = [...existingFavorites, favoriteCity];
    localStorage.setItem('favoriteCities', JSON.stringify(updatedFavorites));
    setFavorites(prev => [...prev, favoriteCity.id]);
  };

  const removeFromFavorites = (city: CityResult) => {
    const savedFavorites = localStorage.getItem('favoriteCities');
    if (savedFavorites) {
      const existingFavorites = JSON.parse(savedFavorites);
      const cityId = `${city.lat}-${city.lon}`;
      const updatedFavorites = existingFavorites.filter((fav: any) => fav.id !== cityId);
      localStorage.setItem('favoriteCities', JSON.stringify(updatedFavorites));
      setFavorites(prev => prev.filter(id => id !== cityId));
    }
  };

  const isFavorite = (city: CityResult) => {
    const cityId = `${city.lat}-${city.lon}`;
    return favorites.includes(cityId);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-400 via-purple-500 to-purple-600 dark:from-purple-900 dark:via-purple-800 dark:to-purple-900">
      {/* Header */}
      <header className="bg-primary shadow-lg">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <h1 className="text-white text-2xl font-bold flex items-center">
              <CloudSun className="mr-2 h-6 w-6" />
              ArabWeather Pro
            </h1>
            <Sidebar />
          </div>
          
          {/* Search Bar */}
          <div className="mt-4 relative">
            <Input
              type="text"
              placeholder="ابحث عن مدينة..."
              value={searchQuery}
              onChange={(e) => {
                setSearchQuery(e.target.value);
                handleSearch(e.target.value);
              }}
              className="search-input"
            />
            <Search className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
            
            {/* Search Results */}
            {searchResults.length > 0 && (
              <div className="absolute top-full left-0 right-0 bg-white dark:bg-gray-800 rounded-lg shadow-lg mt-2 max-h-60 overflow-y-auto z-10 border border-gray-200 dark:border-gray-700">
                {searchResults.map((city, index) => (
                  <button
                    key={index}
                    className="w-full px-4 py-3 text-right hover:bg-gray-100 dark:hover:bg-gray-700 border-b border-gray-100 dark:border-gray-700 last:border-b-0 transition-colors"
                    onClick={() => {
                      setSelectedCity(city);
                      setSearchQuery("");
                      setSearchResults([]);
                    }}
                  >
                    <div className="font-medium text-gray-800 dark:text-gray-200">{city.name}</div>
                    <div className="text-sm text-gray-600 dark:text-gray-400">
                      {city.country} {city.region && `، ${city.region}`}
                    </div>
                  </button>
                ))}
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
            <p className="mt-2">جاري تحميل بيانات الطقس...</p>
          </div>
        ) : weatherData && selectedCity ? (
          <>
            {/* Current Weather */}
            <div className="relative">
              <WeatherCard
                weather={weatherData.current}
                cityName={selectedCity.name}
                currentDate={getCurrentDate()}
              />
              {selectedCity && selectedCity.name !== "موقعي الحالي" && (
                <Button
                  className={`absolute top-4 left-4 rounded-full w-12 h-12 p-0 ${
                    isFavorite(selectedCity) 
                      ? 'bg-red-500 hover:bg-red-600 text-white' 
                      : 'bg-white hover:bg-gray-100 text-gray-600'
                  }`}
                  onClick={() => {
                    if (isFavorite(selectedCity)) {
                      removeFromFavorites(selectedCity);
                    } else {
                      addToFavorites(selectedCity);
                    }
                  }}
                >
                  <Heart className={`w-6 h-6 ${isFavorite(selectedCity) ? 'fill-current' : ''}`} />
                </Button>
              )}
            </div>

            {/* Weather Details */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
              <Card className="weather-detail-card">
                <CardContent className="p-4">
                  <i className="fas fa-thermometer-half text-purple-500 text-2xl mb-2"></i>
                  <p className="text-sm text-gray-600">الحرارة العظمى</p>
                  <p className="text-xl font-bold english-numbers">
                    {Math.round(weatherData.daily[0].temp.max)}°
                  </p>
                </CardContent>
              </Card>
              <Card className="weather-detail-card">
                <CardContent className="p-4">
                  <i className="fas fa-thermometer-empty text-purple-400 text-2xl mb-2"></i>
                  <p className="text-sm text-gray-600">الحرارة الصغرى</p>
                  <p className="text-xl font-bold english-numbers">
                    {Math.round(weatherData.daily[0].temp.min)}°
                  </p>
                </CardContent>
              </Card>
              <Card className="weather-detail-card">
                <CardContent className="p-4">
                  <i className="fas fa-tint text-purple-600 text-2xl mb-2"></i>
                  <p className="text-sm text-gray-600">الرطوبة</p>
                  <p className="text-xl font-bold english-numbers">{weatherData.current.humidity}%</p>
                </CardContent>
              </Card>
              <Card className="weather-detail-card">
                <CardContent className="p-4">
                  <i className="fas fa-wind text-purple-300 text-2xl mb-2"></i>
                  <p className="text-sm text-gray-600">الرياح</p>
                  <p className="text-xl font-bold english-numbers">
                    {Math.round(weatherData.current.wind_speed)} كم/س
                  </p>
                </CardContent>
              </Card>
            </div>

            {/* Weekly Forecast */}
            <ForecastCard forecast={weatherData.daily} />
          </>
        ) : (
          <div className="text-center text-white">
            <p>ابحث عن مدينة لعرض بيانات الطقس</p>
          </div>
        )}
      </main>

      {/* Bottom Navigation */}
      <Navigation />
    </div>
  );
}
