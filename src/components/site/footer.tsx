import Link from "next/link";
import { Mail, MapPin, Phone } from "lucide-react";
import { FacebookIcon, InstagramIcon, YoutubeIcon } from "./social-icons";
import { Logo } from "./logo";

const CATEGORY_LINKS = ["Photography & Videography", "Wedding Venues", "Decoration & Florist", "Catering Services"];

export function Footer() {
  return (
    <footer className="mt-24 border-t bg-secondary/40">
      <div className="container mx-auto grid gap-10 px-4 py-14 sm:grid-cols-2 lg:grid-cols-4">
        <div className="space-y-4">
          <Logo />
          <p className="max-w-xs text-sm text-muted-foreground">
            WedPlan brings trusted wedding vendors together so couples can compare, book and plan their big day
            in one calm place.
          </p>
          <div className="flex gap-3">
            {[
              { href: "https://facebook.com", label: "Facebook", Icon: FacebookIcon },
              { href: "https://instagram.com", label: "Instagram", Icon: InstagramIcon },
              { href: "https://youtube.com", label: "YouTube", Icon: YoutubeIcon },
            ].map(({ href, label, Icon }) => (
              <a
                key={label}
                href={href}
                target="_blank"
                rel="noreferrer"
                aria-label={label}
                className="grid size-9 place-items-center rounded-full border bg-background text-muted-foreground transition-colors hover:border-primary hover:text-primary"
              >
                <Icon className="size-4" />
              </a>
            ))}
          </div>
        </div>

        <div>
          <h3 className="mb-4 font-sans text-sm font-semibold uppercase tracking-wider">Explore</h3>
          <ul className="space-y-2 text-sm text-muted-foreground">
            <li><Link className="hover:text-primary" href="/">Home</Link></li>
            <li><Link className="hover:text-primary" href="/services">Browse Services</Link></li>
            <li><Link className="hover:text-primary" href="/sign-up">Become a Vendor</Link></li>
            <li><Link className="hover:text-primary" href="/sign-in">Sign In</Link></li>
          </ul>
        </div>

        <div>
          <h3 className="mb-4 font-sans text-sm font-semibold uppercase tracking-wider">Categories</h3>
          <ul className="space-y-2 text-sm text-muted-foreground">
            {CATEGORY_LINKS.map((c) => (
              <li key={c}>
                <Link className="hover:text-primary" href={`/services?category=${encodeURIComponent(c)}`}>
                  {c}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h3 className="mb-4 font-sans text-sm font-semibold uppercase tracking-wider">Contact</h3>
          <ul className="space-y-3 text-sm text-muted-foreground">
            <li className="flex items-start gap-2"><MapPin className="mt-0.5 size-4 shrink-0" /> Gulshan 2, Dhaka, Bangladesh</li>
            <li className="flex items-center gap-2"><Phone className="size-4" /> +880 1700-000000</li>
            <li className="flex items-center gap-2"><Mail className="size-4" /> hello@wedplan.com</li>
          </ul>
        </div>
      </div>
      <div className="border-t py-5 text-center text-xs text-muted-foreground">
        © {new Date().getFullYear()} WedPlan. All rights reserved.
      </div>
    </footer>
  );
}
