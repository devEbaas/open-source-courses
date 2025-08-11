import Image from "next/image";
import BackendPing from "../components/backend-ping";
import { Hero } from "@/components/landing/Hero";
import { Testimonials } from "@/components/landing/Testimonials";
import { Cta } from "@/components/landing/CTA";

export default function Page() {
  return (
    <>
      <section className="mx-auto max-w-6xl px-4 py-12 md:py-20">
        <Hero />
      <Cta />
      </section>
      <Testimonials />
    </>
  );
}

function Feature({ title, desc }: { title: string; desc: string }) {
  return (
    <div className="rounded-lg border p-5">
      <h3 className="font-semibold">{title}</h3>
      <p className="mt-1 text-sm text-gray-600">{desc}</p>
    </div>
  );
}
