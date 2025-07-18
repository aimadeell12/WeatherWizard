import { useState, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { WeatherCard } from "@/components/weather-card";
import { ForecastCard } from "@/components/forecast-card";
import { Navigation } from "@/components/navigation";
import { Sidebar } from "@/components/sidebar";
import { weatherService } from "@/services/weather";
import { Search, CloudSun } from "lucide-react";
import type { CityResult, WeatherData } from "@/types/weather";

export default function Home() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCity, setSelectedCity] = useState<CityResult | null>(null);
  const [searchResults, setSearchResults] = useState<CityResult[]>([]);
  const [isSearching, setIsSearching] = useState(false);

  // Get current date in Arabic
  const getCurrentDate = () => {
    return new Date().toLocaleDateString("ar-SA", {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
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
  const { data: weatherData, isLoading: isLoadingWeather } = useQuery<WeatherData>({
    queryKey: [`/api/weather?lat=${selectedCity?.lat}&lon=${selectedCity?.lon}`],
    enabled: !!selectedCity,
  });

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

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-400 via-blue-500 to-blue-600">
      {/* Header */}
      <header className="bg-primary shadow-lg">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <h1 className="text-white text-2xl font-bold flex items-center">
              <CloudSun className="mr-2 h-6 w-6" />
              تطبيق الطقس
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
              <div className="absolute top-full left-0 right-0 bg-white rounded-lg shadow-lg mt-2 max-h-60 overflow-y-auto z-10">
                {searchResults.map((city, index) => (
                  <button
                    key={index}
                    className="w-full px-4 py-3 text-right hover:bg-gray-100 border-b border-gray-100 last:border-b-0"
                    onClick={() => {
                      setSelectedCity(city);
                      setSearchQuery("");
                      setSearchResults([]);
                    }}
                  >
                    <div className="font-medium">{city.name}</div>
                    <div className="text-sm text-gray-600">
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
            <WeatherCard
              weather={weatherData.current}
              cityName={selectedCity.name}
              currentDate={getCurrentDate()}
            />

            {/* Weather Details */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
              <Card className="weather-detail-card">
                <CardContent className="p-4">
                  <i className="fas fa-thermometer-half text-orange-500 text-2xl mb-2"></i>
                  <p className="text-sm text-gray-600">الحرارة العظمى</p>
                  <p className="text-xl font-bold">
                    {Math.round(weatherData.daily[0].temp.max)}°
                  </p>
                </CardContent>
              </Card>
              <Card className="weather-detail-card">
                <CardContent className="p-4">
                  <i className="fas fa-thermometer-empty text-blue-500 text-2xl mb-2"></i>
                  <p className="text-sm text-gray-600">الحرارة الصغرى</p>
                  <p className="text-xl font-bold">
                    {Math.round(weatherData.daily[0].temp.min)}°
                  </p>
                </CardContent>
              </Card>
              <Card className="weather-detail-card">
                <CardContent className="p-4">
                  <i className="fas fa-tint text-blue-400 text-2xl mb-2"></i>
                  <p className="text-sm text-gray-600">الرطوبة</p>
                  <p className="text-xl font-bold">{weatherData.current.humidity}%</p>
                </CardContent>
              </Card>
              <Card className="weather-detail-card">
                <CardContent className="p-4">
                  <i className="fas fa-wind text-gray-500 text-2xl mb-2"></i>
                  <p className="text-sm text-gray-600">الرياح</p>
                  <p className="text-xl font-bold">
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
