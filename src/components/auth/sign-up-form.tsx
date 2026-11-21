"use client";

import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { useForm, useWatch } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Camera, Loader2, Store, UserRound } from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { signUp } from "@/lib/auth-client";
import { uploadImage } from "@/lib/api";
import { dashboardFor } from "@/lib/roles";
import { cn } from "@/lib/utils";
import { FieldError, OrDivider } from "./auth-card";
import { GoogleButton } from "./google-button";

const MAX_IMAGE_BYTES = 2 * 1024 * 1024;

const schema = z
  .object({
    name: z.string().trim().min(2, "Full name must be at least 2 characters").max(60),
    email: z.string().trim().email("Enter a valid email address"),
    password: z
      .string()
      .min(6, "Password must be at least 6 characters")
      .regex(/[A-Z]/, "Password needs at least one uppercase letter")
      .regex(/[a-z]/, "Password needs at least one lowercase letter"),
    role: z.enum(["customer", "vendor"]),
    businessName: z.string().trim().max(100).optional(),
  })
  .refine((v) => v.role !== "vendor" || (v.businessName && v.businessName.length >= 2), {
    path: ["businessName"],
    message: "Business name is required for vendors",
  });
type Values = z.infer<typeof schema>;

const ROLE_OPTIONS = [
  { value: "customer", title: "I'm planning a wedding", Icon: UserRound },
  { value: "vendor", title: "I offer wedding services", Icon: Store },
] as const;

export function SignUpForm() {
  const router = useRouter();
  const [image, setImage] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const {
    register,
    handleSubmit,
    control,
    setValue,
    formState: { errors, isSubmitting },
  } = useForm<Values>({ resolver: zodResolver(schema), defaultValues: { role: "customer" } });
  const role = useWatch({ control, name: "role" });

  function onPickImage(file: File | undefined) {
    if (!file) return;
    if (!file.type.startsWith("image/")) return toast.error("Please choose an image file");
    if (file.size > MAX_IMAGE_BYTES) return toast.error("Image must be 2MB or smaller");
    setImage(file);
    setPreview(URL.createObjectURL(file));
  }

  async function onSubmit(values: Values) {
    let imageUrl: string | undefined;
    if (image) {
      try {
        imageUrl = await uploadImage(image);
      } catch (err) {
        toast.error(err instanceof Error ? err.message : "Image upload failed");
        return;
      }
    }

    const { data, error } = await signUp.email({
      name: values.name,
      email: values.email,
      password: values.password,
      image: imageUrl,
      role: values.role,
      businessName: values.role === "vendor" ? values.businessName : undefined,
    });
    if (error) {
      toast.error(error.message ?? "Could not create your account");
      return;
    }
    toast.success("Account created. Welcome to WedPlan!");
    router.push(dashboardFor(data.user.role));
    router.refresh();
  }

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)} className="grid gap-4" noValidate>
        <div className="grid grid-cols-2 gap-3" role="radiogroup" aria-label="Account type">
          {ROLE_OPTIONS.map(({ value, title, Icon }) => (
            <button
              key={value}
              type="button"
              role="radio"
              aria-checked={role === value}
              onClick={() => setValue("role", value, { shouldValidate: true })}
              className={cn(
                "flex flex-col items-center gap-2 rounded-lg border p-3 text-center text-sm transition-colors",
                role === value ? "border-primary bg-secondary text-primary" : "hover:bg-muted",
              )}
            >
              <Icon className="size-5" />
              <span className="font-medium capitalize">{value}</span>
              <span className="text-xs text-muted-foreground">{title}</span>
            </button>
          ))}
        </div>

        <div className="flex items-center gap-4">
          <label
            htmlFor="image"
            className="relative grid size-16 shrink-0 cursor-pointer place-items-center overflow-hidden rounded-full border-2 border-dashed bg-muted text-muted-foreground hover:border-primary"
          >
            {preview ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img src={preview} alt="Profile preview" className="size-full object-cover" />
            ) : (
              <Camera className="size-5" />
            )}
          </label>
          <div className="text-sm">
            <p className="font-medium">Profile photo (optional)</p>
            <p className="text-muted-foreground">JPG, PNG or WEBP, up to 2MB</p>
          </div>
          <input id="image" type="file" accept="image/*" className="sr-only" onChange={(e) => onPickImage(e.target.files?.[0])} />
        </div>

        <div className="grid gap-2">
          <Label htmlFor="name">Full Name</Label>
          <Input id="name" autoComplete="name" aria-invalid={!!errors.name} {...register("name")} />
          <FieldError message={errors.name?.message} />
        </div>

        {role === "vendor" && (
          <div className="grid gap-2">
            <Label htmlFor="businessName">Business Name</Label>
            <Input id="businessName" aria-invalid={!!errors.businessName} {...register("businessName")} />
            <FieldError message={errors.businessName?.message} />
          </div>
        )}

        <div className="grid gap-2">
          <Label htmlFor="email">Email</Label>
          <Input id="email" type="email" autoComplete="email" aria-invalid={!!errors.email} {...register("email")} />
          <FieldError message={errors.email?.message} />
        </div>
        <div className="grid gap-2">
          <Label htmlFor="password">Password</Label>
          <Input id="password" type="password" autoComplete="new-password" aria-invalid={!!errors.password} {...register("password")} />
          <FieldError message={errors.password?.message} />
          {!errors.password && (
            <p className="text-xs text-muted-foreground">At least 6 characters, with an uppercase and a lowercase letter.</p>
          )}
        </div>

        <Button type="submit" disabled={isSubmitting} className="mt-2">
          {isSubmitting && <Loader2 className="animate-spin" />} Create Account
        </Button>
      </form>
      <OrDivider />
      <GoogleButton role={role} label={`Sign up with Google as ${role}`} />
      <p className="mt-6 text-center text-sm text-muted-foreground">
        Already have an account?{" "}
        <Link href="/sign-in" className="font-medium text-primary hover:underline">
          Sign in
        </Link>
      </p>
    </>
  );
}
