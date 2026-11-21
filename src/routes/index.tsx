import { createFileRoute } from "@tanstack/react-router";
import { brand, seo, services, socials } from "@/content/site";
import { SiteHeader } from "@/components/site/SiteHeader";
import { Hero } from "@/components/site/Hero";
import { About } from "@/components/site/About";
import { WhyMe } from "@/components/site/WhyMe";
import { Projects } from "@/components/site/Projects";
import { Services } from "@/components/site/Services";
import { Contact } from "@/components/site/Contact";
import { Quote } from "@/components/site/Quote";
import { EnquiryPrompts } from "@/components/site/EnquiryPrompts";
import { SiteHelper } from "@/components/site/SiteHelper";
import { SiteFooter } from "@/components/site/SiteFooter";
import { useReveal } from "@/lib/use-reveal";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: seo.title },
      { name: "description", content: seo.description },
      { property: "og:title", content: seo.title },
      { property: "og:description", content: seo.description },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:title", content: seo.title },
      { name: "twitter:description", content: seo.description },
    ],
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "ProfessionalService",
          name: brand.name,
          description: seo.description,
          slogan: brand.tagline,
          makesOffer: services.map((name) => ({ "@type": "Offer", itemOffered: { "@type": "Service", name } })),
          sameAs: socials.map((s) => s.url).filter(Boolean),
        }),
      },
    ],
  }),
  component: Index,
});

function Index() {
  useReveal();
  return (
    <>
      <SiteHeader />
      <main id="main" tabIndex={-1} className="outline-none">
        <Hero />
        <About />
        <WhyMe />
        <Projects />
        <Services />
        <Quote />
        <Contact />
      </main>
      <SiteFooter />
      <EnquiryPrompts />
      <SiteHelper />
    </>
  );
}
