import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Navigation } from "@/components/navigation";
import { ArrowRight } from "lucide-react";
import { Link } from "wouter";

export default function TermsConditions() {
  return (
    <div className="min-h-screen bg-surface">
      <header className="bg-primary text-white p-4">
        <div className="flex items-center">
          <Link href="/">
            <ArrowRight className="h-6 w-6 mr-3 cursor-pointer" />
          </Link>
          <h1 className="text-xl font-bold">الشروط والأحكام</h1>
        </div>
      </header>

      <main className="container mx-auto px-4 py-6 pb-20">
        <Card>
          <CardHeader>
            <CardTitle>الشروط والأحكام العامة</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <section>
              <p className="text-gray-700 mb-4">
                تحكم هذه الشروط والأحكام استخدامك لتطبيق الطقس والخدمات المرتبطة به. يرجى قراءة هذه الشروط بعناية قبل استخدام التطبيق.
              </p>
            </section>

            <section>
              <h3 className="text-lg font-semibold mb-3">التعريفات</h3>
              <div className="space-y-3 text-gray-700">
                <p><strong>التطبيق:</strong> تطبيق الطقس وجميع خدماته ومميزاته</p>
                <p><strong>المستخدم:</strong> أي شخص يستخدم التطبيق</p>
                <p><strong>الخدمة:</strong> جميع الخدمات المقدمة من خلال التطبيق</p>
                <p><strong>المحتوى:</strong> جميع المعلومات والبيانات المتاحة في التطبيق</p>
              </div>
            </section>

            <section>
              <h3 className="text-lg font-semibold mb-3">شروط الاستخدام العامة</h3>
              <div className="space-y-3 text-gray-700">
                <p>للاستفادة من خدمات التطبيق، يجب عليك:</p>
                <ul className="list-disc pr-6 space-y-2">
                  <li>أن تكون بالغاً أو تحت إشراف والديك</li>
                  <li>تقديم معلومات صحيحة ومحدثة</li>
                  <li>الحفاظ على سرية معلومات حسابك</li>
                  <li>استخدام التطبيق للأغراض المشروعة فقط</li>
                  <li>احترام حقوق المستخدمين الآخرين</li>
                </ul>
              </div>
            </section>

            <section>
              <h3 className="text-lg font-semibold mb-3">الخدمات المقدمة</h3>
              <div className="space-y-3 text-gray-700">
                <p>يوفر التطبيق الخدمات التالية:</p>
                <ul className="list-disc pr-6 space-y-2">
                  <li>عرض حالة الطقس الحالية</li>
                  <li>توقعات الطقس لعدة أيام</li>
                  <li>خرائط الطقس التفاعلية</li>
                  <li>تنبيهات الطقس الهامة</li>
                  <li>معلومات مفصلة عن الظروف الجوية</li>
                  <li>إمكانية حفظ المواقع المفضلة</li>
                </ul>
              </div>
            </section>

            <section>
              <h3 className="text-lg font-semibold mb-3">القيود والمحظورات</h3>
              <div className="space-y-3 text-gray-700">
                <p>يحظر عليك:</p>
                <ul className="list-disc pr-6 space-y-2">
                  <li>استخدام التطبيق لأغراض تجارية بدون إذن</li>
                  <li>نسخ أو توزيع محتوى التطبيق</li>
                  <li>محاولة اختراق أو تعطيل النظام</li>
                  <li>رفع أو نشر محتوى ضار أو مخالف</li>
                  <li>انتحال شخصية الآخرين</li>
                  <li>استخدام برامج تلقائية للوصول للتطبيق</li>
                </ul>
              </div>
            </section>

            <section>
              <h3 className="text-lg font-semibold mb-3">مسؤولية المستخدم</h3>
              <div className="space-y-3 text-gray-700">
                <p>أنت مسؤول عن:</p>
                <ul className="list-disc pr-6 space-y-2">
                  <li>جميع الأنشطة التي تتم من خلال حسابك</li>
                  <li>الحفاظ على أمان معلومات الدخول</li>
                  <li>إبلاغنا فوراً عن أي استخدام غير مصرح به</li>
                  <li>التحقق من دقة المعلومات قبل الاعتماد عليها</li>
                  <li>احترام حقوق الملكية الفكرية</li>
                </ul>
              </div>
            </section>

            <section>
              <h3 className="text-lg font-semibold mb-3">إخلاء المسؤولية</h3>
              <div className="space-y-3 text-gray-700">
                <p>نحن غير مسؤولين عن:</p>
                <ul className="list-disc pr-6 space-y-2">
                  <li>الأضرار الناتجة عن الاعتماد على بيانات الطقس</li>
                  <li>انقطاع الخدمة أو التأخير في التحديثات</li>
                  <li>أخطاء في البيانات أو المعلومات</li>
                  <li>فقدان البيانات الشخصية أو المفضلة</li>
                  <li>الأضرار الناتجة عن سوء الاستخدام</li>
                </ul>
              </div>
            </section>

            <section>
              <h3 className="text-lg font-semibold mb-3">حقوق الملكية الفكرية</h3>
              <div className="space-y-3 text-gray-700">
                <p>جميع الحقوق محفوظة لمطور التطبيق:</p>
                <ul className="list-disc pr-6 space-y-2">
                  <li>تصميم واجهة المستخدم</li>
                  <li>الكود المصدري والخوارزميات</li>
                  <li>الشعارات والعلامات التجارية</li>
                  <li>المحتوى والمواد الأصلية</li>
                  <li>قواعد البيانات والهياكل</li>
                </ul>
              </div>
            </section>

            <section>
              <h3 className="text-lg font-semibold mb-3">التعديلات والتحديثات</h3>
              <p className="text-gray-700">
                نحتفظ بالحق في تعديل هذه الشروط والأحكام في أي وقت. سيتم إشعار المستخدمين بأي تغييرات جوهرية من خلال التطبيق أو البريد الإلكتروني. الاستمرار في استخدام التطبيق بعد التعديل يعني موافقتك على الشروط الجديدة.
              </p>
            </section>

            <section>
              <h3 className="text-lg font-semibold mb-3">إنهاء الاتفاقية</h3>
              <div className="space-y-3 text-gray-700">
                <p>يمكن إنهاء هذه الاتفاقية في الحالات التالية:</p>
                <ul className="list-disc pr-6 space-y-2">
                  <li>طلب المستخدم إلغاء الحساب</li>
                  <li>انتهاك الشروط والأحكام</li>
                  <li>عدم استخدام التطبيق لفترة طويلة</li>
                  <li>إيقاف الخدمة نهائياً</li>
                </ul>
              </div>
            </section>

            <section>
              <h3 className="text-lg font-semibold mb-3">القانون المطبق وحل النزاعات</h3>
              <p className="text-gray-700">
                تخضع هذه الاتفاقية للقوانين المحلية المعمول بها. في حالة نشوء نزاع، سيتم حله أولاً بالطرق الودية، وإذا تعذر ذلك، ستحال القضية للجهات القضائية المختصة.
              </p>
            </section>

            <section>
              <h3 className="text-lg font-semibold mb-3">معلومات الاتصال</h3>
              <p className="text-gray-700">
                للاستفسارات أو الشكاوى المتعلقة بهذه الشروط والأحكام، يرجى التواصل معنا من خلال قسم الدعم في التطبيق أو البريد الإلكتروني المخصص.
              </p>
            </section>

            <div className="text-sm text-gray-600 border-t pt-4">
              <p>آخر تحديث: ديسمبر 2024</p>
              <p>نسخة 1.0</p>
            </div>
          </CardContent>
        </Card>
      </main>

      <Navigation />
    </div>
  );
}
