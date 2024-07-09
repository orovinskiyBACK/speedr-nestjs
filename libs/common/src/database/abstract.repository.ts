import { FilterQuery, Model, Types, UpdateQuery } from "mongoose";
import { AbstractDocumnet } from "./abstract.schema";
import { Logger, NotFoundException } from "@nestjs/common";

export abstract class AbstractRepository<TDocument extends AbstractDocumnet> {
    protected abstract readonly logger: Logger;

    constructor(protected readonly model: Model<TDocument>) {}

    async create(documnet: Omit<TDocument, '_id'>): Promise<TDocument>{
        const createdDocumnet = new this.model({
            ...documnet,
            _id: new Types.ObjectId(),
        });
        return (await createdDocumnet.save()).toJSON() as unknown as TDocument
    }

    async findOne(filterQuery: FilterQuery<TDocument>): Promise<TDocument>{
        const document = await this.model
            .findOne(filterQuery)
            .lean<TDocument>(true);

        if(!document){
            this.logger.warn('Document was not found with the filterQuery', filterQuery);
            throw new NotFoundException('Document was not found');
        }

        return document;
    }

    //Lean returns only what is requested instead of the whole mongoose object
    async findOneAndUpdate(
        filterQuery:FilterQuery<TDocument>,
        update: UpdateQuery<TDocument>
    ): Promise<TDocument>{
        const document = await this.model.findOneAndUpdate(filterQuery,update, {
            new: true,
        }).lean<TDocument>(true);

        if(!document){
            this.logger.warn('Document was not found with the filterQuery', filterQuery);
            throw new NotFoundException('Document was not found');
        }

        return document;
    }

    async find(filterQuery: FilterQuery<TDocument>): Promise<TDocument[]> {
        return this.model.find(filterQuery).lean<TDocument[]>(true);
    }

    async findOneAndDelete(filterQuery: FilterQuery<TDocument>): Promise<TDocument>{
        return this.model.findOneAndDelete(filterQuery).lean<TDocument>(true);
    }
}