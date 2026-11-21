"use client";

import Link from "next/link";
import { motion, useReducedMotion } from "motion/react";
import { ArrowRight, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";

export function Hero() {
  const reduce = useReducedMotion();
  const fade = (delay: number) => ({
    initial: reduce ? false : { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.7, delay, ease: [0.22, 1, 0.36, 1] as const },
  });

  return (
    <section className="relative overflow-hidden border-b bg-gradient-to-b from-secondary/70 via-background to-background">
      {/* Decorative wedding rings and petals */}
      <svg className="pointer-events-none absolute -top-24 right-[-10%] h-[520px] w-[520px] text-primary/10" viewBox="0 0 200 200" aria-hidden>
        <circle cx="80" cy="100" r="55" fill="none" stroke="currentColor" strokeWidth="6" />
        <circle cx="120" cy="100" r="55" fill="none" stroke="currentColor" strokeWidth="6" />
      </svg>
      <div className="pointer-events-none absolute bottom-0 left-[-8%] size-80 rounded-full bg-accent/60 blur-3xl" aria-hidden />

      <div className="container relative mx-auto grid gap-12 px-4 py-20 md:py-28 lg:grid-cols-[1.1fr_0.9fr] lg:items-center">
        <div>
          <motion.span {...fade(0)} className="inline-flex items-center gap-2 rounded-full border bg-background/80 px-3 py-1 text-xs font-medium text-primary">
            <Sparkles className="size-3.5" /> Trusted vendors, one calm plan
          </motion.span>
          <motion.h1 {...fade(0.1)} className="mt-5 text-4xl leading-tight font-semibold sm:text-5xl lg:text-6xl">
            Plan the wedding you have <span className="text-primary italic">always pictured</span>
          </motion.h1>
          <motion.p {...fade(0.2)} className="mt-5 max-w-xl text-lg text-muted-foreground">
            Compare photographers, venues, florists, caterers and stylists, then send booking requests and track every
            reply from a single dashboard.
          </motion.p>
          <motion.div {...fade(0.3)} className="mt-8 flex flex-wrap gap-3">
            <Button size="lg" asChild>
              <Link href="/services">
                Explore Wedding Services <ArrowRight />
              </Link>
            </Button>
            <Button size="lg" variant="outline" asChild>
              <Link href="/sign-up">List your business</Link>
            </Button>
          </motion.div>
        </div>

        <motion.div
          initial={reduce ? false : { opacity: 0, scale: 0.96 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="relative mx-auto aspect-[4/5] w-full max-w-sm"
        >
          <div className="absolute inset-0 rounded-[999px_999px_2rem_2rem] border-8 border-background bg-gradient-to-br from-primary/80 via-primary/50 to-gold/60 shadow-2xl" />
          <div className="absolute inset-6 grid place-items-center rounded-[999px_999px_1.5rem_1.5rem] border border-white/40 text-center text-white">
            <div>
              <p className="font-serif text-5xl">6</p>
              <p className="mt-1 text-sm tracking-widest uppercase">wedding service categories</p>
            </div>
          </div>
          <div className="absolute -bottom-6 -left-6 rounded-xl border bg-background px-4 py-3 shadow-lg">
            <p className="text-xs text-muted-foreground">Booking request</p>
            <p className="text-sm font-semibold text-emerald-700">Accepted ✓</p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
