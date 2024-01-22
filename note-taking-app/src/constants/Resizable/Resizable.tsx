import { ResizableBox } from "react-resizable";
import "./Resizable.scss";

interface ResizableProps {
    direction: "horizontal" | "vertical";
    children: React.ReactNode;
}

const Resizable: React.FC<ResizableProps> = ({ direction, children }) => {
    return (
        <ResizableBox height={Infinity} width={300}
        resizeHandles={["e"]}
        >
            {children}
        </ResizableBox>
    );
};

export default Resizable;
