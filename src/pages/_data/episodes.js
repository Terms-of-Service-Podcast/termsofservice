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
    return { 
      ...item,
      description: item.content_text.substring(0, 400),
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
  // console.log("Done fetching episodes", JSON.stringify(feed, null, 2));
  return parseFeed(feed);
}