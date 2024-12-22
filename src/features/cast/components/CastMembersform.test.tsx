import { render } from "@testing-library/react";
import { CastMemberForm } from "./CastMemberForm";
import { BrowserRouter } from "react-router-dom";

const Props = {
  castMember: {
    id: "1",
    name: "Teste",
    type: 1,
    createdAt: "2021-10-01T00:00:00.000000Z",
  },
  isDisabled: false,
  isLoading: false,
  handleSubmit: jest.fn(),
  handleChange: jest.fn(),
};

describe("CastMemberForm", () => {
  it("should render castMember form  correctly", () => {
    const { asFragment } = render(<CastMemberForm {...Props} />, {
      wrapper: BrowserRouter,
    });

    expect(asFragment()).toMatchSnapshot();
  });
});