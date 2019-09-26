"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.dispatchCallbacks = exports.registerExtension = exports.registerExtensionsFromGlobal = exports.getExtensions = void 0;

var _constant = require("../constant");

var _models = require("../models");

let extensions = {};

const getExtensions = () => extensions;

exports.getExtensions = getExtensions;

const registerExtensionsFromGlobal = () => {
  const {
    netteExts
  } = window;
  extensions = { ...netteExts,
    ...extensions
  };
};

exports.registerExtensionsFromGlobal = registerExtensionsFromGlobal;

const registerExtension = (id, extension) => {
  if (!id) throw new Error(_constant.errors.ext.register.missingId);
  if (!extension) throw new Error(_constant.errors.ext.register.missingExt);
  const {
    onInit
  } = extension;
  if (onInit) onInit(extension);
  extensions = { ...extensions,
    [id]: extension
  };
};

exports.registerExtension = registerExtension;

const getPayload = (type, extension, payload) => {
  if (type === _models.ExtensionCallbackType.init) return extension;

  if (type === _models.ExtensionCallbackType.before || type === _models.ExtensionCallbackType.success || type === _models.ExtensionCallbackType.complete || type === _models.ExtensionCallbackType.error) {
    return payload;
  }

  return {};
};

const dispatchCallbacks = (type, extension, payload) => {
  if (!type) throw new Error(_constant.errors.callbacks.missingCallbackType);

  if (Object.keys(extension).length > 0) {
    const callback = extension[type];
    if (callback) callback(getPayload(type, extension, payload));
    return;
  }

  const extsIds = Object.keys(extensions);
  const exsIdsLength = extsIds.length;
  if (exsIdsLength === 0) return;

  for (let i = -1; ++i < exsIdsLength;) {
    const extId = extsIds[i];
    const ext = extensions[extId];
    if (!ext || !ext[type]) return;
    const callback = ext[type];
    if (callback) callback(getPayload(type, extension, payload));
  }
};

