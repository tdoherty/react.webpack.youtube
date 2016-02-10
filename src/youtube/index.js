import $ from 'jquery';

const key = 'AIzaSyCuJFmoItCm1a2QpfAkM2u5yrd-IBD7tQQ';
const startIndex = 1;
const maxResults = 20;

export default {
  doSearch(term) {
    const url = `https://www.googleapis.com/youtube/v3/search?part=snippet&type=video&q=${term}&maxResults=${maxResults}&key=${key}`;
    return $.get(url);
  },

  getRelatedVideos(videoId) {
    const url = `https://www.googleapis.com/youtube/v3/search?part=snippet&type=video&relatedToVideoId=${videoId}&maxResults=${maxResults}&key=${key}`;
    return $.get(url);
  },

  getVideos(searchResults) {
    const videoIds = searchResults.items.reduce((prev, curr, idx) => prev + (prev ? ',' : '') + curr.id.videoId, '');
    const url = `https://www.googleapis.com/youtube/v3/videos?part=statistics,contentDetails&id=${videoIds}&key=${key}`;
    this.searchResults = searchResults; //for use later, without a setState call
    return $.get(url);
  },

  onSearchComplete(videos) {
    const completeResults = videos.items.map(video => {
      const searchResult = this.searchResults.items.find(result => result.id.videoId === video.id);
      if (searchResult) {
        video.snippet = searchResult.snippet;
      }
      return video;
    });
    // return Promise.resolve(completeResults); // can't chain to jQuery promise
    return ($.Deferred()).resolve(completeResults);
  },

  fetchComments(videoId) {
    const url = `https://www.googleapis.com/youtube/v3/commentThreads?videoId=${videoId}&part=snippet&key=${key}`;
    return $.get(url);
  }
}
