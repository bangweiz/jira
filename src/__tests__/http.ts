import { setupServer } from "msw/node";
import { rest } from "msw";
import { http } from "../utils/http";

const apiUrl = process.env.REACT_APP_API_URL;

const server = setupServer();

// jest is used here
beforeAll(() => server.listen());

// reset router when each test finishes
afterEach(() => server.resetHandlers());

// close router when all tests finish
afterAll(() => server.close());

test("http request", async () => {
  const endpoint = "test-endpoint";
  const mockResult = { mockValue: "mock" };
  server.use(
    rest.get(`${apiUrl}/${endpoint}`, async (req, res, ctx) => {
      return res(ctx.json(mockResult));
    })
  );
  const result = await http(endpoint);
  expect(result).toEqual(mockResult);
});

test("http token", async () => {
  const token = "FAKE_TOKEN";
  const endpoint = "test-endpoint";
  const mockResult = { mockValue: "mock" };

  let request: any;

  server.use(
    rest.get(`${apiUrl}/${endpoint}`, async (req, res, ctx) => {
      request = req;
      return res(ctx.json(mockResult));
    })
  );

  await http(endpoint, { token });

  expect(request.headers.get("Authorization")).toBe(`Bearer ${token}`);
});
