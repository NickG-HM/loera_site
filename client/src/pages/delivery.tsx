import { Navigation } from "@/components/navigation";
import { BackButton } from "@/components/back-button";

export default function DeliveryPage() {
  return (
    <div className="min-h-screen">
      <Navigation />
      <BackButton />
      <div className="container mx-auto px-4 pt-44 pb-12">
        <div className="max-w-3xl mx-auto">
          <h1 className="text-3xl font-light mb-10 text-center">Доставка</h1>
          
          <div className="space-y-8">
            <div>
              <p className="text-lg mb-6">
                Бесплатная доставка по Беларуси до пунктов Белпочта, Европочта.
              </p>
            </div>

            <div className="space-y-4">
              <h2 className="text-xl font-medium">В РФ отправляем Почтой, CDEK</h2>
              <p className="text-lg mb-6">
                Сроки доставки: Почта 2 недели, CDEK 3-5 дней.
              </p>
              <p className="text-lg mb-6">
                Стоимость доставки в РФ от 450 до 600 рублей.
              </p>
              <p className="text-lg mb-6">
                Точная стоимость зависит от адреса получателя.
              </p>
            </div>

            <div>
              <p className="text-lg mb-6">
                Также есть международная доставка в большинство стран. Стоимость рассчитывается индивидуально.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 