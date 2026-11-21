import Image from "next/image";
import Link from "next/link";
import { BadgeCheck, MapPin } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { formatPrice } from "@/lib/utils";
import type { Service, VendorSummary } from "@/lib/types";

function isPremium(v: VendorSummary) {
  return v.subscriptionPlan === "premium" && !!v.subscriptionExpiresAt && new Date(v.subscriptionExpiresAt) > new Date();
}

export function ServiceCard({ service }: { service: Service }) {
  const vendor = typeof service.vendorId === "object" ? service.vendorId : null;

  return (
    <Card className="group gap-0 overflow-hidden py-0 transition-shadow hover:shadow-lg">
      <div className="relative aspect-[4/3] overflow-hidden bg-muted">
        {service.images[0] && (
          <Image
            src={service.images[0]}
            alt={service.serviceName}
            fill
            sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
            className="object-cover transition-transform duration-500 group-hover:scale-105"
          />
        )}
        <Badge variant="secondary" className="absolute top-3 left-3 bg-background/90 backdrop-blur">
          {service.category}
        </Badge>
      </div>
      <div className="flex flex-1 flex-col gap-3 p-5">
        <div className="flex items-start justify-between gap-3">
          <h3 className="line-clamp-1 font-serif text-lg font-semibold">{service.serviceName}</h3>
          <span className="shrink-0 font-semibold text-primary">{formatPrice(service.price)}</span>
        </div>
        <p className="flex items-center gap-1.5 text-sm text-muted-foreground">
          <MapPin className="size-4" /> {service.location}
        </p>
        {vendor && (
          <p className="flex items-center gap-1.5 text-sm">
            <span className="truncate">by {vendor.businessName || vendor.name}</span>
            {isPremium(vendor) && <BadgeCheck className="size-4 shrink-0 text-gold" aria-label="Premium vendor" />}
          </p>
        )}
        <Button asChild variant="outline" className="mt-auto">
          <Link href={`/services/${service._id}`}>View Details</Link>
        </Button>
      </div>
    </Card>
  );
}
