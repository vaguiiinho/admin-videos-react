
import { renderWithProviders } from "../../utils/test-utils";
import { CategoryCreate } from "./CategoryCreate";


describe("CategoryCreate", () => {
    it("should render correctly", () => {
        const { asFragment } = renderWithProviders(<CategoryCreate />);
        expect(asFragment()).toMatchSnapshot();
    });
});