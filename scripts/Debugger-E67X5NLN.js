import {
  Runtime_default,
  __commonJS,
  __name,
  __toModule
} from "./chunk-KOJFVHTC.js";

// node_modules/tweakpane/dist/tweakpane.js
var require_tweakpane = __commonJS({
  "node_modules/tweakpane/dist/tweakpane.js"(exports, module) {
    (function(global, factory) {
      typeof exports === "object" && typeof module !== "undefined" ? factory(exports) : typeof define === "function" && define.amd ? define(["exports"], factory) : (global = typeof globalThis !== "undefined" ? globalThis : global || self, factory(global.Tweakpane = {}));
    })(exports, function(exports2) {
      "use strict";
      class Semver {
        constructor(text) {
          const [core, prerelease] = text.split("-");
          const coreComps = core.split(".");
          this.major = parseInt(coreComps[0], 10);
          this.minor = parseInt(coreComps[1], 10);
          this.patch = parseInt(coreComps[2], 10);
          this.prerelease = prerelease !== null && prerelease !== void 0 ? prerelease : null;
        }
        toString() {
          const core = [this.major, this.minor, this.patch].join(".");
          return this.prerelease !== null ? [core, this.prerelease].join("-") : core;
        }
      }
      __name(Semver, "Semver");
      class BladeApi {
        constructor(controller) {
          this.controller_ = controller;
        }
        get disabled() {
          return this.controller_.viewProps.get("disabled");
        }
        set disabled(disabled) {
          this.controller_.viewProps.set("disabled", disabled);
        }
        get hidden() {
          return this.controller_.viewProps.get("hidden");
        }
        set hidden(hidden) {
          this.controller_.viewProps.set("hidden", hidden);
        }
        dispose() {
          this.controller_.viewProps.set("disposed", true);
        }
      }
      __name(BladeApi, "BladeApi");
      class TpEvent {
        constructor(target) {
          this.target = target;
        }
      }
      __name(TpEvent, "TpEvent");
      class TpChangeEvent extends TpEvent {
        constructor(target, value, presetKey, last) {
          super(target);
          this.value = value;
          this.presetKey = presetKey;
          this.last = last !== null && last !== void 0 ? last : true;
        }
      }
      __name(TpChangeEvent, "TpChangeEvent");
      class TpUpdateEvent extends TpEvent {
        constructor(target, value, presetKey) {
          super(target);
          this.value = value;
          this.presetKey = presetKey;
        }
      }
      __name(TpUpdateEvent, "TpUpdateEvent");
      class TpFoldEvent extends TpEvent {
        constructor(target, expanded) {
          super(target);
          this.expanded = expanded;
        }
      }
      __name(TpFoldEvent, "TpFoldEvent");
      function forceCast(v) {
        return v;
      }
      __name(forceCast, "forceCast");
      function isEmpty(value) {
        return value === null || value === void 0;
      }
      __name(isEmpty, "isEmpty");
      function deepEqualsArray(a1, a2) {
        if (a1.length !== a2.length) {
          return false;
        }
        for (let i = 0; i < a1.length; i++) {
          if (a1[i] !== a2[i]) {
            return false;
          }
        }
        return true;
      }
      __name(deepEqualsArray, "deepEqualsArray");
      const CREATE_MESSAGE_MAP = {
        alreadydisposed: () => "View has been already disposed",
        invalidparams: (context) => `Invalid parameters for '${context.name}'`,
        nomatchingcontroller: (context) => `No matching controller for '${context.key}'`,
        nomatchingview: (context) => `No matching view for '${JSON.stringify(context.params)}'`,
        notbindable: () => `Value is not bindable`,
        propertynotfound: (context) => `Property '${context.name}' not found`,
        shouldneverhappen: () => "This error should never happen"
      };
      class TpError {
        constructor(config) {
          var _a;
          this.message = (_a = CREATE_MESSAGE_MAP[config.type](forceCast(config.context))) !== null && _a !== void 0 ? _a : "Unexpected error";
          this.name = this.constructor.name;
          this.stack = new Error(this.message).stack;
          this.type = config.type;
        }
        static alreadyDisposed() {
          return new TpError({ type: "alreadydisposed" });
        }
        static notBindable() {
          return new TpError({
            type: "notbindable"
          });
        }
        static propertyNotFound(name) {
          return new TpError({
            type: "propertynotfound",
            context: {
              name
            }
          });
        }
        static shouldNeverHappen() {
          return new TpError({ type: "shouldneverhappen" });
        }
      }
      __name(TpError, "TpError");
      class BindingTarget {
        constructor(obj, key, opt_id) {
          this.obj_ = obj;
          this.key_ = key;
          this.presetKey_ = opt_id !== null && opt_id !== void 0 ? opt_id : key;
        }
        static isBindable(obj) {
          if (obj === null) {
            return false;
          }
          if (typeof obj !== "object") {
            return false;
          }
          return true;
        }
        get key() {
          return this.key_;
        }
        get presetKey() {
          return this.presetKey_;
        }
        read() {
          return this.obj_[this.key_];
        }
        write(value) {
          this.obj_[this.key_] = value;
        }
        writeProperty(name, value) {
          const valueObj = this.read();
          if (!BindingTarget.isBindable(valueObj)) {
            throw TpError.notBindable();
          }
          if (!(name in valueObj)) {
            throw TpError.propertyNotFound(name);
          }
          valueObj[name] = value;
        }
      }
      __name(BindingTarget, "BindingTarget");
      class ButtonApi extends BladeApi {
        get label() {
          return this.controller_.props.get("label");
        }
        set label(label) {
          this.controller_.props.set("label", label);
        }
        get title() {
          var _a;
          return (_a = this.controller_.valueController.props.get("title")) !== null && _a !== void 0 ? _a : "";
        }
        set title(title) {
          this.controller_.valueController.props.set("title", title);
        }
        on(eventName, handler) {
          const bh = handler.bind(this);
          const emitter = this.controller_.valueController.emitter;
          emitter.on(eventName, () => {
            bh(new TpEvent(this));
          });
          return this;
        }
      }
      __name(ButtonApi, "ButtonApi");
      class Emitter {
        constructor() {
          this.observers_ = {};
        }
        on(eventName, handler) {
          let observers = this.observers_[eventName];
          if (!observers) {
            observers = this.observers_[eventName] = [];
          }
          observers.push({
            handler
          });
          return this;
        }
        off(eventName, handler) {
          const observers = this.observers_[eventName];
          if (observers) {
            this.observers_[eventName] = observers.filter((observer) => {
              return observer.handler !== handler;
            });
          }
          return this;
        }
        emit(eventName, event) {
          const observers = this.observers_[eventName];
          if (!observers) {
            return;
          }
          observers.forEach((observer) => {
            observer.handler(event);
          });
        }
      }
      __name(Emitter, "Emitter");
      const PREFIX = "tp";
      function ClassName(viewName) {
        const fn = /* @__PURE__ */ __name((opt_elementName, opt_modifier) => {
          return [
            PREFIX,
            "-",
            viewName,
            "v",
            opt_elementName ? `_${opt_elementName}` : "",
            opt_modifier ? `-${opt_modifier}` : ""
          ].join("");
        }, "fn");
        return fn;
      }
      __name(ClassName, "ClassName");
      function compose(h1, h2) {
        return (input) => h2(h1(input));
      }
      __name(compose, "compose");
      function extractValue(ev) {
        return ev.rawValue;
      }
      __name(extractValue, "extractValue");
      function bindValue(value, applyValue) {
        value.emitter.on("change", compose(extractValue, applyValue));
        applyValue(value.rawValue);
      }
      __name(bindValue, "bindValue");
      function bindValueMap(valueMap, key, applyValue) {
        bindValue(valueMap.value(key), applyValue);
      }
      __name(bindValueMap, "bindValueMap");
      function applyClass(elem, className2, active) {
        if (active) {
          elem.classList.add(className2);
        } else {
          elem.classList.remove(className2);
        }
      }
      __name(applyClass, "applyClass");
      function valueToClassName(elem, className2) {
        return (value) => {
          applyClass(elem, className2, value);
        };
      }
      __name(valueToClassName, "valueToClassName");
      function bindValueToTextContent(value, elem) {
        bindValue(value, (text) => {
          elem.textContent = text !== null && text !== void 0 ? text : "";
        });
      }
      __name(bindValueToTextContent, "bindValueToTextContent");
      const className$q = ClassName("btn");
      class ButtonView {
        constructor(doc, config) {
          this.element = doc.createElement("div");
          this.element.classList.add(className$q());
          config.viewProps.bindClassModifiers(this.element);
          const buttonElem = doc.createElement("button");
          buttonElem.classList.add(className$q("b"));
          config.viewProps.bindDisabled(buttonElem);
          this.element.appendChild(buttonElem);
          this.buttonElement = buttonElem;
          const titleElem = doc.createElement("div");
          titleElem.classList.add(className$q("t"));
          bindValueToTextContent(config.props.value("title"), titleElem);
          this.buttonElement.appendChild(titleElem);
        }
      }
      __name(ButtonView, "ButtonView");
      class ButtonController {
        constructor(doc, config) {
          this.emitter = new Emitter();
          this.onClick_ = this.onClick_.bind(this);
          this.props = config.props;
          this.viewProps = config.viewProps;
          this.view = new ButtonView(doc, {
            props: this.props,
            viewProps: this.viewProps
          });
          this.view.buttonElement.addEventListener("click", this.onClick_);
        }
        onClick_() {
          this.emitter.emit("click", {
            sender: this
          });
        }
      }
      __name(ButtonController, "ButtonController");
      class BoundValue {
        constructor(initialValue, config) {
          var _a;
          this.constraint_ = config === null || config === void 0 ? void 0 : config.constraint;
          this.equals_ = (_a = config === null || config === void 0 ? void 0 : config.equals) !== null && _a !== void 0 ? _a : (v1, v2) => v1 === v2;
          this.emitter = new Emitter();
          this.rawValue_ = initialValue;
        }
        get constraint() {
          return this.constraint_;
        }
        get rawValue() {
          return this.rawValue_;
        }
        set rawValue(rawValue) {
          this.setRawValue(rawValue, {
            forceEmit: false,
            last: true
          });
        }
        setRawValue(rawValue, options) {
          const opts = options !== null && options !== void 0 ? options : {
            forceEmit: false,
            last: true
          };
          const constrainedValue = this.constraint_ ? this.constraint_.constrain(rawValue) : rawValue;
          const changed = !this.equals_(this.rawValue_, constrainedValue);
          if (!changed && !opts.forceEmit) {
            return;
          }
          this.emitter.emit("beforechange", {
            sender: this
          });
          this.rawValue_ = constrainedValue;
          this.emitter.emit("change", {
            options: opts,
            rawValue: constrainedValue,
            sender: this
          });
        }
      }
      __name(BoundValue, "BoundValue");
      class PrimitiveValue {
        constructor(initialValue) {
          this.emitter = new Emitter();
          this.value_ = initialValue;
        }
        get rawValue() {
          return this.value_;
        }
        set rawValue(value) {
          this.setRawValue(value, {
            forceEmit: false,
            last: true
          });
        }
        setRawValue(value, options) {
          const opts = options !== null && options !== void 0 ? options : {
            forceEmit: false,
            last: true
          };
          if (this.value_ === value && !opts.forceEmit) {
            return;
          }
          this.emitter.emit("beforechange", {
            sender: this
          });
          this.value_ = value;
          this.emitter.emit("change", {
            options: opts,
            rawValue: this.value_,
            sender: this
          });
        }
      }
      __name(PrimitiveValue, "PrimitiveValue");
      function createValue(initialValue, config) {
        const constraint = config === null || config === void 0 ? void 0 : config.constraint;
        const equals = config === null || config === void 0 ? void 0 : config.equals;
        if (!constraint && !equals) {
          return new PrimitiveValue(initialValue);
        }
        return new BoundValue(initialValue, config);
      }
      __name(createValue, "createValue");
      class ValueMap {
        constructor(valueMap) {
          this.emitter = new Emitter();
          this.valMap_ = valueMap;
          for (const key in this.valMap_) {
            const v = this.valMap_[key];
            v.emitter.on("change", () => {
              this.emitter.emit("change", {
                key,
                sender: this
              });
            });
          }
        }
        static createCore(initialValue) {
          const keys = Object.keys(initialValue);
          return keys.reduce((o, key) => {
            return Object.assign(o, {
              [key]: createValue(initialValue[key])
            });
          }, {});
        }
        static fromObject(initialValue) {
          const core = this.createCore(initialValue);
          return new ValueMap(core);
        }
        get(key) {
          return this.valMap_[key].rawValue;
        }
        set(key, value) {
          this.valMap_[key].rawValue = value;
        }
        value(key) {
          return this.valMap_[key];
        }
      }
      __name(ValueMap, "ValueMap");
      function parseObject(value, keyToParserMap) {
        const keys = Object.keys(keyToParserMap);
        const result = keys.reduce((tmp, key) => {
          if (tmp === void 0) {
            return void 0;
          }
          const parser = keyToParserMap[key];
          const result2 = parser(value[key]);
          return result2.succeeded ? Object.assign(Object.assign({}, tmp), { [key]: result2.value }) : void 0;
        }, {});
        return forceCast(result);
      }
      __name(parseObject, "parseObject");
      function parseArray(value, parseItem) {
        return value.reduce((tmp, item) => {
          if (tmp === void 0) {
            return void 0;
          }
          const result = parseItem(item);
          if (!result.succeeded || result.value === void 0) {
            return void 0;
          }
          return [...tmp, result.value];
        }, []);
      }
      __name(parseArray, "parseArray");
      function isObject(value) {
        if (value === null) {
          return false;
        }
        return typeof value === "object";
      }
      __name(isObject, "isObject");
      function createParamsParserBuilder(parse) {
        return (optional) => (v) => {
          if (!optional && v === void 0) {
            return {
              succeeded: false,
              value: void 0
            };
          }
          if (optional && v === void 0) {
            return {
              succeeded: true,
              value: void 0
            };
          }
          const result = parse(v);
          return result !== void 0 ? {
            succeeded: true,
            value: result
          } : {
            succeeded: false,
            value: void 0
          };
        };
      }
      __name(createParamsParserBuilder, "createParamsParserBuilder");
      function createParamsParserBuilders(optional) {
        return {
          custom: (parse) => createParamsParserBuilder(parse)(optional),
          boolean: createParamsParserBuilder((v) => typeof v === "boolean" ? v : void 0)(optional),
          number: createParamsParserBuilder((v) => typeof v === "number" ? v : void 0)(optional),
          string: createParamsParserBuilder((v) => typeof v === "string" ? v : void 0)(optional),
          function: createParamsParserBuilder((v) => typeof v === "function" ? v : void 0)(optional),
          constant: (value) => createParamsParserBuilder((v) => v === value ? value : void 0)(optional),
          raw: createParamsParserBuilder((v) => v)(optional),
          object: (keyToParserMap) => createParamsParserBuilder((v) => {
            if (!isObject(v)) {
              return void 0;
            }
            return parseObject(v, keyToParserMap);
          })(optional),
          array: (itemParser) => createParamsParserBuilder((v) => {
            if (!Array.isArray(v)) {
              return void 0;
            }
            return parseArray(v, itemParser);
          })(optional)
        };
      }
      __name(createParamsParserBuilders, "createParamsParserBuilders");
      const ParamsParsers = {
        optional: createParamsParserBuilders(true),
        required: createParamsParserBuilders(false)
      };
      function parseParams(value, keyToParserMap) {
        const result = ParamsParsers.required.object(keyToParserMap)(value);
        return result.succeeded ? result.value : void 0;
      }
      __name(parseParams, "parseParams");
      function disposeElement(elem) {
        if (elem && elem.parentElement) {
          elem.parentElement.removeChild(elem);
        }
        return null;
      }
      __name(disposeElement, "disposeElement");
      function getAllBladePositions() {
        return ["veryfirst", "first", "last", "verylast"];
      }
      __name(getAllBladePositions, "getAllBladePositions");
      const className$p = ClassName("");
      const POS_TO_CLASS_NAME_MAP = {
        veryfirst: "vfst",
        first: "fst",
        last: "lst",
        verylast: "vlst"
      };
      class BladeController {
        constructor(config) {
          this.parent_ = null;
          this.blade = config.blade;
          this.view = config.view;
          this.viewProps = config.viewProps;
          const elem = this.view.element;
          this.blade.value("positions").emitter.on("change", () => {
            getAllBladePositions().forEach((pos) => {
              elem.classList.remove(className$p(void 0, POS_TO_CLASS_NAME_MAP[pos]));
            });
            this.blade.get("positions").forEach((pos) => {
              elem.classList.add(className$p(void 0, POS_TO_CLASS_NAME_MAP[pos]));
            });
          });
          this.viewProps.handleDispose(() => {
            disposeElement(elem);
          });
        }
        get parent() {
          return this.parent_;
        }
      }
      __name(BladeController, "BladeController");
      const SVG_NS = "http://www.w3.org/2000/svg";
      function forceReflow(element) {
        element.offsetHeight;
      }
      __name(forceReflow, "forceReflow");
      function disableTransitionTemporarily(element, callback) {
        const t = element.style.transition;
        element.style.transition = "none";
        callback();
        element.style.transition = t;
      }
      __name(disableTransitionTemporarily, "disableTransitionTemporarily");
      function supportsTouch(doc) {
        return doc.ontouchstart !== void 0;
      }
      __name(supportsTouch, "supportsTouch");
      function getGlobalObject() {
        return new Function("return this")();
      }
      __name(getGlobalObject, "getGlobalObject");
      function getWindowDocument() {
        const globalObj = forceCast(getGlobalObject());
        return globalObj.document;
      }
      __name(getWindowDocument, "getWindowDocument");
      function isBrowser() {
        return "document" in getGlobalObject();
      }
      __name(isBrowser, "isBrowser");
      function getCanvasContext(canvasElement) {
        return isBrowser() ? canvasElement.getContext("2d") : null;
      }
      __name(getCanvasContext, "getCanvasContext");
      const ICON_ID_TO_INNER_HTML_MAP = {
        check: '<path d="M2 8l4 4l8 -8"/>',
        dropdown: '<path d="M5 7h6l-3 3 z"/>',
        p2dpad: '<path d="M8 4v8"/><path d="M4 8h8"/><circle cx="12" cy="12" r="1.2"/>'
      };
      function createSvgIconElement(document, iconId) {
        const elem = document.createElementNS(SVG_NS, "svg");
        elem.innerHTML = ICON_ID_TO_INNER_HTML_MAP[iconId];
        return elem;
      }
      __name(createSvgIconElement, "createSvgIconElement");
      function insertElementAt(parentElement, element, index) {
        parentElement.insertBefore(element, parentElement.children[index]);
      }
      __name(insertElementAt, "insertElementAt");
      function removeElement(element) {
        if (element.parentElement) {
          element.parentElement.removeChild(element);
        }
      }
      __name(removeElement, "removeElement");
      function removeChildElements(element) {
        while (element.children.length > 0) {
          element.removeChild(element.children[0]);
        }
      }
      __name(removeChildElements, "removeChildElements");
      function removeChildNodes(element) {
        while (element.childNodes.length > 0) {
          element.removeChild(element.childNodes[0]);
        }
      }
      __name(removeChildNodes, "removeChildNodes");
      function findNextTarget(ev) {
        if (ev.relatedTarget) {
          return forceCast(ev.relatedTarget);
        }
        if ("explicitOriginalTarget" in ev) {
          return ev.explicitOriginalTarget;
        }
        return null;
      }
      __name(findNextTarget, "findNextTarget");
      const className$o = ClassName("lbl");
      function createLabelNode(doc, label) {
        const frag = doc.createDocumentFragment();
        const lineNodes = label.split("\n").map((line) => {
          return doc.createTextNode(line);
        });
        lineNodes.forEach((lineNode, index) => {
          if (index > 0) {
            frag.appendChild(doc.createElement("br"));
          }
          frag.appendChild(lineNode);
        });
        return frag;
      }
      __name(createLabelNode, "createLabelNode");
      class LabelView {
        constructor(doc, config) {
          this.element = doc.createElement("div");
          this.element.classList.add(className$o());
          config.viewProps.bindClassModifiers(this.element);
          const labelElem = doc.createElement("div");
          labelElem.classList.add(className$o("l"));
          bindValueMap(config.props, "label", (value) => {
            if (isEmpty(value)) {
              this.element.classList.add(className$o(void 0, "nol"));
            } else {
              this.element.classList.remove(className$o(void 0, "nol"));
              removeChildNodes(labelElem);
              labelElem.appendChild(createLabelNode(doc, value));
            }
          });
          this.element.appendChild(labelElem);
          this.labelElement = labelElem;
          const valueElem = doc.createElement("div");
          valueElem.classList.add(className$o("v"));
          this.element.appendChild(valueElem);
          this.valueElement = valueElem;
        }
      }
      __name(LabelView, "LabelView");
      class LabelController extends BladeController {
        constructor(doc, config) {
          const viewProps = config.valueController.viewProps;
          super(Object.assign(Object.assign({}, config), { view: new LabelView(doc, {
            props: config.props,
            viewProps
          }), viewProps }));
          this.props = config.props;
          this.valueController = config.valueController;
          this.view.valueElement.appendChild(this.valueController.view.element);
        }
      }
      __name(LabelController, "LabelController");
      const ButtonBladePlugin = {
        id: "button",
        type: "blade",
        accept(params) {
          const p = ParamsParsers;
          const result = parseParams(params, {
            title: p.required.string,
            view: p.required.constant("button"),
            label: p.optional.string
          });
          return result ? { params: result } : null;
        },
        controller(args) {
          return new LabelController(args.document, {
            blade: args.blade,
            props: ValueMap.fromObject({
              label: args.params.label
            }),
            valueController: new ButtonController(args.document, {
              props: ValueMap.fromObject({
                title: args.params.title
              }),
              viewProps: args.viewProps
            })
          });
        },
        api(args) {
          if (!(args.controller instanceof LabelController)) {
            return null;
          }
          if (!(args.controller.valueController instanceof ButtonController)) {
            return null;
          }
          return new ButtonApi(args.controller);
        }
      };
      class ValueBladeController extends BladeController {
        constructor(config) {
          super(config);
          this.value = config.value;
        }
      }
      __name(ValueBladeController, "ValueBladeController");
      function createBlade() {
        return new ValueMap({
          positions: createValue([], {
            equals: deepEqualsArray
          })
        });
      }
      __name(createBlade, "createBlade");
      class Foldable extends ValueMap {
        constructor(valueMap) {
          super(valueMap);
        }
        static create(expanded) {
          const coreObj = {
            completed: true,
            expanded,
            expandedHeight: null,
            shouldFixHeight: false,
            temporaryExpanded: null
          };
          const core = ValueMap.createCore(coreObj);
          return new Foldable(core);
        }
        get styleExpanded() {
          var _a;
          return (_a = this.get("temporaryExpanded")) !== null && _a !== void 0 ? _a : this.get("expanded");
        }
        get styleHeight() {
          if (!this.styleExpanded) {
            return "0";
          }
          const exHeight = this.get("expandedHeight");
          if (this.get("shouldFixHeight") && !isEmpty(exHeight)) {
            return `${exHeight}px`;
          }
          return "auto";
        }
        bindExpandedClass(elem, expandedClassName) {
          bindValueMap(this, "expanded", () => {
            const expanded = this.styleExpanded;
            if (expanded) {
              elem.classList.add(expandedClassName);
            } else {
              elem.classList.remove(expandedClassName);
            }
          });
        }
      }
      __name(Foldable, "Foldable");
      function computeExpandedFolderHeight(folder, containerElement) {
        let height = 0;
        disableTransitionTemporarily(containerElement, () => {
          folder.set("expandedHeight", null);
          folder.set("temporaryExpanded", true);
          forceReflow(containerElement);
          height = containerElement.clientHeight;
          folder.set("temporaryExpanded", null);
          forceReflow(containerElement);
        });
        return height;
      }
      __name(computeExpandedFolderHeight, "computeExpandedFolderHeight");
      function applyHeight(foldable, elem) {
        elem.style.height = foldable.styleHeight;
      }
      __name(applyHeight, "applyHeight");
      function bindFoldable(foldable, elem) {
        foldable.value("expanded").emitter.on("beforechange", () => {
          foldable.set("completed", false);
          if (isEmpty(foldable.get("expandedHeight"))) {
            foldable.set("expandedHeight", computeExpandedFolderHeight(foldable, elem));
          }
          foldable.set("shouldFixHeight", true);
          forceReflow(elem);
        });
        foldable.emitter.on("change", () => {
          applyHeight(foldable, elem);
        });
        applyHeight(foldable, elem);
        elem.addEventListener("transitionend", (ev) => {
          if (ev.propertyName !== "height") {
            return;
          }
          foldable.set("shouldFixHeight", false);
          foldable.set("expandedHeight", null);
          foldable.set("completed", true);
        });
      }
      __name(bindFoldable, "bindFoldable");
      class RackLikeApi extends BladeApi {
        constructor(controller, rackApi) {
          super(controller);
          this.rackApi_ = rackApi;
        }
      }
      __name(RackLikeApi, "RackLikeApi");
      function addButtonAsBlade(api, params) {
        return api.addBlade(Object.assign(Object.assign({}, params), { view: "button" }));
      }
      __name(addButtonAsBlade, "addButtonAsBlade");
      function addFolderAsBlade(api, params) {
        return api.addBlade(Object.assign(Object.assign({}, params), { view: "folder" }));
      }
      __name(addFolderAsBlade, "addFolderAsBlade");
      function addSeparatorAsBlade(api, opt_params) {
        const params = opt_params || {};
        return api.addBlade(Object.assign(Object.assign({}, params), { view: "separator" }));
      }
      __name(addSeparatorAsBlade, "addSeparatorAsBlade");
      function addTabAsBlade(api, params) {
        return api.addBlade(Object.assign(Object.assign({}, params), { view: "tab" }));
      }
      __name(addTabAsBlade, "addTabAsBlade");
      class NestedOrderedSet {
        constructor(extract) {
          this.emitter = new Emitter();
          this.items_ = [];
          this.cache_ = new Set();
          this.onSubListAdd_ = this.onSubListAdd_.bind(this);
          this.onSubListRemove_ = this.onSubListRemove_.bind(this);
          this.extract_ = extract;
        }
        get items() {
          return this.items_;
        }
        allItems() {
          return Array.from(this.cache_);
        }
        find(callback) {
          for (const item of this.allItems()) {
            if (callback(item)) {
              return item;
            }
          }
          return null;
        }
        includes(item) {
          return this.cache_.has(item);
        }
        add(item, opt_index) {
          if (this.includes(item)) {
            throw TpError.shouldNeverHappen();
          }
          const index = opt_index !== void 0 ? opt_index : this.items_.length;
          this.items_.splice(index, 0, item);
          this.cache_.add(item);
          const subList = this.extract_(item);
          if (subList) {
            subList.emitter.on("add", this.onSubListAdd_);
            subList.emitter.on("remove", this.onSubListRemove_);
            subList.allItems().forEach((item2) => {
              this.cache_.add(item2);
            });
          }
          this.emitter.emit("add", {
            index,
            item,
            root: this,
            target: this
          });
        }
        remove(item) {
          const index = this.items_.indexOf(item);
          if (index < 0) {
            return;
          }
          this.items_.splice(index, 1);
          this.cache_.delete(item);
          const subList = this.extract_(item);
          if (subList) {
            subList.emitter.off("add", this.onSubListAdd_);
            subList.emitter.off("remove", this.onSubListRemove_);
          }
          this.emitter.emit("remove", {
            index,
            item,
            root: this,
            target: this
          });
        }
        onSubListAdd_(ev) {
          this.cache_.add(ev.item);
          this.emitter.emit("add", {
            index: ev.index,
            item: ev.item,
            root: this,
            target: ev.target
          });
        }
        onSubListRemove_(ev) {
          this.cache_.delete(ev.item);
          this.emitter.emit("remove", {
            index: ev.index,
            item: ev.item,
            root: this,
            target: ev.target
          });
        }
      }
      __name(NestedOrderedSet, "NestedOrderedSet");
      class InputBindingApi extends BladeApi {
        constructor(controller) {
          super(controller);
          this.onBindingChange_ = this.onBindingChange_.bind(this);
          this.emitter_ = new Emitter();
          this.controller_.binding.emitter.on("change", this.onBindingChange_);
        }
        get label() {
          return this.controller_.props.get("label");
        }
        set label(label) {
          this.controller_.props.set("label", label);
        }
        on(eventName, handler) {
          const bh = handler.bind(this);
          this.emitter_.on(eventName, (ev) => {
            bh(ev.event);
          });
          return this;
        }
        refresh() {
          this.controller_.binding.read();
        }
        onBindingChange_(ev) {
          const value = ev.sender.target.read();
          this.emitter_.emit("change", {
            event: new TpChangeEvent(this, forceCast(value), this.controller_.binding.target.presetKey, ev.options.last)
          });
        }
      }
      __name(InputBindingApi, "InputBindingApi");
      class InputBindingController extends LabelController {
        constructor(doc, config) {
          super(doc, config);
          this.binding = config.binding;
        }
      }
      __name(InputBindingController, "InputBindingController");
      class MonitorBindingApi extends BladeApi {
        constructor(controller) {
          super(controller);
          this.onBindingUpdate_ = this.onBindingUpdate_.bind(this);
          this.emitter_ = new Emitter();
          this.controller_.binding.emitter.on("update", this.onBindingUpdate_);
        }
        get label() {
          return this.controller_.props.get("label");
        }
        set label(label) {
          this.controller_.props.set("label", label);
        }
        on(eventName, handler) {
          const bh = handler.bind(this);
          this.emitter_.on(eventName, (ev) => {
            bh(ev.event);
          });
          return this;
        }
        refresh() {
          this.controller_.binding.read();
        }
        onBindingUpdate_(ev) {
          const value = ev.sender.target.read();
          this.emitter_.emit("update", {
            event: new TpUpdateEvent(this, forceCast(value), this.controller_.binding.target.presetKey)
          });
        }
      }
      __name(MonitorBindingApi, "MonitorBindingApi");
      class MonitorBindingController extends LabelController {
        constructor(doc, config) {
          super(doc, config);
          this.binding = config.binding;
          this.viewProps.bindDisabled(this.binding.ticker);
          this.viewProps.handleDispose(() => {
            this.binding.dispose();
          });
        }
      }
      __name(MonitorBindingController, "MonitorBindingController");
      function findSubBladeApiSet(api) {
        if (api instanceof RackApi) {
          return api["apiSet_"];
        }
        if (api instanceof RackLikeApi) {
          return api["rackApi_"]["apiSet_"];
        }
        return null;
      }
      __name(findSubBladeApiSet, "findSubBladeApiSet");
      function getApiByController(apiSet, controller) {
        const api = apiSet.find((api2) => api2.controller_ === controller);
        if (!api) {
          throw TpError.shouldNeverHappen();
        }
        return api;
      }
      __name(getApiByController, "getApiByController");
      function createBindingTarget(obj, key, opt_id) {
        if (!BindingTarget.isBindable(obj)) {
          throw TpError.notBindable();
        }
        return new BindingTarget(obj, key, opt_id);
      }
      __name(createBindingTarget, "createBindingTarget");
      class RackApi extends BladeApi {
        constructor(controller, pool) {
          super(controller);
          this.onRackAdd_ = this.onRackAdd_.bind(this);
          this.onRackRemove_ = this.onRackRemove_.bind(this);
          this.onRackInputChange_ = this.onRackInputChange_.bind(this);
          this.onRackMonitorUpdate_ = this.onRackMonitorUpdate_.bind(this);
          this.emitter_ = new Emitter();
          this.apiSet_ = new NestedOrderedSet(findSubBladeApiSet);
          this.pool_ = pool;
          const rack = this.controller_.rack;
          rack.emitter.on("add", this.onRackAdd_);
          rack.emitter.on("remove", this.onRackRemove_);
          rack.emitter.on("inputchange", this.onRackInputChange_);
          rack.emitter.on("monitorupdate", this.onRackMonitorUpdate_);
          rack.children.forEach((bc) => {
            this.setUpApi_(bc);
          });
        }
        get children() {
          return this.controller_.rack.children.map((bc) => getApiByController(this.apiSet_, bc));
        }
        addInput(object, key, opt_params) {
          const params = opt_params || {};
          const doc = this.controller_.view.element.ownerDocument;
          const bc = this.pool_.createInput(doc, createBindingTarget(object, key, params.presetKey), params);
          const api = new InputBindingApi(bc);
          return this.add(api, params.index);
        }
        addMonitor(object, key, opt_params) {
          const params = opt_params || {};
          const doc = this.controller_.view.element.ownerDocument;
          const bc = this.pool_.createMonitor(doc, createBindingTarget(object, key), params);
          const api = new MonitorBindingApi(bc);
          return forceCast(this.add(api, params.index));
        }
        addFolder(params) {
          return addFolderAsBlade(this, params);
        }
        addButton(params) {
          return addButtonAsBlade(this, params);
        }
        addSeparator(opt_params) {
          return addSeparatorAsBlade(this, opt_params);
        }
        addTab(params) {
          return addTabAsBlade(this, params);
        }
        add(api, opt_index) {
          this.controller_.rack.add(api.controller_, opt_index);
          const gapi = this.apiSet_.find((a) => a.controller_ === api.controller_);
          if (gapi) {
            this.apiSet_.remove(gapi);
          }
          this.apiSet_.add(api);
          return api;
        }
        remove(api) {
          this.controller_.rack.remove(api.controller_);
        }
        addBlade(params) {
          const doc = this.controller_.view.element.ownerDocument;
          const bc = this.pool_.createBlade(doc, params);
          const api = this.pool_.createBladeApi(bc);
          return this.add(api, params.index);
        }
        on(eventName, handler) {
          const bh = handler.bind(this);
          this.emitter_.on(eventName, (ev) => {
            bh(ev.event);
          });
          return this;
        }
        setUpApi_(bc) {
          const api = this.apiSet_.find((api2) => api2.controller_ === bc);
          if (!api) {
            this.apiSet_.add(this.pool_.createBladeApi(bc));
          }
        }
        onRackAdd_(ev) {
          this.setUpApi_(ev.bladeController);
        }
        onRackRemove_(ev) {
          if (ev.isRoot) {
            const api = getApiByController(this.apiSet_, ev.bladeController);
            this.apiSet_.remove(api);
          }
        }
        onRackInputChange_(ev) {
          const bc = ev.bladeController;
          if (bc instanceof InputBindingController) {
            const api = getApiByController(this.apiSet_, bc);
            const binding = bc.binding;
            this.emitter_.emit("change", {
              event: new TpChangeEvent(api, forceCast(binding.target.read()), binding.target.presetKey, ev.options.last)
            });
          } else if (bc instanceof ValueBladeController) {
            const api = getApiByController(this.apiSet_, bc);
            this.emitter_.emit("change", {
              event: new TpChangeEvent(api, bc.value.rawValue, void 0, ev.options.last)
            });
          }
        }
        onRackMonitorUpdate_(ev) {
          if (!(ev.bladeController instanceof MonitorBindingController)) {
            throw TpError.shouldNeverHappen();
          }
          const api = getApiByController(this.apiSet_, ev.bladeController);
          const binding = ev.bladeController.binding;
          this.emitter_.emit("update", {
            event: new TpUpdateEvent(api, forceCast(binding.target.read()), binding.target.presetKey)
          });
        }
      }
      __name(RackApi, "RackApi");
      class FolderApi extends RackLikeApi {
        constructor(controller, pool) {
          super(controller, new RackApi(controller.rackController, pool));
          this.emitter_ = new Emitter();
          this.controller_.foldable.value("expanded").emitter.on("change", (ev) => {
            this.emitter_.emit("fold", {
              event: new TpFoldEvent(this, ev.sender.rawValue)
            });
          });
          this.rackApi_.on("change", (ev) => {
            this.emitter_.emit("change", {
              event: ev
            });
          });
          this.rackApi_.on("update", (ev) => {
            this.emitter_.emit("update", {
              event: ev
            });
          });
        }
        get expanded() {
          return this.controller_.foldable.get("expanded");
        }
        set expanded(expanded) {
          this.controller_.foldable.set("expanded", expanded);
        }
        get title() {
          return this.controller_.props.get("title");
        }
        set title(title) {
          this.controller_.props.set("title", title);
        }
        get children() {
          return this.rackApi_.children;
        }
        addInput(object, key, opt_params) {
          return this.rackApi_.addInput(object, key, opt_params);
        }
        addMonitor(object, key, opt_params) {
          return this.rackApi_.addMonitor(object, key, opt_params);
        }
        addFolder(params) {
          return this.rackApi_.addFolder(params);
        }
        addButton(params) {
          return this.rackApi_.addButton(params);
        }
        addSeparator(opt_params) {
          return this.rackApi_.addSeparator(opt_params);
        }
        addTab(params) {
          return this.rackApi_.addTab(params);
        }
        add(api, opt_index) {
          return this.rackApi_.add(api, opt_index);
        }
        remove(api) {
          this.rackApi_.remove(api);
        }
        addBlade(params) {
          return this.rackApi_.addBlade(params);
        }
        on(eventName, handler) {
          const bh = handler.bind(this);
          this.emitter_.on(eventName, (ev) => {
            bh(ev.event);
          });
          return this;
        }
      }
      __name(FolderApi, "FolderApi");
      class RackLikeController extends BladeController {
        constructor(config) {
          super({
            blade: config.blade,
            view: config.view,
            viewProps: config.rackController.viewProps
          });
          this.rackController = config.rackController;
        }
      }
      __name(RackLikeController, "RackLikeController");
      class PlainView {
        constructor(doc, config) {
          const className2 = ClassName(config.viewName);
          this.element = doc.createElement("div");
          this.element.classList.add(className2());
          config.viewProps.bindClassModifiers(this.element);
        }
      }
      __name(PlainView, "PlainView");
      function findInputBindingController(bcs, b) {
        for (let i = 0; i < bcs.length; i++) {
          const bc = bcs[i];
          if (bc instanceof InputBindingController && bc.binding === b) {
            return bc;
          }
        }
        return null;
      }
      __name(findInputBindingController, "findInputBindingController");
      function findMonitorBindingController(bcs, b) {
        for (let i = 0; i < bcs.length; i++) {
          const bc = bcs[i];
          if (bc instanceof MonitorBindingController && bc.binding === b) {
            return bc;
          }
        }
        return null;
      }
      __name(findMonitorBindingController, "findMonitorBindingController");
      function findValueBladeController(bcs, v) {
        for (let i = 0; i < bcs.length; i++) {
          const bc = bcs[i];
          if (bc instanceof ValueBladeController && bc.value === v) {
            return bc;
          }
        }
        return null;
      }
      __name(findValueBladeController, "findValueBladeController");
      function findSubRack(bc) {
        if (bc instanceof RackController) {
          return bc.rack;
        }
        if (bc instanceof RackLikeController) {
          return bc.rackController.rack;
        }
        return null;
      }
      __name(findSubRack, "findSubRack");
      function findSubBladeControllerSet(bc) {
        const rack = findSubRack(bc);
        return rack ? rack["bcSet_"] : null;
      }
      __name(findSubBladeControllerSet, "findSubBladeControllerSet");
      class BladeRack {
        constructor(blade) {
          var _a;
          this.onBladePositionsChange_ = this.onBladePositionsChange_.bind(this);
          this.onSetAdd_ = this.onSetAdd_.bind(this);
          this.onSetRemove_ = this.onSetRemove_.bind(this);
          this.onChildDispose_ = this.onChildDispose_.bind(this);
          this.onChildPositionsChange_ = this.onChildPositionsChange_.bind(this);
          this.onChildInputChange_ = this.onChildInputChange_.bind(this);
          this.onChildMonitorUpdate_ = this.onChildMonitorUpdate_.bind(this);
          this.onChildValueChange_ = this.onChildValueChange_.bind(this);
          this.onChildViewPropsChange_ = this.onChildViewPropsChange_.bind(this);
          this.onDescendantLayout_ = this.onDescendantLayout_.bind(this);
          this.onDescendantInputChange_ = this.onDescendantInputChange_.bind(this);
          this.onDescendantMonitorUpdate_ = this.onDescendantMonitorUpdate_.bind(this);
          this.emitter = new Emitter();
          this.blade_ = blade !== null && blade !== void 0 ? blade : null;
          (_a = this.blade_) === null || _a === void 0 ? void 0 : _a.value("positions").emitter.on("change", this.onBladePositionsChange_);
          this.bcSet_ = new NestedOrderedSet(findSubBladeControllerSet);
          this.bcSet_.emitter.on("add", this.onSetAdd_);
          this.bcSet_.emitter.on("remove", this.onSetRemove_);
        }
        get children() {
          return this.bcSet_.items;
        }
        add(bc, opt_index) {
          if (bc.parent) {
            bc.parent.remove(bc);
          }
          bc["parent_"] = this;
          this.bcSet_.add(bc, opt_index);
        }
        remove(bc) {
          bc["parent_"] = null;
          this.bcSet_.remove(bc);
        }
        find(controllerClass) {
          return forceCast(this.bcSet_.allItems().filter((bc) => {
            return bc instanceof controllerClass;
          }));
        }
        onSetAdd_(ev) {
          this.updatePositions_();
          const isRoot = ev.target === ev.root;
          this.emitter.emit("add", {
            bladeController: ev.item,
            index: ev.index,
            isRoot,
            sender: this
          });
          if (!isRoot) {
            return;
          }
          const bc = ev.item;
          bc.viewProps.emitter.on("change", this.onChildViewPropsChange_);
          bc.blade.value("positions").emitter.on("change", this.onChildPositionsChange_);
          bc.viewProps.handleDispose(this.onChildDispose_);
          if (bc instanceof InputBindingController) {
            bc.binding.emitter.on("change", this.onChildInputChange_);
          } else if (bc instanceof MonitorBindingController) {
            bc.binding.emitter.on("update", this.onChildMonitorUpdate_);
          } else if (bc instanceof ValueBladeController) {
            bc.value.emitter.on("change", this.onChildValueChange_);
          } else {
            const rack = findSubRack(bc);
            if (rack) {
              const emitter = rack.emitter;
              emitter.on("layout", this.onDescendantLayout_);
              emitter.on("inputchange", this.onDescendantInputChange_);
              emitter.on("monitorupdate", this.onDescendantMonitorUpdate_);
            }
          }
        }
        onSetRemove_(ev) {
          this.updatePositions_();
          const isRoot = ev.target === ev.root;
          this.emitter.emit("remove", {
            bladeController: ev.item,
            isRoot,
            sender: this
          });
          if (!isRoot) {
            return;
          }
          const bc = ev.item;
          if (bc instanceof InputBindingController) {
            bc.binding.emitter.off("change", this.onChildInputChange_);
          } else if (bc instanceof MonitorBindingController) {
            bc.binding.emitter.off("update", this.onChildMonitorUpdate_);
          } else if (bc instanceof ValueBladeController) {
            bc.value.emitter.off("change", this.onChildValueChange_);
          } else {
            const rack = findSubRack(bc);
            if (rack) {
              const emitter = rack.emitter;
              emitter.off("layout", this.onDescendantLayout_);
              emitter.off("inputchange", this.onDescendantInputChange_);
              emitter.off("monitorupdate", this.onDescendantMonitorUpdate_);
            }
          }
        }
        updatePositions_() {
          const visibleItems = this.bcSet_.items.filter((bc) => !bc.viewProps.get("hidden"));
          const firstVisibleItem = visibleItems[0];
          const lastVisibleItem = visibleItems[visibleItems.length - 1];
          this.bcSet_.items.forEach((bc) => {
            const ps = [];
            if (bc === firstVisibleItem) {
              ps.push("first");
              if (!this.blade_ || this.blade_.get("positions").includes("veryfirst")) {
                ps.push("veryfirst");
              }
            }
            if (bc === lastVisibleItem) {
              ps.push("last");
              if (!this.blade_ || this.blade_.get("positions").includes("verylast")) {
                ps.push("verylast");
              }
            }
            bc.blade.set("positions", ps);
          });
        }
        onChildPositionsChange_() {
          this.updatePositions_();
          this.emitter.emit("layout", {
            sender: this
          });
        }
        onChildViewPropsChange_(_ev) {
          this.updatePositions_();
          this.emitter.emit("layout", {
            sender: this
          });
        }
        onChildDispose_() {
          const disposedUcs = this.bcSet_.items.filter((bc) => {
            return bc.viewProps.get("disposed");
          });
          disposedUcs.forEach((bc) => {
            this.bcSet_.remove(bc);
          });
        }
        onChildInputChange_(ev) {
          const bc = findInputBindingController(this.find(InputBindingController), ev.sender);
          if (!bc) {
            throw TpError.shouldNeverHappen();
          }
          this.emitter.emit("inputchange", {
            bladeController: bc,
            options: ev.options,
            sender: this
          });
        }
        onChildMonitorUpdate_(ev) {
          const bc = findMonitorBindingController(this.find(MonitorBindingController), ev.sender);
          if (!bc) {
            throw TpError.shouldNeverHappen();
          }
          this.emitter.emit("monitorupdate", {
            bladeController: bc,
            sender: this
          });
        }
        onChildValueChange_(ev) {
          const bc = findValueBladeController(this.find(ValueBladeController), ev.sender);
          if (!bc) {
            throw TpError.shouldNeverHappen();
          }
          this.emitter.emit("inputchange", {
            bladeController: bc,
            options: ev.options,
            sender: this
          });
        }
        onDescendantLayout_(_) {
          this.updatePositions_();
          this.emitter.emit("layout", {
            sender: this
          });
        }
        onDescendantInputChange_(ev) {
          this.emitter.emit("inputchange", {
            bladeController: ev.bladeController,
            options: ev.options,
            sender: this
          });
        }
        onDescendantMonitorUpdate_(ev) {
          this.emitter.emit("monitorupdate", {
            bladeController: ev.bladeController,
            sender: this
          });
        }
        onBladePositionsChange_() {
          this.updatePositions_();
        }
      }
      __name(BladeRack, "BladeRack");
      class RackController extends BladeController {
        constructor(doc, config) {
          super(Object.assign(Object.assign({}, config), { view: new PlainView(doc, {
            viewName: "brk",
            viewProps: config.viewProps
          }) }));
          this.onRackAdd_ = this.onRackAdd_.bind(this);
          this.onRackRemove_ = this.onRackRemove_.bind(this);
          const rack = new BladeRack(config.root ? void 0 : config.blade);
          rack.emitter.on("add", this.onRackAdd_);
          rack.emitter.on("remove", this.onRackRemove_);
          this.rack = rack;
          this.viewProps.handleDispose(() => {
            for (let i = this.rack.children.length - 1; i >= 0; i--) {
              const bc = this.rack.children[i];
              bc.viewProps.set("disposed", true);
            }
          });
        }
        onRackAdd_(ev) {
          if (!ev.isRoot) {
            return;
          }
          insertElementAt(this.view.element, ev.bladeController.view.element, ev.index);
        }
        onRackRemove_(ev) {
          if (!ev.isRoot) {
            return;
          }
          removeElement(ev.bladeController.view.element);
        }
      }
      __name(RackController, "RackController");
      const bladeContainerClassName = ClassName("cnt");
      class FolderView {
        constructor(doc, config) {
          this.className_ = ClassName(config.viewName || "fld");
          this.element = doc.createElement("div");
          this.element.classList.add(this.className_(), bladeContainerClassName());
          config.viewProps.bindClassModifiers(this.element);
          this.foldable_ = config.foldable;
          this.foldable_.bindExpandedClass(this.element, this.className_(void 0, "expanded"));
          bindValueMap(this.foldable_, "completed", valueToClassName(this.element, this.className_(void 0, "cpl")));
          const buttonElem = doc.createElement("button");
          buttonElem.classList.add(this.className_("b"));
          bindValueMap(config.props, "title", (title) => {
            if (isEmpty(title)) {
              this.element.classList.add(this.className_(void 0, "not"));
            } else {
              this.element.classList.remove(this.className_(void 0, "not"));
            }
          });
          config.viewProps.bindDisabled(buttonElem);
          this.element.appendChild(buttonElem);
          this.buttonElement = buttonElem;
          const titleElem = doc.createElement("div");
          titleElem.classList.add(this.className_("t"));
          bindValueToTextContent(config.props.value("title"), titleElem);
          this.buttonElement.appendChild(titleElem);
          this.titleElement = titleElem;
          const markElem = doc.createElement("div");
          markElem.classList.add(this.className_("m"));
          this.buttonElement.appendChild(markElem);
          const containerElem = config.containerElement;
          containerElem.classList.add(this.className_("c"));
          this.element.appendChild(containerElem);
          this.containerElement = containerElem;
        }
      }
      __name(FolderView, "FolderView");
      class FolderController extends RackLikeController {
        constructor(doc, config) {
          var _a;
          const foldable = Foldable.create((_a = config.expanded) !== null && _a !== void 0 ? _a : true);
          const rc = new RackController(doc, {
            blade: config.blade,
            root: config.root,
            viewProps: config.viewProps
          });
          super(Object.assign(Object.assign({}, config), { rackController: rc, view: new FolderView(doc, {
            containerElement: rc.view.element,
            foldable,
            props: config.props,
            viewName: config.root ? "rot" : void 0,
            viewProps: config.viewProps
          }) }));
          this.onTitleClick_ = this.onTitleClick_.bind(this);
          this.props = config.props;
          this.foldable = foldable;
          bindFoldable(this.foldable, this.view.containerElement);
          this.view.buttonElement.addEventListener("click", this.onTitleClick_);
        }
        get document() {
          return this.view.element.ownerDocument;
        }
        onTitleClick_() {
          this.foldable.set("expanded", !this.foldable.get("expanded"));
        }
      }
      __name(FolderController, "FolderController");
      const FolderBladePlugin = {
        id: "folder",
        type: "blade",
        accept(params) {
          const p = ParamsParsers;
          const result = parseParams(params, {
            title: p.required.string,
            view: p.required.constant("folder"),
            expanded: p.optional.boolean
          });
          return result ? { params: result } : null;
        },
        controller(args) {
          return new FolderController(args.document, {
            blade: args.blade,
            expanded: args.params.expanded,
            props: ValueMap.fromObject({
              title: args.params.title
            }),
            viewProps: args.viewProps
          });
        },
        api(args) {
          if (!(args.controller instanceof FolderController)) {
            return null;
          }
          return new FolderApi(args.controller, args.pool);
        }
      };
      class LabeledValueController extends ValueBladeController {
        constructor(doc, config) {
          const viewProps = config.valueController.viewProps;
          super(Object.assign(Object.assign({}, config), { value: config.valueController.value, view: new LabelView(doc, {
            props: config.props,
            viewProps
          }), viewProps }));
          this.props = config.props;
          this.valueController = config.valueController;
          this.view.valueElement.appendChild(this.valueController.view.element);
        }
      }
      __name(LabeledValueController, "LabeledValueController");
      class SeparatorApi extends BladeApi {
      }
      __name(SeparatorApi, "SeparatorApi");
      const className$n = ClassName("spr");
      class SeparatorView {
        constructor(doc, config) {
          this.element = doc.createElement("div");
          this.element.classList.add(className$n());
          config.viewProps.bindClassModifiers(this.element);
          const hrElem = doc.createElement("hr");
          hrElem.classList.add(className$n("r"));
          this.element.appendChild(hrElem);
        }
      }
      __name(SeparatorView, "SeparatorView");
      class SeparatorController extends BladeController {
        constructor(doc, config) {
          super(Object.assign(Object.assign({}, config), { view: new SeparatorView(doc, {
            viewProps: config.viewProps
          }) }));
        }
      }
      __name(SeparatorController, "SeparatorController");
      const SeparatorBladePlugin = {
        id: "separator",
        type: "blade",
        accept(params) {
          const p = ParamsParsers;
          const result = parseParams(params, {
            view: p.required.constant("separator")
          });
          return result ? { params: result } : null;
        },
        controller(args) {
          return new SeparatorController(args.document, {
            blade: args.blade,
            viewProps: args.viewProps
          });
        },
        api(args) {
          if (!(args.controller instanceof SeparatorController)) {
            return null;
          }
          return new SeparatorApi(args.controller);
        }
      };
      const className$m = ClassName("");
      function valueToModifier(elem, modifier) {
        return valueToClassName(elem, className$m(void 0, modifier));
      }
      __name(valueToModifier, "valueToModifier");
      class ViewProps extends ValueMap {
        constructor(valueMap) {
          super(valueMap);
        }
        static create(opt_initialValue) {
          var _a, _b;
          const initialValue = opt_initialValue !== null && opt_initialValue !== void 0 ? opt_initialValue : {};
          const coreObj = {
            disabled: (_a = initialValue.disabled) !== null && _a !== void 0 ? _a : false,
            disposed: false,
            hidden: (_b = initialValue.hidden) !== null && _b !== void 0 ? _b : false
          };
          const core = ValueMap.createCore(coreObj);
          return new ViewProps(core);
        }
        bindClassModifiers(elem) {
          bindValueMap(this, "disabled", valueToModifier(elem, "disabled"));
          bindValueMap(this, "hidden", valueToModifier(elem, "hidden"));
        }
        bindDisabled(target) {
          bindValueMap(this, "disabled", (disabled) => {
            target.disabled = disabled;
          });
        }
        bindTabIndex(elem) {
          bindValueMap(this, "disabled", (disabled) => {
            elem.tabIndex = disabled ? -1 : 0;
          });
        }
        handleDispose(callback) {
          this.value("disposed").emitter.on("change", (disposed) => {
            if (disposed) {
              callback();
            }
          });
        }
      }
      __name(ViewProps, "ViewProps");
      const className$l = ClassName("tbi");
      class TabItemView {
        constructor(doc, config) {
          this.element = doc.createElement("div");
          this.element.classList.add(className$l());
          config.viewProps.bindClassModifiers(this.element);
          bindValueMap(config.props, "selected", (selected) => {
            if (selected) {
              this.element.classList.add(className$l(void 0, "sel"));
            } else {
              this.element.classList.remove(className$l(void 0, "sel"));
            }
          });
          const buttonElem = doc.createElement("button");
          buttonElem.classList.add(className$l("b"));
          config.viewProps.bindDisabled(buttonElem);
          this.element.appendChild(buttonElem);
          this.buttonElement = buttonElem;
          const titleElem = doc.createElement("div");
          titleElem.classList.add(className$l("t"));
          bindValueToTextContent(config.props.value("title"), titleElem);
          this.buttonElement.appendChild(titleElem);
          this.titleElement = titleElem;
        }
      }
      __name(TabItemView, "TabItemView");
      class TabItemController {
        constructor(doc, config) {
          this.emitter = new Emitter();
          this.onClick_ = this.onClick_.bind(this);
          this.props = config.props;
          this.viewProps = config.viewProps;
          this.view = new TabItemView(doc, {
            props: config.props,
            viewProps: config.viewProps
          });
          this.view.buttonElement.addEventListener("click", this.onClick_);
        }
        onClick_() {
          this.emitter.emit("click", {
            sender: this
          });
        }
      }
      __name(TabItemController, "TabItemController");
      class TabPageController {
        constructor(doc, config) {
          this.onItemClick_ = this.onItemClick_.bind(this);
          this.ic_ = new TabItemController(doc, {
            props: config.itemProps,
            viewProps: ViewProps.create()
          });
          this.ic_.emitter.on("click", this.onItemClick_);
          this.cc_ = new RackController(doc, {
            blade: createBlade(),
            viewProps: ViewProps.create()
          });
          this.props = config.props;
          bindValueMap(this.props, "selected", (selected) => {
            this.itemController.props.set("selected", selected);
            this.contentController.viewProps.set("hidden", !selected);
          });
        }
        get itemController() {
          return this.ic_;
        }
        get contentController() {
          return this.cc_;
        }
        onItemClick_() {
          this.props.set("selected", true);
        }
      }
      __name(TabPageController, "TabPageController");
      class TabPageApi {
        constructor(controller, contentRackApi) {
          this.controller_ = controller;
          this.rackApi_ = contentRackApi;
        }
        get title() {
          var _a;
          return (_a = this.controller_.itemController.props.get("title")) !== null && _a !== void 0 ? _a : "";
        }
        set title(title) {
          this.controller_.itemController.props.set("title", title);
        }
        get selected() {
          return this.controller_.props.get("selected");
        }
        set selected(selected) {
          this.controller_.props.set("selected", selected);
        }
        get children() {
          return this.rackApi_.children;
        }
        addButton(params) {
          return this.rackApi_.addButton(params);
        }
        addFolder(params) {
          return this.rackApi_.addFolder(params);
        }
        addSeparator(opt_params) {
          return this.rackApi_.addSeparator(opt_params);
        }
        addTab(params) {
          return this.rackApi_.addTab(params);
        }
        add(api, opt_index) {
          this.rackApi_.add(api, opt_index);
        }
        remove(api) {
          this.rackApi_.remove(api);
        }
        addInput(object, key, opt_params) {
          return this.rackApi_.addInput(object, key, opt_params);
        }
        addMonitor(object, key, opt_params) {
          return this.rackApi_.addMonitor(object, key, opt_params);
        }
        addBlade(params) {
          return this.rackApi_.addBlade(params);
        }
      }
      __name(TabPageApi, "TabPageApi");
      class TabApi extends RackLikeApi {
        constructor(controller, pool) {
          super(controller, new RackApi(controller.rackController, pool));
          this.onPageAdd_ = this.onPageAdd_.bind(this);
          this.onPageRemove_ = this.onPageRemove_.bind(this);
          this.emitter_ = new Emitter();
          this.pageApiMap_ = new Map();
          this.rackApi_.on("change", (ev) => {
            this.emitter_.emit("change", {
              event: ev
            });
          });
          this.rackApi_.on("update", (ev) => {
            this.emitter_.emit("update", {
              event: ev
            });
          });
          this.controller_.pageSet.emitter.on("add", this.onPageAdd_);
          this.controller_.pageSet.emitter.on("remove", this.onPageRemove_);
          this.controller_.pageSet.items.forEach((pc) => {
            this.setUpPageApi_(pc);
          });
        }
        get pages() {
          return this.controller_.pageSet.items.map((pc) => {
            const api = this.pageApiMap_.get(pc);
            if (!api) {
              throw TpError.shouldNeverHappen();
            }
            return api;
          });
        }
        addPage(params) {
          const doc = this.controller_.view.element.ownerDocument;
          const pc = new TabPageController(doc, {
            itemProps: ValueMap.fromObject({
              selected: false,
              title: params.title
            }),
            props: ValueMap.fromObject({
              selected: false
            })
          });
          this.controller_.add(pc, params.index);
          const api = this.pageApiMap_.get(pc);
          if (!api) {
            throw TpError.shouldNeverHappen();
          }
          return api;
        }
        removePage(index) {
          this.controller_.remove(index);
        }
        on(eventName, handler) {
          const bh = handler.bind(this);
          this.emitter_.on(eventName, (ev) => {
            bh(ev.event);
          });
          return this;
        }
        setUpPageApi_(pc) {
          const rackApi = this.rackApi_["apiSet_"].find((api2) => api2.controller_ === pc.contentController);
          if (!rackApi) {
            throw TpError.shouldNeverHappen();
          }
          const api = new TabPageApi(pc, rackApi);
          this.pageApiMap_.set(pc, api);
        }
        onPageAdd_(ev) {
          this.setUpPageApi_(ev.item);
        }
        onPageRemove_(ev) {
          const api = this.pageApiMap_.get(ev.item);
          if (!api) {
            throw TpError.shouldNeverHappen();
          }
          this.pageApiMap_.delete(ev.item);
        }
      }
      __name(TabApi, "TabApi");
      const className$k = ClassName("tab");
      class TabView {
        constructor(doc, config) {
          this.element = doc.createElement("div");
          this.element.classList.add(className$k(), bladeContainerClassName());
          config.viewProps.bindClassModifiers(this.element);
          bindValue(config.empty, valueToClassName(this.element, className$k(void 0, "nop")));
          const itemsElem = doc.createElement("div");
          itemsElem.classList.add(className$k("i"));
          this.element.appendChild(itemsElem);
          this.itemsElement = itemsElem;
          const contentsElem = config.contentsElement;
          contentsElem.classList.add(className$k("c"));
          this.element.appendChild(contentsElem);
          this.contentsElement = contentsElem;
        }
      }
      __name(TabView, "TabView");
      class TabController extends RackLikeController {
        constructor(doc, config) {
          const cr = new RackController(doc, {
            blade: config.blade,
            viewProps: config.viewProps
          });
          const empty = createValue(true);
          super({
            blade: config.blade,
            rackController: cr,
            view: new TabView(doc, {
              contentsElement: cr.view.element,
              empty,
              viewProps: config.viewProps
            })
          });
          this.onPageAdd_ = this.onPageAdd_.bind(this);
          this.onPageRemove_ = this.onPageRemove_.bind(this);
          this.onPageSelectedChange_ = this.onPageSelectedChange_.bind(this);
          this.pageSet_ = new NestedOrderedSet(() => null);
          this.pageSet_.emitter.on("add", this.onPageAdd_);
          this.pageSet_.emitter.on("remove", this.onPageRemove_);
          this.empty_ = empty;
          this.applyPages_();
        }
        get pageSet() {
          return this.pageSet_;
        }
        add(pc, opt_index) {
          this.pageSet_.add(pc, opt_index !== null && opt_index !== void 0 ? opt_index : this.pageSet_.items.length);
        }
        remove(index) {
          this.pageSet_.remove(this.pageSet_.items[index]);
        }
        applyPages_() {
          this.keepSelection_();
          this.empty_.rawValue = this.pageSet_.items.length === 0;
        }
        onPageAdd_(ev) {
          const pc = ev.item;
          insertElementAt(this.view.itemsElement, pc.itemController.view.element, ev.index);
          this.rackController.rack.add(pc.contentController, ev.index);
          pc.props.value("selected").emitter.on("change", this.onPageSelectedChange_);
          this.applyPages_();
        }
        onPageRemove_(ev) {
          const pc = ev.item;
          removeElement(pc.itemController.view.element);
          this.rackController.rack.remove(pc.contentController);
          pc.props.value("selected").emitter.off("change", this.onPageSelectedChange_);
          this.applyPages_();
        }
        keepSelection_() {
          if (this.pageSet_.items.length === 0) {
            return;
          }
          const firstSelIndex = this.pageSet_.items.findIndex((pc) => pc.props.get("selected"));
          if (firstSelIndex < 0) {
            this.pageSet_.items.forEach((pc, i) => {
              pc.props.set("selected", i === 0);
            });
          } else {
            this.pageSet_.items.forEach((pc, i) => {
              pc.props.set("selected", i === firstSelIndex);
            });
          }
        }
        onPageSelectedChange_(ev) {
          if (ev.rawValue) {
            const index = this.pageSet_.items.findIndex((pc) => pc.props.value("selected") === ev.sender);
            this.pageSet_.items.forEach((pc, i) => {
              pc.props.set("selected", i === index);
            });
          } else {
            this.keepSelection_();
          }
        }
      }
      __name(TabController, "TabController");
      const TabBladePlugin = {
        id: "tab",
        type: "blade",
        accept(params) {
          const p = ParamsParsers;
          const result = parseParams(params, {
            pages: p.required.array(p.required.object({ title: p.required.string })),
            view: p.required.constant("tab")
          });
          if (!result || result.pages.length === 0) {
            return null;
          }
          return { params: result };
        },
        controller(args) {
          const c = new TabController(args.document, {
            blade: args.blade,
            viewProps: args.viewProps
          });
          args.params.pages.forEach((p) => {
            const pc = new TabPageController(args.document, {
              itemProps: ValueMap.fromObject({
                selected: false,
                title: p.title
              }),
              props: ValueMap.fromObject({
                selected: false
              })
            });
            c.add(pc);
          });
          return c;
        },
        api(args) {
          if (!(args.controller instanceof TabController)) {
            return null;
          }
          return new TabApi(args.controller, args.pool);
        }
      };
      function createBladeController(plugin, args) {
        const ac = plugin.accept(args.params);
        if (!ac) {
          return null;
        }
        const disabled = ParamsParsers.optional.boolean(args.params["disabled"]).value;
        const hidden = ParamsParsers.optional.boolean(args.params["hidden"]).value;
        return plugin.controller({
          blade: createBlade(),
          document: args.document,
          params: forceCast(Object.assign(Object.assign({}, ac.params), { disabled, hidden })),
          viewProps: ViewProps.create({
            disabled,
            hidden
          })
        });
      }
      __name(createBladeController, "createBladeController");
      class ManualTicker {
        constructor() {
          this.disabled = false;
          this.emitter = new Emitter();
        }
        dispose() {
        }
        tick() {
          if (this.disabled) {
            return;
          }
          this.emitter.emit("tick", {
            sender: this
          });
        }
      }
      __name(ManualTicker, "ManualTicker");
      class IntervalTicker {
        constructor(doc, interval) {
          this.disabled_ = false;
          this.timerId_ = null;
          this.onTick_ = this.onTick_.bind(this);
          this.doc_ = doc;
          this.emitter = new Emitter();
          this.interval_ = interval;
          this.setTimer_();
        }
        get disabled() {
          return this.disabled_;
        }
        set disabled(inactive) {
          this.disabled_ = inactive;
          if (this.disabled_) {
            this.clearTimer_();
          } else {
            this.setTimer_();
          }
        }
        dispose() {
          this.clearTimer_();
        }
        clearTimer_() {
          if (this.timerId_ === null) {
            return;
          }
          const win = this.doc_.defaultView;
          if (win) {
            win.clearInterval(this.timerId_);
          }
          this.timerId_ = null;
        }
        setTimer_() {
          this.clearTimer_();
          if (this.interval_ <= 0) {
            return;
          }
          const win = this.doc_.defaultView;
          if (win) {
            this.timerId_ = win.setInterval(this.onTick_, this.interval_);
          }
        }
        onTick_() {
          if (this.disabled_) {
            return;
          }
          this.emitter.emit("tick", {
            sender: this
          });
        }
      }
      __name(IntervalTicker, "IntervalTicker");
      class CompositeConstraint {
        constructor(constraints) {
          this.constraints = constraints;
        }
        constrain(value) {
          return this.constraints.reduce((result, c) => {
            return c.constrain(result);
          }, value);
        }
      }
      __name(CompositeConstraint, "CompositeConstraint");
      function findConstraint(c, constraintClass) {
        if (c instanceof constraintClass) {
          return c;
        }
        if (c instanceof CompositeConstraint) {
          const result = c.constraints.reduce((tmpResult, sc) => {
            if (tmpResult) {
              return tmpResult;
            }
            return sc instanceof constraintClass ? sc : null;
          }, null);
          if (result) {
            return result;
          }
        }
        return null;
      }
      __name(findConstraint, "findConstraint");
      class ListConstraint {
        constructor(options) {
          this.options = options;
        }
        constrain(value) {
          const opts = this.options;
          if (opts.length === 0) {
            return value;
          }
          const matched = opts.filter((item) => {
            return item.value === value;
          }).length > 0;
          return matched ? value : opts[0].value;
        }
      }
      __name(ListConstraint, "ListConstraint");
      class RangeConstraint {
        constructor(config) {
          this.maxValue = config.max;
          this.minValue = config.min;
        }
        constrain(value) {
          let result = value;
          if (!isEmpty(this.minValue)) {
            result = Math.max(result, this.minValue);
          }
          if (!isEmpty(this.maxValue)) {
            result = Math.min(result, this.maxValue);
          }
          return result;
        }
      }
      __name(RangeConstraint, "RangeConstraint");
      class StepConstraint {
        constructor(step) {
          this.step = step;
        }
        constrain(value) {
          const r = value < 0 ? -Math.round(-value / this.step) : Math.round(value / this.step);
          return r * this.step;
        }
      }
      __name(StepConstraint, "StepConstraint");
      const className$j = ClassName("lst");
      class ListView {
        constructor(doc, config) {
          this.onValueChange_ = this.onValueChange_.bind(this);
          this.props_ = config.props;
          this.element = doc.createElement("div");
          this.element.classList.add(className$j());
          config.viewProps.bindClassModifiers(this.element);
          const selectElem = doc.createElement("select");
          selectElem.classList.add(className$j("s"));
          bindValueMap(this.props_, "options", (opts) => {
            removeChildElements(selectElem);
            opts.forEach((item, index) => {
              const optionElem = doc.createElement("option");
              optionElem.dataset.index = String(index);
              optionElem.textContent = item.text;
              optionElem.value = String(item.value);
              selectElem.appendChild(optionElem);
            });
          });
          config.viewProps.bindDisabled(selectElem);
          this.element.appendChild(selectElem);
          this.selectElement = selectElem;
          const markElem = doc.createElement("div");
          markElem.classList.add(className$j("m"));
          markElem.appendChild(createSvgIconElement(doc, "dropdown"));
          this.element.appendChild(markElem);
          config.value.emitter.on("change", this.onValueChange_);
          this.value_ = config.value;
          this.update_();
        }
        update_() {
          this.selectElement.value = String(this.value_.rawValue);
        }
        onValueChange_() {
          this.update_();
        }
      }
      __name(ListView, "ListView");
      class ListController {
        constructor(doc, config) {
          this.onSelectChange_ = this.onSelectChange_.bind(this);
          this.props = config.props;
          this.value = config.value;
          this.viewProps = config.viewProps;
          this.view = new ListView(doc, {
            props: this.props,
            value: this.value,
            viewProps: this.viewProps
          });
          this.view.selectElement.addEventListener("change", this.onSelectChange_);
        }
        onSelectChange_(e) {
          const selectElem = forceCast(e.currentTarget);
          const optElem = selectElem.selectedOptions.item(0);
          if (!optElem) {
            return;
          }
          const itemIndex = Number(optElem.dataset.index);
          this.value.rawValue = this.props.get("options")[itemIndex].value;
        }
      }
      __name(ListController, "ListController");
      const className$i = ClassName("pop");
      class PopupView {
        constructor(doc, config) {
          this.element = doc.createElement("div");
          this.element.classList.add(className$i());
          config.viewProps.bindClassModifiers(this.element);
          bindValue(config.shows, valueToClassName(this.element, className$i(void 0, "v")));
        }
      }
      __name(PopupView, "PopupView");
      class PopupController {
        constructor(doc, config) {
          this.shows = createValue(false);
          this.viewProps = config.viewProps;
          this.view = new PopupView(doc, {
            shows: this.shows,
            viewProps: this.viewProps
          });
        }
      }
      __name(PopupController, "PopupController");
      const className$h = ClassName("txt");
      class TextView {
        constructor(doc, config) {
          this.onChange_ = this.onChange_.bind(this);
          this.element = doc.createElement("div");
          this.element.classList.add(className$h());
          config.viewProps.bindClassModifiers(this.element);
          this.props_ = config.props;
          this.props_.emitter.on("change", this.onChange_);
          const inputElem = doc.createElement("input");
          inputElem.classList.add(className$h("i"));
          inputElem.type = "text";
          config.viewProps.bindDisabled(inputElem);
          this.element.appendChild(inputElem);
          this.inputElement = inputElem;
          config.value.emitter.on("change", this.onChange_);
          this.value_ = config.value;
          this.refresh();
        }
        refresh() {
          const formatter = this.props_.get("formatter");
          this.inputElement.value = formatter(this.value_.rawValue);
        }
        onChange_() {
          this.refresh();
        }
      }
      __name(TextView, "TextView");
      class TextController {
        constructor(doc, config) {
          this.onInputChange_ = this.onInputChange_.bind(this);
          this.parser_ = config.parser;
          this.props = config.props;
          this.value = config.value;
          this.viewProps = config.viewProps;
          this.view = new TextView(doc, {
            props: config.props,
            value: this.value,
            viewProps: this.viewProps
          });
          this.view.inputElement.addEventListener("change", this.onInputChange_);
        }
        onInputChange_(e) {
          const inputElem = forceCast(e.currentTarget);
          const value = inputElem.value;
          const parsedValue = this.parser_(value);
          if (!isEmpty(parsedValue)) {
            this.value.rawValue = parsedValue;
          }
          this.view.refresh();
        }
      }
      __name(TextController, "TextController");
      function boolToString(value) {
        return String(value);
      }
      __name(boolToString, "boolToString");
      function boolFromUnknown(value) {
        if (value === "false") {
          return false;
        }
        return !!value;
      }
      __name(boolFromUnknown, "boolFromUnknown");
      function BooleanFormatter(value) {
        return boolToString(value);
      }
      __name(BooleanFormatter, "BooleanFormatter");
      class NumberLiteralNode {
        constructor(text) {
          this.text = text;
        }
        evaluate() {
          return Number(this.text);
        }
        toString() {
          return this.text;
        }
      }
      __name(NumberLiteralNode, "NumberLiteralNode");
      const BINARY_OPERATION_MAP = {
        "**": (v1, v2) => Math.pow(v1, v2),
        "*": (v1, v2) => v1 * v2,
        "/": (v1, v2) => v1 / v2,
        "%": (v1, v2) => v1 % v2,
        "+": (v1, v2) => v1 + v2,
        "-": (v1, v2) => v1 - v2,
        "<<": (v1, v2) => v1 << v2,
        ">>": (v1, v2) => v1 >> v2,
        ">>>": (v1, v2) => v1 >>> v2,
        "&": (v1, v2) => v1 & v2,
        "^": (v1, v2) => v1 ^ v2,
        "|": (v1, v2) => v1 | v2
      };
      class BinaryOperationNode {
        constructor(operator, left, right) {
          this.left = left;
          this.operator = operator;
          this.right = right;
        }
        evaluate() {
          const op = BINARY_OPERATION_MAP[this.operator];
          if (!op) {
            throw new Error(`unexpected binary operator: '${this.operator}`);
          }
          return op(this.left.evaluate(), this.right.evaluate());
        }
        toString() {
          return [
            "b(",
            this.left.toString(),
            this.operator,
            this.right.toString(),
            ")"
          ].join(" ");
        }
      }
      __name(BinaryOperationNode, "BinaryOperationNode");
      const UNARY_OPERATION_MAP = {
        "+": (v) => v,
        "-": (v) => -v,
        "~": (v) => ~v
      };
      class UnaryOperationNode {
        constructor(operator, expr) {
          this.operator = operator;
          this.expression = expr;
        }
        evaluate() {
          const op = UNARY_OPERATION_MAP[this.operator];
          if (!op) {
            throw new Error(`unexpected unary operator: '${this.operator}`);
          }
          return op(this.expression.evaluate());
        }
        toString() {
          return ["u(", this.operator, this.expression.toString(), ")"].join(" ");
        }
      }
      __name(UnaryOperationNode, "UnaryOperationNode");
      function combineReader(parsers) {
        return (text, cursor) => {
          for (let i = 0; i < parsers.length; i++) {
            const result = parsers[i](text, cursor);
            if (result !== "") {
              return result;
            }
          }
          return "";
        };
      }
      __name(combineReader, "combineReader");
      function readWhitespace(text, cursor) {
        var _a;
        const m = text.substr(cursor).match(/^\s+/);
        return (_a = m && m[0]) !== null && _a !== void 0 ? _a : "";
      }
      __name(readWhitespace, "readWhitespace");
      function readNonZeroDigit(text, cursor) {
        const ch = text.substr(cursor, 1);
        return ch.match(/^[1-9]$/) ? ch : "";
      }
      __name(readNonZeroDigit, "readNonZeroDigit");
      function readDecimalDigits(text, cursor) {
        var _a;
        const m = text.substr(cursor).match(/^[0-9]+/);
        return (_a = m && m[0]) !== null && _a !== void 0 ? _a : "";
      }
      __name(readDecimalDigits, "readDecimalDigits");
      function readSignedInteger(text, cursor) {
        const ds = readDecimalDigits(text, cursor);
        if (ds !== "") {
          return ds;
        }
        const sign = text.substr(cursor, 1);
        cursor += 1;
        if (sign !== "-" && sign !== "+") {
          return "";
        }
        const sds = readDecimalDigits(text, cursor);
        if (sds === "") {
          return "";
        }
        return sign + sds;
      }
      __name(readSignedInteger, "readSignedInteger");
      function readExponentPart(text, cursor) {
        const e = text.substr(cursor, 1);
        cursor += 1;
        if (e.toLowerCase() !== "e") {
          return "";
        }
        const si = readSignedInteger(text, cursor);
        if (si === "") {
          return "";
        }
        return e + si;
      }
      __name(readExponentPart, "readExponentPart");
      function readDecimalIntegerLiteral(text, cursor) {
        const ch = text.substr(cursor, 1);
        if (ch === "0") {
          return ch;
        }
        const nzd = readNonZeroDigit(text, cursor);
        cursor += nzd.length;
        if (nzd === "") {
          return "";
        }
        return nzd + readDecimalDigits(text, cursor);
      }
      __name(readDecimalIntegerLiteral, "readDecimalIntegerLiteral");
      function readDecimalLiteral1(text, cursor) {
        const dil = readDecimalIntegerLiteral(text, cursor);
        cursor += dil.length;
        if (dil === "") {
          return "";
        }
        const dot = text.substr(cursor, 1);
        cursor += dot.length;
        if (dot !== ".") {
          return "";
        }
        const dds = readDecimalDigits(text, cursor);
        cursor += dds.length;
        return dil + dot + dds + readExponentPart(text, cursor);
      }
      __name(readDecimalLiteral1, "readDecimalLiteral1");
      function readDecimalLiteral2(text, cursor) {
        const dot = text.substr(cursor, 1);
        cursor += dot.length;
        if (dot !== ".") {
          return "";
        }
        const dds = readDecimalDigits(text, cursor);
        cursor += dds.length;
        if (dds === "") {
          return "";
        }
        return dot + dds + readExponentPart(text, cursor);
      }
      __name(readDecimalLiteral2, "readDecimalLiteral2");
      function readDecimalLiteral3(text, cursor) {
        const dil = readDecimalIntegerLiteral(text, cursor);
        cursor += dil.length;
        if (dil === "") {
          return "";
        }
        return dil + readExponentPart(text, cursor);
      }
      __name(readDecimalLiteral3, "readDecimalLiteral3");
      const readDecimalLiteral = combineReader([
        readDecimalLiteral1,
        readDecimalLiteral2,
        readDecimalLiteral3
      ]);
      function parseBinaryDigits(text, cursor) {
        var _a;
        const m = text.substr(cursor).match(/^[01]+/);
        return (_a = m && m[0]) !== null && _a !== void 0 ? _a : "";
      }
      __name(parseBinaryDigits, "parseBinaryDigits");
      function readBinaryIntegerLiteral(text, cursor) {
        const prefix = text.substr(cursor, 2);
        cursor += prefix.length;
        if (prefix.toLowerCase() !== "0b") {
          return "";
        }
        const bds = parseBinaryDigits(text, cursor);
        if (bds === "") {
          return "";
        }
        return prefix + bds;
      }
      __name(readBinaryIntegerLiteral, "readBinaryIntegerLiteral");
      function readOctalDigits(text, cursor) {
        var _a;
        const m = text.substr(cursor).match(/^[0-7]+/);
        return (_a = m && m[0]) !== null && _a !== void 0 ? _a : "";
      }
      __name(readOctalDigits, "readOctalDigits");
      function readOctalIntegerLiteral(text, cursor) {
        const prefix = text.substr(cursor, 2);
        cursor += prefix.length;
        if (prefix.toLowerCase() !== "0o") {
          return "";
        }
        const ods = readOctalDigits(text, cursor);
        if (ods === "") {
          return "";
        }
        return prefix + ods;
      }
      __name(readOctalIntegerLiteral, "readOctalIntegerLiteral");
      function readHexDigits(text, cursor) {
        var _a;
        const m = text.substr(cursor).match(/^[0-9a-f]+/i);
        return (_a = m && m[0]) !== null && _a !== void 0 ? _a : "";
      }
      __name(readHexDigits, "readHexDigits");
      function readHexIntegerLiteral(text, cursor) {
        const prefix = text.substr(cursor, 2);
        cursor += prefix.length;
        if (prefix.toLowerCase() !== "0x") {
          return "";
        }
        const hds = readHexDigits(text, cursor);
        if (hds === "") {
          return "";
        }
        return prefix + hds;
      }
      __name(readHexIntegerLiteral, "readHexIntegerLiteral");
      const readNonDecimalIntegerLiteral = combineReader([
        readBinaryIntegerLiteral,
        readOctalIntegerLiteral,
        readHexIntegerLiteral
      ]);
      const readNumericLiteral = combineReader([
        readNonDecimalIntegerLiteral,
        readDecimalLiteral
      ]);
      function parseLiteral(text, cursor) {
        const num = readNumericLiteral(text, cursor);
        cursor += num.length;
        if (num === "") {
          return null;
        }
        return {
          evaluable: new NumberLiteralNode(num),
          cursor
        };
      }
      __name(parseLiteral, "parseLiteral");
      function parseParenthesizedExpression(text, cursor) {
        const op = text.substr(cursor, 1);
        cursor += op.length;
        if (op !== "(") {
          return null;
        }
        const expr = parseExpression(text, cursor);
        if (!expr) {
          return null;
        }
        cursor = expr.cursor;
        cursor += readWhitespace(text, cursor).length;
        const cl = text.substr(cursor, 1);
        cursor += cl.length;
        if (cl !== ")") {
          return null;
        }
        return {
          evaluable: expr.evaluable,
          cursor
        };
      }
      __name(parseParenthesizedExpression, "parseParenthesizedExpression");
      function parsePrimaryExpression(text, cursor) {
        return parseLiteral(text, cursor) || parseParenthesizedExpression(text, cursor);
      }
      __name(parsePrimaryExpression, "parsePrimaryExpression");
      function parseUnaryExpression(text, cursor) {
        const expr = parsePrimaryExpression(text, cursor);
        if (expr) {
          return expr;
        }
        const op = text.substr(cursor, 1);
        cursor += op.length;
        if (op !== "+" && op !== "-" && op !== "~") {
          return null;
        }
        const num = parseUnaryExpression(text, cursor);
        if (!num) {
          return null;
        }
        cursor = num.cursor;
        return {
          cursor,
          evaluable: new UnaryOperationNode(op, num.evaluable)
        };
      }
      __name(parseUnaryExpression, "parseUnaryExpression");
      function readBinaryOperator(ops, text, cursor) {
        cursor += readWhitespace(text, cursor).length;
        const op = ops.filter((op2) => text.startsWith(op2, cursor))[0];
        if (!op) {
          return null;
        }
        cursor += op.length;
        cursor += readWhitespace(text, cursor).length;
        return {
          cursor,
          operator: op
        };
      }
      __name(readBinaryOperator, "readBinaryOperator");
      function createBinaryOperationExpressionParser(exprParser, ops) {
        return (text, cursor) => {
          const firstExpr = exprParser(text, cursor);
          if (!firstExpr) {
            return null;
          }
          cursor = firstExpr.cursor;
          let expr = firstExpr.evaluable;
          for (; ; ) {
            const op = readBinaryOperator(ops, text, cursor);
            if (!op) {
              break;
            }
            cursor = op.cursor;
            const nextExpr = exprParser(text, cursor);
            if (!nextExpr) {
              return null;
            }
            cursor = nextExpr.cursor;
            expr = new BinaryOperationNode(op.operator, expr, nextExpr.evaluable);
          }
          return expr ? {
            cursor,
            evaluable: expr
          } : null;
        };
      }
      __name(createBinaryOperationExpressionParser, "createBinaryOperationExpressionParser");
      const parseBinaryOperationExpression = [
        ["**"],
        ["*", "/", "%"],
        ["+", "-"],
        ["<<", ">>>", ">>"],
        ["&"],
        ["^"],
        ["|"]
      ].reduce((parser, ops) => {
        return createBinaryOperationExpressionParser(parser, ops);
      }, parseUnaryExpression);
      function parseExpression(text, cursor) {
        cursor += readWhitespace(text, cursor).length;
        return parseBinaryOperationExpression(text, cursor);
      }
      __name(parseExpression, "parseExpression");
      function parseEcmaNumberExpression(text) {
        const expr = parseExpression(text, 0);
        if (!expr) {
          return null;
        }
        const cursor = expr.cursor + readWhitespace(text, expr.cursor).length;
        if (cursor !== text.length) {
          return null;
        }
        return expr.evaluable;
      }
      __name(parseEcmaNumberExpression, "parseEcmaNumberExpression");
      function parseNumber(text) {
        var _a;
        const r = parseEcmaNumberExpression(text);
        return (_a = r === null || r === void 0 ? void 0 : r.evaluate()) !== null && _a !== void 0 ? _a : null;
      }
      __name(parseNumber, "parseNumber");
      function numberFromUnknown(value) {
        if (typeof value === "number") {
          return value;
        }
        if (typeof value === "string") {
          const pv = parseNumber(value);
          if (!isEmpty(pv)) {
            return pv;
          }
        }
        return 0;
      }
      __name(numberFromUnknown, "numberFromUnknown");
      function numberToString(value) {
        return String(value);
      }
      __name(numberToString, "numberToString");
      function createNumberFormatter(digits) {
        return (value) => {
          return value.toFixed(Math.max(Math.min(digits, 20), 0));
        };
      }
      __name(createNumberFormatter, "createNumberFormatter");
      const innerFormatter = createNumberFormatter(0);
      function formatPercentage(value) {
        return innerFormatter(value) + "%";
      }
      __name(formatPercentage, "formatPercentage");
      function stringFromUnknown(value) {
        return String(value);
      }
      __name(stringFromUnknown, "stringFromUnknown");
      function formatString(value) {
        return value;
      }
      __name(formatString, "formatString");
      function fillBuffer(buffer, bufferSize) {
        while (buffer.length < bufferSize) {
          buffer.push(void 0);
        }
      }
      __name(fillBuffer, "fillBuffer");
      function initializeBuffer(bufferSize) {
        const buffer = [];
        fillBuffer(buffer, bufferSize);
        return createValue(buffer);
      }
      __name(initializeBuffer, "initializeBuffer");
      function createTrimmedBuffer(buffer) {
        const index = buffer.indexOf(void 0);
        return forceCast(index < 0 ? buffer : buffer.slice(0, index));
      }
      __name(createTrimmedBuffer, "createTrimmedBuffer");
      function createPushedBuffer(buffer, newValue) {
        const newBuffer = [...createTrimmedBuffer(buffer), newValue];
        if (newBuffer.length > buffer.length) {
          newBuffer.splice(0, newBuffer.length - buffer.length);
        } else {
          fillBuffer(newBuffer, buffer.length);
        }
        return newBuffer;
      }
      __name(createPushedBuffer, "createPushedBuffer");
      function connectValues({ primary, secondary, forward, backward }) {
        let changing = false;
        function preventFeedback(callback) {
          if (changing) {
            return;
          }
          changing = true;
          callback();
          changing = false;
        }
        __name(preventFeedback, "preventFeedback");
        primary.emitter.on("change", (ev) => {
          preventFeedback(() => {
            secondary.setRawValue(forward(primary, secondary), ev.options);
          });
        });
        secondary.emitter.on("change", (ev) => {
          preventFeedback(() => {
            primary.setRawValue(backward(primary, secondary), ev.options);
          });
          preventFeedback(() => {
            secondary.setRawValue(forward(primary, secondary), ev.options);
          });
        });
        preventFeedback(() => {
          secondary.setRawValue(forward(primary, secondary), {
            forceEmit: false,
            last: true
          });
        });
      }
      __name(connectValues, "connectValues");
      function getStepForKey(baseStep, keys) {
        const step = baseStep * (keys.altKey ? 0.1 : 1) * (keys.shiftKey ? 10 : 1);
        if (keys.upKey) {
          return +step;
        } else if (keys.downKey) {
          return -step;
        }
        return 0;
      }
      __name(getStepForKey, "getStepForKey");
      function getVerticalStepKeys(ev) {
        return {
          altKey: ev.altKey,
          downKey: ev.key === "ArrowDown",
          shiftKey: ev.shiftKey,
          upKey: ev.key === "ArrowUp"
        };
      }
      __name(getVerticalStepKeys, "getVerticalStepKeys");
      function getHorizontalStepKeys(ev) {
        return {
          altKey: ev.altKey,
          downKey: ev.key === "ArrowLeft",
          shiftKey: ev.shiftKey,
          upKey: ev.key === "ArrowRight"
        };
      }
      __name(getHorizontalStepKeys, "getHorizontalStepKeys");
      function isVerticalArrowKey(key) {
        return key === "ArrowUp" || key === "ArrowDown";
      }
      __name(isVerticalArrowKey, "isVerticalArrowKey");
      function isArrowKey(key) {
        return isVerticalArrowKey(key) || key === "ArrowLeft" || key === "ArrowRight";
      }
      __name(isArrowKey, "isArrowKey");
      function computeOffset$1(ev, elem) {
        const win = elem.ownerDocument.defaultView;
        const rect = elem.getBoundingClientRect();
        return {
          x: ev.pageX - ((win && win.scrollX || 0) + rect.left),
          y: ev.pageY - ((win && win.scrollY || 0) + rect.top)
        };
      }
      __name(computeOffset$1, "computeOffset$1");
      class PointerHandler {
        constructor(element) {
          this.lastTouch_ = null;
          this.onDocumentMouseMove_ = this.onDocumentMouseMove_.bind(this);
          this.onDocumentMouseUp_ = this.onDocumentMouseUp_.bind(this);
          this.onMouseDown_ = this.onMouseDown_.bind(this);
          this.onTouchEnd_ = this.onTouchEnd_.bind(this);
          this.onTouchMove_ = this.onTouchMove_.bind(this);
          this.onTouchStart_ = this.onTouchStart_.bind(this);
          this.elem_ = element;
          this.emitter = new Emitter();
          element.addEventListener("touchstart", this.onTouchStart_, {
            passive: false
          });
          element.addEventListener("touchmove", this.onTouchMove_, {
            passive: true
          });
          element.addEventListener("touchend", this.onTouchEnd_);
          element.addEventListener("mousedown", this.onMouseDown_);
        }
        computePosition_(offset) {
          const rect = this.elem_.getBoundingClientRect();
          return {
            bounds: {
              width: rect.width,
              height: rect.height
            },
            point: offset ? {
              x: offset.x,
              y: offset.y
            } : null
          };
        }
        onMouseDown_(ev) {
          var _a;
          ev.preventDefault();
          (_a = ev.currentTarget) === null || _a === void 0 ? void 0 : _a.focus();
          const doc = this.elem_.ownerDocument;
          doc.addEventListener("mousemove", this.onDocumentMouseMove_);
          doc.addEventListener("mouseup", this.onDocumentMouseUp_);
          this.emitter.emit("down", {
            altKey: ev.altKey,
            data: this.computePosition_(computeOffset$1(ev, this.elem_)),
            sender: this,
            shiftKey: ev.shiftKey
          });
        }
        onDocumentMouseMove_(ev) {
          this.emitter.emit("move", {
            altKey: ev.altKey,
            data: this.computePosition_(computeOffset$1(ev, this.elem_)),
            sender: this,
            shiftKey: ev.shiftKey
          });
        }
        onDocumentMouseUp_(ev) {
          const doc = this.elem_.ownerDocument;
          doc.removeEventListener("mousemove", this.onDocumentMouseMove_);
          doc.removeEventListener("mouseup", this.onDocumentMouseUp_);
          this.emitter.emit("up", {
            altKey: ev.altKey,
            data: this.computePosition_(computeOffset$1(ev, this.elem_)),
            sender: this,
            shiftKey: ev.shiftKey
          });
        }
        onTouchStart_(ev) {
          ev.preventDefault();
          const touch = ev.targetTouches.item(0);
          const rect = this.elem_.getBoundingClientRect();
          this.emitter.emit("down", {
            altKey: ev.altKey,
            data: this.computePosition_(touch ? {
              x: touch.clientX - rect.left,
              y: touch.clientY - rect.top
            } : void 0),
            sender: this,
            shiftKey: ev.shiftKey
          });
          this.lastTouch_ = touch;
        }
        onTouchMove_(ev) {
          const touch = ev.targetTouches.item(0);
          const rect = this.elem_.getBoundingClientRect();
          this.emitter.emit("move", {
            altKey: ev.altKey,
            data: this.computePosition_(touch ? {
              x: touch.clientX - rect.left,
              y: touch.clientY - rect.top
            } : void 0),
            sender: this,
            shiftKey: ev.shiftKey
          });
          this.lastTouch_ = touch;
        }
        onTouchEnd_(ev) {
          var _a;
          const touch = (_a = ev.targetTouches.item(0)) !== null && _a !== void 0 ? _a : this.lastTouch_;
          const rect = this.elem_.getBoundingClientRect();
          this.emitter.emit("up", {
            altKey: ev.altKey,
            data: this.computePosition_(touch ? {
              x: touch.clientX - rect.left,
              y: touch.clientY - rect.top
            } : void 0),
            sender: this,
            shiftKey: ev.shiftKey
          });
        }
      }
      __name(PointerHandler, "PointerHandler");
      function mapRange(value, start1, end1, start2, end2) {
        const p = (value - start1) / (end1 - start1);
        return start2 + p * (end2 - start2);
      }
      __name(mapRange, "mapRange");
      function getDecimalDigits(value) {
        const text = String(value.toFixed(10));
        const frac = text.split(".")[1];
        return frac.replace(/0+$/, "").length;
      }
      __name(getDecimalDigits, "getDecimalDigits");
      function constrainRange(value, min, max) {
        return Math.min(Math.max(value, min), max);
      }
      __name(constrainRange, "constrainRange");
      function loopRange(value, max) {
        return (value % max + max) % max;
      }
      __name(loopRange, "loopRange");
      const className$g = ClassName("txt");
      class NumberTextView {
        constructor(doc, config) {
          this.onChange_ = this.onChange_.bind(this);
          this.props_ = config.props;
          this.props_.emitter.on("change", this.onChange_);
          this.element = doc.createElement("div");
          this.element.classList.add(className$g(), className$g(void 0, "num"));
          if (config.arrayPosition) {
            this.element.classList.add(className$g(void 0, config.arrayPosition));
          }
          config.viewProps.bindClassModifiers(this.element);
          const inputElem = doc.createElement("input");
          inputElem.classList.add(className$g("i"));
          inputElem.type = "text";
          config.viewProps.bindDisabled(inputElem);
          this.element.appendChild(inputElem);
          this.inputElement = inputElem;
          this.onDraggingChange_ = this.onDraggingChange_.bind(this);
          this.dragging_ = config.dragging;
          this.dragging_.emitter.on("change", this.onDraggingChange_);
          this.element.classList.add(className$g());
          this.inputElement.classList.add(className$g("i"));
          const knobElem = doc.createElement("div");
          knobElem.classList.add(className$g("k"));
          this.element.appendChild(knobElem);
          this.knobElement = knobElem;
          const guideElem = doc.createElementNS(SVG_NS, "svg");
          guideElem.classList.add(className$g("g"));
          this.knobElement.appendChild(guideElem);
          const bodyElem = doc.createElementNS(SVG_NS, "path");
          bodyElem.classList.add(className$g("gb"));
          guideElem.appendChild(bodyElem);
          this.guideBodyElem_ = bodyElem;
          const headElem = doc.createElementNS(SVG_NS, "path");
          headElem.classList.add(className$g("gh"));
          guideElem.appendChild(headElem);
          this.guideHeadElem_ = headElem;
          const tooltipElem = doc.createElement("div");
          tooltipElem.classList.add(ClassName("tt")());
          this.knobElement.appendChild(tooltipElem);
          this.tooltipElem_ = tooltipElem;
          config.value.emitter.on("change", this.onChange_);
          this.value = config.value;
          this.refresh();
        }
        onDraggingChange_(ev) {
          if (ev.rawValue === null) {
            this.element.classList.remove(className$g(void 0, "drg"));
            return;
          }
          this.element.classList.add(className$g(void 0, "drg"));
          const x = ev.rawValue / this.props_.get("draggingScale");
          const aox = x + (x > 0 ? -1 : x < 0 ? 1 : 0);
          const adx = constrainRange(-aox, -4, 4);
          this.guideHeadElem_.setAttributeNS(null, "d", [`M ${aox + adx},0 L${aox},4 L${aox + adx},8`, `M ${x},-1 L${x},9`].join(" "));
          this.guideBodyElem_.setAttributeNS(null, "d", `M 0,4 L${x},4`);
          const formatter = this.props_.get("formatter");
          this.tooltipElem_.textContent = formatter(this.value.rawValue);
          this.tooltipElem_.style.left = `${x}px`;
        }
        refresh() {
          const formatter = this.props_.get("formatter");
          this.inputElement.value = formatter(this.value.rawValue);
        }
        onChange_() {
          this.refresh();
        }
      }
      __name(NumberTextView, "NumberTextView");
      class NumberTextController {
        constructor(doc, config) {
          this.originRawValue_ = 0;
          this.onInputChange_ = this.onInputChange_.bind(this);
          this.onInputKeyDown_ = this.onInputKeyDown_.bind(this);
          this.onInputKeyUp_ = this.onInputKeyUp_.bind(this);
          this.onPointerDown_ = this.onPointerDown_.bind(this);
          this.onPointerMove_ = this.onPointerMove_.bind(this);
          this.onPointerUp_ = this.onPointerUp_.bind(this);
          this.baseStep_ = config.baseStep;
          this.parser_ = config.parser;
          this.props = config.props;
          this.value = config.value;
          this.viewProps = config.viewProps;
          this.dragging_ = createValue(null);
          this.view = new NumberTextView(doc, {
            arrayPosition: config.arrayPosition,
            dragging: this.dragging_,
            props: this.props,
            value: this.value,
            viewProps: this.viewProps
          });
          this.view.inputElement.addEventListener("change", this.onInputChange_);
          this.view.inputElement.addEventListener("keydown", this.onInputKeyDown_);
          this.view.inputElement.addEventListener("keyup", this.onInputKeyUp_);
          const ph = new PointerHandler(this.view.knobElement);
          ph.emitter.on("down", this.onPointerDown_);
          ph.emitter.on("move", this.onPointerMove_);
          ph.emitter.on("up", this.onPointerUp_);
        }
        onInputChange_(e) {
          const inputElem = forceCast(e.currentTarget);
          const value = inputElem.value;
          const parsedValue = this.parser_(value);
          if (!isEmpty(parsedValue)) {
            this.value.rawValue = parsedValue;
          }
          this.view.refresh();
        }
        onInputKeyDown_(ev) {
          const step = getStepForKey(this.baseStep_, getVerticalStepKeys(ev));
          if (step === 0) {
            return;
          }
          this.value.setRawValue(this.value.rawValue + step, {
            forceEmit: false,
            last: false
          });
        }
        onInputKeyUp_(ev) {
          const step = getStepForKey(this.baseStep_, getVerticalStepKeys(ev));
          if (step === 0) {
            return;
          }
          this.value.setRawValue(this.value.rawValue, {
            forceEmit: true,
            last: true
          });
        }
        onPointerDown_() {
          this.originRawValue_ = this.value.rawValue;
          this.dragging_.rawValue = 0;
        }
        computeDraggingValue_(data) {
          if (!data.point) {
            return null;
          }
          const dx = data.point.x - data.bounds.width / 2;
          return this.originRawValue_ + dx * this.props.get("draggingScale");
        }
        onPointerMove_(ev) {
          const v = this.computeDraggingValue_(ev.data);
          if (v === null) {
            return;
          }
          this.value.setRawValue(v, {
            forceEmit: false,
            last: false
          });
          this.dragging_.rawValue = this.value.rawValue - this.originRawValue_;
        }
        onPointerUp_(ev) {
          const v = this.computeDraggingValue_(ev.data);
          if (v === null) {
            return;
          }
          this.value.setRawValue(v, {
            forceEmit: true,
            last: true
          });
          this.dragging_.rawValue = null;
        }
      }
      __name(NumberTextController, "NumberTextController");
      const className$f = ClassName("sld");
      class SliderView {
        constructor(doc, config) {
          this.onChange_ = this.onChange_.bind(this);
          this.props_ = config.props;
          this.props_.emitter.on("change", this.onChange_);
          this.element = doc.createElement("div");
          this.element.classList.add(className$f());
          config.viewProps.bindClassModifiers(this.element);
          const trackElem = doc.createElement("div");
          trackElem.classList.add(className$f("t"));
          config.viewProps.bindTabIndex(trackElem);
          this.element.appendChild(trackElem);
          this.trackElement = trackElem;
          const knobElem = doc.createElement("div");
          knobElem.classList.add(className$f("k"));
          this.trackElement.appendChild(knobElem);
          this.knobElement = knobElem;
          config.value.emitter.on("change", this.onChange_);
          this.value = config.value;
          this.update_();
        }
        update_() {
          const p = constrainRange(mapRange(this.value.rawValue, this.props_.get("minValue"), this.props_.get("maxValue"), 0, 100), 0, 100);
          this.knobElement.style.width = `${p}%`;
        }
        onChange_() {
          this.update_();
        }
      }
      __name(SliderView, "SliderView");
      class SliderController {
        constructor(doc, config) {
          this.onKeyDown_ = this.onKeyDown_.bind(this);
          this.onKeyUp_ = this.onKeyUp_.bind(this);
          this.onPointerDownOrMove_ = this.onPointerDownOrMove_.bind(this);
          this.onPointerUp_ = this.onPointerUp_.bind(this);
          this.baseStep_ = config.baseStep;
          this.value = config.value;
          this.viewProps = config.viewProps;
          this.props = config.props;
          this.view = new SliderView(doc, {
            props: this.props,
            value: this.value,
            viewProps: this.viewProps
          });
          this.ptHandler_ = new PointerHandler(this.view.trackElement);
          this.ptHandler_.emitter.on("down", this.onPointerDownOrMove_);
          this.ptHandler_.emitter.on("move", this.onPointerDownOrMove_);
          this.ptHandler_.emitter.on("up", this.onPointerUp_);
          this.view.trackElement.addEventListener("keydown", this.onKeyDown_);
          this.view.trackElement.addEventListener("keyup", this.onKeyUp_);
        }
        handlePointerEvent_(d, opts) {
          if (!d.point) {
            return;
          }
          this.value.setRawValue(mapRange(constrainRange(d.point.x, 0, d.bounds.width), 0, d.bounds.width, this.props.get("minValue"), this.props.get("maxValue")), opts);
        }
        onPointerDownOrMove_(ev) {
          this.handlePointerEvent_(ev.data, {
            forceEmit: false,
            last: false
          });
        }
        onPointerUp_(ev) {
          this.handlePointerEvent_(ev.data, {
            forceEmit: true,
            last: true
          });
        }
        onKeyDown_(ev) {
          const step = getStepForKey(this.baseStep_, getHorizontalStepKeys(ev));
          if (step === 0) {
            return;
          }
          this.value.setRawValue(this.value.rawValue + step, {
            forceEmit: false,
            last: false
          });
        }
        onKeyUp_(ev) {
          const step = getStepForKey(this.baseStep_, getHorizontalStepKeys(ev));
          if (step === 0) {
            return;
          }
          this.value.setRawValue(this.value.rawValue, {
            forceEmit: true,
            last: true
          });
        }
      }
      __name(SliderController, "SliderController");
      const className$e = ClassName("sldtxt");
      class SliderTextView {
        constructor(doc, config) {
          this.element = doc.createElement("div");
          this.element.classList.add(className$e());
          const sliderElem = doc.createElement("div");
          sliderElem.classList.add(className$e("s"));
          this.sliderView_ = config.sliderView;
          sliderElem.appendChild(this.sliderView_.element);
          this.element.appendChild(sliderElem);
          const textElem = doc.createElement("div");
          textElem.classList.add(className$e("t"));
          this.textView_ = config.textView;
          textElem.appendChild(this.textView_.element);
          this.element.appendChild(textElem);
        }
      }
      __name(SliderTextView, "SliderTextView");
      class SliderTextController {
        constructor(doc, config) {
          this.value = config.value;
          this.viewProps = config.viewProps;
          this.sliderC_ = new SliderController(doc, {
            baseStep: config.baseStep,
            props: config.sliderProps,
            value: config.value,
            viewProps: this.viewProps
          });
          this.textC_ = new NumberTextController(doc, {
            baseStep: config.baseStep,
            parser: config.parser,
            props: config.textProps,
            value: config.value,
            viewProps: config.viewProps
          });
          this.view = new SliderTextView(doc, {
            sliderView: this.sliderC_.view,
            textView: this.textC_.view
          });
        }
        get sliderController() {
          return this.sliderC_;
        }
        get textController() {
          return this.textC_;
        }
      }
      __name(SliderTextController, "SliderTextController");
      function writePrimitive(target, value) {
        target.write(value);
      }
      __name(writePrimitive, "writePrimitive");
      function parseListOptions(value) {
        const p = ParamsParsers;
        if (Array.isArray(value)) {
          return p.required.array(p.required.object({
            text: p.required.string,
            value: p.required.raw
          }))(value).value;
        }
        if (typeof value === "object") {
          return p.required.raw(value).value;
        }
        return void 0;
      }
      __name(parseListOptions, "parseListOptions");
      function parsePickerLayout(value) {
        if (value === "inline" || value === "popup") {
          return value;
        }
        return void 0;
      }
      __name(parsePickerLayout, "parsePickerLayout");
      function parsePointDimensionParams(value) {
        const p = ParamsParsers;
        return p.required.object({
          max: p.optional.number,
          min: p.optional.number,
          step: p.optional.number
        })(value).value;
      }
      __name(parsePointDimensionParams, "parsePointDimensionParams");
      function normalizeListOptions(options) {
        if (Array.isArray(options)) {
          return options;
        }
        const items = [];
        Object.keys(options).forEach((text) => {
          items.push({ text, value: options[text] });
        });
        return items;
      }
      __name(normalizeListOptions, "normalizeListOptions");
      function createListConstraint(options) {
        return !isEmpty(options) ? new ListConstraint(normalizeListOptions(forceCast(options))) : null;
      }
      __name(createListConstraint, "createListConstraint");
      function findListItems(constraint) {
        const c = constraint ? findConstraint(constraint, ListConstraint) : null;
        if (!c) {
          return null;
        }
        return c.options;
      }
      __name(findListItems, "findListItems");
      function findStep(constraint) {
        const c = constraint ? findConstraint(constraint, StepConstraint) : null;
        if (!c) {
          return null;
        }
        return c.step;
      }
      __name(findStep, "findStep");
      function getSuitableDecimalDigits(constraint, rawValue) {
        const sc = constraint && findConstraint(constraint, StepConstraint);
        if (sc) {
          return getDecimalDigits(sc.step);
        }
        return Math.max(getDecimalDigits(rawValue), 2);
      }
      __name(getSuitableDecimalDigits, "getSuitableDecimalDigits");
      function getBaseStep(constraint) {
        const step = findStep(constraint);
        return step !== null && step !== void 0 ? step : 1;
      }
      __name(getBaseStep, "getBaseStep");
      function getSuitableDraggingScale(constraint, rawValue) {
        var _a;
        const sc = constraint && findConstraint(constraint, StepConstraint);
        const base = Math.abs((_a = sc === null || sc === void 0 ? void 0 : sc.step) !== null && _a !== void 0 ? _a : rawValue);
        return base === 0 ? 0.1 : Math.pow(10, Math.floor(Math.log10(base)) - 1);
      }
      __name(getSuitableDraggingScale, "getSuitableDraggingScale");
      const className$d = ClassName("ckb");
      class CheckboxView {
        constructor(doc, config) {
          this.onValueChange_ = this.onValueChange_.bind(this);
          this.element = doc.createElement("div");
          this.element.classList.add(className$d());
          config.viewProps.bindClassModifiers(this.element);
          const labelElem = doc.createElement("label");
          labelElem.classList.add(className$d("l"));
          this.element.appendChild(labelElem);
          const inputElem = doc.createElement("input");
          inputElem.classList.add(className$d("i"));
          inputElem.type = "checkbox";
          labelElem.appendChild(inputElem);
          this.inputElement = inputElem;
          config.viewProps.bindDisabled(this.inputElement);
          const wrapperElem = doc.createElement("div");
          wrapperElem.classList.add(className$d("w"));
          labelElem.appendChild(wrapperElem);
          const markElem = createSvgIconElement(doc, "check");
          wrapperElem.appendChild(markElem);
          config.value.emitter.on("change", this.onValueChange_);
          this.value = config.value;
          this.update_();
        }
        update_() {
          this.inputElement.checked = this.value.rawValue;
        }
        onValueChange_() {
          this.update_();
        }
      }
      __name(CheckboxView, "CheckboxView");
      class CheckboxController {
        constructor(doc, config) {
          this.onInputChange_ = this.onInputChange_.bind(this);
          this.value = config.value;
          this.viewProps = config.viewProps;
          this.view = new CheckboxView(doc, {
            value: this.value,
            viewProps: this.viewProps
          });
          this.view.inputElement.addEventListener("change", this.onInputChange_);
        }
        onInputChange_(e) {
          const inputElem = forceCast(e.currentTarget);
          this.value.rawValue = inputElem.checked;
        }
      }
      __name(CheckboxController, "CheckboxController");
      function createConstraint$5(params) {
        const constraints = [];
        const lc = createListConstraint(params.options);
        if (lc) {
          constraints.push(lc);
        }
        return new CompositeConstraint(constraints);
      }
      __name(createConstraint$5, "createConstraint$5");
      const BooleanInputPlugin = {
        id: "input-bool",
        type: "input",
        accept: (value, params) => {
          if (typeof value !== "boolean") {
            return null;
          }
          const p = ParamsParsers;
          const result = parseParams(params, {
            options: p.optional.custom(parseListOptions)
          });
          return result ? {
            initialValue: value,
            params: result
          } : null;
        },
        binding: {
          reader: (_args) => boolFromUnknown,
          constraint: (args) => createConstraint$5(args.params),
          writer: (_args) => writePrimitive
        },
        controller: (args) => {
          var _a;
          const doc = args.document;
          const value = args.value;
          const c = args.constraint;
          if (c && findConstraint(c, ListConstraint)) {
            return new ListController(doc, {
              props: ValueMap.fromObject({
                options: (_a = findListItems(c)) !== null && _a !== void 0 ? _a : []
              }),
              value,
              viewProps: args.viewProps
            });
          }
          return new CheckboxController(doc, {
            value,
            viewProps: args.viewProps
          });
        }
      };
      const className$c = ClassName("col");
      class ColorView {
        constructor(doc, config) {
          this.element = doc.createElement("div");
          this.element.classList.add(className$c());
          config.foldable.bindExpandedClass(this.element, className$c(void 0, "expanded"));
          bindValueMap(config.foldable, "completed", valueToClassName(this.element, className$c(void 0, "cpl")));
          const headElem = doc.createElement("div");
          headElem.classList.add(className$c("h"));
          this.element.appendChild(headElem);
          const swatchElem = doc.createElement("div");
          swatchElem.classList.add(className$c("s"));
          headElem.appendChild(swatchElem);
          this.swatchElement = swatchElem;
          const textElem = doc.createElement("div");
          textElem.classList.add(className$c("t"));
          headElem.appendChild(textElem);
          this.textElement = textElem;
          if (config.pickerLayout === "inline") {
            const pickerElem = doc.createElement("div");
            pickerElem.classList.add(className$c("p"));
            this.element.appendChild(pickerElem);
            this.pickerElement = pickerElem;
          } else {
            this.pickerElement = null;
          }
        }
      }
      __name(ColorView, "ColorView");
      function rgbToHsl(r, g, b) {
        const rp = constrainRange(r / 255, 0, 1);
        const gp = constrainRange(g / 255, 0, 1);
        const bp = constrainRange(b / 255, 0, 1);
        const cmax = Math.max(rp, gp, bp);
        const cmin = Math.min(rp, gp, bp);
        const c = cmax - cmin;
        let h = 0;
        let s = 0;
        const l = (cmin + cmax) / 2;
        if (c !== 0) {
          s = c / (1 - Math.abs(cmax + cmin - 1));
          if (rp === cmax) {
            h = (gp - bp) / c;
          } else if (gp === cmax) {
            h = 2 + (bp - rp) / c;
          } else {
            h = 4 + (rp - gp) / c;
          }
          h = h / 6 + (h < 0 ? 1 : 0);
        }
        return [h * 360, s * 100, l * 100];
      }
      __name(rgbToHsl, "rgbToHsl");
      function hslToRgb(h, s, l) {
        const hp = (h % 360 + 360) % 360;
        const sp = constrainRange(s / 100, 0, 1);
        const lp = constrainRange(l / 100, 0, 1);
        const c = (1 - Math.abs(2 * lp - 1)) * sp;
        const x = c * (1 - Math.abs(hp / 60 % 2 - 1));
        const m = lp - c / 2;
        let rp, gp, bp;
        if (hp >= 0 && hp < 60) {
          [rp, gp, bp] = [c, x, 0];
        } else if (hp >= 60 && hp < 120) {
          [rp, gp, bp] = [x, c, 0];
        } else if (hp >= 120 && hp < 180) {
          [rp, gp, bp] = [0, c, x];
        } else if (hp >= 180 && hp < 240) {
          [rp, gp, bp] = [0, x, c];
        } else if (hp >= 240 && hp < 300) {
          [rp, gp, bp] = [x, 0, c];
        } else {
          [rp, gp, bp] = [c, 0, x];
        }
        return [(rp + m) * 255, (gp + m) * 255, (bp + m) * 255];
      }
      __name(hslToRgb, "hslToRgb");
      function rgbToHsv(r, g, b) {
        const rp = constrainRange(r / 255, 0, 1);
        const gp = constrainRange(g / 255, 0, 1);
        const bp = constrainRange(b / 255, 0, 1);
        const cmax = Math.max(rp, gp, bp);
        const cmin = Math.min(rp, gp, bp);
        const d = cmax - cmin;
        let h;
        if (d === 0) {
          h = 0;
        } else if (cmax === rp) {
          h = 60 * (((gp - bp) / d % 6 + 6) % 6);
        } else if (cmax === gp) {
          h = 60 * ((bp - rp) / d + 2);
        } else {
          h = 60 * ((rp - gp) / d + 4);
        }
        const s = cmax === 0 ? 0 : d / cmax;
        const v = cmax;
        return [h, s * 100, v * 100];
      }
      __name(rgbToHsv, "rgbToHsv");
      function hsvToRgb(h, s, v) {
        const hp = loopRange(h, 360);
        const sp = constrainRange(s / 100, 0, 1);
        const vp = constrainRange(v / 100, 0, 1);
        const c = vp * sp;
        const x = c * (1 - Math.abs(hp / 60 % 2 - 1));
        const m = vp - c;
        let rp, gp, bp;
        if (hp >= 0 && hp < 60) {
          [rp, gp, bp] = [c, x, 0];
        } else if (hp >= 60 && hp < 120) {
          [rp, gp, bp] = [x, c, 0];
        } else if (hp >= 120 && hp < 180) {
          [rp, gp, bp] = [0, c, x];
        } else if (hp >= 180 && hp < 240) {
          [rp, gp, bp] = [0, x, c];
        } else if (hp >= 240 && hp < 300) {
          [rp, gp, bp] = [x, 0, c];
        } else {
          [rp, gp, bp] = [c, 0, x];
        }
        return [(rp + m) * 255, (gp + m) * 255, (bp + m) * 255];
      }
      __name(hsvToRgb, "hsvToRgb");
      function hslToHsv(h, s, l) {
        const sd = l + s * (100 - Math.abs(2 * l - 100)) / (2 * 100);
        return [
          h,
          sd !== 0 ? s * (100 - Math.abs(2 * l - 100)) / sd : 0,
          l + s * (100 - Math.abs(2 * l - 100)) / (2 * 100)
        ];
      }
      __name(hslToHsv, "hslToHsv");
      function hsvToHsl(h, s, v) {
        const sd = 100 - Math.abs(v * (200 - s) / 100 - 100);
        return [h, sd !== 0 ? s * v / sd : 0, v * (200 - s) / (2 * 100)];
      }
      __name(hsvToHsl, "hsvToHsl");
      function removeAlphaComponent(comps) {
        return [comps[0], comps[1], comps[2]];
      }
      __name(removeAlphaComponent, "removeAlphaComponent");
      function appendAlphaComponent(comps, alpha) {
        return [comps[0], comps[1], comps[2], alpha];
      }
      __name(appendAlphaComponent, "appendAlphaComponent");
      const MODE_CONVERTER_MAP = {
        hsl: {
          hsl: (h, s, l) => [h, s, l],
          hsv: hslToHsv,
          rgb: hslToRgb
        },
        hsv: {
          hsl: hsvToHsl,
          hsv: (h, s, v) => [h, s, v],
          rgb: hsvToRgb
        },
        rgb: {
          hsl: rgbToHsl,
          hsv: rgbToHsv,
          rgb: (r, g, b) => [r, g, b]
        }
      };
      function convertColorMode(components, fromMode, toMode) {
        return MODE_CONVERTER_MAP[fromMode][toMode](...components);
      }
      __name(convertColorMode, "convertColorMode");
      const CONSTRAINT_MAP = {
        hsl: (comps) => {
          var _a;
          return [
            loopRange(comps[0], 360),
            constrainRange(comps[1], 0, 100),
            constrainRange(comps[2], 0, 100),
            constrainRange((_a = comps[3]) !== null && _a !== void 0 ? _a : 1, 0, 1)
          ];
        },
        hsv: (comps) => {
          var _a;
          return [
            loopRange(comps[0], 360),
            constrainRange(comps[1], 0, 100),
            constrainRange(comps[2], 0, 100),
            constrainRange((_a = comps[3]) !== null && _a !== void 0 ? _a : 1, 0, 1)
          ];
        },
        rgb: (comps) => {
          var _a;
          return [
            constrainRange(comps[0], 0, 255),
            constrainRange(comps[1], 0, 255),
            constrainRange(comps[2], 0, 255),
            constrainRange((_a = comps[3]) !== null && _a !== void 0 ? _a : 1, 0, 1)
          ];
        }
      };
      function isRgbColorComponent(obj, key) {
        if (typeof obj !== "object" || isEmpty(obj)) {
          return false;
        }
        return key in obj && typeof obj[key] === "number";
      }
      __name(isRgbColorComponent, "isRgbColorComponent");
      class Color {
        constructor(comps, mode) {
          this.mode_ = mode;
          this.comps_ = CONSTRAINT_MAP[mode](comps);
        }
        static black() {
          return new Color([0, 0, 0], "rgb");
        }
        static fromObject(obj) {
          const comps = "a" in obj ? [obj.r, obj.g, obj.b, obj.a] : [obj.r, obj.g, obj.b];
          return new Color(comps, "rgb");
        }
        static toRgbaObject(color) {
          return color.toRgbaObject();
        }
        static isRgbColorObject(obj) {
          return isRgbColorComponent(obj, "r") && isRgbColorComponent(obj, "g") && isRgbColorComponent(obj, "b");
        }
        static isRgbaColorObject(obj) {
          return this.isRgbColorObject(obj) && isRgbColorComponent(obj, "a");
        }
        static isColorObject(obj) {
          return this.isRgbColorObject(obj);
        }
        static equals(v1, v2) {
          if (v1.mode_ !== v2.mode_) {
            return false;
          }
          const comps1 = v1.comps_;
          const comps2 = v2.comps_;
          for (let i = 0; i < comps1.length; i++) {
            if (comps1[i] !== comps2[i]) {
              return false;
            }
          }
          return true;
        }
        get mode() {
          return this.mode_;
        }
        getComponents(opt_mode) {
          return appendAlphaComponent(convertColorMode(removeAlphaComponent(this.comps_), this.mode_, opt_mode || this.mode_), this.comps_[3]);
        }
        toRgbaObject() {
          const rgbComps = this.getComponents("rgb");
          return {
            r: rgbComps[0],
            g: rgbComps[1],
            b: rgbComps[2],
            a: rgbComps[3]
          };
        }
      }
      __name(Color, "Color");
      const className$b = ClassName("colp");
      class ColorPickerView {
        constructor(doc, config) {
          this.alphaViews_ = null;
          this.element = doc.createElement("div");
          this.element.classList.add(className$b());
          const hsvElem = doc.createElement("div");
          hsvElem.classList.add(className$b("hsv"));
          const svElem = doc.createElement("div");
          svElem.classList.add(className$b("sv"));
          this.svPaletteView_ = config.svPaletteView;
          svElem.appendChild(this.svPaletteView_.element);
          hsvElem.appendChild(svElem);
          const hElem = doc.createElement("div");
          hElem.classList.add(className$b("h"));
          this.hPaletteView_ = config.hPaletteView;
          hElem.appendChild(this.hPaletteView_.element);
          hsvElem.appendChild(hElem);
          this.element.appendChild(hsvElem);
          const rgbElem = doc.createElement("div");
          rgbElem.classList.add(className$b("rgb"));
          this.textView_ = config.textView;
          rgbElem.appendChild(this.textView_.element);
          this.element.appendChild(rgbElem);
          if (config.alphaViews) {
            this.alphaViews_ = {
              palette: config.alphaViews.palette,
              text: config.alphaViews.text
            };
            const aElem = doc.createElement("div");
            aElem.classList.add(className$b("a"));
            const apElem = doc.createElement("div");
            apElem.classList.add(className$b("ap"));
            apElem.appendChild(this.alphaViews_.palette.element);
            aElem.appendChild(apElem);
            const atElem = doc.createElement("div");
            atElem.classList.add(className$b("at"));
            atElem.appendChild(this.alphaViews_.text.element);
            aElem.appendChild(atElem);
            this.element.appendChild(aElem);
          }
        }
        get allFocusableElements() {
          const elems = [
            this.svPaletteView_.element,
            this.hPaletteView_.element,
            this.textView_.modeSelectElement,
            ...this.textView_.textViews.map((v) => v.inputElement)
          ];
          if (this.alphaViews_) {
            elems.push(this.alphaViews_.palette.element, this.alphaViews_.text.inputElement);
          }
          return elems;
        }
      }
      __name(ColorPickerView, "ColorPickerView");
      function parseColorInputParams(params) {
        const p = ParamsParsers;
        return parseParams(params, {
          alpha: p.optional.boolean,
          expanded: p.optional.boolean,
          picker: p.optional.custom(parsePickerLayout)
        });
      }
      __name(parseColorInputParams, "parseColorInputParams");
      function getBaseStepForColor(forAlpha) {
        return forAlpha ? 0.1 : 1;
      }
      __name(getBaseStepForColor, "getBaseStepForColor");
      function parseCssNumberOrPercentage(text, maxValue) {
        const m = text.match(/^(.+)%$/);
        if (!m) {
          return Math.min(parseFloat(text), maxValue);
        }
        return Math.min(parseFloat(m[1]) * 0.01 * maxValue, maxValue);
      }
      __name(parseCssNumberOrPercentage, "parseCssNumberOrPercentage");
      const ANGLE_TO_DEG_MAP = {
        deg: (angle) => angle,
        grad: (angle) => angle * 360 / 400,
        rad: (angle) => angle * 360 / (2 * Math.PI),
        turn: (angle) => angle * 360
      };
      function parseCssNumberOrAngle(text) {
        const m = text.match(/^([0-9.]+?)(deg|grad|rad|turn)$/);
        if (!m) {
          return parseFloat(text);
        }
        const angle = parseFloat(m[1]);
        const unit = m[2];
        return ANGLE_TO_DEG_MAP[unit](angle);
      }
      __name(parseCssNumberOrAngle, "parseCssNumberOrAngle");
      const NOTATION_TO_PARSER_MAP = {
        "func.rgb": (text) => {
          const m = text.match(/^rgb\(\s*([0-9A-Fa-f.]+%?)\s*,\s*([0-9A-Fa-f.]+%?)\s*,\s*([0-9A-Fa-f.]+%?)\s*\)$/);
          if (!m) {
            return null;
          }
          const comps = [
            parseCssNumberOrPercentage(m[1], 255),
            parseCssNumberOrPercentage(m[2], 255),
            parseCssNumberOrPercentage(m[3], 255)
          ];
          if (isNaN(comps[0]) || isNaN(comps[1]) || isNaN(comps[2])) {
            return null;
          }
          return new Color(comps, "rgb");
        },
        "func.rgba": (text) => {
          const m = text.match(/^rgba\(\s*([0-9A-Fa-f.]+%?)\s*,\s*([0-9A-Fa-f.]+%?)\s*,\s*([0-9A-Fa-f.]+%?)\s*,\s*([0-9A-Fa-f.]+%?)\s*\)$/);
          if (!m) {
            return null;
          }
          const comps = [
            parseCssNumberOrPercentage(m[1], 255),
            parseCssNumberOrPercentage(m[2], 255),
            parseCssNumberOrPercentage(m[3], 255),
            parseCssNumberOrPercentage(m[4], 1)
          ];
          if (isNaN(comps[0]) || isNaN(comps[1]) || isNaN(comps[2]) || isNaN(comps[3])) {
            return null;
          }
          return new Color(comps, "rgb");
        },
        "func.hsl": (text) => {
          const m = text.match(/^hsl\(\s*([0-9A-Fa-f.]+(?:deg|grad|rad|turn)?)\s*,\s*([0-9A-Fa-f.]+%?)\s*,\s*([0-9A-Fa-f.]+%?)\s*\)$/);
          if (!m) {
            return null;
          }
          const comps = [
            parseCssNumberOrAngle(m[1]),
            parseCssNumberOrPercentage(m[2], 100),
            parseCssNumberOrPercentage(m[3], 100)
          ];
          if (isNaN(comps[0]) || isNaN(comps[1]) || isNaN(comps[2])) {
            return null;
          }
          return new Color(comps, "hsl");
        },
        "func.hsla": (text) => {
          const m = text.match(/^hsla\(\s*([0-9A-Fa-f.]+(?:deg|grad|rad|turn)?)\s*,\s*([0-9A-Fa-f.]+%?)\s*,\s*([0-9A-Fa-f.]+%?)\s*,\s*([0-9A-Fa-f.]+%?)\s*\)$/);
          if (!m) {
            return null;
          }
          const comps = [
            parseCssNumberOrAngle(m[1]),
            parseCssNumberOrPercentage(m[2], 100),
            parseCssNumberOrPercentage(m[3], 100),
            parseCssNumberOrPercentage(m[4], 1)
          ];
          if (isNaN(comps[0]) || isNaN(comps[1]) || isNaN(comps[2]) || isNaN(comps[3])) {
            return null;
          }
          return new Color(comps, "hsl");
        },
        "hex.rgb": (text) => {
          const mRgb = text.match(/^#([0-9A-Fa-f])([0-9A-Fa-f])([0-9A-Fa-f])$/);
          if (mRgb) {
            return new Color([
              parseInt(mRgb[1] + mRgb[1], 16),
              parseInt(mRgb[2] + mRgb[2], 16),
              parseInt(mRgb[3] + mRgb[3], 16)
            ], "rgb");
          }
          const mRrggbb = text.match(/^(?:#|0x)([0-9A-Fa-f]{2})([0-9A-Fa-f]{2})([0-9A-Fa-f]{2})$/);
          if (mRrggbb) {
            return new Color([
              parseInt(mRrggbb[1], 16),
              parseInt(mRrggbb[2], 16),
              parseInt(mRrggbb[3], 16)
            ], "rgb");
          }
          return null;
        },
        "hex.rgba": (text) => {
          const mRgb = text.match(/^#?([0-9A-Fa-f])([0-9A-Fa-f])([0-9A-Fa-f])([0-9A-Fa-f])$/);
          if (mRgb) {
            return new Color([
              parseInt(mRgb[1] + mRgb[1], 16),
              parseInt(mRgb[2] + mRgb[2], 16),
              parseInt(mRgb[3] + mRgb[3], 16),
              mapRange(parseInt(mRgb[4] + mRgb[4], 16), 0, 255, 0, 1)
            ], "rgb");
          }
          const mRrggbb = text.match(/^(?:#|0x)?([0-9A-Fa-f]{2})([0-9A-Fa-f]{2})([0-9A-Fa-f]{2})([0-9A-Fa-f]{2})$/);
          if (mRrggbb) {
            return new Color([
              parseInt(mRrggbb[1], 16),
              parseInt(mRrggbb[2], 16),
              parseInt(mRrggbb[3], 16),
              mapRange(parseInt(mRrggbb[4], 16), 0, 255, 0, 1)
            ], "rgb");
          }
          return null;
        }
      };
      function getColorNotation(text) {
        const notations = Object.keys(NOTATION_TO_PARSER_MAP);
        return notations.reduce((result, notation) => {
          if (result) {
            return result;
          }
          const subparser = NOTATION_TO_PARSER_MAP[notation];
          return subparser(text) ? notation : null;
        }, null);
      }
      __name(getColorNotation, "getColorNotation");
      const CompositeColorParser = /* @__PURE__ */ __name((text) => {
        const notation = getColorNotation(text);
        return notation ? NOTATION_TO_PARSER_MAP[notation](text) : null;
      }, "CompositeColorParser");
      function hasAlphaComponent(notation) {
        return notation === "func.hsla" || notation === "func.rgba" || notation === "hex.rgba";
      }
      __name(hasAlphaComponent, "hasAlphaComponent");
      function colorFromString(value) {
        if (typeof value === "string") {
          const cv = CompositeColorParser(value);
          if (cv) {
            return cv;
          }
        }
        return Color.black();
      }
      __name(colorFromString, "colorFromString");
      function zerofill(comp) {
        const hex = constrainRange(Math.floor(comp), 0, 255).toString(16);
        return hex.length === 1 ? `0${hex}` : hex;
      }
      __name(zerofill, "zerofill");
      function colorToHexRgbString(value, prefix = "#") {
        const hexes = removeAlphaComponent(value.getComponents("rgb")).map(zerofill).join("");
        return `${prefix}${hexes}`;
      }
      __name(colorToHexRgbString, "colorToHexRgbString");
      function colorToHexRgbaString(value, prefix = "#") {
        const rgbaComps = value.getComponents("rgb");
        const hexes = [rgbaComps[0], rgbaComps[1], rgbaComps[2], rgbaComps[3] * 255].map(zerofill).join("");
        return `${prefix}${hexes}`;
      }
      __name(colorToHexRgbaString, "colorToHexRgbaString");
      function colorToFunctionalRgbString(value) {
        const formatter = createNumberFormatter(0);
        const comps = removeAlphaComponent(value.getComponents("rgb")).map((comp) => formatter(comp));
        return `rgb(${comps.join(", ")})`;
      }
      __name(colorToFunctionalRgbString, "colorToFunctionalRgbString");
      function colorToFunctionalRgbaString(value) {
        const aFormatter = createNumberFormatter(2);
        const rgbFormatter = createNumberFormatter(0);
        const comps = value.getComponents("rgb").map((comp, index) => {
          const formatter = index === 3 ? aFormatter : rgbFormatter;
          return formatter(comp);
        });
        return `rgba(${comps.join(", ")})`;
      }
      __name(colorToFunctionalRgbaString, "colorToFunctionalRgbaString");
      function colorToFunctionalHslString(value) {
        const formatters = [
          createNumberFormatter(0),
          formatPercentage,
          formatPercentage
        ];
        const comps = removeAlphaComponent(value.getComponents("hsl")).map((comp, index) => formatters[index](comp));
        return `hsl(${comps.join(", ")})`;
      }
      __name(colorToFunctionalHslString, "colorToFunctionalHslString");
      function colorToFunctionalHslaString(value) {
        const formatters = [
          createNumberFormatter(0),
          formatPercentage,
          formatPercentage,
          createNumberFormatter(2)
        ];
        const comps = value.getComponents("hsl").map((comp, index) => formatters[index](comp));
        return `hsla(${comps.join(", ")})`;
      }
      __name(colorToFunctionalHslaString, "colorToFunctionalHslaString");
      const NOTATION_TO_STRINGIFIER_MAP = {
        "func.hsl": colorToFunctionalHslString,
        "func.hsla": colorToFunctionalHslaString,
        "func.rgb": colorToFunctionalRgbString,
        "func.rgba": colorToFunctionalRgbaString,
        "hex.rgb": colorToHexRgbString,
        "hex.rgba": colorToHexRgbaString
      };
      function getColorStringifier(notation) {
        return NOTATION_TO_STRINGIFIER_MAP[notation];
      }
      __name(getColorStringifier, "getColorStringifier");
      const className$a = ClassName("apl");
      class APaletteView {
        constructor(doc, config) {
          this.onValueChange_ = this.onValueChange_.bind(this);
          this.value = config.value;
          this.value.emitter.on("change", this.onValueChange_);
          this.element = doc.createElement("div");
          this.element.classList.add(className$a());
          config.viewProps.bindTabIndex(this.element);
          const barElem = doc.createElement("div");
          barElem.classList.add(className$a("b"));
          this.element.appendChild(barElem);
          const colorElem = doc.createElement("div");
          colorElem.classList.add(className$a("c"));
          barElem.appendChild(colorElem);
          this.colorElem_ = colorElem;
          const markerElem = doc.createElement("div");
          markerElem.classList.add(className$a("m"));
          this.element.appendChild(markerElem);
          this.markerElem_ = markerElem;
          const previewElem = doc.createElement("div");
          previewElem.classList.add(className$a("p"));
          this.markerElem_.appendChild(previewElem);
          this.previewElem_ = previewElem;
          this.update_();
        }
        update_() {
          const c = this.value.rawValue;
          const rgbaComps = c.getComponents("rgb");
          const leftColor = new Color([rgbaComps[0], rgbaComps[1], rgbaComps[2], 0], "rgb");
          const rightColor = new Color([rgbaComps[0], rgbaComps[1], rgbaComps[2], 255], "rgb");
          const gradientComps = [
            "to right",
            colorToFunctionalRgbaString(leftColor),
            colorToFunctionalRgbaString(rightColor)
          ];
          this.colorElem_.style.background = `linear-gradient(${gradientComps.join(",")})`;
          this.previewElem_.style.backgroundColor = colorToFunctionalRgbaString(c);
          const left = mapRange(rgbaComps[3], 0, 1, 0, 100);
          this.markerElem_.style.left = `${left}%`;
        }
        onValueChange_() {
          this.update_();
        }
      }
      __name(APaletteView, "APaletteView");
      class APaletteController {
        constructor(doc, config) {
          this.onKeyDown_ = this.onKeyDown_.bind(this);
          this.onKeyUp_ = this.onKeyUp_.bind(this);
          this.onPointerDown_ = this.onPointerDown_.bind(this);
          this.onPointerMove_ = this.onPointerMove_.bind(this);
          this.onPointerUp_ = this.onPointerUp_.bind(this);
          this.value = config.value;
          this.viewProps = config.viewProps;
          this.view = new APaletteView(doc, {
            value: this.value,
            viewProps: this.viewProps
          });
          this.ptHandler_ = new PointerHandler(this.view.element);
          this.ptHandler_.emitter.on("down", this.onPointerDown_);
          this.ptHandler_.emitter.on("move", this.onPointerMove_);
          this.ptHandler_.emitter.on("up", this.onPointerUp_);
          this.view.element.addEventListener("keydown", this.onKeyDown_);
          this.view.element.addEventListener("keyup", this.onKeyUp_);
        }
        handlePointerEvent_(d, opts) {
          if (!d.point) {
            return;
          }
          const alpha = d.point.x / d.bounds.width;
          const c = this.value.rawValue;
          const [h, s, v] = c.getComponents("hsv");
          this.value.setRawValue(new Color([h, s, v, alpha], "hsv"), opts);
        }
        onPointerDown_(ev) {
          this.handlePointerEvent_(ev.data, {
            forceEmit: false,
            last: false
          });
        }
        onPointerMove_(ev) {
          this.handlePointerEvent_(ev.data, {
            forceEmit: false,
            last: false
          });
        }
        onPointerUp_(ev) {
          this.handlePointerEvent_(ev.data, {
            forceEmit: true,
            last: true
          });
        }
        onKeyDown_(ev) {
          const step = getStepForKey(getBaseStepForColor(true), getHorizontalStepKeys(ev));
          if (step === 0) {
            return;
          }
          const c = this.value.rawValue;
          const [h, s, v, a] = c.getComponents("hsv");
          this.value.setRawValue(new Color([h, s, v, a + step], "hsv"), {
            forceEmit: false,
            last: false
          });
        }
        onKeyUp_(ev) {
          const step = getStepForKey(getBaseStepForColor(true), getHorizontalStepKeys(ev));
          if (step === 0) {
            return;
          }
          this.value.setRawValue(this.value.rawValue, {
            forceEmit: true,
            last: true
          });
        }
      }
      __name(APaletteController, "APaletteController");
      const className$9 = ClassName("coltxt");
      function createModeSelectElement(doc) {
        const selectElem = doc.createElement("select");
        const items = [
          { text: "RGB", value: "rgb" },
          { text: "HSL", value: "hsl" },
          { text: "HSV", value: "hsv" }
        ];
        selectElem.appendChild(items.reduce((frag, item) => {
          const optElem = doc.createElement("option");
          optElem.textContent = item.text;
          optElem.value = item.value;
          frag.appendChild(optElem);
          return frag;
        }, doc.createDocumentFragment()));
        return selectElem;
      }
      __name(createModeSelectElement, "createModeSelectElement");
      class ColorTextView {
        constructor(doc, config) {
          this.element = doc.createElement("div");
          this.element.classList.add(className$9());
          const modeElem = doc.createElement("div");
          modeElem.classList.add(className$9("m"));
          this.modeElem_ = createModeSelectElement(doc);
          this.modeElem_.classList.add(className$9("ms"));
          modeElem.appendChild(this.modeSelectElement);
          const modeMarkerElem = doc.createElement("div");
          modeMarkerElem.classList.add(className$9("mm"));
          modeMarkerElem.appendChild(createSvgIconElement(doc, "dropdown"));
          modeElem.appendChild(modeMarkerElem);
          this.element.appendChild(modeElem);
          const textsElem = doc.createElement("div");
          textsElem.classList.add(className$9("w"));
          this.element.appendChild(textsElem);
          this.textsElem_ = textsElem;
          this.textViews_ = config.textViews;
          this.applyTextViews_();
          bindValue(config.colorMode, (mode) => {
            this.modeElem_.value = mode;
          });
        }
        get modeSelectElement() {
          return this.modeElem_;
        }
        get textViews() {
          return this.textViews_;
        }
        set textViews(textViews) {
          this.textViews_ = textViews;
          this.applyTextViews_();
        }
        applyTextViews_() {
          removeChildElements(this.textsElem_);
          const doc = this.element.ownerDocument;
          this.textViews_.forEach((v) => {
            const compElem = doc.createElement("div");
            compElem.classList.add(className$9("c"));
            compElem.appendChild(v.element);
            this.textsElem_.appendChild(compElem);
          });
        }
      }
      __name(ColorTextView, "ColorTextView");
      const FORMATTER = createNumberFormatter(0);
      const MODE_TO_CONSTRAINT_MAP = {
        rgb: () => {
          return new RangeConstraint({ min: 0, max: 255 });
        },
        hsl: (index) => {
          return index === 0 ? new RangeConstraint({ min: 0, max: 360 }) : new RangeConstraint({ min: 0, max: 100 });
        },
        hsv: (index) => {
          return index === 0 ? new RangeConstraint({ min: 0, max: 360 }) : new RangeConstraint({ min: 0, max: 100 });
        }
      };
      function createComponentController(doc, config, index) {
        return new NumberTextController(doc, {
          arrayPosition: index === 0 ? "fst" : index === 3 - 1 ? "lst" : "mid",
          baseStep: getBaseStepForColor(false),
          parser: config.parser,
          props: ValueMap.fromObject({
            draggingScale: 1,
            formatter: FORMATTER
          }),
          value: createValue(0, {
            constraint: MODE_TO_CONSTRAINT_MAP[config.colorMode](index)
          }),
          viewProps: config.viewProps
        });
      }
      __name(createComponentController, "createComponentController");
      class ColorTextController {
        constructor(doc, config) {
          this.onModeSelectChange_ = this.onModeSelectChange_.bind(this);
          this.parser_ = config.parser;
          this.value = config.value;
          this.viewProps = config.viewProps;
          this.colorMode = createValue(this.value.rawValue.mode);
          this.ccs_ = this.createComponentControllers_(doc);
          this.view = new ColorTextView(doc, {
            colorMode: this.colorMode,
            textViews: [this.ccs_[0].view, this.ccs_[1].view, this.ccs_[2].view]
          });
          this.view.modeSelectElement.addEventListener("change", this.onModeSelectChange_);
        }
        createComponentControllers_(doc) {
          const cc = {
            colorMode: this.colorMode.rawValue,
            parser: this.parser_,
            viewProps: this.viewProps
          };
          const ccs = [
            createComponentController(doc, cc, 0),
            createComponentController(doc, cc, 1),
            createComponentController(doc, cc, 2)
          ];
          ccs.forEach((cs, index) => {
            connectValues({
              primary: this.value,
              secondary: cs.value,
              forward: (p) => {
                return p.rawValue.getComponents(this.colorMode.rawValue)[index];
              },
              backward: (p, s) => {
                const pickedMode = this.colorMode.rawValue;
                const comps = p.rawValue.getComponents(pickedMode);
                comps[index] = s.rawValue;
                return new Color(appendAlphaComponent(removeAlphaComponent(comps), comps[3]), pickedMode);
              }
            });
          });
          return ccs;
        }
        onModeSelectChange_(ev) {
          const selectElem = ev.currentTarget;
          this.colorMode.rawValue = selectElem.value;
          this.ccs_ = this.createComponentControllers_(this.view.element.ownerDocument);
          this.view.textViews = [
            this.ccs_[0].view,
            this.ccs_[1].view,
            this.ccs_[2].view
          ];
        }
      }
      __name(ColorTextController, "ColorTextController");
      const className$8 = ClassName("hpl");
      class HPaletteView {
        constructor(doc, config) {
          this.onValueChange_ = this.onValueChange_.bind(this);
          this.value = config.value;
          this.value.emitter.on("change", this.onValueChange_);
          this.element = doc.createElement("div");
          this.element.classList.add(className$8());
          config.viewProps.bindTabIndex(this.element);
          const colorElem = doc.createElement("div");
          colorElem.classList.add(className$8("c"));
          this.element.appendChild(colorElem);
          const markerElem = doc.createElement("div");
          markerElem.classList.add(className$8("m"));
          this.element.appendChild(markerElem);
          this.markerElem_ = markerElem;
          this.update_();
        }
        update_() {
          const c = this.value.rawValue;
          const [h] = c.getComponents("hsv");
          this.markerElem_.style.backgroundColor = colorToFunctionalRgbString(new Color([h, 100, 100], "hsv"));
          const left = mapRange(h, 0, 360, 0, 100);
          this.markerElem_.style.left = `${left}%`;
        }
        onValueChange_() {
          this.update_();
        }
      }
      __name(HPaletteView, "HPaletteView");
      class HPaletteController {
        constructor(doc, config) {
          this.onKeyDown_ = this.onKeyDown_.bind(this);
          this.onKeyUp_ = this.onKeyUp_.bind(this);
          this.onPointerDown_ = this.onPointerDown_.bind(this);
          this.onPointerMove_ = this.onPointerMove_.bind(this);
          this.onPointerUp_ = this.onPointerUp_.bind(this);
          this.value = config.value;
          this.viewProps = config.viewProps;
          this.view = new HPaletteView(doc, {
            value: this.value,
            viewProps: this.viewProps
          });
          this.ptHandler_ = new PointerHandler(this.view.element);
          this.ptHandler_.emitter.on("down", this.onPointerDown_);
          this.ptHandler_.emitter.on("move", this.onPointerMove_);
          this.ptHandler_.emitter.on("up", this.onPointerUp_);
          this.view.element.addEventListener("keydown", this.onKeyDown_);
          this.view.element.addEventListener("keyup", this.onKeyUp_);
        }
        handlePointerEvent_(d, opts) {
          if (!d.point) {
            return;
          }
          const hue = mapRange(d.point.x, 0, d.bounds.width, 0, 360);
          const c = this.value.rawValue;
          const [, s, v, a] = c.getComponents("hsv");
          this.value.setRawValue(new Color([hue, s, v, a], "hsv"), opts);
        }
        onPointerDown_(ev) {
          this.handlePointerEvent_(ev.data, {
            forceEmit: false,
            last: false
          });
        }
        onPointerMove_(ev) {
          this.handlePointerEvent_(ev.data, {
            forceEmit: false,
            last: false
          });
        }
        onPointerUp_(ev) {
          this.handlePointerEvent_(ev.data, {
            forceEmit: true,
            last: true
          });
        }
        onKeyDown_(ev) {
          const step = getStepForKey(getBaseStepForColor(false), getHorizontalStepKeys(ev));
          if (step === 0) {
            return;
          }
          const c = this.value.rawValue;
          const [h, s, v, a] = c.getComponents("hsv");
          this.value.setRawValue(new Color([h + step, s, v, a], "hsv"), {
            forceEmit: false,
            last: false
          });
        }
        onKeyUp_(ev) {
          const step = getStepForKey(getBaseStepForColor(false), getHorizontalStepKeys(ev));
          if (step === 0) {
            return;
          }
          this.value.setRawValue(this.value.rawValue, {
            forceEmit: true,
            last: true
          });
        }
      }
      __name(HPaletteController, "HPaletteController");
      const className$7 = ClassName("svp");
      const CANVAS_RESOL = 64;
      class SvPaletteView {
        constructor(doc, config) {
          this.onValueChange_ = this.onValueChange_.bind(this);
          this.value = config.value;
          this.value.emitter.on("change", this.onValueChange_);
          this.element = doc.createElement("div");
          this.element.classList.add(className$7());
          config.viewProps.bindTabIndex(this.element);
          const canvasElem = doc.createElement("canvas");
          canvasElem.height = CANVAS_RESOL;
          canvasElem.width = CANVAS_RESOL;
          canvasElem.classList.add(className$7("c"));
          this.element.appendChild(canvasElem);
          this.canvasElement = canvasElem;
          const markerElem = doc.createElement("div");
          markerElem.classList.add(className$7("m"));
          this.element.appendChild(markerElem);
          this.markerElem_ = markerElem;
          this.update_();
        }
        update_() {
          const ctx = getCanvasContext(this.canvasElement);
          if (!ctx) {
            return;
          }
          const c = this.value.rawValue;
          const hsvComps = c.getComponents("hsv");
          const width = this.canvasElement.width;
          const height = this.canvasElement.height;
          const imgData = ctx.getImageData(0, 0, width, height);
          const data = imgData.data;
          for (let iy = 0; iy < height; iy++) {
            for (let ix = 0; ix < width; ix++) {
              const s = mapRange(ix, 0, width, 0, 100);
              const v = mapRange(iy, 0, height, 100, 0);
              const rgbComps = hsvToRgb(hsvComps[0], s, v);
              const i = (iy * width + ix) * 4;
              data[i] = rgbComps[0];
              data[i + 1] = rgbComps[1];
              data[i + 2] = rgbComps[2];
              data[i + 3] = 255;
            }
          }
          ctx.putImageData(imgData, 0, 0);
          const left = mapRange(hsvComps[1], 0, 100, 0, 100);
          this.markerElem_.style.left = `${left}%`;
          const top = mapRange(hsvComps[2], 0, 100, 100, 0);
          this.markerElem_.style.top = `${top}%`;
        }
        onValueChange_() {
          this.update_();
        }
      }
      __name(SvPaletteView, "SvPaletteView");
      class SvPaletteController {
        constructor(doc, config) {
          this.onKeyDown_ = this.onKeyDown_.bind(this);
          this.onKeyUp_ = this.onKeyUp_.bind(this);
          this.onPointerDown_ = this.onPointerDown_.bind(this);
          this.onPointerMove_ = this.onPointerMove_.bind(this);
          this.onPointerUp_ = this.onPointerUp_.bind(this);
          this.value = config.value;
          this.viewProps = config.viewProps;
          this.view = new SvPaletteView(doc, {
            value: this.value,
            viewProps: this.viewProps
          });
          this.ptHandler_ = new PointerHandler(this.view.element);
          this.ptHandler_.emitter.on("down", this.onPointerDown_);
          this.ptHandler_.emitter.on("move", this.onPointerMove_);
          this.ptHandler_.emitter.on("up", this.onPointerUp_);
          this.view.element.addEventListener("keydown", this.onKeyDown_);
          this.view.element.addEventListener("keyup", this.onKeyUp_);
        }
        handlePointerEvent_(d, opts) {
          if (!d.point) {
            return;
          }
          const saturation = mapRange(d.point.x, 0, d.bounds.width, 0, 100);
          const value = mapRange(d.point.y, 0, d.bounds.height, 100, 0);
          const [h, , , a] = this.value.rawValue.getComponents("hsv");
          this.value.setRawValue(new Color([h, saturation, value, a], "hsv"), opts);
        }
        onPointerDown_(ev) {
          this.handlePointerEvent_(ev.data, {
            forceEmit: false,
            last: false
          });
        }
        onPointerMove_(ev) {
          this.handlePointerEvent_(ev.data, {
            forceEmit: false,
            last: false
          });
        }
        onPointerUp_(ev) {
          this.handlePointerEvent_(ev.data, {
            forceEmit: true,
            last: true
          });
        }
        onKeyDown_(ev) {
          if (isArrowKey(ev.key)) {
            ev.preventDefault();
          }
          const [h, s, v, a] = this.value.rawValue.getComponents("hsv");
          const baseStep = getBaseStepForColor(false);
          const ds = getStepForKey(baseStep, getHorizontalStepKeys(ev));
          const dv = getStepForKey(baseStep, getVerticalStepKeys(ev));
          if (ds === 0 && dv === 0) {
            return;
          }
          this.value.setRawValue(new Color([h, s + ds, v + dv, a], "hsv"), {
            forceEmit: false,
            last: false
          });
        }
        onKeyUp_(ev) {
          const baseStep = getBaseStepForColor(false);
          const ds = getStepForKey(baseStep, getHorizontalStepKeys(ev));
          const dv = getStepForKey(baseStep, getVerticalStepKeys(ev));
          if (ds === 0 && dv === 0) {
            return;
          }
          this.value.setRawValue(this.value.rawValue, {
            forceEmit: true,
            last: true
          });
        }
      }
      __name(SvPaletteController, "SvPaletteController");
      class ColorPickerController {
        constructor(doc, config) {
          this.value = config.value;
          this.viewProps = config.viewProps;
          this.hPaletteC_ = new HPaletteController(doc, {
            value: this.value,
            viewProps: this.viewProps
          });
          this.svPaletteC_ = new SvPaletteController(doc, {
            value: this.value,
            viewProps: this.viewProps
          });
          this.alphaIcs_ = config.supportsAlpha ? {
            palette: new APaletteController(doc, {
              value: this.value,
              viewProps: this.viewProps
            }),
            text: new NumberTextController(doc, {
              parser: parseNumber,
              baseStep: 0.1,
              props: ValueMap.fromObject({
                draggingScale: 0.01,
                formatter: createNumberFormatter(2)
              }),
              value: createValue(0, {
                constraint: new RangeConstraint({ min: 0, max: 1 })
              }),
              viewProps: this.viewProps
            })
          } : null;
          if (this.alphaIcs_) {
            connectValues({
              primary: this.value,
              secondary: this.alphaIcs_.text.value,
              forward: (p) => {
                return p.rawValue.getComponents()[3];
              },
              backward: (p, s) => {
                const comps = p.rawValue.getComponents();
                comps[3] = s.rawValue;
                return new Color(comps, p.rawValue.mode);
              }
            });
          }
          this.textC_ = new ColorTextController(doc, {
            parser: parseNumber,
            value: this.value,
            viewProps: this.viewProps
          });
          this.view = new ColorPickerView(doc, {
            alphaViews: this.alphaIcs_ ? {
              palette: this.alphaIcs_.palette.view,
              text: this.alphaIcs_.text.view
            } : null,
            hPaletteView: this.hPaletteC_.view,
            supportsAlpha: config.supportsAlpha,
            svPaletteView: this.svPaletteC_.view,
            textView: this.textC_.view
          });
        }
        get textController() {
          return this.textC_;
        }
      }
      __name(ColorPickerController, "ColorPickerController");
      const className$6 = ClassName("colsw");
      class ColorSwatchView {
        constructor(doc, config) {
          this.onValueChange_ = this.onValueChange_.bind(this);
          config.value.emitter.on("change", this.onValueChange_);
          this.value = config.value;
          this.element = doc.createElement("div");
          this.element.classList.add(className$6());
          config.viewProps.bindClassModifiers(this.element);
          const swatchElem = doc.createElement("div");
          swatchElem.classList.add(className$6("sw"));
          this.element.appendChild(swatchElem);
          this.swatchElem_ = swatchElem;
          const buttonElem = doc.createElement("button");
          buttonElem.classList.add(className$6("b"));
          config.viewProps.bindDisabled(buttonElem);
          this.element.appendChild(buttonElem);
          this.buttonElement = buttonElem;
          this.update_();
        }
        update_() {
          const value = this.value.rawValue;
          this.swatchElem_.style.backgroundColor = colorToHexRgbaString(value);
        }
        onValueChange_() {
          this.update_();
        }
      }
      __name(ColorSwatchView, "ColorSwatchView");
      class ColorSwatchController {
        constructor(doc, config) {
          this.value = config.value;
          this.viewProps = config.viewProps;
          this.view = new ColorSwatchView(doc, {
            value: this.value,
            viewProps: this.viewProps
          });
        }
      }
      __name(ColorSwatchController, "ColorSwatchController");
      class ColorController {
        constructor(doc, config) {
          this.onButtonBlur_ = this.onButtonBlur_.bind(this);
          this.onButtonClick_ = this.onButtonClick_.bind(this);
          this.onPopupChildBlur_ = this.onPopupChildBlur_.bind(this);
          this.onPopupChildKeydown_ = this.onPopupChildKeydown_.bind(this);
          this.value = config.value;
          this.viewProps = config.viewProps;
          this.foldable_ = Foldable.create(config.expanded);
          this.swatchC_ = new ColorSwatchController(doc, {
            value: this.value,
            viewProps: this.viewProps
          });
          const buttonElem = this.swatchC_.view.buttonElement;
          buttonElem.addEventListener("blur", this.onButtonBlur_);
          buttonElem.addEventListener("click", this.onButtonClick_);
          this.textC_ = new TextController(doc, {
            parser: config.parser,
            props: ValueMap.fromObject({
              formatter: config.formatter
            }),
            value: this.value,
            viewProps: this.viewProps
          });
          this.view = new ColorView(doc, {
            foldable: this.foldable_,
            pickerLayout: config.pickerLayout
          });
          this.view.swatchElement.appendChild(this.swatchC_.view.element);
          this.view.textElement.appendChild(this.textC_.view.element);
          this.popC_ = config.pickerLayout === "popup" ? new PopupController(doc, {
            viewProps: this.viewProps
          }) : null;
          const pickerC = new ColorPickerController(doc, {
            supportsAlpha: config.supportsAlpha,
            value: this.value,
            viewProps: this.viewProps
          });
          pickerC.view.allFocusableElements.forEach((elem) => {
            elem.addEventListener("blur", this.onPopupChildBlur_);
            elem.addEventListener("keydown", this.onPopupChildKeydown_);
          });
          this.pickerC_ = pickerC;
          if (this.popC_) {
            this.view.element.appendChild(this.popC_.view.element);
            this.popC_.view.element.appendChild(pickerC.view.element);
            connectValues({
              primary: this.foldable_.value("expanded"),
              secondary: this.popC_.shows,
              forward: (p) => p.rawValue,
              backward: (_, s) => s.rawValue
            });
          } else if (this.view.pickerElement) {
            this.view.pickerElement.appendChild(this.pickerC_.view.element);
            bindFoldable(this.foldable_, this.view.pickerElement);
          }
        }
        get textController() {
          return this.textC_;
        }
        onButtonBlur_(e) {
          if (!this.popC_) {
            return;
          }
          const elem = this.view.element;
          const nextTarget = forceCast(e.relatedTarget);
          if (!nextTarget || !elem.contains(nextTarget)) {
            this.popC_.shows.rawValue = false;
          }
        }
        onButtonClick_() {
          this.foldable_.set("expanded", !this.foldable_.get("expanded"));
          if (this.foldable_.get("expanded")) {
            this.pickerC_.view.allFocusableElements[0].focus();
          }
        }
        onPopupChildBlur_(ev) {
          if (!this.popC_) {
            return;
          }
          const elem = this.popC_.view.element;
          const nextTarget = findNextTarget(ev);
          if (nextTarget && elem.contains(nextTarget)) {
            return;
          }
          if (nextTarget && nextTarget === this.swatchC_.view.buttonElement && !supportsTouch(elem.ownerDocument)) {
            return;
          }
          this.popC_.shows.rawValue = false;
        }
        onPopupChildKeydown_(ev) {
          if (this.popC_) {
            if (ev.key === "Escape") {
              this.popC_.shows.rawValue = false;
            }
          } else if (this.view.pickerElement) {
            if (ev.key === "Escape") {
              this.swatchC_.view.buttonElement.focus();
            }
          }
        }
      }
      __name(ColorController, "ColorController");
      function colorFromObject(value) {
        if (Color.isColorObject(value)) {
          return Color.fromObject(value);
        }
        return Color.black();
      }
      __name(colorFromObject, "colorFromObject");
      function colorToRgbNumber(value) {
        return removeAlphaComponent(value.getComponents("rgb")).reduce((result, comp) => {
          return result << 8 | Math.floor(comp) & 255;
        }, 0);
      }
      __name(colorToRgbNumber, "colorToRgbNumber");
      function colorToRgbaNumber(value) {
        return value.getComponents("rgb").reduce((result, comp, index) => {
          const hex = Math.floor(index === 3 ? comp * 255 : comp) & 255;
          return result << 8 | hex;
        }, 0) >>> 0;
      }
      __name(colorToRgbaNumber, "colorToRgbaNumber");
      function numberToRgbColor(num) {
        return new Color([num >> 16 & 255, num >> 8 & 255, num & 255], "rgb");
      }
      __name(numberToRgbColor, "numberToRgbColor");
      function numberToRgbaColor(num) {
        return new Color([
          num >> 24 & 255,
          num >> 16 & 255,
          num >> 8 & 255,
          mapRange(num & 255, 0, 255, 0, 1)
        ], "rgb");
      }
      __name(numberToRgbaColor, "numberToRgbaColor");
      function colorFromRgbNumber(value) {
        if (typeof value !== "number") {
          return Color.black();
        }
        return numberToRgbColor(value);
      }
      __name(colorFromRgbNumber, "colorFromRgbNumber");
      function colorFromRgbaNumber(value) {
        if (typeof value !== "number") {
          return Color.black();
        }
        return numberToRgbaColor(value);
      }
      __name(colorFromRgbaNumber, "colorFromRgbaNumber");
      function createColorStringWriter(notation) {
        const stringify = getColorStringifier(notation);
        return (target, value) => {
          writePrimitive(target, stringify(value));
        };
      }
      __name(createColorStringWriter, "createColorStringWriter");
      function createColorNumberWriter(supportsAlpha) {
        const colorToNumber = supportsAlpha ? colorToRgbaNumber : colorToRgbNumber;
        return (target, value) => {
          writePrimitive(target, colorToNumber(value));
        };
      }
      __name(createColorNumberWriter, "createColorNumberWriter");
      function writeRgbaColorObject(target, value) {
        const obj = value.toRgbaObject();
        target.writeProperty("r", obj.r);
        target.writeProperty("g", obj.g);
        target.writeProperty("b", obj.b);
        target.writeProperty("a", obj.a);
      }
      __name(writeRgbaColorObject, "writeRgbaColorObject");
      function writeRgbColorObject(target, value) {
        const obj = value.toRgbaObject();
        target.writeProperty("r", obj.r);
        target.writeProperty("g", obj.g);
        target.writeProperty("b", obj.b);
      }
      __name(writeRgbColorObject, "writeRgbColorObject");
      function createColorObjectWriter(supportsAlpha) {
        return supportsAlpha ? writeRgbaColorObject : writeRgbColorObject;
      }
      __name(createColorObjectWriter, "createColorObjectWriter");
      function shouldSupportAlpha$1(inputParams) {
        return "alpha" in inputParams && inputParams.alpha === true;
      }
      __name(shouldSupportAlpha$1, "shouldSupportAlpha$1");
      function createFormatter$1(supportsAlpha) {
        return supportsAlpha ? (v) => colorToHexRgbaString(v, "0x") : (v) => colorToHexRgbString(v, "0x");
      }
      __name(createFormatter$1, "createFormatter$1");
      const NumberColorInputPlugin = {
        id: "input-color-number",
        type: "input",
        accept: (value, params) => {
          if (typeof value !== "number") {
            return null;
          }
          if (!("view" in params)) {
            return null;
          }
          if (params.view !== "color") {
            return null;
          }
          const result = parseColorInputParams(params);
          return result ? {
            initialValue: value,
            params: result
          } : null;
        },
        binding: {
          reader: (args) => {
            return shouldSupportAlpha$1(args.params) ? colorFromRgbaNumber : colorFromRgbNumber;
          },
          equals: Color.equals,
          writer: (args) => {
            return createColorNumberWriter(shouldSupportAlpha$1(args.params));
          }
        },
        controller: (args) => {
          const supportsAlpha = shouldSupportAlpha$1(args.params);
          const expanded = "expanded" in args.params ? args.params.expanded : void 0;
          const picker = "picker" in args.params ? args.params.picker : void 0;
          return new ColorController(args.document, {
            expanded: expanded !== null && expanded !== void 0 ? expanded : false,
            formatter: createFormatter$1(supportsAlpha),
            parser: CompositeColorParser,
            pickerLayout: picker !== null && picker !== void 0 ? picker : "popup",
            supportsAlpha,
            value: args.value,
            viewProps: args.viewProps
          });
        }
      };
      function shouldSupportAlpha(initialValue) {
        return Color.isRgbaColorObject(initialValue);
      }
      __name(shouldSupportAlpha, "shouldSupportAlpha");
      const ObjectColorInputPlugin = {
        id: "input-color-object",
        type: "input",
        accept: (value, params) => {
          if (!Color.isColorObject(value)) {
            return null;
          }
          const result = parseColorInputParams(params);
          return result ? {
            initialValue: value,
            params: result
          } : null;
        },
        binding: {
          reader: (_args) => colorFromObject,
          equals: Color.equals,
          writer: (args) => createColorObjectWriter(shouldSupportAlpha(args.initialValue))
        },
        controller: (args) => {
          const supportsAlpha = Color.isRgbaColorObject(args.initialValue);
          const expanded = "expanded" in args.params ? args.params.expanded : void 0;
          const picker = "picker" in args.params ? args.params.picker : void 0;
          const formatter = supportsAlpha ? colorToHexRgbaString : colorToHexRgbString;
          return new ColorController(args.document, {
            expanded: expanded !== null && expanded !== void 0 ? expanded : false,
            formatter,
            parser: CompositeColorParser,
            pickerLayout: picker !== null && picker !== void 0 ? picker : "popup",
            supportsAlpha,
            value: args.value,
            viewProps: args.viewProps
          });
        }
      };
      const StringColorInputPlugin = {
        id: "input-color-string",
        type: "input",
        accept: (value, params) => {
          if (typeof value !== "string") {
            return null;
          }
          if ("view" in params && params.view === "text") {
            return null;
          }
          const notation = getColorNotation(value);
          if (!notation) {
            return null;
          }
          const result = parseColorInputParams(params);
          return result ? {
            initialValue: value,
            params: result
          } : null;
        },
        binding: {
          reader: (_args) => colorFromString,
          equals: Color.equals,
          writer: (args) => {
            const notation = getColorNotation(args.initialValue);
            if (!notation) {
              throw TpError.shouldNeverHappen();
            }
            return createColorStringWriter(notation);
          }
        },
        controller: (args) => {
          const notation = getColorNotation(args.initialValue);
          if (!notation) {
            throw TpError.shouldNeverHappen();
          }
          const stringifier = getColorStringifier(notation);
          const expanded = "expanded" in args.params ? args.params.expanded : void 0;
          const picker = "picker" in args.params ? args.params.picker : void 0;
          return new ColorController(args.document, {
            expanded: expanded !== null && expanded !== void 0 ? expanded : false,
            formatter: stringifier,
            parser: CompositeColorParser,
            pickerLayout: picker !== null && picker !== void 0 ? picker : "popup",
            supportsAlpha: hasAlphaComponent(notation),
            value: args.value,
            viewProps: args.viewProps
          });
        }
      };
      class PointNdConstraint {
        constructor(config) {
          this.components = config.components;
          this.asm_ = config.assembly;
        }
        constrain(value) {
          const comps = this.asm_.toComponents(value).map((comp, index) => {
            var _a, _b;
            return (_b = (_a = this.components[index]) === null || _a === void 0 ? void 0 : _a.constrain(comp)) !== null && _b !== void 0 ? _b : comp;
          });
          return this.asm_.fromComponents(comps);
        }
      }
      __name(PointNdConstraint, "PointNdConstraint");
      const className$5 = ClassName("pndtxt");
      class PointNdTextView {
        constructor(doc, config) {
          this.textViews = config.textViews;
          this.element = doc.createElement("div");
          this.element.classList.add(className$5());
          this.textViews.forEach((v) => {
            const axisElem = doc.createElement("div");
            axisElem.classList.add(className$5("a"));
            axisElem.appendChild(v.element);
            this.element.appendChild(axisElem);
          });
        }
      }
      __name(PointNdTextView, "PointNdTextView");
      function createAxisController(doc, config, index) {
        return new NumberTextController(doc, {
          arrayPosition: index === 0 ? "fst" : index === config.axes.length - 1 ? "lst" : "mid",
          baseStep: config.axes[index].baseStep,
          parser: config.parser,
          props: config.axes[index].textProps,
          value: createValue(0, {
            constraint: config.axes[index].constraint
          }),
          viewProps: config.viewProps
        });
      }
      __name(createAxisController, "createAxisController");
      class PointNdTextController {
        constructor(doc, config) {
          this.value = config.value;
          this.viewProps = config.viewProps;
          this.acs_ = config.axes.map((_, index) => createAxisController(doc, config, index));
          this.acs_.forEach((c, index) => {
            connectValues({
              primary: this.value,
              secondary: c.value,
              forward: (p) => {
                return config.assembly.toComponents(p.rawValue)[index];
              },
              backward: (p, s) => {
                const comps = config.assembly.toComponents(p.rawValue);
                comps[index] = s.rawValue;
                return config.assembly.fromComponents(comps);
              }
            });
          });
          this.view = new PointNdTextView(doc, {
            textViews: this.acs_.map((ac) => ac.view)
          });
        }
      }
      __name(PointNdTextController, "PointNdTextController");
      function createStepConstraint(params) {
        if ("step" in params && !isEmpty(params.step)) {
          return new StepConstraint(params.step);
        }
        return null;
      }
      __name(createStepConstraint, "createStepConstraint");
      function createRangeConstraint(params) {
        if ("max" in params && !isEmpty(params.max) || "min" in params && !isEmpty(params.min)) {
          return new RangeConstraint({
            max: params.max,
            min: params.min
          });
        }
        return null;
      }
      __name(createRangeConstraint, "createRangeConstraint");
      function createConstraint$4(params) {
        const constraints = [];
        const sc = createStepConstraint(params);
        if (sc) {
          constraints.push(sc);
        }
        const rc = createRangeConstraint(params);
        if (rc) {
          constraints.push(rc);
        }
        const lc = createListConstraint(params.options);
        if (lc) {
          constraints.push(lc);
        }
        return new CompositeConstraint(constraints);
      }
      __name(createConstraint$4, "createConstraint$4");
      function findRange(constraint) {
        const c = constraint ? findConstraint(constraint, RangeConstraint) : null;
        if (!c) {
          return [void 0, void 0];
        }
        return [c.minValue, c.maxValue];
      }
      __name(findRange, "findRange");
      function estimateSuitableRange(constraint) {
        const [min, max] = findRange(constraint);
        return [min !== null && min !== void 0 ? min : 0, max !== null && max !== void 0 ? max : 100];
      }
      __name(estimateSuitableRange, "estimateSuitableRange");
      const NumberInputPlugin = {
        id: "input-number",
        type: "input",
        accept: (value, params) => {
          if (typeof value !== "number") {
            return null;
          }
          const p = ParamsParsers;
          const result = parseParams(params, {
            format: p.optional.function,
            max: p.optional.number,
            min: p.optional.number,
            options: p.optional.custom(parseListOptions),
            step: p.optional.number
          });
          return result ? {
            initialValue: value,
            params: result
          } : null;
        },
        binding: {
          reader: (_args) => numberFromUnknown,
          constraint: (args) => createConstraint$4(args.params),
          writer: (_args) => writePrimitive
        },
        controller: (args) => {
          var _a, _b;
          const value = args.value;
          const c = args.constraint;
          if (c && findConstraint(c, ListConstraint)) {
            return new ListController(args.document, {
              props: ValueMap.fromObject({
                options: (_a = findListItems(c)) !== null && _a !== void 0 ? _a : []
              }),
              value,
              viewProps: args.viewProps
            });
          }
          const formatter = (_b = "format" in args.params ? args.params.format : void 0) !== null && _b !== void 0 ? _b : createNumberFormatter(getSuitableDecimalDigits(c, value.rawValue));
          if (c && findConstraint(c, RangeConstraint)) {
            const [min, max] = estimateSuitableRange(c);
            return new SliderTextController(args.document, {
              baseStep: getBaseStep(c),
              parser: parseNumber,
              sliderProps: ValueMap.fromObject({
                maxValue: max,
                minValue: min
              }),
              textProps: ValueMap.fromObject({
                draggingScale: getSuitableDraggingScale(c, value.rawValue),
                formatter
              }),
              value,
              viewProps: args.viewProps
            });
          }
          return new NumberTextController(args.document, {
            baseStep: getBaseStep(c),
            parser: parseNumber,
            props: ValueMap.fromObject({
              draggingScale: getSuitableDraggingScale(c, value.rawValue),
              formatter
            }),
            value,
            viewProps: args.viewProps
          });
        }
      };
      class Point2d {
        constructor(x = 0, y = 0) {
          this.x = x;
          this.y = y;
        }
        getComponents() {
          return [this.x, this.y];
        }
        static isObject(obj) {
          if (isEmpty(obj)) {
            return false;
          }
          const x = obj.x;
          const y = obj.y;
          if (typeof x !== "number" || typeof y !== "number") {
            return false;
          }
          return true;
        }
        static equals(v1, v2) {
          return v1.x === v2.x && v1.y === v2.y;
        }
        toObject() {
          return {
            x: this.x,
            y: this.y
          };
        }
      }
      __name(Point2d, "Point2d");
      const Point2dAssembly = {
        toComponents: (p) => p.getComponents(),
        fromComponents: (comps) => new Point2d(...comps)
      };
      const className$4 = ClassName("p2d");
      class Point2dView {
        constructor(doc, config) {
          this.element = doc.createElement("div");
          this.element.classList.add(className$4());
          config.viewProps.bindClassModifiers(this.element);
          bindValue(config.expanded, valueToClassName(this.element, className$4(void 0, "expanded")));
          const headElem = doc.createElement("div");
          headElem.classList.add(className$4("h"));
          this.element.appendChild(headElem);
          const buttonElem = doc.createElement("button");
          buttonElem.classList.add(className$4("b"));
          buttonElem.appendChild(createSvgIconElement(doc, "p2dpad"));
          config.viewProps.bindDisabled(buttonElem);
          headElem.appendChild(buttonElem);
          this.buttonElement = buttonElem;
          const textElem = doc.createElement("div");
          textElem.classList.add(className$4("t"));
          headElem.appendChild(textElem);
          this.textElement = textElem;
          if (config.pickerLayout === "inline") {
            const pickerElem = doc.createElement("div");
            pickerElem.classList.add(className$4("p"));
            this.element.appendChild(pickerElem);
            this.pickerElement = pickerElem;
          } else {
            this.pickerElement = null;
          }
        }
      }
      __name(Point2dView, "Point2dView");
      const className$3 = ClassName("p2dp");
      class Point2dPickerView {
        constructor(doc, config) {
          this.onFoldableChange_ = this.onFoldableChange_.bind(this);
          this.onValueChange_ = this.onValueChange_.bind(this);
          this.invertsY_ = config.invertsY;
          this.maxValue_ = config.maxValue;
          this.element = doc.createElement("div");
          this.element.classList.add(className$3());
          if (config.layout === "popup") {
            this.element.classList.add(className$3(void 0, "p"));
          }
          const padElem = doc.createElement("div");
          padElem.classList.add(className$3("p"));
          config.viewProps.bindTabIndex(padElem);
          this.element.appendChild(padElem);
          this.padElement = padElem;
          const svgElem = doc.createElementNS(SVG_NS, "svg");
          svgElem.classList.add(className$3("g"));
          this.padElement.appendChild(svgElem);
          this.svgElem_ = svgElem;
          const xAxisElem = doc.createElementNS(SVG_NS, "line");
          xAxisElem.classList.add(className$3("ax"));
          xAxisElem.setAttributeNS(null, "x1", "0");
          xAxisElem.setAttributeNS(null, "y1", "50%");
          xAxisElem.setAttributeNS(null, "x2", "100%");
          xAxisElem.setAttributeNS(null, "y2", "50%");
          this.svgElem_.appendChild(xAxisElem);
          const yAxisElem = doc.createElementNS(SVG_NS, "line");
          yAxisElem.classList.add(className$3("ax"));
          yAxisElem.setAttributeNS(null, "x1", "50%");
          yAxisElem.setAttributeNS(null, "y1", "0");
          yAxisElem.setAttributeNS(null, "x2", "50%");
          yAxisElem.setAttributeNS(null, "y2", "100%");
          this.svgElem_.appendChild(yAxisElem);
          const lineElem = doc.createElementNS(SVG_NS, "line");
          lineElem.classList.add(className$3("l"));
          lineElem.setAttributeNS(null, "x1", "50%");
          lineElem.setAttributeNS(null, "y1", "50%");
          this.svgElem_.appendChild(lineElem);
          this.lineElem_ = lineElem;
          const markerElem = doc.createElement("div");
          markerElem.classList.add(className$3("m"));
          this.padElement.appendChild(markerElem);
          this.markerElem_ = markerElem;
          config.value.emitter.on("change", this.onValueChange_);
          this.value = config.value;
          this.update_();
        }
        get allFocusableElements() {
          return [this.padElement];
        }
        update_() {
          const [x, y] = this.value.rawValue.getComponents();
          const max = this.maxValue_;
          const px = mapRange(x, -max, +max, 0, 100);
          const py = mapRange(y, -max, +max, 0, 100);
          const ipy = this.invertsY_ ? 100 - py : py;
          this.lineElem_.setAttributeNS(null, "x2", `${px}%`);
          this.lineElem_.setAttributeNS(null, "y2", `${ipy}%`);
          this.markerElem_.style.left = `${px}%`;
          this.markerElem_.style.top = `${ipy}%`;
        }
        onValueChange_() {
          this.update_();
        }
        onFoldableChange_() {
          this.update_();
        }
      }
      __name(Point2dPickerView, "Point2dPickerView");
      function computeOffset(ev, baseSteps, invertsY) {
        return [
          getStepForKey(baseSteps[0], getHorizontalStepKeys(ev)),
          getStepForKey(baseSteps[1], getVerticalStepKeys(ev)) * (invertsY ? 1 : -1)
        ];
      }
      __name(computeOffset, "computeOffset");
      class Point2dPickerController {
        constructor(doc, config) {
          this.onPadKeyDown_ = this.onPadKeyDown_.bind(this);
          this.onPadKeyUp_ = this.onPadKeyUp_.bind(this);
          this.onPointerDown_ = this.onPointerDown_.bind(this);
          this.onPointerMove_ = this.onPointerMove_.bind(this);
          this.onPointerUp_ = this.onPointerUp_.bind(this);
          this.value = config.value;
          this.viewProps = config.viewProps;
          this.baseSteps_ = config.baseSteps;
          this.maxValue_ = config.maxValue;
          this.invertsY_ = config.invertsY;
          this.view = new Point2dPickerView(doc, {
            invertsY: this.invertsY_,
            layout: config.layout,
            maxValue: this.maxValue_,
            value: this.value,
            viewProps: this.viewProps
          });
          this.ptHandler_ = new PointerHandler(this.view.padElement);
          this.ptHandler_.emitter.on("down", this.onPointerDown_);
          this.ptHandler_.emitter.on("move", this.onPointerMove_);
          this.ptHandler_.emitter.on("up", this.onPointerUp_);
          this.view.padElement.addEventListener("keydown", this.onPadKeyDown_);
          this.view.padElement.addEventListener("keyup", this.onPadKeyUp_);
        }
        handlePointerEvent_(d, opts) {
          if (!d.point) {
            return;
          }
          const max = this.maxValue_;
          const px = mapRange(d.point.x, 0, d.bounds.width, -max, +max);
          const py = mapRange(this.invertsY_ ? d.bounds.height - d.point.y : d.point.y, 0, d.bounds.height, -max, +max);
          this.value.setRawValue(new Point2d(px, py), opts);
        }
        onPointerDown_(ev) {
          this.handlePointerEvent_(ev.data, {
            forceEmit: false,
            last: false
          });
        }
        onPointerMove_(ev) {
          this.handlePointerEvent_(ev.data, {
            forceEmit: false,
            last: false
          });
        }
        onPointerUp_(ev) {
          this.handlePointerEvent_(ev.data, {
            forceEmit: true,
            last: true
          });
        }
        onPadKeyDown_(ev) {
          if (isArrowKey(ev.key)) {
            ev.preventDefault();
          }
          const [dx, dy] = computeOffset(ev, this.baseSteps_, this.invertsY_);
          if (dx === 0 && dy === 0) {
            return;
          }
          this.value.setRawValue(new Point2d(this.value.rawValue.x + dx, this.value.rawValue.y + dy), {
            forceEmit: false,
            last: false
          });
        }
        onPadKeyUp_(ev) {
          const [dx, dy] = computeOffset(ev, this.baseSteps_, this.invertsY_);
          if (dx === 0 && dy === 0) {
            return;
          }
          this.value.setRawValue(this.value.rawValue, {
            forceEmit: true,
            last: true
          });
        }
      }
      __name(Point2dPickerController, "Point2dPickerController");
      class Point2dController {
        constructor(doc, config) {
          var _a, _b;
          this.onPopupChildBlur_ = this.onPopupChildBlur_.bind(this);
          this.onPopupChildKeydown_ = this.onPopupChildKeydown_.bind(this);
          this.onPadButtonBlur_ = this.onPadButtonBlur_.bind(this);
          this.onPadButtonClick_ = this.onPadButtonClick_.bind(this);
          this.value = config.value;
          this.viewProps = config.viewProps;
          this.foldable_ = Foldable.create(config.expanded);
          this.popC_ = config.pickerLayout === "popup" ? new PopupController(doc, {
            viewProps: this.viewProps
          }) : null;
          const padC = new Point2dPickerController(doc, {
            baseSteps: [config.axes[0].baseStep, config.axes[1].baseStep],
            invertsY: config.invertsY,
            layout: config.pickerLayout,
            maxValue: config.maxValue,
            value: this.value,
            viewProps: this.viewProps
          });
          padC.view.allFocusableElements.forEach((elem) => {
            elem.addEventListener("blur", this.onPopupChildBlur_);
            elem.addEventListener("keydown", this.onPopupChildKeydown_);
          });
          this.pickerC_ = padC;
          this.textC_ = new PointNdTextController(doc, {
            assembly: Point2dAssembly,
            axes: config.axes,
            parser: config.parser,
            value: this.value,
            viewProps: this.viewProps
          });
          this.view = new Point2dView(doc, {
            expanded: this.foldable_.value("expanded"),
            pickerLayout: config.pickerLayout,
            viewProps: this.viewProps
          });
          this.view.textElement.appendChild(this.textC_.view.element);
          (_a = this.view.buttonElement) === null || _a === void 0 ? void 0 : _a.addEventListener("blur", this.onPadButtonBlur_);
          (_b = this.view.buttonElement) === null || _b === void 0 ? void 0 : _b.addEventListener("click", this.onPadButtonClick_);
          if (this.popC_) {
            this.view.element.appendChild(this.popC_.view.element);
            this.popC_.view.element.appendChild(this.pickerC_.view.element);
            connectValues({
              primary: this.foldable_.value("expanded"),
              secondary: this.popC_.shows,
              forward: (p) => p.rawValue,
              backward: (_, s) => s.rawValue
            });
          } else if (this.view.pickerElement) {
            this.view.pickerElement.appendChild(this.pickerC_.view.element);
            bindFoldable(this.foldable_, this.view.pickerElement);
          }
        }
        onPadButtonBlur_(e) {
          if (!this.popC_) {
            return;
          }
          const elem = this.view.element;
          const nextTarget = forceCast(e.relatedTarget);
          if (!nextTarget || !elem.contains(nextTarget)) {
            this.popC_.shows.rawValue = false;
          }
        }
        onPadButtonClick_() {
          this.foldable_.set("expanded", !this.foldable_.get("expanded"));
          if (this.foldable_.get("expanded")) {
            this.pickerC_.view.allFocusableElements[0].focus();
          }
        }
        onPopupChildBlur_(ev) {
          if (!this.popC_) {
            return;
          }
          const elem = this.popC_.view.element;
          const nextTarget = findNextTarget(ev);
          if (nextTarget && elem.contains(nextTarget)) {
            return;
          }
          if (nextTarget && nextTarget === this.view.buttonElement && !supportsTouch(elem.ownerDocument)) {
            return;
          }
          this.popC_.shows.rawValue = false;
        }
        onPopupChildKeydown_(ev) {
          if (this.popC_) {
            if (ev.key === "Escape") {
              this.popC_.shows.rawValue = false;
            }
          } else if (this.view.pickerElement) {
            if (ev.key === "Escape") {
              this.view.buttonElement.focus();
            }
          }
        }
      }
      __name(Point2dController, "Point2dController");
      function point2dFromUnknown(value) {
        return Point2d.isObject(value) ? new Point2d(value.x, value.y) : new Point2d();
      }
      __name(point2dFromUnknown, "point2dFromUnknown");
      function writePoint2d(target, value) {
        target.writeProperty("x", value.x);
        target.writeProperty("y", value.y);
      }
      __name(writePoint2d, "writePoint2d");
      function createDimensionConstraint$2(params) {
        if (!params) {
          return void 0;
        }
        const constraints = [];
        if (!isEmpty(params.step)) {
          constraints.push(new StepConstraint(params.step));
        }
        if (!isEmpty(params.max) || !isEmpty(params.min)) {
          constraints.push(new RangeConstraint({
            max: params.max,
            min: params.min
          }));
        }
        return new CompositeConstraint(constraints);
      }
      __name(createDimensionConstraint$2, "createDimensionConstraint$2");
      function createConstraint$3(params) {
        return new PointNdConstraint({
          assembly: Point2dAssembly,
          components: [
            createDimensionConstraint$2("x" in params ? params.x : void 0),
            createDimensionConstraint$2("y" in params ? params.y : void 0)
          ]
        });
      }
      __name(createConstraint$3, "createConstraint$3");
      function getSuitableMaxDimensionValue(constraint, rawValue) {
        const rc = constraint && findConstraint(constraint, RangeConstraint);
        if (rc) {
          return Math.max(Math.abs(rc.minValue || 0), Math.abs(rc.maxValue || 0));
        }
        const step = getBaseStep(constraint);
        return Math.max(Math.abs(step) * 10, Math.abs(rawValue) * 10);
      }
      __name(getSuitableMaxDimensionValue, "getSuitableMaxDimensionValue");
      function getSuitableMaxValue(initialValue, constraint) {
        const xc = constraint instanceof PointNdConstraint ? constraint.components[0] : void 0;
        const yc = constraint instanceof PointNdConstraint ? constraint.components[1] : void 0;
        const xr = getSuitableMaxDimensionValue(xc, initialValue.x);
        const yr = getSuitableMaxDimensionValue(yc, initialValue.y);
        return Math.max(xr, yr);
      }
      __name(getSuitableMaxValue, "getSuitableMaxValue");
      function createAxis$2(initialValue, constraint) {
        return {
          baseStep: getBaseStep(constraint),
          constraint,
          textProps: ValueMap.fromObject({
            draggingScale: getSuitableDraggingScale(constraint, initialValue),
            formatter: createNumberFormatter(getSuitableDecimalDigits(constraint, initialValue))
          })
        };
      }
      __name(createAxis$2, "createAxis$2");
      function shouldInvertY(params) {
        if (!("y" in params)) {
          return false;
        }
        const yParams = params.y;
        if (!yParams) {
          return false;
        }
        return "inverted" in yParams ? !!yParams.inverted : false;
      }
      __name(shouldInvertY, "shouldInvertY");
      const Point2dInputPlugin = {
        id: "input-point2d",
        type: "input",
        accept: (value, params) => {
          if (!Point2d.isObject(value)) {
            return null;
          }
          const p = ParamsParsers;
          const result = parseParams(params, {
            expanded: p.optional.boolean,
            picker: p.optional.custom(parsePickerLayout),
            x: p.optional.custom(parsePointDimensionParams),
            y: p.optional.object({
              inverted: p.optional.boolean,
              max: p.optional.number,
              min: p.optional.number,
              step: p.optional.number
            })
          });
          return result ? {
            initialValue: value,
            params: result
          } : null;
        },
        binding: {
          reader: (_args) => point2dFromUnknown,
          constraint: (args) => createConstraint$3(args.params),
          equals: Point2d.equals,
          writer: (_args) => writePoint2d
        },
        controller: (args) => {
          const doc = args.document;
          const value = args.value;
          const c = args.constraint;
          if (!(c instanceof PointNdConstraint)) {
            throw TpError.shouldNeverHappen();
          }
          const expanded = "expanded" in args.params ? args.params.expanded : void 0;
          const picker = "picker" in args.params ? args.params.picker : void 0;
          return new Point2dController(doc, {
            axes: [
              createAxis$2(value.rawValue.x, c.components[0]),
              createAxis$2(value.rawValue.y, c.components[1])
            ],
            expanded: expanded !== null && expanded !== void 0 ? expanded : false,
            invertsY: shouldInvertY(args.params),
            maxValue: getSuitableMaxValue(value.rawValue, c),
            parser: parseNumber,
            pickerLayout: picker !== null && picker !== void 0 ? picker : "popup",
            value,
            viewProps: args.viewProps
          });
        }
      };
      class Point3d {
        constructor(x = 0, y = 0, z = 0) {
          this.x = x;
          this.y = y;
          this.z = z;
        }
        getComponents() {
          return [this.x, this.y, this.z];
        }
        static isObject(obj) {
          if (isEmpty(obj)) {
            return false;
          }
          const x = obj.x;
          const y = obj.y;
          const z = obj.z;
          if (typeof x !== "number" || typeof y !== "number" || typeof z !== "number") {
            return false;
          }
          return true;
        }
        static equals(v1, v2) {
          return v1.x === v2.x && v1.y === v2.y && v1.z === v2.z;
        }
        toObject() {
          return {
            x: this.x,
            y: this.y,
            z: this.z
          };
        }
      }
      __name(Point3d, "Point3d");
      const Point3dAssembly = {
        toComponents: (p) => p.getComponents(),
        fromComponents: (comps) => new Point3d(...comps)
      };
      function point3dFromUnknown(value) {
        return Point3d.isObject(value) ? new Point3d(value.x, value.y, value.z) : new Point3d();
      }
      __name(point3dFromUnknown, "point3dFromUnknown");
      function writePoint3d(target, value) {
        target.writeProperty("x", value.x);
        target.writeProperty("y", value.y);
        target.writeProperty("z", value.z);
      }
      __name(writePoint3d, "writePoint3d");
      function createDimensionConstraint$1(params) {
        if (!params) {
          return void 0;
        }
        const constraints = [];
        if (!isEmpty(params.step)) {
          constraints.push(new StepConstraint(params.step));
        }
        if (!isEmpty(params.max) || !isEmpty(params.min)) {
          constraints.push(new RangeConstraint({
            max: params.max,
            min: params.min
          }));
        }
        return new CompositeConstraint(constraints);
      }
      __name(createDimensionConstraint$1, "createDimensionConstraint$1");
      function createConstraint$2(params) {
        return new PointNdConstraint({
          assembly: Point3dAssembly,
          components: [
            createDimensionConstraint$1("x" in params ? params.x : void 0),
            createDimensionConstraint$1("y" in params ? params.y : void 0),
            createDimensionConstraint$1("z" in params ? params.z : void 0)
          ]
        });
      }
      __name(createConstraint$2, "createConstraint$2");
      function createAxis$1(initialValue, constraint) {
        return {
          baseStep: getBaseStep(constraint),
          constraint,
          textProps: ValueMap.fromObject({
            draggingScale: getSuitableDraggingScale(constraint, initialValue),
            formatter: createNumberFormatter(getSuitableDecimalDigits(constraint, initialValue))
          })
        };
      }
      __name(createAxis$1, "createAxis$1");
      const Point3dInputPlugin = {
        id: "input-point3d",
        type: "input",
        accept: (value, params) => {
          if (!Point3d.isObject(value)) {
            return null;
          }
          const p = ParamsParsers;
          const result = parseParams(params, {
            x: p.optional.custom(parsePointDimensionParams),
            y: p.optional.custom(parsePointDimensionParams),
            z: p.optional.custom(parsePointDimensionParams)
          });
          return result ? {
            initialValue: value,
            params: result
          } : null;
        },
        binding: {
          reader: (_args) => point3dFromUnknown,
          constraint: (args) => createConstraint$2(args.params),
          equals: Point3d.equals,
          writer: (_args) => writePoint3d
        },
        controller: (args) => {
          const value = args.value;
          const c = args.constraint;
          if (!(c instanceof PointNdConstraint)) {
            throw TpError.shouldNeverHappen();
          }
          return new PointNdTextController(args.document, {
            assembly: Point3dAssembly,
            axes: [
              createAxis$1(value.rawValue.x, c.components[0]),
              createAxis$1(value.rawValue.y, c.components[1]),
              createAxis$1(value.rawValue.z, c.components[2])
            ],
            parser: parseNumber,
            value,
            viewProps: args.viewProps
          });
        }
      };
      class Point4d {
        constructor(x = 0, y = 0, z = 0, w = 0) {
          this.x = x;
          this.y = y;
          this.z = z;
          this.w = w;
        }
        getComponents() {
          return [this.x, this.y, this.z, this.w];
        }
        static isObject(obj) {
          if (isEmpty(obj)) {
            return false;
          }
          const x = obj.x;
          const y = obj.y;
          const z = obj.z;
          const w = obj.w;
          if (typeof x !== "number" || typeof y !== "number" || typeof z !== "number" || typeof w !== "number") {
            return false;
          }
          return true;
        }
        static equals(v1, v2) {
          return v1.x === v2.x && v1.y === v2.y && v1.z === v2.z && v1.w === v2.w;
        }
        toObject() {
          return {
            x: this.x,
            y: this.y,
            z: this.z,
            w: this.w
          };
        }
      }
      __name(Point4d, "Point4d");
      const Point4dAssembly = {
        toComponents: (p) => p.getComponents(),
        fromComponents: (comps) => new Point4d(...comps)
      };
      function point4dFromUnknown(value) {
        return Point4d.isObject(value) ? new Point4d(value.x, value.y, value.z, value.w) : new Point4d();
      }
      __name(point4dFromUnknown, "point4dFromUnknown");
      function writePoint4d(target, value) {
        target.writeProperty("x", value.x);
        target.writeProperty("y", value.y);
        target.writeProperty("z", value.z);
        target.writeProperty("w", value.w);
      }
      __name(writePoint4d, "writePoint4d");
      function createDimensionConstraint(params) {
        if (!params) {
          return void 0;
        }
        const constraints = [];
        if (!isEmpty(params.step)) {
          constraints.push(new StepConstraint(params.step));
        }
        if (!isEmpty(params.max) || !isEmpty(params.min)) {
          constraints.push(new RangeConstraint({
            max: params.max,
            min: params.min
          }));
        }
        return new CompositeConstraint(constraints);
      }
      __name(createDimensionConstraint, "createDimensionConstraint");
      function createConstraint$1(params) {
        return new PointNdConstraint({
          assembly: Point4dAssembly,
          components: [
            createDimensionConstraint("x" in params ? params.x : void 0),
            createDimensionConstraint("y" in params ? params.y : void 0),
            createDimensionConstraint("z" in params ? params.z : void 0),
            createDimensionConstraint("w" in params ? params.w : void 0)
          ]
        });
      }
      __name(createConstraint$1, "createConstraint$1");
      function createAxis(initialValue, constraint) {
        return {
          baseStep: getBaseStep(constraint),
          constraint,
          textProps: ValueMap.fromObject({
            draggingScale: getSuitableDraggingScale(constraint, initialValue),
            formatter: createNumberFormatter(getSuitableDecimalDigits(constraint, initialValue))
          })
        };
      }
      __name(createAxis, "createAxis");
      const Point4dInputPlugin = {
        id: "input-point4d",
        type: "input",
        accept: (value, params) => {
          if (!Point4d.isObject(value)) {
            return null;
          }
          const p = ParamsParsers;
          const result = parseParams(params, {
            x: p.optional.custom(parsePointDimensionParams),
            y: p.optional.custom(parsePointDimensionParams),
            z: p.optional.custom(parsePointDimensionParams),
            w: p.optional.custom(parsePointDimensionParams)
          });
          return result ? {
            initialValue: value,
            params: result
          } : null;
        },
        binding: {
          reader: (_args) => point4dFromUnknown,
          constraint: (args) => createConstraint$1(args.params),
          equals: Point4d.equals,
          writer: (_args) => writePoint4d
        },
        controller: (args) => {
          const value = args.value;
          const c = args.constraint;
          if (!(c instanceof PointNdConstraint)) {
            throw TpError.shouldNeverHappen();
          }
          return new PointNdTextController(args.document, {
            assembly: Point4dAssembly,
            axes: value.rawValue.getComponents().map((comp, index) => createAxis(comp, c.components[index])),
            parser: parseNumber,
            value,
            viewProps: args.viewProps
          });
        }
      };
      function createConstraint(params) {
        const constraints = [];
        const lc = createListConstraint(params.options);
        if (lc) {
          constraints.push(lc);
        }
        return new CompositeConstraint(constraints);
      }
      __name(createConstraint, "createConstraint");
      const StringInputPlugin = {
        id: "input-string",
        type: "input",
        accept: (value, params) => {
          if (typeof value !== "string") {
            return null;
          }
          const p = ParamsParsers;
          const result = parseParams(params, {
            options: p.optional.custom(parseListOptions)
          });
          return result ? {
            initialValue: value,
            params: result
          } : null;
        },
        binding: {
          reader: (_args) => stringFromUnknown,
          constraint: (args) => createConstraint(args.params),
          writer: (_args) => writePrimitive
        },
        controller: (args) => {
          var _a;
          const doc = args.document;
          const value = args.value;
          const c = args.constraint;
          if (c && findConstraint(c, ListConstraint)) {
            return new ListController(doc, {
              props: ValueMap.fromObject({
                options: (_a = findListItems(c)) !== null && _a !== void 0 ? _a : []
              }),
              value,
              viewProps: args.viewProps
            });
          }
          return new TextController(doc, {
            parser: (v) => v,
            props: ValueMap.fromObject({
              formatter: formatString
            }),
            value,
            viewProps: args.viewProps
          });
        }
      };
      const Constants = {
        monitor: {
          defaultInterval: 200,
          defaultLineCount: 3
        }
      };
      const className$2 = ClassName("mll");
      class MultiLogView {
        constructor(doc, config) {
          this.onValueUpdate_ = this.onValueUpdate_.bind(this);
          this.formatter_ = config.formatter;
          this.element = doc.createElement("div");
          this.element.classList.add(className$2());
          config.viewProps.bindClassModifiers(this.element);
          const textareaElem = doc.createElement("textarea");
          textareaElem.classList.add(className$2("i"));
          textareaElem.style.height = `calc(var(--bld-us) * ${config.lineCount})`;
          textareaElem.readOnly = true;
          config.viewProps.bindDisabled(textareaElem);
          this.element.appendChild(textareaElem);
          this.textareaElem_ = textareaElem;
          config.value.emitter.on("change", this.onValueUpdate_);
          this.value = config.value;
          this.update_();
        }
        update_() {
          const elem = this.textareaElem_;
          const shouldScroll = elem.scrollTop === elem.scrollHeight - elem.clientHeight;
          const lines = [];
          this.value.rawValue.forEach((value) => {
            if (value !== void 0) {
              lines.push(this.formatter_(value));
            }
          });
          elem.textContent = lines.join("\n");
          if (shouldScroll) {
            elem.scrollTop = elem.scrollHeight;
          }
        }
        onValueUpdate_() {
          this.update_();
        }
      }
      __name(MultiLogView, "MultiLogView");
      class MultiLogController {
        constructor(doc, config) {
          this.value = config.value;
          this.viewProps = config.viewProps;
          this.view = new MultiLogView(doc, {
            formatter: config.formatter,
            lineCount: config.lineCount,
            value: this.value,
            viewProps: this.viewProps
          });
        }
      }
      __name(MultiLogController, "MultiLogController");
      const className$1 = ClassName("sgl");
      class SingleLogView {
        constructor(doc, config) {
          this.onValueUpdate_ = this.onValueUpdate_.bind(this);
          this.formatter_ = config.formatter;
          this.element = doc.createElement("div");
          this.element.classList.add(className$1());
          config.viewProps.bindClassModifiers(this.element);
          const inputElem = doc.createElement("input");
          inputElem.classList.add(className$1("i"));
          inputElem.readOnly = true;
          inputElem.type = "text";
          config.viewProps.bindDisabled(inputElem);
          this.element.appendChild(inputElem);
          this.inputElement = inputElem;
          config.value.emitter.on("change", this.onValueUpdate_);
          this.value = config.value;
          this.update_();
        }
        update_() {
          const values = this.value.rawValue;
          const lastValue = values[values.length - 1];
          this.inputElement.value = lastValue !== void 0 ? this.formatter_(lastValue) : "";
        }
        onValueUpdate_() {
          this.update_();
        }
      }
      __name(SingleLogView, "SingleLogView");
      class SingleLogController {
        constructor(doc, config) {
          this.value = config.value;
          this.viewProps = config.viewProps;
          this.view = new SingleLogView(doc, {
            formatter: config.formatter,
            value: this.value,
            viewProps: this.viewProps
          });
        }
      }
      __name(SingleLogController, "SingleLogController");
      const BooleanMonitorPlugin = {
        id: "monitor-bool",
        type: "monitor",
        accept: (value, params) => {
          if (typeof value !== "boolean") {
            return null;
          }
          const p = ParamsParsers;
          const result = parseParams(params, {
            lineCount: p.optional.number
          });
          return result ? {
            initialValue: value,
            params: result
          } : null;
        },
        binding: {
          reader: (_args) => boolFromUnknown
        },
        controller: (args) => {
          var _a;
          if (args.value.rawValue.length === 1) {
            return new SingleLogController(args.document, {
              formatter: BooleanFormatter,
              value: args.value,
              viewProps: args.viewProps
            });
          }
          return new MultiLogController(args.document, {
            formatter: BooleanFormatter,
            lineCount: (_a = args.params.lineCount) !== null && _a !== void 0 ? _a : Constants.monitor.defaultLineCount,
            value: args.value,
            viewProps: args.viewProps
          });
        }
      };
      class GraphCursor {
        constructor() {
          this.emitter = new Emitter();
          this.index_ = -1;
        }
        get index() {
          return this.index_;
        }
        set index(index) {
          const changed = this.index_ !== index;
          if (changed) {
            this.index_ = index;
            this.emitter.emit("change", {
              index,
              sender: this
            });
          }
        }
      }
      __name(GraphCursor, "GraphCursor");
      const className = ClassName("grl");
      class GraphLogView {
        constructor(doc, config) {
          this.onCursorChange_ = this.onCursorChange_.bind(this);
          this.onValueUpdate_ = this.onValueUpdate_.bind(this);
          this.element = doc.createElement("div");
          this.element.classList.add(className());
          config.viewProps.bindClassModifiers(this.element);
          this.formatter_ = config.formatter;
          this.minValue_ = config.minValue;
          this.maxValue_ = config.maxValue;
          this.cursor_ = config.cursor;
          this.cursor_.emitter.on("change", this.onCursorChange_);
          const svgElem = doc.createElementNS(SVG_NS, "svg");
          svgElem.classList.add(className("g"));
          svgElem.style.height = `calc(var(--bld-us) * ${config.lineCount})`;
          this.element.appendChild(svgElem);
          this.svgElem_ = svgElem;
          const lineElem = doc.createElementNS(SVG_NS, "polyline");
          this.svgElem_.appendChild(lineElem);
          this.lineElem_ = lineElem;
          const tooltipElem = doc.createElement("div");
          tooltipElem.classList.add(className("t"), ClassName("tt")());
          this.element.appendChild(tooltipElem);
          this.tooltipElem_ = tooltipElem;
          config.value.emitter.on("change", this.onValueUpdate_);
          this.value = config.value;
          this.update_();
        }
        get graphElement() {
          return this.svgElem_;
        }
        update_() {
          const bounds = this.svgElem_.getBoundingClientRect();
          const maxIndex = this.value.rawValue.length - 1;
          const min = this.minValue_;
          const max = this.maxValue_;
          const points = [];
          this.value.rawValue.forEach((v, index) => {
            if (v === void 0) {
              return;
            }
            const x = mapRange(index, 0, maxIndex, 0, bounds.width);
            const y = mapRange(v, min, max, bounds.height, 0);
            points.push([x, y].join(","));
          });
          this.lineElem_.setAttributeNS(null, "points", points.join(" "));
          const tooltipElem = this.tooltipElem_;
          const value = this.value.rawValue[this.cursor_.index];
          if (value === void 0) {
            tooltipElem.classList.remove(className("t", "a"));
            return;
          }
          const tx = mapRange(this.cursor_.index, 0, maxIndex, 0, bounds.width);
          const ty = mapRange(value, min, max, bounds.height, 0);
          tooltipElem.style.left = `${tx}px`;
          tooltipElem.style.top = `${ty}px`;
          tooltipElem.textContent = `${this.formatter_(value)}`;
          if (!tooltipElem.classList.contains(className("t", "a"))) {
            tooltipElem.classList.add(className("t", "a"), className("t", "in"));
            forceReflow(tooltipElem);
            tooltipElem.classList.remove(className("t", "in"));
          }
        }
        onValueUpdate_() {
          this.update_();
        }
        onCursorChange_() {
          this.update_();
        }
      }
      __name(GraphLogView, "GraphLogView");
      class GraphLogController {
        constructor(doc, config) {
          this.onGraphMouseMove_ = this.onGraphMouseMove_.bind(this);
          this.onGraphMouseLeave_ = this.onGraphMouseLeave_.bind(this);
          this.onGraphPointerDown_ = this.onGraphPointerDown_.bind(this);
          this.onGraphPointerMove_ = this.onGraphPointerMove_.bind(this);
          this.onGraphPointerUp_ = this.onGraphPointerUp_.bind(this);
          this.value = config.value;
          this.viewProps = config.viewProps;
          this.cursor_ = new GraphCursor();
          this.view = new GraphLogView(doc, {
            cursor: this.cursor_,
            formatter: config.formatter,
            lineCount: config.lineCount,
            maxValue: config.maxValue,
            minValue: config.minValue,
            value: this.value,
            viewProps: this.viewProps
          });
          if (!supportsTouch(doc)) {
            this.view.element.addEventListener("mousemove", this.onGraphMouseMove_);
            this.view.element.addEventListener("mouseleave", this.onGraphMouseLeave_);
          } else {
            const ph = new PointerHandler(this.view.element);
            ph.emitter.on("down", this.onGraphPointerDown_);
            ph.emitter.on("move", this.onGraphPointerMove_);
            ph.emitter.on("up", this.onGraphPointerUp_);
          }
        }
        onGraphMouseLeave_() {
          this.cursor_.index = -1;
        }
        onGraphMouseMove_(ev) {
          const bounds = this.view.element.getBoundingClientRect();
          this.cursor_.index = Math.floor(mapRange(ev.offsetX, 0, bounds.width, 0, this.value.rawValue.length));
        }
        onGraphPointerDown_(ev) {
          this.onGraphPointerMove_(ev);
        }
        onGraphPointerMove_(ev) {
          if (!ev.data.point) {
            this.cursor_.index = -1;
            return;
          }
          this.cursor_.index = Math.floor(mapRange(ev.data.point.x, 0, ev.data.bounds.width, 0, this.value.rawValue.length));
        }
        onGraphPointerUp_() {
          this.cursor_.index = -1;
        }
      }
      __name(GraphLogController, "GraphLogController");
      function createFormatter(params) {
        return "format" in params && !isEmpty(params.format) ? params.format : createNumberFormatter(2);
      }
      __name(createFormatter, "createFormatter");
      function createTextMonitor(args) {
        var _a;
        if (args.value.rawValue.length === 1) {
          return new SingleLogController(args.document, {
            formatter: createFormatter(args.params),
            value: args.value,
            viewProps: args.viewProps
          });
        }
        return new MultiLogController(args.document, {
          formatter: createFormatter(args.params),
          lineCount: (_a = args.params.lineCount) !== null && _a !== void 0 ? _a : Constants.monitor.defaultLineCount,
          value: args.value,
          viewProps: args.viewProps
        });
      }
      __name(createTextMonitor, "createTextMonitor");
      function createGraphMonitor(args) {
        var _a, _b, _c;
        return new GraphLogController(args.document, {
          formatter: createFormatter(args.params),
          lineCount: (_a = args.params.lineCount) !== null && _a !== void 0 ? _a : Constants.monitor.defaultLineCount,
          maxValue: (_b = "max" in args.params ? args.params.max : null) !== null && _b !== void 0 ? _b : 100,
          minValue: (_c = "min" in args.params ? args.params.min : null) !== null && _c !== void 0 ? _c : 0,
          value: args.value,
          viewProps: args.viewProps
        });
      }
      __name(createGraphMonitor, "createGraphMonitor");
      function shouldShowGraph(params) {
        return "view" in params && params.view === "graph";
      }
      __name(shouldShowGraph, "shouldShowGraph");
      const NumberMonitorPlugin = {
        id: "monitor-number",
        type: "monitor",
        accept: (value, params) => {
          if (typeof value !== "number") {
            return null;
          }
          const p = ParamsParsers;
          const result = parseParams(params, {
            format: p.optional.function,
            lineCount: p.optional.number,
            max: p.optional.number,
            min: p.optional.number,
            view: p.optional.string
          });
          return result ? {
            initialValue: value,
            params: result
          } : null;
        },
        binding: {
          defaultBufferSize: (params) => shouldShowGraph(params) ? 64 : 1,
          reader: (_args) => numberFromUnknown
        },
        controller: (args) => {
          if (shouldShowGraph(args.params)) {
            return createGraphMonitor(args);
          }
          return createTextMonitor(args);
        }
      };
      const StringMonitorPlugin = {
        id: "monitor-string",
        type: "monitor",
        accept: (value, params) => {
          if (typeof value !== "string") {
            return null;
          }
          const p = ParamsParsers;
          const result = parseParams(params, {
            lineCount: p.optional.number,
            multiline: p.optional.boolean
          });
          return result ? {
            initialValue: value,
            params: result
          } : null;
        },
        binding: {
          reader: (_args) => stringFromUnknown
        },
        controller: (args) => {
          var _a;
          const value = args.value;
          const multiline = value.rawValue.length > 1 || "multiline" in args.params && args.params.multiline;
          if (multiline) {
            return new MultiLogController(args.document, {
              formatter: formatString,
              lineCount: (_a = args.params.lineCount) !== null && _a !== void 0 ? _a : Constants.monitor.defaultLineCount,
              value,
              viewProps: args.viewProps
            });
          }
          return new SingleLogController(args.document, {
            formatter: formatString,
            value,
            viewProps: args.viewProps
          });
        }
      };
      class InputBinding {
        constructor(config) {
          this.onValueChange_ = this.onValueChange_.bind(this);
          this.reader = config.reader;
          this.writer = config.writer;
          this.emitter = new Emitter();
          this.value = config.value;
          this.value.emitter.on("change", this.onValueChange_);
          this.target = config.target;
          this.read();
        }
        read() {
          const targetValue = this.target.read();
          if (targetValue !== void 0) {
            this.value.rawValue = this.reader(targetValue);
          }
        }
        write_(rawValue) {
          this.writer(this.target, rawValue);
        }
        onValueChange_(ev) {
          this.write_(ev.rawValue);
          this.emitter.emit("change", {
            options: ev.options,
            rawValue: ev.rawValue,
            sender: this
          });
        }
      }
      __name(InputBinding, "InputBinding");
      function createInputBindingController(plugin, args) {
        const result = plugin.accept(args.target.read(), args.params);
        if (isEmpty(result)) {
          return null;
        }
        const p = ParamsParsers;
        const valueArgs = {
          target: args.target,
          initialValue: result.initialValue,
          params: result.params
        };
        const reader = plugin.binding.reader(valueArgs);
        const constraint = plugin.binding.constraint ? plugin.binding.constraint(valueArgs) : void 0;
        const value = createValue(reader(result.initialValue), {
          constraint,
          equals: plugin.binding.equals
        });
        const binding = new InputBinding({
          reader,
          target: args.target,
          value,
          writer: plugin.binding.writer(valueArgs)
        });
        const disabled = p.optional.boolean(args.params.disabled).value;
        const hidden = p.optional.boolean(args.params.hidden).value;
        const controller = plugin.controller({
          constraint,
          document: args.document,
          initialValue: result.initialValue,
          params: result.params,
          value: binding.value,
          viewProps: ViewProps.create({
            disabled,
            hidden
          })
        });
        const label = p.optional.string(args.params.label).value;
        return new InputBindingController(args.document, {
          binding,
          blade: createBlade(),
          props: ValueMap.fromObject({
            label: label || args.target.key
          }),
          valueController: controller
        });
      }
      __name(createInputBindingController, "createInputBindingController");
      class MonitorBinding {
        constructor(config) {
          this.onTick_ = this.onTick_.bind(this);
          this.reader_ = config.reader;
          this.target = config.target;
          this.emitter = new Emitter();
          this.value = config.value;
          this.ticker = config.ticker;
          this.ticker.emitter.on("tick", this.onTick_);
          this.read();
        }
        dispose() {
          this.ticker.dispose();
        }
        read() {
          const targetValue = this.target.read();
          if (targetValue === void 0) {
            return;
          }
          const buffer = this.value.rawValue;
          const newValue = this.reader_(targetValue);
          this.value.rawValue = createPushedBuffer(buffer, newValue);
          this.emitter.emit("update", {
            rawValue: newValue,
            sender: this
          });
        }
        onTick_(_) {
          this.read();
        }
      }
      __name(MonitorBinding, "MonitorBinding");
      function createTicker(document, interval) {
        return interval === 0 ? new ManualTicker() : new IntervalTicker(document, interval !== null && interval !== void 0 ? interval : Constants.monitor.defaultInterval);
      }
      __name(createTicker, "createTicker");
      function createMonitorBindingController(plugin, args) {
        var _a, _b, _c;
        const P = ParamsParsers;
        const result = plugin.accept(args.target.read(), args.params);
        if (isEmpty(result)) {
          return null;
        }
        const bindingArgs = {
          target: args.target,
          initialValue: result.initialValue,
          params: result.params
        };
        const reader = plugin.binding.reader(bindingArgs);
        const bufferSize = (_b = (_a = P.optional.number(args.params.bufferSize).value) !== null && _a !== void 0 ? _a : plugin.binding.defaultBufferSize && plugin.binding.defaultBufferSize(result.params)) !== null && _b !== void 0 ? _b : 1;
        const interval = P.optional.number(args.params.interval).value;
        const binding = new MonitorBinding({
          reader,
          target: args.target,
          ticker: createTicker(args.document, interval),
          value: initializeBuffer(bufferSize)
        });
        const disabled = P.optional.boolean(args.params.disabled).value;
        const hidden = P.optional.boolean(args.params.hidden).value;
        const controller = plugin.controller({
          document: args.document,
          params: result.params,
          value: binding.value,
          viewProps: ViewProps.create({
            disabled,
            hidden
          })
        });
        const label = (_c = P.optional.string(args.params.label).value) !== null && _c !== void 0 ? _c : args.target.key;
        return new MonitorBindingController(args.document, {
          binding,
          blade: createBlade(),
          props: ValueMap.fromObject({
            label
          }),
          valueController: controller
        });
      }
      __name(createMonitorBindingController, "createMonitorBindingController");
      class PluginPool {
        constructor() {
          this.pluginsMap_ = {
            blades: [],
            inputs: [],
            monitors: []
          };
        }
        getAll() {
          return [
            ...this.pluginsMap_.blades,
            ...this.pluginsMap_.inputs,
            ...this.pluginsMap_.monitors
          ];
        }
        register(r) {
          if (r.type === "blade") {
            this.pluginsMap_.blades.unshift(r);
          } else if (r.type === "input") {
            this.pluginsMap_.inputs.unshift(r);
          } else if (r.type === "monitor") {
            this.pluginsMap_.monitors.unshift(r);
          }
        }
        createInput(document, target, params) {
          const initialValue = target.read();
          if (isEmpty(initialValue)) {
            throw new TpError({
              context: {
                key: target.key
              },
              type: "nomatchingcontroller"
            });
          }
          const bc = this.pluginsMap_.inputs.reduce((result, plugin) => result || createInputBindingController(plugin, {
            document,
            target,
            params
          }), null);
          if (bc) {
            return bc;
          }
          throw new TpError({
            context: {
              key: target.key
            },
            type: "nomatchingcontroller"
          });
        }
        createMonitor(document, target, params) {
          const bc = this.pluginsMap_.monitors.reduce((result, plugin) => result || createMonitorBindingController(plugin, {
            document,
            params,
            target
          }), null);
          if (bc) {
            return bc;
          }
          throw new TpError({
            context: {
              key: target.key
            },
            type: "nomatchingcontroller"
          });
        }
        createBlade(document, params) {
          const bc = this.pluginsMap_.blades.reduce((result, plugin) => result || createBladeController(plugin, {
            document,
            params
          }), null);
          if (!bc) {
            throw new TpError({
              type: "nomatchingview",
              context: {
                params
              }
            });
          }
          return bc;
        }
        createBladeApi(bc) {
          if (bc instanceof InputBindingController) {
            return new InputBindingApi(bc);
          }
          if (bc instanceof MonitorBindingController) {
            return new MonitorBindingApi(bc);
          }
          if (bc instanceof RackController) {
            return new RackApi(bc, this);
          }
          const api = this.pluginsMap_.blades.reduce((result, plugin) => result || plugin.api({
            controller: bc,
            pool: this
          }), null);
          if (!api) {
            throw TpError.shouldNeverHappen();
          }
          return api;
        }
      }
      __name(PluginPool, "PluginPool");
      function createDefaultPluginPool() {
        const pool = new PluginPool();
        [
          Point2dInputPlugin,
          Point3dInputPlugin,
          Point4dInputPlugin,
          StringInputPlugin,
          NumberInputPlugin,
          StringColorInputPlugin,
          ObjectColorInputPlugin,
          NumberColorInputPlugin,
          BooleanInputPlugin,
          BooleanMonitorPlugin,
          StringMonitorPlugin,
          NumberMonitorPlugin,
          ButtonBladePlugin,
          FolderBladePlugin,
          SeparatorBladePlugin,
          TabBladePlugin
        ].forEach((p) => {
          pool.register(p);
        });
        return pool;
      }
      __name(createDefaultPluginPool, "createDefaultPluginPool");
      class ListApi extends BladeApi {
        constructor(controller) {
          super(controller);
          this.emitter_ = new Emitter();
          this.controller_.valueController.value.emitter.on("change", (ev) => {
            this.emitter_.emit("change", {
              event: new TpChangeEvent(this, ev.rawValue)
            });
          });
        }
        get label() {
          return this.controller_.props.get("label");
        }
        set label(label) {
          this.controller_.props.set("label", label);
        }
        get options() {
          return this.controller_.valueController.props.get("options");
        }
        set options(options) {
          this.controller_.valueController.props.set("options", options);
        }
        get value() {
          return this.controller_.valueController.value.rawValue;
        }
        set value(value) {
          this.controller_.valueController.value.rawValue = value;
        }
        on(eventName, handler) {
          const bh = handler.bind(this);
          this.emitter_.on(eventName, (ev) => {
            bh(ev.event);
          });
          return this;
        }
      }
      __name(ListApi, "ListApi");
      class SliderApi extends BladeApi {
        constructor(controller) {
          super(controller);
          this.emitter_ = new Emitter();
          this.controller_.valueController.value.emitter.on("change", (ev) => {
            this.emitter_.emit("change", {
              event: new TpChangeEvent(this, ev.rawValue)
            });
          });
        }
        get label() {
          return this.controller_.props.get("label");
        }
        set label(label) {
          this.controller_.props.set("label", label);
        }
        get maxValue() {
          return this.controller_.valueController.sliderController.props.get("maxValue");
        }
        set maxValue(maxValue) {
          this.controller_.valueController.sliderController.props.set("maxValue", maxValue);
        }
        get minValue() {
          return this.controller_.valueController.sliderController.props.get("minValue");
        }
        set minValue(minValue) {
          this.controller_.valueController.sliderController.props.set("minValue", minValue);
        }
        get value() {
          return this.controller_.valueController.value.rawValue;
        }
        set value(value) {
          this.controller_.valueController.value.rawValue = value;
        }
        on(eventName, handler) {
          const bh = handler.bind(this);
          this.emitter_.on(eventName, (ev) => {
            bh(ev.event);
          });
          return this;
        }
      }
      __name(SliderApi, "SliderApi");
      class TextApi extends BladeApi {
        constructor(controller) {
          super(controller);
          this.emitter_ = new Emitter();
          this.controller_.valueController.value.emitter.on("change", (ev) => {
            this.emitter_.emit("change", {
              event: new TpChangeEvent(this, ev.rawValue)
            });
          });
        }
        get label() {
          return this.controller_.props.get("label");
        }
        set label(label) {
          this.controller_.props.set("label", label);
        }
        get formatter() {
          return this.controller_.valueController.props.get("formatter");
        }
        set formatter(formatter) {
          this.controller_.valueController.props.set("formatter", formatter);
        }
        get value() {
          return this.controller_.valueController.value.rawValue;
        }
        set value(value) {
          this.controller_.valueController.value.rawValue = value;
        }
        on(eventName, handler) {
          const bh = handler.bind(this);
          this.emitter_.on(eventName, (ev) => {
            bh(ev.event);
          });
          return this;
        }
      }
      __name(TextApi, "TextApi");
      const ListBladePlugin = function() {
        return {
          id: "list",
          type: "blade",
          accept(params) {
            const p = ParamsParsers;
            const result = parseParams(params, {
              options: p.required.custom(parseListOptions),
              value: p.required.raw,
              view: p.required.constant("list"),
              label: p.optional.string
            });
            return result ? { params: result } : null;
          },
          controller(args) {
            const ic = new ListController(args.document, {
              props: ValueMap.fromObject({
                options: normalizeListOptions(args.params.options)
              }),
              value: createValue(args.params.value),
              viewProps: args.viewProps
            });
            return new LabeledValueController(args.document, {
              blade: args.blade,
              props: ValueMap.fromObject({
                label: args.params.label
              }),
              valueController: ic
            });
          },
          api(args) {
            if (!(args.controller instanceof LabeledValueController)) {
              return null;
            }
            if (!(args.controller.valueController instanceof ListController)) {
              return null;
            }
            return new ListApi(args.controller);
          }
        };
      }();
      function exportPresetJson(targets) {
        return targets.reduce((result, target) => {
          return Object.assign(result, {
            [target.presetKey]: target.read()
          });
        }, {});
      }
      __name(exportPresetJson, "exportPresetJson");
      function importPresetJson(targets, preset) {
        targets.forEach((target) => {
          const value = preset[target.presetKey];
          if (value !== void 0) {
            target.write(value);
          }
        });
      }
      __name(importPresetJson, "importPresetJson");
      class RootApi extends FolderApi {
        constructor(controller, pool) {
          super(controller, pool);
        }
        get element() {
          return this.controller_.view.element;
        }
        importPreset(preset) {
          const targets = this.controller_.rackController.rack.find(InputBindingController).map((ibc) => {
            return ibc.binding.target;
          });
          importPresetJson(targets, preset);
          this.refresh();
        }
        exportPreset() {
          const targets = this.controller_.rackController.rack.find(InputBindingController).map((ibc) => {
            return ibc.binding.target;
          });
          return exportPresetJson(targets);
        }
        refresh() {
          this.controller_.rackController.rack.find(InputBindingController).forEach((ibc) => {
            ibc.binding.read();
          });
          this.controller_.rackController.rack.find(MonitorBindingController).forEach((mbc) => {
            mbc.binding.read();
          });
        }
      }
      __name(RootApi, "RootApi");
      class RootController extends FolderController {
        constructor(doc, config) {
          super(doc, {
            expanded: config.expanded,
            blade: config.blade,
            props: config.props,
            root: true,
            viewProps: config.viewProps
          });
        }
      }
      __name(RootController, "RootController");
      const SliderBladePlugin = {
        id: "slider",
        type: "blade",
        accept(params) {
          const p = ParamsParsers;
          const result = parseParams(params, {
            max: p.required.number,
            min: p.required.number,
            view: p.required.constant("slider"),
            format: p.optional.function,
            label: p.optional.string,
            value: p.optional.number
          });
          return result ? { params: result } : null;
        },
        controller(args) {
          var _a, _b;
          const v = (_a = args.params.value) !== null && _a !== void 0 ? _a : 0;
          const vc = new SliderTextController(args.document, {
            baseStep: 1,
            parser: parseNumber,
            sliderProps: ValueMap.fromObject({
              maxValue: args.params.max,
              minValue: args.params.min
            }),
            textProps: ValueMap.fromObject({
              draggingScale: getSuitableDraggingScale(void 0, v),
              formatter: (_b = args.params.format) !== null && _b !== void 0 ? _b : numberToString
            }),
            value: createValue(v),
            viewProps: args.viewProps
          });
          return new LabeledValueController(args.document, {
            blade: args.blade,
            props: ValueMap.fromObject({
              label: args.params.label
            }),
            valueController: vc
          });
        },
        api(args) {
          if (!(args.controller instanceof LabeledValueController)) {
            return null;
          }
          if (!(args.controller.valueController instanceof SliderTextController)) {
            return null;
          }
          return new SliderApi(args.controller);
        }
      };
      const TextBladePlugin = function() {
        return {
          id: "text",
          type: "blade",
          accept(params) {
            const p = ParamsParsers;
            const result = parseParams(params, {
              parse: p.required.function,
              value: p.required.raw,
              view: p.required.constant("text"),
              format: p.optional.function,
              label: p.optional.string
            });
            return result ? { params: result } : null;
          },
          controller(args) {
            var _a;
            const ic = new TextController(args.document, {
              parser: args.params.parse,
              props: ValueMap.fromObject({
                formatter: (_a = args.params.format) !== null && _a !== void 0 ? _a : (v) => String(v)
              }),
              value: createValue(args.params.value),
              viewProps: args.viewProps
            });
            return new LabeledValueController(args.document, {
              blade: args.blade,
              props: ValueMap.fromObject({
                label: args.params.label
              }),
              valueController: ic
            });
          },
          api(args) {
            if (!(args.controller instanceof LabeledValueController)) {
              return null;
            }
            if (!(args.controller.valueController instanceof TextController)) {
              return null;
            }
            return new TextApi(args.controller);
          }
        };
      }();
      function createDefaultWrapperElement(doc) {
        const elem = doc.createElement("div");
        elem.classList.add(ClassName("dfw")());
        if (doc.body) {
          doc.body.appendChild(elem);
        }
        return elem;
      }
      __name(createDefaultWrapperElement, "createDefaultWrapperElement");
      function embedStyle(doc, id, css) {
        if (doc.querySelector(`style[data-tp-style=${id}]`)) {
          return;
        }
        const styleElem = doc.createElement("style");
        styleElem.dataset.tpStyle = id;
        styleElem.textContent = css;
        doc.head.appendChild(styleElem);
      }
      __name(embedStyle, "embedStyle");
      class Pane2 extends RootApi {
        constructor(opt_config) {
          var _a;
          const config = opt_config || {};
          const doc = (_a = config.document) !== null && _a !== void 0 ? _a : getWindowDocument();
          const pool = createDefaultPluginPool();
          const rootController = new RootController(doc, {
            expanded: config.expanded,
            blade: createBlade(),
            props: ValueMap.fromObject({
              title: config.title
            }),
            viewProps: ViewProps.create()
          });
          super(rootController, pool);
          this.pool_ = pool;
          this.containerElem_ = config.container || createDefaultWrapperElement(doc);
          this.containerElem_.appendChild(this.element);
          this.doc_ = doc;
          this.usesDefaultWrapper_ = !config.container;
          this.setUpDefaultPlugins_();
        }
        get document() {
          if (!this.doc_) {
            throw TpError.alreadyDisposed();
          }
          return this.doc_;
        }
        dispose() {
          const containerElem = this.containerElem_;
          if (!containerElem) {
            throw TpError.alreadyDisposed();
          }
          if (this.usesDefaultWrapper_) {
            const parentElem = containerElem.parentElement;
            if (parentElem) {
              parentElem.removeChild(containerElem);
            }
          }
          this.containerElem_ = null;
          this.doc_ = null;
          super.dispose();
        }
        registerPlugin(bundle) {
          const plugins = "plugin" in bundle ? [bundle.plugin] : "plugins" in bundle ? bundle.plugins : [];
          plugins.forEach((p) => {
            this.pool_.register(p);
            this.embedPluginStyle_(p);
          });
        }
        embedPluginStyle_(plugin) {
          if (plugin.css) {
            embedStyle(this.document, `plugin-${plugin.id}`, plugin.css);
          }
        }
        setUpDefaultPlugins_() {
          embedStyle(this.document, "default", ".tp-lstv_s,.tp-btnv_b,.tp-p2dv_b,.tp-colswv_sw,.tp-p2dpv_p,.tp-txtv_i,.tp-grlv_g,.tp-sglv_i,.tp-mllv_i,.tp-fldv_b,.tp-rotv_b,.tp-ckbv_i,.tp-coltxtv_ms,.tp-tbiv_b{-webkit-appearance:none;-moz-appearance:none;appearance:none;background-color:transparent;border-width:0;font-family:inherit;font-size:inherit;font-weight:inherit;margin:0;outline:none;padding:0}.tp-lstv_s,.tp-btnv_b,.tp-p2dv_b{background-color:var(--btn-bg);border-radius:var(--elm-br);color:var(--btn-fg);cursor:pointer;display:block;font-weight:bold;height:var(--bld-us);line-height:var(--bld-us);overflow:hidden;text-overflow:ellipsis;white-space:nowrap}.tp-lstv_s:hover,.tp-btnv_b:hover,.tp-p2dv_b:hover{background-color:var(--btn-bg-h)}.tp-lstv_s:focus,.tp-btnv_b:focus,.tp-p2dv_b:focus{background-color:var(--btn-bg-f)}.tp-lstv_s:active,.tp-btnv_b:active,.tp-p2dv_b:active{background-color:var(--btn-bg-a)}.tp-lstv_s:disabled,.tp-btnv_b:disabled,.tp-p2dv_b:disabled{opacity:0.5}.tp-colswv_sw,.tp-p2dpv_p,.tp-txtv_i{background-color:var(--in-bg);border-radius:var(--elm-br);box-sizing:border-box;color:var(--in-fg);font-family:inherit;height:var(--bld-us);line-height:var(--bld-us);min-width:0;width:100%}.tp-colswv_sw:hover,.tp-p2dpv_p:hover,.tp-txtv_i:hover{background-color:var(--in-bg-h)}.tp-colswv_sw:focus,.tp-p2dpv_p:focus,.tp-txtv_i:focus{background-color:var(--in-bg-f)}.tp-colswv_sw:active,.tp-p2dpv_p:active,.tp-txtv_i:active{background-color:var(--in-bg-a)}.tp-colswv_sw:disabled,.tp-p2dpv_p:disabled,.tp-txtv_i:disabled{opacity:0.5}.tp-grlv_g,.tp-sglv_i,.tp-mllv_i{background-color:var(--mo-bg);border-radius:var(--elm-br);box-sizing:border-box;color:var(--mo-fg);height:var(--bld-us);width:100%}.tp-rotv{--font-family: var(--tp-font-family, Roboto Mono,Source Code Pro,Menlo,Courier,monospace);--bs-br: var(--tp-base-border-radius, 6px);--cnt-h-p: var(--tp-container-horizontal-padding, 4px);--cnt-v-p: var(--tp-container-vertical-padding, 4px);--elm-br: var(--tp-element-border-radius, 2px);--bld-s: var(--tp-blade-spacing, 4px);--bld-us: var(--tp-blade-unit-size, 20px);--bs-bg: var(--tp-base-background-color, #2f3137);--bs-sh: var(--tp-base-shadow-color, rgba(0,0,0,0.2));--btn-bg: var(--tp-button-background-color, #adafb8);--btn-bg-a: var(--tp-button-background-color-active, #d6d7db);--btn-bg-f: var(--tp-button-background-color-focus, #c8cad0);--btn-bg-h: var(--tp-button-background-color-hover, #bbbcc4);--btn-fg: var(--tp-button-foreground-color, #2f3137);--cnt-bg: var(--tp-container-background-color, rgba(187,188,196,0.1));--cnt-bg-a: var(--tp-container-background-color-active, rgba(187,188,196,0.25));--cnt-bg-f: var(--tp-container-background-color-focus, rgba(187,188,196,0.2));--cnt-bg-h: var(--tp-container-background-color-hover, rgba(187,188,196,0.15));--cnt-fg: var(--tp-container-foreground-color, #bbbcc4);--in-bg: var(--tp-input-background-color, rgba(0,0,0,0.2));--in-bg-a: var(--tp-input-background-color-active, rgba(0,0,0,0.35));--in-bg-f: var(--tp-input-background-color-focus, rgba(0,0,0,0.3));--in-bg-h: var(--tp-input-background-color-hover, rgba(0,0,0,0.25));--in-fg: var(--tp-input-foreground-color, #bbbcc4);--lbl-fg: var(--tp-label-foreground-color, rgba(187,188,196,0.7));--mo-bg: var(--tp-monitor-background-color, rgba(0,0,0,0.2));--mo-fg: var(--tp-monitor-foreground-color, rgba(187,188,196,0.7));--grv-fg: var(--tp-groove-foreground-color, rgba(0,0,0,0.2))}.tp-fldv_c>.tp-cntv.tp-v-lst,.tp-tabv_c .tp-brkv>.tp-cntv.tp-v-lst,.tp-rotv_c>.tp-cntv.tp-v-lst{margin-bottom:calc(-1 * var(--cnt-v-p))}.tp-fldv_c>.tp-fldv.tp-v-lst .tp-fldv_c,.tp-tabv_c .tp-brkv>.tp-fldv.tp-v-lst .tp-fldv_c,.tp-rotv_c>.tp-fldv.tp-v-lst .tp-fldv_c{border-bottom-left-radius:0}.tp-fldv_c>.tp-fldv.tp-v-lst .tp-fldv_b,.tp-tabv_c .tp-brkv>.tp-fldv.tp-v-lst .tp-fldv_b,.tp-rotv_c>.tp-fldv.tp-v-lst .tp-fldv_b{border-bottom-left-radius:0}.tp-fldv_c>*:not(.tp-v-fst),.tp-tabv_c .tp-brkv>*:not(.tp-v-fst),.tp-rotv_c>*:not(.tp-v-fst){margin-top:var(--bld-s)}.tp-fldv_c>.tp-sprv:not(.tp-v-fst),.tp-tabv_c .tp-brkv>.tp-sprv:not(.tp-v-fst),.tp-rotv_c>.tp-sprv:not(.tp-v-fst),.tp-fldv_c>.tp-cntv:not(.tp-v-fst),.tp-tabv_c .tp-brkv>.tp-cntv:not(.tp-v-fst),.tp-rotv_c>.tp-cntv:not(.tp-v-fst){margin-top:var(--cnt-v-p)}.tp-fldv_c>.tp-sprv+*:not(.tp-v-hidden),.tp-tabv_c .tp-brkv>.tp-sprv+*:not(.tp-v-hidden),.tp-rotv_c>.tp-sprv+*:not(.tp-v-hidden),.tp-fldv_c>.tp-cntv+*:not(.tp-v-hidden),.tp-tabv_c .tp-brkv>.tp-cntv+*:not(.tp-v-hidden),.tp-rotv_c>.tp-cntv+*:not(.tp-v-hidden){margin-top:var(--cnt-v-p)}.tp-fldv_c>.tp-sprv:not(.tp-v-hidden)+.tp-sprv,.tp-tabv_c .tp-brkv>.tp-sprv:not(.tp-v-hidden)+.tp-sprv,.tp-rotv_c>.tp-sprv:not(.tp-v-hidden)+.tp-sprv,.tp-fldv_c>.tp-cntv:not(.tp-v-hidden)+.tp-cntv,.tp-tabv_c .tp-brkv>.tp-cntv:not(.tp-v-hidden)+.tp-cntv,.tp-rotv_c>.tp-cntv:not(.tp-v-hidden)+.tp-cntv{margin-top:0}.tp-fldv_c>.tp-cntv,.tp-tabv_c .tp-brkv>.tp-cntv{margin-left:4px}.tp-fldv_c>.tp-fldv>.tp-fldv_b,.tp-tabv_c .tp-brkv>.tp-fldv>.tp-fldv_b{border-top-left-radius:var(--elm-br);border-bottom-left-radius:var(--elm-br)}.tp-fldv_c>.tp-fldv.tp-fldv-expanded>.tp-fldv_b,.tp-tabv_c .tp-brkv>.tp-fldv.tp-fldv-expanded>.tp-fldv_b{border-bottom-left-radius:0}.tp-fldv_c .tp-fldv>.tp-fldv_c,.tp-tabv_c .tp-brkv .tp-fldv>.tp-fldv_c{border-bottom-left-radius:var(--elm-br)}.tp-fldv_c>.tp-tabv>.tp-tabv_i,.tp-tabv_c .tp-brkv>.tp-tabv>.tp-tabv_i{border-top-left-radius:var(--elm-br)}.tp-fldv_c .tp-tabv>.tp-tabv_c,.tp-tabv_c .tp-brkv .tp-tabv>.tp-tabv_c{border-bottom-left-radius:var(--elm-br)}.tp-fldv_b,.tp-rotv_b{background-color:var(--cnt-bg);color:var(--cnt-fg);cursor:pointer;display:block;height:calc(var(--bld-us) + 4px);line-height:calc(var(--bld-us) + 4px);overflow:hidden;padding-left:calc(var(--cnt-h-p) + 8px);padding-right:calc(2px * 2 + var(--bld-us) + var(--cnt-h-p));position:relative;text-align:left;text-overflow:ellipsis;white-space:nowrap;width:100%;transition:border-radius .2s ease-in-out .2s}.tp-fldv_b:hover,.tp-rotv_b:hover{background-color:var(--cnt-bg-h)}.tp-fldv_b:focus,.tp-rotv_b:focus{background-color:var(--cnt-bg-f)}.tp-fldv_b:active,.tp-rotv_b:active{background-color:var(--cnt-bg-a)}.tp-fldv_b:disabled,.tp-rotv_b:disabled{opacity:0.5}.tp-fldv_m,.tp-rotv_m{background:linear-gradient(to left, var(--cnt-fg), var(--cnt-fg) 2px, transparent 2px, transparent 4px, var(--cnt-fg) 4px);border-radius:2px;bottom:0;content:'';display:block;height:6px;right:calc(var(--cnt-h-p) + (var(--bld-us) + 4px - 6px) / 2 - 2px);margin:auto;opacity:0.5;position:absolute;top:0;transform:rotate(90deg);transition:transform .2s ease-in-out;width:6px}.tp-fldv.tp-fldv-expanded>.tp-fldv_b>.tp-fldv_m,.tp-rotv.tp-rotv-expanded .tp-rotv_m{transform:none}.tp-fldv_c,.tp-rotv_c{box-sizing:border-box;height:0;opacity:0;overflow:hidden;padding-bottom:0;padding-top:0;position:relative;transition:height .2s ease-in-out,opacity .2s linear,padding .2s ease-in-out}.tp-fldv.tp-fldv-cpl:not(.tp-fldv-expanded)>.tp-fldv_c,.tp-rotv.tp-rotv-cpl:not(.tp-rotv-expanded) .tp-rotv_c{display:none}.tp-fldv.tp-fldv-expanded>.tp-fldv_c,.tp-rotv.tp-rotv-expanded .tp-rotv_c{opacity:1;padding-bottom:var(--cnt-v-p);padding-top:var(--cnt-v-p);transform:none;overflow:visible;transition:height .2s ease-in-out,opacity .2s linear .2s,padding .2s ease-in-out}.tp-coltxtv_m,.tp-lstv{position:relative}.tp-lstv_s{padding:0 20px 0 4px;width:100%}.tp-coltxtv_mm,.tp-lstv_m{bottom:0;margin:auto;pointer-events:none;position:absolute;right:2px;top:0}.tp-coltxtv_mm svg,.tp-lstv_m svg{bottom:0;height:16px;margin:auto;position:absolute;right:0;top:0;width:16px}.tp-coltxtv_mm svg path,.tp-lstv_m svg path{fill:currentColor}.tp-coltxtv_w,.tp-pndtxtv{display:flex}.tp-coltxtv_c,.tp-pndtxtv_a{width:100%}.tp-coltxtv_c+.tp-coltxtv_c,.tp-pndtxtv_a+.tp-coltxtv_c,.tp-coltxtv_c+.tp-pndtxtv_a,.tp-pndtxtv_a+.tp-pndtxtv_a{margin-left:2px}.tp-btnv_b{width:100%}.tp-btnv_t{text-align:center}.tp-ckbv_l{display:block;position:relative}.tp-ckbv_i{left:0;opacity:0;position:absolute;top:0}.tp-ckbv_w{background-color:var(--in-bg);border-radius:var(--elm-br);cursor:pointer;display:block;height:var(--bld-us);position:relative;width:var(--bld-us)}.tp-ckbv_w svg{bottom:0;display:block;height:16px;left:0;margin:auto;opacity:0;position:absolute;right:0;top:0;width:16px}.tp-ckbv_w svg path{fill:none;stroke:var(--in-fg);stroke-width:2}.tp-ckbv_i:hover+.tp-ckbv_w{background-color:var(--in-bg-h)}.tp-ckbv_i:focus+.tp-ckbv_w{background-color:var(--in-bg-f)}.tp-ckbv_i:active+.tp-ckbv_w{background-color:var(--in-bg-a)}.tp-ckbv_i:checked+.tp-ckbv_w svg{opacity:1}.tp-ckbv.tp-v-disabled .tp-ckbv_w{opacity:0.5}.tp-colv{position:relative}.tp-colv_h{display:flex}.tp-colv_s{flex-grow:0;flex-shrink:0;width:var(--bld-us)}.tp-colv_t{flex:1;margin-left:4px}.tp-colv_p{height:0;margin-top:0;opacity:0;overflow:hidden;transition:height .2s ease-in-out,opacity .2s linear,margin .2s ease-in-out}.tp-colv.tp-colv-cpl .tp-colv_p{overflow:visible}.tp-colv.tp-colv-expanded .tp-colv_p{margin-top:var(--bld-s);opacity:1}.tp-colv .tp-popv{left:calc(-1 * var(--cnt-h-p));right:calc(-1 * var(--cnt-h-p));top:var(--bld-us)}.tp-colpv_h,.tp-colpv_ap{margin-left:6px;margin-right:6px}.tp-colpv_h{margin-top:var(--bld-s)}.tp-colpv_rgb{display:flex;margin-top:var(--bld-s);width:100%}.tp-colpv_a{display:flex;margin-top:var(--cnt-v-p);padding-top:calc(var(--cnt-v-p) + 2px);position:relative}.tp-colpv_a:before{background-color:var(--grv-fg);content:'';height:2px;left:calc(-1 * var(--cnt-h-p));position:absolute;right:calc(-1 * var(--cnt-h-p));top:0}.tp-colpv_ap{align-items:center;display:flex;flex:3}.tp-colpv_at{flex:1;margin-left:4px}.tp-svpv{border-radius:var(--elm-br);outline:none;overflow:hidden;position:relative}.tp-svpv_c{cursor:crosshair;display:block;height:calc(var(--bld-us) * 4);width:100%}.tp-svpv_m{border-radius:100%;border:rgba(255,255,255,0.75) solid 2px;box-sizing:border-box;filter:drop-shadow(0 0 1px rgba(0,0,0,0.3));height:12px;margin-left:-6px;margin-top:-6px;pointer-events:none;position:absolute;width:12px}.tp-svpv:focus .tp-svpv_m{border-color:#fff}.tp-hplv{cursor:pointer;height:var(--bld-us);outline:none;position:relative}.tp-hplv_c{background-image:url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEAAAAABCAYAAABubagXAAAAQ0lEQVQoU2P8z8Dwn0GCgQEDi2OK/RBgYHjBgIpfovFh8j8YBIgzFGQxuqEgPhaDOT5gOhPkdCxOZeBg+IDFZZiGAgCaSSMYtcRHLgAAAABJRU5ErkJggg==);background-position:left top;background-repeat:no-repeat;background-size:100% 100%;border-radius:2px;display:block;height:4px;left:0;margin-top:-2px;position:absolute;top:50%;width:100%}.tp-hplv_m{border-radius:var(--elm-br);border:rgba(255,255,255,0.75) solid 2px;box-shadow:0 0 2px rgba(0,0,0,0.1);box-sizing:border-box;height:12px;left:50%;margin-left:-6px;margin-top:-6px;pointer-events:none;position:absolute;top:50%;width:12px}.tp-hplv:focus .tp-hplv_m{border-color:#fff}.tp-aplv{cursor:pointer;height:var(--bld-us);outline:none;position:relative;width:100%}.tp-aplv_b{background-color:#fff;background-image:linear-gradient(to top right, #ddd 25%, transparent 25%, transparent 75%, #ddd 75%),linear-gradient(to top right, #ddd 25%, transparent 25%, transparent 75%, #ddd 75%);background-size:4px 4px;background-position:0 0,2px 2px;border-radius:2px;display:block;height:4px;left:0;margin-top:-2px;overflow:hidden;position:absolute;top:50%;width:100%}.tp-aplv_c{bottom:0;left:0;position:absolute;right:0;top:0}.tp-aplv_m{background-color:#fff;background-image:linear-gradient(to top right, #ddd 25%, transparent 25%, transparent 75%, #ddd 75%),linear-gradient(to top right, #ddd 25%, transparent 25%, transparent 75%, #ddd 75%);background-size:12px 12px;background-position:0 0,6px 6px;border-radius:var(--elm-br);box-shadow:0 0 2px rgba(0,0,0,0.1);height:12px;left:50%;margin-left:-6px;margin-top:-6px;overflow:hidden;pointer-events:none;position:absolute;top:50%;width:12px}.tp-aplv_p{border-radius:var(--elm-br);border:rgba(255,255,255,0.75) solid 2px;box-sizing:border-box;bottom:0;left:0;position:absolute;right:0;top:0}.tp-aplv:focus .tp-aplv_p{border-color:#fff}.tp-colswv{background-color:#fff;background-image:linear-gradient(to top right, #ddd 25%, transparent 25%, transparent 75%, #ddd 75%),linear-gradient(to top right, #ddd 25%, transparent 25%, transparent 75%, #ddd 75%);background-size:10px 10px;background-position:0 0,5px 5px;border-radius:var(--elm-br)}.tp-colswv.tp-v-disabled{opacity:0.5}.tp-colswv_b{-webkit-appearance:none;-moz-appearance:none;appearance:none;background-color:transparent;border-width:0;cursor:pointer;display:block;height:var(--bld-us);left:0;margin:0;outline:none;padding:0;position:absolute;top:0;width:var(--bld-us)}.tp-colswv_b:focus::after{border:rgba(255,255,255,0.75) solid 2px;border-radius:var(--elm-br);bottom:0;content:'';display:block;left:0;position:absolute;right:0;top:0}.tp-coltxtv{display:flex;width:100%}.tp-coltxtv_m{margin-right:4px}.tp-coltxtv_ms{border-radius:var(--elm-br);color:var(--lbl-fg);cursor:pointer;height:var(--bld-us);line-height:var(--bld-us);padding:0 18px 0 4px}.tp-coltxtv_ms:hover{background-color:var(--in-bg-h)}.tp-coltxtv_ms:focus{background-color:var(--in-bg-f)}.tp-coltxtv_ms:active{background-color:var(--in-bg-a)}.tp-coltxtv_mm{color:var(--lbl-fg)}.tp-coltxtv_w{flex:1}.tp-dfwv{position:absolute;top:8px;right:8px;width:256px}.tp-fldv.tp-fldv-not .tp-fldv_b{display:none}.tp-fldv_c{border-left:var(--cnt-bg) solid 4px}.tp-fldv_b:hover+.tp-fldv_c{border-left-color:var(--cnt-bg-h)}.tp-fldv_b:focus+.tp-fldv_c{border-left-color:var(--cnt-bg-f)}.tp-fldv_b:active+.tp-fldv_c{border-left-color:var(--cnt-bg-a)}.tp-grlv{position:relative}.tp-grlv_g{display:block;height:calc(var(--bld-us) * 3)}.tp-grlv_g polyline{fill:none;stroke:var(--mo-fg);stroke-linejoin:round}.tp-grlv_t{margin-top:-4px;transition:left 0.05s, top 0.05s;visibility:hidden}.tp-grlv_t.tp-grlv_t-a{visibility:visible}.tp-grlv_t.tp-grlv_t-in{transition:none}.tp-grlv.tp-v-disabled .tp-grlv_g{opacity:0.5}.tp-grlv .tp-ttv{background-color:var(--mo-fg)}.tp-grlv .tp-ttv::before{border-top-color:var(--mo-fg)}.tp-lblv{align-items:center;display:flex;line-height:1.3;padding-left:var(--cnt-h-p);padding-right:var(--cnt-h-p)}.tp-lblv.tp-lblv-nol{display:block}.tp-lblv_l{color:var(--lbl-fg);flex:1;-webkit-hyphens:auto;-ms-hyphens:auto;hyphens:auto;overflow:hidden;padding-left:4px;padding-right:16px}.tp-lblv.tp-v-disabled .tp-lblv_l{opacity:0.5}.tp-lblv.tp-lblv-nol .tp-lblv_l{display:none}.tp-lblv_v{align-self:flex-start;flex-grow:0;flex-shrink:0;width:160px}.tp-lblv.tp-lblv-nol .tp-lblv_v{width:100%}.tp-lstv_s{padding:0 20px 0 4px;width:100%}.tp-lstv_m{color:var(--btn-fg)}.tp-sglv_i{padding:0 4px}.tp-sglv.tp-v-disabled .tp-sglv_i{opacity:0.5}.tp-mllv_i{display:block;height:calc(var(--bld-us) * 3);line-height:var(--bld-us);padding:0 4px;resize:none;white-space:pre}.tp-mllv.tp-v-disabled .tp-mllv_i{opacity:0.5}.tp-p2dv{position:relative}.tp-p2dv_h{display:flex}.tp-p2dv_b{height:var(--bld-us);margin-right:4px;position:relative;width:var(--bld-us)}.tp-p2dv_b svg{display:block;height:16px;left:50%;margin-left:-8px;margin-top:-8px;position:absolute;top:50%;width:16px}.tp-p2dv_b svg path{stroke:currentColor;stroke-width:2}.tp-p2dv_b svg circle{fill:currentColor}.tp-p2dv_t{flex:1}.tp-p2dv_p{height:0;margin-top:0;opacity:0;overflow:hidden;transition:height .2s ease-in-out,opacity .2s linear,margin .2s ease-in-out}.tp-p2dv.tp-p2dv-expanded .tp-p2dv_p{margin-top:var(--bld-s);opacity:1}.tp-p2dv .tp-popv{left:calc(-1 * var(--cnt-h-p));right:calc(-1 * var(--cnt-h-p));top:var(--bld-us)}.tp-p2dpv{padding-left:calc(var(--bld-us) + 4px)}.tp-p2dpv_p{cursor:crosshair;height:0;overflow:hidden;padding-bottom:100%;position:relative}.tp-p2dpv_g{display:block;height:100%;left:0;pointer-events:none;position:absolute;top:0;width:100%}.tp-p2dpv_ax{opacity:0.1;stroke:var(--in-fg);stroke-dasharray:1}.tp-p2dpv_l{opacity:0.5;stroke:var(--in-fg);stroke-dasharray:1}.tp-p2dpv_m{border:var(--in-fg) solid 1px;border-radius:50%;box-sizing:border-box;height:4px;margin-left:-2px;margin-top:-2px;position:absolute;width:4px}.tp-p2dpv_p:focus .tp-p2dpv_m{background-color:var(--in-fg);border-width:0}.tp-popv{background-color:var(--bs-bg);border-radius:6px;box-shadow:0 2px 4px var(--bs-sh);display:none;max-width:168px;padding:var(--cnt-v-p) var(--cnt-h-p);position:absolute;visibility:hidden;z-index:1000}.tp-popv.tp-popv-v{display:block;visibility:visible}.tp-sprv_r{background-color:var(--grv-fg);border-width:0;display:block;height:2px;margin:0;width:100%}.tp-sldv.tp-v-disabled{opacity:0.5}.tp-sldv_t{box-sizing:border-box;cursor:pointer;height:var(--bld-us);margin:0 6px;outline:none;position:relative}.tp-sldv_t::before{background-color:var(--in-bg);border-radius:1px;bottom:0;content:'';display:block;height:2px;left:0;margin:auto;position:absolute;right:0;top:0}.tp-sldv_k{height:100%;left:0;position:absolute;top:0}.tp-sldv_k::before{background-color:var(--in-fg);border-radius:1px;bottom:0;content:'';display:block;height:2px;left:0;margin-bottom:auto;margin-top:auto;position:absolute;right:0;top:0}.tp-sldv_k::after{background-color:var(--btn-bg);border-radius:var(--elm-br);bottom:0;content:'';display:block;height:12px;margin-bottom:auto;margin-top:auto;position:absolute;right:-6px;top:0;width:12px}.tp-sldv_t:hover .tp-sldv_k::after{background-color:var(--btn-bg-h)}.tp-sldv_t:focus .tp-sldv_k::after{background-color:var(--btn-bg-f)}.tp-sldv_t:active .tp-sldv_k::after{background-color:var(--btn-bg-a)}.tp-sldtxtv{display:flex}.tp-sldtxtv_s{flex:2}.tp-sldtxtv_t{flex:1;margin-left:4px}.tp-tabv.tp-v-disabled{opacity:0.5}.tp-tabv_i{align-items:flex-end;display:flex;overflow:hidden}.tp-tabv.tp-tabv-nop .tp-tabv_i{height:calc(var(--bld-us) + 4px);position:relative}.tp-tabv.tp-tabv-nop .tp-tabv_i::before{background-color:var(--cnt-bg);bottom:0;content:'';height:2px;left:0;position:absolute;right:0}.tp-tabv_c{border-left:var(--cnt-bg) solid 4px;padding-bottom:var(--cnt-v-p);padding-top:var(--cnt-v-p)}.tp-tbiv{flex:1;min-width:0;position:relative}.tp-tbiv+.tp-tbiv{margin-left:2px}.tp-tbiv+.tp-tbiv::before{background-color:var(--cnt-bg);bottom:0;content:'';height:2px;left:-2px;position:absolute;width:2px}.tp-tbiv_b{background-color:var(--cnt-bg);display:block;padding-left:calc(var(--cnt-h-p) + 4px);padding-right:calc(var(--cnt-h-p) + 4px);width:100%}.tp-tbiv_b:hover{background-color:var(--cnt-bg-h)}.tp-tbiv_b:focus{background-color:var(--cnt-bg-f)}.tp-tbiv_b:active{background-color:var(--cnt-bg-a)}.tp-tbiv_b:disabled{opacity:0.5}.tp-tbiv_t{color:var(--cnt-fg);height:calc(var(--bld-us) + 4px);line-height:calc(var(--bld-us) + 4px);opacity:0.5;overflow:hidden;text-overflow:ellipsis}.tp-tbiv.tp-tbiv-sel .tp-tbiv_t{opacity:1}.tp-txtv{position:relative}.tp-txtv_i{padding:0 4px}.tp-txtv.tp-txtv-fst .tp-txtv_i{border-bottom-right-radius:0;border-top-right-radius:0}.tp-txtv.tp-txtv-mid .tp-txtv_i{border-radius:0}.tp-txtv.tp-txtv-lst .tp-txtv_i{border-bottom-left-radius:0;border-top-left-radius:0}.tp-txtv.tp-txtv-num .tp-txtv_i{text-align:right}.tp-txtv.tp-txtv-drg .tp-txtv_i{opacity:0.3}.tp-txtv_k{cursor:pointer;height:100%;left:-3px;position:absolute;top:0;width:12px}.tp-txtv_k::before{background-color:var(--in-fg);border-radius:1px;bottom:0;content:'';height:calc(var(--bld-us) - 4px);left:50%;margin-bottom:auto;margin-left:-1px;margin-top:auto;opacity:0.1;position:absolute;top:0;transition:border-radius 0.1s, height 0.1s, transform 0.1s, width 0.1s;width:2px}.tp-txtv_k:hover::before,.tp-txtv.tp-txtv-drg .tp-txtv_k::before{opacity:1}.tp-txtv.tp-txtv-drg .tp-txtv_k::before{border-radius:50%;height:4px;transform:translateX(-1px);width:4px}.tp-txtv_g{bottom:0;display:block;height:8px;left:50%;margin:auto;overflow:visible;pointer-events:none;position:absolute;top:0;visibility:hidden;width:100%}.tp-txtv.tp-txtv-drg .tp-txtv_g{visibility:visible}.tp-txtv_gb{fill:none;stroke:var(--in-fg);stroke-dasharray:1}.tp-txtv_gh{fill:none;stroke:var(--in-fg)}.tp-txtv .tp-ttv{margin-left:6px;visibility:hidden}.tp-txtv.tp-txtv-drg .tp-ttv{visibility:visible}.tp-ttv{background-color:var(--in-fg);border-radius:var(--elm-br);color:var(--bs-bg);padding:2px 4px;pointer-events:none;position:absolute;transform:translate(-50%, -100%)}.tp-ttv::before{border-color:var(--in-fg) transparent transparent transparent;border-style:solid;border-width:2px;box-sizing:border-box;content:'';font-size:0.9em;height:4px;left:50%;margin-left:-2px;position:absolute;top:100%;width:4px}.tp-rotv{background-color:var(--bs-bg);border-radius:var(--bs-br);box-shadow:0 2px 4px var(--bs-sh);font-family:var(--font-family);font-size:11px;font-weight:500;line-height:1;text-align:left}.tp-rotv_b{border-bottom-left-radius:var(--bs-br);border-bottom-right-radius:var(--bs-br);border-top-left-radius:var(--bs-br);border-top-right-radius:var(--bs-br);padding-left:calc(2px * 2 + var(--bld-us) + var(--cnt-h-p));text-align:center}.tp-rotv.tp-rotv-expanded .tp-rotv_b{border-bottom-left-radius:0;border-bottom-right-radius:0}.tp-rotv.tp-rotv-not .tp-rotv_b{display:none}.tp-rotv_c>.tp-fldv.tp-v-lst>.tp-fldv_c,.tp-rotv_c>.tp-tabv.tp-v-lst>.tp-tabv_c{border-bottom-left-radius:var(--bs-br);border-bottom-right-radius:var(--bs-br)}.tp-rotv_c>.tp-fldv.tp-v-lst:not(.tp-fldv-expanded)>.tp-fldv_b{border-bottom-left-radius:var(--bs-br);border-bottom-right-radius:var(--bs-br)}.tp-rotv_c .tp-fldv.tp-v-vlst:not(.tp-fldv-expanded)>.tp-fldv_b{border-bottom-right-radius:var(--bs-br)}.tp-rotv.tp-rotv-not .tp-rotv_c>.tp-fldv.tp-v-fst{margin-top:calc(-1 * var(--cnt-v-p))}.tp-rotv.tp-rotv-not .tp-rotv_c>.tp-fldv.tp-v-fst>.tp-fldv_b{border-top-left-radius:var(--bs-br);border-top-right-radius:var(--bs-br)}.tp-rotv.tp-rotv-not .tp-rotv_c>.tp-tabv.tp-v-fst{margin-top:calc(-1 * var(--cnt-v-p))}.tp-rotv.tp-rotv-not .tp-rotv_c>.tp-tabv.tp-v-fst>.tp-tabv_i{border-top-left-radius:var(--bs-br);border-top-right-radius:var(--bs-br)}.tp-rotv.tp-v-disabled,.tp-rotv .tp-v-disabled{pointer-events:none}.tp-rotv.tp-v-hidden,.tp-rotv .tp-v-hidden{display:none}");
          this.pool_.getAll().forEach((plugin) => {
            this.embedPluginStyle_(plugin);
          });
          this.registerPlugin({
            plugins: [
              SliderBladePlugin,
              ListBladePlugin,
              TabBladePlugin,
              TextBladePlugin
            ]
          });
        }
      }
      __name(Pane2, "Pane");
      const VERSION = new Semver("3.0.6");
      exports2.BladeApi = BladeApi;
      exports2.ButtonApi = ButtonApi;
      exports2.FolderApi = FolderApi;
      exports2.InputBindingApi = InputBindingApi;
      exports2.ListApi = ListApi;
      exports2.MonitorBindingApi = MonitorBindingApi;
      exports2.Pane = Pane2;
      exports2.SeparatorApi = SeparatorApi;
      exports2.SliderApi = SliderApi;
      exports2.TabApi = TabApi;
      exports2.TabPageApi = TabPageApi;
      exports2.TextApi = TextApi;
      exports2.TpChangeEvent = TpChangeEvent;
      exports2.VERSION = VERSION;
      Object.defineProperty(exports2, "__esModule", { value: true });
    });
  }
});

// src/Runtime/Debug/Debugger.ts
var import_tweakpane = __toModule(require_tweakpane());
var Debugger = class {
  static start() {
    console.log("starting debugger.");
    const pane = new import_tweakpane.Pane({ title: "Debugger" });
    Runtime_default.onUpdate(() => pane.refresh());
    for (const entity of Runtime_default.entities) {
      const folder = pane.addFolder({ title: `\u{1F47E} ${[...entity.tags].join()}` });
      for (const [component, data] of entity.getAllComponents()) {
        const componentFolder = folder.addFolder({ title: `\u{1F4E6} ${component.constructor.name}` });
        const keys = Object.keys(data);
        for (const key of keys) {
          try {
            componentFolder.addInput(data, key);
          } catch (e) {
            console.log(e);
          }
        }
      }
    }
  }
};
__name(Debugger, "Debugger");
export {
  Debugger as default
};
/*! Tweakpane 3.0.6 (c) 2016 cocopon, licensed under the MIT license. */
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsiLi4vLi4vbm9kZV9tb2R1bGVzL3R3ZWFrcGFuZS9kaXN0L3R3ZWFrcGFuZS5qcyIsICIuLi8uLi9zcmMvUnVudGltZS9EZWJ1Zy9EZWJ1Z2dlci50cyJdLAogICJzb3VyY2VzQ29udGVudCI6IFsiLyohIFR3ZWFrcGFuZSAzLjAuNiAoYykgMjAxNiBjb2NvcG9uLCBsaWNlbnNlZCB1bmRlciB0aGUgTUlUIGxpY2Vuc2UuICovXG4oZnVuY3Rpb24gKGdsb2JhbCwgZmFjdG9yeSkge1xuICAgIHR5cGVvZiBleHBvcnRzID09PSAnb2JqZWN0JyAmJiB0eXBlb2YgbW9kdWxlICE9PSAndW5kZWZpbmVkJyA/IGZhY3RvcnkoZXhwb3J0cykgOlxuICAgIHR5cGVvZiBkZWZpbmUgPT09ICdmdW5jdGlvbicgJiYgZGVmaW5lLmFtZCA/IGRlZmluZShbJ2V4cG9ydHMnXSwgZmFjdG9yeSkgOlxuICAgIChnbG9iYWwgPSB0eXBlb2YgZ2xvYmFsVGhpcyAhPT0gJ3VuZGVmaW5lZCcgPyBnbG9iYWxUaGlzIDogZ2xvYmFsIHx8IHNlbGYsIGZhY3RvcnkoZ2xvYmFsLlR3ZWFrcGFuZSA9IHt9KSk7XG59KHRoaXMsIChmdW5jdGlvbiAoZXhwb3J0cykgeyAndXNlIHN0cmljdCc7XG5cbiAgICAvKioqXG4gICAgICogQSBzaW1wbGUgc2VtYW50aWMgdmVyc2lvbmluZyBwZXJzZXIuXG4gICAgICovXG4gICAgY2xhc3MgU2VtdmVyIHtcbiAgICAgICAgLyoqXG4gICAgICAgICAqIEBoaWRkZW5cbiAgICAgICAgICovXG4gICAgICAgIGNvbnN0cnVjdG9yKHRleHQpIHtcbiAgICAgICAgICAgIGNvbnN0IFtjb3JlLCBwcmVyZWxlYXNlXSA9IHRleHQuc3BsaXQoJy0nKTtcbiAgICAgICAgICAgIGNvbnN0IGNvcmVDb21wcyA9IGNvcmUuc3BsaXQoJy4nKTtcbiAgICAgICAgICAgIHRoaXMubWFqb3IgPSBwYXJzZUludChjb3JlQ29tcHNbMF0sIDEwKTtcbiAgICAgICAgICAgIHRoaXMubWlub3IgPSBwYXJzZUludChjb3JlQ29tcHNbMV0sIDEwKTtcbiAgICAgICAgICAgIHRoaXMucGF0Y2ggPSBwYXJzZUludChjb3JlQ29tcHNbMl0sIDEwKTtcbiAgICAgICAgICAgIHRoaXMucHJlcmVsZWFzZSA9IHByZXJlbGVhc2UgIT09IG51bGwgJiYgcHJlcmVsZWFzZSAhPT0gdm9pZCAwID8gcHJlcmVsZWFzZSA6IG51bGw7XG4gICAgICAgIH1cbiAgICAgICAgdG9TdHJpbmcoKSB7XG4gICAgICAgICAgICBjb25zdCBjb3JlID0gW3RoaXMubWFqb3IsIHRoaXMubWlub3IsIHRoaXMucGF0Y2hdLmpvaW4oJy4nKTtcbiAgICAgICAgICAgIHJldHVybiB0aGlzLnByZXJlbGVhc2UgIT09IG51bGwgPyBbY29yZSwgdGhpcy5wcmVyZWxlYXNlXS5qb2luKCctJykgOiBjb3JlO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgY2xhc3MgQmxhZGVBcGkge1xuICAgICAgICBjb25zdHJ1Y3Rvcihjb250cm9sbGVyKSB7XG4gICAgICAgICAgICB0aGlzLmNvbnRyb2xsZXJfID0gY29udHJvbGxlcjtcbiAgICAgICAgfVxuICAgICAgICBnZXQgZGlzYWJsZWQoKSB7XG4gICAgICAgICAgICByZXR1cm4gdGhpcy5jb250cm9sbGVyXy52aWV3UHJvcHMuZ2V0KCdkaXNhYmxlZCcpO1xuICAgICAgICB9XG4gICAgICAgIHNldCBkaXNhYmxlZChkaXNhYmxlZCkge1xuICAgICAgICAgICAgdGhpcy5jb250cm9sbGVyXy52aWV3UHJvcHMuc2V0KCdkaXNhYmxlZCcsIGRpc2FibGVkKTtcbiAgICAgICAgfVxuICAgICAgICBnZXQgaGlkZGVuKCkge1xuICAgICAgICAgICAgcmV0dXJuIHRoaXMuY29udHJvbGxlcl8udmlld1Byb3BzLmdldCgnaGlkZGVuJyk7XG4gICAgICAgIH1cbiAgICAgICAgc2V0IGhpZGRlbihoaWRkZW4pIHtcbiAgICAgICAgICAgIHRoaXMuY29udHJvbGxlcl8udmlld1Byb3BzLnNldCgnaGlkZGVuJywgaGlkZGVuKTtcbiAgICAgICAgfVxuICAgICAgICBkaXNwb3NlKCkge1xuICAgICAgICAgICAgdGhpcy5jb250cm9sbGVyXy52aWV3UHJvcHMuc2V0KCdkaXNwb3NlZCcsIHRydWUpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgY2xhc3MgVHBFdmVudCB7XG4gICAgICAgIGNvbnN0cnVjdG9yKHRhcmdldCkge1xuICAgICAgICAgICAgdGhpcy50YXJnZXQgPSB0YXJnZXQ7XG4gICAgICAgIH1cbiAgICB9XG4gICAgY2xhc3MgVHBDaGFuZ2VFdmVudCBleHRlbmRzIFRwRXZlbnQge1xuICAgICAgICBjb25zdHJ1Y3Rvcih0YXJnZXQsIHZhbHVlLCBwcmVzZXRLZXksIGxhc3QpIHtcbiAgICAgICAgICAgIHN1cGVyKHRhcmdldCk7XG4gICAgICAgICAgICB0aGlzLnZhbHVlID0gdmFsdWU7XG4gICAgICAgICAgICB0aGlzLnByZXNldEtleSA9IHByZXNldEtleTtcbiAgICAgICAgICAgIHRoaXMubGFzdCA9IGxhc3QgIT09IG51bGwgJiYgbGFzdCAhPT0gdm9pZCAwID8gbGFzdCA6IHRydWU7XG4gICAgICAgIH1cbiAgICB9XG4gICAgY2xhc3MgVHBVcGRhdGVFdmVudCBleHRlbmRzIFRwRXZlbnQge1xuICAgICAgICBjb25zdHJ1Y3Rvcih0YXJnZXQsIHZhbHVlLCBwcmVzZXRLZXkpIHtcbiAgICAgICAgICAgIHN1cGVyKHRhcmdldCk7XG4gICAgICAgICAgICB0aGlzLnZhbHVlID0gdmFsdWU7XG4gICAgICAgICAgICB0aGlzLnByZXNldEtleSA9IHByZXNldEtleTtcbiAgICAgICAgfVxuICAgIH1cbiAgICBjbGFzcyBUcEZvbGRFdmVudCBleHRlbmRzIFRwRXZlbnQge1xuICAgICAgICBjb25zdHJ1Y3Rvcih0YXJnZXQsIGV4cGFuZGVkKSB7XG4gICAgICAgICAgICBzdXBlcih0YXJnZXQpO1xuICAgICAgICAgICAgdGhpcy5leHBhbmRlZCA9IGV4cGFuZGVkO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gZm9yY2VDYXN0KHYpIHtcbiAgICAgICAgcmV0dXJuIHY7XG4gICAgfVxuICAgIGZ1bmN0aW9uIGlzRW1wdHkodmFsdWUpIHtcbiAgICAgICAgcmV0dXJuIHZhbHVlID09PSBudWxsIHx8IHZhbHVlID09PSB1bmRlZmluZWQ7XG4gICAgfVxuICAgIGZ1bmN0aW9uIGRlZXBFcXVhbHNBcnJheShhMSwgYTIpIHtcbiAgICAgICAgaWYgKGExLmxlbmd0aCAhPT0gYTIubGVuZ3RoKSB7XG4gICAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgIH1cbiAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBhMS5sZW5ndGg7IGkrKykge1xuICAgICAgICAgICAgaWYgKGExW2ldICE9PSBhMltpXSkge1xuICAgICAgICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICB9XG5cbiAgICBjb25zdCBDUkVBVEVfTUVTU0FHRV9NQVAgPSB7XG4gICAgICAgIGFscmVhZHlkaXNwb3NlZDogKCkgPT4gJ1ZpZXcgaGFzIGJlZW4gYWxyZWFkeSBkaXNwb3NlZCcsXG4gICAgICAgIGludmFsaWRwYXJhbXM6IChjb250ZXh0KSA9PiBgSW52YWxpZCBwYXJhbWV0ZXJzIGZvciAnJHtjb250ZXh0Lm5hbWV9J2AsXG4gICAgICAgIG5vbWF0Y2hpbmdjb250cm9sbGVyOiAoY29udGV4dCkgPT4gYE5vIG1hdGNoaW5nIGNvbnRyb2xsZXIgZm9yICcke2NvbnRleHQua2V5fSdgLFxuICAgICAgICBub21hdGNoaW5ndmlldzogKGNvbnRleHQpID0+IGBObyBtYXRjaGluZyB2aWV3IGZvciAnJHtKU09OLnN0cmluZ2lmeShjb250ZXh0LnBhcmFtcyl9J2AsXG4gICAgICAgIG5vdGJpbmRhYmxlOiAoKSA9PiBgVmFsdWUgaXMgbm90IGJpbmRhYmxlYCxcbiAgICAgICAgcHJvcGVydHlub3Rmb3VuZDogKGNvbnRleHQpID0+IGBQcm9wZXJ0eSAnJHtjb250ZXh0Lm5hbWV9JyBub3QgZm91bmRgLFxuICAgICAgICBzaG91bGRuZXZlcmhhcHBlbjogKCkgPT4gJ1RoaXMgZXJyb3Igc2hvdWxkIG5ldmVyIGhhcHBlbicsXG4gICAgfTtcbiAgICBjbGFzcyBUcEVycm9yIHtcbiAgICAgICAgY29uc3RydWN0b3IoY29uZmlnKSB7XG4gICAgICAgICAgICB2YXIgX2E7XG4gICAgICAgICAgICB0aGlzLm1lc3NhZ2UgPVxuICAgICAgICAgICAgICAgIChfYSA9IENSRUFURV9NRVNTQUdFX01BUFtjb25maWcudHlwZV0oZm9yY2VDYXN0KGNvbmZpZy5jb250ZXh0KSkpICE9PSBudWxsICYmIF9hICE9PSB2b2lkIDAgPyBfYSA6ICdVbmV4cGVjdGVkIGVycm9yJztcbiAgICAgICAgICAgIHRoaXMubmFtZSA9IHRoaXMuY29uc3RydWN0b3IubmFtZTtcbiAgICAgICAgICAgIHRoaXMuc3RhY2sgPSBuZXcgRXJyb3IodGhpcy5tZXNzYWdlKS5zdGFjaztcbiAgICAgICAgICAgIHRoaXMudHlwZSA9IGNvbmZpZy50eXBlO1xuICAgICAgICB9XG4gICAgICAgIHN0YXRpYyBhbHJlYWR5RGlzcG9zZWQoKSB7XG4gICAgICAgICAgICByZXR1cm4gbmV3IFRwRXJyb3IoeyB0eXBlOiAnYWxyZWFkeWRpc3Bvc2VkJyB9KTtcbiAgICAgICAgfVxuICAgICAgICBzdGF0aWMgbm90QmluZGFibGUoKSB7XG4gICAgICAgICAgICByZXR1cm4gbmV3IFRwRXJyb3Ioe1xuICAgICAgICAgICAgICAgIHR5cGU6ICdub3RiaW5kYWJsZScsXG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfVxuICAgICAgICBzdGF0aWMgcHJvcGVydHlOb3RGb3VuZChuYW1lKSB7XG4gICAgICAgICAgICByZXR1cm4gbmV3IFRwRXJyb3Ioe1xuICAgICAgICAgICAgICAgIHR5cGU6ICdwcm9wZXJ0eW5vdGZvdW5kJyxcbiAgICAgICAgICAgICAgICBjb250ZXh0OiB7XG4gICAgICAgICAgICAgICAgICAgIG5hbWU6IG5hbWUsXG4gICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9XG4gICAgICAgIHN0YXRpYyBzaG91bGROZXZlckhhcHBlbigpIHtcbiAgICAgICAgICAgIHJldHVybiBuZXcgVHBFcnJvcih7IHR5cGU6ICdzaG91bGRuZXZlcmhhcHBlbicgfSk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBjbGFzcyBCaW5kaW5nVGFyZ2V0IHtcbiAgICAgICAgY29uc3RydWN0b3Iob2JqLCBrZXksIG9wdF9pZCkge1xuICAgICAgICAgICAgdGhpcy5vYmpfID0gb2JqO1xuICAgICAgICAgICAgdGhpcy5rZXlfID0ga2V5O1xuICAgICAgICAgICAgdGhpcy5wcmVzZXRLZXlfID0gb3B0X2lkICE9PSBudWxsICYmIG9wdF9pZCAhPT0gdm9pZCAwID8gb3B0X2lkIDoga2V5O1xuICAgICAgICB9XG4gICAgICAgIHN0YXRpYyBpc0JpbmRhYmxlKG9iaikge1xuICAgICAgICAgICAgaWYgKG9iaiA9PT0gbnVsbCkge1xuICAgICAgICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGlmICh0eXBlb2Ygb2JqICE9PSAnb2JqZWN0Jykge1xuICAgICAgICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgICB9XG4gICAgICAgIGdldCBrZXkoKSB7XG4gICAgICAgICAgICByZXR1cm4gdGhpcy5rZXlfO1xuICAgICAgICB9XG4gICAgICAgIGdldCBwcmVzZXRLZXkoKSB7XG4gICAgICAgICAgICByZXR1cm4gdGhpcy5wcmVzZXRLZXlfO1xuICAgICAgICB9XG4gICAgICAgIHJlYWQoKSB7XG4gICAgICAgICAgICByZXR1cm4gdGhpcy5vYmpfW3RoaXMua2V5X107XG4gICAgICAgIH1cbiAgICAgICAgd3JpdGUodmFsdWUpIHtcbiAgICAgICAgICAgIHRoaXMub2JqX1t0aGlzLmtleV9dID0gdmFsdWU7XG4gICAgICAgIH1cbiAgICAgICAgd3JpdGVQcm9wZXJ0eShuYW1lLCB2YWx1ZSkge1xuICAgICAgICAgICAgY29uc3QgdmFsdWVPYmogPSB0aGlzLnJlYWQoKTtcbiAgICAgICAgICAgIGlmICghQmluZGluZ1RhcmdldC5pc0JpbmRhYmxlKHZhbHVlT2JqKSkge1xuICAgICAgICAgICAgICAgIHRocm93IFRwRXJyb3Iubm90QmluZGFibGUoKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGlmICghKG5hbWUgaW4gdmFsdWVPYmopKSB7XG4gICAgICAgICAgICAgICAgdGhyb3cgVHBFcnJvci5wcm9wZXJ0eU5vdEZvdW5kKG5hbWUpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgdmFsdWVPYmpbbmFtZV0gPSB2YWx1ZTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIGNsYXNzIEJ1dHRvbkFwaSBleHRlbmRzIEJsYWRlQXBpIHtcbiAgICAgICAgZ2V0IGxhYmVsKCkge1xuICAgICAgICAgICAgcmV0dXJuIHRoaXMuY29udHJvbGxlcl8ucHJvcHMuZ2V0KCdsYWJlbCcpO1xuICAgICAgICB9XG4gICAgICAgIHNldCBsYWJlbChsYWJlbCkge1xuICAgICAgICAgICAgdGhpcy5jb250cm9sbGVyXy5wcm9wcy5zZXQoJ2xhYmVsJywgbGFiZWwpO1xuICAgICAgICB9XG4gICAgICAgIGdldCB0aXRsZSgpIHtcbiAgICAgICAgICAgIHZhciBfYTtcbiAgICAgICAgICAgIHJldHVybiAoX2EgPSB0aGlzLmNvbnRyb2xsZXJfLnZhbHVlQ29udHJvbGxlci5wcm9wcy5nZXQoJ3RpdGxlJykpICE9PSBudWxsICYmIF9hICE9PSB2b2lkIDAgPyBfYSA6ICcnO1xuICAgICAgICB9XG4gICAgICAgIHNldCB0aXRsZSh0aXRsZSkge1xuICAgICAgICAgICAgdGhpcy5jb250cm9sbGVyXy52YWx1ZUNvbnRyb2xsZXIucHJvcHMuc2V0KCd0aXRsZScsIHRpdGxlKTtcbiAgICAgICAgfVxuICAgICAgICBvbihldmVudE5hbWUsIGhhbmRsZXIpIHtcbiAgICAgICAgICAgIGNvbnN0IGJoID0gaGFuZGxlci5iaW5kKHRoaXMpO1xuICAgICAgICAgICAgY29uc3QgZW1pdHRlciA9IHRoaXMuY29udHJvbGxlcl8udmFsdWVDb250cm9sbGVyLmVtaXR0ZXI7XG4gICAgICAgICAgICBlbWl0dGVyLm9uKGV2ZW50TmFtZSwgKCkgPT4ge1xuICAgICAgICAgICAgICAgIGJoKG5ldyBUcEV2ZW50KHRoaXMpKTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgcmV0dXJuIHRoaXM7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBjbGFzcyBFbWl0dGVyIHtcbiAgICAgICAgY29uc3RydWN0b3IoKSB7XG4gICAgICAgICAgICB0aGlzLm9ic2VydmVyc18gPSB7fTtcbiAgICAgICAgfVxuICAgICAgICBvbihldmVudE5hbWUsIGhhbmRsZXIpIHtcbiAgICAgICAgICAgIGxldCBvYnNlcnZlcnMgPSB0aGlzLm9ic2VydmVyc19bZXZlbnROYW1lXTtcbiAgICAgICAgICAgIGlmICghb2JzZXJ2ZXJzKSB7XG4gICAgICAgICAgICAgICAgb2JzZXJ2ZXJzID0gdGhpcy5vYnNlcnZlcnNfW2V2ZW50TmFtZV0gPSBbXTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIG9ic2VydmVycy5wdXNoKHtcbiAgICAgICAgICAgICAgICBoYW5kbGVyOiBoYW5kbGVyLFxuICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICByZXR1cm4gdGhpcztcbiAgICAgICAgfVxuICAgICAgICBvZmYoZXZlbnROYW1lLCBoYW5kbGVyKSB7XG4gICAgICAgICAgICBjb25zdCBvYnNlcnZlcnMgPSB0aGlzLm9ic2VydmVyc19bZXZlbnROYW1lXTtcbiAgICAgICAgICAgIGlmIChvYnNlcnZlcnMpIHtcbiAgICAgICAgICAgICAgICB0aGlzLm9ic2VydmVyc19bZXZlbnROYW1lXSA9IG9ic2VydmVycy5maWx0ZXIoKG9ic2VydmVyKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBvYnNlcnZlci5oYW5kbGVyICE9PSBoYW5kbGVyO1xuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgcmV0dXJuIHRoaXM7XG4gICAgICAgIH1cbiAgICAgICAgZW1pdChldmVudE5hbWUsIGV2ZW50KSB7XG4gICAgICAgICAgICBjb25zdCBvYnNlcnZlcnMgPSB0aGlzLm9ic2VydmVyc19bZXZlbnROYW1lXTtcbiAgICAgICAgICAgIGlmICghb2JzZXJ2ZXJzKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgb2JzZXJ2ZXJzLmZvckVhY2goKG9ic2VydmVyKSA9PiB7XG4gICAgICAgICAgICAgICAgb2JzZXJ2ZXIuaGFuZGxlcihldmVudCk7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIGNvbnN0IFBSRUZJWCA9ICd0cCc7XG4gICAgZnVuY3Rpb24gQ2xhc3NOYW1lKHZpZXdOYW1lKSB7XG4gICAgICAgIGNvbnN0IGZuID0gKG9wdF9lbGVtZW50TmFtZSwgb3B0X21vZGlmaWVyKSA9PiB7XG4gICAgICAgICAgICByZXR1cm4gW1xuICAgICAgICAgICAgICAgIFBSRUZJWCxcbiAgICAgICAgICAgICAgICAnLScsXG4gICAgICAgICAgICAgICAgdmlld05hbWUsXG4gICAgICAgICAgICAgICAgJ3YnLFxuICAgICAgICAgICAgICAgIG9wdF9lbGVtZW50TmFtZSA/IGBfJHtvcHRfZWxlbWVudE5hbWV9YCA6ICcnLFxuICAgICAgICAgICAgICAgIG9wdF9tb2RpZmllciA/IGAtJHtvcHRfbW9kaWZpZXJ9YCA6ICcnLFxuICAgICAgICAgICAgXS5qb2luKCcnKTtcbiAgICAgICAgfTtcbiAgICAgICAgcmV0dXJuIGZuO1xuICAgIH1cblxuICAgIGZ1bmN0aW9uIGNvbXBvc2UoaDEsIGgyKSB7XG4gICAgICAgIHJldHVybiAoaW5wdXQpID0+IGgyKGgxKGlucHV0KSk7XG4gICAgfVxuICAgIGZ1bmN0aW9uIGV4dHJhY3RWYWx1ZShldikge1xuICAgICAgICByZXR1cm4gZXYucmF3VmFsdWU7XG4gICAgfVxuICAgIGZ1bmN0aW9uIGJpbmRWYWx1ZSh2YWx1ZSwgYXBwbHlWYWx1ZSkge1xuICAgICAgICB2YWx1ZS5lbWl0dGVyLm9uKCdjaGFuZ2UnLCBjb21wb3NlKGV4dHJhY3RWYWx1ZSwgYXBwbHlWYWx1ZSkpO1xuICAgICAgICBhcHBseVZhbHVlKHZhbHVlLnJhd1ZhbHVlKTtcbiAgICB9XG4gICAgZnVuY3Rpb24gYmluZFZhbHVlTWFwKHZhbHVlTWFwLCBrZXksIGFwcGx5VmFsdWUpIHtcbiAgICAgICAgYmluZFZhbHVlKHZhbHVlTWFwLnZhbHVlKGtleSksIGFwcGx5VmFsdWUpO1xuICAgIH1cblxuICAgIGZ1bmN0aW9uIGFwcGx5Q2xhc3MoZWxlbSwgY2xhc3NOYW1lLCBhY3RpdmUpIHtcbiAgICAgICAgaWYgKGFjdGl2ZSkge1xuICAgICAgICAgICAgZWxlbS5jbGFzc0xpc3QuYWRkKGNsYXNzTmFtZSk7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICBlbGVtLmNsYXNzTGlzdC5yZW1vdmUoY2xhc3NOYW1lKTtcbiAgICAgICAgfVxuICAgIH1cbiAgICBmdW5jdGlvbiB2YWx1ZVRvQ2xhc3NOYW1lKGVsZW0sIGNsYXNzTmFtZSkge1xuICAgICAgICByZXR1cm4gKHZhbHVlKSA9PiB7XG4gICAgICAgICAgICBhcHBseUNsYXNzKGVsZW0sIGNsYXNzTmFtZSwgdmFsdWUpO1xuICAgICAgICB9O1xuICAgIH1cbiAgICBmdW5jdGlvbiBiaW5kVmFsdWVUb1RleHRDb250ZW50KHZhbHVlLCBlbGVtKSB7XG4gICAgICAgIGJpbmRWYWx1ZSh2YWx1ZSwgKHRleHQpID0+IHtcbiAgICAgICAgICAgIGVsZW0udGV4dENvbnRlbnQgPSB0ZXh0ICE9PSBudWxsICYmIHRleHQgIT09IHZvaWQgMCA/IHRleHQgOiAnJztcbiAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgY29uc3QgY2xhc3NOYW1lJHEgPSBDbGFzc05hbWUoJ2J0bicpO1xuICAgIGNsYXNzIEJ1dHRvblZpZXcge1xuICAgICAgICBjb25zdHJ1Y3Rvcihkb2MsIGNvbmZpZykge1xuICAgICAgICAgICAgdGhpcy5lbGVtZW50ID0gZG9jLmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xuICAgICAgICAgICAgdGhpcy5lbGVtZW50LmNsYXNzTGlzdC5hZGQoY2xhc3NOYW1lJHEoKSk7XG4gICAgICAgICAgICBjb25maWcudmlld1Byb3BzLmJpbmRDbGFzc01vZGlmaWVycyh0aGlzLmVsZW1lbnQpO1xuICAgICAgICAgICAgY29uc3QgYnV0dG9uRWxlbSA9IGRvYy5jcmVhdGVFbGVtZW50KCdidXR0b24nKTtcbiAgICAgICAgICAgIGJ1dHRvbkVsZW0uY2xhc3NMaXN0LmFkZChjbGFzc05hbWUkcSgnYicpKTtcbiAgICAgICAgICAgIGNvbmZpZy52aWV3UHJvcHMuYmluZERpc2FibGVkKGJ1dHRvbkVsZW0pO1xuICAgICAgICAgICAgdGhpcy5lbGVtZW50LmFwcGVuZENoaWxkKGJ1dHRvbkVsZW0pO1xuICAgICAgICAgICAgdGhpcy5idXR0b25FbGVtZW50ID0gYnV0dG9uRWxlbTtcbiAgICAgICAgICAgIGNvbnN0IHRpdGxlRWxlbSA9IGRvYy5jcmVhdGVFbGVtZW50KCdkaXYnKTtcbiAgICAgICAgICAgIHRpdGxlRWxlbS5jbGFzc0xpc3QuYWRkKGNsYXNzTmFtZSRxKCd0JykpO1xuICAgICAgICAgICAgYmluZFZhbHVlVG9UZXh0Q29udGVudChjb25maWcucHJvcHMudmFsdWUoJ3RpdGxlJyksIHRpdGxlRWxlbSk7XG4gICAgICAgICAgICB0aGlzLmJ1dHRvbkVsZW1lbnQuYXBwZW5kQ2hpbGQodGl0bGVFbGVtKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIGNsYXNzIEJ1dHRvbkNvbnRyb2xsZXIge1xuICAgICAgICBjb25zdHJ1Y3Rvcihkb2MsIGNvbmZpZykge1xuICAgICAgICAgICAgdGhpcy5lbWl0dGVyID0gbmV3IEVtaXR0ZXIoKTtcbiAgICAgICAgICAgIHRoaXMub25DbGlja18gPSB0aGlzLm9uQ2xpY2tfLmJpbmQodGhpcyk7XG4gICAgICAgICAgICB0aGlzLnByb3BzID0gY29uZmlnLnByb3BzO1xuICAgICAgICAgICAgdGhpcy52aWV3UHJvcHMgPSBjb25maWcudmlld1Byb3BzO1xuICAgICAgICAgICAgdGhpcy52aWV3ID0gbmV3IEJ1dHRvblZpZXcoZG9jLCB7XG4gICAgICAgICAgICAgICAgcHJvcHM6IHRoaXMucHJvcHMsXG4gICAgICAgICAgICAgICAgdmlld1Byb3BzOiB0aGlzLnZpZXdQcm9wcyxcbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgdGhpcy52aWV3LmJ1dHRvbkVsZW1lbnQuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCB0aGlzLm9uQ2xpY2tfKTtcbiAgICAgICAgfVxuICAgICAgICBvbkNsaWNrXygpIHtcbiAgICAgICAgICAgIHRoaXMuZW1pdHRlci5lbWl0KCdjbGljaycsIHtcbiAgICAgICAgICAgICAgICBzZW5kZXI6IHRoaXMsXG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIGNsYXNzIEJvdW5kVmFsdWUge1xuICAgICAgICBjb25zdHJ1Y3Rvcihpbml0aWFsVmFsdWUsIGNvbmZpZykge1xuICAgICAgICAgICAgdmFyIF9hO1xuICAgICAgICAgICAgdGhpcy5jb25zdHJhaW50XyA9IGNvbmZpZyA9PT0gbnVsbCB8fCBjb25maWcgPT09IHZvaWQgMCA/IHZvaWQgMCA6IGNvbmZpZy5jb25zdHJhaW50O1xuICAgICAgICAgICAgdGhpcy5lcXVhbHNfID0gKF9hID0gY29uZmlnID09PSBudWxsIHx8IGNvbmZpZyA9PT0gdm9pZCAwID8gdm9pZCAwIDogY29uZmlnLmVxdWFscykgIT09IG51bGwgJiYgX2EgIT09IHZvaWQgMCA/IF9hIDogKCh2MSwgdjIpID0+IHYxID09PSB2Mik7XG4gICAgICAgICAgICB0aGlzLmVtaXR0ZXIgPSBuZXcgRW1pdHRlcigpO1xuICAgICAgICAgICAgdGhpcy5yYXdWYWx1ZV8gPSBpbml0aWFsVmFsdWU7XG4gICAgICAgIH1cbiAgICAgICAgZ2V0IGNvbnN0cmFpbnQoKSB7XG4gICAgICAgICAgICByZXR1cm4gdGhpcy5jb25zdHJhaW50XztcbiAgICAgICAgfVxuICAgICAgICBnZXQgcmF3VmFsdWUoKSB7XG4gICAgICAgICAgICByZXR1cm4gdGhpcy5yYXdWYWx1ZV87XG4gICAgICAgIH1cbiAgICAgICAgc2V0IHJhd1ZhbHVlKHJhd1ZhbHVlKSB7XG4gICAgICAgICAgICB0aGlzLnNldFJhd1ZhbHVlKHJhd1ZhbHVlLCB7XG4gICAgICAgICAgICAgICAgZm9yY2VFbWl0OiBmYWxzZSxcbiAgICAgICAgICAgICAgICBsYXN0OiB0cnVlLFxuICAgICAgICAgICAgfSk7XG4gICAgICAgIH1cbiAgICAgICAgc2V0UmF3VmFsdWUocmF3VmFsdWUsIG9wdGlvbnMpIHtcbiAgICAgICAgICAgIGNvbnN0IG9wdHMgPSBvcHRpb25zICE9PSBudWxsICYmIG9wdGlvbnMgIT09IHZvaWQgMCA/IG9wdGlvbnMgOiB7XG4gICAgICAgICAgICAgICAgZm9yY2VFbWl0OiBmYWxzZSxcbiAgICAgICAgICAgICAgICBsYXN0OiB0cnVlLFxuICAgICAgICAgICAgfTtcbiAgICAgICAgICAgIGNvbnN0IGNvbnN0cmFpbmVkVmFsdWUgPSB0aGlzLmNvbnN0cmFpbnRfXG4gICAgICAgICAgICAgICAgPyB0aGlzLmNvbnN0cmFpbnRfLmNvbnN0cmFpbihyYXdWYWx1ZSlcbiAgICAgICAgICAgICAgICA6IHJhd1ZhbHVlO1xuICAgICAgICAgICAgY29uc3QgY2hhbmdlZCA9ICF0aGlzLmVxdWFsc18odGhpcy5yYXdWYWx1ZV8sIGNvbnN0cmFpbmVkVmFsdWUpO1xuICAgICAgICAgICAgaWYgKCFjaGFuZ2VkICYmICFvcHRzLmZvcmNlRW1pdCkge1xuICAgICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHRoaXMuZW1pdHRlci5lbWl0KCdiZWZvcmVjaGFuZ2UnLCB7XG4gICAgICAgICAgICAgICAgc2VuZGVyOiB0aGlzLFxuICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB0aGlzLnJhd1ZhbHVlXyA9IGNvbnN0cmFpbmVkVmFsdWU7XG4gICAgICAgICAgICB0aGlzLmVtaXR0ZXIuZW1pdCgnY2hhbmdlJywge1xuICAgICAgICAgICAgICAgIG9wdGlvbnM6IG9wdHMsXG4gICAgICAgICAgICAgICAgcmF3VmFsdWU6IGNvbnN0cmFpbmVkVmFsdWUsXG4gICAgICAgICAgICAgICAgc2VuZGVyOiB0aGlzLFxuICAgICAgICAgICAgfSk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBjbGFzcyBQcmltaXRpdmVWYWx1ZSB7XG4gICAgICAgIGNvbnN0cnVjdG9yKGluaXRpYWxWYWx1ZSkge1xuICAgICAgICAgICAgdGhpcy5lbWl0dGVyID0gbmV3IEVtaXR0ZXIoKTtcbiAgICAgICAgICAgIHRoaXMudmFsdWVfID0gaW5pdGlhbFZhbHVlO1xuICAgICAgICB9XG4gICAgICAgIGdldCByYXdWYWx1ZSgpIHtcbiAgICAgICAgICAgIHJldHVybiB0aGlzLnZhbHVlXztcbiAgICAgICAgfVxuICAgICAgICBzZXQgcmF3VmFsdWUodmFsdWUpIHtcbiAgICAgICAgICAgIHRoaXMuc2V0UmF3VmFsdWUodmFsdWUsIHtcbiAgICAgICAgICAgICAgICBmb3JjZUVtaXQ6IGZhbHNlLFxuICAgICAgICAgICAgICAgIGxhc3Q6IHRydWUsXG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfVxuICAgICAgICBzZXRSYXdWYWx1ZSh2YWx1ZSwgb3B0aW9ucykge1xuICAgICAgICAgICAgY29uc3Qgb3B0cyA9IG9wdGlvbnMgIT09IG51bGwgJiYgb3B0aW9ucyAhPT0gdm9pZCAwID8gb3B0aW9ucyA6IHtcbiAgICAgICAgICAgICAgICBmb3JjZUVtaXQ6IGZhbHNlLFxuICAgICAgICAgICAgICAgIGxhc3Q6IHRydWUsXG4gICAgICAgICAgICB9O1xuICAgICAgICAgICAgaWYgKHRoaXMudmFsdWVfID09PSB2YWx1ZSAmJiAhb3B0cy5mb3JjZUVtaXQpIHtcbiAgICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICB0aGlzLmVtaXR0ZXIuZW1pdCgnYmVmb3JlY2hhbmdlJywge1xuICAgICAgICAgICAgICAgIHNlbmRlcjogdGhpcyxcbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgdGhpcy52YWx1ZV8gPSB2YWx1ZTtcbiAgICAgICAgICAgIHRoaXMuZW1pdHRlci5lbWl0KCdjaGFuZ2UnLCB7XG4gICAgICAgICAgICAgICAgb3B0aW9uczogb3B0cyxcbiAgICAgICAgICAgICAgICByYXdWYWx1ZTogdGhpcy52YWx1ZV8sXG4gICAgICAgICAgICAgICAgc2VuZGVyOiB0aGlzLFxuICAgICAgICAgICAgfSk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBmdW5jdGlvbiBjcmVhdGVWYWx1ZShpbml0aWFsVmFsdWUsIGNvbmZpZykge1xuICAgICAgICBjb25zdCBjb25zdHJhaW50ID0gY29uZmlnID09PSBudWxsIHx8IGNvbmZpZyA9PT0gdm9pZCAwID8gdm9pZCAwIDogY29uZmlnLmNvbnN0cmFpbnQ7XG4gICAgICAgIGNvbnN0IGVxdWFscyA9IGNvbmZpZyA9PT0gbnVsbCB8fCBjb25maWcgPT09IHZvaWQgMCA/IHZvaWQgMCA6IGNvbmZpZy5lcXVhbHM7XG4gICAgICAgIGlmICghY29uc3RyYWludCAmJiAhZXF1YWxzKSB7XG4gICAgICAgICAgICByZXR1cm4gbmV3IFByaW1pdGl2ZVZhbHVlKGluaXRpYWxWYWx1ZSk7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIG5ldyBCb3VuZFZhbHVlKGluaXRpYWxWYWx1ZSwgY29uZmlnKTtcbiAgICB9XG5cbiAgICBjbGFzcyBWYWx1ZU1hcCB7XG4gICAgICAgIGNvbnN0cnVjdG9yKHZhbHVlTWFwKSB7XG4gICAgICAgICAgICB0aGlzLmVtaXR0ZXIgPSBuZXcgRW1pdHRlcigpO1xuICAgICAgICAgICAgdGhpcy52YWxNYXBfID0gdmFsdWVNYXA7XG4gICAgICAgICAgICBmb3IgKGNvbnN0IGtleSBpbiB0aGlzLnZhbE1hcF8pIHtcbiAgICAgICAgICAgICAgICBjb25zdCB2ID0gdGhpcy52YWxNYXBfW2tleV07XG4gICAgICAgICAgICAgICAgdi5lbWl0dGVyLm9uKCdjaGFuZ2UnLCAoKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuZW1pdHRlci5lbWl0KCdjaGFuZ2UnLCB7XG4gICAgICAgICAgICAgICAgICAgICAgICBrZXk6IGtleSxcbiAgICAgICAgICAgICAgICAgICAgICAgIHNlbmRlcjogdGhpcyxcbiAgICAgICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgc3RhdGljIGNyZWF0ZUNvcmUoaW5pdGlhbFZhbHVlKSB7XG4gICAgICAgICAgICBjb25zdCBrZXlzID0gT2JqZWN0LmtleXMoaW5pdGlhbFZhbHVlKTtcbiAgICAgICAgICAgIHJldHVybiBrZXlzLnJlZHVjZSgobywga2V5KSA9PiB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIE9iamVjdC5hc3NpZ24obywge1xuICAgICAgICAgICAgICAgICAgICBba2V5XTogY3JlYXRlVmFsdWUoaW5pdGlhbFZhbHVlW2tleV0pLFxuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgfSwge30pO1xuICAgICAgICB9XG4gICAgICAgIHN0YXRpYyBmcm9tT2JqZWN0KGluaXRpYWxWYWx1ZSkge1xuICAgICAgICAgICAgY29uc3QgY29yZSA9IHRoaXMuY3JlYXRlQ29yZShpbml0aWFsVmFsdWUpO1xuICAgICAgICAgICAgcmV0dXJuIG5ldyBWYWx1ZU1hcChjb3JlKTtcbiAgICAgICAgfVxuICAgICAgICBnZXQoa2V5KSB7XG4gICAgICAgICAgICByZXR1cm4gdGhpcy52YWxNYXBfW2tleV0ucmF3VmFsdWU7XG4gICAgICAgIH1cbiAgICAgICAgc2V0KGtleSwgdmFsdWUpIHtcbiAgICAgICAgICAgIHRoaXMudmFsTWFwX1trZXldLnJhd1ZhbHVlID0gdmFsdWU7XG4gICAgICAgIH1cbiAgICAgICAgdmFsdWUoa2V5KSB7XG4gICAgICAgICAgICByZXR1cm4gdGhpcy52YWxNYXBfW2tleV07XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBmdW5jdGlvbiBwYXJzZU9iamVjdCh2YWx1ZSwga2V5VG9QYXJzZXJNYXApIHtcbiAgICAgICAgY29uc3Qga2V5cyA9IE9iamVjdC5rZXlzKGtleVRvUGFyc2VyTWFwKTtcbiAgICAgICAgY29uc3QgcmVzdWx0ID0ga2V5cy5yZWR1Y2UoKHRtcCwga2V5KSA9PiB7XG4gICAgICAgICAgICBpZiAodG1wID09PSB1bmRlZmluZWQpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gdW5kZWZpbmVkO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgY29uc3QgcGFyc2VyID0ga2V5VG9QYXJzZXJNYXBba2V5XTtcbiAgICAgICAgICAgIGNvbnN0IHJlc3VsdCA9IHBhcnNlcih2YWx1ZVtrZXldKTtcbiAgICAgICAgICAgIHJldHVybiByZXN1bHQuc3VjY2VlZGVkXG4gICAgICAgICAgICAgICAgPyBPYmplY3QuYXNzaWduKE9iamVjdC5hc3NpZ24oe30sIHRtcCksIHsgW2tleV06IHJlc3VsdC52YWx1ZSB9KSA6IHVuZGVmaW5lZDtcbiAgICAgICAgfSwge30pO1xuICAgICAgICByZXR1cm4gZm9yY2VDYXN0KHJlc3VsdCk7XG4gICAgfVxuICAgIGZ1bmN0aW9uIHBhcnNlQXJyYXkodmFsdWUsIHBhcnNlSXRlbSkge1xuICAgICAgICByZXR1cm4gdmFsdWUucmVkdWNlKCh0bXAsIGl0ZW0pID0+IHtcbiAgICAgICAgICAgIGlmICh0bXAgPT09IHVuZGVmaW5lZCkge1xuICAgICAgICAgICAgICAgIHJldHVybiB1bmRlZmluZWQ7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBjb25zdCByZXN1bHQgPSBwYXJzZUl0ZW0oaXRlbSk7XG4gICAgICAgICAgICBpZiAoIXJlc3VsdC5zdWNjZWVkZWQgfHwgcmVzdWx0LnZhbHVlID09PSB1bmRlZmluZWQpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gdW5kZWZpbmVkO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgcmV0dXJuIFsuLi50bXAsIHJlc3VsdC52YWx1ZV07XG4gICAgICAgIH0sIFtdKTtcbiAgICB9XG4gICAgZnVuY3Rpb24gaXNPYmplY3QodmFsdWUpIHtcbiAgICAgICAgaWYgKHZhbHVlID09PSBudWxsKSB7XG4gICAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHR5cGVvZiB2YWx1ZSA9PT0gJ29iamVjdCc7XG4gICAgfVxuICAgIGZ1bmN0aW9uIGNyZWF0ZVBhcmFtc1BhcnNlckJ1aWxkZXIocGFyc2UpIHtcbiAgICAgICAgcmV0dXJuIChvcHRpb25hbCkgPT4gKHYpID0+IHtcbiAgICAgICAgICAgIGlmICghb3B0aW9uYWwgJiYgdiA9PT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgICAgICAgICAgc3VjY2VlZGVkOiBmYWxzZSxcbiAgICAgICAgICAgICAgICAgICAgdmFsdWU6IHVuZGVmaW5lZCxcbiAgICAgICAgICAgICAgICB9O1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaWYgKG9wdGlvbmFsICYmIHYgPT09IHVuZGVmaW5lZCkge1xuICAgICAgICAgICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICAgICAgICAgIHN1Y2NlZWRlZDogdHJ1ZSxcbiAgICAgICAgICAgICAgICAgICAgdmFsdWU6IHVuZGVmaW5lZCxcbiAgICAgICAgICAgICAgICB9O1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgY29uc3QgcmVzdWx0ID0gcGFyc2Uodik7XG4gICAgICAgICAgICByZXR1cm4gcmVzdWx0ICE9PSB1bmRlZmluZWRcbiAgICAgICAgICAgICAgICA/IHtcbiAgICAgICAgICAgICAgICAgICAgc3VjY2VlZGVkOiB0cnVlLFxuICAgICAgICAgICAgICAgICAgICB2YWx1ZTogcmVzdWx0LFxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICA6IHtcbiAgICAgICAgICAgICAgICAgICAgc3VjY2VlZGVkOiBmYWxzZSxcbiAgICAgICAgICAgICAgICAgICAgdmFsdWU6IHVuZGVmaW5lZCxcbiAgICAgICAgICAgICAgICB9O1xuICAgICAgICB9O1xuICAgIH1cbiAgICBmdW5jdGlvbiBjcmVhdGVQYXJhbXNQYXJzZXJCdWlsZGVycyhvcHRpb25hbCkge1xuICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgY3VzdG9tOiAocGFyc2UpID0+IGNyZWF0ZVBhcmFtc1BhcnNlckJ1aWxkZXIocGFyc2UpKG9wdGlvbmFsKSxcbiAgICAgICAgICAgIGJvb2xlYW46IGNyZWF0ZVBhcmFtc1BhcnNlckJ1aWxkZXIoKHYpID0+IHR5cGVvZiB2ID09PSAnYm9vbGVhbicgPyB2IDogdW5kZWZpbmVkKShvcHRpb25hbCksXG4gICAgICAgICAgICBudW1iZXI6IGNyZWF0ZVBhcmFtc1BhcnNlckJ1aWxkZXIoKHYpID0+IHR5cGVvZiB2ID09PSAnbnVtYmVyJyA/IHYgOiB1bmRlZmluZWQpKG9wdGlvbmFsKSxcbiAgICAgICAgICAgIHN0cmluZzogY3JlYXRlUGFyYW1zUGFyc2VyQnVpbGRlcigodikgPT4gdHlwZW9mIHYgPT09ICdzdHJpbmcnID8gdiA6IHVuZGVmaW5lZCkob3B0aW9uYWwpLFxuICAgICAgICAgICAgZnVuY3Rpb246IGNyZWF0ZVBhcmFtc1BhcnNlckJ1aWxkZXIoKHYpID0+XG4gICAgICAgICAgICB0eXBlb2YgdiA9PT0gJ2Z1bmN0aW9uJyA/IHYgOiB1bmRlZmluZWQpKG9wdGlvbmFsKSxcbiAgICAgICAgICAgIGNvbnN0YW50OiAodmFsdWUpID0+IGNyZWF0ZVBhcmFtc1BhcnNlckJ1aWxkZXIoKHYpID0+ICh2ID09PSB2YWx1ZSA/IHZhbHVlIDogdW5kZWZpbmVkKSkob3B0aW9uYWwpLFxuICAgICAgICAgICAgcmF3OiBjcmVhdGVQYXJhbXNQYXJzZXJCdWlsZGVyKCh2KSA9PiB2KShvcHRpb25hbCksXG4gICAgICAgICAgICBvYmplY3Q6IChrZXlUb1BhcnNlck1hcCkgPT4gY3JlYXRlUGFyYW1zUGFyc2VyQnVpbGRlcigodikgPT4ge1xuICAgICAgICAgICAgICAgIGlmICghaXNPYmplY3QodikpIHtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHVuZGVmaW5lZDtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgcmV0dXJuIHBhcnNlT2JqZWN0KHYsIGtleVRvUGFyc2VyTWFwKTtcbiAgICAgICAgICAgIH0pKG9wdGlvbmFsKSxcbiAgICAgICAgICAgIGFycmF5OiAoaXRlbVBhcnNlcikgPT4gY3JlYXRlUGFyYW1zUGFyc2VyQnVpbGRlcigodikgPT4ge1xuICAgICAgICAgICAgICAgIGlmICghQXJyYXkuaXNBcnJheSh2KSkge1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gdW5kZWZpbmVkO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICByZXR1cm4gcGFyc2VBcnJheSh2LCBpdGVtUGFyc2VyKTtcbiAgICAgICAgICAgIH0pKG9wdGlvbmFsKSxcbiAgICAgICAgfTtcbiAgICB9XG4gICAgY29uc3QgUGFyYW1zUGFyc2VycyA9IHtcbiAgICAgICAgb3B0aW9uYWw6IGNyZWF0ZVBhcmFtc1BhcnNlckJ1aWxkZXJzKHRydWUpLFxuICAgICAgICByZXF1aXJlZDogY3JlYXRlUGFyYW1zUGFyc2VyQnVpbGRlcnMoZmFsc2UpLFxuICAgIH07XG4gICAgZnVuY3Rpb24gcGFyc2VQYXJhbXModmFsdWUsIGtleVRvUGFyc2VyTWFwKSB7XG4gICAgICAgIGNvbnN0IHJlc3VsdCA9IFBhcmFtc1BhcnNlcnMucmVxdWlyZWQub2JqZWN0KGtleVRvUGFyc2VyTWFwKSh2YWx1ZSk7XG4gICAgICAgIHJldHVybiByZXN1bHQuc3VjY2VlZGVkID8gcmVzdWx0LnZhbHVlIDogdW5kZWZpbmVkO1xuICAgIH1cblxuICAgIGZ1bmN0aW9uIGRpc3Bvc2VFbGVtZW50KGVsZW0pIHtcbiAgICAgICAgaWYgKGVsZW0gJiYgZWxlbS5wYXJlbnRFbGVtZW50KSB7XG4gICAgICAgICAgICBlbGVtLnBhcmVudEVsZW1lbnQucmVtb3ZlQ2hpbGQoZWxlbSk7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIG51bGw7XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gZ2V0QWxsQmxhZGVQb3NpdGlvbnMoKSB7XG4gICAgICAgIHJldHVybiBbJ3ZlcnlmaXJzdCcsICdmaXJzdCcsICdsYXN0JywgJ3ZlcnlsYXN0J107XG4gICAgfVxuXG4gICAgY29uc3QgY2xhc3NOYW1lJHAgPSBDbGFzc05hbWUoJycpO1xuICAgIGNvbnN0IFBPU19UT19DTEFTU19OQU1FX01BUCA9IHtcbiAgICAgICAgdmVyeWZpcnN0OiAndmZzdCcsXG4gICAgICAgIGZpcnN0OiAnZnN0JyxcbiAgICAgICAgbGFzdDogJ2xzdCcsXG4gICAgICAgIHZlcnlsYXN0OiAndmxzdCcsXG4gICAgfTtcbiAgICBjbGFzcyBCbGFkZUNvbnRyb2xsZXIge1xuICAgICAgICBjb25zdHJ1Y3Rvcihjb25maWcpIHtcbiAgICAgICAgICAgIHRoaXMucGFyZW50XyA9IG51bGw7XG4gICAgICAgICAgICB0aGlzLmJsYWRlID0gY29uZmlnLmJsYWRlO1xuICAgICAgICAgICAgdGhpcy52aWV3ID0gY29uZmlnLnZpZXc7XG4gICAgICAgICAgICB0aGlzLnZpZXdQcm9wcyA9IGNvbmZpZy52aWV3UHJvcHM7XG4gICAgICAgICAgICBjb25zdCBlbGVtID0gdGhpcy52aWV3LmVsZW1lbnQ7XG4gICAgICAgICAgICB0aGlzLmJsYWRlLnZhbHVlKCdwb3NpdGlvbnMnKS5lbWl0dGVyLm9uKCdjaGFuZ2UnLCAoKSA9PiB7XG4gICAgICAgICAgICAgICAgZ2V0QWxsQmxhZGVQb3NpdGlvbnMoKS5mb3JFYWNoKChwb3MpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgZWxlbS5jbGFzc0xpc3QucmVtb3ZlKGNsYXNzTmFtZSRwKHVuZGVmaW5lZCwgUE9TX1RPX0NMQVNTX05BTUVfTUFQW3Bvc10pKTtcbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICB0aGlzLmJsYWRlLmdldCgncG9zaXRpb25zJykuZm9yRWFjaCgocG9zKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgIGVsZW0uY2xhc3NMaXN0LmFkZChjbGFzc05hbWUkcCh1bmRlZmluZWQsIFBPU19UT19DTEFTU19OQU1FX01BUFtwb3NdKSk7XG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIHRoaXMudmlld1Byb3BzLmhhbmRsZURpc3Bvc2UoKCkgPT4ge1xuICAgICAgICAgICAgICAgIGRpc3Bvc2VFbGVtZW50KGVsZW0pO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgIH1cbiAgICAgICAgZ2V0IHBhcmVudCgpIHtcbiAgICAgICAgICAgIHJldHVybiB0aGlzLnBhcmVudF87XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBjb25zdCBTVkdfTlMgPSAnaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmcnO1xuICAgIGZ1bmN0aW9uIGZvcmNlUmVmbG93KGVsZW1lbnQpIHtcbiAgICAgICAgZWxlbWVudC5vZmZzZXRIZWlnaHQ7XG4gICAgfVxuICAgIGZ1bmN0aW9uIGRpc2FibGVUcmFuc2l0aW9uVGVtcG9yYXJpbHkoZWxlbWVudCwgY2FsbGJhY2spIHtcbiAgICAgICAgY29uc3QgdCA9IGVsZW1lbnQuc3R5bGUudHJhbnNpdGlvbjtcbiAgICAgICAgZWxlbWVudC5zdHlsZS50cmFuc2l0aW9uID0gJ25vbmUnO1xuICAgICAgICBjYWxsYmFjaygpO1xuICAgICAgICBlbGVtZW50LnN0eWxlLnRyYW5zaXRpb24gPSB0O1xuICAgIH1cbiAgICBmdW5jdGlvbiBzdXBwb3J0c1RvdWNoKGRvYykge1xuICAgICAgICByZXR1cm4gZG9jLm9udG91Y2hzdGFydCAhPT0gdW5kZWZpbmVkO1xuICAgIH1cbiAgICBmdW5jdGlvbiBnZXRHbG9iYWxPYmplY3QoKSB7XG4gICAgICAgIHJldHVybiBuZXcgRnVuY3Rpb24oJ3JldHVybiB0aGlzJykoKTtcbiAgICB9XG4gICAgZnVuY3Rpb24gZ2V0V2luZG93RG9jdW1lbnQoKSB7XG4gICAgICAgIGNvbnN0IGdsb2JhbE9iaiA9IGZvcmNlQ2FzdChnZXRHbG9iYWxPYmplY3QoKSk7XG4gICAgICAgIHJldHVybiBnbG9iYWxPYmouZG9jdW1lbnQ7XG4gICAgfVxuICAgIGZ1bmN0aW9uIGlzQnJvd3NlcigpIHtcbiAgICAgICAgcmV0dXJuICdkb2N1bWVudCcgaW4gZ2V0R2xvYmFsT2JqZWN0KCk7XG4gICAgfVxuICAgIGZ1bmN0aW9uIGdldENhbnZhc0NvbnRleHQoY2FudmFzRWxlbWVudCkge1xuICAgICAgICByZXR1cm4gaXNCcm93c2VyKCkgPyBjYW52YXNFbGVtZW50LmdldENvbnRleHQoJzJkJykgOiBudWxsO1xuICAgIH1cbiAgICBjb25zdCBJQ09OX0lEX1RPX0lOTkVSX0hUTUxfTUFQID0ge1xuICAgICAgICBjaGVjazogJzxwYXRoIGQ9XCJNMiA4bDQgNGw4IC04XCIvPicsXG4gICAgICAgIGRyb3Bkb3duOiAnPHBhdGggZD1cIk01IDdoNmwtMyAzIHpcIi8+JyxcbiAgICAgICAgcDJkcGFkOiAnPHBhdGggZD1cIk04IDR2OFwiLz48cGF0aCBkPVwiTTQgOGg4XCIvPjxjaXJjbGUgY3g9XCIxMlwiIGN5PVwiMTJcIiByPVwiMS4yXCIvPicsXG4gICAgfTtcbiAgICBmdW5jdGlvbiBjcmVhdGVTdmdJY29uRWxlbWVudChkb2N1bWVudCwgaWNvbklkKSB7XG4gICAgICAgIGNvbnN0IGVsZW0gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50TlMoU1ZHX05TLCAnc3ZnJyk7XG4gICAgICAgIGVsZW0uaW5uZXJIVE1MID0gSUNPTl9JRF9UT19JTk5FUl9IVE1MX01BUFtpY29uSWRdO1xuICAgICAgICByZXR1cm4gZWxlbTtcbiAgICB9XG4gICAgZnVuY3Rpb24gaW5zZXJ0RWxlbWVudEF0KHBhcmVudEVsZW1lbnQsIGVsZW1lbnQsIGluZGV4KSB7XG4gICAgICAgIHBhcmVudEVsZW1lbnQuaW5zZXJ0QmVmb3JlKGVsZW1lbnQsIHBhcmVudEVsZW1lbnQuY2hpbGRyZW5baW5kZXhdKTtcbiAgICB9XG4gICAgZnVuY3Rpb24gcmVtb3ZlRWxlbWVudChlbGVtZW50KSB7XG4gICAgICAgIGlmIChlbGVtZW50LnBhcmVudEVsZW1lbnQpIHtcbiAgICAgICAgICAgIGVsZW1lbnQucGFyZW50RWxlbWVudC5yZW1vdmVDaGlsZChlbGVtZW50KTtcbiAgICAgICAgfVxuICAgIH1cbiAgICBmdW5jdGlvbiByZW1vdmVDaGlsZEVsZW1lbnRzKGVsZW1lbnQpIHtcbiAgICAgICAgd2hpbGUgKGVsZW1lbnQuY2hpbGRyZW4ubGVuZ3RoID4gMCkge1xuICAgICAgICAgICAgZWxlbWVudC5yZW1vdmVDaGlsZChlbGVtZW50LmNoaWxkcmVuWzBdKTtcbiAgICAgICAgfVxuICAgIH1cbiAgICBmdW5jdGlvbiByZW1vdmVDaGlsZE5vZGVzKGVsZW1lbnQpIHtcbiAgICAgICAgd2hpbGUgKGVsZW1lbnQuY2hpbGROb2Rlcy5sZW5ndGggPiAwKSB7XG4gICAgICAgICAgICBlbGVtZW50LnJlbW92ZUNoaWxkKGVsZW1lbnQuY2hpbGROb2Rlc1swXSk7XG4gICAgICAgIH1cbiAgICB9XG4gICAgZnVuY3Rpb24gZmluZE5leHRUYXJnZXQoZXYpIHtcbiAgICAgICAgaWYgKGV2LnJlbGF0ZWRUYXJnZXQpIHtcbiAgICAgICAgICAgIHJldHVybiBmb3JjZUNhc3QoZXYucmVsYXRlZFRhcmdldCk7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKCdleHBsaWNpdE9yaWdpbmFsVGFyZ2V0JyBpbiBldikge1xuICAgICAgICAgICAgcmV0dXJuIGV2LmV4cGxpY2l0T3JpZ2luYWxUYXJnZXQ7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIG51bGw7XG4gICAgfVxuXG4gICAgY29uc3QgY2xhc3NOYW1lJG8gPSBDbGFzc05hbWUoJ2xibCcpO1xuICAgIGZ1bmN0aW9uIGNyZWF0ZUxhYmVsTm9kZShkb2MsIGxhYmVsKSB7XG4gICAgICAgIGNvbnN0IGZyYWcgPSBkb2MuY3JlYXRlRG9jdW1lbnRGcmFnbWVudCgpO1xuICAgICAgICBjb25zdCBsaW5lTm9kZXMgPSBsYWJlbC5zcGxpdCgnXFxuJykubWFwKChsaW5lKSA9PiB7XG4gICAgICAgICAgICByZXR1cm4gZG9jLmNyZWF0ZVRleHROb2RlKGxpbmUpO1xuICAgICAgICB9KTtcbiAgICAgICAgbGluZU5vZGVzLmZvckVhY2goKGxpbmVOb2RlLCBpbmRleCkgPT4ge1xuICAgICAgICAgICAgaWYgKGluZGV4ID4gMCkge1xuICAgICAgICAgICAgICAgIGZyYWcuYXBwZW5kQ2hpbGQoZG9jLmNyZWF0ZUVsZW1lbnQoJ2JyJykpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZnJhZy5hcHBlbmRDaGlsZChsaW5lTm9kZSk7XG4gICAgICAgIH0pO1xuICAgICAgICByZXR1cm4gZnJhZztcbiAgICB9XG4gICAgY2xhc3MgTGFiZWxWaWV3IHtcbiAgICAgICAgY29uc3RydWN0b3IoZG9jLCBjb25maWcpIHtcbiAgICAgICAgICAgIHRoaXMuZWxlbWVudCA9IGRvYy5jcmVhdGVFbGVtZW50KCdkaXYnKTtcbiAgICAgICAgICAgIHRoaXMuZWxlbWVudC5jbGFzc0xpc3QuYWRkKGNsYXNzTmFtZSRvKCkpO1xuICAgICAgICAgICAgY29uZmlnLnZpZXdQcm9wcy5iaW5kQ2xhc3NNb2RpZmllcnModGhpcy5lbGVtZW50KTtcbiAgICAgICAgICAgIGNvbnN0IGxhYmVsRWxlbSA9IGRvYy5jcmVhdGVFbGVtZW50KCdkaXYnKTtcbiAgICAgICAgICAgIGxhYmVsRWxlbS5jbGFzc0xpc3QuYWRkKGNsYXNzTmFtZSRvKCdsJykpO1xuICAgICAgICAgICAgYmluZFZhbHVlTWFwKGNvbmZpZy5wcm9wcywgJ2xhYmVsJywgKHZhbHVlKSA9PiB7XG4gICAgICAgICAgICAgICAgaWYgKGlzRW1wdHkodmFsdWUpKSB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuZWxlbWVudC5jbGFzc0xpc3QuYWRkKGNsYXNzTmFtZSRvKHVuZGVmaW5lZCwgJ25vbCcpKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuZWxlbWVudC5jbGFzc0xpc3QucmVtb3ZlKGNsYXNzTmFtZSRvKHVuZGVmaW5lZCwgJ25vbCcpKTtcbiAgICAgICAgICAgICAgICAgICAgcmVtb3ZlQ2hpbGROb2RlcyhsYWJlbEVsZW0pO1xuICAgICAgICAgICAgICAgICAgICBsYWJlbEVsZW0uYXBwZW5kQ2hpbGQoY3JlYXRlTGFiZWxOb2RlKGRvYywgdmFsdWUpKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIHRoaXMuZWxlbWVudC5hcHBlbmRDaGlsZChsYWJlbEVsZW0pO1xuICAgICAgICAgICAgdGhpcy5sYWJlbEVsZW1lbnQgPSBsYWJlbEVsZW07XG4gICAgICAgICAgICBjb25zdCB2YWx1ZUVsZW0gPSBkb2MuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XG4gICAgICAgICAgICB2YWx1ZUVsZW0uY2xhc3NMaXN0LmFkZChjbGFzc05hbWUkbygndicpKTtcbiAgICAgICAgICAgIHRoaXMuZWxlbWVudC5hcHBlbmRDaGlsZCh2YWx1ZUVsZW0pO1xuICAgICAgICAgICAgdGhpcy52YWx1ZUVsZW1lbnQgPSB2YWx1ZUVsZW07XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBjbGFzcyBMYWJlbENvbnRyb2xsZXIgZXh0ZW5kcyBCbGFkZUNvbnRyb2xsZXIge1xuICAgICAgICBjb25zdHJ1Y3Rvcihkb2MsIGNvbmZpZykge1xuICAgICAgICAgICAgY29uc3Qgdmlld1Byb3BzID0gY29uZmlnLnZhbHVlQ29udHJvbGxlci52aWV3UHJvcHM7XG4gICAgICAgICAgICBzdXBlcihPYmplY3QuYXNzaWduKE9iamVjdC5hc3NpZ24oe30sIGNvbmZpZyksIHsgdmlldzogbmV3IExhYmVsVmlldyhkb2MsIHtcbiAgICAgICAgICAgICAgICAgICAgcHJvcHM6IGNvbmZpZy5wcm9wcyxcbiAgICAgICAgICAgICAgICAgICAgdmlld1Byb3BzOiB2aWV3UHJvcHMsXG4gICAgICAgICAgICAgICAgfSksIHZpZXdQcm9wczogdmlld1Byb3BzIH0pKTtcbiAgICAgICAgICAgIHRoaXMucHJvcHMgPSBjb25maWcucHJvcHM7XG4gICAgICAgICAgICB0aGlzLnZhbHVlQ29udHJvbGxlciA9IGNvbmZpZy52YWx1ZUNvbnRyb2xsZXI7XG4gICAgICAgICAgICB0aGlzLnZpZXcudmFsdWVFbGVtZW50LmFwcGVuZENoaWxkKHRoaXMudmFsdWVDb250cm9sbGVyLnZpZXcuZWxlbWVudCk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBjb25zdCBCdXR0b25CbGFkZVBsdWdpbiA9IHtcbiAgICAgICAgaWQ6ICdidXR0b24nLFxuICAgICAgICB0eXBlOiAnYmxhZGUnLFxuICAgICAgICBhY2NlcHQocGFyYW1zKSB7XG4gICAgICAgICAgICBjb25zdCBwID0gUGFyYW1zUGFyc2VycztcbiAgICAgICAgICAgIGNvbnN0IHJlc3VsdCA9IHBhcnNlUGFyYW1zKHBhcmFtcywge1xuICAgICAgICAgICAgICAgIHRpdGxlOiBwLnJlcXVpcmVkLnN0cmluZyxcbiAgICAgICAgICAgICAgICB2aWV3OiBwLnJlcXVpcmVkLmNvbnN0YW50KCdidXR0b24nKSxcbiAgICAgICAgICAgICAgICBsYWJlbDogcC5vcHRpb25hbC5zdHJpbmcsXG4gICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIHJldHVybiByZXN1bHQgPyB7IHBhcmFtczogcmVzdWx0IH0gOiBudWxsO1xuICAgICAgICB9LFxuICAgICAgICBjb250cm9sbGVyKGFyZ3MpIHtcbiAgICAgICAgICAgIHJldHVybiBuZXcgTGFiZWxDb250cm9sbGVyKGFyZ3MuZG9jdW1lbnQsIHtcbiAgICAgICAgICAgICAgICBibGFkZTogYXJncy5ibGFkZSxcbiAgICAgICAgICAgICAgICBwcm9wczogVmFsdWVNYXAuZnJvbU9iamVjdCh7XG4gICAgICAgICAgICAgICAgICAgIGxhYmVsOiBhcmdzLnBhcmFtcy5sYWJlbCxcbiAgICAgICAgICAgICAgICB9KSxcbiAgICAgICAgICAgICAgICB2YWx1ZUNvbnRyb2xsZXI6IG5ldyBCdXR0b25Db250cm9sbGVyKGFyZ3MuZG9jdW1lbnQsIHtcbiAgICAgICAgICAgICAgICAgICAgcHJvcHM6IFZhbHVlTWFwLmZyb21PYmplY3Qoe1xuICAgICAgICAgICAgICAgICAgICAgICAgdGl0bGU6IGFyZ3MucGFyYW1zLnRpdGxlLFxuICAgICAgICAgICAgICAgICAgICB9KSxcbiAgICAgICAgICAgICAgICAgICAgdmlld1Byb3BzOiBhcmdzLnZpZXdQcm9wcyxcbiAgICAgICAgICAgICAgICB9KSxcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9LFxuICAgICAgICBhcGkoYXJncykge1xuICAgICAgICAgICAgaWYgKCEoYXJncy5jb250cm9sbGVyIGluc3RhbmNlb2YgTGFiZWxDb250cm9sbGVyKSkge1xuICAgICAgICAgICAgICAgIHJldHVybiBudWxsO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaWYgKCEoYXJncy5jb250cm9sbGVyLnZhbHVlQ29udHJvbGxlciBpbnN0YW5jZW9mIEJ1dHRvbkNvbnRyb2xsZXIpKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIG51bGw7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICByZXR1cm4gbmV3IEJ1dHRvbkFwaShhcmdzLmNvbnRyb2xsZXIpO1xuICAgICAgICB9LFxuICAgIH07XG5cbiAgICBjbGFzcyBWYWx1ZUJsYWRlQ29udHJvbGxlciBleHRlbmRzIEJsYWRlQ29udHJvbGxlciB7XG4gICAgICAgIGNvbnN0cnVjdG9yKGNvbmZpZykge1xuICAgICAgICAgICAgc3VwZXIoY29uZmlnKTtcbiAgICAgICAgICAgIHRoaXMudmFsdWUgPSBjb25maWcudmFsdWU7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBmdW5jdGlvbiBjcmVhdGVCbGFkZSgpIHtcbiAgICAgICAgcmV0dXJuIG5ldyBWYWx1ZU1hcCh7XG4gICAgICAgICAgICBwb3NpdGlvbnM6IGNyZWF0ZVZhbHVlKFtdLCB7XG4gICAgICAgICAgICAgICAgZXF1YWxzOiBkZWVwRXF1YWxzQXJyYXksXG4gICAgICAgICAgICB9KSxcbiAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgY2xhc3MgRm9sZGFibGUgZXh0ZW5kcyBWYWx1ZU1hcCB7XG4gICAgICAgIGNvbnN0cnVjdG9yKHZhbHVlTWFwKSB7XG4gICAgICAgICAgICBzdXBlcih2YWx1ZU1hcCk7XG4gICAgICAgIH1cbiAgICAgICAgc3RhdGljIGNyZWF0ZShleHBhbmRlZCkge1xuICAgICAgICAgICAgY29uc3QgY29yZU9iaiA9IHtcbiAgICAgICAgICAgICAgICBjb21wbGV0ZWQ6IHRydWUsXG4gICAgICAgICAgICAgICAgZXhwYW5kZWQ6IGV4cGFuZGVkLFxuICAgICAgICAgICAgICAgIGV4cGFuZGVkSGVpZ2h0OiBudWxsLFxuICAgICAgICAgICAgICAgIHNob3VsZEZpeEhlaWdodDogZmFsc2UsXG4gICAgICAgICAgICAgICAgdGVtcG9yYXJ5RXhwYW5kZWQ6IG51bGwsXG4gICAgICAgICAgICB9O1xuICAgICAgICAgICAgY29uc3QgY29yZSA9IFZhbHVlTWFwLmNyZWF0ZUNvcmUoY29yZU9iaik7XG4gICAgICAgICAgICByZXR1cm4gbmV3IEZvbGRhYmxlKGNvcmUpO1xuICAgICAgICB9XG4gICAgICAgIGdldCBzdHlsZUV4cGFuZGVkKCkge1xuICAgICAgICAgICAgdmFyIF9hO1xuICAgICAgICAgICAgcmV0dXJuIChfYSA9IHRoaXMuZ2V0KCd0ZW1wb3JhcnlFeHBhbmRlZCcpKSAhPT0gbnVsbCAmJiBfYSAhPT0gdm9pZCAwID8gX2EgOiB0aGlzLmdldCgnZXhwYW5kZWQnKTtcbiAgICAgICAgfVxuICAgICAgICBnZXQgc3R5bGVIZWlnaHQoKSB7XG4gICAgICAgICAgICBpZiAoIXRoaXMuc3R5bGVFeHBhbmRlZCkge1xuICAgICAgICAgICAgICAgIHJldHVybiAnMCc7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBjb25zdCBleEhlaWdodCA9IHRoaXMuZ2V0KCdleHBhbmRlZEhlaWdodCcpO1xuICAgICAgICAgICAgaWYgKHRoaXMuZ2V0KCdzaG91bGRGaXhIZWlnaHQnKSAmJiAhaXNFbXB0eShleEhlaWdodCkpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gYCR7ZXhIZWlnaHR9cHhgO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgcmV0dXJuICdhdXRvJztcbiAgICAgICAgfVxuICAgICAgICBiaW5kRXhwYW5kZWRDbGFzcyhlbGVtLCBleHBhbmRlZENsYXNzTmFtZSkge1xuICAgICAgICAgICAgYmluZFZhbHVlTWFwKHRoaXMsICdleHBhbmRlZCcsICgpID0+IHtcbiAgICAgICAgICAgICAgICBjb25zdCBleHBhbmRlZCA9IHRoaXMuc3R5bGVFeHBhbmRlZDtcbiAgICAgICAgICAgICAgICBpZiAoZXhwYW5kZWQpIHtcbiAgICAgICAgICAgICAgICAgICAgZWxlbS5jbGFzc0xpc3QuYWRkKGV4cGFuZGVkQ2xhc3NOYW1lKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgIGVsZW0uY2xhc3NMaXN0LnJlbW92ZShleHBhbmRlZENsYXNzTmFtZSk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSk7XG4gICAgICAgIH1cbiAgICB9XG4gICAgZnVuY3Rpb24gY29tcHV0ZUV4cGFuZGVkRm9sZGVySGVpZ2h0KGZvbGRlciwgY29udGFpbmVyRWxlbWVudCkge1xuICAgICAgICBsZXQgaGVpZ2h0ID0gMDtcbiAgICAgICAgZGlzYWJsZVRyYW5zaXRpb25UZW1wb3JhcmlseShjb250YWluZXJFbGVtZW50LCAoKSA9PiB7XG4gICAgICAgICAgICBmb2xkZXIuc2V0KCdleHBhbmRlZEhlaWdodCcsIG51bGwpO1xuICAgICAgICAgICAgZm9sZGVyLnNldCgndGVtcG9yYXJ5RXhwYW5kZWQnLCB0cnVlKTtcbiAgICAgICAgICAgIGZvcmNlUmVmbG93KGNvbnRhaW5lckVsZW1lbnQpO1xuICAgICAgICAgICAgaGVpZ2h0ID0gY29udGFpbmVyRWxlbWVudC5jbGllbnRIZWlnaHQ7XG4gICAgICAgICAgICBmb2xkZXIuc2V0KCd0ZW1wb3JhcnlFeHBhbmRlZCcsIG51bGwpO1xuICAgICAgICAgICAgZm9yY2VSZWZsb3coY29udGFpbmVyRWxlbWVudCk7XG4gICAgICAgIH0pO1xuICAgICAgICByZXR1cm4gaGVpZ2h0O1xuICAgIH1cbiAgICBmdW5jdGlvbiBhcHBseUhlaWdodChmb2xkYWJsZSwgZWxlbSkge1xuICAgICAgICBlbGVtLnN0eWxlLmhlaWdodCA9IGZvbGRhYmxlLnN0eWxlSGVpZ2h0O1xuICAgIH1cbiAgICBmdW5jdGlvbiBiaW5kRm9sZGFibGUoZm9sZGFibGUsIGVsZW0pIHtcbiAgICAgICAgZm9sZGFibGUudmFsdWUoJ2V4cGFuZGVkJykuZW1pdHRlci5vbignYmVmb3JlY2hhbmdlJywgKCkgPT4ge1xuICAgICAgICAgICAgZm9sZGFibGUuc2V0KCdjb21wbGV0ZWQnLCBmYWxzZSk7XG4gICAgICAgICAgICBpZiAoaXNFbXB0eShmb2xkYWJsZS5nZXQoJ2V4cGFuZGVkSGVpZ2h0JykpKSB7XG4gICAgICAgICAgICAgICAgZm9sZGFibGUuc2V0KCdleHBhbmRlZEhlaWdodCcsIGNvbXB1dGVFeHBhbmRlZEZvbGRlckhlaWdodChmb2xkYWJsZSwgZWxlbSkpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZm9sZGFibGUuc2V0KCdzaG91bGRGaXhIZWlnaHQnLCB0cnVlKTtcbiAgICAgICAgICAgIGZvcmNlUmVmbG93KGVsZW0pO1xuICAgICAgICB9KTtcbiAgICAgICAgZm9sZGFibGUuZW1pdHRlci5vbignY2hhbmdlJywgKCkgPT4ge1xuICAgICAgICAgICAgYXBwbHlIZWlnaHQoZm9sZGFibGUsIGVsZW0pO1xuICAgICAgICB9KTtcbiAgICAgICAgYXBwbHlIZWlnaHQoZm9sZGFibGUsIGVsZW0pO1xuICAgICAgICBlbGVtLmFkZEV2ZW50TGlzdGVuZXIoJ3RyYW5zaXRpb25lbmQnLCAoZXYpID0+IHtcbiAgICAgICAgICAgIGlmIChldi5wcm9wZXJ0eU5hbWUgIT09ICdoZWlnaHQnKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZm9sZGFibGUuc2V0KCdzaG91bGRGaXhIZWlnaHQnLCBmYWxzZSk7XG4gICAgICAgICAgICBmb2xkYWJsZS5zZXQoJ2V4cGFuZGVkSGVpZ2h0JywgbnVsbCk7XG4gICAgICAgICAgICBmb2xkYWJsZS5zZXQoJ2NvbXBsZXRlZCcsIHRydWUpO1xuICAgICAgICB9KTtcbiAgICB9XG5cbiAgICBjbGFzcyBSYWNrTGlrZUFwaSBleHRlbmRzIEJsYWRlQXBpIHtcbiAgICAgICAgY29uc3RydWN0b3IoY29udHJvbGxlciwgcmFja0FwaSkge1xuICAgICAgICAgICAgc3VwZXIoY29udHJvbGxlcik7XG4gICAgICAgICAgICB0aGlzLnJhY2tBcGlfID0gcmFja0FwaTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIGZ1bmN0aW9uIGFkZEJ1dHRvbkFzQmxhZGUoYXBpLCBwYXJhbXMpIHtcbiAgICAgICAgcmV0dXJuIGFwaS5hZGRCbGFkZShPYmplY3QuYXNzaWduKE9iamVjdC5hc3NpZ24oe30sIHBhcmFtcyksIHsgdmlldzogJ2J1dHRvbicgfSkpO1xuICAgIH1cbiAgICBmdW5jdGlvbiBhZGRGb2xkZXJBc0JsYWRlKGFwaSwgcGFyYW1zKSB7XG4gICAgICAgIHJldHVybiBhcGkuYWRkQmxhZGUoT2JqZWN0LmFzc2lnbihPYmplY3QuYXNzaWduKHt9LCBwYXJhbXMpLCB7IHZpZXc6ICdmb2xkZXInIH0pKTtcbiAgICB9XG4gICAgZnVuY3Rpb24gYWRkU2VwYXJhdG9yQXNCbGFkZShhcGksIG9wdF9wYXJhbXMpIHtcbiAgICAgICAgY29uc3QgcGFyYW1zID0gb3B0X3BhcmFtcyB8fCB7fTtcbiAgICAgICAgcmV0dXJuIGFwaS5hZGRCbGFkZShPYmplY3QuYXNzaWduKE9iamVjdC5hc3NpZ24oe30sIHBhcmFtcyksIHsgdmlldzogJ3NlcGFyYXRvcicgfSkpO1xuICAgIH1cbiAgICBmdW5jdGlvbiBhZGRUYWJBc0JsYWRlKGFwaSwgcGFyYW1zKSB7XG4gICAgICAgIHJldHVybiBhcGkuYWRkQmxhZGUoT2JqZWN0LmFzc2lnbihPYmplY3QuYXNzaWduKHt9LCBwYXJhbXMpLCB7IHZpZXc6ICd0YWInIH0pKTtcbiAgICB9XG5cbiAgICBjbGFzcyBOZXN0ZWRPcmRlcmVkU2V0IHtcbiAgICAgICAgY29uc3RydWN0b3IoZXh0cmFjdCkge1xuICAgICAgICAgICAgdGhpcy5lbWl0dGVyID0gbmV3IEVtaXR0ZXIoKTtcbiAgICAgICAgICAgIHRoaXMuaXRlbXNfID0gW107XG4gICAgICAgICAgICB0aGlzLmNhY2hlXyA9IG5ldyBTZXQoKTtcbiAgICAgICAgICAgIHRoaXMub25TdWJMaXN0QWRkXyA9IHRoaXMub25TdWJMaXN0QWRkXy5iaW5kKHRoaXMpO1xuICAgICAgICAgICAgdGhpcy5vblN1Ykxpc3RSZW1vdmVfID0gdGhpcy5vblN1Ykxpc3RSZW1vdmVfLmJpbmQodGhpcyk7XG4gICAgICAgICAgICB0aGlzLmV4dHJhY3RfID0gZXh0cmFjdDtcbiAgICAgICAgfVxuICAgICAgICBnZXQgaXRlbXMoKSB7XG4gICAgICAgICAgICByZXR1cm4gdGhpcy5pdGVtc187XG4gICAgICAgIH1cbiAgICAgICAgYWxsSXRlbXMoKSB7XG4gICAgICAgICAgICByZXR1cm4gQXJyYXkuZnJvbSh0aGlzLmNhY2hlXyk7XG4gICAgICAgIH1cbiAgICAgICAgZmluZChjYWxsYmFjaykge1xuICAgICAgICAgICAgZm9yIChjb25zdCBpdGVtIG9mIHRoaXMuYWxsSXRlbXMoKSkge1xuICAgICAgICAgICAgICAgIGlmIChjYWxsYmFjayhpdGVtKSkge1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gaXRlbTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICByZXR1cm4gbnVsbDtcbiAgICAgICAgfVxuICAgICAgICBpbmNsdWRlcyhpdGVtKSB7XG4gICAgICAgICAgICByZXR1cm4gdGhpcy5jYWNoZV8uaGFzKGl0ZW0pO1xuICAgICAgICB9XG4gICAgICAgIGFkZChpdGVtLCBvcHRfaW5kZXgpIHtcbiAgICAgICAgICAgIGlmICh0aGlzLmluY2x1ZGVzKGl0ZW0pKSB7XG4gICAgICAgICAgICAgICAgdGhyb3cgVHBFcnJvci5zaG91bGROZXZlckhhcHBlbigpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgY29uc3QgaW5kZXggPSBvcHRfaW5kZXggIT09IHVuZGVmaW5lZCA/IG9wdF9pbmRleCA6IHRoaXMuaXRlbXNfLmxlbmd0aDtcbiAgICAgICAgICAgIHRoaXMuaXRlbXNfLnNwbGljZShpbmRleCwgMCwgaXRlbSk7XG4gICAgICAgICAgICB0aGlzLmNhY2hlXy5hZGQoaXRlbSk7XG4gICAgICAgICAgICBjb25zdCBzdWJMaXN0ID0gdGhpcy5leHRyYWN0XyhpdGVtKTtcbiAgICAgICAgICAgIGlmIChzdWJMaXN0KSB7XG4gICAgICAgICAgICAgICAgc3ViTGlzdC5lbWl0dGVyLm9uKCdhZGQnLCB0aGlzLm9uU3ViTGlzdEFkZF8pO1xuICAgICAgICAgICAgICAgIHN1Ykxpc3QuZW1pdHRlci5vbigncmVtb3ZlJywgdGhpcy5vblN1Ykxpc3RSZW1vdmVfKTtcbiAgICAgICAgICAgICAgICBzdWJMaXN0LmFsbEl0ZW1zKCkuZm9yRWFjaCgoaXRlbSkgPT4ge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLmNhY2hlXy5hZGQoaXRlbSk7XG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICB0aGlzLmVtaXR0ZXIuZW1pdCgnYWRkJywge1xuICAgICAgICAgICAgICAgIGluZGV4OiBpbmRleCxcbiAgICAgICAgICAgICAgICBpdGVtOiBpdGVtLFxuICAgICAgICAgICAgICAgIHJvb3Q6IHRoaXMsXG4gICAgICAgICAgICAgICAgdGFyZ2V0OiB0aGlzLFxuICAgICAgICAgICAgfSk7XG4gICAgICAgIH1cbiAgICAgICAgcmVtb3ZlKGl0ZW0pIHtcbiAgICAgICAgICAgIGNvbnN0IGluZGV4ID0gdGhpcy5pdGVtc18uaW5kZXhPZihpdGVtKTtcbiAgICAgICAgICAgIGlmIChpbmRleCA8IDApIHtcbiAgICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICB0aGlzLml0ZW1zXy5zcGxpY2UoaW5kZXgsIDEpO1xuICAgICAgICAgICAgdGhpcy5jYWNoZV8uZGVsZXRlKGl0ZW0pO1xuICAgICAgICAgICAgY29uc3Qgc3ViTGlzdCA9IHRoaXMuZXh0cmFjdF8oaXRlbSk7XG4gICAgICAgICAgICBpZiAoc3ViTGlzdCkge1xuICAgICAgICAgICAgICAgIHN1Ykxpc3QuZW1pdHRlci5vZmYoJ2FkZCcsIHRoaXMub25TdWJMaXN0QWRkXyk7XG4gICAgICAgICAgICAgICAgc3ViTGlzdC5lbWl0dGVyLm9mZigncmVtb3ZlJywgdGhpcy5vblN1Ykxpc3RSZW1vdmVfKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHRoaXMuZW1pdHRlci5lbWl0KCdyZW1vdmUnLCB7XG4gICAgICAgICAgICAgICAgaW5kZXg6IGluZGV4LFxuICAgICAgICAgICAgICAgIGl0ZW06IGl0ZW0sXG4gICAgICAgICAgICAgICAgcm9vdDogdGhpcyxcbiAgICAgICAgICAgICAgICB0YXJnZXQ6IHRoaXMsXG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfVxuICAgICAgICBvblN1Ykxpc3RBZGRfKGV2KSB7XG4gICAgICAgICAgICB0aGlzLmNhY2hlXy5hZGQoZXYuaXRlbSk7XG4gICAgICAgICAgICB0aGlzLmVtaXR0ZXIuZW1pdCgnYWRkJywge1xuICAgICAgICAgICAgICAgIGluZGV4OiBldi5pbmRleCxcbiAgICAgICAgICAgICAgICBpdGVtOiBldi5pdGVtLFxuICAgICAgICAgICAgICAgIHJvb3Q6IHRoaXMsXG4gICAgICAgICAgICAgICAgdGFyZ2V0OiBldi50YXJnZXQsXG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfVxuICAgICAgICBvblN1Ykxpc3RSZW1vdmVfKGV2KSB7XG4gICAgICAgICAgICB0aGlzLmNhY2hlXy5kZWxldGUoZXYuaXRlbSk7XG4gICAgICAgICAgICB0aGlzLmVtaXR0ZXIuZW1pdCgncmVtb3ZlJywge1xuICAgICAgICAgICAgICAgIGluZGV4OiBldi5pbmRleCxcbiAgICAgICAgICAgICAgICBpdGVtOiBldi5pdGVtLFxuICAgICAgICAgICAgICAgIHJvb3Q6IHRoaXMsXG4gICAgICAgICAgICAgICAgdGFyZ2V0OiBldi50YXJnZXQsXG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIGNsYXNzIElucHV0QmluZGluZ0FwaSBleHRlbmRzIEJsYWRlQXBpIHtcbiAgICAgICAgY29uc3RydWN0b3IoY29udHJvbGxlcikge1xuICAgICAgICAgICAgc3VwZXIoY29udHJvbGxlcik7XG4gICAgICAgICAgICB0aGlzLm9uQmluZGluZ0NoYW5nZV8gPSB0aGlzLm9uQmluZGluZ0NoYW5nZV8uYmluZCh0aGlzKTtcbiAgICAgICAgICAgIHRoaXMuZW1pdHRlcl8gPSBuZXcgRW1pdHRlcigpO1xuICAgICAgICAgICAgdGhpcy5jb250cm9sbGVyXy5iaW5kaW5nLmVtaXR0ZXIub24oJ2NoYW5nZScsIHRoaXMub25CaW5kaW5nQ2hhbmdlXyk7XG4gICAgICAgIH1cbiAgICAgICAgZ2V0IGxhYmVsKCkge1xuICAgICAgICAgICAgcmV0dXJuIHRoaXMuY29udHJvbGxlcl8ucHJvcHMuZ2V0KCdsYWJlbCcpO1xuICAgICAgICB9XG4gICAgICAgIHNldCBsYWJlbChsYWJlbCkge1xuICAgICAgICAgICAgdGhpcy5jb250cm9sbGVyXy5wcm9wcy5zZXQoJ2xhYmVsJywgbGFiZWwpO1xuICAgICAgICB9XG4gICAgICAgIG9uKGV2ZW50TmFtZSwgaGFuZGxlcikge1xuICAgICAgICAgICAgY29uc3QgYmggPSBoYW5kbGVyLmJpbmQodGhpcyk7XG4gICAgICAgICAgICB0aGlzLmVtaXR0ZXJfLm9uKGV2ZW50TmFtZSwgKGV2KSA9PiB7XG4gICAgICAgICAgICAgICAgYmgoZXYuZXZlbnQpO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICByZXR1cm4gdGhpcztcbiAgICAgICAgfVxuICAgICAgICByZWZyZXNoKCkge1xuICAgICAgICAgICAgdGhpcy5jb250cm9sbGVyXy5iaW5kaW5nLnJlYWQoKTtcbiAgICAgICAgfVxuICAgICAgICBvbkJpbmRpbmdDaGFuZ2VfKGV2KSB7XG4gICAgICAgICAgICBjb25zdCB2YWx1ZSA9IGV2LnNlbmRlci50YXJnZXQucmVhZCgpO1xuICAgICAgICAgICAgdGhpcy5lbWl0dGVyXy5lbWl0KCdjaGFuZ2UnLCB7XG4gICAgICAgICAgICAgICAgZXZlbnQ6IG5ldyBUcENoYW5nZUV2ZW50KHRoaXMsIGZvcmNlQ2FzdCh2YWx1ZSksIHRoaXMuY29udHJvbGxlcl8uYmluZGluZy50YXJnZXQucHJlc2V0S2V5LCBldi5vcHRpb25zLmxhc3QpLFxuICAgICAgICAgICAgfSk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBjbGFzcyBJbnB1dEJpbmRpbmdDb250cm9sbGVyIGV4dGVuZHMgTGFiZWxDb250cm9sbGVyIHtcbiAgICAgICAgY29uc3RydWN0b3IoZG9jLCBjb25maWcpIHtcbiAgICAgICAgICAgIHN1cGVyKGRvYywgY29uZmlnKTtcbiAgICAgICAgICAgIHRoaXMuYmluZGluZyA9IGNvbmZpZy5iaW5kaW5nO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgY2xhc3MgTW9uaXRvckJpbmRpbmdBcGkgZXh0ZW5kcyBCbGFkZUFwaSB7XG4gICAgICAgIGNvbnN0cnVjdG9yKGNvbnRyb2xsZXIpIHtcbiAgICAgICAgICAgIHN1cGVyKGNvbnRyb2xsZXIpO1xuICAgICAgICAgICAgdGhpcy5vbkJpbmRpbmdVcGRhdGVfID0gdGhpcy5vbkJpbmRpbmdVcGRhdGVfLmJpbmQodGhpcyk7XG4gICAgICAgICAgICB0aGlzLmVtaXR0ZXJfID0gbmV3IEVtaXR0ZXIoKTtcbiAgICAgICAgICAgIHRoaXMuY29udHJvbGxlcl8uYmluZGluZy5lbWl0dGVyLm9uKCd1cGRhdGUnLCB0aGlzLm9uQmluZGluZ1VwZGF0ZV8pO1xuICAgICAgICB9XG4gICAgICAgIGdldCBsYWJlbCgpIHtcbiAgICAgICAgICAgIHJldHVybiB0aGlzLmNvbnRyb2xsZXJfLnByb3BzLmdldCgnbGFiZWwnKTtcbiAgICAgICAgfVxuICAgICAgICBzZXQgbGFiZWwobGFiZWwpIHtcbiAgICAgICAgICAgIHRoaXMuY29udHJvbGxlcl8ucHJvcHMuc2V0KCdsYWJlbCcsIGxhYmVsKTtcbiAgICAgICAgfVxuICAgICAgICBvbihldmVudE5hbWUsIGhhbmRsZXIpIHtcbiAgICAgICAgICAgIGNvbnN0IGJoID0gaGFuZGxlci5iaW5kKHRoaXMpO1xuICAgICAgICAgICAgdGhpcy5lbWl0dGVyXy5vbihldmVudE5hbWUsIChldikgPT4ge1xuICAgICAgICAgICAgICAgIGJoKGV2LmV2ZW50KTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgcmV0dXJuIHRoaXM7XG4gICAgICAgIH1cbiAgICAgICAgcmVmcmVzaCgpIHtcbiAgICAgICAgICAgIHRoaXMuY29udHJvbGxlcl8uYmluZGluZy5yZWFkKCk7XG4gICAgICAgIH1cbiAgICAgICAgb25CaW5kaW5nVXBkYXRlXyhldikge1xuICAgICAgICAgICAgY29uc3QgdmFsdWUgPSBldi5zZW5kZXIudGFyZ2V0LnJlYWQoKTtcbiAgICAgICAgICAgIHRoaXMuZW1pdHRlcl8uZW1pdCgndXBkYXRlJywge1xuICAgICAgICAgICAgICAgIGV2ZW50OiBuZXcgVHBVcGRhdGVFdmVudCh0aGlzLCBmb3JjZUNhc3QodmFsdWUpLCB0aGlzLmNvbnRyb2xsZXJfLmJpbmRpbmcudGFyZ2V0LnByZXNldEtleSksXG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIGNsYXNzIE1vbml0b3JCaW5kaW5nQ29udHJvbGxlciBleHRlbmRzIExhYmVsQ29udHJvbGxlciB7XG4gICAgICAgIGNvbnN0cnVjdG9yKGRvYywgY29uZmlnKSB7XG4gICAgICAgICAgICBzdXBlcihkb2MsIGNvbmZpZyk7XG4gICAgICAgICAgICB0aGlzLmJpbmRpbmcgPSBjb25maWcuYmluZGluZztcbiAgICAgICAgICAgIHRoaXMudmlld1Byb3BzLmJpbmREaXNhYmxlZCh0aGlzLmJpbmRpbmcudGlja2VyKTtcbiAgICAgICAgICAgIHRoaXMudmlld1Byb3BzLmhhbmRsZURpc3Bvc2UoKCkgPT4ge1xuICAgICAgICAgICAgICAgIHRoaXMuYmluZGluZy5kaXNwb3NlKCk7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIGZ1bmN0aW9uIGZpbmRTdWJCbGFkZUFwaVNldChhcGkpIHtcbiAgICAgICAgaWYgKGFwaSBpbnN0YW5jZW9mIFJhY2tBcGkpIHtcbiAgICAgICAgICAgIHJldHVybiBhcGlbJ2FwaVNldF8nXTtcbiAgICAgICAgfVxuICAgICAgICBpZiAoYXBpIGluc3RhbmNlb2YgUmFja0xpa2VBcGkpIHtcbiAgICAgICAgICAgIHJldHVybiBhcGlbJ3JhY2tBcGlfJ11bJ2FwaVNldF8nXTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gbnVsbDtcbiAgICB9XG4gICAgZnVuY3Rpb24gZ2V0QXBpQnlDb250cm9sbGVyKGFwaVNldCwgY29udHJvbGxlcikge1xuICAgICAgICBjb25zdCBhcGkgPSBhcGlTZXQuZmluZCgoYXBpKSA9PiBhcGkuY29udHJvbGxlcl8gPT09IGNvbnRyb2xsZXIpO1xuICAgICAgICBpZiAoIWFwaSkge1xuICAgICAgICAgICAgdGhyb3cgVHBFcnJvci5zaG91bGROZXZlckhhcHBlbigpO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiBhcGk7XG4gICAgfVxuICAgIGZ1bmN0aW9uIGNyZWF0ZUJpbmRpbmdUYXJnZXQob2JqLCBrZXksIG9wdF9pZCkge1xuICAgICAgICBpZiAoIUJpbmRpbmdUYXJnZXQuaXNCaW5kYWJsZShvYmopKSB7XG4gICAgICAgICAgICB0aHJvdyBUcEVycm9yLm5vdEJpbmRhYmxlKCk7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIG5ldyBCaW5kaW5nVGFyZ2V0KG9iaiwga2V5LCBvcHRfaWQpO1xuICAgIH1cbiAgICBjbGFzcyBSYWNrQXBpIGV4dGVuZHMgQmxhZGVBcGkge1xuICAgICAgICBjb25zdHJ1Y3Rvcihjb250cm9sbGVyLCBwb29sKSB7XG4gICAgICAgICAgICBzdXBlcihjb250cm9sbGVyKTtcbiAgICAgICAgICAgIHRoaXMub25SYWNrQWRkXyA9IHRoaXMub25SYWNrQWRkXy5iaW5kKHRoaXMpO1xuICAgICAgICAgICAgdGhpcy5vblJhY2tSZW1vdmVfID0gdGhpcy5vblJhY2tSZW1vdmVfLmJpbmQodGhpcyk7XG4gICAgICAgICAgICB0aGlzLm9uUmFja0lucHV0Q2hhbmdlXyA9IHRoaXMub25SYWNrSW5wdXRDaGFuZ2VfLmJpbmQodGhpcyk7XG4gICAgICAgICAgICB0aGlzLm9uUmFja01vbml0b3JVcGRhdGVfID0gdGhpcy5vblJhY2tNb25pdG9yVXBkYXRlXy5iaW5kKHRoaXMpO1xuICAgICAgICAgICAgdGhpcy5lbWl0dGVyXyA9IG5ldyBFbWl0dGVyKCk7XG4gICAgICAgICAgICB0aGlzLmFwaVNldF8gPSBuZXcgTmVzdGVkT3JkZXJlZFNldChmaW5kU3ViQmxhZGVBcGlTZXQpO1xuICAgICAgICAgICAgdGhpcy5wb29sXyA9IHBvb2w7XG4gICAgICAgICAgICBjb25zdCByYWNrID0gdGhpcy5jb250cm9sbGVyXy5yYWNrO1xuICAgICAgICAgICAgcmFjay5lbWl0dGVyLm9uKCdhZGQnLCB0aGlzLm9uUmFja0FkZF8pO1xuICAgICAgICAgICAgcmFjay5lbWl0dGVyLm9uKCdyZW1vdmUnLCB0aGlzLm9uUmFja1JlbW92ZV8pO1xuICAgICAgICAgICAgcmFjay5lbWl0dGVyLm9uKCdpbnB1dGNoYW5nZScsIHRoaXMub25SYWNrSW5wdXRDaGFuZ2VfKTtcbiAgICAgICAgICAgIHJhY2suZW1pdHRlci5vbignbW9uaXRvcnVwZGF0ZScsIHRoaXMub25SYWNrTW9uaXRvclVwZGF0ZV8pO1xuICAgICAgICAgICAgcmFjay5jaGlsZHJlbi5mb3JFYWNoKChiYykgPT4ge1xuICAgICAgICAgICAgICAgIHRoaXMuc2V0VXBBcGlfKGJjKTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9XG4gICAgICAgIGdldCBjaGlsZHJlbigpIHtcbiAgICAgICAgICAgIHJldHVybiB0aGlzLmNvbnRyb2xsZXJfLnJhY2suY2hpbGRyZW4ubWFwKChiYykgPT4gZ2V0QXBpQnlDb250cm9sbGVyKHRoaXMuYXBpU2V0XywgYmMpKTtcbiAgICAgICAgfVxuICAgICAgICBhZGRJbnB1dChvYmplY3QsIGtleSwgb3B0X3BhcmFtcykge1xuICAgICAgICAgICAgY29uc3QgcGFyYW1zID0gb3B0X3BhcmFtcyB8fCB7fTtcbiAgICAgICAgICAgIGNvbnN0IGRvYyA9IHRoaXMuY29udHJvbGxlcl8udmlldy5lbGVtZW50Lm93bmVyRG9jdW1lbnQ7XG4gICAgICAgICAgICBjb25zdCBiYyA9IHRoaXMucG9vbF8uY3JlYXRlSW5wdXQoZG9jLCBjcmVhdGVCaW5kaW5nVGFyZ2V0KG9iamVjdCwga2V5LCBwYXJhbXMucHJlc2V0S2V5KSwgcGFyYW1zKTtcbiAgICAgICAgICAgIGNvbnN0IGFwaSA9IG5ldyBJbnB1dEJpbmRpbmdBcGkoYmMpO1xuICAgICAgICAgICAgcmV0dXJuIHRoaXMuYWRkKGFwaSwgcGFyYW1zLmluZGV4KTtcbiAgICAgICAgfVxuICAgICAgICBhZGRNb25pdG9yKG9iamVjdCwga2V5LCBvcHRfcGFyYW1zKSB7XG4gICAgICAgICAgICBjb25zdCBwYXJhbXMgPSBvcHRfcGFyYW1zIHx8IHt9O1xuICAgICAgICAgICAgY29uc3QgZG9jID0gdGhpcy5jb250cm9sbGVyXy52aWV3LmVsZW1lbnQub3duZXJEb2N1bWVudDtcbiAgICAgICAgICAgIGNvbnN0IGJjID0gdGhpcy5wb29sXy5jcmVhdGVNb25pdG9yKGRvYywgY3JlYXRlQmluZGluZ1RhcmdldChvYmplY3QsIGtleSksIHBhcmFtcyk7XG4gICAgICAgICAgICBjb25zdCBhcGkgPSBuZXcgTW9uaXRvckJpbmRpbmdBcGkoYmMpO1xuICAgICAgICAgICAgcmV0dXJuIGZvcmNlQ2FzdCh0aGlzLmFkZChhcGksIHBhcmFtcy5pbmRleCkpO1xuICAgICAgICB9XG4gICAgICAgIGFkZEZvbGRlcihwYXJhbXMpIHtcbiAgICAgICAgICAgIHJldHVybiBhZGRGb2xkZXJBc0JsYWRlKHRoaXMsIHBhcmFtcyk7XG4gICAgICAgIH1cbiAgICAgICAgYWRkQnV0dG9uKHBhcmFtcykge1xuICAgICAgICAgICAgcmV0dXJuIGFkZEJ1dHRvbkFzQmxhZGUodGhpcywgcGFyYW1zKTtcbiAgICAgICAgfVxuICAgICAgICBhZGRTZXBhcmF0b3Iob3B0X3BhcmFtcykge1xuICAgICAgICAgICAgcmV0dXJuIGFkZFNlcGFyYXRvckFzQmxhZGUodGhpcywgb3B0X3BhcmFtcyk7XG4gICAgICAgIH1cbiAgICAgICAgYWRkVGFiKHBhcmFtcykge1xuICAgICAgICAgICAgcmV0dXJuIGFkZFRhYkFzQmxhZGUodGhpcywgcGFyYW1zKTtcbiAgICAgICAgfVxuICAgICAgICBhZGQoYXBpLCBvcHRfaW5kZXgpIHtcbiAgICAgICAgICAgIHRoaXMuY29udHJvbGxlcl8ucmFjay5hZGQoYXBpLmNvbnRyb2xsZXJfLCBvcHRfaW5kZXgpO1xuICAgICAgICAgICAgY29uc3QgZ2FwaSA9IHRoaXMuYXBpU2V0Xy5maW5kKChhKSA9PiBhLmNvbnRyb2xsZXJfID09PSBhcGkuY29udHJvbGxlcl8pO1xuICAgICAgICAgICAgaWYgKGdhcGkpIHtcbiAgICAgICAgICAgICAgICB0aGlzLmFwaVNldF8ucmVtb3ZlKGdhcGkpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgdGhpcy5hcGlTZXRfLmFkZChhcGkpO1xuICAgICAgICAgICAgcmV0dXJuIGFwaTtcbiAgICAgICAgfVxuICAgICAgICByZW1vdmUoYXBpKSB7XG4gICAgICAgICAgICB0aGlzLmNvbnRyb2xsZXJfLnJhY2sucmVtb3ZlKGFwaS5jb250cm9sbGVyXyk7XG4gICAgICAgIH1cbiAgICAgICAgYWRkQmxhZGUocGFyYW1zKSB7XG4gICAgICAgICAgICBjb25zdCBkb2MgPSB0aGlzLmNvbnRyb2xsZXJfLnZpZXcuZWxlbWVudC5vd25lckRvY3VtZW50O1xuICAgICAgICAgICAgY29uc3QgYmMgPSB0aGlzLnBvb2xfLmNyZWF0ZUJsYWRlKGRvYywgcGFyYW1zKTtcbiAgICAgICAgICAgIGNvbnN0IGFwaSA9IHRoaXMucG9vbF8uY3JlYXRlQmxhZGVBcGkoYmMpO1xuICAgICAgICAgICAgcmV0dXJuIHRoaXMuYWRkKGFwaSwgcGFyYW1zLmluZGV4KTtcbiAgICAgICAgfVxuICAgICAgICBvbihldmVudE5hbWUsIGhhbmRsZXIpIHtcbiAgICAgICAgICAgIGNvbnN0IGJoID0gaGFuZGxlci5iaW5kKHRoaXMpO1xuICAgICAgICAgICAgdGhpcy5lbWl0dGVyXy5vbihldmVudE5hbWUsIChldikgPT4ge1xuICAgICAgICAgICAgICAgIGJoKGV2LmV2ZW50KTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgcmV0dXJuIHRoaXM7XG4gICAgICAgIH1cbiAgICAgICAgc2V0VXBBcGlfKGJjKSB7XG4gICAgICAgICAgICBjb25zdCBhcGkgPSB0aGlzLmFwaVNldF8uZmluZCgoYXBpKSA9PiBhcGkuY29udHJvbGxlcl8gPT09IGJjKTtcbiAgICAgICAgICAgIGlmICghYXBpKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5hcGlTZXRfLmFkZCh0aGlzLnBvb2xfLmNyZWF0ZUJsYWRlQXBpKGJjKSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgb25SYWNrQWRkXyhldikge1xuICAgICAgICAgICAgdGhpcy5zZXRVcEFwaV8oZXYuYmxhZGVDb250cm9sbGVyKTtcbiAgICAgICAgfVxuICAgICAgICBvblJhY2tSZW1vdmVfKGV2KSB7XG4gICAgICAgICAgICBpZiAoZXYuaXNSb290KSB7XG4gICAgICAgICAgICAgICAgY29uc3QgYXBpID0gZ2V0QXBpQnlDb250cm9sbGVyKHRoaXMuYXBpU2V0XywgZXYuYmxhZGVDb250cm9sbGVyKTtcbiAgICAgICAgICAgICAgICB0aGlzLmFwaVNldF8ucmVtb3ZlKGFwaSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgb25SYWNrSW5wdXRDaGFuZ2VfKGV2KSB7XG4gICAgICAgICAgICBjb25zdCBiYyA9IGV2LmJsYWRlQ29udHJvbGxlcjtcbiAgICAgICAgICAgIGlmIChiYyBpbnN0YW5jZW9mIElucHV0QmluZGluZ0NvbnRyb2xsZXIpIHtcbiAgICAgICAgICAgICAgICBjb25zdCBhcGkgPSBnZXRBcGlCeUNvbnRyb2xsZXIodGhpcy5hcGlTZXRfLCBiYyk7XG4gICAgICAgICAgICAgICAgY29uc3QgYmluZGluZyA9IGJjLmJpbmRpbmc7XG4gICAgICAgICAgICAgICAgdGhpcy5lbWl0dGVyXy5lbWl0KCdjaGFuZ2UnLCB7XG4gICAgICAgICAgICAgICAgICAgIGV2ZW50OiBuZXcgVHBDaGFuZ2VFdmVudChhcGksIGZvcmNlQ2FzdChiaW5kaW5nLnRhcmdldC5yZWFkKCkpLCBiaW5kaW5nLnRhcmdldC5wcmVzZXRLZXksIGV2Lm9wdGlvbnMubGFzdCksXG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNlIGlmIChiYyBpbnN0YW5jZW9mIFZhbHVlQmxhZGVDb250cm9sbGVyKSB7XG4gICAgICAgICAgICAgICAgY29uc3QgYXBpID0gZ2V0QXBpQnlDb250cm9sbGVyKHRoaXMuYXBpU2V0XywgYmMpO1xuICAgICAgICAgICAgICAgIHRoaXMuZW1pdHRlcl8uZW1pdCgnY2hhbmdlJywge1xuICAgICAgICAgICAgICAgICAgICBldmVudDogbmV3IFRwQ2hhbmdlRXZlbnQoYXBpLCBiYy52YWx1ZS5yYXdWYWx1ZSwgdW5kZWZpbmVkLCBldi5vcHRpb25zLmxhc3QpLFxuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIG9uUmFja01vbml0b3JVcGRhdGVfKGV2KSB7XG4gICAgICAgICAgICBpZiAoIShldi5ibGFkZUNvbnRyb2xsZXIgaW5zdGFuY2VvZiBNb25pdG9yQmluZGluZ0NvbnRyb2xsZXIpKSB7XG4gICAgICAgICAgICAgICAgdGhyb3cgVHBFcnJvci5zaG91bGROZXZlckhhcHBlbigpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgY29uc3QgYXBpID0gZ2V0QXBpQnlDb250cm9sbGVyKHRoaXMuYXBpU2V0XywgZXYuYmxhZGVDb250cm9sbGVyKTtcbiAgICAgICAgICAgIGNvbnN0IGJpbmRpbmcgPSBldi5ibGFkZUNvbnRyb2xsZXIuYmluZGluZztcbiAgICAgICAgICAgIHRoaXMuZW1pdHRlcl8uZW1pdCgndXBkYXRlJywge1xuICAgICAgICAgICAgICAgIGV2ZW50OiBuZXcgVHBVcGRhdGVFdmVudChhcGksIGZvcmNlQ2FzdChiaW5kaW5nLnRhcmdldC5yZWFkKCkpLCBiaW5kaW5nLnRhcmdldC5wcmVzZXRLZXkpLFxuICAgICAgICAgICAgfSk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBjbGFzcyBGb2xkZXJBcGkgZXh0ZW5kcyBSYWNrTGlrZUFwaSB7XG4gICAgICAgIGNvbnN0cnVjdG9yKGNvbnRyb2xsZXIsIHBvb2wpIHtcbiAgICAgICAgICAgIHN1cGVyKGNvbnRyb2xsZXIsIG5ldyBSYWNrQXBpKGNvbnRyb2xsZXIucmFja0NvbnRyb2xsZXIsIHBvb2wpKTtcbiAgICAgICAgICAgIHRoaXMuZW1pdHRlcl8gPSBuZXcgRW1pdHRlcigpO1xuICAgICAgICAgICAgdGhpcy5jb250cm9sbGVyXy5mb2xkYWJsZVxuICAgICAgICAgICAgICAgIC52YWx1ZSgnZXhwYW5kZWQnKVxuICAgICAgICAgICAgICAgIC5lbWl0dGVyLm9uKCdjaGFuZ2UnLCAoZXYpID0+IHtcbiAgICAgICAgICAgICAgICB0aGlzLmVtaXR0ZXJfLmVtaXQoJ2ZvbGQnLCB7XG4gICAgICAgICAgICAgICAgICAgIGV2ZW50OiBuZXcgVHBGb2xkRXZlbnQodGhpcywgZXYuc2VuZGVyLnJhd1ZhbHVlKSxcbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgdGhpcy5yYWNrQXBpXy5vbignY2hhbmdlJywgKGV2KSA9PiB7XG4gICAgICAgICAgICAgICAgdGhpcy5lbWl0dGVyXy5lbWl0KCdjaGFuZ2UnLCB7XG4gICAgICAgICAgICAgICAgICAgIGV2ZW50OiBldixcbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgdGhpcy5yYWNrQXBpXy5vbigndXBkYXRlJywgKGV2KSA9PiB7XG4gICAgICAgICAgICAgICAgdGhpcy5lbWl0dGVyXy5lbWl0KCd1cGRhdGUnLCB7XG4gICAgICAgICAgICAgICAgICAgIGV2ZW50OiBldixcbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9XG4gICAgICAgIGdldCBleHBhbmRlZCgpIHtcbiAgICAgICAgICAgIHJldHVybiB0aGlzLmNvbnRyb2xsZXJfLmZvbGRhYmxlLmdldCgnZXhwYW5kZWQnKTtcbiAgICAgICAgfVxuICAgICAgICBzZXQgZXhwYW5kZWQoZXhwYW5kZWQpIHtcbiAgICAgICAgICAgIHRoaXMuY29udHJvbGxlcl8uZm9sZGFibGUuc2V0KCdleHBhbmRlZCcsIGV4cGFuZGVkKTtcbiAgICAgICAgfVxuICAgICAgICBnZXQgdGl0bGUoKSB7XG4gICAgICAgICAgICByZXR1cm4gdGhpcy5jb250cm9sbGVyXy5wcm9wcy5nZXQoJ3RpdGxlJyk7XG4gICAgICAgIH1cbiAgICAgICAgc2V0IHRpdGxlKHRpdGxlKSB7XG4gICAgICAgICAgICB0aGlzLmNvbnRyb2xsZXJfLnByb3BzLnNldCgndGl0bGUnLCB0aXRsZSk7XG4gICAgICAgIH1cbiAgICAgICAgZ2V0IGNoaWxkcmVuKCkge1xuICAgICAgICAgICAgcmV0dXJuIHRoaXMucmFja0FwaV8uY2hpbGRyZW47XG4gICAgICAgIH1cbiAgICAgICAgYWRkSW5wdXQob2JqZWN0LCBrZXksIG9wdF9wYXJhbXMpIHtcbiAgICAgICAgICAgIHJldHVybiB0aGlzLnJhY2tBcGlfLmFkZElucHV0KG9iamVjdCwga2V5LCBvcHRfcGFyYW1zKTtcbiAgICAgICAgfVxuICAgICAgICBhZGRNb25pdG9yKG9iamVjdCwga2V5LCBvcHRfcGFyYW1zKSB7XG4gICAgICAgICAgICByZXR1cm4gdGhpcy5yYWNrQXBpXy5hZGRNb25pdG9yKG9iamVjdCwga2V5LCBvcHRfcGFyYW1zKTtcbiAgICAgICAgfVxuICAgICAgICBhZGRGb2xkZXIocGFyYW1zKSB7XG4gICAgICAgICAgICByZXR1cm4gdGhpcy5yYWNrQXBpXy5hZGRGb2xkZXIocGFyYW1zKTtcbiAgICAgICAgfVxuICAgICAgICBhZGRCdXR0b24ocGFyYW1zKSB7XG4gICAgICAgICAgICByZXR1cm4gdGhpcy5yYWNrQXBpXy5hZGRCdXR0b24ocGFyYW1zKTtcbiAgICAgICAgfVxuICAgICAgICBhZGRTZXBhcmF0b3Iob3B0X3BhcmFtcykge1xuICAgICAgICAgICAgcmV0dXJuIHRoaXMucmFja0FwaV8uYWRkU2VwYXJhdG9yKG9wdF9wYXJhbXMpO1xuICAgICAgICB9XG4gICAgICAgIGFkZFRhYihwYXJhbXMpIHtcbiAgICAgICAgICAgIHJldHVybiB0aGlzLnJhY2tBcGlfLmFkZFRhYihwYXJhbXMpO1xuICAgICAgICB9XG4gICAgICAgIGFkZChhcGksIG9wdF9pbmRleCkge1xuICAgICAgICAgICAgcmV0dXJuIHRoaXMucmFja0FwaV8uYWRkKGFwaSwgb3B0X2luZGV4KTtcbiAgICAgICAgfVxuICAgICAgICByZW1vdmUoYXBpKSB7XG4gICAgICAgICAgICB0aGlzLnJhY2tBcGlfLnJlbW92ZShhcGkpO1xuICAgICAgICB9XG4gICAgICAgIGFkZEJsYWRlKHBhcmFtcykge1xuICAgICAgICAgICAgcmV0dXJuIHRoaXMucmFja0FwaV8uYWRkQmxhZGUocGFyYW1zKTtcbiAgICAgICAgfVxuICAgICAgICBvbihldmVudE5hbWUsIGhhbmRsZXIpIHtcbiAgICAgICAgICAgIGNvbnN0IGJoID0gaGFuZGxlci5iaW5kKHRoaXMpO1xuICAgICAgICAgICAgdGhpcy5lbWl0dGVyXy5vbihldmVudE5hbWUsIChldikgPT4ge1xuICAgICAgICAgICAgICAgIGJoKGV2LmV2ZW50KTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgcmV0dXJuIHRoaXM7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBjbGFzcyBSYWNrTGlrZUNvbnRyb2xsZXIgZXh0ZW5kcyBCbGFkZUNvbnRyb2xsZXIge1xuICAgICAgICBjb25zdHJ1Y3Rvcihjb25maWcpIHtcbiAgICAgICAgICAgIHN1cGVyKHtcbiAgICAgICAgICAgICAgICBibGFkZTogY29uZmlnLmJsYWRlLFxuICAgICAgICAgICAgICAgIHZpZXc6IGNvbmZpZy52aWV3LFxuICAgICAgICAgICAgICAgIHZpZXdQcm9wczogY29uZmlnLnJhY2tDb250cm9sbGVyLnZpZXdQcm9wcyxcbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgdGhpcy5yYWNrQ29udHJvbGxlciA9IGNvbmZpZy5yYWNrQ29udHJvbGxlcjtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIGNsYXNzIFBsYWluVmlldyB7XG4gICAgICAgIGNvbnN0cnVjdG9yKGRvYywgY29uZmlnKSB7XG4gICAgICAgICAgICBjb25zdCBjbGFzc05hbWUgPSBDbGFzc05hbWUoY29uZmlnLnZpZXdOYW1lKTtcbiAgICAgICAgICAgIHRoaXMuZWxlbWVudCA9IGRvYy5jcmVhdGVFbGVtZW50KCdkaXYnKTtcbiAgICAgICAgICAgIHRoaXMuZWxlbWVudC5jbGFzc0xpc3QuYWRkKGNsYXNzTmFtZSgpKTtcbiAgICAgICAgICAgIGNvbmZpZy52aWV3UHJvcHMuYmluZENsYXNzTW9kaWZpZXJzKHRoaXMuZWxlbWVudCk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBmdW5jdGlvbiBmaW5kSW5wdXRCaW5kaW5nQ29udHJvbGxlcihiY3MsIGIpIHtcbiAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBiY3MubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICAgIGNvbnN0IGJjID0gYmNzW2ldO1xuICAgICAgICAgICAgaWYgKGJjIGluc3RhbmNlb2YgSW5wdXRCaW5kaW5nQ29udHJvbGxlciAmJiBiYy5iaW5kaW5nID09PSBiKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIGJjO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIHJldHVybiBudWxsO1xuICAgIH1cbiAgICBmdW5jdGlvbiBmaW5kTW9uaXRvckJpbmRpbmdDb250cm9sbGVyKGJjcywgYikge1xuICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IGJjcy5sZW5ndGg7IGkrKykge1xuICAgICAgICAgICAgY29uc3QgYmMgPSBiY3NbaV07XG4gICAgICAgICAgICBpZiAoYmMgaW5zdGFuY2VvZiBNb25pdG9yQmluZGluZ0NvbnRyb2xsZXIgJiYgYmMuYmluZGluZyA9PT0gYikge1xuICAgICAgICAgICAgICAgIHJldHVybiBiYztcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gbnVsbDtcbiAgICB9XG4gICAgZnVuY3Rpb24gZmluZFZhbHVlQmxhZGVDb250cm9sbGVyKGJjcywgdikge1xuICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IGJjcy5sZW5ndGg7IGkrKykge1xuICAgICAgICAgICAgY29uc3QgYmMgPSBiY3NbaV07XG4gICAgICAgICAgICBpZiAoYmMgaW5zdGFuY2VvZiBWYWx1ZUJsYWRlQ29udHJvbGxlciAmJiBiYy52YWx1ZSA9PT0gdikge1xuICAgICAgICAgICAgICAgIHJldHVybiBiYztcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gbnVsbDtcbiAgICB9XG4gICAgZnVuY3Rpb24gZmluZFN1YlJhY2soYmMpIHtcbiAgICAgICAgaWYgKGJjIGluc3RhbmNlb2YgUmFja0NvbnRyb2xsZXIpIHtcbiAgICAgICAgICAgIHJldHVybiBiYy5yYWNrO1xuICAgICAgICB9XG4gICAgICAgIGlmIChiYyBpbnN0YW5jZW9mIFJhY2tMaWtlQ29udHJvbGxlcikge1xuICAgICAgICAgICAgcmV0dXJuIGJjLnJhY2tDb250cm9sbGVyLnJhY2s7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIG51bGw7XG4gICAgfVxuICAgIGZ1bmN0aW9uIGZpbmRTdWJCbGFkZUNvbnRyb2xsZXJTZXQoYmMpIHtcbiAgICAgICAgY29uc3QgcmFjayA9IGZpbmRTdWJSYWNrKGJjKTtcbiAgICAgICAgcmV0dXJuIHJhY2sgPyByYWNrWydiY1NldF8nXSA6IG51bGw7XG4gICAgfVxuICAgIGNsYXNzIEJsYWRlUmFjayB7XG4gICAgICAgIGNvbnN0cnVjdG9yKGJsYWRlKSB7XG4gICAgICAgICAgICB2YXIgX2E7XG4gICAgICAgICAgICB0aGlzLm9uQmxhZGVQb3NpdGlvbnNDaGFuZ2VfID0gdGhpcy5vbkJsYWRlUG9zaXRpb25zQ2hhbmdlXy5iaW5kKHRoaXMpO1xuICAgICAgICAgICAgdGhpcy5vblNldEFkZF8gPSB0aGlzLm9uU2V0QWRkXy5iaW5kKHRoaXMpO1xuICAgICAgICAgICAgdGhpcy5vblNldFJlbW92ZV8gPSB0aGlzLm9uU2V0UmVtb3ZlXy5iaW5kKHRoaXMpO1xuICAgICAgICAgICAgdGhpcy5vbkNoaWxkRGlzcG9zZV8gPSB0aGlzLm9uQ2hpbGREaXNwb3NlXy5iaW5kKHRoaXMpO1xuICAgICAgICAgICAgdGhpcy5vbkNoaWxkUG9zaXRpb25zQ2hhbmdlXyA9IHRoaXMub25DaGlsZFBvc2l0aW9uc0NoYW5nZV8uYmluZCh0aGlzKTtcbiAgICAgICAgICAgIHRoaXMub25DaGlsZElucHV0Q2hhbmdlXyA9IHRoaXMub25DaGlsZElucHV0Q2hhbmdlXy5iaW5kKHRoaXMpO1xuICAgICAgICAgICAgdGhpcy5vbkNoaWxkTW9uaXRvclVwZGF0ZV8gPSB0aGlzLm9uQ2hpbGRNb25pdG9yVXBkYXRlXy5iaW5kKHRoaXMpO1xuICAgICAgICAgICAgdGhpcy5vbkNoaWxkVmFsdWVDaGFuZ2VfID0gdGhpcy5vbkNoaWxkVmFsdWVDaGFuZ2VfLmJpbmQodGhpcyk7XG4gICAgICAgICAgICB0aGlzLm9uQ2hpbGRWaWV3UHJvcHNDaGFuZ2VfID0gdGhpcy5vbkNoaWxkVmlld1Byb3BzQ2hhbmdlXy5iaW5kKHRoaXMpO1xuICAgICAgICAgICAgdGhpcy5vbkRlc2NlbmRhbnRMYXlvdXRfID0gdGhpcy5vbkRlc2NlbmRhbnRMYXlvdXRfLmJpbmQodGhpcyk7XG4gICAgICAgICAgICB0aGlzLm9uRGVzY2VuZGFudElucHV0Q2hhbmdlXyA9IHRoaXMub25EZXNjZW5kYW50SW5wdXRDaGFuZ2VfLmJpbmQodGhpcyk7XG4gICAgICAgICAgICB0aGlzLm9uRGVzY2VuZGFudE1vbml0b3JVcGRhdGVfID1cbiAgICAgICAgICAgICAgICB0aGlzLm9uRGVzY2VuZGFudE1vbml0b3JVcGRhdGVfLmJpbmQodGhpcyk7XG4gICAgICAgICAgICB0aGlzLmVtaXR0ZXIgPSBuZXcgRW1pdHRlcigpO1xuICAgICAgICAgICAgdGhpcy5ibGFkZV8gPSBibGFkZSAhPT0gbnVsbCAmJiBibGFkZSAhPT0gdm9pZCAwID8gYmxhZGUgOiBudWxsO1xuICAgICAgICAgICAgKF9hID0gdGhpcy5ibGFkZV8pID09PSBudWxsIHx8IF9hID09PSB2b2lkIDAgPyB2b2lkIDAgOiBfYS52YWx1ZSgncG9zaXRpb25zJykuZW1pdHRlci5vbignY2hhbmdlJywgdGhpcy5vbkJsYWRlUG9zaXRpb25zQ2hhbmdlXyk7XG4gICAgICAgICAgICB0aGlzLmJjU2V0XyA9IG5ldyBOZXN0ZWRPcmRlcmVkU2V0KGZpbmRTdWJCbGFkZUNvbnRyb2xsZXJTZXQpO1xuICAgICAgICAgICAgdGhpcy5iY1NldF8uZW1pdHRlci5vbignYWRkJywgdGhpcy5vblNldEFkZF8pO1xuICAgICAgICAgICAgdGhpcy5iY1NldF8uZW1pdHRlci5vbigncmVtb3ZlJywgdGhpcy5vblNldFJlbW92ZV8pO1xuICAgICAgICB9XG4gICAgICAgIGdldCBjaGlsZHJlbigpIHtcbiAgICAgICAgICAgIHJldHVybiB0aGlzLmJjU2V0Xy5pdGVtcztcbiAgICAgICAgfVxuICAgICAgICBhZGQoYmMsIG9wdF9pbmRleCkge1xuICAgICAgICAgICAgaWYgKGJjLnBhcmVudCkge1xuICAgICAgICAgICAgICAgIGJjLnBhcmVudC5yZW1vdmUoYmMpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgYmNbJ3BhcmVudF8nXSA9IHRoaXM7XG4gICAgICAgICAgICB0aGlzLmJjU2V0Xy5hZGQoYmMsIG9wdF9pbmRleCk7XG4gICAgICAgIH1cbiAgICAgICAgcmVtb3ZlKGJjKSB7XG4gICAgICAgICAgICBiY1sncGFyZW50XyddID0gbnVsbDtcbiAgICAgICAgICAgIHRoaXMuYmNTZXRfLnJlbW92ZShiYyk7XG4gICAgICAgIH1cbiAgICAgICAgZmluZChjb250cm9sbGVyQ2xhc3MpIHtcbiAgICAgICAgICAgIHJldHVybiBmb3JjZUNhc3QodGhpcy5iY1NldF8uYWxsSXRlbXMoKS5maWx0ZXIoKGJjKSA9PiB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIGJjIGluc3RhbmNlb2YgY29udHJvbGxlckNsYXNzO1xuICAgICAgICAgICAgfSkpO1xuICAgICAgICB9XG4gICAgICAgIG9uU2V0QWRkXyhldikge1xuICAgICAgICAgICAgdGhpcy51cGRhdGVQb3NpdGlvbnNfKCk7XG4gICAgICAgICAgICBjb25zdCBpc1Jvb3QgPSBldi50YXJnZXQgPT09IGV2LnJvb3Q7XG4gICAgICAgICAgICB0aGlzLmVtaXR0ZXIuZW1pdCgnYWRkJywge1xuICAgICAgICAgICAgICAgIGJsYWRlQ29udHJvbGxlcjogZXYuaXRlbSxcbiAgICAgICAgICAgICAgICBpbmRleDogZXYuaW5kZXgsXG4gICAgICAgICAgICAgICAgaXNSb290OiBpc1Jvb3QsXG4gICAgICAgICAgICAgICAgc2VuZGVyOiB0aGlzLFxuICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICBpZiAoIWlzUm9vdCkge1xuICAgICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGNvbnN0IGJjID0gZXYuaXRlbTtcbiAgICAgICAgICAgIGJjLnZpZXdQcm9wcy5lbWl0dGVyLm9uKCdjaGFuZ2UnLCB0aGlzLm9uQ2hpbGRWaWV3UHJvcHNDaGFuZ2VfKTtcbiAgICAgICAgICAgIGJjLmJsYWRlXG4gICAgICAgICAgICAgICAgLnZhbHVlKCdwb3NpdGlvbnMnKVxuICAgICAgICAgICAgICAgIC5lbWl0dGVyLm9uKCdjaGFuZ2UnLCB0aGlzLm9uQ2hpbGRQb3NpdGlvbnNDaGFuZ2VfKTtcbiAgICAgICAgICAgIGJjLnZpZXdQcm9wcy5oYW5kbGVEaXNwb3NlKHRoaXMub25DaGlsZERpc3Bvc2VfKTtcbiAgICAgICAgICAgIGlmIChiYyBpbnN0YW5jZW9mIElucHV0QmluZGluZ0NvbnRyb2xsZXIpIHtcbiAgICAgICAgICAgICAgICBiYy5iaW5kaW5nLmVtaXR0ZXIub24oJ2NoYW5nZScsIHRoaXMub25DaGlsZElucHV0Q2hhbmdlXyk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNlIGlmIChiYyBpbnN0YW5jZW9mIE1vbml0b3JCaW5kaW5nQ29udHJvbGxlcikge1xuICAgICAgICAgICAgICAgIGJjLmJpbmRpbmcuZW1pdHRlci5vbigndXBkYXRlJywgdGhpcy5vbkNoaWxkTW9uaXRvclVwZGF0ZV8pO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxzZSBpZiAoYmMgaW5zdGFuY2VvZiBWYWx1ZUJsYWRlQ29udHJvbGxlcikge1xuICAgICAgICAgICAgICAgIGJjLnZhbHVlLmVtaXR0ZXIub24oJ2NoYW5nZScsIHRoaXMub25DaGlsZFZhbHVlQ2hhbmdlXyk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICBjb25zdCByYWNrID0gZmluZFN1YlJhY2soYmMpO1xuICAgICAgICAgICAgICAgIGlmIChyYWNrKSB7XG4gICAgICAgICAgICAgICAgICAgIGNvbnN0IGVtaXR0ZXIgPSByYWNrLmVtaXR0ZXI7XG4gICAgICAgICAgICAgICAgICAgIGVtaXR0ZXIub24oJ2xheW91dCcsIHRoaXMub25EZXNjZW5kYW50TGF5b3V0Xyk7XG4gICAgICAgICAgICAgICAgICAgIGVtaXR0ZXIub24oJ2lucHV0Y2hhbmdlJywgdGhpcy5vbkRlc2NlbmRhbnRJbnB1dENoYW5nZV8pO1xuICAgICAgICAgICAgICAgICAgICBlbWl0dGVyLm9uKCdtb25pdG9ydXBkYXRlJywgdGhpcy5vbkRlc2NlbmRhbnRNb25pdG9yVXBkYXRlXyk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIG9uU2V0UmVtb3ZlXyhldikge1xuICAgICAgICAgICAgdGhpcy51cGRhdGVQb3NpdGlvbnNfKCk7XG4gICAgICAgICAgICBjb25zdCBpc1Jvb3QgPSBldi50YXJnZXQgPT09IGV2LnJvb3Q7XG4gICAgICAgICAgICB0aGlzLmVtaXR0ZXIuZW1pdCgncmVtb3ZlJywge1xuICAgICAgICAgICAgICAgIGJsYWRlQ29udHJvbGxlcjogZXYuaXRlbSxcbiAgICAgICAgICAgICAgICBpc1Jvb3Q6IGlzUm9vdCxcbiAgICAgICAgICAgICAgICBzZW5kZXI6IHRoaXMsXG4gICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIGlmICghaXNSb290KSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgY29uc3QgYmMgPSBldi5pdGVtO1xuICAgICAgICAgICAgaWYgKGJjIGluc3RhbmNlb2YgSW5wdXRCaW5kaW5nQ29udHJvbGxlcikge1xuICAgICAgICAgICAgICAgIGJjLmJpbmRpbmcuZW1pdHRlci5vZmYoJ2NoYW5nZScsIHRoaXMub25DaGlsZElucHV0Q2hhbmdlXyk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNlIGlmIChiYyBpbnN0YW5jZW9mIE1vbml0b3JCaW5kaW5nQ29udHJvbGxlcikge1xuICAgICAgICAgICAgICAgIGJjLmJpbmRpbmcuZW1pdHRlci5vZmYoJ3VwZGF0ZScsIHRoaXMub25DaGlsZE1vbml0b3JVcGRhdGVfKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGVsc2UgaWYgKGJjIGluc3RhbmNlb2YgVmFsdWVCbGFkZUNvbnRyb2xsZXIpIHtcbiAgICAgICAgICAgICAgICBiYy52YWx1ZS5lbWl0dGVyLm9mZignY2hhbmdlJywgdGhpcy5vbkNoaWxkVmFsdWVDaGFuZ2VfKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgIGNvbnN0IHJhY2sgPSBmaW5kU3ViUmFjayhiYyk7XG4gICAgICAgICAgICAgICAgaWYgKHJhY2spIHtcbiAgICAgICAgICAgICAgICAgICAgY29uc3QgZW1pdHRlciA9IHJhY2suZW1pdHRlcjtcbiAgICAgICAgICAgICAgICAgICAgZW1pdHRlci5vZmYoJ2xheW91dCcsIHRoaXMub25EZXNjZW5kYW50TGF5b3V0Xyk7XG4gICAgICAgICAgICAgICAgICAgIGVtaXR0ZXIub2ZmKCdpbnB1dGNoYW5nZScsIHRoaXMub25EZXNjZW5kYW50SW5wdXRDaGFuZ2VfKTtcbiAgICAgICAgICAgICAgICAgICAgZW1pdHRlci5vZmYoJ21vbml0b3J1cGRhdGUnLCB0aGlzLm9uRGVzY2VuZGFudE1vbml0b3JVcGRhdGVfKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgdXBkYXRlUG9zaXRpb25zXygpIHtcbiAgICAgICAgICAgIGNvbnN0IHZpc2libGVJdGVtcyA9IHRoaXMuYmNTZXRfLml0ZW1zLmZpbHRlcigoYmMpID0+ICFiYy52aWV3UHJvcHMuZ2V0KCdoaWRkZW4nKSk7XG4gICAgICAgICAgICBjb25zdCBmaXJzdFZpc2libGVJdGVtID0gdmlzaWJsZUl0ZW1zWzBdO1xuICAgICAgICAgICAgY29uc3QgbGFzdFZpc2libGVJdGVtID0gdmlzaWJsZUl0ZW1zW3Zpc2libGVJdGVtcy5sZW5ndGggLSAxXTtcbiAgICAgICAgICAgIHRoaXMuYmNTZXRfLml0ZW1zLmZvckVhY2goKGJjKSA9PiB7XG4gICAgICAgICAgICAgICAgY29uc3QgcHMgPSBbXTtcbiAgICAgICAgICAgICAgICBpZiAoYmMgPT09IGZpcnN0VmlzaWJsZUl0ZW0pIHtcbiAgICAgICAgICAgICAgICAgICAgcHMucHVzaCgnZmlyc3QnKTtcbiAgICAgICAgICAgICAgICAgICAgaWYgKCF0aGlzLmJsYWRlXyB8fFxuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5ibGFkZV8uZ2V0KCdwb3NpdGlvbnMnKS5pbmNsdWRlcygndmVyeWZpcnN0JykpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHBzLnB1c2goJ3ZlcnlmaXJzdCcpO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGlmIChiYyA9PT0gbGFzdFZpc2libGVJdGVtKSB7XG4gICAgICAgICAgICAgICAgICAgIHBzLnB1c2goJ2xhc3QnKTtcbiAgICAgICAgICAgICAgICAgICAgaWYgKCF0aGlzLmJsYWRlXyB8fCB0aGlzLmJsYWRlXy5nZXQoJ3Bvc2l0aW9ucycpLmluY2x1ZGVzKCd2ZXJ5bGFzdCcpKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBwcy5wdXNoKCd2ZXJ5bGFzdCcpO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGJjLmJsYWRlLnNldCgncG9zaXRpb25zJywgcHMpO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgIH1cbiAgICAgICAgb25DaGlsZFBvc2l0aW9uc0NoYW5nZV8oKSB7XG4gICAgICAgICAgICB0aGlzLnVwZGF0ZVBvc2l0aW9uc18oKTtcbiAgICAgICAgICAgIHRoaXMuZW1pdHRlci5lbWl0KCdsYXlvdXQnLCB7XG4gICAgICAgICAgICAgICAgc2VuZGVyOiB0aGlzLFxuICAgICAgICAgICAgfSk7XG4gICAgICAgIH1cbiAgICAgICAgb25DaGlsZFZpZXdQcm9wc0NoYW5nZV8oX2V2KSB7XG4gICAgICAgICAgICB0aGlzLnVwZGF0ZVBvc2l0aW9uc18oKTtcbiAgICAgICAgICAgIHRoaXMuZW1pdHRlci5lbWl0KCdsYXlvdXQnLCB7XG4gICAgICAgICAgICAgICAgc2VuZGVyOiB0aGlzLFxuICAgICAgICAgICAgfSk7XG4gICAgICAgIH1cbiAgICAgICAgb25DaGlsZERpc3Bvc2VfKCkge1xuICAgICAgICAgICAgY29uc3QgZGlzcG9zZWRVY3MgPSB0aGlzLmJjU2V0Xy5pdGVtcy5maWx0ZXIoKGJjKSA9PiB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIGJjLnZpZXdQcm9wcy5nZXQoJ2Rpc3Bvc2VkJyk7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIGRpc3Bvc2VkVWNzLmZvckVhY2goKGJjKSA9PiB7XG4gICAgICAgICAgICAgICAgdGhpcy5iY1NldF8ucmVtb3ZlKGJjKTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9XG4gICAgICAgIG9uQ2hpbGRJbnB1dENoYW5nZV8oZXYpIHtcbiAgICAgICAgICAgIGNvbnN0IGJjID0gZmluZElucHV0QmluZGluZ0NvbnRyb2xsZXIodGhpcy5maW5kKElucHV0QmluZGluZ0NvbnRyb2xsZXIpLCBldi5zZW5kZXIpO1xuICAgICAgICAgICAgaWYgKCFiYykge1xuICAgICAgICAgICAgICAgIHRocm93IFRwRXJyb3Iuc2hvdWxkTmV2ZXJIYXBwZW4oKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHRoaXMuZW1pdHRlci5lbWl0KCdpbnB1dGNoYW5nZScsIHtcbiAgICAgICAgICAgICAgICBibGFkZUNvbnRyb2xsZXI6IGJjLFxuICAgICAgICAgICAgICAgIG9wdGlvbnM6IGV2Lm9wdGlvbnMsXG4gICAgICAgICAgICAgICAgc2VuZGVyOiB0aGlzLFxuICAgICAgICAgICAgfSk7XG4gICAgICAgIH1cbiAgICAgICAgb25DaGlsZE1vbml0b3JVcGRhdGVfKGV2KSB7XG4gICAgICAgICAgICBjb25zdCBiYyA9IGZpbmRNb25pdG9yQmluZGluZ0NvbnRyb2xsZXIodGhpcy5maW5kKE1vbml0b3JCaW5kaW5nQ29udHJvbGxlciksIGV2LnNlbmRlcik7XG4gICAgICAgICAgICBpZiAoIWJjKSB7XG4gICAgICAgICAgICAgICAgdGhyb3cgVHBFcnJvci5zaG91bGROZXZlckhhcHBlbigpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgdGhpcy5lbWl0dGVyLmVtaXQoJ21vbml0b3J1cGRhdGUnLCB7XG4gICAgICAgICAgICAgICAgYmxhZGVDb250cm9sbGVyOiBiYyxcbiAgICAgICAgICAgICAgICBzZW5kZXI6IHRoaXMsXG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfVxuICAgICAgICBvbkNoaWxkVmFsdWVDaGFuZ2VfKGV2KSB7XG4gICAgICAgICAgICBjb25zdCBiYyA9IGZpbmRWYWx1ZUJsYWRlQ29udHJvbGxlcih0aGlzLmZpbmQoVmFsdWVCbGFkZUNvbnRyb2xsZXIpLCBldi5zZW5kZXIpO1xuICAgICAgICAgICAgaWYgKCFiYykge1xuICAgICAgICAgICAgICAgIHRocm93IFRwRXJyb3Iuc2hvdWxkTmV2ZXJIYXBwZW4oKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHRoaXMuZW1pdHRlci5lbWl0KCdpbnB1dGNoYW5nZScsIHtcbiAgICAgICAgICAgICAgICBibGFkZUNvbnRyb2xsZXI6IGJjLFxuICAgICAgICAgICAgICAgIG9wdGlvbnM6IGV2Lm9wdGlvbnMsXG4gICAgICAgICAgICAgICAgc2VuZGVyOiB0aGlzLFxuICAgICAgICAgICAgfSk7XG4gICAgICAgIH1cbiAgICAgICAgb25EZXNjZW5kYW50TGF5b3V0XyhfKSB7XG4gICAgICAgICAgICB0aGlzLnVwZGF0ZVBvc2l0aW9uc18oKTtcbiAgICAgICAgICAgIHRoaXMuZW1pdHRlci5lbWl0KCdsYXlvdXQnLCB7XG4gICAgICAgICAgICAgICAgc2VuZGVyOiB0aGlzLFxuICAgICAgICAgICAgfSk7XG4gICAgICAgIH1cbiAgICAgICAgb25EZXNjZW5kYW50SW5wdXRDaGFuZ2VfKGV2KSB7XG4gICAgICAgICAgICB0aGlzLmVtaXR0ZXIuZW1pdCgnaW5wdXRjaGFuZ2UnLCB7XG4gICAgICAgICAgICAgICAgYmxhZGVDb250cm9sbGVyOiBldi5ibGFkZUNvbnRyb2xsZXIsXG4gICAgICAgICAgICAgICAgb3B0aW9uczogZXYub3B0aW9ucyxcbiAgICAgICAgICAgICAgICBzZW5kZXI6IHRoaXMsXG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfVxuICAgICAgICBvbkRlc2NlbmRhbnRNb25pdG9yVXBkYXRlXyhldikge1xuICAgICAgICAgICAgdGhpcy5lbWl0dGVyLmVtaXQoJ21vbml0b3J1cGRhdGUnLCB7XG4gICAgICAgICAgICAgICAgYmxhZGVDb250cm9sbGVyOiBldi5ibGFkZUNvbnRyb2xsZXIsXG4gICAgICAgICAgICAgICAgc2VuZGVyOiB0aGlzLFxuICAgICAgICAgICAgfSk7XG4gICAgICAgIH1cbiAgICAgICAgb25CbGFkZVBvc2l0aW9uc0NoYW5nZV8oKSB7XG4gICAgICAgICAgICB0aGlzLnVwZGF0ZVBvc2l0aW9uc18oKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIGNsYXNzIFJhY2tDb250cm9sbGVyIGV4dGVuZHMgQmxhZGVDb250cm9sbGVyIHtcbiAgICAgICAgY29uc3RydWN0b3IoZG9jLCBjb25maWcpIHtcbiAgICAgICAgICAgIHN1cGVyKE9iamVjdC5hc3NpZ24oT2JqZWN0LmFzc2lnbih7fSwgY29uZmlnKSwgeyB2aWV3OiBuZXcgUGxhaW5WaWV3KGRvYywge1xuICAgICAgICAgICAgICAgICAgICB2aWV3TmFtZTogJ2JyaycsXG4gICAgICAgICAgICAgICAgICAgIHZpZXdQcm9wczogY29uZmlnLnZpZXdQcm9wcyxcbiAgICAgICAgICAgICAgICB9KSB9KSk7XG4gICAgICAgICAgICB0aGlzLm9uUmFja0FkZF8gPSB0aGlzLm9uUmFja0FkZF8uYmluZCh0aGlzKTtcbiAgICAgICAgICAgIHRoaXMub25SYWNrUmVtb3ZlXyA9IHRoaXMub25SYWNrUmVtb3ZlXy5iaW5kKHRoaXMpO1xuICAgICAgICAgICAgY29uc3QgcmFjayA9IG5ldyBCbGFkZVJhY2soY29uZmlnLnJvb3QgPyB1bmRlZmluZWQgOiBjb25maWcuYmxhZGUpO1xuICAgICAgICAgICAgcmFjay5lbWl0dGVyLm9uKCdhZGQnLCB0aGlzLm9uUmFja0FkZF8pO1xuICAgICAgICAgICAgcmFjay5lbWl0dGVyLm9uKCdyZW1vdmUnLCB0aGlzLm9uUmFja1JlbW92ZV8pO1xuICAgICAgICAgICAgdGhpcy5yYWNrID0gcmFjaztcbiAgICAgICAgICAgIHRoaXMudmlld1Byb3BzLmhhbmRsZURpc3Bvc2UoKCkgPT4ge1xuICAgICAgICAgICAgICAgIGZvciAobGV0IGkgPSB0aGlzLnJhY2suY2hpbGRyZW4ubGVuZ3RoIC0gMTsgaSA+PSAwOyBpLS0pIHtcbiAgICAgICAgICAgICAgICAgICAgY29uc3QgYmMgPSB0aGlzLnJhY2suY2hpbGRyZW5baV07XG4gICAgICAgICAgICAgICAgICAgIGJjLnZpZXdQcm9wcy5zZXQoJ2Rpc3Bvc2VkJywgdHJ1ZSk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSk7XG4gICAgICAgIH1cbiAgICAgICAgb25SYWNrQWRkXyhldikge1xuICAgICAgICAgICAgaWYgKCFldi5pc1Jvb3QpIHtcbiAgICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBpbnNlcnRFbGVtZW50QXQodGhpcy52aWV3LmVsZW1lbnQsIGV2LmJsYWRlQ29udHJvbGxlci52aWV3LmVsZW1lbnQsIGV2LmluZGV4KTtcbiAgICAgICAgfVxuICAgICAgICBvblJhY2tSZW1vdmVfKGV2KSB7XG4gICAgICAgICAgICBpZiAoIWV2LmlzUm9vdCkge1xuICAgICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHJlbW92ZUVsZW1lbnQoZXYuYmxhZGVDb250cm9sbGVyLnZpZXcuZWxlbWVudCk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBjb25zdCBibGFkZUNvbnRhaW5lckNsYXNzTmFtZSA9IENsYXNzTmFtZSgnY250Jyk7XG5cbiAgICBjbGFzcyBGb2xkZXJWaWV3IHtcbiAgICAgICAgY29uc3RydWN0b3IoZG9jLCBjb25maWcpIHtcbiAgICAgICAgICAgIHRoaXMuY2xhc3NOYW1lXyA9IENsYXNzTmFtZShjb25maWcudmlld05hbWUgfHwgJ2ZsZCcpO1xuICAgICAgICAgICAgdGhpcy5lbGVtZW50ID0gZG9jLmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xuICAgICAgICAgICAgdGhpcy5lbGVtZW50LmNsYXNzTGlzdC5hZGQodGhpcy5jbGFzc05hbWVfKCksIGJsYWRlQ29udGFpbmVyQ2xhc3NOYW1lKCkpO1xuICAgICAgICAgICAgY29uZmlnLnZpZXdQcm9wcy5iaW5kQ2xhc3NNb2RpZmllcnModGhpcy5lbGVtZW50KTtcbiAgICAgICAgICAgIHRoaXMuZm9sZGFibGVfID0gY29uZmlnLmZvbGRhYmxlO1xuICAgICAgICAgICAgdGhpcy5mb2xkYWJsZV8uYmluZEV4cGFuZGVkQ2xhc3ModGhpcy5lbGVtZW50LCB0aGlzLmNsYXNzTmFtZV8odW5kZWZpbmVkLCAnZXhwYW5kZWQnKSk7XG4gICAgICAgICAgICBiaW5kVmFsdWVNYXAodGhpcy5mb2xkYWJsZV8sICdjb21wbGV0ZWQnLCB2YWx1ZVRvQ2xhc3NOYW1lKHRoaXMuZWxlbWVudCwgdGhpcy5jbGFzc05hbWVfKHVuZGVmaW5lZCwgJ2NwbCcpKSk7XG4gICAgICAgICAgICBjb25zdCBidXR0b25FbGVtID0gZG9jLmNyZWF0ZUVsZW1lbnQoJ2J1dHRvbicpO1xuICAgICAgICAgICAgYnV0dG9uRWxlbS5jbGFzc0xpc3QuYWRkKHRoaXMuY2xhc3NOYW1lXygnYicpKTtcbiAgICAgICAgICAgIGJpbmRWYWx1ZU1hcChjb25maWcucHJvcHMsICd0aXRsZScsICh0aXRsZSkgPT4ge1xuICAgICAgICAgICAgICAgIGlmIChpc0VtcHR5KHRpdGxlKSkge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLmVsZW1lbnQuY2xhc3NMaXN0LmFkZCh0aGlzLmNsYXNzTmFtZV8odW5kZWZpbmVkLCAnbm90JykpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5lbGVtZW50LmNsYXNzTGlzdC5yZW1vdmUodGhpcy5jbGFzc05hbWVfKHVuZGVmaW5lZCwgJ25vdCcpKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIGNvbmZpZy52aWV3UHJvcHMuYmluZERpc2FibGVkKGJ1dHRvbkVsZW0pO1xuICAgICAgICAgICAgdGhpcy5lbGVtZW50LmFwcGVuZENoaWxkKGJ1dHRvbkVsZW0pO1xuICAgICAgICAgICAgdGhpcy5idXR0b25FbGVtZW50ID0gYnV0dG9uRWxlbTtcbiAgICAgICAgICAgIGNvbnN0IHRpdGxlRWxlbSA9IGRvYy5jcmVhdGVFbGVtZW50KCdkaXYnKTtcbiAgICAgICAgICAgIHRpdGxlRWxlbS5jbGFzc0xpc3QuYWRkKHRoaXMuY2xhc3NOYW1lXygndCcpKTtcbiAgICAgICAgICAgIGJpbmRWYWx1ZVRvVGV4dENvbnRlbnQoY29uZmlnLnByb3BzLnZhbHVlKCd0aXRsZScpLCB0aXRsZUVsZW0pO1xuICAgICAgICAgICAgdGhpcy5idXR0b25FbGVtZW50LmFwcGVuZENoaWxkKHRpdGxlRWxlbSk7XG4gICAgICAgICAgICB0aGlzLnRpdGxlRWxlbWVudCA9IHRpdGxlRWxlbTtcbiAgICAgICAgICAgIGNvbnN0IG1hcmtFbGVtID0gZG9jLmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xuICAgICAgICAgICAgbWFya0VsZW0uY2xhc3NMaXN0LmFkZCh0aGlzLmNsYXNzTmFtZV8oJ20nKSk7XG4gICAgICAgICAgICB0aGlzLmJ1dHRvbkVsZW1lbnQuYXBwZW5kQ2hpbGQobWFya0VsZW0pO1xuICAgICAgICAgICAgY29uc3QgY29udGFpbmVyRWxlbSA9IGNvbmZpZy5jb250YWluZXJFbGVtZW50O1xuICAgICAgICAgICAgY29udGFpbmVyRWxlbS5jbGFzc0xpc3QuYWRkKHRoaXMuY2xhc3NOYW1lXygnYycpKTtcbiAgICAgICAgICAgIHRoaXMuZWxlbWVudC5hcHBlbmRDaGlsZChjb250YWluZXJFbGVtKTtcbiAgICAgICAgICAgIHRoaXMuY29udGFpbmVyRWxlbWVudCA9IGNvbnRhaW5lckVsZW07XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBjbGFzcyBGb2xkZXJDb250cm9sbGVyIGV4dGVuZHMgUmFja0xpa2VDb250cm9sbGVyIHtcbiAgICAgICAgY29uc3RydWN0b3IoZG9jLCBjb25maWcpIHtcbiAgICAgICAgICAgIHZhciBfYTtcbiAgICAgICAgICAgIGNvbnN0IGZvbGRhYmxlID0gRm9sZGFibGUuY3JlYXRlKChfYSA9IGNvbmZpZy5leHBhbmRlZCkgIT09IG51bGwgJiYgX2EgIT09IHZvaWQgMCA/IF9hIDogdHJ1ZSk7XG4gICAgICAgICAgICBjb25zdCByYyA9IG5ldyBSYWNrQ29udHJvbGxlcihkb2MsIHtcbiAgICAgICAgICAgICAgICBibGFkZTogY29uZmlnLmJsYWRlLFxuICAgICAgICAgICAgICAgIHJvb3Q6IGNvbmZpZy5yb290LFxuICAgICAgICAgICAgICAgIHZpZXdQcm9wczogY29uZmlnLnZpZXdQcm9wcyxcbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgc3VwZXIoT2JqZWN0LmFzc2lnbihPYmplY3QuYXNzaWduKHt9LCBjb25maWcpLCB7IHJhY2tDb250cm9sbGVyOiByYywgdmlldzogbmV3IEZvbGRlclZpZXcoZG9jLCB7XG4gICAgICAgICAgICAgICAgICAgIGNvbnRhaW5lckVsZW1lbnQ6IHJjLnZpZXcuZWxlbWVudCxcbiAgICAgICAgICAgICAgICAgICAgZm9sZGFibGU6IGZvbGRhYmxlLFxuICAgICAgICAgICAgICAgICAgICBwcm9wczogY29uZmlnLnByb3BzLFxuICAgICAgICAgICAgICAgICAgICB2aWV3TmFtZTogY29uZmlnLnJvb3QgPyAncm90JyA6IHVuZGVmaW5lZCxcbiAgICAgICAgICAgICAgICAgICAgdmlld1Byb3BzOiBjb25maWcudmlld1Byb3BzLFxuICAgICAgICAgICAgICAgIH0pIH0pKTtcbiAgICAgICAgICAgIHRoaXMub25UaXRsZUNsaWNrXyA9IHRoaXMub25UaXRsZUNsaWNrXy5iaW5kKHRoaXMpO1xuICAgICAgICAgICAgdGhpcy5wcm9wcyA9IGNvbmZpZy5wcm9wcztcbiAgICAgICAgICAgIHRoaXMuZm9sZGFibGUgPSBmb2xkYWJsZTtcbiAgICAgICAgICAgIGJpbmRGb2xkYWJsZSh0aGlzLmZvbGRhYmxlLCB0aGlzLnZpZXcuY29udGFpbmVyRWxlbWVudCk7XG4gICAgICAgICAgICB0aGlzLnZpZXcuYnV0dG9uRWxlbWVudC5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIHRoaXMub25UaXRsZUNsaWNrXyk7XG4gICAgICAgIH1cbiAgICAgICAgZ2V0IGRvY3VtZW50KCkge1xuICAgICAgICAgICAgcmV0dXJuIHRoaXMudmlldy5lbGVtZW50Lm93bmVyRG9jdW1lbnQ7XG4gICAgICAgIH1cbiAgICAgICAgb25UaXRsZUNsaWNrXygpIHtcbiAgICAgICAgICAgIHRoaXMuZm9sZGFibGUuc2V0KCdleHBhbmRlZCcsICF0aGlzLmZvbGRhYmxlLmdldCgnZXhwYW5kZWQnKSk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBjb25zdCBGb2xkZXJCbGFkZVBsdWdpbiA9IHtcbiAgICAgICAgaWQ6ICdmb2xkZXInLFxuICAgICAgICB0eXBlOiAnYmxhZGUnLFxuICAgICAgICBhY2NlcHQocGFyYW1zKSB7XG4gICAgICAgICAgICBjb25zdCBwID0gUGFyYW1zUGFyc2VycztcbiAgICAgICAgICAgIGNvbnN0IHJlc3VsdCA9IHBhcnNlUGFyYW1zKHBhcmFtcywge1xuICAgICAgICAgICAgICAgIHRpdGxlOiBwLnJlcXVpcmVkLnN0cmluZyxcbiAgICAgICAgICAgICAgICB2aWV3OiBwLnJlcXVpcmVkLmNvbnN0YW50KCdmb2xkZXInKSxcbiAgICAgICAgICAgICAgICBleHBhbmRlZDogcC5vcHRpb25hbC5ib29sZWFuLFxuICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICByZXR1cm4gcmVzdWx0ID8geyBwYXJhbXM6IHJlc3VsdCB9IDogbnVsbDtcbiAgICAgICAgfSxcbiAgICAgICAgY29udHJvbGxlcihhcmdzKSB7XG4gICAgICAgICAgICByZXR1cm4gbmV3IEZvbGRlckNvbnRyb2xsZXIoYXJncy5kb2N1bWVudCwge1xuICAgICAgICAgICAgICAgIGJsYWRlOiBhcmdzLmJsYWRlLFxuICAgICAgICAgICAgICAgIGV4cGFuZGVkOiBhcmdzLnBhcmFtcy5leHBhbmRlZCxcbiAgICAgICAgICAgICAgICBwcm9wczogVmFsdWVNYXAuZnJvbU9iamVjdCh7XG4gICAgICAgICAgICAgICAgICAgIHRpdGxlOiBhcmdzLnBhcmFtcy50aXRsZSxcbiAgICAgICAgICAgICAgICB9KSxcbiAgICAgICAgICAgICAgICB2aWV3UHJvcHM6IGFyZ3Mudmlld1Byb3BzLFxuICAgICAgICAgICAgfSk7XG4gICAgICAgIH0sXG4gICAgICAgIGFwaShhcmdzKSB7XG4gICAgICAgICAgICBpZiAoIShhcmdzLmNvbnRyb2xsZXIgaW5zdGFuY2VvZiBGb2xkZXJDb250cm9sbGVyKSkge1xuICAgICAgICAgICAgICAgIHJldHVybiBudWxsO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgcmV0dXJuIG5ldyBGb2xkZXJBcGkoYXJncy5jb250cm9sbGVyLCBhcmdzLnBvb2wpO1xuICAgICAgICB9LFxuICAgIH07XG5cbiAgICBjbGFzcyBMYWJlbGVkVmFsdWVDb250cm9sbGVyIGV4dGVuZHMgVmFsdWVCbGFkZUNvbnRyb2xsZXIge1xuICAgICAgICBjb25zdHJ1Y3Rvcihkb2MsIGNvbmZpZykge1xuICAgICAgICAgICAgY29uc3Qgdmlld1Byb3BzID0gY29uZmlnLnZhbHVlQ29udHJvbGxlci52aWV3UHJvcHM7XG4gICAgICAgICAgICBzdXBlcihPYmplY3QuYXNzaWduKE9iamVjdC5hc3NpZ24oe30sIGNvbmZpZyksIHsgdmFsdWU6IGNvbmZpZy52YWx1ZUNvbnRyb2xsZXIudmFsdWUsIHZpZXc6IG5ldyBMYWJlbFZpZXcoZG9jLCB7XG4gICAgICAgICAgICAgICAgICAgIHByb3BzOiBjb25maWcucHJvcHMsXG4gICAgICAgICAgICAgICAgICAgIHZpZXdQcm9wczogdmlld1Byb3BzLFxuICAgICAgICAgICAgICAgIH0pLCB2aWV3UHJvcHM6IHZpZXdQcm9wcyB9KSk7XG4gICAgICAgICAgICB0aGlzLnByb3BzID0gY29uZmlnLnByb3BzO1xuICAgICAgICAgICAgdGhpcy52YWx1ZUNvbnRyb2xsZXIgPSBjb25maWcudmFsdWVDb250cm9sbGVyO1xuICAgICAgICAgICAgdGhpcy52aWV3LnZhbHVlRWxlbWVudC5hcHBlbmRDaGlsZCh0aGlzLnZhbHVlQ29udHJvbGxlci52aWV3LmVsZW1lbnQpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgY2xhc3MgU2VwYXJhdG9yQXBpIGV4dGVuZHMgQmxhZGVBcGkge1xuICAgIH1cblxuICAgIGNvbnN0IGNsYXNzTmFtZSRuID0gQ2xhc3NOYW1lKCdzcHInKTtcbiAgICBjbGFzcyBTZXBhcmF0b3JWaWV3IHtcbiAgICAgICAgY29uc3RydWN0b3IoZG9jLCBjb25maWcpIHtcbiAgICAgICAgICAgIHRoaXMuZWxlbWVudCA9IGRvYy5jcmVhdGVFbGVtZW50KCdkaXYnKTtcbiAgICAgICAgICAgIHRoaXMuZWxlbWVudC5jbGFzc0xpc3QuYWRkKGNsYXNzTmFtZSRuKCkpO1xuICAgICAgICAgICAgY29uZmlnLnZpZXdQcm9wcy5iaW5kQ2xhc3NNb2RpZmllcnModGhpcy5lbGVtZW50KTtcbiAgICAgICAgICAgIGNvbnN0IGhyRWxlbSA9IGRvYy5jcmVhdGVFbGVtZW50KCdocicpO1xuICAgICAgICAgICAgaHJFbGVtLmNsYXNzTGlzdC5hZGQoY2xhc3NOYW1lJG4oJ3InKSk7XG4gICAgICAgICAgICB0aGlzLmVsZW1lbnQuYXBwZW5kQ2hpbGQoaHJFbGVtKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIGNsYXNzIFNlcGFyYXRvckNvbnRyb2xsZXIgZXh0ZW5kcyBCbGFkZUNvbnRyb2xsZXIge1xuICAgICAgICBjb25zdHJ1Y3Rvcihkb2MsIGNvbmZpZykge1xuICAgICAgICAgICAgc3VwZXIoT2JqZWN0LmFzc2lnbihPYmplY3QuYXNzaWduKHt9LCBjb25maWcpLCB7IHZpZXc6IG5ldyBTZXBhcmF0b3JWaWV3KGRvYywge1xuICAgICAgICAgICAgICAgICAgICB2aWV3UHJvcHM6IGNvbmZpZy52aWV3UHJvcHMsXG4gICAgICAgICAgICAgICAgfSkgfSkpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgY29uc3QgU2VwYXJhdG9yQmxhZGVQbHVnaW4gPSB7XG4gICAgICAgIGlkOiAnc2VwYXJhdG9yJyxcbiAgICAgICAgdHlwZTogJ2JsYWRlJyxcbiAgICAgICAgYWNjZXB0KHBhcmFtcykge1xuICAgICAgICAgICAgY29uc3QgcCA9IFBhcmFtc1BhcnNlcnM7XG4gICAgICAgICAgICBjb25zdCByZXN1bHQgPSBwYXJzZVBhcmFtcyhwYXJhbXMsIHtcbiAgICAgICAgICAgICAgICB2aWV3OiBwLnJlcXVpcmVkLmNvbnN0YW50KCdzZXBhcmF0b3InKSxcbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgcmV0dXJuIHJlc3VsdCA/IHsgcGFyYW1zOiByZXN1bHQgfSA6IG51bGw7XG4gICAgICAgIH0sXG4gICAgICAgIGNvbnRyb2xsZXIoYXJncykge1xuICAgICAgICAgICAgcmV0dXJuIG5ldyBTZXBhcmF0b3JDb250cm9sbGVyKGFyZ3MuZG9jdW1lbnQsIHtcbiAgICAgICAgICAgICAgICBibGFkZTogYXJncy5ibGFkZSxcbiAgICAgICAgICAgICAgICB2aWV3UHJvcHM6IGFyZ3Mudmlld1Byb3BzLFxuICAgICAgICAgICAgfSk7XG4gICAgICAgIH0sXG4gICAgICAgIGFwaShhcmdzKSB7XG4gICAgICAgICAgICBpZiAoIShhcmdzLmNvbnRyb2xsZXIgaW5zdGFuY2VvZiBTZXBhcmF0b3JDb250cm9sbGVyKSkge1xuICAgICAgICAgICAgICAgIHJldHVybiBudWxsO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgcmV0dXJuIG5ldyBTZXBhcmF0b3JBcGkoYXJncy5jb250cm9sbGVyKTtcbiAgICAgICAgfSxcbiAgICB9O1xuXG4gICAgY29uc3QgY2xhc3NOYW1lJG0gPSBDbGFzc05hbWUoJycpO1xuICAgIGZ1bmN0aW9uIHZhbHVlVG9Nb2RpZmllcihlbGVtLCBtb2RpZmllcikge1xuICAgICAgICByZXR1cm4gdmFsdWVUb0NsYXNzTmFtZShlbGVtLCBjbGFzc05hbWUkbSh1bmRlZmluZWQsIG1vZGlmaWVyKSk7XG4gICAgfVxuICAgIGNsYXNzIFZpZXdQcm9wcyBleHRlbmRzIFZhbHVlTWFwIHtcbiAgICAgICAgY29uc3RydWN0b3IodmFsdWVNYXApIHtcbiAgICAgICAgICAgIHN1cGVyKHZhbHVlTWFwKTtcbiAgICAgICAgfVxuICAgICAgICBzdGF0aWMgY3JlYXRlKG9wdF9pbml0aWFsVmFsdWUpIHtcbiAgICAgICAgICAgIHZhciBfYSwgX2I7XG4gICAgICAgICAgICBjb25zdCBpbml0aWFsVmFsdWUgPSBvcHRfaW5pdGlhbFZhbHVlICE9PSBudWxsICYmIG9wdF9pbml0aWFsVmFsdWUgIT09IHZvaWQgMCA/IG9wdF9pbml0aWFsVmFsdWUgOiB7fTtcbiAgICAgICAgICAgIGNvbnN0IGNvcmVPYmogPSB7XG4gICAgICAgICAgICAgICAgZGlzYWJsZWQ6IChfYSA9IGluaXRpYWxWYWx1ZS5kaXNhYmxlZCkgIT09IG51bGwgJiYgX2EgIT09IHZvaWQgMCA/IF9hIDogZmFsc2UsXG4gICAgICAgICAgICAgICAgZGlzcG9zZWQ6IGZhbHNlLFxuICAgICAgICAgICAgICAgIGhpZGRlbjogKF9iID0gaW5pdGlhbFZhbHVlLmhpZGRlbikgIT09IG51bGwgJiYgX2IgIT09IHZvaWQgMCA/IF9iIDogZmFsc2UsXG4gICAgICAgICAgICB9O1xuICAgICAgICAgICAgY29uc3QgY29yZSA9IFZhbHVlTWFwLmNyZWF0ZUNvcmUoY29yZU9iaik7XG4gICAgICAgICAgICByZXR1cm4gbmV3IFZpZXdQcm9wcyhjb3JlKTtcbiAgICAgICAgfVxuICAgICAgICBiaW5kQ2xhc3NNb2RpZmllcnMoZWxlbSkge1xuICAgICAgICAgICAgYmluZFZhbHVlTWFwKHRoaXMsICdkaXNhYmxlZCcsIHZhbHVlVG9Nb2RpZmllcihlbGVtLCAnZGlzYWJsZWQnKSk7XG4gICAgICAgICAgICBiaW5kVmFsdWVNYXAodGhpcywgJ2hpZGRlbicsIHZhbHVlVG9Nb2RpZmllcihlbGVtLCAnaGlkZGVuJykpO1xuICAgICAgICB9XG4gICAgICAgIGJpbmREaXNhYmxlZCh0YXJnZXQpIHtcbiAgICAgICAgICAgIGJpbmRWYWx1ZU1hcCh0aGlzLCAnZGlzYWJsZWQnLCAoZGlzYWJsZWQpID0+IHtcbiAgICAgICAgICAgICAgICB0YXJnZXQuZGlzYWJsZWQgPSBkaXNhYmxlZDtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9XG4gICAgICAgIGJpbmRUYWJJbmRleChlbGVtKSB7XG4gICAgICAgICAgICBiaW5kVmFsdWVNYXAodGhpcywgJ2Rpc2FibGVkJywgKGRpc2FibGVkKSA9PiB7XG4gICAgICAgICAgICAgICAgZWxlbS50YWJJbmRleCA9IGRpc2FibGVkID8gLTEgOiAwO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgIH1cbiAgICAgICAgaGFuZGxlRGlzcG9zZShjYWxsYmFjaykge1xuICAgICAgICAgICAgdGhpcy52YWx1ZSgnZGlzcG9zZWQnKS5lbWl0dGVyLm9uKCdjaGFuZ2UnLCAoZGlzcG9zZWQpID0+IHtcbiAgICAgICAgICAgICAgICBpZiAoZGlzcG9zZWQpIHtcbiAgICAgICAgICAgICAgICAgICAgY2FsbGJhY2soKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIGNvbnN0IGNsYXNzTmFtZSRsID0gQ2xhc3NOYW1lKCd0YmknKTtcbiAgICBjbGFzcyBUYWJJdGVtVmlldyB7XG4gICAgICAgIGNvbnN0cnVjdG9yKGRvYywgY29uZmlnKSB7XG4gICAgICAgICAgICB0aGlzLmVsZW1lbnQgPSBkb2MuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XG4gICAgICAgICAgICB0aGlzLmVsZW1lbnQuY2xhc3NMaXN0LmFkZChjbGFzc05hbWUkbCgpKTtcbiAgICAgICAgICAgIGNvbmZpZy52aWV3UHJvcHMuYmluZENsYXNzTW9kaWZpZXJzKHRoaXMuZWxlbWVudCk7XG4gICAgICAgICAgICBiaW5kVmFsdWVNYXAoY29uZmlnLnByb3BzLCAnc2VsZWN0ZWQnLCAoc2VsZWN0ZWQpID0+IHtcbiAgICAgICAgICAgICAgICBpZiAoc2VsZWN0ZWQpIHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5lbGVtZW50LmNsYXNzTGlzdC5hZGQoY2xhc3NOYW1lJGwodW5kZWZpbmVkLCAnc2VsJykpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5lbGVtZW50LmNsYXNzTGlzdC5yZW1vdmUoY2xhc3NOYW1lJGwodW5kZWZpbmVkLCAnc2VsJykpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgY29uc3QgYnV0dG9uRWxlbSA9IGRvYy5jcmVhdGVFbGVtZW50KCdidXR0b24nKTtcbiAgICAgICAgICAgIGJ1dHRvbkVsZW0uY2xhc3NMaXN0LmFkZChjbGFzc05hbWUkbCgnYicpKTtcbiAgICAgICAgICAgIGNvbmZpZy52aWV3UHJvcHMuYmluZERpc2FibGVkKGJ1dHRvbkVsZW0pO1xuICAgICAgICAgICAgdGhpcy5lbGVtZW50LmFwcGVuZENoaWxkKGJ1dHRvbkVsZW0pO1xuICAgICAgICAgICAgdGhpcy5idXR0b25FbGVtZW50ID0gYnV0dG9uRWxlbTtcbiAgICAgICAgICAgIGNvbnN0IHRpdGxlRWxlbSA9IGRvYy5jcmVhdGVFbGVtZW50KCdkaXYnKTtcbiAgICAgICAgICAgIHRpdGxlRWxlbS5jbGFzc0xpc3QuYWRkKGNsYXNzTmFtZSRsKCd0JykpO1xuICAgICAgICAgICAgYmluZFZhbHVlVG9UZXh0Q29udGVudChjb25maWcucHJvcHMudmFsdWUoJ3RpdGxlJyksIHRpdGxlRWxlbSk7XG4gICAgICAgICAgICB0aGlzLmJ1dHRvbkVsZW1lbnQuYXBwZW5kQ2hpbGQodGl0bGVFbGVtKTtcbiAgICAgICAgICAgIHRoaXMudGl0bGVFbGVtZW50ID0gdGl0bGVFbGVtO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgY2xhc3MgVGFiSXRlbUNvbnRyb2xsZXIge1xuICAgICAgICBjb25zdHJ1Y3Rvcihkb2MsIGNvbmZpZykge1xuICAgICAgICAgICAgdGhpcy5lbWl0dGVyID0gbmV3IEVtaXR0ZXIoKTtcbiAgICAgICAgICAgIHRoaXMub25DbGlja18gPSB0aGlzLm9uQ2xpY2tfLmJpbmQodGhpcyk7XG4gICAgICAgICAgICB0aGlzLnByb3BzID0gY29uZmlnLnByb3BzO1xuICAgICAgICAgICAgdGhpcy52aWV3UHJvcHMgPSBjb25maWcudmlld1Byb3BzO1xuICAgICAgICAgICAgdGhpcy52aWV3ID0gbmV3IFRhYkl0ZW1WaWV3KGRvYywge1xuICAgICAgICAgICAgICAgIHByb3BzOiBjb25maWcucHJvcHMsXG4gICAgICAgICAgICAgICAgdmlld1Byb3BzOiBjb25maWcudmlld1Byb3BzLFxuICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB0aGlzLnZpZXcuYnV0dG9uRWxlbWVudC5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIHRoaXMub25DbGlja18pO1xuICAgICAgICB9XG4gICAgICAgIG9uQ2xpY2tfKCkge1xuICAgICAgICAgICAgdGhpcy5lbWl0dGVyLmVtaXQoJ2NsaWNrJywge1xuICAgICAgICAgICAgICAgIHNlbmRlcjogdGhpcyxcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgY2xhc3MgVGFiUGFnZUNvbnRyb2xsZXIge1xuICAgICAgICBjb25zdHJ1Y3Rvcihkb2MsIGNvbmZpZykge1xuICAgICAgICAgICAgdGhpcy5vbkl0ZW1DbGlja18gPSB0aGlzLm9uSXRlbUNsaWNrXy5iaW5kKHRoaXMpO1xuICAgICAgICAgICAgdGhpcy5pY18gPSBuZXcgVGFiSXRlbUNvbnRyb2xsZXIoZG9jLCB7XG4gICAgICAgICAgICAgICAgcHJvcHM6IGNvbmZpZy5pdGVtUHJvcHMsXG4gICAgICAgICAgICAgICAgdmlld1Byb3BzOiBWaWV3UHJvcHMuY3JlYXRlKCksXG4gICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIHRoaXMuaWNfLmVtaXR0ZXIub24oJ2NsaWNrJywgdGhpcy5vbkl0ZW1DbGlja18pO1xuICAgICAgICAgICAgdGhpcy5jY18gPSBuZXcgUmFja0NvbnRyb2xsZXIoZG9jLCB7XG4gICAgICAgICAgICAgICAgYmxhZGU6IGNyZWF0ZUJsYWRlKCksXG4gICAgICAgICAgICAgICAgdmlld1Byb3BzOiBWaWV3UHJvcHMuY3JlYXRlKCksXG4gICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIHRoaXMucHJvcHMgPSBjb25maWcucHJvcHM7XG4gICAgICAgICAgICBiaW5kVmFsdWVNYXAodGhpcy5wcm9wcywgJ3NlbGVjdGVkJywgKHNlbGVjdGVkKSA9PiB7XG4gICAgICAgICAgICAgICAgdGhpcy5pdGVtQ29udHJvbGxlci5wcm9wcy5zZXQoJ3NlbGVjdGVkJywgc2VsZWN0ZWQpO1xuICAgICAgICAgICAgICAgIHRoaXMuY29udGVudENvbnRyb2xsZXIudmlld1Byb3BzLnNldCgnaGlkZGVuJywgIXNlbGVjdGVkKTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9XG4gICAgICAgIGdldCBpdGVtQ29udHJvbGxlcigpIHtcbiAgICAgICAgICAgIHJldHVybiB0aGlzLmljXztcbiAgICAgICAgfVxuICAgICAgICBnZXQgY29udGVudENvbnRyb2xsZXIoKSB7XG4gICAgICAgICAgICByZXR1cm4gdGhpcy5jY187XG4gICAgICAgIH1cbiAgICAgICAgb25JdGVtQ2xpY2tfKCkge1xuICAgICAgICAgICAgdGhpcy5wcm9wcy5zZXQoJ3NlbGVjdGVkJywgdHJ1ZSk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBjbGFzcyBUYWJQYWdlQXBpIHtcbiAgICAgICAgY29uc3RydWN0b3IoY29udHJvbGxlciwgY29udGVudFJhY2tBcGkpIHtcbiAgICAgICAgICAgIHRoaXMuY29udHJvbGxlcl8gPSBjb250cm9sbGVyO1xuICAgICAgICAgICAgdGhpcy5yYWNrQXBpXyA9IGNvbnRlbnRSYWNrQXBpO1xuICAgICAgICB9XG4gICAgICAgIGdldCB0aXRsZSgpIHtcbiAgICAgICAgICAgIHZhciBfYTtcbiAgICAgICAgICAgIHJldHVybiAoX2EgPSB0aGlzLmNvbnRyb2xsZXJfLml0ZW1Db250cm9sbGVyLnByb3BzLmdldCgndGl0bGUnKSkgIT09IG51bGwgJiYgX2EgIT09IHZvaWQgMCA/IF9hIDogJyc7XG4gICAgICAgIH1cbiAgICAgICAgc2V0IHRpdGxlKHRpdGxlKSB7XG4gICAgICAgICAgICB0aGlzLmNvbnRyb2xsZXJfLml0ZW1Db250cm9sbGVyLnByb3BzLnNldCgndGl0bGUnLCB0aXRsZSk7XG4gICAgICAgIH1cbiAgICAgICAgZ2V0IHNlbGVjdGVkKCkge1xuICAgICAgICAgICAgcmV0dXJuIHRoaXMuY29udHJvbGxlcl8ucHJvcHMuZ2V0KCdzZWxlY3RlZCcpO1xuICAgICAgICB9XG4gICAgICAgIHNldCBzZWxlY3RlZChzZWxlY3RlZCkge1xuICAgICAgICAgICAgdGhpcy5jb250cm9sbGVyXy5wcm9wcy5zZXQoJ3NlbGVjdGVkJywgc2VsZWN0ZWQpO1xuICAgICAgICB9XG4gICAgICAgIGdldCBjaGlsZHJlbigpIHtcbiAgICAgICAgICAgIHJldHVybiB0aGlzLnJhY2tBcGlfLmNoaWxkcmVuO1xuICAgICAgICB9XG4gICAgICAgIGFkZEJ1dHRvbihwYXJhbXMpIHtcbiAgICAgICAgICAgIHJldHVybiB0aGlzLnJhY2tBcGlfLmFkZEJ1dHRvbihwYXJhbXMpO1xuICAgICAgICB9XG4gICAgICAgIGFkZEZvbGRlcihwYXJhbXMpIHtcbiAgICAgICAgICAgIHJldHVybiB0aGlzLnJhY2tBcGlfLmFkZEZvbGRlcihwYXJhbXMpO1xuICAgICAgICB9XG4gICAgICAgIGFkZFNlcGFyYXRvcihvcHRfcGFyYW1zKSB7XG4gICAgICAgICAgICByZXR1cm4gdGhpcy5yYWNrQXBpXy5hZGRTZXBhcmF0b3Iob3B0X3BhcmFtcyk7XG4gICAgICAgIH1cbiAgICAgICAgYWRkVGFiKHBhcmFtcykge1xuICAgICAgICAgICAgcmV0dXJuIHRoaXMucmFja0FwaV8uYWRkVGFiKHBhcmFtcyk7XG4gICAgICAgIH1cbiAgICAgICAgYWRkKGFwaSwgb3B0X2luZGV4KSB7XG4gICAgICAgICAgICB0aGlzLnJhY2tBcGlfLmFkZChhcGksIG9wdF9pbmRleCk7XG4gICAgICAgIH1cbiAgICAgICAgcmVtb3ZlKGFwaSkge1xuICAgICAgICAgICAgdGhpcy5yYWNrQXBpXy5yZW1vdmUoYXBpKTtcbiAgICAgICAgfVxuICAgICAgICBhZGRJbnB1dChvYmplY3QsIGtleSwgb3B0X3BhcmFtcykge1xuICAgICAgICAgICAgcmV0dXJuIHRoaXMucmFja0FwaV8uYWRkSW5wdXQob2JqZWN0LCBrZXksIG9wdF9wYXJhbXMpO1xuICAgICAgICB9XG4gICAgICAgIGFkZE1vbml0b3Iob2JqZWN0LCBrZXksIG9wdF9wYXJhbXMpIHtcbiAgICAgICAgICAgIHJldHVybiB0aGlzLnJhY2tBcGlfLmFkZE1vbml0b3Iob2JqZWN0LCBrZXksIG9wdF9wYXJhbXMpO1xuICAgICAgICB9XG4gICAgICAgIGFkZEJsYWRlKHBhcmFtcykge1xuICAgICAgICAgICAgcmV0dXJuIHRoaXMucmFja0FwaV8uYWRkQmxhZGUocGFyYW1zKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIGNsYXNzIFRhYkFwaSBleHRlbmRzIFJhY2tMaWtlQXBpIHtcbiAgICAgICAgY29uc3RydWN0b3IoY29udHJvbGxlciwgcG9vbCkge1xuICAgICAgICAgICAgc3VwZXIoY29udHJvbGxlciwgbmV3IFJhY2tBcGkoY29udHJvbGxlci5yYWNrQ29udHJvbGxlciwgcG9vbCkpO1xuICAgICAgICAgICAgdGhpcy5vblBhZ2VBZGRfID0gdGhpcy5vblBhZ2VBZGRfLmJpbmQodGhpcyk7XG4gICAgICAgICAgICB0aGlzLm9uUGFnZVJlbW92ZV8gPSB0aGlzLm9uUGFnZVJlbW92ZV8uYmluZCh0aGlzKTtcbiAgICAgICAgICAgIHRoaXMuZW1pdHRlcl8gPSBuZXcgRW1pdHRlcigpO1xuICAgICAgICAgICAgdGhpcy5wYWdlQXBpTWFwXyA9IG5ldyBNYXAoKTtcbiAgICAgICAgICAgIHRoaXMucmFja0FwaV8ub24oJ2NoYW5nZScsIChldikgPT4ge1xuICAgICAgICAgICAgICAgIHRoaXMuZW1pdHRlcl8uZW1pdCgnY2hhbmdlJywge1xuICAgICAgICAgICAgICAgICAgICBldmVudDogZXYsXG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIHRoaXMucmFja0FwaV8ub24oJ3VwZGF0ZScsIChldikgPT4ge1xuICAgICAgICAgICAgICAgIHRoaXMuZW1pdHRlcl8uZW1pdCgndXBkYXRlJywge1xuICAgICAgICAgICAgICAgICAgICBldmVudDogZXYsXG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIHRoaXMuY29udHJvbGxlcl8ucGFnZVNldC5lbWl0dGVyLm9uKCdhZGQnLCB0aGlzLm9uUGFnZUFkZF8pO1xuICAgICAgICAgICAgdGhpcy5jb250cm9sbGVyXy5wYWdlU2V0LmVtaXR0ZXIub24oJ3JlbW92ZScsIHRoaXMub25QYWdlUmVtb3ZlXyk7XG4gICAgICAgICAgICB0aGlzLmNvbnRyb2xsZXJfLnBhZ2VTZXQuaXRlbXMuZm9yRWFjaCgocGMpID0+IHtcbiAgICAgICAgICAgICAgICB0aGlzLnNldFVwUGFnZUFwaV8ocGMpO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgIH1cbiAgICAgICAgZ2V0IHBhZ2VzKCkge1xuICAgICAgICAgICAgcmV0dXJuIHRoaXMuY29udHJvbGxlcl8ucGFnZVNldC5pdGVtcy5tYXAoKHBjKSA9PiB7XG4gICAgICAgICAgICAgICAgY29uc3QgYXBpID0gdGhpcy5wYWdlQXBpTWFwXy5nZXQocGMpO1xuICAgICAgICAgICAgICAgIGlmICghYXBpKSB7XG4gICAgICAgICAgICAgICAgICAgIHRocm93IFRwRXJyb3Iuc2hvdWxkTmV2ZXJIYXBwZW4oKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgcmV0dXJuIGFwaTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9XG4gICAgICAgIGFkZFBhZ2UocGFyYW1zKSB7XG4gICAgICAgICAgICBjb25zdCBkb2MgPSB0aGlzLmNvbnRyb2xsZXJfLnZpZXcuZWxlbWVudC5vd25lckRvY3VtZW50O1xuICAgICAgICAgICAgY29uc3QgcGMgPSBuZXcgVGFiUGFnZUNvbnRyb2xsZXIoZG9jLCB7XG4gICAgICAgICAgICAgICAgaXRlbVByb3BzOiBWYWx1ZU1hcC5mcm9tT2JqZWN0KHtcbiAgICAgICAgICAgICAgICAgICAgc2VsZWN0ZWQ6IGZhbHNlLFxuICAgICAgICAgICAgICAgICAgICB0aXRsZTogcGFyYW1zLnRpdGxlLFxuICAgICAgICAgICAgICAgIH0pLFxuICAgICAgICAgICAgICAgIHByb3BzOiBWYWx1ZU1hcC5mcm9tT2JqZWN0KHtcbiAgICAgICAgICAgICAgICAgICAgc2VsZWN0ZWQ6IGZhbHNlLFxuICAgICAgICAgICAgICAgIH0pLFxuICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB0aGlzLmNvbnRyb2xsZXJfLmFkZChwYywgcGFyYW1zLmluZGV4KTtcbiAgICAgICAgICAgIGNvbnN0IGFwaSA9IHRoaXMucGFnZUFwaU1hcF8uZ2V0KHBjKTtcbiAgICAgICAgICAgIGlmICghYXBpKSB7XG4gICAgICAgICAgICAgICAgdGhyb3cgVHBFcnJvci5zaG91bGROZXZlckhhcHBlbigpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgcmV0dXJuIGFwaTtcbiAgICAgICAgfVxuICAgICAgICByZW1vdmVQYWdlKGluZGV4KSB7XG4gICAgICAgICAgICB0aGlzLmNvbnRyb2xsZXJfLnJlbW92ZShpbmRleCk7XG4gICAgICAgIH1cbiAgICAgICAgb24oZXZlbnROYW1lLCBoYW5kbGVyKSB7XG4gICAgICAgICAgICBjb25zdCBiaCA9IGhhbmRsZXIuYmluZCh0aGlzKTtcbiAgICAgICAgICAgIHRoaXMuZW1pdHRlcl8ub24oZXZlbnROYW1lLCAoZXYpID0+IHtcbiAgICAgICAgICAgICAgICBiaChldi5ldmVudCk7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIHJldHVybiB0aGlzO1xuICAgICAgICB9XG4gICAgICAgIHNldFVwUGFnZUFwaV8ocGMpIHtcbiAgICAgICAgICAgIGNvbnN0IHJhY2tBcGkgPSB0aGlzLnJhY2tBcGlfWydhcGlTZXRfJ10uZmluZCgoYXBpKSA9PiBhcGkuY29udHJvbGxlcl8gPT09IHBjLmNvbnRlbnRDb250cm9sbGVyKTtcbiAgICAgICAgICAgIGlmICghcmFja0FwaSkge1xuICAgICAgICAgICAgICAgIHRocm93IFRwRXJyb3Iuc2hvdWxkTmV2ZXJIYXBwZW4oKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGNvbnN0IGFwaSA9IG5ldyBUYWJQYWdlQXBpKHBjLCByYWNrQXBpKTtcbiAgICAgICAgICAgIHRoaXMucGFnZUFwaU1hcF8uc2V0KHBjLCBhcGkpO1xuICAgICAgICB9XG4gICAgICAgIG9uUGFnZUFkZF8oZXYpIHtcbiAgICAgICAgICAgIHRoaXMuc2V0VXBQYWdlQXBpXyhldi5pdGVtKTtcbiAgICAgICAgfVxuICAgICAgICBvblBhZ2VSZW1vdmVfKGV2KSB7XG4gICAgICAgICAgICBjb25zdCBhcGkgPSB0aGlzLnBhZ2VBcGlNYXBfLmdldChldi5pdGVtKTtcbiAgICAgICAgICAgIGlmICghYXBpKSB7XG4gICAgICAgICAgICAgICAgdGhyb3cgVHBFcnJvci5zaG91bGROZXZlckhhcHBlbigpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgdGhpcy5wYWdlQXBpTWFwXy5kZWxldGUoZXYuaXRlbSk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBjb25zdCBjbGFzc05hbWUkayA9IENsYXNzTmFtZSgndGFiJyk7XG4gICAgY2xhc3MgVGFiVmlldyB7XG4gICAgICAgIGNvbnN0cnVjdG9yKGRvYywgY29uZmlnKSB7XG4gICAgICAgICAgICB0aGlzLmVsZW1lbnQgPSBkb2MuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XG4gICAgICAgICAgICB0aGlzLmVsZW1lbnQuY2xhc3NMaXN0LmFkZChjbGFzc05hbWUkaygpLCBibGFkZUNvbnRhaW5lckNsYXNzTmFtZSgpKTtcbiAgICAgICAgICAgIGNvbmZpZy52aWV3UHJvcHMuYmluZENsYXNzTW9kaWZpZXJzKHRoaXMuZWxlbWVudCk7XG4gICAgICAgICAgICBiaW5kVmFsdWUoY29uZmlnLmVtcHR5LCB2YWx1ZVRvQ2xhc3NOYW1lKHRoaXMuZWxlbWVudCwgY2xhc3NOYW1lJGsodW5kZWZpbmVkLCAnbm9wJykpKTtcbiAgICAgICAgICAgIGNvbnN0IGl0ZW1zRWxlbSA9IGRvYy5jcmVhdGVFbGVtZW50KCdkaXYnKTtcbiAgICAgICAgICAgIGl0ZW1zRWxlbS5jbGFzc0xpc3QuYWRkKGNsYXNzTmFtZSRrKCdpJykpO1xuICAgICAgICAgICAgdGhpcy5lbGVtZW50LmFwcGVuZENoaWxkKGl0ZW1zRWxlbSk7XG4gICAgICAgICAgICB0aGlzLml0ZW1zRWxlbWVudCA9IGl0ZW1zRWxlbTtcbiAgICAgICAgICAgIGNvbnN0IGNvbnRlbnRzRWxlbSA9IGNvbmZpZy5jb250ZW50c0VsZW1lbnQ7XG4gICAgICAgICAgICBjb250ZW50c0VsZW0uY2xhc3NMaXN0LmFkZChjbGFzc05hbWUkaygnYycpKTtcbiAgICAgICAgICAgIHRoaXMuZWxlbWVudC5hcHBlbmRDaGlsZChjb250ZW50c0VsZW0pO1xuICAgICAgICAgICAgdGhpcy5jb250ZW50c0VsZW1lbnQgPSBjb250ZW50c0VsZW07XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBjbGFzcyBUYWJDb250cm9sbGVyIGV4dGVuZHMgUmFja0xpa2VDb250cm9sbGVyIHtcbiAgICAgICAgY29uc3RydWN0b3IoZG9jLCBjb25maWcpIHtcbiAgICAgICAgICAgIGNvbnN0IGNyID0gbmV3IFJhY2tDb250cm9sbGVyKGRvYywge1xuICAgICAgICAgICAgICAgIGJsYWRlOiBjb25maWcuYmxhZGUsXG4gICAgICAgICAgICAgICAgdmlld1Byb3BzOiBjb25maWcudmlld1Byb3BzLFxuICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICBjb25zdCBlbXB0eSA9IGNyZWF0ZVZhbHVlKHRydWUpO1xuICAgICAgICAgICAgc3VwZXIoe1xuICAgICAgICAgICAgICAgIGJsYWRlOiBjb25maWcuYmxhZGUsXG4gICAgICAgICAgICAgICAgcmFja0NvbnRyb2xsZXI6IGNyLFxuICAgICAgICAgICAgICAgIHZpZXc6IG5ldyBUYWJWaWV3KGRvYywge1xuICAgICAgICAgICAgICAgICAgICBjb250ZW50c0VsZW1lbnQ6IGNyLnZpZXcuZWxlbWVudCxcbiAgICAgICAgICAgICAgICAgICAgZW1wdHk6IGVtcHR5LFxuICAgICAgICAgICAgICAgICAgICB2aWV3UHJvcHM6IGNvbmZpZy52aWV3UHJvcHMsXG4gICAgICAgICAgICAgICAgfSksXG4gICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIHRoaXMub25QYWdlQWRkXyA9IHRoaXMub25QYWdlQWRkXy5iaW5kKHRoaXMpO1xuICAgICAgICAgICAgdGhpcy5vblBhZ2VSZW1vdmVfID0gdGhpcy5vblBhZ2VSZW1vdmVfLmJpbmQodGhpcyk7XG4gICAgICAgICAgICB0aGlzLm9uUGFnZVNlbGVjdGVkQ2hhbmdlXyA9IHRoaXMub25QYWdlU2VsZWN0ZWRDaGFuZ2VfLmJpbmQodGhpcyk7XG4gICAgICAgICAgICB0aGlzLnBhZ2VTZXRfID0gbmV3IE5lc3RlZE9yZGVyZWRTZXQoKCkgPT4gbnVsbCk7XG4gICAgICAgICAgICB0aGlzLnBhZ2VTZXRfLmVtaXR0ZXIub24oJ2FkZCcsIHRoaXMub25QYWdlQWRkXyk7XG4gICAgICAgICAgICB0aGlzLnBhZ2VTZXRfLmVtaXR0ZXIub24oJ3JlbW92ZScsIHRoaXMub25QYWdlUmVtb3ZlXyk7XG4gICAgICAgICAgICB0aGlzLmVtcHR5XyA9IGVtcHR5O1xuICAgICAgICAgICAgdGhpcy5hcHBseVBhZ2VzXygpO1xuICAgICAgICB9XG4gICAgICAgIGdldCBwYWdlU2V0KCkge1xuICAgICAgICAgICAgcmV0dXJuIHRoaXMucGFnZVNldF87XG4gICAgICAgIH1cbiAgICAgICAgYWRkKHBjLCBvcHRfaW5kZXgpIHtcbiAgICAgICAgICAgIHRoaXMucGFnZVNldF8uYWRkKHBjLCBvcHRfaW5kZXggIT09IG51bGwgJiYgb3B0X2luZGV4ICE9PSB2b2lkIDAgPyBvcHRfaW5kZXggOiB0aGlzLnBhZ2VTZXRfLml0ZW1zLmxlbmd0aCk7XG4gICAgICAgIH1cbiAgICAgICAgcmVtb3ZlKGluZGV4KSB7XG4gICAgICAgICAgICB0aGlzLnBhZ2VTZXRfLnJlbW92ZSh0aGlzLnBhZ2VTZXRfLml0ZW1zW2luZGV4XSk7XG4gICAgICAgIH1cbiAgICAgICAgYXBwbHlQYWdlc18oKSB7XG4gICAgICAgICAgICB0aGlzLmtlZXBTZWxlY3Rpb25fKCk7XG4gICAgICAgICAgICB0aGlzLmVtcHR5Xy5yYXdWYWx1ZSA9IHRoaXMucGFnZVNldF8uaXRlbXMubGVuZ3RoID09PSAwO1xuICAgICAgICB9XG4gICAgICAgIG9uUGFnZUFkZF8oZXYpIHtcbiAgICAgICAgICAgIGNvbnN0IHBjID0gZXYuaXRlbTtcbiAgICAgICAgICAgIGluc2VydEVsZW1lbnRBdCh0aGlzLnZpZXcuaXRlbXNFbGVtZW50LCBwYy5pdGVtQ29udHJvbGxlci52aWV3LmVsZW1lbnQsIGV2LmluZGV4KTtcbiAgICAgICAgICAgIHRoaXMucmFja0NvbnRyb2xsZXIucmFjay5hZGQocGMuY29udGVudENvbnRyb2xsZXIsIGV2LmluZGV4KTtcbiAgICAgICAgICAgIHBjLnByb3BzLnZhbHVlKCdzZWxlY3RlZCcpLmVtaXR0ZXIub24oJ2NoYW5nZScsIHRoaXMub25QYWdlU2VsZWN0ZWRDaGFuZ2VfKTtcbiAgICAgICAgICAgIHRoaXMuYXBwbHlQYWdlc18oKTtcbiAgICAgICAgfVxuICAgICAgICBvblBhZ2VSZW1vdmVfKGV2KSB7XG4gICAgICAgICAgICBjb25zdCBwYyA9IGV2Lml0ZW07XG4gICAgICAgICAgICByZW1vdmVFbGVtZW50KHBjLml0ZW1Db250cm9sbGVyLnZpZXcuZWxlbWVudCk7XG4gICAgICAgICAgICB0aGlzLnJhY2tDb250cm9sbGVyLnJhY2sucmVtb3ZlKHBjLmNvbnRlbnRDb250cm9sbGVyKTtcbiAgICAgICAgICAgIHBjLnByb3BzXG4gICAgICAgICAgICAgICAgLnZhbHVlKCdzZWxlY3RlZCcpXG4gICAgICAgICAgICAgICAgLmVtaXR0ZXIub2ZmKCdjaGFuZ2UnLCB0aGlzLm9uUGFnZVNlbGVjdGVkQ2hhbmdlXyk7XG4gICAgICAgICAgICB0aGlzLmFwcGx5UGFnZXNfKCk7XG4gICAgICAgIH1cbiAgICAgICAga2VlcFNlbGVjdGlvbl8oKSB7XG4gICAgICAgICAgICBpZiAodGhpcy5wYWdlU2V0Xy5pdGVtcy5sZW5ndGggPT09IDApIHtcbiAgICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBjb25zdCBmaXJzdFNlbEluZGV4ID0gdGhpcy5wYWdlU2V0Xy5pdGVtcy5maW5kSW5kZXgoKHBjKSA9PiBwYy5wcm9wcy5nZXQoJ3NlbGVjdGVkJykpO1xuICAgICAgICAgICAgaWYgKGZpcnN0U2VsSW5kZXggPCAwKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5wYWdlU2V0Xy5pdGVtcy5mb3JFYWNoKChwYywgaSkgPT4ge1xuICAgICAgICAgICAgICAgICAgICBwYy5wcm9wcy5zZXQoJ3NlbGVjdGVkJywgaSA9PT0gMCk7XG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICB0aGlzLnBhZ2VTZXRfLml0ZW1zLmZvckVhY2goKHBjLCBpKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgIHBjLnByb3BzLnNldCgnc2VsZWN0ZWQnLCBpID09PSBmaXJzdFNlbEluZGV4KTtcbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICBvblBhZ2VTZWxlY3RlZENoYW5nZV8oZXYpIHtcbiAgICAgICAgICAgIGlmIChldi5yYXdWYWx1ZSkge1xuICAgICAgICAgICAgICAgIGNvbnN0IGluZGV4ID0gdGhpcy5wYWdlU2V0Xy5pdGVtcy5maW5kSW5kZXgoKHBjKSA9PiBwYy5wcm9wcy52YWx1ZSgnc2VsZWN0ZWQnKSA9PT0gZXYuc2VuZGVyKTtcbiAgICAgICAgICAgICAgICB0aGlzLnBhZ2VTZXRfLml0ZW1zLmZvckVhY2goKHBjLCBpKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgIHBjLnByb3BzLnNldCgnc2VsZWN0ZWQnLCBpID09PSBpbmRleCk7XG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICB0aGlzLmtlZXBTZWxlY3Rpb25fKCk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBjb25zdCBUYWJCbGFkZVBsdWdpbiA9IHtcbiAgICAgICAgaWQ6ICd0YWInLFxuICAgICAgICB0eXBlOiAnYmxhZGUnLFxuICAgICAgICBhY2NlcHQocGFyYW1zKSB7XG4gICAgICAgICAgICBjb25zdCBwID0gUGFyYW1zUGFyc2VycztcbiAgICAgICAgICAgIGNvbnN0IHJlc3VsdCA9IHBhcnNlUGFyYW1zKHBhcmFtcywge1xuICAgICAgICAgICAgICAgIHBhZ2VzOiBwLnJlcXVpcmVkLmFycmF5KHAucmVxdWlyZWQub2JqZWN0KHsgdGl0bGU6IHAucmVxdWlyZWQuc3RyaW5nIH0pKSxcbiAgICAgICAgICAgICAgICB2aWV3OiBwLnJlcXVpcmVkLmNvbnN0YW50KCd0YWInKSxcbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgaWYgKCFyZXN1bHQgfHwgcmVzdWx0LnBhZ2VzLmxlbmd0aCA9PT0gMCkge1xuICAgICAgICAgICAgICAgIHJldHVybiBudWxsO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgcmV0dXJuIHsgcGFyYW1zOiByZXN1bHQgfTtcbiAgICAgICAgfSxcbiAgICAgICAgY29udHJvbGxlcihhcmdzKSB7XG4gICAgICAgICAgICBjb25zdCBjID0gbmV3IFRhYkNvbnRyb2xsZXIoYXJncy5kb2N1bWVudCwge1xuICAgICAgICAgICAgICAgIGJsYWRlOiBhcmdzLmJsYWRlLFxuICAgICAgICAgICAgICAgIHZpZXdQcm9wczogYXJncy52aWV3UHJvcHMsXG4gICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIGFyZ3MucGFyYW1zLnBhZ2VzLmZvckVhY2goKHApID0+IHtcbiAgICAgICAgICAgICAgICBjb25zdCBwYyA9IG5ldyBUYWJQYWdlQ29udHJvbGxlcihhcmdzLmRvY3VtZW50LCB7XG4gICAgICAgICAgICAgICAgICAgIGl0ZW1Qcm9wczogVmFsdWVNYXAuZnJvbU9iamVjdCh7XG4gICAgICAgICAgICAgICAgICAgICAgICBzZWxlY3RlZDogZmFsc2UsXG4gICAgICAgICAgICAgICAgICAgICAgICB0aXRsZTogcC50aXRsZSxcbiAgICAgICAgICAgICAgICAgICAgfSksXG4gICAgICAgICAgICAgICAgICAgIHByb3BzOiBWYWx1ZU1hcC5mcm9tT2JqZWN0KHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHNlbGVjdGVkOiBmYWxzZSxcbiAgICAgICAgICAgICAgICAgICAgfSksXG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgYy5hZGQocGMpO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICByZXR1cm4gYztcbiAgICAgICAgfSxcbiAgICAgICAgYXBpKGFyZ3MpIHtcbiAgICAgICAgICAgIGlmICghKGFyZ3MuY29udHJvbGxlciBpbnN0YW5jZW9mIFRhYkNvbnRyb2xsZXIpKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIG51bGw7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICByZXR1cm4gbmV3IFRhYkFwaShhcmdzLmNvbnRyb2xsZXIsIGFyZ3MucG9vbCk7XG4gICAgICAgIH0sXG4gICAgfTtcblxuICAgIGZ1bmN0aW9uIGNyZWF0ZUJsYWRlQ29udHJvbGxlcihwbHVnaW4sIGFyZ3MpIHtcbiAgICAgICAgY29uc3QgYWMgPSBwbHVnaW4uYWNjZXB0KGFyZ3MucGFyYW1zKTtcbiAgICAgICAgaWYgKCFhYykge1xuICAgICAgICAgICAgcmV0dXJuIG51bGw7XG4gICAgICAgIH1cbiAgICAgICAgY29uc3QgZGlzYWJsZWQgPSBQYXJhbXNQYXJzZXJzLm9wdGlvbmFsLmJvb2xlYW4oYXJncy5wYXJhbXNbJ2Rpc2FibGVkJ10pLnZhbHVlO1xuICAgICAgICBjb25zdCBoaWRkZW4gPSBQYXJhbXNQYXJzZXJzLm9wdGlvbmFsLmJvb2xlYW4oYXJncy5wYXJhbXNbJ2hpZGRlbiddKS52YWx1ZTtcbiAgICAgICAgcmV0dXJuIHBsdWdpbi5jb250cm9sbGVyKHtcbiAgICAgICAgICAgIGJsYWRlOiBjcmVhdGVCbGFkZSgpLFxuICAgICAgICAgICAgZG9jdW1lbnQ6IGFyZ3MuZG9jdW1lbnQsXG4gICAgICAgICAgICBwYXJhbXM6IGZvcmNlQ2FzdChPYmplY3QuYXNzaWduKE9iamVjdC5hc3NpZ24oe30sIGFjLnBhcmFtcyksIHsgZGlzYWJsZWQ6IGRpc2FibGVkLCBoaWRkZW46IGhpZGRlbiB9KSksXG4gICAgICAgICAgICB2aWV3UHJvcHM6IFZpZXdQcm9wcy5jcmVhdGUoe1xuICAgICAgICAgICAgICAgIGRpc2FibGVkOiBkaXNhYmxlZCxcbiAgICAgICAgICAgICAgICBoaWRkZW46IGhpZGRlbixcbiAgICAgICAgICAgIH0pLFxuICAgICAgICB9KTtcbiAgICB9XG5cbiAgICBjbGFzcyBNYW51YWxUaWNrZXIge1xuICAgICAgICBjb25zdHJ1Y3RvcigpIHtcbiAgICAgICAgICAgIHRoaXMuZGlzYWJsZWQgPSBmYWxzZTtcbiAgICAgICAgICAgIHRoaXMuZW1pdHRlciA9IG5ldyBFbWl0dGVyKCk7XG4gICAgICAgIH1cbiAgICAgICAgZGlzcG9zZSgpIHsgfVxuICAgICAgICB0aWNrKCkge1xuICAgICAgICAgICAgaWYgKHRoaXMuZGlzYWJsZWQpIHtcbiAgICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICB0aGlzLmVtaXR0ZXIuZW1pdCgndGljaycsIHtcbiAgICAgICAgICAgICAgICBzZW5kZXI6IHRoaXMsXG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIGNsYXNzIEludGVydmFsVGlja2VyIHtcbiAgICAgICAgY29uc3RydWN0b3IoZG9jLCBpbnRlcnZhbCkge1xuICAgICAgICAgICAgdGhpcy5kaXNhYmxlZF8gPSBmYWxzZTtcbiAgICAgICAgICAgIHRoaXMudGltZXJJZF8gPSBudWxsO1xuICAgICAgICAgICAgdGhpcy5vblRpY2tfID0gdGhpcy5vblRpY2tfLmJpbmQodGhpcyk7XG4gICAgICAgICAgICB0aGlzLmRvY18gPSBkb2M7XG4gICAgICAgICAgICB0aGlzLmVtaXR0ZXIgPSBuZXcgRW1pdHRlcigpO1xuICAgICAgICAgICAgdGhpcy5pbnRlcnZhbF8gPSBpbnRlcnZhbDtcbiAgICAgICAgICAgIHRoaXMuc2V0VGltZXJfKCk7XG4gICAgICAgIH1cbiAgICAgICAgZ2V0IGRpc2FibGVkKCkge1xuICAgICAgICAgICAgcmV0dXJuIHRoaXMuZGlzYWJsZWRfO1xuICAgICAgICB9XG4gICAgICAgIHNldCBkaXNhYmxlZChpbmFjdGl2ZSkge1xuICAgICAgICAgICAgdGhpcy5kaXNhYmxlZF8gPSBpbmFjdGl2ZTtcbiAgICAgICAgICAgIGlmICh0aGlzLmRpc2FibGVkXykge1xuICAgICAgICAgICAgICAgIHRoaXMuY2xlYXJUaW1lcl8oKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgIHRoaXMuc2V0VGltZXJfKCk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgZGlzcG9zZSgpIHtcbiAgICAgICAgICAgIHRoaXMuY2xlYXJUaW1lcl8oKTtcbiAgICAgICAgfVxuICAgICAgICBjbGVhclRpbWVyXygpIHtcbiAgICAgICAgICAgIGlmICh0aGlzLnRpbWVySWRfID09PSBudWxsKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgY29uc3Qgd2luID0gdGhpcy5kb2NfLmRlZmF1bHRWaWV3O1xuICAgICAgICAgICAgaWYgKHdpbikge1xuICAgICAgICAgICAgICAgIHdpbi5jbGVhckludGVydmFsKHRoaXMudGltZXJJZF8pO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgdGhpcy50aW1lcklkXyA9IG51bGw7XG4gICAgICAgIH1cbiAgICAgICAgc2V0VGltZXJfKCkge1xuICAgICAgICAgICAgdGhpcy5jbGVhclRpbWVyXygpO1xuICAgICAgICAgICAgaWYgKHRoaXMuaW50ZXJ2YWxfIDw9IDApIHtcbiAgICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBjb25zdCB3aW4gPSB0aGlzLmRvY18uZGVmYXVsdFZpZXc7XG4gICAgICAgICAgICBpZiAod2luKSB7XG4gICAgICAgICAgICAgICAgdGhpcy50aW1lcklkXyA9IHdpbi5zZXRJbnRlcnZhbCh0aGlzLm9uVGlja18sIHRoaXMuaW50ZXJ2YWxfKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICBvblRpY2tfKCkge1xuICAgICAgICAgICAgaWYgKHRoaXMuZGlzYWJsZWRfKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgdGhpcy5lbWl0dGVyLmVtaXQoJ3RpY2snLCB7XG4gICAgICAgICAgICAgICAgc2VuZGVyOiB0aGlzLFxuICAgICAgICAgICAgfSk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBjbGFzcyBDb21wb3NpdGVDb25zdHJhaW50IHtcbiAgICAgICAgY29uc3RydWN0b3IoY29uc3RyYWludHMpIHtcbiAgICAgICAgICAgIHRoaXMuY29uc3RyYWludHMgPSBjb25zdHJhaW50cztcbiAgICAgICAgfVxuICAgICAgICBjb25zdHJhaW4odmFsdWUpIHtcbiAgICAgICAgICAgIHJldHVybiB0aGlzLmNvbnN0cmFpbnRzLnJlZHVjZSgocmVzdWx0LCBjKSA9PiB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIGMuY29uc3RyYWluKHJlc3VsdCk7XG4gICAgICAgICAgICB9LCB2YWx1ZSk7XG4gICAgICAgIH1cbiAgICB9XG4gICAgZnVuY3Rpb24gZmluZENvbnN0cmFpbnQoYywgY29uc3RyYWludENsYXNzKSB7XG4gICAgICAgIGlmIChjIGluc3RhbmNlb2YgY29uc3RyYWludENsYXNzKSB7XG4gICAgICAgICAgICByZXR1cm4gYztcbiAgICAgICAgfVxuICAgICAgICBpZiAoYyBpbnN0YW5jZW9mIENvbXBvc2l0ZUNvbnN0cmFpbnQpIHtcbiAgICAgICAgICAgIGNvbnN0IHJlc3VsdCA9IGMuY29uc3RyYWludHMucmVkdWNlKCh0bXBSZXN1bHQsIHNjKSA9PiB7XG4gICAgICAgICAgICAgICAgaWYgKHRtcFJlc3VsdCkge1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gdG1wUmVzdWx0O1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICByZXR1cm4gc2MgaW5zdGFuY2VvZiBjb25zdHJhaW50Q2xhc3MgPyBzYyA6IG51bGw7XG4gICAgICAgICAgICB9LCBudWxsKTtcbiAgICAgICAgICAgIGlmIChyZXN1bHQpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gcmVzdWx0O1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIHJldHVybiBudWxsO1xuICAgIH1cblxuICAgIGNsYXNzIExpc3RDb25zdHJhaW50IHtcbiAgICAgICAgY29uc3RydWN0b3Iob3B0aW9ucykge1xuICAgICAgICAgICAgdGhpcy5vcHRpb25zID0gb3B0aW9ucztcbiAgICAgICAgfVxuICAgICAgICBjb25zdHJhaW4odmFsdWUpIHtcbiAgICAgICAgICAgIGNvbnN0IG9wdHMgPSB0aGlzLm9wdGlvbnM7XG4gICAgICAgICAgICBpZiAob3B0cy5sZW5ndGggPT09IDApIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gdmFsdWU7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBjb25zdCBtYXRjaGVkID0gb3B0cy5maWx0ZXIoKGl0ZW0pID0+IHtcbiAgICAgICAgICAgICAgICByZXR1cm4gaXRlbS52YWx1ZSA9PT0gdmFsdWU7XG4gICAgICAgICAgICB9KS5sZW5ndGggPiAwO1xuICAgICAgICAgICAgcmV0dXJuIG1hdGNoZWQgPyB2YWx1ZSA6IG9wdHNbMF0udmFsdWU7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBjbGFzcyBSYW5nZUNvbnN0cmFpbnQge1xuICAgICAgICBjb25zdHJ1Y3Rvcihjb25maWcpIHtcbiAgICAgICAgICAgIHRoaXMubWF4VmFsdWUgPSBjb25maWcubWF4O1xuICAgICAgICAgICAgdGhpcy5taW5WYWx1ZSA9IGNvbmZpZy5taW47XG4gICAgICAgIH1cbiAgICAgICAgY29uc3RyYWluKHZhbHVlKSB7XG4gICAgICAgICAgICBsZXQgcmVzdWx0ID0gdmFsdWU7XG4gICAgICAgICAgICBpZiAoIWlzRW1wdHkodGhpcy5taW5WYWx1ZSkpIHtcbiAgICAgICAgICAgICAgICByZXN1bHQgPSBNYXRoLm1heChyZXN1bHQsIHRoaXMubWluVmFsdWUpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaWYgKCFpc0VtcHR5KHRoaXMubWF4VmFsdWUpKSB7XG4gICAgICAgICAgICAgICAgcmVzdWx0ID0gTWF0aC5taW4ocmVzdWx0LCB0aGlzLm1heFZhbHVlKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHJldHVybiByZXN1bHQ7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBjbGFzcyBTdGVwQ29uc3RyYWludCB7XG4gICAgICAgIGNvbnN0cnVjdG9yKHN0ZXApIHtcbiAgICAgICAgICAgIHRoaXMuc3RlcCA9IHN0ZXA7XG4gICAgICAgIH1cbiAgICAgICAgY29uc3RyYWluKHZhbHVlKSB7XG4gICAgICAgICAgICBjb25zdCByID0gdmFsdWUgPCAwXG4gICAgICAgICAgICAgICAgPyAtTWF0aC5yb3VuZCgtdmFsdWUgLyB0aGlzLnN0ZXApXG4gICAgICAgICAgICAgICAgOiBNYXRoLnJvdW5kKHZhbHVlIC8gdGhpcy5zdGVwKTtcbiAgICAgICAgICAgIHJldHVybiByICogdGhpcy5zdGVwO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgY29uc3QgY2xhc3NOYW1lJGogPSBDbGFzc05hbWUoJ2xzdCcpO1xuICAgIGNsYXNzIExpc3RWaWV3IHtcbiAgICAgICAgY29uc3RydWN0b3IoZG9jLCBjb25maWcpIHtcbiAgICAgICAgICAgIHRoaXMub25WYWx1ZUNoYW5nZV8gPSB0aGlzLm9uVmFsdWVDaGFuZ2VfLmJpbmQodGhpcyk7XG4gICAgICAgICAgICB0aGlzLnByb3BzXyA9IGNvbmZpZy5wcm9wcztcbiAgICAgICAgICAgIHRoaXMuZWxlbWVudCA9IGRvYy5jcmVhdGVFbGVtZW50KCdkaXYnKTtcbiAgICAgICAgICAgIHRoaXMuZWxlbWVudC5jbGFzc0xpc3QuYWRkKGNsYXNzTmFtZSRqKCkpO1xuICAgICAgICAgICAgY29uZmlnLnZpZXdQcm9wcy5iaW5kQ2xhc3NNb2RpZmllcnModGhpcy5lbGVtZW50KTtcbiAgICAgICAgICAgIGNvbnN0IHNlbGVjdEVsZW0gPSBkb2MuY3JlYXRlRWxlbWVudCgnc2VsZWN0Jyk7XG4gICAgICAgICAgICBzZWxlY3RFbGVtLmNsYXNzTGlzdC5hZGQoY2xhc3NOYW1lJGooJ3MnKSk7XG4gICAgICAgICAgICBiaW5kVmFsdWVNYXAodGhpcy5wcm9wc18sICdvcHRpb25zJywgKG9wdHMpID0+IHtcbiAgICAgICAgICAgICAgICByZW1vdmVDaGlsZEVsZW1lbnRzKHNlbGVjdEVsZW0pO1xuICAgICAgICAgICAgICAgIG9wdHMuZm9yRWFjaCgoaXRlbSwgaW5kZXgpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgY29uc3Qgb3B0aW9uRWxlbSA9IGRvYy5jcmVhdGVFbGVtZW50KCdvcHRpb24nKTtcbiAgICAgICAgICAgICAgICAgICAgb3B0aW9uRWxlbS5kYXRhc2V0LmluZGV4ID0gU3RyaW5nKGluZGV4KTtcbiAgICAgICAgICAgICAgICAgICAgb3B0aW9uRWxlbS50ZXh0Q29udGVudCA9IGl0ZW0udGV4dDtcbiAgICAgICAgICAgICAgICAgICAgb3B0aW9uRWxlbS52YWx1ZSA9IFN0cmluZyhpdGVtLnZhbHVlKTtcbiAgICAgICAgICAgICAgICAgICAgc2VsZWN0RWxlbS5hcHBlbmRDaGlsZChvcHRpb25FbGVtKTtcbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgY29uZmlnLnZpZXdQcm9wcy5iaW5kRGlzYWJsZWQoc2VsZWN0RWxlbSk7XG4gICAgICAgICAgICB0aGlzLmVsZW1lbnQuYXBwZW5kQ2hpbGQoc2VsZWN0RWxlbSk7XG4gICAgICAgICAgICB0aGlzLnNlbGVjdEVsZW1lbnQgPSBzZWxlY3RFbGVtO1xuICAgICAgICAgICAgY29uc3QgbWFya0VsZW0gPSBkb2MuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XG4gICAgICAgICAgICBtYXJrRWxlbS5jbGFzc0xpc3QuYWRkKGNsYXNzTmFtZSRqKCdtJykpO1xuICAgICAgICAgICAgbWFya0VsZW0uYXBwZW5kQ2hpbGQoY3JlYXRlU3ZnSWNvbkVsZW1lbnQoZG9jLCAnZHJvcGRvd24nKSk7XG4gICAgICAgICAgICB0aGlzLmVsZW1lbnQuYXBwZW5kQ2hpbGQobWFya0VsZW0pO1xuICAgICAgICAgICAgY29uZmlnLnZhbHVlLmVtaXR0ZXIub24oJ2NoYW5nZScsIHRoaXMub25WYWx1ZUNoYW5nZV8pO1xuICAgICAgICAgICAgdGhpcy52YWx1ZV8gPSBjb25maWcudmFsdWU7XG4gICAgICAgICAgICB0aGlzLnVwZGF0ZV8oKTtcbiAgICAgICAgfVxuICAgICAgICB1cGRhdGVfKCkge1xuICAgICAgICAgICAgdGhpcy5zZWxlY3RFbGVtZW50LnZhbHVlID0gU3RyaW5nKHRoaXMudmFsdWVfLnJhd1ZhbHVlKTtcbiAgICAgICAgfVxuICAgICAgICBvblZhbHVlQ2hhbmdlXygpIHtcbiAgICAgICAgICAgIHRoaXMudXBkYXRlXygpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgY2xhc3MgTGlzdENvbnRyb2xsZXIge1xuICAgICAgICBjb25zdHJ1Y3Rvcihkb2MsIGNvbmZpZykge1xuICAgICAgICAgICAgdGhpcy5vblNlbGVjdENoYW5nZV8gPSB0aGlzLm9uU2VsZWN0Q2hhbmdlXy5iaW5kKHRoaXMpO1xuICAgICAgICAgICAgdGhpcy5wcm9wcyA9IGNvbmZpZy5wcm9wcztcbiAgICAgICAgICAgIHRoaXMudmFsdWUgPSBjb25maWcudmFsdWU7XG4gICAgICAgICAgICB0aGlzLnZpZXdQcm9wcyA9IGNvbmZpZy52aWV3UHJvcHM7XG4gICAgICAgICAgICB0aGlzLnZpZXcgPSBuZXcgTGlzdFZpZXcoZG9jLCB7XG4gICAgICAgICAgICAgICAgcHJvcHM6IHRoaXMucHJvcHMsXG4gICAgICAgICAgICAgICAgdmFsdWU6IHRoaXMudmFsdWUsXG4gICAgICAgICAgICAgICAgdmlld1Byb3BzOiB0aGlzLnZpZXdQcm9wcyxcbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgdGhpcy52aWV3LnNlbGVjdEVsZW1lbnQuYWRkRXZlbnRMaXN0ZW5lcignY2hhbmdlJywgdGhpcy5vblNlbGVjdENoYW5nZV8pO1xuICAgICAgICB9XG4gICAgICAgIG9uU2VsZWN0Q2hhbmdlXyhlKSB7XG4gICAgICAgICAgICBjb25zdCBzZWxlY3RFbGVtID0gZm9yY2VDYXN0KGUuY3VycmVudFRhcmdldCk7XG4gICAgICAgICAgICBjb25zdCBvcHRFbGVtID0gc2VsZWN0RWxlbS5zZWxlY3RlZE9wdGlvbnMuaXRlbSgwKTtcbiAgICAgICAgICAgIGlmICghb3B0RWxlbSkge1xuICAgICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGNvbnN0IGl0ZW1JbmRleCA9IE51bWJlcihvcHRFbGVtLmRhdGFzZXQuaW5kZXgpO1xuICAgICAgICAgICAgdGhpcy52YWx1ZS5yYXdWYWx1ZSA9IHRoaXMucHJvcHMuZ2V0KCdvcHRpb25zJylbaXRlbUluZGV4XS52YWx1ZTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIGNvbnN0IGNsYXNzTmFtZSRpID0gQ2xhc3NOYW1lKCdwb3AnKTtcbiAgICBjbGFzcyBQb3B1cFZpZXcge1xuICAgICAgICBjb25zdHJ1Y3Rvcihkb2MsIGNvbmZpZykge1xuICAgICAgICAgICAgdGhpcy5lbGVtZW50ID0gZG9jLmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xuICAgICAgICAgICAgdGhpcy5lbGVtZW50LmNsYXNzTGlzdC5hZGQoY2xhc3NOYW1lJGkoKSk7XG4gICAgICAgICAgICBjb25maWcudmlld1Byb3BzLmJpbmRDbGFzc01vZGlmaWVycyh0aGlzLmVsZW1lbnQpO1xuICAgICAgICAgICAgYmluZFZhbHVlKGNvbmZpZy5zaG93cywgdmFsdWVUb0NsYXNzTmFtZSh0aGlzLmVsZW1lbnQsIGNsYXNzTmFtZSRpKHVuZGVmaW5lZCwgJ3YnKSkpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgY2xhc3MgUG9wdXBDb250cm9sbGVyIHtcbiAgICAgICAgY29uc3RydWN0b3IoZG9jLCBjb25maWcpIHtcbiAgICAgICAgICAgIHRoaXMuc2hvd3MgPSBjcmVhdGVWYWx1ZShmYWxzZSk7XG4gICAgICAgICAgICB0aGlzLnZpZXdQcm9wcyA9IGNvbmZpZy52aWV3UHJvcHM7XG4gICAgICAgICAgICB0aGlzLnZpZXcgPSBuZXcgUG9wdXBWaWV3KGRvYywge1xuICAgICAgICAgICAgICAgIHNob3dzOiB0aGlzLnNob3dzLFxuICAgICAgICAgICAgICAgIHZpZXdQcm9wczogdGhpcy52aWV3UHJvcHMsXG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIGNvbnN0IGNsYXNzTmFtZSRoID0gQ2xhc3NOYW1lKCd0eHQnKTtcbiAgICBjbGFzcyBUZXh0VmlldyB7XG4gICAgICAgIGNvbnN0cnVjdG9yKGRvYywgY29uZmlnKSB7XG4gICAgICAgICAgICB0aGlzLm9uQ2hhbmdlXyA9IHRoaXMub25DaGFuZ2VfLmJpbmQodGhpcyk7XG4gICAgICAgICAgICB0aGlzLmVsZW1lbnQgPSBkb2MuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XG4gICAgICAgICAgICB0aGlzLmVsZW1lbnQuY2xhc3NMaXN0LmFkZChjbGFzc05hbWUkaCgpKTtcbiAgICAgICAgICAgIGNvbmZpZy52aWV3UHJvcHMuYmluZENsYXNzTW9kaWZpZXJzKHRoaXMuZWxlbWVudCk7XG4gICAgICAgICAgICB0aGlzLnByb3BzXyA9IGNvbmZpZy5wcm9wcztcbiAgICAgICAgICAgIHRoaXMucHJvcHNfLmVtaXR0ZXIub24oJ2NoYW5nZScsIHRoaXMub25DaGFuZ2VfKTtcbiAgICAgICAgICAgIGNvbnN0IGlucHV0RWxlbSA9IGRvYy5jcmVhdGVFbGVtZW50KCdpbnB1dCcpO1xuICAgICAgICAgICAgaW5wdXRFbGVtLmNsYXNzTGlzdC5hZGQoY2xhc3NOYW1lJGgoJ2knKSk7XG4gICAgICAgICAgICBpbnB1dEVsZW0udHlwZSA9ICd0ZXh0JztcbiAgICAgICAgICAgIGNvbmZpZy52aWV3UHJvcHMuYmluZERpc2FibGVkKGlucHV0RWxlbSk7XG4gICAgICAgICAgICB0aGlzLmVsZW1lbnQuYXBwZW5kQ2hpbGQoaW5wdXRFbGVtKTtcbiAgICAgICAgICAgIHRoaXMuaW5wdXRFbGVtZW50ID0gaW5wdXRFbGVtO1xuICAgICAgICAgICAgY29uZmlnLnZhbHVlLmVtaXR0ZXIub24oJ2NoYW5nZScsIHRoaXMub25DaGFuZ2VfKTtcbiAgICAgICAgICAgIHRoaXMudmFsdWVfID0gY29uZmlnLnZhbHVlO1xuICAgICAgICAgICAgdGhpcy5yZWZyZXNoKCk7XG4gICAgICAgIH1cbiAgICAgICAgcmVmcmVzaCgpIHtcbiAgICAgICAgICAgIGNvbnN0IGZvcm1hdHRlciA9IHRoaXMucHJvcHNfLmdldCgnZm9ybWF0dGVyJyk7XG4gICAgICAgICAgICB0aGlzLmlucHV0RWxlbWVudC52YWx1ZSA9IGZvcm1hdHRlcih0aGlzLnZhbHVlXy5yYXdWYWx1ZSk7XG4gICAgICAgIH1cbiAgICAgICAgb25DaGFuZ2VfKCkge1xuICAgICAgICAgICAgdGhpcy5yZWZyZXNoKCk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBjbGFzcyBUZXh0Q29udHJvbGxlciB7XG4gICAgICAgIGNvbnN0cnVjdG9yKGRvYywgY29uZmlnKSB7XG4gICAgICAgICAgICB0aGlzLm9uSW5wdXRDaGFuZ2VfID0gdGhpcy5vbklucHV0Q2hhbmdlXy5iaW5kKHRoaXMpO1xuICAgICAgICAgICAgdGhpcy5wYXJzZXJfID0gY29uZmlnLnBhcnNlcjtcbiAgICAgICAgICAgIHRoaXMucHJvcHMgPSBjb25maWcucHJvcHM7XG4gICAgICAgICAgICB0aGlzLnZhbHVlID0gY29uZmlnLnZhbHVlO1xuICAgICAgICAgICAgdGhpcy52aWV3UHJvcHMgPSBjb25maWcudmlld1Byb3BzO1xuICAgICAgICAgICAgdGhpcy52aWV3ID0gbmV3IFRleHRWaWV3KGRvYywge1xuICAgICAgICAgICAgICAgIHByb3BzOiBjb25maWcucHJvcHMsXG4gICAgICAgICAgICAgICAgdmFsdWU6IHRoaXMudmFsdWUsXG4gICAgICAgICAgICAgICAgdmlld1Byb3BzOiB0aGlzLnZpZXdQcm9wcyxcbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgdGhpcy52aWV3LmlucHV0RWxlbWVudC5hZGRFdmVudExpc3RlbmVyKCdjaGFuZ2UnLCB0aGlzLm9uSW5wdXRDaGFuZ2VfKTtcbiAgICAgICAgfVxuICAgICAgICBvbklucHV0Q2hhbmdlXyhlKSB7XG4gICAgICAgICAgICBjb25zdCBpbnB1dEVsZW0gPSBmb3JjZUNhc3QoZS5jdXJyZW50VGFyZ2V0KTtcbiAgICAgICAgICAgIGNvbnN0IHZhbHVlID0gaW5wdXRFbGVtLnZhbHVlO1xuICAgICAgICAgICAgY29uc3QgcGFyc2VkVmFsdWUgPSB0aGlzLnBhcnNlcl8odmFsdWUpO1xuICAgICAgICAgICAgaWYgKCFpc0VtcHR5KHBhcnNlZFZhbHVlKSkge1xuICAgICAgICAgICAgICAgIHRoaXMudmFsdWUucmF3VmFsdWUgPSBwYXJzZWRWYWx1ZTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHRoaXMudmlldy5yZWZyZXNoKCk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBmdW5jdGlvbiBib29sVG9TdHJpbmcodmFsdWUpIHtcbiAgICAgICAgcmV0dXJuIFN0cmluZyh2YWx1ZSk7XG4gICAgfVxuICAgIGZ1bmN0aW9uIGJvb2xGcm9tVW5rbm93bih2YWx1ZSkge1xuICAgICAgICBpZiAodmFsdWUgPT09ICdmYWxzZScpIHtcbiAgICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gISF2YWx1ZTtcbiAgICB9XG4gICAgZnVuY3Rpb24gQm9vbGVhbkZvcm1hdHRlcih2YWx1ZSkge1xuICAgICAgICByZXR1cm4gYm9vbFRvU3RyaW5nKHZhbHVlKTtcbiAgICB9XG5cbiAgICBjbGFzcyBOdW1iZXJMaXRlcmFsTm9kZSB7XG4gICAgICAgIGNvbnN0cnVjdG9yKHRleHQpIHtcbiAgICAgICAgICAgIHRoaXMudGV4dCA9IHRleHQ7XG4gICAgICAgIH1cbiAgICAgICAgZXZhbHVhdGUoKSB7XG4gICAgICAgICAgICByZXR1cm4gTnVtYmVyKHRoaXMudGV4dCk7XG4gICAgICAgIH1cbiAgICAgICAgdG9TdHJpbmcoKSB7XG4gICAgICAgICAgICByZXR1cm4gdGhpcy50ZXh0O1xuICAgICAgICB9XG4gICAgfVxuICAgIGNvbnN0IEJJTkFSWV9PUEVSQVRJT05fTUFQID0ge1xuICAgICAgICAnKionOiAodjEsIHYyKSA9PiBNYXRoLnBvdyh2MSwgdjIpLFxuICAgICAgICAnKic6ICh2MSwgdjIpID0+IHYxICogdjIsXG4gICAgICAgICcvJzogKHYxLCB2MikgPT4gdjEgLyB2MixcbiAgICAgICAgJyUnOiAodjEsIHYyKSA9PiB2MSAlIHYyLFxuICAgICAgICAnKyc6ICh2MSwgdjIpID0+IHYxICsgdjIsXG4gICAgICAgICctJzogKHYxLCB2MikgPT4gdjEgLSB2MixcbiAgICAgICAgJzw8JzogKHYxLCB2MikgPT4gdjEgPDwgdjIsXG4gICAgICAgICc+Pic6ICh2MSwgdjIpID0+IHYxID4+IHYyLFxuICAgICAgICAnPj4+JzogKHYxLCB2MikgPT4gdjEgPj4+IHYyLFxuICAgICAgICAnJic6ICh2MSwgdjIpID0+IHYxICYgdjIsXG4gICAgICAgICdeJzogKHYxLCB2MikgPT4gdjEgXiB2MixcbiAgICAgICAgJ3wnOiAodjEsIHYyKSA9PiB2MSB8IHYyLFxuICAgIH07XG4gICAgY2xhc3MgQmluYXJ5T3BlcmF0aW9uTm9kZSB7XG4gICAgICAgIGNvbnN0cnVjdG9yKG9wZXJhdG9yLCBsZWZ0LCByaWdodCkge1xuICAgICAgICAgICAgdGhpcy5sZWZ0ID0gbGVmdDtcbiAgICAgICAgICAgIHRoaXMub3BlcmF0b3IgPSBvcGVyYXRvcjtcbiAgICAgICAgICAgIHRoaXMucmlnaHQgPSByaWdodDtcbiAgICAgICAgfVxuICAgICAgICBldmFsdWF0ZSgpIHtcbiAgICAgICAgICAgIGNvbnN0IG9wID0gQklOQVJZX09QRVJBVElPTl9NQVBbdGhpcy5vcGVyYXRvcl07XG4gICAgICAgICAgICBpZiAoIW9wKSB7XG4gICAgICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKGB1bmV4cGVjdGVkIGJpbmFyeSBvcGVyYXRvcjogJyR7dGhpcy5vcGVyYXRvcn1gKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHJldHVybiBvcCh0aGlzLmxlZnQuZXZhbHVhdGUoKSwgdGhpcy5yaWdodC5ldmFsdWF0ZSgpKTtcbiAgICAgICAgfVxuICAgICAgICB0b1N0cmluZygpIHtcbiAgICAgICAgICAgIHJldHVybiBbXG4gICAgICAgICAgICAgICAgJ2IoJyxcbiAgICAgICAgICAgICAgICB0aGlzLmxlZnQudG9TdHJpbmcoKSxcbiAgICAgICAgICAgICAgICB0aGlzLm9wZXJhdG9yLFxuICAgICAgICAgICAgICAgIHRoaXMucmlnaHQudG9TdHJpbmcoKSxcbiAgICAgICAgICAgICAgICAnKScsXG4gICAgICAgICAgICBdLmpvaW4oJyAnKTtcbiAgICAgICAgfVxuICAgIH1cbiAgICBjb25zdCBVTkFSWV9PUEVSQVRJT05fTUFQID0ge1xuICAgICAgICAnKyc6ICh2KSA9PiB2LFxuICAgICAgICAnLSc6ICh2KSA9PiAtdixcbiAgICAgICAgJ34nOiAodikgPT4gfnYsXG4gICAgfTtcbiAgICBjbGFzcyBVbmFyeU9wZXJhdGlvbk5vZGUge1xuICAgICAgICBjb25zdHJ1Y3RvcihvcGVyYXRvciwgZXhwcikge1xuICAgICAgICAgICAgdGhpcy5vcGVyYXRvciA9IG9wZXJhdG9yO1xuICAgICAgICAgICAgdGhpcy5leHByZXNzaW9uID0gZXhwcjtcbiAgICAgICAgfVxuICAgICAgICBldmFsdWF0ZSgpIHtcbiAgICAgICAgICAgIGNvbnN0IG9wID0gVU5BUllfT1BFUkFUSU9OX01BUFt0aGlzLm9wZXJhdG9yXTtcbiAgICAgICAgICAgIGlmICghb3ApIHtcbiAgICAgICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoYHVuZXhwZWN0ZWQgdW5hcnkgb3BlcmF0b3I6ICcke3RoaXMub3BlcmF0b3J9YCk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICByZXR1cm4gb3AodGhpcy5leHByZXNzaW9uLmV2YWx1YXRlKCkpO1xuICAgICAgICB9XG4gICAgICAgIHRvU3RyaW5nKCkge1xuICAgICAgICAgICAgcmV0dXJuIFsndSgnLCB0aGlzLm9wZXJhdG9yLCB0aGlzLmV4cHJlc3Npb24udG9TdHJpbmcoKSwgJyknXS5qb2luKCcgJyk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBmdW5jdGlvbiBjb21iaW5lUmVhZGVyKHBhcnNlcnMpIHtcbiAgICAgICAgcmV0dXJuICh0ZXh0LCBjdXJzb3IpID0+IHtcbiAgICAgICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgcGFyc2Vycy5sZW5ndGg7IGkrKykge1xuICAgICAgICAgICAgICAgIGNvbnN0IHJlc3VsdCA9IHBhcnNlcnNbaV0odGV4dCwgY3Vyc29yKTtcbiAgICAgICAgICAgICAgICBpZiAocmVzdWx0ICE9PSAnJykge1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gcmVzdWx0O1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHJldHVybiAnJztcbiAgICAgICAgfTtcbiAgICB9XG4gICAgZnVuY3Rpb24gcmVhZFdoaXRlc3BhY2UodGV4dCwgY3Vyc29yKSB7XG4gICAgICAgIHZhciBfYTtcbiAgICAgICAgY29uc3QgbSA9IHRleHQuc3Vic3RyKGN1cnNvcikubWF0Y2goL15cXHMrLyk7XG4gICAgICAgIHJldHVybiAoX2EgPSAobSAmJiBtWzBdKSkgIT09IG51bGwgJiYgX2EgIT09IHZvaWQgMCA/IF9hIDogJyc7XG4gICAgfVxuICAgIGZ1bmN0aW9uIHJlYWROb25aZXJvRGlnaXQodGV4dCwgY3Vyc29yKSB7XG4gICAgICAgIGNvbnN0IGNoID0gdGV4dC5zdWJzdHIoY3Vyc29yLCAxKTtcbiAgICAgICAgcmV0dXJuIGNoLm1hdGNoKC9eWzEtOV0kLykgPyBjaCA6ICcnO1xuICAgIH1cbiAgICBmdW5jdGlvbiByZWFkRGVjaW1hbERpZ2l0cyh0ZXh0LCBjdXJzb3IpIHtcbiAgICAgICAgdmFyIF9hO1xuICAgICAgICBjb25zdCBtID0gdGV4dC5zdWJzdHIoY3Vyc29yKS5tYXRjaCgvXlswLTldKy8pO1xuICAgICAgICByZXR1cm4gKF9hID0gKG0gJiYgbVswXSkpICE9PSBudWxsICYmIF9hICE9PSB2b2lkIDAgPyBfYSA6ICcnO1xuICAgIH1cbiAgICBmdW5jdGlvbiByZWFkU2lnbmVkSW50ZWdlcih0ZXh0LCBjdXJzb3IpIHtcbiAgICAgICAgY29uc3QgZHMgPSByZWFkRGVjaW1hbERpZ2l0cyh0ZXh0LCBjdXJzb3IpO1xuICAgICAgICBpZiAoZHMgIT09ICcnKSB7XG4gICAgICAgICAgICByZXR1cm4gZHM7XG4gICAgICAgIH1cbiAgICAgICAgY29uc3Qgc2lnbiA9IHRleHQuc3Vic3RyKGN1cnNvciwgMSk7XG4gICAgICAgIGN1cnNvciArPSAxO1xuICAgICAgICBpZiAoc2lnbiAhPT0gJy0nICYmIHNpZ24gIT09ICcrJykge1xuICAgICAgICAgICAgcmV0dXJuICcnO1xuICAgICAgICB9XG4gICAgICAgIGNvbnN0IHNkcyA9IHJlYWREZWNpbWFsRGlnaXRzKHRleHQsIGN1cnNvcik7XG4gICAgICAgIGlmIChzZHMgPT09ICcnKSB7XG4gICAgICAgICAgICByZXR1cm4gJyc7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHNpZ24gKyBzZHM7XG4gICAgfVxuICAgIGZ1bmN0aW9uIHJlYWRFeHBvbmVudFBhcnQodGV4dCwgY3Vyc29yKSB7XG4gICAgICAgIGNvbnN0IGUgPSB0ZXh0LnN1YnN0cihjdXJzb3IsIDEpO1xuICAgICAgICBjdXJzb3IgKz0gMTtcbiAgICAgICAgaWYgKGUudG9Mb3dlckNhc2UoKSAhPT0gJ2UnKSB7XG4gICAgICAgICAgICByZXR1cm4gJyc7XG4gICAgICAgIH1cbiAgICAgICAgY29uc3Qgc2kgPSByZWFkU2lnbmVkSW50ZWdlcih0ZXh0LCBjdXJzb3IpO1xuICAgICAgICBpZiAoc2kgPT09ICcnKSB7XG4gICAgICAgICAgICByZXR1cm4gJyc7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIGUgKyBzaTtcbiAgICB9XG4gICAgZnVuY3Rpb24gcmVhZERlY2ltYWxJbnRlZ2VyTGl0ZXJhbCh0ZXh0LCBjdXJzb3IpIHtcbiAgICAgICAgY29uc3QgY2ggPSB0ZXh0LnN1YnN0cihjdXJzb3IsIDEpO1xuICAgICAgICBpZiAoY2ggPT09ICcwJykge1xuICAgICAgICAgICAgcmV0dXJuIGNoO1xuICAgICAgICB9XG4gICAgICAgIGNvbnN0IG56ZCA9IHJlYWROb25aZXJvRGlnaXQodGV4dCwgY3Vyc29yKTtcbiAgICAgICAgY3Vyc29yICs9IG56ZC5sZW5ndGg7XG4gICAgICAgIGlmIChuemQgPT09ICcnKSB7XG4gICAgICAgICAgICByZXR1cm4gJyc7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIG56ZCArIHJlYWREZWNpbWFsRGlnaXRzKHRleHQsIGN1cnNvcik7XG4gICAgfVxuICAgIGZ1bmN0aW9uIHJlYWREZWNpbWFsTGl0ZXJhbDEodGV4dCwgY3Vyc29yKSB7XG4gICAgICAgIGNvbnN0IGRpbCA9IHJlYWREZWNpbWFsSW50ZWdlckxpdGVyYWwodGV4dCwgY3Vyc29yKTtcbiAgICAgICAgY3Vyc29yICs9IGRpbC5sZW5ndGg7XG4gICAgICAgIGlmIChkaWwgPT09ICcnKSB7XG4gICAgICAgICAgICByZXR1cm4gJyc7XG4gICAgICAgIH1cbiAgICAgICAgY29uc3QgZG90ID0gdGV4dC5zdWJzdHIoY3Vyc29yLCAxKTtcbiAgICAgICAgY3Vyc29yICs9IGRvdC5sZW5ndGg7XG4gICAgICAgIGlmIChkb3QgIT09ICcuJykge1xuICAgICAgICAgICAgcmV0dXJuICcnO1xuICAgICAgICB9XG4gICAgICAgIGNvbnN0IGRkcyA9IHJlYWREZWNpbWFsRGlnaXRzKHRleHQsIGN1cnNvcik7XG4gICAgICAgIGN1cnNvciArPSBkZHMubGVuZ3RoO1xuICAgICAgICByZXR1cm4gZGlsICsgZG90ICsgZGRzICsgcmVhZEV4cG9uZW50UGFydCh0ZXh0LCBjdXJzb3IpO1xuICAgIH1cbiAgICBmdW5jdGlvbiByZWFkRGVjaW1hbExpdGVyYWwyKHRleHQsIGN1cnNvcikge1xuICAgICAgICBjb25zdCBkb3QgPSB0ZXh0LnN1YnN0cihjdXJzb3IsIDEpO1xuICAgICAgICBjdXJzb3IgKz0gZG90Lmxlbmd0aDtcbiAgICAgICAgaWYgKGRvdCAhPT0gJy4nKSB7XG4gICAgICAgICAgICByZXR1cm4gJyc7XG4gICAgICAgIH1cbiAgICAgICAgY29uc3QgZGRzID0gcmVhZERlY2ltYWxEaWdpdHModGV4dCwgY3Vyc29yKTtcbiAgICAgICAgY3Vyc29yICs9IGRkcy5sZW5ndGg7XG4gICAgICAgIGlmIChkZHMgPT09ICcnKSB7XG4gICAgICAgICAgICByZXR1cm4gJyc7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIGRvdCArIGRkcyArIHJlYWRFeHBvbmVudFBhcnQodGV4dCwgY3Vyc29yKTtcbiAgICB9XG4gICAgZnVuY3Rpb24gcmVhZERlY2ltYWxMaXRlcmFsMyh0ZXh0LCBjdXJzb3IpIHtcbiAgICAgICAgY29uc3QgZGlsID0gcmVhZERlY2ltYWxJbnRlZ2VyTGl0ZXJhbCh0ZXh0LCBjdXJzb3IpO1xuICAgICAgICBjdXJzb3IgKz0gZGlsLmxlbmd0aDtcbiAgICAgICAgaWYgKGRpbCA9PT0gJycpIHtcbiAgICAgICAgICAgIHJldHVybiAnJztcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gZGlsICsgcmVhZEV4cG9uZW50UGFydCh0ZXh0LCBjdXJzb3IpO1xuICAgIH1cbiAgICBjb25zdCByZWFkRGVjaW1hbExpdGVyYWwgPSBjb21iaW5lUmVhZGVyKFtcbiAgICAgICAgcmVhZERlY2ltYWxMaXRlcmFsMSxcbiAgICAgICAgcmVhZERlY2ltYWxMaXRlcmFsMixcbiAgICAgICAgcmVhZERlY2ltYWxMaXRlcmFsMyxcbiAgICBdKTtcbiAgICBmdW5jdGlvbiBwYXJzZUJpbmFyeURpZ2l0cyh0ZXh0LCBjdXJzb3IpIHtcbiAgICAgICAgdmFyIF9hO1xuICAgICAgICBjb25zdCBtID0gdGV4dC5zdWJzdHIoY3Vyc29yKS5tYXRjaCgvXlswMV0rLyk7XG4gICAgICAgIHJldHVybiAoX2EgPSAobSAmJiBtWzBdKSkgIT09IG51bGwgJiYgX2EgIT09IHZvaWQgMCA/IF9hIDogJyc7XG4gICAgfVxuICAgIGZ1bmN0aW9uIHJlYWRCaW5hcnlJbnRlZ2VyTGl0ZXJhbCh0ZXh0LCBjdXJzb3IpIHtcbiAgICAgICAgY29uc3QgcHJlZml4ID0gdGV4dC5zdWJzdHIoY3Vyc29yLCAyKTtcbiAgICAgICAgY3Vyc29yICs9IHByZWZpeC5sZW5ndGg7XG4gICAgICAgIGlmIChwcmVmaXgudG9Mb3dlckNhc2UoKSAhPT0gJzBiJykge1xuICAgICAgICAgICAgcmV0dXJuICcnO1xuICAgICAgICB9XG4gICAgICAgIGNvbnN0IGJkcyA9IHBhcnNlQmluYXJ5RGlnaXRzKHRleHQsIGN1cnNvcik7XG4gICAgICAgIGlmIChiZHMgPT09ICcnKSB7XG4gICAgICAgICAgICByZXR1cm4gJyc7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHByZWZpeCArIGJkcztcbiAgICB9XG4gICAgZnVuY3Rpb24gcmVhZE9jdGFsRGlnaXRzKHRleHQsIGN1cnNvcikge1xuICAgICAgICB2YXIgX2E7XG4gICAgICAgIGNvbnN0IG0gPSB0ZXh0LnN1YnN0cihjdXJzb3IpLm1hdGNoKC9eWzAtN10rLyk7XG4gICAgICAgIHJldHVybiAoX2EgPSAobSAmJiBtWzBdKSkgIT09IG51bGwgJiYgX2EgIT09IHZvaWQgMCA/IF9hIDogJyc7XG4gICAgfVxuICAgIGZ1bmN0aW9uIHJlYWRPY3RhbEludGVnZXJMaXRlcmFsKHRleHQsIGN1cnNvcikge1xuICAgICAgICBjb25zdCBwcmVmaXggPSB0ZXh0LnN1YnN0cihjdXJzb3IsIDIpO1xuICAgICAgICBjdXJzb3IgKz0gcHJlZml4Lmxlbmd0aDtcbiAgICAgICAgaWYgKHByZWZpeC50b0xvd2VyQ2FzZSgpICE9PSAnMG8nKSB7XG4gICAgICAgICAgICByZXR1cm4gJyc7XG4gICAgICAgIH1cbiAgICAgICAgY29uc3Qgb2RzID0gcmVhZE9jdGFsRGlnaXRzKHRleHQsIGN1cnNvcik7XG4gICAgICAgIGlmIChvZHMgPT09ICcnKSB7XG4gICAgICAgICAgICByZXR1cm4gJyc7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHByZWZpeCArIG9kcztcbiAgICB9XG4gICAgZnVuY3Rpb24gcmVhZEhleERpZ2l0cyh0ZXh0LCBjdXJzb3IpIHtcbiAgICAgICAgdmFyIF9hO1xuICAgICAgICBjb25zdCBtID0gdGV4dC5zdWJzdHIoY3Vyc29yKS5tYXRjaCgvXlswLTlhLWZdKy9pKTtcbiAgICAgICAgcmV0dXJuIChfYSA9IChtICYmIG1bMF0pKSAhPT0gbnVsbCAmJiBfYSAhPT0gdm9pZCAwID8gX2EgOiAnJztcbiAgICB9XG4gICAgZnVuY3Rpb24gcmVhZEhleEludGVnZXJMaXRlcmFsKHRleHQsIGN1cnNvcikge1xuICAgICAgICBjb25zdCBwcmVmaXggPSB0ZXh0LnN1YnN0cihjdXJzb3IsIDIpO1xuICAgICAgICBjdXJzb3IgKz0gcHJlZml4Lmxlbmd0aDtcbiAgICAgICAgaWYgKHByZWZpeC50b0xvd2VyQ2FzZSgpICE9PSAnMHgnKSB7XG4gICAgICAgICAgICByZXR1cm4gJyc7XG4gICAgICAgIH1cbiAgICAgICAgY29uc3QgaGRzID0gcmVhZEhleERpZ2l0cyh0ZXh0LCBjdXJzb3IpO1xuICAgICAgICBpZiAoaGRzID09PSAnJykge1xuICAgICAgICAgICAgcmV0dXJuICcnO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiBwcmVmaXggKyBoZHM7XG4gICAgfVxuICAgIGNvbnN0IHJlYWROb25EZWNpbWFsSW50ZWdlckxpdGVyYWwgPSBjb21iaW5lUmVhZGVyKFtcbiAgICAgICAgcmVhZEJpbmFyeUludGVnZXJMaXRlcmFsLFxuICAgICAgICByZWFkT2N0YWxJbnRlZ2VyTGl0ZXJhbCxcbiAgICAgICAgcmVhZEhleEludGVnZXJMaXRlcmFsLFxuICAgIF0pO1xuICAgIGNvbnN0IHJlYWROdW1lcmljTGl0ZXJhbCA9IGNvbWJpbmVSZWFkZXIoW1xuICAgICAgICByZWFkTm9uRGVjaW1hbEludGVnZXJMaXRlcmFsLFxuICAgICAgICByZWFkRGVjaW1hbExpdGVyYWwsXG4gICAgXSk7XG5cbiAgICBmdW5jdGlvbiBwYXJzZUxpdGVyYWwodGV4dCwgY3Vyc29yKSB7XG4gICAgICAgIGNvbnN0IG51bSA9IHJlYWROdW1lcmljTGl0ZXJhbCh0ZXh0LCBjdXJzb3IpO1xuICAgICAgICBjdXJzb3IgKz0gbnVtLmxlbmd0aDtcbiAgICAgICAgaWYgKG51bSA9PT0gJycpIHtcbiAgICAgICAgICAgIHJldHVybiBudWxsO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICBldmFsdWFibGU6IG5ldyBOdW1iZXJMaXRlcmFsTm9kZShudW0pLFxuICAgICAgICAgICAgY3Vyc29yOiBjdXJzb3IsXG4gICAgICAgIH07XG4gICAgfVxuICAgIGZ1bmN0aW9uIHBhcnNlUGFyZW50aGVzaXplZEV4cHJlc3Npb24odGV4dCwgY3Vyc29yKSB7XG4gICAgICAgIGNvbnN0IG9wID0gdGV4dC5zdWJzdHIoY3Vyc29yLCAxKTtcbiAgICAgICAgY3Vyc29yICs9IG9wLmxlbmd0aDtcbiAgICAgICAgaWYgKG9wICE9PSAnKCcpIHtcbiAgICAgICAgICAgIHJldHVybiBudWxsO1xuICAgICAgICB9XG4gICAgICAgIGNvbnN0IGV4cHIgPSBwYXJzZUV4cHJlc3Npb24odGV4dCwgY3Vyc29yKTtcbiAgICAgICAgaWYgKCFleHByKSB7XG4gICAgICAgICAgICByZXR1cm4gbnVsbDtcbiAgICAgICAgfVxuICAgICAgICBjdXJzb3IgPSBleHByLmN1cnNvcjtcbiAgICAgICAgY3Vyc29yICs9IHJlYWRXaGl0ZXNwYWNlKHRleHQsIGN1cnNvcikubGVuZ3RoO1xuICAgICAgICBjb25zdCBjbCA9IHRleHQuc3Vic3RyKGN1cnNvciwgMSk7XG4gICAgICAgIGN1cnNvciArPSBjbC5sZW5ndGg7XG4gICAgICAgIGlmIChjbCAhPT0gJyknKSB7XG4gICAgICAgICAgICByZXR1cm4gbnVsbDtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgZXZhbHVhYmxlOiBleHByLmV2YWx1YWJsZSxcbiAgICAgICAgICAgIGN1cnNvcjogY3Vyc29yLFxuICAgICAgICB9O1xuICAgIH1cbiAgICBmdW5jdGlvbiBwYXJzZVByaW1hcnlFeHByZXNzaW9uKHRleHQsIGN1cnNvcikge1xuICAgICAgICByZXR1cm4gKHBhcnNlTGl0ZXJhbCh0ZXh0LCBjdXJzb3IpIHx8IHBhcnNlUGFyZW50aGVzaXplZEV4cHJlc3Npb24odGV4dCwgY3Vyc29yKSk7XG4gICAgfVxuICAgIGZ1bmN0aW9uIHBhcnNlVW5hcnlFeHByZXNzaW9uKHRleHQsIGN1cnNvcikge1xuICAgICAgICBjb25zdCBleHByID0gcGFyc2VQcmltYXJ5RXhwcmVzc2lvbih0ZXh0LCBjdXJzb3IpO1xuICAgICAgICBpZiAoZXhwcikge1xuICAgICAgICAgICAgcmV0dXJuIGV4cHI7XG4gICAgICAgIH1cbiAgICAgICAgY29uc3Qgb3AgPSB0ZXh0LnN1YnN0cihjdXJzb3IsIDEpO1xuICAgICAgICBjdXJzb3IgKz0gb3AubGVuZ3RoO1xuICAgICAgICBpZiAob3AgIT09ICcrJyAmJiBvcCAhPT0gJy0nICYmIG9wICE9PSAnficpIHtcbiAgICAgICAgICAgIHJldHVybiBudWxsO1xuICAgICAgICB9XG4gICAgICAgIGNvbnN0IG51bSA9IHBhcnNlVW5hcnlFeHByZXNzaW9uKHRleHQsIGN1cnNvcik7XG4gICAgICAgIGlmICghbnVtKSB7XG4gICAgICAgICAgICByZXR1cm4gbnVsbDtcbiAgICAgICAgfVxuICAgICAgICBjdXJzb3IgPSBudW0uY3Vyc29yO1xuICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgY3Vyc29yOiBjdXJzb3IsXG4gICAgICAgICAgICBldmFsdWFibGU6IG5ldyBVbmFyeU9wZXJhdGlvbk5vZGUob3AsIG51bS5ldmFsdWFibGUpLFxuICAgICAgICB9O1xuICAgIH1cbiAgICBmdW5jdGlvbiByZWFkQmluYXJ5T3BlcmF0b3Iob3BzLCB0ZXh0LCBjdXJzb3IpIHtcbiAgICAgICAgY3Vyc29yICs9IHJlYWRXaGl0ZXNwYWNlKHRleHQsIGN1cnNvcikubGVuZ3RoO1xuICAgICAgICBjb25zdCBvcCA9IG9wcy5maWx0ZXIoKG9wKSA9PiB0ZXh0LnN0YXJ0c1dpdGgob3AsIGN1cnNvcikpWzBdO1xuICAgICAgICBpZiAoIW9wKSB7XG4gICAgICAgICAgICByZXR1cm4gbnVsbDtcbiAgICAgICAgfVxuICAgICAgICBjdXJzb3IgKz0gb3AubGVuZ3RoO1xuICAgICAgICBjdXJzb3IgKz0gcmVhZFdoaXRlc3BhY2UodGV4dCwgY3Vyc29yKS5sZW5ndGg7XG4gICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICBjdXJzb3I6IGN1cnNvcixcbiAgICAgICAgICAgIG9wZXJhdG9yOiBvcCxcbiAgICAgICAgfTtcbiAgICB9XG4gICAgZnVuY3Rpb24gY3JlYXRlQmluYXJ5T3BlcmF0aW9uRXhwcmVzc2lvblBhcnNlcihleHByUGFyc2VyLCBvcHMpIHtcbiAgICAgICAgcmV0dXJuICh0ZXh0LCBjdXJzb3IpID0+IHtcbiAgICAgICAgICAgIGNvbnN0IGZpcnN0RXhwciA9IGV4cHJQYXJzZXIodGV4dCwgY3Vyc29yKTtcbiAgICAgICAgICAgIGlmICghZmlyc3RFeHByKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIG51bGw7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBjdXJzb3IgPSBmaXJzdEV4cHIuY3Vyc29yO1xuICAgICAgICAgICAgbGV0IGV4cHIgPSBmaXJzdEV4cHIuZXZhbHVhYmxlO1xuICAgICAgICAgICAgZm9yICg7Oykge1xuICAgICAgICAgICAgICAgIGNvbnN0IG9wID0gcmVhZEJpbmFyeU9wZXJhdG9yKG9wcywgdGV4dCwgY3Vyc29yKTtcbiAgICAgICAgICAgICAgICBpZiAoIW9wKSB7XG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBjdXJzb3IgPSBvcC5jdXJzb3I7XG4gICAgICAgICAgICAgICAgY29uc3QgbmV4dEV4cHIgPSBleHByUGFyc2VyKHRleHQsIGN1cnNvcik7XG4gICAgICAgICAgICAgICAgaWYgKCFuZXh0RXhwcikge1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gbnVsbDtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgY3Vyc29yID0gbmV4dEV4cHIuY3Vyc29yO1xuICAgICAgICAgICAgICAgIGV4cHIgPSBuZXcgQmluYXJ5T3BlcmF0aW9uTm9kZShvcC5vcGVyYXRvciwgZXhwciwgbmV4dEV4cHIuZXZhbHVhYmxlKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHJldHVybiBleHByXG4gICAgICAgICAgICAgICAgPyB7XG4gICAgICAgICAgICAgICAgICAgIGN1cnNvcjogY3Vyc29yLFxuICAgICAgICAgICAgICAgICAgICBldmFsdWFibGU6IGV4cHIsXG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIDogbnVsbDtcbiAgICAgICAgfTtcbiAgICB9XG4gICAgY29uc3QgcGFyc2VCaW5hcnlPcGVyYXRpb25FeHByZXNzaW9uID0gW1xuICAgICAgICBbJyoqJ10sXG4gICAgICAgIFsnKicsICcvJywgJyUnXSxcbiAgICAgICAgWycrJywgJy0nXSxcbiAgICAgICAgWyc8PCcsICc+Pj4nLCAnPj4nXSxcbiAgICAgICAgWycmJ10sXG4gICAgICAgIFsnXiddLFxuICAgICAgICBbJ3wnXSxcbiAgICBdLnJlZHVjZSgocGFyc2VyLCBvcHMpID0+IHtcbiAgICAgICAgcmV0dXJuIGNyZWF0ZUJpbmFyeU9wZXJhdGlvbkV4cHJlc3Npb25QYXJzZXIocGFyc2VyLCBvcHMpO1xuICAgIH0sIHBhcnNlVW5hcnlFeHByZXNzaW9uKTtcbiAgICBmdW5jdGlvbiBwYXJzZUV4cHJlc3Npb24odGV4dCwgY3Vyc29yKSB7XG4gICAgICAgIGN1cnNvciArPSByZWFkV2hpdGVzcGFjZSh0ZXh0LCBjdXJzb3IpLmxlbmd0aDtcbiAgICAgICAgcmV0dXJuIHBhcnNlQmluYXJ5T3BlcmF0aW9uRXhwcmVzc2lvbih0ZXh0LCBjdXJzb3IpO1xuICAgIH1cbiAgICBmdW5jdGlvbiBwYXJzZUVjbWFOdW1iZXJFeHByZXNzaW9uKHRleHQpIHtcbiAgICAgICAgY29uc3QgZXhwciA9IHBhcnNlRXhwcmVzc2lvbih0ZXh0LCAwKTtcbiAgICAgICAgaWYgKCFleHByKSB7XG4gICAgICAgICAgICByZXR1cm4gbnVsbDtcbiAgICAgICAgfVxuICAgICAgICBjb25zdCBjdXJzb3IgPSBleHByLmN1cnNvciArIHJlYWRXaGl0ZXNwYWNlKHRleHQsIGV4cHIuY3Vyc29yKS5sZW5ndGg7XG4gICAgICAgIGlmIChjdXJzb3IgIT09IHRleHQubGVuZ3RoKSB7XG4gICAgICAgICAgICByZXR1cm4gbnVsbDtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gZXhwci5ldmFsdWFibGU7XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gcGFyc2VOdW1iZXIodGV4dCkge1xuICAgICAgICB2YXIgX2E7XG4gICAgICAgIGNvbnN0IHIgPSBwYXJzZUVjbWFOdW1iZXJFeHByZXNzaW9uKHRleHQpO1xuICAgICAgICByZXR1cm4gKF9hID0gciA9PT0gbnVsbCB8fCByID09PSB2b2lkIDAgPyB2b2lkIDAgOiByLmV2YWx1YXRlKCkpICE9PSBudWxsICYmIF9hICE9PSB2b2lkIDAgPyBfYSA6IG51bGw7XG4gICAgfVxuICAgIGZ1bmN0aW9uIG51bWJlckZyb21Vbmtub3duKHZhbHVlKSB7XG4gICAgICAgIGlmICh0eXBlb2YgdmFsdWUgPT09ICdudW1iZXInKSB7XG4gICAgICAgICAgICByZXR1cm4gdmFsdWU7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKHR5cGVvZiB2YWx1ZSA9PT0gJ3N0cmluZycpIHtcbiAgICAgICAgICAgIGNvbnN0IHB2ID0gcGFyc2VOdW1iZXIodmFsdWUpO1xuICAgICAgICAgICAgaWYgKCFpc0VtcHR5KHB2KSkge1xuICAgICAgICAgICAgICAgIHJldHVybiBwdjtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gMDtcbiAgICB9XG4gICAgZnVuY3Rpb24gbnVtYmVyVG9TdHJpbmcodmFsdWUpIHtcbiAgICAgICAgcmV0dXJuIFN0cmluZyh2YWx1ZSk7XG4gICAgfVxuICAgIGZ1bmN0aW9uIGNyZWF0ZU51bWJlckZvcm1hdHRlcihkaWdpdHMpIHtcbiAgICAgICAgcmV0dXJuICh2YWx1ZSkgPT4ge1xuICAgICAgICAgICAgcmV0dXJuIHZhbHVlLnRvRml4ZWQoTWF0aC5tYXgoTWF0aC5taW4oZGlnaXRzLCAyMCksIDApKTtcbiAgICAgICAgfTtcbiAgICB9XG5cbiAgICBjb25zdCBpbm5lckZvcm1hdHRlciA9IGNyZWF0ZU51bWJlckZvcm1hdHRlcigwKTtcbiAgICBmdW5jdGlvbiBmb3JtYXRQZXJjZW50YWdlKHZhbHVlKSB7XG4gICAgICAgIHJldHVybiBpbm5lckZvcm1hdHRlcih2YWx1ZSkgKyAnJSc7XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gc3RyaW5nRnJvbVVua25vd24odmFsdWUpIHtcbiAgICAgICAgcmV0dXJuIFN0cmluZyh2YWx1ZSk7XG4gICAgfVxuICAgIGZ1bmN0aW9uIGZvcm1hdFN0cmluZyh2YWx1ZSkge1xuICAgICAgICByZXR1cm4gdmFsdWU7XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gZmlsbEJ1ZmZlcihidWZmZXIsIGJ1ZmZlclNpemUpIHtcbiAgICAgICAgd2hpbGUgKGJ1ZmZlci5sZW5ndGggPCBidWZmZXJTaXplKSB7XG4gICAgICAgICAgICBidWZmZXIucHVzaCh1bmRlZmluZWQpO1xuICAgICAgICB9XG4gICAgfVxuICAgIGZ1bmN0aW9uIGluaXRpYWxpemVCdWZmZXIoYnVmZmVyU2l6ZSkge1xuICAgICAgICBjb25zdCBidWZmZXIgPSBbXTtcbiAgICAgICAgZmlsbEJ1ZmZlcihidWZmZXIsIGJ1ZmZlclNpemUpO1xuICAgICAgICByZXR1cm4gY3JlYXRlVmFsdWUoYnVmZmVyKTtcbiAgICB9XG4gICAgZnVuY3Rpb24gY3JlYXRlVHJpbW1lZEJ1ZmZlcihidWZmZXIpIHtcbiAgICAgICAgY29uc3QgaW5kZXggPSBidWZmZXIuaW5kZXhPZih1bmRlZmluZWQpO1xuICAgICAgICByZXR1cm4gZm9yY2VDYXN0KGluZGV4IDwgMCA/IGJ1ZmZlciA6IGJ1ZmZlci5zbGljZSgwLCBpbmRleCkpO1xuICAgIH1cbiAgICBmdW5jdGlvbiBjcmVhdGVQdXNoZWRCdWZmZXIoYnVmZmVyLCBuZXdWYWx1ZSkge1xuICAgICAgICBjb25zdCBuZXdCdWZmZXIgPSBbLi4uY3JlYXRlVHJpbW1lZEJ1ZmZlcihidWZmZXIpLCBuZXdWYWx1ZV07XG4gICAgICAgIGlmIChuZXdCdWZmZXIubGVuZ3RoID4gYnVmZmVyLmxlbmd0aCkge1xuICAgICAgICAgICAgbmV3QnVmZmVyLnNwbGljZSgwLCBuZXdCdWZmZXIubGVuZ3RoIC0gYnVmZmVyLmxlbmd0aCk7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICBmaWxsQnVmZmVyKG5ld0J1ZmZlciwgYnVmZmVyLmxlbmd0aCk7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIG5ld0J1ZmZlcjtcbiAgICB9XG5cbiAgICBmdW5jdGlvbiBjb25uZWN0VmFsdWVzKHsgcHJpbWFyeSwgc2Vjb25kYXJ5LCBmb3J3YXJkLCBiYWNrd2FyZCwgfSkge1xuICAgICAgICBsZXQgY2hhbmdpbmcgPSBmYWxzZTtcbiAgICAgICAgZnVuY3Rpb24gcHJldmVudEZlZWRiYWNrKGNhbGxiYWNrKSB7XG4gICAgICAgICAgICBpZiAoY2hhbmdpbmcpIHtcbiAgICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBjaGFuZ2luZyA9IHRydWU7XG4gICAgICAgICAgICBjYWxsYmFjaygpO1xuICAgICAgICAgICAgY2hhbmdpbmcgPSBmYWxzZTtcbiAgICAgICAgfVxuICAgICAgICBwcmltYXJ5LmVtaXR0ZXIub24oJ2NoYW5nZScsIChldikgPT4ge1xuICAgICAgICAgICAgcHJldmVudEZlZWRiYWNrKCgpID0+IHtcbiAgICAgICAgICAgICAgICBzZWNvbmRhcnkuc2V0UmF3VmFsdWUoZm9yd2FyZChwcmltYXJ5LCBzZWNvbmRhcnkpLCBldi5vcHRpb25zKTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9KTtcbiAgICAgICAgc2Vjb25kYXJ5LmVtaXR0ZXIub24oJ2NoYW5nZScsIChldikgPT4ge1xuICAgICAgICAgICAgcHJldmVudEZlZWRiYWNrKCgpID0+IHtcbiAgICAgICAgICAgICAgICBwcmltYXJ5LnNldFJhd1ZhbHVlKGJhY2t3YXJkKHByaW1hcnksIHNlY29uZGFyeSksIGV2Lm9wdGlvbnMpO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICBwcmV2ZW50RmVlZGJhY2soKCkgPT4ge1xuICAgICAgICAgICAgICAgIHNlY29uZGFyeS5zZXRSYXdWYWx1ZShmb3J3YXJkKHByaW1hcnksIHNlY29uZGFyeSksIGV2Lm9wdGlvbnMpO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgIH0pO1xuICAgICAgICBwcmV2ZW50RmVlZGJhY2soKCkgPT4ge1xuICAgICAgICAgICAgc2Vjb25kYXJ5LnNldFJhd1ZhbHVlKGZvcndhcmQocHJpbWFyeSwgc2Vjb25kYXJ5KSwge1xuICAgICAgICAgICAgICAgIGZvcmNlRW1pdDogZmFsc2UsXG4gICAgICAgICAgICAgICAgbGFzdDogdHJ1ZSxcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9KTtcbiAgICB9XG5cbiAgICBmdW5jdGlvbiBnZXRTdGVwRm9yS2V5KGJhc2VTdGVwLCBrZXlzKSB7XG4gICAgICAgIGNvbnN0IHN0ZXAgPSBiYXNlU3RlcCAqIChrZXlzLmFsdEtleSA/IDAuMSA6IDEpICogKGtleXMuc2hpZnRLZXkgPyAxMCA6IDEpO1xuICAgICAgICBpZiAoa2V5cy51cEtleSkge1xuICAgICAgICAgICAgcmV0dXJuICtzdGVwO1xuICAgICAgICB9XG4gICAgICAgIGVsc2UgaWYgKGtleXMuZG93bktleSkge1xuICAgICAgICAgICAgcmV0dXJuIC1zdGVwO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiAwO1xuICAgIH1cbiAgICBmdW5jdGlvbiBnZXRWZXJ0aWNhbFN0ZXBLZXlzKGV2KSB7XG4gICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICBhbHRLZXk6IGV2LmFsdEtleSxcbiAgICAgICAgICAgIGRvd25LZXk6IGV2LmtleSA9PT0gJ0Fycm93RG93bicsXG4gICAgICAgICAgICBzaGlmdEtleTogZXYuc2hpZnRLZXksXG4gICAgICAgICAgICB1cEtleTogZXYua2V5ID09PSAnQXJyb3dVcCcsXG4gICAgICAgIH07XG4gICAgfVxuICAgIGZ1bmN0aW9uIGdldEhvcml6b250YWxTdGVwS2V5cyhldikge1xuICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgYWx0S2V5OiBldi5hbHRLZXksXG4gICAgICAgICAgICBkb3duS2V5OiBldi5rZXkgPT09ICdBcnJvd0xlZnQnLFxuICAgICAgICAgICAgc2hpZnRLZXk6IGV2LnNoaWZ0S2V5LFxuICAgICAgICAgICAgdXBLZXk6IGV2LmtleSA9PT0gJ0Fycm93UmlnaHQnLFxuICAgICAgICB9O1xuICAgIH1cbiAgICBmdW5jdGlvbiBpc1ZlcnRpY2FsQXJyb3dLZXkoa2V5KSB7XG4gICAgICAgIHJldHVybiBrZXkgPT09ICdBcnJvd1VwJyB8fCBrZXkgPT09ICdBcnJvd0Rvd24nO1xuICAgIH1cbiAgICBmdW5jdGlvbiBpc0Fycm93S2V5KGtleSkge1xuICAgICAgICByZXR1cm4gaXNWZXJ0aWNhbEFycm93S2V5KGtleSkgfHwga2V5ID09PSAnQXJyb3dMZWZ0JyB8fCBrZXkgPT09ICdBcnJvd1JpZ2h0JztcbiAgICB9XG5cbiAgICBmdW5jdGlvbiBjb21wdXRlT2Zmc2V0JDEoZXYsIGVsZW0pIHtcbiAgICAgICAgY29uc3Qgd2luID0gZWxlbS5vd25lckRvY3VtZW50LmRlZmF1bHRWaWV3O1xuICAgICAgICBjb25zdCByZWN0ID0gZWxlbS5nZXRCb3VuZGluZ0NsaWVudFJlY3QoKTtcbiAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgIHg6IGV2LnBhZ2VYIC0gKCgod2luICYmIHdpbi5zY3JvbGxYKSB8fCAwKSArIHJlY3QubGVmdCksXG4gICAgICAgICAgICB5OiBldi5wYWdlWSAtICgoKHdpbiAmJiB3aW4uc2Nyb2xsWSkgfHwgMCkgKyByZWN0LnRvcCksXG4gICAgICAgIH07XG4gICAgfVxuICAgIGNsYXNzIFBvaW50ZXJIYW5kbGVyIHtcbiAgICAgICAgY29uc3RydWN0b3IoZWxlbWVudCkge1xuICAgICAgICAgICAgdGhpcy5sYXN0VG91Y2hfID0gbnVsbDtcbiAgICAgICAgICAgIHRoaXMub25Eb2N1bWVudE1vdXNlTW92ZV8gPSB0aGlzLm9uRG9jdW1lbnRNb3VzZU1vdmVfLmJpbmQodGhpcyk7XG4gICAgICAgICAgICB0aGlzLm9uRG9jdW1lbnRNb3VzZVVwXyA9IHRoaXMub25Eb2N1bWVudE1vdXNlVXBfLmJpbmQodGhpcyk7XG4gICAgICAgICAgICB0aGlzLm9uTW91c2VEb3duXyA9IHRoaXMub25Nb3VzZURvd25fLmJpbmQodGhpcyk7XG4gICAgICAgICAgICB0aGlzLm9uVG91Y2hFbmRfID0gdGhpcy5vblRvdWNoRW5kXy5iaW5kKHRoaXMpO1xuICAgICAgICAgICAgdGhpcy5vblRvdWNoTW92ZV8gPSB0aGlzLm9uVG91Y2hNb3ZlXy5iaW5kKHRoaXMpO1xuICAgICAgICAgICAgdGhpcy5vblRvdWNoU3RhcnRfID0gdGhpcy5vblRvdWNoU3RhcnRfLmJpbmQodGhpcyk7XG4gICAgICAgICAgICB0aGlzLmVsZW1fID0gZWxlbWVudDtcbiAgICAgICAgICAgIHRoaXMuZW1pdHRlciA9IG5ldyBFbWl0dGVyKCk7XG4gICAgICAgICAgICBlbGVtZW50LmFkZEV2ZW50TGlzdGVuZXIoJ3RvdWNoc3RhcnQnLCB0aGlzLm9uVG91Y2hTdGFydF8sIHtcbiAgICAgICAgICAgICAgICBwYXNzaXZlOiBmYWxzZSxcbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgZWxlbWVudC5hZGRFdmVudExpc3RlbmVyKCd0b3VjaG1vdmUnLCB0aGlzLm9uVG91Y2hNb3ZlXywge1xuICAgICAgICAgICAgICAgIHBhc3NpdmU6IHRydWUsXG4gICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIGVsZW1lbnQuYWRkRXZlbnRMaXN0ZW5lcigndG91Y2hlbmQnLCB0aGlzLm9uVG91Y2hFbmRfKTtcbiAgICAgICAgICAgIGVsZW1lbnQuYWRkRXZlbnRMaXN0ZW5lcignbW91c2Vkb3duJywgdGhpcy5vbk1vdXNlRG93bl8pO1xuICAgICAgICB9XG4gICAgICAgIGNvbXB1dGVQb3NpdGlvbl8ob2Zmc2V0KSB7XG4gICAgICAgICAgICBjb25zdCByZWN0ID0gdGhpcy5lbGVtXy5nZXRCb3VuZGluZ0NsaWVudFJlY3QoKTtcbiAgICAgICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICAgICAgYm91bmRzOiB7XG4gICAgICAgICAgICAgICAgICAgIHdpZHRoOiByZWN0LndpZHRoLFxuICAgICAgICAgICAgICAgICAgICBoZWlnaHQ6IHJlY3QuaGVpZ2h0LFxuICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgcG9pbnQ6IG9mZnNldFxuICAgICAgICAgICAgICAgICAgICA/IHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHg6IG9mZnNldC54LFxuICAgICAgICAgICAgICAgICAgICAgICAgeTogb2Zmc2V0LnksXG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgOiBudWxsLFxuICAgICAgICAgICAgfTtcbiAgICAgICAgfVxuICAgICAgICBvbk1vdXNlRG93bl8oZXYpIHtcbiAgICAgICAgICAgIHZhciBfYTtcbiAgICAgICAgICAgIGV2LnByZXZlbnREZWZhdWx0KCk7XG4gICAgICAgICAgICAoX2EgPSBldi5jdXJyZW50VGFyZ2V0KSA9PT0gbnVsbCB8fCBfYSA9PT0gdm9pZCAwID8gdm9pZCAwIDogX2EuZm9jdXMoKTtcbiAgICAgICAgICAgIGNvbnN0IGRvYyA9IHRoaXMuZWxlbV8ub3duZXJEb2N1bWVudDtcbiAgICAgICAgICAgIGRvYy5hZGRFdmVudExpc3RlbmVyKCdtb3VzZW1vdmUnLCB0aGlzLm9uRG9jdW1lbnRNb3VzZU1vdmVfKTtcbiAgICAgICAgICAgIGRvYy5hZGRFdmVudExpc3RlbmVyKCdtb3VzZXVwJywgdGhpcy5vbkRvY3VtZW50TW91c2VVcF8pO1xuICAgICAgICAgICAgdGhpcy5lbWl0dGVyLmVtaXQoJ2Rvd24nLCB7XG4gICAgICAgICAgICAgICAgYWx0S2V5OiBldi5hbHRLZXksXG4gICAgICAgICAgICAgICAgZGF0YTogdGhpcy5jb21wdXRlUG9zaXRpb25fKGNvbXB1dGVPZmZzZXQkMShldiwgdGhpcy5lbGVtXykpLFxuICAgICAgICAgICAgICAgIHNlbmRlcjogdGhpcyxcbiAgICAgICAgICAgICAgICBzaGlmdEtleTogZXYuc2hpZnRLZXksXG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfVxuICAgICAgICBvbkRvY3VtZW50TW91c2VNb3ZlXyhldikge1xuICAgICAgICAgICAgdGhpcy5lbWl0dGVyLmVtaXQoJ21vdmUnLCB7XG4gICAgICAgICAgICAgICAgYWx0S2V5OiBldi5hbHRLZXksXG4gICAgICAgICAgICAgICAgZGF0YTogdGhpcy5jb21wdXRlUG9zaXRpb25fKGNvbXB1dGVPZmZzZXQkMShldiwgdGhpcy5lbGVtXykpLFxuICAgICAgICAgICAgICAgIHNlbmRlcjogdGhpcyxcbiAgICAgICAgICAgICAgICBzaGlmdEtleTogZXYuc2hpZnRLZXksXG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfVxuICAgICAgICBvbkRvY3VtZW50TW91c2VVcF8oZXYpIHtcbiAgICAgICAgICAgIGNvbnN0IGRvYyA9IHRoaXMuZWxlbV8ub3duZXJEb2N1bWVudDtcbiAgICAgICAgICAgIGRvYy5yZW1vdmVFdmVudExpc3RlbmVyKCdtb3VzZW1vdmUnLCB0aGlzLm9uRG9jdW1lbnRNb3VzZU1vdmVfKTtcbiAgICAgICAgICAgIGRvYy5yZW1vdmVFdmVudExpc3RlbmVyKCdtb3VzZXVwJywgdGhpcy5vbkRvY3VtZW50TW91c2VVcF8pO1xuICAgICAgICAgICAgdGhpcy5lbWl0dGVyLmVtaXQoJ3VwJywge1xuICAgICAgICAgICAgICAgIGFsdEtleTogZXYuYWx0S2V5LFxuICAgICAgICAgICAgICAgIGRhdGE6IHRoaXMuY29tcHV0ZVBvc2l0aW9uXyhjb21wdXRlT2Zmc2V0JDEoZXYsIHRoaXMuZWxlbV8pKSxcbiAgICAgICAgICAgICAgICBzZW5kZXI6IHRoaXMsXG4gICAgICAgICAgICAgICAgc2hpZnRLZXk6IGV2LnNoaWZ0S2V5LFxuICAgICAgICAgICAgfSk7XG4gICAgICAgIH1cbiAgICAgICAgb25Ub3VjaFN0YXJ0Xyhldikge1xuICAgICAgICAgICAgZXYucHJldmVudERlZmF1bHQoKTtcbiAgICAgICAgICAgIGNvbnN0IHRvdWNoID0gZXYudGFyZ2V0VG91Y2hlcy5pdGVtKDApO1xuICAgICAgICAgICAgY29uc3QgcmVjdCA9IHRoaXMuZWxlbV8uZ2V0Qm91bmRpbmdDbGllbnRSZWN0KCk7XG4gICAgICAgICAgICB0aGlzLmVtaXR0ZXIuZW1pdCgnZG93bicsIHtcbiAgICAgICAgICAgICAgICBhbHRLZXk6IGV2LmFsdEtleSxcbiAgICAgICAgICAgICAgICBkYXRhOiB0aGlzLmNvbXB1dGVQb3NpdGlvbl8odG91Y2hcbiAgICAgICAgICAgICAgICAgICAgPyB7XG4gICAgICAgICAgICAgICAgICAgICAgICB4OiB0b3VjaC5jbGllbnRYIC0gcmVjdC5sZWZ0LFxuICAgICAgICAgICAgICAgICAgICAgICAgeTogdG91Y2guY2xpZW50WSAtIHJlY3QudG9wLFxuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIDogdW5kZWZpbmVkKSxcbiAgICAgICAgICAgICAgICBzZW5kZXI6IHRoaXMsXG4gICAgICAgICAgICAgICAgc2hpZnRLZXk6IGV2LnNoaWZ0S2V5LFxuICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB0aGlzLmxhc3RUb3VjaF8gPSB0b3VjaDtcbiAgICAgICAgfVxuICAgICAgICBvblRvdWNoTW92ZV8oZXYpIHtcbiAgICAgICAgICAgIGNvbnN0IHRvdWNoID0gZXYudGFyZ2V0VG91Y2hlcy5pdGVtKDApO1xuICAgICAgICAgICAgY29uc3QgcmVjdCA9IHRoaXMuZWxlbV8uZ2V0Qm91bmRpbmdDbGllbnRSZWN0KCk7XG4gICAgICAgICAgICB0aGlzLmVtaXR0ZXIuZW1pdCgnbW92ZScsIHtcbiAgICAgICAgICAgICAgICBhbHRLZXk6IGV2LmFsdEtleSxcbiAgICAgICAgICAgICAgICBkYXRhOiB0aGlzLmNvbXB1dGVQb3NpdGlvbl8odG91Y2hcbiAgICAgICAgICAgICAgICAgICAgPyB7XG4gICAgICAgICAgICAgICAgICAgICAgICB4OiB0b3VjaC5jbGllbnRYIC0gcmVjdC5sZWZ0LFxuICAgICAgICAgICAgICAgICAgICAgICAgeTogdG91Y2guY2xpZW50WSAtIHJlY3QudG9wLFxuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIDogdW5kZWZpbmVkKSxcbiAgICAgICAgICAgICAgICBzZW5kZXI6IHRoaXMsXG4gICAgICAgICAgICAgICAgc2hpZnRLZXk6IGV2LnNoaWZ0S2V5LFxuICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB0aGlzLmxhc3RUb3VjaF8gPSB0b3VjaDtcbiAgICAgICAgfVxuICAgICAgICBvblRvdWNoRW5kXyhldikge1xuICAgICAgICAgICAgdmFyIF9hO1xuICAgICAgICAgICAgY29uc3QgdG91Y2ggPSAoX2EgPSBldi50YXJnZXRUb3VjaGVzLml0ZW0oMCkpICE9PSBudWxsICYmIF9hICE9PSB2b2lkIDAgPyBfYSA6IHRoaXMubGFzdFRvdWNoXztcbiAgICAgICAgICAgIGNvbnN0IHJlY3QgPSB0aGlzLmVsZW1fLmdldEJvdW5kaW5nQ2xpZW50UmVjdCgpO1xuICAgICAgICAgICAgdGhpcy5lbWl0dGVyLmVtaXQoJ3VwJywge1xuICAgICAgICAgICAgICAgIGFsdEtleTogZXYuYWx0S2V5LFxuICAgICAgICAgICAgICAgIGRhdGE6IHRoaXMuY29tcHV0ZVBvc2l0aW9uXyh0b3VjaFxuICAgICAgICAgICAgICAgICAgICA/IHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHg6IHRvdWNoLmNsaWVudFggLSByZWN0LmxlZnQsXG4gICAgICAgICAgICAgICAgICAgICAgICB5OiB0b3VjaC5jbGllbnRZIC0gcmVjdC50b3AsXG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgOiB1bmRlZmluZWQpLFxuICAgICAgICAgICAgICAgIHNlbmRlcjogdGhpcyxcbiAgICAgICAgICAgICAgICBzaGlmdEtleTogZXYuc2hpZnRLZXksXG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIGZ1bmN0aW9uIG1hcFJhbmdlKHZhbHVlLCBzdGFydDEsIGVuZDEsIHN0YXJ0MiwgZW5kMikge1xuICAgICAgICBjb25zdCBwID0gKHZhbHVlIC0gc3RhcnQxKSAvIChlbmQxIC0gc3RhcnQxKTtcbiAgICAgICAgcmV0dXJuIHN0YXJ0MiArIHAgKiAoZW5kMiAtIHN0YXJ0Mik7XG4gICAgfVxuICAgIGZ1bmN0aW9uIGdldERlY2ltYWxEaWdpdHModmFsdWUpIHtcbiAgICAgICAgY29uc3QgdGV4dCA9IFN0cmluZyh2YWx1ZS50b0ZpeGVkKDEwKSk7XG4gICAgICAgIGNvbnN0IGZyYWMgPSB0ZXh0LnNwbGl0KCcuJylbMV07XG4gICAgICAgIHJldHVybiBmcmFjLnJlcGxhY2UoLzArJC8sICcnKS5sZW5ndGg7XG4gICAgfVxuICAgIGZ1bmN0aW9uIGNvbnN0cmFpblJhbmdlKHZhbHVlLCBtaW4sIG1heCkge1xuICAgICAgICByZXR1cm4gTWF0aC5taW4oTWF0aC5tYXgodmFsdWUsIG1pbiksIG1heCk7XG4gICAgfVxuICAgIGZ1bmN0aW9uIGxvb3BSYW5nZSh2YWx1ZSwgbWF4KSB7XG4gICAgICAgIHJldHVybiAoKHZhbHVlICUgbWF4KSArIG1heCkgJSBtYXg7XG4gICAgfVxuXG4gICAgY29uc3QgY2xhc3NOYW1lJGcgPSBDbGFzc05hbWUoJ3R4dCcpO1xuICAgIGNsYXNzIE51bWJlclRleHRWaWV3IHtcbiAgICAgICAgY29uc3RydWN0b3IoZG9jLCBjb25maWcpIHtcbiAgICAgICAgICAgIHRoaXMub25DaGFuZ2VfID0gdGhpcy5vbkNoYW5nZV8uYmluZCh0aGlzKTtcbiAgICAgICAgICAgIHRoaXMucHJvcHNfID0gY29uZmlnLnByb3BzO1xuICAgICAgICAgICAgdGhpcy5wcm9wc18uZW1pdHRlci5vbignY2hhbmdlJywgdGhpcy5vbkNoYW5nZV8pO1xuICAgICAgICAgICAgdGhpcy5lbGVtZW50ID0gZG9jLmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xuICAgICAgICAgICAgdGhpcy5lbGVtZW50LmNsYXNzTGlzdC5hZGQoY2xhc3NOYW1lJGcoKSwgY2xhc3NOYW1lJGcodW5kZWZpbmVkLCAnbnVtJykpO1xuICAgICAgICAgICAgaWYgKGNvbmZpZy5hcnJheVBvc2l0aW9uKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5lbGVtZW50LmNsYXNzTGlzdC5hZGQoY2xhc3NOYW1lJGcodW5kZWZpbmVkLCBjb25maWcuYXJyYXlQb3NpdGlvbikpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgY29uZmlnLnZpZXdQcm9wcy5iaW5kQ2xhc3NNb2RpZmllcnModGhpcy5lbGVtZW50KTtcbiAgICAgICAgICAgIGNvbnN0IGlucHV0RWxlbSA9IGRvYy5jcmVhdGVFbGVtZW50KCdpbnB1dCcpO1xuICAgICAgICAgICAgaW5wdXRFbGVtLmNsYXNzTGlzdC5hZGQoY2xhc3NOYW1lJGcoJ2knKSk7XG4gICAgICAgICAgICBpbnB1dEVsZW0udHlwZSA9ICd0ZXh0JztcbiAgICAgICAgICAgIGNvbmZpZy52aWV3UHJvcHMuYmluZERpc2FibGVkKGlucHV0RWxlbSk7XG4gICAgICAgICAgICB0aGlzLmVsZW1lbnQuYXBwZW5kQ2hpbGQoaW5wdXRFbGVtKTtcbiAgICAgICAgICAgIHRoaXMuaW5wdXRFbGVtZW50ID0gaW5wdXRFbGVtO1xuICAgICAgICAgICAgdGhpcy5vbkRyYWdnaW5nQ2hhbmdlXyA9IHRoaXMub25EcmFnZ2luZ0NoYW5nZV8uYmluZCh0aGlzKTtcbiAgICAgICAgICAgIHRoaXMuZHJhZ2dpbmdfID0gY29uZmlnLmRyYWdnaW5nO1xuICAgICAgICAgICAgdGhpcy5kcmFnZ2luZ18uZW1pdHRlci5vbignY2hhbmdlJywgdGhpcy5vbkRyYWdnaW5nQ2hhbmdlXyk7XG4gICAgICAgICAgICB0aGlzLmVsZW1lbnQuY2xhc3NMaXN0LmFkZChjbGFzc05hbWUkZygpKTtcbiAgICAgICAgICAgIHRoaXMuaW5wdXRFbGVtZW50LmNsYXNzTGlzdC5hZGQoY2xhc3NOYW1lJGcoJ2knKSk7XG4gICAgICAgICAgICBjb25zdCBrbm9iRWxlbSA9IGRvYy5jcmVhdGVFbGVtZW50KCdkaXYnKTtcbiAgICAgICAgICAgIGtub2JFbGVtLmNsYXNzTGlzdC5hZGQoY2xhc3NOYW1lJGcoJ2snKSk7XG4gICAgICAgICAgICB0aGlzLmVsZW1lbnQuYXBwZW5kQ2hpbGQoa25vYkVsZW0pO1xuICAgICAgICAgICAgdGhpcy5rbm9iRWxlbWVudCA9IGtub2JFbGVtO1xuICAgICAgICAgICAgY29uc3QgZ3VpZGVFbGVtID0gZG9jLmNyZWF0ZUVsZW1lbnROUyhTVkdfTlMsICdzdmcnKTtcbiAgICAgICAgICAgIGd1aWRlRWxlbS5jbGFzc0xpc3QuYWRkKGNsYXNzTmFtZSRnKCdnJykpO1xuICAgICAgICAgICAgdGhpcy5rbm9iRWxlbWVudC5hcHBlbmRDaGlsZChndWlkZUVsZW0pO1xuICAgICAgICAgICAgY29uc3QgYm9keUVsZW0gPSBkb2MuY3JlYXRlRWxlbWVudE5TKFNWR19OUywgJ3BhdGgnKTtcbiAgICAgICAgICAgIGJvZHlFbGVtLmNsYXNzTGlzdC5hZGQoY2xhc3NOYW1lJGcoJ2diJykpO1xuICAgICAgICAgICAgZ3VpZGVFbGVtLmFwcGVuZENoaWxkKGJvZHlFbGVtKTtcbiAgICAgICAgICAgIHRoaXMuZ3VpZGVCb2R5RWxlbV8gPSBib2R5RWxlbTtcbiAgICAgICAgICAgIGNvbnN0IGhlYWRFbGVtID0gZG9jLmNyZWF0ZUVsZW1lbnROUyhTVkdfTlMsICdwYXRoJyk7XG4gICAgICAgICAgICBoZWFkRWxlbS5jbGFzc0xpc3QuYWRkKGNsYXNzTmFtZSRnKCdnaCcpKTtcbiAgICAgICAgICAgIGd1aWRlRWxlbS5hcHBlbmRDaGlsZChoZWFkRWxlbSk7XG4gICAgICAgICAgICB0aGlzLmd1aWRlSGVhZEVsZW1fID0gaGVhZEVsZW07XG4gICAgICAgICAgICBjb25zdCB0b29sdGlwRWxlbSA9IGRvYy5jcmVhdGVFbGVtZW50KCdkaXYnKTtcbiAgICAgICAgICAgIHRvb2x0aXBFbGVtLmNsYXNzTGlzdC5hZGQoQ2xhc3NOYW1lKCd0dCcpKCkpO1xuICAgICAgICAgICAgdGhpcy5rbm9iRWxlbWVudC5hcHBlbmRDaGlsZCh0b29sdGlwRWxlbSk7XG4gICAgICAgICAgICB0aGlzLnRvb2x0aXBFbGVtXyA9IHRvb2x0aXBFbGVtO1xuICAgICAgICAgICAgY29uZmlnLnZhbHVlLmVtaXR0ZXIub24oJ2NoYW5nZScsIHRoaXMub25DaGFuZ2VfKTtcbiAgICAgICAgICAgIHRoaXMudmFsdWUgPSBjb25maWcudmFsdWU7XG4gICAgICAgICAgICB0aGlzLnJlZnJlc2goKTtcbiAgICAgICAgfVxuICAgICAgICBvbkRyYWdnaW5nQ2hhbmdlXyhldikge1xuICAgICAgICAgICAgaWYgKGV2LnJhd1ZhbHVlID09PSBudWxsKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5lbGVtZW50LmNsYXNzTGlzdC5yZW1vdmUoY2xhc3NOYW1lJGcodW5kZWZpbmVkLCAnZHJnJykpO1xuICAgICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHRoaXMuZWxlbWVudC5jbGFzc0xpc3QuYWRkKGNsYXNzTmFtZSRnKHVuZGVmaW5lZCwgJ2RyZycpKTtcbiAgICAgICAgICAgIGNvbnN0IHggPSBldi5yYXdWYWx1ZSAvIHRoaXMucHJvcHNfLmdldCgnZHJhZ2dpbmdTY2FsZScpO1xuICAgICAgICAgICAgY29uc3QgYW94ID0geCArICh4ID4gMCA/IC0xIDogeCA8IDAgPyArMSA6IDApO1xuICAgICAgICAgICAgY29uc3QgYWR4ID0gY29uc3RyYWluUmFuZ2UoLWFveCwgLTQsICs0KTtcbiAgICAgICAgICAgIHRoaXMuZ3VpZGVIZWFkRWxlbV8uc2V0QXR0cmlidXRlTlMobnVsbCwgJ2QnLCBbYE0gJHthb3ggKyBhZHh9LDAgTCR7YW94fSw0IEwke2FveCArIGFkeH0sOGAsIGBNICR7eH0sLTEgTCR7eH0sOWBdLmpvaW4oJyAnKSk7XG4gICAgICAgICAgICB0aGlzLmd1aWRlQm9keUVsZW1fLnNldEF0dHJpYnV0ZU5TKG51bGwsICdkJywgYE0gMCw0IEwke3h9LDRgKTtcbiAgICAgICAgICAgIGNvbnN0IGZvcm1hdHRlciA9IHRoaXMucHJvcHNfLmdldCgnZm9ybWF0dGVyJyk7XG4gICAgICAgICAgICB0aGlzLnRvb2x0aXBFbGVtXy50ZXh0Q29udGVudCA9IGZvcm1hdHRlcih0aGlzLnZhbHVlLnJhd1ZhbHVlKTtcbiAgICAgICAgICAgIHRoaXMudG9vbHRpcEVsZW1fLnN0eWxlLmxlZnQgPSBgJHt4fXB4YDtcbiAgICAgICAgfVxuICAgICAgICByZWZyZXNoKCkge1xuICAgICAgICAgICAgY29uc3QgZm9ybWF0dGVyID0gdGhpcy5wcm9wc18uZ2V0KCdmb3JtYXR0ZXInKTtcbiAgICAgICAgICAgIHRoaXMuaW5wdXRFbGVtZW50LnZhbHVlID0gZm9ybWF0dGVyKHRoaXMudmFsdWUucmF3VmFsdWUpO1xuICAgICAgICB9XG4gICAgICAgIG9uQ2hhbmdlXygpIHtcbiAgICAgICAgICAgIHRoaXMucmVmcmVzaCgpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgY2xhc3MgTnVtYmVyVGV4dENvbnRyb2xsZXIge1xuICAgICAgICBjb25zdHJ1Y3Rvcihkb2MsIGNvbmZpZykge1xuICAgICAgICAgICAgdGhpcy5vcmlnaW5SYXdWYWx1ZV8gPSAwO1xuICAgICAgICAgICAgdGhpcy5vbklucHV0Q2hhbmdlXyA9IHRoaXMub25JbnB1dENoYW5nZV8uYmluZCh0aGlzKTtcbiAgICAgICAgICAgIHRoaXMub25JbnB1dEtleURvd25fID0gdGhpcy5vbklucHV0S2V5RG93bl8uYmluZCh0aGlzKTtcbiAgICAgICAgICAgIHRoaXMub25JbnB1dEtleVVwXyA9IHRoaXMub25JbnB1dEtleVVwXy5iaW5kKHRoaXMpO1xuICAgICAgICAgICAgdGhpcy5vblBvaW50ZXJEb3duXyA9IHRoaXMub25Qb2ludGVyRG93bl8uYmluZCh0aGlzKTtcbiAgICAgICAgICAgIHRoaXMub25Qb2ludGVyTW92ZV8gPSB0aGlzLm9uUG9pbnRlck1vdmVfLmJpbmQodGhpcyk7XG4gICAgICAgICAgICB0aGlzLm9uUG9pbnRlclVwXyA9IHRoaXMub25Qb2ludGVyVXBfLmJpbmQodGhpcyk7XG4gICAgICAgICAgICB0aGlzLmJhc2VTdGVwXyA9IGNvbmZpZy5iYXNlU3RlcDtcbiAgICAgICAgICAgIHRoaXMucGFyc2VyXyA9IGNvbmZpZy5wYXJzZXI7XG4gICAgICAgICAgICB0aGlzLnByb3BzID0gY29uZmlnLnByb3BzO1xuICAgICAgICAgICAgdGhpcy52YWx1ZSA9IGNvbmZpZy52YWx1ZTtcbiAgICAgICAgICAgIHRoaXMudmlld1Byb3BzID0gY29uZmlnLnZpZXdQcm9wcztcbiAgICAgICAgICAgIHRoaXMuZHJhZ2dpbmdfID0gY3JlYXRlVmFsdWUobnVsbCk7XG4gICAgICAgICAgICB0aGlzLnZpZXcgPSBuZXcgTnVtYmVyVGV4dFZpZXcoZG9jLCB7XG4gICAgICAgICAgICAgICAgYXJyYXlQb3NpdGlvbjogY29uZmlnLmFycmF5UG9zaXRpb24sXG4gICAgICAgICAgICAgICAgZHJhZ2dpbmc6IHRoaXMuZHJhZ2dpbmdfLFxuICAgICAgICAgICAgICAgIHByb3BzOiB0aGlzLnByb3BzLFxuICAgICAgICAgICAgICAgIHZhbHVlOiB0aGlzLnZhbHVlLFxuICAgICAgICAgICAgICAgIHZpZXdQcm9wczogdGhpcy52aWV3UHJvcHMsXG4gICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIHRoaXMudmlldy5pbnB1dEVsZW1lbnQuYWRkRXZlbnRMaXN0ZW5lcignY2hhbmdlJywgdGhpcy5vbklucHV0Q2hhbmdlXyk7XG4gICAgICAgICAgICB0aGlzLnZpZXcuaW5wdXRFbGVtZW50LmFkZEV2ZW50TGlzdGVuZXIoJ2tleWRvd24nLCB0aGlzLm9uSW5wdXRLZXlEb3duXyk7XG4gICAgICAgICAgICB0aGlzLnZpZXcuaW5wdXRFbGVtZW50LmFkZEV2ZW50TGlzdGVuZXIoJ2tleXVwJywgdGhpcy5vbklucHV0S2V5VXBfKTtcbiAgICAgICAgICAgIGNvbnN0IHBoID0gbmV3IFBvaW50ZXJIYW5kbGVyKHRoaXMudmlldy5rbm9iRWxlbWVudCk7XG4gICAgICAgICAgICBwaC5lbWl0dGVyLm9uKCdkb3duJywgdGhpcy5vblBvaW50ZXJEb3duXyk7XG4gICAgICAgICAgICBwaC5lbWl0dGVyLm9uKCdtb3ZlJywgdGhpcy5vblBvaW50ZXJNb3ZlXyk7XG4gICAgICAgICAgICBwaC5lbWl0dGVyLm9uKCd1cCcsIHRoaXMub25Qb2ludGVyVXBfKTtcbiAgICAgICAgfVxuICAgICAgICBvbklucHV0Q2hhbmdlXyhlKSB7XG4gICAgICAgICAgICBjb25zdCBpbnB1dEVsZW0gPSBmb3JjZUNhc3QoZS5jdXJyZW50VGFyZ2V0KTtcbiAgICAgICAgICAgIGNvbnN0IHZhbHVlID0gaW5wdXRFbGVtLnZhbHVlO1xuICAgICAgICAgICAgY29uc3QgcGFyc2VkVmFsdWUgPSB0aGlzLnBhcnNlcl8odmFsdWUpO1xuICAgICAgICAgICAgaWYgKCFpc0VtcHR5KHBhcnNlZFZhbHVlKSkge1xuICAgICAgICAgICAgICAgIHRoaXMudmFsdWUucmF3VmFsdWUgPSBwYXJzZWRWYWx1ZTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHRoaXMudmlldy5yZWZyZXNoKCk7XG4gICAgICAgIH1cbiAgICAgICAgb25JbnB1dEtleURvd25fKGV2KSB7XG4gICAgICAgICAgICBjb25zdCBzdGVwID0gZ2V0U3RlcEZvcktleSh0aGlzLmJhc2VTdGVwXywgZ2V0VmVydGljYWxTdGVwS2V5cyhldikpO1xuICAgICAgICAgICAgaWYgKHN0ZXAgPT09IDApIHtcbiAgICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICB0aGlzLnZhbHVlLnNldFJhd1ZhbHVlKHRoaXMudmFsdWUucmF3VmFsdWUgKyBzdGVwLCB7XG4gICAgICAgICAgICAgICAgZm9yY2VFbWl0OiBmYWxzZSxcbiAgICAgICAgICAgICAgICBsYXN0OiBmYWxzZSxcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9XG4gICAgICAgIG9uSW5wdXRLZXlVcF8oZXYpIHtcbiAgICAgICAgICAgIGNvbnN0IHN0ZXAgPSBnZXRTdGVwRm9yS2V5KHRoaXMuYmFzZVN0ZXBfLCBnZXRWZXJ0aWNhbFN0ZXBLZXlzKGV2KSk7XG4gICAgICAgICAgICBpZiAoc3RlcCA9PT0gMCkge1xuICAgICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHRoaXMudmFsdWUuc2V0UmF3VmFsdWUodGhpcy52YWx1ZS5yYXdWYWx1ZSwge1xuICAgICAgICAgICAgICAgIGZvcmNlRW1pdDogdHJ1ZSxcbiAgICAgICAgICAgICAgICBsYXN0OiB0cnVlLFxuICAgICAgICAgICAgfSk7XG4gICAgICAgIH1cbiAgICAgICAgb25Qb2ludGVyRG93bl8oKSB7XG4gICAgICAgICAgICB0aGlzLm9yaWdpblJhd1ZhbHVlXyA9IHRoaXMudmFsdWUucmF3VmFsdWU7XG4gICAgICAgICAgICB0aGlzLmRyYWdnaW5nXy5yYXdWYWx1ZSA9IDA7XG4gICAgICAgIH1cbiAgICAgICAgY29tcHV0ZURyYWdnaW5nVmFsdWVfKGRhdGEpIHtcbiAgICAgICAgICAgIGlmICghZGF0YS5wb2ludCkge1xuICAgICAgICAgICAgICAgIHJldHVybiBudWxsO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgY29uc3QgZHggPSBkYXRhLnBvaW50LnggLSBkYXRhLmJvdW5kcy53aWR0aCAvIDI7XG4gICAgICAgICAgICByZXR1cm4gdGhpcy5vcmlnaW5SYXdWYWx1ZV8gKyBkeCAqIHRoaXMucHJvcHMuZ2V0KCdkcmFnZ2luZ1NjYWxlJyk7XG4gICAgICAgIH1cbiAgICAgICAgb25Qb2ludGVyTW92ZV8oZXYpIHtcbiAgICAgICAgICAgIGNvbnN0IHYgPSB0aGlzLmNvbXB1dGVEcmFnZ2luZ1ZhbHVlXyhldi5kYXRhKTtcbiAgICAgICAgICAgIGlmICh2ID09PSBudWxsKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgdGhpcy52YWx1ZS5zZXRSYXdWYWx1ZSh2LCB7XG4gICAgICAgICAgICAgICAgZm9yY2VFbWl0OiBmYWxzZSxcbiAgICAgICAgICAgICAgICBsYXN0OiBmYWxzZSxcbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgdGhpcy5kcmFnZ2luZ18ucmF3VmFsdWUgPSB0aGlzLnZhbHVlLnJhd1ZhbHVlIC0gdGhpcy5vcmlnaW5SYXdWYWx1ZV87XG4gICAgICAgIH1cbiAgICAgICAgb25Qb2ludGVyVXBfKGV2KSB7XG4gICAgICAgICAgICBjb25zdCB2ID0gdGhpcy5jb21wdXRlRHJhZ2dpbmdWYWx1ZV8oZXYuZGF0YSk7XG4gICAgICAgICAgICBpZiAodiA9PT0gbnVsbCkge1xuICAgICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHRoaXMudmFsdWUuc2V0UmF3VmFsdWUodiwge1xuICAgICAgICAgICAgICAgIGZvcmNlRW1pdDogdHJ1ZSxcbiAgICAgICAgICAgICAgICBsYXN0OiB0cnVlLFxuICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB0aGlzLmRyYWdnaW5nXy5yYXdWYWx1ZSA9IG51bGw7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBjb25zdCBjbGFzc05hbWUkZiA9IENsYXNzTmFtZSgnc2xkJyk7XG4gICAgY2xhc3MgU2xpZGVyVmlldyB7XG4gICAgICAgIGNvbnN0cnVjdG9yKGRvYywgY29uZmlnKSB7XG4gICAgICAgICAgICB0aGlzLm9uQ2hhbmdlXyA9IHRoaXMub25DaGFuZ2VfLmJpbmQodGhpcyk7XG4gICAgICAgICAgICB0aGlzLnByb3BzXyA9IGNvbmZpZy5wcm9wcztcbiAgICAgICAgICAgIHRoaXMucHJvcHNfLmVtaXR0ZXIub24oJ2NoYW5nZScsIHRoaXMub25DaGFuZ2VfKTtcbiAgICAgICAgICAgIHRoaXMuZWxlbWVudCA9IGRvYy5jcmVhdGVFbGVtZW50KCdkaXYnKTtcbiAgICAgICAgICAgIHRoaXMuZWxlbWVudC5jbGFzc0xpc3QuYWRkKGNsYXNzTmFtZSRmKCkpO1xuICAgICAgICAgICAgY29uZmlnLnZpZXdQcm9wcy5iaW5kQ2xhc3NNb2RpZmllcnModGhpcy5lbGVtZW50KTtcbiAgICAgICAgICAgIGNvbnN0IHRyYWNrRWxlbSA9IGRvYy5jcmVhdGVFbGVtZW50KCdkaXYnKTtcbiAgICAgICAgICAgIHRyYWNrRWxlbS5jbGFzc0xpc3QuYWRkKGNsYXNzTmFtZSRmKCd0JykpO1xuICAgICAgICAgICAgY29uZmlnLnZpZXdQcm9wcy5iaW5kVGFiSW5kZXgodHJhY2tFbGVtKTtcbiAgICAgICAgICAgIHRoaXMuZWxlbWVudC5hcHBlbmRDaGlsZCh0cmFja0VsZW0pO1xuICAgICAgICAgICAgdGhpcy50cmFja0VsZW1lbnQgPSB0cmFja0VsZW07XG4gICAgICAgICAgICBjb25zdCBrbm9iRWxlbSA9IGRvYy5jcmVhdGVFbGVtZW50KCdkaXYnKTtcbiAgICAgICAgICAgIGtub2JFbGVtLmNsYXNzTGlzdC5hZGQoY2xhc3NOYW1lJGYoJ2snKSk7XG4gICAgICAgICAgICB0aGlzLnRyYWNrRWxlbWVudC5hcHBlbmRDaGlsZChrbm9iRWxlbSk7XG4gICAgICAgICAgICB0aGlzLmtub2JFbGVtZW50ID0ga25vYkVsZW07XG4gICAgICAgICAgICBjb25maWcudmFsdWUuZW1pdHRlci5vbignY2hhbmdlJywgdGhpcy5vbkNoYW5nZV8pO1xuICAgICAgICAgICAgdGhpcy52YWx1ZSA9IGNvbmZpZy52YWx1ZTtcbiAgICAgICAgICAgIHRoaXMudXBkYXRlXygpO1xuICAgICAgICB9XG4gICAgICAgIHVwZGF0ZV8oKSB7XG4gICAgICAgICAgICBjb25zdCBwID0gY29uc3RyYWluUmFuZ2UobWFwUmFuZ2UodGhpcy52YWx1ZS5yYXdWYWx1ZSwgdGhpcy5wcm9wc18uZ2V0KCdtaW5WYWx1ZScpLCB0aGlzLnByb3BzXy5nZXQoJ21heFZhbHVlJyksIDAsIDEwMCksIDAsIDEwMCk7XG4gICAgICAgICAgICB0aGlzLmtub2JFbGVtZW50LnN0eWxlLndpZHRoID0gYCR7cH0lYDtcbiAgICAgICAgfVxuICAgICAgICBvbkNoYW5nZV8oKSB7XG4gICAgICAgICAgICB0aGlzLnVwZGF0ZV8oKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIGNsYXNzIFNsaWRlckNvbnRyb2xsZXIge1xuICAgICAgICBjb25zdHJ1Y3Rvcihkb2MsIGNvbmZpZykge1xuICAgICAgICAgICAgdGhpcy5vbktleURvd25fID0gdGhpcy5vbktleURvd25fLmJpbmQodGhpcyk7XG4gICAgICAgICAgICB0aGlzLm9uS2V5VXBfID0gdGhpcy5vbktleVVwXy5iaW5kKHRoaXMpO1xuICAgICAgICAgICAgdGhpcy5vblBvaW50ZXJEb3duT3JNb3ZlXyA9IHRoaXMub25Qb2ludGVyRG93bk9yTW92ZV8uYmluZCh0aGlzKTtcbiAgICAgICAgICAgIHRoaXMub25Qb2ludGVyVXBfID0gdGhpcy5vblBvaW50ZXJVcF8uYmluZCh0aGlzKTtcbiAgICAgICAgICAgIHRoaXMuYmFzZVN0ZXBfID0gY29uZmlnLmJhc2VTdGVwO1xuICAgICAgICAgICAgdGhpcy52YWx1ZSA9IGNvbmZpZy52YWx1ZTtcbiAgICAgICAgICAgIHRoaXMudmlld1Byb3BzID0gY29uZmlnLnZpZXdQcm9wcztcbiAgICAgICAgICAgIHRoaXMucHJvcHMgPSBjb25maWcucHJvcHM7XG4gICAgICAgICAgICB0aGlzLnZpZXcgPSBuZXcgU2xpZGVyVmlldyhkb2MsIHtcbiAgICAgICAgICAgICAgICBwcm9wczogdGhpcy5wcm9wcyxcbiAgICAgICAgICAgICAgICB2YWx1ZTogdGhpcy52YWx1ZSxcbiAgICAgICAgICAgICAgICB2aWV3UHJvcHM6IHRoaXMudmlld1Byb3BzLFxuICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB0aGlzLnB0SGFuZGxlcl8gPSBuZXcgUG9pbnRlckhhbmRsZXIodGhpcy52aWV3LnRyYWNrRWxlbWVudCk7XG4gICAgICAgICAgICB0aGlzLnB0SGFuZGxlcl8uZW1pdHRlci5vbignZG93bicsIHRoaXMub25Qb2ludGVyRG93bk9yTW92ZV8pO1xuICAgICAgICAgICAgdGhpcy5wdEhhbmRsZXJfLmVtaXR0ZXIub24oJ21vdmUnLCB0aGlzLm9uUG9pbnRlckRvd25Pck1vdmVfKTtcbiAgICAgICAgICAgIHRoaXMucHRIYW5kbGVyXy5lbWl0dGVyLm9uKCd1cCcsIHRoaXMub25Qb2ludGVyVXBfKTtcbiAgICAgICAgICAgIHRoaXMudmlldy50cmFja0VsZW1lbnQuYWRkRXZlbnRMaXN0ZW5lcigna2V5ZG93bicsIHRoaXMub25LZXlEb3duXyk7XG4gICAgICAgICAgICB0aGlzLnZpZXcudHJhY2tFbGVtZW50LmFkZEV2ZW50TGlzdGVuZXIoJ2tleXVwJywgdGhpcy5vbktleVVwXyk7XG4gICAgICAgIH1cbiAgICAgICAgaGFuZGxlUG9pbnRlckV2ZW50XyhkLCBvcHRzKSB7XG4gICAgICAgICAgICBpZiAoIWQucG9pbnQpIHtcbiAgICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICB0aGlzLnZhbHVlLnNldFJhd1ZhbHVlKG1hcFJhbmdlKGNvbnN0cmFpblJhbmdlKGQucG9pbnQueCwgMCwgZC5ib3VuZHMud2lkdGgpLCAwLCBkLmJvdW5kcy53aWR0aCwgdGhpcy5wcm9wcy5nZXQoJ21pblZhbHVlJyksIHRoaXMucHJvcHMuZ2V0KCdtYXhWYWx1ZScpKSwgb3B0cyk7XG4gICAgICAgIH1cbiAgICAgICAgb25Qb2ludGVyRG93bk9yTW92ZV8oZXYpIHtcbiAgICAgICAgICAgIHRoaXMuaGFuZGxlUG9pbnRlckV2ZW50Xyhldi5kYXRhLCB7XG4gICAgICAgICAgICAgICAgZm9yY2VFbWl0OiBmYWxzZSxcbiAgICAgICAgICAgICAgICBsYXN0OiBmYWxzZSxcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9XG4gICAgICAgIG9uUG9pbnRlclVwXyhldikge1xuICAgICAgICAgICAgdGhpcy5oYW5kbGVQb2ludGVyRXZlbnRfKGV2LmRhdGEsIHtcbiAgICAgICAgICAgICAgICBmb3JjZUVtaXQ6IHRydWUsXG4gICAgICAgICAgICAgICAgbGFzdDogdHJ1ZSxcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9XG4gICAgICAgIG9uS2V5RG93bl8oZXYpIHtcbiAgICAgICAgICAgIGNvbnN0IHN0ZXAgPSBnZXRTdGVwRm9yS2V5KHRoaXMuYmFzZVN0ZXBfLCBnZXRIb3Jpem9udGFsU3RlcEtleXMoZXYpKTtcbiAgICAgICAgICAgIGlmIChzdGVwID09PSAwKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgdGhpcy52YWx1ZS5zZXRSYXdWYWx1ZSh0aGlzLnZhbHVlLnJhd1ZhbHVlICsgc3RlcCwge1xuICAgICAgICAgICAgICAgIGZvcmNlRW1pdDogZmFsc2UsXG4gICAgICAgICAgICAgICAgbGFzdDogZmFsc2UsXG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfVxuICAgICAgICBvbktleVVwXyhldikge1xuICAgICAgICAgICAgY29uc3Qgc3RlcCA9IGdldFN0ZXBGb3JLZXkodGhpcy5iYXNlU3RlcF8sIGdldEhvcml6b250YWxTdGVwS2V5cyhldikpO1xuICAgICAgICAgICAgaWYgKHN0ZXAgPT09IDApIHtcbiAgICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICB0aGlzLnZhbHVlLnNldFJhd1ZhbHVlKHRoaXMudmFsdWUucmF3VmFsdWUsIHtcbiAgICAgICAgICAgICAgICBmb3JjZUVtaXQ6IHRydWUsXG4gICAgICAgICAgICAgICAgbGFzdDogdHJ1ZSxcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgY29uc3QgY2xhc3NOYW1lJGUgPSBDbGFzc05hbWUoJ3NsZHR4dCcpO1xuICAgIGNsYXNzIFNsaWRlclRleHRWaWV3IHtcbiAgICAgICAgY29uc3RydWN0b3IoZG9jLCBjb25maWcpIHtcbiAgICAgICAgICAgIHRoaXMuZWxlbWVudCA9IGRvYy5jcmVhdGVFbGVtZW50KCdkaXYnKTtcbiAgICAgICAgICAgIHRoaXMuZWxlbWVudC5jbGFzc0xpc3QuYWRkKGNsYXNzTmFtZSRlKCkpO1xuICAgICAgICAgICAgY29uc3Qgc2xpZGVyRWxlbSA9IGRvYy5jcmVhdGVFbGVtZW50KCdkaXYnKTtcbiAgICAgICAgICAgIHNsaWRlckVsZW0uY2xhc3NMaXN0LmFkZChjbGFzc05hbWUkZSgncycpKTtcbiAgICAgICAgICAgIHRoaXMuc2xpZGVyVmlld18gPSBjb25maWcuc2xpZGVyVmlldztcbiAgICAgICAgICAgIHNsaWRlckVsZW0uYXBwZW5kQ2hpbGQodGhpcy5zbGlkZXJWaWV3Xy5lbGVtZW50KTtcbiAgICAgICAgICAgIHRoaXMuZWxlbWVudC5hcHBlbmRDaGlsZChzbGlkZXJFbGVtKTtcbiAgICAgICAgICAgIGNvbnN0IHRleHRFbGVtID0gZG9jLmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xuICAgICAgICAgICAgdGV4dEVsZW0uY2xhc3NMaXN0LmFkZChjbGFzc05hbWUkZSgndCcpKTtcbiAgICAgICAgICAgIHRoaXMudGV4dFZpZXdfID0gY29uZmlnLnRleHRWaWV3O1xuICAgICAgICAgICAgdGV4dEVsZW0uYXBwZW5kQ2hpbGQodGhpcy50ZXh0Vmlld18uZWxlbWVudCk7XG4gICAgICAgICAgICB0aGlzLmVsZW1lbnQuYXBwZW5kQ2hpbGQodGV4dEVsZW0pO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgY2xhc3MgU2xpZGVyVGV4dENvbnRyb2xsZXIge1xuICAgICAgICBjb25zdHJ1Y3Rvcihkb2MsIGNvbmZpZykge1xuICAgICAgICAgICAgdGhpcy52YWx1ZSA9IGNvbmZpZy52YWx1ZTtcbiAgICAgICAgICAgIHRoaXMudmlld1Byb3BzID0gY29uZmlnLnZpZXdQcm9wcztcbiAgICAgICAgICAgIHRoaXMuc2xpZGVyQ18gPSBuZXcgU2xpZGVyQ29udHJvbGxlcihkb2MsIHtcbiAgICAgICAgICAgICAgICBiYXNlU3RlcDogY29uZmlnLmJhc2VTdGVwLFxuICAgICAgICAgICAgICAgIHByb3BzOiBjb25maWcuc2xpZGVyUHJvcHMsXG4gICAgICAgICAgICAgICAgdmFsdWU6IGNvbmZpZy52YWx1ZSxcbiAgICAgICAgICAgICAgICB2aWV3UHJvcHM6IHRoaXMudmlld1Byb3BzLFxuICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB0aGlzLnRleHRDXyA9IG5ldyBOdW1iZXJUZXh0Q29udHJvbGxlcihkb2MsIHtcbiAgICAgICAgICAgICAgICBiYXNlU3RlcDogY29uZmlnLmJhc2VTdGVwLFxuICAgICAgICAgICAgICAgIHBhcnNlcjogY29uZmlnLnBhcnNlcixcbiAgICAgICAgICAgICAgICBwcm9wczogY29uZmlnLnRleHRQcm9wcyxcbiAgICAgICAgICAgICAgICB2YWx1ZTogY29uZmlnLnZhbHVlLFxuICAgICAgICAgICAgICAgIHZpZXdQcm9wczogY29uZmlnLnZpZXdQcm9wcyxcbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgdGhpcy52aWV3ID0gbmV3IFNsaWRlclRleHRWaWV3KGRvYywge1xuICAgICAgICAgICAgICAgIHNsaWRlclZpZXc6IHRoaXMuc2xpZGVyQ18udmlldyxcbiAgICAgICAgICAgICAgICB0ZXh0VmlldzogdGhpcy50ZXh0Q18udmlldyxcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9XG4gICAgICAgIGdldCBzbGlkZXJDb250cm9sbGVyKCkge1xuICAgICAgICAgICAgcmV0dXJuIHRoaXMuc2xpZGVyQ187XG4gICAgICAgIH1cbiAgICAgICAgZ2V0IHRleHRDb250cm9sbGVyKCkge1xuICAgICAgICAgICAgcmV0dXJuIHRoaXMudGV4dENfO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gd3JpdGVQcmltaXRpdmUodGFyZ2V0LCB2YWx1ZSkge1xuICAgICAgICB0YXJnZXQud3JpdGUodmFsdWUpO1xuICAgIH1cblxuICAgIGZ1bmN0aW9uIHBhcnNlTGlzdE9wdGlvbnModmFsdWUpIHtcbiAgICAgICAgY29uc3QgcCA9IFBhcmFtc1BhcnNlcnM7XG4gICAgICAgIGlmIChBcnJheS5pc0FycmF5KHZhbHVlKSkge1xuICAgICAgICAgICAgcmV0dXJuIHAucmVxdWlyZWQuYXJyYXkocC5yZXF1aXJlZC5vYmplY3Qoe1xuICAgICAgICAgICAgICAgIHRleHQ6IHAucmVxdWlyZWQuc3RyaW5nLFxuICAgICAgICAgICAgICAgIHZhbHVlOiBwLnJlcXVpcmVkLnJhdyxcbiAgICAgICAgICAgIH0pKSh2YWx1ZSkudmFsdWU7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKHR5cGVvZiB2YWx1ZSA9PT0gJ29iamVjdCcpIHtcbiAgICAgICAgICAgIHJldHVybiBwLnJlcXVpcmVkLnJhdyh2YWx1ZSlcbiAgICAgICAgICAgICAgICAudmFsdWU7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHVuZGVmaW5lZDtcbiAgICB9XG4gICAgZnVuY3Rpb24gcGFyc2VQaWNrZXJMYXlvdXQodmFsdWUpIHtcbiAgICAgICAgaWYgKHZhbHVlID09PSAnaW5saW5lJyB8fCB2YWx1ZSA9PT0gJ3BvcHVwJykge1xuICAgICAgICAgICAgcmV0dXJuIHZhbHVlO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiB1bmRlZmluZWQ7XG4gICAgfVxuICAgIGZ1bmN0aW9uIHBhcnNlUG9pbnREaW1lbnNpb25QYXJhbXModmFsdWUpIHtcbiAgICAgICAgY29uc3QgcCA9IFBhcmFtc1BhcnNlcnM7XG4gICAgICAgIHJldHVybiBwLnJlcXVpcmVkLm9iamVjdCh7XG4gICAgICAgICAgICBtYXg6IHAub3B0aW9uYWwubnVtYmVyLFxuICAgICAgICAgICAgbWluOiBwLm9wdGlvbmFsLm51bWJlcixcbiAgICAgICAgICAgIHN0ZXA6IHAub3B0aW9uYWwubnVtYmVyLFxuICAgICAgICB9KSh2YWx1ZSkudmFsdWU7XG4gICAgfVxuICAgIGZ1bmN0aW9uIG5vcm1hbGl6ZUxpc3RPcHRpb25zKG9wdGlvbnMpIHtcbiAgICAgICAgaWYgKEFycmF5LmlzQXJyYXkob3B0aW9ucykpIHtcbiAgICAgICAgICAgIHJldHVybiBvcHRpb25zO1xuICAgICAgICB9XG4gICAgICAgIGNvbnN0IGl0ZW1zID0gW107XG4gICAgICAgIE9iamVjdC5rZXlzKG9wdGlvbnMpLmZvckVhY2goKHRleHQpID0+IHtcbiAgICAgICAgICAgIGl0ZW1zLnB1c2goeyB0ZXh0OiB0ZXh0LCB2YWx1ZTogb3B0aW9uc1t0ZXh0XSB9KTtcbiAgICAgICAgfSk7XG4gICAgICAgIHJldHVybiBpdGVtcztcbiAgICB9XG4gICAgZnVuY3Rpb24gY3JlYXRlTGlzdENvbnN0cmFpbnQob3B0aW9ucykge1xuICAgICAgICByZXR1cm4gIWlzRW1wdHkob3B0aW9ucylcbiAgICAgICAgICAgID8gbmV3IExpc3RDb25zdHJhaW50KG5vcm1hbGl6ZUxpc3RPcHRpb25zKGZvcmNlQ2FzdChvcHRpb25zKSkpXG4gICAgICAgICAgICA6IG51bGw7XG4gICAgfVxuICAgIGZ1bmN0aW9uIGZpbmRMaXN0SXRlbXMoY29uc3RyYWludCkge1xuICAgICAgICBjb25zdCBjID0gY29uc3RyYWludFxuICAgICAgICAgICAgPyBmaW5kQ29uc3RyYWludChjb25zdHJhaW50LCBMaXN0Q29uc3RyYWludClcbiAgICAgICAgICAgIDogbnVsbDtcbiAgICAgICAgaWYgKCFjKSB7XG4gICAgICAgICAgICByZXR1cm4gbnVsbDtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gYy5vcHRpb25zO1xuICAgIH1cbiAgICBmdW5jdGlvbiBmaW5kU3RlcChjb25zdHJhaW50KSB7XG4gICAgICAgIGNvbnN0IGMgPSBjb25zdHJhaW50ID8gZmluZENvbnN0cmFpbnQoY29uc3RyYWludCwgU3RlcENvbnN0cmFpbnQpIDogbnVsbDtcbiAgICAgICAgaWYgKCFjKSB7XG4gICAgICAgICAgICByZXR1cm4gbnVsbDtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gYy5zdGVwO1xuICAgIH1cbiAgICBmdW5jdGlvbiBnZXRTdWl0YWJsZURlY2ltYWxEaWdpdHMoY29uc3RyYWludCwgcmF3VmFsdWUpIHtcbiAgICAgICAgY29uc3Qgc2MgPSBjb25zdHJhaW50ICYmIGZpbmRDb25zdHJhaW50KGNvbnN0cmFpbnQsIFN0ZXBDb25zdHJhaW50KTtcbiAgICAgICAgaWYgKHNjKSB7XG4gICAgICAgICAgICByZXR1cm4gZ2V0RGVjaW1hbERpZ2l0cyhzYy5zdGVwKTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gTWF0aC5tYXgoZ2V0RGVjaW1hbERpZ2l0cyhyYXdWYWx1ZSksIDIpO1xuICAgIH1cbiAgICBmdW5jdGlvbiBnZXRCYXNlU3RlcChjb25zdHJhaW50KSB7XG4gICAgICAgIGNvbnN0IHN0ZXAgPSBmaW5kU3RlcChjb25zdHJhaW50KTtcbiAgICAgICAgcmV0dXJuIHN0ZXAgIT09IG51bGwgJiYgc3RlcCAhPT0gdm9pZCAwID8gc3RlcCA6IDE7XG4gICAgfVxuICAgIGZ1bmN0aW9uIGdldFN1aXRhYmxlRHJhZ2dpbmdTY2FsZShjb25zdHJhaW50LCByYXdWYWx1ZSkge1xuICAgICAgICB2YXIgX2E7XG4gICAgICAgIGNvbnN0IHNjID0gY29uc3RyYWludCAmJiBmaW5kQ29uc3RyYWludChjb25zdHJhaW50LCBTdGVwQ29uc3RyYWludCk7XG4gICAgICAgIGNvbnN0IGJhc2UgPSBNYXRoLmFicygoX2EgPSBzYyA9PT0gbnVsbCB8fCBzYyA9PT0gdm9pZCAwID8gdm9pZCAwIDogc2Muc3RlcCkgIT09IG51bGwgJiYgX2EgIT09IHZvaWQgMCA/IF9hIDogcmF3VmFsdWUpO1xuICAgICAgICByZXR1cm4gYmFzZSA9PT0gMCA/IDAuMSA6IE1hdGgucG93KDEwLCBNYXRoLmZsb29yKE1hdGgubG9nMTAoYmFzZSkpIC0gMSk7XG4gICAgfVxuXG4gICAgY29uc3QgY2xhc3NOYW1lJGQgPSBDbGFzc05hbWUoJ2NrYicpO1xuICAgIGNsYXNzIENoZWNrYm94VmlldyB7XG4gICAgICAgIGNvbnN0cnVjdG9yKGRvYywgY29uZmlnKSB7XG4gICAgICAgICAgICB0aGlzLm9uVmFsdWVDaGFuZ2VfID0gdGhpcy5vblZhbHVlQ2hhbmdlXy5iaW5kKHRoaXMpO1xuICAgICAgICAgICAgdGhpcy5lbGVtZW50ID0gZG9jLmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xuICAgICAgICAgICAgdGhpcy5lbGVtZW50LmNsYXNzTGlzdC5hZGQoY2xhc3NOYW1lJGQoKSk7XG4gICAgICAgICAgICBjb25maWcudmlld1Byb3BzLmJpbmRDbGFzc01vZGlmaWVycyh0aGlzLmVsZW1lbnQpO1xuICAgICAgICAgICAgY29uc3QgbGFiZWxFbGVtID0gZG9jLmNyZWF0ZUVsZW1lbnQoJ2xhYmVsJyk7XG4gICAgICAgICAgICBsYWJlbEVsZW0uY2xhc3NMaXN0LmFkZChjbGFzc05hbWUkZCgnbCcpKTtcbiAgICAgICAgICAgIHRoaXMuZWxlbWVudC5hcHBlbmRDaGlsZChsYWJlbEVsZW0pO1xuICAgICAgICAgICAgY29uc3QgaW5wdXRFbGVtID0gZG9jLmNyZWF0ZUVsZW1lbnQoJ2lucHV0Jyk7XG4gICAgICAgICAgICBpbnB1dEVsZW0uY2xhc3NMaXN0LmFkZChjbGFzc05hbWUkZCgnaScpKTtcbiAgICAgICAgICAgIGlucHV0RWxlbS50eXBlID0gJ2NoZWNrYm94JztcbiAgICAgICAgICAgIGxhYmVsRWxlbS5hcHBlbmRDaGlsZChpbnB1dEVsZW0pO1xuICAgICAgICAgICAgdGhpcy5pbnB1dEVsZW1lbnQgPSBpbnB1dEVsZW07XG4gICAgICAgICAgICBjb25maWcudmlld1Byb3BzLmJpbmREaXNhYmxlZCh0aGlzLmlucHV0RWxlbWVudCk7XG4gICAgICAgICAgICBjb25zdCB3cmFwcGVyRWxlbSA9IGRvYy5jcmVhdGVFbGVtZW50KCdkaXYnKTtcbiAgICAgICAgICAgIHdyYXBwZXJFbGVtLmNsYXNzTGlzdC5hZGQoY2xhc3NOYW1lJGQoJ3cnKSk7XG4gICAgICAgICAgICBsYWJlbEVsZW0uYXBwZW5kQ2hpbGQod3JhcHBlckVsZW0pO1xuICAgICAgICAgICAgY29uc3QgbWFya0VsZW0gPSBjcmVhdGVTdmdJY29uRWxlbWVudChkb2MsICdjaGVjaycpO1xuICAgICAgICAgICAgd3JhcHBlckVsZW0uYXBwZW5kQ2hpbGQobWFya0VsZW0pO1xuICAgICAgICAgICAgY29uZmlnLnZhbHVlLmVtaXR0ZXIub24oJ2NoYW5nZScsIHRoaXMub25WYWx1ZUNoYW5nZV8pO1xuICAgICAgICAgICAgdGhpcy52YWx1ZSA9IGNvbmZpZy52YWx1ZTtcbiAgICAgICAgICAgIHRoaXMudXBkYXRlXygpO1xuICAgICAgICB9XG4gICAgICAgIHVwZGF0ZV8oKSB7XG4gICAgICAgICAgICB0aGlzLmlucHV0RWxlbWVudC5jaGVja2VkID0gdGhpcy52YWx1ZS5yYXdWYWx1ZTtcbiAgICAgICAgfVxuICAgICAgICBvblZhbHVlQ2hhbmdlXygpIHtcbiAgICAgICAgICAgIHRoaXMudXBkYXRlXygpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgY2xhc3MgQ2hlY2tib3hDb250cm9sbGVyIHtcbiAgICAgICAgY29uc3RydWN0b3IoZG9jLCBjb25maWcpIHtcbiAgICAgICAgICAgIHRoaXMub25JbnB1dENoYW5nZV8gPSB0aGlzLm9uSW5wdXRDaGFuZ2VfLmJpbmQodGhpcyk7XG4gICAgICAgICAgICB0aGlzLnZhbHVlID0gY29uZmlnLnZhbHVlO1xuICAgICAgICAgICAgdGhpcy52aWV3UHJvcHMgPSBjb25maWcudmlld1Byb3BzO1xuICAgICAgICAgICAgdGhpcy52aWV3ID0gbmV3IENoZWNrYm94Vmlldyhkb2MsIHtcbiAgICAgICAgICAgICAgICB2YWx1ZTogdGhpcy52YWx1ZSxcbiAgICAgICAgICAgICAgICB2aWV3UHJvcHM6IHRoaXMudmlld1Byb3BzLFxuICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB0aGlzLnZpZXcuaW5wdXRFbGVtZW50LmFkZEV2ZW50TGlzdGVuZXIoJ2NoYW5nZScsIHRoaXMub25JbnB1dENoYW5nZV8pO1xuICAgICAgICB9XG4gICAgICAgIG9uSW5wdXRDaGFuZ2VfKGUpIHtcbiAgICAgICAgICAgIGNvbnN0IGlucHV0RWxlbSA9IGZvcmNlQ2FzdChlLmN1cnJlbnRUYXJnZXQpO1xuICAgICAgICAgICAgdGhpcy52YWx1ZS5yYXdWYWx1ZSA9IGlucHV0RWxlbS5jaGVja2VkO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gY3JlYXRlQ29uc3RyYWludCQ1KHBhcmFtcykge1xuICAgICAgICBjb25zdCBjb25zdHJhaW50cyA9IFtdO1xuICAgICAgICBjb25zdCBsYyA9IGNyZWF0ZUxpc3RDb25zdHJhaW50KHBhcmFtcy5vcHRpb25zKTtcbiAgICAgICAgaWYgKGxjKSB7XG4gICAgICAgICAgICBjb25zdHJhaW50cy5wdXNoKGxjKTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gbmV3IENvbXBvc2l0ZUNvbnN0cmFpbnQoY29uc3RyYWludHMpO1xuICAgIH1cbiAgICBjb25zdCBCb29sZWFuSW5wdXRQbHVnaW4gPSB7XG4gICAgICAgIGlkOiAnaW5wdXQtYm9vbCcsXG4gICAgICAgIHR5cGU6ICdpbnB1dCcsXG4gICAgICAgIGFjY2VwdDogKHZhbHVlLCBwYXJhbXMpID0+IHtcbiAgICAgICAgICAgIGlmICh0eXBlb2YgdmFsdWUgIT09ICdib29sZWFuJykge1xuICAgICAgICAgICAgICAgIHJldHVybiBudWxsO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgY29uc3QgcCA9IFBhcmFtc1BhcnNlcnM7XG4gICAgICAgICAgICBjb25zdCByZXN1bHQgPSBwYXJzZVBhcmFtcyhwYXJhbXMsIHtcbiAgICAgICAgICAgICAgICBvcHRpb25zOiBwLm9wdGlvbmFsLmN1c3RvbShwYXJzZUxpc3RPcHRpb25zKSxcbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgcmV0dXJuIHJlc3VsdFxuICAgICAgICAgICAgICAgID8ge1xuICAgICAgICAgICAgICAgICAgICBpbml0aWFsVmFsdWU6IHZhbHVlLFxuICAgICAgICAgICAgICAgICAgICBwYXJhbXM6IHJlc3VsdCxcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgOiBudWxsO1xuICAgICAgICB9LFxuICAgICAgICBiaW5kaW5nOiB7XG4gICAgICAgICAgICByZWFkZXI6IChfYXJncykgPT4gYm9vbEZyb21Vbmtub3duLFxuICAgICAgICAgICAgY29uc3RyYWludDogKGFyZ3MpID0+IGNyZWF0ZUNvbnN0cmFpbnQkNShhcmdzLnBhcmFtcyksXG4gICAgICAgICAgICB3cml0ZXI6IChfYXJncykgPT4gd3JpdGVQcmltaXRpdmUsXG4gICAgICAgIH0sXG4gICAgICAgIGNvbnRyb2xsZXI6IChhcmdzKSA9PiB7XG4gICAgICAgICAgICB2YXIgX2E7XG4gICAgICAgICAgICBjb25zdCBkb2MgPSBhcmdzLmRvY3VtZW50O1xuICAgICAgICAgICAgY29uc3QgdmFsdWUgPSBhcmdzLnZhbHVlO1xuICAgICAgICAgICAgY29uc3QgYyA9IGFyZ3MuY29uc3RyYWludDtcbiAgICAgICAgICAgIGlmIChjICYmIGZpbmRDb25zdHJhaW50KGMsIExpc3RDb25zdHJhaW50KSkge1xuICAgICAgICAgICAgICAgIHJldHVybiBuZXcgTGlzdENvbnRyb2xsZXIoZG9jLCB7XG4gICAgICAgICAgICAgICAgICAgIHByb3BzOiBWYWx1ZU1hcC5mcm9tT2JqZWN0KHtcbiAgICAgICAgICAgICAgICAgICAgICAgIG9wdGlvbnM6IChfYSA9IGZpbmRMaXN0SXRlbXMoYykpICE9PSBudWxsICYmIF9hICE9PSB2b2lkIDAgPyBfYSA6IFtdLFxuICAgICAgICAgICAgICAgICAgICB9KSxcbiAgICAgICAgICAgICAgICAgICAgdmFsdWU6IHZhbHVlLFxuICAgICAgICAgICAgICAgICAgICB2aWV3UHJvcHM6IGFyZ3Mudmlld1Byb3BzLFxuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgcmV0dXJuIG5ldyBDaGVja2JveENvbnRyb2xsZXIoZG9jLCB7XG4gICAgICAgICAgICAgICAgdmFsdWU6IHZhbHVlLFxuICAgICAgICAgICAgICAgIHZpZXdQcm9wczogYXJncy52aWV3UHJvcHMsXG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfSxcbiAgICB9O1xuXG4gICAgY29uc3QgY2xhc3NOYW1lJGMgPSBDbGFzc05hbWUoJ2NvbCcpO1xuICAgIGNsYXNzIENvbG9yVmlldyB7XG4gICAgICAgIGNvbnN0cnVjdG9yKGRvYywgY29uZmlnKSB7XG4gICAgICAgICAgICB0aGlzLmVsZW1lbnQgPSBkb2MuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XG4gICAgICAgICAgICB0aGlzLmVsZW1lbnQuY2xhc3NMaXN0LmFkZChjbGFzc05hbWUkYygpKTtcbiAgICAgICAgICAgIGNvbmZpZy5mb2xkYWJsZS5iaW5kRXhwYW5kZWRDbGFzcyh0aGlzLmVsZW1lbnQsIGNsYXNzTmFtZSRjKHVuZGVmaW5lZCwgJ2V4cGFuZGVkJykpO1xuICAgICAgICAgICAgYmluZFZhbHVlTWFwKGNvbmZpZy5mb2xkYWJsZSwgJ2NvbXBsZXRlZCcsIHZhbHVlVG9DbGFzc05hbWUodGhpcy5lbGVtZW50LCBjbGFzc05hbWUkYyh1bmRlZmluZWQsICdjcGwnKSkpO1xuICAgICAgICAgICAgY29uc3QgaGVhZEVsZW0gPSBkb2MuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XG4gICAgICAgICAgICBoZWFkRWxlbS5jbGFzc0xpc3QuYWRkKGNsYXNzTmFtZSRjKCdoJykpO1xuICAgICAgICAgICAgdGhpcy5lbGVtZW50LmFwcGVuZENoaWxkKGhlYWRFbGVtKTtcbiAgICAgICAgICAgIGNvbnN0IHN3YXRjaEVsZW0gPSBkb2MuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XG4gICAgICAgICAgICBzd2F0Y2hFbGVtLmNsYXNzTGlzdC5hZGQoY2xhc3NOYW1lJGMoJ3MnKSk7XG4gICAgICAgICAgICBoZWFkRWxlbS5hcHBlbmRDaGlsZChzd2F0Y2hFbGVtKTtcbiAgICAgICAgICAgIHRoaXMuc3dhdGNoRWxlbWVudCA9IHN3YXRjaEVsZW07XG4gICAgICAgICAgICBjb25zdCB0ZXh0RWxlbSA9IGRvYy5jcmVhdGVFbGVtZW50KCdkaXYnKTtcbiAgICAgICAgICAgIHRleHRFbGVtLmNsYXNzTGlzdC5hZGQoY2xhc3NOYW1lJGMoJ3QnKSk7XG4gICAgICAgICAgICBoZWFkRWxlbS5hcHBlbmRDaGlsZCh0ZXh0RWxlbSk7XG4gICAgICAgICAgICB0aGlzLnRleHRFbGVtZW50ID0gdGV4dEVsZW07XG4gICAgICAgICAgICBpZiAoY29uZmlnLnBpY2tlckxheW91dCA9PT0gJ2lubGluZScpIHtcbiAgICAgICAgICAgICAgICBjb25zdCBwaWNrZXJFbGVtID0gZG9jLmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xuICAgICAgICAgICAgICAgIHBpY2tlckVsZW0uY2xhc3NMaXN0LmFkZChjbGFzc05hbWUkYygncCcpKTtcbiAgICAgICAgICAgICAgICB0aGlzLmVsZW1lbnQuYXBwZW5kQ2hpbGQocGlja2VyRWxlbSk7XG4gICAgICAgICAgICAgICAgdGhpcy5waWNrZXJFbGVtZW50ID0gcGlja2VyRWxlbTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgIHRoaXMucGlja2VyRWxlbWVudCA9IG51bGw7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBmdW5jdGlvbiByZ2JUb0hzbChyLCBnLCBiKSB7XG4gICAgICAgIGNvbnN0IHJwID0gY29uc3RyYWluUmFuZ2UociAvIDI1NSwgMCwgMSk7XG4gICAgICAgIGNvbnN0IGdwID0gY29uc3RyYWluUmFuZ2UoZyAvIDI1NSwgMCwgMSk7XG4gICAgICAgIGNvbnN0IGJwID0gY29uc3RyYWluUmFuZ2UoYiAvIDI1NSwgMCwgMSk7XG4gICAgICAgIGNvbnN0IGNtYXggPSBNYXRoLm1heChycCwgZ3AsIGJwKTtcbiAgICAgICAgY29uc3QgY21pbiA9IE1hdGgubWluKHJwLCBncCwgYnApO1xuICAgICAgICBjb25zdCBjID0gY21heCAtIGNtaW47XG4gICAgICAgIGxldCBoID0gMDtcbiAgICAgICAgbGV0IHMgPSAwO1xuICAgICAgICBjb25zdCBsID0gKGNtaW4gKyBjbWF4KSAvIDI7XG4gICAgICAgIGlmIChjICE9PSAwKSB7XG4gICAgICAgICAgICBzID0gYyAvICgxIC0gTWF0aC5hYnMoY21heCArIGNtaW4gLSAxKSk7XG4gICAgICAgICAgICBpZiAocnAgPT09IGNtYXgpIHtcbiAgICAgICAgICAgICAgICBoID0gKGdwIC0gYnApIC8gYztcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGVsc2UgaWYgKGdwID09PSBjbWF4KSB7XG4gICAgICAgICAgICAgICAgaCA9IDIgKyAoYnAgLSBycCkgLyBjO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgaCA9IDQgKyAocnAgLSBncCkgLyBjO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaCA9IGggLyA2ICsgKGggPCAwID8gMSA6IDApO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiBbaCAqIDM2MCwgcyAqIDEwMCwgbCAqIDEwMF07XG4gICAgfVxuICAgIGZ1bmN0aW9uIGhzbFRvUmdiKGgsIHMsIGwpIHtcbiAgICAgICAgY29uc3QgaHAgPSAoKGggJSAzNjApICsgMzYwKSAlIDM2MDtcbiAgICAgICAgY29uc3Qgc3AgPSBjb25zdHJhaW5SYW5nZShzIC8gMTAwLCAwLCAxKTtcbiAgICAgICAgY29uc3QgbHAgPSBjb25zdHJhaW5SYW5nZShsIC8gMTAwLCAwLCAxKTtcbiAgICAgICAgY29uc3QgYyA9ICgxIC0gTWF0aC5hYnMoMiAqIGxwIC0gMSkpICogc3A7XG4gICAgICAgIGNvbnN0IHggPSBjICogKDEgLSBNYXRoLmFicygoKGhwIC8gNjApICUgMikgLSAxKSk7XG4gICAgICAgIGNvbnN0IG0gPSBscCAtIGMgLyAyO1xuICAgICAgICBsZXQgcnAsIGdwLCBicDtcbiAgICAgICAgaWYgKGhwID49IDAgJiYgaHAgPCA2MCkge1xuICAgICAgICAgICAgW3JwLCBncCwgYnBdID0gW2MsIHgsIDBdO1xuICAgICAgICB9XG4gICAgICAgIGVsc2UgaWYgKGhwID49IDYwICYmIGhwIDwgMTIwKSB7XG4gICAgICAgICAgICBbcnAsIGdwLCBicF0gPSBbeCwgYywgMF07XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSBpZiAoaHAgPj0gMTIwICYmIGhwIDwgMTgwKSB7XG4gICAgICAgICAgICBbcnAsIGdwLCBicF0gPSBbMCwgYywgeF07XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSBpZiAoaHAgPj0gMTgwICYmIGhwIDwgMjQwKSB7XG4gICAgICAgICAgICBbcnAsIGdwLCBicF0gPSBbMCwgeCwgY107XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSBpZiAoaHAgPj0gMjQwICYmIGhwIDwgMzAwKSB7XG4gICAgICAgICAgICBbcnAsIGdwLCBicF0gPSBbeCwgMCwgY107XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICBbcnAsIGdwLCBicF0gPSBbYywgMCwgeF07XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIFsocnAgKyBtKSAqIDI1NSwgKGdwICsgbSkgKiAyNTUsIChicCArIG0pICogMjU1XTtcbiAgICB9XG4gICAgZnVuY3Rpb24gcmdiVG9Ic3YociwgZywgYikge1xuICAgICAgICBjb25zdCBycCA9IGNvbnN0cmFpblJhbmdlKHIgLyAyNTUsIDAsIDEpO1xuICAgICAgICBjb25zdCBncCA9IGNvbnN0cmFpblJhbmdlKGcgLyAyNTUsIDAsIDEpO1xuICAgICAgICBjb25zdCBicCA9IGNvbnN0cmFpblJhbmdlKGIgLyAyNTUsIDAsIDEpO1xuICAgICAgICBjb25zdCBjbWF4ID0gTWF0aC5tYXgocnAsIGdwLCBicCk7XG4gICAgICAgIGNvbnN0IGNtaW4gPSBNYXRoLm1pbihycCwgZ3AsIGJwKTtcbiAgICAgICAgY29uc3QgZCA9IGNtYXggLSBjbWluO1xuICAgICAgICBsZXQgaDtcbiAgICAgICAgaWYgKGQgPT09IDApIHtcbiAgICAgICAgICAgIGggPSAwO1xuICAgICAgICB9XG4gICAgICAgIGVsc2UgaWYgKGNtYXggPT09IHJwKSB7XG4gICAgICAgICAgICBoID0gNjAgKiAoKCgoKGdwIC0gYnApIC8gZCkgJSA2KSArIDYpICUgNik7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSBpZiAoY21heCA9PT0gZ3ApIHtcbiAgICAgICAgICAgIGggPSA2MCAqICgoYnAgLSBycCkgLyBkICsgMik7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICBoID0gNjAgKiAoKHJwIC0gZ3ApIC8gZCArIDQpO1xuICAgICAgICB9XG4gICAgICAgIGNvbnN0IHMgPSBjbWF4ID09PSAwID8gMCA6IGQgLyBjbWF4O1xuICAgICAgICBjb25zdCB2ID0gY21heDtcbiAgICAgICAgcmV0dXJuIFtoLCBzICogMTAwLCB2ICogMTAwXTtcbiAgICB9XG4gICAgZnVuY3Rpb24gaHN2VG9SZ2IoaCwgcywgdikge1xuICAgICAgICBjb25zdCBocCA9IGxvb3BSYW5nZShoLCAzNjApO1xuICAgICAgICBjb25zdCBzcCA9IGNvbnN0cmFpblJhbmdlKHMgLyAxMDAsIDAsIDEpO1xuICAgICAgICBjb25zdCB2cCA9IGNvbnN0cmFpblJhbmdlKHYgLyAxMDAsIDAsIDEpO1xuICAgICAgICBjb25zdCBjID0gdnAgKiBzcDtcbiAgICAgICAgY29uc3QgeCA9IGMgKiAoMSAtIE1hdGguYWJzKCgoaHAgLyA2MCkgJSAyKSAtIDEpKTtcbiAgICAgICAgY29uc3QgbSA9IHZwIC0gYztcbiAgICAgICAgbGV0IHJwLCBncCwgYnA7XG4gICAgICAgIGlmIChocCA+PSAwICYmIGhwIDwgNjApIHtcbiAgICAgICAgICAgIFtycCwgZ3AsIGJwXSA9IFtjLCB4LCAwXTtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIGlmIChocCA+PSA2MCAmJiBocCA8IDEyMCkge1xuICAgICAgICAgICAgW3JwLCBncCwgYnBdID0gW3gsIGMsIDBdO1xuICAgICAgICB9XG4gICAgICAgIGVsc2UgaWYgKGhwID49IDEyMCAmJiBocCA8IDE4MCkge1xuICAgICAgICAgICAgW3JwLCBncCwgYnBdID0gWzAsIGMsIHhdO1xuICAgICAgICB9XG4gICAgICAgIGVsc2UgaWYgKGhwID49IDE4MCAmJiBocCA8IDI0MCkge1xuICAgICAgICAgICAgW3JwLCBncCwgYnBdID0gWzAsIHgsIGNdO1xuICAgICAgICB9XG4gICAgICAgIGVsc2UgaWYgKGhwID49IDI0MCAmJiBocCA8IDMwMCkge1xuICAgICAgICAgICAgW3JwLCBncCwgYnBdID0gW3gsIDAsIGNdO1xuICAgICAgICB9XG4gICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgW3JwLCBncCwgYnBdID0gW2MsIDAsIHhdO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiBbKHJwICsgbSkgKiAyNTUsIChncCArIG0pICogMjU1LCAoYnAgKyBtKSAqIDI1NV07XG4gICAgfVxuICAgIGZ1bmN0aW9uIGhzbFRvSHN2KGgsIHMsIGwpIHtcbiAgICAgICAgY29uc3Qgc2QgPSBsICsgKHMgKiAoMTAwIC0gTWF0aC5hYnMoMiAqIGwgLSAxMDApKSkgLyAoMiAqIDEwMCk7XG4gICAgICAgIHJldHVybiBbXG4gICAgICAgICAgICBoLFxuICAgICAgICAgICAgc2QgIT09IDAgPyAocyAqICgxMDAgLSBNYXRoLmFicygyICogbCAtIDEwMCkpKSAvIHNkIDogMCxcbiAgICAgICAgICAgIGwgKyAocyAqICgxMDAgLSBNYXRoLmFicygyICogbCAtIDEwMCkpKSAvICgyICogMTAwKSxcbiAgICAgICAgXTtcbiAgICB9XG4gICAgZnVuY3Rpb24gaHN2VG9Ic2woaCwgcywgdikge1xuICAgICAgICBjb25zdCBzZCA9IDEwMCAtIE1hdGguYWJzKCh2ICogKDIwMCAtIHMpKSAvIDEwMCAtIDEwMCk7XG4gICAgICAgIHJldHVybiBbaCwgc2QgIT09IDAgPyAocyAqIHYpIC8gc2QgOiAwLCAodiAqICgyMDAgLSBzKSkgLyAoMiAqIDEwMCldO1xuICAgIH1cbiAgICBmdW5jdGlvbiByZW1vdmVBbHBoYUNvbXBvbmVudChjb21wcykge1xuICAgICAgICByZXR1cm4gW2NvbXBzWzBdLCBjb21wc1sxXSwgY29tcHNbMl1dO1xuICAgIH1cbiAgICBmdW5jdGlvbiBhcHBlbmRBbHBoYUNvbXBvbmVudChjb21wcywgYWxwaGEpIHtcbiAgICAgICAgcmV0dXJuIFtjb21wc1swXSwgY29tcHNbMV0sIGNvbXBzWzJdLCBhbHBoYV07XG4gICAgfVxuICAgIGNvbnN0IE1PREVfQ09OVkVSVEVSX01BUCA9IHtcbiAgICAgICAgaHNsOiB7XG4gICAgICAgICAgICBoc2w6IChoLCBzLCBsKSA9PiBbaCwgcywgbF0sXG4gICAgICAgICAgICBoc3Y6IGhzbFRvSHN2LFxuICAgICAgICAgICAgcmdiOiBoc2xUb1JnYixcbiAgICAgICAgfSxcbiAgICAgICAgaHN2OiB7XG4gICAgICAgICAgICBoc2w6IGhzdlRvSHNsLFxuICAgICAgICAgICAgaHN2OiAoaCwgcywgdikgPT4gW2gsIHMsIHZdLFxuICAgICAgICAgICAgcmdiOiBoc3ZUb1JnYixcbiAgICAgICAgfSxcbiAgICAgICAgcmdiOiB7XG4gICAgICAgICAgICBoc2w6IHJnYlRvSHNsLFxuICAgICAgICAgICAgaHN2OiByZ2JUb0hzdixcbiAgICAgICAgICAgIHJnYjogKHIsIGcsIGIpID0+IFtyLCBnLCBiXSxcbiAgICAgICAgfSxcbiAgICB9O1xuICAgIGZ1bmN0aW9uIGNvbnZlcnRDb2xvck1vZGUoY29tcG9uZW50cywgZnJvbU1vZGUsIHRvTW9kZSkge1xuICAgICAgICByZXR1cm4gTU9ERV9DT05WRVJURVJfTUFQW2Zyb21Nb2RlXVt0b01vZGVdKC4uLmNvbXBvbmVudHMpO1xuICAgIH1cblxuICAgIGNvbnN0IENPTlNUUkFJTlRfTUFQID0ge1xuICAgICAgICBoc2w6IChjb21wcykgPT4ge1xuICAgICAgICAgICAgdmFyIF9hO1xuICAgICAgICAgICAgcmV0dXJuIFtcbiAgICAgICAgICAgICAgICBsb29wUmFuZ2UoY29tcHNbMF0sIDM2MCksXG4gICAgICAgICAgICAgICAgY29uc3RyYWluUmFuZ2UoY29tcHNbMV0sIDAsIDEwMCksXG4gICAgICAgICAgICAgICAgY29uc3RyYWluUmFuZ2UoY29tcHNbMl0sIDAsIDEwMCksXG4gICAgICAgICAgICAgICAgY29uc3RyYWluUmFuZ2UoKF9hID0gY29tcHNbM10pICE9PSBudWxsICYmIF9hICE9PSB2b2lkIDAgPyBfYSA6IDEsIDAsIDEpLFxuICAgICAgICAgICAgXTtcbiAgICAgICAgfSxcbiAgICAgICAgaHN2OiAoY29tcHMpID0+IHtcbiAgICAgICAgICAgIHZhciBfYTtcbiAgICAgICAgICAgIHJldHVybiBbXG4gICAgICAgICAgICAgICAgbG9vcFJhbmdlKGNvbXBzWzBdLCAzNjApLFxuICAgICAgICAgICAgICAgIGNvbnN0cmFpblJhbmdlKGNvbXBzWzFdLCAwLCAxMDApLFxuICAgICAgICAgICAgICAgIGNvbnN0cmFpblJhbmdlKGNvbXBzWzJdLCAwLCAxMDApLFxuICAgICAgICAgICAgICAgIGNvbnN0cmFpblJhbmdlKChfYSA9IGNvbXBzWzNdKSAhPT0gbnVsbCAmJiBfYSAhPT0gdm9pZCAwID8gX2EgOiAxLCAwLCAxKSxcbiAgICAgICAgICAgIF07XG4gICAgICAgIH0sXG4gICAgICAgIHJnYjogKGNvbXBzKSA9PiB7XG4gICAgICAgICAgICB2YXIgX2E7XG4gICAgICAgICAgICByZXR1cm4gW1xuICAgICAgICAgICAgICAgIGNvbnN0cmFpblJhbmdlKGNvbXBzWzBdLCAwLCAyNTUpLFxuICAgICAgICAgICAgICAgIGNvbnN0cmFpblJhbmdlKGNvbXBzWzFdLCAwLCAyNTUpLFxuICAgICAgICAgICAgICAgIGNvbnN0cmFpblJhbmdlKGNvbXBzWzJdLCAwLCAyNTUpLFxuICAgICAgICAgICAgICAgIGNvbnN0cmFpblJhbmdlKChfYSA9IGNvbXBzWzNdKSAhPT0gbnVsbCAmJiBfYSAhPT0gdm9pZCAwID8gX2EgOiAxLCAwLCAxKSxcbiAgICAgICAgICAgIF07XG4gICAgICAgIH0sXG4gICAgfTtcbiAgICBmdW5jdGlvbiBpc1JnYkNvbG9yQ29tcG9uZW50KG9iaiwga2V5KSB7XG4gICAgICAgIGlmICh0eXBlb2Ygb2JqICE9PSAnb2JqZWN0JyB8fCBpc0VtcHR5KG9iaikpIHtcbiAgICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4ga2V5IGluIG9iaiAmJiB0eXBlb2Ygb2JqW2tleV0gPT09ICdudW1iZXInO1xuICAgIH1cbiAgICBjbGFzcyBDb2xvciB7XG4gICAgICAgIGNvbnN0cnVjdG9yKGNvbXBzLCBtb2RlKSB7XG4gICAgICAgICAgICB0aGlzLm1vZGVfID0gbW9kZTtcbiAgICAgICAgICAgIHRoaXMuY29tcHNfID0gQ09OU1RSQUlOVF9NQVBbbW9kZV0oY29tcHMpO1xuICAgICAgICB9XG4gICAgICAgIHN0YXRpYyBibGFjaygpIHtcbiAgICAgICAgICAgIHJldHVybiBuZXcgQ29sb3IoWzAsIDAsIDBdLCAncmdiJyk7XG4gICAgICAgIH1cbiAgICAgICAgc3RhdGljIGZyb21PYmplY3Qob2JqKSB7XG4gICAgICAgICAgICBjb25zdCBjb21wcyA9ICdhJyBpbiBvYmogPyBbb2JqLnIsIG9iai5nLCBvYmouYiwgb2JqLmFdIDogW29iai5yLCBvYmouZywgb2JqLmJdO1xuICAgICAgICAgICAgcmV0dXJuIG5ldyBDb2xvcihjb21wcywgJ3JnYicpO1xuICAgICAgICB9XG4gICAgICAgIHN0YXRpYyB0b1JnYmFPYmplY3QoY29sb3IpIHtcbiAgICAgICAgICAgIHJldHVybiBjb2xvci50b1JnYmFPYmplY3QoKTtcbiAgICAgICAgfVxuICAgICAgICBzdGF0aWMgaXNSZ2JDb2xvck9iamVjdChvYmopIHtcbiAgICAgICAgICAgIHJldHVybiAoaXNSZ2JDb2xvckNvbXBvbmVudChvYmosICdyJykgJiZcbiAgICAgICAgICAgICAgICBpc1JnYkNvbG9yQ29tcG9uZW50KG9iaiwgJ2cnKSAmJlxuICAgICAgICAgICAgICAgIGlzUmdiQ29sb3JDb21wb25lbnQob2JqLCAnYicpKTtcbiAgICAgICAgfVxuICAgICAgICBzdGF0aWMgaXNSZ2JhQ29sb3JPYmplY3Qob2JqKSB7XG4gICAgICAgICAgICByZXR1cm4gdGhpcy5pc1JnYkNvbG9yT2JqZWN0KG9iaikgJiYgaXNSZ2JDb2xvckNvbXBvbmVudChvYmosICdhJyk7XG4gICAgICAgIH1cbiAgICAgICAgc3RhdGljIGlzQ29sb3JPYmplY3Qob2JqKSB7XG4gICAgICAgICAgICByZXR1cm4gdGhpcy5pc1JnYkNvbG9yT2JqZWN0KG9iaik7XG4gICAgICAgIH1cbiAgICAgICAgc3RhdGljIGVxdWFscyh2MSwgdjIpIHtcbiAgICAgICAgICAgIGlmICh2MS5tb2RlXyAhPT0gdjIubW9kZV8pIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBjb25zdCBjb21wczEgPSB2MS5jb21wc187XG4gICAgICAgICAgICBjb25zdCBjb21wczIgPSB2Mi5jb21wc187XG4gICAgICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IGNvbXBzMS5sZW5ndGg7IGkrKykge1xuICAgICAgICAgICAgICAgIGlmIChjb21wczFbaV0gIT09IGNvbXBzMltpXSkge1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICAgIH1cbiAgICAgICAgZ2V0IG1vZGUoKSB7XG4gICAgICAgICAgICByZXR1cm4gdGhpcy5tb2RlXztcbiAgICAgICAgfVxuICAgICAgICBnZXRDb21wb25lbnRzKG9wdF9tb2RlKSB7XG4gICAgICAgICAgICByZXR1cm4gYXBwZW5kQWxwaGFDb21wb25lbnQoY29udmVydENvbG9yTW9kZShyZW1vdmVBbHBoYUNvbXBvbmVudCh0aGlzLmNvbXBzXyksIHRoaXMubW9kZV8sIG9wdF9tb2RlIHx8IHRoaXMubW9kZV8pLCB0aGlzLmNvbXBzX1szXSk7XG4gICAgICAgIH1cbiAgICAgICAgdG9SZ2JhT2JqZWN0KCkge1xuICAgICAgICAgICAgY29uc3QgcmdiQ29tcHMgPSB0aGlzLmdldENvbXBvbmVudHMoJ3JnYicpO1xuICAgICAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgICAgICByOiByZ2JDb21wc1swXSxcbiAgICAgICAgICAgICAgICBnOiByZ2JDb21wc1sxXSxcbiAgICAgICAgICAgICAgICBiOiByZ2JDb21wc1syXSxcbiAgICAgICAgICAgICAgICBhOiByZ2JDb21wc1szXSxcbiAgICAgICAgICAgIH07XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBjb25zdCBjbGFzc05hbWUkYiA9IENsYXNzTmFtZSgnY29scCcpO1xuICAgIGNsYXNzIENvbG9yUGlja2VyVmlldyB7XG4gICAgICAgIGNvbnN0cnVjdG9yKGRvYywgY29uZmlnKSB7XG4gICAgICAgICAgICB0aGlzLmFscGhhVmlld3NfID0gbnVsbDtcbiAgICAgICAgICAgIHRoaXMuZWxlbWVudCA9IGRvYy5jcmVhdGVFbGVtZW50KCdkaXYnKTtcbiAgICAgICAgICAgIHRoaXMuZWxlbWVudC5jbGFzc0xpc3QuYWRkKGNsYXNzTmFtZSRiKCkpO1xuICAgICAgICAgICAgY29uc3QgaHN2RWxlbSA9IGRvYy5jcmVhdGVFbGVtZW50KCdkaXYnKTtcbiAgICAgICAgICAgIGhzdkVsZW0uY2xhc3NMaXN0LmFkZChjbGFzc05hbWUkYignaHN2JykpO1xuICAgICAgICAgICAgY29uc3Qgc3ZFbGVtID0gZG9jLmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xuICAgICAgICAgICAgc3ZFbGVtLmNsYXNzTGlzdC5hZGQoY2xhc3NOYW1lJGIoJ3N2JykpO1xuICAgICAgICAgICAgdGhpcy5zdlBhbGV0dGVWaWV3XyA9IGNvbmZpZy5zdlBhbGV0dGVWaWV3O1xuICAgICAgICAgICAgc3ZFbGVtLmFwcGVuZENoaWxkKHRoaXMuc3ZQYWxldHRlVmlld18uZWxlbWVudCk7XG4gICAgICAgICAgICBoc3ZFbGVtLmFwcGVuZENoaWxkKHN2RWxlbSk7XG4gICAgICAgICAgICBjb25zdCBoRWxlbSA9IGRvYy5jcmVhdGVFbGVtZW50KCdkaXYnKTtcbiAgICAgICAgICAgIGhFbGVtLmNsYXNzTGlzdC5hZGQoY2xhc3NOYW1lJGIoJ2gnKSk7XG4gICAgICAgICAgICB0aGlzLmhQYWxldHRlVmlld18gPSBjb25maWcuaFBhbGV0dGVWaWV3O1xuICAgICAgICAgICAgaEVsZW0uYXBwZW5kQ2hpbGQodGhpcy5oUGFsZXR0ZVZpZXdfLmVsZW1lbnQpO1xuICAgICAgICAgICAgaHN2RWxlbS5hcHBlbmRDaGlsZChoRWxlbSk7XG4gICAgICAgICAgICB0aGlzLmVsZW1lbnQuYXBwZW5kQ2hpbGQoaHN2RWxlbSk7XG4gICAgICAgICAgICBjb25zdCByZ2JFbGVtID0gZG9jLmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xuICAgICAgICAgICAgcmdiRWxlbS5jbGFzc0xpc3QuYWRkKGNsYXNzTmFtZSRiKCdyZ2InKSk7XG4gICAgICAgICAgICB0aGlzLnRleHRWaWV3XyA9IGNvbmZpZy50ZXh0VmlldztcbiAgICAgICAgICAgIHJnYkVsZW0uYXBwZW5kQ2hpbGQodGhpcy50ZXh0Vmlld18uZWxlbWVudCk7XG4gICAgICAgICAgICB0aGlzLmVsZW1lbnQuYXBwZW5kQ2hpbGQocmdiRWxlbSk7XG4gICAgICAgICAgICBpZiAoY29uZmlnLmFscGhhVmlld3MpIHtcbiAgICAgICAgICAgICAgICB0aGlzLmFscGhhVmlld3NfID0ge1xuICAgICAgICAgICAgICAgICAgICBwYWxldHRlOiBjb25maWcuYWxwaGFWaWV3cy5wYWxldHRlLFxuICAgICAgICAgICAgICAgICAgICB0ZXh0OiBjb25maWcuYWxwaGFWaWV3cy50ZXh0LFxuICAgICAgICAgICAgICAgIH07XG4gICAgICAgICAgICAgICAgY29uc3QgYUVsZW0gPSBkb2MuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XG4gICAgICAgICAgICAgICAgYUVsZW0uY2xhc3NMaXN0LmFkZChjbGFzc05hbWUkYignYScpKTtcbiAgICAgICAgICAgICAgICBjb25zdCBhcEVsZW0gPSBkb2MuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XG4gICAgICAgICAgICAgICAgYXBFbGVtLmNsYXNzTGlzdC5hZGQoY2xhc3NOYW1lJGIoJ2FwJykpO1xuICAgICAgICAgICAgICAgIGFwRWxlbS5hcHBlbmRDaGlsZCh0aGlzLmFscGhhVmlld3NfLnBhbGV0dGUuZWxlbWVudCk7XG4gICAgICAgICAgICAgICAgYUVsZW0uYXBwZW5kQ2hpbGQoYXBFbGVtKTtcbiAgICAgICAgICAgICAgICBjb25zdCBhdEVsZW0gPSBkb2MuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XG4gICAgICAgICAgICAgICAgYXRFbGVtLmNsYXNzTGlzdC5hZGQoY2xhc3NOYW1lJGIoJ2F0JykpO1xuICAgICAgICAgICAgICAgIGF0RWxlbS5hcHBlbmRDaGlsZCh0aGlzLmFscGhhVmlld3NfLnRleHQuZWxlbWVudCk7XG4gICAgICAgICAgICAgICAgYUVsZW0uYXBwZW5kQ2hpbGQoYXRFbGVtKTtcbiAgICAgICAgICAgICAgICB0aGlzLmVsZW1lbnQuYXBwZW5kQ2hpbGQoYUVsZW0pO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIGdldCBhbGxGb2N1c2FibGVFbGVtZW50cygpIHtcbiAgICAgICAgICAgIGNvbnN0IGVsZW1zID0gW1xuICAgICAgICAgICAgICAgIHRoaXMuc3ZQYWxldHRlVmlld18uZWxlbWVudCxcbiAgICAgICAgICAgICAgICB0aGlzLmhQYWxldHRlVmlld18uZWxlbWVudCxcbiAgICAgICAgICAgICAgICB0aGlzLnRleHRWaWV3Xy5tb2RlU2VsZWN0RWxlbWVudCxcbiAgICAgICAgICAgICAgICAuLi50aGlzLnRleHRWaWV3Xy50ZXh0Vmlld3MubWFwKCh2KSA9PiB2LmlucHV0RWxlbWVudCksXG4gICAgICAgICAgICBdO1xuICAgICAgICAgICAgaWYgKHRoaXMuYWxwaGFWaWV3c18pIHtcbiAgICAgICAgICAgICAgICBlbGVtcy5wdXNoKHRoaXMuYWxwaGFWaWV3c18ucGFsZXR0ZS5lbGVtZW50LCB0aGlzLmFscGhhVmlld3NfLnRleHQuaW5wdXRFbGVtZW50KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHJldHVybiBlbGVtcztcbiAgICAgICAgfVxuICAgIH1cblxuICAgIGZ1bmN0aW9uIHBhcnNlQ29sb3JJbnB1dFBhcmFtcyhwYXJhbXMpIHtcbiAgICAgICAgY29uc3QgcCA9IFBhcmFtc1BhcnNlcnM7XG4gICAgICAgIHJldHVybiBwYXJzZVBhcmFtcyhwYXJhbXMsIHtcbiAgICAgICAgICAgIGFscGhhOiBwLm9wdGlvbmFsLmJvb2xlYW4sXG4gICAgICAgICAgICBleHBhbmRlZDogcC5vcHRpb25hbC5ib29sZWFuLFxuICAgICAgICAgICAgcGlja2VyOiBwLm9wdGlvbmFsLmN1c3RvbShwYXJzZVBpY2tlckxheW91dCksXG4gICAgICAgIH0pO1xuICAgIH1cbiAgICBmdW5jdGlvbiBnZXRCYXNlU3RlcEZvckNvbG9yKGZvckFscGhhKSB7XG4gICAgICAgIHJldHVybiBmb3JBbHBoYSA/IDAuMSA6IDE7XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gcGFyc2VDc3NOdW1iZXJPclBlcmNlbnRhZ2UodGV4dCwgbWF4VmFsdWUpIHtcbiAgICAgICAgY29uc3QgbSA9IHRleHQubWF0Y2goL14oLispJSQvKTtcbiAgICAgICAgaWYgKCFtKSB7XG4gICAgICAgICAgICByZXR1cm4gTWF0aC5taW4ocGFyc2VGbG9hdCh0ZXh0KSwgbWF4VmFsdWUpO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiBNYXRoLm1pbihwYXJzZUZsb2F0KG1bMV0pICogMC4wMSAqIG1heFZhbHVlLCBtYXhWYWx1ZSk7XG4gICAgfVxuICAgIGNvbnN0IEFOR0xFX1RPX0RFR19NQVAgPSB7XG4gICAgICAgIGRlZzogKGFuZ2xlKSA9PiBhbmdsZSxcbiAgICAgICAgZ3JhZDogKGFuZ2xlKSA9PiAoYW5nbGUgKiAzNjApIC8gNDAwLFxuICAgICAgICByYWQ6IChhbmdsZSkgPT4gKGFuZ2xlICogMzYwKSAvICgyICogTWF0aC5QSSksXG4gICAgICAgIHR1cm46IChhbmdsZSkgPT4gYW5nbGUgKiAzNjAsXG4gICAgfTtcbiAgICBmdW5jdGlvbiBwYXJzZUNzc051bWJlck9yQW5nbGUodGV4dCkge1xuICAgICAgICBjb25zdCBtID0gdGV4dC5tYXRjaCgvXihbMC05Ll0rPykoZGVnfGdyYWR8cmFkfHR1cm4pJC8pO1xuICAgICAgICBpZiAoIW0pIHtcbiAgICAgICAgICAgIHJldHVybiBwYXJzZUZsb2F0KHRleHQpO1xuICAgICAgICB9XG4gICAgICAgIGNvbnN0IGFuZ2xlID0gcGFyc2VGbG9hdChtWzFdKTtcbiAgICAgICAgY29uc3QgdW5pdCA9IG1bMl07XG4gICAgICAgIHJldHVybiBBTkdMRV9UT19ERUdfTUFQW3VuaXRdKGFuZ2xlKTtcbiAgICB9XG4gICAgY29uc3QgTk9UQVRJT05fVE9fUEFSU0VSX01BUCA9IHtcbiAgICAgICAgJ2Z1bmMucmdiJzogKHRleHQpID0+IHtcbiAgICAgICAgICAgIGNvbnN0IG0gPSB0ZXh0Lm1hdGNoKC9ecmdiXFwoXFxzKihbMC05QS1GYS1mLl0rJT8pXFxzKixcXHMqKFswLTlBLUZhLWYuXSslPylcXHMqLFxccyooWzAtOUEtRmEtZi5dKyU/KVxccypcXCkkLyk7XG4gICAgICAgICAgICBpZiAoIW0pIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gbnVsbDtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGNvbnN0IGNvbXBzID0gW1xuICAgICAgICAgICAgICAgIHBhcnNlQ3NzTnVtYmVyT3JQZXJjZW50YWdlKG1bMV0sIDI1NSksXG4gICAgICAgICAgICAgICAgcGFyc2VDc3NOdW1iZXJPclBlcmNlbnRhZ2UobVsyXSwgMjU1KSxcbiAgICAgICAgICAgICAgICBwYXJzZUNzc051bWJlck9yUGVyY2VudGFnZShtWzNdLCAyNTUpLFxuICAgICAgICAgICAgXTtcbiAgICAgICAgICAgIGlmIChpc05hTihjb21wc1swXSkgfHwgaXNOYU4oY29tcHNbMV0pIHx8IGlzTmFOKGNvbXBzWzJdKSkge1xuICAgICAgICAgICAgICAgIHJldHVybiBudWxsO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgcmV0dXJuIG5ldyBDb2xvcihjb21wcywgJ3JnYicpO1xuICAgICAgICB9LFxuICAgICAgICAnZnVuYy5yZ2JhJzogKHRleHQpID0+IHtcbiAgICAgICAgICAgIGNvbnN0IG0gPSB0ZXh0Lm1hdGNoKC9ecmdiYVxcKFxccyooWzAtOUEtRmEtZi5dKyU/KVxccyosXFxzKihbMC05QS1GYS1mLl0rJT8pXFxzKixcXHMqKFswLTlBLUZhLWYuXSslPylcXHMqLFxccyooWzAtOUEtRmEtZi5dKyU/KVxccypcXCkkLyk7XG4gICAgICAgICAgICBpZiAoIW0pIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gbnVsbDtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGNvbnN0IGNvbXBzID0gW1xuICAgICAgICAgICAgICAgIHBhcnNlQ3NzTnVtYmVyT3JQZXJjZW50YWdlKG1bMV0sIDI1NSksXG4gICAgICAgICAgICAgICAgcGFyc2VDc3NOdW1iZXJPclBlcmNlbnRhZ2UobVsyXSwgMjU1KSxcbiAgICAgICAgICAgICAgICBwYXJzZUNzc051bWJlck9yUGVyY2VudGFnZShtWzNdLCAyNTUpLFxuICAgICAgICAgICAgICAgIHBhcnNlQ3NzTnVtYmVyT3JQZXJjZW50YWdlKG1bNF0sIDEpLFxuICAgICAgICAgICAgXTtcbiAgICAgICAgICAgIGlmIChpc05hTihjb21wc1swXSkgfHxcbiAgICAgICAgICAgICAgICBpc05hTihjb21wc1sxXSkgfHxcbiAgICAgICAgICAgICAgICBpc05hTihjb21wc1syXSkgfHxcbiAgICAgICAgICAgICAgICBpc05hTihjb21wc1szXSkpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gbnVsbDtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHJldHVybiBuZXcgQ29sb3IoY29tcHMsICdyZ2InKTtcbiAgICAgICAgfSxcbiAgICAgICAgJ2Z1bmMuaHNsJzogKHRleHQpID0+IHtcbiAgICAgICAgICAgIGNvbnN0IG0gPSB0ZXh0Lm1hdGNoKC9eaHNsXFwoXFxzKihbMC05QS1GYS1mLl0rKD86ZGVnfGdyYWR8cmFkfHR1cm4pPylcXHMqLFxccyooWzAtOUEtRmEtZi5dKyU/KVxccyosXFxzKihbMC05QS1GYS1mLl0rJT8pXFxzKlxcKSQvKTtcbiAgICAgICAgICAgIGlmICghbSkge1xuICAgICAgICAgICAgICAgIHJldHVybiBudWxsO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgY29uc3QgY29tcHMgPSBbXG4gICAgICAgICAgICAgICAgcGFyc2VDc3NOdW1iZXJPckFuZ2xlKG1bMV0pLFxuICAgICAgICAgICAgICAgIHBhcnNlQ3NzTnVtYmVyT3JQZXJjZW50YWdlKG1bMl0sIDEwMCksXG4gICAgICAgICAgICAgICAgcGFyc2VDc3NOdW1iZXJPclBlcmNlbnRhZ2UobVszXSwgMTAwKSxcbiAgICAgICAgICAgIF07XG4gICAgICAgICAgICBpZiAoaXNOYU4oY29tcHNbMF0pIHx8IGlzTmFOKGNvbXBzWzFdKSB8fCBpc05hTihjb21wc1syXSkpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gbnVsbDtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHJldHVybiBuZXcgQ29sb3IoY29tcHMsICdoc2wnKTtcbiAgICAgICAgfSxcbiAgICAgICAgJ2Z1bmMuaHNsYSc6ICh0ZXh0KSA9PiB7XG4gICAgICAgICAgICBjb25zdCBtID0gdGV4dC5tYXRjaCgvXmhzbGFcXChcXHMqKFswLTlBLUZhLWYuXSsoPzpkZWd8Z3JhZHxyYWR8dHVybik/KVxccyosXFxzKihbMC05QS1GYS1mLl0rJT8pXFxzKixcXHMqKFswLTlBLUZhLWYuXSslPylcXHMqLFxccyooWzAtOUEtRmEtZi5dKyU/KVxccypcXCkkLyk7XG4gICAgICAgICAgICBpZiAoIW0pIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gbnVsbDtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGNvbnN0IGNvbXBzID0gW1xuICAgICAgICAgICAgICAgIHBhcnNlQ3NzTnVtYmVyT3JBbmdsZShtWzFdKSxcbiAgICAgICAgICAgICAgICBwYXJzZUNzc051bWJlck9yUGVyY2VudGFnZShtWzJdLCAxMDApLFxuICAgICAgICAgICAgICAgIHBhcnNlQ3NzTnVtYmVyT3JQZXJjZW50YWdlKG1bM10sIDEwMCksXG4gICAgICAgICAgICAgICAgcGFyc2VDc3NOdW1iZXJPclBlcmNlbnRhZ2UobVs0XSwgMSksXG4gICAgICAgICAgICBdO1xuICAgICAgICAgICAgaWYgKGlzTmFOKGNvbXBzWzBdKSB8fFxuICAgICAgICAgICAgICAgIGlzTmFOKGNvbXBzWzFdKSB8fFxuICAgICAgICAgICAgICAgIGlzTmFOKGNvbXBzWzJdKSB8fFxuICAgICAgICAgICAgICAgIGlzTmFOKGNvbXBzWzNdKSkge1xuICAgICAgICAgICAgICAgIHJldHVybiBudWxsO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgcmV0dXJuIG5ldyBDb2xvcihjb21wcywgJ2hzbCcpO1xuICAgICAgICB9LFxuICAgICAgICAnaGV4LnJnYic6ICh0ZXh0KSA9PiB7XG4gICAgICAgICAgICBjb25zdCBtUmdiID0gdGV4dC5tYXRjaCgvXiMoWzAtOUEtRmEtZl0pKFswLTlBLUZhLWZdKShbMC05QS1GYS1mXSkkLyk7XG4gICAgICAgICAgICBpZiAobVJnYikge1xuICAgICAgICAgICAgICAgIHJldHVybiBuZXcgQ29sb3IoW1xuICAgICAgICAgICAgICAgICAgICBwYXJzZUludChtUmdiWzFdICsgbVJnYlsxXSwgMTYpLFxuICAgICAgICAgICAgICAgICAgICBwYXJzZUludChtUmdiWzJdICsgbVJnYlsyXSwgMTYpLFxuICAgICAgICAgICAgICAgICAgICBwYXJzZUludChtUmdiWzNdICsgbVJnYlszXSwgMTYpLFxuICAgICAgICAgICAgICAgIF0sICdyZ2InKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGNvbnN0IG1ScmdnYmIgPSB0ZXh0Lm1hdGNoKC9eKD86I3wweCkoWzAtOUEtRmEtZl17Mn0pKFswLTlBLUZhLWZdezJ9KShbMC05QS1GYS1mXXsyfSkkLyk7XG4gICAgICAgICAgICBpZiAobVJyZ2diYikge1xuICAgICAgICAgICAgICAgIHJldHVybiBuZXcgQ29sb3IoW1xuICAgICAgICAgICAgICAgICAgICBwYXJzZUludChtUnJnZ2JiWzFdLCAxNiksXG4gICAgICAgICAgICAgICAgICAgIHBhcnNlSW50KG1ScmdnYmJbMl0sIDE2KSxcbiAgICAgICAgICAgICAgICAgICAgcGFyc2VJbnQobVJyZ2diYlszXSwgMTYpLFxuICAgICAgICAgICAgICAgIF0sICdyZ2InKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHJldHVybiBudWxsO1xuICAgICAgICB9LFxuICAgICAgICAnaGV4LnJnYmEnOiAodGV4dCkgPT4ge1xuICAgICAgICAgICAgY29uc3QgbVJnYiA9IHRleHQubWF0Y2goL14jPyhbMC05QS1GYS1mXSkoWzAtOUEtRmEtZl0pKFswLTlBLUZhLWZdKShbMC05QS1GYS1mXSkkLyk7XG4gICAgICAgICAgICBpZiAobVJnYikge1xuICAgICAgICAgICAgICAgIHJldHVybiBuZXcgQ29sb3IoW1xuICAgICAgICAgICAgICAgICAgICBwYXJzZUludChtUmdiWzFdICsgbVJnYlsxXSwgMTYpLFxuICAgICAgICAgICAgICAgICAgICBwYXJzZUludChtUmdiWzJdICsgbVJnYlsyXSwgMTYpLFxuICAgICAgICAgICAgICAgICAgICBwYXJzZUludChtUmdiWzNdICsgbVJnYlszXSwgMTYpLFxuICAgICAgICAgICAgICAgICAgICBtYXBSYW5nZShwYXJzZUludChtUmdiWzRdICsgbVJnYls0XSwgMTYpLCAwLCAyNTUsIDAsIDEpLFxuICAgICAgICAgICAgICAgIF0sICdyZ2InKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGNvbnN0IG1ScmdnYmIgPSB0ZXh0Lm1hdGNoKC9eKD86I3wweCk/KFswLTlBLUZhLWZdezJ9KShbMC05QS1GYS1mXXsyfSkoWzAtOUEtRmEtZl17Mn0pKFswLTlBLUZhLWZdezJ9KSQvKTtcbiAgICAgICAgICAgIGlmIChtUnJnZ2JiKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIG5ldyBDb2xvcihbXG4gICAgICAgICAgICAgICAgICAgIHBhcnNlSW50KG1ScmdnYmJbMV0sIDE2KSxcbiAgICAgICAgICAgICAgICAgICAgcGFyc2VJbnQobVJyZ2diYlsyXSwgMTYpLFxuICAgICAgICAgICAgICAgICAgICBwYXJzZUludChtUnJnZ2JiWzNdLCAxNiksXG4gICAgICAgICAgICAgICAgICAgIG1hcFJhbmdlKHBhcnNlSW50KG1ScmdnYmJbNF0sIDE2KSwgMCwgMjU1LCAwLCAxKSxcbiAgICAgICAgICAgICAgICBdLCAncmdiJyk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICByZXR1cm4gbnVsbDtcbiAgICAgICAgfSxcbiAgICB9O1xuICAgIGZ1bmN0aW9uIGdldENvbG9yTm90YXRpb24odGV4dCkge1xuICAgICAgICBjb25zdCBub3RhdGlvbnMgPSBPYmplY3Qua2V5cyhOT1RBVElPTl9UT19QQVJTRVJfTUFQKTtcbiAgICAgICAgcmV0dXJuIG5vdGF0aW9ucy5yZWR1Y2UoKHJlc3VsdCwgbm90YXRpb24pID0+IHtcbiAgICAgICAgICAgIGlmIChyZXN1bHQpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gcmVzdWx0O1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgY29uc3Qgc3VicGFyc2VyID0gTk9UQVRJT05fVE9fUEFSU0VSX01BUFtub3RhdGlvbl07XG4gICAgICAgICAgICByZXR1cm4gc3VicGFyc2VyKHRleHQpID8gbm90YXRpb24gOiBudWxsO1xuICAgICAgICB9LCBudWxsKTtcbiAgICB9XG4gICAgY29uc3QgQ29tcG9zaXRlQ29sb3JQYXJzZXIgPSAodGV4dCkgPT4ge1xuICAgICAgICBjb25zdCBub3RhdGlvbiA9IGdldENvbG9yTm90YXRpb24odGV4dCk7XG4gICAgICAgIHJldHVybiBub3RhdGlvbiA/IE5PVEFUSU9OX1RPX1BBUlNFUl9NQVBbbm90YXRpb25dKHRleHQpIDogbnVsbDtcbiAgICB9O1xuICAgIGZ1bmN0aW9uIGhhc0FscGhhQ29tcG9uZW50KG5vdGF0aW9uKSB7XG4gICAgICAgIHJldHVybiAobm90YXRpb24gPT09ICdmdW5jLmhzbGEnIHx8XG4gICAgICAgICAgICBub3RhdGlvbiA9PT0gJ2Z1bmMucmdiYScgfHxcbiAgICAgICAgICAgIG5vdGF0aW9uID09PSAnaGV4LnJnYmEnKTtcbiAgICB9XG4gICAgZnVuY3Rpb24gY29sb3JGcm9tU3RyaW5nKHZhbHVlKSB7XG4gICAgICAgIGlmICh0eXBlb2YgdmFsdWUgPT09ICdzdHJpbmcnKSB7XG4gICAgICAgICAgICBjb25zdCBjdiA9IENvbXBvc2l0ZUNvbG9yUGFyc2VyKHZhbHVlKTtcbiAgICAgICAgICAgIGlmIChjdikge1xuICAgICAgICAgICAgICAgIHJldHVybiBjdjtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gQ29sb3IuYmxhY2soKTtcbiAgICB9XG4gICAgZnVuY3Rpb24gemVyb2ZpbGwoY29tcCkge1xuICAgICAgICBjb25zdCBoZXggPSBjb25zdHJhaW5SYW5nZShNYXRoLmZsb29yKGNvbXApLCAwLCAyNTUpLnRvU3RyaW5nKDE2KTtcbiAgICAgICAgcmV0dXJuIGhleC5sZW5ndGggPT09IDEgPyBgMCR7aGV4fWAgOiBoZXg7XG4gICAgfVxuICAgIGZ1bmN0aW9uIGNvbG9yVG9IZXhSZ2JTdHJpbmcodmFsdWUsIHByZWZpeCA9ICcjJykge1xuICAgICAgICBjb25zdCBoZXhlcyA9IHJlbW92ZUFscGhhQ29tcG9uZW50KHZhbHVlLmdldENvbXBvbmVudHMoJ3JnYicpKVxuICAgICAgICAgICAgLm1hcCh6ZXJvZmlsbClcbiAgICAgICAgICAgIC5qb2luKCcnKTtcbiAgICAgICAgcmV0dXJuIGAke3ByZWZpeH0ke2hleGVzfWA7XG4gICAgfVxuICAgIGZ1bmN0aW9uIGNvbG9yVG9IZXhSZ2JhU3RyaW5nKHZhbHVlLCBwcmVmaXggPSAnIycpIHtcbiAgICAgICAgY29uc3QgcmdiYUNvbXBzID0gdmFsdWUuZ2V0Q29tcG9uZW50cygncmdiJyk7XG4gICAgICAgIGNvbnN0IGhleGVzID0gW3JnYmFDb21wc1swXSwgcmdiYUNvbXBzWzFdLCByZ2JhQ29tcHNbMl0sIHJnYmFDb21wc1szXSAqIDI1NV1cbiAgICAgICAgICAgIC5tYXAoemVyb2ZpbGwpXG4gICAgICAgICAgICAuam9pbignJyk7XG4gICAgICAgIHJldHVybiBgJHtwcmVmaXh9JHtoZXhlc31gO1xuICAgIH1cbiAgICBmdW5jdGlvbiBjb2xvclRvRnVuY3Rpb25hbFJnYlN0cmluZyh2YWx1ZSkge1xuICAgICAgICBjb25zdCBmb3JtYXR0ZXIgPSBjcmVhdGVOdW1iZXJGb3JtYXR0ZXIoMCk7XG4gICAgICAgIGNvbnN0IGNvbXBzID0gcmVtb3ZlQWxwaGFDb21wb25lbnQodmFsdWUuZ2V0Q29tcG9uZW50cygncmdiJykpLm1hcCgoY29tcCkgPT4gZm9ybWF0dGVyKGNvbXApKTtcbiAgICAgICAgcmV0dXJuIGByZ2IoJHtjb21wcy5qb2luKCcsICcpfSlgO1xuICAgIH1cbiAgICBmdW5jdGlvbiBjb2xvclRvRnVuY3Rpb25hbFJnYmFTdHJpbmcodmFsdWUpIHtcbiAgICAgICAgY29uc3QgYUZvcm1hdHRlciA9IGNyZWF0ZU51bWJlckZvcm1hdHRlcigyKTtcbiAgICAgICAgY29uc3QgcmdiRm9ybWF0dGVyID0gY3JlYXRlTnVtYmVyRm9ybWF0dGVyKDApO1xuICAgICAgICBjb25zdCBjb21wcyA9IHZhbHVlLmdldENvbXBvbmVudHMoJ3JnYicpLm1hcCgoY29tcCwgaW5kZXgpID0+IHtcbiAgICAgICAgICAgIGNvbnN0IGZvcm1hdHRlciA9IGluZGV4ID09PSAzID8gYUZvcm1hdHRlciA6IHJnYkZvcm1hdHRlcjtcbiAgICAgICAgICAgIHJldHVybiBmb3JtYXR0ZXIoY29tcCk7XG4gICAgICAgIH0pO1xuICAgICAgICByZXR1cm4gYHJnYmEoJHtjb21wcy5qb2luKCcsICcpfSlgO1xuICAgIH1cbiAgICBmdW5jdGlvbiBjb2xvclRvRnVuY3Rpb25hbEhzbFN0cmluZyh2YWx1ZSkge1xuICAgICAgICBjb25zdCBmb3JtYXR0ZXJzID0gW1xuICAgICAgICAgICAgY3JlYXRlTnVtYmVyRm9ybWF0dGVyKDApLFxuICAgICAgICAgICAgZm9ybWF0UGVyY2VudGFnZSxcbiAgICAgICAgICAgIGZvcm1hdFBlcmNlbnRhZ2UsXG4gICAgICAgIF07XG4gICAgICAgIGNvbnN0IGNvbXBzID0gcmVtb3ZlQWxwaGFDb21wb25lbnQodmFsdWUuZ2V0Q29tcG9uZW50cygnaHNsJykpLm1hcCgoY29tcCwgaW5kZXgpID0+IGZvcm1hdHRlcnNbaW5kZXhdKGNvbXApKTtcbiAgICAgICAgcmV0dXJuIGBoc2woJHtjb21wcy5qb2luKCcsICcpfSlgO1xuICAgIH1cbiAgICBmdW5jdGlvbiBjb2xvclRvRnVuY3Rpb25hbEhzbGFTdHJpbmcodmFsdWUpIHtcbiAgICAgICAgY29uc3QgZm9ybWF0dGVycyA9IFtcbiAgICAgICAgICAgIGNyZWF0ZU51bWJlckZvcm1hdHRlcigwKSxcbiAgICAgICAgICAgIGZvcm1hdFBlcmNlbnRhZ2UsXG4gICAgICAgICAgICBmb3JtYXRQZXJjZW50YWdlLFxuICAgICAgICAgICAgY3JlYXRlTnVtYmVyRm9ybWF0dGVyKDIpLFxuICAgICAgICBdO1xuICAgICAgICBjb25zdCBjb21wcyA9IHZhbHVlXG4gICAgICAgICAgICAuZ2V0Q29tcG9uZW50cygnaHNsJylcbiAgICAgICAgICAgIC5tYXAoKGNvbXAsIGluZGV4KSA9PiBmb3JtYXR0ZXJzW2luZGV4XShjb21wKSk7XG4gICAgICAgIHJldHVybiBgaHNsYSgke2NvbXBzLmpvaW4oJywgJyl9KWA7XG4gICAgfVxuICAgIGNvbnN0IE5PVEFUSU9OX1RPX1NUUklOR0lGSUVSX01BUCA9IHtcbiAgICAgICAgJ2Z1bmMuaHNsJzogY29sb3JUb0Z1bmN0aW9uYWxIc2xTdHJpbmcsXG4gICAgICAgICdmdW5jLmhzbGEnOiBjb2xvclRvRnVuY3Rpb25hbEhzbGFTdHJpbmcsXG4gICAgICAgICdmdW5jLnJnYic6IGNvbG9yVG9GdW5jdGlvbmFsUmdiU3RyaW5nLFxuICAgICAgICAnZnVuYy5yZ2JhJzogY29sb3JUb0Z1bmN0aW9uYWxSZ2JhU3RyaW5nLFxuICAgICAgICAnaGV4LnJnYic6IGNvbG9yVG9IZXhSZ2JTdHJpbmcsXG4gICAgICAgICdoZXgucmdiYSc6IGNvbG9yVG9IZXhSZ2JhU3RyaW5nLFxuICAgIH07XG4gICAgZnVuY3Rpb24gZ2V0Q29sb3JTdHJpbmdpZmllcihub3RhdGlvbikge1xuICAgICAgICByZXR1cm4gTk9UQVRJT05fVE9fU1RSSU5HSUZJRVJfTUFQW25vdGF0aW9uXTtcbiAgICB9XG5cbiAgICBjb25zdCBjbGFzc05hbWUkYSA9IENsYXNzTmFtZSgnYXBsJyk7XG4gICAgY2xhc3MgQVBhbGV0dGVWaWV3IHtcbiAgICAgICAgY29uc3RydWN0b3IoZG9jLCBjb25maWcpIHtcbiAgICAgICAgICAgIHRoaXMub25WYWx1ZUNoYW5nZV8gPSB0aGlzLm9uVmFsdWVDaGFuZ2VfLmJpbmQodGhpcyk7XG4gICAgICAgICAgICB0aGlzLnZhbHVlID0gY29uZmlnLnZhbHVlO1xuICAgICAgICAgICAgdGhpcy52YWx1ZS5lbWl0dGVyLm9uKCdjaGFuZ2UnLCB0aGlzLm9uVmFsdWVDaGFuZ2VfKTtcbiAgICAgICAgICAgIHRoaXMuZWxlbWVudCA9IGRvYy5jcmVhdGVFbGVtZW50KCdkaXYnKTtcbiAgICAgICAgICAgIHRoaXMuZWxlbWVudC5jbGFzc0xpc3QuYWRkKGNsYXNzTmFtZSRhKCkpO1xuICAgICAgICAgICAgY29uZmlnLnZpZXdQcm9wcy5iaW5kVGFiSW5kZXgodGhpcy5lbGVtZW50KTtcbiAgICAgICAgICAgIGNvbnN0IGJhckVsZW0gPSBkb2MuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XG4gICAgICAgICAgICBiYXJFbGVtLmNsYXNzTGlzdC5hZGQoY2xhc3NOYW1lJGEoJ2InKSk7XG4gICAgICAgICAgICB0aGlzLmVsZW1lbnQuYXBwZW5kQ2hpbGQoYmFyRWxlbSk7XG4gICAgICAgICAgICBjb25zdCBjb2xvckVsZW0gPSBkb2MuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XG4gICAgICAgICAgICBjb2xvckVsZW0uY2xhc3NMaXN0LmFkZChjbGFzc05hbWUkYSgnYycpKTtcbiAgICAgICAgICAgIGJhckVsZW0uYXBwZW5kQ2hpbGQoY29sb3JFbGVtKTtcbiAgICAgICAgICAgIHRoaXMuY29sb3JFbGVtXyA9IGNvbG9yRWxlbTtcbiAgICAgICAgICAgIGNvbnN0IG1hcmtlckVsZW0gPSBkb2MuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XG4gICAgICAgICAgICBtYXJrZXJFbGVtLmNsYXNzTGlzdC5hZGQoY2xhc3NOYW1lJGEoJ20nKSk7XG4gICAgICAgICAgICB0aGlzLmVsZW1lbnQuYXBwZW5kQ2hpbGQobWFya2VyRWxlbSk7XG4gICAgICAgICAgICB0aGlzLm1hcmtlckVsZW1fID0gbWFya2VyRWxlbTtcbiAgICAgICAgICAgIGNvbnN0IHByZXZpZXdFbGVtID0gZG9jLmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xuICAgICAgICAgICAgcHJldmlld0VsZW0uY2xhc3NMaXN0LmFkZChjbGFzc05hbWUkYSgncCcpKTtcbiAgICAgICAgICAgIHRoaXMubWFya2VyRWxlbV8uYXBwZW5kQ2hpbGQocHJldmlld0VsZW0pO1xuICAgICAgICAgICAgdGhpcy5wcmV2aWV3RWxlbV8gPSBwcmV2aWV3RWxlbTtcbiAgICAgICAgICAgIHRoaXMudXBkYXRlXygpO1xuICAgICAgICB9XG4gICAgICAgIHVwZGF0ZV8oKSB7XG4gICAgICAgICAgICBjb25zdCBjID0gdGhpcy52YWx1ZS5yYXdWYWx1ZTtcbiAgICAgICAgICAgIGNvbnN0IHJnYmFDb21wcyA9IGMuZ2V0Q29tcG9uZW50cygncmdiJyk7XG4gICAgICAgICAgICBjb25zdCBsZWZ0Q29sb3IgPSBuZXcgQ29sb3IoW3JnYmFDb21wc1swXSwgcmdiYUNvbXBzWzFdLCByZ2JhQ29tcHNbMl0sIDBdLCAncmdiJyk7XG4gICAgICAgICAgICBjb25zdCByaWdodENvbG9yID0gbmV3IENvbG9yKFtyZ2JhQ29tcHNbMF0sIHJnYmFDb21wc1sxXSwgcmdiYUNvbXBzWzJdLCAyNTVdLCAncmdiJyk7XG4gICAgICAgICAgICBjb25zdCBncmFkaWVudENvbXBzID0gW1xuICAgICAgICAgICAgICAgICd0byByaWdodCcsXG4gICAgICAgICAgICAgICAgY29sb3JUb0Z1bmN0aW9uYWxSZ2JhU3RyaW5nKGxlZnRDb2xvciksXG4gICAgICAgICAgICAgICAgY29sb3JUb0Z1bmN0aW9uYWxSZ2JhU3RyaW5nKHJpZ2h0Q29sb3IpLFxuICAgICAgICAgICAgXTtcbiAgICAgICAgICAgIHRoaXMuY29sb3JFbGVtXy5zdHlsZS5iYWNrZ3JvdW5kID0gYGxpbmVhci1ncmFkaWVudCgke2dyYWRpZW50Q29tcHMuam9pbignLCcpfSlgO1xuICAgICAgICAgICAgdGhpcy5wcmV2aWV3RWxlbV8uc3R5bGUuYmFja2dyb3VuZENvbG9yID0gY29sb3JUb0Z1bmN0aW9uYWxSZ2JhU3RyaW5nKGMpO1xuICAgICAgICAgICAgY29uc3QgbGVmdCA9IG1hcFJhbmdlKHJnYmFDb21wc1szXSwgMCwgMSwgMCwgMTAwKTtcbiAgICAgICAgICAgIHRoaXMubWFya2VyRWxlbV8uc3R5bGUubGVmdCA9IGAke2xlZnR9JWA7XG4gICAgICAgIH1cbiAgICAgICAgb25WYWx1ZUNoYW5nZV8oKSB7XG4gICAgICAgICAgICB0aGlzLnVwZGF0ZV8oKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIGNsYXNzIEFQYWxldHRlQ29udHJvbGxlciB7XG4gICAgICAgIGNvbnN0cnVjdG9yKGRvYywgY29uZmlnKSB7XG4gICAgICAgICAgICB0aGlzLm9uS2V5RG93bl8gPSB0aGlzLm9uS2V5RG93bl8uYmluZCh0aGlzKTtcbiAgICAgICAgICAgIHRoaXMub25LZXlVcF8gPSB0aGlzLm9uS2V5VXBfLmJpbmQodGhpcyk7XG4gICAgICAgICAgICB0aGlzLm9uUG9pbnRlckRvd25fID0gdGhpcy5vblBvaW50ZXJEb3duXy5iaW5kKHRoaXMpO1xuICAgICAgICAgICAgdGhpcy5vblBvaW50ZXJNb3ZlXyA9IHRoaXMub25Qb2ludGVyTW92ZV8uYmluZCh0aGlzKTtcbiAgICAgICAgICAgIHRoaXMub25Qb2ludGVyVXBfID0gdGhpcy5vblBvaW50ZXJVcF8uYmluZCh0aGlzKTtcbiAgICAgICAgICAgIHRoaXMudmFsdWUgPSBjb25maWcudmFsdWU7XG4gICAgICAgICAgICB0aGlzLnZpZXdQcm9wcyA9IGNvbmZpZy52aWV3UHJvcHM7XG4gICAgICAgICAgICB0aGlzLnZpZXcgPSBuZXcgQVBhbGV0dGVWaWV3KGRvYywge1xuICAgICAgICAgICAgICAgIHZhbHVlOiB0aGlzLnZhbHVlLFxuICAgICAgICAgICAgICAgIHZpZXdQcm9wczogdGhpcy52aWV3UHJvcHMsXG4gICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIHRoaXMucHRIYW5kbGVyXyA9IG5ldyBQb2ludGVySGFuZGxlcih0aGlzLnZpZXcuZWxlbWVudCk7XG4gICAgICAgICAgICB0aGlzLnB0SGFuZGxlcl8uZW1pdHRlci5vbignZG93bicsIHRoaXMub25Qb2ludGVyRG93bl8pO1xuICAgICAgICAgICAgdGhpcy5wdEhhbmRsZXJfLmVtaXR0ZXIub24oJ21vdmUnLCB0aGlzLm9uUG9pbnRlck1vdmVfKTtcbiAgICAgICAgICAgIHRoaXMucHRIYW5kbGVyXy5lbWl0dGVyLm9uKCd1cCcsIHRoaXMub25Qb2ludGVyVXBfKTtcbiAgICAgICAgICAgIHRoaXMudmlldy5lbGVtZW50LmFkZEV2ZW50TGlzdGVuZXIoJ2tleWRvd24nLCB0aGlzLm9uS2V5RG93bl8pO1xuICAgICAgICAgICAgdGhpcy52aWV3LmVsZW1lbnQuYWRkRXZlbnRMaXN0ZW5lcigna2V5dXAnLCB0aGlzLm9uS2V5VXBfKTtcbiAgICAgICAgfVxuICAgICAgICBoYW5kbGVQb2ludGVyRXZlbnRfKGQsIG9wdHMpIHtcbiAgICAgICAgICAgIGlmICghZC5wb2ludCkge1xuICAgICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGNvbnN0IGFscGhhID0gZC5wb2ludC54IC8gZC5ib3VuZHMud2lkdGg7XG4gICAgICAgICAgICBjb25zdCBjID0gdGhpcy52YWx1ZS5yYXdWYWx1ZTtcbiAgICAgICAgICAgIGNvbnN0IFtoLCBzLCB2XSA9IGMuZ2V0Q29tcG9uZW50cygnaHN2Jyk7XG4gICAgICAgICAgICB0aGlzLnZhbHVlLnNldFJhd1ZhbHVlKG5ldyBDb2xvcihbaCwgcywgdiwgYWxwaGFdLCAnaHN2JyksIG9wdHMpO1xuICAgICAgICB9XG4gICAgICAgIG9uUG9pbnRlckRvd25fKGV2KSB7XG4gICAgICAgICAgICB0aGlzLmhhbmRsZVBvaW50ZXJFdmVudF8oZXYuZGF0YSwge1xuICAgICAgICAgICAgICAgIGZvcmNlRW1pdDogZmFsc2UsXG4gICAgICAgICAgICAgICAgbGFzdDogZmFsc2UsXG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfVxuICAgICAgICBvblBvaW50ZXJNb3ZlXyhldikge1xuICAgICAgICAgICAgdGhpcy5oYW5kbGVQb2ludGVyRXZlbnRfKGV2LmRhdGEsIHtcbiAgICAgICAgICAgICAgICBmb3JjZUVtaXQ6IGZhbHNlLFxuICAgICAgICAgICAgICAgIGxhc3Q6IGZhbHNlLFxuICAgICAgICAgICAgfSk7XG4gICAgICAgIH1cbiAgICAgICAgb25Qb2ludGVyVXBfKGV2KSB7XG4gICAgICAgICAgICB0aGlzLmhhbmRsZVBvaW50ZXJFdmVudF8oZXYuZGF0YSwge1xuICAgICAgICAgICAgICAgIGZvcmNlRW1pdDogdHJ1ZSxcbiAgICAgICAgICAgICAgICBsYXN0OiB0cnVlLFxuICAgICAgICAgICAgfSk7XG4gICAgICAgIH1cbiAgICAgICAgb25LZXlEb3duXyhldikge1xuICAgICAgICAgICAgY29uc3Qgc3RlcCA9IGdldFN0ZXBGb3JLZXkoZ2V0QmFzZVN0ZXBGb3JDb2xvcih0cnVlKSwgZ2V0SG9yaXpvbnRhbFN0ZXBLZXlzKGV2KSk7XG4gICAgICAgICAgICBpZiAoc3RlcCA9PT0gMCkge1xuICAgICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGNvbnN0IGMgPSB0aGlzLnZhbHVlLnJhd1ZhbHVlO1xuICAgICAgICAgICAgY29uc3QgW2gsIHMsIHYsIGFdID0gYy5nZXRDb21wb25lbnRzKCdoc3YnKTtcbiAgICAgICAgICAgIHRoaXMudmFsdWUuc2V0UmF3VmFsdWUobmV3IENvbG9yKFtoLCBzLCB2LCBhICsgc3RlcF0sICdoc3YnKSwge1xuICAgICAgICAgICAgICAgIGZvcmNlRW1pdDogZmFsc2UsXG4gICAgICAgICAgICAgICAgbGFzdDogZmFsc2UsXG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfVxuICAgICAgICBvbktleVVwXyhldikge1xuICAgICAgICAgICAgY29uc3Qgc3RlcCA9IGdldFN0ZXBGb3JLZXkoZ2V0QmFzZVN0ZXBGb3JDb2xvcih0cnVlKSwgZ2V0SG9yaXpvbnRhbFN0ZXBLZXlzKGV2KSk7XG4gICAgICAgICAgICBpZiAoc3RlcCA9PT0gMCkge1xuICAgICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHRoaXMudmFsdWUuc2V0UmF3VmFsdWUodGhpcy52YWx1ZS5yYXdWYWx1ZSwge1xuICAgICAgICAgICAgICAgIGZvcmNlRW1pdDogdHJ1ZSxcbiAgICAgICAgICAgICAgICBsYXN0OiB0cnVlLFxuICAgICAgICAgICAgfSk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBjb25zdCBjbGFzc05hbWUkOSA9IENsYXNzTmFtZSgnY29sdHh0Jyk7XG4gICAgZnVuY3Rpb24gY3JlYXRlTW9kZVNlbGVjdEVsZW1lbnQoZG9jKSB7XG4gICAgICAgIGNvbnN0IHNlbGVjdEVsZW0gPSBkb2MuY3JlYXRlRWxlbWVudCgnc2VsZWN0Jyk7XG4gICAgICAgIGNvbnN0IGl0ZW1zID0gW1xuICAgICAgICAgICAgeyB0ZXh0OiAnUkdCJywgdmFsdWU6ICdyZ2InIH0sXG4gICAgICAgICAgICB7IHRleHQ6ICdIU0wnLCB2YWx1ZTogJ2hzbCcgfSxcbiAgICAgICAgICAgIHsgdGV4dDogJ0hTVicsIHZhbHVlOiAnaHN2JyB9LFxuICAgICAgICBdO1xuICAgICAgICBzZWxlY3RFbGVtLmFwcGVuZENoaWxkKGl0ZW1zLnJlZHVjZSgoZnJhZywgaXRlbSkgPT4ge1xuICAgICAgICAgICAgY29uc3Qgb3B0RWxlbSA9IGRvYy5jcmVhdGVFbGVtZW50KCdvcHRpb24nKTtcbiAgICAgICAgICAgIG9wdEVsZW0udGV4dENvbnRlbnQgPSBpdGVtLnRleHQ7XG4gICAgICAgICAgICBvcHRFbGVtLnZhbHVlID0gaXRlbS52YWx1ZTtcbiAgICAgICAgICAgIGZyYWcuYXBwZW5kQ2hpbGQob3B0RWxlbSk7XG4gICAgICAgICAgICByZXR1cm4gZnJhZztcbiAgICAgICAgfSwgZG9jLmNyZWF0ZURvY3VtZW50RnJhZ21lbnQoKSkpO1xuICAgICAgICByZXR1cm4gc2VsZWN0RWxlbTtcbiAgICB9XG4gICAgY2xhc3MgQ29sb3JUZXh0VmlldyB7XG4gICAgICAgIGNvbnN0cnVjdG9yKGRvYywgY29uZmlnKSB7XG4gICAgICAgICAgICB0aGlzLmVsZW1lbnQgPSBkb2MuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XG4gICAgICAgICAgICB0aGlzLmVsZW1lbnQuY2xhc3NMaXN0LmFkZChjbGFzc05hbWUkOSgpKTtcbiAgICAgICAgICAgIGNvbnN0IG1vZGVFbGVtID0gZG9jLmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xuICAgICAgICAgICAgbW9kZUVsZW0uY2xhc3NMaXN0LmFkZChjbGFzc05hbWUkOSgnbScpKTtcbiAgICAgICAgICAgIHRoaXMubW9kZUVsZW1fID0gY3JlYXRlTW9kZVNlbGVjdEVsZW1lbnQoZG9jKTtcbiAgICAgICAgICAgIHRoaXMubW9kZUVsZW1fLmNsYXNzTGlzdC5hZGQoY2xhc3NOYW1lJDkoJ21zJykpO1xuICAgICAgICAgICAgbW9kZUVsZW0uYXBwZW5kQ2hpbGQodGhpcy5tb2RlU2VsZWN0RWxlbWVudCk7XG4gICAgICAgICAgICBjb25zdCBtb2RlTWFya2VyRWxlbSA9IGRvYy5jcmVhdGVFbGVtZW50KCdkaXYnKTtcbiAgICAgICAgICAgIG1vZGVNYXJrZXJFbGVtLmNsYXNzTGlzdC5hZGQoY2xhc3NOYW1lJDkoJ21tJykpO1xuICAgICAgICAgICAgbW9kZU1hcmtlckVsZW0uYXBwZW5kQ2hpbGQoY3JlYXRlU3ZnSWNvbkVsZW1lbnQoZG9jLCAnZHJvcGRvd24nKSk7XG4gICAgICAgICAgICBtb2RlRWxlbS5hcHBlbmRDaGlsZChtb2RlTWFya2VyRWxlbSk7XG4gICAgICAgICAgICB0aGlzLmVsZW1lbnQuYXBwZW5kQ2hpbGQobW9kZUVsZW0pO1xuICAgICAgICAgICAgY29uc3QgdGV4dHNFbGVtID0gZG9jLmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xuICAgICAgICAgICAgdGV4dHNFbGVtLmNsYXNzTGlzdC5hZGQoY2xhc3NOYW1lJDkoJ3cnKSk7XG4gICAgICAgICAgICB0aGlzLmVsZW1lbnQuYXBwZW5kQ2hpbGQodGV4dHNFbGVtKTtcbiAgICAgICAgICAgIHRoaXMudGV4dHNFbGVtXyA9IHRleHRzRWxlbTtcbiAgICAgICAgICAgIHRoaXMudGV4dFZpZXdzXyA9IGNvbmZpZy50ZXh0Vmlld3M7XG4gICAgICAgICAgICB0aGlzLmFwcGx5VGV4dFZpZXdzXygpO1xuICAgICAgICAgICAgYmluZFZhbHVlKGNvbmZpZy5jb2xvck1vZGUsIChtb2RlKSA9PiB7XG4gICAgICAgICAgICAgICAgdGhpcy5tb2RlRWxlbV8udmFsdWUgPSBtb2RlO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgIH1cbiAgICAgICAgZ2V0IG1vZGVTZWxlY3RFbGVtZW50KCkge1xuICAgICAgICAgICAgcmV0dXJuIHRoaXMubW9kZUVsZW1fO1xuICAgICAgICB9XG4gICAgICAgIGdldCB0ZXh0Vmlld3MoKSB7XG4gICAgICAgICAgICByZXR1cm4gdGhpcy50ZXh0Vmlld3NfO1xuICAgICAgICB9XG4gICAgICAgIHNldCB0ZXh0Vmlld3ModGV4dFZpZXdzKSB7XG4gICAgICAgICAgICB0aGlzLnRleHRWaWV3c18gPSB0ZXh0Vmlld3M7XG4gICAgICAgICAgICB0aGlzLmFwcGx5VGV4dFZpZXdzXygpO1xuICAgICAgICB9XG4gICAgICAgIGFwcGx5VGV4dFZpZXdzXygpIHtcbiAgICAgICAgICAgIHJlbW92ZUNoaWxkRWxlbWVudHModGhpcy50ZXh0c0VsZW1fKTtcbiAgICAgICAgICAgIGNvbnN0IGRvYyA9IHRoaXMuZWxlbWVudC5vd25lckRvY3VtZW50O1xuICAgICAgICAgICAgdGhpcy50ZXh0Vmlld3NfLmZvckVhY2goKHYpID0+IHtcbiAgICAgICAgICAgICAgICBjb25zdCBjb21wRWxlbSA9IGRvYy5jcmVhdGVFbGVtZW50KCdkaXYnKTtcbiAgICAgICAgICAgICAgICBjb21wRWxlbS5jbGFzc0xpc3QuYWRkKGNsYXNzTmFtZSQ5KCdjJykpO1xuICAgICAgICAgICAgICAgIGNvbXBFbGVtLmFwcGVuZENoaWxkKHYuZWxlbWVudCk7XG4gICAgICAgICAgICAgICAgdGhpcy50ZXh0c0VsZW1fLmFwcGVuZENoaWxkKGNvbXBFbGVtKTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgY29uc3QgRk9STUFUVEVSID0gY3JlYXRlTnVtYmVyRm9ybWF0dGVyKDApO1xuICAgIGNvbnN0IE1PREVfVE9fQ09OU1RSQUlOVF9NQVAgPSB7XG4gICAgICAgIHJnYjogKCkgPT4ge1xuICAgICAgICAgICAgcmV0dXJuIG5ldyBSYW5nZUNvbnN0cmFpbnQoeyBtaW46IDAsIG1heDogMjU1IH0pO1xuICAgICAgICB9LFxuICAgICAgICBoc2w6IChpbmRleCkgPT4ge1xuICAgICAgICAgICAgcmV0dXJuIGluZGV4ID09PSAwXG4gICAgICAgICAgICAgICAgPyBuZXcgUmFuZ2VDb25zdHJhaW50KHsgbWluOiAwLCBtYXg6IDM2MCB9KVxuICAgICAgICAgICAgICAgIDogbmV3IFJhbmdlQ29uc3RyYWludCh7IG1pbjogMCwgbWF4OiAxMDAgfSk7XG4gICAgICAgIH0sXG4gICAgICAgIGhzdjogKGluZGV4KSA9PiB7XG4gICAgICAgICAgICByZXR1cm4gaW5kZXggPT09IDBcbiAgICAgICAgICAgICAgICA/IG5ldyBSYW5nZUNvbnN0cmFpbnQoeyBtaW46IDAsIG1heDogMzYwIH0pXG4gICAgICAgICAgICAgICAgOiBuZXcgUmFuZ2VDb25zdHJhaW50KHsgbWluOiAwLCBtYXg6IDEwMCB9KTtcbiAgICAgICAgfSxcbiAgICB9O1xuICAgIGZ1bmN0aW9uIGNyZWF0ZUNvbXBvbmVudENvbnRyb2xsZXIoZG9jLCBjb25maWcsIGluZGV4KSB7XG4gICAgICAgIHJldHVybiBuZXcgTnVtYmVyVGV4dENvbnRyb2xsZXIoZG9jLCB7XG4gICAgICAgICAgICBhcnJheVBvc2l0aW9uOiBpbmRleCA9PT0gMCA/ICdmc3QnIDogaW5kZXggPT09IDMgLSAxID8gJ2xzdCcgOiAnbWlkJyxcbiAgICAgICAgICAgIGJhc2VTdGVwOiBnZXRCYXNlU3RlcEZvckNvbG9yKGZhbHNlKSxcbiAgICAgICAgICAgIHBhcnNlcjogY29uZmlnLnBhcnNlcixcbiAgICAgICAgICAgIHByb3BzOiBWYWx1ZU1hcC5mcm9tT2JqZWN0KHtcbiAgICAgICAgICAgICAgICBkcmFnZ2luZ1NjYWxlOiAxLFxuICAgICAgICAgICAgICAgIGZvcm1hdHRlcjogRk9STUFUVEVSLFxuICAgICAgICAgICAgfSksXG4gICAgICAgICAgICB2YWx1ZTogY3JlYXRlVmFsdWUoMCwge1xuICAgICAgICAgICAgICAgIGNvbnN0cmFpbnQ6IE1PREVfVE9fQ09OU1RSQUlOVF9NQVBbY29uZmlnLmNvbG9yTW9kZV0oaW5kZXgpLFxuICAgICAgICAgICAgfSksXG4gICAgICAgICAgICB2aWV3UHJvcHM6IGNvbmZpZy52aWV3UHJvcHMsXG4gICAgICAgIH0pO1xuICAgIH1cbiAgICBjbGFzcyBDb2xvclRleHRDb250cm9sbGVyIHtcbiAgICAgICAgY29uc3RydWN0b3IoZG9jLCBjb25maWcpIHtcbiAgICAgICAgICAgIHRoaXMub25Nb2RlU2VsZWN0Q2hhbmdlXyA9IHRoaXMub25Nb2RlU2VsZWN0Q2hhbmdlXy5iaW5kKHRoaXMpO1xuICAgICAgICAgICAgdGhpcy5wYXJzZXJfID0gY29uZmlnLnBhcnNlcjtcbiAgICAgICAgICAgIHRoaXMudmFsdWUgPSBjb25maWcudmFsdWU7XG4gICAgICAgICAgICB0aGlzLnZpZXdQcm9wcyA9IGNvbmZpZy52aWV3UHJvcHM7XG4gICAgICAgICAgICB0aGlzLmNvbG9yTW9kZSA9IGNyZWF0ZVZhbHVlKHRoaXMudmFsdWUucmF3VmFsdWUubW9kZSk7XG4gICAgICAgICAgICB0aGlzLmNjc18gPSB0aGlzLmNyZWF0ZUNvbXBvbmVudENvbnRyb2xsZXJzXyhkb2MpO1xuICAgICAgICAgICAgdGhpcy52aWV3ID0gbmV3IENvbG9yVGV4dFZpZXcoZG9jLCB7XG4gICAgICAgICAgICAgICAgY29sb3JNb2RlOiB0aGlzLmNvbG9yTW9kZSxcbiAgICAgICAgICAgICAgICB0ZXh0Vmlld3M6IFt0aGlzLmNjc19bMF0udmlldywgdGhpcy5jY3NfWzFdLnZpZXcsIHRoaXMuY2NzX1syXS52aWV3XSxcbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgdGhpcy52aWV3Lm1vZGVTZWxlY3RFbGVtZW50LmFkZEV2ZW50TGlzdGVuZXIoJ2NoYW5nZScsIHRoaXMub25Nb2RlU2VsZWN0Q2hhbmdlXyk7XG4gICAgICAgIH1cbiAgICAgICAgY3JlYXRlQ29tcG9uZW50Q29udHJvbGxlcnNfKGRvYykge1xuICAgICAgICAgICAgY29uc3QgY2MgPSB7XG4gICAgICAgICAgICAgICAgY29sb3JNb2RlOiB0aGlzLmNvbG9yTW9kZS5yYXdWYWx1ZSxcbiAgICAgICAgICAgICAgICBwYXJzZXI6IHRoaXMucGFyc2VyXyxcbiAgICAgICAgICAgICAgICB2aWV3UHJvcHM6IHRoaXMudmlld1Byb3BzLFxuICAgICAgICAgICAgfTtcbiAgICAgICAgICAgIGNvbnN0IGNjcyA9IFtcbiAgICAgICAgICAgICAgICBjcmVhdGVDb21wb25lbnRDb250cm9sbGVyKGRvYywgY2MsIDApLFxuICAgICAgICAgICAgICAgIGNyZWF0ZUNvbXBvbmVudENvbnRyb2xsZXIoZG9jLCBjYywgMSksXG4gICAgICAgICAgICAgICAgY3JlYXRlQ29tcG9uZW50Q29udHJvbGxlcihkb2MsIGNjLCAyKSxcbiAgICAgICAgICAgIF07XG4gICAgICAgICAgICBjY3MuZm9yRWFjaCgoY3MsIGluZGV4KSA9PiB7XG4gICAgICAgICAgICAgICAgY29ubmVjdFZhbHVlcyh7XG4gICAgICAgICAgICAgICAgICAgIHByaW1hcnk6IHRoaXMudmFsdWUsXG4gICAgICAgICAgICAgICAgICAgIHNlY29uZGFyeTogY3MudmFsdWUsXG4gICAgICAgICAgICAgICAgICAgIGZvcndhcmQ6IChwKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gcC5yYXdWYWx1ZS5nZXRDb21wb25lbnRzKHRoaXMuY29sb3JNb2RlLnJhd1ZhbHVlKVtpbmRleF07XG4gICAgICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgICAgIGJhY2t3YXJkOiAocCwgcykgPT4ge1xuICAgICAgICAgICAgICAgICAgICAgICAgY29uc3QgcGlja2VkTW9kZSA9IHRoaXMuY29sb3JNb2RlLnJhd1ZhbHVlO1xuICAgICAgICAgICAgICAgICAgICAgICAgY29uc3QgY29tcHMgPSBwLnJhd1ZhbHVlLmdldENvbXBvbmVudHMocGlja2VkTW9kZSk7XG4gICAgICAgICAgICAgICAgICAgICAgICBjb21wc1tpbmRleF0gPSBzLnJhd1ZhbHVlO1xuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIG5ldyBDb2xvcihhcHBlbmRBbHBoYUNvbXBvbmVudChyZW1vdmVBbHBoYUNvbXBvbmVudChjb21wcyksIGNvbXBzWzNdKSwgcGlja2VkTW9kZSk7XG4gICAgICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIHJldHVybiBjY3M7XG4gICAgICAgIH1cbiAgICAgICAgb25Nb2RlU2VsZWN0Q2hhbmdlXyhldikge1xuICAgICAgICAgICAgY29uc3Qgc2VsZWN0RWxlbSA9IGV2LmN1cnJlbnRUYXJnZXQ7XG4gICAgICAgICAgICB0aGlzLmNvbG9yTW9kZS5yYXdWYWx1ZSA9IHNlbGVjdEVsZW0udmFsdWU7XG4gICAgICAgICAgICB0aGlzLmNjc18gPSB0aGlzLmNyZWF0ZUNvbXBvbmVudENvbnRyb2xsZXJzXyh0aGlzLnZpZXcuZWxlbWVudC5vd25lckRvY3VtZW50KTtcbiAgICAgICAgICAgIHRoaXMudmlldy50ZXh0Vmlld3MgPSBbXG4gICAgICAgICAgICAgICAgdGhpcy5jY3NfWzBdLnZpZXcsXG4gICAgICAgICAgICAgICAgdGhpcy5jY3NfWzFdLnZpZXcsXG4gICAgICAgICAgICAgICAgdGhpcy5jY3NfWzJdLnZpZXcsXG4gICAgICAgICAgICBdO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgY29uc3QgY2xhc3NOYW1lJDggPSBDbGFzc05hbWUoJ2hwbCcpO1xuICAgIGNsYXNzIEhQYWxldHRlVmlldyB7XG4gICAgICAgIGNvbnN0cnVjdG9yKGRvYywgY29uZmlnKSB7XG4gICAgICAgICAgICB0aGlzLm9uVmFsdWVDaGFuZ2VfID0gdGhpcy5vblZhbHVlQ2hhbmdlXy5iaW5kKHRoaXMpO1xuICAgICAgICAgICAgdGhpcy52YWx1ZSA9IGNvbmZpZy52YWx1ZTtcbiAgICAgICAgICAgIHRoaXMudmFsdWUuZW1pdHRlci5vbignY2hhbmdlJywgdGhpcy5vblZhbHVlQ2hhbmdlXyk7XG4gICAgICAgICAgICB0aGlzLmVsZW1lbnQgPSBkb2MuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XG4gICAgICAgICAgICB0aGlzLmVsZW1lbnQuY2xhc3NMaXN0LmFkZChjbGFzc05hbWUkOCgpKTtcbiAgICAgICAgICAgIGNvbmZpZy52aWV3UHJvcHMuYmluZFRhYkluZGV4KHRoaXMuZWxlbWVudCk7XG4gICAgICAgICAgICBjb25zdCBjb2xvckVsZW0gPSBkb2MuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XG4gICAgICAgICAgICBjb2xvckVsZW0uY2xhc3NMaXN0LmFkZChjbGFzc05hbWUkOCgnYycpKTtcbiAgICAgICAgICAgIHRoaXMuZWxlbWVudC5hcHBlbmRDaGlsZChjb2xvckVsZW0pO1xuICAgICAgICAgICAgY29uc3QgbWFya2VyRWxlbSA9IGRvYy5jcmVhdGVFbGVtZW50KCdkaXYnKTtcbiAgICAgICAgICAgIG1hcmtlckVsZW0uY2xhc3NMaXN0LmFkZChjbGFzc05hbWUkOCgnbScpKTtcbiAgICAgICAgICAgIHRoaXMuZWxlbWVudC5hcHBlbmRDaGlsZChtYXJrZXJFbGVtKTtcbiAgICAgICAgICAgIHRoaXMubWFya2VyRWxlbV8gPSBtYXJrZXJFbGVtO1xuICAgICAgICAgICAgdGhpcy51cGRhdGVfKCk7XG4gICAgICAgIH1cbiAgICAgICAgdXBkYXRlXygpIHtcbiAgICAgICAgICAgIGNvbnN0IGMgPSB0aGlzLnZhbHVlLnJhd1ZhbHVlO1xuICAgICAgICAgICAgY29uc3QgW2hdID0gYy5nZXRDb21wb25lbnRzKCdoc3YnKTtcbiAgICAgICAgICAgIHRoaXMubWFya2VyRWxlbV8uc3R5bGUuYmFja2dyb3VuZENvbG9yID0gY29sb3JUb0Z1bmN0aW9uYWxSZ2JTdHJpbmcobmV3IENvbG9yKFtoLCAxMDAsIDEwMF0sICdoc3YnKSk7XG4gICAgICAgICAgICBjb25zdCBsZWZ0ID0gbWFwUmFuZ2UoaCwgMCwgMzYwLCAwLCAxMDApO1xuICAgICAgICAgICAgdGhpcy5tYXJrZXJFbGVtXy5zdHlsZS5sZWZ0ID0gYCR7bGVmdH0lYDtcbiAgICAgICAgfVxuICAgICAgICBvblZhbHVlQ2hhbmdlXygpIHtcbiAgICAgICAgICAgIHRoaXMudXBkYXRlXygpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgY2xhc3MgSFBhbGV0dGVDb250cm9sbGVyIHtcbiAgICAgICAgY29uc3RydWN0b3IoZG9jLCBjb25maWcpIHtcbiAgICAgICAgICAgIHRoaXMub25LZXlEb3duXyA9IHRoaXMub25LZXlEb3duXy5iaW5kKHRoaXMpO1xuICAgICAgICAgICAgdGhpcy5vbktleVVwXyA9IHRoaXMub25LZXlVcF8uYmluZCh0aGlzKTtcbiAgICAgICAgICAgIHRoaXMub25Qb2ludGVyRG93bl8gPSB0aGlzLm9uUG9pbnRlckRvd25fLmJpbmQodGhpcyk7XG4gICAgICAgICAgICB0aGlzLm9uUG9pbnRlck1vdmVfID0gdGhpcy5vblBvaW50ZXJNb3ZlXy5iaW5kKHRoaXMpO1xuICAgICAgICAgICAgdGhpcy5vblBvaW50ZXJVcF8gPSB0aGlzLm9uUG9pbnRlclVwXy5iaW5kKHRoaXMpO1xuICAgICAgICAgICAgdGhpcy52YWx1ZSA9IGNvbmZpZy52YWx1ZTtcbiAgICAgICAgICAgIHRoaXMudmlld1Byb3BzID0gY29uZmlnLnZpZXdQcm9wcztcbiAgICAgICAgICAgIHRoaXMudmlldyA9IG5ldyBIUGFsZXR0ZVZpZXcoZG9jLCB7XG4gICAgICAgICAgICAgICAgdmFsdWU6IHRoaXMudmFsdWUsXG4gICAgICAgICAgICAgICAgdmlld1Byb3BzOiB0aGlzLnZpZXdQcm9wcyxcbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgdGhpcy5wdEhhbmRsZXJfID0gbmV3IFBvaW50ZXJIYW5kbGVyKHRoaXMudmlldy5lbGVtZW50KTtcbiAgICAgICAgICAgIHRoaXMucHRIYW5kbGVyXy5lbWl0dGVyLm9uKCdkb3duJywgdGhpcy5vblBvaW50ZXJEb3duXyk7XG4gICAgICAgICAgICB0aGlzLnB0SGFuZGxlcl8uZW1pdHRlci5vbignbW92ZScsIHRoaXMub25Qb2ludGVyTW92ZV8pO1xuICAgICAgICAgICAgdGhpcy5wdEhhbmRsZXJfLmVtaXR0ZXIub24oJ3VwJywgdGhpcy5vblBvaW50ZXJVcF8pO1xuICAgICAgICAgICAgdGhpcy52aWV3LmVsZW1lbnQuYWRkRXZlbnRMaXN0ZW5lcigna2V5ZG93bicsIHRoaXMub25LZXlEb3duXyk7XG4gICAgICAgICAgICB0aGlzLnZpZXcuZWxlbWVudC5hZGRFdmVudExpc3RlbmVyKCdrZXl1cCcsIHRoaXMub25LZXlVcF8pO1xuICAgICAgICB9XG4gICAgICAgIGhhbmRsZVBvaW50ZXJFdmVudF8oZCwgb3B0cykge1xuICAgICAgICAgICAgaWYgKCFkLnBvaW50KSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgY29uc3QgaHVlID0gbWFwUmFuZ2UoZC5wb2ludC54LCAwLCBkLmJvdW5kcy53aWR0aCwgMCwgMzYwKTtcbiAgICAgICAgICAgIGNvbnN0IGMgPSB0aGlzLnZhbHVlLnJhd1ZhbHVlO1xuICAgICAgICAgICAgY29uc3QgWywgcywgdiwgYV0gPSBjLmdldENvbXBvbmVudHMoJ2hzdicpO1xuICAgICAgICAgICAgdGhpcy52YWx1ZS5zZXRSYXdWYWx1ZShuZXcgQ29sb3IoW2h1ZSwgcywgdiwgYV0sICdoc3YnKSwgb3B0cyk7XG4gICAgICAgIH1cbiAgICAgICAgb25Qb2ludGVyRG93bl8oZXYpIHtcbiAgICAgICAgICAgIHRoaXMuaGFuZGxlUG9pbnRlckV2ZW50Xyhldi5kYXRhLCB7XG4gICAgICAgICAgICAgICAgZm9yY2VFbWl0OiBmYWxzZSxcbiAgICAgICAgICAgICAgICBsYXN0OiBmYWxzZSxcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9XG4gICAgICAgIG9uUG9pbnRlck1vdmVfKGV2KSB7XG4gICAgICAgICAgICB0aGlzLmhhbmRsZVBvaW50ZXJFdmVudF8oZXYuZGF0YSwge1xuICAgICAgICAgICAgICAgIGZvcmNlRW1pdDogZmFsc2UsXG4gICAgICAgICAgICAgICAgbGFzdDogZmFsc2UsXG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfVxuICAgICAgICBvblBvaW50ZXJVcF8oZXYpIHtcbiAgICAgICAgICAgIHRoaXMuaGFuZGxlUG9pbnRlckV2ZW50Xyhldi5kYXRhLCB7XG4gICAgICAgICAgICAgICAgZm9yY2VFbWl0OiB0cnVlLFxuICAgICAgICAgICAgICAgIGxhc3Q6IHRydWUsXG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfVxuICAgICAgICBvbktleURvd25fKGV2KSB7XG4gICAgICAgICAgICBjb25zdCBzdGVwID0gZ2V0U3RlcEZvcktleShnZXRCYXNlU3RlcEZvckNvbG9yKGZhbHNlKSwgZ2V0SG9yaXpvbnRhbFN0ZXBLZXlzKGV2KSk7XG4gICAgICAgICAgICBpZiAoc3RlcCA9PT0gMCkge1xuICAgICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGNvbnN0IGMgPSB0aGlzLnZhbHVlLnJhd1ZhbHVlO1xuICAgICAgICAgICAgY29uc3QgW2gsIHMsIHYsIGFdID0gYy5nZXRDb21wb25lbnRzKCdoc3YnKTtcbiAgICAgICAgICAgIHRoaXMudmFsdWUuc2V0UmF3VmFsdWUobmV3IENvbG9yKFtoICsgc3RlcCwgcywgdiwgYV0sICdoc3YnKSwge1xuICAgICAgICAgICAgICAgIGZvcmNlRW1pdDogZmFsc2UsXG4gICAgICAgICAgICAgICAgbGFzdDogZmFsc2UsXG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfVxuICAgICAgICBvbktleVVwXyhldikge1xuICAgICAgICAgICAgY29uc3Qgc3RlcCA9IGdldFN0ZXBGb3JLZXkoZ2V0QmFzZVN0ZXBGb3JDb2xvcihmYWxzZSksIGdldEhvcml6b250YWxTdGVwS2V5cyhldikpO1xuICAgICAgICAgICAgaWYgKHN0ZXAgPT09IDApIHtcbiAgICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICB0aGlzLnZhbHVlLnNldFJhd1ZhbHVlKHRoaXMudmFsdWUucmF3VmFsdWUsIHtcbiAgICAgICAgICAgICAgICBmb3JjZUVtaXQ6IHRydWUsXG4gICAgICAgICAgICAgICAgbGFzdDogdHJ1ZSxcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgY29uc3QgY2xhc3NOYW1lJDcgPSBDbGFzc05hbWUoJ3N2cCcpO1xuICAgIGNvbnN0IENBTlZBU19SRVNPTCA9IDY0O1xuICAgIGNsYXNzIFN2UGFsZXR0ZVZpZXcge1xuICAgICAgICBjb25zdHJ1Y3Rvcihkb2MsIGNvbmZpZykge1xuICAgICAgICAgICAgdGhpcy5vblZhbHVlQ2hhbmdlXyA9IHRoaXMub25WYWx1ZUNoYW5nZV8uYmluZCh0aGlzKTtcbiAgICAgICAgICAgIHRoaXMudmFsdWUgPSBjb25maWcudmFsdWU7XG4gICAgICAgICAgICB0aGlzLnZhbHVlLmVtaXR0ZXIub24oJ2NoYW5nZScsIHRoaXMub25WYWx1ZUNoYW5nZV8pO1xuICAgICAgICAgICAgdGhpcy5lbGVtZW50ID0gZG9jLmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xuICAgICAgICAgICAgdGhpcy5lbGVtZW50LmNsYXNzTGlzdC5hZGQoY2xhc3NOYW1lJDcoKSk7XG4gICAgICAgICAgICBjb25maWcudmlld1Byb3BzLmJpbmRUYWJJbmRleCh0aGlzLmVsZW1lbnQpO1xuICAgICAgICAgICAgY29uc3QgY2FudmFzRWxlbSA9IGRvYy5jcmVhdGVFbGVtZW50KCdjYW52YXMnKTtcbiAgICAgICAgICAgIGNhbnZhc0VsZW0uaGVpZ2h0ID0gQ0FOVkFTX1JFU09MO1xuICAgICAgICAgICAgY2FudmFzRWxlbS53aWR0aCA9IENBTlZBU19SRVNPTDtcbiAgICAgICAgICAgIGNhbnZhc0VsZW0uY2xhc3NMaXN0LmFkZChjbGFzc05hbWUkNygnYycpKTtcbiAgICAgICAgICAgIHRoaXMuZWxlbWVudC5hcHBlbmRDaGlsZChjYW52YXNFbGVtKTtcbiAgICAgICAgICAgIHRoaXMuY2FudmFzRWxlbWVudCA9IGNhbnZhc0VsZW07XG4gICAgICAgICAgICBjb25zdCBtYXJrZXJFbGVtID0gZG9jLmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xuICAgICAgICAgICAgbWFya2VyRWxlbS5jbGFzc0xpc3QuYWRkKGNsYXNzTmFtZSQ3KCdtJykpO1xuICAgICAgICAgICAgdGhpcy5lbGVtZW50LmFwcGVuZENoaWxkKG1hcmtlckVsZW0pO1xuICAgICAgICAgICAgdGhpcy5tYXJrZXJFbGVtXyA9IG1hcmtlckVsZW07XG4gICAgICAgICAgICB0aGlzLnVwZGF0ZV8oKTtcbiAgICAgICAgfVxuICAgICAgICB1cGRhdGVfKCkge1xuICAgICAgICAgICAgY29uc3QgY3R4ID0gZ2V0Q2FudmFzQ29udGV4dCh0aGlzLmNhbnZhc0VsZW1lbnQpO1xuICAgICAgICAgICAgaWYgKCFjdHgpIHtcbiAgICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBjb25zdCBjID0gdGhpcy52YWx1ZS5yYXdWYWx1ZTtcbiAgICAgICAgICAgIGNvbnN0IGhzdkNvbXBzID0gYy5nZXRDb21wb25lbnRzKCdoc3YnKTtcbiAgICAgICAgICAgIGNvbnN0IHdpZHRoID0gdGhpcy5jYW52YXNFbGVtZW50LndpZHRoO1xuICAgICAgICAgICAgY29uc3QgaGVpZ2h0ID0gdGhpcy5jYW52YXNFbGVtZW50LmhlaWdodDtcbiAgICAgICAgICAgIGNvbnN0IGltZ0RhdGEgPSBjdHguZ2V0SW1hZ2VEYXRhKDAsIDAsIHdpZHRoLCBoZWlnaHQpO1xuICAgICAgICAgICAgY29uc3QgZGF0YSA9IGltZ0RhdGEuZGF0YTtcbiAgICAgICAgICAgIGZvciAobGV0IGl5ID0gMDsgaXkgPCBoZWlnaHQ7IGl5KyspIHtcbiAgICAgICAgICAgICAgICBmb3IgKGxldCBpeCA9IDA7IGl4IDwgd2lkdGg7IGl4KyspIHtcbiAgICAgICAgICAgICAgICAgICAgY29uc3QgcyA9IG1hcFJhbmdlKGl4LCAwLCB3aWR0aCwgMCwgMTAwKTtcbiAgICAgICAgICAgICAgICAgICAgY29uc3QgdiA9IG1hcFJhbmdlKGl5LCAwLCBoZWlnaHQsIDEwMCwgMCk7XG4gICAgICAgICAgICAgICAgICAgIGNvbnN0IHJnYkNvbXBzID0gaHN2VG9SZ2IoaHN2Q29tcHNbMF0sIHMsIHYpO1xuICAgICAgICAgICAgICAgICAgICBjb25zdCBpID0gKGl5ICogd2lkdGggKyBpeCkgKiA0O1xuICAgICAgICAgICAgICAgICAgICBkYXRhW2ldID0gcmdiQ29tcHNbMF07XG4gICAgICAgICAgICAgICAgICAgIGRhdGFbaSArIDFdID0gcmdiQ29tcHNbMV07XG4gICAgICAgICAgICAgICAgICAgIGRhdGFbaSArIDJdID0gcmdiQ29tcHNbMl07XG4gICAgICAgICAgICAgICAgICAgIGRhdGFbaSArIDNdID0gMjU1O1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGN0eC5wdXRJbWFnZURhdGEoaW1nRGF0YSwgMCwgMCk7XG4gICAgICAgICAgICBjb25zdCBsZWZ0ID0gbWFwUmFuZ2UoaHN2Q29tcHNbMV0sIDAsIDEwMCwgMCwgMTAwKTtcbiAgICAgICAgICAgIHRoaXMubWFya2VyRWxlbV8uc3R5bGUubGVmdCA9IGAke2xlZnR9JWA7XG4gICAgICAgICAgICBjb25zdCB0b3AgPSBtYXBSYW5nZShoc3ZDb21wc1syXSwgMCwgMTAwLCAxMDAsIDApO1xuICAgICAgICAgICAgdGhpcy5tYXJrZXJFbGVtXy5zdHlsZS50b3AgPSBgJHt0b3B9JWA7XG4gICAgICAgIH1cbiAgICAgICAgb25WYWx1ZUNoYW5nZV8oKSB7XG4gICAgICAgICAgICB0aGlzLnVwZGF0ZV8oKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIGNsYXNzIFN2UGFsZXR0ZUNvbnRyb2xsZXIge1xuICAgICAgICBjb25zdHJ1Y3Rvcihkb2MsIGNvbmZpZykge1xuICAgICAgICAgICAgdGhpcy5vbktleURvd25fID0gdGhpcy5vbktleURvd25fLmJpbmQodGhpcyk7XG4gICAgICAgICAgICB0aGlzLm9uS2V5VXBfID0gdGhpcy5vbktleVVwXy5iaW5kKHRoaXMpO1xuICAgICAgICAgICAgdGhpcy5vblBvaW50ZXJEb3duXyA9IHRoaXMub25Qb2ludGVyRG93bl8uYmluZCh0aGlzKTtcbiAgICAgICAgICAgIHRoaXMub25Qb2ludGVyTW92ZV8gPSB0aGlzLm9uUG9pbnRlck1vdmVfLmJpbmQodGhpcyk7XG4gICAgICAgICAgICB0aGlzLm9uUG9pbnRlclVwXyA9IHRoaXMub25Qb2ludGVyVXBfLmJpbmQodGhpcyk7XG4gICAgICAgICAgICB0aGlzLnZhbHVlID0gY29uZmlnLnZhbHVlO1xuICAgICAgICAgICAgdGhpcy52aWV3UHJvcHMgPSBjb25maWcudmlld1Byb3BzO1xuICAgICAgICAgICAgdGhpcy52aWV3ID0gbmV3IFN2UGFsZXR0ZVZpZXcoZG9jLCB7XG4gICAgICAgICAgICAgICAgdmFsdWU6IHRoaXMudmFsdWUsXG4gICAgICAgICAgICAgICAgdmlld1Byb3BzOiB0aGlzLnZpZXdQcm9wcyxcbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgdGhpcy5wdEhhbmRsZXJfID0gbmV3IFBvaW50ZXJIYW5kbGVyKHRoaXMudmlldy5lbGVtZW50KTtcbiAgICAgICAgICAgIHRoaXMucHRIYW5kbGVyXy5lbWl0dGVyLm9uKCdkb3duJywgdGhpcy5vblBvaW50ZXJEb3duXyk7XG4gICAgICAgICAgICB0aGlzLnB0SGFuZGxlcl8uZW1pdHRlci5vbignbW92ZScsIHRoaXMub25Qb2ludGVyTW92ZV8pO1xuICAgICAgICAgICAgdGhpcy5wdEhhbmRsZXJfLmVtaXR0ZXIub24oJ3VwJywgdGhpcy5vblBvaW50ZXJVcF8pO1xuICAgICAgICAgICAgdGhpcy52aWV3LmVsZW1lbnQuYWRkRXZlbnRMaXN0ZW5lcigna2V5ZG93bicsIHRoaXMub25LZXlEb3duXyk7XG4gICAgICAgICAgICB0aGlzLnZpZXcuZWxlbWVudC5hZGRFdmVudExpc3RlbmVyKCdrZXl1cCcsIHRoaXMub25LZXlVcF8pO1xuICAgICAgICB9XG4gICAgICAgIGhhbmRsZVBvaW50ZXJFdmVudF8oZCwgb3B0cykge1xuICAgICAgICAgICAgaWYgKCFkLnBvaW50KSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgY29uc3Qgc2F0dXJhdGlvbiA9IG1hcFJhbmdlKGQucG9pbnQueCwgMCwgZC5ib3VuZHMud2lkdGgsIDAsIDEwMCk7XG4gICAgICAgICAgICBjb25zdCB2YWx1ZSA9IG1hcFJhbmdlKGQucG9pbnQueSwgMCwgZC5ib3VuZHMuaGVpZ2h0LCAxMDAsIDApO1xuICAgICAgICAgICAgY29uc3QgW2gsICwgLCBhXSA9IHRoaXMudmFsdWUucmF3VmFsdWUuZ2V0Q29tcG9uZW50cygnaHN2Jyk7XG4gICAgICAgICAgICB0aGlzLnZhbHVlLnNldFJhd1ZhbHVlKG5ldyBDb2xvcihbaCwgc2F0dXJhdGlvbiwgdmFsdWUsIGFdLCAnaHN2JyksIG9wdHMpO1xuICAgICAgICB9XG4gICAgICAgIG9uUG9pbnRlckRvd25fKGV2KSB7XG4gICAgICAgICAgICB0aGlzLmhhbmRsZVBvaW50ZXJFdmVudF8oZXYuZGF0YSwge1xuICAgICAgICAgICAgICAgIGZvcmNlRW1pdDogZmFsc2UsXG4gICAgICAgICAgICAgICAgbGFzdDogZmFsc2UsXG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfVxuICAgICAgICBvblBvaW50ZXJNb3ZlXyhldikge1xuICAgICAgICAgICAgdGhpcy5oYW5kbGVQb2ludGVyRXZlbnRfKGV2LmRhdGEsIHtcbiAgICAgICAgICAgICAgICBmb3JjZUVtaXQ6IGZhbHNlLFxuICAgICAgICAgICAgICAgIGxhc3Q6IGZhbHNlLFxuICAgICAgICAgICAgfSk7XG4gICAgICAgIH1cbiAgICAgICAgb25Qb2ludGVyVXBfKGV2KSB7XG4gICAgICAgICAgICB0aGlzLmhhbmRsZVBvaW50ZXJFdmVudF8oZXYuZGF0YSwge1xuICAgICAgICAgICAgICAgIGZvcmNlRW1pdDogdHJ1ZSxcbiAgICAgICAgICAgICAgICBsYXN0OiB0cnVlLFxuICAgICAgICAgICAgfSk7XG4gICAgICAgIH1cbiAgICAgICAgb25LZXlEb3duXyhldikge1xuICAgICAgICAgICAgaWYgKGlzQXJyb3dLZXkoZXYua2V5KSkge1xuICAgICAgICAgICAgICAgIGV2LnByZXZlbnREZWZhdWx0KCk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBjb25zdCBbaCwgcywgdiwgYV0gPSB0aGlzLnZhbHVlLnJhd1ZhbHVlLmdldENvbXBvbmVudHMoJ2hzdicpO1xuICAgICAgICAgICAgY29uc3QgYmFzZVN0ZXAgPSBnZXRCYXNlU3RlcEZvckNvbG9yKGZhbHNlKTtcbiAgICAgICAgICAgIGNvbnN0IGRzID0gZ2V0U3RlcEZvcktleShiYXNlU3RlcCwgZ2V0SG9yaXpvbnRhbFN0ZXBLZXlzKGV2KSk7XG4gICAgICAgICAgICBjb25zdCBkdiA9IGdldFN0ZXBGb3JLZXkoYmFzZVN0ZXAsIGdldFZlcnRpY2FsU3RlcEtleXMoZXYpKTtcbiAgICAgICAgICAgIGlmIChkcyA9PT0gMCAmJiBkdiA9PT0gMCkge1xuICAgICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHRoaXMudmFsdWUuc2V0UmF3VmFsdWUobmV3IENvbG9yKFtoLCBzICsgZHMsIHYgKyBkdiwgYV0sICdoc3YnKSwge1xuICAgICAgICAgICAgICAgIGZvcmNlRW1pdDogZmFsc2UsXG4gICAgICAgICAgICAgICAgbGFzdDogZmFsc2UsXG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfVxuICAgICAgICBvbktleVVwXyhldikge1xuICAgICAgICAgICAgY29uc3QgYmFzZVN0ZXAgPSBnZXRCYXNlU3RlcEZvckNvbG9yKGZhbHNlKTtcbiAgICAgICAgICAgIGNvbnN0IGRzID0gZ2V0U3RlcEZvcktleShiYXNlU3RlcCwgZ2V0SG9yaXpvbnRhbFN0ZXBLZXlzKGV2KSk7XG4gICAgICAgICAgICBjb25zdCBkdiA9IGdldFN0ZXBGb3JLZXkoYmFzZVN0ZXAsIGdldFZlcnRpY2FsU3RlcEtleXMoZXYpKTtcbiAgICAgICAgICAgIGlmIChkcyA9PT0gMCAmJiBkdiA9PT0gMCkge1xuICAgICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHRoaXMudmFsdWUuc2V0UmF3VmFsdWUodGhpcy52YWx1ZS5yYXdWYWx1ZSwge1xuICAgICAgICAgICAgICAgIGZvcmNlRW1pdDogdHJ1ZSxcbiAgICAgICAgICAgICAgICBsYXN0OiB0cnVlLFxuICAgICAgICAgICAgfSk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBjbGFzcyBDb2xvclBpY2tlckNvbnRyb2xsZXIge1xuICAgICAgICBjb25zdHJ1Y3Rvcihkb2MsIGNvbmZpZykge1xuICAgICAgICAgICAgdGhpcy52YWx1ZSA9IGNvbmZpZy52YWx1ZTtcbiAgICAgICAgICAgIHRoaXMudmlld1Byb3BzID0gY29uZmlnLnZpZXdQcm9wcztcbiAgICAgICAgICAgIHRoaXMuaFBhbGV0dGVDXyA9IG5ldyBIUGFsZXR0ZUNvbnRyb2xsZXIoZG9jLCB7XG4gICAgICAgICAgICAgICAgdmFsdWU6IHRoaXMudmFsdWUsXG4gICAgICAgICAgICAgICAgdmlld1Byb3BzOiB0aGlzLnZpZXdQcm9wcyxcbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgdGhpcy5zdlBhbGV0dGVDXyA9IG5ldyBTdlBhbGV0dGVDb250cm9sbGVyKGRvYywge1xuICAgICAgICAgICAgICAgIHZhbHVlOiB0aGlzLnZhbHVlLFxuICAgICAgICAgICAgICAgIHZpZXdQcm9wczogdGhpcy52aWV3UHJvcHMsXG4gICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIHRoaXMuYWxwaGFJY3NfID0gY29uZmlnLnN1cHBvcnRzQWxwaGFcbiAgICAgICAgICAgICAgICA/IHtcbiAgICAgICAgICAgICAgICAgICAgcGFsZXR0ZTogbmV3IEFQYWxldHRlQ29udHJvbGxlcihkb2MsIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHZhbHVlOiB0aGlzLnZhbHVlLFxuICAgICAgICAgICAgICAgICAgICAgICAgdmlld1Byb3BzOiB0aGlzLnZpZXdQcm9wcyxcbiAgICAgICAgICAgICAgICAgICAgfSksXG4gICAgICAgICAgICAgICAgICAgIHRleHQ6IG5ldyBOdW1iZXJUZXh0Q29udHJvbGxlcihkb2MsIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHBhcnNlcjogcGFyc2VOdW1iZXIsXG4gICAgICAgICAgICAgICAgICAgICAgICBiYXNlU3RlcDogMC4xLFxuICAgICAgICAgICAgICAgICAgICAgICAgcHJvcHM6IFZhbHVlTWFwLmZyb21PYmplY3Qoe1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGRyYWdnaW5nU2NhbGU6IDAuMDEsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZm9ybWF0dGVyOiBjcmVhdGVOdW1iZXJGb3JtYXR0ZXIoMiksXG4gICAgICAgICAgICAgICAgICAgICAgICB9KSxcbiAgICAgICAgICAgICAgICAgICAgICAgIHZhbHVlOiBjcmVhdGVWYWx1ZSgwLCB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY29uc3RyYWludDogbmV3IFJhbmdlQ29uc3RyYWludCh7IG1pbjogMCwgbWF4OiAxIH0pLFxuICAgICAgICAgICAgICAgICAgICAgICAgfSksXG4gICAgICAgICAgICAgICAgICAgICAgICB2aWV3UHJvcHM6IHRoaXMudmlld1Byb3BzLFxuICAgICAgICAgICAgICAgICAgICB9KSxcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgOiBudWxsO1xuICAgICAgICAgICAgaWYgKHRoaXMuYWxwaGFJY3NfKSB7XG4gICAgICAgICAgICAgICAgY29ubmVjdFZhbHVlcyh7XG4gICAgICAgICAgICAgICAgICAgIHByaW1hcnk6IHRoaXMudmFsdWUsXG4gICAgICAgICAgICAgICAgICAgIHNlY29uZGFyeTogdGhpcy5hbHBoYUljc18udGV4dC52YWx1ZSxcbiAgICAgICAgICAgICAgICAgICAgZm9yd2FyZDogKHApID0+IHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBwLnJhd1ZhbHVlLmdldENvbXBvbmVudHMoKVszXTtcbiAgICAgICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICAgICAgYmFja3dhcmQ6IChwLCBzKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgICAgICBjb25zdCBjb21wcyA9IHAucmF3VmFsdWUuZ2V0Q29tcG9uZW50cygpO1xuICAgICAgICAgICAgICAgICAgICAgICAgY29tcHNbM10gPSBzLnJhd1ZhbHVlO1xuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIG5ldyBDb2xvcihjb21wcywgcC5yYXdWYWx1ZS5tb2RlKTtcbiAgICAgICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHRoaXMudGV4dENfID0gbmV3IENvbG9yVGV4dENvbnRyb2xsZXIoZG9jLCB7XG4gICAgICAgICAgICAgICAgcGFyc2VyOiBwYXJzZU51bWJlcixcbiAgICAgICAgICAgICAgICB2YWx1ZTogdGhpcy52YWx1ZSxcbiAgICAgICAgICAgICAgICB2aWV3UHJvcHM6IHRoaXMudmlld1Byb3BzLFxuICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB0aGlzLnZpZXcgPSBuZXcgQ29sb3JQaWNrZXJWaWV3KGRvYywge1xuICAgICAgICAgICAgICAgIGFscGhhVmlld3M6IHRoaXMuYWxwaGFJY3NfXG4gICAgICAgICAgICAgICAgICAgID8ge1xuICAgICAgICAgICAgICAgICAgICAgICAgcGFsZXR0ZTogdGhpcy5hbHBoYUljc18ucGFsZXR0ZS52aWV3LFxuICAgICAgICAgICAgICAgICAgICAgICAgdGV4dDogdGhpcy5hbHBoYUljc18udGV4dC52aWV3LFxuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIDogbnVsbCxcbiAgICAgICAgICAgICAgICBoUGFsZXR0ZVZpZXc6IHRoaXMuaFBhbGV0dGVDXy52aWV3LFxuICAgICAgICAgICAgICAgIHN1cHBvcnRzQWxwaGE6IGNvbmZpZy5zdXBwb3J0c0FscGhhLFxuICAgICAgICAgICAgICAgIHN2UGFsZXR0ZVZpZXc6IHRoaXMuc3ZQYWxldHRlQ18udmlldyxcbiAgICAgICAgICAgICAgICB0ZXh0VmlldzogdGhpcy50ZXh0Q18udmlldyxcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9XG4gICAgICAgIGdldCB0ZXh0Q29udHJvbGxlcigpIHtcbiAgICAgICAgICAgIHJldHVybiB0aGlzLnRleHRDXztcbiAgICAgICAgfVxuICAgIH1cblxuICAgIGNvbnN0IGNsYXNzTmFtZSQ2ID0gQ2xhc3NOYW1lKCdjb2xzdycpO1xuICAgIGNsYXNzIENvbG9yU3dhdGNoVmlldyB7XG4gICAgICAgIGNvbnN0cnVjdG9yKGRvYywgY29uZmlnKSB7XG4gICAgICAgICAgICB0aGlzLm9uVmFsdWVDaGFuZ2VfID0gdGhpcy5vblZhbHVlQ2hhbmdlXy5iaW5kKHRoaXMpO1xuICAgICAgICAgICAgY29uZmlnLnZhbHVlLmVtaXR0ZXIub24oJ2NoYW5nZScsIHRoaXMub25WYWx1ZUNoYW5nZV8pO1xuICAgICAgICAgICAgdGhpcy52YWx1ZSA9IGNvbmZpZy52YWx1ZTtcbiAgICAgICAgICAgIHRoaXMuZWxlbWVudCA9IGRvYy5jcmVhdGVFbGVtZW50KCdkaXYnKTtcbiAgICAgICAgICAgIHRoaXMuZWxlbWVudC5jbGFzc0xpc3QuYWRkKGNsYXNzTmFtZSQ2KCkpO1xuICAgICAgICAgICAgY29uZmlnLnZpZXdQcm9wcy5iaW5kQ2xhc3NNb2RpZmllcnModGhpcy5lbGVtZW50KTtcbiAgICAgICAgICAgIGNvbnN0IHN3YXRjaEVsZW0gPSBkb2MuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XG4gICAgICAgICAgICBzd2F0Y2hFbGVtLmNsYXNzTGlzdC5hZGQoY2xhc3NOYW1lJDYoJ3N3JykpO1xuICAgICAgICAgICAgdGhpcy5lbGVtZW50LmFwcGVuZENoaWxkKHN3YXRjaEVsZW0pO1xuICAgICAgICAgICAgdGhpcy5zd2F0Y2hFbGVtXyA9IHN3YXRjaEVsZW07XG4gICAgICAgICAgICBjb25zdCBidXR0b25FbGVtID0gZG9jLmNyZWF0ZUVsZW1lbnQoJ2J1dHRvbicpO1xuICAgICAgICAgICAgYnV0dG9uRWxlbS5jbGFzc0xpc3QuYWRkKGNsYXNzTmFtZSQ2KCdiJykpO1xuICAgICAgICAgICAgY29uZmlnLnZpZXdQcm9wcy5iaW5kRGlzYWJsZWQoYnV0dG9uRWxlbSk7XG4gICAgICAgICAgICB0aGlzLmVsZW1lbnQuYXBwZW5kQ2hpbGQoYnV0dG9uRWxlbSk7XG4gICAgICAgICAgICB0aGlzLmJ1dHRvbkVsZW1lbnQgPSBidXR0b25FbGVtO1xuICAgICAgICAgICAgdGhpcy51cGRhdGVfKCk7XG4gICAgICAgIH1cbiAgICAgICAgdXBkYXRlXygpIHtcbiAgICAgICAgICAgIGNvbnN0IHZhbHVlID0gdGhpcy52YWx1ZS5yYXdWYWx1ZTtcbiAgICAgICAgICAgIHRoaXMuc3dhdGNoRWxlbV8uc3R5bGUuYmFja2dyb3VuZENvbG9yID0gY29sb3JUb0hleFJnYmFTdHJpbmcodmFsdWUpO1xuICAgICAgICB9XG4gICAgICAgIG9uVmFsdWVDaGFuZ2VfKCkge1xuICAgICAgICAgICAgdGhpcy51cGRhdGVfKCk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBjbGFzcyBDb2xvclN3YXRjaENvbnRyb2xsZXIge1xuICAgICAgICBjb25zdHJ1Y3Rvcihkb2MsIGNvbmZpZykge1xuICAgICAgICAgICAgdGhpcy52YWx1ZSA9IGNvbmZpZy52YWx1ZTtcbiAgICAgICAgICAgIHRoaXMudmlld1Byb3BzID0gY29uZmlnLnZpZXdQcm9wcztcbiAgICAgICAgICAgIHRoaXMudmlldyA9IG5ldyBDb2xvclN3YXRjaFZpZXcoZG9jLCB7XG4gICAgICAgICAgICAgICAgdmFsdWU6IHRoaXMudmFsdWUsXG4gICAgICAgICAgICAgICAgdmlld1Byb3BzOiB0aGlzLnZpZXdQcm9wcyxcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgY2xhc3MgQ29sb3JDb250cm9sbGVyIHtcbiAgICAgICAgY29uc3RydWN0b3IoZG9jLCBjb25maWcpIHtcbiAgICAgICAgICAgIHRoaXMub25CdXR0b25CbHVyXyA9IHRoaXMub25CdXR0b25CbHVyXy5iaW5kKHRoaXMpO1xuICAgICAgICAgICAgdGhpcy5vbkJ1dHRvbkNsaWNrXyA9IHRoaXMub25CdXR0b25DbGlja18uYmluZCh0aGlzKTtcbiAgICAgICAgICAgIHRoaXMub25Qb3B1cENoaWxkQmx1cl8gPSB0aGlzLm9uUG9wdXBDaGlsZEJsdXJfLmJpbmQodGhpcyk7XG4gICAgICAgICAgICB0aGlzLm9uUG9wdXBDaGlsZEtleWRvd25fID0gdGhpcy5vblBvcHVwQ2hpbGRLZXlkb3duXy5iaW5kKHRoaXMpO1xuICAgICAgICAgICAgdGhpcy52YWx1ZSA9IGNvbmZpZy52YWx1ZTtcbiAgICAgICAgICAgIHRoaXMudmlld1Byb3BzID0gY29uZmlnLnZpZXdQcm9wcztcbiAgICAgICAgICAgIHRoaXMuZm9sZGFibGVfID0gRm9sZGFibGUuY3JlYXRlKGNvbmZpZy5leHBhbmRlZCk7XG4gICAgICAgICAgICB0aGlzLnN3YXRjaENfID0gbmV3IENvbG9yU3dhdGNoQ29udHJvbGxlcihkb2MsIHtcbiAgICAgICAgICAgICAgICB2YWx1ZTogdGhpcy52YWx1ZSxcbiAgICAgICAgICAgICAgICB2aWV3UHJvcHM6IHRoaXMudmlld1Byb3BzLFxuICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICBjb25zdCBidXR0b25FbGVtID0gdGhpcy5zd2F0Y2hDXy52aWV3LmJ1dHRvbkVsZW1lbnQ7XG4gICAgICAgICAgICBidXR0b25FbGVtLmFkZEV2ZW50TGlzdGVuZXIoJ2JsdXInLCB0aGlzLm9uQnV0dG9uQmx1cl8pO1xuICAgICAgICAgICAgYnV0dG9uRWxlbS5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIHRoaXMub25CdXR0b25DbGlja18pO1xuICAgICAgICAgICAgdGhpcy50ZXh0Q18gPSBuZXcgVGV4dENvbnRyb2xsZXIoZG9jLCB7XG4gICAgICAgICAgICAgICAgcGFyc2VyOiBjb25maWcucGFyc2VyLFxuICAgICAgICAgICAgICAgIHByb3BzOiBWYWx1ZU1hcC5mcm9tT2JqZWN0KHtcbiAgICAgICAgICAgICAgICAgICAgZm9ybWF0dGVyOiBjb25maWcuZm9ybWF0dGVyLFxuICAgICAgICAgICAgICAgIH0pLFxuICAgICAgICAgICAgICAgIHZhbHVlOiB0aGlzLnZhbHVlLFxuICAgICAgICAgICAgICAgIHZpZXdQcm9wczogdGhpcy52aWV3UHJvcHMsXG4gICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIHRoaXMudmlldyA9IG5ldyBDb2xvclZpZXcoZG9jLCB7XG4gICAgICAgICAgICAgICAgZm9sZGFibGU6IHRoaXMuZm9sZGFibGVfLFxuICAgICAgICAgICAgICAgIHBpY2tlckxheW91dDogY29uZmlnLnBpY2tlckxheW91dCxcbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgdGhpcy52aWV3LnN3YXRjaEVsZW1lbnQuYXBwZW5kQ2hpbGQodGhpcy5zd2F0Y2hDXy52aWV3LmVsZW1lbnQpO1xuICAgICAgICAgICAgdGhpcy52aWV3LnRleHRFbGVtZW50LmFwcGVuZENoaWxkKHRoaXMudGV4dENfLnZpZXcuZWxlbWVudCk7XG4gICAgICAgICAgICB0aGlzLnBvcENfID1cbiAgICAgICAgICAgICAgICBjb25maWcucGlja2VyTGF5b3V0ID09PSAncG9wdXAnXG4gICAgICAgICAgICAgICAgICAgID8gbmV3IFBvcHVwQ29udHJvbGxlcihkb2MsIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHZpZXdQcm9wczogdGhpcy52aWV3UHJvcHMsXG4gICAgICAgICAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAgICAgICAgIDogbnVsbDtcbiAgICAgICAgICAgIGNvbnN0IHBpY2tlckMgPSBuZXcgQ29sb3JQaWNrZXJDb250cm9sbGVyKGRvYywge1xuICAgICAgICAgICAgICAgIHN1cHBvcnRzQWxwaGE6IGNvbmZpZy5zdXBwb3J0c0FscGhhLFxuICAgICAgICAgICAgICAgIHZhbHVlOiB0aGlzLnZhbHVlLFxuICAgICAgICAgICAgICAgIHZpZXdQcm9wczogdGhpcy52aWV3UHJvcHMsXG4gICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIHBpY2tlckMudmlldy5hbGxGb2N1c2FibGVFbGVtZW50cy5mb3JFYWNoKChlbGVtKSA9PiB7XG4gICAgICAgICAgICAgICAgZWxlbS5hZGRFdmVudExpc3RlbmVyKCdibHVyJywgdGhpcy5vblBvcHVwQ2hpbGRCbHVyXyk7XG4gICAgICAgICAgICAgICAgZWxlbS5hZGRFdmVudExpc3RlbmVyKCdrZXlkb3duJywgdGhpcy5vblBvcHVwQ2hpbGRLZXlkb3duXyk7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIHRoaXMucGlja2VyQ18gPSBwaWNrZXJDO1xuICAgICAgICAgICAgaWYgKHRoaXMucG9wQ18pIHtcbiAgICAgICAgICAgICAgICB0aGlzLnZpZXcuZWxlbWVudC5hcHBlbmRDaGlsZCh0aGlzLnBvcENfLnZpZXcuZWxlbWVudCk7XG4gICAgICAgICAgICAgICAgdGhpcy5wb3BDXy52aWV3LmVsZW1lbnQuYXBwZW5kQ2hpbGQocGlja2VyQy52aWV3LmVsZW1lbnQpO1xuICAgICAgICAgICAgICAgIGNvbm5lY3RWYWx1ZXMoe1xuICAgICAgICAgICAgICAgICAgICBwcmltYXJ5OiB0aGlzLmZvbGRhYmxlXy52YWx1ZSgnZXhwYW5kZWQnKSxcbiAgICAgICAgICAgICAgICAgICAgc2Vjb25kYXJ5OiB0aGlzLnBvcENfLnNob3dzLFxuICAgICAgICAgICAgICAgICAgICBmb3J3YXJkOiAocCkgPT4gcC5yYXdWYWx1ZSxcbiAgICAgICAgICAgICAgICAgICAgYmFja3dhcmQ6IChfLCBzKSA9PiBzLnJhd1ZhbHVlLFxuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxzZSBpZiAodGhpcy52aWV3LnBpY2tlckVsZW1lbnQpIHtcbiAgICAgICAgICAgICAgICB0aGlzLnZpZXcucGlja2VyRWxlbWVudC5hcHBlbmRDaGlsZCh0aGlzLnBpY2tlckNfLnZpZXcuZWxlbWVudCk7XG4gICAgICAgICAgICAgICAgYmluZEZvbGRhYmxlKHRoaXMuZm9sZGFibGVfLCB0aGlzLnZpZXcucGlja2VyRWxlbWVudCk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgZ2V0IHRleHRDb250cm9sbGVyKCkge1xuICAgICAgICAgICAgcmV0dXJuIHRoaXMudGV4dENfO1xuICAgICAgICB9XG4gICAgICAgIG9uQnV0dG9uQmx1cl8oZSkge1xuICAgICAgICAgICAgaWYgKCF0aGlzLnBvcENfKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgY29uc3QgZWxlbSA9IHRoaXMudmlldy5lbGVtZW50O1xuICAgICAgICAgICAgY29uc3QgbmV4dFRhcmdldCA9IGZvcmNlQ2FzdChlLnJlbGF0ZWRUYXJnZXQpO1xuICAgICAgICAgICAgaWYgKCFuZXh0VGFyZ2V0IHx8ICFlbGVtLmNvbnRhaW5zKG5leHRUYXJnZXQpKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5wb3BDXy5zaG93cy5yYXdWYWx1ZSA9IGZhbHNlO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIG9uQnV0dG9uQ2xpY2tfKCkge1xuICAgICAgICAgICAgdGhpcy5mb2xkYWJsZV8uc2V0KCdleHBhbmRlZCcsICF0aGlzLmZvbGRhYmxlXy5nZXQoJ2V4cGFuZGVkJykpO1xuICAgICAgICAgICAgaWYgKHRoaXMuZm9sZGFibGVfLmdldCgnZXhwYW5kZWQnKSkge1xuICAgICAgICAgICAgICAgIHRoaXMucGlja2VyQ18udmlldy5hbGxGb2N1c2FibGVFbGVtZW50c1swXS5mb2N1cygpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIG9uUG9wdXBDaGlsZEJsdXJfKGV2KSB7XG4gICAgICAgICAgICBpZiAoIXRoaXMucG9wQ18pIHtcbiAgICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBjb25zdCBlbGVtID0gdGhpcy5wb3BDXy52aWV3LmVsZW1lbnQ7XG4gICAgICAgICAgICBjb25zdCBuZXh0VGFyZ2V0ID0gZmluZE5leHRUYXJnZXQoZXYpO1xuICAgICAgICAgICAgaWYgKG5leHRUYXJnZXQgJiYgZWxlbS5jb250YWlucyhuZXh0VGFyZ2V0KSkge1xuICAgICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGlmIChuZXh0VGFyZ2V0ICYmXG4gICAgICAgICAgICAgICAgbmV4dFRhcmdldCA9PT0gdGhpcy5zd2F0Y2hDXy52aWV3LmJ1dHRvbkVsZW1lbnQgJiZcbiAgICAgICAgICAgICAgICAhc3VwcG9ydHNUb3VjaChlbGVtLm93bmVyRG9jdW1lbnQpKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgdGhpcy5wb3BDXy5zaG93cy5yYXdWYWx1ZSA9IGZhbHNlO1xuICAgICAgICB9XG4gICAgICAgIG9uUG9wdXBDaGlsZEtleWRvd25fKGV2KSB7XG4gICAgICAgICAgICBpZiAodGhpcy5wb3BDXykge1xuICAgICAgICAgICAgICAgIGlmIChldi5rZXkgPT09ICdFc2NhcGUnKSB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMucG9wQ18uc2hvd3MucmF3VmFsdWUgPSBmYWxzZTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNlIGlmICh0aGlzLnZpZXcucGlja2VyRWxlbWVudCkge1xuICAgICAgICAgICAgICAgIGlmIChldi5rZXkgPT09ICdFc2NhcGUnKSB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuc3dhdGNoQ18udmlldy5idXR0b25FbGVtZW50LmZvY3VzKCk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gY29sb3JGcm9tT2JqZWN0KHZhbHVlKSB7XG4gICAgICAgIGlmIChDb2xvci5pc0NvbG9yT2JqZWN0KHZhbHVlKSkge1xuICAgICAgICAgICAgcmV0dXJuIENvbG9yLmZyb21PYmplY3QodmFsdWUpO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiBDb2xvci5ibGFjaygpO1xuICAgIH1cbiAgICBmdW5jdGlvbiBjb2xvclRvUmdiTnVtYmVyKHZhbHVlKSB7XG4gICAgICAgIHJldHVybiByZW1vdmVBbHBoYUNvbXBvbmVudCh2YWx1ZS5nZXRDb21wb25lbnRzKCdyZ2InKSkucmVkdWNlKChyZXN1bHQsIGNvbXApID0+IHtcbiAgICAgICAgICAgIHJldHVybiAocmVzdWx0IDw8IDgpIHwgKE1hdGguZmxvb3IoY29tcCkgJiAweGZmKTtcbiAgICAgICAgfSwgMCk7XG4gICAgfVxuICAgIGZ1bmN0aW9uIGNvbG9yVG9SZ2JhTnVtYmVyKHZhbHVlKSB7XG4gICAgICAgIHJldHVybiAodmFsdWUuZ2V0Q29tcG9uZW50cygncmdiJykucmVkdWNlKChyZXN1bHQsIGNvbXAsIGluZGV4KSA9PiB7XG4gICAgICAgICAgICBjb25zdCBoZXggPSBNYXRoLmZsb29yKGluZGV4ID09PSAzID8gY29tcCAqIDI1NSA6IGNvbXApICYgMHhmZjtcbiAgICAgICAgICAgIHJldHVybiAocmVzdWx0IDw8IDgpIHwgaGV4O1xuICAgICAgICB9LCAwKSA+Pj4gMCk7XG4gICAgfVxuICAgIGZ1bmN0aW9uIG51bWJlclRvUmdiQ29sb3IobnVtKSB7XG4gICAgICAgIHJldHVybiBuZXcgQ29sb3IoWyhudW0gPj4gMTYpICYgMHhmZiwgKG51bSA+PiA4KSAmIDB4ZmYsIG51bSAmIDB4ZmZdLCAncmdiJyk7XG4gICAgfVxuICAgIGZ1bmN0aW9uIG51bWJlclRvUmdiYUNvbG9yKG51bSkge1xuICAgICAgICByZXR1cm4gbmV3IENvbG9yKFtcbiAgICAgICAgICAgIChudW0gPj4gMjQpICYgMHhmZixcbiAgICAgICAgICAgIChudW0gPj4gMTYpICYgMHhmZixcbiAgICAgICAgICAgIChudW0gPj4gOCkgJiAweGZmLFxuICAgICAgICAgICAgbWFwUmFuZ2UobnVtICYgMHhmZiwgMCwgMjU1LCAwLCAxKSxcbiAgICAgICAgXSwgJ3JnYicpO1xuICAgIH1cbiAgICBmdW5jdGlvbiBjb2xvckZyb21SZ2JOdW1iZXIodmFsdWUpIHtcbiAgICAgICAgaWYgKHR5cGVvZiB2YWx1ZSAhPT0gJ251bWJlcicpIHtcbiAgICAgICAgICAgIHJldHVybiBDb2xvci5ibGFjaygpO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiBudW1iZXJUb1JnYkNvbG9yKHZhbHVlKTtcbiAgICB9XG4gICAgZnVuY3Rpb24gY29sb3JGcm9tUmdiYU51bWJlcih2YWx1ZSkge1xuICAgICAgICBpZiAodHlwZW9mIHZhbHVlICE9PSAnbnVtYmVyJykge1xuICAgICAgICAgICAgcmV0dXJuIENvbG9yLmJsYWNrKCk7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIG51bWJlclRvUmdiYUNvbG9yKHZhbHVlKTtcbiAgICB9XG5cbiAgICBmdW5jdGlvbiBjcmVhdGVDb2xvclN0cmluZ1dyaXRlcihub3RhdGlvbikge1xuICAgICAgICBjb25zdCBzdHJpbmdpZnkgPSBnZXRDb2xvclN0cmluZ2lmaWVyKG5vdGF0aW9uKTtcbiAgICAgICAgcmV0dXJuICh0YXJnZXQsIHZhbHVlKSA9PiB7XG4gICAgICAgICAgICB3cml0ZVByaW1pdGl2ZSh0YXJnZXQsIHN0cmluZ2lmeSh2YWx1ZSkpO1xuICAgICAgICB9O1xuICAgIH1cbiAgICBmdW5jdGlvbiBjcmVhdGVDb2xvck51bWJlcldyaXRlcihzdXBwb3J0c0FscGhhKSB7XG4gICAgICAgIGNvbnN0IGNvbG9yVG9OdW1iZXIgPSBzdXBwb3J0c0FscGhhID8gY29sb3JUb1JnYmFOdW1iZXIgOiBjb2xvclRvUmdiTnVtYmVyO1xuICAgICAgICByZXR1cm4gKHRhcmdldCwgdmFsdWUpID0+IHtcbiAgICAgICAgICAgIHdyaXRlUHJpbWl0aXZlKHRhcmdldCwgY29sb3JUb051bWJlcih2YWx1ZSkpO1xuICAgICAgICB9O1xuICAgIH1cbiAgICBmdW5jdGlvbiB3cml0ZVJnYmFDb2xvck9iamVjdCh0YXJnZXQsIHZhbHVlKSB7XG4gICAgICAgIGNvbnN0IG9iaiA9IHZhbHVlLnRvUmdiYU9iamVjdCgpO1xuICAgICAgICB0YXJnZXQud3JpdGVQcm9wZXJ0eSgncicsIG9iai5yKTtcbiAgICAgICAgdGFyZ2V0LndyaXRlUHJvcGVydHkoJ2cnLCBvYmouZyk7XG4gICAgICAgIHRhcmdldC53cml0ZVByb3BlcnR5KCdiJywgb2JqLmIpO1xuICAgICAgICB0YXJnZXQud3JpdGVQcm9wZXJ0eSgnYScsIG9iai5hKTtcbiAgICB9XG4gICAgZnVuY3Rpb24gd3JpdGVSZ2JDb2xvck9iamVjdCh0YXJnZXQsIHZhbHVlKSB7XG4gICAgICAgIGNvbnN0IG9iaiA9IHZhbHVlLnRvUmdiYU9iamVjdCgpO1xuICAgICAgICB0YXJnZXQud3JpdGVQcm9wZXJ0eSgncicsIG9iai5yKTtcbiAgICAgICAgdGFyZ2V0LndyaXRlUHJvcGVydHkoJ2cnLCBvYmouZyk7XG4gICAgICAgIHRhcmdldC53cml0ZVByb3BlcnR5KCdiJywgb2JqLmIpO1xuICAgIH1cbiAgICBmdW5jdGlvbiBjcmVhdGVDb2xvck9iamVjdFdyaXRlcihzdXBwb3J0c0FscGhhKSB7XG4gICAgICAgIHJldHVybiBzdXBwb3J0c0FscGhhID8gd3JpdGVSZ2JhQ29sb3JPYmplY3QgOiB3cml0ZVJnYkNvbG9yT2JqZWN0O1xuICAgIH1cblxuICAgIGZ1bmN0aW9uIHNob3VsZFN1cHBvcnRBbHBoYSQxKGlucHV0UGFyYW1zKSB7XG4gICAgICAgIHJldHVybiAnYWxwaGEnIGluIGlucHV0UGFyYW1zICYmIGlucHV0UGFyYW1zLmFscGhhID09PSB0cnVlO1xuICAgIH1cbiAgICBmdW5jdGlvbiBjcmVhdGVGb3JtYXR0ZXIkMShzdXBwb3J0c0FscGhhKSB7XG4gICAgICAgIHJldHVybiBzdXBwb3J0c0FscGhhXG4gICAgICAgICAgICA/ICh2KSA9PiBjb2xvclRvSGV4UmdiYVN0cmluZyh2LCAnMHgnKVxuICAgICAgICAgICAgOiAodikgPT4gY29sb3JUb0hleFJnYlN0cmluZyh2LCAnMHgnKTtcbiAgICB9XG4gICAgY29uc3QgTnVtYmVyQ29sb3JJbnB1dFBsdWdpbiA9IHtcbiAgICAgICAgaWQ6ICdpbnB1dC1jb2xvci1udW1iZXInLFxuICAgICAgICB0eXBlOiAnaW5wdXQnLFxuICAgICAgICBhY2NlcHQ6ICh2YWx1ZSwgcGFyYW1zKSA9PiB7XG4gICAgICAgICAgICBpZiAodHlwZW9mIHZhbHVlICE9PSAnbnVtYmVyJykge1xuICAgICAgICAgICAgICAgIHJldHVybiBudWxsO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaWYgKCEoJ3ZpZXcnIGluIHBhcmFtcykpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gbnVsbDtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGlmIChwYXJhbXMudmlldyAhPT0gJ2NvbG9yJykge1xuICAgICAgICAgICAgICAgIHJldHVybiBudWxsO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgY29uc3QgcmVzdWx0ID0gcGFyc2VDb2xvcklucHV0UGFyYW1zKHBhcmFtcyk7XG4gICAgICAgICAgICByZXR1cm4gcmVzdWx0XG4gICAgICAgICAgICAgICAgPyB7XG4gICAgICAgICAgICAgICAgICAgIGluaXRpYWxWYWx1ZTogdmFsdWUsXG4gICAgICAgICAgICAgICAgICAgIHBhcmFtczogcmVzdWx0LFxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICA6IG51bGw7XG4gICAgICAgIH0sXG4gICAgICAgIGJpbmRpbmc6IHtcbiAgICAgICAgICAgIHJlYWRlcjogKGFyZ3MpID0+IHtcbiAgICAgICAgICAgICAgICByZXR1cm4gc2hvdWxkU3VwcG9ydEFscGhhJDEoYXJncy5wYXJhbXMpXG4gICAgICAgICAgICAgICAgICAgID8gY29sb3JGcm9tUmdiYU51bWJlclxuICAgICAgICAgICAgICAgICAgICA6IGNvbG9yRnJvbVJnYk51bWJlcjtcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBlcXVhbHM6IENvbG9yLmVxdWFscyxcbiAgICAgICAgICAgIHdyaXRlcjogKGFyZ3MpID0+IHtcbiAgICAgICAgICAgICAgICByZXR1cm4gY3JlYXRlQ29sb3JOdW1iZXJXcml0ZXIoc2hvdWxkU3VwcG9ydEFscGhhJDEoYXJncy5wYXJhbXMpKTtcbiAgICAgICAgICAgIH0sXG4gICAgICAgIH0sXG4gICAgICAgIGNvbnRyb2xsZXI6IChhcmdzKSA9PiB7XG4gICAgICAgICAgICBjb25zdCBzdXBwb3J0c0FscGhhID0gc2hvdWxkU3VwcG9ydEFscGhhJDEoYXJncy5wYXJhbXMpO1xuICAgICAgICAgICAgY29uc3QgZXhwYW5kZWQgPSAnZXhwYW5kZWQnIGluIGFyZ3MucGFyYW1zID8gYXJncy5wYXJhbXMuZXhwYW5kZWQgOiB1bmRlZmluZWQ7XG4gICAgICAgICAgICBjb25zdCBwaWNrZXIgPSAncGlja2VyJyBpbiBhcmdzLnBhcmFtcyA/IGFyZ3MucGFyYW1zLnBpY2tlciA6IHVuZGVmaW5lZDtcbiAgICAgICAgICAgIHJldHVybiBuZXcgQ29sb3JDb250cm9sbGVyKGFyZ3MuZG9jdW1lbnQsIHtcbiAgICAgICAgICAgICAgICBleHBhbmRlZDogZXhwYW5kZWQgIT09IG51bGwgJiYgZXhwYW5kZWQgIT09IHZvaWQgMCA/IGV4cGFuZGVkIDogZmFsc2UsXG4gICAgICAgICAgICAgICAgZm9ybWF0dGVyOiBjcmVhdGVGb3JtYXR0ZXIkMShzdXBwb3J0c0FscGhhKSxcbiAgICAgICAgICAgICAgICBwYXJzZXI6IENvbXBvc2l0ZUNvbG9yUGFyc2VyLFxuICAgICAgICAgICAgICAgIHBpY2tlckxheW91dDogcGlja2VyICE9PSBudWxsICYmIHBpY2tlciAhPT0gdm9pZCAwID8gcGlja2VyIDogJ3BvcHVwJyxcbiAgICAgICAgICAgICAgICBzdXBwb3J0c0FscGhhOiBzdXBwb3J0c0FscGhhLFxuICAgICAgICAgICAgICAgIHZhbHVlOiBhcmdzLnZhbHVlLFxuICAgICAgICAgICAgICAgIHZpZXdQcm9wczogYXJncy52aWV3UHJvcHMsXG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfSxcbiAgICB9O1xuXG4gICAgZnVuY3Rpb24gc2hvdWxkU3VwcG9ydEFscGhhKGluaXRpYWxWYWx1ZSkge1xuICAgICAgICByZXR1cm4gQ29sb3IuaXNSZ2JhQ29sb3JPYmplY3QoaW5pdGlhbFZhbHVlKTtcbiAgICB9XG4gICAgY29uc3QgT2JqZWN0Q29sb3JJbnB1dFBsdWdpbiA9IHtcbiAgICAgICAgaWQ6ICdpbnB1dC1jb2xvci1vYmplY3QnLFxuICAgICAgICB0eXBlOiAnaW5wdXQnLFxuICAgICAgICBhY2NlcHQ6ICh2YWx1ZSwgcGFyYW1zKSA9PiB7XG4gICAgICAgICAgICBpZiAoIUNvbG9yLmlzQ29sb3JPYmplY3QodmFsdWUpKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIG51bGw7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBjb25zdCByZXN1bHQgPSBwYXJzZUNvbG9ySW5wdXRQYXJhbXMocGFyYW1zKTtcbiAgICAgICAgICAgIHJldHVybiByZXN1bHRcbiAgICAgICAgICAgICAgICA/IHtcbiAgICAgICAgICAgICAgICAgICAgaW5pdGlhbFZhbHVlOiB2YWx1ZSxcbiAgICAgICAgICAgICAgICAgICAgcGFyYW1zOiByZXN1bHQsXG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIDogbnVsbDtcbiAgICAgICAgfSxcbiAgICAgICAgYmluZGluZzoge1xuICAgICAgICAgICAgcmVhZGVyOiAoX2FyZ3MpID0+IGNvbG9yRnJvbU9iamVjdCxcbiAgICAgICAgICAgIGVxdWFsczogQ29sb3IuZXF1YWxzLFxuICAgICAgICAgICAgd3JpdGVyOiAoYXJncykgPT4gY3JlYXRlQ29sb3JPYmplY3RXcml0ZXIoc2hvdWxkU3VwcG9ydEFscGhhKGFyZ3MuaW5pdGlhbFZhbHVlKSksXG4gICAgICAgIH0sXG4gICAgICAgIGNvbnRyb2xsZXI6IChhcmdzKSA9PiB7XG4gICAgICAgICAgICBjb25zdCBzdXBwb3J0c0FscGhhID0gQ29sb3IuaXNSZ2JhQ29sb3JPYmplY3QoYXJncy5pbml0aWFsVmFsdWUpO1xuICAgICAgICAgICAgY29uc3QgZXhwYW5kZWQgPSAnZXhwYW5kZWQnIGluIGFyZ3MucGFyYW1zID8gYXJncy5wYXJhbXMuZXhwYW5kZWQgOiB1bmRlZmluZWQ7XG4gICAgICAgICAgICBjb25zdCBwaWNrZXIgPSAncGlja2VyJyBpbiBhcmdzLnBhcmFtcyA/IGFyZ3MucGFyYW1zLnBpY2tlciA6IHVuZGVmaW5lZDtcbiAgICAgICAgICAgIGNvbnN0IGZvcm1hdHRlciA9IHN1cHBvcnRzQWxwaGFcbiAgICAgICAgICAgICAgICA/IGNvbG9yVG9IZXhSZ2JhU3RyaW5nXG4gICAgICAgICAgICAgICAgOiBjb2xvclRvSGV4UmdiU3RyaW5nO1xuICAgICAgICAgICAgcmV0dXJuIG5ldyBDb2xvckNvbnRyb2xsZXIoYXJncy5kb2N1bWVudCwge1xuICAgICAgICAgICAgICAgIGV4cGFuZGVkOiBleHBhbmRlZCAhPT0gbnVsbCAmJiBleHBhbmRlZCAhPT0gdm9pZCAwID8gZXhwYW5kZWQgOiBmYWxzZSxcbiAgICAgICAgICAgICAgICBmb3JtYXR0ZXI6IGZvcm1hdHRlcixcbiAgICAgICAgICAgICAgICBwYXJzZXI6IENvbXBvc2l0ZUNvbG9yUGFyc2VyLFxuICAgICAgICAgICAgICAgIHBpY2tlckxheW91dDogcGlja2VyICE9PSBudWxsICYmIHBpY2tlciAhPT0gdm9pZCAwID8gcGlja2VyIDogJ3BvcHVwJyxcbiAgICAgICAgICAgICAgICBzdXBwb3J0c0FscGhhOiBzdXBwb3J0c0FscGhhLFxuICAgICAgICAgICAgICAgIHZhbHVlOiBhcmdzLnZhbHVlLFxuICAgICAgICAgICAgICAgIHZpZXdQcm9wczogYXJncy52aWV3UHJvcHMsXG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfSxcbiAgICB9O1xuXG4gICAgY29uc3QgU3RyaW5nQ29sb3JJbnB1dFBsdWdpbiA9IHtcbiAgICAgICAgaWQ6ICdpbnB1dC1jb2xvci1zdHJpbmcnLFxuICAgICAgICB0eXBlOiAnaW5wdXQnLFxuICAgICAgICBhY2NlcHQ6ICh2YWx1ZSwgcGFyYW1zKSA9PiB7XG4gICAgICAgICAgICBpZiAodHlwZW9mIHZhbHVlICE9PSAnc3RyaW5nJykge1xuICAgICAgICAgICAgICAgIHJldHVybiBudWxsO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaWYgKCd2aWV3JyBpbiBwYXJhbXMgJiYgcGFyYW1zLnZpZXcgPT09ICd0ZXh0Jykge1xuICAgICAgICAgICAgICAgIHJldHVybiBudWxsO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgY29uc3Qgbm90YXRpb24gPSBnZXRDb2xvck5vdGF0aW9uKHZhbHVlKTtcbiAgICAgICAgICAgIGlmICghbm90YXRpb24pIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gbnVsbDtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGNvbnN0IHJlc3VsdCA9IHBhcnNlQ29sb3JJbnB1dFBhcmFtcyhwYXJhbXMpO1xuICAgICAgICAgICAgcmV0dXJuIHJlc3VsdFxuICAgICAgICAgICAgICAgID8ge1xuICAgICAgICAgICAgICAgICAgICBpbml0aWFsVmFsdWU6IHZhbHVlLFxuICAgICAgICAgICAgICAgICAgICBwYXJhbXM6IHJlc3VsdCxcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgOiBudWxsO1xuICAgICAgICB9LFxuICAgICAgICBiaW5kaW5nOiB7XG4gICAgICAgICAgICByZWFkZXI6IChfYXJncykgPT4gY29sb3JGcm9tU3RyaW5nLFxuICAgICAgICAgICAgZXF1YWxzOiBDb2xvci5lcXVhbHMsXG4gICAgICAgICAgICB3cml0ZXI6IChhcmdzKSA9PiB7XG4gICAgICAgICAgICAgICAgY29uc3Qgbm90YXRpb24gPSBnZXRDb2xvck5vdGF0aW9uKGFyZ3MuaW5pdGlhbFZhbHVlKTtcbiAgICAgICAgICAgICAgICBpZiAoIW5vdGF0aW9uKSB7XG4gICAgICAgICAgICAgICAgICAgIHRocm93IFRwRXJyb3Iuc2hvdWxkTmV2ZXJIYXBwZW4oKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgcmV0dXJuIGNyZWF0ZUNvbG9yU3RyaW5nV3JpdGVyKG5vdGF0aW9uKTtcbiAgICAgICAgICAgIH0sXG4gICAgICAgIH0sXG4gICAgICAgIGNvbnRyb2xsZXI6IChhcmdzKSA9PiB7XG4gICAgICAgICAgICBjb25zdCBub3RhdGlvbiA9IGdldENvbG9yTm90YXRpb24oYXJncy5pbml0aWFsVmFsdWUpO1xuICAgICAgICAgICAgaWYgKCFub3RhdGlvbikge1xuICAgICAgICAgICAgICAgIHRocm93IFRwRXJyb3Iuc2hvdWxkTmV2ZXJIYXBwZW4oKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGNvbnN0IHN0cmluZ2lmaWVyID0gZ2V0Q29sb3JTdHJpbmdpZmllcihub3RhdGlvbik7XG4gICAgICAgICAgICBjb25zdCBleHBhbmRlZCA9ICdleHBhbmRlZCcgaW4gYXJncy5wYXJhbXMgPyBhcmdzLnBhcmFtcy5leHBhbmRlZCA6IHVuZGVmaW5lZDtcbiAgICAgICAgICAgIGNvbnN0IHBpY2tlciA9ICdwaWNrZXInIGluIGFyZ3MucGFyYW1zID8gYXJncy5wYXJhbXMucGlja2VyIDogdW5kZWZpbmVkO1xuICAgICAgICAgICAgcmV0dXJuIG5ldyBDb2xvckNvbnRyb2xsZXIoYXJncy5kb2N1bWVudCwge1xuICAgICAgICAgICAgICAgIGV4cGFuZGVkOiBleHBhbmRlZCAhPT0gbnVsbCAmJiBleHBhbmRlZCAhPT0gdm9pZCAwID8gZXhwYW5kZWQgOiBmYWxzZSxcbiAgICAgICAgICAgICAgICBmb3JtYXR0ZXI6IHN0cmluZ2lmaWVyLFxuICAgICAgICAgICAgICAgIHBhcnNlcjogQ29tcG9zaXRlQ29sb3JQYXJzZXIsXG4gICAgICAgICAgICAgICAgcGlja2VyTGF5b3V0OiBwaWNrZXIgIT09IG51bGwgJiYgcGlja2VyICE9PSB2b2lkIDAgPyBwaWNrZXIgOiAncG9wdXAnLFxuICAgICAgICAgICAgICAgIHN1cHBvcnRzQWxwaGE6IGhhc0FscGhhQ29tcG9uZW50KG5vdGF0aW9uKSxcbiAgICAgICAgICAgICAgICB2YWx1ZTogYXJncy52YWx1ZSxcbiAgICAgICAgICAgICAgICB2aWV3UHJvcHM6IGFyZ3Mudmlld1Byb3BzLFxuICAgICAgICAgICAgfSk7XG4gICAgICAgIH0sXG4gICAgfTtcblxuICAgIGNsYXNzIFBvaW50TmRDb25zdHJhaW50IHtcbiAgICAgICAgY29uc3RydWN0b3IoY29uZmlnKSB7XG4gICAgICAgICAgICB0aGlzLmNvbXBvbmVudHMgPSBjb25maWcuY29tcG9uZW50cztcbiAgICAgICAgICAgIHRoaXMuYXNtXyA9IGNvbmZpZy5hc3NlbWJseTtcbiAgICAgICAgfVxuICAgICAgICBjb25zdHJhaW4odmFsdWUpIHtcbiAgICAgICAgICAgIGNvbnN0IGNvbXBzID0gdGhpcy5hc21fXG4gICAgICAgICAgICAgICAgLnRvQ29tcG9uZW50cyh2YWx1ZSlcbiAgICAgICAgICAgICAgICAubWFwKChjb21wLCBpbmRleCkgPT4geyB2YXIgX2EsIF9iOyByZXR1cm4gKF9iID0gKF9hID0gdGhpcy5jb21wb25lbnRzW2luZGV4XSkgPT09IG51bGwgfHwgX2EgPT09IHZvaWQgMCA/IHZvaWQgMCA6IF9hLmNvbnN0cmFpbihjb21wKSkgIT09IG51bGwgJiYgX2IgIT09IHZvaWQgMCA/IF9iIDogY29tcDsgfSk7XG4gICAgICAgICAgICByZXR1cm4gdGhpcy5hc21fLmZyb21Db21wb25lbnRzKGNvbXBzKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIGNvbnN0IGNsYXNzTmFtZSQ1ID0gQ2xhc3NOYW1lKCdwbmR0eHQnKTtcbiAgICBjbGFzcyBQb2ludE5kVGV4dFZpZXcge1xuICAgICAgICBjb25zdHJ1Y3Rvcihkb2MsIGNvbmZpZykge1xuICAgICAgICAgICAgdGhpcy50ZXh0Vmlld3MgPSBjb25maWcudGV4dFZpZXdzO1xuICAgICAgICAgICAgdGhpcy5lbGVtZW50ID0gZG9jLmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xuICAgICAgICAgICAgdGhpcy5lbGVtZW50LmNsYXNzTGlzdC5hZGQoY2xhc3NOYW1lJDUoKSk7XG4gICAgICAgICAgICB0aGlzLnRleHRWaWV3cy5mb3JFYWNoKCh2KSA9PiB7XG4gICAgICAgICAgICAgICAgY29uc3QgYXhpc0VsZW0gPSBkb2MuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XG4gICAgICAgICAgICAgICAgYXhpc0VsZW0uY2xhc3NMaXN0LmFkZChjbGFzc05hbWUkNSgnYScpKTtcbiAgICAgICAgICAgICAgICBheGlzRWxlbS5hcHBlbmRDaGlsZCh2LmVsZW1lbnQpO1xuICAgICAgICAgICAgICAgIHRoaXMuZWxlbWVudC5hcHBlbmRDaGlsZChheGlzRWxlbSk7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIGZ1bmN0aW9uIGNyZWF0ZUF4aXNDb250cm9sbGVyKGRvYywgY29uZmlnLCBpbmRleCkge1xuICAgICAgICByZXR1cm4gbmV3IE51bWJlclRleHRDb250cm9sbGVyKGRvYywge1xuICAgICAgICAgICAgYXJyYXlQb3NpdGlvbjogaW5kZXggPT09IDAgPyAnZnN0JyA6IGluZGV4ID09PSBjb25maWcuYXhlcy5sZW5ndGggLSAxID8gJ2xzdCcgOiAnbWlkJyxcbiAgICAgICAgICAgIGJhc2VTdGVwOiBjb25maWcuYXhlc1tpbmRleF0uYmFzZVN0ZXAsXG4gICAgICAgICAgICBwYXJzZXI6IGNvbmZpZy5wYXJzZXIsXG4gICAgICAgICAgICBwcm9wczogY29uZmlnLmF4ZXNbaW5kZXhdLnRleHRQcm9wcyxcbiAgICAgICAgICAgIHZhbHVlOiBjcmVhdGVWYWx1ZSgwLCB7XG4gICAgICAgICAgICAgICAgY29uc3RyYWludDogY29uZmlnLmF4ZXNbaW5kZXhdLmNvbnN0cmFpbnQsXG4gICAgICAgICAgICB9KSxcbiAgICAgICAgICAgIHZpZXdQcm9wczogY29uZmlnLnZpZXdQcm9wcyxcbiAgICAgICAgfSk7XG4gICAgfVxuICAgIGNsYXNzIFBvaW50TmRUZXh0Q29udHJvbGxlciB7XG4gICAgICAgIGNvbnN0cnVjdG9yKGRvYywgY29uZmlnKSB7XG4gICAgICAgICAgICB0aGlzLnZhbHVlID0gY29uZmlnLnZhbHVlO1xuICAgICAgICAgICAgdGhpcy52aWV3UHJvcHMgPSBjb25maWcudmlld1Byb3BzO1xuICAgICAgICAgICAgdGhpcy5hY3NfID0gY29uZmlnLmF4ZXMubWFwKChfLCBpbmRleCkgPT4gY3JlYXRlQXhpc0NvbnRyb2xsZXIoZG9jLCBjb25maWcsIGluZGV4KSk7XG4gICAgICAgICAgICB0aGlzLmFjc18uZm9yRWFjaCgoYywgaW5kZXgpID0+IHtcbiAgICAgICAgICAgICAgICBjb25uZWN0VmFsdWVzKHtcbiAgICAgICAgICAgICAgICAgICAgcHJpbWFyeTogdGhpcy52YWx1ZSxcbiAgICAgICAgICAgICAgICAgICAgc2Vjb25kYXJ5OiBjLnZhbHVlLFxuICAgICAgICAgICAgICAgICAgICBmb3J3YXJkOiAocCkgPT4ge1xuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGNvbmZpZy5hc3NlbWJseS50b0NvbXBvbmVudHMocC5yYXdWYWx1ZSlbaW5kZXhdO1xuICAgICAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgICAgICBiYWNrd2FyZDogKHAsIHMpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbnN0IGNvbXBzID0gY29uZmlnLmFzc2VtYmx5LnRvQ29tcG9uZW50cyhwLnJhd1ZhbHVlKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbXBzW2luZGV4XSA9IHMucmF3VmFsdWU7XG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gY29uZmlnLmFzc2VtYmx5LmZyb21Db21wb25lbnRzKGNvbXBzKTtcbiAgICAgICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgdGhpcy52aWV3ID0gbmV3IFBvaW50TmRUZXh0Vmlldyhkb2MsIHtcbiAgICAgICAgICAgICAgICB0ZXh0Vmlld3M6IHRoaXMuYWNzXy5tYXAoKGFjKSA9PiBhYy52aWV3KSxcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gY3JlYXRlU3RlcENvbnN0cmFpbnQocGFyYW1zKSB7XG4gICAgICAgIGlmICgnc3RlcCcgaW4gcGFyYW1zICYmICFpc0VtcHR5KHBhcmFtcy5zdGVwKSkge1xuICAgICAgICAgICAgcmV0dXJuIG5ldyBTdGVwQ29uc3RyYWludChwYXJhbXMuc3RlcCk7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIG51bGw7XG4gICAgfVxuICAgIGZ1bmN0aW9uIGNyZWF0ZVJhbmdlQ29uc3RyYWludChwYXJhbXMpIHtcbiAgICAgICAgaWYgKCgnbWF4JyBpbiBwYXJhbXMgJiYgIWlzRW1wdHkocGFyYW1zLm1heCkpIHx8XG4gICAgICAgICAgICAoJ21pbicgaW4gcGFyYW1zICYmICFpc0VtcHR5KHBhcmFtcy5taW4pKSkge1xuICAgICAgICAgICAgcmV0dXJuIG5ldyBSYW5nZUNvbnN0cmFpbnQoe1xuICAgICAgICAgICAgICAgIG1heDogcGFyYW1zLm1heCxcbiAgICAgICAgICAgICAgICBtaW46IHBhcmFtcy5taW4sXG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gbnVsbDtcbiAgICB9XG4gICAgZnVuY3Rpb24gY3JlYXRlQ29uc3RyYWludCQ0KHBhcmFtcykge1xuICAgICAgICBjb25zdCBjb25zdHJhaW50cyA9IFtdO1xuICAgICAgICBjb25zdCBzYyA9IGNyZWF0ZVN0ZXBDb25zdHJhaW50KHBhcmFtcyk7XG4gICAgICAgIGlmIChzYykge1xuICAgICAgICAgICAgY29uc3RyYWludHMucHVzaChzYyk7XG4gICAgICAgIH1cbiAgICAgICAgY29uc3QgcmMgPSBjcmVhdGVSYW5nZUNvbnN0cmFpbnQocGFyYW1zKTtcbiAgICAgICAgaWYgKHJjKSB7XG4gICAgICAgICAgICBjb25zdHJhaW50cy5wdXNoKHJjKTtcbiAgICAgICAgfVxuICAgICAgICBjb25zdCBsYyA9IGNyZWF0ZUxpc3RDb25zdHJhaW50KHBhcmFtcy5vcHRpb25zKTtcbiAgICAgICAgaWYgKGxjKSB7XG4gICAgICAgICAgICBjb25zdHJhaW50cy5wdXNoKGxjKTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gbmV3IENvbXBvc2l0ZUNvbnN0cmFpbnQoY29uc3RyYWludHMpO1xuICAgIH1cbiAgICBmdW5jdGlvbiBmaW5kUmFuZ2UoY29uc3RyYWludCkge1xuICAgICAgICBjb25zdCBjID0gY29uc3RyYWludCA/IGZpbmRDb25zdHJhaW50KGNvbnN0cmFpbnQsIFJhbmdlQ29uc3RyYWludCkgOiBudWxsO1xuICAgICAgICBpZiAoIWMpIHtcbiAgICAgICAgICAgIHJldHVybiBbdW5kZWZpbmVkLCB1bmRlZmluZWRdO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiBbYy5taW5WYWx1ZSwgYy5tYXhWYWx1ZV07XG4gICAgfVxuICAgIGZ1bmN0aW9uIGVzdGltYXRlU3VpdGFibGVSYW5nZShjb25zdHJhaW50KSB7XG4gICAgICAgIGNvbnN0IFttaW4sIG1heF0gPSBmaW5kUmFuZ2UoY29uc3RyYWludCk7XG4gICAgICAgIHJldHVybiBbbWluICE9PSBudWxsICYmIG1pbiAhPT0gdm9pZCAwID8gbWluIDogMCwgbWF4ICE9PSBudWxsICYmIG1heCAhPT0gdm9pZCAwID8gbWF4IDogMTAwXTtcbiAgICB9XG4gICAgY29uc3QgTnVtYmVySW5wdXRQbHVnaW4gPSB7XG4gICAgICAgIGlkOiAnaW5wdXQtbnVtYmVyJyxcbiAgICAgICAgdHlwZTogJ2lucHV0JyxcbiAgICAgICAgYWNjZXB0OiAodmFsdWUsIHBhcmFtcykgPT4ge1xuICAgICAgICAgICAgaWYgKHR5cGVvZiB2YWx1ZSAhPT0gJ251bWJlcicpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gbnVsbDtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGNvbnN0IHAgPSBQYXJhbXNQYXJzZXJzO1xuICAgICAgICAgICAgY29uc3QgcmVzdWx0ID0gcGFyc2VQYXJhbXMocGFyYW1zLCB7XG4gICAgICAgICAgICAgICAgZm9ybWF0OiBwLm9wdGlvbmFsLmZ1bmN0aW9uLFxuICAgICAgICAgICAgICAgIG1heDogcC5vcHRpb25hbC5udW1iZXIsXG4gICAgICAgICAgICAgICAgbWluOiBwLm9wdGlvbmFsLm51bWJlcixcbiAgICAgICAgICAgICAgICBvcHRpb25zOiBwLm9wdGlvbmFsLmN1c3RvbShwYXJzZUxpc3RPcHRpb25zKSxcbiAgICAgICAgICAgICAgICBzdGVwOiBwLm9wdGlvbmFsLm51bWJlcixcbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgcmV0dXJuIHJlc3VsdFxuICAgICAgICAgICAgICAgID8ge1xuICAgICAgICAgICAgICAgICAgICBpbml0aWFsVmFsdWU6IHZhbHVlLFxuICAgICAgICAgICAgICAgICAgICBwYXJhbXM6IHJlc3VsdCxcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgOiBudWxsO1xuICAgICAgICB9LFxuICAgICAgICBiaW5kaW5nOiB7XG4gICAgICAgICAgICByZWFkZXI6IChfYXJncykgPT4gbnVtYmVyRnJvbVVua25vd24sXG4gICAgICAgICAgICBjb25zdHJhaW50OiAoYXJncykgPT4gY3JlYXRlQ29uc3RyYWludCQ0KGFyZ3MucGFyYW1zKSxcbiAgICAgICAgICAgIHdyaXRlcjogKF9hcmdzKSA9PiB3cml0ZVByaW1pdGl2ZSxcbiAgICAgICAgfSxcbiAgICAgICAgY29udHJvbGxlcjogKGFyZ3MpID0+IHtcbiAgICAgICAgICAgIHZhciBfYSwgX2I7XG4gICAgICAgICAgICBjb25zdCB2YWx1ZSA9IGFyZ3MudmFsdWU7XG4gICAgICAgICAgICBjb25zdCBjID0gYXJncy5jb25zdHJhaW50O1xuICAgICAgICAgICAgaWYgKGMgJiYgZmluZENvbnN0cmFpbnQoYywgTGlzdENvbnN0cmFpbnQpKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIG5ldyBMaXN0Q29udHJvbGxlcihhcmdzLmRvY3VtZW50LCB7XG4gICAgICAgICAgICAgICAgICAgIHByb3BzOiBWYWx1ZU1hcC5mcm9tT2JqZWN0KHtcbiAgICAgICAgICAgICAgICAgICAgICAgIG9wdGlvbnM6IChfYSA9IGZpbmRMaXN0SXRlbXMoYykpICE9PSBudWxsICYmIF9hICE9PSB2b2lkIDAgPyBfYSA6IFtdLFxuICAgICAgICAgICAgICAgICAgICB9KSxcbiAgICAgICAgICAgICAgICAgICAgdmFsdWU6IHZhbHVlLFxuICAgICAgICAgICAgICAgICAgICB2aWV3UHJvcHM6IGFyZ3Mudmlld1Byb3BzLFxuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgY29uc3QgZm9ybWF0dGVyID0gKF9iID0gKCdmb3JtYXQnIGluIGFyZ3MucGFyYW1zID8gYXJncy5wYXJhbXMuZm9ybWF0IDogdW5kZWZpbmVkKSkgIT09IG51bGwgJiYgX2IgIT09IHZvaWQgMCA/IF9iIDogY3JlYXRlTnVtYmVyRm9ybWF0dGVyKGdldFN1aXRhYmxlRGVjaW1hbERpZ2l0cyhjLCB2YWx1ZS5yYXdWYWx1ZSkpO1xuICAgICAgICAgICAgaWYgKGMgJiYgZmluZENvbnN0cmFpbnQoYywgUmFuZ2VDb25zdHJhaW50KSkge1xuICAgICAgICAgICAgICAgIGNvbnN0IFttaW4sIG1heF0gPSBlc3RpbWF0ZVN1aXRhYmxlUmFuZ2UoYyk7XG4gICAgICAgICAgICAgICAgcmV0dXJuIG5ldyBTbGlkZXJUZXh0Q29udHJvbGxlcihhcmdzLmRvY3VtZW50LCB7XG4gICAgICAgICAgICAgICAgICAgIGJhc2VTdGVwOiBnZXRCYXNlU3RlcChjKSxcbiAgICAgICAgICAgICAgICAgICAgcGFyc2VyOiBwYXJzZU51bWJlcixcbiAgICAgICAgICAgICAgICAgICAgc2xpZGVyUHJvcHM6IFZhbHVlTWFwLmZyb21PYmplY3Qoe1xuICAgICAgICAgICAgICAgICAgICAgICAgbWF4VmFsdWU6IG1heCxcbiAgICAgICAgICAgICAgICAgICAgICAgIG1pblZhbHVlOiBtaW4sXG4gICAgICAgICAgICAgICAgICAgIH0pLFxuICAgICAgICAgICAgICAgICAgICB0ZXh0UHJvcHM6IFZhbHVlTWFwLmZyb21PYmplY3Qoe1xuICAgICAgICAgICAgICAgICAgICAgICAgZHJhZ2dpbmdTY2FsZTogZ2V0U3VpdGFibGVEcmFnZ2luZ1NjYWxlKGMsIHZhbHVlLnJhd1ZhbHVlKSxcbiAgICAgICAgICAgICAgICAgICAgICAgIGZvcm1hdHRlcjogZm9ybWF0dGVyLFxuICAgICAgICAgICAgICAgICAgICB9KSxcbiAgICAgICAgICAgICAgICAgICAgdmFsdWU6IHZhbHVlLFxuICAgICAgICAgICAgICAgICAgICB2aWV3UHJvcHM6IGFyZ3Mudmlld1Byb3BzLFxuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgcmV0dXJuIG5ldyBOdW1iZXJUZXh0Q29udHJvbGxlcihhcmdzLmRvY3VtZW50LCB7XG4gICAgICAgICAgICAgICAgYmFzZVN0ZXA6IGdldEJhc2VTdGVwKGMpLFxuICAgICAgICAgICAgICAgIHBhcnNlcjogcGFyc2VOdW1iZXIsXG4gICAgICAgICAgICAgICAgcHJvcHM6IFZhbHVlTWFwLmZyb21PYmplY3Qoe1xuICAgICAgICAgICAgICAgICAgICBkcmFnZ2luZ1NjYWxlOiBnZXRTdWl0YWJsZURyYWdnaW5nU2NhbGUoYywgdmFsdWUucmF3VmFsdWUpLFxuICAgICAgICAgICAgICAgICAgICBmb3JtYXR0ZXI6IGZvcm1hdHRlcixcbiAgICAgICAgICAgICAgICB9KSxcbiAgICAgICAgICAgICAgICB2YWx1ZTogdmFsdWUsXG4gICAgICAgICAgICAgICAgdmlld1Byb3BzOiBhcmdzLnZpZXdQcm9wcyxcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9LFxuICAgIH07XG5cbiAgICBjbGFzcyBQb2ludDJkIHtcbiAgICAgICAgY29uc3RydWN0b3IoeCA9IDAsIHkgPSAwKSB7XG4gICAgICAgICAgICB0aGlzLnggPSB4O1xuICAgICAgICAgICAgdGhpcy55ID0geTtcbiAgICAgICAgfVxuICAgICAgICBnZXRDb21wb25lbnRzKCkge1xuICAgICAgICAgICAgcmV0dXJuIFt0aGlzLngsIHRoaXMueV07XG4gICAgICAgIH1cbiAgICAgICAgc3RhdGljIGlzT2JqZWN0KG9iaikge1xuICAgICAgICAgICAgaWYgKGlzRW1wdHkob2JqKSkge1xuICAgICAgICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGNvbnN0IHggPSBvYmoueDtcbiAgICAgICAgICAgIGNvbnN0IHkgPSBvYmoueTtcbiAgICAgICAgICAgIGlmICh0eXBlb2YgeCAhPT0gJ251bWJlcicgfHwgdHlwZW9mIHkgIT09ICdudW1iZXInKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICAgIH1cbiAgICAgICAgc3RhdGljIGVxdWFscyh2MSwgdjIpIHtcbiAgICAgICAgICAgIHJldHVybiB2MS54ID09PSB2Mi54ICYmIHYxLnkgPT09IHYyLnk7XG4gICAgICAgIH1cbiAgICAgICAgdG9PYmplY3QoKSB7XG4gICAgICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgICAgIHg6IHRoaXMueCxcbiAgICAgICAgICAgICAgICB5OiB0aGlzLnksXG4gICAgICAgICAgICB9O1xuICAgICAgICB9XG4gICAgfVxuICAgIGNvbnN0IFBvaW50MmRBc3NlbWJseSA9IHtcbiAgICAgICAgdG9Db21wb25lbnRzOiAocCkgPT4gcC5nZXRDb21wb25lbnRzKCksXG4gICAgICAgIGZyb21Db21wb25lbnRzOiAoY29tcHMpID0+IG5ldyBQb2ludDJkKC4uLmNvbXBzKSxcbiAgICB9O1xuXG4gICAgY29uc3QgY2xhc3NOYW1lJDQgPSBDbGFzc05hbWUoJ3AyZCcpO1xuICAgIGNsYXNzIFBvaW50MmRWaWV3IHtcbiAgICAgICAgY29uc3RydWN0b3IoZG9jLCBjb25maWcpIHtcbiAgICAgICAgICAgIHRoaXMuZWxlbWVudCA9IGRvYy5jcmVhdGVFbGVtZW50KCdkaXYnKTtcbiAgICAgICAgICAgIHRoaXMuZWxlbWVudC5jbGFzc0xpc3QuYWRkKGNsYXNzTmFtZSQ0KCkpO1xuICAgICAgICAgICAgY29uZmlnLnZpZXdQcm9wcy5iaW5kQ2xhc3NNb2RpZmllcnModGhpcy5lbGVtZW50KTtcbiAgICAgICAgICAgIGJpbmRWYWx1ZShjb25maWcuZXhwYW5kZWQsIHZhbHVlVG9DbGFzc05hbWUodGhpcy5lbGVtZW50LCBjbGFzc05hbWUkNCh1bmRlZmluZWQsICdleHBhbmRlZCcpKSk7XG4gICAgICAgICAgICBjb25zdCBoZWFkRWxlbSA9IGRvYy5jcmVhdGVFbGVtZW50KCdkaXYnKTtcbiAgICAgICAgICAgIGhlYWRFbGVtLmNsYXNzTGlzdC5hZGQoY2xhc3NOYW1lJDQoJ2gnKSk7XG4gICAgICAgICAgICB0aGlzLmVsZW1lbnQuYXBwZW5kQ2hpbGQoaGVhZEVsZW0pO1xuICAgICAgICAgICAgY29uc3QgYnV0dG9uRWxlbSA9IGRvYy5jcmVhdGVFbGVtZW50KCdidXR0b24nKTtcbiAgICAgICAgICAgIGJ1dHRvbkVsZW0uY2xhc3NMaXN0LmFkZChjbGFzc05hbWUkNCgnYicpKTtcbiAgICAgICAgICAgIGJ1dHRvbkVsZW0uYXBwZW5kQ2hpbGQoY3JlYXRlU3ZnSWNvbkVsZW1lbnQoZG9jLCAncDJkcGFkJykpO1xuICAgICAgICAgICAgY29uZmlnLnZpZXdQcm9wcy5iaW5kRGlzYWJsZWQoYnV0dG9uRWxlbSk7XG4gICAgICAgICAgICBoZWFkRWxlbS5hcHBlbmRDaGlsZChidXR0b25FbGVtKTtcbiAgICAgICAgICAgIHRoaXMuYnV0dG9uRWxlbWVudCA9IGJ1dHRvbkVsZW07XG4gICAgICAgICAgICBjb25zdCB0ZXh0RWxlbSA9IGRvYy5jcmVhdGVFbGVtZW50KCdkaXYnKTtcbiAgICAgICAgICAgIHRleHRFbGVtLmNsYXNzTGlzdC5hZGQoY2xhc3NOYW1lJDQoJ3QnKSk7XG4gICAgICAgICAgICBoZWFkRWxlbS5hcHBlbmRDaGlsZCh0ZXh0RWxlbSk7XG4gICAgICAgICAgICB0aGlzLnRleHRFbGVtZW50ID0gdGV4dEVsZW07XG4gICAgICAgICAgICBpZiAoY29uZmlnLnBpY2tlckxheW91dCA9PT0gJ2lubGluZScpIHtcbiAgICAgICAgICAgICAgICBjb25zdCBwaWNrZXJFbGVtID0gZG9jLmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xuICAgICAgICAgICAgICAgIHBpY2tlckVsZW0uY2xhc3NMaXN0LmFkZChjbGFzc05hbWUkNCgncCcpKTtcbiAgICAgICAgICAgICAgICB0aGlzLmVsZW1lbnQuYXBwZW5kQ2hpbGQocGlja2VyRWxlbSk7XG4gICAgICAgICAgICAgICAgdGhpcy5waWNrZXJFbGVtZW50ID0gcGlja2VyRWxlbTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgIHRoaXMucGlja2VyRWxlbWVudCA9IG51bGw7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBjb25zdCBjbGFzc05hbWUkMyA9IENsYXNzTmFtZSgncDJkcCcpO1xuICAgIGNsYXNzIFBvaW50MmRQaWNrZXJWaWV3IHtcbiAgICAgICAgY29uc3RydWN0b3IoZG9jLCBjb25maWcpIHtcbiAgICAgICAgICAgIHRoaXMub25Gb2xkYWJsZUNoYW5nZV8gPSB0aGlzLm9uRm9sZGFibGVDaGFuZ2VfLmJpbmQodGhpcyk7XG4gICAgICAgICAgICB0aGlzLm9uVmFsdWVDaGFuZ2VfID0gdGhpcy5vblZhbHVlQ2hhbmdlXy5iaW5kKHRoaXMpO1xuICAgICAgICAgICAgdGhpcy5pbnZlcnRzWV8gPSBjb25maWcuaW52ZXJ0c1k7XG4gICAgICAgICAgICB0aGlzLm1heFZhbHVlXyA9IGNvbmZpZy5tYXhWYWx1ZTtcbiAgICAgICAgICAgIHRoaXMuZWxlbWVudCA9IGRvYy5jcmVhdGVFbGVtZW50KCdkaXYnKTtcbiAgICAgICAgICAgIHRoaXMuZWxlbWVudC5jbGFzc0xpc3QuYWRkKGNsYXNzTmFtZSQzKCkpO1xuICAgICAgICAgICAgaWYgKGNvbmZpZy5sYXlvdXQgPT09ICdwb3B1cCcpIHtcbiAgICAgICAgICAgICAgICB0aGlzLmVsZW1lbnQuY2xhc3NMaXN0LmFkZChjbGFzc05hbWUkMyh1bmRlZmluZWQsICdwJykpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgY29uc3QgcGFkRWxlbSA9IGRvYy5jcmVhdGVFbGVtZW50KCdkaXYnKTtcbiAgICAgICAgICAgIHBhZEVsZW0uY2xhc3NMaXN0LmFkZChjbGFzc05hbWUkMygncCcpKTtcbiAgICAgICAgICAgIGNvbmZpZy52aWV3UHJvcHMuYmluZFRhYkluZGV4KHBhZEVsZW0pO1xuICAgICAgICAgICAgdGhpcy5lbGVtZW50LmFwcGVuZENoaWxkKHBhZEVsZW0pO1xuICAgICAgICAgICAgdGhpcy5wYWRFbGVtZW50ID0gcGFkRWxlbTtcbiAgICAgICAgICAgIGNvbnN0IHN2Z0VsZW0gPSBkb2MuY3JlYXRlRWxlbWVudE5TKFNWR19OUywgJ3N2ZycpO1xuICAgICAgICAgICAgc3ZnRWxlbS5jbGFzc0xpc3QuYWRkKGNsYXNzTmFtZSQzKCdnJykpO1xuICAgICAgICAgICAgdGhpcy5wYWRFbGVtZW50LmFwcGVuZENoaWxkKHN2Z0VsZW0pO1xuICAgICAgICAgICAgdGhpcy5zdmdFbGVtXyA9IHN2Z0VsZW07XG4gICAgICAgICAgICBjb25zdCB4QXhpc0VsZW0gPSBkb2MuY3JlYXRlRWxlbWVudE5TKFNWR19OUywgJ2xpbmUnKTtcbiAgICAgICAgICAgIHhBeGlzRWxlbS5jbGFzc0xpc3QuYWRkKGNsYXNzTmFtZSQzKCdheCcpKTtcbiAgICAgICAgICAgIHhBeGlzRWxlbS5zZXRBdHRyaWJ1dGVOUyhudWxsLCAneDEnLCAnMCcpO1xuICAgICAgICAgICAgeEF4aXNFbGVtLnNldEF0dHJpYnV0ZU5TKG51bGwsICd5MScsICc1MCUnKTtcbiAgICAgICAgICAgIHhBeGlzRWxlbS5zZXRBdHRyaWJ1dGVOUyhudWxsLCAneDInLCAnMTAwJScpO1xuICAgICAgICAgICAgeEF4aXNFbGVtLnNldEF0dHJpYnV0ZU5TKG51bGwsICd5MicsICc1MCUnKTtcbiAgICAgICAgICAgIHRoaXMuc3ZnRWxlbV8uYXBwZW5kQ2hpbGQoeEF4aXNFbGVtKTtcbiAgICAgICAgICAgIGNvbnN0IHlBeGlzRWxlbSA9IGRvYy5jcmVhdGVFbGVtZW50TlMoU1ZHX05TLCAnbGluZScpO1xuICAgICAgICAgICAgeUF4aXNFbGVtLmNsYXNzTGlzdC5hZGQoY2xhc3NOYW1lJDMoJ2F4JykpO1xuICAgICAgICAgICAgeUF4aXNFbGVtLnNldEF0dHJpYnV0ZU5TKG51bGwsICd4MScsICc1MCUnKTtcbiAgICAgICAgICAgIHlBeGlzRWxlbS5zZXRBdHRyaWJ1dGVOUyhudWxsLCAneTEnLCAnMCcpO1xuICAgICAgICAgICAgeUF4aXNFbGVtLnNldEF0dHJpYnV0ZU5TKG51bGwsICd4MicsICc1MCUnKTtcbiAgICAgICAgICAgIHlBeGlzRWxlbS5zZXRBdHRyaWJ1dGVOUyhudWxsLCAneTInLCAnMTAwJScpO1xuICAgICAgICAgICAgdGhpcy5zdmdFbGVtXy5hcHBlbmRDaGlsZCh5QXhpc0VsZW0pO1xuICAgICAgICAgICAgY29uc3QgbGluZUVsZW0gPSBkb2MuY3JlYXRlRWxlbWVudE5TKFNWR19OUywgJ2xpbmUnKTtcbiAgICAgICAgICAgIGxpbmVFbGVtLmNsYXNzTGlzdC5hZGQoY2xhc3NOYW1lJDMoJ2wnKSk7XG4gICAgICAgICAgICBsaW5lRWxlbS5zZXRBdHRyaWJ1dGVOUyhudWxsLCAneDEnLCAnNTAlJyk7XG4gICAgICAgICAgICBsaW5lRWxlbS5zZXRBdHRyaWJ1dGVOUyhudWxsLCAneTEnLCAnNTAlJyk7XG4gICAgICAgICAgICB0aGlzLnN2Z0VsZW1fLmFwcGVuZENoaWxkKGxpbmVFbGVtKTtcbiAgICAgICAgICAgIHRoaXMubGluZUVsZW1fID0gbGluZUVsZW07XG4gICAgICAgICAgICBjb25zdCBtYXJrZXJFbGVtID0gZG9jLmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xuICAgICAgICAgICAgbWFya2VyRWxlbS5jbGFzc0xpc3QuYWRkKGNsYXNzTmFtZSQzKCdtJykpO1xuICAgICAgICAgICAgdGhpcy5wYWRFbGVtZW50LmFwcGVuZENoaWxkKG1hcmtlckVsZW0pO1xuICAgICAgICAgICAgdGhpcy5tYXJrZXJFbGVtXyA9IG1hcmtlckVsZW07XG4gICAgICAgICAgICBjb25maWcudmFsdWUuZW1pdHRlci5vbignY2hhbmdlJywgdGhpcy5vblZhbHVlQ2hhbmdlXyk7XG4gICAgICAgICAgICB0aGlzLnZhbHVlID0gY29uZmlnLnZhbHVlO1xuICAgICAgICAgICAgdGhpcy51cGRhdGVfKCk7XG4gICAgICAgIH1cbiAgICAgICAgZ2V0IGFsbEZvY3VzYWJsZUVsZW1lbnRzKCkge1xuICAgICAgICAgICAgcmV0dXJuIFt0aGlzLnBhZEVsZW1lbnRdO1xuICAgICAgICB9XG4gICAgICAgIHVwZGF0ZV8oKSB7XG4gICAgICAgICAgICBjb25zdCBbeCwgeV0gPSB0aGlzLnZhbHVlLnJhd1ZhbHVlLmdldENvbXBvbmVudHMoKTtcbiAgICAgICAgICAgIGNvbnN0IG1heCA9IHRoaXMubWF4VmFsdWVfO1xuICAgICAgICAgICAgY29uc3QgcHggPSBtYXBSYW5nZSh4LCAtbWF4LCArbWF4LCAwLCAxMDApO1xuICAgICAgICAgICAgY29uc3QgcHkgPSBtYXBSYW5nZSh5LCAtbWF4LCArbWF4LCAwLCAxMDApO1xuICAgICAgICAgICAgY29uc3QgaXB5ID0gdGhpcy5pbnZlcnRzWV8gPyAxMDAgLSBweSA6IHB5O1xuICAgICAgICAgICAgdGhpcy5saW5lRWxlbV8uc2V0QXR0cmlidXRlTlMobnVsbCwgJ3gyJywgYCR7cHh9JWApO1xuICAgICAgICAgICAgdGhpcy5saW5lRWxlbV8uc2V0QXR0cmlidXRlTlMobnVsbCwgJ3kyJywgYCR7aXB5fSVgKTtcbiAgICAgICAgICAgIHRoaXMubWFya2VyRWxlbV8uc3R5bGUubGVmdCA9IGAke3B4fSVgO1xuICAgICAgICAgICAgdGhpcy5tYXJrZXJFbGVtXy5zdHlsZS50b3AgPSBgJHtpcHl9JWA7XG4gICAgICAgIH1cbiAgICAgICAgb25WYWx1ZUNoYW5nZV8oKSB7XG4gICAgICAgICAgICB0aGlzLnVwZGF0ZV8oKTtcbiAgICAgICAgfVxuICAgICAgICBvbkZvbGRhYmxlQ2hhbmdlXygpIHtcbiAgICAgICAgICAgIHRoaXMudXBkYXRlXygpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gY29tcHV0ZU9mZnNldChldiwgYmFzZVN0ZXBzLCBpbnZlcnRzWSkge1xuICAgICAgICByZXR1cm4gW1xuICAgICAgICAgICAgZ2V0U3RlcEZvcktleShiYXNlU3RlcHNbMF0sIGdldEhvcml6b250YWxTdGVwS2V5cyhldikpLFxuICAgICAgICAgICAgZ2V0U3RlcEZvcktleShiYXNlU3RlcHNbMV0sIGdldFZlcnRpY2FsU3RlcEtleXMoZXYpKSAqIChpbnZlcnRzWSA/IDEgOiAtMSksXG4gICAgICAgIF07XG4gICAgfVxuICAgIGNsYXNzIFBvaW50MmRQaWNrZXJDb250cm9sbGVyIHtcbiAgICAgICAgY29uc3RydWN0b3IoZG9jLCBjb25maWcpIHtcbiAgICAgICAgICAgIHRoaXMub25QYWRLZXlEb3duXyA9IHRoaXMub25QYWRLZXlEb3duXy5iaW5kKHRoaXMpO1xuICAgICAgICAgICAgdGhpcy5vblBhZEtleVVwXyA9IHRoaXMub25QYWRLZXlVcF8uYmluZCh0aGlzKTtcbiAgICAgICAgICAgIHRoaXMub25Qb2ludGVyRG93bl8gPSB0aGlzLm9uUG9pbnRlckRvd25fLmJpbmQodGhpcyk7XG4gICAgICAgICAgICB0aGlzLm9uUG9pbnRlck1vdmVfID0gdGhpcy5vblBvaW50ZXJNb3ZlXy5iaW5kKHRoaXMpO1xuICAgICAgICAgICAgdGhpcy5vblBvaW50ZXJVcF8gPSB0aGlzLm9uUG9pbnRlclVwXy5iaW5kKHRoaXMpO1xuICAgICAgICAgICAgdGhpcy52YWx1ZSA9IGNvbmZpZy52YWx1ZTtcbiAgICAgICAgICAgIHRoaXMudmlld1Byb3BzID0gY29uZmlnLnZpZXdQcm9wcztcbiAgICAgICAgICAgIHRoaXMuYmFzZVN0ZXBzXyA9IGNvbmZpZy5iYXNlU3RlcHM7XG4gICAgICAgICAgICB0aGlzLm1heFZhbHVlXyA9IGNvbmZpZy5tYXhWYWx1ZTtcbiAgICAgICAgICAgIHRoaXMuaW52ZXJ0c1lfID0gY29uZmlnLmludmVydHNZO1xuICAgICAgICAgICAgdGhpcy52aWV3ID0gbmV3IFBvaW50MmRQaWNrZXJWaWV3KGRvYywge1xuICAgICAgICAgICAgICAgIGludmVydHNZOiB0aGlzLmludmVydHNZXyxcbiAgICAgICAgICAgICAgICBsYXlvdXQ6IGNvbmZpZy5sYXlvdXQsXG4gICAgICAgICAgICAgICAgbWF4VmFsdWU6IHRoaXMubWF4VmFsdWVfLFxuICAgICAgICAgICAgICAgIHZhbHVlOiB0aGlzLnZhbHVlLFxuICAgICAgICAgICAgICAgIHZpZXdQcm9wczogdGhpcy52aWV3UHJvcHMsXG4gICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIHRoaXMucHRIYW5kbGVyXyA9IG5ldyBQb2ludGVySGFuZGxlcih0aGlzLnZpZXcucGFkRWxlbWVudCk7XG4gICAgICAgICAgICB0aGlzLnB0SGFuZGxlcl8uZW1pdHRlci5vbignZG93bicsIHRoaXMub25Qb2ludGVyRG93bl8pO1xuICAgICAgICAgICAgdGhpcy5wdEhhbmRsZXJfLmVtaXR0ZXIub24oJ21vdmUnLCB0aGlzLm9uUG9pbnRlck1vdmVfKTtcbiAgICAgICAgICAgIHRoaXMucHRIYW5kbGVyXy5lbWl0dGVyLm9uKCd1cCcsIHRoaXMub25Qb2ludGVyVXBfKTtcbiAgICAgICAgICAgIHRoaXMudmlldy5wYWRFbGVtZW50LmFkZEV2ZW50TGlzdGVuZXIoJ2tleWRvd24nLCB0aGlzLm9uUGFkS2V5RG93bl8pO1xuICAgICAgICAgICAgdGhpcy52aWV3LnBhZEVsZW1lbnQuYWRkRXZlbnRMaXN0ZW5lcigna2V5dXAnLCB0aGlzLm9uUGFkS2V5VXBfKTtcbiAgICAgICAgfVxuICAgICAgICBoYW5kbGVQb2ludGVyRXZlbnRfKGQsIG9wdHMpIHtcbiAgICAgICAgICAgIGlmICghZC5wb2ludCkge1xuICAgICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGNvbnN0IG1heCA9IHRoaXMubWF4VmFsdWVfO1xuICAgICAgICAgICAgY29uc3QgcHggPSBtYXBSYW5nZShkLnBvaW50LngsIDAsIGQuYm91bmRzLndpZHRoLCAtbWF4LCArbWF4KTtcbiAgICAgICAgICAgIGNvbnN0IHB5ID0gbWFwUmFuZ2UodGhpcy5pbnZlcnRzWV8gPyBkLmJvdW5kcy5oZWlnaHQgLSBkLnBvaW50LnkgOiBkLnBvaW50LnksIDAsIGQuYm91bmRzLmhlaWdodCwgLW1heCwgK21heCk7XG4gICAgICAgICAgICB0aGlzLnZhbHVlLnNldFJhd1ZhbHVlKG5ldyBQb2ludDJkKHB4LCBweSksIG9wdHMpO1xuICAgICAgICB9XG4gICAgICAgIG9uUG9pbnRlckRvd25fKGV2KSB7XG4gICAgICAgICAgICB0aGlzLmhhbmRsZVBvaW50ZXJFdmVudF8oZXYuZGF0YSwge1xuICAgICAgICAgICAgICAgIGZvcmNlRW1pdDogZmFsc2UsXG4gICAgICAgICAgICAgICAgbGFzdDogZmFsc2UsXG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfVxuICAgICAgICBvblBvaW50ZXJNb3ZlXyhldikge1xuICAgICAgICAgICAgdGhpcy5oYW5kbGVQb2ludGVyRXZlbnRfKGV2LmRhdGEsIHtcbiAgICAgICAgICAgICAgICBmb3JjZUVtaXQ6IGZhbHNlLFxuICAgICAgICAgICAgICAgIGxhc3Q6IGZhbHNlLFxuICAgICAgICAgICAgfSk7XG4gICAgICAgIH1cbiAgICAgICAgb25Qb2ludGVyVXBfKGV2KSB7XG4gICAgICAgICAgICB0aGlzLmhhbmRsZVBvaW50ZXJFdmVudF8oZXYuZGF0YSwge1xuICAgICAgICAgICAgICAgIGZvcmNlRW1pdDogdHJ1ZSxcbiAgICAgICAgICAgICAgICBsYXN0OiB0cnVlLFxuICAgICAgICAgICAgfSk7XG4gICAgICAgIH1cbiAgICAgICAgb25QYWRLZXlEb3duXyhldikge1xuICAgICAgICAgICAgaWYgKGlzQXJyb3dLZXkoZXYua2V5KSkge1xuICAgICAgICAgICAgICAgIGV2LnByZXZlbnREZWZhdWx0KCk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBjb25zdCBbZHgsIGR5XSA9IGNvbXB1dGVPZmZzZXQoZXYsIHRoaXMuYmFzZVN0ZXBzXywgdGhpcy5pbnZlcnRzWV8pO1xuICAgICAgICAgICAgaWYgKGR4ID09PSAwICYmIGR5ID09PSAwKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgdGhpcy52YWx1ZS5zZXRSYXdWYWx1ZShuZXcgUG9pbnQyZCh0aGlzLnZhbHVlLnJhd1ZhbHVlLnggKyBkeCwgdGhpcy52YWx1ZS5yYXdWYWx1ZS55ICsgZHkpLCB7XG4gICAgICAgICAgICAgICAgZm9yY2VFbWl0OiBmYWxzZSxcbiAgICAgICAgICAgICAgICBsYXN0OiBmYWxzZSxcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9XG4gICAgICAgIG9uUGFkS2V5VXBfKGV2KSB7XG4gICAgICAgICAgICBjb25zdCBbZHgsIGR5XSA9IGNvbXB1dGVPZmZzZXQoZXYsIHRoaXMuYmFzZVN0ZXBzXywgdGhpcy5pbnZlcnRzWV8pO1xuICAgICAgICAgICAgaWYgKGR4ID09PSAwICYmIGR5ID09PSAwKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgdGhpcy52YWx1ZS5zZXRSYXdWYWx1ZSh0aGlzLnZhbHVlLnJhd1ZhbHVlLCB7XG4gICAgICAgICAgICAgICAgZm9yY2VFbWl0OiB0cnVlLFxuICAgICAgICAgICAgICAgIGxhc3Q6IHRydWUsXG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIGNsYXNzIFBvaW50MmRDb250cm9sbGVyIHtcbiAgICAgICAgY29uc3RydWN0b3IoZG9jLCBjb25maWcpIHtcbiAgICAgICAgICAgIHZhciBfYSwgX2I7XG4gICAgICAgICAgICB0aGlzLm9uUG9wdXBDaGlsZEJsdXJfID0gdGhpcy5vblBvcHVwQ2hpbGRCbHVyXy5iaW5kKHRoaXMpO1xuICAgICAgICAgICAgdGhpcy5vblBvcHVwQ2hpbGRLZXlkb3duXyA9IHRoaXMub25Qb3B1cENoaWxkS2V5ZG93bl8uYmluZCh0aGlzKTtcbiAgICAgICAgICAgIHRoaXMub25QYWRCdXR0b25CbHVyXyA9IHRoaXMub25QYWRCdXR0b25CbHVyXy5iaW5kKHRoaXMpO1xuICAgICAgICAgICAgdGhpcy5vblBhZEJ1dHRvbkNsaWNrXyA9IHRoaXMub25QYWRCdXR0b25DbGlja18uYmluZCh0aGlzKTtcbiAgICAgICAgICAgIHRoaXMudmFsdWUgPSBjb25maWcudmFsdWU7XG4gICAgICAgICAgICB0aGlzLnZpZXdQcm9wcyA9IGNvbmZpZy52aWV3UHJvcHM7XG4gICAgICAgICAgICB0aGlzLmZvbGRhYmxlXyA9IEZvbGRhYmxlLmNyZWF0ZShjb25maWcuZXhwYW5kZWQpO1xuICAgICAgICAgICAgdGhpcy5wb3BDXyA9XG4gICAgICAgICAgICAgICAgY29uZmlnLnBpY2tlckxheW91dCA9PT0gJ3BvcHVwJ1xuICAgICAgICAgICAgICAgICAgICA/IG5ldyBQb3B1cENvbnRyb2xsZXIoZG9jLCB7XG4gICAgICAgICAgICAgICAgICAgICAgICB2aWV3UHJvcHM6IHRoaXMudmlld1Byb3BzLFxuICAgICAgICAgICAgICAgICAgICB9KVxuICAgICAgICAgICAgICAgICAgICA6IG51bGw7XG4gICAgICAgICAgICBjb25zdCBwYWRDID0gbmV3IFBvaW50MmRQaWNrZXJDb250cm9sbGVyKGRvYywge1xuICAgICAgICAgICAgICAgIGJhc2VTdGVwczogW2NvbmZpZy5heGVzWzBdLmJhc2VTdGVwLCBjb25maWcuYXhlc1sxXS5iYXNlU3RlcF0sXG4gICAgICAgICAgICAgICAgaW52ZXJ0c1k6IGNvbmZpZy5pbnZlcnRzWSxcbiAgICAgICAgICAgICAgICBsYXlvdXQ6IGNvbmZpZy5waWNrZXJMYXlvdXQsXG4gICAgICAgICAgICAgICAgbWF4VmFsdWU6IGNvbmZpZy5tYXhWYWx1ZSxcbiAgICAgICAgICAgICAgICB2YWx1ZTogdGhpcy52YWx1ZSxcbiAgICAgICAgICAgICAgICB2aWV3UHJvcHM6IHRoaXMudmlld1Byb3BzLFxuICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICBwYWRDLnZpZXcuYWxsRm9jdXNhYmxlRWxlbWVudHMuZm9yRWFjaCgoZWxlbSkgPT4ge1xuICAgICAgICAgICAgICAgIGVsZW0uYWRkRXZlbnRMaXN0ZW5lcignYmx1cicsIHRoaXMub25Qb3B1cENoaWxkQmx1cl8pO1xuICAgICAgICAgICAgICAgIGVsZW0uYWRkRXZlbnRMaXN0ZW5lcigna2V5ZG93bicsIHRoaXMub25Qb3B1cENoaWxkS2V5ZG93bl8pO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB0aGlzLnBpY2tlckNfID0gcGFkQztcbiAgICAgICAgICAgIHRoaXMudGV4dENfID0gbmV3IFBvaW50TmRUZXh0Q29udHJvbGxlcihkb2MsIHtcbiAgICAgICAgICAgICAgICBhc3NlbWJseTogUG9pbnQyZEFzc2VtYmx5LFxuICAgICAgICAgICAgICAgIGF4ZXM6IGNvbmZpZy5heGVzLFxuICAgICAgICAgICAgICAgIHBhcnNlcjogY29uZmlnLnBhcnNlcixcbiAgICAgICAgICAgICAgICB2YWx1ZTogdGhpcy52YWx1ZSxcbiAgICAgICAgICAgICAgICB2aWV3UHJvcHM6IHRoaXMudmlld1Byb3BzLFxuICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB0aGlzLnZpZXcgPSBuZXcgUG9pbnQyZFZpZXcoZG9jLCB7XG4gICAgICAgICAgICAgICAgZXhwYW5kZWQ6IHRoaXMuZm9sZGFibGVfLnZhbHVlKCdleHBhbmRlZCcpLFxuICAgICAgICAgICAgICAgIHBpY2tlckxheW91dDogY29uZmlnLnBpY2tlckxheW91dCxcbiAgICAgICAgICAgICAgICB2aWV3UHJvcHM6IHRoaXMudmlld1Byb3BzLFxuICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB0aGlzLnZpZXcudGV4dEVsZW1lbnQuYXBwZW5kQ2hpbGQodGhpcy50ZXh0Q18udmlldy5lbGVtZW50KTtcbiAgICAgICAgICAgIChfYSA9IHRoaXMudmlldy5idXR0b25FbGVtZW50KSA9PT0gbnVsbCB8fCBfYSA9PT0gdm9pZCAwID8gdm9pZCAwIDogX2EuYWRkRXZlbnRMaXN0ZW5lcignYmx1cicsIHRoaXMub25QYWRCdXR0b25CbHVyXyk7XG4gICAgICAgICAgICAoX2IgPSB0aGlzLnZpZXcuYnV0dG9uRWxlbWVudCkgPT09IG51bGwgfHwgX2IgPT09IHZvaWQgMCA/IHZvaWQgMCA6IF9iLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgdGhpcy5vblBhZEJ1dHRvbkNsaWNrXyk7XG4gICAgICAgICAgICBpZiAodGhpcy5wb3BDXykge1xuICAgICAgICAgICAgICAgIHRoaXMudmlldy5lbGVtZW50LmFwcGVuZENoaWxkKHRoaXMucG9wQ18udmlldy5lbGVtZW50KTtcbiAgICAgICAgICAgICAgICB0aGlzLnBvcENfLnZpZXcuZWxlbWVudC5hcHBlbmRDaGlsZCh0aGlzLnBpY2tlckNfLnZpZXcuZWxlbWVudCk7XG4gICAgICAgICAgICAgICAgY29ubmVjdFZhbHVlcyh7XG4gICAgICAgICAgICAgICAgICAgIHByaW1hcnk6IHRoaXMuZm9sZGFibGVfLnZhbHVlKCdleHBhbmRlZCcpLFxuICAgICAgICAgICAgICAgICAgICBzZWNvbmRhcnk6IHRoaXMucG9wQ18uc2hvd3MsXG4gICAgICAgICAgICAgICAgICAgIGZvcndhcmQ6IChwKSA9PiBwLnJhd1ZhbHVlLFxuICAgICAgICAgICAgICAgICAgICBiYWNrd2FyZDogKF8sIHMpID0+IHMucmF3VmFsdWUsXG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNlIGlmICh0aGlzLnZpZXcucGlja2VyRWxlbWVudCkge1xuICAgICAgICAgICAgICAgIHRoaXMudmlldy5waWNrZXJFbGVtZW50LmFwcGVuZENoaWxkKHRoaXMucGlja2VyQ18udmlldy5lbGVtZW50KTtcbiAgICAgICAgICAgICAgICBiaW5kRm9sZGFibGUodGhpcy5mb2xkYWJsZV8sIHRoaXMudmlldy5waWNrZXJFbGVtZW50KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICBvblBhZEJ1dHRvbkJsdXJfKGUpIHtcbiAgICAgICAgICAgIGlmICghdGhpcy5wb3BDXykge1xuICAgICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGNvbnN0IGVsZW0gPSB0aGlzLnZpZXcuZWxlbWVudDtcbiAgICAgICAgICAgIGNvbnN0IG5leHRUYXJnZXQgPSBmb3JjZUNhc3QoZS5yZWxhdGVkVGFyZ2V0KTtcbiAgICAgICAgICAgIGlmICghbmV4dFRhcmdldCB8fCAhZWxlbS5jb250YWlucyhuZXh0VGFyZ2V0KSkge1xuICAgICAgICAgICAgICAgIHRoaXMucG9wQ18uc2hvd3MucmF3VmFsdWUgPSBmYWxzZTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICBvblBhZEJ1dHRvbkNsaWNrXygpIHtcbiAgICAgICAgICAgIHRoaXMuZm9sZGFibGVfLnNldCgnZXhwYW5kZWQnLCAhdGhpcy5mb2xkYWJsZV8uZ2V0KCdleHBhbmRlZCcpKTtcbiAgICAgICAgICAgIGlmICh0aGlzLmZvbGRhYmxlXy5nZXQoJ2V4cGFuZGVkJykpIHtcbiAgICAgICAgICAgICAgICB0aGlzLnBpY2tlckNfLnZpZXcuYWxsRm9jdXNhYmxlRWxlbWVudHNbMF0uZm9jdXMoKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICBvblBvcHVwQ2hpbGRCbHVyXyhldikge1xuICAgICAgICAgICAgaWYgKCF0aGlzLnBvcENfKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgY29uc3QgZWxlbSA9IHRoaXMucG9wQ18udmlldy5lbGVtZW50O1xuICAgICAgICAgICAgY29uc3QgbmV4dFRhcmdldCA9IGZpbmROZXh0VGFyZ2V0KGV2KTtcbiAgICAgICAgICAgIGlmIChuZXh0VGFyZ2V0ICYmIGVsZW0uY29udGFpbnMobmV4dFRhcmdldCkpIHtcbiAgICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBpZiAobmV4dFRhcmdldCAmJlxuICAgICAgICAgICAgICAgIG5leHRUYXJnZXQgPT09IHRoaXMudmlldy5idXR0b25FbGVtZW50ICYmXG4gICAgICAgICAgICAgICAgIXN1cHBvcnRzVG91Y2goZWxlbS5vd25lckRvY3VtZW50KSkge1xuICAgICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHRoaXMucG9wQ18uc2hvd3MucmF3VmFsdWUgPSBmYWxzZTtcbiAgICAgICAgfVxuICAgICAgICBvblBvcHVwQ2hpbGRLZXlkb3duXyhldikge1xuICAgICAgICAgICAgaWYgKHRoaXMucG9wQ18pIHtcbiAgICAgICAgICAgICAgICBpZiAoZXYua2V5ID09PSAnRXNjYXBlJykge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLnBvcENfLnNob3dzLnJhd1ZhbHVlID0gZmFsc2U7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxzZSBpZiAodGhpcy52aWV3LnBpY2tlckVsZW1lbnQpIHtcbiAgICAgICAgICAgICAgICBpZiAoZXYua2V5ID09PSAnRXNjYXBlJykge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLnZpZXcuYnV0dG9uRWxlbWVudC5mb2N1cygpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH1cblxuICAgIGZ1bmN0aW9uIHBvaW50MmRGcm9tVW5rbm93bih2YWx1ZSkge1xuICAgICAgICByZXR1cm4gUG9pbnQyZC5pc09iamVjdCh2YWx1ZSlcbiAgICAgICAgICAgID8gbmV3IFBvaW50MmQodmFsdWUueCwgdmFsdWUueSlcbiAgICAgICAgICAgIDogbmV3IFBvaW50MmQoKTtcbiAgICB9XG4gICAgZnVuY3Rpb24gd3JpdGVQb2ludDJkKHRhcmdldCwgdmFsdWUpIHtcbiAgICAgICAgdGFyZ2V0LndyaXRlUHJvcGVydHkoJ3gnLCB2YWx1ZS54KTtcbiAgICAgICAgdGFyZ2V0LndyaXRlUHJvcGVydHkoJ3knLCB2YWx1ZS55KTtcbiAgICB9XG5cbiAgICBmdW5jdGlvbiBjcmVhdGVEaW1lbnNpb25Db25zdHJhaW50JDIocGFyYW1zKSB7XG4gICAgICAgIGlmICghcGFyYW1zKSB7XG4gICAgICAgICAgICByZXR1cm4gdW5kZWZpbmVkO1xuICAgICAgICB9XG4gICAgICAgIGNvbnN0IGNvbnN0cmFpbnRzID0gW107XG4gICAgICAgIGlmICghaXNFbXB0eShwYXJhbXMuc3RlcCkpIHtcbiAgICAgICAgICAgIGNvbnN0cmFpbnRzLnB1c2gobmV3IFN0ZXBDb25zdHJhaW50KHBhcmFtcy5zdGVwKSk7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKCFpc0VtcHR5KHBhcmFtcy5tYXgpIHx8ICFpc0VtcHR5KHBhcmFtcy5taW4pKSB7XG4gICAgICAgICAgICBjb25zdHJhaW50cy5wdXNoKG5ldyBSYW5nZUNvbnN0cmFpbnQoe1xuICAgICAgICAgICAgICAgIG1heDogcGFyYW1zLm1heCxcbiAgICAgICAgICAgICAgICBtaW46IHBhcmFtcy5taW4sXG4gICAgICAgICAgICB9KSk7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIG5ldyBDb21wb3NpdGVDb25zdHJhaW50KGNvbnN0cmFpbnRzKTtcbiAgICB9XG4gICAgZnVuY3Rpb24gY3JlYXRlQ29uc3RyYWludCQzKHBhcmFtcykge1xuICAgICAgICByZXR1cm4gbmV3IFBvaW50TmRDb25zdHJhaW50KHtcbiAgICAgICAgICAgIGFzc2VtYmx5OiBQb2ludDJkQXNzZW1ibHksXG4gICAgICAgICAgICBjb21wb25lbnRzOiBbXG4gICAgICAgICAgICAgICAgY3JlYXRlRGltZW5zaW9uQ29uc3RyYWludCQyKCd4JyBpbiBwYXJhbXMgPyBwYXJhbXMueCA6IHVuZGVmaW5lZCksXG4gICAgICAgICAgICAgICAgY3JlYXRlRGltZW5zaW9uQ29uc3RyYWludCQyKCd5JyBpbiBwYXJhbXMgPyBwYXJhbXMueSA6IHVuZGVmaW5lZCksXG4gICAgICAgICAgICBdLFxuICAgICAgICB9KTtcbiAgICB9XG4gICAgZnVuY3Rpb24gZ2V0U3VpdGFibGVNYXhEaW1lbnNpb25WYWx1ZShjb25zdHJhaW50LCByYXdWYWx1ZSkge1xuICAgICAgICBjb25zdCByYyA9IGNvbnN0cmFpbnQgJiYgZmluZENvbnN0cmFpbnQoY29uc3RyYWludCwgUmFuZ2VDb25zdHJhaW50KTtcbiAgICAgICAgaWYgKHJjKSB7XG4gICAgICAgICAgICByZXR1cm4gTWF0aC5tYXgoTWF0aC5hYnMocmMubWluVmFsdWUgfHwgMCksIE1hdGguYWJzKHJjLm1heFZhbHVlIHx8IDApKTtcbiAgICAgICAgfVxuICAgICAgICBjb25zdCBzdGVwID0gZ2V0QmFzZVN0ZXAoY29uc3RyYWludCk7XG4gICAgICAgIHJldHVybiBNYXRoLm1heChNYXRoLmFicyhzdGVwKSAqIDEwLCBNYXRoLmFicyhyYXdWYWx1ZSkgKiAxMCk7XG4gICAgfVxuICAgIGZ1bmN0aW9uIGdldFN1aXRhYmxlTWF4VmFsdWUoaW5pdGlhbFZhbHVlLCBjb25zdHJhaW50KSB7XG4gICAgICAgIGNvbnN0IHhjID0gY29uc3RyYWludCBpbnN0YW5jZW9mIFBvaW50TmRDb25zdHJhaW50XG4gICAgICAgICAgICA/IGNvbnN0cmFpbnQuY29tcG9uZW50c1swXVxuICAgICAgICAgICAgOiB1bmRlZmluZWQ7XG4gICAgICAgIGNvbnN0IHljID0gY29uc3RyYWludCBpbnN0YW5jZW9mIFBvaW50TmRDb25zdHJhaW50XG4gICAgICAgICAgICA/IGNvbnN0cmFpbnQuY29tcG9uZW50c1sxXVxuICAgICAgICAgICAgOiB1bmRlZmluZWQ7XG4gICAgICAgIGNvbnN0IHhyID0gZ2V0U3VpdGFibGVNYXhEaW1lbnNpb25WYWx1ZSh4YywgaW5pdGlhbFZhbHVlLngpO1xuICAgICAgICBjb25zdCB5ciA9IGdldFN1aXRhYmxlTWF4RGltZW5zaW9uVmFsdWUoeWMsIGluaXRpYWxWYWx1ZS55KTtcbiAgICAgICAgcmV0dXJuIE1hdGgubWF4KHhyLCB5cik7XG4gICAgfVxuICAgIGZ1bmN0aW9uIGNyZWF0ZUF4aXMkMihpbml0aWFsVmFsdWUsIGNvbnN0cmFpbnQpIHtcbiAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgIGJhc2VTdGVwOiBnZXRCYXNlU3RlcChjb25zdHJhaW50KSxcbiAgICAgICAgICAgIGNvbnN0cmFpbnQ6IGNvbnN0cmFpbnQsXG4gICAgICAgICAgICB0ZXh0UHJvcHM6IFZhbHVlTWFwLmZyb21PYmplY3Qoe1xuICAgICAgICAgICAgICAgIGRyYWdnaW5nU2NhbGU6IGdldFN1aXRhYmxlRHJhZ2dpbmdTY2FsZShjb25zdHJhaW50LCBpbml0aWFsVmFsdWUpLFxuICAgICAgICAgICAgICAgIGZvcm1hdHRlcjogY3JlYXRlTnVtYmVyRm9ybWF0dGVyKGdldFN1aXRhYmxlRGVjaW1hbERpZ2l0cyhjb25zdHJhaW50LCBpbml0aWFsVmFsdWUpKSxcbiAgICAgICAgICAgIH0pLFxuICAgICAgICB9O1xuICAgIH1cbiAgICBmdW5jdGlvbiBzaG91bGRJbnZlcnRZKHBhcmFtcykge1xuICAgICAgICBpZiAoISgneScgaW4gcGFyYW1zKSkge1xuICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICB9XG4gICAgICAgIGNvbnN0IHlQYXJhbXMgPSBwYXJhbXMueTtcbiAgICAgICAgaWYgKCF5UGFyYW1zKSB7XG4gICAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuICdpbnZlcnRlZCcgaW4geVBhcmFtcyA/ICEheVBhcmFtcy5pbnZlcnRlZCA6IGZhbHNlO1xuICAgIH1cbiAgICBjb25zdCBQb2ludDJkSW5wdXRQbHVnaW4gPSB7XG4gICAgICAgIGlkOiAnaW5wdXQtcG9pbnQyZCcsXG4gICAgICAgIHR5cGU6ICdpbnB1dCcsXG4gICAgICAgIGFjY2VwdDogKHZhbHVlLCBwYXJhbXMpID0+IHtcbiAgICAgICAgICAgIGlmICghUG9pbnQyZC5pc09iamVjdCh2YWx1ZSkpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gbnVsbDtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGNvbnN0IHAgPSBQYXJhbXNQYXJzZXJzO1xuICAgICAgICAgICAgY29uc3QgcmVzdWx0ID0gcGFyc2VQYXJhbXMocGFyYW1zLCB7XG4gICAgICAgICAgICAgICAgZXhwYW5kZWQ6IHAub3B0aW9uYWwuYm9vbGVhbixcbiAgICAgICAgICAgICAgICBwaWNrZXI6IHAub3B0aW9uYWwuY3VzdG9tKHBhcnNlUGlja2VyTGF5b3V0KSxcbiAgICAgICAgICAgICAgICB4OiBwLm9wdGlvbmFsLmN1c3RvbShwYXJzZVBvaW50RGltZW5zaW9uUGFyYW1zKSxcbiAgICAgICAgICAgICAgICB5OiBwLm9wdGlvbmFsLm9iamVjdCh7XG4gICAgICAgICAgICAgICAgICAgIGludmVydGVkOiBwLm9wdGlvbmFsLmJvb2xlYW4sXG4gICAgICAgICAgICAgICAgICAgIG1heDogcC5vcHRpb25hbC5udW1iZXIsXG4gICAgICAgICAgICAgICAgICAgIG1pbjogcC5vcHRpb25hbC5udW1iZXIsXG4gICAgICAgICAgICAgICAgICAgIHN0ZXA6IHAub3B0aW9uYWwubnVtYmVyLFxuICAgICAgICAgICAgICAgIH0pLFxuICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICByZXR1cm4gcmVzdWx0XG4gICAgICAgICAgICAgICAgPyB7XG4gICAgICAgICAgICAgICAgICAgIGluaXRpYWxWYWx1ZTogdmFsdWUsXG4gICAgICAgICAgICAgICAgICAgIHBhcmFtczogcmVzdWx0LFxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICA6IG51bGw7XG4gICAgICAgIH0sXG4gICAgICAgIGJpbmRpbmc6IHtcbiAgICAgICAgICAgIHJlYWRlcjogKF9hcmdzKSA9PiBwb2ludDJkRnJvbVVua25vd24sXG4gICAgICAgICAgICBjb25zdHJhaW50OiAoYXJncykgPT4gY3JlYXRlQ29uc3RyYWludCQzKGFyZ3MucGFyYW1zKSxcbiAgICAgICAgICAgIGVxdWFsczogUG9pbnQyZC5lcXVhbHMsXG4gICAgICAgICAgICB3cml0ZXI6IChfYXJncykgPT4gd3JpdGVQb2ludDJkLFxuICAgICAgICB9LFxuICAgICAgICBjb250cm9sbGVyOiAoYXJncykgPT4ge1xuICAgICAgICAgICAgY29uc3QgZG9jID0gYXJncy5kb2N1bWVudDtcbiAgICAgICAgICAgIGNvbnN0IHZhbHVlID0gYXJncy52YWx1ZTtcbiAgICAgICAgICAgIGNvbnN0IGMgPSBhcmdzLmNvbnN0cmFpbnQ7XG4gICAgICAgICAgICBpZiAoIShjIGluc3RhbmNlb2YgUG9pbnROZENvbnN0cmFpbnQpKSB7XG4gICAgICAgICAgICAgICAgdGhyb3cgVHBFcnJvci5zaG91bGROZXZlckhhcHBlbigpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgY29uc3QgZXhwYW5kZWQgPSAnZXhwYW5kZWQnIGluIGFyZ3MucGFyYW1zID8gYXJncy5wYXJhbXMuZXhwYW5kZWQgOiB1bmRlZmluZWQ7XG4gICAgICAgICAgICBjb25zdCBwaWNrZXIgPSAncGlja2VyJyBpbiBhcmdzLnBhcmFtcyA/IGFyZ3MucGFyYW1zLnBpY2tlciA6IHVuZGVmaW5lZDtcbiAgICAgICAgICAgIHJldHVybiBuZXcgUG9pbnQyZENvbnRyb2xsZXIoZG9jLCB7XG4gICAgICAgICAgICAgICAgYXhlczogW1xuICAgICAgICAgICAgICAgICAgICBjcmVhdGVBeGlzJDIodmFsdWUucmF3VmFsdWUueCwgYy5jb21wb25lbnRzWzBdKSxcbiAgICAgICAgICAgICAgICAgICAgY3JlYXRlQXhpcyQyKHZhbHVlLnJhd1ZhbHVlLnksIGMuY29tcG9uZW50c1sxXSksXG4gICAgICAgICAgICAgICAgXSxcbiAgICAgICAgICAgICAgICBleHBhbmRlZDogZXhwYW5kZWQgIT09IG51bGwgJiYgZXhwYW5kZWQgIT09IHZvaWQgMCA/IGV4cGFuZGVkIDogZmFsc2UsXG4gICAgICAgICAgICAgICAgaW52ZXJ0c1k6IHNob3VsZEludmVydFkoYXJncy5wYXJhbXMpLFxuICAgICAgICAgICAgICAgIG1heFZhbHVlOiBnZXRTdWl0YWJsZU1heFZhbHVlKHZhbHVlLnJhd1ZhbHVlLCBjKSxcbiAgICAgICAgICAgICAgICBwYXJzZXI6IHBhcnNlTnVtYmVyLFxuICAgICAgICAgICAgICAgIHBpY2tlckxheW91dDogcGlja2VyICE9PSBudWxsICYmIHBpY2tlciAhPT0gdm9pZCAwID8gcGlja2VyIDogJ3BvcHVwJyxcbiAgICAgICAgICAgICAgICB2YWx1ZTogdmFsdWUsXG4gICAgICAgICAgICAgICAgdmlld1Byb3BzOiBhcmdzLnZpZXdQcm9wcyxcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9LFxuICAgIH07XG5cbiAgICBjbGFzcyBQb2ludDNkIHtcbiAgICAgICAgY29uc3RydWN0b3IoeCA9IDAsIHkgPSAwLCB6ID0gMCkge1xuICAgICAgICAgICAgdGhpcy54ID0geDtcbiAgICAgICAgICAgIHRoaXMueSA9IHk7XG4gICAgICAgICAgICB0aGlzLnogPSB6O1xuICAgICAgICB9XG4gICAgICAgIGdldENvbXBvbmVudHMoKSB7XG4gICAgICAgICAgICByZXR1cm4gW3RoaXMueCwgdGhpcy55LCB0aGlzLnpdO1xuICAgICAgICB9XG4gICAgICAgIHN0YXRpYyBpc09iamVjdChvYmopIHtcbiAgICAgICAgICAgIGlmIChpc0VtcHR5KG9iaikpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBjb25zdCB4ID0gb2JqLng7XG4gICAgICAgICAgICBjb25zdCB5ID0gb2JqLnk7XG4gICAgICAgICAgICBjb25zdCB6ID0gb2JqLno7XG4gICAgICAgICAgICBpZiAodHlwZW9mIHggIT09ICdudW1iZXInIHx8XG4gICAgICAgICAgICAgICAgdHlwZW9mIHkgIT09ICdudW1iZXInIHx8XG4gICAgICAgICAgICAgICAgdHlwZW9mIHogIT09ICdudW1iZXInKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICAgIH1cbiAgICAgICAgc3RhdGljIGVxdWFscyh2MSwgdjIpIHtcbiAgICAgICAgICAgIHJldHVybiB2MS54ID09PSB2Mi54ICYmIHYxLnkgPT09IHYyLnkgJiYgdjEueiA9PT0gdjIuejtcbiAgICAgICAgfVxuICAgICAgICB0b09iamVjdCgpIHtcbiAgICAgICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICAgICAgeDogdGhpcy54LFxuICAgICAgICAgICAgICAgIHk6IHRoaXMueSxcbiAgICAgICAgICAgICAgICB6OiB0aGlzLnosXG4gICAgICAgICAgICB9O1xuICAgICAgICB9XG4gICAgfVxuICAgIGNvbnN0IFBvaW50M2RBc3NlbWJseSA9IHtcbiAgICAgICAgdG9Db21wb25lbnRzOiAocCkgPT4gcC5nZXRDb21wb25lbnRzKCksXG4gICAgICAgIGZyb21Db21wb25lbnRzOiAoY29tcHMpID0+IG5ldyBQb2ludDNkKC4uLmNvbXBzKSxcbiAgICB9O1xuXG4gICAgZnVuY3Rpb24gcG9pbnQzZEZyb21Vbmtub3duKHZhbHVlKSB7XG4gICAgICAgIHJldHVybiBQb2ludDNkLmlzT2JqZWN0KHZhbHVlKVxuICAgICAgICAgICAgPyBuZXcgUG9pbnQzZCh2YWx1ZS54LCB2YWx1ZS55LCB2YWx1ZS56KVxuICAgICAgICAgICAgOiBuZXcgUG9pbnQzZCgpO1xuICAgIH1cbiAgICBmdW5jdGlvbiB3cml0ZVBvaW50M2QodGFyZ2V0LCB2YWx1ZSkge1xuICAgICAgICB0YXJnZXQud3JpdGVQcm9wZXJ0eSgneCcsIHZhbHVlLngpO1xuICAgICAgICB0YXJnZXQud3JpdGVQcm9wZXJ0eSgneScsIHZhbHVlLnkpO1xuICAgICAgICB0YXJnZXQud3JpdGVQcm9wZXJ0eSgneicsIHZhbHVlLnopO1xuICAgIH1cblxuICAgIGZ1bmN0aW9uIGNyZWF0ZURpbWVuc2lvbkNvbnN0cmFpbnQkMShwYXJhbXMpIHtcbiAgICAgICAgaWYgKCFwYXJhbXMpIHtcbiAgICAgICAgICAgIHJldHVybiB1bmRlZmluZWQ7XG4gICAgICAgIH1cbiAgICAgICAgY29uc3QgY29uc3RyYWludHMgPSBbXTtcbiAgICAgICAgaWYgKCFpc0VtcHR5KHBhcmFtcy5zdGVwKSkge1xuICAgICAgICAgICAgY29uc3RyYWludHMucHVzaChuZXcgU3RlcENvbnN0cmFpbnQocGFyYW1zLnN0ZXApKTtcbiAgICAgICAgfVxuICAgICAgICBpZiAoIWlzRW1wdHkocGFyYW1zLm1heCkgfHwgIWlzRW1wdHkocGFyYW1zLm1pbikpIHtcbiAgICAgICAgICAgIGNvbnN0cmFpbnRzLnB1c2gobmV3IFJhbmdlQ29uc3RyYWludCh7XG4gICAgICAgICAgICAgICAgbWF4OiBwYXJhbXMubWF4LFxuICAgICAgICAgICAgICAgIG1pbjogcGFyYW1zLm1pbixcbiAgICAgICAgICAgIH0pKTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gbmV3IENvbXBvc2l0ZUNvbnN0cmFpbnQoY29uc3RyYWludHMpO1xuICAgIH1cbiAgICBmdW5jdGlvbiBjcmVhdGVDb25zdHJhaW50JDIocGFyYW1zKSB7XG4gICAgICAgIHJldHVybiBuZXcgUG9pbnROZENvbnN0cmFpbnQoe1xuICAgICAgICAgICAgYXNzZW1ibHk6IFBvaW50M2RBc3NlbWJseSxcbiAgICAgICAgICAgIGNvbXBvbmVudHM6IFtcbiAgICAgICAgICAgICAgICBjcmVhdGVEaW1lbnNpb25Db25zdHJhaW50JDEoJ3gnIGluIHBhcmFtcyA/IHBhcmFtcy54IDogdW5kZWZpbmVkKSxcbiAgICAgICAgICAgICAgICBjcmVhdGVEaW1lbnNpb25Db25zdHJhaW50JDEoJ3knIGluIHBhcmFtcyA/IHBhcmFtcy55IDogdW5kZWZpbmVkKSxcbiAgICAgICAgICAgICAgICBjcmVhdGVEaW1lbnNpb25Db25zdHJhaW50JDEoJ3onIGluIHBhcmFtcyA/IHBhcmFtcy56IDogdW5kZWZpbmVkKSxcbiAgICAgICAgICAgIF0sXG4gICAgICAgIH0pO1xuICAgIH1cbiAgICBmdW5jdGlvbiBjcmVhdGVBeGlzJDEoaW5pdGlhbFZhbHVlLCBjb25zdHJhaW50KSB7XG4gICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICBiYXNlU3RlcDogZ2V0QmFzZVN0ZXAoY29uc3RyYWludCksXG4gICAgICAgICAgICBjb25zdHJhaW50OiBjb25zdHJhaW50LFxuICAgICAgICAgICAgdGV4dFByb3BzOiBWYWx1ZU1hcC5mcm9tT2JqZWN0KHtcbiAgICAgICAgICAgICAgICBkcmFnZ2luZ1NjYWxlOiBnZXRTdWl0YWJsZURyYWdnaW5nU2NhbGUoY29uc3RyYWludCwgaW5pdGlhbFZhbHVlKSxcbiAgICAgICAgICAgICAgICBmb3JtYXR0ZXI6IGNyZWF0ZU51bWJlckZvcm1hdHRlcihnZXRTdWl0YWJsZURlY2ltYWxEaWdpdHMoY29uc3RyYWludCwgaW5pdGlhbFZhbHVlKSksXG4gICAgICAgICAgICB9KSxcbiAgICAgICAgfTtcbiAgICB9XG4gICAgY29uc3QgUG9pbnQzZElucHV0UGx1Z2luID0ge1xuICAgICAgICBpZDogJ2lucHV0LXBvaW50M2QnLFxuICAgICAgICB0eXBlOiAnaW5wdXQnLFxuICAgICAgICBhY2NlcHQ6ICh2YWx1ZSwgcGFyYW1zKSA9PiB7XG4gICAgICAgICAgICBpZiAoIVBvaW50M2QuaXNPYmplY3QodmFsdWUpKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIG51bGw7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBjb25zdCBwID0gUGFyYW1zUGFyc2VycztcbiAgICAgICAgICAgIGNvbnN0IHJlc3VsdCA9IHBhcnNlUGFyYW1zKHBhcmFtcywge1xuICAgICAgICAgICAgICAgIHg6IHAub3B0aW9uYWwuY3VzdG9tKHBhcnNlUG9pbnREaW1lbnNpb25QYXJhbXMpLFxuICAgICAgICAgICAgICAgIHk6IHAub3B0aW9uYWwuY3VzdG9tKHBhcnNlUG9pbnREaW1lbnNpb25QYXJhbXMpLFxuICAgICAgICAgICAgICAgIHo6IHAub3B0aW9uYWwuY3VzdG9tKHBhcnNlUG9pbnREaW1lbnNpb25QYXJhbXMpLFxuICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICByZXR1cm4gcmVzdWx0XG4gICAgICAgICAgICAgICAgPyB7XG4gICAgICAgICAgICAgICAgICAgIGluaXRpYWxWYWx1ZTogdmFsdWUsXG4gICAgICAgICAgICAgICAgICAgIHBhcmFtczogcmVzdWx0LFxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICA6IG51bGw7XG4gICAgICAgIH0sXG4gICAgICAgIGJpbmRpbmc6IHtcbiAgICAgICAgICAgIHJlYWRlcjogKF9hcmdzKSA9PiBwb2ludDNkRnJvbVVua25vd24sXG4gICAgICAgICAgICBjb25zdHJhaW50OiAoYXJncykgPT4gY3JlYXRlQ29uc3RyYWludCQyKGFyZ3MucGFyYW1zKSxcbiAgICAgICAgICAgIGVxdWFsczogUG9pbnQzZC5lcXVhbHMsXG4gICAgICAgICAgICB3cml0ZXI6IChfYXJncykgPT4gd3JpdGVQb2ludDNkLFxuICAgICAgICB9LFxuICAgICAgICBjb250cm9sbGVyOiAoYXJncykgPT4ge1xuICAgICAgICAgICAgY29uc3QgdmFsdWUgPSBhcmdzLnZhbHVlO1xuICAgICAgICAgICAgY29uc3QgYyA9IGFyZ3MuY29uc3RyYWludDtcbiAgICAgICAgICAgIGlmICghKGMgaW5zdGFuY2VvZiBQb2ludE5kQ29uc3RyYWludCkpIHtcbiAgICAgICAgICAgICAgICB0aHJvdyBUcEVycm9yLnNob3VsZE5ldmVySGFwcGVuKCk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICByZXR1cm4gbmV3IFBvaW50TmRUZXh0Q29udHJvbGxlcihhcmdzLmRvY3VtZW50LCB7XG4gICAgICAgICAgICAgICAgYXNzZW1ibHk6IFBvaW50M2RBc3NlbWJseSxcbiAgICAgICAgICAgICAgICBheGVzOiBbXG4gICAgICAgICAgICAgICAgICAgIGNyZWF0ZUF4aXMkMSh2YWx1ZS5yYXdWYWx1ZS54LCBjLmNvbXBvbmVudHNbMF0pLFxuICAgICAgICAgICAgICAgICAgICBjcmVhdGVBeGlzJDEodmFsdWUucmF3VmFsdWUueSwgYy5jb21wb25lbnRzWzFdKSxcbiAgICAgICAgICAgICAgICAgICAgY3JlYXRlQXhpcyQxKHZhbHVlLnJhd1ZhbHVlLnosIGMuY29tcG9uZW50c1syXSksXG4gICAgICAgICAgICAgICAgXSxcbiAgICAgICAgICAgICAgICBwYXJzZXI6IHBhcnNlTnVtYmVyLFxuICAgICAgICAgICAgICAgIHZhbHVlOiB2YWx1ZSxcbiAgICAgICAgICAgICAgICB2aWV3UHJvcHM6IGFyZ3Mudmlld1Byb3BzLFxuICAgICAgICAgICAgfSk7XG4gICAgICAgIH0sXG4gICAgfTtcblxuICAgIGNsYXNzIFBvaW50NGQge1xuICAgICAgICBjb25zdHJ1Y3Rvcih4ID0gMCwgeSA9IDAsIHogPSAwLCB3ID0gMCkge1xuICAgICAgICAgICAgdGhpcy54ID0geDtcbiAgICAgICAgICAgIHRoaXMueSA9IHk7XG4gICAgICAgICAgICB0aGlzLnogPSB6O1xuICAgICAgICAgICAgdGhpcy53ID0gdztcbiAgICAgICAgfVxuICAgICAgICBnZXRDb21wb25lbnRzKCkge1xuICAgICAgICAgICAgcmV0dXJuIFt0aGlzLngsIHRoaXMueSwgdGhpcy56LCB0aGlzLnddO1xuICAgICAgICB9XG4gICAgICAgIHN0YXRpYyBpc09iamVjdChvYmopIHtcbiAgICAgICAgICAgIGlmIChpc0VtcHR5KG9iaikpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBjb25zdCB4ID0gb2JqLng7XG4gICAgICAgICAgICBjb25zdCB5ID0gb2JqLnk7XG4gICAgICAgICAgICBjb25zdCB6ID0gb2JqLno7XG4gICAgICAgICAgICBjb25zdCB3ID0gb2JqLnc7XG4gICAgICAgICAgICBpZiAodHlwZW9mIHggIT09ICdudW1iZXInIHx8XG4gICAgICAgICAgICAgICAgdHlwZW9mIHkgIT09ICdudW1iZXInIHx8XG4gICAgICAgICAgICAgICAgdHlwZW9mIHogIT09ICdudW1iZXInIHx8XG4gICAgICAgICAgICAgICAgdHlwZW9mIHcgIT09ICdudW1iZXInKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICAgIH1cbiAgICAgICAgc3RhdGljIGVxdWFscyh2MSwgdjIpIHtcbiAgICAgICAgICAgIHJldHVybiB2MS54ID09PSB2Mi54ICYmIHYxLnkgPT09IHYyLnkgJiYgdjEueiA9PT0gdjIueiAmJiB2MS53ID09PSB2Mi53O1xuICAgICAgICB9XG4gICAgICAgIHRvT2JqZWN0KCkge1xuICAgICAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgICAgICB4OiB0aGlzLngsXG4gICAgICAgICAgICAgICAgeTogdGhpcy55LFxuICAgICAgICAgICAgICAgIHo6IHRoaXMueixcbiAgICAgICAgICAgICAgICB3OiB0aGlzLncsXG4gICAgICAgICAgICB9O1xuICAgICAgICB9XG4gICAgfVxuICAgIGNvbnN0IFBvaW50NGRBc3NlbWJseSA9IHtcbiAgICAgICAgdG9Db21wb25lbnRzOiAocCkgPT4gcC5nZXRDb21wb25lbnRzKCksXG4gICAgICAgIGZyb21Db21wb25lbnRzOiAoY29tcHMpID0+IG5ldyBQb2ludDRkKC4uLmNvbXBzKSxcbiAgICB9O1xuXG4gICAgZnVuY3Rpb24gcG9pbnQ0ZEZyb21Vbmtub3duKHZhbHVlKSB7XG4gICAgICAgIHJldHVybiBQb2ludDRkLmlzT2JqZWN0KHZhbHVlKVxuICAgICAgICAgICAgPyBuZXcgUG9pbnQ0ZCh2YWx1ZS54LCB2YWx1ZS55LCB2YWx1ZS56LCB2YWx1ZS53KVxuICAgICAgICAgICAgOiBuZXcgUG9pbnQ0ZCgpO1xuICAgIH1cbiAgICBmdW5jdGlvbiB3cml0ZVBvaW50NGQodGFyZ2V0LCB2YWx1ZSkge1xuICAgICAgICB0YXJnZXQud3JpdGVQcm9wZXJ0eSgneCcsIHZhbHVlLngpO1xuICAgICAgICB0YXJnZXQud3JpdGVQcm9wZXJ0eSgneScsIHZhbHVlLnkpO1xuICAgICAgICB0YXJnZXQud3JpdGVQcm9wZXJ0eSgneicsIHZhbHVlLnopO1xuICAgICAgICB0YXJnZXQud3JpdGVQcm9wZXJ0eSgndycsIHZhbHVlLncpO1xuICAgIH1cblxuICAgIGZ1bmN0aW9uIGNyZWF0ZURpbWVuc2lvbkNvbnN0cmFpbnQocGFyYW1zKSB7XG4gICAgICAgIGlmICghcGFyYW1zKSB7XG4gICAgICAgICAgICByZXR1cm4gdW5kZWZpbmVkO1xuICAgICAgICB9XG4gICAgICAgIGNvbnN0IGNvbnN0cmFpbnRzID0gW107XG4gICAgICAgIGlmICghaXNFbXB0eShwYXJhbXMuc3RlcCkpIHtcbiAgICAgICAgICAgIGNvbnN0cmFpbnRzLnB1c2gobmV3IFN0ZXBDb25zdHJhaW50KHBhcmFtcy5zdGVwKSk7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKCFpc0VtcHR5KHBhcmFtcy5tYXgpIHx8ICFpc0VtcHR5KHBhcmFtcy5taW4pKSB7XG4gICAgICAgICAgICBjb25zdHJhaW50cy5wdXNoKG5ldyBSYW5nZUNvbnN0cmFpbnQoe1xuICAgICAgICAgICAgICAgIG1heDogcGFyYW1zLm1heCxcbiAgICAgICAgICAgICAgICBtaW46IHBhcmFtcy5taW4sXG4gICAgICAgICAgICB9KSk7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIG5ldyBDb21wb3NpdGVDb25zdHJhaW50KGNvbnN0cmFpbnRzKTtcbiAgICB9XG4gICAgZnVuY3Rpb24gY3JlYXRlQ29uc3RyYWludCQxKHBhcmFtcykge1xuICAgICAgICByZXR1cm4gbmV3IFBvaW50TmRDb25zdHJhaW50KHtcbiAgICAgICAgICAgIGFzc2VtYmx5OiBQb2ludDRkQXNzZW1ibHksXG4gICAgICAgICAgICBjb21wb25lbnRzOiBbXG4gICAgICAgICAgICAgICAgY3JlYXRlRGltZW5zaW9uQ29uc3RyYWludCgneCcgaW4gcGFyYW1zID8gcGFyYW1zLnggOiB1bmRlZmluZWQpLFxuICAgICAgICAgICAgICAgIGNyZWF0ZURpbWVuc2lvbkNvbnN0cmFpbnQoJ3knIGluIHBhcmFtcyA/IHBhcmFtcy55IDogdW5kZWZpbmVkKSxcbiAgICAgICAgICAgICAgICBjcmVhdGVEaW1lbnNpb25Db25zdHJhaW50KCd6JyBpbiBwYXJhbXMgPyBwYXJhbXMueiA6IHVuZGVmaW5lZCksXG4gICAgICAgICAgICAgICAgY3JlYXRlRGltZW5zaW9uQ29uc3RyYWludCgndycgaW4gcGFyYW1zID8gcGFyYW1zLncgOiB1bmRlZmluZWQpLFxuICAgICAgICAgICAgXSxcbiAgICAgICAgfSk7XG4gICAgfVxuICAgIGZ1bmN0aW9uIGNyZWF0ZUF4aXMoaW5pdGlhbFZhbHVlLCBjb25zdHJhaW50KSB7XG4gICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICBiYXNlU3RlcDogZ2V0QmFzZVN0ZXAoY29uc3RyYWludCksXG4gICAgICAgICAgICBjb25zdHJhaW50OiBjb25zdHJhaW50LFxuICAgICAgICAgICAgdGV4dFByb3BzOiBWYWx1ZU1hcC5mcm9tT2JqZWN0KHtcbiAgICAgICAgICAgICAgICBkcmFnZ2luZ1NjYWxlOiBnZXRTdWl0YWJsZURyYWdnaW5nU2NhbGUoY29uc3RyYWludCwgaW5pdGlhbFZhbHVlKSxcbiAgICAgICAgICAgICAgICBmb3JtYXR0ZXI6IGNyZWF0ZU51bWJlckZvcm1hdHRlcihnZXRTdWl0YWJsZURlY2ltYWxEaWdpdHMoY29uc3RyYWludCwgaW5pdGlhbFZhbHVlKSksXG4gICAgICAgICAgICB9KSxcbiAgICAgICAgfTtcbiAgICB9XG4gICAgY29uc3QgUG9pbnQ0ZElucHV0UGx1Z2luID0ge1xuICAgICAgICBpZDogJ2lucHV0LXBvaW50NGQnLFxuICAgICAgICB0eXBlOiAnaW5wdXQnLFxuICAgICAgICBhY2NlcHQ6ICh2YWx1ZSwgcGFyYW1zKSA9PiB7XG4gICAgICAgICAgICBpZiAoIVBvaW50NGQuaXNPYmplY3QodmFsdWUpKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIG51bGw7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBjb25zdCBwID0gUGFyYW1zUGFyc2VycztcbiAgICAgICAgICAgIGNvbnN0IHJlc3VsdCA9IHBhcnNlUGFyYW1zKHBhcmFtcywge1xuICAgICAgICAgICAgICAgIHg6IHAub3B0aW9uYWwuY3VzdG9tKHBhcnNlUG9pbnREaW1lbnNpb25QYXJhbXMpLFxuICAgICAgICAgICAgICAgIHk6IHAub3B0aW9uYWwuY3VzdG9tKHBhcnNlUG9pbnREaW1lbnNpb25QYXJhbXMpLFxuICAgICAgICAgICAgICAgIHo6IHAub3B0aW9uYWwuY3VzdG9tKHBhcnNlUG9pbnREaW1lbnNpb25QYXJhbXMpLFxuICAgICAgICAgICAgICAgIHc6IHAub3B0aW9uYWwuY3VzdG9tKHBhcnNlUG9pbnREaW1lbnNpb25QYXJhbXMpLFxuICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICByZXR1cm4gcmVzdWx0XG4gICAgICAgICAgICAgICAgPyB7XG4gICAgICAgICAgICAgICAgICAgIGluaXRpYWxWYWx1ZTogdmFsdWUsXG4gICAgICAgICAgICAgICAgICAgIHBhcmFtczogcmVzdWx0LFxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICA6IG51bGw7XG4gICAgICAgIH0sXG4gICAgICAgIGJpbmRpbmc6IHtcbiAgICAgICAgICAgIHJlYWRlcjogKF9hcmdzKSA9PiBwb2ludDRkRnJvbVVua25vd24sXG4gICAgICAgICAgICBjb25zdHJhaW50OiAoYXJncykgPT4gY3JlYXRlQ29uc3RyYWludCQxKGFyZ3MucGFyYW1zKSxcbiAgICAgICAgICAgIGVxdWFsczogUG9pbnQ0ZC5lcXVhbHMsXG4gICAgICAgICAgICB3cml0ZXI6IChfYXJncykgPT4gd3JpdGVQb2ludDRkLFxuICAgICAgICB9LFxuICAgICAgICBjb250cm9sbGVyOiAoYXJncykgPT4ge1xuICAgICAgICAgICAgY29uc3QgdmFsdWUgPSBhcmdzLnZhbHVlO1xuICAgICAgICAgICAgY29uc3QgYyA9IGFyZ3MuY29uc3RyYWludDtcbiAgICAgICAgICAgIGlmICghKGMgaW5zdGFuY2VvZiBQb2ludE5kQ29uc3RyYWludCkpIHtcbiAgICAgICAgICAgICAgICB0aHJvdyBUcEVycm9yLnNob3VsZE5ldmVySGFwcGVuKCk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICByZXR1cm4gbmV3IFBvaW50TmRUZXh0Q29udHJvbGxlcihhcmdzLmRvY3VtZW50LCB7XG4gICAgICAgICAgICAgICAgYXNzZW1ibHk6IFBvaW50NGRBc3NlbWJseSxcbiAgICAgICAgICAgICAgICBheGVzOiB2YWx1ZS5yYXdWYWx1ZVxuICAgICAgICAgICAgICAgICAgICAuZ2V0Q29tcG9uZW50cygpXG4gICAgICAgICAgICAgICAgICAgIC5tYXAoKGNvbXAsIGluZGV4KSA9PiBjcmVhdGVBeGlzKGNvbXAsIGMuY29tcG9uZW50c1tpbmRleF0pKSxcbiAgICAgICAgICAgICAgICBwYXJzZXI6IHBhcnNlTnVtYmVyLFxuICAgICAgICAgICAgICAgIHZhbHVlOiB2YWx1ZSxcbiAgICAgICAgICAgICAgICB2aWV3UHJvcHM6IGFyZ3Mudmlld1Byb3BzLFxuICAgICAgICAgICAgfSk7XG4gICAgICAgIH0sXG4gICAgfTtcblxuICAgIGZ1bmN0aW9uIGNyZWF0ZUNvbnN0cmFpbnQocGFyYW1zKSB7XG4gICAgICAgIGNvbnN0IGNvbnN0cmFpbnRzID0gW107XG4gICAgICAgIGNvbnN0IGxjID0gY3JlYXRlTGlzdENvbnN0cmFpbnQocGFyYW1zLm9wdGlvbnMpO1xuICAgICAgICBpZiAobGMpIHtcbiAgICAgICAgICAgIGNvbnN0cmFpbnRzLnB1c2gobGMpO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiBuZXcgQ29tcG9zaXRlQ29uc3RyYWludChjb25zdHJhaW50cyk7XG4gICAgfVxuICAgIGNvbnN0IFN0cmluZ0lucHV0UGx1Z2luID0ge1xuICAgICAgICBpZDogJ2lucHV0LXN0cmluZycsXG4gICAgICAgIHR5cGU6ICdpbnB1dCcsXG4gICAgICAgIGFjY2VwdDogKHZhbHVlLCBwYXJhbXMpID0+IHtcbiAgICAgICAgICAgIGlmICh0eXBlb2YgdmFsdWUgIT09ICdzdHJpbmcnKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIG51bGw7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBjb25zdCBwID0gUGFyYW1zUGFyc2VycztcbiAgICAgICAgICAgIGNvbnN0IHJlc3VsdCA9IHBhcnNlUGFyYW1zKHBhcmFtcywge1xuICAgICAgICAgICAgICAgIG9wdGlvbnM6IHAub3B0aW9uYWwuY3VzdG9tKHBhcnNlTGlzdE9wdGlvbnMpLFxuICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICByZXR1cm4gcmVzdWx0XG4gICAgICAgICAgICAgICAgPyB7XG4gICAgICAgICAgICAgICAgICAgIGluaXRpYWxWYWx1ZTogdmFsdWUsXG4gICAgICAgICAgICAgICAgICAgIHBhcmFtczogcmVzdWx0LFxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICA6IG51bGw7XG4gICAgICAgIH0sXG4gICAgICAgIGJpbmRpbmc6IHtcbiAgICAgICAgICAgIHJlYWRlcjogKF9hcmdzKSA9PiBzdHJpbmdGcm9tVW5rbm93bixcbiAgICAgICAgICAgIGNvbnN0cmFpbnQ6IChhcmdzKSA9PiBjcmVhdGVDb25zdHJhaW50KGFyZ3MucGFyYW1zKSxcbiAgICAgICAgICAgIHdyaXRlcjogKF9hcmdzKSA9PiB3cml0ZVByaW1pdGl2ZSxcbiAgICAgICAgfSxcbiAgICAgICAgY29udHJvbGxlcjogKGFyZ3MpID0+IHtcbiAgICAgICAgICAgIHZhciBfYTtcbiAgICAgICAgICAgIGNvbnN0IGRvYyA9IGFyZ3MuZG9jdW1lbnQ7XG4gICAgICAgICAgICBjb25zdCB2YWx1ZSA9IGFyZ3MudmFsdWU7XG4gICAgICAgICAgICBjb25zdCBjID0gYXJncy5jb25zdHJhaW50O1xuICAgICAgICAgICAgaWYgKGMgJiYgZmluZENvbnN0cmFpbnQoYywgTGlzdENvbnN0cmFpbnQpKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIG5ldyBMaXN0Q29udHJvbGxlcihkb2MsIHtcbiAgICAgICAgICAgICAgICAgICAgcHJvcHM6IFZhbHVlTWFwLmZyb21PYmplY3Qoe1xuICAgICAgICAgICAgICAgICAgICAgICAgb3B0aW9uczogKF9hID0gZmluZExpc3RJdGVtcyhjKSkgIT09IG51bGwgJiYgX2EgIT09IHZvaWQgMCA/IF9hIDogW10sXG4gICAgICAgICAgICAgICAgICAgIH0pLFxuICAgICAgICAgICAgICAgICAgICB2YWx1ZTogdmFsdWUsXG4gICAgICAgICAgICAgICAgICAgIHZpZXdQcm9wczogYXJncy52aWV3UHJvcHMsXG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICByZXR1cm4gbmV3IFRleHRDb250cm9sbGVyKGRvYywge1xuICAgICAgICAgICAgICAgIHBhcnNlcjogKHYpID0+IHYsXG4gICAgICAgICAgICAgICAgcHJvcHM6IFZhbHVlTWFwLmZyb21PYmplY3Qoe1xuICAgICAgICAgICAgICAgICAgICBmb3JtYXR0ZXI6IGZvcm1hdFN0cmluZyxcbiAgICAgICAgICAgICAgICB9KSxcbiAgICAgICAgICAgICAgICB2YWx1ZTogdmFsdWUsXG4gICAgICAgICAgICAgICAgdmlld1Byb3BzOiBhcmdzLnZpZXdQcm9wcyxcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9LFxuICAgIH07XG5cbiAgICBjb25zdCBDb25zdGFudHMgPSB7XG4gICAgICAgIG1vbml0b3I6IHtcbiAgICAgICAgICAgIGRlZmF1bHRJbnRlcnZhbDogMjAwLFxuICAgICAgICAgICAgZGVmYXVsdExpbmVDb3VudDogMyxcbiAgICAgICAgfSxcbiAgICB9O1xuXG4gICAgY29uc3QgY2xhc3NOYW1lJDIgPSBDbGFzc05hbWUoJ21sbCcpO1xuICAgIGNsYXNzIE11bHRpTG9nVmlldyB7XG4gICAgICAgIGNvbnN0cnVjdG9yKGRvYywgY29uZmlnKSB7XG4gICAgICAgICAgICB0aGlzLm9uVmFsdWVVcGRhdGVfID0gdGhpcy5vblZhbHVlVXBkYXRlXy5iaW5kKHRoaXMpO1xuICAgICAgICAgICAgdGhpcy5mb3JtYXR0ZXJfID0gY29uZmlnLmZvcm1hdHRlcjtcbiAgICAgICAgICAgIHRoaXMuZWxlbWVudCA9IGRvYy5jcmVhdGVFbGVtZW50KCdkaXYnKTtcbiAgICAgICAgICAgIHRoaXMuZWxlbWVudC5jbGFzc0xpc3QuYWRkKGNsYXNzTmFtZSQyKCkpO1xuICAgICAgICAgICAgY29uZmlnLnZpZXdQcm9wcy5iaW5kQ2xhc3NNb2RpZmllcnModGhpcy5lbGVtZW50KTtcbiAgICAgICAgICAgIGNvbnN0IHRleHRhcmVhRWxlbSA9IGRvYy5jcmVhdGVFbGVtZW50KCd0ZXh0YXJlYScpO1xuICAgICAgICAgICAgdGV4dGFyZWFFbGVtLmNsYXNzTGlzdC5hZGQoY2xhc3NOYW1lJDIoJ2knKSk7XG4gICAgICAgICAgICB0ZXh0YXJlYUVsZW0uc3R5bGUuaGVpZ2h0ID0gYGNhbGModmFyKC0tYmxkLXVzKSAqICR7Y29uZmlnLmxpbmVDb3VudH0pYDtcbiAgICAgICAgICAgIHRleHRhcmVhRWxlbS5yZWFkT25seSA9IHRydWU7XG4gICAgICAgICAgICBjb25maWcudmlld1Byb3BzLmJpbmREaXNhYmxlZCh0ZXh0YXJlYUVsZW0pO1xuICAgICAgICAgICAgdGhpcy5lbGVtZW50LmFwcGVuZENoaWxkKHRleHRhcmVhRWxlbSk7XG4gICAgICAgICAgICB0aGlzLnRleHRhcmVhRWxlbV8gPSB0ZXh0YXJlYUVsZW07XG4gICAgICAgICAgICBjb25maWcudmFsdWUuZW1pdHRlci5vbignY2hhbmdlJywgdGhpcy5vblZhbHVlVXBkYXRlXyk7XG4gICAgICAgICAgICB0aGlzLnZhbHVlID0gY29uZmlnLnZhbHVlO1xuICAgICAgICAgICAgdGhpcy51cGRhdGVfKCk7XG4gICAgICAgIH1cbiAgICAgICAgdXBkYXRlXygpIHtcbiAgICAgICAgICAgIGNvbnN0IGVsZW0gPSB0aGlzLnRleHRhcmVhRWxlbV87XG4gICAgICAgICAgICBjb25zdCBzaG91bGRTY3JvbGwgPSBlbGVtLnNjcm9sbFRvcCA9PT0gZWxlbS5zY3JvbGxIZWlnaHQgLSBlbGVtLmNsaWVudEhlaWdodDtcbiAgICAgICAgICAgIGNvbnN0IGxpbmVzID0gW107XG4gICAgICAgICAgICB0aGlzLnZhbHVlLnJhd1ZhbHVlLmZvckVhY2goKHZhbHVlKSA9PiB7XG4gICAgICAgICAgICAgICAgaWYgKHZhbHVlICE9PSB1bmRlZmluZWQpIHtcbiAgICAgICAgICAgICAgICAgICAgbGluZXMucHVzaCh0aGlzLmZvcm1hdHRlcl8odmFsdWUpKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIGVsZW0udGV4dENvbnRlbnQgPSBsaW5lcy5qb2luKCdcXG4nKTtcbiAgICAgICAgICAgIGlmIChzaG91bGRTY3JvbGwpIHtcbiAgICAgICAgICAgICAgICBlbGVtLnNjcm9sbFRvcCA9IGVsZW0uc2Nyb2xsSGVpZ2h0O1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIG9uVmFsdWVVcGRhdGVfKCkge1xuICAgICAgICAgICAgdGhpcy51cGRhdGVfKCk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBjbGFzcyBNdWx0aUxvZ0NvbnRyb2xsZXIge1xuICAgICAgICBjb25zdHJ1Y3Rvcihkb2MsIGNvbmZpZykge1xuICAgICAgICAgICAgdGhpcy52YWx1ZSA9IGNvbmZpZy52YWx1ZTtcbiAgICAgICAgICAgIHRoaXMudmlld1Byb3BzID0gY29uZmlnLnZpZXdQcm9wcztcbiAgICAgICAgICAgIHRoaXMudmlldyA9IG5ldyBNdWx0aUxvZ1ZpZXcoZG9jLCB7XG4gICAgICAgICAgICAgICAgZm9ybWF0dGVyOiBjb25maWcuZm9ybWF0dGVyLFxuICAgICAgICAgICAgICAgIGxpbmVDb3VudDogY29uZmlnLmxpbmVDb3VudCxcbiAgICAgICAgICAgICAgICB2YWx1ZTogdGhpcy52YWx1ZSxcbiAgICAgICAgICAgICAgICB2aWV3UHJvcHM6IHRoaXMudmlld1Byb3BzLFxuICAgICAgICAgICAgfSk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBjb25zdCBjbGFzc05hbWUkMSA9IENsYXNzTmFtZSgnc2dsJyk7XG4gICAgY2xhc3MgU2luZ2xlTG9nVmlldyB7XG4gICAgICAgIGNvbnN0cnVjdG9yKGRvYywgY29uZmlnKSB7XG4gICAgICAgICAgICB0aGlzLm9uVmFsdWVVcGRhdGVfID0gdGhpcy5vblZhbHVlVXBkYXRlXy5iaW5kKHRoaXMpO1xuICAgICAgICAgICAgdGhpcy5mb3JtYXR0ZXJfID0gY29uZmlnLmZvcm1hdHRlcjtcbiAgICAgICAgICAgIHRoaXMuZWxlbWVudCA9IGRvYy5jcmVhdGVFbGVtZW50KCdkaXYnKTtcbiAgICAgICAgICAgIHRoaXMuZWxlbWVudC5jbGFzc0xpc3QuYWRkKGNsYXNzTmFtZSQxKCkpO1xuICAgICAgICAgICAgY29uZmlnLnZpZXdQcm9wcy5iaW5kQ2xhc3NNb2RpZmllcnModGhpcy5lbGVtZW50KTtcbiAgICAgICAgICAgIGNvbnN0IGlucHV0RWxlbSA9IGRvYy5jcmVhdGVFbGVtZW50KCdpbnB1dCcpO1xuICAgICAgICAgICAgaW5wdXRFbGVtLmNsYXNzTGlzdC5hZGQoY2xhc3NOYW1lJDEoJ2knKSk7XG4gICAgICAgICAgICBpbnB1dEVsZW0ucmVhZE9ubHkgPSB0cnVlO1xuICAgICAgICAgICAgaW5wdXRFbGVtLnR5cGUgPSAndGV4dCc7XG4gICAgICAgICAgICBjb25maWcudmlld1Byb3BzLmJpbmREaXNhYmxlZChpbnB1dEVsZW0pO1xuICAgICAgICAgICAgdGhpcy5lbGVtZW50LmFwcGVuZENoaWxkKGlucHV0RWxlbSk7XG4gICAgICAgICAgICB0aGlzLmlucHV0RWxlbWVudCA9IGlucHV0RWxlbTtcbiAgICAgICAgICAgIGNvbmZpZy52YWx1ZS5lbWl0dGVyLm9uKCdjaGFuZ2UnLCB0aGlzLm9uVmFsdWVVcGRhdGVfKTtcbiAgICAgICAgICAgIHRoaXMudmFsdWUgPSBjb25maWcudmFsdWU7XG4gICAgICAgICAgICB0aGlzLnVwZGF0ZV8oKTtcbiAgICAgICAgfVxuICAgICAgICB1cGRhdGVfKCkge1xuICAgICAgICAgICAgY29uc3QgdmFsdWVzID0gdGhpcy52YWx1ZS5yYXdWYWx1ZTtcbiAgICAgICAgICAgIGNvbnN0IGxhc3RWYWx1ZSA9IHZhbHVlc1t2YWx1ZXMubGVuZ3RoIC0gMV07XG4gICAgICAgICAgICB0aGlzLmlucHV0RWxlbWVudC52YWx1ZSA9XG4gICAgICAgICAgICAgICAgbGFzdFZhbHVlICE9PSB1bmRlZmluZWQgPyB0aGlzLmZvcm1hdHRlcl8obGFzdFZhbHVlKSA6ICcnO1xuICAgICAgICB9XG4gICAgICAgIG9uVmFsdWVVcGRhdGVfKCkge1xuICAgICAgICAgICAgdGhpcy51cGRhdGVfKCk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBjbGFzcyBTaW5nbGVMb2dDb250cm9sbGVyIHtcbiAgICAgICAgY29uc3RydWN0b3IoZG9jLCBjb25maWcpIHtcbiAgICAgICAgICAgIHRoaXMudmFsdWUgPSBjb25maWcudmFsdWU7XG4gICAgICAgICAgICB0aGlzLnZpZXdQcm9wcyA9IGNvbmZpZy52aWV3UHJvcHM7XG4gICAgICAgICAgICB0aGlzLnZpZXcgPSBuZXcgU2luZ2xlTG9nVmlldyhkb2MsIHtcbiAgICAgICAgICAgICAgICBmb3JtYXR0ZXI6IGNvbmZpZy5mb3JtYXR0ZXIsXG4gICAgICAgICAgICAgICAgdmFsdWU6IHRoaXMudmFsdWUsXG4gICAgICAgICAgICAgICAgdmlld1Byb3BzOiB0aGlzLnZpZXdQcm9wcyxcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgY29uc3QgQm9vbGVhbk1vbml0b3JQbHVnaW4gPSB7XG4gICAgICAgIGlkOiAnbW9uaXRvci1ib29sJyxcbiAgICAgICAgdHlwZTogJ21vbml0b3InLFxuICAgICAgICBhY2NlcHQ6ICh2YWx1ZSwgcGFyYW1zKSA9PiB7XG4gICAgICAgICAgICBpZiAodHlwZW9mIHZhbHVlICE9PSAnYm9vbGVhbicpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gbnVsbDtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGNvbnN0IHAgPSBQYXJhbXNQYXJzZXJzO1xuICAgICAgICAgICAgY29uc3QgcmVzdWx0ID0gcGFyc2VQYXJhbXMocGFyYW1zLCB7XG4gICAgICAgICAgICAgICAgbGluZUNvdW50OiBwLm9wdGlvbmFsLm51bWJlcixcbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgcmV0dXJuIHJlc3VsdFxuICAgICAgICAgICAgICAgID8ge1xuICAgICAgICAgICAgICAgICAgICBpbml0aWFsVmFsdWU6IHZhbHVlLFxuICAgICAgICAgICAgICAgICAgICBwYXJhbXM6IHJlc3VsdCxcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgOiBudWxsO1xuICAgICAgICB9LFxuICAgICAgICBiaW5kaW5nOiB7XG4gICAgICAgICAgICByZWFkZXI6IChfYXJncykgPT4gYm9vbEZyb21Vbmtub3duLFxuICAgICAgICB9LFxuICAgICAgICBjb250cm9sbGVyOiAoYXJncykgPT4ge1xuICAgICAgICAgICAgdmFyIF9hO1xuICAgICAgICAgICAgaWYgKGFyZ3MudmFsdWUucmF3VmFsdWUubGVuZ3RoID09PSAxKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIG5ldyBTaW5nbGVMb2dDb250cm9sbGVyKGFyZ3MuZG9jdW1lbnQsIHtcbiAgICAgICAgICAgICAgICAgICAgZm9ybWF0dGVyOiBCb29sZWFuRm9ybWF0dGVyLFxuICAgICAgICAgICAgICAgICAgICB2YWx1ZTogYXJncy52YWx1ZSxcbiAgICAgICAgICAgICAgICAgICAgdmlld1Byb3BzOiBhcmdzLnZpZXdQcm9wcyxcbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHJldHVybiBuZXcgTXVsdGlMb2dDb250cm9sbGVyKGFyZ3MuZG9jdW1lbnQsIHtcbiAgICAgICAgICAgICAgICBmb3JtYXR0ZXI6IEJvb2xlYW5Gb3JtYXR0ZXIsXG4gICAgICAgICAgICAgICAgbGluZUNvdW50OiAoX2EgPSBhcmdzLnBhcmFtcy5saW5lQ291bnQpICE9PSBudWxsICYmIF9hICE9PSB2b2lkIDAgPyBfYSA6IENvbnN0YW50cy5tb25pdG9yLmRlZmF1bHRMaW5lQ291bnQsXG4gICAgICAgICAgICAgICAgdmFsdWU6IGFyZ3MudmFsdWUsXG4gICAgICAgICAgICAgICAgdmlld1Byb3BzOiBhcmdzLnZpZXdQcm9wcyxcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9LFxuICAgIH07XG5cbiAgICBjbGFzcyBHcmFwaEN1cnNvciB7XG4gICAgICAgIGNvbnN0cnVjdG9yKCkge1xuICAgICAgICAgICAgdGhpcy5lbWl0dGVyID0gbmV3IEVtaXR0ZXIoKTtcbiAgICAgICAgICAgIHRoaXMuaW5kZXhfID0gLTE7XG4gICAgICAgIH1cbiAgICAgICAgZ2V0IGluZGV4KCkge1xuICAgICAgICAgICAgcmV0dXJuIHRoaXMuaW5kZXhfO1xuICAgICAgICB9XG4gICAgICAgIHNldCBpbmRleChpbmRleCkge1xuICAgICAgICAgICAgY29uc3QgY2hhbmdlZCA9IHRoaXMuaW5kZXhfICE9PSBpbmRleDtcbiAgICAgICAgICAgIGlmIChjaGFuZ2VkKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5pbmRleF8gPSBpbmRleDtcbiAgICAgICAgICAgICAgICB0aGlzLmVtaXR0ZXIuZW1pdCgnY2hhbmdlJywge1xuICAgICAgICAgICAgICAgICAgICBpbmRleDogaW5kZXgsXG4gICAgICAgICAgICAgICAgICAgIHNlbmRlcjogdGhpcyxcbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH1cblxuICAgIGNvbnN0IGNsYXNzTmFtZSA9IENsYXNzTmFtZSgnZ3JsJyk7XG4gICAgY2xhc3MgR3JhcGhMb2dWaWV3IHtcbiAgICAgICAgY29uc3RydWN0b3IoZG9jLCBjb25maWcpIHtcbiAgICAgICAgICAgIHRoaXMub25DdXJzb3JDaGFuZ2VfID0gdGhpcy5vbkN1cnNvckNoYW5nZV8uYmluZCh0aGlzKTtcbiAgICAgICAgICAgIHRoaXMub25WYWx1ZVVwZGF0ZV8gPSB0aGlzLm9uVmFsdWVVcGRhdGVfLmJpbmQodGhpcyk7XG4gICAgICAgICAgICB0aGlzLmVsZW1lbnQgPSBkb2MuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XG4gICAgICAgICAgICB0aGlzLmVsZW1lbnQuY2xhc3NMaXN0LmFkZChjbGFzc05hbWUoKSk7XG4gICAgICAgICAgICBjb25maWcudmlld1Byb3BzLmJpbmRDbGFzc01vZGlmaWVycyh0aGlzLmVsZW1lbnQpO1xuICAgICAgICAgICAgdGhpcy5mb3JtYXR0ZXJfID0gY29uZmlnLmZvcm1hdHRlcjtcbiAgICAgICAgICAgIHRoaXMubWluVmFsdWVfID0gY29uZmlnLm1pblZhbHVlO1xuICAgICAgICAgICAgdGhpcy5tYXhWYWx1ZV8gPSBjb25maWcubWF4VmFsdWU7XG4gICAgICAgICAgICB0aGlzLmN1cnNvcl8gPSBjb25maWcuY3Vyc29yO1xuICAgICAgICAgICAgdGhpcy5jdXJzb3JfLmVtaXR0ZXIub24oJ2NoYW5nZScsIHRoaXMub25DdXJzb3JDaGFuZ2VfKTtcbiAgICAgICAgICAgIGNvbnN0IHN2Z0VsZW0gPSBkb2MuY3JlYXRlRWxlbWVudE5TKFNWR19OUywgJ3N2ZycpO1xuICAgICAgICAgICAgc3ZnRWxlbS5jbGFzc0xpc3QuYWRkKGNsYXNzTmFtZSgnZycpKTtcbiAgICAgICAgICAgIHN2Z0VsZW0uc3R5bGUuaGVpZ2h0ID0gYGNhbGModmFyKC0tYmxkLXVzKSAqICR7Y29uZmlnLmxpbmVDb3VudH0pYDtcbiAgICAgICAgICAgIHRoaXMuZWxlbWVudC5hcHBlbmRDaGlsZChzdmdFbGVtKTtcbiAgICAgICAgICAgIHRoaXMuc3ZnRWxlbV8gPSBzdmdFbGVtO1xuICAgICAgICAgICAgY29uc3QgbGluZUVsZW0gPSBkb2MuY3JlYXRlRWxlbWVudE5TKFNWR19OUywgJ3BvbHlsaW5lJyk7XG4gICAgICAgICAgICB0aGlzLnN2Z0VsZW1fLmFwcGVuZENoaWxkKGxpbmVFbGVtKTtcbiAgICAgICAgICAgIHRoaXMubGluZUVsZW1fID0gbGluZUVsZW07XG4gICAgICAgICAgICBjb25zdCB0b29sdGlwRWxlbSA9IGRvYy5jcmVhdGVFbGVtZW50KCdkaXYnKTtcbiAgICAgICAgICAgIHRvb2x0aXBFbGVtLmNsYXNzTGlzdC5hZGQoY2xhc3NOYW1lKCd0JyksIENsYXNzTmFtZSgndHQnKSgpKTtcbiAgICAgICAgICAgIHRoaXMuZWxlbWVudC5hcHBlbmRDaGlsZCh0b29sdGlwRWxlbSk7XG4gICAgICAgICAgICB0aGlzLnRvb2x0aXBFbGVtXyA9IHRvb2x0aXBFbGVtO1xuICAgICAgICAgICAgY29uZmlnLnZhbHVlLmVtaXR0ZXIub24oJ2NoYW5nZScsIHRoaXMub25WYWx1ZVVwZGF0ZV8pO1xuICAgICAgICAgICAgdGhpcy52YWx1ZSA9IGNvbmZpZy52YWx1ZTtcbiAgICAgICAgICAgIHRoaXMudXBkYXRlXygpO1xuICAgICAgICB9XG4gICAgICAgIGdldCBncmFwaEVsZW1lbnQoKSB7XG4gICAgICAgICAgICByZXR1cm4gdGhpcy5zdmdFbGVtXztcbiAgICAgICAgfVxuICAgICAgICB1cGRhdGVfKCkge1xuICAgICAgICAgICAgY29uc3QgYm91bmRzID0gdGhpcy5zdmdFbGVtXy5nZXRCb3VuZGluZ0NsaWVudFJlY3QoKTtcbiAgICAgICAgICAgIGNvbnN0IG1heEluZGV4ID0gdGhpcy52YWx1ZS5yYXdWYWx1ZS5sZW5ndGggLSAxO1xuICAgICAgICAgICAgY29uc3QgbWluID0gdGhpcy5taW5WYWx1ZV87XG4gICAgICAgICAgICBjb25zdCBtYXggPSB0aGlzLm1heFZhbHVlXztcbiAgICAgICAgICAgIGNvbnN0IHBvaW50cyA9IFtdO1xuICAgICAgICAgICAgdGhpcy52YWx1ZS5yYXdWYWx1ZS5mb3JFYWNoKCh2LCBpbmRleCkgPT4ge1xuICAgICAgICAgICAgICAgIGlmICh2ID09PSB1bmRlZmluZWQpIHtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBjb25zdCB4ID0gbWFwUmFuZ2UoaW5kZXgsIDAsIG1heEluZGV4LCAwLCBib3VuZHMud2lkdGgpO1xuICAgICAgICAgICAgICAgIGNvbnN0IHkgPSBtYXBSYW5nZSh2LCBtaW4sIG1heCwgYm91bmRzLmhlaWdodCwgMCk7XG4gICAgICAgICAgICAgICAgcG9pbnRzLnB1c2goW3gsIHldLmpvaW4oJywnKSk7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIHRoaXMubGluZUVsZW1fLnNldEF0dHJpYnV0ZU5TKG51bGwsICdwb2ludHMnLCBwb2ludHMuam9pbignICcpKTtcbiAgICAgICAgICAgIGNvbnN0IHRvb2x0aXBFbGVtID0gdGhpcy50b29sdGlwRWxlbV87XG4gICAgICAgICAgICBjb25zdCB2YWx1ZSA9IHRoaXMudmFsdWUucmF3VmFsdWVbdGhpcy5jdXJzb3JfLmluZGV4XTtcbiAgICAgICAgICAgIGlmICh2YWx1ZSA9PT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgICAgICAgdG9vbHRpcEVsZW0uY2xhc3NMaXN0LnJlbW92ZShjbGFzc05hbWUoJ3QnLCAnYScpKTtcbiAgICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBjb25zdCB0eCA9IG1hcFJhbmdlKHRoaXMuY3Vyc29yXy5pbmRleCwgMCwgbWF4SW5kZXgsIDAsIGJvdW5kcy53aWR0aCk7XG4gICAgICAgICAgICBjb25zdCB0eSA9IG1hcFJhbmdlKHZhbHVlLCBtaW4sIG1heCwgYm91bmRzLmhlaWdodCwgMCk7XG4gICAgICAgICAgICB0b29sdGlwRWxlbS5zdHlsZS5sZWZ0ID0gYCR7dHh9cHhgO1xuICAgICAgICAgICAgdG9vbHRpcEVsZW0uc3R5bGUudG9wID0gYCR7dHl9cHhgO1xuICAgICAgICAgICAgdG9vbHRpcEVsZW0udGV4dENvbnRlbnQgPSBgJHt0aGlzLmZvcm1hdHRlcl8odmFsdWUpfWA7XG4gICAgICAgICAgICBpZiAoIXRvb2x0aXBFbGVtLmNsYXNzTGlzdC5jb250YWlucyhjbGFzc05hbWUoJ3QnLCAnYScpKSkge1xuICAgICAgICAgICAgICAgIHRvb2x0aXBFbGVtLmNsYXNzTGlzdC5hZGQoY2xhc3NOYW1lKCd0JywgJ2EnKSwgY2xhc3NOYW1lKCd0JywgJ2luJykpO1xuICAgICAgICAgICAgICAgIGZvcmNlUmVmbG93KHRvb2x0aXBFbGVtKTtcbiAgICAgICAgICAgICAgICB0b29sdGlwRWxlbS5jbGFzc0xpc3QucmVtb3ZlKGNsYXNzTmFtZSgndCcsICdpbicpKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICBvblZhbHVlVXBkYXRlXygpIHtcbiAgICAgICAgICAgIHRoaXMudXBkYXRlXygpO1xuICAgICAgICB9XG4gICAgICAgIG9uQ3Vyc29yQ2hhbmdlXygpIHtcbiAgICAgICAgICAgIHRoaXMudXBkYXRlXygpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgY2xhc3MgR3JhcGhMb2dDb250cm9sbGVyIHtcbiAgICAgICAgY29uc3RydWN0b3IoZG9jLCBjb25maWcpIHtcbiAgICAgICAgICAgIHRoaXMub25HcmFwaE1vdXNlTW92ZV8gPSB0aGlzLm9uR3JhcGhNb3VzZU1vdmVfLmJpbmQodGhpcyk7XG4gICAgICAgICAgICB0aGlzLm9uR3JhcGhNb3VzZUxlYXZlXyA9IHRoaXMub25HcmFwaE1vdXNlTGVhdmVfLmJpbmQodGhpcyk7XG4gICAgICAgICAgICB0aGlzLm9uR3JhcGhQb2ludGVyRG93bl8gPSB0aGlzLm9uR3JhcGhQb2ludGVyRG93bl8uYmluZCh0aGlzKTtcbiAgICAgICAgICAgIHRoaXMub25HcmFwaFBvaW50ZXJNb3ZlXyA9IHRoaXMub25HcmFwaFBvaW50ZXJNb3ZlXy5iaW5kKHRoaXMpO1xuICAgICAgICAgICAgdGhpcy5vbkdyYXBoUG9pbnRlclVwXyA9IHRoaXMub25HcmFwaFBvaW50ZXJVcF8uYmluZCh0aGlzKTtcbiAgICAgICAgICAgIHRoaXMudmFsdWUgPSBjb25maWcudmFsdWU7XG4gICAgICAgICAgICB0aGlzLnZpZXdQcm9wcyA9IGNvbmZpZy52aWV3UHJvcHM7XG4gICAgICAgICAgICB0aGlzLmN1cnNvcl8gPSBuZXcgR3JhcGhDdXJzb3IoKTtcbiAgICAgICAgICAgIHRoaXMudmlldyA9IG5ldyBHcmFwaExvZ1ZpZXcoZG9jLCB7XG4gICAgICAgICAgICAgICAgY3Vyc29yOiB0aGlzLmN1cnNvcl8sXG4gICAgICAgICAgICAgICAgZm9ybWF0dGVyOiBjb25maWcuZm9ybWF0dGVyLFxuICAgICAgICAgICAgICAgIGxpbmVDb3VudDogY29uZmlnLmxpbmVDb3VudCxcbiAgICAgICAgICAgICAgICBtYXhWYWx1ZTogY29uZmlnLm1heFZhbHVlLFxuICAgICAgICAgICAgICAgIG1pblZhbHVlOiBjb25maWcubWluVmFsdWUsXG4gICAgICAgICAgICAgICAgdmFsdWU6IHRoaXMudmFsdWUsXG4gICAgICAgICAgICAgICAgdmlld1Byb3BzOiB0aGlzLnZpZXdQcm9wcyxcbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgaWYgKCFzdXBwb3J0c1RvdWNoKGRvYykpIHtcbiAgICAgICAgICAgICAgICB0aGlzLnZpZXcuZWxlbWVudC5hZGRFdmVudExpc3RlbmVyKCdtb3VzZW1vdmUnLCB0aGlzLm9uR3JhcGhNb3VzZU1vdmVfKTtcbiAgICAgICAgICAgICAgICB0aGlzLnZpZXcuZWxlbWVudC5hZGRFdmVudExpc3RlbmVyKCdtb3VzZWxlYXZlJywgdGhpcy5vbkdyYXBoTW91c2VMZWF2ZV8pO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgY29uc3QgcGggPSBuZXcgUG9pbnRlckhhbmRsZXIodGhpcy52aWV3LmVsZW1lbnQpO1xuICAgICAgICAgICAgICAgIHBoLmVtaXR0ZXIub24oJ2Rvd24nLCB0aGlzLm9uR3JhcGhQb2ludGVyRG93bl8pO1xuICAgICAgICAgICAgICAgIHBoLmVtaXR0ZXIub24oJ21vdmUnLCB0aGlzLm9uR3JhcGhQb2ludGVyTW92ZV8pO1xuICAgICAgICAgICAgICAgIHBoLmVtaXR0ZXIub24oJ3VwJywgdGhpcy5vbkdyYXBoUG9pbnRlclVwXyk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgb25HcmFwaE1vdXNlTGVhdmVfKCkge1xuICAgICAgICAgICAgdGhpcy5jdXJzb3JfLmluZGV4ID0gLTE7XG4gICAgICAgIH1cbiAgICAgICAgb25HcmFwaE1vdXNlTW92ZV8oZXYpIHtcbiAgICAgICAgICAgIGNvbnN0IGJvdW5kcyA9IHRoaXMudmlldy5lbGVtZW50LmdldEJvdW5kaW5nQ2xpZW50UmVjdCgpO1xuICAgICAgICAgICAgdGhpcy5jdXJzb3JfLmluZGV4ID0gTWF0aC5mbG9vcihtYXBSYW5nZShldi5vZmZzZXRYLCAwLCBib3VuZHMud2lkdGgsIDAsIHRoaXMudmFsdWUucmF3VmFsdWUubGVuZ3RoKSk7XG4gICAgICAgIH1cbiAgICAgICAgb25HcmFwaFBvaW50ZXJEb3duXyhldikge1xuICAgICAgICAgICAgdGhpcy5vbkdyYXBoUG9pbnRlck1vdmVfKGV2KTtcbiAgICAgICAgfVxuICAgICAgICBvbkdyYXBoUG9pbnRlck1vdmVfKGV2KSB7XG4gICAgICAgICAgICBpZiAoIWV2LmRhdGEucG9pbnQpIHtcbiAgICAgICAgICAgICAgICB0aGlzLmN1cnNvcl8uaW5kZXggPSAtMTtcbiAgICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICB0aGlzLmN1cnNvcl8uaW5kZXggPSBNYXRoLmZsb29yKG1hcFJhbmdlKGV2LmRhdGEucG9pbnQueCwgMCwgZXYuZGF0YS5ib3VuZHMud2lkdGgsIDAsIHRoaXMudmFsdWUucmF3VmFsdWUubGVuZ3RoKSk7XG4gICAgICAgIH1cbiAgICAgICAgb25HcmFwaFBvaW50ZXJVcF8oKSB7XG4gICAgICAgICAgICB0aGlzLmN1cnNvcl8uaW5kZXggPSAtMTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIGZ1bmN0aW9uIGNyZWF0ZUZvcm1hdHRlcihwYXJhbXMpIHtcbiAgICAgICAgcmV0dXJuICdmb3JtYXQnIGluIHBhcmFtcyAmJiAhaXNFbXB0eShwYXJhbXMuZm9ybWF0KVxuICAgICAgICAgICAgPyBwYXJhbXMuZm9ybWF0XG4gICAgICAgICAgICA6IGNyZWF0ZU51bWJlckZvcm1hdHRlcigyKTtcbiAgICB9XG4gICAgZnVuY3Rpb24gY3JlYXRlVGV4dE1vbml0b3IoYXJncykge1xuICAgICAgICB2YXIgX2E7XG4gICAgICAgIGlmIChhcmdzLnZhbHVlLnJhd1ZhbHVlLmxlbmd0aCA9PT0gMSkge1xuICAgICAgICAgICAgcmV0dXJuIG5ldyBTaW5nbGVMb2dDb250cm9sbGVyKGFyZ3MuZG9jdW1lbnQsIHtcbiAgICAgICAgICAgICAgICBmb3JtYXR0ZXI6IGNyZWF0ZUZvcm1hdHRlcihhcmdzLnBhcmFtcyksXG4gICAgICAgICAgICAgICAgdmFsdWU6IGFyZ3MudmFsdWUsXG4gICAgICAgICAgICAgICAgdmlld1Byb3BzOiBhcmdzLnZpZXdQcm9wcyxcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiBuZXcgTXVsdGlMb2dDb250cm9sbGVyKGFyZ3MuZG9jdW1lbnQsIHtcbiAgICAgICAgICAgIGZvcm1hdHRlcjogY3JlYXRlRm9ybWF0dGVyKGFyZ3MucGFyYW1zKSxcbiAgICAgICAgICAgIGxpbmVDb3VudDogKF9hID0gYXJncy5wYXJhbXMubGluZUNvdW50KSAhPT0gbnVsbCAmJiBfYSAhPT0gdm9pZCAwID8gX2EgOiBDb25zdGFudHMubW9uaXRvci5kZWZhdWx0TGluZUNvdW50LFxuICAgICAgICAgICAgdmFsdWU6IGFyZ3MudmFsdWUsXG4gICAgICAgICAgICB2aWV3UHJvcHM6IGFyZ3Mudmlld1Byb3BzLFxuICAgICAgICB9KTtcbiAgICB9XG4gICAgZnVuY3Rpb24gY3JlYXRlR3JhcGhNb25pdG9yKGFyZ3MpIHtcbiAgICAgICAgdmFyIF9hLCBfYiwgX2M7XG4gICAgICAgIHJldHVybiBuZXcgR3JhcGhMb2dDb250cm9sbGVyKGFyZ3MuZG9jdW1lbnQsIHtcbiAgICAgICAgICAgIGZvcm1hdHRlcjogY3JlYXRlRm9ybWF0dGVyKGFyZ3MucGFyYW1zKSxcbiAgICAgICAgICAgIGxpbmVDb3VudDogKF9hID0gYXJncy5wYXJhbXMubGluZUNvdW50KSAhPT0gbnVsbCAmJiBfYSAhPT0gdm9pZCAwID8gX2EgOiBDb25zdGFudHMubW9uaXRvci5kZWZhdWx0TGluZUNvdW50LFxuICAgICAgICAgICAgbWF4VmFsdWU6IChfYiA9ICgnbWF4JyBpbiBhcmdzLnBhcmFtcyA/IGFyZ3MucGFyYW1zLm1heCA6IG51bGwpKSAhPT0gbnVsbCAmJiBfYiAhPT0gdm9pZCAwID8gX2IgOiAxMDAsXG4gICAgICAgICAgICBtaW5WYWx1ZTogKF9jID0gKCdtaW4nIGluIGFyZ3MucGFyYW1zID8gYXJncy5wYXJhbXMubWluIDogbnVsbCkpICE9PSBudWxsICYmIF9jICE9PSB2b2lkIDAgPyBfYyA6IDAsXG4gICAgICAgICAgICB2YWx1ZTogYXJncy52YWx1ZSxcbiAgICAgICAgICAgIHZpZXdQcm9wczogYXJncy52aWV3UHJvcHMsXG4gICAgICAgIH0pO1xuICAgIH1cbiAgICBmdW5jdGlvbiBzaG91bGRTaG93R3JhcGgocGFyYW1zKSB7XG4gICAgICAgIHJldHVybiAndmlldycgaW4gcGFyYW1zICYmIHBhcmFtcy52aWV3ID09PSAnZ3JhcGgnO1xuICAgIH1cbiAgICBjb25zdCBOdW1iZXJNb25pdG9yUGx1Z2luID0ge1xuICAgICAgICBpZDogJ21vbml0b3ItbnVtYmVyJyxcbiAgICAgICAgdHlwZTogJ21vbml0b3InLFxuICAgICAgICBhY2NlcHQ6ICh2YWx1ZSwgcGFyYW1zKSA9PiB7XG4gICAgICAgICAgICBpZiAodHlwZW9mIHZhbHVlICE9PSAnbnVtYmVyJykge1xuICAgICAgICAgICAgICAgIHJldHVybiBudWxsO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgY29uc3QgcCA9IFBhcmFtc1BhcnNlcnM7XG4gICAgICAgICAgICBjb25zdCByZXN1bHQgPSBwYXJzZVBhcmFtcyhwYXJhbXMsIHtcbiAgICAgICAgICAgICAgICBmb3JtYXQ6IHAub3B0aW9uYWwuZnVuY3Rpb24sXG4gICAgICAgICAgICAgICAgbGluZUNvdW50OiBwLm9wdGlvbmFsLm51bWJlcixcbiAgICAgICAgICAgICAgICBtYXg6IHAub3B0aW9uYWwubnVtYmVyLFxuICAgICAgICAgICAgICAgIG1pbjogcC5vcHRpb25hbC5udW1iZXIsXG4gICAgICAgICAgICAgICAgdmlldzogcC5vcHRpb25hbC5zdHJpbmcsXG4gICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIHJldHVybiByZXN1bHRcbiAgICAgICAgICAgICAgICA/IHtcbiAgICAgICAgICAgICAgICAgICAgaW5pdGlhbFZhbHVlOiB2YWx1ZSxcbiAgICAgICAgICAgICAgICAgICAgcGFyYW1zOiByZXN1bHQsXG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIDogbnVsbDtcbiAgICAgICAgfSxcbiAgICAgICAgYmluZGluZzoge1xuICAgICAgICAgICAgZGVmYXVsdEJ1ZmZlclNpemU6IChwYXJhbXMpID0+IChzaG91bGRTaG93R3JhcGgocGFyYW1zKSA/IDY0IDogMSksXG4gICAgICAgICAgICByZWFkZXI6IChfYXJncykgPT4gbnVtYmVyRnJvbVVua25vd24sXG4gICAgICAgIH0sXG4gICAgICAgIGNvbnRyb2xsZXI6IChhcmdzKSA9PiB7XG4gICAgICAgICAgICBpZiAoc2hvdWxkU2hvd0dyYXBoKGFyZ3MucGFyYW1zKSkge1xuICAgICAgICAgICAgICAgIHJldHVybiBjcmVhdGVHcmFwaE1vbml0b3IoYXJncyk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICByZXR1cm4gY3JlYXRlVGV4dE1vbml0b3IoYXJncyk7XG4gICAgICAgIH0sXG4gICAgfTtcblxuICAgIGNvbnN0IFN0cmluZ01vbml0b3JQbHVnaW4gPSB7XG4gICAgICAgIGlkOiAnbW9uaXRvci1zdHJpbmcnLFxuICAgICAgICB0eXBlOiAnbW9uaXRvcicsXG4gICAgICAgIGFjY2VwdDogKHZhbHVlLCBwYXJhbXMpID0+IHtcbiAgICAgICAgICAgIGlmICh0eXBlb2YgdmFsdWUgIT09ICdzdHJpbmcnKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIG51bGw7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBjb25zdCBwID0gUGFyYW1zUGFyc2VycztcbiAgICAgICAgICAgIGNvbnN0IHJlc3VsdCA9IHBhcnNlUGFyYW1zKHBhcmFtcywge1xuICAgICAgICAgICAgICAgIGxpbmVDb3VudDogcC5vcHRpb25hbC5udW1iZXIsXG4gICAgICAgICAgICAgICAgbXVsdGlsaW5lOiBwLm9wdGlvbmFsLmJvb2xlYW4sXG4gICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIHJldHVybiByZXN1bHRcbiAgICAgICAgICAgICAgICA/IHtcbiAgICAgICAgICAgICAgICAgICAgaW5pdGlhbFZhbHVlOiB2YWx1ZSxcbiAgICAgICAgICAgICAgICAgICAgcGFyYW1zOiByZXN1bHQsXG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIDogbnVsbDtcbiAgICAgICAgfSxcbiAgICAgICAgYmluZGluZzoge1xuICAgICAgICAgICAgcmVhZGVyOiAoX2FyZ3MpID0+IHN0cmluZ0Zyb21Vbmtub3duLFxuICAgICAgICB9LFxuICAgICAgICBjb250cm9sbGVyOiAoYXJncykgPT4ge1xuICAgICAgICAgICAgdmFyIF9hO1xuICAgICAgICAgICAgY29uc3QgdmFsdWUgPSBhcmdzLnZhbHVlO1xuICAgICAgICAgICAgY29uc3QgbXVsdGlsaW5lID0gdmFsdWUucmF3VmFsdWUubGVuZ3RoID4gMSB8fFxuICAgICAgICAgICAgICAgICgnbXVsdGlsaW5lJyBpbiBhcmdzLnBhcmFtcyAmJiBhcmdzLnBhcmFtcy5tdWx0aWxpbmUpO1xuICAgICAgICAgICAgaWYgKG11bHRpbGluZSkge1xuICAgICAgICAgICAgICAgIHJldHVybiBuZXcgTXVsdGlMb2dDb250cm9sbGVyKGFyZ3MuZG9jdW1lbnQsIHtcbiAgICAgICAgICAgICAgICAgICAgZm9ybWF0dGVyOiBmb3JtYXRTdHJpbmcsXG4gICAgICAgICAgICAgICAgICAgIGxpbmVDb3VudDogKF9hID0gYXJncy5wYXJhbXMubGluZUNvdW50KSAhPT0gbnVsbCAmJiBfYSAhPT0gdm9pZCAwID8gX2EgOiBDb25zdGFudHMubW9uaXRvci5kZWZhdWx0TGluZUNvdW50LFxuICAgICAgICAgICAgICAgICAgICB2YWx1ZTogdmFsdWUsXG4gICAgICAgICAgICAgICAgICAgIHZpZXdQcm9wczogYXJncy52aWV3UHJvcHMsXG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICByZXR1cm4gbmV3IFNpbmdsZUxvZ0NvbnRyb2xsZXIoYXJncy5kb2N1bWVudCwge1xuICAgICAgICAgICAgICAgIGZvcm1hdHRlcjogZm9ybWF0U3RyaW5nLFxuICAgICAgICAgICAgICAgIHZhbHVlOiB2YWx1ZSxcbiAgICAgICAgICAgICAgICB2aWV3UHJvcHM6IGFyZ3Mudmlld1Byb3BzLFxuICAgICAgICAgICAgfSk7XG4gICAgICAgIH0sXG4gICAgfTtcblxuICAgIGNsYXNzIElucHV0QmluZGluZyB7XG4gICAgICAgIGNvbnN0cnVjdG9yKGNvbmZpZykge1xuICAgICAgICAgICAgdGhpcy5vblZhbHVlQ2hhbmdlXyA9IHRoaXMub25WYWx1ZUNoYW5nZV8uYmluZCh0aGlzKTtcbiAgICAgICAgICAgIHRoaXMucmVhZGVyID0gY29uZmlnLnJlYWRlcjtcbiAgICAgICAgICAgIHRoaXMud3JpdGVyID0gY29uZmlnLndyaXRlcjtcbiAgICAgICAgICAgIHRoaXMuZW1pdHRlciA9IG5ldyBFbWl0dGVyKCk7XG4gICAgICAgICAgICB0aGlzLnZhbHVlID0gY29uZmlnLnZhbHVlO1xuICAgICAgICAgICAgdGhpcy52YWx1ZS5lbWl0dGVyLm9uKCdjaGFuZ2UnLCB0aGlzLm9uVmFsdWVDaGFuZ2VfKTtcbiAgICAgICAgICAgIHRoaXMudGFyZ2V0ID0gY29uZmlnLnRhcmdldDtcbiAgICAgICAgICAgIHRoaXMucmVhZCgpO1xuICAgICAgICB9XG4gICAgICAgIHJlYWQoKSB7XG4gICAgICAgICAgICBjb25zdCB0YXJnZXRWYWx1ZSA9IHRoaXMudGFyZ2V0LnJlYWQoKTtcbiAgICAgICAgICAgIGlmICh0YXJnZXRWYWx1ZSAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgICAgICAgdGhpcy52YWx1ZS5yYXdWYWx1ZSA9IHRoaXMucmVhZGVyKHRhcmdldFZhbHVlKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICB3cml0ZV8ocmF3VmFsdWUpIHtcbiAgICAgICAgICAgIHRoaXMud3JpdGVyKHRoaXMudGFyZ2V0LCByYXdWYWx1ZSk7XG4gICAgICAgIH1cbiAgICAgICAgb25WYWx1ZUNoYW5nZV8oZXYpIHtcbiAgICAgICAgICAgIHRoaXMud3JpdGVfKGV2LnJhd1ZhbHVlKTtcbiAgICAgICAgICAgIHRoaXMuZW1pdHRlci5lbWl0KCdjaGFuZ2UnLCB7XG4gICAgICAgICAgICAgICAgb3B0aW9uczogZXYub3B0aW9ucyxcbiAgICAgICAgICAgICAgICByYXdWYWx1ZTogZXYucmF3VmFsdWUsXG4gICAgICAgICAgICAgICAgc2VuZGVyOiB0aGlzLFxuICAgICAgICAgICAgfSk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBmdW5jdGlvbiBjcmVhdGVJbnB1dEJpbmRpbmdDb250cm9sbGVyKHBsdWdpbiwgYXJncykge1xuICAgICAgICBjb25zdCByZXN1bHQgPSBwbHVnaW4uYWNjZXB0KGFyZ3MudGFyZ2V0LnJlYWQoKSwgYXJncy5wYXJhbXMpO1xuICAgICAgICBpZiAoaXNFbXB0eShyZXN1bHQpKSB7XG4gICAgICAgICAgICByZXR1cm4gbnVsbDtcbiAgICAgICAgfVxuICAgICAgICBjb25zdCBwID0gUGFyYW1zUGFyc2VycztcbiAgICAgICAgY29uc3QgdmFsdWVBcmdzID0ge1xuICAgICAgICAgICAgdGFyZ2V0OiBhcmdzLnRhcmdldCxcbiAgICAgICAgICAgIGluaXRpYWxWYWx1ZTogcmVzdWx0LmluaXRpYWxWYWx1ZSxcbiAgICAgICAgICAgIHBhcmFtczogcmVzdWx0LnBhcmFtcyxcbiAgICAgICAgfTtcbiAgICAgICAgY29uc3QgcmVhZGVyID0gcGx1Z2luLmJpbmRpbmcucmVhZGVyKHZhbHVlQXJncyk7XG4gICAgICAgIGNvbnN0IGNvbnN0cmFpbnQgPSBwbHVnaW4uYmluZGluZy5jb25zdHJhaW50XG4gICAgICAgICAgICA/IHBsdWdpbi5iaW5kaW5nLmNvbnN0cmFpbnQodmFsdWVBcmdzKVxuICAgICAgICAgICAgOiB1bmRlZmluZWQ7XG4gICAgICAgIGNvbnN0IHZhbHVlID0gY3JlYXRlVmFsdWUocmVhZGVyKHJlc3VsdC5pbml0aWFsVmFsdWUpLCB7XG4gICAgICAgICAgICBjb25zdHJhaW50OiBjb25zdHJhaW50LFxuICAgICAgICAgICAgZXF1YWxzOiBwbHVnaW4uYmluZGluZy5lcXVhbHMsXG4gICAgICAgIH0pO1xuICAgICAgICBjb25zdCBiaW5kaW5nID0gbmV3IElucHV0QmluZGluZyh7XG4gICAgICAgICAgICByZWFkZXI6IHJlYWRlcixcbiAgICAgICAgICAgIHRhcmdldDogYXJncy50YXJnZXQsXG4gICAgICAgICAgICB2YWx1ZTogdmFsdWUsXG4gICAgICAgICAgICB3cml0ZXI6IHBsdWdpbi5iaW5kaW5nLndyaXRlcih2YWx1ZUFyZ3MpLFxuICAgICAgICB9KTtcbiAgICAgICAgY29uc3QgZGlzYWJsZWQgPSBwLm9wdGlvbmFsLmJvb2xlYW4oYXJncy5wYXJhbXMuZGlzYWJsZWQpLnZhbHVlO1xuICAgICAgICBjb25zdCBoaWRkZW4gPSBwLm9wdGlvbmFsLmJvb2xlYW4oYXJncy5wYXJhbXMuaGlkZGVuKS52YWx1ZTtcbiAgICAgICAgY29uc3QgY29udHJvbGxlciA9IHBsdWdpbi5jb250cm9sbGVyKHtcbiAgICAgICAgICAgIGNvbnN0cmFpbnQ6IGNvbnN0cmFpbnQsXG4gICAgICAgICAgICBkb2N1bWVudDogYXJncy5kb2N1bWVudCxcbiAgICAgICAgICAgIGluaXRpYWxWYWx1ZTogcmVzdWx0LmluaXRpYWxWYWx1ZSxcbiAgICAgICAgICAgIHBhcmFtczogcmVzdWx0LnBhcmFtcyxcbiAgICAgICAgICAgIHZhbHVlOiBiaW5kaW5nLnZhbHVlLFxuICAgICAgICAgICAgdmlld1Byb3BzOiBWaWV3UHJvcHMuY3JlYXRlKHtcbiAgICAgICAgICAgICAgICBkaXNhYmxlZDogZGlzYWJsZWQsXG4gICAgICAgICAgICAgICAgaGlkZGVuOiBoaWRkZW4sXG4gICAgICAgICAgICB9KSxcbiAgICAgICAgfSk7XG4gICAgICAgIGNvbnN0IGxhYmVsID0gcC5vcHRpb25hbC5zdHJpbmcoYXJncy5wYXJhbXMubGFiZWwpLnZhbHVlO1xuICAgICAgICByZXR1cm4gbmV3IElucHV0QmluZGluZ0NvbnRyb2xsZXIoYXJncy5kb2N1bWVudCwge1xuICAgICAgICAgICAgYmluZGluZzogYmluZGluZyxcbiAgICAgICAgICAgIGJsYWRlOiBjcmVhdGVCbGFkZSgpLFxuICAgICAgICAgICAgcHJvcHM6IFZhbHVlTWFwLmZyb21PYmplY3Qoe1xuICAgICAgICAgICAgICAgIGxhYmVsOiBsYWJlbCB8fCBhcmdzLnRhcmdldC5rZXksXG4gICAgICAgICAgICB9KSxcbiAgICAgICAgICAgIHZhbHVlQ29udHJvbGxlcjogY29udHJvbGxlcixcbiAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgY2xhc3MgTW9uaXRvckJpbmRpbmcge1xuICAgICAgICBjb25zdHJ1Y3Rvcihjb25maWcpIHtcbiAgICAgICAgICAgIHRoaXMub25UaWNrXyA9IHRoaXMub25UaWNrXy5iaW5kKHRoaXMpO1xuICAgICAgICAgICAgdGhpcy5yZWFkZXJfID0gY29uZmlnLnJlYWRlcjtcbiAgICAgICAgICAgIHRoaXMudGFyZ2V0ID0gY29uZmlnLnRhcmdldDtcbiAgICAgICAgICAgIHRoaXMuZW1pdHRlciA9IG5ldyBFbWl0dGVyKCk7XG4gICAgICAgICAgICB0aGlzLnZhbHVlID0gY29uZmlnLnZhbHVlO1xuICAgICAgICAgICAgdGhpcy50aWNrZXIgPSBjb25maWcudGlja2VyO1xuICAgICAgICAgICAgdGhpcy50aWNrZXIuZW1pdHRlci5vbigndGljaycsIHRoaXMub25UaWNrXyk7XG4gICAgICAgICAgICB0aGlzLnJlYWQoKTtcbiAgICAgICAgfVxuICAgICAgICBkaXNwb3NlKCkge1xuICAgICAgICAgICAgdGhpcy50aWNrZXIuZGlzcG9zZSgpO1xuICAgICAgICB9XG4gICAgICAgIHJlYWQoKSB7XG4gICAgICAgICAgICBjb25zdCB0YXJnZXRWYWx1ZSA9IHRoaXMudGFyZ2V0LnJlYWQoKTtcbiAgICAgICAgICAgIGlmICh0YXJnZXRWYWx1ZSA9PT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgY29uc3QgYnVmZmVyID0gdGhpcy52YWx1ZS5yYXdWYWx1ZTtcbiAgICAgICAgICAgIGNvbnN0IG5ld1ZhbHVlID0gdGhpcy5yZWFkZXJfKHRhcmdldFZhbHVlKTtcbiAgICAgICAgICAgIHRoaXMudmFsdWUucmF3VmFsdWUgPSBjcmVhdGVQdXNoZWRCdWZmZXIoYnVmZmVyLCBuZXdWYWx1ZSk7XG4gICAgICAgICAgICB0aGlzLmVtaXR0ZXIuZW1pdCgndXBkYXRlJywge1xuICAgICAgICAgICAgICAgIHJhd1ZhbHVlOiBuZXdWYWx1ZSxcbiAgICAgICAgICAgICAgICBzZW5kZXI6IHRoaXMsXG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfVxuICAgICAgICBvblRpY2tfKF8pIHtcbiAgICAgICAgICAgIHRoaXMucmVhZCgpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gY3JlYXRlVGlja2VyKGRvY3VtZW50LCBpbnRlcnZhbCkge1xuICAgICAgICByZXR1cm4gaW50ZXJ2YWwgPT09IDBcbiAgICAgICAgICAgID8gbmV3IE1hbnVhbFRpY2tlcigpXG4gICAgICAgICAgICA6IG5ldyBJbnRlcnZhbFRpY2tlcihkb2N1bWVudCwgaW50ZXJ2YWwgIT09IG51bGwgJiYgaW50ZXJ2YWwgIT09IHZvaWQgMCA/IGludGVydmFsIDogQ29uc3RhbnRzLm1vbml0b3IuZGVmYXVsdEludGVydmFsKTtcbiAgICB9XG4gICAgZnVuY3Rpb24gY3JlYXRlTW9uaXRvckJpbmRpbmdDb250cm9sbGVyKHBsdWdpbiwgYXJncykge1xuICAgICAgICB2YXIgX2EsIF9iLCBfYztcbiAgICAgICAgY29uc3QgUCA9IFBhcmFtc1BhcnNlcnM7XG4gICAgICAgIGNvbnN0IHJlc3VsdCA9IHBsdWdpbi5hY2NlcHQoYXJncy50YXJnZXQucmVhZCgpLCBhcmdzLnBhcmFtcyk7XG4gICAgICAgIGlmIChpc0VtcHR5KHJlc3VsdCkpIHtcbiAgICAgICAgICAgIHJldHVybiBudWxsO1xuICAgICAgICB9XG4gICAgICAgIGNvbnN0IGJpbmRpbmdBcmdzID0ge1xuICAgICAgICAgICAgdGFyZ2V0OiBhcmdzLnRhcmdldCxcbiAgICAgICAgICAgIGluaXRpYWxWYWx1ZTogcmVzdWx0LmluaXRpYWxWYWx1ZSxcbiAgICAgICAgICAgIHBhcmFtczogcmVzdWx0LnBhcmFtcyxcbiAgICAgICAgfTtcbiAgICAgICAgY29uc3QgcmVhZGVyID0gcGx1Z2luLmJpbmRpbmcucmVhZGVyKGJpbmRpbmdBcmdzKTtcbiAgICAgICAgY29uc3QgYnVmZmVyU2l6ZSA9IChfYiA9IChfYSA9IFAub3B0aW9uYWwubnVtYmVyKGFyZ3MucGFyYW1zLmJ1ZmZlclNpemUpLnZhbHVlKSAhPT0gbnVsbCAmJiBfYSAhPT0gdm9pZCAwID8gX2EgOiAocGx1Z2luLmJpbmRpbmcuZGVmYXVsdEJ1ZmZlclNpemUgJiZcbiAgICAgICAgICAgIHBsdWdpbi5iaW5kaW5nLmRlZmF1bHRCdWZmZXJTaXplKHJlc3VsdC5wYXJhbXMpKSkgIT09IG51bGwgJiYgX2IgIT09IHZvaWQgMCA/IF9iIDogMTtcbiAgICAgICAgY29uc3QgaW50ZXJ2YWwgPSBQLm9wdGlvbmFsLm51bWJlcihhcmdzLnBhcmFtcy5pbnRlcnZhbCkudmFsdWU7XG4gICAgICAgIGNvbnN0IGJpbmRpbmcgPSBuZXcgTW9uaXRvckJpbmRpbmcoe1xuICAgICAgICAgICAgcmVhZGVyOiByZWFkZXIsXG4gICAgICAgICAgICB0YXJnZXQ6IGFyZ3MudGFyZ2V0LFxuICAgICAgICAgICAgdGlja2VyOiBjcmVhdGVUaWNrZXIoYXJncy5kb2N1bWVudCwgaW50ZXJ2YWwpLFxuICAgICAgICAgICAgdmFsdWU6IGluaXRpYWxpemVCdWZmZXIoYnVmZmVyU2l6ZSksXG4gICAgICAgIH0pO1xuICAgICAgICBjb25zdCBkaXNhYmxlZCA9IFAub3B0aW9uYWwuYm9vbGVhbihhcmdzLnBhcmFtcy5kaXNhYmxlZCkudmFsdWU7XG4gICAgICAgIGNvbnN0IGhpZGRlbiA9IFAub3B0aW9uYWwuYm9vbGVhbihhcmdzLnBhcmFtcy5oaWRkZW4pLnZhbHVlO1xuICAgICAgICBjb25zdCBjb250cm9sbGVyID0gcGx1Z2luLmNvbnRyb2xsZXIoe1xuICAgICAgICAgICAgZG9jdW1lbnQ6IGFyZ3MuZG9jdW1lbnQsXG4gICAgICAgICAgICBwYXJhbXM6IHJlc3VsdC5wYXJhbXMsXG4gICAgICAgICAgICB2YWx1ZTogYmluZGluZy52YWx1ZSxcbiAgICAgICAgICAgIHZpZXdQcm9wczogVmlld1Byb3BzLmNyZWF0ZSh7XG4gICAgICAgICAgICAgICAgZGlzYWJsZWQ6IGRpc2FibGVkLFxuICAgICAgICAgICAgICAgIGhpZGRlbjogaGlkZGVuLFxuICAgICAgICAgICAgfSksXG4gICAgICAgIH0pO1xuICAgICAgICBjb25zdCBsYWJlbCA9IChfYyA9IFAub3B0aW9uYWwuc3RyaW5nKGFyZ3MucGFyYW1zLmxhYmVsKS52YWx1ZSkgIT09IG51bGwgJiYgX2MgIT09IHZvaWQgMCA/IF9jIDogYXJncy50YXJnZXQua2V5O1xuICAgICAgICByZXR1cm4gbmV3IE1vbml0b3JCaW5kaW5nQ29udHJvbGxlcihhcmdzLmRvY3VtZW50LCB7XG4gICAgICAgICAgICBiaW5kaW5nOiBiaW5kaW5nLFxuICAgICAgICAgICAgYmxhZGU6IGNyZWF0ZUJsYWRlKCksXG4gICAgICAgICAgICBwcm9wczogVmFsdWVNYXAuZnJvbU9iamVjdCh7XG4gICAgICAgICAgICAgICAgbGFiZWw6IGxhYmVsLFxuICAgICAgICAgICAgfSksXG4gICAgICAgICAgICB2YWx1ZUNvbnRyb2xsZXI6IGNvbnRyb2xsZXIsXG4gICAgICAgIH0pO1xuICAgIH1cblxuICAgIGNsYXNzIFBsdWdpblBvb2wge1xuICAgICAgICBjb25zdHJ1Y3RvcigpIHtcbiAgICAgICAgICAgIHRoaXMucGx1Z2luc01hcF8gPSB7XG4gICAgICAgICAgICAgICAgYmxhZGVzOiBbXSxcbiAgICAgICAgICAgICAgICBpbnB1dHM6IFtdLFxuICAgICAgICAgICAgICAgIG1vbml0b3JzOiBbXSxcbiAgICAgICAgICAgIH07XG4gICAgICAgIH1cbiAgICAgICAgZ2V0QWxsKCkge1xuICAgICAgICAgICAgcmV0dXJuIFtcbiAgICAgICAgICAgICAgICAuLi50aGlzLnBsdWdpbnNNYXBfLmJsYWRlcyxcbiAgICAgICAgICAgICAgICAuLi50aGlzLnBsdWdpbnNNYXBfLmlucHV0cyxcbiAgICAgICAgICAgICAgICAuLi50aGlzLnBsdWdpbnNNYXBfLm1vbml0b3JzLFxuICAgICAgICAgICAgXTtcbiAgICAgICAgfVxuICAgICAgICByZWdpc3RlcihyKSB7XG4gICAgICAgICAgICBpZiAoci50eXBlID09PSAnYmxhZGUnKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5wbHVnaW5zTWFwXy5ibGFkZXMudW5zaGlmdChyKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGVsc2UgaWYgKHIudHlwZSA9PT0gJ2lucHV0Jykge1xuICAgICAgICAgICAgICAgIHRoaXMucGx1Z2luc01hcF8uaW5wdXRzLnVuc2hpZnQocik7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNlIGlmIChyLnR5cGUgPT09ICdtb25pdG9yJykge1xuICAgICAgICAgICAgICAgIHRoaXMucGx1Z2luc01hcF8ubW9uaXRvcnMudW5zaGlmdChyKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICBjcmVhdGVJbnB1dChkb2N1bWVudCwgdGFyZ2V0LCBwYXJhbXMpIHtcbiAgICAgICAgICAgIGNvbnN0IGluaXRpYWxWYWx1ZSA9IHRhcmdldC5yZWFkKCk7XG4gICAgICAgICAgICBpZiAoaXNFbXB0eShpbml0aWFsVmFsdWUpKSB7XG4gICAgICAgICAgICAgICAgdGhyb3cgbmV3IFRwRXJyb3Ioe1xuICAgICAgICAgICAgICAgICAgICBjb250ZXh0OiB7XG4gICAgICAgICAgICAgICAgICAgICAgICBrZXk6IHRhcmdldC5rZXksXG4gICAgICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgICAgIHR5cGU6ICdub21hdGNoaW5nY29udHJvbGxlcicsXG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBjb25zdCBiYyA9IHRoaXMucGx1Z2luc01hcF8uaW5wdXRzLnJlZHVjZSgocmVzdWx0LCBwbHVnaW4pID0+IHJlc3VsdCB8fFxuICAgICAgICAgICAgICAgIGNyZWF0ZUlucHV0QmluZGluZ0NvbnRyb2xsZXIocGx1Z2luLCB7XG4gICAgICAgICAgICAgICAgICAgIGRvY3VtZW50OiBkb2N1bWVudCxcbiAgICAgICAgICAgICAgICAgICAgdGFyZ2V0OiB0YXJnZXQsXG4gICAgICAgICAgICAgICAgICAgIHBhcmFtczogcGFyYW1zLFxuICAgICAgICAgICAgICAgIH0pLCBudWxsKTtcbiAgICAgICAgICAgIGlmIChiYykge1xuICAgICAgICAgICAgICAgIHJldHVybiBiYztcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHRocm93IG5ldyBUcEVycm9yKHtcbiAgICAgICAgICAgICAgICBjb250ZXh0OiB7XG4gICAgICAgICAgICAgICAgICAgIGtleTogdGFyZ2V0LmtleSxcbiAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgIHR5cGU6ICdub21hdGNoaW5nY29udHJvbGxlcicsXG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfVxuICAgICAgICBjcmVhdGVNb25pdG9yKGRvY3VtZW50LCB0YXJnZXQsIHBhcmFtcykge1xuICAgICAgICAgICAgY29uc3QgYmMgPSB0aGlzLnBsdWdpbnNNYXBfLm1vbml0b3JzLnJlZHVjZSgocmVzdWx0LCBwbHVnaW4pID0+IHJlc3VsdCB8fFxuICAgICAgICAgICAgICAgIGNyZWF0ZU1vbml0b3JCaW5kaW5nQ29udHJvbGxlcihwbHVnaW4sIHtcbiAgICAgICAgICAgICAgICAgICAgZG9jdW1lbnQ6IGRvY3VtZW50LFxuICAgICAgICAgICAgICAgICAgICBwYXJhbXM6IHBhcmFtcyxcbiAgICAgICAgICAgICAgICAgICAgdGFyZ2V0OiB0YXJnZXQsXG4gICAgICAgICAgICAgICAgfSksIG51bGwpO1xuICAgICAgICAgICAgaWYgKGJjKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIGJjO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgdGhyb3cgbmV3IFRwRXJyb3Ioe1xuICAgICAgICAgICAgICAgIGNvbnRleHQ6IHtcbiAgICAgICAgICAgICAgICAgICAga2V5OiB0YXJnZXQua2V5LFxuICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgdHlwZTogJ25vbWF0Y2hpbmdjb250cm9sbGVyJyxcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9XG4gICAgICAgIGNyZWF0ZUJsYWRlKGRvY3VtZW50LCBwYXJhbXMpIHtcbiAgICAgICAgICAgIGNvbnN0IGJjID0gdGhpcy5wbHVnaW5zTWFwXy5ibGFkZXMucmVkdWNlKChyZXN1bHQsIHBsdWdpbikgPT4gcmVzdWx0IHx8XG4gICAgICAgICAgICAgICAgY3JlYXRlQmxhZGVDb250cm9sbGVyKHBsdWdpbiwge1xuICAgICAgICAgICAgICAgICAgICBkb2N1bWVudDogZG9jdW1lbnQsXG4gICAgICAgICAgICAgICAgICAgIHBhcmFtczogcGFyYW1zLFxuICAgICAgICAgICAgICAgIH0pLCBudWxsKTtcbiAgICAgICAgICAgIGlmICghYmMpIHtcbiAgICAgICAgICAgICAgICB0aHJvdyBuZXcgVHBFcnJvcih7XG4gICAgICAgICAgICAgICAgICAgIHR5cGU6ICdub21hdGNoaW5ndmlldycsXG4gICAgICAgICAgICAgICAgICAgIGNvbnRleHQ6IHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHBhcmFtczogcGFyYW1zLFxuICAgICAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgcmV0dXJuIGJjO1xuICAgICAgICB9XG4gICAgICAgIGNyZWF0ZUJsYWRlQXBpKGJjKSB7XG4gICAgICAgICAgICBpZiAoYmMgaW5zdGFuY2VvZiBJbnB1dEJpbmRpbmdDb250cm9sbGVyKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIG5ldyBJbnB1dEJpbmRpbmdBcGkoYmMpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaWYgKGJjIGluc3RhbmNlb2YgTW9uaXRvckJpbmRpbmdDb250cm9sbGVyKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIG5ldyBNb25pdG9yQmluZGluZ0FwaShiYyk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBpZiAoYmMgaW5zdGFuY2VvZiBSYWNrQ29udHJvbGxlcikge1xuICAgICAgICAgICAgICAgIHJldHVybiBuZXcgUmFja0FwaShiYywgdGhpcyk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBjb25zdCBhcGkgPSB0aGlzLnBsdWdpbnNNYXBfLmJsYWRlcy5yZWR1Y2UoKHJlc3VsdCwgcGx1Z2luKSA9PiByZXN1bHQgfHxcbiAgICAgICAgICAgICAgICBwbHVnaW4uYXBpKHtcbiAgICAgICAgICAgICAgICAgICAgY29udHJvbGxlcjogYmMsXG4gICAgICAgICAgICAgICAgICAgIHBvb2w6IHRoaXMsXG4gICAgICAgICAgICAgICAgfSksIG51bGwpO1xuICAgICAgICAgICAgaWYgKCFhcGkpIHtcbiAgICAgICAgICAgICAgICB0aHJvdyBUcEVycm9yLnNob3VsZE5ldmVySGFwcGVuKCk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICByZXR1cm4gYXBpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gY3JlYXRlRGVmYXVsdFBsdWdpblBvb2woKSB7XG4gICAgICAgIGNvbnN0IHBvb2wgPSBuZXcgUGx1Z2luUG9vbCgpO1xuICAgICAgICBbXG4gICAgICAgICAgICBQb2ludDJkSW5wdXRQbHVnaW4sXG4gICAgICAgICAgICBQb2ludDNkSW5wdXRQbHVnaW4sXG4gICAgICAgICAgICBQb2ludDRkSW5wdXRQbHVnaW4sXG4gICAgICAgICAgICBTdHJpbmdJbnB1dFBsdWdpbixcbiAgICAgICAgICAgIE51bWJlcklucHV0UGx1Z2luLFxuICAgICAgICAgICAgU3RyaW5nQ29sb3JJbnB1dFBsdWdpbixcbiAgICAgICAgICAgIE9iamVjdENvbG9ySW5wdXRQbHVnaW4sXG4gICAgICAgICAgICBOdW1iZXJDb2xvcklucHV0UGx1Z2luLFxuICAgICAgICAgICAgQm9vbGVhbklucHV0UGx1Z2luLFxuICAgICAgICAgICAgQm9vbGVhbk1vbml0b3JQbHVnaW4sXG4gICAgICAgICAgICBTdHJpbmdNb25pdG9yUGx1Z2luLFxuICAgICAgICAgICAgTnVtYmVyTW9uaXRvclBsdWdpbixcbiAgICAgICAgICAgIEJ1dHRvbkJsYWRlUGx1Z2luLFxuICAgICAgICAgICAgRm9sZGVyQmxhZGVQbHVnaW4sXG4gICAgICAgICAgICBTZXBhcmF0b3JCbGFkZVBsdWdpbixcbiAgICAgICAgICAgIFRhYkJsYWRlUGx1Z2luLFxuICAgICAgICBdLmZvckVhY2goKHApID0+IHtcbiAgICAgICAgICAgIHBvb2wucmVnaXN0ZXIocCk7XG4gICAgICAgIH0pO1xuICAgICAgICByZXR1cm4gcG9vbDtcbiAgICB9XG5cbiAgICBjbGFzcyBMaXN0QXBpIGV4dGVuZHMgQmxhZGVBcGkge1xuICAgICAgICBjb25zdHJ1Y3Rvcihjb250cm9sbGVyKSB7XG4gICAgICAgICAgICBzdXBlcihjb250cm9sbGVyKTtcbiAgICAgICAgICAgIHRoaXMuZW1pdHRlcl8gPSBuZXcgRW1pdHRlcigpO1xuICAgICAgICAgICAgdGhpcy5jb250cm9sbGVyXy52YWx1ZUNvbnRyb2xsZXIudmFsdWUuZW1pdHRlci5vbignY2hhbmdlJywgKGV2KSA9PiB7XG4gICAgICAgICAgICAgICAgdGhpcy5lbWl0dGVyXy5lbWl0KCdjaGFuZ2UnLCB7XG4gICAgICAgICAgICAgICAgICAgIGV2ZW50OiBuZXcgVHBDaGFuZ2VFdmVudCh0aGlzLCBldi5yYXdWYWx1ZSksXG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfVxuICAgICAgICBnZXQgbGFiZWwoKSB7XG4gICAgICAgICAgICByZXR1cm4gdGhpcy5jb250cm9sbGVyXy5wcm9wcy5nZXQoJ2xhYmVsJyk7XG4gICAgICAgIH1cbiAgICAgICAgc2V0IGxhYmVsKGxhYmVsKSB7XG4gICAgICAgICAgICB0aGlzLmNvbnRyb2xsZXJfLnByb3BzLnNldCgnbGFiZWwnLCBsYWJlbCk7XG4gICAgICAgIH1cbiAgICAgICAgZ2V0IG9wdGlvbnMoKSB7XG4gICAgICAgICAgICByZXR1cm4gdGhpcy5jb250cm9sbGVyXy52YWx1ZUNvbnRyb2xsZXIucHJvcHMuZ2V0KCdvcHRpb25zJyk7XG4gICAgICAgIH1cbiAgICAgICAgc2V0IG9wdGlvbnMob3B0aW9ucykge1xuICAgICAgICAgICAgdGhpcy5jb250cm9sbGVyXy52YWx1ZUNvbnRyb2xsZXIucHJvcHMuc2V0KCdvcHRpb25zJywgb3B0aW9ucyk7XG4gICAgICAgIH1cbiAgICAgICAgZ2V0IHZhbHVlKCkge1xuICAgICAgICAgICAgcmV0dXJuIHRoaXMuY29udHJvbGxlcl8udmFsdWVDb250cm9sbGVyLnZhbHVlLnJhd1ZhbHVlO1xuICAgICAgICB9XG4gICAgICAgIHNldCB2YWx1ZSh2YWx1ZSkge1xuICAgICAgICAgICAgdGhpcy5jb250cm9sbGVyXy52YWx1ZUNvbnRyb2xsZXIudmFsdWUucmF3VmFsdWUgPSB2YWx1ZTtcbiAgICAgICAgfVxuICAgICAgICBvbihldmVudE5hbWUsIGhhbmRsZXIpIHtcbiAgICAgICAgICAgIGNvbnN0IGJoID0gaGFuZGxlci5iaW5kKHRoaXMpO1xuICAgICAgICAgICAgdGhpcy5lbWl0dGVyXy5vbihldmVudE5hbWUsIChldikgPT4ge1xuICAgICAgICAgICAgICAgIGJoKGV2LmV2ZW50KTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgcmV0dXJuIHRoaXM7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBjbGFzcyBTbGlkZXJBcGkgZXh0ZW5kcyBCbGFkZUFwaSB7XG4gICAgICAgIGNvbnN0cnVjdG9yKGNvbnRyb2xsZXIpIHtcbiAgICAgICAgICAgIHN1cGVyKGNvbnRyb2xsZXIpO1xuICAgICAgICAgICAgdGhpcy5lbWl0dGVyXyA9IG5ldyBFbWl0dGVyKCk7XG4gICAgICAgICAgICB0aGlzLmNvbnRyb2xsZXJfLnZhbHVlQ29udHJvbGxlci52YWx1ZS5lbWl0dGVyLm9uKCdjaGFuZ2UnLCAoZXYpID0+IHtcbiAgICAgICAgICAgICAgICB0aGlzLmVtaXR0ZXJfLmVtaXQoJ2NoYW5nZScsIHtcbiAgICAgICAgICAgICAgICAgICAgZXZlbnQ6IG5ldyBUcENoYW5nZUV2ZW50KHRoaXMsIGV2LnJhd1ZhbHVlKSxcbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9XG4gICAgICAgIGdldCBsYWJlbCgpIHtcbiAgICAgICAgICAgIHJldHVybiB0aGlzLmNvbnRyb2xsZXJfLnByb3BzLmdldCgnbGFiZWwnKTtcbiAgICAgICAgfVxuICAgICAgICBzZXQgbGFiZWwobGFiZWwpIHtcbiAgICAgICAgICAgIHRoaXMuY29udHJvbGxlcl8ucHJvcHMuc2V0KCdsYWJlbCcsIGxhYmVsKTtcbiAgICAgICAgfVxuICAgICAgICBnZXQgbWF4VmFsdWUoKSB7XG4gICAgICAgICAgICByZXR1cm4gdGhpcy5jb250cm9sbGVyXy52YWx1ZUNvbnRyb2xsZXIuc2xpZGVyQ29udHJvbGxlci5wcm9wcy5nZXQoJ21heFZhbHVlJyk7XG4gICAgICAgIH1cbiAgICAgICAgc2V0IG1heFZhbHVlKG1heFZhbHVlKSB7XG4gICAgICAgICAgICB0aGlzLmNvbnRyb2xsZXJfLnZhbHVlQ29udHJvbGxlci5zbGlkZXJDb250cm9sbGVyLnByb3BzLnNldCgnbWF4VmFsdWUnLCBtYXhWYWx1ZSk7XG4gICAgICAgIH1cbiAgICAgICAgZ2V0IG1pblZhbHVlKCkge1xuICAgICAgICAgICAgcmV0dXJuIHRoaXMuY29udHJvbGxlcl8udmFsdWVDb250cm9sbGVyLnNsaWRlckNvbnRyb2xsZXIucHJvcHMuZ2V0KCdtaW5WYWx1ZScpO1xuICAgICAgICB9XG4gICAgICAgIHNldCBtaW5WYWx1ZShtaW5WYWx1ZSkge1xuICAgICAgICAgICAgdGhpcy5jb250cm9sbGVyXy52YWx1ZUNvbnRyb2xsZXIuc2xpZGVyQ29udHJvbGxlci5wcm9wcy5zZXQoJ21pblZhbHVlJywgbWluVmFsdWUpO1xuICAgICAgICB9XG4gICAgICAgIGdldCB2YWx1ZSgpIHtcbiAgICAgICAgICAgIHJldHVybiB0aGlzLmNvbnRyb2xsZXJfLnZhbHVlQ29udHJvbGxlci52YWx1ZS5yYXdWYWx1ZTtcbiAgICAgICAgfVxuICAgICAgICBzZXQgdmFsdWUodmFsdWUpIHtcbiAgICAgICAgICAgIHRoaXMuY29udHJvbGxlcl8udmFsdWVDb250cm9sbGVyLnZhbHVlLnJhd1ZhbHVlID0gdmFsdWU7XG4gICAgICAgIH1cbiAgICAgICAgb24oZXZlbnROYW1lLCBoYW5kbGVyKSB7XG4gICAgICAgICAgICBjb25zdCBiaCA9IGhhbmRsZXIuYmluZCh0aGlzKTtcbiAgICAgICAgICAgIHRoaXMuZW1pdHRlcl8ub24oZXZlbnROYW1lLCAoZXYpID0+IHtcbiAgICAgICAgICAgICAgICBiaChldi5ldmVudCk7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIHJldHVybiB0aGlzO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgY2xhc3MgVGV4dEFwaSBleHRlbmRzIEJsYWRlQXBpIHtcbiAgICAgICAgY29uc3RydWN0b3IoY29udHJvbGxlcikge1xuICAgICAgICAgICAgc3VwZXIoY29udHJvbGxlcik7XG4gICAgICAgICAgICB0aGlzLmVtaXR0ZXJfID0gbmV3IEVtaXR0ZXIoKTtcbiAgICAgICAgICAgIHRoaXMuY29udHJvbGxlcl8udmFsdWVDb250cm9sbGVyLnZhbHVlLmVtaXR0ZXIub24oJ2NoYW5nZScsIChldikgPT4ge1xuICAgICAgICAgICAgICAgIHRoaXMuZW1pdHRlcl8uZW1pdCgnY2hhbmdlJywge1xuICAgICAgICAgICAgICAgICAgICBldmVudDogbmV3IFRwQ2hhbmdlRXZlbnQodGhpcywgZXYucmF3VmFsdWUpLFxuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgIH1cbiAgICAgICAgZ2V0IGxhYmVsKCkge1xuICAgICAgICAgICAgcmV0dXJuIHRoaXMuY29udHJvbGxlcl8ucHJvcHMuZ2V0KCdsYWJlbCcpO1xuICAgICAgICB9XG4gICAgICAgIHNldCBsYWJlbChsYWJlbCkge1xuICAgICAgICAgICAgdGhpcy5jb250cm9sbGVyXy5wcm9wcy5zZXQoJ2xhYmVsJywgbGFiZWwpO1xuICAgICAgICB9XG4gICAgICAgIGdldCBmb3JtYXR0ZXIoKSB7XG4gICAgICAgICAgICByZXR1cm4gdGhpcy5jb250cm9sbGVyXy52YWx1ZUNvbnRyb2xsZXIucHJvcHMuZ2V0KCdmb3JtYXR0ZXInKTtcbiAgICAgICAgfVxuICAgICAgICBzZXQgZm9ybWF0dGVyKGZvcm1hdHRlcikge1xuICAgICAgICAgICAgdGhpcy5jb250cm9sbGVyXy52YWx1ZUNvbnRyb2xsZXIucHJvcHMuc2V0KCdmb3JtYXR0ZXInLCBmb3JtYXR0ZXIpO1xuICAgICAgICB9XG4gICAgICAgIGdldCB2YWx1ZSgpIHtcbiAgICAgICAgICAgIHJldHVybiB0aGlzLmNvbnRyb2xsZXJfLnZhbHVlQ29udHJvbGxlci52YWx1ZS5yYXdWYWx1ZTtcbiAgICAgICAgfVxuICAgICAgICBzZXQgdmFsdWUodmFsdWUpIHtcbiAgICAgICAgICAgIHRoaXMuY29udHJvbGxlcl8udmFsdWVDb250cm9sbGVyLnZhbHVlLnJhd1ZhbHVlID0gdmFsdWU7XG4gICAgICAgIH1cbiAgICAgICAgb24oZXZlbnROYW1lLCBoYW5kbGVyKSB7XG4gICAgICAgICAgICBjb25zdCBiaCA9IGhhbmRsZXIuYmluZCh0aGlzKTtcbiAgICAgICAgICAgIHRoaXMuZW1pdHRlcl8ub24oZXZlbnROYW1lLCAoZXYpID0+IHtcbiAgICAgICAgICAgICAgICBiaChldi5ldmVudCk7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIHJldHVybiB0aGlzO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgY29uc3QgTGlzdEJsYWRlUGx1Z2luID0gKGZ1bmN0aW9uICgpIHtcbiAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgIGlkOiAnbGlzdCcsXG4gICAgICAgICAgICB0eXBlOiAnYmxhZGUnLFxuICAgICAgICAgICAgYWNjZXB0KHBhcmFtcykge1xuICAgICAgICAgICAgICAgIGNvbnN0IHAgPSBQYXJhbXNQYXJzZXJzO1xuICAgICAgICAgICAgICAgIGNvbnN0IHJlc3VsdCA9IHBhcnNlUGFyYW1zKHBhcmFtcywge1xuICAgICAgICAgICAgICAgICAgICBvcHRpb25zOiBwLnJlcXVpcmVkLmN1c3RvbShwYXJzZUxpc3RPcHRpb25zKSxcbiAgICAgICAgICAgICAgICAgICAgdmFsdWU6IHAucmVxdWlyZWQucmF3LFxuICAgICAgICAgICAgICAgICAgICB2aWV3OiBwLnJlcXVpcmVkLmNvbnN0YW50KCdsaXN0JyksXG4gICAgICAgICAgICAgICAgICAgIGxhYmVsOiBwLm9wdGlvbmFsLnN0cmluZyxcbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICByZXR1cm4gcmVzdWx0ID8geyBwYXJhbXM6IHJlc3VsdCB9IDogbnVsbDtcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBjb250cm9sbGVyKGFyZ3MpIHtcbiAgICAgICAgICAgICAgICBjb25zdCBpYyA9IG5ldyBMaXN0Q29udHJvbGxlcihhcmdzLmRvY3VtZW50LCB7XG4gICAgICAgICAgICAgICAgICAgIHByb3BzOiBWYWx1ZU1hcC5mcm9tT2JqZWN0KHtcbiAgICAgICAgICAgICAgICAgICAgICAgIG9wdGlvbnM6IG5vcm1hbGl6ZUxpc3RPcHRpb25zKGFyZ3MucGFyYW1zLm9wdGlvbnMpLFxuICAgICAgICAgICAgICAgICAgICB9KSxcbiAgICAgICAgICAgICAgICAgICAgdmFsdWU6IGNyZWF0ZVZhbHVlKGFyZ3MucGFyYW1zLnZhbHVlKSxcbiAgICAgICAgICAgICAgICAgICAgdmlld1Byb3BzOiBhcmdzLnZpZXdQcm9wcyxcbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICByZXR1cm4gbmV3IExhYmVsZWRWYWx1ZUNvbnRyb2xsZXIoYXJncy5kb2N1bWVudCwge1xuICAgICAgICAgICAgICAgICAgICBibGFkZTogYXJncy5ibGFkZSxcbiAgICAgICAgICAgICAgICAgICAgcHJvcHM6IFZhbHVlTWFwLmZyb21PYmplY3Qoe1xuICAgICAgICAgICAgICAgICAgICAgICAgbGFiZWw6IGFyZ3MucGFyYW1zLmxhYmVsLFxuICAgICAgICAgICAgICAgICAgICB9KSxcbiAgICAgICAgICAgICAgICAgICAgdmFsdWVDb250cm9sbGVyOiBpYyxcbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBhcGkoYXJncykge1xuICAgICAgICAgICAgICAgIGlmICghKGFyZ3MuY29udHJvbGxlciBpbnN0YW5jZW9mIExhYmVsZWRWYWx1ZUNvbnRyb2xsZXIpKSB7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBudWxsO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBpZiAoIShhcmdzLmNvbnRyb2xsZXIudmFsdWVDb250cm9sbGVyIGluc3RhbmNlb2YgTGlzdENvbnRyb2xsZXIpKSB7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBudWxsO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICByZXR1cm4gbmV3IExpc3RBcGkoYXJncy5jb250cm9sbGVyKTtcbiAgICAgICAgICAgIH0sXG4gICAgICAgIH07XG4gICAgfSkoKTtcblxuICAgIC8qKlxuICAgICAqIEBoaWRkZW5cbiAgICAgKi9cbiAgICBmdW5jdGlvbiBleHBvcnRQcmVzZXRKc29uKHRhcmdldHMpIHtcbiAgICAgICAgcmV0dXJuIHRhcmdldHMucmVkdWNlKChyZXN1bHQsIHRhcmdldCkgPT4ge1xuICAgICAgICAgICAgcmV0dXJuIE9iamVjdC5hc3NpZ24ocmVzdWx0LCB7XG4gICAgICAgICAgICAgICAgW3RhcmdldC5wcmVzZXRLZXldOiB0YXJnZXQucmVhZCgpLFxuICAgICAgICAgICAgfSk7XG4gICAgICAgIH0sIHt9KTtcbiAgICB9XG4gICAgLyoqXG4gICAgICogQGhpZGRlblxuICAgICAqL1xuICAgIGZ1bmN0aW9uIGltcG9ydFByZXNldEpzb24odGFyZ2V0cywgcHJlc2V0KSB7XG4gICAgICAgIHRhcmdldHMuZm9yRWFjaCgodGFyZ2V0KSA9PiB7XG4gICAgICAgICAgICBjb25zdCB2YWx1ZSA9IHByZXNldFt0YXJnZXQucHJlc2V0S2V5XTtcbiAgICAgICAgICAgIGlmICh2YWx1ZSAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgICAgICAgdGFyZ2V0LndyaXRlKHZhbHVlKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgY2xhc3MgUm9vdEFwaSBleHRlbmRzIEZvbGRlckFwaSB7XG4gICAgICAgIC8qKlxuICAgICAgICAgKiBAaGlkZGVuXG4gICAgICAgICAqL1xuICAgICAgICBjb25zdHJ1Y3Rvcihjb250cm9sbGVyLCBwb29sKSB7XG4gICAgICAgICAgICBzdXBlcihjb250cm9sbGVyLCBwb29sKTtcbiAgICAgICAgfVxuICAgICAgICBnZXQgZWxlbWVudCgpIHtcbiAgICAgICAgICAgIHJldHVybiB0aGlzLmNvbnRyb2xsZXJfLnZpZXcuZWxlbWVudDtcbiAgICAgICAgfVxuICAgICAgICAvKipcbiAgICAgICAgICogSW1wb3J0cyBhIHByZXNldCBvZiBhbGwgaW5wdXRzLlxuICAgICAgICAgKiBAcGFyYW0gcHJlc2V0IFRoZSBwcmVzZXQgb2JqZWN0IHRvIGltcG9ydC5cbiAgICAgICAgICovXG4gICAgICAgIGltcG9ydFByZXNldChwcmVzZXQpIHtcbiAgICAgICAgICAgIGNvbnN0IHRhcmdldHMgPSB0aGlzLmNvbnRyb2xsZXJfLnJhY2tDb250cm9sbGVyLnJhY2tcbiAgICAgICAgICAgICAgICAuZmluZChJbnB1dEJpbmRpbmdDb250cm9sbGVyKVxuICAgICAgICAgICAgICAgIC5tYXAoKGliYykgPT4ge1xuICAgICAgICAgICAgICAgIHJldHVybiBpYmMuYmluZGluZy50YXJnZXQ7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIGltcG9ydFByZXNldEpzb24odGFyZ2V0cywgcHJlc2V0KTtcbiAgICAgICAgICAgIHRoaXMucmVmcmVzaCgpO1xuICAgICAgICB9XG4gICAgICAgIC8qKlxuICAgICAgICAgKiBFeHBvcnRzIGEgcHJlc2V0IG9mIGFsbCBpbnB1dHMuXG4gICAgICAgICAqIEByZXR1cm4gQW4gZXhwb3J0ZWQgcHJlc2V0IG9iamVjdC5cbiAgICAgICAgICovXG4gICAgICAgIGV4cG9ydFByZXNldCgpIHtcbiAgICAgICAgICAgIGNvbnN0IHRhcmdldHMgPSB0aGlzLmNvbnRyb2xsZXJfLnJhY2tDb250cm9sbGVyLnJhY2tcbiAgICAgICAgICAgICAgICAuZmluZChJbnB1dEJpbmRpbmdDb250cm9sbGVyKVxuICAgICAgICAgICAgICAgIC5tYXAoKGliYykgPT4ge1xuICAgICAgICAgICAgICAgIHJldHVybiBpYmMuYmluZGluZy50YXJnZXQ7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIHJldHVybiBleHBvcnRQcmVzZXRKc29uKHRhcmdldHMpO1xuICAgICAgICB9XG4gICAgICAgIC8qKlxuICAgICAgICAgKiBSZWZyZXNoZXMgYWxsIGJpbmRpbmdzIG9mIHRoZSBwYW5lLlxuICAgICAgICAgKi9cbiAgICAgICAgcmVmcmVzaCgpIHtcbiAgICAgICAgICAgIC8vIEZvcmNlLXJlYWQgYWxsIGlucHV0IGJpbmRpbmdzXG4gICAgICAgICAgICB0aGlzLmNvbnRyb2xsZXJfLnJhY2tDb250cm9sbGVyLnJhY2tcbiAgICAgICAgICAgICAgICAuZmluZChJbnB1dEJpbmRpbmdDb250cm9sbGVyKVxuICAgICAgICAgICAgICAgIC5mb3JFYWNoKChpYmMpID0+IHtcbiAgICAgICAgICAgICAgICBpYmMuYmluZGluZy5yZWFkKCk7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIC8vIEZvcmNlLXJlYWQgYWxsIG1vbml0b3IgYmluZGluZ3NcbiAgICAgICAgICAgIHRoaXMuY29udHJvbGxlcl8ucmFja0NvbnRyb2xsZXIucmFja1xuICAgICAgICAgICAgICAgIC5maW5kKE1vbml0b3JCaW5kaW5nQ29udHJvbGxlcilcbiAgICAgICAgICAgICAgICAuZm9yRWFjaCgobWJjKSA9PiB7XG4gICAgICAgICAgICAgICAgbWJjLmJpbmRpbmcucmVhZCgpO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBjbGFzcyBSb290Q29udHJvbGxlciBleHRlbmRzIEZvbGRlckNvbnRyb2xsZXIge1xuICAgICAgICBjb25zdHJ1Y3Rvcihkb2MsIGNvbmZpZykge1xuICAgICAgICAgICAgc3VwZXIoZG9jLCB7XG4gICAgICAgICAgICAgICAgZXhwYW5kZWQ6IGNvbmZpZy5leHBhbmRlZCxcbiAgICAgICAgICAgICAgICBibGFkZTogY29uZmlnLmJsYWRlLFxuICAgICAgICAgICAgICAgIHByb3BzOiBjb25maWcucHJvcHMsXG4gICAgICAgICAgICAgICAgcm9vdDogdHJ1ZSxcbiAgICAgICAgICAgICAgICB2aWV3UHJvcHM6IGNvbmZpZy52aWV3UHJvcHMsXG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIGNvbnN0IFNsaWRlckJsYWRlUGx1Z2luID0ge1xuICAgICAgICBpZDogJ3NsaWRlcicsXG4gICAgICAgIHR5cGU6ICdibGFkZScsXG4gICAgICAgIGFjY2VwdChwYXJhbXMpIHtcbiAgICAgICAgICAgIGNvbnN0IHAgPSBQYXJhbXNQYXJzZXJzO1xuICAgICAgICAgICAgY29uc3QgcmVzdWx0ID0gcGFyc2VQYXJhbXMocGFyYW1zLCB7XG4gICAgICAgICAgICAgICAgbWF4OiBwLnJlcXVpcmVkLm51bWJlcixcbiAgICAgICAgICAgICAgICBtaW46IHAucmVxdWlyZWQubnVtYmVyLFxuICAgICAgICAgICAgICAgIHZpZXc6IHAucmVxdWlyZWQuY29uc3RhbnQoJ3NsaWRlcicpLFxuICAgICAgICAgICAgICAgIGZvcm1hdDogcC5vcHRpb25hbC5mdW5jdGlvbixcbiAgICAgICAgICAgICAgICBsYWJlbDogcC5vcHRpb25hbC5zdHJpbmcsXG4gICAgICAgICAgICAgICAgdmFsdWU6IHAub3B0aW9uYWwubnVtYmVyLFxuICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICByZXR1cm4gcmVzdWx0ID8geyBwYXJhbXM6IHJlc3VsdCB9IDogbnVsbDtcbiAgICAgICAgfSxcbiAgICAgICAgY29udHJvbGxlcihhcmdzKSB7XG4gICAgICAgICAgICB2YXIgX2EsIF9iO1xuICAgICAgICAgICAgY29uc3QgdiA9IChfYSA9IGFyZ3MucGFyYW1zLnZhbHVlKSAhPT0gbnVsbCAmJiBfYSAhPT0gdm9pZCAwID8gX2EgOiAwO1xuICAgICAgICAgICAgY29uc3QgdmMgPSBuZXcgU2xpZGVyVGV4dENvbnRyb2xsZXIoYXJncy5kb2N1bWVudCwge1xuICAgICAgICAgICAgICAgIGJhc2VTdGVwOiAxLFxuICAgICAgICAgICAgICAgIHBhcnNlcjogcGFyc2VOdW1iZXIsXG4gICAgICAgICAgICAgICAgc2xpZGVyUHJvcHM6IFZhbHVlTWFwLmZyb21PYmplY3Qoe1xuICAgICAgICAgICAgICAgICAgICBtYXhWYWx1ZTogYXJncy5wYXJhbXMubWF4LFxuICAgICAgICAgICAgICAgICAgICBtaW5WYWx1ZTogYXJncy5wYXJhbXMubWluLFxuICAgICAgICAgICAgICAgIH0pLFxuICAgICAgICAgICAgICAgIHRleHRQcm9wczogVmFsdWVNYXAuZnJvbU9iamVjdCh7XG4gICAgICAgICAgICAgICAgICAgIGRyYWdnaW5nU2NhbGU6IGdldFN1aXRhYmxlRHJhZ2dpbmdTY2FsZSh1bmRlZmluZWQsIHYpLFxuICAgICAgICAgICAgICAgICAgICBmb3JtYXR0ZXI6IChfYiA9IGFyZ3MucGFyYW1zLmZvcm1hdCkgIT09IG51bGwgJiYgX2IgIT09IHZvaWQgMCA/IF9iIDogbnVtYmVyVG9TdHJpbmcsXG4gICAgICAgICAgICAgICAgfSksXG4gICAgICAgICAgICAgICAgdmFsdWU6IGNyZWF0ZVZhbHVlKHYpLFxuICAgICAgICAgICAgICAgIHZpZXdQcm9wczogYXJncy52aWV3UHJvcHMsXG4gICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIHJldHVybiBuZXcgTGFiZWxlZFZhbHVlQ29udHJvbGxlcihhcmdzLmRvY3VtZW50LCB7XG4gICAgICAgICAgICAgICAgYmxhZGU6IGFyZ3MuYmxhZGUsXG4gICAgICAgICAgICAgICAgcHJvcHM6IFZhbHVlTWFwLmZyb21PYmplY3Qoe1xuICAgICAgICAgICAgICAgICAgICBsYWJlbDogYXJncy5wYXJhbXMubGFiZWwsXG4gICAgICAgICAgICAgICAgfSksXG4gICAgICAgICAgICAgICAgdmFsdWVDb250cm9sbGVyOiB2YyxcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9LFxuICAgICAgICBhcGkoYXJncykge1xuICAgICAgICAgICAgaWYgKCEoYXJncy5jb250cm9sbGVyIGluc3RhbmNlb2YgTGFiZWxlZFZhbHVlQ29udHJvbGxlcikpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gbnVsbDtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGlmICghKGFyZ3MuY29udHJvbGxlci52YWx1ZUNvbnRyb2xsZXIgaW5zdGFuY2VvZiBTbGlkZXJUZXh0Q29udHJvbGxlcikpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gbnVsbDtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHJldHVybiBuZXcgU2xpZGVyQXBpKGFyZ3MuY29udHJvbGxlcik7XG4gICAgICAgIH0sXG4gICAgfTtcblxuICAgIGNvbnN0IFRleHRCbGFkZVBsdWdpbiA9IChmdW5jdGlvbiAoKSB7XG4gICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICBpZDogJ3RleHQnLFxuICAgICAgICAgICAgdHlwZTogJ2JsYWRlJyxcbiAgICAgICAgICAgIGFjY2VwdChwYXJhbXMpIHtcbiAgICAgICAgICAgICAgICBjb25zdCBwID0gUGFyYW1zUGFyc2VycztcbiAgICAgICAgICAgICAgICBjb25zdCByZXN1bHQgPSBwYXJzZVBhcmFtcyhwYXJhbXMsIHtcbiAgICAgICAgICAgICAgICAgICAgcGFyc2U6IHAucmVxdWlyZWQuZnVuY3Rpb24sXG4gICAgICAgICAgICAgICAgICAgIHZhbHVlOiBwLnJlcXVpcmVkLnJhdyxcbiAgICAgICAgICAgICAgICAgICAgdmlldzogcC5yZXF1aXJlZC5jb25zdGFudCgndGV4dCcpLFxuICAgICAgICAgICAgICAgICAgICBmb3JtYXQ6IHAub3B0aW9uYWwuZnVuY3Rpb24sXG4gICAgICAgICAgICAgICAgICAgIGxhYmVsOiBwLm9wdGlvbmFsLnN0cmluZyxcbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICByZXR1cm4gcmVzdWx0ID8geyBwYXJhbXM6IHJlc3VsdCB9IDogbnVsbDtcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBjb250cm9sbGVyKGFyZ3MpIHtcbiAgICAgICAgICAgICAgICB2YXIgX2E7XG4gICAgICAgICAgICAgICAgY29uc3QgaWMgPSBuZXcgVGV4dENvbnRyb2xsZXIoYXJncy5kb2N1bWVudCwge1xuICAgICAgICAgICAgICAgICAgICBwYXJzZXI6IGFyZ3MucGFyYW1zLnBhcnNlLFxuICAgICAgICAgICAgICAgICAgICBwcm9wczogVmFsdWVNYXAuZnJvbU9iamVjdCh7XG4gICAgICAgICAgICAgICAgICAgICAgICBmb3JtYXR0ZXI6IChfYSA9IGFyZ3MucGFyYW1zLmZvcm1hdCkgIT09IG51bGwgJiYgX2EgIT09IHZvaWQgMCA/IF9hIDogKCh2KSA9PiBTdHJpbmcodikpLFxuICAgICAgICAgICAgICAgICAgICB9KSxcbiAgICAgICAgICAgICAgICAgICAgdmFsdWU6IGNyZWF0ZVZhbHVlKGFyZ3MucGFyYW1zLnZhbHVlKSxcbiAgICAgICAgICAgICAgICAgICAgdmlld1Byb3BzOiBhcmdzLnZpZXdQcm9wcyxcbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICByZXR1cm4gbmV3IExhYmVsZWRWYWx1ZUNvbnRyb2xsZXIoYXJncy5kb2N1bWVudCwge1xuICAgICAgICAgICAgICAgICAgICBibGFkZTogYXJncy5ibGFkZSxcbiAgICAgICAgICAgICAgICAgICAgcHJvcHM6IFZhbHVlTWFwLmZyb21PYmplY3Qoe1xuICAgICAgICAgICAgICAgICAgICAgICAgbGFiZWw6IGFyZ3MucGFyYW1zLmxhYmVsLFxuICAgICAgICAgICAgICAgICAgICB9KSxcbiAgICAgICAgICAgICAgICAgICAgdmFsdWVDb250cm9sbGVyOiBpYyxcbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBhcGkoYXJncykge1xuICAgICAgICAgICAgICAgIGlmICghKGFyZ3MuY29udHJvbGxlciBpbnN0YW5jZW9mIExhYmVsZWRWYWx1ZUNvbnRyb2xsZXIpKSB7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBudWxsO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBpZiAoIShhcmdzLmNvbnRyb2xsZXIudmFsdWVDb250cm9sbGVyIGluc3RhbmNlb2YgVGV4dENvbnRyb2xsZXIpKSB7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBudWxsO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICByZXR1cm4gbmV3IFRleHRBcGkoYXJncy5jb250cm9sbGVyKTtcbiAgICAgICAgICAgIH0sXG4gICAgICAgIH07XG4gICAgfSkoKTtcblxuICAgIGZ1bmN0aW9uIGNyZWF0ZURlZmF1bHRXcmFwcGVyRWxlbWVudChkb2MpIHtcbiAgICAgICAgY29uc3QgZWxlbSA9IGRvYy5jcmVhdGVFbGVtZW50KCdkaXYnKTtcbiAgICAgICAgZWxlbS5jbGFzc0xpc3QuYWRkKENsYXNzTmFtZSgnZGZ3JykoKSk7XG4gICAgICAgIGlmIChkb2MuYm9keSkge1xuICAgICAgICAgICAgZG9jLmJvZHkuYXBwZW5kQ2hpbGQoZWxlbSk7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIGVsZW07XG4gICAgfVxuICAgIGZ1bmN0aW9uIGVtYmVkU3R5bGUoZG9jLCBpZCwgY3NzKSB7XG4gICAgICAgIGlmIChkb2MucXVlcnlTZWxlY3Rvcihgc3R5bGVbZGF0YS10cC1zdHlsZT0ke2lkfV1gKSkge1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG4gICAgICAgIGNvbnN0IHN0eWxlRWxlbSA9IGRvYy5jcmVhdGVFbGVtZW50KCdzdHlsZScpO1xuICAgICAgICBzdHlsZUVsZW0uZGF0YXNldC50cFN0eWxlID0gaWQ7XG4gICAgICAgIHN0eWxlRWxlbS50ZXh0Q29udGVudCA9IGNzcztcbiAgICAgICAgZG9jLmhlYWQuYXBwZW5kQ2hpbGQoc3R5bGVFbGVtKTtcbiAgICB9XG4gICAgLyoqXG4gICAgICogVGhlIHJvb3QgcGFuZSBvZiBUd2Vha3BhbmUuXG4gICAgICovXG4gICAgY2xhc3MgUGFuZSBleHRlbmRzIFJvb3RBcGkge1xuICAgICAgICBjb25zdHJ1Y3RvcihvcHRfY29uZmlnKSB7XG4gICAgICAgICAgICB2YXIgX2E7XG4gICAgICAgICAgICBjb25zdCBjb25maWcgPSBvcHRfY29uZmlnIHx8IHt9O1xuICAgICAgICAgICAgY29uc3QgZG9jID0gKF9hID0gY29uZmlnLmRvY3VtZW50KSAhPT0gbnVsbCAmJiBfYSAhPT0gdm9pZCAwID8gX2EgOiBnZXRXaW5kb3dEb2N1bWVudCgpO1xuICAgICAgICAgICAgY29uc3QgcG9vbCA9IGNyZWF0ZURlZmF1bHRQbHVnaW5Qb29sKCk7XG4gICAgICAgICAgICBjb25zdCByb290Q29udHJvbGxlciA9IG5ldyBSb290Q29udHJvbGxlcihkb2MsIHtcbiAgICAgICAgICAgICAgICBleHBhbmRlZDogY29uZmlnLmV4cGFuZGVkLFxuICAgICAgICAgICAgICAgIGJsYWRlOiBjcmVhdGVCbGFkZSgpLFxuICAgICAgICAgICAgICAgIHByb3BzOiBWYWx1ZU1hcC5mcm9tT2JqZWN0KHtcbiAgICAgICAgICAgICAgICAgICAgdGl0bGU6IGNvbmZpZy50aXRsZSxcbiAgICAgICAgICAgICAgICB9KSxcbiAgICAgICAgICAgICAgICB2aWV3UHJvcHM6IFZpZXdQcm9wcy5jcmVhdGUoKSxcbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgc3VwZXIocm9vdENvbnRyb2xsZXIsIHBvb2wpO1xuICAgICAgICAgICAgdGhpcy5wb29sXyA9IHBvb2w7XG4gICAgICAgICAgICB0aGlzLmNvbnRhaW5lckVsZW1fID0gY29uZmlnLmNvbnRhaW5lciB8fCBjcmVhdGVEZWZhdWx0V3JhcHBlckVsZW1lbnQoZG9jKTtcbiAgICAgICAgICAgIHRoaXMuY29udGFpbmVyRWxlbV8uYXBwZW5kQ2hpbGQodGhpcy5lbGVtZW50KTtcbiAgICAgICAgICAgIHRoaXMuZG9jXyA9IGRvYztcbiAgICAgICAgICAgIHRoaXMudXNlc0RlZmF1bHRXcmFwcGVyXyA9ICFjb25maWcuY29udGFpbmVyO1xuICAgICAgICAgICAgdGhpcy5zZXRVcERlZmF1bHRQbHVnaW5zXygpO1xuICAgICAgICB9XG4gICAgICAgIGdldCBkb2N1bWVudCgpIHtcbiAgICAgICAgICAgIGlmICghdGhpcy5kb2NfKSB7XG4gICAgICAgICAgICAgICAgdGhyb3cgVHBFcnJvci5hbHJlYWR5RGlzcG9zZWQoKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHJldHVybiB0aGlzLmRvY187XG4gICAgICAgIH1cbiAgICAgICAgZGlzcG9zZSgpIHtcbiAgICAgICAgICAgIGNvbnN0IGNvbnRhaW5lckVsZW0gPSB0aGlzLmNvbnRhaW5lckVsZW1fO1xuICAgICAgICAgICAgaWYgKCFjb250YWluZXJFbGVtKSB7XG4gICAgICAgICAgICAgICAgdGhyb3cgVHBFcnJvci5hbHJlYWR5RGlzcG9zZWQoKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGlmICh0aGlzLnVzZXNEZWZhdWx0V3JhcHBlcl8pIHtcbiAgICAgICAgICAgICAgICBjb25zdCBwYXJlbnRFbGVtID0gY29udGFpbmVyRWxlbS5wYXJlbnRFbGVtZW50O1xuICAgICAgICAgICAgICAgIGlmIChwYXJlbnRFbGVtKSB7XG4gICAgICAgICAgICAgICAgICAgIHBhcmVudEVsZW0ucmVtb3ZlQ2hpbGQoY29udGFpbmVyRWxlbSk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgdGhpcy5jb250YWluZXJFbGVtXyA9IG51bGw7XG4gICAgICAgICAgICB0aGlzLmRvY18gPSBudWxsO1xuICAgICAgICAgICAgc3VwZXIuZGlzcG9zZSgpO1xuICAgICAgICB9XG4gICAgICAgIHJlZ2lzdGVyUGx1Z2luKGJ1bmRsZSkge1xuICAgICAgICAgICAgY29uc3QgcGx1Z2lucyA9ICdwbHVnaW4nIGluIGJ1bmRsZVxuICAgICAgICAgICAgICAgID8gW2J1bmRsZS5wbHVnaW5dXG4gICAgICAgICAgICAgICAgOiAncGx1Z2lucycgaW4gYnVuZGxlXG4gICAgICAgICAgICAgICAgICAgID8gYnVuZGxlLnBsdWdpbnNcbiAgICAgICAgICAgICAgICAgICAgOiBbXTtcbiAgICAgICAgICAgIHBsdWdpbnMuZm9yRWFjaCgocCkgPT4ge1xuICAgICAgICAgICAgICAgIHRoaXMucG9vbF8ucmVnaXN0ZXIocCk7XG4gICAgICAgICAgICAgICAgdGhpcy5lbWJlZFBsdWdpblN0eWxlXyhwKTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9XG4gICAgICAgIGVtYmVkUGx1Z2luU3R5bGVfKHBsdWdpbikge1xuICAgICAgICAgICAgaWYgKHBsdWdpbi5jc3MpIHtcbiAgICAgICAgICAgICAgICBlbWJlZFN0eWxlKHRoaXMuZG9jdW1lbnQsIGBwbHVnaW4tJHtwbHVnaW4uaWR9YCwgcGx1Z2luLmNzcyk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgc2V0VXBEZWZhdWx0UGx1Z2luc18oKSB7XG4gICAgICAgICAgICAvLyBOT1RFOiBUaGlzIHN0cmluZyBsaXRlcmFsIHdpbGwgYmUgcmVwbGFjZWQgd2l0aCB0aGUgZGVmYXVsdCBDU1MgYnkgUm9sbHVwIGF0IHRoZSBjb21waWxhdGlvbiB0aW1lXG4gICAgICAgICAgICBlbWJlZFN0eWxlKHRoaXMuZG9jdW1lbnQsICdkZWZhdWx0JywgJy50cC1sc3R2X3MsLnRwLWJ0bnZfYiwudHAtcDJkdl9iLC50cC1jb2xzd3Zfc3csLnRwLXAyZHB2X3AsLnRwLXR4dHZfaSwudHAtZ3Jsdl9nLC50cC1zZ2x2X2ksLnRwLW1sbHZfaSwudHAtZmxkdl9iLC50cC1yb3R2X2IsLnRwLWNrYnZfaSwudHAtY29sdHh0dl9tcywudHAtdGJpdl9iey13ZWJraXQtYXBwZWFyYW5jZTpub25lOy1tb3otYXBwZWFyYW5jZTpub25lO2FwcGVhcmFuY2U6bm9uZTtiYWNrZ3JvdW5kLWNvbG9yOnRyYW5zcGFyZW50O2JvcmRlci13aWR0aDowO2ZvbnQtZmFtaWx5OmluaGVyaXQ7Zm9udC1zaXplOmluaGVyaXQ7Zm9udC13ZWlnaHQ6aW5oZXJpdDttYXJnaW46MDtvdXRsaW5lOm5vbmU7cGFkZGluZzowfS50cC1sc3R2X3MsLnRwLWJ0bnZfYiwudHAtcDJkdl9ie2JhY2tncm91bmQtY29sb3I6dmFyKC0tYnRuLWJnKTtib3JkZXItcmFkaXVzOnZhcigtLWVsbS1icik7Y29sb3I6dmFyKC0tYnRuLWZnKTtjdXJzb3I6cG9pbnRlcjtkaXNwbGF5OmJsb2NrO2ZvbnQtd2VpZ2h0OmJvbGQ7aGVpZ2h0OnZhcigtLWJsZC11cyk7bGluZS1oZWlnaHQ6dmFyKC0tYmxkLXVzKTtvdmVyZmxvdzpoaWRkZW47dGV4dC1vdmVyZmxvdzplbGxpcHNpczt3aGl0ZS1zcGFjZTpub3dyYXB9LnRwLWxzdHZfczpob3ZlciwudHAtYnRudl9iOmhvdmVyLC50cC1wMmR2X2I6aG92ZXJ7YmFja2dyb3VuZC1jb2xvcjp2YXIoLS1idG4tYmctaCl9LnRwLWxzdHZfczpmb2N1cywudHAtYnRudl9iOmZvY3VzLC50cC1wMmR2X2I6Zm9jdXN7YmFja2dyb3VuZC1jb2xvcjp2YXIoLS1idG4tYmctZil9LnRwLWxzdHZfczphY3RpdmUsLnRwLWJ0bnZfYjphY3RpdmUsLnRwLXAyZHZfYjphY3RpdmV7YmFja2dyb3VuZC1jb2xvcjp2YXIoLS1idG4tYmctYSl9LnRwLWxzdHZfczpkaXNhYmxlZCwudHAtYnRudl9iOmRpc2FibGVkLC50cC1wMmR2X2I6ZGlzYWJsZWR7b3BhY2l0eTowLjV9LnRwLWNvbHN3dl9zdywudHAtcDJkcHZfcCwudHAtdHh0dl9pe2JhY2tncm91bmQtY29sb3I6dmFyKC0taW4tYmcpO2JvcmRlci1yYWRpdXM6dmFyKC0tZWxtLWJyKTtib3gtc2l6aW5nOmJvcmRlci1ib3g7Y29sb3I6dmFyKC0taW4tZmcpO2ZvbnQtZmFtaWx5OmluaGVyaXQ7aGVpZ2h0OnZhcigtLWJsZC11cyk7bGluZS1oZWlnaHQ6dmFyKC0tYmxkLXVzKTttaW4td2lkdGg6MDt3aWR0aDoxMDAlfS50cC1jb2xzd3Zfc3c6aG92ZXIsLnRwLXAyZHB2X3A6aG92ZXIsLnRwLXR4dHZfaTpob3ZlcntiYWNrZ3JvdW5kLWNvbG9yOnZhcigtLWluLWJnLWgpfS50cC1jb2xzd3Zfc3c6Zm9jdXMsLnRwLXAyZHB2X3A6Zm9jdXMsLnRwLXR4dHZfaTpmb2N1c3tiYWNrZ3JvdW5kLWNvbG9yOnZhcigtLWluLWJnLWYpfS50cC1jb2xzd3Zfc3c6YWN0aXZlLC50cC1wMmRwdl9wOmFjdGl2ZSwudHAtdHh0dl9pOmFjdGl2ZXtiYWNrZ3JvdW5kLWNvbG9yOnZhcigtLWluLWJnLWEpfS50cC1jb2xzd3Zfc3c6ZGlzYWJsZWQsLnRwLXAyZHB2X3A6ZGlzYWJsZWQsLnRwLXR4dHZfaTpkaXNhYmxlZHtvcGFjaXR5OjAuNX0udHAtZ3Jsdl9nLC50cC1zZ2x2X2ksLnRwLW1sbHZfaXtiYWNrZ3JvdW5kLWNvbG9yOnZhcigtLW1vLWJnKTtib3JkZXItcmFkaXVzOnZhcigtLWVsbS1icik7Ym94LXNpemluZzpib3JkZXItYm94O2NvbG9yOnZhcigtLW1vLWZnKTtoZWlnaHQ6dmFyKC0tYmxkLXVzKTt3aWR0aDoxMDAlfS50cC1yb3R2ey0tZm9udC1mYW1pbHk6IHZhcigtLXRwLWZvbnQtZmFtaWx5LCBSb2JvdG8gTW9ubyxTb3VyY2UgQ29kZSBQcm8sTWVubG8sQ291cmllcixtb25vc3BhY2UpOy0tYnMtYnI6IHZhcigtLXRwLWJhc2UtYm9yZGVyLXJhZGl1cywgNnB4KTstLWNudC1oLXA6IHZhcigtLXRwLWNvbnRhaW5lci1ob3Jpem9udGFsLXBhZGRpbmcsIDRweCk7LS1jbnQtdi1wOiB2YXIoLS10cC1jb250YWluZXItdmVydGljYWwtcGFkZGluZywgNHB4KTstLWVsbS1icjogdmFyKC0tdHAtZWxlbWVudC1ib3JkZXItcmFkaXVzLCAycHgpOy0tYmxkLXM6IHZhcigtLXRwLWJsYWRlLXNwYWNpbmcsIDRweCk7LS1ibGQtdXM6IHZhcigtLXRwLWJsYWRlLXVuaXQtc2l6ZSwgMjBweCk7LS1icy1iZzogdmFyKC0tdHAtYmFzZS1iYWNrZ3JvdW5kLWNvbG9yLCAjMmYzMTM3KTstLWJzLXNoOiB2YXIoLS10cC1iYXNlLXNoYWRvdy1jb2xvciwgcmdiYSgwLDAsMCwwLjIpKTstLWJ0bi1iZzogdmFyKC0tdHAtYnV0dG9uLWJhY2tncm91bmQtY29sb3IsICNhZGFmYjgpOy0tYnRuLWJnLWE6IHZhcigtLXRwLWJ1dHRvbi1iYWNrZ3JvdW5kLWNvbG9yLWFjdGl2ZSwgI2Q2ZDdkYik7LS1idG4tYmctZjogdmFyKC0tdHAtYnV0dG9uLWJhY2tncm91bmQtY29sb3ItZm9jdXMsICNjOGNhZDApOy0tYnRuLWJnLWg6IHZhcigtLXRwLWJ1dHRvbi1iYWNrZ3JvdW5kLWNvbG9yLWhvdmVyLCAjYmJiY2M0KTstLWJ0bi1mZzogdmFyKC0tdHAtYnV0dG9uLWZvcmVncm91bmQtY29sb3IsICMyZjMxMzcpOy0tY250LWJnOiB2YXIoLS10cC1jb250YWluZXItYmFja2dyb3VuZC1jb2xvciwgcmdiYSgxODcsMTg4LDE5NiwwLjEpKTstLWNudC1iZy1hOiB2YXIoLS10cC1jb250YWluZXItYmFja2dyb3VuZC1jb2xvci1hY3RpdmUsIHJnYmEoMTg3LDE4OCwxOTYsMC4yNSkpOy0tY250LWJnLWY6IHZhcigtLXRwLWNvbnRhaW5lci1iYWNrZ3JvdW5kLWNvbG9yLWZvY3VzLCByZ2JhKDE4NywxODgsMTk2LDAuMikpOy0tY250LWJnLWg6IHZhcigtLXRwLWNvbnRhaW5lci1iYWNrZ3JvdW5kLWNvbG9yLWhvdmVyLCByZ2JhKDE4NywxODgsMTk2LDAuMTUpKTstLWNudC1mZzogdmFyKC0tdHAtY29udGFpbmVyLWZvcmVncm91bmQtY29sb3IsICNiYmJjYzQpOy0taW4tYmc6IHZhcigtLXRwLWlucHV0LWJhY2tncm91bmQtY29sb3IsIHJnYmEoMCwwLDAsMC4yKSk7LS1pbi1iZy1hOiB2YXIoLS10cC1pbnB1dC1iYWNrZ3JvdW5kLWNvbG9yLWFjdGl2ZSwgcmdiYSgwLDAsMCwwLjM1KSk7LS1pbi1iZy1mOiB2YXIoLS10cC1pbnB1dC1iYWNrZ3JvdW5kLWNvbG9yLWZvY3VzLCByZ2JhKDAsMCwwLDAuMykpOy0taW4tYmctaDogdmFyKC0tdHAtaW5wdXQtYmFja2dyb3VuZC1jb2xvci1ob3ZlciwgcmdiYSgwLDAsMCwwLjI1KSk7LS1pbi1mZzogdmFyKC0tdHAtaW5wdXQtZm9yZWdyb3VuZC1jb2xvciwgI2JiYmNjNCk7LS1sYmwtZmc6IHZhcigtLXRwLWxhYmVsLWZvcmVncm91bmQtY29sb3IsIHJnYmEoMTg3LDE4OCwxOTYsMC43KSk7LS1tby1iZzogdmFyKC0tdHAtbW9uaXRvci1iYWNrZ3JvdW5kLWNvbG9yLCByZ2JhKDAsMCwwLDAuMikpOy0tbW8tZmc6IHZhcigtLXRwLW1vbml0b3ItZm9yZWdyb3VuZC1jb2xvciwgcmdiYSgxODcsMTg4LDE5NiwwLjcpKTstLWdydi1mZzogdmFyKC0tdHAtZ3Jvb3ZlLWZvcmVncm91bmQtY29sb3IsIHJnYmEoMCwwLDAsMC4yKSl9LnRwLWZsZHZfYz4udHAtY250di50cC12LWxzdCwudHAtdGFidl9jIC50cC1icmt2Pi50cC1jbnR2LnRwLXYtbHN0LC50cC1yb3R2X2M+LnRwLWNudHYudHAtdi1sc3R7bWFyZ2luLWJvdHRvbTpjYWxjKC0xICogdmFyKC0tY250LXYtcCkpfS50cC1mbGR2X2M+LnRwLWZsZHYudHAtdi1sc3QgLnRwLWZsZHZfYywudHAtdGFidl9jIC50cC1icmt2Pi50cC1mbGR2LnRwLXYtbHN0IC50cC1mbGR2X2MsLnRwLXJvdHZfYz4udHAtZmxkdi50cC12LWxzdCAudHAtZmxkdl9je2JvcmRlci1ib3R0b20tbGVmdC1yYWRpdXM6MH0udHAtZmxkdl9jPi50cC1mbGR2LnRwLXYtbHN0IC50cC1mbGR2X2IsLnRwLXRhYnZfYyAudHAtYnJrdj4udHAtZmxkdi50cC12LWxzdCAudHAtZmxkdl9iLC50cC1yb3R2X2M+LnRwLWZsZHYudHAtdi1sc3QgLnRwLWZsZHZfYntib3JkZXItYm90dG9tLWxlZnQtcmFkaXVzOjB9LnRwLWZsZHZfYz4qOm5vdCgudHAtdi1mc3QpLC50cC10YWJ2X2MgLnRwLWJya3Y+Kjpub3QoLnRwLXYtZnN0KSwudHAtcm90dl9jPio6bm90KC50cC12LWZzdCl7bWFyZ2luLXRvcDp2YXIoLS1ibGQtcyl9LnRwLWZsZHZfYz4udHAtc3Bydjpub3QoLnRwLXYtZnN0KSwudHAtdGFidl9jIC50cC1icmt2Pi50cC1zcHJ2Om5vdCgudHAtdi1mc3QpLC50cC1yb3R2X2M+LnRwLXNwcnY6bm90KC50cC12LWZzdCksLnRwLWZsZHZfYz4udHAtY250djpub3QoLnRwLXYtZnN0KSwudHAtdGFidl9jIC50cC1icmt2Pi50cC1jbnR2Om5vdCgudHAtdi1mc3QpLC50cC1yb3R2X2M+LnRwLWNudHY6bm90KC50cC12LWZzdCl7bWFyZ2luLXRvcDp2YXIoLS1jbnQtdi1wKX0udHAtZmxkdl9jPi50cC1zcHJ2Kyo6bm90KC50cC12LWhpZGRlbiksLnRwLXRhYnZfYyAudHAtYnJrdj4udHAtc3BydisqOm5vdCgudHAtdi1oaWRkZW4pLC50cC1yb3R2X2M+LnRwLXNwcnYrKjpub3QoLnRwLXYtaGlkZGVuKSwudHAtZmxkdl9jPi50cC1jbnR2Kyo6bm90KC50cC12LWhpZGRlbiksLnRwLXRhYnZfYyAudHAtYnJrdj4udHAtY250disqOm5vdCgudHAtdi1oaWRkZW4pLC50cC1yb3R2X2M+LnRwLWNudHYrKjpub3QoLnRwLXYtaGlkZGVuKXttYXJnaW4tdG9wOnZhcigtLWNudC12LXApfS50cC1mbGR2X2M+LnRwLXNwcnY6bm90KC50cC12LWhpZGRlbikrLnRwLXNwcnYsLnRwLXRhYnZfYyAudHAtYnJrdj4udHAtc3Bydjpub3QoLnRwLXYtaGlkZGVuKSsudHAtc3BydiwudHAtcm90dl9jPi50cC1zcHJ2Om5vdCgudHAtdi1oaWRkZW4pKy50cC1zcHJ2LC50cC1mbGR2X2M+LnRwLWNudHY6bm90KC50cC12LWhpZGRlbikrLnRwLWNudHYsLnRwLXRhYnZfYyAudHAtYnJrdj4udHAtY250djpub3QoLnRwLXYtaGlkZGVuKSsudHAtY250diwudHAtcm90dl9jPi50cC1jbnR2Om5vdCgudHAtdi1oaWRkZW4pKy50cC1jbnR2e21hcmdpbi10b3A6MH0udHAtZmxkdl9jPi50cC1jbnR2LC50cC10YWJ2X2MgLnRwLWJya3Y+LnRwLWNudHZ7bWFyZ2luLWxlZnQ6NHB4fS50cC1mbGR2X2M+LnRwLWZsZHY+LnRwLWZsZHZfYiwudHAtdGFidl9jIC50cC1icmt2Pi50cC1mbGR2Pi50cC1mbGR2X2J7Ym9yZGVyLXRvcC1sZWZ0LXJhZGl1czp2YXIoLS1lbG0tYnIpO2JvcmRlci1ib3R0b20tbGVmdC1yYWRpdXM6dmFyKC0tZWxtLWJyKX0udHAtZmxkdl9jPi50cC1mbGR2LnRwLWZsZHYtZXhwYW5kZWQ+LnRwLWZsZHZfYiwudHAtdGFidl9jIC50cC1icmt2Pi50cC1mbGR2LnRwLWZsZHYtZXhwYW5kZWQ+LnRwLWZsZHZfYntib3JkZXItYm90dG9tLWxlZnQtcmFkaXVzOjB9LnRwLWZsZHZfYyAudHAtZmxkdj4udHAtZmxkdl9jLC50cC10YWJ2X2MgLnRwLWJya3YgLnRwLWZsZHY+LnRwLWZsZHZfY3tib3JkZXItYm90dG9tLWxlZnQtcmFkaXVzOnZhcigtLWVsbS1icil9LnRwLWZsZHZfYz4udHAtdGFidj4udHAtdGFidl9pLC50cC10YWJ2X2MgLnRwLWJya3Y+LnRwLXRhYnY+LnRwLXRhYnZfaXtib3JkZXItdG9wLWxlZnQtcmFkaXVzOnZhcigtLWVsbS1icil9LnRwLWZsZHZfYyAudHAtdGFidj4udHAtdGFidl9jLC50cC10YWJ2X2MgLnRwLWJya3YgLnRwLXRhYnY+LnRwLXRhYnZfY3tib3JkZXItYm90dG9tLWxlZnQtcmFkaXVzOnZhcigtLWVsbS1icil9LnRwLWZsZHZfYiwudHAtcm90dl9ie2JhY2tncm91bmQtY29sb3I6dmFyKC0tY250LWJnKTtjb2xvcjp2YXIoLS1jbnQtZmcpO2N1cnNvcjpwb2ludGVyO2Rpc3BsYXk6YmxvY2s7aGVpZ2h0OmNhbGModmFyKC0tYmxkLXVzKSArIDRweCk7bGluZS1oZWlnaHQ6Y2FsYyh2YXIoLS1ibGQtdXMpICsgNHB4KTtvdmVyZmxvdzpoaWRkZW47cGFkZGluZy1sZWZ0OmNhbGModmFyKC0tY250LWgtcCkgKyA4cHgpO3BhZGRpbmctcmlnaHQ6Y2FsYygycHggKiAyICsgdmFyKC0tYmxkLXVzKSArIHZhcigtLWNudC1oLXApKTtwb3NpdGlvbjpyZWxhdGl2ZTt0ZXh0LWFsaWduOmxlZnQ7dGV4dC1vdmVyZmxvdzplbGxpcHNpczt3aGl0ZS1zcGFjZTpub3dyYXA7d2lkdGg6MTAwJTt0cmFuc2l0aW9uOmJvcmRlci1yYWRpdXMgLjJzIGVhc2UtaW4tb3V0IC4yc30udHAtZmxkdl9iOmhvdmVyLC50cC1yb3R2X2I6aG92ZXJ7YmFja2dyb3VuZC1jb2xvcjp2YXIoLS1jbnQtYmctaCl9LnRwLWZsZHZfYjpmb2N1cywudHAtcm90dl9iOmZvY3Vze2JhY2tncm91bmQtY29sb3I6dmFyKC0tY250LWJnLWYpfS50cC1mbGR2X2I6YWN0aXZlLC50cC1yb3R2X2I6YWN0aXZle2JhY2tncm91bmQtY29sb3I6dmFyKC0tY250LWJnLWEpfS50cC1mbGR2X2I6ZGlzYWJsZWQsLnRwLXJvdHZfYjpkaXNhYmxlZHtvcGFjaXR5OjAuNX0udHAtZmxkdl9tLC50cC1yb3R2X217YmFja2dyb3VuZDpsaW5lYXItZ3JhZGllbnQodG8gbGVmdCwgdmFyKC0tY250LWZnKSwgdmFyKC0tY250LWZnKSAycHgsIHRyYW5zcGFyZW50IDJweCwgdHJhbnNwYXJlbnQgNHB4LCB2YXIoLS1jbnQtZmcpIDRweCk7Ym9yZGVyLXJhZGl1czoycHg7Ym90dG9tOjA7Y29udGVudDpcXCdcXCc7ZGlzcGxheTpibG9jaztoZWlnaHQ6NnB4O3JpZ2h0OmNhbGModmFyKC0tY250LWgtcCkgKyAodmFyKC0tYmxkLXVzKSArIDRweCAtIDZweCkgLyAyIC0gMnB4KTttYXJnaW46YXV0bztvcGFjaXR5OjAuNTtwb3NpdGlvbjphYnNvbHV0ZTt0b3A6MDt0cmFuc2Zvcm06cm90YXRlKDkwZGVnKTt0cmFuc2l0aW9uOnRyYW5zZm9ybSAuMnMgZWFzZS1pbi1vdXQ7d2lkdGg6NnB4fS50cC1mbGR2LnRwLWZsZHYtZXhwYW5kZWQ+LnRwLWZsZHZfYj4udHAtZmxkdl9tLC50cC1yb3R2LnRwLXJvdHYtZXhwYW5kZWQgLnRwLXJvdHZfbXt0cmFuc2Zvcm06bm9uZX0udHAtZmxkdl9jLC50cC1yb3R2X2N7Ym94LXNpemluZzpib3JkZXItYm94O2hlaWdodDowO29wYWNpdHk6MDtvdmVyZmxvdzpoaWRkZW47cGFkZGluZy1ib3R0b206MDtwYWRkaW5nLXRvcDowO3Bvc2l0aW9uOnJlbGF0aXZlO3RyYW5zaXRpb246aGVpZ2h0IC4ycyBlYXNlLWluLW91dCxvcGFjaXR5IC4ycyBsaW5lYXIscGFkZGluZyAuMnMgZWFzZS1pbi1vdXR9LnRwLWZsZHYudHAtZmxkdi1jcGw6bm90KC50cC1mbGR2LWV4cGFuZGVkKT4udHAtZmxkdl9jLC50cC1yb3R2LnRwLXJvdHYtY3BsOm5vdCgudHAtcm90di1leHBhbmRlZCkgLnRwLXJvdHZfY3tkaXNwbGF5Om5vbmV9LnRwLWZsZHYudHAtZmxkdi1leHBhbmRlZD4udHAtZmxkdl9jLC50cC1yb3R2LnRwLXJvdHYtZXhwYW5kZWQgLnRwLXJvdHZfY3tvcGFjaXR5OjE7cGFkZGluZy1ib3R0b206dmFyKC0tY250LXYtcCk7cGFkZGluZy10b3A6dmFyKC0tY250LXYtcCk7dHJhbnNmb3JtOm5vbmU7b3ZlcmZsb3c6dmlzaWJsZTt0cmFuc2l0aW9uOmhlaWdodCAuMnMgZWFzZS1pbi1vdXQsb3BhY2l0eSAuMnMgbGluZWFyIC4ycyxwYWRkaW5nIC4ycyBlYXNlLWluLW91dH0udHAtY29sdHh0dl9tLC50cC1sc3R2e3Bvc2l0aW9uOnJlbGF0aXZlfS50cC1sc3R2X3N7cGFkZGluZzowIDIwcHggMCA0cHg7d2lkdGg6MTAwJX0udHAtY29sdHh0dl9tbSwudHAtbHN0dl9te2JvdHRvbTowO21hcmdpbjphdXRvO3BvaW50ZXItZXZlbnRzOm5vbmU7cG9zaXRpb246YWJzb2x1dGU7cmlnaHQ6MnB4O3RvcDowfS50cC1jb2x0eHR2X21tIHN2ZywudHAtbHN0dl9tIHN2Z3tib3R0b206MDtoZWlnaHQ6MTZweDttYXJnaW46YXV0bztwb3NpdGlvbjphYnNvbHV0ZTtyaWdodDowO3RvcDowO3dpZHRoOjE2cHh9LnRwLWNvbHR4dHZfbW0gc3ZnIHBhdGgsLnRwLWxzdHZfbSBzdmcgcGF0aHtmaWxsOmN1cnJlbnRDb2xvcn0udHAtY29sdHh0dl93LC50cC1wbmR0eHR2e2Rpc3BsYXk6ZmxleH0udHAtY29sdHh0dl9jLC50cC1wbmR0eHR2X2F7d2lkdGg6MTAwJX0udHAtY29sdHh0dl9jKy50cC1jb2x0eHR2X2MsLnRwLXBuZHR4dHZfYSsudHAtY29sdHh0dl9jLC50cC1jb2x0eHR2X2MrLnRwLXBuZHR4dHZfYSwudHAtcG5kdHh0dl9hKy50cC1wbmR0eHR2X2F7bWFyZ2luLWxlZnQ6MnB4fS50cC1idG52X2J7d2lkdGg6MTAwJX0udHAtYnRudl90e3RleHQtYWxpZ246Y2VudGVyfS50cC1ja2J2X2x7ZGlzcGxheTpibG9jaztwb3NpdGlvbjpyZWxhdGl2ZX0udHAtY2tidl9pe2xlZnQ6MDtvcGFjaXR5OjA7cG9zaXRpb246YWJzb2x1dGU7dG9wOjB9LnRwLWNrYnZfd3tiYWNrZ3JvdW5kLWNvbG9yOnZhcigtLWluLWJnKTtib3JkZXItcmFkaXVzOnZhcigtLWVsbS1icik7Y3Vyc29yOnBvaW50ZXI7ZGlzcGxheTpibG9jaztoZWlnaHQ6dmFyKC0tYmxkLXVzKTtwb3NpdGlvbjpyZWxhdGl2ZTt3aWR0aDp2YXIoLS1ibGQtdXMpfS50cC1ja2J2X3cgc3Zne2JvdHRvbTowO2Rpc3BsYXk6YmxvY2s7aGVpZ2h0OjE2cHg7bGVmdDowO21hcmdpbjphdXRvO29wYWNpdHk6MDtwb3NpdGlvbjphYnNvbHV0ZTtyaWdodDowO3RvcDowO3dpZHRoOjE2cHh9LnRwLWNrYnZfdyBzdmcgcGF0aHtmaWxsOm5vbmU7c3Ryb2tlOnZhcigtLWluLWZnKTtzdHJva2Utd2lkdGg6Mn0udHAtY2tidl9pOmhvdmVyKy50cC1ja2J2X3d7YmFja2dyb3VuZC1jb2xvcjp2YXIoLS1pbi1iZy1oKX0udHAtY2tidl9pOmZvY3VzKy50cC1ja2J2X3d7YmFja2dyb3VuZC1jb2xvcjp2YXIoLS1pbi1iZy1mKX0udHAtY2tidl9pOmFjdGl2ZSsudHAtY2tidl93e2JhY2tncm91bmQtY29sb3I6dmFyKC0taW4tYmctYSl9LnRwLWNrYnZfaTpjaGVja2VkKy50cC1ja2J2X3cgc3Zne29wYWNpdHk6MX0udHAtY2tidi50cC12LWRpc2FibGVkIC50cC1ja2J2X3d7b3BhY2l0eTowLjV9LnRwLWNvbHZ7cG9zaXRpb246cmVsYXRpdmV9LnRwLWNvbHZfaHtkaXNwbGF5OmZsZXh9LnRwLWNvbHZfc3tmbGV4LWdyb3c6MDtmbGV4LXNocmluazowO3dpZHRoOnZhcigtLWJsZC11cyl9LnRwLWNvbHZfdHtmbGV4OjE7bWFyZ2luLWxlZnQ6NHB4fS50cC1jb2x2X3B7aGVpZ2h0OjA7bWFyZ2luLXRvcDowO29wYWNpdHk6MDtvdmVyZmxvdzpoaWRkZW47dHJhbnNpdGlvbjpoZWlnaHQgLjJzIGVhc2UtaW4tb3V0LG9wYWNpdHkgLjJzIGxpbmVhcixtYXJnaW4gLjJzIGVhc2UtaW4tb3V0fS50cC1jb2x2LnRwLWNvbHYtY3BsIC50cC1jb2x2X3B7b3ZlcmZsb3c6dmlzaWJsZX0udHAtY29sdi50cC1jb2x2LWV4cGFuZGVkIC50cC1jb2x2X3B7bWFyZ2luLXRvcDp2YXIoLS1ibGQtcyk7b3BhY2l0eToxfS50cC1jb2x2IC50cC1wb3B2e2xlZnQ6Y2FsYygtMSAqIHZhcigtLWNudC1oLXApKTtyaWdodDpjYWxjKC0xICogdmFyKC0tY250LWgtcCkpO3RvcDp2YXIoLS1ibGQtdXMpfS50cC1jb2xwdl9oLC50cC1jb2xwdl9hcHttYXJnaW4tbGVmdDo2cHg7bWFyZ2luLXJpZ2h0OjZweH0udHAtY29scHZfaHttYXJnaW4tdG9wOnZhcigtLWJsZC1zKX0udHAtY29scHZfcmdie2Rpc3BsYXk6ZmxleDttYXJnaW4tdG9wOnZhcigtLWJsZC1zKTt3aWR0aDoxMDAlfS50cC1jb2xwdl9he2Rpc3BsYXk6ZmxleDttYXJnaW4tdG9wOnZhcigtLWNudC12LXApO3BhZGRpbmctdG9wOmNhbGModmFyKC0tY250LXYtcCkgKyAycHgpO3Bvc2l0aW9uOnJlbGF0aXZlfS50cC1jb2xwdl9hOmJlZm9yZXtiYWNrZ3JvdW5kLWNvbG9yOnZhcigtLWdydi1mZyk7Y29udGVudDpcXCdcXCc7aGVpZ2h0OjJweDtsZWZ0OmNhbGMoLTEgKiB2YXIoLS1jbnQtaC1wKSk7cG9zaXRpb246YWJzb2x1dGU7cmlnaHQ6Y2FsYygtMSAqIHZhcigtLWNudC1oLXApKTt0b3A6MH0udHAtY29scHZfYXB7YWxpZ24taXRlbXM6Y2VudGVyO2Rpc3BsYXk6ZmxleDtmbGV4OjN9LnRwLWNvbHB2X2F0e2ZsZXg6MTttYXJnaW4tbGVmdDo0cHh9LnRwLXN2cHZ7Ym9yZGVyLXJhZGl1czp2YXIoLS1lbG0tYnIpO291dGxpbmU6bm9uZTtvdmVyZmxvdzpoaWRkZW47cG9zaXRpb246cmVsYXRpdmV9LnRwLXN2cHZfY3tjdXJzb3I6Y3Jvc3NoYWlyO2Rpc3BsYXk6YmxvY2s7aGVpZ2h0OmNhbGModmFyKC0tYmxkLXVzKSAqIDQpO3dpZHRoOjEwMCV9LnRwLXN2cHZfbXtib3JkZXItcmFkaXVzOjEwMCU7Ym9yZGVyOnJnYmEoMjU1LDI1NSwyNTUsMC43NSkgc29saWQgMnB4O2JveC1zaXppbmc6Ym9yZGVyLWJveDtmaWx0ZXI6ZHJvcC1zaGFkb3coMCAwIDFweCByZ2JhKDAsMCwwLDAuMykpO2hlaWdodDoxMnB4O21hcmdpbi1sZWZ0Oi02cHg7bWFyZ2luLXRvcDotNnB4O3BvaW50ZXItZXZlbnRzOm5vbmU7cG9zaXRpb246YWJzb2x1dGU7d2lkdGg6MTJweH0udHAtc3Zwdjpmb2N1cyAudHAtc3Zwdl9te2JvcmRlci1jb2xvcjojZmZmfS50cC1ocGx2e2N1cnNvcjpwb2ludGVyO2hlaWdodDp2YXIoLS1ibGQtdXMpO291dGxpbmU6bm9uZTtwb3NpdGlvbjpyZWxhdGl2ZX0udHAtaHBsdl9je2JhY2tncm91bmQtaW1hZ2U6dXJsKGRhdGE6aW1hZ2UvcG5nO2Jhc2U2NCxpVkJPUncwS0dnb0FBQUFOU1VoRVVnQUFBRUFBQUFBQkNBWUFBQUJ1YmFnWEFBQUFRMGxFUVZRb1UyUDh6OER3bjBHQ2dRRURpMk9LL1JCZ1lIakJnSXBmb3ZGaDhqOFlCSWd6RkdReHVxRWdQaGFET1Q1Z09oUGtkQ3hPWmVCZytJREZaWmlHQWdDYVNTTVl0Y1JITGdBQUFBQkpSVTVFcmtKZ2dnPT0pO2JhY2tncm91bmQtcG9zaXRpb246bGVmdCB0b3A7YmFja2dyb3VuZC1yZXBlYXQ6bm8tcmVwZWF0O2JhY2tncm91bmQtc2l6ZToxMDAlIDEwMCU7Ym9yZGVyLXJhZGl1czoycHg7ZGlzcGxheTpibG9jaztoZWlnaHQ6NHB4O2xlZnQ6MDttYXJnaW4tdG9wOi0ycHg7cG9zaXRpb246YWJzb2x1dGU7dG9wOjUwJTt3aWR0aDoxMDAlfS50cC1ocGx2X217Ym9yZGVyLXJhZGl1czp2YXIoLS1lbG0tYnIpO2JvcmRlcjpyZ2JhKDI1NSwyNTUsMjU1LDAuNzUpIHNvbGlkIDJweDtib3gtc2hhZG93OjAgMCAycHggcmdiYSgwLDAsMCwwLjEpO2JveC1zaXppbmc6Ym9yZGVyLWJveDtoZWlnaHQ6MTJweDtsZWZ0OjUwJTttYXJnaW4tbGVmdDotNnB4O21hcmdpbi10b3A6LTZweDtwb2ludGVyLWV2ZW50czpub25lO3Bvc2l0aW9uOmFic29sdXRlO3RvcDo1MCU7d2lkdGg6MTJweH0udHAtaHBsdjpmb2N1cyAudHAtaHBsdl9te2JvcmRlci1jb2xvcjojZmZmfS50cC1hcGx2e2N1cnNvcjpwb2ludGVyO2hlaWdodDp2YXIoLS1ibGQtdXMpO291dGxpbmU6bm9uZTtwb3NpdGlvbjpyZWxhdGl2ZTt3aWR0aDoxMDAlfS50cC1hcGx2X2J7YmFja2dyb3VuZC1jb2xvcjojZmZmO2JhY2tncm91bmQtaW1hZ2U6bGluZWFyLWdyYWRpZW50KHRvIHRvcCByaWdodCwgI2RkZCAyNSUsIHRyYW5zcGFyZW50IDI1JSwgdHJhbnNwYXJlbnQgNzUlLCAjZGRkIDc1JSksbGluZWFyLWdyYWRpZW50KHRvIHRvcCByaWdodCwgI2RkZCAyNSUsIHRyYW5zcGFyZW50IDI1JSwgdHJhbnNwYXJlbnQgNzUlLCAjZGRkIDc1JSk7YmFja2dyb3VuZC1zaXplOjRweCA0cHg7YmFja2dyb3VuZC1wb3NpdGlvbjowIDAsMnB4IDJweDtib3JkZXItcmFkaXVzOjJweDtkaXNwbGF5OmJsb2NrO2hlaWdodDo0cHg7bGVmdDowO21hcmdpbi10b3A6LTJweDtvdmVyZmxvdzpoaWRkZW47cG9zaXRpb246YWJzb2x1dGU7dG9wOjUwJTt3aWR0aDoxMDAlfS50cC1hcGx2X2N7Ym90dG9tOjA7bGVmdDowO3Bvc2l0aW9uOmFic29sdXRlO3JpZ2h0OjA7dG9wOjB9LnRwLWFwbHZfbXtiYWNrZ3JvdW5kLWNvbG9yOiNmZmY7YmFja2dyb3VuZC1pbWFnZTpsaW5lYXItZ3JhZGllbnQodG8gdG9wIHJpZ2h0LCAjZGRkIDI1JSwgdHJhbnNwYXJlbnQgMjUlLCB0cmFuc3BhcmVudCA3NSUsICNkZGQgNzUlKSxsaW5lYXItZ3JhZGllbnQodG8gdG9wIHJpZ2h0LCAjZGRkIDI1JSwgdHJhbnNwYXJlbnQgMjUlLCB0cmFuc3BhcmVudCA3NSUsICNkZGQgNzUlKTtiYWNrZ3JvdW5kLXNpemU6MTJweCAxMnB4O2JhY2tncm91bmQtcG9zaXRpb246MCAwLDZweCA2cHg7Ym9yZGVyLXJhZGl1czp2YXIoLS1lbG0tYnIpO2JveC1zaGFkb3c6MCAwIDJweCByZ2JhKDAsMCwwLDAuMSk7aGVpZ2h0OjEycHg7bGVmdDo1MCU7bWFyZ2luLWxlZnQ6LTZweDttYXJnaW4tdG9wOi02cHg7b3ZlcmZsb3c6aGlkZGVuO3BvaW50ZXItZXZlbnRzOm5vbmU7cG9zaXRpb246YWJzb2x1dGU7dG9wOjUwJTt3aWR0aDoxMnB4fS50cC1hcGx2X3B7Ym9yZGVyLXJhZGl1czp2YXIoLS1lbG0tYnIpO2JvcmRlcjpyZ2JhKDI1NSwyNTUsMjU1LDAuNzUpIHNvbGlkIDJweDtib3gtc2l6aW5nOmJvcmRlci1ib3g7Ym90dG9tOjA7bGVmdDowO3Bvc2l0aW9uOmFic29sdXRlO3JpZ2h0OjA7dG9wOjB9LnRwLWFwbHY6Zm9jdXMgLnRwLWFwbHZfcHtib3JkZXItY29sb3I6I2ZmZn0udHAtY29sc3d2e2JhY2tncm91bmQtY29sb3I6I2ZmZjtiYWNrZ3JvdW5kLWltYWdlOmxpbmVhci1ncmFkaWVudCh0byB0b3AgcmlnaHQsICNkZGQgMjUlLCB0cmFuc3BhcmVudCAyNSUsIHRyYW5zcGFyZW50IDc1JSwgI2RkZCA3NSUpLGxpbmVhci1ncmFkaWVudCh0byB0b3AgcmlnaHQsICNkZGQgMjUlLCB0cmFuc3BhcmVudCAyNSUsIHRyYW5zcGFyZW50IDc1JSwgI2RkZCA3NSUpO2JhY2tncm91bmQtc2l6ZToxMHB4IDEwcHg7YmFja2dyb3VuZC1wb3NpdGlvbjowIDAsNXB4IDVweDtib3JkZXItcmFkaXVzOnZhcigtLWVsbS1icil9LnRwLWNvbHN3di50cC12LWRpc2FibGVke29wYWNpdHk6MC41fS50cC1jb2xzd3ZfYnstd2Via2l0LWFwcGVhcmFuY2U6bm9uZTstbW96LWFwcGVhcmFuY2U6bm9uZTthcHBlYXJhbmNlOm5vbmU7YmFja2dyb3VuZC1jb2xvcjp0cmFuc3BhcmVudDtib3JkZXItd2lkdGg6MDtjdXJzb3I6cG9pbnRlcjtkaXNwbGF5OmJsb2NrO2hlaWdodDp2YXIoLS1ibGQtdXMpO2xlZnQ6MDttYXJnaW46MDtvdXRsaW5lOm5vbmU7cGFkZGluZzowO3Bvc2l0aW9uOmFic29sdXRlO3RvcDowO3dpZHRoOnZhcigtLWJsZC11cyl9LnRwLWNvbHN3dl9iOmZvY3VzOjphZnRlcntib3JkZXI6cmdiYSgyNTUsMjU1LDI1NSwwLjc1KSBzb2xpZCAycHg7Ym9yZGVyLXJhZGl1czp2YXIoLS1lbG0tYnIpO2JvdHRvbTowO2NvbnRlbnQ6XFwnXFwnO2Rpc3BsYXk6YmxvY2s7bGVmdDowO3Bvc2l0aW9uOmFic29sdXRlO3JpZ2h0OjA7dG9wOjB9LnRwLWNvbHR4dHZ7ZGlzcGxheTpmbGV4O3dpZHRoOjEwMCV9LnRwLWNvbHR4dHZfbXttYXJnaW4tcmlnaHQ6NHB4fS50cC1jb2x0eHR2X21ze2JvcmRlci1yYWRpdXM6dmFyKC0tZWxtLWJyKTtjb2xvcjp2YXIoLS1sYmwtZmcpO2N1cnNvcjpwb2ludGVyO2hlaWdodDp2YXIoLS1ibGQtdXMpO2xpbmUtaGVpZ2h0OnZhcigtLWJsZC11cyk7cGFkZGluZzowIDE4cHggMCA0cHh9LnRwLWNvbHR4dHZfbXM6aG92ZXJ7YmFja2dyb3VuZC1jb2xvcjp2YXIoLS1pbi1iZy1oKX0udHAtY29sdHh0dl9tczpmb2N1c3tiYWNrZ3JvdW5kLWNvbG9yOnZhcigtLWluLWJnLWYpfS50cC1jb2x0eHR2X21zOmFjdGl2ZXtiYWNrZ3JvdW5kLWNvbG9yOnZhcigtLWluLWJnLWEpfS50cC1jb2x0eHR2X21te2NvbG9yOnZhcigtLWxibC1mZyl9LnRwLWNvbHR4dHZfd3tmbGV4OjF9LnRwLWRmd3Z7cG9zaXRpb246YWJzb2x1dGU7dG9wOjhweDtyaWdodDo4cHg7d2lkdGg6MjU2cHh9LnRwLWZsZHYudHAtZmxkdi1ub3QgLnRwLWZsZHZfYntkaXNwbGF5Om5vbmV9LnRwLWZsZHZfY3tib3JkZXItbGVmdDp2YXIoLS1jbnQtYmcpIHNvbGlkIDRweH0udHAtZmxkdl9iOmhvdmVyKy50cC1mbGR2X2N7Ym9yZGVyLWxlZnQtY29sb3I6dmFyKC0tY250LWJnLWgpfS50cC1mbGR2X2I6Zm9jdXMrLnRwLWZsZHZfY3tib3JkZXItbGVmdC1jb2xvcjp2YXIoLS1jbnQtYmctZil9LnRwLWZsZHZfYjphY3RpdmUrLnRwLWZsZHZfY3tib3JkZXItbGVmdC1jb2xvcjp2YXIoLS1jbnQtYmctYSl9LnRwLWdybHZ7cG9zaXRpb246cmVsYXRpdmV9LnRwLWdybHZfZ3tkaXNwbGF5OmJsb2NrO2hlaWdodDpjYWxjKHZhcigtLWJsZC11cykgKiAzKX0udHAtZ3Jsdl9nIHBvbHlsaW5le2ZpbGw6bm9uZTtzdHJva2U6dmFyKC0tbW8tZmcpO3N0cm9rZS1saW5lam9pbjpyb3VuZH0udHAtZ3Jsdl90e21hcmdpbi10b3A6LTRweDt0cmFuc2l0aW9uOmxlZnQgMC4wNXMsIHRvcCAwLjA1czt2aXNpYmlsaXR5OmhpZGRlbn0udHAtZ3Jsdl90LnRwLWdybHZfdC1he3Zpc2liaWxpdHk6dmlzaWJsZX0udHAtZ3Jsdl90LnRwLWdybHZfdC1pbnt0cmFuc2l0aW9uOm5vbmV9LnRwLWdybHYudHAtdi1kaXNhYmxlZCAudHAtZ3Jsdl9ne29wYWNpdHk6MC41fS50cC1ncmx2IC50cC10dHZ7YmFja2dyb3VuZC1jb2xvcjp2YXIoLS1tby1mZyl9LnRwLWdybHYgLnRwLXR0djo6YmVmb3Jle2JvcmRlci10b3AtY29sb3I6dmFyKC0tbW8tZmcpfS50cC1sYmx2e2FsaWduLWl0ZW1zOmNlbnRlcjtkaXNwbGF5OmZsZXg7bGluZS1oZWlnaHQ6MS4zO3BhZGRpbmctbGVmdDp2YXIoLS1jbnQtaC1wKTtwYWRkaW5nLXJpZ2h0OnZhcigtLWNudC1oLXApfS50cC1sYmx2LnRwLWxibHYtbm9se2Rpc3BsYXk6YmxvY2t9LnRwLWxibHZfbHtjb2xvcjp2YXIoLS1sYmwtZmcpO2ZsZXg6MTstd2Via2l0LWh5cGhlbnM6YXV0bzstbXMtaHlwaGVuczphdXRvO2h5cGhlbnM6YXV0bztvdmVyZmxvdzpoaWRkZW47cGFkZGluZy1sZWZ0OjRweDtwYWRkaW5nLXJpZ2h0OjE2cHh9LnRwLWxibHYudHAtdi1kaXNhYmxlZCAudHAtbGJsdl9se29wYWNpdHk6MC41fS50cC1sYmx2LnRwLWxibHYtbm9sIC50cC1sYmx2X2x7ZGlzcGxheTpub25lfS50cC1sYmx2X3Z7YWxpZ24tc2VsZjpmbGV4LXN0YXJ0O2ZsZXgtZ3JvdzowO2ZsZXgtc2hyaW5rOjA7d2lkdGg6MTYwcHh9LnRwLWxibHYudHAtbGJsdi1ub2wgLnRwLWxibHZfdnt3aWR0aDoxMDAlfS50cC1sc3R2X3N7cGFkZGluZzowIDIwcHggMCA0cHg7d2lkdGg6MTAwJX0udHAtbHN0dl9te2NvbG9yOnZhcigtLWJ0bi1mZyl9LnRwLXNnbHZfaXtwYWRkaW5nOjAgNHB4fS50cC1zZ2x2LnRwLXYtZGlzYWJsZWQgLnRwLXNnbHZfaXtvcGFjaXR5OjAuNX0udHAtbWxsdl9pe2Rpc3BsYXk6YmxvY2s7aGVpZ2h0OmNhbGModmFyKC0tYmxkLXVzKSAqIDMpO2xpbmUtaGVpZ2h0OnZhcigtLWJsZC11cyk7cGFkZGluZzowIDRweDtyZXNpemU6bm9uZTt3aGl0ZS1zcGFjZTpwcmV9LnRwLW1sbHYudHAtdi1kaXNhYmxlZCAudHAtbWxsdl9pe29wYWNpdHk6MC41fS50cC1wMmR2e3Bvc2l0aW9uOnJlbGF0aXZlfS50cC1wMmR2X2h7ZGlzcGxheTpmbGV4fS50cC1wMmR2X2J7aGVpZ2h0OnZhcigtLWJsZC11cyk7bWFyZ2luLXJpZ2h0OjRweDtwb3NpdGlvbjpyZWxhdGl2ZTt3aWR0aDp2YXIoLS1ibGQtdXMpfS50cC1wMmR2X2Igc3Zne2Rpc3BsYXk6YmxvY2s7aGVpZ2h0OjE2cHg7bGVmdDo1MCU7bWFyZ2luLWxlZnQ6LThweDttYXJnaW4tdG9wOi04cHg7cG9zaXRpb246YWJzb2x1dGU7dG9wOjUwJTt3aWR0aDoxNnB4fS50cC1wMmR2X2Igc3ZnIHBhdGh7c3Ryb2tlOmN1cnJlbnRDb2xvcjtzdHJva2Utd2lkdGg6Mn0udHAtcDJkdl9iIHN2ZyBjaXJjbGV7ZmlsbDpjdXJyZW50Q29sb3J9LnRwLXAyZHZfdHtmbGV4OjF9LnRwLXAyZHZfcHtoZWlnaHQ6MDttYXJnaW4tdG9wOjA7b3BhY2l0eTowO292ZXJmbG93OmhpZGRlbjt0cmFuc2l0aW9uOmhlaWdodCAuMnMgZWFzZS1pbi1vdXQsb3BhY2l0eSAuMnMgbGluZWFyLG1hcmdpbiAuMnMgZWFzZS1pbi1vdXR9LnRwLXAyZHYudHAtcDJkdi1leHBhbmRlZCAudHAtcDJkdl9we21hcmdpbi10b3A6dmFyKC0tYmxkLXMpO29wYWNpdHk6MX0udHAtcDJkdiAudHAtcG9wdntsZWZ0OmNhbGMoLTEgKiB2YXIoLS1jbnQtaC1wKSk7cmlnaHQ6Y2FsYygtMSAqIHZhcigtLWNudC1oLXApKTt0b3A6dmFyKC0tYmxkLXVzKX0udHAtcDJkcHZ7cGFkZGluZy1sZWZ0OmNhbGModmFyKC0tYmxkLXVzKSArIDRweCl9LnRwLXAyZHB2X3B7Y3Vyc29yOmNyb3NzaGFpcjtoZWlnaHQ6MDtvdmVyZmxvdzpoaWRkZW47cGFkZGluZy1ib3R0b206MTAwJTtwb3NpdGlvbjpyZWxhdGl2ZX0udHAtcDJkcHZfZ3tkaXNwbGF5OmJsb2NrO2hlaWdodDoxMDAlO2xlZnQ6MDtwb2ludGVyLWV2ZW50czpub25lO3Bvc2l0aW9uOmFic29sdXRlO3RvcDowO3dpZHRoOjEwMCV9LnRwLXAyZHB2X2F4e29wYWNpdHk6MC4xO3N0cm9rZTp2YXIoLS1pbi1mZyk7c3Ryb2tlLWRhc2hhcnJheToxfS50cC1wMmRwdl9se29wYWNpdHk6MC41O3N0cm9rZTp2YXIoLS1pbi1mZyk7c3Ryb2tlLWRhc2hhcnJheToxfS50cC1wMmRwdl9te2JvcmRlcjp2YXIoLS1pbi1mZykgc29saWQgMXB4O2JvcmRlci1yYWRpdXM6NTAlO2JveC1zaXppbmc6Ym9yZGVyLWJveDtoZWlnaHQ6NHB4O21hcmdpbi1sZWZ0Oi0ycHg7bWFyZ2luLXRvcDotMnB4O3Bvc2l0aW9uOmFic29sdXRlO3dpZHRoOjRweH0udHAtcDJkcHZfcDpmb2N1cyAudHAtcDJkcHZfbXtiYWNrZ3JvdW5kLWNvbG9yOnZhcigtLWluLWZnKTtib3JkZXItd2lkdGg6MH0udHAtcG9wdntiYWNrZ3JvdW5kLWNvbG9yOnZhcigtLWJzLWJnKTtib3JkZXItcmFkaXVzOjZweDtib3gtc2hhZG93OjAgMnB4IDRweCB2YXIoLS1icy1zaCk7ZGlzcGxheTpub25lO21heC13aWR0aDoxNjhweDtwYWRkaW5nOnZhcigtLWNudC12LXApIHZhcigtLWNudC1oLXApO3Bvc2l0aW9uOmFic29sdXRlO3Zpc2liaWxpdHk6aGlkZGVuO3otaW5kZXg6MTAwMH0udHAtcG9wdi50cC1wb3B2LXZ7ZGlzcGxheTpibG9jazt2aXNpYmlsaXR5OnZpc2libGV9LnRwLXNwcnZfcntiYWNrZ3JvdW5kLWNvbG9yOnZhcigtLWdydi1mZyk7Ym9yZGVyLXdpZHRoOjA7ZGlzcGxheTpibG9jaztoZWlnaHQ6MnB4O21hcmdpbjowO3dpZHRoOjEwMCV9LnRwLXNsZHYudHAtdi1kaXNhYmxlZHtvcGFjaXR5OjAuNX0udHAtc2xkdl90e2JveC1zaXppbmc6Ym9yZGVyLWJveDtjdXJzb3I6cG9pbnRlcjtoZWlnaHQ6dmFyKC0tYmxkLXVzKTttYXJnaW46MCA2cHg7b3V0bGluZTpub25lO3Bvc2l0aW9uOnJlbGF0aXZlfS50cC1zbGR2X3Q6OmJlZm9yZXtiYWNrZ3JvdW5kLWNvbG9yOnZhcigtLWluLWJnKTtib3JkZXItcmFkaXVzOjFweDtib3R0b206MDtjb250ZW50OlxcJ1xcJztkaXNwbGF5OmJsb2NrO2hlaWdodDoycHg7bGVmdDowO21hcmdpbjphdXRvO3Bvc2l0aW9uOmFic29sdXRlO3JpZ2h0OjA7dG9wOjB9LnRwLXNsZHZfa3toZWlnaHQ6MTAwJTtsZWZ0OjA7cG9zaXRpb246YWJzb2x1dGU7dG9wOjB9LnRwLXNsZHZfazo6YmVmb3Jle2JhY2tncm91bmQtY29sb3I6dmFyKC0taW4tZmcpO2JvcmRlci1yYWRpdXM6MXB4O2JvdHRvbTowO2NvbnRlbnQ6XFwnXFwnO2Rpc3BsYXk6YmxvY2s7aGVpZ2h0OjJweDtsZWZ0OjA7bWFyZ2luLWJvdHRvbTphdXRvO21hcmdpbi10b3A6YXV0bztwb3NpdGlvbjphYnNvbHV0ZTtyaWdodDowO3RvcDowfS50cC1zbGR2X2s6OmFmdGVye2JhY2tncm91bmQtY29sb3I6dmFyKC0tYnRuLWJnKTtib3JkZXItcmFkaXVzOnZhcigtLWVsbS1icik7Ym90dG9tOjA7Y29udGVudDpcXCdcXCc7ZGlzcGxheTpibG9jaztoZWlnaHQ6MTJweDttYXJnaW4tYm90dG9tOmF1dG87bWFyZ2luLXRvcDphdXRvO3Bvc2l0aW9uOmFic29sdXRlO3JpZ2h0Oi02cHg7dG9wOjA7d2lkdGg6MTJweH0udHAtc2xkdl90OmhvdmVyIC50cC1zbGR2X2s6OmFmdGVye2JhY2tncm91bmQtY29sb3I6dmFyKC0tYnRuLWJnLWgpfS50cC1zbGR2X3Q6Zm9jdXMgLnRwLXNsZHZfazo6YWZ0ZXJ7YmFja2dyb3VuZC1jb2xvcjp2YXIoLS1idG4tYmctZil9LnRwLXNsZHZfdDphY3RpdmUgLnRwLXNsZHZfazo6YWZ0ZXJ7YmFja2dyb3VuZC1jb2xvcjp2YXIoLS1idG4tYmctYSl9LnRwLXNsZHR4dHZ7ZGlzcGxheTpmbGV4fS50cC1zbGR0eHR2X3N7ZmxleDoyfS50cC1zbGR0eHR2X3R7ZmxleDoxO21hcmdpbi1sZWZ0OjRweH0udHAtdGFidi50cC12LWRpc2FibGVke29wYWNpdHk6MC41fS50cC10YWJ2X2l7YWxpZ24taXRlbXM6ZmxleC1lbmQ7ZGlzcGxheTpmbGV4O292ZXJmbG93OmhpZGRlbn0udHAtdGFidi50cC10YWJ2LW5vcCAudHAtdGFidl9pe2hlaWdodDpjYWxjKHZhcigtLWJsZC11cykgKyA0cHgpO3Bvc2l0aW9uOnJlbGF0aXZlfS50cC10YWJ2LnRwLXRhYnYtbm9wIC50cC10YWJ2X2k6OmJlZm9yZXtiYWNrZ3JvdW5kLWNvbG9yOnZhcigtLWNudC1iZyk7Ym90dG9tOjA7Y29udGVudDpcXCdcXCc7aGVpZ2h0OjJweDtsZWZ0OjA7cG9zaXRpb246YWJzb2x1dGU7cmlnaHQ6MH0udHAtdGFidl9je2JvcmRlci1sZWZ0OnZhcigtLWNudC1iZykgc29saWQgNHB4O3BhZGRpbmctYm90dG9tOnZhcigtLWNudC12LXApO3BhZGRpbmctdG9wOnZhcigtLWNudC12LXApfS50cC10Yml2e2ZsZXg6MTttaW4td2lkdGg6MDtwb3NpdGlvbjpyZWxhdGl2ZX0udHAtdGJpdisudHAtdGJpdnttYXJnaW4tbGVmdDoycHh9LnRwLXRiaXYrLnRwLXRiaXY6OmJlZm9yZXtiYWNrZ3JvdW5kLWNvbG9yOnZhcigtLWNudC1iZyk7Ym90dG9tOjA7Y29udGVudDpcXCdcXCc7aGVpZ2h0OjJweDtsZWZ0Oi0ycHg7cG9zaXRpb246YWJzb2x1dGU7d2lkdGg6MnB4fS50cC10Yml2X2J7YmFja2dyb3VuZC1jb2xvcjp2YXIoLS1jbnQtYmcpO2Rpc3BsYXk6YmxvY2s7cGFkZGluZy1sZWZ0OmNhbGModmFyKC0tY250LWgtcCkgKyA0cHgpO3BhZGRpbmctcmlnaHQ6Y2FsYyh2YXIoLS1jbnQtaC1wKSArIDRweCk7d2lkdGg6MTAwJX0udHAtdGJpdl9iOmhvdmVye2JhY2tncm91bmQtY29sb3I6dmFyKC0tY250LWJnLWgpfS50cC10Yml2X2I6Zm9jdXN7YmFja2dyb3VuZC1jb2xvcjp2YXIoLS1jbnQtYmctZil9LnRwLXRiaXZfYjphY3RpdmV7YmFja2dyb3VuZC1jb2xvcjp2YXIoLS1jbnQtYmctYSl9LnRwLXRiaXZfYjpkaXNhYmxlZHtvcGFjaXR5OjAuNX0udHAtdGJpdl90e2NvbG9yOnZhcigtLWNudC1mZyk7aGVpZ2h0OmNhbGModmFyKC0tYmxkLXVzKSArIDRweCk7bGluZS1oZWlnaHQ6Y2FsYyh2YXIoLS1ibGQtdXMpICsgNHB4KTtvcGFjaXR5OjAuNTtvdmVyZmxvdzpoaWRkZW47dGV4dC1vdmVyZmxvdzplbGxpcHNpc30udHAtdGJpdi50cC10Yml2LXNlbCAudHAtdGJpdl90e29wYWNpdHk6MX0udHAtdHh0dntwb3NpdGlvbjpyZWxhdGl2ZX0udHAtdHh0dl9pe3BhZGRpbmc6MCA0cHh9LnRwLXR4dHYudHAtdHh0di1mc3QgLnRwLXR4dHZfaXtib3JkZXItYm90dG9tLXJpZ2h0LXJhZGl1czowO2JvcmRlci10b3AtcmlnaHQtcmFkaXVzOjB9LnRwLXR4dHYudHAtdHh0di1taWQgLnRwLXR4dHZfaXtib3JkZXItcmFkaXVzOjB9LnRwLXR4dHYudHAtdHh0di1sc3QgLnRwLXR4dHZfaXtib3JkZXItYm90dG9tLWxlZnQtcmFkaXVzOjA7Ym9yZGVyLXRvcC1sZWZ0LXJhZGl1czowfS50cC10eHR2LnRwLXR4dHYtbnVtIC50cC10eHR2X2l7dGV4dC1hbGlnbjpyaWdodH0udHAtdHh0di50cC10eHR2LWRyZyAudHAtdHh0dl9pe29wYWNpdHk6MC4zfS50cC10eHR2X2t7Y3Vyc29yOnBvaW50ZXI7aGVpZ2h0OjEwMCU7bGVmdDotM3B4O3Bvc2l0aW9uOmFic29sdXRlO3RvcDowO3dpZHRoOjEycHh9LnRwLXR4dHZfazo6YmVmb3Jle2JhY2tncm91bmQtY29sb3I6dmFyKC0taW4tZmcpO2JvcmRlci1yYWRpdXM6MXB4O2JvdHRvbTowO2NvbnRlbnQ6XFwnXFwnO2hlaWdodDpjYWxjKHZhcigtLWJsZC11cykgLSA0cHgpO2xlZnQ6NTAlO21hcmdpbi1ib3R0b206YXV0bzttYXJnaW4tbGVmdDotMXB4O21hcmdpbi10b3A6YXV0bztvcGFjaXR5OjAuMTtwb3NpdGlvbjphYnNvbHV0ZTt0b3A6MDt0cmFuc2l0aW9uOmJvcmRlci1yYWRpdXMgMC4xcywgaGVpZ2h0IDAuMXMsIHRyYW5zZm9ybSAwLjFzLCB3aWR0aCAwLjFzO3dpZHRoOjJweH0udHAtdHh0dl9rOmhvdmVyOjpiZWZvcmUsLnRwLXR4dHYudHAtdHh0di1kcmcgLnRwLXR4dHZfazo6YmVmb3Jle29wYWNpdHk6MX0udHAtdHh0di50cC10eHR2LWRyZyAudHAtdHh0dl9rOjpiZWZvcmV7Ym9yZGVyLXJhZGl1czo1MCU7aGVpZ2h0OjRweDt0cmFuc2Zvcm06dHJhbnNsYXRlWCgtMXB4KTt3aWR0aDo0cHh9LnRwLXR4dHZfZ3tib3R0b206MDtkaXNwbGF5OmJsb2NrO2hlaWdodDo4cHg7bGVmdDo1MCU7bWFyZ2luOmF1dG87b3ZlcmZsb3c6dmlzaWJsZTtwb2ludGVyLWV2ZW50czpub25lO3Bvc2l0aW9uOmFic29sdXRlO3RvcDowO3Zpc2liaWxpdHk6aGlkZGVuO3dpZHRoOjEwMCV9LnRwLXR4dHYudHAtdHh0di1kcmcgLnRwLXR4dHZfZ3t2aXNpYmlsaXR5OnZpc2libGV9LnRwLXR4dHZfZ2J7ZmlsbDpub25lO3N0cm9rZTp2YXIoLS1pbi1mZyk7c3Ryb2tlLWRhc2hhcnJheToxfS50cC10eHR2X2doe2ZpbGw6bm9uZTtzdHJva2U6dmFyKC0taW4tZmcpfS50cC10eHR2IC50cC10dHZ7bWFyZ2luLWxlZnQ6NnB4O3Zpc2liaWxpdHk6aGlkZGVufS50cC10eHR2LnRwLXR4dHYtZHJnIC50cC10dHZ7dmlzaWJpbGl0eTp2aXNpYmxlfS50cC10dHZ7YmFja2dyb3VuZC1jb2xvcjp2YXIoLS1pbi1mZyk7Ym9yZGVyLXJhZGl1czp2YXIoLS1lbG0tYnIpO2NvbG9yOnZhcigtLWJzLWJnKTtwYWRkaW5nOjJweCA0cHg7cG9pbnRlci1ldmVudHM6bm9uZTtwb3NpdGlvbjphYnNvbHV0ZTt0cmFuc2Zvcm06dHJhbnNsYXRlKC01MCUsIC0xMDAlKX0udHAtdHR2OjpiZWZvcmV7Ym9yZGVyLWNvbG9yOnZhcigtLWluLWZnKSB0cmFuc3BhcmVudCB0cmFuc3BhcmVudCB0cmFuc3BhcmVudDtib3JkZXItc3R5bGU6c29saWQ7Ym9yZGVyLXdpZHRoOjJweDtib3gtc2l6aW5nOmJvcmRlci1ib3g7Y29udGVudDpcXCdcXCc7Zm9udC1zaXplOjAuOWVtO2hlaWdodDo0cHg7bGVmdDo1MCU7bWFyZ2luLWxlZnQ6LTJweDtwb3NpdGlvbjphYnNvbHV0ZTt0b3A6MTAwJTt3aWR0aDo0cHh9LnRwLXJvdHZ7YmFja2dyb3VuZC1jb2xvcjp2YXIoLS1icy1iZyk7Ym9yZGVyLXJhZGl1czp2YXIoLS1icy1icik7Ym94LXNoYWRvdzowIDJweCA0cHggdmFyKC0tYnMtc2gpO2ZvbnQtZmFtaWx5OnZhcigtLWZvbnQtZmFtaWx5KTtmb250LXNpemU6MTFweDtmb250LXdlaWdodDo1MDA7bGluZS1oZWlnaHQ6MTt0ZXh0LWFsaWduOmxlZnR9LnRwLXJvdHZfYntib3JkZXItYm90dG9tLWxlZnQtcmFkaXVzOnZhcigtLWJzLWJyKTtib3JkZXItYm90dG9tLXJpZ2h0LXJhZGl1czp2YXIoLS1icy1icik7Ym9yZGVyLXRvcC1sZWZ0LXJhZGl1czp2YXIoLS1icy1icik7Ym9yZGVyLXRvcC1yaWdodC1yYWRpdXM6dmFyKC0tYnMtYnIpO3BhZGRpbmctbGVmdDpjYWxjKDJweCAqIDIgKyB2YXIoLS1ibGQtdXMpICsgdmFyKC0tY250LWgtcCkpO3RleHQtYWxpZ246Y2VudGVyfS50cC1yb3R2LnRwLXJvdHYtZXhwYW5kZWQgLnRwLXJvdHZfYntib3JkZXItYm90dG9tLWxlZnQtcmFkaXVzOjA7Ym9yZGVyLWJvdHRvbS1yaWdodC1yYWRpdXM6MH0udHAtcm90di50cC1yb3R2LW5vdCAudHAtcm90dl9ie2Rpc3BsYXk6bm9uZX0udHAtcm90dl9jPi50cC1mbGR2LnRwLXYtbHN0Pi50cC1mbGR2X2MsLnRwLXJvdHZfYz4udHAtdGFidi50cC12LWxzdD4udHAtdGFidl9je2JvcmRlci1ib3R0b20tbGVmdC1yYWRpdXM6dmFyKC0tYnMtYnIpO2JvcmRlci1ib3R0b20tcmlnaHQtcmFkaXVzOnZhcigtLWJzLWJyKX0udHAtcm90dl9jPi50cC1mbGR2LnRwLXYtbHN0Om5vdCgudHAtZmxkdi1leHBhbmRlZCk+LnRwLWZsZHZfYntib3JkZXItYm90dG9tLWxlZnQtcmFkaXVzOnZhcigtLWJzLWJyKTtib3JkZXItYm90dG9tLXJpZ2h0LXJhZGl1czp2YXIoLS1icy1icil9LnRwLXJvdHZfYyAudHAtZmxkdi50cC12LXZsc3Q6bm90KC50cC1mbGR2LWV4cGFuZGVkKT4udHAtZmxkdl9ie2JvcmRlci1ib3R0b20tcmlnaHQtcmFkaXVzOnZhcigtLWJzLWJyKX0udHAtcm90di50cC1yb3R2LW5vdCAudHAtcm90dl9jPi50cC1mbGR2LnRwLXYtZnN0e21hcmdpbi10b3A6Y2FsYygtMSAqIHZhcigtLWNudC12LXApKX0udHAtcm90di50cC1yb3R2LW5vdCAudHAtcm90dl9jPi50cC1mbGR2LnRwLXYtZnN0Pi50cC1mbGR2X2J7Ym9yZGVyLXRvcC1sZWZ0LXJhZGl1czp2YXIoLS1icy1icik7Ym9yZGVyLXRvcC1yaWdodC1yYWRpdXM6dmFyKC0tYnMtYnIpfS50cC1yb3R2LnRwLXJvdHYtbm90IC50cC1yb3R2X2M+LnRwLXRhYnYudHAtdi1mc3R7bWFyZ2luLXRvcDpjYWxjKC0xICogdmFyKC0tY250LXYtcCkpfS50cC1yb3R2LnRwLXJvdHYtbm90IC50cC1yb3R2X2M+LnRwLXRhYnYudHAtdi1mc3Q+LnRwLXRhYnZfaXtib3JkZXItdG9wLWxlZnQtcmFkaXVzOnZhcigtLWJzLWJyKTtib3JkZXItdG9wLXJpZ2h0LXJhZGl1czp2YXIoLS1icy1icil9LnRwLXJvdHYudHAtdi1kaXNhYmxlZCwudHAtcm90diAudHAtdi1kaXNhYmxlZHtwb2ludGVyLWV2ZW50czpub25lfS50cC1yb3R2LnRwLXYtaGlkZGVuLC50cC1yb3R2IC50cC12LWhpZGRlbntkaXNwbGF5Om5vbmV9Jyk7XG4gICAgICAgICAgICB0aGlzLnBvb2xfLmdldEFsbCgpLmZvckVhY2goKHBsdWdpbikgPT4ge1xuICAgICAgICAgICAgICAgIHRoaXMuZW1iZWRQbHVnaW5TdHlsZV8ocGx1Z2luKTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgdGhpcy5yZWdpc3RlclBsdWdpbih7XG4gICAgICAgICAgICAgICAgcGx1Z2luczogW1xuICAgICAgICAgICAgICAgICAgICBTbGlkZXJCbGFkZVBsdWdpbixcbiAgICAgICAgICAgICAgICAgICAgTGlzdEJsYWRlUGx1Z2luLFxuICAgICAgICAgICAgICAgICAgICBUYWJCbGFkZVBsdWdpbixcbiAgICAgICAgICAgICAgICAgICAgVGV4dEJsYWRlUGx1Z2luLFxuICAgICAgICAgICAgICAgIF0sXG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIGNvbnN0IFZFUlNJT04gPSBuZXcgU2VtdmVyKCczLjAuNicpO1xuXG4gICAgZXhwb3J0cy5CbGFkZUFwaSA9IEJsYWRlQXBpO1xuICAgIGV4cG9ydHMuQnV0dG9uQXBpID0gQnV0dG9uQXBpO1xuICAgIGV4cG9ydHMuRm9sZGVyQXBpID0gRm9sZGVyQXBpO1xuICAgIGV4cG9ydHMuSW5wdXRCaW5kaW5nQXBpID0gSW5wdXRCaW5kaW5nQXBpO1xuICAgIGV4cG9ydHMuTGlzdEFwaSA9IExpc3RBcGk7XG4gICAgZXhwb3J0cy5Nb25pdG9yQmluZGluZ0FwaSA9IE1vbml0b3JCaW5kaW5nQXBpO1xuICAgIGV4cG9ydHMuUGFuZSA9IFBhbmU7XG4gICAgZXhwb3J0cy5TZXBhcmF0b3JBcGkgPSBTZXBhcmF0b3JBcGk7XG4gICAgZXhwb3J0cy5TbGlkZXJBcGkgPSBTbGlkZXJBcGk7XG4gICAgZXhwb3J0cy5UYWJBcGkgPSBUYWJBcGk7XG4gICAgZXhwb3J0cy5UYWJQYWdlQXBpID0gVGFiUGFnZUFwaTtcbiAgICBleHBvcnRzLlRleHRBcGkgPSBUZXh0QXBpO1xuICAgIGV4cG9ydHMuVHBDaGFuZ2VFdmVudCA9IFRwQ2hhbmdlRXZlbnQ7XG4gICAgZXhwb3J0cy5WRVJTSU9OID0gVkVSU0lPTjtcblxuICAgIE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCAnX19lc01vZHVsZScsIHsgdmFsdWU6IHRydWUgfSk7XG5cbn0pKSk7XG4iLCAiXG5pbXBvcnQgeyBQYW5lIH0gZnJvbSAndHdlYWtwYW5lJztcbmltcG9ydCBHYW1lIGZyb20gJ0VuZ2luZSc7XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIERlYnVnZ2VyIHtcbiAgICBzdGF0aWMgc3RhcnQoKSB7XG4gICAgICAgIGNvbnNvbGUubG9nKFwic3RhcnRpbmcgZGVidWdnZXIuXCIpO1xuICAgICAgICBjb25zdCBwYW5lID0gbmV3IFBhbmUoeyB0aXRsZTogXCJEZWJ1Z2dlclwiIH0pO1xuXG4gICAgICAgIEdhbWUub25VcGRhdGUoKCkgPT4gcGFuZS5yZWZyZXNoKCkpO1xuXG4gICAgICAgIGZvciAoY29uc3QgZW50aXR5IG9mIEdhbWUuZW50aXRpZXMpIHtcbiAgICAgICAgICAgIGNvbnN0IGZvbGRlciA9IChwYW5lIGFzIGFueSkuYWRkRm9sZGVyKHsgdGl0bGU6IGBcdUQ4M0RcdURDN0UgJHtbLi4uZW50aXR5LnRhZ3NdLmpvaW4oKX1gIH0pO1xuXG4gICAgICAgICAgICBmb3IgKGNvbnN0IFtjb21wb25lbnQsIGRhdGFdIG9mIGVudGl0eS5nZXRBbGxDb21wb25lbnRzKCkpIHtcbiAgICAgICAgICAgICAgICBjb25zdCBjb21wb25lbnRGb2xkZXIgPSBmb2xkZXIuYWRkRm9sZGVyKHsgdGl0bGU6IGBcdUQ4M0RcdURDRTYgJHtjb21wb25lbnQuY29uc3RydWN0b3IubmFtZX1gIH0pO1xuXG4gICAgICAgICAgICAgICAgY29uc3Qga2V5cyA9IE9iamVjdC5rZXlzKGRhdGEpO1xuXG4gICAgICAgICAgICAgICAgZm9yIChjb25zdCBrZXkgb2Yga2V5cykge1xuICAgICAgICAgICAgICAgICAgICB0cnkge1xuICAgICAgICAgICAgICAgICAgICAgICAgY29tcG9uZW50Rm9sZGVyLmFkZElucHV0KGRhdGEsIGtleSk7XG4gICAgICAgICAgICAgICAgICAgIH0gY2F0Y2ggKGUpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKGUpO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfVxufSJdLAogICJtYXBwaW5ncyI6ICI7Ozs7Ozs7O0FBQUE7QUFBQTtBQUNBLElBQUMsVUFBVSxRQUFRLFNBQVM7QUFDeEIsYUFBTyxZQUFZLFlBQVksT0FBTyxXQUFXLGNBQWMsUUFBUSxXQUN2RSxPQUFPLFdBQVcsY0FBYyxPQUFPLE1BQU0sT0FBTyxDQUFDLFlBQVksV0FDaEUsVUFBUyxP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
