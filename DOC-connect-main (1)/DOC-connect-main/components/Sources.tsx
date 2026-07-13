import React from 'react';
import type { GroundingChunk } from '../types';

interface SourcesProps {
  sources: GroundingChunk[];
}

export const Sources: React.FC<SourcesProps> = ({ sources }) => {
  if (!sources || sources.length === 0) {
    return null;
  }

  return (
    <div className="mt-12">
      <h2 className="text-2xl font-bold text-slate-800 dark:text-slate-200 pb-2 border-b-2 border-sky-500">
        Information Sources
      </h2>
      <div className="mt-4 space-y-2 text-sm">
        <p className="text-slate-600 dark:text-slate-400">
          Our AI used the following sources from Google Search to understand your health concern and suggest relevant specialties.
        </p>
        <ul className="list-disc list-inside space-y-2">
          {sources.map((source, index) => (
            <li key={index}>
              <a
                href={source.web.uri}
                target="_blank"
                rel="noopener noreferrer"
                className="text-sky-600 dark:text-sky-400 hover:underline"
              >
                {source.web.title || source.web.uri}
              </a>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};