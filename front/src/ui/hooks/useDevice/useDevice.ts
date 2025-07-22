import { useSelector } from "react-redux";
import { RootState } from "~/store/client/store";

const useDevice = () => {
	return useSelector((state: RootState) => state.deviceReducer);
};

export default useDevice;
