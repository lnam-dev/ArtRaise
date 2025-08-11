export enum FilterKeyEnum {
    // category = "category",//removed due to specific getting from stats
    material = "material",
    theme = "theme",
    style = "style",
}

export type TFilterKeys = keyof typeof FilterKeyEnum;
export const filterKeys = Object.values(FilterKeyEnum)