exports.dispatchCallbacks = dispatchCallbacks;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9zZXJ2aWNlcy9leHRlbnNpb24udHMiXSwibmFtZXMiOlsiZXh0ZW5zaW9ucyIsImdldEV4dGVuc2lvbnMiLCJyZWdpc3RlckV4dGVuc2lvbnNGcm9tR2xvYmFsIiwibmV0dGVFeHRzIiwid2luZG93IiwicmVnaXN0ZXJFeHRlbnNpb24iLCJpZCIsImV4dGVuc2lvbiIsIkVycm9yIiwiZXJyb3JzIiwiZXh0IiwicmVnaXN0ZXIiLCJtaXNzaW5nSWQiLCJtaXNzaW5nRXh0Iiwib25Jbml0IiwiZ2V0UGF5bG9hZCIsInR5cGUiLCJwYXlsb2FkIiwiRXh0ZW5zaW9uQ2FsbGJhY2tUeXBlIiwiaW5pdCIsImJlZm9yZSIsInN1Y2Nlc3MiLCJjb21wbGV0ZSIsImVycm9yIiwiZGlzcGF0Y2hDYWxsYmFja3MiLCJjYWxsYmFja3MiLCJtaXNzaW5nQ2FsbGJhY2tUeXBlIiwiT2JqZWN0Iiwia2V5cyIsImxlbmd0aCIsImNhbGxiYWNrIiwiZXh0c0lkcyIsImV4c0lkc0xlbmd0aCIsImkiLCJleHRJZCJdLCJtYXBwaW5ncyI6Ijs7Ozs7OztBQUFBOztBQUNBOztBQU1BLElBQUlBLFVBQXNCLEdBQUcsRUFBN0I7O0FBRU8sTUFBTUMsYUFBYSxHQUFHLE1BQU1ELFVBQTVCOzs7O0FBRUEsTUFBTUUsNEJBQTRCLEdBQUcsTUFBTTtBQUNqRCxRQUFNO0FBQUVDLElBQUFBO0FBQUYsTUFBZ0JDLE1BQXRCO0FBQ0FKLEVBQUFBLFVBQVUsR0FBRyxFQUFFLEdBQUdHLFNBQUw7QUFBZ0IsT0FBR0g7QUFBbkIsR0FBYjtBQUNBLENBSE07Ozs7QUFLQSxNQUFNSyxpQkFBaUIsR0FBRyxDQUFDQyxFQUFELEVBQWFDLFNBQWIsS0FBc0M7QUFDdEUsTUFBSSxDQUFDRCxFQUFMLEVBQVMsTUFBTSxJQUFJRSxLQUFKLENBQVVDLGlCQUFPQyxHQUFQLENBQVdDLFFBQVgsQ0FBb0JDLFNBQTlCLENBQU47QUFDVCxNQUFJLENBQUNMLFNBQUwsRUFBZ0IsTUFBTSxJQUFJQyxLQUFKLENBQVVDLGlCQUFPQyxHQUFQLENBQVdDLFFBQVgsQ0FBb0JFLFVBQTlCLENBQU47QUFDaEIsUUFBTTtBQUFFQyxJQUFBQTtBQUFGLE1BQWFQLFNBQW5CO0FBRUEsTUFBSU8sTUFBSixFQUFZQSxNQUFNLENBQUNQLFNBQUQsQ0FBTjtBQUNaUCxFQUFBQSxVQUFVLEdBQUcsRUFBRSxHQUFHQSxVQUFMO0FBQWlCLEtBQUNNLEVBQUQsR0FBTUM7QUFBdkIsR0FBYjtBQUNBLENBUE07Ozs7QUFTUCxNQUFNUSxVQUFVLEdBQUcsQ0FBQ0MsSUFBRCxFQUE4QlQsU0FBOUIsRUFBb0RVLE9BQXBELEtBQXlFO0FBQzNGLE1BQUlELElBQUksS0FBS0UsOEJBQXNCQyxJQUFuQyxFQUF5QyxPQUFPWixTQUFQOztBQUN6QyxNQUNDUyxJQUFJLEtBQUtFLDhCQUFzQkUsTUFBL0IsSUFDQUosSUFBSSxLQUFLRSw4QkFBc0JHLE9BRC9CLElBRUFMLElBQUksS0FBS0UsOEJBQXNCSSxRQUYvQixJQUdBTixJQUFJLEtBQUtFLDhCQUFzQkssS0FKaEMsRUFLRTtBQUNELFdBQU9OLE9BQVA7QUFDQTs7QUFDRCxTQUFPLEVBQVA7QUFDQSxDQVhEOztBQWFPLE1BQU1PLGlCQUFpQixHQUFHLENBQUNSLElBQUQsRUFBOEJULFNBQTlCLEVBQW9EVSxPQUFwRCxLQUF5RTtBQUN6RyxNQUFJLENBQUNELElBQUwsRUFBVyxNQUFNLElBQUlSLEtBQUosQ0FBVUMsaUJBQU9nQixTQUFQLENBQWlCQyxtQkFBM0IsQ0FBTjs7QUFFWCxNQUFJQyxNQUFNLENBQUNDLElBQVAsQ0FBWXJCLFNBQVosRUFBdUJzQixNQUF2QixHQUFnQyxDQUFwQyxFQUF1QztBQUN0QyxVQUFNQyxRQUFRLEdBQUd2QixTQUFTLENBQUNTLElBQUQsQ0FBMUI7QUFDQSxRQUFJYyxRQUFKLEVBQWNBLFFBQVEsQ0FBQ2YsVUFBVSxDQUFDQyxJQUFELEVBQU9ULFNBQVAsRUFBa0JVLE9BQWxCLENBQVgsQ0FBUjtBQUNkO0FBQ0E7O0FBQ0QsUUFBTWMsT0FBTyxHQUFHSixNQUFNLENBQUNDLElBQVAsQ0FBWTVCLFVBQVosQ0FBaEI7QUFDQSxRQUFNZ0MsWUFBWSxHQUFHRCxPQUFPLENBQUNGLE1BQTdCO0FBRUEsTUFBSUcsWUFBWSxLQUFLLENBQXJCLEVBQXdCOztBQUN4QixPQUFLLElBQUlDLENBQUMsR0FBRyxDQUFDLENBQWQsRUFBaUIsRUFBRUEsQ0FBRixHQUFNRCxZQUF2QixHQUF1QztBQUN0QyxVQUFNRSxLQUFLLEdBQUdILE9BQU8sQ0FBQ0UsQ0FBRCxDQUFyQjtBQUNBLFVBQU12QixHQUFHLEdBQUdWLFVBQVUsQ0FBQ2tDLEtBQUQsQ0FBdEI7QUFFQSxRQUFJLENBQUN4QixHQUFELElBQVEsQ0FBQ0EsR0FBRyxDQUFDTSxJQUFELENBQWhCLEVBQXdCO0FBQ3hCLFVBQU1jLFFBQVEsR0FBR3BCLEdBQUcsQ0FBQ00sSUFBRCxDQUFwQjtBQUNBLFFBQUljLFFBQUosRUFBY0EsUUFBUSxDQUFDZixVQUFVLENBQUNDLElBQUQsRUFBT1QsU0FBUCxFQUFrQlUsT0FBbEIsQ0FBWCxDQUFSO0FBQ2Q7QUFDRCxDQXBCTSIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IGVycm9ycyB9IGZyb20gJ2NvbnN0YW50J1xyXG5pbXBvcnQgeyBFeHRlbnNpb25DYWxsYmFja1R5cGUgfSBmcm9tICdtb2RlbHMnXHJcbmltcG9ydCB7IEV4dGVuc2lvbiwgRXh0ZW5zaW9ucywgUmVxdWVzdFBheWxvYWREYXRhLCBQYXlsb2FkSW5jbHVkZWQgfSBmcm9tICd0eXBlcydcclxuXHJcbnR5cGUgUGF5bG9hZCA9IFBheWxvYWRJbmNsdWRlZCB8IEV4dGVuc2lvbiB8IFJlcXVlc3RQYXlsb2FkRGF0YSB8IHN0cmluZ1xyXG50eXBlIENhbGxiYWNrID0gKHBheWxvYWQ6IFBheWxvYWQpID0+IHZvaWRcclxuXHJcbmxldCBleHRlbnNpb25zOiBFeHRlbnNpb25zID0ge31cclxuXHJcbmV4cG9ydCBjb25zdCBnZXRFeHRlbnNpb25zID0gKCkgPT4gZXh0ZW5zaW9uc1xyXG5cclxuZXhwb3J0IGNvbnN0IHJlZ2lzdGVyRXh0ZW5zaW9uc0Zyb21HbG9iYWwgPSAoKSA9PiB7XHJcblx0Y29uc3QgeyBuZXR0ZUV4dHMgfSA9IHdpbmRvd1xyXG5cdGV4dGVuc2lvbnMgPSB7IC4uLm5ldHRlRXh0cywgLi4uZXh0ZW5zaW9ucyB9XHJcbn1cclxuXHJcbmV4cG9ydCBjb25zdCByZWdpc3RlckV4dGVuc2lvbiA9IChpZDogc3RyaW5nLCBleHRlbnNpb246IEV4dGVuc2lvbikgPT4ge1xyXG5cdGlmICghaWQpIHRocm93IG5ldyBFcnJvcihlcnJvcnMuZXh0LnJlZ2lzdGVyLm1pc3NpbmdJZClcclxuXHRpZiAoIWV4dGVuc2lvbikgdGhyb3cgbmV3IEVycm9yKGVycm9ycy5leHQucmVnaXN0ZXIubWlzc2luZ0V4dClcclxuXHRjb25zdCB7IG9uSW5pdCB9ID0gZXh0ZW5zaW9uXHJcblxyXG5cdGlmIChvbkluaXQpIG9uSW5pdChleHRlbnNpb24pXHJcblx0ZXh0ZW5zaW9ucyA9IHsgLi4uZXh0ZW5zaW9ucywgW2lkXTogZXh0ZW5zaW9uIH1cclxufVxyXG5cclxuY29uc3QgZ2V0UGF5bG9hZCA9ICh0eXBlOiBFeHRlbnNpb25DYWxsYmFja1R5cGUsIGV4dGVuc2lvbjogRXh0ZW5zaW9uLCBwYXlsb2FkOiBQYXlsb2FkKSA9PiB7XHJcblx0aWYgKHR5cGUgPT09IEV4dGVuc2lvbkNhbGxiYWNrVHlwZS5pbml0KSByZXR1cm4gZXh0ZW5zaW9uXHJcblx0aWYgKFxyXG5cdFx0dHlwZSA9PT0gRXh0ZW5zaW9uQ2FsbGJhY2tUeXBlLmJlZm9yZSB8fFxyXG5cdFx0dHlwZSA9PT0gRXh0ZW5zaW9uQ2FsbGJhY2tUeXBlLnN1Y2Nlc3MgfHxcclxuXHRcdHR5cGUgPT09IEV4dGVuc2lvbkNhbGxiYWNrVHlwZS5jb21wbGV0ZSB8fFxyXG5cdFx0dHlwZSA9PT0gRXh0ZW5zaW9uQ2FsbGJhY2tUeXBlLmVycm9yXHJcblx0KSB7XHJcblx0XHRyZXR1cm4gcGF5bG9hZFxyXG5cdH1cclxuXHRyZXR1cm4ge31cclxufVxyXG5cclxuZXhwb3J0IGNvbnN0IGRpc3BhdGNoQ2FsbGJhY2tzID0gKHR5cGU6IEV4dGVuc2lvbkNhbGxiYWNrVHlwZSwgZXh0ZW5zaW9uOiBFeHRlbnNpb24sIHBheWxvYWQ6IFBheWxvYWQpID0+IHtcclxuXHRpZiAoIXR5cGUpIHRocm93IG5ldyBFcnJvcihlcnJvcnMuY2FsbGJhY2tzLm1pc3NpbmdDYWxsYmFja1R5cGUpXHJcblxyXG5cdGlmIChPYmplY3Qua2V5cyhleHRlbnNpb24pLmxlbmd0aCA+IDApIHtcclxuXHRcdGNvbnN0IGNhbGxiYWNrID0gZXh0ZW5zaW9uW3R5cGVdIGFzIENhbGxiYWNrXHJcblx0XHRpZiAoY2FsbGJhY2spIGNhbGxiYWNrKGdldFBheWxvYWQodHlwZSwgZXh0ZW5zaW9uLCBwYXlsb2FkKSlcclxuXHRcdHJldHVyblxyXG5cdH1cclxuXHRjb25zdCBleHRzSWRzID0gT2JqZWN0LmtleXMoZXh0ZW5zaW9ucylcclxuXHRjb25zdCBleHNJZHNMZW5ndGggPSBleHRzSWRzLmxlbmd0aFxyXG5cclxuXHRpZiAoZXhzSWRzTGVuZ3RoID09PSAwKSByZXR1cm5cclxuXHRmb3IgKGxldCBpID0gLTE7ICsraSA8IGV4c0lkc0xlbmd0aDsgKSB7XHJcblx0XHRjb25zdCBleHRJZCA9IGV4dHNJZHNbaV1cclxuXHRcdGNvbnN0IGV4dCA9IGV4dGVuc2lvbnNbZXh0SWRdXHJcblxyXG5cdFx0aWYgKCFleHQgfHwgIWV4dFt0eXBlXSkgcmV0dXJuXHJcblx0XHRjb25zdCBjYWxsYmFjayA9IGV4dFt0eXBlXSBhcyBDYWxsYmFja1xyXG5cdFx0aWYgKGNhbGxiYWNrKSBjYWxsYmFjayhnZXRQYXlsb2FkKHR5cGUsIGV4dGVuc2lvbiwgcGF5bG9hZCkpXHJcblx0fVxyXG59XHJcbiJdfQ==