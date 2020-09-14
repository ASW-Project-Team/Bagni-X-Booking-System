export interface AppbarAction {
  id: string
  name: string;
  execute: (() => void);
  mdiIcon: string;
  isMdi: boolean;
  disabled?: boolean;
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

export interface User {
  name: string
}
