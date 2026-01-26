export type ATS = "greenhouse" | "lever" | "ashby";

export interface Company {
  name: string;
  ats: ATS;
  slug: string;
}

export const companies: Company[] = [
  { name: "Airbnb", ats: "greenhouse", slug: "airbnb" },
  { name: "Coinbase", ats: "greenhouse", slug: "coinbase" },
  { name: "Databricks", ats: "greenhouse", slug: "databricks" },
  { name: "Pinterest", ats: "greenhouse", slug: "pinterest" },
  { name: "Dropbox", ats: "greenhouse", slug: "dropbox" },
  { name: "Lyft", ats: "greenhouse", slug: "lyft" },
  { name: "Reddit", ats: "greenhouse", slug: "reddit" },
  { name: "Asana", ats: "greenhouse", slug: "asana" },
  { name: "Figma", ats: "greenhouse", slug: "figma" },
  { name: "Robinhood", ats: "greenhouse", slug: "robinhood" },
  { name: "Okta", ats: "greenhouse", slug: "okta" },
  { name: "Nextdoor", ats: "greenhouse", slug: "nextdoor" },
  { name: "CircleCI", ats: "greenhouse", slug: "circleci" },

  { name: "OpenAI", ats: "ashby", slug: "openai" },
  { name: "Notion", ats: "ashby", slug: "notion" },
  { name: "Linear", ats: "ashby", slug: "linear" },
  { name: "Ramp", ats: "ashby", slug: "ramp" },
  { name: "Deel", ats: "ashby", slug: "deel" },
];
