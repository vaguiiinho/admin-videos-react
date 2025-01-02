import { render } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import { CastMemberTable } from "./CastMemberTable";
import { GridFilterModel, GridPaginationModel } from "@mui/x-data-grid";

const Props = {
  data: {
    data: [
      {
        id: "123",
        type: 1,
        name: "test",
        deleted_at: "2021-03-01T00:00:00.000000Z",
        created_at: "2021-03-01T00:00:00.000000Z",
        updated_at: "2021-03-01T00:00:00.000000Z",
      },
    ],
    meta: {
      currentPage: 1,
      from: 1,
      lastPage: 1,
      path: "http://localhost:8000/api/cast_members",
      perPage: 1,
      to: 1,
      total: 1,
    },
    links: {
      first: "http://localhost:8000/api/cast_members?page=1",
      last: "http://localhost:8000/api/cast_members?page=1",
      prev: "",
      next: "",
    },
  },
  paginationModel: { page: 0, pageSize: 10 },
  isFetching: false,
  pageSizeOptions: [10, 20, 30],

  onPaginationModelChange: (model: GridPaginationModel) => { },
  handleFilterChange: (filterModel: GridFilterModel) => { },
  handleDelete: (id: string) => { },
};

describe("CastMemberTable", () => {
  it("should render castMember talbe correcly", () => {
    const { asFragment } = render(<CastMemberTable {...Props} />, {
      wrapper: BrowserRouter,
    });

    expect(asFragment()).toMatchSnapshot();
  });

  it("should render CastMemberTable with loading", () => {
    const { asFragment } = render(<CastMemberTable {...Props} isFetching />, {
      wrapper: BrowserRouter,
    });

    expect(asFragment()).toMatchSnapshot();
  });

  it("should render CastMemberTable with empty data", () => {
    const { asFragment } = render(
      <CastMemberTable {...Props} data={{ data: [], meta: {} } as any} />,
      { wrapper: BrowserRouter }
    );

    expect(asFragment()).toMatchSnapshot();
  });

  it("should render corret type", () => {
    const { asFragment } = render(
      <CastMemberTable
        {...Props}
        data={{
          data: [{ ...Props.data.data[0], type: 2 }],
          links: { ...Props.data.links },
          meta: { ...Props.data.meta },
        }}
      />,
      {
        wrapper: BrowserRouter,
      }
    );

    expect(asFragment()).toMatchSnapshot();
  });
});