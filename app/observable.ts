export class Observable<Event = void> {
  private listeners: ((event: Event) => void)[] = [];

  public addListener(listener: (event: Event) => void): () => void {
    this.listeners.push(listener);
    return () => {
      this.listeners = this.listeners.filter((l) => l !== listener);
    };
  }

  protected notify(event: Event): void {
    this.listeners.forEach((listener) => listener(event));
  }
}
