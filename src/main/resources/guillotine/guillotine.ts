import { getJobPostings, type JobPosting } from "/lib/webcruiter/service";
import type { GraphQL, Extensions } from "@enonic-types/guillotine";

const OBJECT_TYPE_JOB_POSTING = "JobPosting";
const OBJECT_TYPE_POSTAL_ADDRESS = "PostalAddress";
const OBJECT_TYPE_HIRING_ORGANIZATION = "HiringOrganization";
const OBJECT_TYPE_JOB_LOCATION = "JobLocation";
const FIELD_GET_JOB_POSTINGS = "getJobPostings";

export function extensions(graphQL: GraphQL): Extensions {
  return {
    types: {
      [OBJECT_TYPE_HIRING_ORGANIZATION]: {
        description: "An organization in webcruiter.",
        fields: {
          name: {
            type: graphQL.nonNull(graphQL.GraphQLString),
          },
          logo: {
            type: graphQL.GraphQLString,
          },
        },
      },
      [OBJECT_TYPE_POSTAL_ADDRESS]: {
        description: "A postal address in webcruiter.",
        fields: {
          streetAddress: {
            type: graphQL.GraphQLString,
          },
          addressLocality: {
            type: graphQL.GraphQLString,
          },
          addressRegion: {
            type: graphQL.GraphQLString,
          },
          postalCode: {
            type: graphQL.GraphQLString,
          },
          addressCountry: {
            type: graphQL.GraphQLString,
          },
          availableLanguage: {
            type: graphQL.GraphQLString,
          },
        },
      },
      [OBJECT_TYPE_JOB_LOCATION]: {
        description: "A location in webcruiter.",
        fields: {
          address: {
            type: graphQL.reference(OBJECT_TYPE_POSTAL_ADDRESS),
          },
        },
      },
      [OBJECT_TYPE_JOB_POSTING]: {
        description: "A job posting on webcruiter",
        fields: {
          id: {
            type: graphQL.nonNull(graphQL.GraphQLID),
          },
          lang: {
            type: graphQL.nonNull(graphQL.GraphQLID),
          },
          title: {
            type: graphQL.nonNull(graphQL.GraphQLString),
          },
          identifier: {
            type: graphQL.GraphQLString,
          },
          description: {
            type: graphQL.GraphQLString,
          },
          url: {
            type: graphQL.nonNull(graphQL.GraphQLString),
          },
          datePosted: {
            type: graphQL.GraphQLString,
          },
          validThrough: {
            type: graphQL.Date,
          },
          hiringOrganization: {
            type: graphQL.reference(OBJECT_TYPE_HIRING_ORGANIZATION),
          },
          jobLocation: {
            type: graphQL.reference(OBJECT_TYPE_JOB_LOCATION),
          },
          totalJobOpenings: {
            type: graphQL.GraphQLInt,
          },
          experienceRequirements: {
            type: graphQL.GraphQLString,
          },
          skills: {
            type: graphQL.GraphQLString,
          },
          employerOverview: {
            type: graphQL.GraphQLString,
          },
        },
      },
    },
    creationCallbacks: {
      HeadlessCms: (params): void => {
        params.addFields({
          [FIELD_GET_JOB_POSTINGS]: {
            type: graphQL.list(graphQL.reference(OBJECT_TYPE_JOB_POSTING)),
            args: {
              companyId: graphQL.nonNull(graphQL.GraphQLString),
            },
          },
        });
      },
    },
    resolvers: {
      HeadlessCms: {
        [FIELD_GET_JOB_POSTINGS]: (env): JobPosting[] => {
          return getJobPostings(env.args.companyId);
        },
      },
    },
  };
}
