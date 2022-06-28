import { filterByTerm } from "../src/filterByTerm";

describe("Filter function", () => {
  test("it should filter by a search term (link)", () => {
    // actual test
    const input = [
      { id: 1, url: "https://www.url1.dev" },
      { id: 2, url: "https://www.url2.dev" },
      { id: 3, url: "https://www.link3.dev" },
    ];

    const output = [{ id: 3, url: "https://www.link3.dev" }];

    expect(filterByTerm(input, "link")).toEqual(output);
    expect(filterByTerm(input, "LINK")).toEqual(output); // New test
    expect(filterByTerm(input, "3")).toEqual(output); // new test
  });

  test("it should filter by a search term (uRl)", () => {
    // actual test
    const input = [
      { id: 1, url: "https://www.url1.dev" },
      { id: 2, url: "https://www.url2.dev" },
      { id: 3, url: "https://www.link3.dev" },
    ];

    const output = [
      { id: 1, url: "https://www.url1.dev" },
      { id: 2, url: "https://www.url2.dev" },
    ];

    expect(filterByTerm(input, "uRl")).toEqual(output);
  });

  test("it should throw an error if search term empty", () => {
    // actual test
    const input = [
      { id: 1, url: "https://www.url1.dev" },
      { id: 2, url: "https://www.url2.dev" },
      { id: 3, url: "https://www.link3.dev" },
    ];

    const output = "searchTerm cannot be empty";

    expect(() => {
      filterByTerm(input, "");
    }).toThrowError(Error(output));
  });

  test("it should throw an error when inputarr is empty", () => {
    // actual test
    const input = [];

    const output = "inputArr cannot be empty";

    expect(() => {
      filterByTerm(input, "link");
    }).toThrowError(Error(output));
  });
});
