export interface PieSliceInternal {
  content: {
    title: string;
    func?: string;
    args?: any[];
    context?: any;
    imgData?: {
      src: string;
      left?: number;
      top?: number;
      height?: number;
      width?: number;
    };
    disableImg?: boolean;
  };
  borderColor: string;
  color: string;
  index: number;
  x: number;
  y: number;
}
