import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Navigation } from "@/components/navigation";
import { ArrowRight } from "lucide-react";
import { Link } from "wouter";

export default function TermsOfUse() {
  return (
    <div className="min-h-screen bg-surface">
      <header className="bg-primary text-white p-4">
        <div className="flex items-center">
          <Link href="/">
            <ArrowRight className="h-6 w-6 mr-3 cursor-pointer" />
          </Link>
          <h1 className="text-xl font-bold">سياسة الاستخدام</h1>
        </div>
      </header>

      <main className="container mx-auto px-4 py-6 pb-20">
        <Card>
          <CardHeader>
            <CardTitle>سياسة الاستخدام لتطبيق الطقس</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <section>
              <p className="text-gray-700 mb-4">
                مرحباً بك في تطبيق الطقس. باستخدام هذا التطبيق، فإنك توافق على الالتزام بسياسة الاستخدام التالية. يرجى قراءة هذه الشروط بعناية قبل استخدام التطبيق.
              </p>
            </section>

            <section>
              <h3 className="text-lg font-semibold mb-3">قبول الشروط</h3>
              <p className="text-gray-700">
                بتحميل أو استخدام تطبيق الطقس، فإنك توافق على الالتزام بهذه الشروط والأحكام. إذا كنت لا توافق على أي من هذه الشروط، يرجى عدم استخدام التطبيق.
              </p>
            </section>

            <section>
              <h3 className="text-lg font-semibold mb-3">وصف الخدمة</h3>
              <p className="text-gray-700 mb-3">
                تطبيق الطقس يوفر:
              </p>
              <ul className="list-disc pr-6 space-y-2 text-gray-700">
                <li>معلومات الطقس الحالية والتوقعات</li>
                <li>البحث عن المدن والمواقع الجغرافية</li>
                <li>إمكانية حفظ المدن المفضلة</li>
                <li>تنبيهات الطقس والإشعارات</li>
                <li>خرائط الطقس التفاعلية</li>
              </ul>
            </section>

            <section>
              <h3 className="text-lg font-semibold mb-3">الاستخدام المقبول</h3>
              <p className="text-gray-700 mb-3">يجب عليك استخدام التطبيق بطريقة مسؤولة ومشروعة. يحظر:</p>
              <ul className="list-disc pr-6 space-y-2 text-gray-700">
                <li>استخدام التطبيق لأغراض غير قانونية</li>
                <li>محاولة الوصول غير المصرح به للنظام</li>
                <li>إرسال أو نشر محتوى ضار أو مسيء</li>
                <li>التدخل في عمل التطبيق أو خوادمه</li>
                <li>انتهاك حقوق الآخرين أو خصوصيتهم</li>
              </ul>
            </section>

            <section>
              <h3 className="text-lg font-semibold mb-3">دقة المعلومات</h3>
              <div className="space-y-3 text-gray-700">
                <p>
                  نحن نسعى لتوفير معلومات طقس دقيقة ومحدثة، لكن لا يمكننا ضمان دقة المعلومات بنسبة 100%. 
                </p>
                <p>
                  بيانات الطقس مستمدة من مصادر خارجية وقد تختلف عن الظروف الفعلية. يرجى استخدام المعلومات كدليل إرشادي فقط.
                </p>
              </div>
            </section>

            <section>
              <h3 className="text-lg font-semibold mb-3">الملكية الفكرية</h3>
              <p className="text-gray-700 mb-3">
                جميع المحتويات والمواد في التطبيق محمية بحقوق الطبع والنشر:
              </p>
              <ul className="list-disc pr-6 space-y-2 text-gray-700">
                <li>تصميم التطبيق وواجهة المستخدم</li>
                <li>النصوص والصور والرموز</li>
                <li>الكود المصدري والخوارزميات</li>
                <li>العلامات التجارية والشعارات</li>
              </ul>
            </section>

            <section>
              <h3 className="text-lg font-semibold mb-3">الخصوصية والبيانات</h3>
              <p className="text-gray-700">
                استخدامك للتطبيق خاضع لسياسة الخصوصية الخاصة بنا. نحن نجمع ونستخدم بياناتك وفقاً للسياسة المذكورة، والتي تشكل جزءاً من هذه الشروط.
              </p>
            </section>

            <section>
              <h3 className="text-lg font-semibold mb-3">المسؤولية المحدودة</h3>
              <div className="space-y-3 text-gray-700">
                <p>
                  لا نتحمل المسؤولية عن أي أضرار مباشرة أو غير مباشرة ناتجة عن:
                </p>
                <ul className="list-disc pr-6 space-y-2">
                  <li>استخدام أو عدم إمكانية استخدام التطبيق</li>
                  <li>الاعتماد على معلومات الطقس المقدمة</li>
                  <li>انقطاع الخدمة أو الأخطاء التقنية</li>
                  <li>فقدان البيانات أو تلفها</li>
                </ul>
              </div>
            </section>

            <section>
              <h3 className="text-lg font-semibold mb-3">التحديثات والتغييرات</h3>
              <p className="text-gray-700">
                نحتفظ بالحق في تحديث هذه الشروط في أي وقت. سيتم إشعارك بأي تغييرات جوهرية من خلال التطبيق أو البريد الإلكتروني.
              </p>
            </section>

            <section>
              <h3 className="text-lg font-semibold mb-3">إنهاء الاستخدام</h3>
              <p className="text-gray-700">
                يمكنك إيقاف استخدام التطبيق في أي وقت بحذفه من جهازك. نحتفظ بالحق في تعليق أو إنهاء وصولك للتطبيق في حالة انتهاك هذه الشروط.
              </p>
            </section>

            <section>
              <h3 className="text-lg font-semibold mb-3">القانون المطبق</h3>
              <p className="text-gray-700">
                تخضع هذه الشروط للقوانين المحلية المعمول بها، وأي نزاعات ستحل وفقاً لهذه القوانين.
              </p>
            </section>

            <section>
              <h3 className="text-lg font-semibold mb-3">التواصل</h3>
              <p className="text-gray-700">
                للاستفسارات أو المشاكل المتعلقة بالتطبيق، يرجى التواصل معنا من خلال قسم الدعم في التطبيق.
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
