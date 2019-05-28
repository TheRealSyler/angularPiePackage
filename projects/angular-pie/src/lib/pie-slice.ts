export interface PieSlice {
  /**
   * Slice Title.
   */
  title: string;
  /**
   * Function Name of the function that gets fired when this slice gets activated.
   * expected format is 'example' or 'function.example' do NOT include parentheses.
   * arguments are passed in the args parameter.
   */
  func?: string;
  /**
   * Function Arguments if the function that gets fired when this slice gets activated.
   * expected format is ['arg1', 2, {arg: 3}]
   */
  args?: any[];
  /**
   * Function Execution Context.
   */
  context?: any;
  /**
   * Used to set the image properties of this slice.
   */
  imgData?: {
    /**
     * Image Source
     */
    src: string;
    /**
     * Left position relative to Slice, in pixel.
     */
    left?: number;
    /**
     * Top position relative to Slice, in pixel.
     */
    top?: number;
    /**
     * Image height, in pixel.
     */
    height?: number;
    /**
     * Image width, in pixel.
     */
    width?: number;
  };
  /**
   * False by default, only enable when an image is nedded.
   */
  disableImg?: boolean;
}
