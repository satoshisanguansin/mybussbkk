
import React from 'react';
import type { GeminiResponse } from '../types';
import { SparklesIcon, BrainCircuitIcon, BusIcon, MapPinIcon, LinkIcon } from './Icons';

interface SidePanelProps {
  routeVisibility: { 
    tawiWatthana: boolean; 
    floatingMarkets: boolean;
    mrtSirindhornVajira: boolean;
    mrtSirindhornStGabriels: boolean;
  };
  setRouteVisibility: React.Dispatch<React.SetStateAction<{ 
    tawiWatthana: boolean; 
    floatingMarkets: boolean; 
    mrtSirindhornVajira: boolean;
    mrtSirindhornStGabriels: boolean;
  }>>;
  isThinkingMode: boolean;
  setIsThinkingMode: React.Dispatch<React.SetStateAction<boolean>>;
  query: string;
  setQuery: React.Dispatch<React.SetStateAction<string>>;
  onSubmit: () => void;
  response: GeminiResponse | null;
  isLoading: boolean;
  isLocating: boolean;
  onLocateMe: () => void;
}

const SidePanel: React.FC<SidePanelProps> = ({
  routeVisibility, setRouteVisibility, isThinkingMode, setIsThinkingMode, query, setQuery, onSubmit, response, isLoading, isLocating, onLocateMe
}) => {
  const handleKeyPress = (event: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (event.key === 'Enter' && !event.shiftKey) {
      event.preventDefault();
      onSubmit();
    }
  };
    
  return (
    <aside className="w-full md:w-96 lg:w-[450px] bg-gray-800/50 backdrop-blur-sm border-r border-gray-700 flex flex-col p-4 space-y-4 overflow-y-auto h-1/2 md:h-full flex-shrink-0">
      <header>
        <h1 className="text-2xl font-bold text-white flex items-center gap-2">
          <BusIcon /> Bangkok Route Explorer
        </h1>
        <p className="text-sm text-gray-400 mt-1">Visualize BMA Feeder routes and ask Gemini for local info.</p>
      </header>

       <div className="bg-gray-900/50 p-3 rounded-lg">
        <button
          onClick={onLocateMe}
          disabled={isLocating}
          className="w-full flex items-center justify-center gap-2 px-4 py-2 font-semibold text-white bg-blue-600 rounded-md hover:bg-blue-700 disabled:bg-gray-500 disabled:cursor-wait transition-colors"
          aria-label="Locate me"
        >
          {isLocating ? (
            <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
          ) : (
            <MapPinIcon className="h-5 w-5" />
          )}
          <span>{isLocating ? 'Locating...' : 'Locate Me'}</span>
        </button>
      </div>

      <div className="bg-gray-900/50 p-3 rounded-lg">
        <h2 className="text-lg font-semibold text-gray-200 mb-3 flex items-center gap-2"><MapPinIcon /> Route Visibility</h2>
        <div className="space-y-2">
          <label className="flex items-center justify-between cursor-pointer">
            <span className="text-gray-300">Tawi Watthana Route</span>
            <div className="relative">
              <input type="checkbox" className="sr-only peer" checked={routeVisibility.tawiWatthana} onChange={() => setRouteVisibility(v => ({ ...v, tawiWatthana: !v.tawiWatthana }))} />
              <div className="w-11 h-6 bg-gray-600 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#E65100]"></div>
            </div>
          </label>
          <label className="flex items-center justify-between cursor-pointer">
            <span className="text-gray-300">4 Floating Markets Route</span>
            <div className="relative">
              <input type="checkbox" className="sr-only peer" checked={routeVisibility.floatingMarkets} onChange={() => setRouteVisibility(v => ({ ...v, floatingMarkets: !v.floatingMarkets }))} />
              <div className="w-11 h-6 bg-gray-600 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#0D9263]"></div>
            </div>
          </label>
          <label className="flex items-center justify-between cursor-pointer">
            <span className="text-gray-300">MRT Sirindhorn - Vajira</span>
            <div className="relative">
              <input type="checkbox" className="sr-only peer" checked={routeVisibility.mrtSirindhornVajira} onChange={() => setRouteVisibility(v => ({ ...v, mrtSirindhornVajira: !v.mrtSirindhornVajira }))} />
              <div className="w-11 h-6 bg-gray-600 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#1976D2]"></div>
            </div>
          </label>
          <label className="flex items-center justify-between cursor-pointer">
            <span className="text-gray-300">MRT Sirindhorn - St. Gabriel's</span>
            <div className="relative">
              <input type="checkbox" className="sr-only peer" checked={routeVisibility.mrtSirindhornStGabriels} onChange={() => setRouteVisibility(v => ({ ...v, mrtSirindhornStGabriels: !v.mrtSirindhornStGabriels }))} />
              <div className="w-11 h-6 bg-gray-600 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#C2185B]"></div>
            </div>
          </label>
        </div>
      </div>

      <div className="flex-grow flex flex-col bg-gray-900/50 p-3 rounded-lg">
        <div className="flex justify-between items-center mb-3">
          <h2 className="text-lg font-semibold text-gray-200 flex items-center gap-2"><SparklesIcon /> AI Assistant</h2>
          <label className="flex items-center space-x-2 cursor-pointer text-sm">
            <BrainCircuitIcon className={`transition-colors ${isThinkingMode ? 'text-purple-400' : 'text-gray-500'}`} />
            <span className={`font-medium transition-colors ${isThinkingMode ? 'text-purple-300' : 'text-gray-400'}`}>Thinking Mode</span>
             <div className="relative">
              <input type="checkbox" className="sr-only peer" checked={isThinkingMode} onChange={() => setIsThinkingMode(v => !v)} />
              <div className="w-11 h-6 bg-gray-600 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-purple-500"></div>
            </div>
          </label>
        </div>

        <div className="bg-gray-800/60 p-3 rounded-md flex-grow overflow-y-auto mb-3 min-h-[150px]">
          {isLoading ? (
             <div className="flex items-center justify-center h-full">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-purple-400"></div>
             </div>
          ) : response ? (
            <div className="text-gray-300 space-y-4">
               <p className="whitespace-pre-wrap">{response.text}</p>
                {response.groundingChunks.length > 0 && (
                    <div className="pt-2 border-t border-gray-700">
                        <h3 className="text-sm font-semibold text-gray-400 mb-2">Sources:</h3>
                        <ul className="space-y-1">
                            {response.groundingChunks.map((chunk, index) => {
                                const source = chunk.web || chunk.maps;
                                if (!source) return null;
                                return (
                                    <li key={index}>
                                        <a href={source.uri} target="_blank" rel="noopener noreferrer" className="text-sm text-purple-400 hover:text-purple-300 flex items-center gap-1.5 break-all">
                                            <LinkIcon />
                                            <span>{source.title || source.uri}</span>
                                        </a>
                                    </li>
                                );
                            })}
                        </ul>
                    </div>
                )}
            </div>
          ) : (
            <div className="flex items-center justify-center h-full text-gray-500 text-center">
              Ask about routes, stops, or nearby attractions!
            </div>
          )}
        </div>

        <div className="flex items-end gap-2">
          <textarea
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder="e.g., Are there any good cafes near Khlong Lat Mayom Market?"
            className="w-full bg-gray-700 border-gray-600 rounded-md p-2 focus:ring-2 focus:ring-purple-500 focus:border-purple-500 text-gray-200 placeholder-gray-500 resize-none"
            rows={2}
            disabled={isLoading}
          />
          <button onClick={onSubmit} disabled={isLoading || !query.trim()} className="bg-purple-600 hover:bg-purple-700 disabled:bg-gray-600 disabled:cursor-not-allowed text-white font-bold py-2 px-4 rounded-md transition-colors">
            Ask
          </button>
        </div>
      </div>
    </aside>
  );
};

export default SidePanel;