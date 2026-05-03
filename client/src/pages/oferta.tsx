import { Navigation } from "@/components/navigation";
import { BackButton } from "@/components/back-button";
import { OfertaDocument } from "@/content/oferta";
import { useDocumentMeta } from "@/lib/use-document-meta";

export default function OfertaPage() {
  useDocumentMeta({
    title: "Публичная оферта — LOÉRA",
    description:
      "Публичная оферта интернет-магазина LOÉRA. Условия покупки, оплаты, доставки, возврата и реквизиты продавца.",
  });

  return (
    <div className="min-h-0 flex-1">
      <Navigation />
      <BackButton />
      <main className="container mx-auto px-4 pb-16 pt-44">
        <article className="prose prose-neutral max-w-3xl dark:prose-invert prose-headings:font-semibold prose-a:text-pink-600 prose-a:no-underline hover:prose-a:underline">
          <OfertaDocument />
        </article>
      </main>
    </div>
  );
}
