export const colors = {
    background: '#121214',
    cardBackground: '#202024',
    cardBorder: '#29292e',
    shadow: '#000',

    modalBackground: 'rgba(0, 0, 0, 0.75)',

    primary: '#00b37e',
    iconSurface: 'rgba(0, 179, 126, 0.12)',
    danger: '#f75a68',

    text: {
        title: '#f1f1f1',
        body: '#c4c4cc',
        muted: '#8d8d99',
        placeholder: '#7c7c8a',
        contrast: '#ffffff',
    },
} as const;

export const spacing = {
    xs: 4,
    sm: 8,
    md: 12,
    lg: 16,
    xl: 20,
    xxl: 32,
} as const;

export const borderRadius = {
    sm: 6,
    md: 8,
    lg: 12,
    xl: 16,
    full: 9999,
} as const;

export const fontSize = {
    xs: 12,
    sm: 13,
    md: 14,
    base: 15,
    lg: 16,
    xl: 18,
    xxl: 22,
    title: 24,
} as const;

export const theme = {
    colors,
    spacing,
    borderRadius,
    fontSize,
} as const;

export type Theme = typeof theme;