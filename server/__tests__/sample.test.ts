import { describe, expect, test } from "@jest/globals";
import request from "supertest";
import app from "../src/app";

describe("Test registration", () => {
  test("It should validate existqnce of referal code", async () => {
    const response = await request(app)
      .post("/v1")
      .send({ referenceCode: "111" })
      .expect("Content-Type", /json/);

    expect(response.body.message).toBe("Invalid Referral Code");
    expect(response.statusCode).toBe(500);
  });

  describe("role", () => {
    test("It should check invalid role value", async () => {
      const response = await request(app)
        .post("/v1")
        .send({ role: "john" })
        .expect("Content-Type", /json/);

      expect(response.body.message).toBe("Invalid value for role field");
      expect(response.statusCode).toBe(500);
    });

    test("It should check valid role value", async () => {
      const response = await request(app)
        .post("/v1")
        .send({ role: "customer" })
        .expect("Content-Type", /json/);

      expect(response.body.message).toBe("Invalid value for role field");
      expect(response.statusCode).toBe(500);
    });
  });
});
