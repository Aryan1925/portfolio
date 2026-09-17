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
  title: "Aryan Prajapati | Full Stack Portfolio — Full-Stack Developer",
  description:
    "Aryan Prajapati full stack portfolio — a full-stack developer in India specializing in React.js, Next.js, Node.js, and MongoDB. View Aryan Prajapati's projects, skills, and experience. Hire a full-stack web developer.",
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
    "Aryan Prajapati full stack portfolio",
    "aryan prajapati full stack portfolio",
    "Aryan Prajapati portfolio",
    "Aryan Prajapati",
    "full stack portfolio",
    "full stack developer portfolio",
    "full-stack developer",
    "full stack developer",
    "React.js developer portfolio",
    "Next.js developer",
    "MERN stack developer",
    "hire React developer",
    "hire full stack developer",
    "web developer India",
    "React developer India",
    "Node.js developer India",
    "Aryan Prajapati GitHub",
    "Aryan Prajapati LinkedIn",
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
    alternateName: ["Aryan Prajapati full stack portfolio", "Aryan Prajapati developer"],
    url: siteConfig.url,
    image: siteConfig.image,
    jobTitle: siteConfig.role,
    description:
      "Aryan Prajapati is a full-stack developer specializing in React.js, Next.js, Node.js, MongoDB, and MERN stack development.",
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
      "@type": "EducationalOrganization",
      name: "MCA - Master of Computer Applications",
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
      "Full Stack Development",
      "JavaScript",
      "TypeScript",
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
    name: `${siteConfig.name} Full Stack Portfolio`,
    description: siteConfig.description,
    url: siteConfig.url,
    mainEntity: {
      "@type": "Person",
      name: siteConfig.name,
      alternateName: "Aryan Prajapati full stack portfolio",
      image: siteConfig.image,
      jobTitle: siteConfig.role,
      description:
        "Full-stack developer specializing in React.js, Next.js, Node.js, MongoDB, and MERN stack development.",
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