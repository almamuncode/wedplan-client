import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

export function AuthCard({ title, description, children }: { title: string; description: string; children: React.ReactNode }) {
  return (
    <div className="relative grid min-h-[calc(100dvh-4rem)] place-items-center overflow-hidden px-4 py-12">
      <div className="pointer-events-none absolute -top-32 -left-32 size-96 rounded-full bg-secondary blur-3xl" aria-hidden />
      <div className="pointer-events-none absolute -right-32 -bottom-32 size-96 rounded-full bg-accent/70 blur-3xl" aria-hidden />
      <Card className="relative w-full max-w-md">
        <CardHeader className="text-center">
          <CardTitle className="font-serif text-3xl">{title}</CardTitle>
          <CardDescription>{description}</CardDescription>
        </CardHeader>
        <CardContent>{children}</CardContent>
      </Card>
    </div>
  );
}

export function FieldError({ message }: { message?: string }) {
  if (!message) return null;
  return <p className="text-sm text-destructive">{message}</p>;
}

export function OrDivider() {
  return (
    <div className="relative my-6 text-center text-xs uppercase text-muted-foreground">
      <span className="relative z-10 bg-card px-2">or</span>
      <span className="absolute inset-x-0 top-1/2 h-px bg-border" aria-hidden />
    </div>
  );
}
