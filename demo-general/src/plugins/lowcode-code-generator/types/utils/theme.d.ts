/**
 * 获取主题信息
 * @param theme theme 形如 @alife/theme-97 或者 @alife/theme-97@^1.0.0
 */
export interface ThemeInfo {
    name: string;
    version?: string;
}
export declare function getThemeInfo(theme: string): ThemeInfo;
