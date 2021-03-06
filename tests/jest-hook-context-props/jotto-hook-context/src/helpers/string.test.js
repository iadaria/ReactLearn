import stringsModule from "./strings";
const { getStringByLanguage } = stringsModule;

const strings = {
  en: { submit: "submit" },
  emoji: { submit: "🚀" },
  mermish: {},
};

describe("language string testing", () => {
  const mockWarn = jest.fn();
  let originWarn;
  
  beforeEach(() => {
    originWarn = console.warn;
    console.warn = mockWarn
  });

  afterEach(() => {
    console.warn = originWarn;
  });

  test("returns correct submit string for english", () => {
    const string = getStringByLanguage("en", "submit", strings);
    expect(string).toBe("submit");
    expect(mockWarn).not.toHaveBeenCalled();
  });

  test("returns the correct submit string for emoji", () => {
    const string = getStringByLanguage("emoji", "submit", strings);
    expect(string).toBe("🚀");
    expect(mockWarn).not.toHaveBeenCalled();
  });

  test("returns english submit string when language does not exist", () => {
    const string = getStringByLanguage("notALanguage", "submit", strings);
    expect(string).toBe("submit");
    //expect(mockWarn).toHaveBeenCalled("Could not get string ");
  });

  test("returns english submit string when submit key does not exist for language", () => {
    const string = getStringByLanguage("mermish", "submit", strings);
    expect(string).toBe("submit");
  });
});

test('somthing else', () => {
    //console.warn("WARNING");
})
