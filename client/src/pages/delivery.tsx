import { Navigation } from "@/components/navigation";

export default function DeliveryPage() {
  return (
    <div className="min-h-screen">
      <Navigation />
      <div className="container mx-auto px-4 pt-36">
        <div className="max-w-3xl mx-auto">
          <h1 className="text-3xl font-light mb-10 text-center">Доставка</h1>
          
          <div className="space-y-8">
            <div>
              <p className="text-lg mb-6">
                Бесплатная доставка по Беларуси до пунктов Белпочта, Европочта.
              </p>
            </div>

            <div className="space-y-4">
              <h2 className="text-xl font-medium">Отправляем Почтой, СДЭК</h2>
              <p className="text-muted-foreground">
                Сроки доставки: почта 2 недели, СДЭК 3-5 дней.
              </p>
              <p className="text-muted-foreground">
                Стоимость доставки в РФ от 450 до 600 рублей. Точная стоимость зависит от адреса получателя.
              </p>
            </div>

            <div className="space-y-4 pt-6">
              <h2 className="text-xl font-medium">Международная доставка</h2>
              <p className="text-muted-foreground">
                Также есть международная доставка в большинство стран. Стоимость рассчитывается индивидуально.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 