import React from 'react';
import { withRouter } from 'react-router-dom';

import {
    LinearProgress
} from '@material-ui/core';

import {
    ThumbUp,
    ThumbDown,
    Visibility   
} from '@material-ui/icons';

import YoutubeAPI from '../services/youtube';
import Youtube from 'react-youtube';

class VideoPage extends React.Component {

    constructor(props) {
        super(props);

        this.state = {video: null};
        this.youtube = new YoutubeAPI();
    }

    componentDidMount() {
        this.loadVideo(this.props.match.params.videoid);
    }

    loadVideo(videoid) {
        this.youtube.video(videoid).then(
            d => {
                console.log(d);
                this.setState({video: d});
            }
        )
    }

    numberWithCommas(x) {
        return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    }

    page() {
        return(
            <div className="container">
                <div className="video-page">
                    <div className="row">
                        <div className="col">
                            <Youtube opts={{width:'100%', height:'630px', playerVars: {autoplay:1}}} videoId={this.state.video.vid} />
                        </div>
                    </div>
                    <div className="row">
                        <div className="col">
                            <div className="player-details">
                                <div className="title" dangerouslySetInnerHTML={{__html: this.state.video.title.replace(/(<? *script)/gi, 'illegalscript')}}></div>
                                <div className="published">{this.state.video.published.fromNow()} by {this.state.video.channelTitle}</div>
                                <ul className="stats">
                                    <li><Visibility /> {this.numberWithCommas(this.state.video.stats.viewCount)}</li>
                                    <li><ThumbUp/> {this.numberWithCommas(this.state.video.stats.likeCount)}</li>
                                    <li><ThumbDown /> {this.numberWithCommas(this.state.video.stats.dislikeCount)}</li>
                                </ul>
                                <div className="description" dangerouslySetInnerHTML={{__html: this.state.video.description.replace(/(<? *script)/gi, 'illegalscript')}}></div>        
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }

    loading() {
        return <LinearProgress />
    }

    render() {
        return this.state.video ? this.page() : this.loading();
    }
}

export default withRouter(VideoPage)