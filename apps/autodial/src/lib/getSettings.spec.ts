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
});
