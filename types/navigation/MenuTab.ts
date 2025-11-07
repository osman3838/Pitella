export type MenuTab = {
  id: string;
  route: string;
  icon: string;
  label: string;
  center?: boolean;
  visible?: boolean;
  visible_if?: {
    auth?: boolean;
    flag?: string;
  };
};
