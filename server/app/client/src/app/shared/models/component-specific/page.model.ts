/**
 * Interface used inside toolbars to describe a page route and its external characteristics.
 */
export interface Page {
  id: string
  name: string;
  route: string;
  icon: string;
  isMdi: boolean;
}
