import UkcLogo from "@/assets/UbuntuKrCircle.svg";
import Uck24Photo from "@/assets/uck24_group_photo.jpg";
import Uck25People from "@/assets/uck25_people.jpg";
import type { ui } from "@/i18n/ui";
import { useTranslations, useTranslatedPath } from "@/i18n/utils";
import { languages, defaultLang, showDefaultLang } from "@/i18n/ui";

export const WebsiteConfig = (lang: keyof typeof ui = defaultLang) => {
  const t = useTranslations(lang);
  const translatePath = useTranslatedPath(lang);
  const siteUrl = "https://2025.ubuntu-kr.org";
  const socialMedia = {
    facebook: "ubuntukorea",
    x: "UbuntuKrOrg",
    linkedin: "ubuntu-kr",
    instagram: "ubuntukrorg",
    youtube: "UbuntuKorea",
    mastodon: "https://mastodon.social/@UbuntuKrOrg",
    bluesky: "https://bsky.app/profile/ubuntu-kr.org",
    launchpad: "ubuntu-ko",
  } as const;
  const defaultOgImage = `${siteUrl}/og.png`;

  return {
    metadata: {
      title: t("website.title"),
      shortDescription: "",
      description: t("website.description"),
      faviconSrc: UkcLogo.src,
      openGraph: {
        title: t("website.title"),
        siteName: t("website.title"),
        url: siteUrl,
        description: t("website.description"),
        type: "website",
        image: defaultOgImage,
      },
      twitter: {
        card: "summary_large_image",
        site: `@${socialMedia.x}`,
        title: t("website.title"),
        description: t("website.description"),
        image: defaultOgImage,
      },
    },
    socialMedia,
    mainPage: {
      heroImageSrc: Uck24Photo.src,
    },
    eventsPage: {
      heroImageSrc: Uck25People.src,
    },
    feeds: {
      blogFeedUrl: "https://blog.ubuntu-kr.org/index.xml",
      eventsFeedUrl:
        "https://discourse.ubuntu-kr.org/c/scheds-and-events/events/43.json",
      noticeBoard: "https://discourse.ubuntu-kr.org/c/notice/9.rss",
      freeBoard: "https://discourse.ubuntu-kr.org/c/freeboard/10.rss",
    },
    links: {
      forum: "https://discourse.ubuntu-kr.org",
      mailinglist: "https://lists.ubuntu.com/mailman/listinfo/ubuntu-ko",
    },
    navigation: {
      logoSrc: UkcLogo.src,

      menu: () => [
        {
          label: t("nav.ubuntu"),
          href: translatePath(`/`),
          items: [
            {
              label: t("nav.getUbuntu"),
              href: translatePath(`/ubuntu/get-ubuntu/`),
            },
            { label: t("nav.docs"), href: translatePath(`/ubuntu/docs/`) },
          ],
        },
        {
          label: t("nav.community"),
          href: translatePath(`/`),
          items: [
            { label: t("nav.about"), href: translatePath(`/about/`) },
            { label: t("nav.events"), href: translatePath(`/events/`) },
            { label: t("nav.chat"), href: translatePath(`/chat/`) },
          ],
        },
        {
          label: t("nav.contribute"),
          href: translatePath(`/contribute`),
          items: [],
        },
        {
          label: t("nav.reg_dis"),
          href: translatePath(`/regulations_disclosures`),
          items: [],
        },
      ],

      rightMenu: (page: { path: string; i18n: boolean }) => {
        const langPickerItems = (
          Object.keys(languages) as Array<keyof typeof ui>
        ).map((langCode) => {
          const label = languages[langCode];

          const translatedPath =
            !showDefaultLang && langCode === defaultLang
              ? page.path
              : `/${langCode}${page.path}`;

          return {
            label,
            href: translatedPath,
          };
        });

        return [
          {
            label: "🌐",
            items: langPickerItems,
          },
        ];
      },
    },

    footer: () => ({
      copyright: t("footer.copyright"),
      links: [
        {
          label: t("footer.contactEmail"),
          href: "mailto:contact@ubuntu-kr.org",
        },
        {
          label: t("footer.sourceCode"),
          href: "https://github.com/ubuntu-kr/ubuntu-kr.github.io",
        },
      ],
    }),
  };
};
