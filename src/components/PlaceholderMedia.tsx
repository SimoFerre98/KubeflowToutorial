import React from 'react';
import { Image } from 'lucide-react';

interface PlaceholderMediaProps {
  text: string;
  height?: string;
}

export const PlaceholderMedia: React.FC<PlaceholderMediaProps> = ({ text, height = 'h-64' }) => {
  return (
    <div className={`w-full ${height} bg-slate-800/50 border-2 border-dashed border-slate-700 rounded-xl flex flex-col items-center justify-center p-6 text-center my-8`}>
      <div className="bg-slate-800 p-4 rounded-full mb-4">
        <Image className="w-8 h-8 text-slate-500" />
      </div>
      <p className="text-slate-400 font-medium">{text}</p>
      <p className="text-slate-600 text-sm mt-2">Media Placeholder</p>
    </div>
  );
};
