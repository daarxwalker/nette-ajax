"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _services = require("./services");

const netteAjax = {
  ext: _services.registerExtension,
  init: _services.init,
  request: _services.makeRequest
};
window.netteAjax = netteAjax;
var _default = netteAjax;
exports.default = _default;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy9pbmRleC50cyJdLCJuYW1lcyI6WyJuZXR0ZUFqYXgiLCJleHQiLCJyZWdpc3RlckV4dGVuc2lvbiIsImluaXQiLCJyZXF1ZXN0IiwibWFrZVJlcXVlc3QiLCJ3aW5kb3ciXSwibWFwcGluZ3MiOiI7Ozs7Ozs7QUFBQTs7QUFFQSxNQUFNQSxTQUFTLEdBQUc7QUFDakJDLEVBQUFBLEdBQUcsRUFBRUMsMkJBRFk7QUFFakJDLEVBQUFBLElBQUksRUFBSkEsY0FGaUI7QUFHakJDLEVBQUFBLE9BQU8sRUFBRUM7QUFIUSxDQUFsQjtBQU1BQyxNQUFNLENBQUNOLFNBQVAsR0FBbUJBLFNBQW5CO2VBRWVBLFMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBtYWtlUmVxdWVzdCwgcmVnaXN0ZXJFeHRlbnNpb24sIGluaXQgfSBmcm9tICdzZXJ2aWNlcydcclxuXHJcbmNvbnN0IG5ldHRlQWpheCA9IHtcclxuXHRleHQ6IHJlZ2lzdGVyRXh0ZW5zaW9uLFxyXG5cdGluaXQsXHJcblx0cmVxdWVzdDogbWFrZVJlcXVlc3QsXHJcbn1cclxuXHJcbndpbmRvdy5uZXR0ZUFqYXggPSBuZXR0ZUFqYXhcclxuXHJcbmV4cG9ydCBkZWZhdWx0IG5ldHRlQWpheFxyXG4iXX0=