
export enum TypeButton {
  SUPPRESSION,
  AJOUT,
  MODIFICATION,
  ACTIVATION,
  DETAIL,
}

export interface TabButton {
  typeBtn: TypeButton;
  permission : () => boolean;
}
