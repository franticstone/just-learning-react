import React from 'react';

import YoutubeAPI from '../services/youtube';

import VideoList from '../bits/VideoList';

import {
    LinearProgress,
    InputLabel,
    FormControl,
    Input
} from '@material-ui/core';

export default class Homepage extends React.Component {

    constructor() {
        super();
        this.state = {
            videos: [],
            finishedLoading: false,
            term: "",
            video: null
        }
        this.youtube = new YoutubeAPI();

        this.handleSearch = this.handleSearch.bind(this);
        this.getTrending();        
    }

    getTrending() {
        this.youtube.trending().then(d => {
            this.setState({videos: d, finishedLoading: true});
        })
    }

    searchWithTerm(term) {
        this.setState({videos: [], finishedLoading: false});
        this.youtube.search(term).then(
            d => {
                this.setState({videos: d, finishedLoading: true});
            }
        ).catch(e => {
            this.setState({videos: [], finishedLoading: true});
        })
    }

    loading() {
        return <LinearProgress />
    }

    handleSearch(e) {

        if(e.target.value.length > 4 && e.key === "Enter") {
            this.searchWithTerm(e.target.value)
            this.setState({term: e.target.value});
        }
    }

    videoList() {
        return (
            <div className="video-page">
                <div className="video-serch-bar">
                <FormControl fullWidth variant="filled">
                    {/* <InputLabel htmlFor="filled-adornment-amount">Amount</InputLabel> */}
                    <Input
                        id="filled-adornment-amount"
                        onKeyUp={this.handleSearch}
                        placeholder="Search for videos"
                    />
                </FormControl>
                </div>
                {<div className="video-play"></div>}
                <div className="video-list-container">
                    <VideoList videos={this.state.videos} />
                </div>
            </div>
        )
    }

    render() {
        return !this.state.finishedLoading ? this.loading() : this.videoList();
    }

}