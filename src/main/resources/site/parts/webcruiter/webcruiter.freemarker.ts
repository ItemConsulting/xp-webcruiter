import type { LocalDate } from "/lib/time";

export type FreemarkerParams = {
  title?: string;
  locale: string;
  partId: string;
  jobPostings: SimpleJobPosting[];
};

export type SimpleJobPosting = {
  id: string;
  lang: string;
  title: string;
  url: string;
  date: LocalDate;
};
