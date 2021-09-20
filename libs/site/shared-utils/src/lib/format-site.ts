export default function formatSite(site: string) {
  if (site.includes("http")) {
    return site;
  } else if (site[0] === "w" && site[1] === "w" && site[2] === "w") {
    return `http://` + site
  } else {
    return `http://www.` + site
  }
}
