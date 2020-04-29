import authHelper from '../../authHelper';
import { inTreeApi } from '../../config';
import { useHistory, useLocation } from 'react-router-dom';
import { NonAuthRoutes } from '../../constants';

function CheckResponse(): void {
    const history = useHistory();
    const location = useLocation();

    inTreeApi.interceptors.response.use(
        function (response) {
            // Do something with response data
            return response;
        },
        function (error) {
            switch (error.response.status) {
                case 401:
                    authHelper.remove();
                    history.push({
                        pathname: NonAuthRoutes.login,
                        state: { from: location },
                    });
                    break;
                case 403:
                    authHelper.remove();
                    history.push({
                        pathname: NonAuthRoutes.login,
                        state: { from: location },
                    });
                    break;
                default:
                    break;
            }
            // Do something with response error
            return Promise.reject(error);
        },
    );
}

export default CheckResponse;
