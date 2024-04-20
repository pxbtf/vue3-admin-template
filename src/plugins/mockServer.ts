import { createProdMockServer } from "vite-plugin-mock/client";
import userMock from "../mock/auth.mock";

export function setupProdMockServer() {
  createProdMockServer([...userMock]);
}
