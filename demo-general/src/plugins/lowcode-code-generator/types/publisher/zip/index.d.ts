/// <reference types="node" />
import { PublisherFactory, IPublisher, IPublisherFactoryParams } from '../../types';
export type ZipBuffer = Buffer | Blob;
declare type ZipPublisherResponse = string | ZipBuffer;
export interface ZipFactoryParams extends IPublisherFactoryParams {
    outputPath?: string;
    projectSlug?: string;
}
export interface ZipPublisher extends IPublisher<ZipFactoryParams, ZipPublisherResponse> {
    getOutputPath: () => string | undefined;
    setOutputPath: (path: string) => void;
}
export declare const createZipPublisher: PublisherFactory<ZipFactoryParams, ZipPublisher>;
export {};
