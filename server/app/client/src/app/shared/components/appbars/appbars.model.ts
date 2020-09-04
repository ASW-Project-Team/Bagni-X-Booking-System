export interface AppbarAction {
  id: string
  name: string;
  execute: (() => void);
  icon: string;
  isMdi: boolean;
}

/**
 * Interface used inside toolbars to describe a page route and its external characteristics.
 */
export interface MenuItem {
  id: string
  name: string;
  route: string;
  icon: string;
  isMdi: boolean;
}
