export interface PetStats {
  hunger: number;
  happiness: number;
  energy: number;
}

export class Pet {
  private name: string;
  private stats: PetStats;
  private lastUpdate: number;

  constructor(name: string) {
    this.name = name;
    this.stats = {
      hunger: 100,
      happiness: 100,
      energy: 100
    };
    this.lastUpdate = Date.now();
  }

  public getName(): string {
    return this.name;
  }

  public getStats(): PetStats {
    this.updateStats();
    return { ...this.stats };
  }

  public feed(): void {
    this.updateStats();
    this.stats.hunger = Math.min(100, this.stats.hunger + 30);
    this.stats.energy = Math.min(100, this.stats.energy + 10);
  }

  public play(): void {
    this.updateStats();
    if (this.stats.energy >= 20) {
      this.stats.happiness = Math.min(100, this.stats.happiness + 20);
      this.stats.energy = Math.max(0, this.stats.energy - 20);
      this.stats.hunger = Math.max(0, this.stats.hunger - 10);
    }
  }

  public sleep(): void {
    this.updateStats();
    this.stats.energy = 100;
    this.stats.hunger = Math.max(0, this.stats.hunger - 20);
  }

  private updateStats(): void {
    const now = Date.now();
    const timePassed = (now - this.lastUpdate) / 1000; // Convert to seconds

    // Decrease stats over time
    this.stats.hunger = Math.max(0, this.stats.hunger - timePassed * 0.1);
    this.stats.happiness = Math.max(0, this.stats.happiness - timePassed * 0.05);
    this.stats.energy = Math.max(0, this.stats.energy - timePassed * 0.07);

    this.lastUpdate = now;
  }
}