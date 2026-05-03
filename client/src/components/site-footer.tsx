import { Link } from "wouter";
import {
  SELLER_EMAIL,
  SELLER_INN,
  SELLER_OGRNIP,
  SELLER_OGRNIP_DATE,
  SELLER_PHONE_DISPLAY,
  SELLER_PHONE_TEL,
  SELLER_SHORT_LEGAL,
} from "@/lib/seller";

export function SiteFooter() {
  return (
    <footer className="mt-auto border-t border-border bg-muted/40 text-foreground">
      <div className="container mx-auto px-4 py-8 text-sm">
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          <div className="space-y-2">
            <h2 className="text-base font-semibold tracking-tight">Контакты</h2>
            <p>
              <span className="text-muted-foreground">Телефон: </span>
              <a
                href={`tel:${SELLER_PHONE_TEL}`}
                className="font-medium text-foreground underline underline-offset-2 hover:text-foreground/90 focus:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
              >
                {SELLER_PHONE_DISPLAY}
              </a>
            </p>
            <p>
              <span className="text-muted-foreground">Email: </span>
              <a
                href={`mailto:${SELLER_EMAIL}`}
                className="font-medium text-foreground underline underline-offset-2 hover:text-foreground/90 focus:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
              >
                {SELLER_EMAIL}
              </a>
            </p>
          </div>

          <div className="space-y-2">
            <h2 className="text-base font-semibold tracking-tight">Продавец</h2>
            <p className="font-medium">{SELLER_SHORT_LEGAL}</p>
            <p>
              <span className="text-muted-foreground">ОГРНИП: </span>
              {SELLER_OGRNIP}
            </p>
            <p>
              <span className="text-muted-foreground">ИНН: </span>
              {SELLER_INN}
            </p>
            <p className="text-muted-foreground">
              ОГРНИП присвоен: {SELLER_OGRNIP_DATE}
            </p>
          </div>

          <div className="space-y-2 sm:col-span-2 lg:col-span-1">
            <h2 className="text-base font-semibold tracking-tight">Документы</h2>
            <ul className="flex flex-col gap-2">
              <li>
                <Link
                  href="/oferta"
                  className="font-medium text-foreground underline underline-offset-2 hover:text-foreground/90 focus:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                >
                  Публичная оферта
                </Link>
              </li>
              <li>
                <Link
                  href="/contacts"
                  className="font-medium text-foreground underline underline-offset-2 hover:text-foreground/90 focus:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                >
                  Контакты
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </footer>
  );
}
