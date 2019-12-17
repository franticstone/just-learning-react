import axios from 'axios';
import moment from 'moment';
const YOUTUBE_API_KEY = "AIzaSyB88YTkByQpma6936IffAN-__iqp5ELi6k";

export default class YoutubeAPI {

    constructor() {
        this.axios = axios.create({
            baseURL: "https://www.googleapis.com/youtube/v3/",
            params: {
                part: "snippet",
                maxResults: 30,
                key: YOUTUBE_API_KEY
            }
        })
    }

    mapVideoResults(items) {
        return items.filter(f => (f.id.kind === "youtube#video" || f.kind === "youtube#video") &&f.snippet.thumbnails.high ).map(m => ({
            channelId: m.snippet.channelId,
            channelTitle: m.snippet.channelTitle,
            videoId: m.id.videoId || m.id,
            published: moment(m.snippet.publishedAt),
            title: m.snippet.title,
            description: m.snippet.description,
            thumbs: {
                default: m.snippet.thumbnails.default.url,
                medium: m.snippet.thumbnails.medium.url,
                high: m.snippet.thumbnails.high.url,
                large: `https://i.ytimg.com/vi/${m.id.videoId || m.id}/maxresdefault.jpg`
            }
        })).sort((a,b) => {
            return b.published.format('YYYYMMDD') - a.published.format('YYYYMMDD');
        });
    }

    search(term) {
        return new Promise((accept, reject) => {
            this.axios.get('/search', {
                params: {
                    q: term,
                    part: "snippet",
                    maxResults: 30,
                    key: YOUTUBE_API_KEY
                }
            }).then(results => {
                accept(this.mapVideoResults(results.data.items));
            }).catch(e => {
                reject(e);
            })
        });
    }

    trending() {
        return new Promise((accept, reject) => {
            this.axios.get('/videos', {
                params: {
                    part: "snippet",
                    maxResults: 30,
                    chart: 'mostPopular',
                    regionCode: "GB",
                    key: YOUTUBE_API_KEY
                }
            }).then(results => {
                accept(this.mapVideoResults(results.data.items));
            }).catch(e => {
                reject(e);
            })
        });
    }

    video(videoId) {
        return new Promise((accept, reject) => {
            this.axios.get('/videos', {
                params: {
                    part: "id,snippet, contentDetails, statistics",
                    id: videoId,
                    key: YOUTUBE_API_KEY
                }
            }).then(results => {
                if(results.data.items.length === 1) {
                    let res = results.data.items[0];

                    accept({
                        vid: videoId,
                        published: moment(res.snippet.publishedAt),
                        title: res.snippet.title,
                        description: res.snippet.description,
                        thumb: res.snippet.thumbnails.maxres.url,
                        channelTitle: res.snippet.channelTitle,
                        tags: res.snippet.tags,
                        stats: res.statistics
                    })



                } else reject("Qualifying Failed");
            }).catch(e => {
                reject(e);
            })
        });
    }
}