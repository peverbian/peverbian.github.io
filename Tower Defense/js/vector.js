function Vector2d(x, y) {
  this.x = x || 0;
  this.y = y || 0;
}

Vector2d.prototype = {
  negative: function() {
    return new Vector2d(-this.x, -this.y);
  },
  add: function(v) {
    if (v instanceof Vector2d) return new Vector2d(this.x + v.x, this.y + v.y);
    else return new Vector2d(this.x + v, this.y + v);
  },
  subtract: function(v) {
    if (v instanceof Vector2d) return new Vector2d(this.x - v.x, this.y - v.y);
    else return new Vector2d(this.x - v, this.y - v);
  },
  multiply: function(v) {
    if (v instanceof Vector2d) return new Vector2d(this.x * v.x, this.y * v.y);
    else return new Vector2d(this.x * v, this.y * v);
  },
  divide: function(v) {
    if (v instanceof Vector2d) return new Vector2d(this.x / v.x, this.y / v.y);
    else return new Vector2d(this.x / v, this.y / v);
  },
  equals: function(v) {
    return this.x == v.x && this.y == v.y;
  },
  dot: function(v) {
    return this.x * v.x + this.y * v.y;
  },
  length: function() {
    return Math.sqrt(this.dot(this));
  },
  lengthSqr: function() {
    return this.dot(this);
  },
  unit: function() {
    return this.divide(this.length());
  },
  min: function() {
    return Math.min(this.x, this.y);
  },
  max: function() {
    return Math.max(this.x, this.y);
  },
  toAngles: function() {
    return Math.atan2(this.y, this.x);
  },
  angleTo: function(a) {
    return Math.acos(this.dot(a) / (this.length() * a.length()));
  },
  toArray: function(n) {
    return [this.x, this.y].slice(0, n || 2);
  },
  clone: function() {
    return new Vector2d(this.x, this.y);
  },
  init: function(x, y) {
    this.x = x; this.y = y;
    return this;
  }
};
Vector2d.negative = function(a, b) {
  b.x = -a.x; b.y = -a.y;
  return b;
};
Vector2d.add = function(a, b, c) {
  if (b instanceof Vector2d) { c.x = a.x + b.x; c.y = a.y + b.y;}
  else { c.x = a.x + b; c.y = a.y + b;}
  return c;
};
Vector2d.subtract = function(a, b, c) {
  if (b instanceof Vector2d) { c.x = a.x - b.x; c.y = a.y - b.y;}
  else { c.x = a.x - b; c.y = a.y - b;}
  return c;
};
Vector2d.multiply = function(a, b, c) {
  if (b instanceof Vector2d) { c.x = a.x * b.x; c.y = a.y * b.y;}
  else { c.x = a.x * b; c.y = a.y * b;}
  return c;
};
Vector2d.divide = function(a, b, c) {
  if (b instanceof Vector2d) { c.x = a.x / b.x; c.y = a.y / b.y;}
  else { c.x = a.x / b; c.y = a.y / b;}
  return c;
};
Vector2d.unit = function(a, b) {
  var length = a.length();
  b.x = a.x / length;
  b.y = a.y / length;
  return b;
};
Vector2d.fromAngles = function(theta) {
  return new Vector2d(Math.cos(theta), Math.sin(theta));
};
Vector2d.randomDirection = function() {
  return Vector2d.fromAngles(Math.random() * Math.PI * 2);
};
Vector2d.min = function(a, b) {
  return new Vector2d(Math.min(a.x, b.x), Math.min(a.y, b.y));
};
Vector2d.max = function(a, b) {
  return new Vector2d(Math.max(a.x, b.x), Math.max(a.y, b.y));
};
Vector2d.angleBetween = function(a, b) {
  return a.angleTo(b);
};

function getDistanceSqr(a, b) {
  return (((a.x-b.x) * (a.x - b.x)) + ((a.y - b.y) * (a.y-b.y)));
} 