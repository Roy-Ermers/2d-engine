import { Vector2 } from 'Engine';
import { Point2dInputParams } from 'tweakpane';
import { Shape } from '.';

export default class Convex {
    static fromPoints(points: Vector2[]) {
        return this.generateConvex(points);
    }

    static fromShapes(shapes: Shape[], options?: { circleResolution: number; }) {
        const points = Convex.convertShapesToPoints(shapes, options);

        return this.generateConvex(points);
    }

    public static convertShapesToPoints(shapes: Shape[], options?: { circleResolution: number; }) {
        const points: Vector2[] = [];

        const circleResolution = options?.circleResolution ?? 64;

        for (const shape of shapes) {
            switch (shape.type) {
                case "box":
                    const width = typeof shape.size == "number" ? shape.size : shape.size?.x ?? 16;
                    const height = typeof shape.size == "number" ? shape.size : shape.size?.y ?? 16;
                    const offset = shape.offset.rotate(shape.rotation);
                    points.push(
                        offset.minus(-width / 2, -height / 2).rotate(-shape.rotation),
                        offset.minus(-width / 2, height / 2).rotate(-shape.rotation),
                        offset.minus(width / 2, height / 2).rotate(-shape.rotation),
                        offset.minus(width / 2, -height / 2).rotate(-shape.rotation),
                        offset.minus(-width / 2, -height / 2).rotate(-shape.rotation)
                    );
                    break;

                case "polygon":
                    points.push(...shape.indices.map(x => x.add(shape.offset)));
                    break;
                case "circle":
                    const start = shape.arc?.[0] ?? 0;
                    const end = shape.arc?.[1] ?? 360;
                    const distance = (360 / circleResolution);
                    const parts = (end - start) / distance;
                    for (let i = 0; i < parts; i++) {
                        points.push(
                            shape.offset
                                // canvas api arcs are based on the positive x axis so I used Vector2.right (1, 0) here
                                .add(Vector2.right.multiply(shape.size / 2)
                                    .rotate(shape.rotation + (distance * i + start))
                                )
                        );
                    }

                    points.push(shape.offset
                        .add(Vector2.one
                            .multiply(shape.size / 3)
                            .rotate(shape.rotation + start - 45)
                        ));
                    break;
            }
        }
        return points;
    }

    private static getPivotPoint(points: Vector2[]) {
        let pivot = points[0];

        for (const point of points) {
            if (points.indexOf(point) == 0)
                continue;

            if (point.y <= pivot.y && point.x < pivot.x) {
                pivot = point;
            }
        }

        return pivot;
    }

    private static getOrientation(a: Vector2, b: Vector2, c: Vector2) {
        return (b.y - a.y) *
            (c.x - b.x) -
            (c.y - b.y) *
            (b.x - a.x);
    }

    private static generateConvex(points: Vector2[]) {
        const pivot = this.getPivotPoint(points);

        const indices = points.map((_, i) => i);
        const angles = points.map(x => pivot.angle(x));
        const distances = points.map(x => pivot.distance(x));

        indices.sort((a: number, b: number) => {
            const angleA = angles[a];
            const angleB = angles[b];

            if (angleA === angleB)
                return distances[a] - distances[b];

            return angleA - angleB;
        });

        for (let i = 1; i < indices.length - 1; i++) {
            if (angles[indices[i]] === angles[indices[i + 1]])
                indices[i] = -1;
        }

        const hull: Vector2[] = [];
        for (let i = 0; i < indices.length; i++) {
            const point = points[indices[i]];
            if (indices[i] === -1)
                continue;

            if (hull.length < 3) {
                hull.push(point);
                continue;
            }

            while (this.getOrientation(hull.at(-2)!, hull.at(-1)!, point) > 0)
                hull.pop();
            hull.push(point);
        }

        if (hull.length < 3)
            return [];

        return hull;
    }
}