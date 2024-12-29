import { fireEvent, renderWithProviders, screen, waitFor } from "../../utils/test-utils";
import { baseUrl } from "../api/apiSlice";
import { categoryResponse, categoryResponsePage2 } from "../mocks";
import { CategoryList } from "./CategoryList";
import { rest } from "msw";
import { setupServer } from "msw/node";

export const handlers = [
  rest.get('', (req, res, ctx) => {
    if (req.url.searchParams.get("page") === "2") {
      return res(ctx.json(categoryResponsePage2), ctx.delay(150));
    }
    return res(ctx.json(categoryResponse), ctx.delay(150));
  }),
];

const server = setupServer(...handlers);

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

    it("should render success state", async () => {
        renderWithProviders(<CategoryList />);

        await waitFor(() => {
            const name = screen.getByText("Jackeline Mills PhD");
            expect(name).toBeInTheDocument();
        });
    });

    it("should render error state", async () => {
        server.use(
          rest.get(`${baseUrl}/categories`, (_, res, ctx) => {
            return res(ctx.status(500));
          })
        );
    
        renderWithProviders(<CategoryList />);
    
        await waitFor(() => {
          const error = screen.getByText("Error fetching categories");
          expect(error).toBeInTheDocument();
        });
      });

      it("should handle On PageChange", async () => {
        renderWithProviders(<CategoryList />);
    
        await waitFor(() => {
          const name = screen.getByText("Jackeline Mills PhD");
          expect(name).toBeInTheDocument();
        });
    
        const nextButton = screen.getByTestId("KeyboardArrowRightIcon");
        fireEvent.click(nextButton);
    
        await waitFor(() => {
          const name = screen.getByText("Dr. Amina Schulist");
          expect(name).toBeInTheDocument();
        });
      });
});