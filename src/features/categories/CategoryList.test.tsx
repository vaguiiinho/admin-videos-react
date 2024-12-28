import { rest } from 'msw'
import { setupServer } from "msw/node";
import { renderWithProviders, screen } from "../../utils/test-utils";
import { CategoryList } from "./CategoryList";
import { baseUrl } from "../api/apiSlice";
import { categoryResponse } from "../mocks";

export const handlers = [
    rest.get(`${baseUrl}/categories`, (req, res, ctx) => {
        return res(ctx.json(categoryResponse), ctx.delay(150));
    }),
]
export const server = setupServer(...handlers)

describe("CategoryList", () => {
    afterAll(() => server.close());
    beforeAll(() => server.listen());
    afterEach(() => server.resetHandlers());
    it("should render correctly", () => {
        const { asFragment } = renderWithProviders(<CategoryList />);
        expect(asFragment()).toMatchSnapshot();
    });

    it("should render loading state", () => {
        renderWithProviders(<CategoryList />);
        const loading = screen.getByRole("progressbar");
        expect(loading).toBeInTheDocument();
    });
});