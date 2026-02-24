
import React from 'react';
import { CardData } from '../types';

interface StatusTagProps {
  status?: CardData['status'];
  progress?: CardData['progress'];
  hasPodcast?: boolean;
}

const StatusTag: React.FC<StatusTagProps> = ({ status, progress, hasPodcast }) => {
  return (
    <>
      {/* Top Left: Podcast Icon */}
      {hasPodcast && (
        <div className="absolute top-2 left-2 z-10">
          <div className="bg-black/20 backdrop-blur-md w-7 h-7 rounded-full border border-white/20 flex items-center justify-center">
            <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
              <path d="M7 4a3 3 0 016 0v6a3 3 0 11-6 0V4z" />
              <path d="M10 18a8 8 0 100-16 8 8 0 000 16zM6 10a4 4 0 018 0v1a4 4 0 01-8 0v-1z" clipRule="evenodd" fillRule="evenodd" />
            </svg>
          </div>
        </div>
      )}

      {/* Top Right: Status/Progress */}
      {(status && status !== 'not_started') && (
        <div className="absolute top-2 right-2 z-10">
          <div className="bg-black/30 backdrop-blur-md px-2 py-0.5 rounded-full border border-white/20">
            {status === 'completed' ? (
              <span className="text-[10px] text-white font-medium">学完</span>
            ) : (
              <span className="text-[10px] text-white font-medium">
                {progress?.current}/{progress?.total}
              </span>
            )}
          </div>
        </div>
      )}
    </>
  );
};

export default StatusTag;
