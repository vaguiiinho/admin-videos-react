import { render } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import { CategoryTable } from "./CategoryTable";
import { GridFilterModel, GridPaginationModel } from "@mui/x-data-grid";

const Props = {
    data: undefined,
    paginationModel: { page: 0, pageSize: 10 },
    isFetching: false,
    pageSizeOptions: [10, 20, 30],

    onPaginationModelChange: (model: GridPaginationModel) => { },
    handleFilterChange: (filterModel: GridFilterModel) => { },
    handleDelete: (id: string) => { },
};

const mockData = {
    data: [
        {
            id: "123",
            name: "test",
            description: "test",
            is_active: true,
            created_at: "2021-03-01T00:00:00.000000Z",
        },
    ],
    meta: {
        to: 1,
        from: 1,
        total: 1,
        per_page: 1,
        last_page: 1,
        first_page: 1,
        current_page: 1,
    },
    links: {
        first: "http://localhost:8000/api/cast_members?page=1",
        last: "http://localhost:8000/api/cast_members?page=1",
        prev: "",
        next: "",
    },
};

describe("CategoryTable", () => {
    it("should render correctly", () => {
        const { asFragment } = render(<CategoryTable {...Props} />);
        expect(asFragment()).toMatchSnapshot();
    });

    it("should render CategoryTable with loading", () => {
        const { asFragment } = render(
            <CategoryTable {...Props} isFetching={true} />
        );
        expect(asFragment()).toMatchSnapshot();
    });

    it("should render CategoryTable with data", () => {
        const { asFragment } = render(
            <CategoryTable {...Props} data={mockData} />,
            { wrapper: BrowserRouter }
        );
        expect(asFragment()).toMatchSnapshot();
    });
});