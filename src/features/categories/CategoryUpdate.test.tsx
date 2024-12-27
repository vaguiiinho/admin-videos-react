
import { renderWithProviders } from "../../utils/test-utils";
import { CategoryUpdate } from "./CategoryUpdate";


describe("CategoryUpdate", () => {
    it("should render correctly", () => {
        const { asFragment } = renderWithProviders(<CategoryUpdate />);
        expect(asFragment()).toMatchSnapshot();
    });
});