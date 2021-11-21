var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __defNormalProp = (obj, key, value) => key in obj ? __defProp(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var __markAsModule = (target) => __defProp(target, "__esModule", { value: true });
var __name = (target, value) => __defProp(target, "name", { value, configurable: true });
var __commonJS = (cb, mod) => function __require() {
  return mod || (0, cb[Object.keys(cb)[0]])((mod = { exports: {} }).exports, mod), mod.exports;
};
var __reExport = (target, module, desc) => {
  if (module && typeof module === "object" || typeof module === "function") {
    for (let key of __getOwnPropNames(module))
      if (!__hasOwnProp.call(target, key) && key !== "default")
        __defProp(target, key, { get: () => module[key], enumerable: !(desc = __getOwnPropDesc(module, key)) || desc.enumerable });
  }
  return target;
};
var __toModule = (module) => {
  return __reExport(__markAsModule(__defProp(module != null ? __create(__getProtoOf(module)) : {}, "default", module && module.__esModule && "default" in module ? { get: () => module.default, enumerable: true } : { value: module, enumerable: true })), module);
};
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
    return [
      new Vector2(-16, -16),
      new Vector2(16, 16),
      new Vector2(-16, 16),
      new Vector2(16, -16),
      new Vector2(-16, -16),
      new Vector2(16, -16),
      new Vector2(16, 16),
      new Vector2(-16, 16)
    ];
  }
  render(attributes, entity) {
    if (Runtime_default.debug) {
      Runtime_default.canvas.wirePolygon(entity.transform.position, entity.transform.rotation, Color.white, entity.bounds);
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
    return this;
  }
  toString() {
    return `(${Math.round(this.x * 100) / 100}, ${Math.round(this.y * 100) / 100})`;
  }
};
var Vector2 = _Vector2;
__name(Vector2, "Vector2");
__publicField(Vector2, "zero", new _Vector2(0, 0));
__publicField(Vector2, "one", new _Vector2(1, 1));
__publicField(Vector2, "up", new _Vector2(0, -1));
__publicField(Vector2, "down", new _Vector2(0, 1));
__publicField(Vector2, "left", new _Vector2(-1, 0));
__publicField(Vector2, "right", new _Vector2(1, 0));

