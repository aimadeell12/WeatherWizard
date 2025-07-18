import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { Settings, Moon, Sun, Globe, Thermometer, Bell, Info, Shield, FileText, Copyright, Phone } from 'lucide-react';
import { Navigation } from '@/components/navigation';
import { Link } from 'wouter';

interface AppSettings {
  darkMode: boolean;
  notifications: boolean;
  temperatureUnit: 'celsius' | 'fahrenheit';
  language: 'ar' | 'en';
  autoRefresh: boolean;
  refreshInterval: number;
}

export default function SettingsPage() {
  const [settings, setSettings] = useState<AppSettings>({
    darkMode: false,
    notifications: true,
    temperatureUnit: 'celsius',
    language: 'ar',
    autoRefresh: true,
    refreshInterval: 10,
  });

  useEffect(() => {
    // Load settings from localStorage
    const savedSettings = localStorage.getItem('appSettings');
    if (savedSettings) {
      setSettings(JSON.parse(savedSettings));
    }
  }, []);

  const updateSetting = (key: keyof AppSettings, value: any) => {
    const newSettings = { ...settings, [key]: value };
    setSettings(newSettings);
    localStorage.setItem('appSettings', JSON.stringify(newSettings));
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

  const clearCache = () => {
    localStorage.removeItem('favoriteCities');
    localStorage.removeItem('weatherCache');
    alert('تم مسح البيانات المحفوظة بنجاح');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-400 via-purple-500 to-purple-600">
      {/* Header */}
      <header className="bg-primary shadow-lg">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <Settings className="w-8 h-8 text-white mr-3" />
              <h1 className="text-2xl font-bold text-white">الإعدادات</h1>
            </div>
            <p className="text-sm text-white/80">{getCurrentDate()}</p>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-6 pb-20">
        <div className="space-y-6">
          {/* Display Settings */}
          <Card className="bg-white/95 backdrop-blur-sm">
            <CardHeader>
              <CardTitle className="flex items-center">
                <Sun className="w-5 h-5 text-purple-600 mr-2" />
                إعدادات العرض
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <Moon className="w-5 h-5 text-purple-600 mr-2" />
                  <Label htmlFor="dark-mode">الوضع المظلم</Label>
                </div>
                <Switch
                  id="dark-mode"
                  checked={settings.darkMode}
                  onCheckedChange={(checked) => updateSetting('darkMode', checked)}
                />
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <Thermometer className="w-5 h-5 text-purple-600 mr-2" />
                  <Label htmlFor="temp-unit">وحدة الحرارة</Label>
                </div>
                <div className="flex items-center space-x-2 space-x-reverse">
                  <Button
                    variant={settings.temperatureUnit === 'celsius' ? 'default' : 'outline'}
                    size="sm"
                    onClick={() => updateSetting('temperatureUnit', 'celsius')}
                    className="english-numbers"
                  >
                    °C
                  </Button>
                  <Button
                    variant={settings.temperatureUnit === 'fahrenheit' ? 'default' : 'outline'}
                    size="sm"
                    onClick={() => updateSetting('temperatureUnit', 'fahrenheit')}
                    className="english-numbers"
                  >
                    °F
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Notification Settings */}
          <Card className="bg-white/95 backdrop-blur-sm">
            <CardHeader>
              <CardTitle className="flex items-center">
                <Bell className="w-5 h-5 text-purple-600 mr-2" />
                إعدادات التنبيهات
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <Label htmlFor="notifications">تفعيل التنبيهات</Label>
                <Switch
                  id="notifications"
                  checked={settings.notifications}
                  onCheckedChange={(checked) => updateSetting('notifications', checked)}
                />
              </div>

              <div className="flex items-center justify-between">
                <Label htmlFor="auto-refresh">التحديث التلقائي</Label>
                <Switch
                  id="auto-refresh"
                  checked={settings.autoRefresh}
                  onCheckedChange={(checked) => updateSetting('autoRefresh', checked)}
                />
              </div>

              {settings.autoRefresh && (
                <div className="flex items-center justify-between">
                  <Label htmlFor="refresh-interval">فترة التحديث (بالدقائق)</Label>
                  <div className="flex items-center space-x-2 space-x-reverse">
                    {[5, 10, 15, 30].map((interval) => (
                      <Button
                        key={interval}
                        variant={settings.refreshInterval === interval ? 'default' : 'outline'}
                        size="sm"
                        onClick={() => updateSetting('refreshInterval', interval)}
                        className="english-numbers"
                      >
                        {interval}
                      </Button>
                    ))}
                  </div>
                </div>
              )}
            </CardContent>
          </Card>

          {/* App Info */}
          <Card className="bg-white/95 backdrop-blur-sm">
            <CardHeader>
              <CardTitle className="flex items-center">
                <Info className="w-5 h-5 text-purple-600 mr-2" />
                معلومات التطبيق
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <span>إصدار التطبيق</span>
                <span className="text-purple-600 font-medium english-numbers">1.0.0</span>
              </div>
              <div className="flex items-center justify-between">
                <span>مصدر البيانات</span>
                <span className="text-purple-600 font-medium">WeatherAPI.com</span>
              </div>
              <div className="flex items-center justify-between">
                <span>آخر تحديث</span>
                <span className="text-purple-600 font-medium">{getCurrentDate()}</span>
              </div>
            </CardContent>
          </Card>

          {/* Legal Links */}
          <Card className="bg-white/95 backdrop-blur-sm">
            <CardHeader>
              <CardTitle className="flex items-center">
                <Shield className="w-5 h-5 text-purple-600 mr-2" />
                الخصوصية والأمان
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <Link href="/privacy-policy">
                <Button variant="ghost" className="w-full justify-start">
                  <FileText className="w-4 h-4 mr-2" />
                  سياسة الخصوصية
                </Button>
              </Link>
              <Link href="/terms-of-use">
                <Button variant="ghost" className="w-full justify-start">
                  <FileText className="w-4 h-4 mr-2" />
                  شروط الاستخدام
                </Button>
              </Link>
              <Link href="/terms-conditions">
                <Button variant="ghost" className="w-full justify-start">
                  <FileText className="w-4 h-4 mr-2" />
                  الشروط والأحكام
                </Button>
              </Link>
              
              {/* Copyright Notice */}
              <div className="flex items-center py-2">
                <Copyright className="w-4 h-4 mr-2 text-purple-600" />
                <span className="text-sm text-gray-600">جميع الحقوق محفوظة</span>
              </div>
              
              {/* Phone Number */}
              <div className="flex items-center py-2">
                <Phone className="w-4 h-4 mr-2 text-purple-600" />
                <span className="text-sm text-gray-600 english-numbers">+212663381823</span>
              </div>
            </CardContent>
          </Card>

          {/* Data Management */}
          <Card className="bg-white/95 backdrop-blur-sm">
            <CardHeader>
              <CardTitle className="flex items-center">
                <Globe className="w-5 h-5 text-purple-600 mr-2" />
                إدارة البيانات
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <Button
                variant="outline"
                onClick={clearCache}
                className="w-full"
              >
                مسح البيانات المحفوظة
              </Button>
              <p className="text-sm text-gray-600">
                سيتم مسح جميع المدن المفضلة والبيانات المحفوظة محلياً
              </p>
            </CardContent>
          </Card>
        </div>
      </main>

      <Navigation />
    </div>
  );
}