import { getComponent, getContent } from "/lib/xp/portal";
import { getJobPostings, type JobPosting } from "/lib/webcruiter/service";
import { render } from "/lib/tineikt/freemarker";
import { LocalDate } from "/lib/time";
import { assertIsDefined, partPathToId } from "/lib/webcruiter/utils";
import type { Request, Response, PartComponent } from "@enonic-types/core";
import type { FreemarkerParams, SimpleJobPosting } from "/site/parts/webcruiter/webcruiter.freemarker";

type JobPostingsListPart = PartComponent<"no.item.webcruiter:webcruiter">;

const view = resolve("webcruiter.ftl");

export function get(req: Request): Response {
  const content = getContent();
  const part = getComponent<JobPostingsListPart>();

  assertIsDefined(part);

  if (!part.config.companyId) {
    return {
      body: req.mode === "live" ? "" : "<div>Vennligst oppgi Firma-id</div>",
    };
  }

  const locale = content?.language ?? "no";

  return {
    body: render<FreemarkerParams>(view, {
      title: part.config.title,
      partId: partPathToId(part.path),
      locale,
      jobPostings: getJobPostings(part.config.companyId).map(createSimpleJobPosting),
    }),
  };
}

function createSimpleJobPosting(job: JobPosting): SimpleJobPosting {
  return {
    id: job.identifier,
    lang: job.jobLocation.address.availableLanguage,
    title: job.title,
    url: job.url,
    date: LocalDate.parse(job.validThrough),
  };
}
