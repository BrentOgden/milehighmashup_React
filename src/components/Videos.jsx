import React from 'react';
import YouTube from 'react-youtube';
import '../App.css';


function VideoComponent({ videoId }) {
    // You can also set player options
    const opts = {
        height: '250',
        width: '300',
        playerVars: {
            autoplay: 0, // Disable autoplay
            controls: 1, // Show controls
            // You can add more playerVars if needed
        },
    };

    return (
        <div className='mt-12'>
            <YouTube videoId={videoId} opts={opts} />
        </div>
    );
}


function Video() {
    return (
        <div className='container-fluid'>
            <VideoComponent videoId="jdTo9sHk66o" />
            <VideoComponent videoId="qP02cOCqcn8" />
            <VideoComponent videoId="6C9FAWKr--s" />
        </div>
        
    );
}
export default VideoComponent;
