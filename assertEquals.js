// Replace const and arrow functions DONE
var assertEquals = (expected, actual, description) => {
  try {
    deepEquals(expected, actual);
  } catch (error) {
    throw new Error((description ? description + ": " : "") + error.message);
  }
};

// Replace default parameter values DONE
var deepEquals = (a, b, trace) => {
  if (!trace) {
    trace = "";
  }
  // Replace let DONe
  var typeA = getType(a);
  var typeB = getType(b);

  if (typeA === "undefined" && typeB !== "undefined")
    // Replace template literal DONE
    throw new Error("Found" + trace + ", none expected");

  if (typeB === "undefined" && typeA !== "undefined")
    throw new Error("Expected " + trace + ", but was not found");

  if (typeA !== typeB)
    throw new Error(
      "Expected type " + getType(a) + ", but found type " + getType(b)
    );

  if (typeof a !== "object" && a !== b)
    throw new Error(
      "Expected" + trace
        ? trace + " "
        : "" + JSON.stringify(a) + ", but found" + JSON.stringify(b)
    );

  if (typeA === "array" && a.length !== b.length)
    throw new Error(`Expected array length ${a.length}, but found ${b.length}`);

  if (typeof a === "object") {
    var keys = Object.keys(a).concat(Object.keys(b)); // Combine keys of a and b
    var uniqueKeys = {}; // To deduplicate keys
    keys.forEach(function (key) {
      uniqueKeys[key] = true;
    });

    Object.keys(uniqueKeys).forEach(function (key) {
      deepEquals(a[key], b[key], trace + buildTrace(a, key));
    });
  }
};

const getType = (x) => {
  if (x === null) return "null";
  if (x instanceof Array) return "array";
  return typeof x;
};

const buildTrace = (element, key) =>
  element instanceof Array ? `[${key}]` : `.${key}`;

function Test(options) {
  var expected = options.expected;
  var actual = options.actual;
  var description = options.description;

  this.expected = expected;
  this.actual = actual;
  this.description = description;
}

Test.prototype.run = function () {
  assertEquals(this.expected, this.actual, this.description);
};

const tests = [
  {
    expected: { a: 1 },
    actual: { a: 1, b: 2 },
    description: "Comparing an object with an additional key",
  },
  {
    expected: { a: 1 },
    actual: {},
    description: "Comparing an object missing a key",
  },
  {
    expected: NaN,
    actual: null,
    description: "Comparing different types",
  },
  {
    expected: { a: 5 },
    actual: { a: 6 },
    description: "Comparing objects with different values",
  },
  {
    expected: [1, 2, 3],
    actual: [1, 2, 3, 4],
    description: "Comparing arrays of different lengths",
  },
  {
    expected: { a: { b: 5 } },
    actual: { a: { b: 6 } },
    description: "Comparing nested objects",
  },
];

tests
  .map((test) => new Test(test))
  .forEach((test) => {
    try {
      test.run();
    } catch (error) {
      console.log(error.message);
    }
  });
