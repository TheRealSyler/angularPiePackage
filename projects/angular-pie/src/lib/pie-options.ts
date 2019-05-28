export interface PieOptions {
  /**
   * Slice border color when not Selected, Color in hex format.
   */
  borderColor?: string;
  /**
   * Slice border color when Selected, Color in hex format.
   */
  borderColorHover?: string;
  /**
   * Width of Slice Border, in pixel.
   */
  borderWidth?: number;
  /**
   * Slice border Radius, in pixel.
   */
  borderRadius?: number;
  /**
   * Color when slice is Not active or Selected, Color in hex format.
   */
  color?: string;
  /**
   * Color when slice is selected, Color in hex format.
   */
  colorHover?: string;
  /**
   * Color when slice is Active, Color in hex format.
   */
  colorActive?: string;
  /**
   * Color if the inner circle border, Color in hex format.
   */
  circleBorderColor?: string;
  /**
   * Color of the inner circle transparent by default, Color in hex format.
   */
  circleBackgroundColor?: string;
  /**
   * Width of the inner circle border, in pixel.
   */
  circleBorderWidth?: number;
  /**
   * If true the border color will change to the active color (colorActive) when activated,
   * Else the border color remains the same.
   */
  oneActiveColor?: boolean;
  /**
   * Font family of slice title.
   */
  font?: string;
  /**
   * Font size of slice title, in rem.
   */
  fontSize?: number;
  /**
   * Size of slice container, in pixel.
   */
  size?: number;
  /**
   * Size of the inner circle in, in pixel.
   */
  circleSize?: number;
  /**
   * Slice width in pixel.
   */
  sliceX?: number;
  /**
   * Slice height in pixel.
   */
  sliceY?: number;
  /**
   * Time the menu stays open after activation, in milliseconds.
   */
  hideDelay?: number;
  /**
   * If true pie menu slices get arenged in a circle.
   */
  round?: boolean;
  /**
   * Selection Distance, in pixel.
   */
  selectionDistance?: number;
  /**
   * Activation Distance, in pixel.
   */
  activationDistance?: number;
  /**
   * Active color activation disatance, in pixel.
   * only acitve if activateAfterActivationDistance is set to true.
   */
  activationColorDistance?: number;
  /**
   * If true the menu gets activated after the activationDistance.
   */
  activateAfterActivationDistance?: boolean;
  /**
   * If false the pie menu gets activated when the cursor leaves the inner circle.
   */
  disableInnerMouseleaveActivation?: boolean;
  /**
   * If false the pie menu gets activated when the mouse up event gets fired.
   */
  disableMouseUpActivation?: boolean;
  /**
   * If false the pie menu gets activated when the mouse up event gets fired outside the inner circle.
   */
  disableCircleMousedownActvivation?: boolean;
  /**
   * If false the pie menu gets activated when the cursor leaves the outer circle,
   * the outer circle width is size + SliceX same for the height.
   */
  disableOuterActivation?: boolean;
  /**
   * If false the pie menu get activated when the mouse up event gets fired in the inner circle.
   */
  disableInnnerMouseup?: boolean;
}
