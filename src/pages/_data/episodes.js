import reallysimple from "reallysimple";
import { format } from "date-fns";

const feedUrl = "https://podcast.termsofservice.xyz/rss";

// promise wrapper for reallysimple.readfeed
function readFeed(url) {
  return new Promise((resolve, reject) => {
    reallysimple.readFeed(url, (err, feed) => {
      if (err) {
        reject(err);
      } else {
        resolve(feed);
      }
    });
  });
}

function parseFeed(feed) {
  //console.log("Parsing episodes", feed.items);
  const items = feed.items.map((item) => {
    return { 
      ...item,
      pubDateFormatted: format(item.pubDate, "MMMM dd, yyyy"),
    };
  });

  return { items };
}

export default async function () {
  //console.log("Fetching episodes");
  const feed = await readFeed(feedUrl);
  //console.log("Done fetching episodes", JSON.stringify(feed, null, 2));
  return parseFeed(feed);
}