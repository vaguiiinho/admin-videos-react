import { fireEvent, renderWithProviders, screen, waitFor } from "../../utils/test-utils";
import axios from "axios";
import MockAdapter from "axios-mock-adapter";
import { categoryResponse, categoryResponsePage2 } from "../mocks";
import { CategoryList } from "./CategoryList";

const mock = new MockAdapter(axios);

describe("CategoryList", () => {
  afterEach(() => mock.reset());
  afterAll(() => mock.restore());

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
    mock.onGet("/categories").reply(200, {
      data: [
        {
          id: "fcc1374f-48dc-4f0a-8ef3-81e7a8c25748",
          name: "Dr. Dayton Kuhlman",
          description: "Asperiores vitae repellendus impedit sequi ea saepe itaque expedita in quam iure ut id.",
          is_active: true,
          created_at: "2024-12-27 18:34:59",
        },
      ],
    });

    renderWithProviders(<CategoryList />);

    await waitFor(() => {
      const name = screen.getByText("Dr. Dayton Kuhlman");
      expect(name).toBeInTheDocument();
    });
  });

  it("should render error state", async () => {
    mock.onGet("/categories").reply(500);

    renderWithProviders(<CategoryList />);

    await waitFor(() => {
      const error = screen.getByText("Error fetching categories");
      expect(error).toBeInTheDocument();
    });
  });

  it("should handle On PageChange", async () => {
    mock
      .onGet("/categories?page=1")
      .reply(200, categoryResponse)
      .onGet("/categories?page=2")
      .reply(200, categoryResponsePage2);

    renderWithProviders(<CategoryList />);

    await waitFor(() => {
      const name = screen.getByText("Dr. Dayton Kuhlman");
      expect(name).toBeInTheDocument();
    });

    const nextButton = screen.getByTestId("KeyboardArrowRightIcon");
    fireEvent.click(nextButton);

    await waitFor(() => {
      const name = screen.getByText("Dr. Darion Upton");
      expect(name).toBeInTheDocument();
    });
  });

  it("should handle filter change", async () => {
    mock.onGet("/categories?search=Dr.").reply(200, {
      data: [
        {
          id: "fcc1374f-48dc-4f0a-8ef3-81e7a8c25748",
          name: "Dr. Dayton Kuhlman",
        },
      ],
    });

    renderWithProviders(<CategoryList />);

    const input = screen.getByPlaceholderText("Search…");
    fireEvent.change(input, { target: { value: "Dr." } });

    await waitFor(() => {
      const loading = screen.getByRole("progressbar");
      expect(loading).toBeInTheDocument();
    });

    await waitFor(() => {
      const name = screen.getByText("Dr. Dayton Kuhlman");
      expect(name).toBeInTheDocument();
    });
  });

  it("should handle Delete Category success", async () => {
    mock.onGet("/categories").reply(200, categoryResponse);
    mock.onDelete("/categories/fcc1374f-48dc-4f0a-8ef3-81e7a8c25748").reply(200);

    renderWithProviders(<CategoryList />);

    await waitFor(() => {
      const name = screen.getByText("Dr. Dayton Kuhlman");
      expect(name).toBeInTheDocument();
    });

    const deleteButton = screen.getByTestId("DeleteSharpIcon");
    fireEvent.click(deleteButton);

    await waitFor(() => {
      const message = screen.getByText("Category deleted");
      expect(message).toBeInTheDocument();
    });
  });

  it("should handle Delete Category error", async () => {
    mock.onGet("/categories").reply(200, categoryResponse);
    mock.onDelete("/categories/fdbb7cd5-5fe5-4a7c-a5f5-c991cc45fd1c").reply(500);

    renderWithProviders(<CategoryList />);

    await waitFor(() => {
      const name = screen.getByText("Dr. Dayton Kuhlman");
      expect(name).toBeInTheDocument();
    });

    const deleteButton = screen.getByTestId("DeleteSharpIcon");
    fireEvent.click(deleteButton);

    await waitFor(() => {
      const message = screen.getByText("Category not deleted");
      expect(message).toBeInTheDocument();
    });
  });
});
