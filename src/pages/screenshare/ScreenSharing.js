import React from 'react';
import { useScreenShare } from './useScreenShare';

const ScreenSharing = () => {
    const { isSharing, startScreenShare, stopScreenShare, videoRef } = useScreenShare();

    return (
        <div>
            <video ref={videoRef} autoPlay style={{ width: '100%', height: 'auto' }} />
            <button onClick={isSharing ? stopScreenShare : startScreenShare}>
                {isSharing ? 'Stop Sharing' : 'Start Sharing'}
            </button>
        </div>
    );
};

export default ScreenSharing;
