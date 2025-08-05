export function getJobPostings(companyId: string): JobPosting[] {
  const bean = __.newBean<GetJobPostingsHandler>("no.item.webcruiter.WebcruiterHandler");
  bean.setId(companyId);
  return __.toNativeObject<JobPosting[]>(bean.execute()).filter((jobPosting) => jobPosting.identifier);
}

type GetJobPostingsHandler = {
  setId(id: string): void;
  execute(): JobPosting[];
};

export type JobPosting = {
  "@context": "https://schema.org/";
  "@type": "JobPosting";
  title: string;
  url: string;
  description: string;
  identifier: string;
  datePosted: string;
  validThrough: string;
  hiringOrganization: {
    "@type": "Organization";
    name: string;
    logo?: string;
  };
  jobLocation: {
    "@type": "Place";
    address: {
      "@type": "PostalAddress";
      streetAddress?: string;
      addressLocality?: string;
      addressRegion?: string;
      postalCode?: string;
      addressCountry?: string;
      availableLanguage: string;
    };
  };
  totalJobOpenings: number;
  experienceRequirements: string;
  name: string;
  skills: string;
  employerOverview: string;
};
