import React from 'react';

import { Link } from 'react-router-dom';

export default class VideoList extends React.Component {

    constructor(props) {
        super(props)
        
        this.state = {
            video: null
        }

        this.clickedVideo = this.clickedVideo.bind(this);
        this.closeVideo = this.closeVideo.bind(this);

        document.addEventListener('keydown', this.closeVideo, false);
    }

    componentWillUnmount() {
        document.removeEventListener('keydown', this.closeVideo, false);
    }

    videoString(vid) {
        return "https://www.youtube.com/embed/" + vid;
    }

    closeVideo(e) {
        if(e.key === "Escape" && this.state.video) {
            this.setState({video:null});
        }
    }

    videoPlayer() {
        if(this.state.video !== null) {
            return (
                <div className="main-video-player" onKeyUp={this.closeVideo}>
                    <div className="close-video" onClick={() => this.closeVideo({key: "Escape"})}>X</div>
                    <iframe width="100%" height="100%" allowFullScreen src={this.videoString(this.state.video.videoId)} frameBorder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"></iframe>
                </div>
            )
        }
    }

    clickedVideo(e) {
        window.location.href = `/video/${e.videoId}`
    }
    

    render() {
        return (
            <div>
                {this.videoPlayer()}
                <div className="video-list">
                    {this.props.videos.map((v, v_i) =>
                        <div className="video-list-item" onClick={() => { this.clickedVideo(v) }} key={v.videoId}>
                            <div className="image-header">
                                <img src={v.thumbs.high} />
                            </div>
                            <div className="video-content">
                                <div className="video-title" dangerouslySetInnerHTML={{__html: v.title.replace(/(<? *script)/gi, 'illegalscript')}}>
                                </div>
                                <div className="published">
                                    <span label={v.published}>Published {v.published.fromNow()}</span> <br/>
                                    <b>{v.channelTitle}</b>
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        )
    }
}