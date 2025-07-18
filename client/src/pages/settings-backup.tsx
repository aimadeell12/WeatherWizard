import { useState, useRef } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger, DialogDescription } from '@/components/ui/dialog';
import { Textarea } from '@/components/ui/textarea';
import { Settings, Moon, Sun, Globe, Thermometer, Bell, Info, Shield, FileText, Copyright, Phone, Download, Upload, RotateCcw, Trash2, Database } from 'lucide-react';
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
    try {
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
    } catch (error) {
      toast({
        title: "خطأ في تصدير الإعدادات",
        description: "حدث خطأ أثناء تصدير الإعدادات",
        variant: "destructive",
      });
    }
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
      if (file.type !== 'application/json' && !file.name.endsWith('.json')) {
        toast({
          title: "نوع ملف غير صالح",
          description: "يرجى اختيار ملف JSON فقط",
          variant: "destructive",
        });
        return;
      }
      
      const reader = new FileReader();
      reader.onload = (e) => {
        const content = e.target?.result as string;
        setImportData(content);
        setIsImportDialogOpen(true);
      };
      reader.onerror = () => {
        toast({
          title: "خطأ في قراءة الملف",
          description: "حدث خطأ أثناء قراءة الملف",
          variant: "destructive",
        });
      };
      reader.readAsText(file);
    }
    event.target.value = '';
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-400 via-purple-500 to-purple-600 dark:from-purple-900 dark:via-purple-800 dark:to-purple-900">
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

      <main className="container mx-auto px-4 py-6 pb-20">
        <div className="space-y-6">
          <Card className="bg-white/95 dark:bg-gray-800/95 backdrop-blur-sm border-gray-200 dark:border-gray-700">
            <CardHeader>
              <CardTitle className="flex items-center text-foreground">
                <Sun className="w-5 h-5 text-purple-600 mr-2" />
                إعدادات العرض
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <Moon className="w-5 h-5 text-purple-600 mr-2" />
                  <Label htmlFor="dark-mode" className="text-foreground">الوضع المظلم</Label>
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
                  <Label htmlFor="temp-unit" className="text-foreground">وحدة الحرارة</Label>
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
                  <Label htmlFor="language" className="text-foreground">اللغة</Label>
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

          <Card className="bg-white/95 dark:bg-gray-800/95 backdrop-blur-sm border-gray-200 dark:border-gray-700">
            <CardHeader>
              <CardTitle className="flex items-center text-foreground">
                <Database className="w-5 h-5 text-purple-600 mr-2" />
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
                
                <Button
                  variant="outline"
                  onClick={handleResetSettings}
                  className="w-full"
                >
                  <RotateCcw className="w-4 h-4 mr-2" />
                  إعادة تعيين الإعدادات
                </Button>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                <Button
                  variant="outline"
                  onClick={clearCache}
                  className="w-full"
                >
                  <Trash2 className="w-4 h-4 mr-2" />
                  مسح البيانات المحفوظة
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </main>

      <Navigation />
    </div>
  );
}