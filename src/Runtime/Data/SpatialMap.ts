import Game, { Color } from 'Engine';
import Entity from './Entity';
import Vector2 from './Vector2';

export default class SpatialMap {
    private buckets: Map<string, Set<string>> = new Map();
    private entities: Map<string, string> = new Map();

    constructor(private resulution: number = 128) { }

    generateHash(point: Vector2) {
        return (Math.floor(point.x / this.resulution) * this.resulution).toString() + ',' +
            (Math.floor(point.y / this.resulution) * this.resulution).toString();
    }

    set(entity: Entity) {
        const hash = this.generateHash(entity.transform.position);

        const bucket = this.buckets.get(hash) ?? new Set();

        if (bucket.has(entity.id))
            return hash;

        bucket.add(entity.id);

        const oldBucketHash = this.entities.get(entity.id);

        if (oldBucketHash && oldBucketHash !== hash) {
            console.log(`Moving entity ${entity.id} from ${oldBucketHash} to ${hash}`);
            const oldBucket = this.buckets.get(oldBucketHash);

            oldBucket?.delete(entity.id);

            if (oldBucket?.size == 0)
                this.buckets.delete(oldBucketHash);
        }

        this.entities.set(entity.id, hash);
        this.buckets.set(hash, bucket);
        return hash;
    }

    getEntityHash(entity: Entity) {
        return this.entities.get(entity.id);
    }

    get(min: Vector2, max?: Vector2) {
        const minHash = this.generateHash(min);
        const entities = [...this.buckets.get(minHash) ?? []];

        if (!max)
            return entities;

        const maxHash = this.generateHash(max);
        entities.push(...this.buckets.get(maxHash) ?? []);

        if (Math.abs(min.x - max.x) > 128 || Math.abs(min.x - max.x) > 128) {
            let j = min.copy();

            const [stepsX, stepsY] = [Math.ceil(Math.abs(min.x - max.x) / this.resulution), Math.ceil(Math.abs(min.y - max.y) / this.resulution)];

            for (let i = 0; i < stepsX * stepsY; i++) {
                j.x = Math.floor(i % stepsX) * this.resulution;
                j.y = Math.floor(i / stepsY) * this.resulution;

                const hash = this.generateHash(j);

                entities.push(...this.buckets.get(hash) ?? []);
            }
        }

        return [...new Set(entities)];
    }
}