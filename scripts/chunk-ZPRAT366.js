var __defProp = Object.defineProperty;
var __defNormalProp = (obj, key, value) => key in obj ? __defProp(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var __name = (target, value) => __defProp(target, "name", { value, configurable: true });
var __publicField = (obj, key, value) => {
  __defNormalProp(obj, typeof key !== "symbol" ? key + "" : key, value);
  return value;
};

// src/Runtime/Data/Component.ts
var Component = class {
  dependencies = [];
  defaults;
  constructor() {
  }
  start(attributes, entity) {
  }
  destroy(attributes, entity) {
  }
  update(attributes, entity) {
  }
};
__name(Component, "Component");

// src/Runtime/Components/RenderComponent.ts
var RenderComponent = class extends Component {
  getBounds(attributes) {
    return {
      box: [],
      complex: []
    };
  }
  render(attributes, entity) {
    if (Runtime_default.debug) {
      Runtime_default.canvas.wirePolygon(entity.transform.position, entity.transform.rotation, Color.white, entity.bounds.box);
      Runtime_default.canvas.wirePolygon(entity.transform.position, entity.transform.rotation, Color.green, entity.bounds.complex);
    }
  }
};
__name(RenderComponent, "RenderComponent");

// src/Runtime/Helpers.ts
function lerp(start, end, amt) {
  return (1 - amt) * start + amt * end;
}
__name(lerp, "lerp");
var DEGREE_TO_RADIAL = Math.PI / 180;
function structuredClone(object) {
  if (typeof object != "object")
    return object;
  if (typeof object.copy == "function")
    return object.copy();
  if (Array.isArray(object))
    return [...object.map(structuredClone)];
  const entries = Object.entries(object);
  let result = {};
  for (const [key, value] of entries) {
    result[key] = structuredClone(value);
  }
  return result;
}
__name(structuredClone, "structuredClone");
function generateId(size = 8) {
  let id = "";
  let bytes = crypto.getRandomValues(new Uint8Array(size));
  while (size--) {
    let byte = bytes[size] & 63;
    if (byte < 36) {
      id += byte.toString(36);
    } else if (byte < 62) {
      id += (byte - 26).toString(36).toUpperCase();
    } else if (byte < 63) {
      id += "#";
    } else {
      id += "$";
    }
  }
  return id;
}
__name(generateId, "generateId");
function pointInPolygon(point, indices) {
  let inside = false;
  let j = indices.length - 1;
  for (let i = 0; i < indices.length; i++) {
    const current = indices[i];
    const next = indices[j];
    if (point.x === current.x && point.y === current.y)
      return true;
    if (current.y > point.y != next.y > point.y) {
      const slope = (point.x - current.x) * (next.y - current.y) - (next.x - current.x) * (point.y - current.y);
      if (slope == 0)
        return true;
      if (slope < 0 != next.y < current.y)
        inside = !inside;
    }
    j = i;
  }
  return inside;
}
__name(pointInPolygon, "pointInPolygon");

// src/Runtime/Renderer/Color.ts
var colorCache = new Map();
window.colorCache = colorCache;
var _Color = class {
  static random() {
    return new _Color(Math.round(Math.random() * 255), Math.round(Math.random() * 255), Math.round(Math.random() * 255), 1);
  }
  r = 255;
  g = 255;
  b = 255;
  a = 1;
  constructor(r, g, b, a) {
    this.r = r ?? 0;
    this.g = g ?? 0;
    this.b = b ?? 0;
    this.a = a ?? 1;
  }
  lerp(target, amount) {
    return new _Color(Math.round(lerp(this.r, target.r, amount)), Math.round(lerp(this.g, target.g, amount)), Math.round(lerp(this.b, target.g, amount)));
  }
  invert() {
    return new _Color(255 - this.r, 255 - this.g, 255 - this.b, this.a);
  }
  shade(factor) {
    return new _Color(Math.floor(this.r * (1 - factor)), Math.floor(this.g * (1 - factor)), Math.floor(this.b * (1 - factor)));
  }
  copy() {
    return this;
  }
  static fromString(string) {
    if (!string.startsWith("#"))
      throw new Error("Color.fromString expects a string in the `#RRGGBB(AA)?` format.");
    const parts = string.substring(1).split("");
    const result = new _Color(parseInt(parts[0] + parts[1], 16), parseInt(parts[2] + parts[3], 16), parseInt(parts[4] + parts[5], 16));
    if (parts.length == 8)
      result.a = parseInt(parts[6] + parts[7], 16);
    return result;
  }
  toString() {
    const hash = 65535 * this.r + 255 * this.g + this.b;
    if (colorCache.has(hash))
      return colorCache.get(hash);
    const hex = `#${this.r.toString(16).padStart(2, "0")}${this.g.toString(16).padStart(2, "0")}${this.b.toString(16).padStart(2, "0")}${(this.a * 255).toString(16).padStart(2, "0")}`;
    colorCache.set(hash, hex);
    return hex;
  }
};
var Color = _Color;
__name(Color, "Color");
__publicField(Color, "red", new _Color(255, 0, 0));
__publicField(Color, "blue", new _Color(0, 0, 255));
__publicField(Color, "green", new _Color(0, 255, 0));
__publicField(Color, "black", new _Color(0, 0, 0, 1));
__publicField(Color, "white", new _Color(255, 255, 255));

// src/Runtime/Data/Vector2.ts
var _Vector2 = class {
  constructor(x = 0, y = 0) {
    this.x = x;
    this.y = y;
  }
  static get random() {
    return new _Vector2(Math.random(), Math.random());
  }
  get length() {
    return Math.sqrt(this.x ** 2 + this.y ** 2);
  }
  lerp(target, amount) {
    return new _Vector2(lerp(this.x, target.x, amount), lerp(this.y, target.y, amount));
  }
  dot(test) {
    return this.x * test.x + this.y * test.y;
  }
  distance(goal) {
    return Math.sqrt((goal.x - this.x) ** 2 + (goal.y - this.y) ** 2);
  }
  angle(target) {
    return Math.atan2(target.y - this.y, target.x - this.x);
  }
  invert() {
    return this.multiply(-1);
  }
  rotate(degrees) {
    const radials = degrees * DEGREE_TO_RADIAL;
    return new _Vector2(this.x * Math.cos(radials) - this.y * Math.sin(radials), this.x * Math.sin(radials) + this.y * Math.cos(radials));
  }
  normalize() {
    if (this.length == 0)
      return this;
    return this.divide(this.length);
  }
  limit(limit = 1) {
    return new _Vector2(Math.min(Math.abs(this.x), limit) * Math.sign(this.x), Math.min(Math.abs(this.y), limit) * Math.sign(this.y));
  }
  multiply(vector, y) {
    if (vector instanceof _Vector2)
      return new _Vector2(this.x * vector.x, this.y * vector.y);
    return new _Vector2(this.x * vector, this.y * (y ?? vector));
  }
  divide(vector, y) {
    if (vector instanceof _Vector2)
      return new _Vector2(this.x / vector.x, this.y / vector.y);
    return new _Vector2(this.x / vector, this.y / (y ?? vector));
  }
  add(vector, y) {
    if (vector instanceof _Vector2)
      return new _Vector2(this.x + vector.x, this.y + vector.y);
    return new _Vector2(this.x + vector, this.y + (y ?? vector));
  }
  minus(vector, y) {
    if (vector instanceof _Vector2)
      return new _Vector2(this.x - vector.x, this.y - vector.y);
    return new _Vector2(this.x - vector, this.y - (y ?? vector));
  }
  static fromAngle(angle) {
    const radians = angle * DEGREE_TO_RADIAL;
    return new _Vector2(Math.sin(radians), -Math.cos(radians));
  }
  copy() {
    return new _Vector2(this.x, this.y);
  }
  toString() {
    return `(${Math.round(this.x * 100) / 100}, ${Math.round(this.y * 100) / 100})`;
  }
};
var Vector22 = _Vector2;
__name(Vector22, "Vector2");
__publicField(Vector22, "zero", new _Vector2(0, 0));
__publicField(Vector22, "one", new _Vector2(1, 1));
__publicField(Vector22, "up", new _Vector2(0, -1));
__publicField(Vector22, "down", new _Vector2(0, 1));
__publicField(Vector22, "left", new _Vector2(-1, 0));
__publicField(Vector22, "right", new _Vector2(1, 0));

// src/Runtime/Renderer/Convex.ts
var Convex = class {
  _complex;
  _bounds;
  get complex() {
    return this._complex;
  }
  get box() {
    return this._bounds;
  }
  constructor(points) {
    this._complex = this.generateConvex(points);
    this._bounds = this.getBounds(this.complex);
  }
  static fromPoints(points) {
    return new this(points);
  }
  static fromShapes(shapes, options) {
    const points = Convex.convertShapesToPoints(shapes, options);
    return new Convex(points);
  }
  static convertShapesToPoints(shapes, options) {
    const points = [];
    const circleResolution = options?.circleResolution ?? 1;
    for (const shape of shapes) {
      switch (shape.type) {
        case "box":
          const width = typeof shape.size == "number" ? shape.size : shape.size?.x ?? 16;
          const height = typeof shape.size == "number" ? shape.size : shape.size?.y ?? 16;
          const offset = shape.offset.rotate(shape.rotation);
          points.push(offset.minus(-width / 2, -height / 2).rotate(-shape.rotation), offset.minus(-width / 2, height / 2).rotate(-shape.rotation), offset.minus(width / 2, height / 2).rotate(-shape.rotation), offset.minus(width / 2, -height / 2).rotate(-shape.rotation));
          break;
        case "polygon":
          points.push(...shape.indices.map((x) => x.add(shape.offset)));
          break;
        case "circle":
          const start = shape.arc?.[0] ?? 0;
          const end = shape.arc?.[1] ?? 360;
          const distance = 360 / (circleResolution * shape.size);
          const parts = (end - start) / distance;
          for (let i = 0; i <= parts; i++) {
            points.push(shape.offset.add(Vector22.right.multiply(shape.size / 2).rotate(shape.rotation + (distance * i + start))));
          }
          break;
      }
    }
    return points;
  }
  getPivotPoint(points) {
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
  getBounds(points) {
    let northWest = new Vector22();
    let southEast = new Vector22();
    for (const point of points) {
      if (point.x >= southEast.x)
        southEast.x = point.x;
      if (point.y >= southEast.y)
        southEast.y = point.y;
      if (point.x <= northWest.x)
        northWest.x = point.x;
      if (point.y <= northWest.y)
        northWest.y = point.y;
    }
    return [northWest, new Vector22(northWest.x, southEast.y), southEast, new Vector22(southEast.x, northWest.y)];
  }
  getOrientation(a, b, c) {
    return (b.y - a.y) * (c.x - b.x) - (c.y - b.y) * (b.x - a.x);
  }
  generateConvex(points) {
    const pivot = this.getPivotPoint(points);
    const indices = points.map((_, i) => i);
    const angles = points.map((x) => pivot.angle(x));
    const distances = points.map((x) => pivot.distance(x));
    indices.sort((a, b) => {
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
    const hull = [];
    for (let i = 0; i < indices.length; i++) {
      const point = points[indices[i]];
      if (indices[i] === -1)
        continue;
      if (hull.length < 3) {
        hull.push(point);
        continue;
      }
      while (this.getOrientation(hull.at(-2), hull.at(-1), point) > 0)
        hull.pop();
      hull.push(point);
    }
    if (hull.length < 3)
      return [];
    return hull;
  }
};
__name(Convex, "Convex");

// src/Runtime/Components/ShapeRendererComponent.ts
var ShapeRendererComponent = class extends RenderComponent {
  defaults = {
    shapes: [
      {
        type: "circle",
        offset: Vector22.zero,
        rotation: 0,
        color: Color.random(),
        size: 16
      }
    ]
  };
  getBounds(attributes) {
    return Convex.fromShapes(attributes.shapes);
  }
  render(attributes, entity) {
    for (const shape of attributes.shapes) {
      Runtime_default.canvas.drawShape(entity.transform.position, entity.transform.rotation, shape);
    }
    super.render(attributes, entity);
  }
};
__name(ShapeRendererComponent, "ShapeRendererComponent");

// src/Runtime/Components/TransformComponent.ts
var TransformComponent = class extends Component {
  defaults = {
    position: Vector22.zero,
    rotation: 0
  };
  update(attributes, entity) {
    Runtime_default.spatialMap.set(entity);
  }
};
__name(TransformComponent, "TransformComponent");

// src/Runtime/Components/RigidbodyComponent.ts
var RigidbodyComponent = class extends Component {
  dependencies = [TransformComponent];
  defaults = {
    velocity: new Vector22(),
    friction: 0.2,
    acceleration: 0.8
  };
  start() {
  }
  destroy() {
  }
  update(attributes, entity) {
    let { friction, acceleration } = attributes;
    attributes.velocity = attributes.velocity.lerp(Vector22.zero, friction);
    if (attributes.velocity.length > friction)
      entity.transform.position = entity.transform.position.lerp(entity.transform.position.add(attributes.velocity), acceleration);
    if (Runtime_default.debug) {
      Runtime_default.canvas.vector(entity.transform.position, entity.transform.rotation, attributes.velocity.multiply(25), Color.green);
    }
  }
};
__name(RigidbodyComponent, "RigidbodyComponent");

// src/Runtime/Assets/Tilemap.ts
var TileMap = class {
  _image;
  tiles;
  magnitude = 1;
  static get empty() {
    return new TileMap(null, []);
  }
  get image() {
    return this._image;
  }
  constructor(image, tiles) {
    this._image = image;
    this.tiles = tiles;
  }
  getTile(index) {
    if (typeof index === "number") {
      return this.tiles[index];
    }
    return this.tiles.find((x) => x.name == index);
  }
  static loadImage(url) {
    return new Promise((resolve, reject) => {
      const image = new Image();
      image.addEventListener("error", () => reject(`Could not find ${url}`));
      image.addEventListener("load", () => resolve(image));
      image.src = url;
    });
  }
  static async load(url, options) {
    const image = await this.loadImage(url);
    if (Array.isArray(options))
      return new TileMap(image, options);
    const tiles = [];
    if (!options.rows && !options.tileHeight)
      throw new Error(`You need to supply either rows or tileHeight`);
    if (!options.columns && !options.tileWidth)
      throw new Error(`You need to supply either rows or tileHeight`);
    const settings = {
      rows: options.rows ?? image.naturalWidth / options.tileWidth,
      columns: options.columns ?? image.naturalHeight / options.tileHeight,
      width: options.tileWidth,
      height: options.tileHeight
    };
    settings.width ??= image.naturalWidth / settings.columns;
    settings.height ??= image.naturalHeight / settings.rows;
    for (let y = 0; y < settings.columns; y++) {
      for (let x = 0; x < settings.rows; x++) {
        tiles.push({
          width: settings.width,
          height: settings.height,
          x: x * settings.width,
          y: y * settings.height
        });
      }
    }
    return new TileMap(image, tiles);
  }
  copy() {
    return this;
  }
};
__name(TileMap, "TileMap");

// src/Runtime/Components/TileRendererComponent.ts
var TileRendererComponent = class extends RenderComponent {
  defaults = {
    tileMap: TileMap.empty,
    scale: 1,
    tile: 0,
    framerate: 5
  };
  getBounds(attributes) {
    const { tile, tileMap, framerate } = attributes;
    let currentTile = void 0;
    if (Array.isArray(tile))
      currentTile = tileMap.getTile(tile[Math.round(Runtime_default.time / framerate) % tile.length]);
    else
      currentTile = attributes.tileMap.getTile(tile);
    const halfWidth = new Vector22(currentTile.width / 2, currentTile.height / 2);
    const bounds = [
      new Vector22(-halfWidth.x, -halfWidth.y),
      new Vector22(halfWidth.x, -halfWidth.y),
      new Vector22(halfWidth.x, halfWidth.y),
      new Vector22(-halfWidth.x, halfWidth.y)
    ];
    return {
      box: bounds,
      complex: bounds
    };
  }
  start(data) {
    if (data.tileMap == TileMap.empty)
      throw new Error("Please assign a tilemap to this entity.");
    console.log(data.tileMap);
    if (data.scale != 1)
      data.tileMap.magnitude = data.scale;
  }
  render(attributes, entity) {
    const { tile, tileMap, framerate } = attributes;
    if (Array.isArray(tile)) {
      const currentTile = tileMap.getTile(tile[Math.round(Runtime_default.time / framerate) % tile.length]);
      Runtime_default.canvas.drawTile(entity.transform.position, entity.transform.rotation, tileMap, currentTile);
    } else {
      try {
        Runtime_default.canvas.drawTile(entity.transform.position, entity.transform.rotation, tileMap, tile);
      } catch {
        const currentTile = tileMap.getTile(tile);
        console.log(tile, tileMap, currentTile);
      }
    }
    super.render(attributes, entity);
  }
};
__name(TileRendererComponent, "TileRendererComponent");

// src/Runtime/Renderer/Camera.ts
var Camera = class {
  static get rotation() {
    return this._rotation;
  }
  static set rotation(value) {
    if (this._rotation === value)
      return;
    this._rotation = value;
  }
  static get up() {
    return Vector22.fromAngle(-this.rotation);
  }
  static worldToCameraSpace(worldPosition) {
    const rotation = this.rotation % 360 * DEGREE_TO_RADIAL;
    const x = worldPosition.x - this.position.x;
    const y = worldPosition.y - this.position.y;
    const sin = Math.sin(rotation);
    const cos = Math.cos(rotation);
    return new Vector22((x * cos - y * sin) * this.zoom + Game.canvas.middle.x, (x * sin + y * cos) * this.zoom + Game.canvas.middle.y);
  }
  static cameraToWorldSpace(cameraPosition) {
    return cameraPosition.minus(Game.canvas.middle).divide(this.zoom).rotate(-this.rotation).add(this.position);
  }
};
__name(Camera, "Camera");
__publicField(Camera, "position", new Vector22());
__publicField(Camera, "zoom", 1);
__publicField(Camera, "_rotation", 0);

// src/Runtime/Renderer/Canvas.ts
var Canvas = class {
  get width() {
    return this.canvas.width;
  }
  get height() {
    return this.canvas.height;
  }
  get middle() {
    return this._size.divide(2);
  }
  get size() {
    return this._size;
  }
  get element() {
    return this.canvas;
  }
  set background(color) {
    this._background = color;
  }
  get background() {
    return this._background ?? Color.white;
  }
  canvas;
  ctx;
  _background;
  _size = Vector22.one;
  constructor() {
    this.canvas = document.createElement("canvas");
    this.ctx = this.canvas.getContext("2d");
    this.ctx.lineCap = "round";
    this.ctx.lineJoin = "round";
    this.ctx.textBaseline = "middle";
    document.body.appendChild(this.canvas);
    window.addEventListener("resize", () => this.resize());
    this.canvas.addEventListener("click", () => {
      console.log("requesting fullscreen");
      document.body.requestFullscreen();
    });
    this.resize();
  }
  circle(worldPosition, rotation, size, color, arc = [0, 360]) {
    const position = Camera.worldToCameraSpace(worldPosition);
    const localRotation = rotation + Camera.rotation;
    this.ctx.beginPath();
    this.ctx.fillStyle = color.toString();
    this.ctx.arc(position.x, position.y, size / 2 * Camera.zoom, (arc[0] + localRotation) * DEGREE_TO_RADIAL, arc[1] + localRotation * DEGREE_TO_RADIAL);
    this.ctx.fill();
    this.ctx.closePath();
  }
  box(worldPosition, worldRotation, color, size = Vector22.one) {
    const width = typeof size == "number" ? size : size.x;
    const height = typeof size == "number" ? size : size.y;
    this.polygon(worldPosition, worldRotation, color, [
      new Vector22(-width / 2, -height / 2),
      new Vector22(-width / 2, height / 2),
      new Vector22(width / 2, height / 2),
      new Vector22(width / 2, -height / 2),
      new Vector22(-width / 2, -height / 2)
    ]);
    this.ctx.closePath();
  }
  tracePolygon(worldPosition, rotation, color, indices) {
    if (indices.length < 2)
      return;
    this.ctx.beginPath();
    const [start, ...points] = indices;
    const position = Camera.worldToCameraSpace(worldPosition.add(start.rotate(rotation)));
    this.ctx.moveTo(Math.floor(position.x), Math.floor(position.y));
    for (const index of points) {
      const next = Camera.worldToCameraSpace(worldPosition.add(index.rotate(rotation)));
      this.ctx.lineTo(next.x, next.y);
    }
    this.ctx.lineTo(Math.floor(position.x), Math.floor(position.y));
    this.ctx.closePath();
  }
  polygon(worldPosition, rotation, color, indices) {
    this.tracePolygon(worldPosition, rotation, color, indices);
    this.ctx.fillStyle = color.toString();
    this.ctx.fill();
  }
  wirePolygon(worldPosition, rotation, color, indices) {
    this.tracePolygon(worldPosition, rotation, color, indices);
    this.ctx.strokeStyle = color.toString();
    this.ctx.stroke();
  }
  arc(offset, width = 90, rotation = 0, thickness = 16, color = Color.white) {
    this.ctx.beginPath();
    this.ctx.lineWidth = thickness;
    this.ctx.strokeStyle = color.toString();
    this.ctx.arc(this.canvas.width / 2, this.canvas.height / 2, offset, (rotation - width / 2) * DEGREE_TO_RADIAL, (rotation + width / 2) * DEGREE_TO_RADIAL);
    this.ctx.stroke();
    this.ctx.closePath();
  }
  text(screenPosition, rotation, string, color = Color.black, size = 16) {
    this.ctx.font = `${size}px sans-serif`;
    const position = screenPosition;
    this.ctx.strokeStyle = color.toString();
    this.ctx.fillStyle = color.toString();
    const lines = string.split("\n");
    let i = 0;
    for (const line of lines) {
      i += size * 1.5;
      this.ctx.fillText(line.replaceAll(/\t/g, "    "), position.x, position.y + i);
    }
  }
  vector(worldPosition, worldRotation, vector, color = Color.green) {
    const position = Camera.worldToCameraSpace(worldPosition);
    const end = Camera.worldToCameraSpace(worldPosition.add(vector));
    const delta = end.minus(position);
    if (delta.length == 0)
      return;
    const headlen = Math.sqrt(delta.x * delta.x + delta.y * delta.y) * 0.3;
    const angle = Math.atan2(delta.y, delta.x);
    this.ctx.beginPath();
    this.ctx.strokeStyle = color.toString();
    this.ctx.moveTo(position.x, position.y);
    this.ctx.lineTo(end.x, end.y);
    this.ctx.stroke();
    this.ctx.beginPath();
    this.ctx.moveTo(end.x - headlen * Math.cos(angle - Math.PI / 4), end.y - headlen * Math.sin(angle - Math.PI / 6));
    this.ctx.lineTo(end.x, end.y);
    this.ctx.lineTo(end.x - headlen * Math.cos(angle + Math.PI / 4), end.y - headlen * Math.sin(angle + Math.PI / 6));
    this.ctx.stroke();
  }
  drawShape(worldPosition, localRotation, shape) {
    console.assert(shape !== void 0, "shape is undefined", shape);
    const { color, offset } = shape;
    const shapeRotation = (shape.rotation ?? 0) + localRotation;
    const localPosition = offset.rotate(localRotation).add(worldPosition);
    switch (shape.type) {
      case "box":
        if (typeof shape.size == "number")
          this.box(localPosition, shapeRotation, color, shape.size);
        else if (shape.size instanceof Vector22)
          this.box(localPosition, shapeRotation, color, shape.size);
        break;
      case "circle":
        this.circle(localPosition, shapeRotation, shape.size, color, shape.arc);
        break;
      case "polygon":
        this.polygon(localPosition, shapeRotation, color, shape.indices);
        break;
    }
  }
  drawTile(worldPosition, worldRotation, tileMap, tile) {
    const info = typeof tile == "object" ? tile : tileMap.getTile(tile);
    this.ctx.fillStyle = Color.red.toString();
    const position = Camera.worldToCameraSpace(worldPosition);
    const size = tileMap.magnitude * Camera.zoom;
    this.ctx.translate(position.x, position.y);
    this.ctx.rotate((worldRotation + Camera.rotation) * DEGREE_TO_RADIAL);
    this.ctx.imageSmoothingEnabled = false;
    this.ctx.drawImage(tileMap.image, info.x, info.y, info.width, info.height, info.width * size * -0.5, info.width * size * -0.5, info.width * size, info.height * size);
    this.ctx.imageSmoothingEnabled = true;
    this.ctx.setTransform(1, 0, 0, 1, 0, 0);
  }
  draw() {
    this.ctx.fillStyle = this.background.toString();
    this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
  }
  resize() {
    this.canvas.width = window.innerWidth;
    this.canvas.height = window.innerHeight;
    this._size = new Vector22(this.canvas.width, this.canvas.height);
  }
};
__name(Canvas, "Canvas");

// src/Runtime/Data/Entity.ts
var convexHullCache = new Map();
window.convexHullCache = convexHullCache;
var Entity6 = class {
  tags;
  _components;
  _renderComponents;
  _id;
  get transform() {
    return this.getComponent(TransformComponent);
  }
  get bounds() {
    if (convexHullCache.has(this.id))
      return convexHullCache.get(this.id);
    const component = this.getAllComponents().find((x) => x[0] instanceof RenderComponent);
    if (!component) {
      console.log(`Entity ${this.id} has no bounds.`);
      return {
        box: [],
        complex: []
      };
    }
    const bounds = component[0].getBounds(component[1]);
    convexHullCache.set(this.id, bounds);
    return bounds;
  }
  get id() {
    return this._id;
  }
  constructor() {
    this._id = generateId();
    this.tags = new Set();
    this._components = new Map();
    this._renderComponents = new Set();
    this.addComponent(TransformComponent);
  }
  start() {
    for (const [component, data] of this._components) {
      component?.start(data, this);
    }
  }
  callDestroyHooks() {
    for (const [component, data] of this._components) {
      component?.destroy(data, this);
    }
  }
  update() {
    for (const [component, data] of this._components) {
      component?.update(data, this);
      if (component instanceof RenderComponent)
        component?.render(data, this);
    }
  }
  render() {
    for (const componentName of this._renderComponents) {
      const component = Runtime_default.components.get(componentName);
      const data = this._components.get(component);
      component?.render(data, this);
    }
  }
  removeComponent(name) {
    const _component = Runtime_default.components.get(name.name);
    if (_component)
      this._components.delete(_component);
  }
  addComponent(component, data) {
    if (Array.isArray(component)) {
      for (const _component of component)
        this.addComponent(_component);
      return;
    } else {
      const _component = Runtime_default.components.get(component.name);
      if (_component === void 0)
        throw new Error(`Component ${component.name} not found.`);
      if (_component.dependencies)
        for (const dependency of _component.dependencies)
          this.addComponent(dependency);
      if (this.hasComponent(component)) {
        console.warn(`Entity ${this.id} already has a ${component.name}.`);
        return;
      }
      this._components.set(_component, { ..._component.defaults, ...data });
      _component?.start({ ..._component.defaults, ...data }, this);
    }
  }
  getComponent(component) {
    const _component = Runtime_default.components.get(component.name);
    if (_component == void 0)
      throw new Error(`Component ${component.name} doesn't exist.`);
    return this._components.get(_component);
  }
  getAllComponents() {
    return [...this._components.entries()];
  }
  hasComponent(component) {
    const _component = Runtime_default.components.get(component.name);
    if (_component == void 0)
      return false;
    return this._components.has(_component);
  }
  destroy() {
    this.callDestroyHooks();
    Runtime_default.removeEntity(this);
  }
  clone() {
    const copy = new Entity6();
    copy.tags = new Set(this.tags);
    for (const [component, data] of this._components)
      copy.addComponent(component.constructor, structuredClone(data));
    return copy;
  }
};
__name(Entity6, "Entity");

// src/Runtime/Keyboard.ts
var Keyboard = class {
  static initialize() {
    window.addEventListener("keydown", (e) => this.handleKeyDown(e));
    window.addEventListener("keyup", (e) => this.handleKeyUp(e));
    window.addEventListener("blur", () => this.clearAll());
  }
  static clearAll() {
    this.pressedKeys.clear();
    this.currentFrame.clear();
  }
  static handleKeyDown(event) {
    this.addKey(event.key.toLowerCase());
    if (event.ctrlKey)
      this.addKey("ctrl");
    if (event.shiftKey)
      this.addKey("shift");
    if (event.metaKey)
      this.addKey("meta");
    if (event.altKey)
      this.addKey("alt");
  }
  static handleKeyUp(event) {
    this.pressedKeys.delete(event.key.toLowerCase());
    if (!event.ctrlKey)
      this.pressedKeys.delete("ctrl");
    if (!event.shiftKey)
      this.pressedKeys.delete("shift");
    if (!event.metaKey)
      this.pressedKeys.delete("meta");
    if (!event.altKey)
      this.pressedKeys.delete("alt");
    event.preventDefault();
  }
  static addKey(key) {
    this.pressedKeys.add(key);
    this.currentFrame.add(key);
  }
  static isDown(...keys) {
    return !keys.some((x) => !this.pressedKeys.has(x));
  }
  static isPressed(...keys) {
    return !keys.some((x) => !this.currentFrame.has(x));
  }
  static clearFrame() {
    this.currentFrame.clear();
  }
};
__name(Keyboard, "Keyboard");
__publicField(Keyboard, "pressedKeys", new Set());
__publicField(Keyboard, "currentFrame", new Set());
Keyboard.initialize();

// src/Runtime/Data/SpatialMap.ts
var SpatialMap = class {
  constructor(resulution = 128) {
    this.resulution = resulution;
  }
  buckets = new Map();
  entities = new Map();
  generateHash(point) {
    return (Math.floor(point.x / this.resulution) * this.resulution).toString() + "," + (Math.floor(point.y / this.resulution) * this.resulution).toString();
  }
  set(entity) {
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
  getEntityHash(entity) {
    return this.entities.get(entity.id);
  }
  get(min, max) {
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
};
__name(SpatialMap, "SpatialMap");

// src/Runtime/Game.ts
var Game = class {
  static get debug() {
    return this._debug;
  }
  static get time() {
    return this._time;
  }
  static get paused() {
    return this._paused;
  }
  static set paused(value) {
    this._paused = value;
    if (!this._paused) {
      this.start();
    }
  }
  static get canvas() {
    return this._canvas;
  }
  static get components() {
    return this._components;
  }
  static start() {
    requestAnimationFrame(this.loop.bind(this));
  }
  static getEntityByTags(...tags) {
    return [...this._entities.values()].find((x) => !tags.some((y) => !x.tags.has(y)));
  }
  static getEntityById(id) {
    return this._entities.get(id);
  }
  static getEntities(...tags) {
    if (tags.length == 0)
      return [...this._entities.values()];
    return [...this._entities.values()].filter((x) => !tags.some((y) => !x.tags.has(y)));
  }
  static registerEntity(entity) {
    this._entities.set(entity.id, entity);
    entity.start();
  }
  static removeEntity(entity) {
    this._entities.delete(entity.id);
  }
  static createEntity(...tags) {
    const entity = new Entity6();
    for (const tag of tags)
      entity.tags.add(tag);
    this._entities.set(entity.id, entity);
    return entity;
  }
  static registerComponent(...components) {
    for (const component of components) {
      this._components.set(component.name, new component());
    }
  }
  static onUpdate(callback) {
    this.updateCallbacks.push(callback);
  }
  static loop() {
    this.canvas.draw();
    this._time++;
    if (this._time > 60)
      this._time = 0;
    if (Keyboard.isPressed("escape")) {
      this.paused = !this.paused;
    }
    if (Keyboard.isPressed("ctrl", "f1")) {
      this._debug = !this._debug;
    }
    for (const entity of this._entities.values()) {
      entity.render();
      if (!this._paused)
        entity.update();
    }
    this.updateCallbacks.forEach((x) => x());
    Keyboard.clearFrame();
    requestAnimationFrame(this.loop.bind(this));
  }
};
__name(Game, "Game");
__publicField(Game, "_canvas", new Canvas());
__publicField(Game, "_entities", new Map());
__publicField(Game, "_components", new Map());
__publicField(Game, "_time", 0);
__publicField(Game, "updateCallbacks", []);
__publicField(Game, "_paused", false);
__publicField(Game, "_debug", true);
__publicField(Game, "spatialMap", new SpatialMap(512));
window.Game = Game;
Game.start();

// src/Runtime/Mouse.ts
var Mouse = class {
  static get x() {
    return this._x;
  }
  static get y() {
    return this._y;
  }
  static get wheel() {
    return this._wheel;
  }
  static get position() {
    return new Vector22(this._x, this._y);
  }
  static set visible(value) {
    Game.canvas.element.style.cursor = value ? "default" : "none";
  }
  static get visible() {
    return Game.canvas.element.style.cursor == "default";
  }
  static get left() {
    return this.mouseButtons.left;
  }
  static get right() {
    return this.mouseButtons.right;
  }
  static get middle() {
    return this.mouseButtons.middle;
  }
  static initialize() {
    window.addEventListener("click", (e) => e.preventDefault());
    window.addEventListener("contextmenu", (e) => e.preventDefault());
    window.addEventListener("wheel", (e) => {
      this._wheel += e.deltaY * -0.01;
    });
    window.addEventListener("mousemove", (e) => {
      this._x = e.clientX;
      this._y = e.clientY;
    });
    window.addEventListener("mousedown", (e) => {
      e.preventDefault();
      this.mouseButtons.left = e.button == 0;
      this.mouseButtons.right = e.button == 2;
      this.mouseButtons.middle = e.button == 1;
    });
    window.addEventListener("mouseup", (e) => {
      e.preventDefault();
      this.mouseButtons.left = this.mouseButtons.left && e.button != 0;
      this.mouseButtons.right = this.mouseButtons.right && e.button != 2;
      this.mouseButtons.middle = this.mouseButtons.middle && e.button != 1;
    });
  }
};
__name(Mouse, "Mouse");
__publicField(Mouse, "_x", 0);
__publicField(Mouse, "_y", 0);
__publicField(Mouse, "_wheel", 0);
__publicField(Mouse, "mouseButtons", { left: false, right: false, middle: false });
Mouse.initialize();

// src/Runtime/index.ts
Game.registerComponent(TransformComponent, RigidbodyComponent, RenderComponent, ShapeRendererComponent, TileRendererComponent);
var Runtime_default = Game;

export {
  __name,
  Component,
  RenderComponent,
  lerp,
  pointInPolygon,
  Color,
  Vector22 as Vector2,
  ShapeRendererComponent,
  RigidbodyComponent,
  TileMap,
  TileRendererComponent,
  Camera,
  Entity6 as Entity,
  Keyboard,
  Mouse,
  Runtime_default
};
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsiLi4vLi4vc3JjL1J1bnRpbWUvRGF0YS9Db21wb25lbnQudHMiLCAiLi4vLi4vc3JjL1J1bnRpbWUvQ29tcG9uZW50cy9SZW5kZXJDb21wb25lbnQudHMiLCAiLi4vLi4vc3JjL1J1bnRpbWUvSGVscGVycy50cyIsICIuLi8uLi9zcmMvUnVudGltZS9SZW5kZXJlci9Db2xvci50cyIsICIuLi8uLi9zcmMvUnVudGltZS9EYXRhL1ZlY3RvcjIudHMiLCAiLi4vLi4vc3JjL1J1bnRpbWUvUmVuZGVyZXIvQ29udmV4LnRzIiwgIi4uLy4uL3NyYy9SdW50aW1lL0NvbXBvbmVudHMvU2hhcGVSZW5kZXJlckNvbXBvbmVudC50cyIsICIuLi8uLi9zcmMvUnVudGltZS9Db21wb25lbnRzL1RyYW5zZm9ybUNvbXBvbmVudC50cyIsICIuLi8uLi9zcmMvUnVudGltZS9Db21wb25lbnRzL1JpZ2lkYm9keUNvbXBvbmVudC50cyIsICIuLi8uLi9zcmMvUnVudGltZS9Bc3NldHMvVGlsZW1hcC50cyIsICIuLi8uLi9zcmMvUnVudGltZS9Db21wb25lbnRzL1RpbGVSZW5kZXJlckNvbXBvbmVudC50cyIsICIuLi8uLi9zcmMvUnVudGltZS9SZW5kZXJlci9DYW1lcmEudHMiLCAiLi4vLi4vc3JjL1J1bnRpbWUvUmVuZGVyZXIvQ2FudmFzLnRzIiwgIi4uLy4uL3NyYy9SdW50aW1lL0RhdGEvRW50aXR5LnRzIiwgIi4uLy4uL3NyYy9SdW50aW1lL0tleWJvYXJkLnRzIiwgIi4uLy4uL3NyYy9SdW50aW1lL0RhdGEvU3BhdGlhbE1hcC50cyIsICIuLi8uLi9zcmMvUnVudGltZS9HYW1lLnRzIiwgIi4uLy4uL3NyYy9SdW50aW1lL01vdXNlLnRzIiwgIi4uLy4uL3NyYy9SdW50aW1lL2luZGV4LnRzIl0sCiAgInNvdXJjZXNDb250ZW50IjogWyJpbXBvcnQgRW50aXR5IGZyb20gJ0AvRGF0YS9FbnRpdHknO1xuXG5leHBvcnQgdHlwZSBDb21wb25lbnRUeXBlPFQgZXh0ZW5kcyBDb21wb25lbnQ+ID0gKG5ldyAoLi4ucGFyYW1ldGVyczogQ29uc3RydWN0b3JQYXJhbWV0ZXJzPHR5cGVvZiBDb21wb25lbnQ+KSA9PiBUKSAmIHR5cGVvZiBDb21wb25lbnQ7XG5cblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgQ29tcG9uZW50IHtcbiAgICByZWFkb25seSBkZXBlbmRlbmNpZXM6IHR5cGVvZiBDb21wb25lbnRbXSA9IFtdXG5cbiAgICBkZWZhdWx0cz86IGFueTtcblxuICAgIGNvbnN0cnVjdG9yKCkgeyB9XG4gICAgc3RhcnQoYXR0cmlidXRlczogdGhpc1tcImRlZmF1bHRzXCJdLCBlbnRpdHk6IEVudGl0eSk6IHZvaWQgeyB9O1xuICAgIGRlc3Ryb3koYXR0cmlidXRlczogdGhpc1tcImRlZmF1bHRzXCJdLCBlbnRpdHk6IEVudGl0eSk6IHZvaWQgeyB9O1xuICAgIHVwZGF0ZShhdHRyaWJ1dGVzOiB0aGlzW1wiZGVmYXVsdHNcIl0sIGVudGl0eTogRW50aXR5KTogdm9pZCB7IH07XG59IiwgImltcG9ydCBHYW1lLCB7IENvbG9yLCBFbnRpdHksIFZlY3RvcjIgfSBmcm9tICdFbmdpbmUnO1xuaW1wb3J0IENvbXBvbmVudCBmcm9tICdAL0RhdGEvQ29tcG9uZW50JztcbmltcG9ydCBJQm91bmRzIGZyb20gJ0AvUmVuZGVyZXIvSUJvdW5kcyc7XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIFJlbmRlckNvbXBvbmVudCBleHRlbmRzIENvbXBvbmVudCB7XG4gICAgZ2V0Qm91bmRzKGF0dHJpYnV0ZXM6IHRoaXNbXCJkZWZhdWx0c1wiXSk6IElCb3VuZHMge1xuICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgYm94OiBbXSxcbiAgICAgICAgICAgIGNvbXBsZXg6IFtdXG4gICAgICAgIH1cbiAgICB9XG5cbiAgICByZW5kZXIoYXR0cmlidXRlczogdGhpc1tcImRlZmF1bHRzXCJdLCBlbnRpdHk6IEVudGl0eSkge1xuICAgICAgICBpZiAoR2FtZS5kZWJ1Zykge1xuICAgICAgICAgICAgR2FtZS5jYW52YXMud2lyZVBvbHlnb24oZW50aXR5LnRyYW5zZm9ybS5wb3NpdGlvbiwgZW50aXR5LnRyYW5zZm9ybS5yb3RhdGlvbiwgQ29sb3Iud2hpdGUsIGVudGl0eS5ib3VuZHMuYm94KTtcbiAgICAgICAgICAgIEdhbWUuY2FudmFzLndpcmVQb2x5Z29uKGVudGl0eS50cmFuc2Zvcm0ucG9zaXRpb24sIGVudGl0eS50cmFuc2Zvcm0ucm90YXRpb24sIENvbG9yLmdyZWVuLCBlbnRpdHkuYm91bmRzLmNvbXBsZXgpO1xuICAgICAgICB9XG4gICAgfVxufSIsICJpbXBvcnQgR2FtZSBmcm9tICdFbmdpbmUnO1xuaW1wb3J0IFZlY3RvcjIgZnJvbSAnLi9EYXRhL1ZlY3RvcjInO1xuXG4vKipcbiAqIEBwYXJhbSB7bnVtYmVyfSBzdGFydFxuICogQHBhcmFtIHtudW1iZXJ9IGVuZFxuICogQHBhcmFtIHtudW1iZXJ9IGFtdFxuICovXG5leHBvcnQgZnVuY3Rpb24gbGVycChzdGFydDogbnVtYmVyLCBlbmQ6IG51bWJlciwgYW10OiBudW1iZXIpIHtcbiAgICByZXR1cm4gKDEgLSBhbXQpICogc3RhcnQgKyBhbXQgKiBlbmQ7XG59XG5cbmV4cG9ydCBjb25zdCBERUdSRUVfVE9fUkFESUFMID0gTWF0aC5QSSAvIDE4MDtcblxuZXhwb3J0IGZ1bmN0aW9uIGV2ZXJ5KG1pbGlzZWNvbmRzOiBudW1iZXIsIHByZWNpc2lvbiA9IDEwKSB7XG4gICAgcmV0dXJuIE1hdGguZmxvb3IoR2FtZS50aW1lIC8gcHJlY2lzaW9uKSAqIHByZWNpc2lvbiAlIG1pbGlzZWNvbmRzID09IDA7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBzdHJ1Y3R1cmVkQ2xvbmUob2JqZWN0OiBhbnkpOiBhbnkge1xuICAgIGlmICh0eXBlb2Ygb2JqZWN0ICE9IFwib2JqZWN0XCIpXG4gICAgICAgIHJldHVybiBvYmplY3Q7XG5cbiAgICBpZiAodHlwZW9mIG9iamVjdC5jb3B5ID09IFwiZnVuY3Rpb25cIilcbiAgICAgICAgcmV0dXJuIG9iamVjdC5jb3B5KCk7XG5cbiAgICBpZiAoQXJyYXkuaXNBcnJheShvYmplY3QpKVxuICAgICAgICByZXR1cm4gWy4uLm9iamVjdC5tYXAoc3RydWN0dXJlZENsb25lKV07XG5cbiAgICBjb25zdCBlbnRyaWVzID0gT2JqZWN0LmVudHJpZXMob2JqZWN0KTtcbiAgICBsZXQgcmVzdWx0OiBSZWNvcmQ8c3RyaW5nIHwgbnVtYmVyLCBhbnk+ID0ge307XG5cbiAgICBmb3IgKGNvbnN0IFtrZXksIHZhbHVlXSBvZiBlbnRyaWVzKSB7XG4gICAgICAgIHJlc3VsdFtrZXldID0gc3RydWN0dXJlZENsb25lKHZhbHVlKTtcbiAgICB9XG5cbiAgICByZXR1cm4gcmVzdWx0O1xufVxuXG5leHBvcnQgZnVuY3Rpb24gZ2VuZXJhdGVJZChzaXplID0gOCkge1xuICAgIGxldCBpZCA9ICcnO1xuICAgIGxldCBieXRlcyA9IGNyeXB0by5nZXRSYW5kb21WYWx1ZXMobmV3IFVpbnQ4QXJyYXkoc2l6ZSkpO1xuXG4gICAgd2hpbGUgKHNpemUtLSkge1xuICAgICAgICBsZXQgYnl0ZSA9IGJ5dGVzW3NpemVdICYgNjM7XG4gICAgICAgIGlmIChieXRlIDwgMzYpIHtcbiAgICAgICAgICAgIC8vIGAwLTlhLXpgXG4gICAgICAgICAgICBpZCArPSBieXRlLnRvU3RyaW5nKDM2KTtcbiAgICAgICAgfSBlbHNlIGlmIChieXRlIDwgNjIpIHtcbiAgICAgICAgICAgIC8vIGBBLVpgXG4gICAgICAgICAgICBpZCArPSAoYnl0ZSAtIDI2KS50b1N0cmluZygzNikudG9VcHBlckNhc2UoKTtcbiAgICAgICAgfSBlbHNlIGlmIChieXRlIDwgNjMpIHtcbiAgICAgICAgICAgIGlkICs9ICcjJztcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIGlkICs9ICckJztcbiAgICAgICAgfVxuICAgIH1cbiAgICByZXR1cm4gaWQ7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBwb2ludEluUG9seWdvbihwb2ludDogVmVjdG9yMiwgaW5kaWNlczogVmVjdG9yMltdKSB7XG4gICAgbGV0IGluc2lkZSA9IGZhbHNlO1xuXG4gICAgbGV0IGogPSBpbmRpY2VzLmxlbmd0aCAtIDE7XG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCBpbmRpY2VzLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgIGNvbnN0IGN1cnJlbnQgPSBpbmRpY2VzW2ldO1xuICAgICAgICBjb25zdCBuZXh0ID0gaW5kaWNlc1tqXTtcblxuICAgICAgICBpZiAocG9pbnQueCA9PT0gY3VycmVudC54ICYmIHBvaW50LnkgPT09IGN1cnJlbnQueSlcbiAgICAgICAgICAgIHJldHVybiB0cnVlO1xuXG4gICAgICAgIGlmICgoY3VycmVudC55ID4gcG9pbnQueSkgIT0gKG5leHQueSA+IHBvaW50LnkpKSB7XG4gICAgICAgICAgICBjb25zdCBzbG9wZSA9IChwb2ludC54IC0gY3VycmVudC54KSAqIChuZXh0LnkgLSBjdXJyZW50LnkpIC0gKG5leHQueCAtIGN1cnJlbnQueCkgKiAocG9pbnQueSAtIGN1cnJlbnQueSk7XG5cbiAgICAgICAgICAgIGlmIChzbG9wZSA9PSAwKVxuICAgICAgICAgICAgICAgIHJldHVybiB0cnVlO1xuXG4gICAgICAgICAgICBpZiAoKHNsb3BlIDwgMCkgIT0gKG5leHQueSA8IGN1cnJlbnQueSkpXG4gICAgICAgICAgICAgICAgaW5zaWRlID0gIWluc2lkZTtcbiAgICAgICAgfVxuXG4gICAgICAgIGogPSBpO1xuICAgIH1cblxuICAgIHJldHVybiBpbnNpZGU7XG59IiwgImltcG9ydCB7IGxlcnAgfSBmcm9tICdAL0hlbHBlcnMnO1xuXG5jb25zdCBjb2xvckNhY2hlID0gbmV3IE1hcDxudW1iZXIsIHN0cmluZz4oKTtcblxuKHdpbmRvdyBhcyBhbnkpLmNvbG9yQ2FjaGUgPSBjb2xvckNhY2hlO1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBDb2xvciB7XG4gICAgc3RhdGljIHJlZCA9IG5ldyBDb2xvcigyNTUsIDAsIDApO1xuICAgIHN0YXRpYyBibHVlID0gbmV3IENvbG9yKDAsIDAsIDI1NSk7XG4gICAgc3RhdGljIGdyZWVuID0gbmV3IENvbG9yKDAsIDI1NSwgMCk7XG4gICAgc3RhdGljIGJsYWNrID0gbmV3IENvbG9yKDAsIDAsIDAsIDEpO1xuICAgIHN0YXRpYyB3aGl0ZSA9IG5ldyBDb2xvcigyNTUsIDI1NSwgMjU1KTtcblxuICAgIHN0YXRpYyByYW5kb20oKSB7XG4gICAgICAgIHJldHVybiBuZXcgQ29sb3IoTWF0aC5yb3VuZChNYXRoLnJhbmRvbSgpICogMjU1KSwgTWF0aC5yb3VuZChNYXRoLnJhbmRvbSgpICogMjU1KSwgTWF0aC5yb3VuZChNYXRoLnJhbmRvbSgpICogMjU1KSwgMSk7XG4gICAgfVxuXG4gICAgcjogbnVtYmVyID0gMjU1O1xuICAgIGc6IG51bWJlciA9IDI1NTtcbiAgICBiOiBudW1iZXIgPSAyNTU7XG4gICAgYTogbnVtYmVyID0gMTtcblxuICAgIC8qKlxuICAgICAqIEBwYXJhbSB7bnVtYmVyfSBbcl1cbiAgICAgKiBAcGFyYW0ge251bWJlcn0gW2ddXG4gICAgICogQHBhcmFtIHtudW1iZXJ9IFtiXVxuICAgICAqIEBwYXJhbSB7bnVtYmVyfSBbYV1cbiAgICAgKi9cbiAgICBjb25zdHJ1Y3RvcihyOiBudW1iZXIsIGc6IG51bWJlciwgYjogbnVtYmVyLCBhPzogbnVtYmVyKSB7XG4gICAgICAgIHRoaXMuciA9IHIgPz8gMDtcbiAgICAgICAgdGhpcy5nID0gZyA/PyAwO1xuICAgICAgICB0aGlzLmIgPSBiID8/IDA7XG4gICAgICAgIHRoaXMuYSA9IGEgPz8gMTtcbiAgICB9XG5cbiAgICBsZXJwKHRhcmdldDogQ29sb3IsIGFtb3VudDogbnVtYmVyKSB7XG4gICAgICAgIHJldHVybiBuZXcgQ29sb3IoXG4gICAgICAgICAgICBNYXRoLnJvdW5kKGxlcnAodGhpcy5yLCB0YXJnZXQuciwgYW1vdW50KSksXG4gICAgICAgICAgICBNYXRoLnJvdW5kKGxlcnAodGhpcy5nLCB0YXJnZXQuZywgYW1vdW50KSksXG4gICAgICAgICAgICBNYXRoLnJvdW5kKGxlcnAodGhpcy5iLCB0YXJnZXQuZywgYW1vdW50KSlcbiAgICAgICAgKTtcbiAgICB9XG5cbiAgICBpbnZlcnQoKSB7XG4gICAgICAgIHJldHVybiBuZXcgQ29sb3IoMjU1IC0gdGhpcy5yLCAyNTUgLSB0aGlzLmcsIDI1NSAtIHRoaXMuYiwgdGhpcy5hKTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBAcGFyYW0ge251bWJlcn0gZmFjdG9yXG4gICAgICovXG4gICAgc2hhZGUoZmFjdG9yOiBudW1iZXIpIHtcbiAgICAgICAgcmV0dXJuIG5ldyBDb2xvcihcbiAgICAgICAgICAgIE1hdGguZmxvb3IodGhpcy5yICogKDEgLSBmYWN0b3IpKSxcbiAgICAgICAgICAgIE1hdGguZmxvb3IodGhpcy5nICogKDEgLSBmYWN0b3IpKSxcbiAgICAgICAgICAgIE1hdGguZmxvb3IodGhpcy5iICogKDEgLSBmYWN0b3IpKVxuICAgICAgICApO1xuICAgIH1cblxuICAgIGNvcHkoKSB7XG4gICAgICAgIHJldHVybiB0aGlzO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIEBwYXJhbSB7c3RyaW5nfSBzdHJpbmdcbiAgICAgKi9cbiAgICBzdGF0aWMgZnJvbVN0cmluZyhzdHJpbmc6IHN0cmluZykge1xuICAgICAgICBpZiAoIXN0cmluZy5zdGFydHNXaXRoKFwiI1wiKSlcbiAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcihcIkNvbG9yLmZyb21TdHJpbmcgZXhwZWN0cyBhIHN0cmluZyBpbiB0aGUgYCNSUkdHQkIoQUEpP2AgZm9ybWF0LlwiKTtcblxuICAgICAgICBjb25zdCBwYXJ0cyA9IHN0cmluZy5zdWJzdHJpbmcoMSkuc3BsaXQoJycpO1xuICAgICAgICBjb25zdCByZXN1bHQgPSBuZXcgQ29sb3IoXG4gICAgICAgICAgICBwYXJzZUludChwYXJ0c1swXSArIHBhcnRzWzFdLCAxNiksXG4gICAgICAgICAgICBwYXJzZUludChwYXJ0c1syXSArIHBhcnRzWzNdLCAxNiksXG4gICAgICAgICAgICBwYXJzZUludChwYXJ0c1s0XSArIHBhcnRzWzVdLCAxNilcbiAgICAgICAgKTtcblxuICAgICAgICBpZiAocGFydHMubGVuZ3RoID09IDgpXG4gICAgICAgICAgICByZXN1bHQuYSA9IHBhcnNlSW50KHBhcnRzWzZdICsgcGFydHNbN10sIDE2KTtcblxuICAgICAgICByZXR1cm4gcmVzdWx0O1xuICAgIH1cblxuICAgIHRvU3RyaW5nKCkge1xuICAgICAgICBjb25zdCBoYXNoID0gMHhGRkZGICogdGhpcy5yICsgMHhGRiAqIHRoaXMuZyArIHRoaXMuYjtcblxuICAgICAgICBpZiAoY29sb3JDYWNoZS5oYXMoaGFzaCkpXG4gICAgICAgICAgICByZXR1cm4gY29sb3JDYWNoZS5nZXQoaGFzaCkhO1xuXG4gICAgICAgIGNvbnN0IGhleCA9IGAjJHt0aGlzLnIudG9TdHJpbmcoMTYpLnBhZFN0YXJ0KDIsICcwJyl9JHt0aGlzLmcudG9TdHJpbmcoMTYpLnBhZFN0YXJ0KDIsICcwJyl9JHt0aGlzLmIudG9TdHJpbmcoMTYpLnBhZFN0YXJ0KDIsICcwJyl9JHsodGhpcy5hICogMjU1KS50b1N0cmluZygxNikucGFkU3RhcnQoMiwgJzAnKX1gO1xuICAgICAgICBjb2xvckNhY2hlLnNldChoYXNoLCBoZXgpO1xuXG4gICAgICAgIHJldHVybiBoZXg7XG4gICAgfVxufSIsICJpbXBvcnQgeyBERUdSRUVfVE9fUkFESUFMLCBsZXJwIH0gZnJvbSAnQC9IZWxwZXJzJztcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgVmVjdG9yMiB7XG5cbiAgICBzdGF0aWMgemVybyA9IG5ldyBWZWN0b3IyKDAsIDApO1xuICAgIHN0YXRpYyBvbmUgPSBuZXcgVmVjdG9yMigxLCAxKTtcblxuICAgIHN0YXRpYyB1cCA9IG5ldyBWZWN0b3IyKDAsIC0xKTtcbiAgICBzdGF0aWMgZG93biA9IG5ldyBWZWN0b3IyKDAsIDEpO1xuXG4gICAgc3RhdGljIGxlZnQgPSBuZXcgVmVjdG9yMigtMSwgMCk7XG4gICAgc3RhdGljIHJpZ2h0ID0gbmV3IFZlY3RvcjIoMSwgMCk7XG5cbiAgICBzdGF0aWMgZ2V0IHJhbmRvbSgpIHtcbiAgICAgICAgcmV0dXJuIG5ldyBWZWN0b3IyKFxuICAgICAgICAgICAgTWF0aC5yYW5kb20oKSxcbiAgICAgICAgICAgIE1hdGgucmFuZG9tKClcbiAgICAgICAgKTtcbiAgICB9XG5cbiAgICBnZXQgbGVuZ3RoKCkge1xuICAgICAgICByZXR1cm4gTWF0aC5zcXJ0KHRoaXMueCAqKiAyICsgdGhpcy55ICoqIDIpO1xuICAgIH1cblxuXG4gICAgY29uc3RydWN0b3IocHVibGljIHg6IG51bWJlciA9IDAsIHB1YmxpYyB5OiBudW1iZXIgPSAwKSB7IH1cblxuICAgIGxlcnAodGFyZ2V0OiBWZWN0b3IyLCBhbW91bnQ6IG51bWJlcikge1xuICAgICAgICByZXR1cm4gbmV3IFZlY3RvcjIoXG4gICAgICAgICAgICBsZXJwKHRoaXMueCwgdGFyZ2V0LngsIGFtb3VudCksXG4gICAgICAgICAgICBsZXJwKHRoaXMueSwgdGFyZ2V0LnksIGFtb3VudClcbiAgICAgICAgKTtcbiAgICB9XG5cbiAgICBkb3QodGVzdDogVmVjdG9yMikge1xuICAgICAgICByZXR1cm4gKHRoaXMueCAqIHRlc3QueCkgKyAodGhpcy55ICogdGVzdC55KTtcbiAgICB9XG5cbiAgICBkaXN0YW5jZShnb2FsOiBWZWN0b3IyKSB7XG4gICAgICAgIHJldHVybiBNYXRoLnNxcnQoXG4gICAgICAgICAgICAoZ29hbC54IC0gdGhpcy54KSAqKiAyXG4gICAgICAgICAgICArXG4gICAgICAgICAgICAoZ29hbC55IC0gdGhpcy55KSAqKiAyXG4gICAgICAgICk7XG4gICAgfVxuXG4gICAgYW5nbGUodGFyZ2V0OiBWZWN0b3IyKSB7XG4gICAgICAgIHJldHVybiBNYXRoLmF0YW4yKHRhcmdldC55IC0gdGhpcy55LCB0YXJnZXQueCAtIHRoaXMueCk7XG4gICAgfVxuXG4gICAgaW52ZXJ0KCkge1xuICAgICAgICByZXR1cm4gdGhpcy5tdWx0aXBseSgtMSk7XG4gICAgfVxuXG4gICAgcm90YXRlKGRlZ3JlZXM6IG51bWJlcikge1xuICAgICAgICBjb25zdCByYWRpYWxzID0gZGVncmVlcyAqIERFR1JFRV9UT19SQURJQUw7XG5cbiAgICAgICAgcmV0dXJuIG5ldyBWZWN0b3IyKFxuICAgICAgICAgICAgdGhpcy54ICogTWF0aC5jb3MocmFkaWFscykgLSB0aGlzLnkgKiBNYXRoLnNpbihyYWRpYWxzKSxcbiAgICAgICAgICAgIHRoaXMueCAqIE1hdGguc2luKHJhZGlhbHMpICsgdGhpcy55ICogTWF0aC5jb3MocmFkaWFscyksXG4gICAgICAgICk7XG4gICAgfVxuXG4gICAgbm9ybWFsaXplKCkge1xuICAgICAgICBpZiAodGhpcy5sZW5ndGggPT0gMClcbiAgICAgICAgICAgIHJldHVybiB0aGlzO1xuICAgICAgICByZXR1cm4gdGhpcy5kaXZpZGUodGhpcy5sZW5ndGgpO1xuICAgIH1cblxuICAgIGxpbWl0KGxpbWl0OiBudW1iZXIgPSAxKSB7XG4gICAgICAgIHJldHVybiBuZXcgVmVjdG9yMihcbiAgICAgICAgICAgIE1hdGgubWluKE1hdGguYWJzKHRoaXMueCksIGxpbWl0KSAqIE1hdGguc2lnbih0aGlzLngpLFxuICAgICAgICAgICAgTWF0aC5taW4oTWF0aC5hYnModGhpcy55KSwgbGltaXQpICogTWF0aC5zaWduKHRoaXMueSlcbiAgICAgICAgKTtcbiAgICB9XG5cbiAgICBtdWx0aXBseSh4OiBudW1iZXIpOiBWZWN0b3IyO1xuICAgIG11bHRpcGx5KHg6IG51bWJlciwgeTogbnVtYmVyKTogVmVjdG9yMjtcbiAgICBtdWx0aXBseSh2ZWN0b3I6IFZlY3RvcjIpOiBWZWN0b3IyO1xuICAgIG11bHRpcGx5KHZlY3RvcjogbnVtYmVyIHwgVmVjdG9yMiwgeT86IG51bWJlcikge1xuICAgICAgICBpZiAodmVjdG9yIGluc3RhbmNlb2YgVmVjdG9yMilcbiAgICAgICAgICAgIHJldHVybiBuZXcgVmVjdG9yMihcbiAgICAgICAgICAgICAgICB0aGlzLnggKiB2ZWN0b3IueCxcbiAgICAgICAgICAgICAgICB0aGlzLnkgKiB2ZWN0b3IueVxuICAgICAgICAgICAgKTtcblxuICAgICAgICByZXR1cm4gbmV3IFZlY3RvcjIoXG4gICAgICAgICAgICB0aGlzLnggKiB2ZWN0b3IsXG4gICAgICAgICAgICB0aGlzLnkgKiAoeSA/PyB2ZWN0b3IpXG4gICAgICAgICk7XG4gICAgfVxuXG4gICAgZGl2aWRlKHg6IG51bWJlcik6IFZlY3RvcjI7XG4gICAgZGl2aWRlKHg6IG51bWJlciwgeTogbnVtYmVyKTogVmVjdG9yMjtcbiAgICBkaXZpZGUodmVjdG9yOiBWZWN0b3IyKTogVmVjdG9yMjtcbiAgICBkaXZpZGUodmVjdG9yOiBudW1iZXIgfCBWZWN0b3IyLCB5PzogbnVtYmVyKSB7XG4gICAgICAgIGlmICh2ZWN0b3IgaW5zdGFuY2VvZiBWZWN0b3IyKVxuICAgICAgICAgICAgcmV0dXJuIG5ldyBWZWN0b3IyKFxuICAgICAgICAgICAgICAgIHRoaXMueCAvIHZlY3Rvci54LFxuICAgICAgICAgICAgICAgIHRoaXMueSAvIHZlY3Rvci55XG4gICAgICAgICAgICApO1xuXG4gICAgICAgIHJldHVybiBuZXcgVmVjdG9yMihcbiAgICAgICAgICAgIHRoaXMueCAvIHZlY3RvcixcbiAgICAgICAgICAgIHRoaXMueSAvICh5ID8/IHZlY3RvcilcbiAgICAgICAgKTtcbiAgICB9XG5cbiAgICBhZGQoeDogbnVtYmVyKTogVmVjdG9yMjtcbiAgICBhZGQoeDogbnVtYmVyLCB5OiBudW1iZXIpOiBWZWN0b3IyO1xuICAgIGFkZCh2ZWN0b3I6IFZlY3RvcjIpOiBWZWN0b3IyO1xuICAgIGFkZCh2ZWN0b3I6IG51bWJlciB8IFZlY3RvcjIsIHk/OiBudW1iZXIpIHtcbiAgICAgICAgaWYgKHZlY3RvciBpbnN0YW5jZW9mIFZlY3RvcjIpXG4gICAgICAgICAgICByZXR1cm4gbmV3IFZlY3RvcjIoXG4gICAgICAgICAgICAgICAgdGhpcy54ICsgdmVjdG9yLngsXG4gICAgICAgICAgICAgICAgdGhpcy55ICsgdmVjdG9yLnlcbiAgICAgICAgICAgICk7XG5cbiAgICAgICAgcmV0dXJuIG5ldyBWZWN0b3IyKFxuICAgICAgICAgICAgdGhpcy54ICsgdmVjdG9yLFxuICAgICAgICAgICAgdGhpcy55ICsgKHkgPz8gdmVjdG9yKVxuICAgICAgICApO1xuICAgIH1cblxuICAgIG1pbnVzKHg6IG51bWJlcik6IFZlY3RvcjI7XG4gICAgbWludXMoeDogbnVtYmVyLCB5OiBudW1iZXIpOiBWZWN0b3IyO1xuICAgIG1pbnVzKHZlY3RvcjogVmVjdG9yMik6IFZlY3RvcjI7XG4gICAgbWludXModmVjdG9yOiBudW1iZXIgfCBWZWN0b3IyLCB5PzogbnVtYmVyKSB7XG4gICAgICAgIGlmICh2ZWN0b3IgaW5zdGFuY2VvZiBWZWN0b3IyKVxuICAgICAgICAgICAgcmV0dXJuIG5ldyBWZWN0b3IyKFxuICAgICAgICAgICAgICAgIHRoaXMueCAtIHZlY3Rvci54LFxuICAgICAgICAgICAgICAgIHRoaXMueSAtIHZlY3Rvci55XG4gICAgICAgICAgICApO1xuXG4gICAgICAgIHJldHVybiBuZXcgVmVjdG9yMihcbiAgICAgICAgICAgIHRoaXMueCAtIHZlY3RvcixcbiAgICAgICAgICAgIHRoaXMueSAtICh5ID8/IHZlY3RvcilcbiAgICAgICAgKTtcbiAgICB9XG5cbiAgICBzdGF0aWMgZnJvbUFuZ2xlKGFuZ2xlOiBudW1iZXIpIHtcbiAgICAgICAgY29uc3QgcmFkaWFucyA9IGFuZ2xlICogREVHUkVFX1RPX1JBRElBTDtcbiAgICAgICAgcmV0dXJuIG5ldyBWZWN0b3IyKFxuICAgICAgICAgICAgTWF0aC5zaW4ocmFkaWFucyksXG4gICAgICAgICAgICAtTWF0aC5jb3MocmFkaWFucylcbiAgICAgICAgKTtcbiAgICB9XG5cbiAgICBjb3B5KCkge1xuICAgICAgICByZXR1cm4gbmV3IFZlY3RvcjIoXG4gICAgICAgICAgICB0aGlzLngsXG4gICAgICAgICAgICB0aGlzLnlcbiAgICAgICAgKTtcbiAgICB9XG5cbiAgICB0b1N0cmluZygpIHtcbiAgICAgICAgcmV0dXJuIGAoJHtNYXRoLnJvdW5kKHRoaXMueCAqIDEwMCkgLyAxMDB9LCAke01hdGgucm91bmQodGhpcy55ICogMTAwKSAvIDEwMH0pYDtcbiAgICB9XG59IiwgImltcG9ydCB7IFZlY3RvcjIgfSBmcm9tICdFbmdpbmUnO1xuaW1wb3J0IHsgUG9pbnQyZElucHV0UGFyYW1zIH0gZnJvbSAndHdlYWtwYW5lJztcbmltcG9ydCB7IFNoYXBlIH0gZnJvbSAnLic7XG5pbXBvcnQgSUJvdW5kcyBmcm9tICcuL0lCb3VuZHMnO1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBDb252ZXggaW1wbGVtZW50cyBJQm91bmRzIHtcblxuICAgIHByaXZhdGUgX2NvbXBsZXg6IFZlY3RvcjJbXTtcbiAgICBwcml2YXRlIF9ib3VuZHM6IFZlY3RvcjJbXTtcblxuICAgIHB1YmxpYyBnZXQgY29tcGxleCgpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX2NvbXBsZXg7XG4gICAgfVxuXG4gICAgcHVibGljIGdldCBib3goKSB7XG4gICAgICAgIHJldHVybiB0aGlzLl9ib3VuZHM7XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBjb25zdHJ1Y3Rvcihwb2ludHM6IFZlY3RvcjJbXSkge1xuICAgICAgICB0aGlzLl9jb21wbGV4ID0gdGhpcy5nZW5lcmF0ZUNvbnZleChwb2ludHMpO1xuICAgICAgICB0aGlzLl9ib3VuZHMgPSB0aGlzLmdldEJvdW5kcyh0aGlzLmNvbXBsZXgpO1xuICAgIH1cblxuICAgIHN0YXRpYyBmcm9tUG9pbnRzKHBvaW50czogVmVjdG9yMltdKSB7XG4gICAgICAgIHJldHVybiBuZXcgdGhpcyhwb2ludHMpO1xuICAgIH1cblxuICAgIHN0YXRpYyBmcm9tU2hhcGVzKHNoYXBlczogU2hhcGVbXSwgb3B0aW9ucz86IHsgY2lyY2xlUmVzb2x1dGlvbjogbnVtYmVyOyB9KSB7XG4gICAgICAgIGNvbnN0IHBvaW50cyA9IENvbnZleC5jb252ZXJ0U2hhcGVzVG9Qb2ludHMoc2hhcGVzLCBvcHRpb25zKTtcblxuICAgICAgICByZXR1cm4gbmV3IENvbnZleChwb2ludHMpO1xuICAgIH1cblxuICAgIHB1YmxpYyBzdGF0aWMgY29udmVydFNoYXBlc1RvUG9pbnRzKHNoYXBlczogU2hhcGVbXSwgb3B0aW9ucz86IHsgY2lyY2xlUmVzb2x1dGlvbjogbnVtYmVyOyB9KSB7XG4gICAgICAgIGNvbnN0IHBvaW50czogVmVjdG9yMltdID0gW107XG5cbiAgICAgICAgY29uc3QgY2lyY2xlUmVzb2x1dGlvbiA9IG9wdGlvbnM/LmNpcmNsZVJlc29sdXRpb24gPz8gMTtcblxuICAgICAgICBmb3IgKGNvbnN0IHNoYXBlIG9mIHNoYXBlcykge1xuICAgICAgICAgICAgc3dpdGNoIChzaGFwZS50eXBlKSB7XG4gICAgICAgICAgICAgICAgY2FzZSBcImJveFwiOlxuICAgICAgICAgICAgICAgICAgICBjb25zdCB3aWR0aCA9IHR5cGVvZiBzaGFwZS5zaXplID09IFwibnVtYmVyXCIgPyBzaGFwZS5zaXplIDogc2hhcGUuc2l6ZT8ueCA/PyAxNjtcbiAgICAgICAgICAgICAgICAgICAgY29uc3QgaGVpZ2h0ID0gdHlwZW9mIHNoYXBlLnNpemUgPT0gXCJudW1iZXJcIiA/IHNoYXBlLnNpemUgOiBzaGFwZS5zaXplPy55ID8/IDE2O1xuICAgICAgICAgICAgICAgICAgICBjb25zdCBvZmZzZXQgPSBzaGFwZS5vZmZzZXQucm90YXRlKHNoYXBlLnJvdGF0aW9uKTtcbiAgICAgICAgICAgICAgICAgICAgcG9pbnRzLnB1c2goXG4gICAgICAgICAgICAgICAgICAgICAgICBvZmZzZXQubWludXMoLXdpZHRoIC8gMiwgLWhlaWdodCAvIDIpLnJvdGF0ZSgtc2hhcGUucm90YXRpb24pLFxuICAgICAgICAgICAgICAgICAgICAgICAgb2Zmc2V0Lm1pbnVzKC13aWR0aCAvIDIsIGhlaWdodCAvIDIpLnJvdGF0ZSgtc2hhcGUucm90YXRpb24pLFxuICAgICAgICAgICAgICAgICAgICAgICAgb2Zmc2V0Lm1pbnVzKHdpZHRoIC8gMiwgaGVpZ2h0IC8gMikucm90YXRlKC1zaGFwZS5yb3RhdGlvbiksXG4gICAgICAgICAgICAgICAgICAgICAgICBvZmZzZXQubWludXMod2lkdGggLyAyLCAtaGVpZ2h0IC8gMikucm90YXRlKC1zaGFwZS5yb3RhdGlvbilcbiAgICAgICAgICAgICAgICAgICAgKTtcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG5cbiAgICAgICAgICAgICAgICBjYXNlIFwicG9seWdvblwiOlxuICAgICAgICAgICAgICAgICAgICBwb2ludHMucHVzaCguLi5zaGFwZS5pbmRpY2VzLm1hcCh4ID0+IHguYWRkKHNoYXBlLm9mZnNldCkpKTtcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgY2FzZSBcImNpcmNsZVwiOlxuICAgICAgICAgICAgICAgICAgICBjb25zdCBzdGFydCA9IHNoYXBlLmFyYz8uWzBdID8/IDA7XG4gICAgICAgICAgICAgICAgICAgIGNvbnN0IGVuZCA9IHNoYXBlLmFyYz8uWzFdID8/IDM2MDtcbiAgICAgICAgICAgICAgICAgICAgY29uc3QgZGlzdGFuY2UgPSAzNjAgLyAoY2lyY2xlUmVzb2x1dGlvbiAqIHNoYXBlLnNpemUpO1xuICAgICAgICAgICAgICAgICAgICBjb25zdCBwYXJ0cyA9IChlbmQgLSBzdGFydCkgLyBkaXN0YW5jZTtcbiAgICAgICAgICAgICAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPD0gcGFydHM7IGkrKykge1xuICAgICAgICAgICAgICAgICAgICAgICAgcG9pbnRzLnB1c2goXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgc2hhcGUub2Zmc2V0XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vIGNhbnZhcyBhcGkgYXJjcyBhcmUgYmFzZWQgb24gdGhlIHBvc2l0aXZlIHggYXhpcyBzbyBJIHVzZWQgVmVjdG9yMi5yaWdodCAoMSwgMCkgaGVyZVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAuYWRkKFZlY3RvcjIucmlnaHQubXVsdGlwbHkoc2hhcGUuc2l6ZSAvIDIpXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAucm90YXRlKHNoYXBlLnJvdGF0aW9uICsgKGRpc3RhbmNlICogaSArIHN0YXJ0KSlcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgKVxuICAgICAgICAgICAgICAgICAgICAgICAgKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gcG9pbnRzO1xuICAgIH1cblxuICAgIHByaXZhdGUgZ2V0UGl2b3RQb2ludChwb2ludHM6IFZlY3RvcjJbXSkge1xuICAgICAgICBsZXQgcGl2b3QgPSBwb2ludHNbMF07XG5cbiAgICAgICAgZm9yIChjb25zdCBwb2ludCBvZiBwb2ludHMpIHtcbiAgICAgICAgICAgIGlmIChwb2ludHMuaW5kZXhPZihwb2ludCkgPT0gMClcbiAgICAgICAgICAgICAgICBjb250aW51ZTtcblxuICAgICAgICAgICAgaWYgKHBvaW50LnkgPD0gcGl2b3QueSAmJiBwb2ludC54IDwgcGl2b3QueCkge1xuICAgICAgICAgICAgICAgIHBpdm90ID0gcG9pbnQ7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4gcGl2b3Q7XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBnZXRCb3VuZHMocG9pbnRzOiBWZWN0b3IyW10pIHtcbiAgICAgICAgbGV0IG5vcnRoV2VzdCA9IG5ldyBWZWN0b3IyKCk7XG4gICAgICAgIGxldCBzb3V0aEVhc3QgPSBuZXcgVmVjdG9yMigpO1xuXG4gICAgICAgIGZvciAoY29uc3QgcG9pbnQgb2YgcG9pbnRzKSB7XG4gICAgICAgICAgICBpZiAocG9pbnQueCA+PSBzb3V0aEVhc3QueClcbiAgICAgICAgICAgICAgICBzb3V0aEVhc3QueCA9IHBvaW50Lng7XG5cbiAgICAgICAgICAgIGlmIChwb2ludC55ID49IHNvdXRoRWFzdC55KVxuICAgICAgICAgICAgICAgIHNvdXRoRWFzdC55ID0gcG9pbnQueTtcblxuICAgICAgICAgICAgaWYgKHBvaW50LnggPD0gbm9ydGhXZXN0LngpXG4gICAgICAgICAgICAgICAgbm9ydGhXZXN0LnggPSBwb2ludC54O1xuXG4gICAgICAgICAgICBpZiAocG9pbnQueSA8PSBub3J0aFdlc3QueSlcbiAgICAgICAgICAgICAgICBub3J0aFdlc3QueSA9IHBvaW50Lnk7XG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4gW25vcnRoV2VzdCwgbmV3IFZlY3RvcjIobm9ydGhXZXN0LngsIHNvdXRoRWFzdC55KSwgc291dGhFYXN0LCBuZXcgVmVjdG9yMihzb3V0aEVhc3QueCwgbm9ydGhXZXN0LnkpXTtcbiAgICB9XG5cbiAgICBwcml2YXRlIGdldE9yaWVudGF0aW9uKGE6IFZlY3RvcjIsIGI6IFZlY3RvcjIsIGM6IFZlY3RvcjIpIHtcbiAgICAgICAgcmV0dXJuIChiLnkgLSBhLnkpICpcbiAgICAgICAgICAgIChjLnggLSBiLngpIC1cbiAgICAgICAgICAgIChjLnkgLSBiLnkpICpcbiAgICAgICAgICAgIChiLnggLSBhLngpO1xuICAgIH1cblxuICAgIHByaXZhdGUgZ2VuZXJhdGVDb252ZXgocG9pbnRzOiBWZWN0b3IyW10pIHtcbiAgICAgICAgY29uc3QgcGl2b3QgPSB0aGlzLmdldFBpdm90UG9pbnQocG9pbnRzKTtcblxuICAgICAgICBjb25zdCBpbmRpY2VzID0gcG9pbnRzLm1hcCgoXywgaSkgPT4gaSk7XG4gICAgICAgIGNvbnN0IGFuZ2xlcyA9IHBvaW50cy5tYXAoeCA9PiBwaXZvdC5hbmdsZSh4KSk7XG4gICAgICAgIGNvbnN0IGRpc3RhbmNlcyA9IHBvaW50cy5tYXAoeCA9PiBwaXZvdC5kaXN0YW5jZSh4KSk7XG5cbiAgICAgICAgaW5kaWNlcy5zb3J0KChhOiBudW1iZXIsIGI6IG51bWJlcikgPT4ge1xuICAgICAgICAgICAgY29uc3QgYW5nbGVBID0gYW5nbGVzW2FdO1xuICAgICAgICAgICAgY29uc3QgYW5nbGVCID0gYW5nbGVzW2JdO1xuXG4gICAgICAgICAgICBpZiAoYW5nbGVBID09PSBhbmdsZUIpXG4gICAgICAgICAgICAgICAgcmV0dXJuIGRpc3RhbmNlc1thXSAtIGRpc3RhbmNlc1tiXTtcblxuICAgICAgICAgICAgcmV0dXJuIGFuZ2xlQSAtIGFuZ2xlQjtcbiAgICAgICAgfSk7XG5cbiAgICAgICAgZm9yIChsZXQgaSA9IDE7IGkgPCBpbmRpY2VzLmxlbmd0aCAtIDE7IGkrKykge1xuICAgICAgICAgICAgaWYgKGFuZ2xlc1tpbmRpY2VzW2ldXSA9PT0gYW5nbGVzW2luZGljZXNbaSArIDFdXSlcbiAgICAgICAgICAgICAgICBpbmRpY2VzW2ldID0gLTE7XG4gICAgICAgIH1cblxuICAgICAgICBjb25zdCBodWxsOiBWZWN0b3IyW10gPSBbXTtcbiAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBpbmRpY2VzLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgICBjb25zdCBwb2ludCA9IHBvaW50c1tpbmRpY2VzW2ldXTtcbiAgICAgICAgICAgIGlmIChpbmRpY2VzW2ldID09PSAtMSlcbiAgICAgICAgICAgICAgICBjb250aW51ZTtcblxuICAgICAgICAgICAgaWYgKGh1bGwubGVuZ3RoIDwgMykge1xuICAgICAgICAgICAgICAgIGh1bGwucHVzaChwb2ludCk7XG4gICAgICAgICAgICAgICAgY29udGludWU7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIHdoaWxlICh0aGlzLmdldE9yaWVudGF0aW9uKGh1bGwuYXQoLTIpISwgaHVsbC5hdCgtMSkhLCBwb2ludCkgPiAwKVxuICAgICAgICAgICAgICAgIGh1bGwucG9wKCk7XG4gICAgICAgICAgICBodWxsLnB1c2gocG9pbnQpO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKGh1bGwubGVuZ3RoIDwgMylcbiAgICAgICAgICAgIHJldHVybiBbXTtcblxuICAgICAgICByZXR1cm4gaHVsbDtcbiAgICB9XG59IiwgImltcG9ydCBHYW1lLCB7IEVudGl0eSB9IGZyb20gJ0VuZ2luZSc7XG5pbXBvcnQgQ29sb3IgZnJvbSAnQC9SZW5kZXJlci9Db2xvcic7XG5pbXBvcnQgVmVjdG9yMiBmcm9tICdAL0RhdGEvVmVjdG9yMic7XG5pbXBvcnQgeyBTaGFwZSB9IGZyb20gJ0AvUmVuZGVyZXInO1xuaW1wb3J0IFJlbmRlckNvbXBvbmVudCBmcm9tICcuL1JlbmRlckNvbXBvbmVudCc7XG5pbXBvcnQgQ29udmV4IGZyb20gJ0AvUmVuZGVyZXIvQ29udmV4JztcbmltcG9ydCBJQm91bmRzIGZyb20gJ0AvUmVuZGVyZXIvSUJvdW5kcyc7XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIFNoYXBlUmVuZGVyZXJDb21wb25lbnQgZXh0ZW5kcyBSZW5kZXJDb21wb25lbnQge1xuICAgIG92ZXJyaWRlIGRlZmF1bHRzID0ge1xuICAgICAgICBzaGFwZXM6IFtcbiAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICB0eXBlOiBcImNpcmNsZVwiLFxuICAgICAgICAgICAgICAgIG9mZnNldDogVmVjdG9yMi56ZXJvLFxuICAgICAgICAgICAgICAgIHJvdGF0aW9uOiAwLFxuICAgICAgICAgICAgICAgIGNvbG9yOiBDb2xvci5yYW5kb20oKSxcbiAgICAgICAgICAgICAgICBzaXplOiAxNlxuICAgICAgICAgICAgfVxuICAgICAgICBdIGFzIFNoYXBlW11cbiAgICB9O1xuXG4gICAgb3ZlcnJpZGUgZ2V0Qm91bmRzKGF0dHJpYnV0ZXM6IHRoaXNbJ2RlZmF1bHRzJ10pOiBJQm91bmRzIHtcbiAgICAgICAgcmV0dXJuIENvbnZleC5mcm9tU2hhcGVzKGF0dHJpYnV0ZXMuc2hhcGVzKTtcbiAgICB9XG5cbiAgICBvdmVycmlkZSByZW5kZXIoYXR0cmlidXRlczogdGhpc1tcImRlZmF1bHRzXCJdLCBlbnRpdHk6IEVudGl0eSk6IHZvaWQge1xuICAgICAgICBmb3IgKGNvbnN0IHNoYXBlIG9mIGF0dHJpYnV0ZXMuc2hhcGVzKSB7XG4gICAgICAgICAgICBHYW1lLmNhbnZhcy5kcmF3U2hhcGUoZW50aXR5LnRyYW5zZm9ybS5wb3NpdGlvbiwgZW50aXR5LnRyYW5zZm9ybS5yb3RhdGlvbiwgc2hhcGUpO1xuICAgICAgICB9XG5cbiAgICAgICAgc3VwZXIucmVuZGVyKGF0dHJpYnV0ZXMsIGVudGl0eSk7XG4gICAgfVxufSIsICJpbXBvcnQgQ29tcG9uZW50IGZyb20gJ0AvRGF0YS9Db21wb25lbnQnO1xuaW1wb3J0IFZlY3RvcjIgZnJvbSAnQC9EYXRhL1ZlY3RvcjInO1xuaW1wb3J0IHsgQ2FtZXJhIH0gZnJvbSAnQC9SZW5kZXJlcic7XG5pbXBvcnQgR2FtZSwgeyBDb2xvciwgRW50aXR5IH0gZnJvbSAnRW5naW5lJztcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgVHJhbnNmb3JtQ29tcG9uZW50IGV4dGVuZHMgQ29tcG9uZW50IHtcbiAgICBvdmVycmlkZSBkZWZhdWx0cyA9IHtcbiAgICAgICAgcG9zaXRpb246IFZlY3RvcjIuemVybyxcbiAgICAgICAgcm90YXRpb246IDBcbiAgICB9O1xuXG4gICAgb3ZlcnJpZGUgdXBkYXRlKGF0dHJpYnV0ZXM6IHRoaXNbJ2RlZmF1bHRzJ10sIGVudGl0eTogRW50aXR5KTogdm9pZCB7XG4gICAgICAgIEdhbWUuc3BhdGlhbE1hcC5zZXQoZW50aXR5KTtcbiAgICB9XG59IiwgImltcG9ydCBDb21wb25lbnQgZnJvbSAnQC9EYXRhL0NvbXBvbmVudCc7XG5pbXBvcnQgVmVjdG9yMiBmcm9tICdAL0RhdGEvVmVjdG9yMic7XG5pbXBvcnQgR2FtZSwgeyBDb2xvciwgRW50aXR5IH0gZnJvbSAnRW5naW5lJztcbmltcG9ydCBTaGFwZVJlbmRlcmVyQ29tcG9uZW50IGZyb20gJy4vU2hhcGVSZW5kZXJlckNvbXBvbmVudCc7XG5pbXBvcnQgVHJhbnNmb3JtQ29tcG9uZW50IGZyb20gJy4vVHJhbnNmb3JtQ29tcG9uZW50JztcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgUmlnaWRib2R5Q29tcG9uZW50IGV4dGVuZHMgQ29tcG9uZW50IHtcbiAgICBvdmVycmlkZSBkZXBlbmRlbmNpZXMgPSBbVHJhbnNmb3JtQ29tcG9uZW50XTtcbiAgICBvdmVycmlkZSBkZWZhdWx0cyA9IHtcbiAgICAgICAgdmVsb2NpdHk6IG5ldyBWZWN0b3IyKCksXG4gICAgICAgIGZyaWN0aW9uOiAwLjIsXG4gICAgICAgIGFjY2VsZXJhdGlvbjogMC44XG4gICAgfTtcblxuICAgIG92ZXJyaWRlIHN0YXJ0KCk6IHZvaWQgeyB9XG5cbiAgICBvdmVycmlkZSBkZXN0cm95KCk6IHZvaWQgeyB9XG5cbiAgICBvdmVycmlkZSB1cGRhdGUoYXR0cmlidXRlczogdGhpc1tcImRlZmF1bHRzXCJdLCBlbnRpdHk6IEVudGl0eSk6IHZvaWQge1xuICAgICAgICBsZXQgeyBmcmljdGlvbiwgYWNjZWxlcmF0aW9uIH0gPSBhdHRyaWJ1dGVzO1xuXG4gICAgICAgIGF0dHJpYnV0ZXMudmVsb2NpdHkgPSBhdHRyaWJ1dGVzLnZlbG9jaXR5LmxlcnAoVmVjdG9yMi56ZXJvLCBmcmljdGlvbik7XG5cbiAgICAgICAgaWYgKGF0dHJpYnV0ZXMudmVsb2NpdHkubGVuZ3RoID4gZnJpY3Rpb24pXG4gICAgICAgICAgICBlbnRpdHkudHJhbnNmb3JtLnBvc2l0aW9uID0gZW50aXR5LnRyYW5zZm9ybS5wb3NpdGlvbi5sZXJwKGVudGl0eS50cmFuc2Zvcm0ucG9zaXRpb24uYWRkKGF0dHJpYnV0ZXMudmVsb2NpdHkpLCBhY2NlbGVyYXRpb24pO1xuXG4gICAgICAgIGlmIChHYW1lLmRlYnVnKSB7XG4gICAgICAgICAgICBHYW1lLmNhbnZhcy52ZWN0b3IoZW50aXR5LnRyYW5zZm9ybS5wb3NpdGlvbiwgZW50aXR5LnRyYW5zZm9ybS5yb3RhdGlvbiwgYXR0cmlidXRlcy52ZWxvY2l0eS5tdWx0aXBseSgyNSksIENvbG9yLmdyZWVuKTtcbiAgICAgICAgfVxuICAgIH1cbn0iLCAiZXhwb3J0IGludGVyZmFjZSBUaWxlIHtcbiAgICBuYW1lPzogc3RyaW5nO1xuICAgIHg6IG51bWJlcjtcbiAgICB5OiBudW1iZXI7XG5cbiAgICB3aWR0aDogbnVtYmVyLFxuICAgIGhlaWdodDogbnVtYmVyO1xufTtcblxudHlwZSBUaWxlTWFwT3B0aW9ucyA9IHtcbiAgICByb3dzOiBudW1iZXI7XG4gICAgY29sdW1uczogbnVtYmVyO1xuICAgIHRpbGVXaWR0aDogbnVtYmVyO1xuICAgIHRpbGVIZWlnaHQ6IG51bWJlcjtcbn07XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIFRpbGVNYXAge1xuICAgIHByaXZhdGUgX2ltYWdlOiBIVE1MSW1hZ2VFbGVtZW50IHwgbnVsbDtcbiAgICBwcml2YXRlIHRpbGVzOiBUaWxlW107XG4gICAgcHVibGljIG1hZ25pdHVkZTogbnVtYmVyID0gMTtcblxuICAgIHB1YmxpYyBzdGF0aWMgZ2V0IGVtcHR5KCkge1xuICAgICAgICByZXR1cm4gbmV3IFRpbGVNYXAobnVsbCwgW10pO1xuICAgIH1cblxuICAgIHB1YmxpYyBnZXQgaW1hZ2UoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLl9pbWFnZTtcbiAgICB9XG5cbiAgICBwcml2YXRlIGNvbnN0cnVjdG9yKGltYWdlOiBIVE1MSW1hZ2VFbGVtZW50IHwgbnVsbCwgdGlsZXM6IFRpbGVbXSkge1xuICAgICAgICB0aGlzLl9pbWFnZSA9IGltYWdlO1xuICAgICAgICB0aGlzLnRpbGVzID0gdGlsZXM7XG4gICAgfVxuXG4gICAgcHVibGljIGdldFRpbGUobmFtZTogc3RyaW5nKTogVGlsZTtcbiAgICBwdWJsaWMgZ2V0VGlsZShpbmRleDogbnVtYmVyKTogVGlsZTtcbiAgICBwdWJsaWMgZ2V0VGlsZShpbmRleDogbnVtYmVyIHwgc3RyaW5nKTogVGlsZTtcbiAgICBwdWJsaWMgZ2V0VGlsZShpbmRleDogc3RyaW5nIHwgbnVtYmVyKSB7XG4gICAgICAgIGlmICh0eXBlb2YgaW5kZXggPT09IFwibnVtYmVyXCIpIHtcbiAgICAgICAgICAgIHJldHVybiB0aGlzLnRpbGVzW2luZGV4XTtcbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiB0aGlzLnRpbGVzLmZpbmQoeCA9PiB4Lm5hbWUgPT0gaW5kZXgpO1xuICAgIH1cblxuICAgIHByaXZhdGUgc3RhdGljIGxvYWRJbWFnZSh1cmw6IHN0cmluZykge1xuICAgICAgICByZXR1cm4gbmV3IFByb21pc2U8SFRNTEltYWdlRWxlbWVudD4oKHJlc29sdmUsIHJlamVjdCkgPT4ge1xuICAgICAgICAgICAgY29uc3QgaW1hZ2UgPSBuZXcgSW1hZ2UoKTtcblxuICAgICAgICAgICAgaW1hZ2UuYWRkRXZlbnRMaXN0ZW5lcihcImVycm9yXCIsICgpID0+IHJlamVjdChgQ291bGQgbm90IGZpbmQgJHt1cmx9YCkpO1xuICAgICAgICAgICAgaW1hZ2UuYWRkRXZlbnRMaXN0ZW5lcihcImxvYWRcIiwgKCkgPT4gcmVzb2x2ZShpbWFnZSkpO1xuICAgICAgICAgICAgaW1hZ2Uuc3JjID0gdXJsO1xuICAgICAgICB9KTtcbiAgICB9XG5cbiAgICBzdGF0aWMgYXN5bmMgbG9hZCh1cmw6IHN0cmluZywgb3B0aW9uczogUGFydGlhbDxUaWxlTWFwT3B0aW9ucz4gfCBUaWxlW10pIHtcbiAgICAgICAgY29uc3QgaW1hZ2UgPSBhd2FpdCB0aGlzLmxvYWRJbWFnZSh1cmwpO1xuXG4gICAgICAgIGlmIChBcnJheS5pc0FycmF5KG9wdGlvbnMpKVxuICAgICAgICAgICAgcmV0dXJuIG5ldyBUaWxlTWFwKGltYWdlLCBvcHRpb25zKTtcblxuICAgICAgICBjb25zdCB0aWxlczogVGlsZVtdID0gW107XG5cbiAgICAgICAgaWYgKCFvcHRpb25zLnJvd3MgJiYgIW9wdGlvbnMudGlsZUhlaWdodClcbiAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcihgWW91IG5lZWQgdG8gc3VwcGx5IGVpdGhlciByb3dzIG9yIHRpbGVIZWlnaHRgKTtcblxuICAgICAgICBpZiAoIW9wdGlvbnMuY29sdW1ucyAmJiAhb3B0aW9ucy50aWxlV2lkdGgpXG4gICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoYFlvdSBuZWVkIHRvIHN1cHBseSBlaXRoZXIgcm93cyBvciB0aWxlSGVpZ2h0YCk7XG5cbiAgICAgICAgY29uc3Qgc2V0dGluZ3MgPSB7XG4gICAgICAgICAgICByb3dzOiBvcHRpb25zLnJvd3MgPz8gaW1hZ2UubmF0dXJhbFdpZHRoIC8gb3B0aW9ucy50aWxlV2lkdGghLFxuICAgICAgICAgICAgY29sdW1uczogb3B0aW9ucy5jb2x1bW5zID8/IGltYWdlLm5hdHVyYWxIZWlnaHQgLyBvcHRpb25zLnRpbGVIZWlnaHQhLFxuXG4gICAgICAgICAgICB3aWR0aDogb3B0aW9ucy50aWxlV2lkdGgsXG4gICAgICAgICAgICBoZWlnaHQ6IG9wdGlvbnMudGlsZUhlaWdodCxcbiAgICAgICAgfTtcblxuICAgICAgICBzZXR0aW5ncy53aWR0aCA/Pz0gaW1hZ2UubmF0dXJhbFdpZHRoIC8gc2V0dGluZ3MuY29sdW1ucztcbiAgICAgICAgc2V0dGluZ3MuaGVpZ2h0ID8/PSBpbWFnZS5uYXR1cmFsSGVpZ2h0IC8gc2V0dGluZ3Mucm93cztcblxuICAgICAgICBmb3IgKGxldCB5ID0gMDsgeSA8IHNldHRpbmdzLmNvbHVtbnM7IHkrKykge1xuICAgICAgICAgICAgZm9yIChsZXQgeCA9IDA7IHggPCBzZXR0aW5ncy5yb3dzOyB4KyspIHtcblxuICAgICAgICAgICAgICAgIHRpbGVzLnB1c2goe1xuICAgICAgICAgICAgICAgICAgICB3aWR0aDogc2V0dGluZ3Mud2lkdGgsXG4gICAgICAgICAgICAgICAgICAgIGhlaWdodDogc2V0dGluZ3MuaGVpZ2h0LFxuICAgICAgICAgICAgICAgICAgICB4OiB4ICogc2V0dGluZ3Mud2lkdGgsXG4gICAgICAgICAgICAgICAgICAgIHk6IHkgKiBzZXR0aW5ncy5oZWlnaHRcbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiBuZXcgVGlsZU1hcChpbWFnZSwgdGlsZXMpO1xuICAgIH1cblxuICAgIHByaXZhdGUgY29weSgpIHtcbiAgICAgICAgcmV0dXJuIHRoaXM7XG4gICAgfVxufSIsICJpbXBvcnQgVGlsZU1hcCwgeyBUaWxlIH0gZnJvbSAnQC9Bc3NldHMvVGlsZW1hcCc7XG5pbXBvcnQgQ29tcG9uZW50IGZyb20gJ0AvRGF0YS9Db21wb25lbnQnO1xuaW1wb3J0IFZlY3RvcjIgZnJvbSAnQC9EYXRhL1ZlY3RvcjInO1xuaW1wb3J0IElCb3VuZHMgZnJvbSAnQC9SZW5kZXJlci9JQm91bmRzJztcbmltcG9ydCBHYW1lLCB7IEVudGl0eSB9IGZyb20gJ0VuZ2luZSc7XG5pbXBvcnQgUmVuZGVyQ29tcG9uZW50IGZyb20gJy4vUmVuZGVyQ29tcG9uZW50JztcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgVGlsZVJlbmRlcmVyQ29tcG9uZW50IGV4dGVuZHMgUmVuZGVyQ29tcG9uZW50IHtcblxuICAgIG92ZXJyaWRlIGRlZmF1bHRzOiB7XG4gICAgICAgIHRpbGVNYXA6IFRpbGVNYXAsXG4gICAgICAgIHNjYWxlOiBudW1iZXIsXG4gICAgICAgIHRpbGU6IG51bWJlciB8IG51bWJlcltdLFxuICAgICAgICBmcmFtZXJhdGU6IG51bWJlcjtcbiAgICB9ID0ge1xuICAgICAgICAgICAgdGlsZU1hcDogVGlsZU1hcC5lbXB0eSxcbiAgICAgICAgICAgIHNjYWxlOiAxLFxuICAgICAgICAgICAgdGlsZTogMCxcbiAgICAgICAgICAgIGZyYW1lcmF0ZTogNVxuICAgICAgICB9O1xuXG4gICAgb3ZlcnJpZGUgZ2V0Qm91bmRzKGF0dHJpYnV0ZXM6IHRoaXNbJ2RlZmF1bHRzJ10pOiBJQm91bmRzIHtcbiAgICAgICAgY29uc3QgeyB0aWxlLCB0aWxlTWFwLCBmcmFtZXJhdGUgfSA9IGF0dHJpYnV0ZXM7XG5cbiAgICAgICAgbGV0IGN1cnJlbnRUaWxlOiBUaWxlIHwgdW5kZWZpbmVkID0gdW5kZWZpbmVkO1xuICAgICAgICBpZiAoQXJyYXkuaXNBcnJheSh0aWxlKSlcbiAgICAgICAgICAgIGN1cnJlbnRUaWxlID0gdGlsZU1hcC5nZXRUaWxlKHRpbGVbTWF0aC5yb3VuZChHYW1lLnRpbWUgLyBmcmFtZXJhdGUpICUgdGlsZS5sZW5ndGhdKTtcbiAgICAgICAgZWxzZSBjdXJyZW50VGlsZSA9IGF0dHJpYnV0ZXMudGlsZU1hcC5nZXRUaWxlKHRpbGUpO1xuXG4gICAgICAgIGNvbnN0IGhhbGZXaWR0aCA9IG5ldyBWZWN0b3IyKGN1cnJlbnRUaWxlLndpZHRoIC8gMiwgY3VycmVudFRpbGUuaGVpZ2h0IC8gMik7XG4gICAgICAgIGNvbnN0IGJvdW5kcyA9IFtcbiAgICAgICAgICAgIG5ldyBWZWN0b3IyKC1oYWxmV2lkdGgueCwgLWhhbGZXaWR0aC55KSxcbiAgICAgICAgICAgIG5ldyBWZWN0b3IyKGhhbGZXaWR0aC54LCAtaGFsZldpZHRoLnkpLFxuICAgICAgICAgICAgbmV3IFZlY3RvcjIoaGFsZldpZHRoLngsIGhhbGZXaWR0aC55KSxcbiAgICAgICAgICAgIG5ldyBWZWN0b3IyKC1oYWxmV2lkdGgueCwgaGFsZldpZHRoLnkpXG4gICAgICAgIF07XG4gICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICBib3g6IGJvdW5kcyxcbiAgICAgICAgICAgIGNvbXBsZXg6IGJvdW5kc1xuICAgICAgICB9O1xuICAgIH1cblxuICAgIG92ZXJyaWRlIHN0YXJ0KGRhdGE6IHRoaXNbXCJkZWZhdWx0c1wiXSk6IHZvaWQge1xuICAgICAgICBpZiAoZGF0YS50aWxlTWFwID09IFRpbGVNYXAuZW1wdHkpXG4gICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoXCJQbGVhc2UgYXNzaWduIGEgdGlsZW1hcCB0byB0aGlzIGVudGl0eS5cIik7XG5cbiAgICAgICAgY29uc29sZS5sb2coZGF0YS50aWxlTWFwKTtcbiAgICAgICAgaWYgKGRhdGEuc2NhbGUgIT0gMSlcbiAgICAgICAgICAgIGRhdGEudGlsZU1hcC5tYWduaXR1ZGUgPSBkYXRhLnNjYWxlO1xuXG4gICAgfVxuXG4gICAgb3ZlcnJpZGUgcmVuZGVyKGF0dHJpYnV0ZXM6IHRoaXNbXCJkZWZhdWx0c1wiXSwgZW50aXR5OiBFbnRpdHkpOiB2b2lkIHtcblxuICAgICAgICBjb25zdCB7IHRpbGUsIHRpbGVNYXAsIGZyYW1lcmF0ZSB9ID0gYXR0cmlidXRlcztcblxuICAgICAgICBpZiAoQXJyYXkuaXNBcnJheSh0aWxlKSkge1xuICAgICAgICAgICAgY29uc3QgY3VycmVudFRpbGUgPSB0aWxlTWFwLmdldFRpbGUodGlsZVtNYXRoLnJvdW5kKEdhbWUudGltZSAvIGZyYW1lcmF0ZSkgJSB0aWxlLmxlbmd0aF0pO1xuXG4gICAgICAgICAgICBHYW1lLmNhbnZhcy5kcmF3VGlsZShlbnRpdHkudHJhbnNmb3JtLnBvc2l0aW9uLCBlbnRpdHkudHJhbnNmb3JtLnJvdGF0aW9uLCB0aWxlTWFwLCBjdXJyZW50VGlsZSk7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICB0cnkge1xuICAgICAgICAgICAgICAgIEdhbWUuY2FudmFzLmRyYXdUaWxlKGVudGl0eS50cmFuc2Zvcm0ucG9zaXRpb24sIGVudGl0eS50cmFuc2Zvcm0ucm90YXRpb24sIHRpbGVNYXAsIHRpbGUpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgY2F0Y2gge1xuICAgICAgICAgICAgICAgIGNvbnN0IGN1cnJlbnRUaWxlID0gdGlsZU1hcC5nZXRUaWxlKHRpbGUpO1xuICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKHRpbGUsIHRpbGVNYXAsIGN1cnJlbnRUaWxlKTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICB9XG4gICAgICAgIHN1cGVyLnJlbmRlcihhdHRyaWJ1dGVzLCBlbnRpdHkpO1xuICAgIH1cbn0iLCAiaW1wb3J0IFZlY3RvcjIgZnJvbSAnQC9EYXRhL1ZlY3RvcjInO1xuaW1wb3J0IHsgREVHUkVFX1RPX1JBRElBTCB9IGZyb20gJ0AvSGVscGVycyc7XG5pbXBvcnQgR2FtZSBmcm9tICcuLi9HYW1lJztcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgQ2FtZXJhIHtcbiAgICBzdGF0aWMgcG9zaXRpb24gPSBuZXcgVmVjdG9yMigpO1xuICAgIHN0YXRpYyB6b29tID0gMTtcbiAgICBwcml2YXRlIHN0YXRpYyBfcm90YXRpb24gPSAwO1xuXG4gICAgcHVibGljIHN0YXRpYyBnZXQgcm90YXRpb24oKSB7XG4gICAgICAgIHJldHVybiB0aGlzLl9yb3RhdGlvbjtcbiAgICB9XG5cbiAgICBwdWJsaWMgc3RhdGljIHNldCByb3RhdGlvbih2YWx1ZSkge1xuICAgICAgICBpZiAodGhpcy5fcm90YXRpb24gPT09IHZhbHVlKVxuICAgICAgICAgICAgcmV0dXJuO1xuXG4gICAgICAgIHRoaXMuX3JvdGF0aW9uID0gdmFsdWU7XG4gICAgfVxuXG4gICAgcHVibGljIHN0YXRpYyBnZXQgdXAoKSB7XG4gICAgICAgIHJldHVybiBWZWN0b3IyLmZyb21BbmdsZSgtdGhpcy5yb3RhdGlvbik7XG4gICAgfVxuXG4gICAgcHVibGljIHN0YXRpYyB3b3JsZFRvQ2FtZXJhU3BhY2Uod29ybGRQb3NpdGlvbjogVmVjdG9yMikge1xuICAgICAgICBjb25zdCByb3RhdGlvbiA9ICh0aGlzLnJvdGF0aW9uICUgMzYwKSAqIERFR1JFRV9UT19SQURJQUw7XG5cbiAgICAgICAgY29uc3QgeCA9ICh3b3JsZFBvc2l0aW9uLnggLSB0aGlzLnBvc2l0aW9uLngpO1xuICAgICAgICBjb25zdCB5ID0gKHdvcmxkUG9zaXRpb24ueSAtIHRoaXMucG9zaXRpb24ueSk7XG4gICAgICAgIGNvbnN0IHNpbiA9IE1hdGguc2luKHJvdGF0aW9uKTtcbiAgICAgICAgY29uc3QgY29zID0gTWF0aC5jb3Mocm90YXRpb24pO1xuXG4gICAgICAgIHJldHVybiBuZXcgVmVjdG9yMihcbiAgICAgICAgICAgICh4ICogY29zIC0geSAqIHNpbikgKiB0aGlzLnpvb20gKyBHYW1lLmNhbnZhcy5taWRkbGUueCxcbiAgICAgICAgICAgICh4ICogc2luICsgeSAqIGNvcykgKiB0aGlzLnpvb20gKyBHYW1lLmNhbnZhcy5taWRkbGUueVxuICAgICAgICApO1xuICAgIH1cblxuICAgIHB1YmxpYyBzdGF0aWMgY2FtZXJhVG9Xb3JsZFNwYWNlKGNhbWVyYVBvc2l0aW9uOiBWZWN0b3IyKSB7XG4gICAgICAgIHJldHVybiBjYW1lcmFQb3NpdGlvbi5taW51cyhHYW1lLmNhbnZhcy5taWRkbGUpLmRpdmlkZSh0aGlzLnpvb20pLnJvdGF0ZSgtdGhpcy5yb3RhdGlvbikuYWRkKHRoaXMucG9zaXRpb24pO1xuICAgIH1cbn0iLCAiaW1wb3J0IFRpbGVtYXAsIHsgVGlsZSB9IGZyb20gJ0AvQXNzZXRzL1RpbGVtYXAnO1xuaW1wb3J0IFZlY3RvcjIgZnJvbSAnQC9EYXRhL1ZlY3RvcjInO1xuaW1wb3J0IENhbWVyYSBmcm9tICdAL1JlbmRlcmVyL0NhbWVyYSc7XG5pbXBvcnQgQ29sb3IgZnJvbSAnQC9SZW5kZXJlci9Db2xvcic7XG5pbXBvcnQgeyBERUdSRUVfVE9fUkFESUFMIH0gZnJvbSAnQC9IZWxwZXJzJztcbmltcG9ydCB7IFNoYXBlIH0gZnJvbSAnQC9SZW5kZXJlci9TaGFwZSc7XG5pbXBvcnQgR2FtZSBmcm9tICdFbmdpbmUnO1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBDYW52YXMge1xuICAgIGdldCB3aWR0aCgpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuY2FudmFzLndpZHRoO1xuICAgIH1cblxuICAgIGdldCBoZWlnaHQoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLmNhbnZhcy5oZWlnaHQ7XG4gICAgfVxuXG4gICAgZ2V0IG1pZGRsZSgpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX3NpemUuZGl2aWRlKDIpO1xuICAgIH1cblxuICAgIGdldCBzaXplKCkge1xuICAgICAgICByZXR1cm4gdGhpcy5fc2l6ZTtcbiAgICB9XG5cbiAgICBnZXQgZWxlbWVudCgpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuY2FudmFzO1xuICAgIH1cblxuICAgIHNldCBiYWNrZ3JvdW5kKGNvbG9yOiBDb2xvcikge1xuICAgICAgICB0aGlzLl9iYWNrZ3JvdW5kID0gY29sb3I7XG4gICAgfVxuXG4gICAgZ2V0IGJhY2tncm91bmQoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLl9iYWNrZ3JvdW5kID8/IENvbG9yLndoaXRlO1xuICAgIH1cblxuICAgIHByaXZhdGUgY2FudmFzOiBIVE1MQ2FudmFzRWxlbWVudDtcbiAgICBwcml2YXRlIGN0eDogQ2FudmFzUmVuZGVyaW5nQ29udGV4dDJEO1xuICAgIHByaXZhdGUgX2JhY2tncm91bmQ/OiBDb2xvcjtcbiAgICBwcml2YXRlIF9zaXplOiBWZWN0b3IyID0gVmVjdG9yMi5vbmU7XG5cbiAgICBjb25zdHJ1Y3RvcigpIHtcbiAgICAgICAgdGhpcy5jYW52YXMgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiY2FudmFzXCIpO1xuICAgICAgICB0aGlzLmN0eCA9IHRoaXMuY2FudmFzLmdldENvbnRleHQoXCIyZFwiKSE7XG5cbiAgICAgICAgdGhpcy5jdHgubGluZUNhcCA9IFwicm91bmRcIjtcbiAgICAgICAgdGhpcy5jdHgubGluZUpvaW4gPSBcInJvdW5kXCI7XG4gICAgICAgIHRoaXMuY3R4LnRleHRCYXNlbGluZSA9IFwibWlkZGxlXCI7XG5cbiAgICAgICAgZG9jdW1lbnQuYm9keS5hcHBlbmRDaGlsZCh0aGlzLmNhbnZhcyk7XG5cbiAgICAgICAgd2luZG93LmFkZEV2ZW50TGlzdGVuZXIoXCJyZXNpemVcIiwgKCkgPT4gdGhpcy5yZXNpemUoKSk7XG4gICAgICAgIHRoaXMuY2FudmFzLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCAoKSA9PiB7XG4gICAgICAgICAgICBjb25zb2xlLmxvZyhcInJlcXVlc3RpbmcgZnVsbHNjcmVlblwiKTtcbiAgICAgICAgICAgIGRvY3VtZW50LmJvZHkucmVxdWVzdEZ1bGxzY3JlZW4oKTtcbiAgICAgICAgfSk7XG5cbiAgICAgICAgdGhpcy5yZXNpemUoKTtcbiAgICB9XG5cbiAgICBjaXJjbGUod29ybGRQb3NpdGlvbjogVmVjdG9yMiwgcm90YXRpb246IG51bWJlciwgc2l6ZTogbnVtYmVyLCBjb2xvcjogQ29sb3IsIGFyYzogW251bWJlciwgbnVtYmVyXSA9IFswLCAzNjBdKSB7XG4gICAgICAgIGNvbnN0IHBvc2l0aW9uID0gQ2FtZXJhLndvcmxkVG9DYW1lcmFTcGFjZSh3b3JsZFBvc2l0aW9uKTtcbiAgICAgICAgY29uc3QgbG9jYWxSb3RhdGlvbiA9IHJvdGF0aW9uICsgQ2FtZXJhLnJvdGF0aW9uO1xuXG4gICAgICAgIHRoaXMuY3R4LmJlZ2luUGF0aCgpO1xuICAgICAgICB0aGlzLmN0eC5maWxsU3R5bGUgPSBjb2xvci50b1N0cmluZygpO1xuXG4gICAgICAgIHRoaXMuY3R4LmFyYyhwb3NpdGlvbi54LCBwb3NpdGlvbi55LCBzaXplIC8gMiAqIENhbWVyYS56b29tLCAoYXJjWzBdICsgbG9jYWxSb3RhdGlvbikgKiBERUdSRUVfVE9fUkFESUFMLCBhcmNbMV0gKyBsb2NhbFJvdGF0aW9uICogREVHUkVFX1RPX1JBRElBTCk7XG4gICAgICAgIHRoaXMuY3R4LmZpbGwoKTtcbiAgICAgICAgdGhpcy5jdHguY2xvc2VQYXRoKCk7XG4gICAgfVxuXG4gICAgYm94KHdvcmxkUG9zaXRpb246IFZlY3RvcjIsIHdvcmxkUm90YXRpb246IG51bWJlciwgY29sb3I6IENvbG9yLCBzaXplOiBudW1iZXIpOiB2b2lkO1xuICAgIGJveCh3b3JsZFBvc2l0aW9uOiBWZWN0b3IyLCB3b3JsZFJvdGF0aW9uOiBudW1iZXIsIGNvbG9yOiBDb2xvciwgc2l6ZTogVmVjdG9yMik6IHZvaWQ7XG4gICAgYm94KHdvcmxkUG9zaXRpb246IFZlY3RvcjIsIHdvcmxkUm90YXRpb246IG51bWJlciwgY29sb3I6IENvbG9yLCBzaXplOiBWZWN0b3IyIHwgbnVtYmVyID0gVmVjdG9yMi5vbmUpIHtcbiAgICAgICAgY29uc3Qgd2lkdGggPSB0eXBlb2Ygc2l6ZSA9PSBcIm51bWJlclwiID8gc2l6ZSA6IHNpemUueDtcbiAgICAgICAgY29uc3QgaGVpZ2h0ID0gdHlwZW9mIHNpemUgPT0gXCJudW1iZXJcIiA/IHNpemUgOiBzaXplLnk7XG5cbiAgICAgICAgdGhpcy5wb2x5Z29uKHdvcmxkUG9zaXRpb24sIHdvcmxkUm90YXRpb24sIGNvbG9yLCBbXG4gICAgICAgICAgICBuZXcgVmVjdG9yMigtd2lkdGggLyAyLCAtaGVpZ2h0IC8gMiksXG4gICAgICAgICAgICBuZXcgVmVjdG9yMigtd2lkdGggLyAyLCBoZWlnaHQgLyAyKSxcbiAgICAgICAgICAgIG5ldyBWZWN0b3IyKHdpZHRoIC8gMiwgaGVpZ2h0IC8gMiksXG4gICAgICAgICAgICBuZXcgVmVjdG9yMih3aWR0aCAvIDIsIC1oZWlnaHQgLyAyKSxcbiAgICAgICAgICAgIG5ldyBWZWN0b3IyKC13aWR0aCAvIDIsIC1oZWlnaHQgLyAyKVxuICAgICAgICBdKTtcblxuICAgICAgICB0aGlzLmN0eC5jbG9zZVBhdGgoKTtcbiAgICB9XG5cbiAgICBwcml2YXRlIHRyYWNlUG9seWdvbih3b3JsZFBvc2l0aW9uOiBWZWN0b3IyLCByb3RhdGlvbjogbnVtYmVyLCBjb2xvcjogQ29sb3IsIGluZGljZXM6IFZlY3RvcjJbXSkge1xuICAgICAgICBpZiAoaW5kaWNlcy5sZW5ndGggPCAyKVxuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB0aGlzLmN0eC5iZWdpblBhdGgoKTtcblxuICAgICAgICBjb25zdCBbc3RhcnQsIC4uLnBvaW50c10gPSBpbmRpY2VzO1xuICAgICAgICBjb25zdCBwb3NpdGlvbiA9IENhbWVyYS53b3JsZFRvQ2FtZXJhU3BhY2Uod29ybGRQb3NpdGlvbi5hZGQoc3RhcnQucm90YXRlKHJvdGF0aW9uKSkpO1xuICAgICAgICB0aGlzLmN0eC5tb3ZlVG8oTWF0aC5mbG9vcihwb3NpdGlvbi54KSwgTWF0aC5mbG9vcihwb3NpdGlvbi55KSk7XG5cbiAgICAgICAgZm9yIChjb25zdCBpbmRleCBvZiBwb2ludHMpIHtcbiAgICAgICAgICAgIGNvbnN0IG5leHQgPSBDYW1lcmEud29ybGRUb0NhbWVyYVNwYWNlKHdvcmxkUG9zaXRpb24uYWRkKGluZGV4LnJvdGF0ZShyb3RhdGlvbikpKTtcbiAgICAgICAgICAgIHRoaXMuY3R4LmxpbmVUbyhuZXh0LngsIG5leHQueSk7XG4gICAgICAgIH1cblxuICAgICAgICB0aGlzLmN0eC5saW5lVG8oTWF0aC5mbG9vcihwb3NpdGlvbi54KSwgTWF0aC5mbG9vcihwb3NpdGlvbi55KSk7XG4gICAgICAgIHRoaXMuY3R4LmNsb3NlUGF0aCgpO1xuICAgIH1cblxuICAgIHBvbHlnb24od29ybGRQb3NpdGlvbjogVmVjdG9yMiwgcm90YXRpb246IG51bWJlciwgY29sb3I6IENvbG9yLCBpbmRpY2VzOiBWZWN0b3IyW10pIHtcbiAgICAgICAgdGhpcy50cmFjZVBvbHlnb24od29ybGRQb3NpdGlvbiwgcm90YXRpb24sIGNvbG9yLCBpbmRpY2VzKTtcbiAgICAgICAgdGhpcy5jdHguZmlsbFN0eWxlID0gY29sb3IudG9TdHJpbmcoKTtcbiAgICAgICAgdGhpcy5jdHguZmlsbCgpO1xuICAgIH1cblxuICAgIHdpcmVQb2x5Z29uKHdvcmxkUG9zaXRpb246IFZlY3RvcjIsIHJvdGF0aW9uOiBudW1iZXIsIGNvbG9yOiBDb2xvciwgaW5kaWNlczogVmVjdG9yMltdKSB7XG4gICAgICAgIHRoaXMudHJhY2VQb2x5Z29uKHdvcmxkUG9zaXRpb24sIHJvdGF0aW9uLCBjb2xvciwgaW5kaWNlcyk7XG4gICAgICAgIHRoaXMuY3R4LnN0cm9rZVN0eWxlID0gY29sb3IudG9TdHJpbmcoKTtcbiAgICAgICAgdGhpcy5jdHguc3Ryb2tlKCk7XG4gICAgfVxuXG5cbiAgICBhcmMob2Zmc2V0OiBudW1iZXIsIHdpZHRoOiBudW1iZXIgPSA5MCwgcm90YXRpb246IG51bWJlciA9IDAsIHRoaWNrbmVzczogbnVtYmVyID0gMTYsIGNvbG9yOiBDb2xvciA9IENvbG9yLndoaXRlKSB7XG4gICAgICAgIHRoaXMuY3R4LmJlZ2luUGF0aCgpO1xuICAgICAgICB0aGlzLmN0eC5saW5lV2lkdGggPSB0aGlja25lc3M7XG4gICAgICAgIHRoaXMuY3R4LnN0cm9rZVN0eWxlID0gY29sb3IudG9TdHJpbmcoKTtcblxuXG4gICAgICAgIHRoaXMuY3R4LmFyYyh0aGlzLmNhbnZhcy53aWR0aCAvIDIsIHRoaXMuY2FudmFzLmhlaWdodCAvIDIsIG9mZnNldCwgKHJvdGF0aW9uIC0gd2lkdGggLyAyKSAqIERFR1JFRV9UT19SQURJQUwsIChyb3RhdGlvbiArIHdpZHRoIC8gMikgKiBERUdSRUVfVE9fUkFESUFMKTtcbiAgICAgICAgdGhpcy5jdHguc3Ryb2tlKCk7XG4gICAgICAgIHRoaXMuY3R4LmNsb3NlUGF0aCgpO1xuICAgIH1cblxuICAgIHRleHQoc2NyZWVuUG9zaXRpb246IFZlY3RvcjIsIHJvdGF0aW9uOiBudW1iZXIsIHN0cmluZzogc3RyaW5nLCBjb2xvcjogQ29sb3IgPSBDb2xvci5ibGFjaywgc2l6ZTogbnVtYmVyID0gMTYpIHtcbiAgICAgICAgdGhpcy5jdHguZm9udCA9IGAke3NpemV9cHggc2Fucy1zZXJpZmA7XG4gICAgICAgIGNvbnN0IHBvc2l0aW9uID0gc2NyZWVuUG9zaXRpb247XG5cbiAgICAgICAgdGhpcy5jdHguc3Ryb2tlU3R5bGUgPSBjb2xvci50b1N0cmluZygpO1xuICAgICAgICB0aGlzLmN0eC5maWxsU3R5bGUgPSBjb2xvci50b1N0cmluZygpO1xuXG4gICAgICAgIGNvbnN0IGxpbmVzID0gc3RyaW5nLnNwbGl0KCdcXG4nKTtcbiAgICAgICAgbGV0IGkgPSAwO1xuXG4gICAgICAgIGZvciAoY29uc3QgbGluZSBvZiBsaW5lcykge1xuICAgICAgICAgICAgaSArPSBzaXplICogMS41O1xuICAgICAgICAgICAgdGhpcy5jdHguZmlsbFRleHQobGluZS5yZXBsYWNlQWxsKC9cXHQvZywgJyAgICAnKSwgcG9zaXRpb24ueCwgcG9zaXRpb24ueSArIGkpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgdmVjdG9yKHdvcmxkUG9zaXRpb246IFZlY3RvcjIsIHdvcmxkUm90YXRpb246IG51bWJlciwgdmVjdG9yOiBWZWN0b3IyLCBjb2xvcjogQ29sb3IgPSBDb2xvci5ncmVlbikge1xuICAgICAgICBjb25zdCBwb3NpdGlvbiA9IENhbWVyYS53b3JsZFRvQ2FtZXJhU3BhY2Uod29ybGRQb3NpdGlvbik7XG4gICAgICAgIGNvbnN0IGVuZCA9IENhbWVyYS53b3JsZFRvQ2FtZXJhU3BhY2Uod29ybGRQb3NpdGlvbi5hZGQodmVjdG9yKSk7XG5cbiAgICAgICAgY29uc3QgZGVsdGEgPSBlbmQubWludXMocG9zaXRpb24pO1xuXG4gICAgICAgIGlmIChkZWx0YS5sZW5ndGggPT0gMClcbiAgICAgICAgICAgIHJldHVybjtcblxuICAgICAgICBjb25zdCBoZWFkbGVuID0gTWF0aC5zcXJ0KGRlbHRhLnggKiBkZWx0YS54ICsgZGVsdGEueSAqIGRlbHRhLnkpICogMC4zOyAvLyBsZW5ndGggb2YgaGVhZCBpbiBwaXhlbHNcbiAgICAgICAgY29uc3QgYW5nbGUgPSBNYXRoLmF0YW4yKGRlbHRhLnksIGRlbHRhLngpO1xuICAgICAgICB0aGlzLmN0eC5iZWdpblBhdGgoKTtcbiAgICAgICAgdGhpcy5jdHguc3Ryb2tlU3R5bGUgPSBjb2xvci50b1N0cmluZygpO1xuICAgICAgICB0aGlzLmN0eC5tb3ZlVG8ocG9zaXRpb24ueCwgcG9zaXRpb24ueSk7XG4gICAgICAgIHRoaXMuY3R4LmxpbmVUbyhlbmQueCwgZW5kLnkpO1xuICAgICAgICB0aGlzLmN0eC5zdHJva2UoKTtcbiAgICAgICAgdGhpcy5jdHguYmVnaW5QYXRoKCk7XG4gICAgICAgIHRoaXMuY3R4Lm1vdmVUbyhlbmQueCAtIGhlYWRsZW4gKiBNYXRoLmNvcyhhbmdsZSAtIE1hdGguUEkgLyA0KSwgZW5kLnkgLSBoZWFkbGVuICogTWF0aC5zaW4oYW5nbGUgLSBNYXRoLlBJIC8gNikpO1xuICAgICAgICB0aGlzLmN0eC5saW5lVG8oZW5kLngsIGVuZC55KTtcbiAgICAgICAgdGhpcy5jdHgubGluZVRvKGVuZC54IC0gaGVhZGxlbiAqIE1hdGguY29zKGFuZ2xlICsgTWF0aC5QSSAvIDQpLCBlbmQueSAtIGhlYWRsZW4gKiBNYXRoLnNpbihhbmdsZSArIE1hdGguUEkgLyA2KSk7XG4gICAgICAgIHRoaXMuY3R4LnN0cm9rZSgpO1xuICAgIH1cblxuICAgIGRyYXdTaGFwZSh3b3JsZFBvc2l0aW9uOiBWZWN0b3IyLCBsb2NhbFJvdGF0aW9uOiBudW1iZXIsIHNoYXBlOiBTaGFwZSkge1xuICAgICAgICBjb25zb2xlLmFzc2VydChzaGFwZSAhPT0gdW5kZWZpbmVkLCBcInNoYXBlIGlzIHVuZGVmaW5lZFwiLCBzaGFwZSk7XG5cbiAgICAgICAgY29uc3QgeyBjb2xvciwgb2Zmc2V0IH0gPSBzaGFwZTtcbiAgICAgICAgY29uc3Qgc2hhcGVSb3RhdGlvbiA9IChzaGFwZS5yb3RhdGlvbiA/PyAwKSArIGxvY2FsUm90YXRpb247XG4gICAgICAgIGNvbnN0IGxvY2FsUG9zaXRpb24gPSBvZmZzZXQucm90YXRlKGxvY2FsUm90YXRpb24pLmFkZCh3b3JsZFBvc2l0aW9uKTtcblxuICAgICAgICBzd2l0Y2ggKHNoYXBlLnR5cGUpIHtcbiAgICAgICAgICAgIGNhc2UgXCJib3hcIjpcbiAgICAgICAgICAgICAgICBpZiAodHlwZW9mIHNoYXBlLnNpemUgPT0gXCJudW1iZXJcIilcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5ib3gobG9jYWxQb3NpdGlvbiwgc2hhcGVSb3RhdGlvbiwgY29sb3IsIHNoYXBlLnNpemUpO1xuICAgICAgICAgICAgICAgIGVsc2UgaWYgKHNoYXBlLnNpemUgaW5zdGFuY2VvZiBWZWN0b3IyKVxuICAgICAgICAgICAgICAgICAgICB0aGlzLmJveChsb2NhbFBvc2l0aW9uLCBzaGFwZVJvdGF0aW9uLCBjb2xvciwgc2hhcGUuc2l6ZSk7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICBjYXNlIFwiY2lyY2xlXCI6XG4gICAgICAgICAgICAgICAgdGhpcy5jaXJjbGUobG9jYWxQb3NpdGlvbiwgc2hhcGVSb3RhdGlvbiwgc2hhcGUuc2l6ZSwgY29sb3IsIHNoYXBlLmFyYyk7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICBjYXNlIFwicG9seWdvblwiOlxuICAgICAgICAgICAgICAgIHRoaXMucG9seWdvbihsb2NhbFBvc2l0aW9uLCBzaGFwZVJvdGF0aW9uLCBjb2xvciwgc2hhcGUuaW5kaWNlcyk7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBkcmF3VGlsZSh3b3JsZFBvc2l0aW9uOiBWZWN0b3IyLCB3b3JsZFJvdGF0aW9uOiBudW1iZXIsIHRpbGVNYXA6IFRpbGVtYXAsIHRpbGU6IHN0cmluZyB8IG51bWJlciB8IFRpbGUpIHtcbiAgICAgICAgY29uc3QgaW5mbyA9IHR5cGVvZiB0aWxlID09IFwib2JqZWN0XCIgPyB0aWxlIDogdGlsZU1hcC5nZXRUaWxlKHRpbGUpO1xuXG4gICAgICAgIHRoaXMuY3R4LmZpbGxTdHlsZSA9IENvbG9yLnJlZC50b1N0cmluZygpO1xuXG4gICAgICAgIGNvbnN0IHBvc2l0aW9uID0gQ2FtZXJhLndvcmxkVG9DYW1lcmFTcGFjZSh3b3JsZFBvc2l0aW9uKTtcbiAgICAgICAgY29uc3Qgc2l6ZSA9IHRpbGVNYXAubWFnbml0dWRlICogQ2FtZXJhLnpvb207XG5cbiAgICAgICAgdGhpcy5jdHgudHJhbnNsYXRlKHBvc2l0aW9uLngsIHBvc2l0aW9uLnkpO1xuICAgICAgICB0aGlzLmN0eC5yb3RhdGUoKHdvcmxkUm90YXRpb24gKyBDYW1lcmEucm90YXRpb24pICogREVHUkVFX1RPX1JBRElBTCk7XG5cbiAgICAgICAgdGhpcy5jdHguaW1hZ2VTbW9vdGhpbmdFbmFibGVkID0gZmFsc2U7XG4gICAgICAgIHRoaXMuY3R4LmRyYXdJbWFnZSh0aWxlTWFwLmltYWdlISxcbiAgICAgICAgICAgIGluZm8ueCxcbiAgICAgICAgICAgIGluZm8ueSxcbiAgICAgICAgICAgIGluZm8ud2lkdGgsXG4gICAgICAgICAgICBpbmZvLmhlaWdodCxcbiAgICAgICAgICAgIGluZm8ud2lkdGggKiBzaXplICogLS41LFxuICAgICAgICAgICAgaW5mby53aWR0aCAqIHNpemUgKiAtLjUsXG4gICAgICAgICAgICBpbmZvLndpZHRoICogc2l6ZSxcbiAgICAgICAgICAgIGluZm8uaGVpZ2h0ICogc2l6ZVxuICAgICAgICApO1xuICAgICAgICB0aGlzLmN0eC5pbWFnZVNtb290aGluZ0VuYWJsZWQgPSB0cnVlO1xuICAgICAgICB0aGlzLmN0eC5zZXRUcmFuc2Zvcm0oMSwgMCwgMCwgMSwgMCwgMCk7XG4gICAgfVxuXG4gICAgZHJhdygpIHtcbiAgICAgICAgdGhpcy5jdHguZmlsbFN0eWxlID0gdGhpcy5iYWNrZ3JvdW5kLnRvU3RyaW5nKCk7XG5cbiAgICAgICAgdGhpcy5jdHguZmlsbFJlY3QoMCwgMCwgdGhpcy5jYW52YXMud2lkdGgsIHRoaXMuY2FudmFzLmhlaWdodCk7XG4gICAgfVxuXG4gICAgcmVzaXplKCkge1xuICAgICAgICB0aGlzLmNhbnZhcy53aWR0aCA9IHdpbmRvdy5pbm5lcldpZHRoO1xuICAgICAgICB0aGlzLmNhbnZhcy5oZWlnaHQgPSB3aW5kb3cuaW5uZXJIZWlnaHQ7XG5cbiAgICAgICAgdGhpcy5fc2l6ZSA9IG5ldyBWZWN0b3IyKHRoaXMuY2FudmFzLndpZHRoLCB0aGlzLmNhbnZhcy5oZWlnaHQpO1xuICAgIH1cbn0iLCAiaW1wb3J0IEdhbWUgZnJvbSAnRW5naW5lJztcbmltcG9ydCB7IGdlbmVyYXRlSWQsIHN0cnVjdHVyZWRDbG9uZSB9IGZyb20gJ0AvSGVscGVycyc7XG5pbXBvcnQgVmVjdG9yMiBmcm9tICdAL0RhdGEvVmVjdG9yMic7XG5pbXBvcnQgUmVuZGVyQ29tcG9uZW50IGZyb20gJ0AvQ29tcG9uZW50cy9SZW5kZXJDb21wb25lbnQnO1xuaW1wb3J0IENvbXBvbmVudCBmcm9tICcuL0NvbXBvbmVudCc7XG5pbXBvcnQgVHJhbnNmb3JtQ29tcG9uZW50IGZyb20gJ0AvQ29tcG9uZW50cy9UcmFuc2Zvcm1Db21wb25lbnQnO1xuaW1wb3J0IHsgQ29tcG9uZW50VHlwZSB9IGZyb20gJy4nO1xuaW1wb3J0IFpvb21Db21wb25lbnQgZnJvbSAnc3JjL0dhbWUvQ29tcG9uZW50cy9ab29tQ29tcG9uZW50JztcbmltcG9ydCBJQm91bmRzIGZyb20gJ0AvUmVuZGVyZXIvSUJvdW5kcyc7XG5cbmNvbnN0IGNvbnZleEh1bGxDYWNoZTogTWFwPHN0cmluZywgSUJvdW5kcz4gPSBuZXcgTWFwKCk7XG4od2luZG93IGFzIGFueSkuY29udmV4SHVsbENhY2hlID0gY29udmV4SHVsbENhY2hlO1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBFbnRpdHkge1xuICAgIHB1YmxpYyB0YWdzOiBTZXQ8c3RyaW5nPjtcbiAgICBwcml2YXRlIF9jb21wb25lbnRzOiBNYXA8Q29tcG9uZW50LCBhbnk+O1xuICAgIHByaXZhdGUgX3JlbmRlckNvbXBvbmVudHM6IFNldDxzdHJpbmc+O1xuICAgIHByaXZhdGUgX2lkOiBzdHJpbmc7XG5cbiAgICBwdWJsaWMgZ2V0IHRyYW5zZm9ybSgpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuZ2V0Q29tcG9uZW50KFRyYW5zZm9ybUNvbXBvbmVudCk7XG4gICAgfVxuXG4gICAgcHVibGljIGdldCBib3VuZHMoKTogSUJvdW5kcyB7XG4gICAgICAgIGlmIChjb252ZXhIdWxsQ2FjaGUuaGFzKHRoaXMuaWQpKVxuICAgICAgICAgICAgcmV0dXJuIGNvbnZleEh1bGxDYWNoZS5nZXQodGhpcy5pZCkhO1xuXG4gICAgICAgIGNvbnN0IGNvbXBvbmVudCA9IHRoaXMuZ2V0QWxsQ29tcG9uZW50cygpLmZpbmQoeCA9PiB4WzBdIGluc3RhbmNlb2YgUmVuZGVyQ29tcG9uZW50KTtcbiAgICAgICAgaWYgKCFjb21wb25lbnQpIHtcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKGBFbnRpdHkgJHt0aGlzLmlkfSBoYXMgbm8gYm91bmRzLmApO1xuICAgICAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgICAgICBib3g6IFtdLFxuICAgICAgICAgICAgICAgIGNvbXBsZXg6IFtdXG4gICAgICAgICAgICB9O1xuICAgICAgICB9XG5cbiAgICAgICAgY29uc3QgYm91bmRzID0gKGNvbXBvbmVudFswXSBhcyBSZW5kZXJDb21wb25lbnQpLmdldEJvdW5kcyhjb21wb25lbnRbMV0pO1xuICAgICAgICBjb252ZXhIdWxsQ2FjaGUuc2V0KHRoaXMuaWQsIGJvdW5kcyk7XG5cbiAgICAgICAgcmV0dXJuIGJvdW5kcztcbiAgICB9XG5cbiAgICBwdWJsaWMgZ2V0IGlkKCkge1xuICAgICAgICByZXR1cm4gdGhpcy5faWQ7XG4gICAgfVxuXG4gICAgY29uc3RydWN0b3IoKSB7XG4gICAgICAgIHRoaXMuX2lkID0gZ2VuZXJhdGVJZCgpO1xuICAgICAgICB0aGlzLnRhZ3MgPSBuZXcgU2V0KCk7XG4gICAgICAgIHRoaXMuX2NvbXBvbmVudHMgPSBuZXcgTWFwKCk7XG4gICAgICAgIHRoaXMuX3JlbmRlckNvbXBvbmVudHMgPSBuZXcgU2V0KCk7XG4gICAgICAgIHRoaXMuYWRkQ29tcG9uZW50KFRyYW5zZm9ybUNvbXBvbmVudCk7XG4gICAgfVxuXG4gICAgc3RhcnQoKSB7XG4gICAgICAgIGZvciAoY29uc3QgW2NvbXBvbmVudCwgZGF0YV0gb2YgdGhpcy5fY29tcG9uZW50cykge1xuICAgICAgICAgICAgY29tcG9uZW50Py5zdGFydChkYXRhLCB0aGlzKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIHByaXZhdGUgY2FsbERlc3Ryb3lIb29rcygpIHtcbiAgICAgICAgZm9yIChjb25zdCBbY29tcG9uZW50LCBkYXRhXSBvZiB0aGlzLl9jb21wb25lbnRzKSB7XG4gICAgICAgICAgICBjb21wb25lbnQ/LmRlc3Ryb3koZGF0YSwgdGhpcyk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICB1cGRhdGUoKSB7XG4gICAgICAgIGZvciAoY29uc3QgW2NvbXBvbmVudCwgZGF0YV0gb2YgdGhpcy5fY29tcG9uZW50cykge1xuICAgICAgICAgICAgY29tcG9uZW50Py51cGRhdGUoZGF0YSwgdGhpcyk7XG5cbiAgICAgICAgICAgIGlmIChjb21wb25lbnQgaW5zdGFuY2VvZiBSZW5kZXJDb21wb25lbnQpXG4gICAgICAgICAgICAgICAgY29tcG9uZW50Py5yZW5kZXIoZGF0YSwgdGhpcyk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICByZW5kZXIoKSB7XG4gICAgICAgIGZvciAoY29uc3QgY29tcG9uZW50TmFtZSBvZiB0aGlzLl9yZW5kZXJDb21wb25lbnRzKSB7XG4gICAgICAgICAgICBjb25zdCBjb21wb25lbnQgPSBHYW1lLmNvbXBvbmVudHMuZ2V0KGNvbXBvbmVudE5hbWUpIGFzIFJlbmRlckNvbXBvbmVudDtcbiAgICAgICAgICAgIGNvbnN0IGRhdGEgPSB0aGlzLl9jb21wb25lbnRzLmdldChjb21wb25lbnQpO1xuXG4gICAgICAgICAgICBjb21wb25lbnQ/LnJlbmRlcihkYXRhLCB0aGlzKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIHJlbW92ZUNvbXBvbmVudDx0IGV4dGVuZHMgQ29tcG9uZW50VHlwZTxhbnk+PihuYW1lOiB0KSB7XG4gICAgICAgIGNvbnN0IF9jb21wb25lbnQgPSBHYW1lLmNvbXBvbmVudHMuZ2V0KG5hbWUubmFtZSk7XG5cbiAgICAgICAgaWYgKF9jb21wb25lbnQpXG4gICAgICAgICAgICB0aGlzLl9jb21wb25lbnRzLmRlbGV0ZShfY29tcG9uZW50KTtcbiAgICB9XG5cbiAgICBhZGRDb21wb25lbnQ8dCBleHRlbmRzIENvbXBvbmVudFR5cGU8YW55Pj4obmFtZXM6IHRbXSk6IHZvaWQ7XG4gICAgYWRkQ29tcG9uZW50PHQgZXh0ZW5kcyBDb21wb25lbnRUeXBlPGFueT4+KG5hbWU6IHQpOiB2b2lkO1xuICAgIGFkZENvbXBvbmVudDx0IGV4dGVuZHMgQ29tcG9uZW50VHlwZTxhbnk+PihuYW1lOiB0LCBkYXRhOiBQYXJ0aWFsPEluc3RhbmNlVHlwZTx0PltcImRlZmF1bHRzXCJdPik6IHZvaWQ7XG4gICAgYWRkQ29tcG9uZW50PHQgZXh0ZW5kcyBDb21wb25lbnRUeXBlPGFueT4+KGNvbXBvbmVudDogdCB8IHRbXSwgZGF0YT86IFBhcnRpYWw8SW5zdGFuY2VUeXBlPHQ+W1wiZGVmYXVsdHNcIl0+KSB7XG4gICAgICAgIGlmIChBcnJheS5pc0FycmF5KGNvbXBvbmVudCkpIHtcbiAgICAgICAgICAgIGZvciAoY29uc3QgX2NvbXBvbmVudCBvZiBjb21wb25lbnQpXG4gICAgICAgICAgICAgICAgdGhpcy5hZGRDb21wb25lbnQoX2NvbXBvbmVudCk7XG5cbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgIGNvbnN0IF9jb21wb25lbnQgPSBHYW1lLmNvbXBvbmVudHMuZ2V0KGNvbXBvbmVudC5uYW1lKTtcbiAgICAgICAgICAgIGlmIChfY29tcG9uZW50ID09PSB1bmRlZmluZWQpXG4gICAgICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKGBDb21wb25lbnQgJHtjb21wb25lbnQubmFtZX0gbm90IGZvdW5kLmApO1xuXG4gICAgICAgICAgICBpZiAoX2NvbXBvbmVudC5kZXBlbmRlbmNpZXMpXG4gICAgICAgICAgICAgICAgZm9yIChjb25zdCBkZXBlbmRlbmN5IG9mIF9jb21wb25lbnQuZGVwZW5kZW5jaWVzKVxuICAgICAgICAgICAgICAgICAgICB0aGlzLmFkZENvbXBvbmVudChkZXBlbmRlbmN5KTtcblxuXG4gICAgICAgICAgICBpZiAodGhpcy5oYXNDb21wb25lbnQoY29tcG9uZW50KSkge1xuICAgICAgICAgICAgICAgIGNvbnNvbGUud2FybihgRW50aXR5ICR7dGhpcy5pZH0gYWxyZWFkeSBoYXMgYSAke2NvbXBvbmVudC5uYW1lfS5gKTtcbiAgICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIHRoaXMuX2NvbXBvbmVudHMuc2V0KF9jb21wb25lbnQsIHsgLi4uX2NvbXBvbmVudC5kZWZhdWx0cywgLi4uZGF0YSB9KTtcbiAgICAgICAgICAgIF9jb21wb25lbnQ/LnN0YXJ0KHsgLi4uX2NvbXBvbmVudC5kZWZhdWx0cywgLi4uZGF0YSB9LCB0aGlzKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIGdldENvbXBvbmVudDx0IGV4dGVuZHMgQ29tcG9uZW50VHlwZTxhbnk+Pihjb21wb25lbnQ6IHQpOiBJbnN0YW5jZVR5cGU8dD5bXCJkZWZhdWx0c1wiXSB7XG4gICAgICAgIGNvbnN0IF9jb21wb25lbnQgPSBHYW1lLmNvbXBvbmVudHMuZ2V0KGNvbXBvbmVudC5uYW1lKTtcblxuICAgICAgICBpZiAoX2NvbXBvbmVudCA9PSB1bmRlZmluZWQpXG4gICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoYENvbXBvbmVudCAke2NvbXBvbmVudC5uYW1lfSBkb2Vzbid0IGV4aXN0LmApO1xuXG4gICAgICAgIHJldHVybiB0aGlzLl9jb21wb25lbnRzLmdldChfY29tcG9uZW50KTtcbiAgICB9XG5cbiAgICBnZXRBbGxDb21wb25lbnRzKCkge1xuICAgICAgICByZXR1cm4gWy4uLnRoaXMuX2NvbXBvbmVudHMuZW50cmllcygpXVxuICAgIH1cblxuICAgIC8qKlxuICAgICAqIEZpbmQgYSBjb21wb25lbnQgYnkgbmFtZS5cbiAgICAgKi9cbiAgICBoYXNDb21wb25lbnQoY29tcG9uZW50OiBDb21wb25lbnRUeXBlPGFueT4pOiBib29sZWFuIHtcbiAgICAgICAgY29uc3QgX2NvbXBvbmVudCA9IEdhbWUuY29tcG9uZW50cy5nZXQoY29tcG9uZW50Lm5hbWUpO1xuXG4gICAgICAgIGlmIChfY29tcG9uZW50ID09IHVuZGVmaW5lZClcbiAgICAgICAgICAgIHJldHVybiBmYWxzZTtcblxuICAgICAgICByZXR1cm4gdGhpcy5fY29tcG9uZW50cy5oYXMoX2NvbXBvbmVudCk7XG4gICAgfVxuXG4gICAgZGVzdHJveSgpIHtcbiAgICAgICAgdGhpcy5jYWxsRGVzdHJveUhvb2tzKCk7XG5cbiAgICAgICAgR2FtZS5yZW1vdmVFbnRpdHkodGhpcyk7XG4gICAgfVxuXG4gICAgY2xvbmUoKSB7XG4gICAgICAgIGNvbnN0IGNvcHkgPSBuZXcgRW50aXR5KCk7XG4gICAgICAgIGNvcHkudGFncyA9IG5ldyBTZXQodGhpcy50YWdzKTtcbiAgICAgICAgZm9yIChjb25zdCBbY29tcG9uZW50LCBkYXRhXSBvZiB0aGlzLl9jb21wb25lbnRzKVxuICAgICAgICAgICAgY29weS5hZGRDb21wb25lbnQoY29tcG9uZW50LmNvbnN0cnVjdG9yIGFzIENvbXBvbmVudFR5cGU8YW55Piwgc3RydWN0dXJlZENsb25lKGRhdGEpKTtcblxuICAgICAgICByZXR1cm4gY29weTtcbiAgICB9XG59XG4iLCAiZXhwb3J0IGRlZmF1bHQgY2xhc3MgS2V5Ym9hcmQge1xuICAgIHByaXZhdGUgc3RhdGljIHByZXNzZWRLZXlzOiBTZXQ8c3RyaW5nPiA9IG5ldyBTZXQoKTtcbiAgICBwcml2YXRlIHN0YXRpYyBjdXJyZW50RnJhbWU6IFNldDxzdHJpbmc+ID0gbmV3IFNldCgpO1xuXG4gICAgcHVibGljIHN0YXRpYyBpbml0aWFsaXplKCkge1xuICAgICAgICB3aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcihcImtleWRvd25cIiwgZSA9PiB0aGlzLmhhbmRsZUtleURvd24oZSkpO1xuICAgICAgICB3aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcihcImtleXVwXCIsIGUgPT4gdGhpcy5oYW5kbGVLZXlVcChlKSk7XG4gICAgICAgIHdpbmRvdy5hZGRFdmVudExpc3RlbmVyKFwiYmx1clwiLCAoKSA9PiB0aGlzLmNsZWFyQWxsKCkpO1xuICAgIH1cbiAgICBzdGF0aWMgY2xlYXJBbGwoKSB7XG4gICAgICAgIHRoaXMucHJlc3NlZEtleXMuY2xlYXIoKTtcbiAgICAgICAgdGhpcy5jdXJyZW50RnJhbWUuY2xlYXIoKTtcbiAgICB9XG5cbiAgICBwcml2YXRlIHN0YXRpYyBoYW5kbGVLZXlEb3duKGV2ZW50OiBLZXlib2FyZEV2ZW50KSB7XG4gICAgICAgIHRoaXMuYWRkS2V5KGV2ZW50LmtleS50b0xvd2VyQ2FzZSgpKTtcblxuICAgICAgICBpZiAoZXZlbnQuY3RybEtleSlcbiAgICAgICAgICAgIHRoaXMuYWRkS2V5KFwiY3RybFwiKTtcblxuICAgICAgICBpZiAoZXZlbnQuc2hpZnRLZXkpXG4gICAgICAgICAgICB0aGlzLmFkZEtleShcInNoaWZ0XCIpO1xuXG4gICAgICAgIGlmIChldmVudC5tZXRhS2V5KVxuICAgICAgICAgICAgdGhpcy5hZGRLZXkoXCJtZXRhXCIpO1xuXG4gICAgICAgIGlmIChldmVudC5hbHRLZXkpXG4gICAgICAgICAgICB0aGlzLmFkZEtleShcImFsdFwiKTtcbiAgICB9XG5cbiAgICBwcml2YXRlIHN0YXRpYyBoYW5kbGVLZXlVcChldmVudDogS2V5Ym9hcmRFdmVudCkge1xuICAgICAgICB0aGlzLnByZXNzZWRLZXlzLmRlbGV0ZShldmVudC5rZXkudG9Mb3dlckNhc2UoKSk7XG5cbiAgICAgICAgaWYgKCFldmVudC5jdHJsS2V5KVxuICAgICAgICAgICAgdGhpcy5wcmVzc2VkS2V5cy5kZWxldGUoXCJjdHJsXCIpO1xuXG4gICAgICAgIGlmICghZXZlbnQuc2hpZnRLZXkpXG4gICAgICAgICAgICB0aGlzLnByZXNzZWRLZXlzLmRlbGV0ZShcInNoaWZ0XCIpO1xuXG4gICAgICAgIGlmICghZXZlbnQubWV0YUtleSlcbiAgICAgICAgICAgIHRoaXMucHJlc3NlZEtleXMuZGVsZXRlKFwibWV0YVwiKTtcblxuICAgICAgICBpZiAoIWV2ZW50LmFsdEtleSlcbiAgICAgICAgICAgIHRoaXMucHJlc3NlZEtleXMuZGVsZXRlKFwiYWx0XCIpO1xuXG4gICAgICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBzdGF0aWMgYWRkS2V5KGtleTogc3RyaW5nKSB7XG4gICAgICAgIHRoaXMucHJlc3NlZEtleXMuYWRkKGtleSk7XG4gICAgICAgIHRoaXMuY3VycmVudEZyYW1lLmFkZChrZXkpO1xuICAgIH1cblxuICAgIHB1YmxpYyBzdGF0aWMgaXNEb3duKC4uLmtleXM6IHN0cmluZ1tdKTogYm9vbGVhbiB7XG4gICAgICAgIHJldHVybiAha2V5cy5zb21lKHggPT4gIXRoaXMucHJlc3NlZEtleXMuaGFzKHgpKTtcbiAgICB9XG5cbiAgICBwdWJsaWMgc3RhdGljIGlzUHJlc3NlZCguLi5rZXlzOiBzdHJpbmdbXSk6IGJvb2xlYW4ge1xuICAgICAgICByZXR1cm4gIWtleXMuc29tZSh4ID0+ICF0aGlzLmN1cnJlbnRGcmFtZS5oYXMoeCkpO1xuICAgIH1cblxuICAgIHB1YmxpYyBzdGF0aWMgY2xlYXJGcmFtZSgpIHtcbiAgICAgICAgdGhpcy5jdXJyZW50RnJhbWUuY2xlYXIoKTtcbiAgICB9XG59XG5cbktleWJvYXJkLmluaXRpYWxpemUoKTsiLCAiaW1wb3J0IEdhbWUsIHsgQ29sb3IgfSBmcm9tICdFbmdpbmUnO1xuaW1wb3J0IEVudGl0eSBmcm9tICcuL0VudGl0eSc7XG5pbXBvcnQgVmVjdG9yMiBmcm9tICcuL1ZlY3RvcjInO1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBTcGF0aWFsTWFwIHtcbiAgICBwcml2YXRlIGJ1Y2tldHM6IE1hcDxzdHJpbmcsIFNldDxzdHJpbmc+PiA9IG5ldyBNYXAoKTtcbiAgICBwcml2YXRlIGVudGl0aWVzOiBNYXA8c3RyaW5nLCBzdHJpbmc+ID0gbmV3IE1hcCgpO1xuXG4gICAgY29uc3RydWN0b3IocHJpdmF0ZSByZXN1bHV0aW9uOiBudW1iZXIgPSAxMjgpIHsgfVxuXG4gICAgZ2VuZXJhdGVIYXNoKHBvaW50OiBWZWN0b3IyKSB7XG4gICAgICAgIHJldHVybiAoTWF0aC5mbG9vcihwb2ludC54IC8gdGhpcy5yZXN1bHV0aW9uKSAqIHRoaXMucmVzdWx1dGlvbikudG9TdHJpbmcoKSArICcsJyArXG4gICAgICAgICAgICAoTWF0aC5mbG9vcihwb2ludC55IC8gdGhpcy5yZXN1bHV0aW9uKSAqIHRoaXMucmVzdWx1dGlvbikudG9TdHJpbmcoKTtcbiAgICB9XG5cbiAgICBzZXQoZW50aXR5OiBFbnRpdHkpIHtcbiAgICAgICAgY29uc3QgaGFzaCA9IHRoaXMuZ2VuZXJhdGVIYXNoKGVudGl0eS50cmFuc2Zvcm0ucG9zaXRpb24pO1xuXG4gICAgICAgIGNvbnN0IGJ1Y2tldCA9IHRoaXMuYnVja2V0cy5nZXQoaGFzaCkgPz8gbmV3IFNldCgpO1xuXG4gICAgICAgIGlmIChidWNrZXQuaGFzKGVudGl0eS5pZCkpXG4gICAgICAgICAgICByZXR1cm4gaGFzaDtcblxuICAgICAgICBidWNrZXQuYWRkKGVudGl0eS5pZCk7XG5cbiAgICAgICAgY29uc3Qgb2xkQnVja2V0SGFzaCA9IHRoaXMuZW50aXRpZXMuZ2V0KGVudGl0eS5pZCk7XG5cbiAgICAgICAgaWYgKG9sZEJ1Y2tldEhhc2ggJiYgb2xkQnVja2V0SGFzaCAhPT0gaGFzaCkge1xuICAgICAgICAgICAgY29uc29sZS5sb2coYE1vdmluZyBlbnRpdHkgJHtlbnRpdHkuaWR9IGZyb20gJHtvbGRCdWNrZXRIYXNofSB0byAke2hhc2h9YCk7XG4gICAgICAgICAgICBjb25zdCBvbGRCdWNrZXQgPSB0aGlzLmJ1Y2tldHMuZ2V0KG9sZEJ1Y2tldEhhc2gpO1xuXG4gICAgICAgICAgICBvbGRCdWNrZXQ/LmRlbGV0ZShlbnRpdHkuaWQpO1xuXG4gICAgICAgICAgICBpZiAob2xkQnVja2V0Py5zaXplID09IDApXG4gICAgICAgICAgICAgICAgdGhpcy5idWNrZXRzLmRlbGV0ZShvbGRCdWNrZXRIYXNoKTtcbiAgICAgICAgfVxuXG4gICAgICAgIHRoaXMuZW50aXRpZXMuc2V0KGVudGl0eS5pZCwgaGFzaCk7XG4gICAgICAgIHRoaXMuYnVja2V0cy5zZXQoaGFzaCwgYnVja2V0KTtcbiAgICAgICAgcmV0dXJuIGhhc2g7XG4gICAgfVxuXG4gICAgZ2V0RW50aXR5SGFzaChlbnRpdHk6IEVudGl0eSkge1xuICAgICAgICByZXR1cm4gdGhpcy5lbnRpdGllcy5nZXQoZW50aXR5LmlkKTtcbiAgICB9XG5cbiAgICBnZXQobWluOiBWZWN0b3IyLCBtYXg/OiBWZWN0b3IyKSB7XG4gICAgICAgIGNvbnN0IG1pbkhhc2ggPSB0aGlzLmdlbmVyYXRlSGFzaChtaW4pO1xuICAgICAgICBjb25zdCBlbnRpdGllcyA9IFsuLi50aGlzLmJ1Y2tldHMuZ2V0KG1pbkhhc2gpID8/IFtdXTtcblxuICAgICAgICBpZiAoIW1heClcbiAgICAgICAgICAgIHJldHVybiBlbnRpdGllcztcblxuICAgICAgICBjb25zdCBtYXhIYXNoID0gdGhpcy5nZW5lcmF0ZUhhc2gobWF4KTtcbiAgICAgICAgZW50aXRpZXMucHVzaCguLi50aGlzLmJ1Y2tldHMuZ2V0KG1heEhhc2gpID8/IFtdKTtcblxuICAgICAgICBpZiAoTWF0aC5hYnMobWluLnggLSBtYXgueCkgPiAxMjggfHwgTWF0aC5hYnMobWluLnggLSBtYXgueCkgPiAxMjgpIHtcbiAgICAgICAgICAgIGxldCBqID0gbWluLmNvcHkoKTtcblxuICAgICAgICAgICAgY29uc3QgW3N0ZXBzWCwgc3RlcHNZXSA9IFtNYXRoLmNlaWwoTWF0aC5hYnMobWluLnggLSBtYXgueCkgLyB0aGlzLnJlc3VsdXRpb24pLCBNYXRoLmNlaWwoTWF0aC5hYnMobWluLnkgLSBtYXgueSkgLyB0aGlzLnJlc3VsdXRpb24pXTtcblxuICAgICAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBzdGVwc1ggKiBzdGVwc1k7IGkrKykge1xuICAgICAgICAgICAgICAgIGoueCA9IE1hdGguZmxvb3IoaSAlIHN0ZXBzWCkgKiB0aGlzLnJlc3VsdXRpb247XG4gICAgICAgICAgICAgICAgai55ID0gTWF0aC5mbG9vcihpIC8gc3RlcHNZKSAqIHRoaXMucmVzdWx1dGlvbjtcblxuICAgICAgICAgICAgICAgIGNvbnN0IGhhc2ggPSB0aGlzLmdlbmVyYXRlSGFzaChqKTtcblxuICAgICAgICAgICAgICAgIGVudGl0aWVzLnB1c2goLi4udGhpcy5idWNrZXRzLmdldChoYXNoKSA/PyBbXSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4gWy4uLm5ldyBTZXQoZW50aXRpZXMpXTtcbiAgICB9XG59IiwgImltcG9ydCBDYW52YXMgZnJvbSAnQC9SZW5kZXJlci9DYW52YXMnO1xuaW1wb3J0IENvbXBvbmVudCwgeyBDb21wb25lbnRUeXBlIH0gZnJvbSAnQC9EYXRhL0NvbXBvbmVudCc7XG5pbXBvcnQgRW50aXR5IGZyb20gJ0AvRGF0YS9FbnRpdHknO1xuaW1wb3J0IEtleWJvYXJkIGZyb20gJ0AvS2V5Ym9hcmQnO1xuaW1wb3J0IFNwYXRpYWxNYXAgZnJvbSAnLi9EYXRhL1NwYXRpYWxNYXAnO1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBHYW1lIHtcbiAgICBwcml2YXRlIHN0YXRpYyBfY2FudmFzOiBDYW52YXMgPSBuZXcgQ2FudmFzKCk7XG4gICAgcHJpdmF0ZSBzdGF0aWMgX2VudGl0aWVzOiBNYXA8c3RyaW5nLCBFbnRpdHk+ID0gbmV3IE1hcCgpO1xuICAgIHByaXZhdGUgc3RhdGljIF9jb21wb25lbnRzOiBNYXA8c3RyaW5nLCBDb21wb25lbnQ+ID0gbmV3IE1hcCgpO1xuICAgIHByaXZhdGUgc3RhdGljIF90aW1lID0gMDtcbiAgICBwcml2YXRlIHN0YXRpYyB1cGRhdGVDYWxsYmFja3M6ICgoKSA9PiB2b2lkKVtdID0gW107XG5cbiAgICBwcml2YXRlIHN0YXRpYyBfcGF1c2VkID0gZmFsc2U7XG4gICAgcHJpdmF0ZSBzdGF0aWMgX2RlYnVnID0gdHJ1ZTtcblxuICAgIHB1YmxpYyBzdGF0aWMgc3BhdGlhbE1hcDogU3BhdGlhbE1hcCA9IG5ldyBTcGF0aWFsTWFwKDUxMik7XG5cbiAgICBwdWJsaWMgc3RhdGljIGdldCBkZWJ1ZygpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX2RlYnVnO1xuICAgIH1cblxuICAgIHB1YmxpYyBzdGF0aWMgZ2V0IHRpbWUoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLl90aW1lO1xuICAgIH1cblxuICAgIHB1YmxpYyBzdGF0aWMgZ2V0IHBhdXNlZCgpOiBib29sZWFuIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX3BhdXNlZDtcbiAgICB9XG5cbiAgICBwdWJsaWMgc3RhdGljIHNldCBwYXVzZWQodmFsdWUpIHtcbiAgICAgICAgdGhpcy5fcGF1c2VkID0gdmFsdWU7XG5cbiAgICAgICAgaWYgKCF0aGlzLl9wYXVzZWQpIHtcbiAgICAgICAgICAgIHRoaXMuc3RhcnQoKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIHB1YmxpYyBzdGF0aWMgZ2V0IGNhbnZhcygpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX2NhbnZhcztcbiAgICB9XG5cbiAgICBwdWJsaWMgc3RhdGljIGdldCBjb21wb25lbnRzKCkge1xuICAgICAgICByZXR1cm4gdGhpcy5fY29tcG9uZW50cztcbiAgICB9XG5cblxuICAgIHB1YmxpYyBzdGF0aWMgc3RhcnQoKSB7XG4gICAgICAgIHJlcXVlc3RBbmltYXRpb25GcmFtZSh0aGlzLmxvb3AuYmluZCh0aGlzKSk7XG4gICAgfVxuXG4gICAgcHVibGljIHN0YXRpYyBnZXRFbnRpdHlCeVRhZ3MoLi4udGFnczogc3RyaW5nW10pIHtcbiAgICAgICAgcmV0dXJuIFsuLi50aGlzLl9lbnRpdGllcy52YWx1ZXMoKV0uZmluZCh4ID0+ICF0YWdzLnNvbWUoeSA9PiAheC50YWdzLmhhcyh5KSkpO1xuICAgIH1cblxuICAgIHB1YmxpYyBzdGF0aWMgZ2V0RW50aXR5QnlJZChpZDogc3RyaW5nKSB7XG4gICAgICAgIHJldHVybiB0aGlzLl9lbnRpdGllcy5nZXQoaWQpO1xuICAgIH1cblxuICAgIHB1YmxpYyBzdGF0aWMgZ2V0RW50aXRpZXMoLi4udGFnczogc3RyaW5nW10pIHtcbiAgICAgICAgaWYgKHRhZ3MubGVuZ3RoID09IDApXG4gICAgICAgICAgICByZXR1cm4gWy4uLnRoaXMuX2VudGl0aWVzLnZhbHVlcygpXTtcblxuICAgICAgICByZXR1cm4gWy4uLnRoaXMuX2VudGl0aWVzLnZhbHVlcygpXS5maWx0ZXIoeCA9PiAhdGFncy5zb21lKHkgPT4gIXgudGFncy5oYXMoeSkpKTtcbiAgICB9XG5cbiAgICBwdWJsaWMgc3RhdGljIHJlZ2lzdGVyRW50aXR5KGVudGl0eTogRW50aXR5KSB7XG4gICAgICAgIHRoaXMuX2VudGl0aWVzLnNldChlbnRpdHkuaWQsIGVudGl0eSk7XG4gICAgICAgIGVudGl0eS5zdGFydCgpO1xuICAgIH1cblxuICAgIHN0YXRpYyByZW1vdmVFbnRpdHkoZW50aXR5OiBFbnRpdHkpIHtcbiAgICAgICAgdGhpcy5fZW50aXRpZXMuZGVsZXRlKGVudGl0eS5pZCk7XG4gICAgfVxuXG4gICAgcHVibGljIHN0YXRpYyBjcmVhdGVFbnRpdHkoLi4udGFnczogc3RyaW5nW10pIHtcbiAgICAgICAgY29uc3QgZW50aXR5ID0gbmV3IEVudGl0eSgpO1xuXG4gICAgICAgIGZvciAoY29uc3QgdGFnIG9mIHRhZ3MpXG4gICAgICAgICAgICBlbnRpdHkudGFncy5hZGQodGFnKTtcblxuICAgICAgICB0aGlzLl9lbnRpdGllcy5zZXQoZW50aXR5LmlkLCBlbnRpdHkpO1xuICAgICAgICByZXR1cm4gZW50aXR5O1xuICAgIH1cblxuICAgIHB1YmxpYyBzdGF0aWMgcmVnaXN0ZXJDb21wb25lbnQoLi4uY29tcG9uZW50czogQ29tcG9uZW50VHlwZTxhbnk+W10pIHtcbiAgICAgICAgZm9yIChjb25zdCBjb21wb25lbnQgb2YgY29tcG9uZW50cykge1xuICAgICAgICAgICAgdGhpcy5fY29tcG9uZW50cy5zZXQoY29tcG9uZW50Lm5hbWUsIG5ldyBjb21wb25lbnQoKSk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBwdWJsaWMgc3RhdGljIG9uVXBkYXRlKGNhbGxiYWNrOiAoKSA9PiB2b2lkKSB7XG4gICAgICAgIHRoaXMudXBkYXRlQ2FsbGJhY2tzLnB1c2goY2FsbGJhY2spO1xuICAgIH1cblxuICAgIHByaXZhdGUgc3RhdGljIGxvb3AoKSB7XG4gICAgICAgIHRoaXMuY2FudmFzLmRyYXcoKTtcblxuICAgICAgICB0aGlzLl90aW1lKys7XG4gICAgICAgIGlmICh0aGlzLl90aW1lID4gNjApXG4gICAgICAgICAgICB0aGlzLl90aW1lID0gMDtcblxuICAgICAgICBpZiAoS2V5Ym9hcmQuaXNQcmVzc2VkKFwiZXNjYXBlXCIpKSB7XG4gICAgICAgICAgICB0aGlzLnBhdXNlZCA9ICF0aGlzLnBhdXNlZDtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmIChLZXlib2FyZC5pc1ByZXNzZWQoXCJjdHJsXCIsIFwiZjFcIikpIHtcbiAgICAgICAgICAgIHRoaXMuX2RlYnVnID0gIXRoaXMuX2RlYnVnO1xuICAgICAgICAgICAgLy8gaW1wb3J0KFwiLi9EZWJ1Zy9EZWJ1Z2dlci5qc1wiKVxuICAgICAgICAgICAgLy8gICAgIC50aGVuKHggPT4geyBjb25zb2xlLmxvZyh4KTsgeC5kZWZhdWx0LnN0YXJ0KCk7IH0pXG4gICAgICAgICAgICAvLyAgICAgLmNhdGNoKGUgPT4gY29uc29sZS5lcnJvcihcIkZhaWxlZCB0byBsb2FkIGRlYnVnZ2VyXCIsIGUpKTtcbiAgICAgICAgfVxuXG5cbiAgICAgICAgZm9yIChjb25zdCBlbnRpdHkgb2YgdGhpcy5fZW50aXRpZXMudmFsdWVzKCkpIHtcbiAgICAgICAgICAgIGVudGl0eS5yZW5kZXIoKTtcblxuICAgICAgICAgICAgaWYgKCF0aGlzLl9wYXVzZWQpXG4gICAgICAgICAgICAgICAgZW50aXR5LnVwZGF0ZSgpO1xuICAgICAgICB9XG5cbiAgICAgICAgdGhpcy51cGRhdGVDYWxsYmFja3MuZm9yRWFjaCh4ID0+IHgoKSk7XG5cbiAgICAgICAgS2V5Ym9hcmQuY2xlYXJGcmFtZSgpO1xuXG4gICAgICAgIHJlcXVlc3RBbmltYXRpb25GcmFtZSh0aGlzLmxvb3AuYmluZCh0aGlzKSk7XG4gICAgfVxufVxuXG4od2luZG93IGFzIGFueSkuR2FtZSA9IEdhbWU7XG5HYW1lLnN0YXJ0KCk7IiwgImltcG9ydCBWZWN0b3IyIGZyb20gJ0AvRGF0YS9WZWN0b3IyJztcbmltcG9ydCBHYW1lIGZyb20gJy4vR2FtZSc7XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIE1vdXNlIHtcbiAgICBwcml2YXRlIHN0YXRpYyBfeDogbnVtYmVyID0gMDtcbiAgICBwcml2YXRlIHN0YXRpYyBfeTogbnVtYmVyID0gMDtcbiAgICBwcml2YXRlIHN0YXRpYyBfd2hlZWw6IG51bWJlciA9IDA7XG4gICAgcHJpdmF0ZSBzdGF0aWMgbW91c2VCdXR0b25zOiB7XG4gICAgICAgIGxlZnQ6IGJvb2xlYW4sXG4gICAgICAgIHJpZ2h0OiBib29sZWFuLFxuICAgICAgICBtaWRkbGU6IGJvb2xlYW47XG4gICAgfSA9IHsgbGVmdDogZmFsc2UsIHJpZ2h0OiBmYWxzZSwgbWlkZGxlOiBmYWxzZSB9O1xuXG4gICAgcHVibGljIHN0YXRpYyBnZXQgeCgpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX3g7XG4gICAgfVxuXG4gICAgcHVibGljIHN0YXRpYyBnZXQgeSgpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX3k7XG4gICAgfVxuXG4gICAgcHVibGljIHN0YXRpYyBnZXQgd2hlZWwoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLl93aGVlbDtcbiAgICB9XG5cbiAgICBwdWJsaWMgc3RhdGljIGdldCBwb3NpdGlvbigpIHtcbiAgICAgICAgcmV0dXJuIG5ldyBWZWN0b3IyKFxuICAgICAgICAgICAgdGhpcy5feCxcbiAgICAgICAgICAgIHRoaXMuX3lcbiAgICAgICAgKTtcbiAgICB9XG5cbiAgICBwdWJsaWMgc3RhdGljIHNldCB2aXNpYmxlKHZhbHVlKSB7XG4gICAgICAgIEdhbWUuY2FudmFzLmVsZW1lbnQuc3R5bGUuY3Vyc29yID0gdmFsdWUgPyAnZGVmYXVsdCcgOiAnbm9uZSc7XG4gICAgfVxuXG4gICAgcHVibGljIHN0YXRpYyBnZXQgdmlzaWJsZSgpIHtcbiAgICAgICAgcmV0dXJuIEdhbWUuY2FudmFzLmVsZW1lbnQuc3R5bGUuY3Vyc29yID09ICdkZWZhdWx0JztcbiAgICB9XG5cbiAgICBwdWJsaWMgc3RhdGljIGdldCBsZWZ0KCkge1xuICAgICAgICByZXR1cm4gdGhpcy5tb3VzZUJ1dHRvbnMubGVmdDtcbiAgICB9XG5cbiAgICBwdWJsaWMgc3RhdGljIGdldCByaWdodCgpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMubW91c2VCdXR0b25zLnJpZ2h0O1xuICAgIH1cblxuICAgIHB1YmxpYyBzdGF0aWMgZ2V0IG1pZGRsZSgpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMubW91c2VCdXR0b25zLm1pZGRsZTtcbiAgICB9XG5cbiAgICBwdWJsaWMgc3RhdGljIGluaXRpYWxpemUoKSB7XG4gICAgICAgIHdpbmRvdy5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgZSA9PiBlLnByZXZlbnREZWZhdWx0KCkpO1xuICAgICAgICB3aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcihcImNvbnRleHRtZW51XCIsIGUgPT4gZS5wcmV2ZW50RGVmYXVsdCgpKTtcbiAgICAgICAgd2luZG93LmFkZEV2ZW50TGlzdGVuZXIoXCJ3aGVlbFwiLCBlID0+IHtcbiAgICAgICAgICAgIHRoaXMuX3doZWVsICs9IGUuZGVsdGFZICogLTAuMDE7XG4gICAgICAgIH0pO1xuXG4gICAgICAgIHdpbmRvdy5hZGRFdmVudExpc3RlbmVyKFwibW91c2Vtb3ZlXCIsIChlKSA9PiB7XG4gICAgICAgICAgICB0aGlzLl94ID0gZS5jbGllbnRYO1xuICAgICAgICAgICAgdGhpcy5feSA9IGUuY2xpZW50WTtcbiAgICAgICAgfSk7XG5cbiAgICAgICAgd2luZG93LmFkZEV2ZW50TGlzdGVuZXIoXCJtb3VzZWRvd25cIiwgKGUpID0+IHtcbiAgICAgICAgICAgIGUucHJldmVudERlZmF1bHQoKTtcbiAgICAgICAgICAgIHRoaXMubW91c2VCdXR0b25zLmxlZnQgPSBlLmJ1dHRvbiA9PSAwO1xuICAgICAgICAgICAgdGhpcy5tb3VzZUJ1dHRvbnMucmlnaHQgPSBlLmJ1dHRvbiA9PSAyO1xuICAgICAgICAgICAgdGhpcy5tb3VzZUJ1dHRvbnMubWlkZGxlID0gZS5idXR0b24gPT0gMTtcbiAgICAgICAgfSk7XG5cbiAgICAgICAgd2luZG93LmFkZEV2ZW50TGlzdGVuZXIoXCJtb3VzZXVwXCIsIChlKSA9PiB7XG4gICAgICAgICAgICBlLnByZXZlbnREZWZhdWx0KCk7XG4gICAgICAgICAgICB0aGlzLm1vdXNlQnV0dG9ucy5sZWZ0ID0gdGhpcy5tb3VzZUJ1dHRvbnMubGVmdCAmJiBlLmJ1dHRvbiAhPSAwO1xuICAgICAgICAgICAgdGhpcy5tb3VzZUJ1dHRvbnMucmlnaHQgPSB0aGlzLm1vdXNlQnV0dG9ucy5yaWdodCAmJiBlLmJ1dHRvbiAhPSAyO1xuICAgICAgICAgICAgdGhpcy5tb3VzZUJ1dHRvbnMubWlkZGxlID0gdGhpcy5tb3VzZUJ1dHRvbnMubWlkZGxlICYmIGUuYnV0dG9uICE9IDE7XG4gICAgICAgIH0pO1xuICAgIH1cbn1cblxuTW91c2UuaW5pdGlhbGl6ZSgpOyIsICJpbXBvcnQgUmVuZGVyQ29tcG9uZW50IGZyb20gJ0AvQ29tcG9uZW50cy9SZW5kZXJDb21wb25lbnQnO1xuaW1wb3J0IFNoYXBlUmVuZGVyZXJDb21wb25lbnQgZnJvbSAnQC9Db21wb25lbnRzL1NoYXBlUmVuZGVyZXJDb21wb25lbnQnO1xuaW1wb3J0IFJpZ2lkYm9keUNvbXBvbmVudCBmcm9tICdAL0NvbXBvbmVudHMvUmlnaWRib2R5Q29tcG9uZW50JztcbmltcG9ydCBUaWxlUmVuZGVyZXJDb21wb25lbnQgZnJvbSAnQC9Db21wb25lbnRzL1RpbGVSZW5kZXJlckNvbXBvbmVudCc7XG5pbXBvcnQgVHJhbnNmb3JtQ29tcG9uZW50IGZyb20gJ0AvQ29tcG9uZW50cy9UcmFuc2Zvcm1Db21wb25lbnQnO1xuaW1wb3J0IEdhbWUgZnJvbSAnLi9HYW1lJztcblxuR2FtZS5yZWdpc3RlckNvbXBvbmVudChcbiAgICBUcmFuc2Zvcm1Db21wb25lbnQsXG4gICAgUmlnaWRib2R5Q29tcG9uZW50LFxuICAgIFJlbmRlckNvbXBvbmVudCxcbiAgICBTaGFwZVJlbmRlcmVyQ29tcG9uZW50LFxuICAgIFRpbGVSZW5kZXJlckNvbXBvbmVudFxuKTtcblxuZXhwb3J0IHsgZGVmYXVsdCBhcyBUaWxlbWFwIH0gZnJvbSBcIkAvQXNzZXRzL1RpbGVtYXBcIjtcbmV4cG9ydCB7IGRlZmF1bHQgYXMgQ29sb3IgfSBmcm9tIFwiQC9SZW5kZXJlci9Db2xvclwiO1xuZXhwb3J0IHsgZGVmYXVsdCBhcyBDb21wb25lbnQgfSBmcm9tIFwiQC9EYXRhL0NvbXBvbmVudFwiO1xuZXhwb3J0IHsgZGVmYXVsdCBhcyBFbnRpdHkgfSBmcm9tIFwiQC9EYXRhL0VudGl0eVwiO1xuZXhwb3J0IHsgZGVmYXVsdCBhcyBWZWN0b3IyIH0gZnJvbSBcIkAvRGF0YS9WZWN0b3IyXCI7XG5leHBvcnQgeyBkZWZhdWx0IGFzIEtleWJvYXJkIH0gZnJvbSBcIkAvS2V5Ym9hcmRcIjtcbmV4cG9ydCB7IGRlZmF1bHQgYXMgTW91c2UgfSBmcm9tIFwiQC9Nb3VzZVwiO1xuXG5leHBvcnQgZGVmYXVsdCBHYW1lOyJdLAogICJtYXBwaW5ncyI6ICI7Ozs7Ozs7OztBQUtBLHNCQUErQjtBQUFBLEVBQ2xCLGVBQW1DO0FBQUEsRUFFNUM7QUFBQSxFQUVBLGNBQWM7QUFBQTtBQUFBLEVBQ2QsTUFBTSxZQUE4QixRQUFzQjtBQUFBO0FBQUEsRUFDMUQsUUFBUSxZQUE4QixRQUFzQjtBQUFBO0FBQUEsRUFDNUQsT0FBTyxZQUE4QixRQUFzQjtBQUFBO0FBQUE7QUFSL0Q7OztBQ0RBLG9DQUE2QyxVQUFVO0FBQUEsRUFDbkQsVUFBVSxZQUF1QztBQUM3QyxXQUFPO0FBQUEsTUFDSCxLQUFLO0FBQUEsTUFDTCxTQUFTO0FBQUE7QUFBQTtBQUFBLEVBSWpCLE9BQU8sWUFB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
