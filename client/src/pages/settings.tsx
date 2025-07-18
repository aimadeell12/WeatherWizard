import { useState, useRef } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Textarea } from '@/components/ui/textarea';
import { Settings, Moon, Sun, Globe, Thermometer, Bell, Info, Shield, FileText, Copyright, Phone, Download, Upload, RotateCcw, Trash2 } from 'lucide-react';
import { Navigation } from '@/components/navigation';
import { Link } from 'wouter';
import { useTheme } from '@/contexts/ThemeContext';
import { useNotification } from '@/contexts/NotificationContext';
import { useToast } from '@/hooks/use-toast';

export default function SettingsPage() {
  const { settings, updateSetting, resetSettings, exportSettings, importSettings } = useTheme();
  const { requestNotificationPermission, isNotificationSupported, permissionStatus } = useNotification();
  const { toast } = useToast();
  const [importData, setImportData] = useState('');
  const [isImportDialogOpen, setIsImportDialogOpen] = useState(false);
  const [isExportDialogOpen, setIsExportDialogOpen] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const getCurrentDate = () => {
    return new Date().toLocaleDateString("ar-EG-u-nu-latn", {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
      calendar: "gregory"
    });
  };

  const handleNotificationToggle = async (checked: boolean) => {
    if (checked && isNotificationSupported && permissionStatus !== 'granted') {
      const granted = await requestNotificationPermission();
      if (granted) {
        updateSetting('notifications', true);
        toast({
          title: "تم تفعيل التنبيهات",
          description: "سيتم إرسال التنبيهات عند تغيير الطقس",
        });
      } else {
        toast({
          title: "فشل في تفعيل التنبيهات",
          description: "يرجى السماح بالتنبيهات من إعدادات المتصفح",
          variant: "destructive",
        });
      }
    } else {
      updateSetting('notifications', checked);
      toast({
        title: checked ? "تم تفعيل التنبيهات" : "تم إلغاء التنبيهات",
        description: checked ? "سيتم إرسال التنبيهات عند تغيير الطقس" : "لن يتم إرسال التنبيهات",
      });
    }
  };

  const clearCache = () => {
    localStorage.removeItem('favoriteCities');
    localStorage.removeItem('weatherCache');
    toast({
      title: "تم مسح البيانات",
      description: "تم حذف جميع البيانات المحفوظة بنجاح",
    });
  };

  const handleResetSettings = () => {
    resetSettings();
    toast({
      title: "تم إعادة تعيين الإعدادات",
      description: "تم استعادة الإعدادات الافتراضية",
    });
  };

  const handleExportSettings = () => {
    const data = exportSettings();
    const blob = new Blob([data], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'weather-app-settings.json';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    toast({
      title: "تم تصدير الإعدادات",
      description: "تم حفظ الإعدادات في ملف JSON",
    });
  };

  const handleImportSettings = () => {
    if (importData.trim()) {
      const success = importSettings(importData);
      if (success) {
        toast({
          title: "تم استيراد الإعدادات",
          description: "تم تطبيق الإعدادات الجديدة بنجاح",
        });
        setImportData('');
        setIsImportDialogOpen(false);
      } else {
        toast({
          title: "فشل في استيراد الإعدادات",
          description: "ملف الإعدادات غير صالح",
          variant: "destructive",
        });
      }
    }
  };

  const handleFileImport = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const content = e.target?.result as string;
        setImportData(content);
        setIsImportDialogOpen(true);
      };
      reader.readAsText(file);
    }
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

              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <Globe className="w-5 h-5 text-purple-600 mr-2" />
                  <Label htmlFor="language">اللغة</Label>
                </div>
                <div className="flex items-center space-x-2 space-x-reverse">
                  <Button
                    variant={settings.language === 'ar' ? 'default' : 'outline'}
                    size="sm"
                    onClick={() => updateSetting('language', 'ar')}
                  >
                    العربية
                  </Button>
                  <Button
                    variant={settings.language === 'en' ? 'default' : 'outline'}
                    size="sm"
                    onClick={() => updateSetting('language', 'en')}
                  >
                    English
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
                <div className="flex flex-col">
                  <Label htmlFor="notifications">تفعيل التنبيهات</Label>
                  {!isNotificationSupported && (
                    <span className="text-xs text-red-500 mt-1">المتصفح لا يدعم التنبيهات</span>
                  )}
                  {isNotificationSupported && permissionStatus === 'denied' && (
                    <span className="text-xs text-red-500 mt-1">تم رفض التنبيهات من المتصفح</span>
                  )}
                </div>
                <Switch
                  id="notifications"
                  checked={settings.notifications}
                  onCheckedChange={handleNotificationToggle}
                  disabled={!isNotificationSupported}
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
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                <Button
                  variant="outline"
                  onClick={handleExportSettings}
                  className="w-full"
                >
                  <Download className="w-4 h-4 mr-2" />
                  تصدير الإعدادات
                </Button>
                
                <Dialog open={isImportDialogOpen} onOpenChange={setIsImportDialogOpen}>
                  <DialogTrigger asChild>
                    <Button variant="outline" className="w-full">
                      <Upload className="w-4 h-4 mr-2" />
                      استيراد الإعدادات
                    </Button>
                  </DialogTrigger>
                  <DialogContent>
                    <DialogHeader>
                      <DialogTitle>استيراد الإعدادات</DialogTitle>
                    </DialogHeader>
                    <div className="space-y-4">
                      <div className="flex gap-2">
                        <input
                          type="file"
                          accept=".json"
                          onChange={handleFileImport}
                          ref={fileInputRef}
                          className="hidden"
                        />
                        <Button
                          variant="outline"
                          onClick={() => fileInputRef.current?.click()}
                          className="flex-1"
                        >
                          <Upload className="w-4 h-4 mr-2" />
                          اختر ملف
                        </Button>
                      </div>
                      <div>
                        <Label htmlFor="import-data">أو الصق البيانات:</Label>
                        <Textarea
                          id="import-data"
                          placeholder="الصق محتوى ملف الإعدادات هنا..."
                          value={importData}
                          onChange={(e) => setImportData(e.target.value)}
                          className="mt-2"
                          rows={8}
                        />
                      </div>
                      <div className="flex gap-2">
                        <Button onClick={handleImportSettings} className="flex-1">
                          استيراد
                        </Button>
                        <Button 
                          variant="outline" 
                          onClick={() => setIsImportDialogOpen(false)}
                          className="flex-1"
                        >
                          إلغاء
                        </Button>
                      </div>
                    </div>
                  </DialogContent>
                </Dialog>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                <Button
                  variant="outline"
                  onClick={handleResetSettings}
                  className="w-full"
                >
                  <RotateCcw className="w-4 h-4 mr-2" />
                  إعادة تعيين الإعدادات
                </Button>
                
                <Button
                  variant="outline"
                  onClick={clearCache}
                  className="w-full"
                >
                  <Trash2 className="w-4 h-4 mr-2" />
                  مسح البيانات المحفوظة
                </Button>
              </div>
              
              <p className="text-sm text-gray-600">
                يمكنك تصدير الإعدادات الحالية أو استيراد إعدادات محفوظة سابقاً
              </p>
            </CardContent>
          </Card>
        </div>
      </main>

      <Navigation />
    </div>
  );
}