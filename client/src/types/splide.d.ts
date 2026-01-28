declare module "@splidejs/react-splide" {
  import type { Component, ComponentType, ReactNode } from "react";

  export interface SplideProps {
    options?: SplideOptions; // Splide utilise un objet complexe, on peut affiner plus tard si besoin
    hasTrack?: boolean;
    tag?: string;
    className?: string;
    id?: string;
    ariaLabel?: string;
    ariaLabelledby?: string;
    // onMoved?: (splide: any, index: number, prev: number) => void;
    // Ajoute d'autres props si tu en utilises des spécifiques
    children?: ReactNode;
  }

  export class Splide extends Component<SplideProps> {}
  export class SplideSlide extends Component<{
    className?: string;
    children?: ReactNode;
    key?: string | number;
  }> {}
  export class SplideTrack extends Component<{ children?: ReactNode }> {}
}
