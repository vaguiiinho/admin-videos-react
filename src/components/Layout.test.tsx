import { render } from "@testing-library/react";
import { Layout } from "./Layout";

describe("Layout", () => {
    it("should render correctly", () => {
        const { asFragment } = render(
            <Layout >
                <h1>Hello World</h1>
            </Layout>
        );
        expect(asFragment()).toMatchSnapshot();
    });
});