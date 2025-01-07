import reallysimple from "reallysimple";
import { format, intervalToDuration, addSeconds } from "date-fns";

const feedUrl = "https://podcast.termsofservice.xyz/json";

async function readFeed(url) {
  const feed = await fetch(url);
  const data = await feed.json();
  // console.log(JSON.stringify(data, null, 2));
  return data;
}

function formatTimeFromSeconds(seconds) {
  const helperDate = addSeconds(new Date(0), seconds);
  if (seconds >= 3600) {
    return format(helperDate, 'h:mm:ss');
  }
  
  return format(helperDate, 'mm:ss');
}

function parseFeed(feed) {
  //console.log("Parsing episodes", feed.items);
  const items = feed.items.map((item) => {
    const descriptionBrief = item.content_text.substring(0, 400);
    const isDescriptionTruncated = descriptionBrief.length < item.content_text.length;
    const slugBase = item._microfeed.web_url;
    const secondToLastSlashInSlugBase = slugBase.lastIndexOf("/", slugBase.lastIndexOf("/") - 1);
    const pageSlug = slugBase.substring(secondToLastSlashInSlugBase + 1);

    return { 
      ...item,
      descriptionBrief,
      isDescriptionTruncated,
      fullContent: item.content_html,
      pubDateFormatted: format(new Date(item.date_published), "MMMM dd, yyyy"),
      pageSlug,
      mp3Url: item.attachments[0].url,
      duration: item.attachments[0].duration_in_seconds,
      durationFormatted: formatTimeFromSeconds(item.attachments[0].duration_in_seconds)
    };
  });

  const latest = items[0];

  return { 
    items, 
    latest
  };
}

export default async function () {
  const feed = await readFeed(feedUrl);
  const parseResults = parseFeed(feed);

  return parseResults;
}