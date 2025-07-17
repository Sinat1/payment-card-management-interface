import { Blocks } from "react-loader-spinner";

const Loader: React.FC = () => {
  return (
    <div className="flex justify-center items-center mt-[30vh] mx-auto">
      <Blocks
        visible={true}
        height={300}
        width={300}
        ariaLabel="blocks-loading"
      />
    </div>
  );
};

export default Loader;
