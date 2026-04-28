import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "JobScan – AI Job Eligibility Checker",
  description:
    "Upload your resume, paste a job description and instantly discover how well you match. See skill gaps, match scores, and curated job recommendations.",
  keywords: ["job prediction", "resume analyzer", "job eligibility", "career tool", "skill gap"],
  authors: [{ name: "JobScan" }],
  openGraph: {
    title: "JobScan – Know if you're the right fit",
    description: "AI-powered job eligibility checker. Upload resume, paste JD, get instant results.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" data-theme="light" suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&display=swap"
          rel="stylesheet"
        />
      </head>
      <body style={{ fontFamily: "'Inter', system-ui, -apple-system, sans-serif" }}>
        {children}
      </body>
    </html>
  );
}
