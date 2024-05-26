#!/bin/bash

echo "Loading RSS feeds to aggregate..."
# load the data.json file
data=$(cat data.json)
# get the RSS feed URLs
urls=$(echo $data | jq -r '.feeds[]')
# create an empty list to store the aggregated feeds
overview="[]"
# load each feed and append it to the overview list
for url in $urls; do
  echo "Loading $url..."
  feed=$(curl -s $url | rss-to-json | jq '.items')
  overview=$(echo $overview | jq ". += $feed")
done
# save the aggregated feeds to the file as an RSS feed
echo $overview | jq -r 'sort_by(.pubDate) | reverse | {items: .}' > rss-feed.xml
echo "RSS feed file updated!"