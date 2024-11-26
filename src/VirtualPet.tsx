import React, { useState, useEffect } from 'react';
import { Heart, Pizza, Coffee } from 'lucide-react';

interface PetStats {
  hunger: number;
  happiness: number;
  energy: number;
}

const VirtualPet = () => {
  const [stats, setStats] = useState<PetStats>({
    hunger: 100,
    happiness: 100,
    energy: 100
  });

  const [status, setStatus] = useState('Your pet is happy!');

  useEffect(() => {
    const timer = setInterval(() => {
      setStats(prev => ({
        hunger: Math.max(0, prev.hunger - 1),
        happiness: Math.max(0, prev.happiness - 0.5),
        energy: Math.max(0, prev.energy - 0.7)
      }));
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    if (stats.hunger < 20) {
      setStatus('Your pet is very hungry!');
    } else if (stats.happiness < 20) {
      setStatus('Your pet is feeling sad...');
    } else if (stats.energy < 20) {
      setStatus('Your pet is tired...');
    } else if (stats.hunger > 90 && stats.happiness > 90 && stats.energy > 90) {
      setStatus('Your pet is feeling great!');
    } else {
      setStatus('Your pet is doing okay.');
    }
  }, [stats]);

  const feed = () => {
    setStats(prev => ({
      ...prev,
      hunger: Math.min(100, prev.hunger + 30),
      energy: Math.min(100, prev.energy + 10)
    }));
  };

  const play = () => {
    if (stats.energy >= 20) {
      setStats(prev => ({
        ...prev,
        happiness: Math.min(100, prev.happiness + 20),
        energy: Math.max(0, prev.energy - 20),
        hunger: Math.max(0, prev.hunger - 10)
      }));
    }
  };

  const sleep = () => {
    setStats(prev => ({
      ...prev,
      energy: 100,
      hunger: Math.max(0, prev.hunger - 20)
    }));
  };

  return (
    <div className="p-6 max-w-md mx-auto bg-white rounded-xl shadow-lg">
      <div className="text-center mb-6">
        <h1 className="text-2xl font-bold text-gray-800">Virtual Pet</h1>
        <p className="text-gray-600 mt-2">{status}</p>
      </div>

      <div className="grid grid-cols-3 gap-4 mb-6">
        <div className="text-center">
          <Pizza className="mx-auto text-orange-500" size={24} />
          <div className="mt-2">
            <div className="h-2 w-full bg-gray-200 rounded">
              <div 
                className="h-2 bg-orange-500 rounded" 
                style={{ width: `${stats.hunger}%` }}
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
                style={{ width: `${stats.happiness}%` }}
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
                style={{ width: `${stats.energy}%` }}
              />
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-3 gap-4">
        <button
          onClick={feed}
          className="p-2 bg-orange-500 text-white rounded hover:bg-orange-600"
        >
          Feed
        </button>
        <button
          onClick={play}
          disabled={stats.energy < 20}
          className={`p-2 text-white rounded ${
            stats.energy >= 20 ? 'bg-green-500 hover:bg-green-600' : 'bg-gray-400'
          }`}
        >
          Play
        </button>
        <button
          onClick={sleep}
          className="p-2 bg-blue-500 text-white rounded hover:bg-blue-600"
        >
          Sleep
        </button>
      </div>
    </div>
  );
};

export default VirtualPet;