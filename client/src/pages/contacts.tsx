import { Navigation } from "@/components/navigation";
import { BackButton } from "@/components/back-button";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  SELLER_EMAIL,
  SELLER_FULL_NAME,
  SELLER_INN,
  SELLER_OGRNIP,
  SELLER_OGRNIP_DATE,
  SELLER_PHONE_DISPLAY,
  SELLER_PHONE_TEL,
  SELLER_SHOP_NAME,
} from "@/lib/seller";
import { useDocumentMeta } from "@/lib/use-document-meta";
import { Instagram, Send } from "lucide-react";

export default function ContactsPage() {
  useDocumentMeta({
    title: "Контакты — LOÉRA",
    description:
      "Контактные данные и реквизиты продавца интернет-магазина LOÉRA.",
  });

  const instagramLink = "https://www.instagram.com/loera.brand/";
  const telegramUsername = "elizz_16";

  return (
    <div className="min-h-0 flex-1">
      <Navigation />
      <BackButton />
      <div className="container mx-auto px-4 pb-16 pt-44">
        <div className="mx-auto max-w-md">
          <Card className="border-transparent bg-transparent shadow-none">
            <CardHeader>
              <CardTitle className="text-center">Контакты</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6 text-left">
              <div className="space-y-1">
                <p className="text-center text-lg font-medium">{SELLER_SHOP_NAME}</p>
                <p className="text-muted-foreground">Индивидуальный предприниматель:</p>
                <p className="font-medium text-foreground">{SELLER_FULL_NAME}</p>
              </div>

              <div className="space-y-1">
                <p className="text-sm font-medium text-muted-foreground">Телефон</p>
                <p>
                  <a
                    href={`tel:${SELLER_PHONE_TEL}`}
                    className="font-medium text-foreground underline underline-offset-2 hover:text-foreground/90 focus:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                  >
                    {SELLER_PHONE_DISPLAY}
                  </a>
                </p>
              </div>

              <div className="space-y-1">
                <p className="text-sm font-medium text-muted-foreground">Email</p>
                <p>
                  <a
                    href={`mailto:${SELLER_EMAIL}`}
                    className="break-all font-medium text-foreground underline underline-offset-2 hover:text-foreground/90 focus:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                  >
                    {SELLER_EMAIL}
                  </a>
                </p>
              </div>

              <div className="space-y-1 border-t border-border pt-4">
                <p className="text-sm font-medium text-muted-foreground">Реквизиты</p>
                <p>ОГРНИП: {SELLER_OGRNIP}</p>
                <p>Дата присвоения ОГРНИП: {SELLER_OGRNIP_DATE}</p>
                <p>ИНН: {SELLER_INN}</p>
              </div>

              <div className="space-y-3 border-t border-border pt-6">
                <p className="text-center text-sm text-muted-foreground">
                  Также вы можете написать нам в мессенджерах:
                </p>
                <Button
                  type="button"
                  onClick={() => window.open(`https://t.me/${telegramUsername}`, "_blank")}
                  className="flex w-full items-center gap-2 border-0 text-white"
                  style={{ backgroundColor: "#000000" }}
                >
                  <Send className="h-5 w-5" />
                  Написать через Telegram
                </Button>
                <Button
                  type="button"
                  onClick={() => window.open(instagramLink, "_blank")}
                  className="flex w-full items-center gap-2 border-0 text-white"
                  style={{ backgroundColor: "#ec4899" }}
                >
                  <Instagram className="h-5 w-5" />
                  Написать через Instagram
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
