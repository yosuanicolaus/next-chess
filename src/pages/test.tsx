import { useEffectOnce } from "react-use";
import { Loading, LoadingFull } from "../components/common/Loading";

const Demo = () => {
  useEffectOnce(() => {
    console.log("mounting test");

    return () => {
      console.log("unmounting test");
    };
  });

  return (
    <div className="flex flex-grow flex-col items-center justify-center">
      <LoadingFull />
      <Loading />
    </div>
  );
};

export default Demo;
