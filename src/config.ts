import type { Site, SocialObjects } from "./types";

export const SITE: Site = {
  website: "https://adrianzinko.com/",
  author: "Adrian Zinko",
  desc: "My modest space on the internet. I write about web development and other things I find interesting.",
  title: "Adrian Zinko",
  ogImage: "astropaper-og.jpg",
  lightAndDarkMode: true,
  postPerPage: 3,
  scheduledPostMargin: 15 * 60 * 1000, // 15 minutes
};

export const LOCALE = {
  lang: "en", // html lang code. Set this empty and default will be "en"
  langTag: ["en-EN"], // BCP 47 Language Tags. Set this empty [] to use the environment default
} as const;

export const LOGO_IMAGE = {
  enable: false,
  svg: true,
  width: 216,
  height: 46,
};

export const SOCIALS: SocialObjects = [
  {
    name: "Github",
    href: "https://github.com/adrianghub",
    linkTitle: ` ${SITE.title} on Github`,
    active: true,
  },
  {
    name: "Instagram",
    href: "https://www.instagram.com/_drianko",
    linkTitle: `${SITE.title} on Instagram`,
    active: true,
  },
  {
    name: "LinkedIn",
    href: "https://www.linkedin.com/in/adrian-zinko",
    linkTitle: `${SITE.title} on LinkedIn`,
    active: true,
  },
  {
    name: "Mail",
    href: "mailto:az@adrianzinko.com",
    linkTitle: `Send an email to ${SITE.title}`,
    active: true,
  },
  {
    name: "Twitter",
    href: "https://twitter.com/AdrianZinko",
    linkTitle: `${SITE.title} on Twitter`,
    active: true,
  },
  {
    name: "Facebook",
    href: "https://github.com/adrianghub",
    linkTitle: `${SITE.title} on Facebook`,
    active: false,
  },
];
