declare global {
  interface Window {
    ym?: (
      counterId: number,
      action: string,
      goalName: string,
      params?: {
        [key: string]: {
          eventCategory?: string;
          eventAction?: string;
          eventLabel?: string;
          eventContent?: string;
          eventContext?: string | null;
          url?: string;
        };
      }
    ) => void;
  }
};

export {};
