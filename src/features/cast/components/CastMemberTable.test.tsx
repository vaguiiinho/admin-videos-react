import { GridFilterModel, GridPaginationModel } from "@mui/x-data-grid";
import { render } from "@testing-library/react";
import { CastMemberTable } from "./CastMemberTable";
import { BrowserRouter } from "react-router-dom";

const props = {
    data: {
        data: [
            { id: "1", name: "John Doe", type: 1, createdAt: "2024-12-23" },
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
            prev: "",
            last: "http://localhost:3000/api/cast-members?page=2&totalPage=2",
            next: "http://localhost:3000/api/cast-members?page=2&totalPage=2",
            first: "http://localhost:3000/api/cast-members?page=1&totalPage=2",
        }
    },
    paginationModel: { page: 0, pageSize: 10 },
    isFetching: false,
    pageSizeOptions: [10, 20, 30],

    onPaginationModelChange: (model: GridPaginationModel) => { },
    handleFilterChange: (filterModel: GridFilterModel) => { },
    handleDelete: (id: string) => { },
}
describe("CstMemberTable", () => {
    it("should render cast member table correctly", () => {
        const { asFragment } = render(<CastMemberTable {...props} />, {
            wrapper: BrowserRouter,
        });

        expect(asFragment()).toMatchSnapshot();
    })

    it("should render cast member table with loading", () => {
        const { asFragment } = render(<CastMemberTable {...props} isFetching />, {
            wrapper: BrowserRouter,
        });

        expect(asFragment()).toMatchSnapshot();
    })

    it("should render cast member table with empty data", () => {
        const { asFragment } = render(<CastMemberTable {...props} data={{ data: [], meta: {} } as any} />, {
            wrapper: BrowserRouter,
        });

        expect(asFragment()).toMatchSnapshot();
    })

    it("should render correctly type", () => {
        const { asFragment } = render(
            <CastMemberTable
                {...props}
                data={{
                    data: [{ ...props.data.data[0], type: 2 }],
                    links: { ...props.data.links },
                    meta: { ...props.data.meta },
                }}
            />,
            {
                wrapper: BrowserRouter,
            }
        );

        expect(asFragment()).toMatchSnapshot();
    });
})
