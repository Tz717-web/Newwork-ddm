import { PublisherFactory, IPublisher, IPublisherFactoryParams } from '../../types';
import { IFileSystem } from './utils';
export interface IDiskFactoryParams extends IPublisherFactoryParams {
    outputPath?: string;
    projectSlug?: string;
    createProjectFolder?: boolean;
    fs?: IFileSystem;
}
export interface IDiskPublisher extends IPublisher<IDiskFactoryParams, string> {
    getOutputPath: () => string;
    setOutputPath: (path: string) => void;
}
export declare const createDiskPublisher: PublisherFactory<IDiskFactoryParams, IDiskPublisher>;
