import Link from "next/link";
import {
  CalendarCheck,
  Camera,
  Flower2,
  Gem,
  HeartHandshake,
  Landmark,
  Palette,
  Search,
  Send,
  Shirt,
  ShieldCheck,
  Sparkles,
  UtensilsCrossed,
  Wallet,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { EmptyState } from "@/components/common/empty-state";
import { Hero } from "@/components/home/hero";
import { Reveal } from "@/components/home/reveal";
import { ServiceCard } from "@/components/services/service-card";
import { publicGet } from "@/lib/server-api";
import type { Service } from "@/lib/types";

const CATEGORY_ICONS = {
  "Photography & Videography": Camera,
  "Wedding Venues": Landmark,
  "Decoration & Florist": Flower2,
  "Catering Services": UtensilsCrossed,
  "Makeup & Styling": Palette,
  "Wedding Fashion": Shirt,
} as const;

const BENEFITS = [
  { icon: ShieldCheck, title: "Reviewed vendors", text: "Every service is checked by our team before couples can see or book it." },
  { icon: Wallet, title: "Clear pricing", text: "Starting prices are shown up front so you can compare before you reach out." },
  { icon: CalendarCheck, title: "One booking inbox", text: "Send requests to many vendors and follow each reply from your dashboard." },
  { icon: HeartHandshake, title: "Built for both sides", text: "Vendors get a simple dashboard to manage services, requests and their plan." },
];

const STEPS = [
  { icon: Search, title: "Discover", text: "Browse by category, location and price to build your shortlist." },
  { icon: Send, title: "Request", text: "Pick your date and venue and send a booking request in seconds." },
  { icon: Gem, title: "Celebrate", text: "Track replies, confirm your team and enjoy the day." },
];

function SectionTitle({ eyebrow, title, text }: { eyebrow: string; title: string; text?: string }) {
  return (
    <div className="mx-auto mb-12 max-w-2xl text-center">
      <p className="mb-2 text-xs font-semibold tracking-[0.2em] text-primary uppercase">{eyebrow}</p>
      <h2 className="text-3xl font-semibold sm:text-4xl">{title}</h2>
      {text && <p className="mt-3 text-muted-foreground">{text}</p>}
    </div>
  );
}

export default async function HomePage() {
  const [featured, categories] = await Promise.all([
    publicGet<Service[]>("/api/services/featured"),
    publicGet<{ name: keyof typeof CATEGORY_ICONS; count: number }[]>("/api/services/categories"),
  ]);

  return (
    <>
      <Hero />

      {/* Dynamic section 1: featured services */}
      <section className="container mx-auto px-4 py-20">
        <Reveal>
          <SectionTitle eyebrow="Featured" title="Wedding services couples love" text="Fresh, approved listings from vendors on WedPlan." />
        </Reveal>
        {featured && featured.length > 0 ? (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {featured.map((s, i) => (
              <Reveal key={s._id} delay={i * 0.05}>
                <ServiceCard service={s} />
              </Reveal>
            ))}
          </div>
        ) : (
          <EmptyState
            title={featured ? "No services yet" : "Services are unavailable right now"}
            description={featured ? "Approved services will appear here soon." : "Please refresh in a moment."}
          />
        )}
        <div className="mt-10 text-center">
          <Button variant="outline" size="lg" asChild>
            <Link href="/services">See all services</Link>
          </Button>
        </div>
      </section>

      {/* Dynamic section 2: categories */}
      <section className="bg-secondary/40 py-20">
        <div className="container mx-auto px-4">
          <Reveal>
            <SectionTitle eyebrow="Categories" title="Everything your day needs" />
          </Reveal>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {(categories ?? Object.keys(CATEGORY_ICONS).map((name) => ({ name: name as keyof typeof CATEGORY_ICONS, count: 0 }))).map(
              (c, i) => {
                const Icon = CATEGORY_ICONS[c.name] ?? Sparkles;
                return (
                  <Reveal key={c.name} delay={i * 0.05}>
                    <Link
                      href={`/services?category=${encodeURIComponent(c.name)}`}
                      className="group flex items-center gap-4 rounded-xl border bg-card p-5 transition-all hover:-translate-y-0.5 hover:border-primary hover:shadow-md"
                    >
                      <span className="grid size-12 place-items-center rounded-full bg-secondary text-primary transition-colors group-hover:bg-primary group-hover:text-primary-foreground">
                        <Icon className="size-5" />
                      </span>
                      <span>
                        <span className="block font-medium">{c.name}</span>
                        <span className="text-sm text-muted-foreground">
                          {c.count} {c.count === 1 ? "service" : "services"}
                        </span>
                      </span>
                    </Link>
                  </Reveal>
                );
              },
            )}
          </div>
        </div>
      </section>

      {/* Why choose WedPlan */}
      <section className="container mx-auto px-4 py-20">
        <Reveal>
          <SectionTitle eyebrow="Why WedPlan" title="Less searching, more celebrating" />
        </Reveal>
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {BENEFITS.map(({ icon: Icon, title, text }, i) => (
            <Reveal key={title} delay={i * 0.08}>
              <Card className="h-full">
                <CardContent className="space-y-3">
                  <Icon className="size-6 text-primary" />
                  <h3 className="text-lg font-semibold">{title}</h3>
                  <p className="text-sm text-muted-foreground">{text}</p>
                </CardContent>
              </Card>
            </Reveal>
          ))}
        </div>
      </section>

      {/* How it works */}
      <section className="border-y bg-gradient-to-b from-background to-accent/30 py-20">
        <div className="container mx-auto px-4">
          <Reveal>
            <SectionTitle eyebrow="How it works" title="Three steps to your dream team" />
          </Reveal>
          <div className="grid gap-8 md:grid-cols-3">
            {STEPS.map(({ icon: Icon, title, text }, i) => (
              <Reveal key={title} delay={i * 0.1}>
                <div className="text-center">
                  <span className="relative mx-auto grid size-16 place-items-center rounded-full border-2 border-primary/30 bg-background text-primary">
                    <Icon className="size-6" />
                    <span className="absolute -top-2 -right-2 grid size-7 place-items-center rounded-full bg-primary text-xs font-bold text-primary-foreground">
                      {i + 1}
                    </span>
                  </span>
                  <h3 className="mt-4 text-xl font-semibold">{title}</h3>
                  <p className="mx-auto mt-2 max-w-xs text-sm text-muted-foreground">{text}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