// src/Runtime/Renderer/Convex.ts
var Convex = class {
  static fromPoints(points) {
    return this.generateConvex(points);
  }
  static fromShapes(shapes, options) {
    const points = Convex.convertShapesToPoints(shapes, options);
    return this.generateConvex(points);
  }
  static convertShapesToPoints(shapes, options) {
    const points = [];
    const circleResolution = options?.circleResolution ?? 64;
    for (const shape of shapes) {
      switch (shape.type) {
        case "box":
          const width = typeof shape.size == "number" ? shape.size : shape.size?.x ?? 16;
          const height = typeof shape.size == "number" ? shape.size : shape.size?.y ?? 16;
          const offset = shape.offset.rotate(shape.rotation);
          points.push(offset.minus(-width / 2, -height / 2).rotate(-shape.rotation), offset.minus(-width / 2, height / 2).rotate(-shape.rotation), offset.minus(width / 2, height / 2).rotate(-shape.rotation), offset.minus(width / 2, -height / 2).rotate(-shape.rotation), offset.minus(-width / 2, -height / 2).rotate(-shape.rotation));
          break;
        case "polygon":
          points.push(...shape.indices.map((x) => x.add(shape.offset)));
          break;
        case "circle":
          const start = shape.arc?.[0] ?? 0;
          const end = shape.arc?.[1] ?? 360;
          const distance = 360 / circleResolution;
          const parts = (end - start) / distance;
          for (let i = 0; i < parts; i++) {
            points.push(shape.offset.add(Vector2.right.multiply(shape.size / 2).rotate(shape.rotation + (distance * i + start))));
          }
          points.push(shape.offset.add(Vector2.one.multiply(shape.size / 3).rotate(shape.rotation + start - 45)));
          break;
      }
    }
    return points;
  }
  static getPivotPoint(points) {
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
  static getOrientation(a, b, c) {
    return (b.y - a.y) * (c.x - b.x) - (c.y - b.y) * (b.x - a.x);
  }
  static generateConvex(points) {
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
        offset: Vector2.zero,
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
    position: Vector2.zero,
    rotation: 0
  };
};
__name(TransformComponent, "TransformComponent");

// src/Runtime/Components/RigidbodyComponent.ts
var RigidbodyComponent = class extends Component {
  dependencies = [TransformComponent];
  defaults = {
    velocity: new Vector2(),
    friction: 0.2,
    acceleration: 0.8
  };
  start() {
  }
  destroy() {
  }
  update(attributes, entity) {
    let { friction, acceleration } = attributes;
    attributes.velocity = attributes.velocity.lerp(Vector2.zero, friction);
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
    const halfWidth = new Vector2(currentTile.width / 2, currentTile.height / 2);
    return [
      new Vector2(-halfWidth.x, -halfWidth.y),
      new Vector2(halfWidth.x, -halfWidth.y),
      new Vector2(halfWidth.x, halfWidth.y),
      new Vector2(-halfWidth.x, halfWidth.y)
    ];
  }
  start(data) {
    if (data.tileMap == TileMap.empty)
      throw new Error("Please assign a tilemap to this entity.");
    if (data.scale != 1)
      data.tileMap.magnitude = data.scale;
  }
  render(attributes, entity) {
    const { tile, tileMap, framerate } = attributes;
    if (Array.isArray(tile)) {
      const currentTile = tileMap.getTile(tile[Math.round(Runtime_default.time / framerate) % tile.length]);
      const center = new Vector2(currentTile.width / 2, currentTile.height / 2);
      Runtime_default.canvas.drawTile(entity.transform.position.minus(center), entity.transform.rotation, tileMap, currentTile);
    } else {
      try {
        const currentTile = tileMap.getTile(tile);
        const center = new Vector2(currentTile.width / 2, currentTile.height / 2);
        Runtime_default.canvas.drawTile(entity.transform.position.minus(center), entity.transform.rotation, tileMap, tile);
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
console.log(Vector2);
var Camera = class {
  static get up() {
    return Vector2.fromAngle(-this.rotation);
  }
  static worldToCameraSpace(worldPosition) {
    const rotation = this.rotation % 360;
    return worldPosition.minus(this.position).rotate(rotation).multiply(this.zoom).add(Game.canvas.middle);
  }
  static cameraToWorldSpace(cameraPosition) {
    return cameraPosition.rotate(-this.rotation).divide(this.zoom).add(this.position);
  }
};
__name(Camera, "Camera");
__publicField(Camera, "position", new Vector2());
__publicField(Camera, "zoom", 1);
__publicField(Camera, "rotation", 0);

// src/Runtime/Renderer/Canvas.ts
var Canvas = class {
  get width() {
    return this.canvas.width;
  }
  get height() {
    return this.canvas.height;
  }
  get middle() {
    return new Vector2(this.canvas.width / 2, this.canvas.height / 2);
  }
  get size() {
    return new Vector2(this.canvas.width, this.canvas.height);
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
  rotate(angle) {
  }
  circle(worldPosition, rotation, size, color, arc = [0, 360]) {
    const position = Camera.worldToCameraSpace(worldPosition);
    const localRotation = rotation + Camera.rotation;
    this.ctx.beginPath();
    this.ctx.fillStyle = color.toString();
    this.ctx.lineWidth = 0;
    this.ctx.arc(position.x, position.y, size / 2 * Camera.zoom, (arc[0] + localRotation) % 360 * DEGREE_TO_RADIAL, (arc[1] + localRotation % 360) * DEGREE_TO_RADIAL);
    this.ctx.fill();
    this.ctx.closePath();
  }
  box(worldPosition, worldRotation, color, size = Vector2.one) {
    const width = typeof size == "number" ? size : size.x;
    const height = typeof size == "number" ? size : size.y;
    this.polygon(worldPosition, worldRotation, color, [
      new Vector2(-width / 2, -height / 2),
      new Vector2(-width / 2, height / 2),
      new Vector2(width / 2, height / 2),
      new Vector2(width / 2, -height / 2),
      new Vector2(-width / 2, -height / 2)
    ]);
    this.ctx.closePath();
  }
  tracePolygon(worldPosition, rotation, color, indices) {
    this.ctx.beginPath();
    if (indices.length < 2)
      return;
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
  text(worldPosition, worldRotation, string, color = Color.black, size = 16) {
    const position = Camera.worldToCameraSpace(worldPosition);
    this.ctx.font = `${size}px sans-serif`;
    this.ctx.strokeStyle = color.toString();
    this.ctx.fillStyle = color.toString();
    this.ctx.fillText(string, position.x, position.y);
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
        else if (shape.size instanceof Vector2)
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
    const center = new Vector2(info.width * tileMap.magnitude, info.height * tileMap.magnitude).divide(2);
    const position = Camera.worldToCameraSpace(worldPosition.minus(center));
    const size = tileMap.magnitude * Camera.zoom;
    this.ctx.translate(position.x, position.y);
    this.ctx.rotate((worldRotation + Camera.rotation) * DEGREE_TO_RADIAL);
    this.ctx.imageSmoothingEnabled = false;
    this.ctx.drawImage(tileMap.image, info.x, info.y, info.width, info.height, info.width * size * 0.5, info.width * size * 0.5, info.width * size, info.height * size);
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
  }
};
__name(Canvas, "Canvas");

// src/Runtime/Data/Entity.ts
var convexHullCache = new Map();
var Entity5 = class {
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
      return [];
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
      this._components.set(_component, { ..._component.defaults, ...data });
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
    const copy = new Entity5();
    copy.tags = new Set(this.tags);
    for (const [component, data] of this._components)
      copy.addComponent(component.constructor, structuredClone(data));
    return copy;
  }
};
__name(Entity5, "Entity");

// src/Runtime/Keyboard.ts
var Keyboard = class {
  static initialize() {
    window.addEventListener("keydown", (e) => this.handleKeyDown(e));
    window.addEventListener("keyup", (e) => this.handleKeyUp(e));
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
  static get entities() {
    return this._entities;
  }
  static start() {
    requestAnimationFrame(this.loop.bind(this));
  }
  static getEntity(...tags) {
    return this._entities.find((x) => !tags.some((y) => !x.tags.has(y)));
  }
  static getEntities(...tags) {
    if (tags.length == 0)
      return this._entities;
    return this._entities.filter((x) => !tags.some((y) => !x.tags.has(y)));
  }
  static registerEntity(entity) {
    this._entities.push(entity);
    entity.start();
  }
  static removeEntity(entity) {
    const index = this._entities.indexOf(entity);
    this._entities.splice(index, 1);
  }
  static createEntity(...tags) {
    const entity = new Entity5();
    for (const tag of tags)
      entity.tags.add(tag);
    this._entities.push(entity);
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
      import("./Debugger-E67X5NLN.js").then((x) => {
        console.log(x);
        x.default.start();
      }).catch((e) => console.error("Failed to load debugger", e));
    }
    for (const entity of this._entities) {
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
__publicField(Game, "_entities", []);
__publicField(Game, "_components", new Map());
__publicField(Game, "_time", 0);
__publicField(Game, "updateCallbacks", []);
__publicField(Game, "_paused", false);
__publicField(Game, "_debug", true);
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
    return new Vector2(this._x, this._y);
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
      e.preventDefault();
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
  __commonJS,
  __toModule,
  Component,
  RenderComponent,
  lerp,
  Color,
  Vector2,
  Convex,
  ShapeRendererComponent,
  RigidbodyComponent,
  TileMap,
  TileRendererComponent,
  Camera,
  Entity5 as Entity,
  Keyboard,
  Mouse,
  Runtime_default
};
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsiLi4vLi4vc3JjL1J1bnRpbWUvRGF0YS9Db21wb25lbnQudHMiLCAiLi4vLi4vc3JjL1J1bnRpbWUvQ29tcG9uZW50cy9SZW5kZXJDb21wb25lbnQudHMiLCAiLi4vLi4vc3JjL1J1bnRpbWUvSGVscGVycy50cyIsICIuLi8uLi9zcmMvUnVudGltZS9SZW5kZXJlci9Db2xvci50cyIsICIuLi8uLi9zcmMvUnVudGltZS9EYXRhL1ZlY3RvcjIudHMiLCAiLi4vLi4vc3JjL1J1bnRpbWUvUmVuZGVyZXIvQ29udmV4LnRzIiwgIi4uLy4uL3NyYy9SdW50aW1lL0NvbXBvbmVudHMvU2hhcGVSZW5kZXJlckNvbXBvbmVudC50cyIsICIuLi8uLi9zcmMvUnVudGltZS9Db21wb25lbnRzL1RyYW5zZm9ybUNvbXBvbmVudC50cyIsICIuLi8uLi9zcmMvUnVudGltZS9Db21wb25lbnRzL1JpZ2lkYm9keUNvbXBvbmVudC50cyIsICIuLi8uLi9zcmMvUnVudGltZS9Bc3NldHMvVGlsZW1hcC50cyIsICIuLi8uLi9zcmMvUnVudGltZS9Db21wb25lbnRzL1RpbGVSZW5kZXJlckNvbXBvbmVudC50cyIsICIuLi8uLi9zcmMvUnVudGltZS9SZW5kZXJlci9DYW1lcmEudHMiLCAiLi4vLi4vc3JjL1J1bnRpbWUvUmVuZGVyZXIvQ2FudmFzLnRzIiwgIi4uLy4uL3NyYy9SdW50aW1lL0RhdGEvRW50aXR5LnRzIiwgIi4uLy4uL3NyYy9SdW50aW1lL0tleWJvYXJkLnRzIiwgIi4uLy4uL3NyYy9SdW50aW1lL0dhbWUudHMiLCAiLi4vLi4vc3JjL1J1bnRpbWUvTW91c2UudHMiLCAiLi4vLi4vc3JjL1J1bnRpbWUvaW5kZXgudHMiXSwKICAic291cmNlc0NvbnRlbnQiOiBbImltcG9ydCBFbnRpdHkgZnJvbSAnQC9EYXRhL0VudGl0eSc7XG5cbmV4cG9ydCB0eXBlIENvbXBvbmVudFR5cGU8VCBleHRlbmRzIENvbXBvbmVudD4gPSAobmV3ICguLi5wYXJhbWV0ZXJzOiBDb25zdHJ1Y3RvclBhcmFtZXRlcnM8dHlwZW9mIENvbXBvbmVudD4pID0+IFQpICYgdHlwZW9mIENvbXBvbmVudDtcblxuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBDb21wb25lbnQge1xuICAgIHJlYWRvbmx5IGRlcGVuZGVuY2llczogdHlwZW9mIENvbXBvbmVudFtdID0gW11cblxuICAgIGRlZmF1bHRzPzogYW55O1xuXG4gICAgY29uc3RydWN0b3IoKSB7IH1cbiAgICBzdGFydChhdHRyaWJ1dGVzOiB0aGlzW1wiZGVmYXVsdHNcIl0sIGVudGl0eTogRW50aXR5KTogdm9pZCB7IH07XG4gICAgZGVzdHJveShhdHRyaWJ1dGVzOiB0aGlzW1wiZGVmYXVsdHNcIl0sIGVudGl0eTogRW50aXR5KTogdm9pZCB7IH07XG4gICAgdXBkYXRlKGF0dHJpYnV0ZXM6IHRoaXNbXCJkZWZhdWx0c1wiXSwgZW50aXR5OiBFbnRpdHkpOiB2b2lkIHsgfTtcbn0iLCAiaW1wb3J0IEdhbWUsIHsgQ29sb3IsIEVudGl0eSwgVmVjdG9yMiB9IGZyb20gJ0VuZ2luZSc7XG5pbXBvcnQgQ29tcG9uZW50IGZyb20gJ0AvRGF0YS9Db21wb25lbnQnO1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBSZW5kZXJDb21wb25lbnQgZXh0ZW5kcyBDb21wb25lbnQge1xuICAgIGdldEJvdW5kcyhhdHRyaWJ1dGVzOiB0aGlzW1wiZGVmYXVsdHNcIl0pIHtcbiAgICAgICAgcmV0dXJuIFtcbiAgICAgICAgICAgIG5ldyBWZWN0b3IyKC0xNiwgLTE2KSxcbiAgICAgICAgICAgIG5ldyBWZWN0b3IyKDE2LCAxNiksXG4gICAgICAgICAgICBuZXcgVmVjdG9yMigtMTYsIDE2KSxcbiAgICAgICAgICAgIG5ldyBWZWN0b3IyKDE2LCAtMTYpLFxuICAgICAgICAgICAgbmV3IFZlY3RvcjIoLTE2LCAtMTYpLFxuICAgICAgICAgICAgbmV3IFZlY3RvcjIoMTYsIC0xNiksXG4gICAgICAgICAgICBuZXcgVmVjdG9yMigxNiwgMTYpLFxuICAgICAgICAgICAgbmV3IFZlY3RvcjIoLTE2LCAxNiksXG4gICAgICAgIF07XG4gICAgfVxuXG4gICAgcmVuZGVyKGF0dHJpYnV0ZXM6IHRoaXNbXCJkZWZhdWx0c1wiXSwgZW50aXR5OiBFbnRpdHkpIHtcbiAgICAgICAgaWYgKEdhbWUuZGVidWcpIHtcbiAgICAgICAgICAgIEdhbWUuY2FudmFzLndpcmVQb2x5Z29uKGVudGl0eS50cmFuc2Zvcm0ucG9zaXRpb24sIGVudGl0eS50cmFuc2Zvcm0ucm90YXRpb24sIENvbG9yLndoaXRlLCBlbnRpdHkuYm91bmRzKTtcbiAgICAgICAgfVxuICAgIH1cbn0iLCAiaW1wb3J0IEdhbWUgZnJvbSAnRW5naW5lJztcblxuLyoqXG4gKiBAcGFyYW0ge251bWJlcn0gc3RhcnRcbiAqIEBwYXJhbSB7bnVtYmVyfSBlbmRcbiAqIEBwYXJhbSB7bnVtYmVyfSBhbXRcbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIGxlcnAoc3RhcnQ6IG51bWJlciwgZW5kOiBudW1iZXIsIGFtdDogbnVtYmVyKSB7XG4gICAgcmV0dXJuICgxIC0gYW10KSAqIHN0YXJ0ICsgYW10ICogZW5kO1xufVxuXG5leHBvcnQgY29uc3QgREVHUkVFX1RPX1JBRElBTCA9IE1hdGguUEkgLyAxODA7XG5cbmV4cG9ydCBmdW5jdGlvbiBldmVyeShtaWxpc2Vjb25kczogbnVtYmVyLCBwcmVjaXNpb24gPSAxMCkge1xuICAgIHJldHVybiBNYXRoLmZsb29yKEdhbWUudGltZSAvIHByZWNpc2lvbikgKiBwcmVjaXNpb24gJSBtaWxpc2Vjb25kcyA9PSAwO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gc3RydWN0dXJlZENsb25lKG9iamVjdDogYW55KTogYW55IHtcbiAgICBpZiAodHlwZW9mIG9iamVjdCAhPSBcIm9iamVjdFwiKVxuICAgICAgICByZXR1cm4gb2JqZWN0O1xuXG4gICAgaWYgKHR5cGVvZiBvYmplY3QuY29weSA9PSBcImZ1bmN0aW9uXCIpXG4gICAgICAgIHJldHVybiBvYmplY3QuY29weSgpO1xuXG4gICAgaWYgKEFycmF5LmlzQXJyYXkob2JqZWN0KSlcbiAgICAgICAgcmV0dXJuIFsuLi5vYmplY3QubWFwKHN0cnVjdHVyZWRDbG9uZSldO1xuXG4gICAgY29uc3QgZW50cmllcyA9IE9iamVjdC5lbnRyaWVzKG9iamVjdCk7XG4gICAgbGV0IHJlc3VsdDogUmVjb3JkPHN0cmluZyB8IG51bWJlciwgYW55PiA9IHt9O1xuXG4gICAgZm9yIChjb25zdCBba2V5LCB2YWx1ZV0gb2YgZW50cmllcykge1xuICAgICAgICByZXN1bHRba2V5XSA9IHN0cnVjdHVyZWRDbG9uZSh2YWx1ZSk7XG4gICAgfVxuXG4gICAgcmV0dXJuIHJlc3VsdDtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGdlbmVyYXRlSWQoc2l6ZSA9IDgpIHtcbiAgICBsZXQgaWQgPSAnJztcbiAgICBsZXQgYnl0ZXMgPSBjcnlwdG8uZ2V0UmFuZG9tVmFsdWVzKG5ldyBVaW50OEFycmF5KHNpemUpKTtcblxuICAgIHdoaWxlIChzaXplLS0pIHtcbiAgICAgICAgbGV0IGJ5dGUgPSBieXRlc1tzaXplXSAmIDYzO1xuICAgICAgICBpZiAoYnl0ZSA8IDM2KSB7XG4gICAgICAgICAgICAvLyBgMC05YS16YFxuICAgICAgICAgICAgaWQgKz0gYnl0ZS50b1N0cmluZygzNik7XG4gICAgICAgIH0gZWxzZSBpZiAoYnl0ZSA8IDYyKSB7XG4gICAgICAgICAgICAvLyBgQS1aYFxuICAgICAgICAgICAgaWQgKz0gKGJ5dGUgLSAyNikudG9TdHJpbmcoMzYpLnRvVXBwZXJDYXNlKCk7XG4gICAgICAgIH0gZWxzZSBpZiAoYnl0ZSA8IDYzKSB7XG4gICAgICAgICAgICBpZCArPSAnIyc7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBpZCArPSAnJCc7XG4gICAgICAgIH1cbiAgICB9XG4gICAgcmV0dXJuIGlkO1xufSIsICJpbXBvcnQgeyBsZXJwIH0gZnJvbSAnQC9IZWxwZXJzJztcblxuY29uc3QgY29sb3JDYWNoZSA9IG5ldyBNYXA8bnVtYmVyLCBzdHJpbmc+KCk7XG5cbih3aW5kb3cgYXMgYW55KS5jb2xvckNhY2hlID0gY29sb3JDYWNoZTtcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgQ29sb3Ige1xuICAgIHN0YXRpYyByZWQgPSBuZXcgQ29sb3IoMjU1LCAwLCAwKTtcbiAgICBzdGF0aWMgYmx1ZSA9IG5ldyBDb2xvcigwLCAwLCAyNTUpO1xuICAgIHN0YXRpYyBncmVlbiA9IG5ldyBDb2xvcigwLCAyNTUsIDApO1xuICAgIHN0YXRpYyBibGFjayA9IG5ldyBDb2xvcigwLCAwLCAwLCAxKTtcbiAgICBzdGF0aWMgd2hpdGUgPSBuZXcgQ29sb3IoMjU1LCAyNTUsIDI1NSk7XG5cbiAgICBzdGF0aWMgcmFuZG9tKCkge1xuICAgICAgICByZXR1cm4gbmV3IENvbG9yKE1hdGgucm91bmQoTWF0aC5yYW5kb20oKSAqIDI1NSksIE1hdGgucm91bmQoTWF0aC5yYW5kb20oKSAqIDI1NSksIE1hdGgucm91bmQoTWF0aC5yYW5kb20oKSAqIDI1NSksIDEpO1xuICAgIH1cblxuICAgIHI6IG51bWJlciA9IDI1NTtcbiAgICBnOiBudW1iZXIgPSAyNTU7XG4gICAgYjogbnVtYmVyID0gMjU1O1xuICAgIGE6IG51bWJlciA9IDE7XG5cbiAgICAvKipcbiAgICAgKiBAcGFyYW0ge251bWJlcn0gW3JdXG4gICAgICogQHBhcmFtIHtudW1iZXJ9IFtnXVxuICAgICAqIEBwYXJhbSB7bnVtYmVyfSBbYl1cbiAgICAgKiBAcGFyYW0ge251bWJlcn0gW2FdXG4gICAgICovXG4gICAgY29uc3RydWN0b3IocjogbnVtYmVyLCBnOiBudW1iZXIsIGI6IG51bWJlciwgYT86IG51bWJlcikge1xuICAgICAgICB0aGlzLnIgPSByID8/IDA7XG4gICAgICAgIHRoaXMuZyA9IGcgPz8gMDtcbiAgICAgICAgdGhpcy5iID0gYiA/PyAwO1xuICAgICAgICB0aGlzLmEgPSBhID8/IDE7XG4gICAgfVxuXG4gICAgbGVycCh0YXJnZXQ6IENvbG9yLCBhbW91bnQ6IG51bWJlcikge1xuICAgICAgICByZXR1cm4gbmV3IENvbG9yKFxuICAgICAgICAgICAgTWF0aC5yb3VuZChsZXJwKHRoaXMuciwgdGFyZ2V0LnIsIGFtb3VudCkpLFxuICAgICAgICAgICAgTWF0aC5yb3VuZChsZXJwKHRoaXMuZywgdGFyZ2V0LmcsIGFtb3VudCkpLFxuICAgICAgICAgICAgTWF0aC5yb3VuZChsZXJwKHRoaXMuYiwgdGFyZ2V0LmcsIGFtb3VudCkpXG4gICAgICAgICk7XG4gICAgfVxuXG4gICAgaW52ZXJ0KCkge1xuICAgICAgICByZXR1cm4gbmV3IENvbG9yKDI1NSAtIHRoaXMuciwgMjU1IC0gdGhpcy5nLCAyNTUgLSB0aGlzLmIsIHRoaXMuYSk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogQHBhcmFtIHtudW1iZXJ9IGZhY3RvclxuICAgICAqL1xuICAgIHNoYWRlKGZhY3RvcjogbnVtYmVyKSB7XG4gICAgICAgIHJldHVybiBuZXcgQ29sb3IoXG4gICAgICAgICAgICBNYXRoLmZsb29yKHRoaXMuciAqICgxIC0gZmFjdG9yKSksXG4gICAgICAgICAgICBNYXRoLmZsb29yKHRoaXMuZyAqICgxIC0gZmFjdG9yKSksXG4gICAgICAgICAgICBNYXRoLmZsb29yKHRoaXMuYiAqICgxIC0gZmFjdG9yKSlcbiAgICAgICAgKTtcbiAgICB9XG5cbiAgICBjb3B5KCkge1xuICAgICAgICByZXR1cm4gdGhpcztcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBAcGFyYW0ge3N0cmluZ30gc3RyaW5nXG4gICAgICovXG4gICAgc3RhdGljIGZyb21TdHJpbmcoc3RyaW5nOiBzdHJpbmcpIHtcbiAgICAgICAgaWYgKCFzdHJpbmcuc3RhcnRzV2l0aChcIiNcIikpXG4gICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoXCJDb2xvci5mcm9tU3RyaW5nIGV4cGVjdHMgYSBzdHJpbmcgaW4gdGhlIGAjUlJHR0JCKEFBKT9gIGZvcm1hdC5cIik7XG5cbiAgICAgICAgY29uc3QgcGFydHMgPSBzdHJpbmcuc3Vic3RyaW5nKDEpLnNwbGl0KCcnKTtcbiAgICAgICAgY29uc3QgcmVzdWx0ID0gbmV3IENvbG9yKFxuICAgICAgICAgICAgcGFyc2VJbnQocGFydHNbMF0gKyBwYXJ0c1sxXSwgMTYpLFxuICAgICAgICAgICAgcGFyc2VJbnQocGFydHNbMl0gKyBwYXJ0c1szXSwgMTYpLFxuICAgICAgICAgICAgcGFyc2VJbnQocGFydHNbNF0gKyBwYXJ0c1s1XSwgMTYpXG4gICAgICAgICk7XG5cbiAgICAgICAgaWYgKHBhcnRzLmxlbmd0aCA9PSA4KVxuICAgICAgICAgICAgcmVzdWx0LmEgPSBwYXJzZUludChwYXJ0c1s2XSArIHBhcnRzWzddLCAxNik7XG5cbiAgICAgICAgcmV0dXJuIHJlc3VsdDtcbiAgICB9XG5cbiAgICB0b1N0cmluZygpIHtcbiAgICAgICAgY29uc3QgaGFzaCA9IDB4RkZGRiAqIHRoaXMuciArIDB4RkYgKiB0aGlzLmcgKyB0aGlzLmI7XG5cbiAgICAgICAgaWYgKGNvbG9yQ2FjaGUuaGFzKGhhc2gpKVxuICAgICAgICAgICAgcmV0dXJuIGNvbG9yQ2FjaGUuZ2V0KGhhc2gpITtcblxuICAgICAgICBjb25zdCBoZXggPSBgIyR7dGhpcy5yLnRvU3RyaW5nKDE2KS5wYWRTdGFydCgyLCAnMCcpfSR7dGhpcy5nLnRvU3RyaW5nKDE2KS5wYWRTdGFydCgyLCAnMCcpfSR7dGhpcy5iLnRvU3RyaW5nKDE2KS5wYWRTdGFydCgyLCAnMCcpfSR7KHRoaXMuYSAqIDI1NSkudG9TdHJpbmcoMTYpLnBhZFN0YXJ0KDIsICcwJyl9YDtcbiAgICAgICAgY29sb3JDYWNoZS5zZXQoaGFzaCwgaGV4KTtcblxuICAgICAgICByZXR1cm4gaGV4O1xuICAgIH1cbn0iLCAiaW1wb3J0IHsgREVHUkVFX1RPX1JBRElBTCwgbGVycCB9IGZyb20gJ0AvSGVscGVycyc7XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIFZlY3RvcjIge1xuXG4gICAgc3RhdGljIHplcm8gPSBuZXcgVmVjdG9yMigwLCAwKTtcbiAgICBzdGF0aWMgb25lID0gbmV3IFZlY3RvcjIoMSwgMSk7XG5cbiAgICBzdGF0aWMgdXAgPSBuZXcgVmVjdG9yMigwLCAtMSk7XG4gICAgc3RhdGljIGRvd24gPSBuZXcgVmVjdG9yMigwLCAxKTtcblxuICAgIHN0YXRpYyBsZWZ0ID0gbmV3IFZlY3RvcjIoLTEsIDApO1xuICAgIHN0YXRpYyByaWdodCA9IG5ldyBWZWN0b3IyKDEsIDApO1xuXG4gICAgc3RhdGljIGdldCByYW5kb20oKSB7XG4gICAgICAgIHJldHVybiBuZXcgVmVjdG9yMihcbiAgICAgICAgICAgIE1hdGgucmFuZG9tKCksXG4gICAgICAgICAgICBNYXRoLnJhbmRvbSgpXG4gICAgICAgICk7XG4gICAgfVxuXG4gICAgZ2V0IGxlbmd0aCgpIHtcbiAgICAgICAgcmV0dXJuIE1hdGguc3FydCh0aGlzLnggKiogMiArIHRoaXMueSAqKiAyKTtcbiAgICB9XG5cblxuICAgIGNvbnN0cnVjdG9yKHB1YmxpYyB4OiBudW1iZXIgPSAwLCBwdWJsaWMgeTogbnVtYmVyID0gMCkgeyB9XG5cbiAgICBsZXJwKHRhcmdldDogVmVjdG9yMiwgYW1vdW50OiBudW1iZXIpIHtcbiAgICAgICAgcmV0dXJuIG5ldyBWZWN0b3IyKFxuICAgICAgICAgICAgbGVycCh0aGlzLngsIHRhcmdldC54LCBhbW91bnQpLFxuICAgICAgICAgICAgbGVycCh0aGlzLnksIHRhcmdldC55LCBhbW91bnQpXG4gICAgICAgICk7XG4gICAgfVxuXG4gICAgZG90KHRlc3Q6IFZlY3RvcjIpIHtcbiAgICAgICAgcmV0dXJuICh0aGlzLnggKiB0ZXN0LngpICsgKHRoaXMueSAqIHRlc3QueSk7XG4gICAgfVxuXG4gICAgZGlzdGFuY2UoZ29hbDogVmVjdG9yMikge1xuICAgICAgICByZXR1cm4gTWF0aC5zcXJ0KFxuICAgICAgICAgICAgKGdvYWwueCAtIHRoaXMueCkgKiogMlxuICAgICAgICAgICAgK1xuICAgICAgICAgICAgKGdvYWwueSAtIHRoaXMueSkgKiogMlxuICAgICAgICApO1xuICAgIH1cblxuICAgIGFuZ2xlKHRhcmdldDogVmVjdG9yMikge1xuICAgICAgICByZXR1cm4gTWF0aC5hdGFuMih0YXJnZXQueSAtIHRoaXMueSwgdGFyZ2V0LnggLSB0aGlzLngpO1xuICAgIH1cblxuICAgIGludmVydCgpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMubXVsdGlwbHkoLTEpO1xuICAgIH1cblxuICAgIHJvdGF0ZShkZWdyZWVzOiBudW1iZXIpIHtcbiAgICAgICAgY29uc3QgcmFkaWFscyA9IGRlZ3JlZXMgKiBERUdSRUVfVE9fUkFESUFMO1xuXG4gICAgICAgIHJldHVybiBuZXcgVmVjdG9yMihcbiAgICAgICAgICAgIHRoaXMueCAqIE1hdGguY29zKHJhZGlhbHMpIC0gdGhpcy55ICogTWF0aC5zaW4ocmFkaWFscyksXG4gICAgICAgICAgICB0aGlzLnggKiBNYXRoLnNpbihyYWRpYWxzKSArIHRoaXMueSAqIE1hdGguY29zKHJhZGlhbHMpLFxuICAgICAgICApO1xuICAgIH1cblxuICAgIG5vcm1hbGl6ZSgpIHtcbiAgICAgICAgaWYgKHRoaXMubGVuZ3RoID09IDApXG4gICAgICAgICAgICByZXR1cm4gdGhpcztcbiAgICAgICAgcmV0dXJuIHRoaXMuZGl2aWRlKHRoaXMubGVuZ3RoKTtcbiAgICB9XG5cbiAgICBsaW1pdChsaW1pdDogbnVtYmVyID0gMSkge1xuICAgICAgICByZXR1cm4gbmV3IFZlY3RvcjIoXG4gICAgICAgICAgICBNYXRoLm1pbihNYXRoLmFicyh0aGlzLngpLCBsaW1pdCkgKiBNYXRoLnNpZ24odGhpcy54KSxcbiAgICAgICAgICAgIE1hdGgubWluKE1hdGguYWJzKHRoaXMueSksIGxpbWl0KSAqIE1hdGguc2lnbih0aGlzLnkpXG4gICAgICAgICk7XG4gICAgfVxuXG4gICAgbXVsdGlwbHkoeDogbnVtYmVyKTogVmVjdG9yMjtcbiAgICBtdWx0aXBseSh4OiBudW1iZXIsIHk6IG51bWJlcik6IFZlY3RvcjI7XG4gICAgbXVsdGlwbHkodmVjdG9yOiBWZWN0b3IyKTogVmVjdG9yMjtcbiAgICBtdWx0aXBseSh2ZWN0b3I6IG51bWJlciB8IFZlY3RvcjIsIHk/OiBudW1iZXIpIHtcbiAgICAgICAgaWYgKHZlY3RvciBpbnN0YW5jZW9mIFZlY3RvcjIpXG4gICAgICAgICAgICByZXR1cm4gbmV3IFZlY3RvcjIoXG4gICAgICAgICAgICAgICAgdGhpcy54ICogdmVjdG9yLngsXG4gICAgICAgICAgICAgICAgdGhpcy55ICogdmVjdG9yLnlcbiAgICAgICAgICAgICk7XG5cbiAgICAgICAgcmV0dXJuIG5ldyBWZWN0b3IyKFxuICAgICAgICAgICAgdGhpcy54ICogdmVjdG9yLFxuICAgICAgICAgICAgdGhpcy55ICogKHkgPz8gdmVjdG9yKVxuICAgICAgICApO1xuICAgIH1cblxuICAgIGRpdmlkZSh4OiBudW1iZXIpOiBWZWN0b3IyO1xuICAgIGRpdmlkZSh4OiBudW1iZXIsIHk6IG51bWJlcik6IFZlY3RvcjI7XG4gICAgZGl2aWRlKHZlY3RvcjogVmVjdG9yMik6IFZlY3RvcjI7XG4gICAgZGl2aWRlKHZlY3RvcjogbnVtYmVyIHwgVmVjdG9yMiwgeT86IG51bWJlcikge1xuICAgICAgICBpZiAodmVjdG9yIGluc3RhbmNlb2YgVmVjdG9yMilcbiAgICAgICAgICAgIHJldHVybiBuZXcgVmVjdG9yMihcbiAgICAgICAgICAgICAgICB0aGlzLnggLyB2ZWN0b3IueCxcbiAgICAgICAgICAgICAgICB0aGlzLnkgLyB2ZWN0b3IueVxuICAgICAgICAgICAgKTtcblxuICAgICAgICByZXR1cm4gbmV3IFZlY3RvcjIoXG4gICAgICAgICAgICB0aGlzLnggLyB2ZWN0b3IsXG4gICAgICAgICAgICB0aGlzLnkgLyAoeSA/PyB2ZWN0b3IpXG4gICAgICAgICk7XG4gICAgfVxuXG4gICAgYWRkKHg6IG51bWJlcik6IFZlY3RvcjI7XG4gICAgYWRkKHg6IG51bWJlciwgeTogbnVtYmVyKTogVmVjdG9yMjtcbiAgICBhZGQodmVjdG9yOiBWZWN0b3IyKTogVmVjdG9yMjtcbiAgICBhZGQodmVjdG9yOiBudW1iZXIgfCBWZWN0b3IyLCB5PzogbnVtYmVyKSB7XG4gICAgICAgIGlmICh2ZWN0b3IgaW5zdGFuY2VvZiBWZWN0b3IyKVxuICAgICAgICAgICAgcmV0dXJuIG5ldyBWZWN0b3IyKFxuICAgICAgICAgICAgICAgIHRoaXMueCArIHZlY3Rvci54LFxuICAgICAgICAgICAgICAgIHRoaXMueSArIHZlY3Rvci55XG4gICAgICAgICAgICApO1xuXG4gICAgICAgIHJldHVybiBuZXcgVmVjdG9yMihcbiAgICAgICAgICAgIHRoaXMueCArIHZlY3RvcixcbiAgICAgICAgICAgIHRoaXMueSArICh5ID8/IHZlY3RvcilcbiAgICAgICAgKTtcbiAgICB9XG5cbiAgICBtaW51cyh4OiBudW1iZXIpOiBWZWN0b3IyO1xuICAgIG1pbnVzKHg6IG51bWJlciwgeTogbnVtYmVyKTogVmVjdG9yMjtcbiAgICBtaW51cyh2ZWN0b3I6IFZlY3RvcjIpOiBWZWN0b3IyO1xuICAgIG1pbnVzKHZlY3RvcjogbnVtYmVyIHwgVmVjdG9yMiwgeT86IG51bWJlcikge1xuICAgICAgICBpZiAodmVjdG9yIGluc3RhbmNlb2YgVmVjdG9yMilcbiAgICAgICAgICAgIHJldHVybiBuZXcgVmVjdG9yMihcbiAgICAgICAgICAgICAgICB0aGlzLnggLSB2ZWN0b3IueCxcbiAgICAgICAgICAgICAgICB0aGlzLnkgLSB2ZWN0b3IueVxuICAgICAgICAgICAgKTtcblxuICAgICAgICByZXR1cm4gbmV3IFZlY3RvcjIoXG4gICAgICAgICAgICB0aGlzLnggLSB2ZWN0b3IsXG4gICAgICAgICAgICB0aGlzLnkgLSAoeSA/PyB2ZWN0b3IpXG4gICAgICAgICk7XG4gICAgfVxuXG4gICAgc3RhdGljIGZyb21BbmdsZShhbmdsZTogbnVtYmVyKSB7XG4gICAgICAgIGNvbnN0IHJhZGlhbnMgPSBhbmdsZSAqIERFR1JFRV9UT19SQURJQUw7XG4gICAgICAgIHJldHVybiBuZXcgVmVjdG9yMihcbiAgICAgICAgICAgIE1hdGguc2luKHJhZGlhbnMpLFxuICAgICAgICAgICAgLU1hdGguY29zKHJhZGlhbnMpXG4gICAgICAgICk7XG4gICAgfVxuXG4gICAgY29weSgpIHtcbiAgICAgICAgcmV0dXJuIHRoaXM7XG4gICAgfVxuXG4gICAgdG9TdHJpbmcoKSB7XG4gICAgICAgIHJldHVybiBgKCR7TWF0aC5yb3VuZCh0aGlzLnggKiAxMDApIC8gMTAwfSwgJHtNYXRoLnJvdW5kKHRoaXMueSAqIDEwMCkgLyAxMDB9KWA7XG4gICAgfVxufSIsICJpbXBvcnQgeyBWZWN0b3IyIH0gZnJvbSAnRW5naW5lJztcbmltcG9ydCB7IFBvaW50MmRJbnB1dFBhcmFtcyB9IGZyb20gJ3R3ZWFrcGFuZSc7XG5pbXBvcnQgeyBTaGFwZSB9IGZyb20gJy4nO1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBDb252ZXgge1xuICAgIHN0YXRpYyBmcm9tUG9pbnRzKHBvaW50czogVmVjdG9yMltdKSB7XG4gICAgICAgIHJldHVybiB0aGlzLmdlbmVyYXRlQ29udmV4KHBvaW50cyk7XG4gICAgfVxuXG4gICAgc3RhdGljIGZyb21TaGFwZXMoc2hhcGVzOiBTaGFwZVtdLCBvcHRpb25zPzogeyBjaXJjbGVSZXNvbHV0aW9uOiBudW1iZXI7IH0pIHtcbiAgICAgICAgY29uc3QgcG9pbnRzID0gQ29udmV4LmNvbnZlcnRTaGFwZXNUb1BvaW50cyhzaGFwZXMsIG9wdGlvbnMpO1xuXG4gICAgICAgIHJldHVybiB0aGlzLmdlbmVyYXRlQ29udmV4KHBvaW50cyk7XG4gICAgfVxuXG4gICAgcHVibGljIHN0YXRpYyBjb252ZXJ0U2hhcGVzVG9Qb2ludHMoc2hhcGVzOiBTaGFwZVtdLCBvcHRpb25zPzogeyBjaXJjbGVSZXNvbHV0aW9uOiBudW1iZXI7IH0pIHtcbiAgICAgICAgY29uc3QgcG9pbnRzOiBWZWN0b3IyW10gPSBbXTtcblxuICAgICAgICBjb25zdCBjaXJjbGVSZXNvbHV0aW9uID0gb3B0aW9ucz8uY2lyY2xlUmVzb2x1dGlvbiA/PyA2NDtcblxuICAgICAgICBmb3IgKGNvbnN0IHNoYXBlIG9mIHNoYXBlcykge1xuICAgICAgICAgICAgc3dpdGNoIChzaGFwZS50eXBlKSB7XG4gICAgICAgICAgICAgICAgY2FzZSBcImJveFwiOlxuICAgICAgICAgICAgICAgICAgICBjb25zdCB3aWR0aCA9IHR5cGVvZiBzaGFwZS5zaXplID09IFwibnVtYmVyXCIgPyBzaGFwZS5zaXplIDogc2hhcGUuc2l6ZT8ueCA/PyAxNjtcbiAgICAgICAgICAgICAgICAgICAgY29uc3QgaGVpZ2h0ID0gdHlwZW9mIHNoYXBlLnNpemUgPT0gXCJudW1iZXJcIiA/IHNoYXBlLnNpemUgOiBzaGFwZS5zaXplPy55ID8/IDE2O1xuICAgICAgICAgICAgICAgICAgICBjb25zdCBvZmZzZXQgPSBzaGFwZS5vZmZzZXQucm90YXRlKHNoYXBlLnJvdGF0aW9uKTtcbiAgICAgICAgICAgICAgICAgICAgcG9pbnRzLnB1c2goXG4gICAgICAgICAgICAgICAgICAgICAgICBvZmZzZXQubWludXMoLXdpZHRoIC8gMiwgLWhlaWdodCAvIDIpLnJvdGF0ZSgtc2hhcGUucm90YXRpb24pLFxuICAgICAgICAgICAgICAgICAgICAgICAgb2Zmc2V0Lm1pbnVzKC13aWR0aCAvIDIsIGhlaWdodCAvIDIpLnJvdGF0ZSgtc2hhcGUucm90YXRpb24pLFxuICAgICAgICAgICAgICAgICAgICAgICAgb2Zmc2V0Lm1pbnVzKHdpZHRoIC8gMiwgaGVpZ2h0IC8gMikucm90YXRlKC1zaGFwZS5yb3RhdGlvbiksXG4gICAgICAgICAgICAgICAgICAgICAgICBvZmZzZXQubWludXMod2lkdGggLyAyLCAtaGVpZ2h0IC8gMikucm90YXRlKC1zaGFwZS5yb3RhdGlvbiksXG4gICAgICAgICAgICAgICAgICAgICAgICBvZmZzZXQubWludXMoLXdpZHRoIC8gMiwgLWhlaWdodCAvIDIpLnJvdGF0ZSgtc2hhcGUucm90YXRpb24pXG4gICAgICAgICAgICAgICAgICAgICk7XG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuXG4gICAgICAgICAgICAgICAgY2FzZSBcInBvbHlnb25cIjpcbiAgICAgICAgICAgICAgICAgICAgcG9pbnRzLnB1c2goLi4uc2hhcGUuaW5kaWNlcy5tYXAoeCA9PiB4LmFkZChzaGFwZS5vZmZzZXQpKSk7XG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgIGNhc2UgXCJjaXJjbGVcIjpcbiAgICAgICAgICAgICAgICAgICAgY29uc3Qgc3RhcnQgPSBzaGFwZS5hcmM/LlswXSA/PyAwO1xuICAgICAgICAgICAgICAgICAgICBjb25zdCBlbmQgPSBzaGFwZS5hcmM/LlsxXSA/PyAzNjA7XG4gICAgICAgICAgICAgICAgICAgIGNvbnN0IGRpc3RhbmNlID0gKDM2MCAvIGNpcmNsZVJlc29sdXRpb24pO1xuICAgICAgICAgICAgICAgICAgICBjb25zdCBwYXJ0cyA9IChlbmQgLSBzdGFydCkgLyBkaXN0YW5jZTtcbiAgICAgICAgICAgICAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBwYXJ0czsgaSsrKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBwb2ludHMucHVzaChcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBzaGFwZS5vZmZzZXRcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gY2FudmFzIGFwaSBhcmNzIGFyZSBiYXNlZCBvbiB0aGUgcG9zaXRpdmUgeCBheGlzIHNvIEkgdXNlZCBWZWN0b3IyLnJpZ2h0ICgxLCAwKSBoZXJlXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC5hZGQoVmVjdG9yMi5yaWdodC5tdWx0aXBseShzaGFwZS5zaXplIC8gMilcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC5yb3RhdGUoc2hhcGUucm90YXRpb24gKyAoZGlzdGFuY2UgKiBpICsgc3RhcnQpKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICApXG4gICAgICAgICAgICAgICAgICAgICAgICApO1xuICAgICAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICAgICAgcG9pbnRzLnB1c2goc2hhcGUub2Zmc2V0XG4gICAgICAgICAgICAgICAgICAgICAgICAuYWRkKFZlY3RvcjIub25lXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLm11bHRpcGx5KHNoYXBlLnNpemUgLyAzKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC5yb3RhdGUoc2hhcGUucm90YXRpb24gKyBzdGFydCAtIDQ1KVxuICAgICAgICAgICAgICAgICAgICAgICAgKSk7XG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIHJldHVybiBwb2ludHM7XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBzdGF0aWMgZ2V0UGl2b3RQb2ludChwb2ludHM6IFZlY3RvcjJbXSkge1xuICAgICAgICBsZXQgcGl2b3QgPSBwb2ludHNbMF07XG5cbiAgICAgICAgZm9yIChjb25zdCBwb2ludCBvZiBwb2ludHMpIHtcbiAgICAgICAgICAgIGlmIChwb2ludHMuaW5kZXhPZihwb2ludCkgPT0gMClcbiAgICAgICAgICAgICAgICBjb250aW51ZTtcblxuICAgICAgICAgICAgaWYgKHBvaW50LnkgPD0gcGl2b3QueSAmJiBwb2ludC54IDwgcGl2b3QueCkge1xuICAgICAgICAgICAgICAgIHBpdm90ID0gcG9pbnQ7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4gcGl2b3Q7XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBzdGF0aWMgZ2V0T3JpZW50YXRpb24oYTogVmVjdG9yMiwgYjogVmVjdG9yMiwgYzogVmVjdG9yMikge1xuICAgICAgICByZXR1cm4gKGIueSAtIGEueSkgKlxuICAgICAgICAgICAgKGMueCAtIGIueCkgLVxuICAgICAgICAgICAgKGMueSAtIGIueSkgKlxuICAgICAgICAgICAgKGIueCAtIGEueCk7XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBzdGF0aWMgZ2VuZXJhdGVDb252ZXgocG9pbnRzOiBWZWN0b3IyW10pIHtcbiAgICAgICAgY29uc3QgcGl2b3QgPSB0aGlzLmdldFBpdm90UG9pbnQocG9pbnRzKTtcblxuICAgICAgICBjb25zdCBpbmRpY2VzID0gcG9pbnRzLm1hcCgoXywgaSkgPT4gaSk7XG4gICAgICAgIGNvbnN0IGFuZ2xlcyA9IHBvaW50cy5tYXAoeCA9PiBwaXZvdC5hbmdsZSh4KSk7XG4gICAgICAgIGNvbnN0IGRpc3RhbmNlcyA9IHBvaW50cy5tYXAoeCA9PiBwaXZvdC5kaXN0YW5jZSh4KSk7XG5cbiAgICAgICAgaW5kaWNlcy5zb3J0KChhOiBudW1iZXIsIGI6IG51bWJlcikgPT4ge1xuICAgICAgICAgICAgY29uc3QgYW5nbGVBID0gYW5nbGVzW2FdO1xuICAgICAgICAgICAgY29uc3QgYW5nbGVCID0gYW5nbGVzW2JdO1xuXG4gICAgICAgICAgICBpZiAoYW5nbGVBID09PSBhbmdsZUIpXG4gICAgICAgICAgICAgICAgcmV0dXJuIGRpc3RhbmNlc1thXSAtIGRpc3RhbmNlc1tiXTtcblxuICAgICAgICAgICAgcmV0dXJuIGFuZ2xlQSAtIGFuZ2xlQjtcbiAgICAgICAgfSk7XG5cbiAgICAgICAgZm9yIChsZXQgaSA9IDE7IGkgPCBpbmRpY2VzLmxlbmd0aCAtIDE7IGkrKykge1xuICAgICAgICAgICAgaWYgKGFuZ2xlc1tpbmRpY2VzW2ldXSA9PT0gYW5nbGVzW2luZGljZXNbaSArIDFdXSlcbiAgICAgICAgICAgICAgICBpbmRpY2VzW2ldID0gLTE7XG4gICAgICAgIH1cblxuICAgICAgICBjb25zdCBodWxsOiBWZWN0b3IyW10gPSBbXTtcbiAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBpbmRpY2VzLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgICBjb25zdCBwb2ludCA9IHBvaW50c1tpbmRpY2VzW2ldXTtcbiAgICAgICAgICAgIGlmIChpbmRpY2VzW2ldID09PSAtMSlcbiAgICAgICAgICAgICAgICBjb250aW51ZTtcblxuICAgICAgICAgICAgaWYgKGh1bGwubGVuZ3RoIDwgMykge1xuICAgICAgICAgICAgICAgIGh1bGwucHVzaChwb2ludCk7XG4gICAgICAgICAgICAgICAgY29udGludWU7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIHdoaWxlICh0aGlzLmdldE9yaWVudGF0aW9uKGh1bGwuYXQoLTIpISwgaHVsbC5hdCgtMSkhLCBwb2ludCkgPiAwKVxuICAgICAgICAgICAgICAgIGh1bGwucG9wKCk7XG4gICAgICAgICAgICBodWxsLnB1c2gocG9pbnQpO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKGh1bGwubGVuZ3RoIDwgMylcbiAgICAgICAgICAgIHJldHVybiBbXTtcblxuICAgICAgICByZXR1cm4gaHVsbDtcbiAgICB9XG59IiwgImltcG9ydCBHYW1lLCB7IEVudGl0eSB9IGZyb20gJ0VuZ2luZSc7XG5pbXBvcnQgQ29sb3IgZnJvbSAnQC9SZW5kZXJlci9Db2xvcic7XG5pbXBvcnQgVmVjdG9yMiBmcm9tICdAL0RhdGEvVmVjdG9yMic7XG5pbXBvcnQgeyBTaGFwZSB9IGZyb20gJ0AvUmVuZGVyZXInO1xuaW1wb3J0IFJlbmRlckNvbXBvbmVudCBmcm9tICcuL1JlbmRlckNvbXBvbmVudCc7XG5pbXBvcnQgQ29udmV4IGZyb20gJ0AvUmVuZGVyZXIvQ29udmV4JztcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgU2hhcGVSZW5kZXJlckNvbXBvbmVudCBleHRlbmRzIFJlbmRlckNvbXBvbmVudCB7XG4gICAgb3ZlcnJpZGUgZGVmYXVsdHMgPSB7XG4gICAgICAgIHNoYXBlczogW1xuICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgIHR5cGU6IFwiY2lyY2xlXCIsXG4gICAgICAgICAgICAgICAgb2Zmc2V0OiBWZWN0b3IyLnplcm8sXG4gICAgICAgICAgICAgICAgcm90YXRpb246IDAsXG4gICAgICAgICAgICAgICAgY29sb3I6IENvbG9yLnJhbmRvbSgpLFxuICAgICAgICAgICAgICAgIHNpemU6IDE2XG4gICAgICAgICAgICB9XG4gICAgICAgIF0gYXMgU2hhcGVbXVxuICAgIH07XG5cbiAgICBvdmVycmlkZSBnZXRCb3VuZHMoYXR0cmlidXRlczogdGhpc1snZGVmYXVsdHMnXSk6IFZlY3RvcjJbXSB7XG4gICAgICAgIHJldHVybiBDb252ZXguZnJvbVNoYXBlcyhhdHRyaWJ1dGVzLnNoYXBlcyk7XG4gICAgfVxuXG4gICAgb3ZlcnJpZGUgcmVuZGVyKGF0dHJpYnV0ZXM6IHRoaXNbXCJkZWZhdWx0c1wiXSwgZW50aXR5OiBFbnRpdHkpOiB2b2lkIHtcbiAgICAgICAgZm9yIChjb25zdCBzaGFwZSBvZiBhdHRyaWJ1dGVzLnNoYXBlcykge1xuICAgICAgICAgICAgR2FtZS5jYW52YXMuZHJhd1NoYXBlKGVudGl0eS50cmFuc2Zvcm0ucG9zaXRpb24sIGVudGl0eS50cmFuc2Zvcm0ucm90YXRpb24sIHNoYXBlKTtcbiAgICAgICAgfVxuXG4gICAgICAgIHN1cGVyLnJlbmRlcihhdHRyaWJ1dGVzLCBlbnRpdHkpO1xuICAgIH1cbn0iLCAiaW1wb3J0IENvbXBvbmVudCBmcm9tICdAL0RhdGEvQ29tcG9uZW50JztcbmltcG9ydCBWZWN0b3IyIGZyb20gJ0AvRGF0YS9WZWN0b3IyJztcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgVHJhbnNmb3JtQ29tcG9uZW50IGV4dGVuZHMgQ29tcG9uZW50IHtcbiAgICBvdmVycmlkZSBkZWZhdWx0cyA9IHtcbiAgICAgICAgcG9zaXRpb246IFZlY3RvcjIuemVybyxcbiAgICAgICAgcm90YXRpb246IDBcbiAgICB9O1xufSIsICJpbXBvcnQgQ29tcG9uZW50IGZyb20gJ0AvRGF0YS9Db21wb25lbnQnO1xuaW1wb3J0IFZlY3RvcjIgZnJvbSAnQC9EYXRhL1ZlY3RvcjInO1xuaW1wb3J0IEdhbWUsIHsgQ29sb3IsIEVudGl0eSB9IGZyb20gJ0VuZ2luZSc7XG5pbXBvcnQgU2hhcGVSZW5kZXJlckNvbXBvbmVudCBmcm9tICcuL1NoYXBlUmVuZGVyZXJDb21wb25lbnQnO1xuaW1wb3J0IFRyYW5zZm9ybUNvbXBvbmVudCBmcm9tICcuL1RyYW5zZm9ybUNvbXBvbmVudCc7XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIFJpZ2lkYm9keUNvbXBvbmVudCBleHRlbmRzIENvbXBvbmVudCB7XG4gICAgb3ZlcnJpZGUgZGVwZW5kZW5jaWVzID0gW1RyYW5zZm9ybUNvbXBvbmVudF07XG4gICAgb3ZlcnJpZGUgZGVmYXVsdHMgPSB7XG4gICAgICAgIHZlbG9jaXR5OiBuZXcgVmVjdG9yMigpLFxuICAgICAgICBmcmljdGlvbjogMC4yLFxuICAgICAgICBhY2NlbGVyYXRpb246IDAuOFxuICAgIH07XG5cbiAgICBvdmVycmlkZSBzdGFydCgpOiB2b2lkIHsgfVxuXG4gICAgb3ZlcnJpZGUgZGVzdHJveSgpOiB2b2lkIHsgfVxuXG4gICAgb3ZlcnJpZGUgdXBkYXRlKGF0dHJpYnV0ZXM6IHRoaXNbXCJkZWZhdWx0c1wiXSwgZW50aXR5OiBFbnRpdHkpOiB2b2lkIHtcbiAgICAgICAgbGV0IHsgZnJpY3Rpb24sIGFjY2VsZXJhdGlvbiB9ID0gYXR0cmlidXRlcztcblxuICAgICAgICBhdHRyaWJ1dGVzLnZlbG9jaXR5ID0gYXR0cmlidXRlcy52ZWxvY2l0eS5sZXJwKFZlY3RvcjIuemVybywgZnJpY3Rpb24pO1xuXG4gICAgICAgIGlmIChhdHRyaWJ1dGVzLnZlbG9jaXR5Lmxlbmd0aCA+IGZyaWN0aW9uKVxuICAgICAgICAgICAgZW50aXR5LnRyYW5zZm9ybS5wb3NpdGlvbiA9IGVudGl0eS50cmFuc2Zvcm0ucG9zaXRpb24ubGVycChlbnRpdHkudHJhbnNmb3JtLnBvc2l0aW9uLmFkZChhdHRyaWJ1dGVzLnZlbG9jaXR5KSwgYWNjZWxlcmF0aW9uKTtcblxuICAgICAgICBpZiAoR2FtZS5kZWJ1Zykge1xuICAgICAgICAgICAgR2FtZS5jYW52YXMudmVjdG9yKGVudGl0eS50cmFuc2Zvcm0ucG9zaXRpb24sIGVudGl0eS50cmFuc2Zvcm0ucm90YXRpb24sIGF0dHJpYnV0ZXMudmVsb2NpdHkubXVsdGlwbHkoMjUpLCBDb2xvci5ncmVlbik7XG4gICAgICAgIH1cbiAgICB9XG59IiwgImV4cG9ydCBpbnRlcmZhY2UgVGlsZSB7XG4gICAgbmFtZT86IHN0cmluZztcbiAgICB4OiBudW1iZXI7XG4gICAgeTogbnVtYmVyO1xuXG4gICAgd2lkdGg6IG51bWJlcixcbiAgICBoZWlnaHQ6IG51bWJlcjtcbn07XG5cbnR5cGUgVGlsZU1hcE9wdGlvbnMgPSB7XG4gICAgcm93czogbnVtYmVyO1xuICAgIGNvbHVtbnM6IG51bWJlcjtcbiAgICB0aWxlV2lkdGg6IG51bWJlcjtcbiAgICB0aWxlSGVpZ2h0OiBudW1iZXI7XG59O1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBUaWxlTWFwIHtcbiAgICBwcml2YXRlIF9pbWFnZTogSFRNTEltYWdlRWxlbWVudCB8IG51bGw7XG4gICAgcHJpdmF0ZSB0aWxlczogVGlsZVtdO1xuICAgIHB1YmxpYyBtYWduaXR1ZGU6IG51bWJlciA9IDE7XG5cbiAgICBwdWJsaWMgc3RhdGljIGdldCBlbXB0eSgpIHtcbiAgICAgICAgcmV0dXJuIG5ldyBUaWxlTWFwKG51bGwsIFtdKTtcbiAgICB9XG5cbiAgICBwdWJsaWMgZ2V0IGltYWdlKCkge1xuICAgICAgICByZXR1cm4gdGhpcy5faW1hZ2U7XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBjb25zdHJ1Y3RvcihpbWFnZTogSFRNTEltYWdlRWxlbWVudCB8IG51bGwsIHRpbGVzOiBUaWxlW10pIHtcbiAgICAgICAgdGhpcy5faW1hZ2UgPSBpbWFnZTtcbiAgICAgICAgdGhpcy50aWxlcyA9IHRpbGVzO1xuICAgIH1cblxuICAgIHB1YmxpYyBnZXRUaWxlKG5hbWU6IHN0cmluZyk6IFRpbGU7XG4gICAgcHVibGljIGdldFRpbGUoaW5kZXg6IG51bWJlcik6IFRpbGU7XG4gICAgcHVibGljIGdldFRpbGUoaW5kZXg6IG51bWJlciB8IHN0cmluZyk6IFRpbGU7XG4gICAgcHVibGljIGdldFRpbGUoaW5kZXg6IHN0cmluZyB8IG51bWJlcikge1xuICAgICAgICBpZiAodHlwZW9mIGluZGV4ID09PSBcIm51bWJlclwiKSB7XG4gICAgICAgICAgICByZXR1cm4gdGhpcy50aWxlc1tpbmRleF07XG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4gdGhpcy50aWxlcy5maW5kKHggPT4geC5uYW1lID09IGluZGV4KTtcbiAgICB9XG5cbiAgICBwcml2YXRlIHN0YXRpYyBsb2FkSW1hZ2UodXJsOiBzdHJpbmcpIHtcbiAgICAgICAgcmV0dXJuIG5ldyBQcm9taXNlPEhUTUxJbWFnZUVsZW1lbnQ+KChyZXNvbHZlLCByZWplY3QpID0+IHtcbiAgICAgICAgICAgIGNvbnN0IGltYWdlID0gbmV3IEltYWdlKCk7XG5cbiAgICAgICAgICAgIGltYWdlLmFkZEV2ZW50TGlzdGVuZXIoXCJlcnJvclwiLCAoKSA9PiByZWplY3QoYENvdWxkIG5vdCBmaW5kICR7dXJsfWApKTtcbiAgICAgICAgICAgIGltYWdlLmFkZEV2ZW50TGlzdGVuZXIoXCJsb2FkXCIsICgpID0+IHJlc29sdmUoaW1hZ2UpKTtcbiAgICAgICAgICAgIGltYWdlLnNyYyA9IHVybDtcbiAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgc3RhdGljIGFzeW5jIGxvYWQodXJsOiBzdHJpbmcsIG9wdGlvbnM6IFBhcnRpYWw8VGlsZU1hcE9wdGlvbnM+IHwgVGlsZVtdKSB7XG4gICAgICAgIGNvbnN0IGltYWdlID0gYXdhaXQgdGhpcy5sb2FkSW1hZ2UodXJsKTtcblxuICAgICAgICBpZiAoQXJyYXkuaXNBcnJheShvcHRpb25zKSlcbiAgICAgICAgICAgIHJldHVybiBuZXcgVGlsZU1hcChpbWFnZSwgb3B0aW9ucyk7XG5cbiAgICAgICAgY29uc3QgdGlsZXM6IFRpbGVbXSA9IFtdO1xuXG4gICAgICAgIGlmICghb3B0aW9ucy5yb3dzICYmICFvcHRpb25zLnRpbGVIZWlnaHQpXG4gICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoYFlvdSBuZWVkIHRvIHN1cHBseSBlaXRoZXIgcm93cyBvciB0aWxlSGVpZ2h0YCk7XG5cbiAgICAgICAgaWYgKCFvcHRpb25zLmNvbHVtbnMgJiYgIW9wdGlvbnMudGlsZVdpZHRoKVxuICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKGBZb3UgbmVlZCB0byBzdXBwbHkgZWl0aGVyIHJvd3Mgb3IgdGlsZUhlaWdodGApO1xuXG4gICAgICAgIGNvbnN0IHNldHRpbmdzID0ge1xuICAgICAgICAgICAgcm93czogb3B0aW9ucy5yb3dzID8/IGltYWdlLm5hdHVyYWxXaWR0aCAvIG9wdGlvbnMudGlsZVdpZHRoISxcbiAgICAgICAgICAgIGNvbHVtbnM6IG9wdGlvbnMuY29sdW1ucyA/PyBpbWFnZS5uYXR1cmFsSGVpZ2h0IC8gb3B0aW9ucy50aWxlSGVpZ2h0ISxcblxuICAgICAgICAgICAgd2lkdGg6IG9wdGlvbnMudGlsZVdpZHRoLFxuICAgICAgICAgICAgaGVpZ2h0OiBvcHRpb25zLnRpbGVIZWlnaHQsXG4gICAgICAgIH07XG5cbiAgICAgICAgc2V0dGluZ3Mud2lkdGggPz89IGltYWdlLm5hdHVyYWxXaWR0aCAvIHNldHRpbmdzLmNvbHVtbnM7XG4gICAgICAgIHNldHRpbmdzLmhlaWdodCA/Pz0gaW1hZ2UubmF0dXJhbEhlaWdodCAvIHNldHRpbmdzLnJvd3M7XG5cbiAgICAgICAgZm9yIChsZXQgeSA9IDA7IHkgPCBzZXR0aW5ncy5jb2x1bW5zOyB5KyspIHtcbiAgICAgICAgICAgIGZvciAobGV0IHggPSAwOyB4IDwgc2V0dGluZ3Mucm93czsgeCsrKSB7XG5cbiAgICAgICAgICAgICAgICB0aWxlcy5wdXNoKHtcbiAgICAgICAgICAgICAgICAgICAgd2lkdGg6IHNldHRpbmdzLndpZHRoLFxuICAgICAgICAgICAgICAgICAgICBoZWlnaHQ6IHNldHRpbmdzLmhlaWdodCxcbiAgICAgICAgICAgICAgICAgICAgeDogeCAqIHNldHRpbmdzLndpZHRoLFxuICAgICAgICAgICAgICAgICAgICB5OiB5ICogc2V0dGluZ3MuaGVpZ2h0XG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4gbmV3IFRpbGVNYXAoaW1hZ2UsIHRpbGVzKTtcbiAgICB9XG5cbiAgICBwcml2YXRlIGNvcHkoKSB7XG4gICAgICAgIHJldHVybiB0aGlzO1xuICAgIH1cbn0iLCAiaW1wb3J0IFRpbGVNYXAsIHsgVGlsZSB9IGZyb20gJ0AvQXNzZXRzL1RpbGVtYXAnO1xuaW1wb3J0IENvbXBvbmVudCBmcm9tICdAL0RhdGEvQ29tcG9uZW50JztcbmltcG9ydCBWZWN0b3IyIGZyb20gJ0AvRGF0YS9WZWN0b3IyJztcbmltcG9ydCBHYW1lLCB7IEVudGl0eSB9IGZyb20gJ0VuZ2luZSc7XG5pbXBvcnQgUmVuZGVyQ29tcG9uZW50IGZyb20gJy4vUmVuZGVyQ29tcG9uZW50JztcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgVGlsZVJlbmRlcmVyQ29tcG9uZW50IGV4dGVuZHMgUmVuZGVyQ29tcG9uZW50IHtcblxuICAgIG92ZXJyaWRlIGRlZmF1bHRzOiB7XG4gICAgICAgIHRpbGVNYXA6IFRpbGVNYXAsXG4gICAgICAgIHNjYWxlOiBudW1iZXIsXG4gICAgICAgIHRpbGU6IG51bWJlciB8IG51bWJlcltdLFxuICAgICAgICBmcmFtZXJhdGU6IG51bWJlcjtcbiAgICB9ID0ge1xuICAgICAgICAgICAgdGlsZU1hcDogVGlsZU1hcC5lbXB0eSxcbiAgICAgICAgICAgIHNjYWxlOiAxLFxuICAgICAgICAgICAgdGlsZTogMCxcbiAgICAgICAgICAgIGZyYW1lcmF0ZTogNVxuICAgICAgICB9O1xuXG4gICAgb3ZlcnJpZGUgZ2V0Qm91bmRzKGF0dHJpYnV0ZXM6IHRoaXNbJ2RlZmF1bHRzJ10pOiBWZWN0b3IyW10ge1xuICAgICAgICBjb25zdCB7IHRpbGUsIHRpbGVNYXAsIGZyYW1lcmF0ZSB9ID0gYXR0cmlidXRlcztcblxuICAgICAgICBsZXQgY3VycmVudFRpbGU6IFRpbGUgfCB1bmRlZmluZWQgPSB1bmRlZmluZWQ7XG4gICAgICAgIGlmIChBcnJheS5pc0FycmF5KHRpbGUpKVxuICAgICAgICAgICAgY3VycmVudFRpbGUgPSB0aWxlTWFwLmdldFRpbGUodGlsZVtNYXRoLnJvdW5kKEdhbWUudGltZSAvIGZyYW1lcmF0ZSkgJSB0aWxlLmxlbmd0aF0pO1xuICAgICAgICBlbHNlIGN1cnJlbnRUaWxlID0gYXR0cmlidXRlcy50aWxlTWFwLmdldFRpbGUodGlsZSk7XG5cbiAgICAgICAgY29uc3QgaGFsZldpZHRoID0gbmV3IFZlY3RvcjIoY3VycmVudFRpbGUud2lkdGggLyAyLCBjdXJyZW50VGlsZS5oZWlnaHQgLyAyKTtcblxuICAgICAgICByZXR1cm4gW1xuICAgICAgICAgICAgbmV3IFZlY3RvcjIoLWhhbGZXaWR0aC54LCAtaGFsZldpZHRoLnkpLFxuICAgICAgICAgICAgbmV3IFZlY3RvcjIoaGFsZldpZHRoLngsIC1oYWxmV2lkdGgueSksXG4gICAgICAgICAgICBuZXcgVmVjdG9yMihoYWxmV2lkdGgueCwgaGFsZldpZHRoLnkpLFxuICAgICAgICAgICAgbmV3IFZlY3RvcjIoLWhhbGZXaWR0aC54LCBoYWxmV2lkdGgueSlcbiAgICAgICAgXTtcbiAgICB9XG5cbiAgICBvdmVycmlkZSBzdGFydChkYXRhOiB0aGlzW1wiZGVmYXVsdHNcIl0pOiB2b2lkIHtcbiAgICAgICAgaWYgKGRhdGEudGlsZU1hcCA9PSBUaWxlTWFwLmVtcHR5KVxuICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKFwiUGxlYXNlIGFzc2lnbiBhIHRpbGVtYXAgdG8gdGhpcyBlbnRpdHkuXCIpO1xuXG4gICAgICAgIGlmIChkYXRhLnNjYWxlICE9IDEpXG4gICAgICAgICAgICBkYXRhLnRpbGVNYXAubWFnbml0dWRlID0gZGF0YS5zY2FsZTtcblxuICAgIH1cblxuICAgIG92ZXJyaWRlIHJlbmRlcihhdHRyaWJ1dGVzOiB0aGlzW1wiZGVmYXVsdHNcIl0sIGVudGl0eTogRW50aXR5KTogdm9pZCB7XG5cbiAgICAgICAgY29uc3QgeyB0aWxlLCB0aWxlTWFwLCBmcmFtZXJhdGUgfSA9IGF0dHJpYnV0ZXM7XG5cbiAgICAgICAgaWYgKEFycmF5LmlzQXJyYXkodGlsZSkpIHtcbiAgICAgICAgICAgIGNvbnN0IGN1cnJlbnRUaWxlID0gdGlsZU1hcC5nZXRUaWxlKHRpbGVbTWF0aC5yb3VuZChHYW1lLnRpbWUgLyBmcmFtZXJhdGUpICUgdGlsZS5sZW5ndGhdKTtcbiAgICAgICAgICAgIGNvbnN0IGNlbnRlciA9IG5ldyBWZWN0b3IyKGN1cnJlbnRUaWxlLndpZHRoIC8gMiwgY3VycmVudFRpbGUuaGVpZ2h0IC8gMik7XG5cbiAgICAgICAgICAgIEdhbWUuY2FudmFzLmRyYXdUaWxlKGVudGl0eS50cmFuc2Zvcm0ucG9zaXRpb24ubWludXMoY2VudGVyKSwgZW50aXR5LnRyYW5zZm9ybS5yb3RhdGlvbiwgdGlsZU1hcCwgY3VycmVudFRpbGUpO1xuICAgICAgICB9XG4gICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgICAgICBjb25zdCBjdXJyZW50VGlsZSA9IHRpbGVNYXAuZ2V0VGlsZSh0aWxlKTtcbiAgICAgICAgICAgICAgICBjb25zdCBjZW50ZXIgPSBuZXcgVmVjdG9yMihjdXJyZW50VGlsZS53aWR0aCAvIDIsIGN1cnJlbnRUaWxlLmhlaWdodCAvIDIpO1xuXG4gICAgICAgICAgICAgICAgR2FtZS5jYW52YXMuZHJhd1RpbGUoZW50aXR5LnRyYW5zZm9ybS5wb3NpdGlvbi5taW51cyhjZW50ZXIpLCBlbnRpdHkudHJhbnNmb3JtLnJvdGF0aW9uLCB0aWxlTWFwLCB0aWxlKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGNhdGNoIHtcbiAgICAgICAgICAgICAgICBjb25zdCBjdXJyZW50VGlsZSA9IHRpbGVNYXAuZ2V0VGlsZSh0aWxlKTtcbiAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyh0aWxlLCB0aWxlTWFwLCBjdXJyZW50VGlsZSk7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgfVxuICAgICAgICBzdXBlci5yZW5kZXIoYXR0cmlidXRlcywgZW50aXR5KTtcbiAgICB9XG59IiwgImltcG9ydCBWZWN0b3IyIGZyb20gJ0AvRGF0YS9WZWN0b3IyJztcbmltcG9ydCBHYW1lIGZyb20gJy4uL0dhbWUnO1xuXG5jb25zb2xlLmxvZyhWZWN0b3IyKTtcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgQ2FtZXJhIHtcbiAgICBzdGF0aWMgcG9zaXRpb24gPSBuZXcgVmVjdG9yMigpO1xuICAgIHN0YXRpYyB6b29tID0gMTtcbiAgICBzdGF0aWMgcm90YXRpb24gPSAwO1xuXG4gICAgcHVibGljIHN0YXRpYyBnZXQgdXAoKSB7XG4gICAgICAgIHJldHVybiBWZWN0b3IyLmZyb21BbmdsZSgtdGhpcy5yb3RhdGlvbik7XG4gICAgfVxuXG4gICAgcHVibGljIHN0YXRpYyB3b3JsZFRvQ2FtZXJhU3BhY2Uod29ybGRQb3NpdGlvbjogVmVjdG9yMikge1xuICAgICAgICBjb25zdCByb3RhdGlvbiA9ICh0aGlzLnJvdGF0aW9uKSAlIDM2MDtcbiAgICAgICAgcmV0dXJuIHdvcmxkUG9zaXRpb25cbiAgICAgICAgICAgIC5taW51cyh0aGlzLnBvc2l0aW9uKVxuICAgICAgICAgICAgLnJvdGF0ZShyb3RhdGlvbilcbiAgICAgICAgICAgIC5tdWx0aXBseSh0aGlzLnpvb20pXG4gICAgICAgICAgICAuYWRkKEdhbWUuY2FudmFzLm1pZGRsZSlcbiAgICB9XG5cbiAgICBwdWJsaWMgc3RhdGljIGNhbWVyYVRvV29ybGRTcGFjZShjYW1lcmFQb3NpdGlvbjogVmVjdG9yMikge1xuICAgICAgICByZXR1cm4gY2FtZXJhUG9zaXRpb24ucm90YXRlKC10aGlzLnJvdGF0aW9uKS5kaXZpZGUodGhpcy56b29tKS5hZGQodGhpcy5wb3NpdGlvbik7XG4gICAgfVxufSIsICJpbXBvcnQgVGlsZW1hcCwgeyBUaWxlIH0gZnJvbSAnQC9Bc3NldHMvVGlsZW1hcCc7XG5pbXBvcnQgVmVjdG9yMiBmcm9tICdAL0RhdGEvVmVjdG9yMic7XG5pbXBvcnQgQ2FtZXJhIGZyb20gJ0AvUmVuZGVyZXIvQ2FtZXJhJztcbmltcG9ydCBDb2xvciBmcm9tICdAL1JlbmRlcmVyL0NvbG9yJztcbmltcG9ydCB7IERFR1JFRV9UT19SQURJQUwgfSBmcm9tICdAL0hlbHBlcnMnO1xuaW1wb3J0IHsgU2hhcGUgfSBmcm9tICdAL1JlbmRlcmVyL1NoYXBlJztcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgQ2FudmFzIHtcbiAgICBnZXQgd2lkdGgoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLmNhbnZhcy53aWR0aDtcbiAgICB9XG5cbiAgICBnZXQgaGVpZ2h0KCkge1xuICAgICAgICByZXR1cm4gdGhpcy5jYW52YXMuaGVpZ2h0O1xuICAgIH1cblxuICAgIGdldCBtaWRkbGUoKSB7XG4gICAgICAgIHJldHVybiBuZXcgVmVjdG9yMihcbiAgICAgICAgICAgIHRoaXMuY2FudmFzLndpZHRoIC8gMixcbiAgICAgICAgICAgIHRoaXMuY2FudmFzLmhlaWdodCAvIDJcbiAgICAgICAgKTtcbiAgICB9XG5cbiAgICBnZXQgc2l6ZSgpIHtcbiAgICAgICAgcmV0dXJuIG5ldyBWZWN0b3IyKFxuICAgICAgICAgICAgdGhpcy5jYW52YXMud2lkdGgsXG4gICAgICAgICAgICB0aGlzLmNhbnZhcy5oZWlnaHRcbiAgICAgICAgKTtcbiAgICB9XG5cbiAgICBnZXQgZWxlbWVudCgpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuY2FudmFzO1xuICAgIH1cblxuICAgIHNldCBiYWNrZ3JvdW5kKGNvbG9yOiBDb2xvcikge1xuICAgICAgICB0aGlzLl9iYWNrZ3JvdW5kID0gY29sb3I7XG4gICAgfVxuXG4gICAgZ2V0IGJhY2tncm91bmQoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLl9iYWNrZ3JvdW5kID8/IENvbG9yLndoaXRlO1xuICAgIH1cblxuICAgIHByaXZhdGUgY2FudmFzOiBIVE1MQ2FudmFzRWxlbWVudDtcbiAgICBwcml2YXRlIGN0eDogQ2FudmFzUmVuZGVyaW5nQ29udGV4dDJEO1xuICAgIHByaXZhdGUgX2JhY2tncm91bmQ/OiBDb2xvcjtcblxuICAgIGNvbnN0cnVjdG9yKCkge1xuICAgICAgICB0aGlzLmNhbnZhcyA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJjYW52YXNcIik7XG4gICAgICAgIHRoaXMuY3R4ID0gdGhpcy5jYW52YXMuZ2V0Q29udGV4dChcIjJkXCIpITtcblxuICAgICAgICB0aGlzLmN0eC5saW5lQ2FwID0gXCJyb3VuZFwiO1xuICAgICAgICB0aGlzLmN0eC5saW5lSm9pbiA9IFwicm91bmRcIjtcbiAgICAgICAgdGhpcy5jdHgudGV4dEJhc2VsaW5lID0gXCJtaWRkbGVcIjtcblxuICAgICAgICBkb2N1bWVudC5ib2R5LmFwcGVuZENoaWxkKHRoaXMuY2FudmFzKTtcblxuICAgICAgICB3aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcihcInJlc2l6ZVwiLCAoKSA9PiB0aGlzLnJlc2l6ZSgpKTtcbiAgICAgICAgdGhpcy5jYW52YXMuYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsICgpID0+IHtcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKFwicmVxdWVzdGluZyBmdWxsc2NyZWVuXCIpO1xuICAgICAgICAgICAgZG9jdW1lbnQuYm9keS5yZXF1ZXN0RnVsbHNjcmVlbigpO1xuICAgICAgICB9KTtcblxuICAgICAgICB0aGlzLnJlc2l6ZSgpO1xuICAgIH1cblxuICAgIHJvdGF0ZShhbmdsZTogbnVtYmVyKSB7XG4gICAgICAgIC8vIHRoaXMuY3R4LnRyYW5zbGF0ZSh0aGlzLm1pZGRsZS54LCB0aGlzLm1pZGRsZS55KTtcbiAgICAgICAgLy8gLy8gdGhpcy5jdHgucm90YXRlKGFuZ2xlICogREVHUkVFX1RPX1JBRElBTCk7XG4gICAgICAgIC8vIHRoaXMuY3R4LnRyYW5zbGF0ZSgtdGhpcy5taWRkbGUueCwgLXRoaXMubWlkZGxlLnkpO1xuICAgIH1cblxuICAgIGNpcmNsZSh3b3JsZFBvc2l0aW9uOiBWZWN0b3IyLCByb3RhdGlvbjogbnVtYmVyLCBzaXplOiBudW1iZXIsIGNvbG9yOiBDb2xvciwgYXJjOiBbbnVtYmVyLCBudW1iZXJdID0gWzAsIDM2MF0pIHtcbiAgICAgICAgY29uc3QgcG9zaXRpb24gPSBDYW1lcmEud29ybGRUb0NhbWVyYVNwYWNlKHdvcmxkUG9zaXRpb24pO1xuICAgICAgICBjb25zdCBsb2NhbFJvdGF0aW9uID0gcm90YXRpb24gKyBDYW1lcmEucm90YXRpb247XG5cbiAgICAgICAgdGhpcy5jdHguYmVnaW5QYXRoKCk7XG4gICAgICAgIHRoaXMuY3R4LmZpbGxTdHlsZSA9IGNvbG9yLnRvU3RyaW5nKCk7XG4gICAgICAgIHRoaXMuY3R4LmxpbmVXaWR0aCA9IDA7XG5cbiAgICAgICAgdGhpcy5jdHguYXJjKHBvc2l0aW9uLngsIHBvc2l0aW9uLnksIHNpemUgLyAyICogQ2FtZXJhLnpvb20sICgoYXJjWzBdICsgbG9jYWxSb3RhdGlvbikgJSAzNjApICogREVHUkVFX1RPX1JBRElBTCwgKGFyY1sxXSArIGxvY2FsUm90YXRpb24gJSAzNjApICogREVHUkVFX1RPX1JBRElBTCk7XG4gICAgICAgIHRoaXMuY3R4LmZpbGwoKTtcbiAgICAgICAgdGhpcy5jdHguY2xvc2VQYXRoKCk7XG4gICAgfVxuXG4gICAgYm94KHdvcmxkUG9zaXRpb246IFZlY3RvcjIsIHdvcmxkUm90YXRpb246IG51bWJlciwgY29sb3I6IENvbG9yLCBzaXplOiBudW1iZXIpOiB2b2lkO1xuICAgIGJveCh3b3JsZFBvc2l0aW9uOiBWZWN0b3IyLCB3b3JsZFJvdGF0aW9uOiBudW1iZXIsIGNvbG9yOiBDb2xvciwgc2l6ZTogVmVjdG9yMik6IHZvaWQ7XG4gICAgYm94KHdvcmxkUG9zaXRpb246IFZlY3RvcjIsIHdvcmxkUm90YXRpb246IG51bWJlciwgY29sb3I6IENvbG9yLCBzaXplOiBWZWN0b3IyIHwgbnVtYmVyID0gVmVjdG9yMi5vbmUpIHtcbiAgICAgICAgY29uc3Qgd2lkdGggPSB0eXBlb2Ygc2l6ZSA9PSBcIm51bWJlclwiID8gc2l6ZSA6IHNpemUueDtcbiAgICAgICAgY29uc3QgaGVpZ2h0ID0gdHlwZW9mIHNpemUgPT0gXCJudW1iZXJcIiA/IHNpemUgOiBzaXplLnk7XG5cbiAgICAgICAgdGhpcy5wb2x5Z29uKHdvcmxkUG9zaXRpb24sIHdvcmxkUm90YXRpb24sIGNvbG9yLCBbXG4gICAgICAgICAgICBuZXcgVmVjdG9yMigtd2lkdGggLyAyLCAtaGVpZ2h0IC8gMiksXG4gICAgICAgICAgICBuZXcgVmVjdG9yMigtd2lkdGggLyAyLCBoZWlnaHQgLyAyKSxcbiAgICAgICAgICAgIG5ldyBWZWN0b3IyKHdpZHRoIC8gMiwgaGVpZ2h0IC8gMiksXG4gICAgICAgICAgICBuZXcgVmVjdG9yMih3aWR0aCAvIDIsIC1oZWlnaHQgLyAyKSxcbiAgICAgICAgICAgIG5ldyBWZWN0b3IyKC13aWR0aCAvIDIsIC1oZWlnaHQgLyAyKVxuICAgICAgICBdKTtcblxuICAgICAgICB0aGlzLmN0eC5jbG9zZVBhdGgoKTtcbiAgICB9XG5cbiAgICBwcml2YXRlIHRyYWNlUG9seWdvbih3b3JsZFBvc2l0aW9uOiBWZWN0b3IyLCByb3RhdGlvbjogbnVtYmVyLCBjb2xvcjogQ29sb3IsIGluZGljZXM6IFZlY3RvcjJbXSkge1xuICAgICAgICB0aGlzLmN0eC5iZWdpblBhdGgoKTtcbiAgICAgICAgaWYgKGluZGljZXMubGVuZ3RoIDwgMilcbiAgICAgICAgICAgIHJldHVybjtcblxuICAgICAgICBjb25zdCBbc3RhcnQsIC4uLnBvaW50c10gPSBpbmRpY2VzO1xuICAgICAgICBjb25zdCBwb3NpdGlvbiA9IENhbWVyYS53b3JsZFRvQ2FtZXJhU3BhY2Uod29ybGRQb3NpdGlvbi5hZGQoc3RhcnQucm90YXRlKHJvdGF0aW9uKSkpO1xuICAgICAgICB0aGlzLmN0eC5tb3ZlVG8oTWF0aC5mbG9vcihwb3NpdGlvbi54KSwgTWF0aC5mbG9vcihwb3NpdGlvbi55KSk7XG5cbiAgICAgICAgZm9yIChjb25zdCBpbmRleCBvZiBwb2ludHMpIHtcbiAgICAgICAgICAgIGNvbnN0IG5leHQgPSBDYW1lcmEud29ybGRUb0NhbWVyYVNwYWNlKHdvcmxkUG9zaXRpb24uYWRkKGluZGV4LnJvdGF0ZShyb3RhdGlvbikpKTtcbiAgICAgICAgICAgIHRoaXMuY3R4LmxpbmVUbyhuZXh0LngsIG5leHQueSk7XG4gICAgICAgIH1cblxuICAgICAgICB0aGlzLmN0eC5saW5lVG8oTWF0aC5mbG9vcihwb3NpdGlvbi54KSwgTWF0aC5mbG9vcihwb3NpdGlvbi55KSk7XG4gICAgICAgIHRoaXMuY3R4LmNsb3NlUGF0aCgpO1xuICAgIH1cblxuICAgIHBvbHlnb24od29ybGRQb3NpdGlvbjogVmVjdG9yMiwgcm90YXRpb246IG51bWJlciwgY29sb3I6IENvbG9yLCBpbmRpY2VzOiBWZWN0b3IyW10pIHtcbiAgICAgICAgdGhpcy50cmFjZVBvbHlnb24od29ybGRQb3NpdGlvbiwgcm90YXRpb24sIGNvbG9yLCBpbmRpY2VzKTtcbiAgICAgICAgdGhpcy5jdHguZmlsbFN0eWxlID0gY29sb3IudG9TdHJpbmcoKTtcbiAgICAgICAgdGhpcy5jdHguZmlsbCgpO1xuICAgIH1cblxuICAgIHdpcmVQb2x5Z29uKHdvcmxkUG9zaXRpb246IFZlY3RvcjIsIHJvdGF0aW9uOiBudW1iZXIsIGNvbG9yOiBDb2xvciwgaW5kaWNlczogVmVjdG9yMltdKSB7XG4gICAgICAgIHRoaXMudHJhY2VQb2x5Z29uKHdvcmxkUG9zaXRpb24sIHJvdGF0aW9uLCBjb2xvciwgaW5kaWNlcyk7XG4gICAgICAgIHRoaXMuY3R4LnN0cm9rZVN0eWxlID0gY29sb3IudG9TdHJpbmcoKTtcbiAgICAgICAgdGhpcy5jdHguc3Ryb2tlKCk7XG4gICAgfVxuXG5cbiAgICBhcmMob2Zmc2V0OiBudW1iZXIsIHdpZHRoOiBudW1iZXIgPSA5MCwgcm90YXRpb246IG51bWJlciA9IDAsIHRoaWNrbmVzczogbnVtYmVyID0gMTYsIGNvbG9yOiBDb2xvciA9IENvbG9yLndoaXRlKSB7XG4gICAgICAgIHRoaXMuY3R4LmJlZ2luUGF0aCgpO1xuICAgICAgICB0aGlzLmN0eC5saW5lV2lkdGggPSB0aGlja25lc3M7XG4gICAgICAgIHRoaXMuY3R4LnN0cm9rZVN0eWxlID0gY29sb3IudG9TdHJpbmcoKTtcblxuXG4gICAgICAgIHRoaXMuY3R4LmFyYyh0aGlzLmNhbnZhcy53aWR0aCAvIDIsIHRoaXMuY2FudmFzLmhlaWdodCAvIDIsIG9mZnNldCwgKHJvdGF0aW9uIC0gd2lkdGggLyAyKSAqIERFR1JFRV9UT19SQURJQUwsIChyb3RhdGlvbiArIHdpZHRoIC8gMikgKiBERUdSRUVfVE9fUkFESUFMKTtcbiAgICAgICAgdGhpcy5jdHguc3Ryb2tlKCk7XG4gICAgICAgIHRoaXMuY3R4LmNsb3NlUGF0aCgpO1xuICAgIH1cblxuICAgIHRleHQod29ybGRQb3NpdGlvbjogVmVjdG9yMiwgd29ybGRSb3RhdGlvbjogbnVtYmVyLCBzdHJpbmc6IHN0cmluZywgY29sb3I6IENvbG9yID0gQ29sb3IuYmxhY2ssIHNpemU6IG51bWJlciA9IDE2KSB7XG4gICAgICAgIGNvbnN0IHBvc2l0aW9uID0gQ2FtZXJhLndvcmxkVG9DYW1lcmFTcGFjZSh3b3JsZFBvc2l0aW9uKTtcbiAgICAgICAgdGhpcy5jdHguZm9udCA9IGAke3NpemV9cHggc2Fucy1zZXJpZmA7XG5cbiAgICAgICAgdGhpcy5jdHguc3Ryb2tlU3R5bGUgPSBjb2xvci50b1N0cmluZygpO1xuICAgICAgICB0aGlzLmN0eC5maWxsU3R5bGUgPSBjb2xvci50b1N0cmluZygpO1xuXG4gICAgICAgIHRoaXMuY3R4LmZpbGxUZXh0KHN0cmluZywgcG9zaXRpb24ueCwgcG9zaXRpb24ueSk7XG4gICAgfVxuXG4gICAgdmVjdG9yKHdvcmxkUG9zaXRpb246IFZlY3RvcjIsIHdvcmxkUm90YXRpb246IG51bWJlciwgdmVjdG9yOiBWZWN0b3IyLCBjb2xvcjogQ29sb3IgPSBDb2xvci5ncmVlbikge1xuICAgICAgICBjb25zdCBwb3NpdGlvbiA9IENhbWVyYS53b3JsZFRvQ2FtZXJhU3BhY2Uod29ybGRQb3NpdGlvbik7XG4gICAgICAgIGNvbnN0IGVuZCA9IENhbWVyYS53b3JsZFRvQ2FtZXJhU3BhY2Uod29ybGRQb3NpdGlvbi5hZGQodmVjdG9yKSk7XG5cbiAgICAgICAgY29uc3QgZGVsdGEgPSBlbmQubWludXMocG9zaXRpb24pO1xuXG4gICAgICAgIGlmIChkZWx0YS5sZW5ndGggPT0gMClcbiAgICAgICAgICAgIHJldHVybjtcblxuICAgICAgICBjb25zdCBoZWFkbGVuID0gTWF0aC5zcXJ0KGRlbHRhLnggKiBkZWx0YS54ICsgZGVsdGEueSAqIGRlbHRhLnkpICogMC4zOyAvLyBsZW5ndGggb2YgaGVhZCBpbiBwaXhlbHNcbiAgICAgICAgY29uc3QgYW5nbGUgPSBNYXRoLmF0YW4yKGRlbHRhLnksIGRlbHRhLngpO1xuICAgICAgICB0aGlzLmN0eC5iZWdpblBhdGgoKTtcbiAgICAgICAgdGhpcy5jdHguc3Ryb2tlU3R5bGUgPSBjb2xvci50b1N0cmluZygpO1xuICAgICAgICB0aGlzLmN0eC5tb3ZlVG8ocG9zaXRpb24ueCwgcG9zaXRpb24ueSk7XG4gICAgICAgIHRoaXMuY3R4LmxpbmVUbyhlbmQueCwgZW5kLnkpO1xuICAgICAgICB0aGlzLmN0eC5zdHJva2UoKTtcbiAgICAgICAgdGhpcy5jdHguYmVnaW5QYXRoKCk7XG4gICAgICAgIHRoaXMuY3R4Lm1vdmVUbyhlbmQueCAtIGhlYWRsZW4gKiBNYXRoLmNvcyhhbmdsZSAtIE1hdGguUEkgLyA0KSwgZW5kLnkgLSBoZWFkbGVuICogTWF0aC5zaW4oYW5nbGUgLSBNYXRoLlBJIC8gNikpO1xuICAgICAgICB0aGlzLmN0eC5saW5lVG8oZW5kLngsIGVuZC55KTtcbiAgICAgICAgdGhpcy5jdHgubGluZVRvKGVuZC54IC0gaGVhZGxlbiAqIE1hdGguY29zKGFuZ2xlICsgTWF0aC5QSSAvIDQpLCBlbmQueSAtIGhlYWRsZW4gKiBNYXRoLnNpbihhbmdsZSArIE1hdGguUEkgLyA2KSk7XG4gICAgICAgIHRoaXMuY3R4LnN0cm9rZSgpO1xuICAgIH1cblxuICAgIGRyYXdTaGFwZSh3b3JsZFBvc2l0aW9uOiBWZWN0b3IyLCBsb2NhbFJvdGF0aW9uOiBudW1iZXIsIHNoYXBlOiBTaGFwZSkge1xuICAgICAgICBjb25zb2xlLmFzc2VydChzaGFwZSAhPT0gdW5kZWZpbmVkLCBcInNoYXBlIGlzIHVuZGVmaW5lZFwiLCBzaGFwZSk7XG5cbiAgICAgICAgY29uc3QgeyBjb2xvciwgb2Zmc2V0IH0gPSBzaGFwZTtcbiAgICAgICAgY29uc3Qgc2hhcGVSb3RhdGlvbiA9IChzaGFwZS5yb3RhdGlvbiA/PyAwKSArIGxvY2FsUm90YXRpb247XG4gICAgICAgIGNvbnN0IGxvY2FsUG9zaXRpb24gPSBvZmZzZXQucm90YXRlKGxvY2FsUm90YXRpb24pLmFkZCh3b3JsZFBvc2l0aW9uKTtcblxuICAgICAgICBzd2l0Y2ggKHNoYXBlLnR5cGUpIHtcbiAgICAgICAgICAgIGNhc2UgXCJib3hcIjpcbiAgICAgICAgICAgICAgICBpZiAodHlwZW9mIHNoYXBlLnNpemUgPT0gXCJudW1iZXJcIilcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5ib3gobG9jYWxQb3NpdGlvbiwgc2hhcGVSb3RhdGlvbiwgY29sb3IsIHNoYXBlLnNpemUpO1xuICAgICAgICAgICAgICAgIGVsc2UgaWYgKHNoYXBlLnNpemUgaW5zdGFuY2VvZiBWZWN0b3IyKVxuICAgICAgICAgICAgICAgICAgICB0aGlzLmJveChsb2NhbFBvc2l0aW9uLCBzaGFwZVJvdGF0aW9uLCBjb2xvciwgc2hhcGUuc2l6ZSk7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICBjYXNlIFwiY2lyY2xlXCI6XG4gICAgICAgICAgICAgICAgdGhpcy5jaXJjbGUobG9jYWxQb3NpdGlvbiwgc2hhcGVSb3RhdGlvbiwgc2hhcGUuc2l6ZSwgY29sb3IsIHNoYXBlLmFyYyk7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICBjYXNlIFwicG9seWdvblwiOlxuICAgICAgICAgICAgICAgIHRoaXMucG9seWdvbihsb2NhbFBvc2l0aW9uLCBzaGFwZVJvdGF0aW9uLCBjb2xvciwgc2hhcGUuaW5kaWNlcyk7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBkcmF3VGlsZSh3b3JsZFBvc2l0aW9uOiBWZWN0b3IyLCB3b3JsZFJvdGF0aW9uOiBudW1iZXIsIHRpbGVNYXA6IFRpbGVtYXAsIHRpbGU6IHN0cmluZyB8IG51bWJlciB8IFRpbGUpIHtcbiAgICAgICAgY29uc3QgaW5mbyA9IHR5cGVvZiB0aWxlID09IFwib2JqZWN0XCIgPyB0aWxlIDogdGlsZU1hcC5nZXRUaWxlKHRpbGUpO1xuXG4gICAgICAgIGNvbnN0IGNlbnRlciA9IG5ldyBWZWN0b3IyKGluZm8ud2lkdGggKiB0aWxlTWFwLm1hZ25pdHVkZSwgaW5mby5oZWlnaHQgKiB0aWxlTWFwLm1hZ25pdHVkZSkuZGl2aWRlKDIpO1xuICAgICAgICBjb25zdCBwb3NpdGlvbiA9IENhbWVyYS53b3JsZFRvQ2FtZXJhU3BhY2Uod29ybGRQb3NpdGlvbi5taW51cyhjZW50ZXIpKTtcblxuXG4gICAgICAgIGNvbnN0IHNpemUgPSB0aWxlTWFwLm1hZ25pdHVkZSAqIENhbWVyYS56b29tO1xuICAgICAgICB0aGlzLmN0eC50cmFuc2xhdGUocG9zaXRpb24ueCwgcG9zaXRpb24ueSk7XG4gICAgICAgIHRoaXMuY3R4LnJvdGF0ZSgod29ybGRSb3RhdGlvbiArIENhbWVyYS5yb3RhdGlvbikgKiBERUdSRUVfVE9fUkFESUFMKTtcblxuICAgICAgICB0aGlzLmN0eC5pbWFnZVNtb290aGluZ0VuYWJsZWQgPSBmYWxzZTtcbiAgICAgICAgdGhpcy5jdHguZHJhd0ltYWdlKHRpbGVNYXAuaW1hZ2UhLFxuICAgICAgICAgICAgaW5mby54LFxuICAgICAgICAgICAgaW5mby55LFxuICAgICAgICAgICAgaW5mby53aWR0aCxcbiAgICAgICAgICAgIGluZm8uaGVpZ2h0LFxuICAgICAgICAgICAgKGluZm8ud2lkdGggKiBzaXplKSAqIC41LFxuICAgICAgICAgICAgKGluZm8ud2lkdGggKiBzaXplKSAqIC41LFxuICAgICAgICAgICAgaW5mby53aWR0aCAqIHNpemUsXG4gICAgICAgICAgICBpbmZvLmhlaWdodCAqIHNpemVcbiAgICAgICAgKTtcbiAgICAgICAgdGhpcy5jdHguaW1hZ2VTbW9vdGhpbmdFbmFibGVkID0gdHJ1ZTtcbiAgICAgICAgdGhpcy5jdHguc2V0VHJhbnNmb3JtKDEsIDAsIDAsIDEsIDAsIDApO1xuICAgIH1cblxuICAgIGRyYXcoKSB7XG4gICAgICAgIHRoaXMuY3R4LmZpbGxTdHlsZSA9IHRoaXMuYmFja2dyb3VuZC50b1N0cmluZygpO1xuXG4gICAgICAgIHRoaXMuY3R4LmZpbGxSZWN0KDAsIDAsIHRoaXMuY2FudmFzLndpZHRoLCB0aGlzLmNhbnZhcy5oZWlnaHQpO1xuICAgIH1cblxuICAgIHJlc2l6ZSgpIHtcbiAgICAgICAgdGhpcy5jYW52YXMud2lkdGggPSB3aW5kb3cuaW5uZXJXaWR0aDtcbiAgICAgICAgdGhpcy5jYW52YXMuaGVpZ2h0ID0gd2luZG93LmlubmVySGVpZ2h0O1xuICAgIH1cbn0iLCAiaW1wb3J0IEdhbWUgZnJvbSAnRW5naW5lJztcbmltcG9ydCB7IGdlbmVyYXRlSWQsIHN0cnVjdHVyZWRDbG9uZSB9IGZyb20gJ0AvSGVscGVycyc7XG5pbXBvcnQgVmVjdG9yMiBmcm9tICdAL0RhdGEvVmVjdG9yMic7XG5pbXBvcnQgUmVuZGVyQ29tcG9uZW50IGZyb20gJ0AvQ29tcG9uZW50cy9SZW5kZXJDb21wb25lbnQnO1xuaW1wb3J0IENvbXBvbmVudCBmcm9tICcuL0NvbXBvbmVudCc7XG5pbXBvcnQgVHJhbnNmb3JtQ29tcG9uZW50IGZyb20gJ0AvQ29tcG9uZW50cy9UcmFuc2Zvcm1Db21wb25lbnQnO1xuaW1wb3J0IHsgQ29tcG9uZW50VHlwZSB9IGZyb20gJy4nO1xuaW1wb3J0IFpvb21Db21wb25lbnQgZnJvbSAnc3JjL0dhbWUvQ29tcG9uZW50cy9ab29tQ29tcG9uZW50JztcblxuY29uc3QgY29udmV4SHVsbENhY2hlOiBNYXA8c3RyaW5nLCBWZWN0b3IyW10+ID0gbmV3IE1hcCgpO1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBFbnRpdHkge1xuICAgIHB1YmxpYyB0YWdzOiBTZXQ8c3RyaW5nPjtcbiAgICBwcml2YXRlIF9jb21wb25lbnRzOiBNYXA8Q29tcG9uZW50LCBhbnk+O1xuICAgIHByaXZhdGUgX3JlbmRlckNvbXBvbmVudHM6IFNldDxzdHJpbmc+O1xuICAgIHByaXZhdGUgX2lkOiBzdHJpbmc7XG5cbiAgICBwdWJsaWMgZ2V0IHRyYW5zZm9ybSgpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuZ2V0Q29tcG9uZW50KFRyYW5zZm9ybUNvbXBvbmVudCk7XG4gICAgfVxuXG4gICAgcHVibGljIGdldCBib3VuZHMoKSB7XG4gICAgICAgIGlmIChjb252ZXhIdWxsQ2FjaGUuaGFzKHRoaXMuaWQpKVxuICAgICAgICAgICAgcmV0dXJuIGNvbnZleEh1bGxDYWNoZS5nZXQodGhpcy5pZCkhO1xuXG4gICAgICAgIGNvbnN0IGNvbXBvbmVudCA9IHRoaXMuZ2V0QWxsQ29tcG9uZW50cygpLmZpbmQoeCA9PiB4WzBdIGluc3RhbmNlb2YgUmVuZGVyQ29tcG9uZW50KTtcbiAgICAgICAgaWYgKCFjb21wb25lbnQpIHtcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKGBFbnRpdHkgJHt0aGlzLmlkfSBoYXMgbm8gYm91bmRzLmApO1xuICAgICAgICAgICAgcmV0dXJuIFtdO1xuICAgICAgICB9XG5cbiAgICAgICAgY29uc3QgYm91bmRzID0gKGNvbXBvbmVudFswXSBhcyBSZW5kZXJDb21wb25lbnQpLmdldEJvdW5kcyhjb21wb25lbnRbMV0pO1xuICAgICAgICBjb252ZXhIdWxsQ2FjaGUuc2V0KHRoaXMuaWQsIGJvdW5kcyk7XG5cbiAgICAgICAgcmV0dXJuIGJvdW5kcztcbiAgICB9XG5cbiAgICBwdWJsaWMgZ2V0IGlkKCkge1xuICAgICAgICByZXR1cm4gdGhpcy5faWQ7XG4gICAgfVxuXG4gICAgY29uc3RydWN0b3IoKSB7XG4gICAgICAgIHRoaXMuX2lkID0gZ2VuZXJhdGVJZCgpO1xuICAgICAgICB0aGlzLnRhZ3MgPSBuZXcgU2V0KCk7XG4gICAgICAgIHRoaXMuX2NvbXBvbmVudHMgPSBuZXcgTWFwKCk7XG4gICAgICAgIHRoaXMuX3JlbmRlckNvbXBvbmVudHMgPSBuZXcgU2V0KCk7XG4gICAgICAgIHRoaXMuYWRkQ29tcG9uZW50KFRyYW5zZm9ybUNvbXBvbmVudCk7XG4gICAgfVxuXG4gICAgc3RhcnQoKSB7XG4gICAgICAgIGZvciAoY29uc3QgW2NvbXBvbmVudCwgZGF0YV0gb2YgdGhpcy5fY29tcG9uZW50cykge1xuICAgICAgICAgICAgY29tcG9uZW50Py5zdGFydChkYXRhLCB0aGlzKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIHByaXZhdGUgY2FsbERlc3Ryb3lIb29rcygpIHtcbiAgICAgICAgZm9yIChjb25zdCBbY29tcG9uZW50LCBkYXRhXSBvZiB0aGlzLl9jb21wb25lbnRzKSB7XG4gICAgICAgICAgICBjb21wb25lbnQ/LmRlc3Ryb3koZGF0YSwgdGhpcyk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICB1cGRhdGUoKSB7XG4gICAgICAgIGZvciAoY29uc3QgW2NvbXBvbmVudCwgZGF0YV0gb2YgdGhpcy5fY29tcG9uZW50cykge1xuICAgICAgICAgICAgY29tcG9uZW50Py51cGRhdGUoZGF0YSwgdGhpcyk7XG5cbiAgICAgICAgICAgIGlmIChjb21wb25lbnQgaW5zdGFuY2VvZiBSZW5kZXJDb21wb25lbnQpXG4gICAgICAgICAgICAgICAgY29tcG9uZW50Py5yZW5kZXIoZGF0YSwgdGhpcyk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICByZW5kZXIoKSB7XG4gICAgICAgIGZvciAoY29uc3QgY29tcG9uZW50TmFtZSBvZiB0aGlzLl9yZW5kZXJDb21wb25lbnRzKSB7XG4gICAgICAgICAgICBjb25zdCBjb21wb25lbnQgPSBHYW1lLmNvbXBvbmVudHMuZ2V0KGNvbXBvbmVudE5hbWUpIGFzIFJlbmRlckNvbXBvbmVudDtcbiAgICAgICAgICAgIGNvbnN0IGRhdGEgPSB0aGlzLl9jb21wb25lbnRzLmdldChjb21wb25lbnQpO1xuXG4gICAgICAgICAgICBjb21wb25lbnQ/LnJlbmRlcihkYXRhLCB0aGlzKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIHJlbW92ZUNvbXBvbmVudDx0IGV4dGVuZHMgQ29tcG9uZW50VHlwZTxhbnk+PihuYW1lOiB0KSB7XG4gICAgICAgIGNvbnN0IF9jb21wb25lbnQgPSBHYW1lLmNvbXBvbmVudHMuZ2V0KG5hbWUubmFtZSk7XG5cbiAgICAgICAgaWYgKF9jb21wb25lbnQpXG4gICAgICAgICAgICB0aGlzLl9jb21wb25lbnRzLmRlbGV0ZShfY29tcG9uZW50KTtcbiAgICB9XG5cbiAgICBhZGRDb21wb25lbnQ8dCBleHRlbmRzIENvbXBvbmVudFR5cGU8YW55Pj4obmFtZXM6IHRbXSk6IHZvaWQ7XG4gICAgYWRkQ29tcG9uZW50PHQgZXh0ZW5kcyBDb21wb25lbnRUeXBlPGFueT4+KG5hbWU6IHQpOiB2b2lkO1xuICAgIGFkZENvbXBvbmVudDx0IGV4dGVuZHMgQ29tcG9uZW50VHlwZTxhbnk+PihuYW1lOiB0LCBkYXRhOiBQYXJ0aWFsPEluc3RhbmNlVHlwZTx0PltcImRlZmF1bHRzXCJdPik6IHZvaWQ7XG4gICAgYWRkQ29tcG9uZW50PHQgZXh0ZW5kcyBDb21wb25lbnRUeXBlPGFueT4+KGNvbXBvbmVudDogdCB8IHRbXSwgZGF0YT86IFBhcnRpYWw8SW5zdGFuY2VUeXBlPHQ+W1wiZGVmYXVsdHNcIl0+KSB7XG4gICAgICAgIGlmIChBcnJheS5pc0FycmF5KGNvbXBvbmVudCkpIHtcbiAgICAgICAgICAgIGZvciAoY29uc3QgX2NvbXBvbmVudCBvZiBjb21wb25lbnQpXG4gICAgICAgICAgICAgICAgdGhpcy5hZGRDb21wb25lbnQoX2NvbXBvbmVudCk7XG5cbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgIGNvbnN0IF9jb21wb25lbnQgPSBHYW1lLmNvbXBvbmVudHMuZ2V0KGNvbXBvbmVudC5uYW1lKTtcbiAgICAgICAgICAgIGlmIChfY29tcG9uZW50ID09PSB1bmRlZmluZWQpXG4gICAgICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKGBDb21wb25lbnQgJHtjb21wb25lbnQubmFtZX0gbm90IGZvdW5kLmApO1xuXG4gICAgICAgICAgICBpZiAoX2NvbXBvbmVudC5kZXBlbmRlbmNpZXMpXG4gICAgICAgICAgICAgICAgZm9yIChjb25zdCBkZXBlbmRlbmN5IG9mIF9jb21wb25lbnQuZGVwZW5kZW5jaWVzKVxuICAgICAgICAgICAgICAgICAgICB0aGlzLmFkZENvbXBvbmVudChkZXBlbmRlbmN5KTtcblxuICAgICAgICAgICAgdGhpcy5fY29tcG9uZW50cy5zZXQoX2NvbXBvbmVudCwgeyAuLi5fY29tcG9uZW50LmRlZmF1bHRzLCAuLi5kYXRhIH0pO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgZ2V0Q29tcG9uZW50PHQgZXh0ZW5kcyBDb21wb25lbnRUeXBlPGFueT4+KGNvbXBvbmVudDogdCk6IEluc3RhbmNlVHlwZTx0PltcImRlZmF1bHRzXCJdIHtcbiAgICAgICAgY29uc3QgX2NvbXBvbmVudCA9IEdhbWUuY29tcG9uZW50cy5nZXQoY29tcG9uZW50Lm5hbWUpO1xuXG4gICAgICAgIGlmIChfY29tcG9uZW50ID09IHVuZGVmaW5lZClcbiAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcihgQ29tcG9uZW50ICR7Y29tcG9uZW50Lm5hbWV9IGRvZXNuJ3QgZXhpc3QuYCk7XG5cbiAgICAgICAgcmV0dXJuIHRoaXMuX2NvbXBvbmVudHMuZ2V0KF9jb21wb25lbnQpO1xuICAgIH1cblxuICAgIGdldEFsbENvbXBvbmVudHMoKSB7XG4gICAgICAgIHJldHVybiBbLi4udGhpcy5fY29tcG9uZW50cy5lbnRyaWVzKCldXG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogRmluZCBhIGNvbXBvbmVudCBieSBuYW1lLlxuICAgICAqL1xuICAgIGhhc0NvbXBvbmVudChjb21wb25lbnQ6IENvbXBvbmVudFR5cGU8YW55Pik6IGJvb2xlYW4ge1xuICAgICAgICBjb25zdCBfY29tcG9uZW50ID0gR2FtZS5jb21wb25lbnRzLmdldChjb21wb25lbnQubmFtZSk7XG5cbiAgICAgICAgaWYgKF9jb21wb25lbnQgPT0gdW5kZWZpbmVkKVxuICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xuXG4gICAgICAgIHJldHVybiB0aGlzLl9jb21wb25lbnRzLmhhcyhfY29tcG9uZW50KTtcbiAgICB9XG5cbiAgICBkZXN0cm95KCkge1xuICAgICAgICB0aGlzLmNhbGxEZXN0cm95SG9va3MoKTtcblxuICAgICAgICBHYW1lLnJlbW92ZUVudGl0eSh0aGlzKTtcbiAgICB9XG5cbiAgICBjbG9uZSgpIHtcbiAgICAgICAgY29uc3QgY29weSA9IG5ldyBFbnRpdHkoKTtcbiAgICAgICAgY29weS50YWdzID0gbmV3IFNldCh0aGlzLnRhZ3MpO1xuICAgICAgICBmb3IgKGNvbnN0IFtjb21wb25lbnQsIGRhdGFdIG9mIHRoaXMuX2NvbXBvbmVudHMpXG4gICAgICAgICAgICBjb3B5LmFkZENvbXBvbmVudChjb21wb25lbnQuY29uc3RydWN0b3IgYXMgQ29tcG9uZW50VHlwZTxhbnk+LCBzdHJ1Y3R1cmVkQ2xvbmUoZGF0YSkpO1xuXG4gICAgICAgIHJldHVybiBjb3B5O1xuICAgIH1cbn1cbiIsICJleHBvcnQgZGVmYXVsdCBjbGFzcyBLZXlib2FyZCB7XG4gICAgcHJpdmF0ZSBzdGF0aWMgcHJlc3NlZEtleXM6IFNldDxzdHJpbmc+ID0gbmV3IFNldCgpO1xuICAgIHByaXZhdGUgc3RhdGljIGN1cnJlbnRGcmFtZTogU2V0PHN0cmluZz4gPSBuZXcgU2V0KCk7XG5cbiAgICBwdWJsaWMgc3RhdGljIGluaXRpYWxpemUoKSB7XG4gICAgICAgIHdpbmRvdy5hZGRFdmVudExpc3RlbmVyKFwia2V5ZG93blwiLCBlID0+IHRoaXMuaGFuZGxlS2V5RG93bihlKSk7XG4gICAgICAgIHdpbmRvdy5hZGRFdmVudExpc3RlbmVyKFwia2V5dXBcIiwgZSA9PiB0aGlzLmhhbmRsZUtleVVwKGUpKTtcbiAgICB9XG5cbiAgICBwcml2YXRlIHN0YXRpYyBoYW5kbGVLZXlEb3duKGV2ZW50OiBLZXlib2FyZEV2ZW50KSB7XG4gICAgICAgIHRoaXMuYWRkS2V5KGV2ZW50LmtleS50b0xvd2VyQ2FzZSgpKTtcblxuICAgICAgICBpZiAoZXZlbnQuY3RybEtleSlcbiAgICAgICAgICAgIHRoaXMuYWRkS2V5KFwiY3RybFwiKTtcblxuICAgICAgICBpZiAoZXZlbnQuc2hpZnRLZXkpXG4gICAgICAgICAgICB0aGlzLmFkZEtleShcInNoaWZ0XCIpO1xuXG4gICAgICAgIGlmIChldmVudC5tZXRhS2V5KVxuICAgICAgICAgICAgdGhpcy5hZGRLZXkoXCJtZXRhXCIpO1xuXG4gICAgICAgIGlmIChldmVudC5hbHRLZXkpXG4gICAgICAgICAgICB0aGlzLmFkZEtleShcImFsdFwiKTtcbiAgICB9XG5cbiAgICBwcml2YXRlIHN0YXRpYyBoYW5kbGVLZXlVcChldmVudDogS2V5Ym9hcmRFdmVudCkge1xuICAgICAgICB0aGlzLnByZXNzZWRLZXlzLmRlbGV0ZShldmVudC5rZXkudG9Mb3dlckNhc2UoKSk7XG5cbiAgICAgICAgaWYgKCFldmVudC5jdHJsS2V5KVxuICAgICAgICAgICAgdGhpcy5wcmVzc2VkS2V5cy5kZWxldGUoXCJjdHJsXCIpO1xuXG4gICAgICAgIGlmICghZXZlbnQuc2hpZnRLZXkpXG4gICAgICAgICAgICB0aGlzLnByZXNzZWRLZXlzLmRlbGV0ZShcInNoaWZ0XCIpO1xuXG4gICAgICAgIGlmICghZXZlbnQubWV0YUtleSlcbiAgICAgICAgICAgIHRoaXMucHJlc3NlZEtleXMuZGVsZXRlKFwibWV0YVwiKTtcblxuICAgICAgICBpZiAoIWV2ZW50LmFsdEtleSlcbiAgICAgICAgICAgIHRoaXMucHJlc3NlZEtleXMuZGVsZXRlKFwiYWx0XCIpO1xuXG4gICAgICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBzdGF0aWMgYWRkS2V5KGtleTogc3RyaW5nKSB7XG4gICAgICAgIHRoaXMucHJlc3NlZEtleXMuYWRkKGtleSk7XG4gICAgICAgIHRoaXMuY3VycmVudEZyYW1lLmFkZChrZXkpO1xuICAgIH1cblxuICAgIHB1YmxpYyBzdGF0aWMgaXNEb3duKC4uLmtleXM6IHN0cmluZ1tdKTogYm9vbGVhbiB7XG4gICAgICAgIHJldHVybiAha2V5cy5zb21lKHggPT4gIXRoaXMucHJlc3NlZEtleXMuaGFzKHgpKTtcbiAgICB9XG5cbiAgICBwdWJsaWMgc3RhdGljIGlzUHJlc3NlZCguLi5rZXlzOiBzdHJpbmdbXSk6IGJvb2xlYW4ge1xuICAgICAgICByZXR1cm4gIWtleXMuc29tZSh4ID0+ICF0aGlzLmN1cnJlbnRGcmFtZS5oYXMoeCkpO1xuICAgIH1cblxuICAgIHB1YmxpYyBzdGF0aWMgY2xlYXJGcmFtZSgpIHtcbiAgICAgICAgdGhpcy5jdXJyZW50RnJhbWUuY2xlYXIoKTtcbiAgICB9XG59XG5cbktleWJvYXJkLmluaXRpYWxpemUoKTsiLCAiaW1wb3J0IENhbnZhcyBmcm9tICdAL1JlbmRlcmVyL0NhbnZhcyc7XG5pbXBvcnQgQ29tcG9uZW50LCB7IENvbXBvbmVudFR5cGUgfSBmcm9tICdAL0RhdGEvQ29tcG9uZW50JztcbmltcG9ydCBFbnRpdHkgZnJvbSAnQC9EYXRhL0VudGl0eSc7XG5pbXBvcnQgS2V5Ym9hcmQgZnJvbSAnQC9LZXlib2FyZCc7XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIEdhbWUge1xuICAgIHByaXZhdGUgc3RhdGljIF9jYW52YXM6IENhbnZhcyA9IG5ldyBDYW52YXMoKTtcbiAgICBwcml2YXRlIHN0YXRpYyBfZW50aXRpZXM6IEVudGl0eVtdID0gW107XG4gICAgcHJpdmF0ZSBzdGF0aWMgX2NvbXBvbmVudHM6IE1hcDxzdHJpbmcsIENvbXBvbmVudD4gPSBuZXcgTWFwKCk7XG4gICAgcHJpdmF0ZSBzdGF0aWMgX3RpbWUgPSAwO1xuICAgIHByaXZhdGUgc3RhdGljIHVwZGF0ZUNhbGxiYWNrczogKCgpID0+IHZvaWQpW10gPSBbXTtcblxuICAgIHByaXZhdGUgc3RhdGljIF9wYXVzZWQgPSBmYWxzZTtcbiAgICBwcml2YXRlIHN0YXRpYyBfZGVidWcgPSB0cnVlO1xuXG4gICAgcHVibGljIHN0YXRpYyBnZXQgZGVidWcoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLl9kZWJ1ZztcbiAgICB9XG5cbiAgICBwdWJsaWMgc3RhdGljIGdldCB0aW1lKCkge1xuICAgICAgICByZXR1cm4gdGhpcy5fdGltZTtcbiAgICB9XG5cbiAgICBwdWJsaWMgc3RhdGljIGdldCBwYXVzZWQoKTogYm9vbGVhbiB7XG4gICAgICAgIHJldHVybiB0aGlzLl9wYXVzZWQ7XG4gICAgfVxuXG4gICAgcHVibGljIHN0YXRpYyBzZXQgcGF1c2VkKHZhbHVlKSB7XG4gICAgICAgIHRoaXMuX3BhdXNlZCA9IHZhbHVlO1xuXG4gICAgICAgIGlmICghdGhpcy5fcGF1c2VkKSB7XG4gICAgICAgICAgICB0aGlzLnN0YXJ0KCk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBwdWJsaWMgc3RhdGljIGdldCBjYW52YXMoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLl9jYW52YXM7XG4gICAgfVxuXG4gICAgcHVibGljIHN0YXRpYyBnZXQgY29tcG9uZW50cygpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX2NvbXBvbmVudHM7XG4gICAgfVxuXG4gICAgcHVibGljIHN0YXRpYyBnZXQgZW50aXRpZXMoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLl9lbnRpdGllcztcbiAgICB9XG5cbiAgICBwdWJsaWMgc3RhdGljIHN0YXJ0KCkge1xuICAgICAgICByZXF1ZXN0QW5pbWF0aW9uRnJhbWUodGhpcy5sb29wLmJpbmQodGhpcykpO1xuICAgIH1cblxuICAgIHB1YmxpYyBzdGF0aWMgZ2V0RW50aXR5KC4uLnRhZ3M6IHN0cmluZ1tdKSB7XG4gICAgICAgIHJldHVybiB0aGlzLl9lbnRpdGllcy5maW5kKHggPT4gIXRhZ3Muc29tZSh5ID0+ICF4LnRhZ3MuaGFzKHkpKSk7XG4gICAgfVxuXG4gICAgcHVibGljIHN0YXRpYyBnZXRFbnRpdGllcyguLi50YWdzOiBzdHJpbmdbXSkge1xuICAgICAgICBpZiAodGFncy5sZW5ndGggPT0gMClcbiAgICAgICAgICAgIHJldHVybiB0aGlzLl9lbnRpdGllcztcblxuICAgICAgICByZXR1cm4gdGhpcy5fZW50aXRpZXMuZmlsdGVyKHggPT4gIXRhZ3Muc29tZSh5ID0+ICF4LnRhZ3MuaGFzKHkpKSk7XG4gICAgfVxuXG4gICAgcHVibGljIHN0YXRpYyByZWdpc3RlckVudGl0eShlbnRpdHk6IEVudGl0eSkge1xuICAgICAgICB0aGlzLl9lbnRpdGllcy5wdXNoKGVudGl0eSk7XG4gICAgICAgIGVudGl0eS5zdGFydCgpO1xuICAgIH1cblxuICAgIHN0YXRpYyByZW1vdmVFbnRpdHkoZW50aXR5OiBFbnRpdHkpIHtcbiAgICAgICAgY29uc3QgaW5kZXggPSB0aGlzLl9lbnRpdGllcy5pbmRleE9mKGVudGl0eSk7XG5cbiAgICAgICAgdGhpcy5fZW50aXRpZXMuc3BsaWNlKGluZGV4LCAxKTtcbiAgICB9XG5cbiAgICBwdWJsaWMgc3RhdGljIGNyZWF0ZUVudGl0eSguLi50YWdzOiBzdHJpbmdbXSkge1xuICAgICAgICBjb25zdCBlbnRpdHkgPSBuZXcgRW50aXR5KCk7XG5cbiAgICAgICAgZm9yIChjb25zdCB0YWcgb2YgdGFncylcbiAgICAgICAgICAgIGVudGl0eS50YWdzLmFkZCh0YWcpO1xuXG4gICAgICAgIHRoaXMuX2VudGl0aWVzLnB1c2goZW50aXR5KTtcbiAgICAgICAgcmV0dXJuIGVudGl0eTtcbiAgICB9XG5cbiAgICBwdWJsaWMgc3RhdGljIHJlZ2lzdGVyQ29tcG9uZW50KC4uLmNvbXBvbmVudHM6IENvbXBvbmVudFR5cGU8YW55PltdKSB7XG4gICAgICAgIGZvciAoY29uc3QgY29tcG9uZW50IG9mIGNvbXBvbmVudHMpIHtcbiAgICAgICAgICAgIHRoaXMuX2NvbXBvbmVudHMuc2V0KGNvbXBvbmVudC5uYW1lLCBuZXcgY29tcG9uZW50KCkpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgcHVibGljIHN0YXRpYyBvblVwZGF0ZShjYWxsYmFjazogKCkgPT4gdm9pZCkge1xuICAgICAgICB0aGlzLnVwZGF0ZUNhbGxiYWNrcy5wdXNoKGNhbGxiYWNrKTtcbiAgICB9XG5cbiAgICBwcml2YXRlIHN0YXRpYyBsb29wKCkge1xuICAgICAgICB0aGlzLmNhbnZhcy5kcmF3KCk7XG4gICAgICAgIHRoaXMuX3RpbWUrKztcbiAgICAgICAgaWYgKHRoaXMuX3RpbWUgPiA2MClcbiAgICAgICAgICAgIHRoaXMuX3RpbWUgPSAwO1xuXG4gICAgICAgIGlmIChLZXlib2FyZC5pc1ByZXNzZWQoXCJlc2NhcGVcIikpIHtcbiAgICAgICAgICAgIHRoaXMucGF1c2VkID0gIXRoaXMucGF1c2VkO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKEtleWJvYXJkLmlzUHJlc3NlZChcImN0cmxcIiwgXCJmMVwiKSkge1xuICAgICAgICAgICAgdGhpcy5fZGVidWcgPSAhdGhpcy5fZGVidWc7XG4gICAgICAgICAgICBpbXBvcnQoXCIuL0RlYnVnL0RlYnVnZ2VyLmpzXCIpXG4gICAgICAgICAgICAgICAgLnRoZW4oeCA9PiB7IGNvbnNvbGUubG9nKHgpOyB4LmRlZmF1bHQuc3RhcnQoKTsgfSlcbiAgICAgICAgICAgICAgICAuY2F0Y2goZSA9PiBjb25zb2xlLmVycm9yKFwiRmFpbGVkIHRvIGxvYWQgZGVidWdnZXJcIiwgZSkpO1xuICAgICAgICB9XG5cblxuICAgICAgICBmb3IgKGNvbnN0IGVudGl0eSBvZiB0aGlzLl9lbnRpdGllcykge1xuICAgICAgICAgICAgZW50aXR5LnJlbmRlcigpO1xuXG4gICAgICAgICAgICBpZiAoIXRoaXMuX3BhdXNlZClcbiAgICAgICAgICAgICAgICBlbnRpdHkudXBkYXRlKCk7XG4gICAgICAgIH1cblxuICAgICAgICB0aGlzLnVwZGF0ZUNhbGxiYWNrcy5mb3JFYWNoKHggPT4geCgpKTtcblxuICAgICAgICBLZXlib2FyZC5jbGVhckZyYW1lKCk7XG4gICAgICAgIHJlcXVlc3RBbmltYXRpb25GcmFtZSh0aGlzLmxvb3AuYmluZCh0aGlzKSk7XG4gICAgfVxufVxuXG5HYW1lLnN0YXJ0KCk7IiwgImltcG9ydCBWZWN0b3IyIGZyb20gJ0AvRGF0YS9WZWN0b3IyJztcbmltcG9ydCBHYW1lIGZyb20gJy4vR2FtZSc7XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIE1vdXNlIHtcbiAgICBwcml2YXRlIHN0YXRpYyBfeDogbnVtYmVyID0gMDtcbiAgICBwcml2YXRlIHN0YXRpYyBfeTogbnVtYmVyID0gMDtcbiAgICBwcml2YXRlIHN0YXRpYyBfd2hlZWw6IG51bWJlciA9IDA7XG4gICAgcHJpdmF0ZSBzdGF0aWMgbW91c2VCdXR0b25zOiB7XG4gICAgICAgIGxlZnQ6IGJvb2xlYW4sXG4gICAgICAgIHJpZ2h0OiBib29sZWFuLFxuICAgICAgICBtaWRkbGU6IGJvb2xlYW47XG4gICAgfSA9IHsgbGVmdDogZmFsc2UsIHJpZ2h0OiBmYWxzZSwgbWlkZGxlOiBmYWxzZSB9O1xuXG4gICAgcHVibGljIHN0YXRpYyBnZXQgeCgpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX3g7XG4gICAgfVxuXG4gICAgcHVibGljIHN0YXRpYyBnZXQgeSgpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX3k7XG4gICAgfVxuXG4gICAgcHVibGljIHN0YXRpYyBnZXQgd2hlZWwoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLl93aGVlbDtcbiAgICB9XG5cbiAgICBwdWJsaWMgc3RhdGljIGdldCBwb3NpdGlvbigpIHtcbiAgICAgICAgcmV0dXJuIG5ldyBWZWN0b3IyKFxuICAgICAgICAgICAgdGhpcy5feCxcbiAgICAgICAgICAgIHRoaXMuX3lcbiAgICAgICAgKTtcbiAgICB9XG5cbiAgICBwdWJsaWMgc3RhdGljIHNldCB2aXNpYmxlKHZhbHVlKSB7XG4gICAgICAgIEdhbWUuY2FudmFzLmVsZW1lbnQuc3R5bGUuY3Vyc29yID0gdmFsdWUgPyAnZGVmYXVsdCcgOiAnbm9uZSc7XG4gICAgfVxuXG4gICAgcHVibGljIHN0YXRpYyBnZXQgdmlzaWJsZSgpIHtcbiAgICAgICAgcmV0dXJuIEdhbWUuY2FudmFzLmVsZW1lbnQuc3R5bGUuY3Vyc29yID09ICdkZWZhdWx0JztcbiAgICB9XG5cbiAgICBwdWJsaWMgc3RhdGljIGdldCBsZWZ0KCkge1xuICAgICAgICByZXR1cm4gdGhpcy5tb3VzZUJ1dHRvbnMubGVmdDtcbiAgICB9XG5cbiAgICBwdWJsaWMgc3RhdGljIGdldCByaWdodCgpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMubW91c2VCdXR0b25zLnJpZ2h0O1xuICAgIH1cblxuICAgIHB1YmxpYyBzdGF0aWMgZ2V0IG1pZGRsZSgpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMubW91c2VCdXR0b25zLm1pZGRsZTtcbiAgICB9XG5cbiAgICBwdWJsaWMgc3RhdGljIGluaXRpYWxpemUoKSB7XG4gICAgICAgIHdpbmRvdy5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgZSA9PiBlLnByZXZlbnREZWZhdWx0KCkpO1xuICAgICAgICB3aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcihcImNvbnRleHRtZW51XCIsIGUgPT4gZS5wcmV2ZW50RGVmYXVsdCgpKTtcbiAgICAgICAgd2luZG93LmFkZEV2ZW50TGlzdGVuZXIoXCJ3aGVlbFwiLCBlID0+IHtcbiAgICAgICAgICAgIHRoaXMuX3doZWVsICs9IGUuZGVsdGFZICogLTAuMDE7XG4gICAgICAgICAgICBlLnByZXZlbnREZWZhdWx0KCk7XG4gICAgICAgIH0pO1xuXG4gICAgICAgIHdpbmRvdy5hZGRFdmVudExpc3RlbmVyKFwibW91c2Vtb3ZlXCIsIChlKSA9PiB7XG4gICAgICAgICAgICB0aGlzLl94ID0gZS5jbGllbnRYO1xuICAgICAgICAgICAgdGhpcy5feSA9IGUuY2xpZW50WTtcbiAgICAgICAgfSk7XG5cbiAgICAgICAgd2luZG93LmFkZEV2ZW50TGlzdGVuZXIoXCJtb3VzZWRvd25cIiwgKGUpID0+IHtcbiAgICAgICAgICAgIGUucHJldmVudERlZmF1bHQoKTtcbiAgICAgICAgICAgIHRoaXMubW91c2VCdXR0b25zLmxlZnQgPSBlLmJ1dHRvbiA9PSAwO1xuICAgICAgICAgICAgdGhpcy5tb3VzZUJ1dHRvbnMucmlnaHQgPSBlLmJ1dHRvbiA9PSAyO1xuICAgICAgICAgICAgdGhpcy5tb3VzZUJ1dHRvbnMubWlkZGxlID0gZS5idXR0b24gPT0gMTtcbiAgICAgICAgfSk7XG5cbiAgICAgICAgd2luZG93LmFkZEV2ZW50TGlzdGVuZXIoXCJtb3VzZXVwXCIsIChlKSA9PiB7XG4gICAgICAgICAgICBlLnByZXZlbnREZWZhdWx0KCk7XG4gICAgICAgICAgICB0aGlzLm1vdXNlQnV0dG9ucy5sZWZ0ID0gdGhpcy5tb3VzZUJ1dHRvbnMubGVmdCAmJiBlLmJ1dHRvbiAhPSAwO1xuICAgICAgICAgICAgdGhpcy5tb3VzZUJ1dHRvbnMucmlnaHQgPSB0aGlzLm1vdXNlQnV0dG9ucy5yaWdodCAmJiBlLmJ1dHRvbiAhPSAyO1xuICAgICAgICAgICAgdGhpcy5tb3VzZUJ1dHRvbnMubWlkZGxlID0gdGhpcy5tb3VzZUJ1dHRvbnMubWlkZGxlICYmIGUuYnV0dG9uICE9IDE7XG4gICAgICAgIH0pO1xuICAgIH1cbn1cblxuTW91c2UuaW5pdGlhbGl6ZSgpOyIsICJpbXBvcnQgUmVuZGVyQ29tcG9uZW50IGZyb20gJ0AvQ29tcG9uZW50cy9SZW5kZXJDb21wb25lbnQnO1xuaW1wb3J0IFNoYXBlUmVuZGVyZXJDb21wb25lbnQgZnJvbSAnQC9Db21wb25lbnRzL1NoYXBlUmVuZGVyZXJDb21wb25lbnQnO1xuaW1wb3J0IFJpZ2lkYm9keUNvbXBvbmVudCBmcm9tICdAL0NvbXBvbmVudHMvUmlnaWRib2R5Q29tcG9uZW50JztcbmltcG9ydCBUaWxlUmVuZGVyZXJDb21wb25lbnQgZnJvbSAnQC9Db21wb25lbnRzL1RpbGVSZW5kZXJlckNvbXBvbmVudCc7XG5pbXBvcnQgVHJhbnNmb3JtQ29tcG9uZW50IGZyb20gJ0AvQ29tcG9uZW50cy9UcmFuc2Zvcm1Db21wb25lbnQnO1xuaW1wb3J0IEdhbWUgZnJvbSAnLi9HYW1lJztcblxuR2FtZS5yZWdpc3RlckNvbXBvbmVudChcbiAgICBUcmFuc2Zvcm1Db21wb25lbnQsXG4gICAgUmlnaWRib2R5Q29tcG9uZW50LFxuICAgIFJlbmRlckNvbXBvbmVudCxcbiAgICBTaGFwZVJlbmRlcmVyQ29tcG9uZW50LFxuICAgIFRpbGVSZW5kZXJlckNvbXBvbmVudFxuKTtcblxuZXhwb3J0IHsgZGVmYXVsdCBhcyBUaWxlbWFwIH0gZnJvbSBcIkAvQXNzZXRzL1RpbGVtYXBcIjtcbmV4cG9ydCB7IGRlZmF1bHQgYXMgQ29sb3IgfSBmcm9tIFwiQC9SZW5kZXJlci9Db2xvclwiO1xuZXhwb3J0IHsgZGVmYXVsdCBhcyBDb21wb25lbnQgfSBmcm9tIFwiQC9EYXRhL0NvbXBvbmVudFwiO1xuZXhwb3J0IHsgZGVmYXVsdCBhcyBFbnRpdHkgfSBmcm9tIFwiQC9EYXRhL0VudGl0eVwiO1xuZXhwb3J0IHsgZGVmYXVsdCBhcyBWZWN0b3IyIH0gZnJvbSBcIkAvRGF0YS9WZWN0b3IyXCI7XG5leHBvcnQgeyBkZWZhdWx0IGFzIEtleWJvYXJkIH0gZnJvbSBcIkAvS2V5Ym9hcmRcIjtcbmV4cG9ydCB7IGRlZmF1bHQgYXMgTW91c2UgfSBmcm9tIFwiQC9Nb3VzZVwiO1xuXG5leHBvcnQgZGVmYXVsdCBHYW1lOyJdLAogICJtYXBwaW5ncyI6ICI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FB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
