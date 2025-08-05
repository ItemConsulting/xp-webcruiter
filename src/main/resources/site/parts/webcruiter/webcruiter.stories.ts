import id from "./webcruiter.ftl";
import type { StoryObj, Meta } from "@itemconsulting/xp-storybook-utils";
import type { FreemarkerParams } from "./webcruiter.freemarker";

export default {
  title: "Parts/Webcruiter",
  parameters: {
    server: {
      id,
    },
  },
} satisfies Meta<FreemarkerParams>;

export const webcruiter: StoryObj<FreemarkerParams> = {
  name: "Webcruiter",
  args: {
    partId: "mypart",
    title: "Stillinger",
    jobPostings: [
      {
        id: "0123456789",
        lang: "NB-NO",
        title: "Førskolelærer",
        url: "https://1234.webcruiter.no/main/recruit/public/0123456789?&language=nb&use_position_site_header=0&culture_id=NB-NO&url_org=1234",
        date: "2025-03-30",
      },
    ],
  },
};
