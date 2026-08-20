import { describe, expect, it } from "vitest";
import { leadSchema } from "@/lib/lead";

describe("leadSchema", () => {
  it("parses a valid demo lead", () => {
    const result = leadSchema.safeParse({
      source: "demo",
      contact: {
        name: "Jordan Ali",
        email: "jordan@example.com",
      },
    });

    expect(result.success).toBe(true);
  });

  it("fails with path contact.email when email is missing", () => {
    const result = leadSchema.safeParse({
      source: "demo",
      contact: {
        name: "Jordan Ali",
      },
    });

    expect(result.success).toBe(false);
    if (!result.success) {
      const paths = result.error.issues.map((issue) => issue.path.join("."));
      expect(paths).toContain("contact.email");
    }
  });

  it("fails on an invalid source enum value", () => {
    const result = leadSchema.safeParse({
      source: "not-a-real-source",
      contact: {
        name: "Jordan Ali",
        email: "jordan@example.com",
      },
    });

    expect(result.success).toBe(false);
    if (!result.success) {
      const paths = result.error.issues.map((issue) => issue.path.join("."));
      expect(paths).toContain("source");
    }
  });

  it("parses a builder lead with a configuration object", () => {
    const result = leadSchema.safeParse({
      source: "builder",
      contact: {
        name: "Sam Rivera",
        email: "sam@example.com",
        phone: "0400000000",
        organization: "Rivera Health",
      },
      message: "Interested in the security pack.",
      configuration: {
        modules: ["dsc", "healing-plan"],
        seats: 12,
      },
    });

    expect(result.success).toBe(true);
    if (result.success) {
      expect(result.data.configuration).toEqual({
        modules: ["dsc", "healing-plan"],
        seats: 12,
      });
    }
  });
});
