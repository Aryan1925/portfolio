function getSiteUrl() {
  if (process.env.NEXT_PUBLIC_SITE_URL) {
    return process.env.NEXT_PUBLIC_SITE_URL.replace(/\/$/, "");
  }
  if (process.env.VERCEL_URL) {
    return `https://${process.env.VERCEL_URL}`;
  }
  return "https://aryanprjportfolio.vercel.app";
}

export const siteConfig = {
  name: "Aryan Prajapati",
  nameShort: "Aryan",
  role: "Full-Stack Developer",
  title: "Aryan Prajapati | Full-Stack Developer Portfolio",
  description:
    "Aryan Prajapati is a full-stack developer portfolio. React.js, Next.js, Node.js, and MongoDB developer building modern, responsive web applications. Hire a React developer with 6+ months of hands-on experience.",
  url: getSiteUrl(),
  email: "aryprj2004@gmail.com",
  phone: "+91 93163 69351",
  location: "India",
  github: "https://github.com/Aryan1925",
  linkedin: "https://www.linkedin.com/in/aryan-prajapati-369143357",
  image:
    "https://res.cloudinary.com/duhscjfua/image/upload/v1788263701/about/about-1788263698474.png",
  imageAlt: "Aryan Prajapati - Full-Stack Developer",
  keywords: [
    "Aryan Prajapati",
    "Aryan Prajapati portfolio",
    "Aryan portfolio",
    "full-stack developer",
    "full stack developer",
    "React.js developer portfolio",
    "Next.js developer",
    "MERN stack developer",
    "hire React developer",
    "web developer India",
    "React developer",
    "Node.js developer",
  ],
  twitter: {
    handle: "@aryan1925513585",
    card: "summary_large_image",
  },
};

export function buildPersonJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "Person",
    name: siteConfig.name,
    url: siteConfig.url,
    image: siteConfig.image,
    jobTitle: siteConfig.role,
    worksFor: {
      "@type": "Organization",
      name: "SPConsol",
    },
    email: siteConfig.email,
    telephone: siteConfig.phone,
    address: {
      "@type": "PostalAddress",
      addressCountry: "IN",
    },
    alumniOf: {
      "@type": "CollegeOrUniversity",
      name: "Master of Computer Applications (MCA)",
    },
    knowsAbout: [
      "React.js",
      "Next.js",
      "Node.js",
      "Express.js",
      "MongoDB",
      "REST APIs",
      "MERN Stack",
      "SharePoint Framework (SPFx)",
    ],
    sameAs: [siteConfig.github, siteConfig.linkedin],
  };
}

export function buildWebsiteJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: siteConfig.name,
    url: siteConfig.url,
    description: siteConfig.description,
    author: {
      "@type": "Person",
      name: siteConfig.name,
      url: siteConfig.url,
    },
  };
}

export function buildProfilePageJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "ProfilePage",
    description: siteConfig.description,
    url: siteConfig.url,
    mainEntity: {
      "@type": "Person",
      name: siteConfig.name,
      image: siteConfig.image,
      jobTitle: siteConfig.role,
      sameAs: [siteConfig.github, siteConfig.linkedin],
    },
  };
}

export function buildProjectJsonLd(project) {
  return {
    "@context": "https://schema.org",
    "@type": "CreativeWork",
    name: project.title,
    description: project.description,
    url: `${siteConfig.url}/projects/${project._id}`,
    creator: {
      "@type": "Person",
      name: siteConfig.name,
      url: siteConfig.url,
    },
    ...(project.github && { codeRepository: project.github }),
    ...(project.live && { url: project.live }),
    ...(Array.isArray(project.tech) && {
      keywords: project.tech.join(", "),
    }),
  };
}