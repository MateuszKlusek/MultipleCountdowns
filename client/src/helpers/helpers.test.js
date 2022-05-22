import { transformFromMiliseconds, retransformString } from "./timeManipulation"

test("check bountries of count input", () => {
    expect(transformFromMiliseconds(3600)).toBe("00:00:04")
    expect(transformFromMiliseconds(1000000000)).toBe("23:59:59")
    expect(transformFromMiliseconds(60000)).toBe("00:01:00")
    expect(transformFromMiliseconds(0)).toBe("00:00:00")
    expect(transformFromMiliseconds(-4)).toBe("00:00:00")
})

test("time string to number and to string again", () => {
    expect(retransformString("500")).toBe("500")
    expect(retransformString("180")).toBe("220")
    expect(retransformString("999999")).toBe("235959")

})