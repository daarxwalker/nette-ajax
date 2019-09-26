"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getUrlByHandler = void 0;

var _models = require("../models");

var _ = require("./");

const getUrlByHandler = handler => {
  const tagName = (0, _.getTagNameByElement)(handler);
  if (!tagName) return null;

  switch (tagName) {
    case _models.Tag.form:
      return handler.getAttribute('action');

    case _models.Tag.link:
      return handler.getAttribute('href');

    default:
      return null;
  }
};

exports.getUrlByHandler = getUrlByHandler;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy91dGlscy9hdHRyaWJ1dGUudHMiXSwibmFtZXMiOlsiZ2V0VXJsQnlIYW5kbGVyIiwiaGFuZGxlciIsInRhZ05hbWUiLCJUYWciLCJmb3JtIiwiZ2V0QXR0cmlidXRlIiwibGluayJdLCJtYXBwaW5ncyI6Ijs7Ozs7OztBQUFBOztBQUNBOztBQUVPLE1BQU1BLGVBQWUsR0FBSUMsT0FBRCxJQUFzQjtBQUNwRCxRQUFNQyxPQUFPLEdBQUcsMkJBQW9CRCxPQUFwQixDQUFoQjtBQUVBLE1BQUksQ0FBQ0MsT0FBTCxFQUFjLE9BQU8sSUFBUDs7QUFDZCxVQUFRQSxPQUFSO0FBQ0MsU0FBS0MsWUFBSUMsSUFBVDtBQUNDLGFBQU9ILE9BQU8sQ0FBQ0ksWUFBUixDQUFxQixRQUFyQixDQUFQOztBQUNELFNBQUtGLFlBQUlHLElBQVQ7QUFDQyxhQUFPTCxPQUFPLENBQUNJLFlBQVIsQ0FBcUIsTUFBckIsQ0FBUDs7QUFDRDtBQUNDLGFBQU8sSUFBUDtBQU5GO0FBUUEsQ0FaTSIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IFRhZyB9IGZyb20gJ21vZGVscydcclxuaW1wb3J0IHsgZ2V0VGFnTmFtZUJ5RWxlbWVudCB9IGZyb20gJ3V0aWxzJ1xyXG5cclxuZXhwb3J0IGNvbnN0IGdldFVybEJ5SGFuZGxlciA9IChoYW5kbGVyOiBFbGVtZW50KSA9PiB7XHJcblx0Y29uc3QgdGFnTmFtZSA9IGdldFRhZ05hbWVCeUVsZW1lbnQoaGFuZGxlcilcclxuXHJcblx0aWYgKCF0YWdOYW1lKSByZXR1cm4gbnVsbFxyXG5cdHN3aXRjaCAodGFnTmFtZSkge1xyXG5cdFx0Y2FzZSBUYWcuZm9ybTpcclxuXHRcdFx0cmV0dXJuIGhhbmRsZXIuZ2V0QXR0cmlidXRlKCdhY3Rpb24nKVxyXG5cdFx0Y2FzZSBUYWcubGluazpcclxuXHRcdFx0cmV0dXJuIGhhbmRsZXIuZ2V0QXR0cmlidXRlKCdocmVmJylcclxuXHRcdGRlZmF1bHQ6XHJcblx0XHRcdHJldHVybiBudWxsXHJcblx0fVxyXG59XHJcbiJdfQ==