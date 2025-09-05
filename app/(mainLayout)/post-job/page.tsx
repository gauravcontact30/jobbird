/* eslint-disable react/no-unescaped-entities */
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import React from "react";
import Image from "next/image";
import { CreateJobForm } from "@/components/forms/CreateJobForm";
import { prisma } from "@/app/utils/db";
import { requireUser } from "@/app/utils/hooks";
import { redirect } from "next/navigation";

import AirbnbLogo from "@/public/icons8-airbnb-500.png";
import AmazonLogo from "@/public/icons8-amazon-500.png";
import DisneyPlusLogo from "@/public/icons8-disney-plus-500.png";
import FiverrLogo from "@/public/icons8-fiverr-500.png";
import HMLogo from "@/public/icons8-hm-500.png";
import HuluLogo from "@/public/icons8-hulu-500.png";
import InfiniteCampusLogo from "@/public/icons8-infinite-campus-500.png";
import SalesForceLogo from "@/public/icons8-salesforce-500.png";
import VoceraLogo from "@/public/icons8-vocera-500.png";
import VolvoLogo from "@/public/icons8-volvo-500.png";
import WellsFargoLogo from "@/public/icons8-wellsfargo-500.png";
import XFinityLogo from "@/public/icons8-xfinity-500.png";
import ZaraLogo from "@/public/icons8-zara-100.png"
import ZomatoLogo from "@/public/icons8-zomato-100.png";
import OriLogo from "@/public/icons8-ori-new-100.png";

const companies = [
  { id: 0, name: "Airbnb", logo: AirbnbLogo },
  { id: 1, name: "Amazon", logo: AmazonLogo },
  { id: 2, name: "DisneyPlus", logo: DisneyPlusLogo },
  { id: 3, name: "Fiverr", logo: FiverrLogo },
  { id: 4, name: "HM", logo: HMLogo },
  { id: 5, name: "Hulu", logo: HuluLogo },
  { id: 6, name: "InfiniteCampus", logo: InfiniteCampusLogo },
  { id: 7, name: "SalesForce", logo: SalesForceLogo },
  { id: 8, name: "Zara", logo: ZaraLogo },
  { id: 9, name: "Vocera", logo: VoceraLogo },
  { id: 10, name: "Volvo", logo: VolvoLogo },
  { id: 11, name: "WellsFargo", logo: WellsFargoLogo },
  { id: 12, name: "XFinity", logo: XFinityLogo },
  { id: 13, name: "Zomato", logo: ZomatoLogo },
  { id: 14, name: "Ori", logo: OriLogo },
];

const testimonials = [
  {
    quote: "We found our ideal candidate within 48 hours of posting. The quality of applicants was exceptional!",
    author: "Sarah Chen",
    company: "TechCorp",
  },
  {
    quote: "The platform made hiring remote talent incredibly simple. Highly recommended!",
    author: "Mark Johnson",
    company: "StartupX",
  },
  {
    quote: "We've consistently found high-quality candidates here. It's our go-to platform for all our hiring needs.",
    author: "Emily Rodriguez",
    company: "InnovateNow",
  },
];

const stats = [
  { value: "10k+", label: "Monthly active job seekers" },
  { value: "48h", label: "Average time to hire" },
  { value: "95%", label: "Employer satisfaction rate" },
  { value: "500+", label: "Companies hiring monthly" },
];

async function getCompany(userId: string) {
  const data = await prisma.company.findUnique({
    where: {
      userId: userId,
    },
    select: {
      name: true,
      location: true,
      about: true,
      logo: true,
      xAccount: true,
      website: true,
    },
  });

  if (!data) {
    return redirect("/");
  }
  return data;
}

const PostJobPage = async () => {
  const session = await requireUser();
  const data = await getCompany(session.id as string);
  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 mt-5">
      <CreateJobForm
        companyAbout={data.about}
        companyLocation={data.location}
        companyLogo={data.logo}
        companyName={data.name}
        companyXAccount={data.xAccount}
        companyWebsite={data.website}
      />

      <div className="col-span-1">
        <Card className="lg:sticky lg:top-4">
          <CardHeader>
            <CardTitle className="text-xl">Trusted by Industry Leaders</CardTitle>
            <CardDescription>Join thousands of companies hiring top talent</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* Company Logos */}
            <div className="grid grid-cols-3 gap-4">
              {companies.map((company) => (
                <div key={company.id} className="flex items-center justify-center">
                  <Image
                    src={company.logo}
                    alt={company.name}
                    height={60}
                    width={60}
                    className="opacity-75 transition-opacity hover:opacity-100 rounded-lg"
                  />{" "}
                </div>
              ))}
            </div>

            {/* Testimonials */}
            <div className="space-y-4">
              {testimonials.map((testimonial, index) => (
                <blockquote key={index} className="border-l-2 border-primary pl-4">
                  <p className="text-sm italic text-muted-foreground">"{testimonial.quote}"</p>
                  <footer className="mt-2 text-sm font-medium">
                    - {testimonial.author}, {testimonial.company}
                  </footer>
                </blockquote>
              ))}
            </div>

            {/* Stats */}
            <div className="grid grid-cols-2 gap-4">
              {stats.map((stat, index) => (
                <div key={index} className="rounded-lg bg-muted p-4">
                  <div className="text-2xl font-bold">{stat.value}</div>
                  <div className="text-sm text-muted-foreground">{stat.label}</div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default PostJobPage;
