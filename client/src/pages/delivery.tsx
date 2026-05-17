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

          <div className="space-y-8 text-lg">
            <div>
              <p className="font-medium mb-3">Доставка СДЭК:</p>
              <h2 className="text-xl font-medium mb-2">В Беларусь:</h2>
              <ul className="list-disc pl-6 space-y-2 mb-6">
                <li>20 BYN, срок 6–7 рабочих дней</li>
                <li>65 BYN, срок 2 рабочих дня</li>
              </ul>
              <h2 className="text-xl font-medium mb-2">По России:</h2>
              <ul className="list-disc pl-6 space-y-2 mb-6">
                <li>от 600 RUB ( стоимость зависит от региона )</li>
              </ul>
              <p className="mb-6">
                Также есть международная доставка в большинство стран. Стоимость
                рассчитывается индивидуально.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
