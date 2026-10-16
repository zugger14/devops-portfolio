import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import type { ReactNode } from "react";
import Navbar from "./components/Navbar";
import VoiceNav from "./components/VoiceNav";
import LiveCICD from "./components/LiveCICD";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Shirish Maharjan | DevOps & Cloud Platform Engineer",
  description: "DevOps & Cloud Platform Engineer specializing in AWS, Kubernetes, Terraform IaC, CI/CD automation pipelines, observability, and AI workflows.",
  keywords: ["DevOps", "Cloud Engineer", "AWS", "Kubernetes", "Terraform", "CI/CD", "Docker", "Ansible", "Datadog", "IaC", "Shirish Maharjan"],
  authors: [{ name: "Shirish Maharjan" }],
  openGraph: {
    title: "Shirish Maharjan | DevOps & Cloud Platform Engineer",
    description: "Designing, automating, and scaling cloud-native architectures with AWS, Kubernetes, Terraform, and CI/CD.",
    type: "website",
    locale: "en_US",
  },
};

export default function RootLayout({
  children,
}: {
  children: ReactNode;
}) {
  return (
    <html lang="en" className={`${geistSans.variable} ${geistMono.variable}`}>
      <body>
        <Navbar />
        {children}
        <VoiceNav />
        <LiveCICD />
      </body>
    </html>
  );
}
