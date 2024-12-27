
import { renderWithProviders } from "../../utils/test-utils";
import { UpdateCastMember } from "./UpdateCastMember";


describe("UpdateCastMember", () => {
    it("should render correctly", () => {
        const { asFragment } = renderWithProviders(<UpdateCastMember />);
        expect(asFragment()).toMatchSnapshot();
    });
});