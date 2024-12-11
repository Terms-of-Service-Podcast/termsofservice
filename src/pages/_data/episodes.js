import reallysimple from "reallysimple";
import { format, intervalToDuration } from "date-fns";

const feedUrl = "https://podcast.termsofservice.xyz/json";

async function readFeed(url) {
  const feed = await fetch(url);
  const data = await feed.json();
  // console.log(JSON.stringify(data, null, 2));
  return data;
}

function formatDuration(seconds) {
  const duration = intervalToDuration({ start: 0, end: seconds * 1000 });
  if (!duration.hours) {
    return `${duration.minutes}:${duration.seconds}`;
  } 

  return `${duration.hours}:${duration.minutes}:${duration.seconds}`;
}

function parseFeed(feed) {
  //console.log("Parsing episodes", feed.items);
  const items = feed.items.map((item) => {
    const descriptionBrief = item.content_text.substring(0, 400);
    const isDescriptionTruncated = descriptionBrief.length < item.content_text.length;

    return { 
      ...item,
      descriptionBrief,
      isDescriptionTruncated,
      fullContent: item.content_html,
      pubDateFormatted: format(new Date(item.date_published), "MMMM dd, yyyy"),
      pageSlug: format(new Date(item.date_published), "MM-dd-yyyy"),
      mp3Url: item.attachments[0].url,
      duration: item.attachments[0].duration_in_seconds,
      durationFormatted: formatDuration(item.attachments[0].duration_in_seconds)
    };
  });

  const latest = items[0];

  return { 
    items, 
    latest
  };
}

export default async function () {
  //console.log("Fetching episodes");
  const feed = await readFeed(feedUrl);
  const parseResults = parseFeed(feed);
  console.log("Done fetching episodes", JSON.stringify(parseResults, null, 2));

  return parseResults;
}