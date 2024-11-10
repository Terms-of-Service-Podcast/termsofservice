---
title: Episodes
---


# Episodes

{% for item in episodes.items %}
<div class="episode">
  <h2>{{ item.title }}</h2>
  <div class="episode-date">{{ item.pubDateFormatted }}</div>
  <div class="episode-description">{{ item.description }}</div>
  <div class="episode-link">
    <a href="{{ item.enclosure.url }}" target="_blank" >MP3</a>
  </div>
</div>
{% endfor %}