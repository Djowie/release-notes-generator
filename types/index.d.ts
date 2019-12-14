export enum SupportedType {
    FIX = 'fix',
    FEAT = 'feat',
    CHORE = 'chore',
    STYLE = 'style',
    REFACTOR = 'refactor'
}

export type TSupportedType = SupportedType.FEAT | SupportedType.FIX | SupportedType.CHORE | SupportedType.STYLE | SupportedType.REFACTOR;
