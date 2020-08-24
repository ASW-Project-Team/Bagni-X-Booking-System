export interface AppbarAction {
  id: string
  name: string;
  execute: (() => void);
  icon: string;
  isMdi: boolean;
}
