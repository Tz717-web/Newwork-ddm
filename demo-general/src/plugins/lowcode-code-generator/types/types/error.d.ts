export declare class CodeGeneratorError extends Error {
    readonly detail?: unknown;
    constructor(message: string, detail?: unknown);
}
export declare class ComponentValidationError extends CodeGeneratorError {
}
export declare class CompatibilityError extends CodeGeneratorError {
}
export declare class PublisherError extends CodeGeneratorError {
}
