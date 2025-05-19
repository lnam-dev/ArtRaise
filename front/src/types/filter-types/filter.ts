export enum FilterKeyEnum {
    type = "type",//TODO category
    material = "material",
    theme = "theme",
    style = "style",
}

export type TFilterKeys = keyof typeof FilterKeyEnum;
