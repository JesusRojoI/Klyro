import { Navbar } from "@/components/navbar";
import { Hero } from "@/components/hero";
import { Services } from "@/components/services";
import { TrainingSystems } from "@/components/training-systems";
import { TrainingLanguages } from "@/components/training-languages";
import { WhyUs } from "@/components/why-us";
import { QuoteCta } from "@/components/quote-cta";
import { Contact } from "@/components/contact";
import { Footer } from "@/components/footer";

export default function Home() {
  return (
    <main className="relative min-h-screen bg-background">
      <Navbar />
      <Hero />
      <Services />
      <TrainingSystems />
      <TrainingLanguages />
      <WhyUs />
      <QuoteCta />
      <Contact />
      <Footer />
    </main>
  );
}