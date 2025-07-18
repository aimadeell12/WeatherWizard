import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Navigation } from "@/components/navigation";
import { ArrowRight } from "lucide-react";
import { Link } from "wouter";

export default function PrivacyPolicy() {
  return (
    <div className="min-h-screen bg-surface">
      <header className="bg-primary text-white p-4">
        <div className="flex items-center">
          <Link href="/">
            <ArrowRight className="h-6 w-6 mr-3 cursor-pointer" />
          </Link>
          <h1 className="text-xl font-bold">سياسة الخصوصية</h1>
        </div>
      </header>

      <main className="container mx-auto px-4 py-6 pb-20">
        <Card>
          <CardHeader>
            <CardTitle>سياسة الخصوصية لتطبيق الطقس</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <section>
              <p className="text-gray-700 mb-4">
                نحن نحترم خصوصيتك ونلتزم بحماية بياناتك الشخصية. توضح هذه السياسة كيفية جمع واستخدام وحماية معلوماتك عند استخدام تطبيق الطقس.
              </p>
            </section>

            <section>
              <h3 className="text-lg font-semibold mb-3">المعلومات التي نجمعها</h3>
              <ul className="list-disc pr-6 space-y-2 text-gray-700">
                <li>بيانات الموقع الجغرافي (اختيارية) لتقديم معلومات الطقس المحلية</li>
                <li>تفضيلات المستخدم مثل المدن المفضلة</li>
                <li>بيانات الاستخدام والتحليلات لتحسين الخدمة</li>
                <li>معلومات الجهاز مثل نوع الجهاز ونظام التشغيل</li>
              </ul>
            </section>

            <section>
              <h3 className="text-lg font-semibold mb-3">كيف نستخدم المعلومات</h3>
              <ul className="list-disc pr-6 space-y-2 text-gray-700">
                <li>تقديم خدمات الطقس الدقيقة والمحلية</li>
                <li>تحسين تجربة المستخدم وتخصيص المحتوى</li>
                <li>إرسال التنبيهات والإشعارات المتعلقة بالطقس</li>
                <li>تحليل استخدام التطبيق لتطوير ميزات جديدة</li>
              </ul>
            </section>

            <section>
              <h3 className="text-lg font-semibold mb-3">حماية البيانات</h3>
              <div className="space-y-3 text-gray-700">
                <p>نستخدم تقنيات التشفير المتقدمة لحماية بياناتك:</p>
                <ul className="list-disc pr-6 space-y-2">
                  <li>تشفير البيانات أثناء النقل والتخزين</li>
                  <li>خوادم آمنة محمية بجدران نارية</li>
                  <li>وصول محدود للموظفين المخولين فقط</li>
                  <li>مراقبة مستمرة للأنشطة المشبوهة</li>
                </ul>
              </div>
            </section>

            <section>
              <h3 className="text-lg font-semibold mb-3">مشاركة البيانات</h3>
              <p className="text-gray-700 mb-3">
                نحن لا نبيع أو نؤجر أو نشارك معلوماتك الشخصية مع أطراف ثالثة إلا في الحالات التالية:
              </p>
              <ul className="list-disc pr-6 space-y-2 text-gray-700">
                <li>بموافقتك الصريحة</li>
                <li>لتقديم الخدمات المطلوبة (مثل خدمات الطقس)</li>
                <li>للامتثال للقوانين المعمول بها</li>
                <li>لحماية حقوقنا وسلامة المستخدمين</li>
              </ul>
            </section>

            <section>
              <h3 className="text-lg font-semibold mb-3">حقوقك</h3>
              <p className="text-gray-700 mb-3">لك الحق في:</p>
              <ul className="list-disc pr-6 space-y-2 text-gray-700">
                <li>الوصول إلى بياناتك الشخصية</li>
                <li>تصحيح أو تحديث البيانات غير الصحيحة</li>
                <li>حذف بياناتك الشخصية</li>
                <li>نقل بياناتك إلى خدمة أخرى</li>
                <li>الاعتراض على معالجة بياناتك</li>
              </ul>
            </section>

            <section>
              <h3 className="text-lg font-semibold mb-3">الكوكيز والتتبع</h3>
              <p className="text-gray-700">
                نستخدم الكوكيز وتقنيات التتبع المماثلة لتحسين أداء التطبيق وتحليل الاستخدام. يمكنك تعطيل الكوكيز من خلال إعدادات المتصفح.
              </p>
            </section>

            <section>
              <h3 className="text-lg font-semibold mb-3">التحديثات</h3>
              <p className="text-gray-700">
                قد نقوم بتحديث هذه السياسة من وقت لآخر. سنقوم بإشعارك بأي تغييرات جوهرية من خلال التطبيق أو البريد الإلكتروني.
              </p>
            </section>

            <section>
              <h3 className="text-lg font-semibold mb-3">الاتصال بنا</h3>
              <p className="text-gray-700">
                إذا كان لديك أي أسئلة حول سياسة الخصوصية هذه، يرجى الاتصال بنا عبر البريد الإلكتروني أو من خلال إعدادات التطبيق.
              </p>
            </section>

            <div className="text-sm text-gray-600 border-t pt-4">
              <p>آخر تحديث: ديسمبر 2024</p>
            </div>
          </CardContent>
        </Card>
      </main>

      <Navigation />
    </div>
  );
}
