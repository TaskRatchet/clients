import { getSettings } from "./getSettings";
import { makeGoal } from "../../functions/src/test/helpers";

describe("getSettings", () => {
  it("parses `from` option", () => {
    const settings = getSettings(
      makeGoal({
        fineprint: "#autodialFrom=from_slug",
      })
    );

    expect(settings.from).toBe("from_slug");
  });

  it("is case insensitive", () => {
    const settings = getSettings(
      makeGoal({
        fineprint: "#autodialfrom=from_slug",
      })
    );

    expect(settings.from).toBe("from_slug");
  });

  it('parses strict option case-insensitively', () => {
    const settings = getSettings(
      makeGoal({
        fineprint: "#autoDialstrict",
      })
    );

    expect(settings.strict).toBe(true);
  })

  it('parses `#autodial` case-insenstiively', () => {
    const settings = getSettings(
      makeGoal({
        fineprint: "#autoDial",
      })
    );

    expect(settings.autodial).toBe(true);
  })
});
