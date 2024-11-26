import React from 'react';
import { Heart, Coffee, Pizza } from 'lucide-react';

interface PetStats {
  hunger: number;
  happiness: number;
  energy: number;
}

interface PetViewState {
  name: string;
  stats: PetStats;
  canPlay: boolean;
  statusMessage?: string;
}

interface PetViewProps {
  state: PetViewState;
  onFeed: () => void;
  onPlay: () => void;
  onSleep: () => void;
}

const PetView: React.FC<PetViewProps> = ({ state, onFeed, onPlay, onSleep }) => {
  return (
    <div className="p-6 max-w-md mx-auto bg-white rounded-xl shadow-md">
      <div className="text-center mb-6">
        <h1 className="text-2xl font-bold text-gray-800">{state.name}</h1>
        <p className="text-gray-600 mt-2">{state.statusMessage}</p>
      </div>

      <div className="grid grid-cols-3 gap-4 mb-6">
        <div className="text-center">
          <Pizza className="mx-auto text-orange-500" size={24} />
          <div className="mt-2">
            <div className="h-2 w-full bg-gray-200 rounded">
              <div 
                className="h-2 bg-orange-500 rounded" 
                style={{ width: `${state.stats.hunger}%` }}
              />
            </div>
          </div>
        </div>

        <div className="text-center">
          <Heart className="mx-auto text-red-500" size={24} />
          <div className="mt-2">
            <div className="h-2 w-full bg-gray-200 rounded">
              <div 
                className="h-2 bg-red-500 rounded" 
                style={{ width: `${state.stats.happiness}%` }}
              />
            </div>
          </div>
        </div>

        <div className="text-center">
          <Coffee className="mx-auto text-blue-500" size={24} />
          <div className="mt-2">
            <div className="h-2 w-full bg-gray-200 rounded">
              <div 
                className="h-2 bg-blue-500 rounded" 
                style={{ width: `${state.stats.energy}%` }}
              />
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-3 gap-4">
        <button
          onClick={onFeed}
          className="p-2 bg-orange-500 text-white rounded hover:bg-orange-600"
        >
          Feed
        </button>
        <button
          onClick={onPlay}
          disabled={!state.canPlay}
          className={`p-2 text-white rounded ${
            state.canPlay ? 'bg-green-500 hover:bg-green-600' : 'bg-gray-400'
          }`}
        >
          Play
        </button>
        <button
          onClick={onSleep}
          className="p-2 bg-blue-500 text-white rounded hover:bg-blue-600"
        >
          Sleep
        </button>
      </div>
    </div>
  );
};

export default PetView;