import { IPublicTypeNodeDataType, IPublicTypeProjectSchema } from '@alilc/lowcode-types';
import { IContainerInfo, IParseResult, ISchemaParser } from '../types';
import type { ProjectRemark } from '../types/intermediate';
export declare class SchemaParser implements ISchemaParser {
    validate(schema: IPublicTypeProjectSchema): boolean;
    parse(schemaSrc: IPublicTypeProjectSchema | string): IParseResult;
    getProjectRemark(containers: IContainerInfo[]): ProjectRemark;
    getComponentNames(children: IPublicTypeNodeDataType): string[];
    decodeSchema(schemaSrc: string | IPublicTypeProjectSchema): IPublicTypeProjectSchema;
    private collectDataSourcesTypes;
}
export default SchemaParser;
