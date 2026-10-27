import { CollapsibleFeature } from "@/components/sections/CollapsibleFeature";
import { DesignedHereMadeHere } from "@/components/sections/DesignedHereMadeHere";
import { Hero } from "@/components/sections/Hero";
import { IndustriesStrip } from "@/components/sections/IndustriesStrip";
import { PackagesTeaser } from "@/components/sections/PackagesTeaser";
import { Process } from "@/components/sections/Process";
import { SelectedWork } from "@/components/sections/SelectedWork";
import { Services } from "@/components/sections/Services";
import { StartProject } from "@/components/sections/StartProject";
import { Testimonials } from "@/components/sections/Testimonials";

export default function HomePage() {
  return (
    <>
      <Hero />
      <SelectedWork />
      <Services />
      <DesignedHereMadeHere />
      <CollapsibleFeature />
      <Process />
      <IndustriesStrip />
      <PackagesTeaser />
      <Testimonials />
      <StartProject />
    </>
  );
}
